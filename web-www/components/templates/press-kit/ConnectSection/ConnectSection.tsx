import { useTheme } from '@mui/material';

import { getPressKitConnectIcons } from './ConnectSection.config';
import { useConnectStyles } from './ConnectSection.styles';

import ConnectSection from '@/components/organisms/ConnectSection/ConnectSection';
import { PressKitConnectSectionFieldsFragment } from '@/generated/sanity-graphql';
import pressKitConnectBg from '@/public/images/press-kit/press-kit-connect-bg.jpg';

type Props = {
  connectSectionData?: PressKitConnectSectionFieldsFragment;
};

const PressKitConnectSection = ({ connectSectionData }: Props): JSX.Element => {
  const theme = useTheme();
  const { classes: styles } = useConnectStyles();
  const icons = getPressKitConnectIcons(theme);

  return (
    <ConnectSection
      isCompact
      itemClassName={styles.item}
      header={connectSectionData?.connectSectionHeader || ''}
      backgroundImage={pressKitConnectBg}
      icons={icons}
    />
  );
};

export default PressKitConnectSection;
