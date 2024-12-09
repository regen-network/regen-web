import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CardContent, CardHeader, useTheme } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import Card from 'web-components/src/components/cards/Card';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
// import ReceiptIcon from 'web-components/src/components/icons/ReceiptIcon';
import { Image } from 'web-components/src/components/image';
import ProjectPlaceInfo from 'web-components/src/components/place/ProjectPlaceInfo';
import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';
import { Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';
import { API_URI, IMAGE_STORAGE_BASE_URL } from 'lib/env';
import { getAreaUnit, qudtUnit } from 'lib/rdf';

import { Link } from 'components/atoms';

import { ORDER_STATUS } from './Order.constants';
import { OrderLabel } from './Order.Label';
import { OrderSummary } from './Order.Summary';
import { OrderProps } from './Order.types';

export const Order = ({ orderData, allowedDenoms, className }: OrderProps) => {
  const theme = useTheme();
  const { _ } = useLingui();

  const { project } = orderData;
  const { retirementInfo, blockchainDetails, credits, paymentInfo, status } =
    orderData.order;

  const isPrefinanceProject = project.projectPrefinancing?.isPrefinanceProject;
  const projectHref = `/project/${project.slug ?? project.id}`;

  return (
    <Card
      className={cn(
        'bg-grey-100 border-[1px] border-bc-neutral-300',
        className,
      )}
    >
      <CardHeader
        sx={{
          '.MuiCardHeader-avatar': {
            width: { xs: '100%', sm: 'auto' },
          },
        }}
        className="w-full flex flex-col items-start sm:items-center justify-between sm:flex-row p-15 sm:p-30 border-solid border-0 border-b-[1px] border-bc-neutral-300"
        avatar={
          <div className="w-full h-[178px] sm:w-[156px] sm:h-full">
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
          <div className="flex flex-wrap md:flex-col gap-10">
            {retirementInfo.retiredCredits && retirementInfo.certificateNodeId && (
              <Link href={`/certificate/${retirementInfo.certificateNodeId}`}>
                <OutlinedButton size="small" className="w-full sm:w-auto">
                  <CertifiedDocumentIcon className="mr-5" />
                  <Trans>certificate</Trans>
                </OutlinedButton>
              </Link>
            )}
            {/* TODO - implement View receipt */}
            {/* <OutlinedButton size="small" className="w-full sm:w-auto">
              <ReceiptIcon className="mr-5" /> <Trans>View Receipt</Trans>
            </OutlinedButton> */}
          </div>
        }
        title={
          <Title variant="h5" className="mt-10 sm:mt-0 mb-5">
            <Link href={projectHref} className="text-bc-neutral-700">
              {project.name}
            </Link>
          </Title>
        }
        subheader={
          <>
            <div className="flex items-center my-5">
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
      <CardContent className="p-15 sm:p-30 bg-grey-0">
        <OrderSummary
          retirementInfo={retirementInfo}
          blockchainDetails={blockchainDetails}
          creditsData={credits}
          paymentInfo={paymentInfo}
          allowedDenoms={allowedDenoms}
        />
      </CardContent>
    </Card>
  );
};
