import Link from 'next/link';

import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import { usePressKitTeamStyles } from './PresskitTeamSection.styles';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';
import { TeamSection } from '@/components/organisms/TeamSection/TeamSection';
import {
  PressKitTeamSectionFieldsFragment,
  RegenTeamMember,
} from '@/generated/sanity-graphql';
import waterfallImage from '@/public/images/press-kit/waterfall-bg.png';

type Props = {
  teamSectionData?: PressKitTeamSectionFieldsFragment['teamSection'];
};

const PressKitTeamSection = ({ teamSectionData }: Props): JSX.Element => {
  const { classes: styles } = usePressKitTeamStyles();
  const content = teamSectionData;
  const members = !!content?.members ? content.members : [];
  return (
    <BackgroundImage src={waterfallImage}>
      <TeamSection
        gridMd={3}
        titleClassName={styles.title}
        bgUrl={'/images/press-kit/press-kit-team-bg.png'}
        members={members as RegenTeamMember[]}
        title={content?.header || ''}
      >
        <ContainedButton href="/team" size="large" LinkComponent={Link}>
          {content?.buttonText}
        </ContainedButton>
      </TeamSection>
    </BackgroundImage>
  );
};

export default PressKitTeamSection;
