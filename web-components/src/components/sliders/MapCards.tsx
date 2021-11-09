import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Slider from 'react-slick';
import MapCard from '../cards/MapCard';

export interface MapCardsProps {
  features: any[];
  afterChange: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .slick-track': {
      display: 'flex',
      '& .slick-slide': {
        height: 'inherit',
        '& > div:first-child': {
          height: '100%',
        },
      },
    },
  },
  item: {
    height: '100%',
    '& > div:first-child': {
      marginLeft: theme.spacing(1.875),
      marginRight: theme.spacing(1.875),
    },
  },
}));

export default function MapCards({
  features,
  afterChange,
}: MapCardsProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const settings = {
    centerMode: true,
    speed: 500,
    rows: 1,
    slidesPerRow: 1,
    arrows: false,
  };
  return (
    <div>
      <Slider
        {...settings}
        afterChange={index =>
          afterChange(features[index] ? features[index].id : null)
        }
        className={classes.root}
      >
        {features.map((item, index) => (
          <div className={classes.item} key={index}>
            <MapCard
              name={item.properties.name}
              imgSrc={item.properties.imgSrc}
              description={item.properties.description}
              color={item.properties.fill || theme.palette.secondary.main}
              isPopup={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
