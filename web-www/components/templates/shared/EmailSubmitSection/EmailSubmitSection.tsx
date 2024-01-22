import clsx from 'clsx';

import { BlockContent } from 'web-components/src/components/block-content';
import NewsletterForm from 'web-components/src/components/form/NewsletterForm';
import { Label, Title } from 'web-components/src/components/typography';

import { useEmailSubmitSectionStyles } from './EmailSubmitSection.styles';

import { BackgroundImage } from '@/components/organisms/BackgroundImage/BackgroundImage';
import { SharedNewsletterSectionFieldsFragment } from '@/generated/sanity-graphql';
import deerNewsletterBg from '@/public/images/token/deer-newsletter-bg.png';

interface Content {
  header?: string;
  description?: string;
  buttonText?: string;
  inputText?: string;
}

type Props = {
  altContent?: Content;
  sharedNewsletterData?: SharedNewsletterSectionFieldsFragment['newsletter'];
};

const EmailSubmitSection = ({ altContent, sharedNewsletterData }: Props) => {
  const { classes: styles } = useEmailSubmitSectionStyles();
  const content = sharedNewsletterData;
  return (
    <BackgroundImage
      src={deerNewsletterBg}
      component="section"
      sx={{ background: '#040e18' }}
    >
      <div className={clsx(styles.root)} id="newsletter-signup">
        <Title
          variant="h2"
          mobileVariant="h3"
          sx={{ color: 'primary.main', textAlign: 'center' }}
        >
          {altContent?.header || content?.title}
        </Title>
        <Label
          as="div"
          sx={{
            color: 'primary.main',
            textAlign: 'center',
            pt: [5, 7.5],
            pb: [4, 6.25],
          }}
        >
          {altContent?.description ? (
            altContent.description
          ) : (
            <BlockContent content={content?.bodyRaw} />
          )}
        </Label>
        <NewsletterForm
          apiUri={process.env.NEXT_PUBLIC_API_URI}
          submitLabel={altContent?.buttonText}
          inputPlaceholder={altContent?.inputText}
          buttonSize="large"
          buttonClassName={styles.button}
        />
      </div>
    </BackgroundImage>
  );
};

export default EmailSubmitSection;
