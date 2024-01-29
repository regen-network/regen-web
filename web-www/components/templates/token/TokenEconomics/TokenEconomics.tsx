import { BlockContent } from 'web-components/src/components/block-content';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import { useTokenEconomicsStyles } from './TokenEconomics.styles';

import { TokenEconomicsSectionFieldsFragment } from '@/generated/sanity-graphql';

type Props = {
  tokenEconomicsData?: TokenEconomicsSectionFieldsFragment['tokenEconomics'];
};

const TokenEconomics = ({ tokenEconomicsData }: Props): JSX.Element => {
  const { classes: styles } = useTokenEconomicsStyles();

  return (
    <Section
      title={
        <Title variant="h2" mobileVariant="h3">
          {tokenEconomicsData?.title}
        </Title>
      }
      classes={{ root: styles.root }}
    >
      <Body
        as="div"
        size="xl"
        mobileSize="md"
        sx={{
          width: ['100%', '80%'],
          maxWidth: 946,
        }}
      >
        <BlockContent content={tokenEconomicsData?.bodyRaw} />
      </Body>
    </Section>
  );
};

export default TokenEconomics;
