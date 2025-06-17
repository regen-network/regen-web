import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { SOLD_OUT_TOOLTIP } from 'legacy-pages/Projects/AllProjects/AllProjects.constants';

import { BlockContent } from 'web-components/src/components/block-content';
import { TextButton } from 'web-components/src/components/buttons/TextButton';
import SmallArrowIcon from 'web-components/src/components/icons/SmallArrowIcon';
import SuccessIcon from 'web-components/src/components/icons/SuccessIcon';
import { LabeledValue } from 'web-components/src/components/text-layouts';
import { Body, Title } from 'web-components/src/components/typography';

import { ProjectPrefinancing } from 'generated/sanity-graphql';
import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';

import {
  CLASS_STATUS,
  CLASS_TIMELINE,
  PREFINANCE_TERMS,
  PROJECT_STATUS,
  PROJECT_TIMELINE,
  PROJECTED_CREDIT_DELIVERY_DATE,
  PROJECTED_CREDIT_DELIVERY_DATE_TOOLTIP,
  SEE_PURCHASE_AGREEMENTS,
  SUPPORT_ENABLES,
} from './ProjectDetails.constant';
import { PrefinanceStatus } from './ProjectDetails.PrefinanceStatus';

type Props = {
  projectPrefinancing: ProjectPrefinancing;
  isSoldOut: boolean;
};

export const Prefinance = ({ projectPrefinancing, isSoldOut }: Props) => {
  const { _ } = useLingui();
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
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);

  return (
    <>
      {isPrefinanceProject && (
        <div className="rounded-[10px] relative sm:py-50 px-20 pt-[170px] pb-50 rounded-10 bg-prefinance-gradient shadow-[0px_0px_20px_0px_rgba(0,0,0,0.05)]">
          <div className="relative z-[1]">
            <Title variant="h4">{_(PREFINANCE_TERMS)}</Title>
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
                    {_(SEE_PURCHASE_AGREEMENTS)}&nbsp;
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

          <div className="grid grid-cols-1 md:grid-cols-2 pt-40 gap-40 md:gap-y-50 md:gap-x-auto pb-40 sm:pb-50">
            {estimatedIssuance && (
              <LabeledValue
                label={bodyTexts.estimatedIssuance}
                tooltipLabel={bodyTexts.estimatedIssuanceTooltip}
                number={estimatedIssuance}
                formatNumberOptions={{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                icon={
                  <img
                    src="/svg/estimated-issuance.svg"
                    alt={bodyTexts.estimatedIssuance}
                  />
                }
                tooltipNumber={isSoldOut ? _(SOLD_OUT_TOOLTIP) : undefined}
                badgeLabel={isSoldOut ? bodyTexts.soldOut : undefined}
              />
            )}
            {projectedCreditDeliveryDate && (
              <LabeledValue
                label={_(PROJECTED_CREDIT_DELIVERY_DATE)}
                tooltipLabel={_(PROJECTED_CREDIT_DELIVERY_DATE_TOOLTIP)}
                date={projectedCreditDeliveryDate}
                formatDateOption="MMM YYYY"
                icon={
                  <img
                    src="/svg/calendar.svg"
                    alt={_(PROJECTED_CREDIT_DELIVERY_DATE)}
                  />
                }
              />
            )}

            {projectTimeline && (
              <LabeledValue label={_(PROJECT_STATUS)}>
                <PrefinanceStatus
                  timeline={projectTimeline}
                  title={_(PROJECT_TIMELINE)}
                />
              </LabeledValue>
            )}
            {classTimeline && (
              <LabeledValue label={_(CLASS_STATUS)}>
                <PrefinanceStatus
                  timeline={classTimeline}
                  title={_(CLASS_TIMELINE)}
                />
              </LabeledValue>
            )}
          </div>

          <Title className="pb-5" variant="h4">
            {_(SUPPORT_ENABLES)}
          </Title>
          {supportEnables?.map((item, i) => (
            <div className="flex pt-10" key={i}>
              <SuccessIcon className="text-brand-400 w-[16px] h-[16px] mr-5 sm:mr-10 mt-3" />
              <Body size="md" mobileSize="md">
                {item}
              </Body>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
