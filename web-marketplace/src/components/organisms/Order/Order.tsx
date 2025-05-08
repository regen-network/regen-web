import { useMemo, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { CardContent, CardHeader, useTheme } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import ReceiptIcon from 'web-components/src/components/icons/ReceiptIcon';
import { Image } from 'web-components/src/components/image';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';
import { API_URI, IMAGE_STORAGE_BASE_URL } from 'lib/env';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { Link } from 'components/atoms';
import { findDisplayDenom } from 'components/molecules/DenomLabel/DenomLabel.utils';

import { OrderCryptoReceiptModal } from '../OrderCryptoReceiptModal/OrderCryptoReceiptModal';
import { ORDER_STATUS } from './Order.constants';
import { OrderLabel } from './Order.Label';
import { OrderSummary } from './Order.Summary';
import { OrderProps } from './Order.types';

export const Order = ({ orderData, allowedDenoms, className }: OrderProps) => {
  const theme = useTheme();
  const { _ } = useLingui();

  const { project } = orderData;
  const {
    retirementInfo,
    blockchainDetails,
    credits,
    paymentInfo,
    status,
    receiptUrl,
  } = orderData.order;

  const [cryptoReceiptModalOpen, setCryptoReceiptModalOpen] = useState(false);

  const isPrefinanceProject = project.projectPrefinancing?.isPrefinanceProject;
  const projectHref = `/project/${project.slug ?? project.id}`;

  const denom = allowedDenoms?.find(
    denom => denom.bankDenom === paymentInfo.askDenom,
  );
  const displayTotalPrice = denom
    ? +(+credits.totalPrice * Math.pow(10, -denom.exponent)).toFixed(
        denom.exponent,
      )
    : +credits.totalPrice;

  const currency = {
    askDenom: paymentInfo.askDenom,
    askBaseDenom: paymentInfo.askBaseDenom,
  };

  const displayDenom = useMemo(
    () =>
      findDisplayDenom({
        allowedDenoms,
        bankDenom: paymentInfo.askDenom,
        baseDenom: paymentInfo.askBaseDenom,
      }),
    [allowedDenoms, paymentInfo.askBaseDenom, paymentInfo.askDenom],
  );

  const pricePerCredits = +displayTotalPrice / +credits.credits;

  return (
    <>
      <Card
        id={blockchainDetails.blockchainRecord}
        className={cn(
          'bg-grey-100 border-[1px] border-bc-neutral-300',
          className,
        )}
      >
        <CardHeader
          sx={{
            '.MuiCardHeader-avatar': {
              width: { xs: '100%', tablet: 'auto' },
            },
          }}
          className="w-full flex flex-col items-start md:items-center justify-between md:flex-row p-15 sm:p-30 border-solid border-0 border-b-[1px] border-bc-neutral-300"
          avatar={
            <div className="w-full h-[178px] md:w-[156px] md:h-full">
              {isPrefinanceProject && (
                <PrefinanceTag
                  bodyTexts={getProjectCardBodyTextMapping(_)}
                  classNames={{ root: 'z-50 absolute top-10' }}
                />
              )}
              <Link href={projectHref}>
                <Image
                  className="z-40 w-full h-full object-cover rounded-[10px]"
                  src={project.imgSrc}
                  imageStorageBaseUrl={IMAGE_STORAGE_BASE_URL}
                  apiServerUrl={API_URI}
                />
              </Link>
            </div>
          }
          action={
            <div className="flex flex-wrap sm:flex-col gap-10 pb-5">
              {retirementInfo.retiredCredits &&
                retirementInfo.certificateNodeId && (
                  <Link
                    href={`/certificate/${retirementInfo.certificateNodeId}`}
                  >
                    <OutlinedButton size="small" className="w-full">
                      <CertifiedDocumentIcon className="mr-5" />
                      <Trans>certificate</Trans>
                    </OutlinedButton>
                  </Link>
                )}
              {receiptUrl ? (
                <Link href={receiptUrl}>
                  <OutlinedButton size="small" className="w-full">
                    <ReceiptIcon className="mr-5" />
                    <Trans>View Receipt</Trans>
                  </OutlinedButton>
                </Link>
              ) : (
                // TODO - implement View receipt & Print receipt
                // <OutlinedButton
                //   size="small"
                //   onClick={() => {
                //     setCryptoReceiptModalOpen(true);
                //   }}
                // >
                //   <ReceiptIcon className="mr-5" />
                //   <Trans>View Receipt</Trans>
                // </OutlinedButton>
                <></>
              )}
            </div>
          }
          title={
            <Title
              variant="h2"
              className="mt-10 md:mt-0 mb-5 text-[21px] leading-[1.5] md:pr-10"
            >
              <Link href={projectHref} className="text-bc-neutral-700">
                {project.name}
              </Link>
            </Title>
          }
          subheader={
            <>
              <div className="flex items-center my-5 md:pr-10">
                <ProjectPlaceInfo
                  place={project.place}
                  area={project.area}
                  iconClassName="mr-5"
                  areaUnit={getAreaUnit(
                    project.areaUnit as qudtUnit | undefined,
                    project.area,
                  )}
                  fontSize="13px"
                  color={theme.palette.primary.contrastText}
                />
              </div>
              <div className="flex flex-row items-center mb-20 md:mb-0">
                <OrderLabel
                  type={status}
                  // eslint-disable-next-line lingui/no-unlocalized-strings
                  wrapperClassName="place-self-start md:place-self-center"
                />
                <p className="m-0 ml-5 text-xs text-grey-700">{`${
                  status === ORDER_STATUS.pending
                    ? _(msg`Expected delivery date`)
                    : ''
                } ${project.deliveryDate}`}</p>
              </div>
            </>
          }
        />
        <CardContent className="p-15 pt-40 sm:p-30 bg-grey-0">
          <OrderSummary
            retirementInfo={retirementInfo}
            blockchainDetails={blockchainDetails}
            credits={credits.credits}
            paymentInfo={paymentInfo}
            displayDenom={displayDenom}
            displayTotalPrice={displayTotalPrice}
            currency={currency}
            pricePerCredits={
              denom ? +pricePerCredits.toFixed(denom.exponent) : pricePerCredits
            }
          />
        </CardContent>
      </Card>
      {cryptoReceiptModalOpen && (
        <OrderCryptoReceiptModal
          onClose={setCryptoReceiptModalOpen}
          open={cryptoReceiptModalOpen}
          modalContent={{
            displayDenom,
            currency,
            price: displayTotalPrice,
            project: {
              name: project.name,
              projectHref,
            },
            amount: credits.credits,
            date: blockchainDetails.purchaseDate,
            retiredCredits: retirementInfo.retiredCredits,
          }}
        />
      )}
    </>
  );
};
