import React from 'react';
import NotFound from 'web-components/lib/components/not-found';
import RotationalGrazing from '../assets/rotational-grazing.png';

const NotFoundPage = (): JSX.Element => {
  return (
    <NotFound
      img={<img alt="home" src={RotationalGrazing} />}
      home={process.env.REACT_APP_WEBSITE_URL}
    />
  );
};

export { NotFoundPage };
