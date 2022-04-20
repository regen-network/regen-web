import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { CardContent, useTheme } from '@mui/material';

import OutlinedButton from '../buttons/OutlinedButton';
import MediaCard from '../cards/MediaCard';
import { parseText } from '../../utils/textParser';
import { BodyText, Title } from '../typography';
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
        }}
      >
        <div>
          <Title variant="h5">{parseText(props.title)}</Title>
          <BodyText>{parseText(props.description)}</BodyText>
        </div>

        <OutlinedButton
          size="small"
          sx={{ mt: 4, width: '100%' }}
          onClick={props.onClick}
        >
          {props.btnText}
        </OutlinedButton>
      </CardContent>
    </MediaCard>
  );
};

export default ImageActionCard;
