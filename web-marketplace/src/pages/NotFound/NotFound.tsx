import NotFound from 'web-components/src/components/views/NotFoundView';

import RotationalGrazing from 'assets/rotational-grazing.png';

const NotFoundPage = (): JSX.Element => {
  return (
    <NotFound
      img={<img alt="home" src={RotationalGrazing} />}
      home={import.meta.env.VITE_WEBSITE_URL}
    />
  );
};

export { NotFoundPage };
