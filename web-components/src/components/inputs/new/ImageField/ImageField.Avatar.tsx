import { Avatar } from '@mui/material';

import AvatarIcon from '../../../icons/AvatarIcon';
import { useImageFieldStyles } from './ImageField.styles';

type Props = {
  value: string;
  fallbackAvatar?: JSX.Element;
};

export const ImageFieldAvatar = ({ value, fallbackAvatar }: Props) => {
  const { classes: styles } = useImageFieldStyles();

  return (
    <Avatar className={styles.avatar} src={value}>
      {fallbackAvatar || <AvatarIcon />}
    </Avatar>
  );
};
