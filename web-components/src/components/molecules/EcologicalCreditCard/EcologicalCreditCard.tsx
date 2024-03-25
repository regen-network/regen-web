import { Box, Card, SxProps } from '@mui/material';

import { Flex } from '../../../components/box';
import ContainedButton from '../../../components/buttons/ContainedButton';
import OutlinedButton from '../../../components/buttons/OutlinedButton';
import { LinkComponentProp } from '../../../components/tabs/IconTabs';
import { Body, Title } from '../../../components/typography';
import { pxToRem, Theme } from '../../../theme/muiTheme';
import CardRibbon from '../../atoms/CardRibbon';
import { EcologicalCreditCardInfo } from './EcologicalCreditCard.Info';
import { EcologicalCreditCardItemList } from './EcologicalCreditCard.ItemList';
import { EcologicalCreditCardType } from './EcologicalCreditCard.types';

export interface EcologicalCreditCardProps extends EcologicalCreditCardType {
  linkComponent?: LinkComponentProp;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const EcologicalCreditCard = ({
  creditCategory,
  title,
  infos,
  description,
  offsetMethodList,
  projectActivitiesList,
  button,
  secondaryButton,
  linkComponent,
  children,
  sx = [],
}: EcologicalCreditCardProps): JSX.Element => {
  const hasItems =
    offsetMethodList.items.length > 0 || projectActivitiesList.items.length > 0;

  return (
    <Card
      sx={[
        {
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          background: 'grey.50',
          boxShadow: theme => theme.shadows[1],
          borderRadius: '10px',
          border: '1px solid',
          borderColor: 'grey.100',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ position: 'relative' }}>
        {children}
        <CardRibbon
          icon={creditCategory.icon}
          label={creditCategory.name}
          sx={{ position: 'absolute', left: 0, top: 48 }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: { xs: 5, sm: 10 },
          pt: { xs: 5, sm: 10 },
          pb: { xs: 7.5, sm: 10 },
        }}
      >
        <Title variant="h3" sx={{ mb: { xs: 3.5, sm: 5 } }}>
          {title}
        </Title>
        <EcologicalCreditCardInfo
          infos={infos}
          sx={{ mb: { xs: 3.5, sm: 5 } }}
        />
        <Body sx={{ mb: { xs: 3.5, sm: 5 }, fontSize: pxToRem(18) }}>
          {description}
        </Body>
        {hasItems && (
          <Flex
            sx={{ mb: { xs: 4, sm: 9 } }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <EcologicalCreditCardItemList
              label={offsetMethodList.label}
              items={offsetMethodList.items}
              sx={{ width: 318, mr: 5, mb: { xs: 5, sm: 0 } }}
            />
            <EcologicalCreditCardItemList
              label={projectActivitiesList.label}
              items={projectActivitiesList.items}
              sx={{ width: 318 }}
            />
          </Flex>
        )}
        <div className="flex flex-col sm:flex-row">
          {button?.text && (
            <ContainedButton
              href={button.href}
              LinkComponent={linkComponent}
              sx={{
                width: { xs: 'w-full', sm: 'fit-content' },
                mb: { xs: 5, sm: 0 },
              }}
            >
              {button.text}
            </ContainedButton>
          )}
          {secondaryButton?.text && (
            <OutlinedButton
              href={secondaryButton.href}
              LinkComponent={linkComponent}
              sx={{
                width: { xs: 'w-full', sm: 'fit-content' },
                ml: { xs: 0, sm: 5 },
              }}
            >
              {secondaryButton.text}
            </OutlinedButton>
          )}
        </div>
      </Box>
    </Card>
  );
};

export { EcologicalCreditCard };
