import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import { useStackingStyles } from './Staking.styles';

import { TokenStackingSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  stakingSectionData?: TokenStackingSectionFieldsFragment['stakingSection'];
};

const Staking = ({ stakingSectionData }: Props): JSX.Element => {
  const { classes: styles } = useStackingStyles();

  return (
    <Section
      title={
        <Title variant="h2" mobileVariant="h3">
          {stakingSectionData?.title}
        </Title>
      }
      classes={{ root: styles.center }}
    >
      <Body
        as="div"
        size="xl"
        sx={{
          py: 4,
          mb: 4,
          textAlign: 'center',
          width: ['100%', '80%'],
          maxWidth: theme => theme.spacing(236.5),
        }}
      >
        <BlockContent content={stakingSectionData?.bodyRaw} />
      </Body>
      <ContainedButton
        size="large"
        href={stakingSectionData?.button?.buttonLink?.buttonHref || ''}
      >
        {stakingSectionData?.button?.buttonText}
      </ContainedButton>
    </Section>
  );
};

export default Staking;
