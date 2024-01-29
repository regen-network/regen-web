import { ReactNode } from 'react';
import { useTheme } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import Section from 'web-components/src/components/section';

import { useFaqSectionStyles } from './SharedFaqSection.styles';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';

interface FAQSectionProps {
  category?: string;
  imageData: string;
  header: string;
  children?: ReactNode;
}

const SharedFaqSection = ({
  header,
  imageData,
  category,
  children,
}: FAQSectionProps): JSX.Element => {
  const { classes } = useFaqSectionStyles();
  const theme = useTheme();
  return (
    <BackgroundImage src={imageData}>
      <Section
        classes={{
          root: clsx(classes.root, children && classes.withChildren),
          title: classes.title,
        }}
        titleColor={theme.palette.primary.main}
        title={header}
      >
        {children ? (
          <div className={classes.children}>{children}</div>
        ) : (
          <div className={classes.button}>
            <Link href={`/faq/${category || ''}`}>
              <ContainedButton>view faq</ContainedButton>
            </Link>
          </div>
        )}
      </Section>
    </BackgroundImage>
  );
};

export default SharedFaqSection;
