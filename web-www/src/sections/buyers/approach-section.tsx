import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

import Title from 'web-components/lib/components/title';

const useStyles = makeStyles((theme: Theme) => ({

}));

const ApproachSection = () => {
  const classes = useStyles({});
  return (
    <div>
      <Title variant="subtitle1">
        Our innovative approach directly incentivizes land stewards to do good for the planet
      </Title>

    </div>
  );
};

export default ApproachSection;
