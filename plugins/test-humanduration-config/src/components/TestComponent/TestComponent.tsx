import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { testApiRef } from '../../api';
import { Backdrop, CircularProgress, Grid, Typography } from '@material-ui/core';
import { InfoCard, ResponseErrorPanel } from '@backstage/core-components';
import { readDurationFromConfig } from '@backstage/config';

export const TestComponent = () => {
  const configApi = useApi(configApiRef);
  const testApi = useApi(testApiRef);

  const normalParameter = configApi.getOptionalString('test.normalParameter') ?? 'This is default value set in frontend';
  const hasHumanDurationParameter = configApi.has('test.humanDurationParameter');
  const humanDurationParameter = hasHumanDurationParameter
                                 ? readDurationFromConfig(configApi, { key: 'test.humanDurationParameter' } )
                                 : { months: 1}

  const { value, loading, error } = useAsync(() => {
    return testApi.get();
  }, [ testApi, ]);

  if (loading) {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <Grid container>
      <Grid item>
        <InfoCard title="Parameters readed from frontend">
          <Typography variant="body1">Normal parameter: {normalParameter}</Typography>
          <Typography variant="body1">Has humanDuration parameter: {hasHumanDurationParameter}</Typography>
          <Typography variant="body1">HumanDuration parameter: {JSON.stringify(humanDurationParameter)}</Typography>
        </InfoCard>
      </Grid>
      <Grid item>
        <InfoCard title="Parameters readed from backend">
          <Typography variant="body1">Normal parameter: {value?.normalParameter}</Typography>
          <Typography variant="body1">Has humanDuration parameter: {value?.hasHumanDurationParameter}</Typography>
          <Typography variant="body1">HumanDuration parameter: {JSON.stringify(value?.humanDurationParameter)}</Typography>
        </InfoCard>
      </Grid>
    </Grid>
  );
}