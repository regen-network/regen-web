import { ButtonBase } from '@mui/material';

import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import { Title } from 'web-components/src/components/typography';
import { LinkType } from 'web-components/src/types/shared/linkType';

type InfoTemplateProps = {
  upperContent?: JSX.Element;
  title: string;
  imgSrc: string;
  imgAlt: string;
  description: string | JSX.Element;
  children: JSX.Element;
  learnMoreLink: LinkType;
};

export const InfoTemplate = ({
  upperContent,
  title,
  imgSrc,
  imgAlt,
  description,
  learnMoreLink,
  children,
}: InfoTemplateProps) => {
  return (
    <div className="sm:px-30 px-20 pb-40 border-solid border border-sc-card-standard-stroke rounded-b-10 bg-card-standard-background">
      {!!upperContent && upperContent}
      <div className={!upperContent ? 'mt-30 sm:mt-50' : undefined}>
        <div className="gap-[10px] flex items-center">
          <Title variant="h3" mobileVariant="h5">
            {title}
          </Title>
          <img src={imgSrc} alt={imgAlt} className="h-50 w-50" />
        </div>
        <div className="my-10">{description}</div>
        <ButtonBase
          href={learnMoreLink.href}
          target="_blank"
          className="cursor-pointer font-montserrat text-sc-text-link font-extrabold text-[14px] tracking-[1px] uppercase mb-[30px]"
        >
          {learnMoreLink.text}
          <SmallArrowIcon sx={{ width: '7px', ml: '4px' }} />
        </ButtonBase>
        {children}
      </div>
    </div>
  );
};
