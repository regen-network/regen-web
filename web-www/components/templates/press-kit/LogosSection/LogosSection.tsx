import Grid from '@mui/material/Grid';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import RegenIcon from 'web-components/src/components/icons/RegenIcon';
import Section from 'web-components/src/components/section';

import { useLogosSectionStyles } from './LogosSection.styles';

import { PressKitLogosSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  logosSectionData?: PressKitLogosSectionFieldsFragment['logosSection'];
};

const LogosSection = ({ logosSectionData }: Props): JSX.Element => {
  const { classes: styles } = useLogosSectionStyles();

  return (
    <Section
      title={logosSectionData?.header || ''}
      classes={{ root: styles.root, title: styles.title }}
    >
      <Grid container alignItems="center" direction="column">
        <RegenIcon className={styles.logo} />
        <ContainedButton href={logosSectionData?.buttonLink || ''}>
          {logosSectionData?.buttonText}
        </ContainedButton>
      </Grid>
    </Section>
  );
};

export default LogosSection;
