import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
// import ReceiptIcon from 'web-components/src/components/icons/ReceiptIcon';
import { Image } from 'web-components/src/components/image';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import { Title } from 'web-components/src/components/typography';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';

import { ORDER_STATUS } from './Order.constants';
import { OrderLabel } from './Order.Label';
import { OrderSummary } from './Order.Summary';
import { OrderDataProps, RetirementInfoData } from './Order.types';

export const Order = (orderData: OrderDataProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { _ } = useLingui();

  const { project } = orderData;
  const { retirementInfo, blockchainDetails, credits, paymentInfo, status } =
    orderData.order;
  const isRetirementTradable =
    (retirementInfo.data as RetirementInfoData).tradableCredits !== null;
  return (
    <Card className="bg-grey-100 border-[1px] border-grey-200">
      {isMobile && (
        <>
          {project.prefinance && (
            <PrefinanceTag
              bodyTexts={getProjectCardBodyTextMapping(_)}
              classNames={{ root: 'z-50 absolute top-35 left-[17px]' }}
            />
          )}
          <CardMedia
            className="h-[140px]"
            image={project.imageSrc}
            title={project.name}
          />
        </>
      )}
      <CardHeader
        className="flex flex-col items-start md:items-center justify-between md:flex-row p-15 sm:p-30 border-solid border-0 border-b-[1px] border-grey-200"
        avatar={
          !isMobile ? (
            <Avatar
              sx={{
                bgcolor: 'transparent',
                borderRadius: '10px',
                width: '156px',
                height: '120px',
                position: 'relative',
                [theme.breakpoints.down('tablet')]: {
                  width: '100%',
                  height: '80px',
                },
              }}
            >
              {project.prefinance && (
                <PrefinanceTag
                  bodyTexts={getProjectCardBodyTextMapping(_)}
                  classNames={{ root: 'z-50 absolute top-10' }}
                />
              )}
              <Image
                className="z-40 w-full h-auto max-w-full max-h-full object-contain"
                src={project.imageSrc}
                width={1560}
              />
            </Avatar>
          ) : (
            <></>
          )
        }
        action={
          <div className="flex flex-wrap md:flex-col gap-10">
            {!isRetirementTradable && (
              <OutlinedButton size="small" className="w-full sm:w-auto">
                <CertifiedDocumentIcon className="mr-5" />
                <Trans>certificate</Trans>
              </OutlinedButton>
            )}
            {/* TODO - implement View receipt */}
            {/* <OutlinedButton size="small" className="w-full sm:w-auto">
              <ReceiptIcon className="mr-5" /> <Trans>View Receipt</Trans>
            </OutlinedButton> */}
          </div>
        }
        title={
          <Title variant="h5" className="mb-5">
            {project.name}
          </Title>
        }
        subheader={
          <>
            <div className="flex items-center my-5">
              <ProjectPlaceInfo
                place={project.placeName}
                area={project.area}
                iconClassName="mr-5"
                areaUnit={project.areaUnit}
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
              } ${project.date}`}</p>
            </div>
          </>
        }
      />
      <CardContent className="p-15 md:p-30 bg-grey-0">
        <OrderSummary
          retirementInfo={retirementInfo}
          blockchainDetails={blockchainDetails}
          creditsData={credits}
          paymentInfo={paymentInfo}
        />
      </CardContent>
    </Card>
  );
};
