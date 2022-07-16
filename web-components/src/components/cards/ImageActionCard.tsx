import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { CardContent, useTheme } from '@mui/material';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';
import { parseText } from '../../utils/textParser';
import { Body, Title } from '../typography';
import { Theme } from '~/theme/muiTheme';

const useStyles = makeStyles((theme: Theme) => ({
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
  startIcon?: React.ReactNode;
};

const ImageActionCard: React.FC<Props> = props => {
  const styles = useStyles();
  const theme = useTheme();
  return (
    <MediaCard
      imgSrc={props.imgSrc}
      className={clsx(styles.root, props.className)}
      elevation={1}
      borderRadius="10px"
      borderColor={theme.palette.grey[100]}
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
