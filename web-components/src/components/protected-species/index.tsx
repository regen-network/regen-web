import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import ProtectedSpeciesItem, { ItemProps } from './Item';
// import Slider from 'react-slick';

export interface ProtectedSpeciesProps {
  species: ItemProps[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(4, 155px)',
    // gridTemplateRows: '173px 173px',
    // gridColumnGap: '10px',
    // gridRowGap: '15px',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    height: '346px',
    width: '310px',
    overflowX: 'auto',
  },
  item: {
    height: '50%',
    width: '50%',
    flex: '0 0 auto',
    // width: '155px',
    // height: '173px',
    padding: `${theme.spacing(3.25)} ${theme.spacing(2.25)} 0`,
  },
}));

export default function ProtectedSpecies({ species }: ProtectedSpeciesProps): JSX.Element {
  const classes = useStyles({});
  // const settings = {
  //   className: 'center',
  //   centerMode: true,
  //   infinite: true,
  //   centerPadding: '60px',
  //   slidesToShow: 2,
  //   speed: 500,
  //   rows: 2,
  //   slidesPerRow: 2,
  //   arrows: true,
  // };
  return (
    <div>
      <div className={classes.root}>
        {species.map((item, index) => (
          <div className={classes.item}>
            <ProtectedSpeciesItem name={item.name} imgSrc={item.imgSrc} />
          </div>
        ))}
      </div>
    </div>
  );
}

// <Slider {...settings} className={classes.root}>
//   {species.map((item, index) => (
//     <div className={classes.item}>
//       <ProtectedSpeciesItem name={item.name} imgSrc={item.imgSrc} />
//     </div>
//   ))}
// </Slider>
