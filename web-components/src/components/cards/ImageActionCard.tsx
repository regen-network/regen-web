import React, { ReactNode } from 'react';
import { CardContent, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { parseText } from '../../utils/textParser';
import OutlinedButton from '../buttons/OutlinedButton';
import { Body, Title } from '../typography';
import MediaCard from './MediaCard/MediaCard';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
}));

type Props = {
  description: string | JSX.Element;
  imgSrc: string;
  onClick: () => void;
  title: string | JSX.Element;
  btnText: string;
  className?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  imageChildren?: ReactNode;
};

const ImageActionCard: React.FC<React.PropsWithChildren<Props>> = props => {
  const { classes: styles, cx } = useStyles();
  const theme = useTheme();
  return (
    <MediaCard
      imgSrc={props.imgSrc}
      className={cx(styles.root, props.className)}
      elevation={1}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
      imageChildren={props.imageChildren}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 5,
        }}
      >
        <div>
          <Title as="div" variant="h5">
            {parseText(props.title)}
          </Title>
          <Body as="div" sx={{ mt: 3 }}>
            {parseText(props.description)}
          </Body>
        </div>

        <OutlinedButton
          size="small"
          sx={{ mt: 5, width: '100%' }}
          onClick={props.onClick}
          disabled={props.disabled}
          startIcon={props.startIcon}
        >
          {props.btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export { ImageActionCard };
