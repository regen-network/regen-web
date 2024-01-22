import { BlockContent } from 'web-components/src/components/block-content';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DecentralizeIcon from 'web-components/src/components/icons/DecentralizeIcon';
import Section from 'web-components/src/components/section';
import { Body, Title } from 'web-components/src/components/typography';

import { useBlockExplorerStyles } from './BlockExplorerSection.styles';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';
import { TokenBlockExplorerSectionFieldsFragment } from '@/generated/sanity-graphql';
import stonesBg from '@/public/images/token/stones-bg.png';

type Props = {
  blockExplorerData?: TokenBlockExplorerSectionFieldsFragment['blockExplorerSection'];
};

const BlockExplorerSection = ({ blockExplorerData }: Props): JSX.Element => {
  const { classes: styles } = useBlockExplorerStyles();

  return (
    <BackgroundImage src={stonesBg}>
      <Section classes={{ root: styles.root }}>
        <div className={styles.content}>
          <DecentralizeIcon />
          <Title
            variant="h2"
            mobileVariant="h3"
            sx={{
              color: 'primary.main',
              maxWidth: theme => theme.spacing(172),
              py: [7.5, 9.5],
            }}
          >
            {blockExplorerData?.title}
          </Title>
          <Body
            as="div"
            size="xl"
            align="center"
            sx={{ color: 'primary.main', px: [5, 0], pb: [7, 9.5] }}
          >
            <BlockContent content={blockExplorerData?.bodyRaw} />
          </Body>
          <ContainedButton
            size="large"
            className={styles.button}
            href={blockExplorerData?.button?.buttonLink?.buttonHref || ''}
            target="_blank"
          >
            {blockExplorerData?.button?.buttonText || ''}
          </ContainedButton>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default BlockExplorerSection;
