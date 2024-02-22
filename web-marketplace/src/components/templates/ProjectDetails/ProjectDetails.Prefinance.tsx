import { BlockContent } from 'web-components/src/components/block-content';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import {
  ESTIMATED_ISSUANCE,
  ESTIMATED_ISSUANCE_TOOLTIP,
} from 'web-components/src/components/cards/ProjectCard/ProjectCard.constants';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import SuccessIcon from 'web-components/src/components/icons/SuccessIcon';
import { LabeledValue } from 'web-components/src/components/text-layouts';
import { Body, Title } from 'web-components/src/components/typography';

import { ProjectPrefinancing } from 'generated/sanity-graphql';

import {
  CLASS_STATUS,
  PREFINANCE_TERMS,
  PROJECT_STATUS,
  PROJECTED_CREDIT_DELIVERY_DATE,
  PROJECTED_CREDIT_DELIVERY_DATE_TOOLTIP,
  SEE_PURCHASE_AGREEMENTS,
  SUPPORT_ENABLES,
} from './ProjectDetails.constant';
import { PrefinanceStatus } from './ProjectDetails.PrefinanceStatus';

type Props = {
  projectPrefinancing: ProjectPrefinancing;
};

export const Prefinance = ({ projectPrefinancing }: Props) => {
  const {
    isPrefinanceProject,
    prefinanceTermsRaw,
    purchaseAgreementLink,
    supportEnables,
    estimatedIssuance,
    projectedCreditDeliveryDate,
    projectTimeline,
    classTimeline,
  } = projectPrefinancing;

  return (
    <>
      {isPrefinanceProject && (
        <div className="rounded-[10px] relative sm:py-50 px-20 pt-[170px] pb-50 rounded-10 bg-prefinance-gradient shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="relative z-[1]">
            <Title variant="h4">{PREFINANCE_TERMS}</Title>
            <Body className="mt-10 sm:max-w-[504px]" size="lg">
              <BlockContent
                className="inline"
                sx={{
                  '& p:last-child': { display: 'inline' },
                }}
                content={prefinanceTermsRaw}
              />
              {purchaseAgreementLink && (
                <span>
                  &nbsp;
                  <TextButton
                    className="mb-1"
                    target="_blank"
                    rel="noreferrer noopener"
                    href={purchaseAgreementLink}
                    textSize="sm"
                  >
                    {SEE_PURCHASE_AGREEMENTS}&nbsp;
                    <SmallArrowIcon className="h-10" />
                  </TextButton>
                </span>
              )}
            </Body>
          </div>
          <img
            src="/svg/prefinancing.svg"
            alt="prefinancing"
            width="189"
            height="189"
            className="absolute top-50 left-[50%] translate-x-[-50%] sm:translate-x-[auto] sm:left-[auto] sm:right-0 sm:top-25"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 pt-40 pb-40 sm:pb-50 gap-40 md:gap-y-50 md:gap-x-auto pb-40 sm:pb-50">
            {estimatedIssuance && (
              <LabeledValue
                label={ESTIMATED_ISSUANCE}
                tooltipLabel={ESTIMATED_ISSUANCE_TOOLTIP}
                number={estimatedIssuance}
                formatNumberOptions={{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                icon={
                  <img
                    src="/svg/estimated-issuance.svg"
                    alt={ESTIMATED_ISSUANCE}
                  />
                }
              />
            )}
            {projectedCreditDeliveryDate && (
              <LabeledValue
                label={PROJECTED_CREDIT_DELIVERY_DATE}
                tooltipLabel={PROJECTED_CREDIT_DELIVERY_DATE_TOOLTIP}
                date={projectedCreditDeliveryDate}
                formatDateOption="MMM YYYY"
                icon={
                  <img
                    src="/svg/calendar.svg"
                    alt={PROJECTED_CREDIT_DELIVERY_DATE}
                  />
                }
              />
            )}

            {projectTimeline && (
              <LabeledValue label={PROJECT_STATUS}>
                <PrefinanceStatus timeline={projectTimeline} />
              </LabeledValue>
            )}
            {classTimeline && (
              <LabeledValue label={CLASS_STATUS}>
                <PrefinanceStatus timeline={classTimeline} />
              </LabeledValue>
            )}
          </div>

          <Title className="pb-5" variant="h4">
            {SUPPORT_ENABLES}
          </Title>
          {supportEnables?.map((item, i) => (
            <div key={i}>
              <Body size="md" mobileSize="md" className="pt-10">
                <SuccessIcon className="text-brand-400 w-[16px] h-[16px] mr-5 sm:mr-10" />
                {item}
              </Body>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
