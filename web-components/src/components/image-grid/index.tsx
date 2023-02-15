import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

import ContainedButton from '../buttons/ContainedButton';
import { LinkComponentProp } from '../tabs/IconTabs';
import { Body, Title } from '../typography';
import { useImageGridStyles } from './imageGrid.styles';

export interface ImageGridProps {
  img: JSX.Element; // using pure img tag or gatsby-image
  title: string;
  description: string | JSX.Element;
  even: boolean;
  linkComponent?: LinkComponentProp;
  button?: {
    text: string;
    href?: string;
  };
}

export default function ImageGrid({
  img,
  title,
  description,
  even,
  button,
  linkComponent,
}: ImageGridProps): JSX.Element {
  const { classes } = useImageGridStyles({ even });

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item className={classes.image}>
        {img}
      </Grid>
      <Grid item className={classes.text}>
        <Title variant="h2" className={classes.title}>
          {title}
        </Title>
        <Box
          sx={theme => ({
            ml: even ? 'auto' : 0,
            mr: even ? 0 : 'auto',
            [theme.breakpoints.between('md', 'xl')]: {
              maxWidth: theme.spacing(115.5),
            },
            [theme.breakpoints.up('xl')]: {
              maxWidth: theme.spacing(145),
            },
          })}
        >
          <Body as="div" size="xl">
            {description}
          </Body>
          {button?.text && (
            <ContainedButton
              href={button.href}
              LinkComponent={linkComponent}
              sx={{ mt: 4.5 }}
            >
              {button.text}
            </ContainedButton>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
