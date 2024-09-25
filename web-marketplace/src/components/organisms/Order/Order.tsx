import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Avatar, CardContent, CardHeader, useTheme } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import ReceiptIcon from 'web-components/src/components/icons/ReceiptIcon';
import { Image } from 'web-components/src/components/image';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import { Title } from 'web-components/src/components/typography';

import { ORDER_STATUS } from './Order.constants';
import { OrderLabel } from './Order.Label';
import { OrderSummary } from './Order.Summary';
import { OrderDataProps, RetirementInfoData } from './Order.types';

export const Order = (orderData: OrderDataProps) => {
  const theme = useTheme();
  const { _ } = useLingui();

  const { project } = orderData;
  const { retirementInfo, blockchainDetails, credits, paymentInfo, status } =
    orderData.order;
  const isRetirementTradable =
    (retirementInfo.data as RetirementInfoData).tradableCredits !== null;
  return (
    <Card className="bg-grey-100 border-[1px] border-grey-200">
      <CardHeader
        className="flex flex-col items-start md:items-center justify-between md:flex-row p-30 border-solid border-0 border-b-[1px] border-grey-200"
        avatar={
          <Avatar
            sx={{
              bgcolor: 'transparent',
              borderRadius: '10px',
              width: '156px',
              height: '120px',
              position: 'relative',
            }}
          >
            {project.prefinance && (
              <PrefinanceTag classNames={{ root: 'z-50 absolute top-10' }} />
            )}
            <Image className="z-40" src={project.imageSrc} width={156} />
          </Avatar>
        }
        action={
          <div className="flex flex-wrap md:flex-col gap-10">
            {!isRetirementTradable && (
              <OutlinedButton size="small">
                <CertifiedDocumentIcon className="mr-5" />
                <Trans>certificate</Trans>
              </OutlinedButton>
            )}
            {/* TODO - implement View receipt */}
            {/* <OutlinedButton size="small">
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
            <div className="flex flex-col md:flex-row items-center">
              <OrderLabel
                type={status}
                // eslint-disable-next-line lingui/no-unlocalized-strings
                wrapperClassName="place-self-start md:place-self-center"
              />
              <p className="ml-5 text-xs text-grey-700">{`${
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
          credits={credits}
          paymentInfo={paymentInfo}
        />
      </CardContent>
    </Card>
  );
};
