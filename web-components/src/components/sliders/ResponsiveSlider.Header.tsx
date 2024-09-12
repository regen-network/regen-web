import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import PrevNextButton from '../buttons/PrevNextButton';
import { Title } from '../typography';
import { ResponsiveSliderProps } from './ResponsiveSlider';
import { useStyles } from './ResponsiveSlider.Header.styles';

type Props = {
  slickPrev: () => void;
  slickNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
} & Pick<
  ResponsiveSliderProps,
  'classes' | 'renderTitle' | 'title' | 'titleVariant' | 'items' | 'arrows'
>;

export const Header = ({
  slickPrev,
  slickNext,
  prevDisabled,
  nextDisabled,
  classes,
  renderTitle,
  title,
  titleVariant,
  items,
  arrows,
}: Props) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('tablet'));
  const { classes: styles, cx } = useStyles();

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="center"
      className={classes && classes.headerWrap}
    >
      {renderTitle ? (
        renderTitle()
      ) : title ? (
        <Grid xs={12} sm={8} item>
          <Title
            variant={titleVariant}
            className={cx(styles.title, classes && classes.title)}
          >
            {title}
          </Title>
        </Grid>
      ) : null}
      {items && items.length > 1 && arrows && desktop && (
        <Grid
          xs={renderTitle || title ? 4 : 12}
          container
          item
          justifyContent="flex-end"
          className={styles.buttons}
        >
          <PrevNextButton
            direction="prev"
            onClick={slickPrev}
            disabled={prevDisabled}
          />
          <PrevNextButton
            direction="next"
            onClick={slickNext}
            disabled={nextDisabled}
          />
        </Grid>
      )}
    </Grid>
  );
};
