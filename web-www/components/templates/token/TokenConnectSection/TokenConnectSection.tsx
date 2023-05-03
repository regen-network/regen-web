import { useTheme } from '@mui/material';

import { getIcons } from './TokenConnectSection.config';
import { useConnectSectionStyles } from './TokenConnectSection.styles';

import ConnectSection from '@/components/organisms/ConnectSection/ConnectSection';
import { TokenConnectSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  tokenConnectData?: TokenConnectSectionFieldsFragment;
};

const TokenConnectSection = ({ tokenConnectData }: Props): JSX.Element => {
  const { classes: styles } = useConnectSectionStyles();
  const theme = useTheme();
  const icons = getIcons({ theme });

  return (
    <ConnectSection
      className={styles.connect}
      header={tokenConnectData?.connectSectionHeader || ''}
      backgroundImage={'/images/token/birds-background.png'}
      icons={icons}
    />
  );
};

export default TokenConnectSection;
