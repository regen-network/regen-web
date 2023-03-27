import { Box, Card, CardMedia, SxProps } from '@mui/material';

import { Flex } from '../../../components/box';
import ContainedButton from '../../../components/buttons/ContainedButton';
import { LinkComponentProp } from '../../../components/tabs/IconTabs';
import { Body, Title } from '../../../components/typography';
import { pxToRem, Theme } from '../../../theme/muiTheme';
import CardRibbon from '../../atoms/CardRibbon';
import { EcologicalCreditCardInfo } from './EcologicalCreditCard.Info';
import { EcologicalCreditCardItemList } from './EcologicalCreditCard.ItemList';
import { EcologicalCreditCardType } from './EcologicalCreditCard.types';

export interface EcologicalCreditCardProps extends EcologicalCreditCardType {
  linkComponent?: LinkComponentProp;
  sx?: SxProps<Theme>;
}

const EcologicalCreditCard = ({
  type,
  image,
  title,
  infos,
  description,
  offsetMethodList,
  projectActivitesList,
  button,
  linkComponent,
  sx = [],
}: EcologicalCreditCardProps): JSX.Element => {
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
        <CardMedia
          src={image.src}
          component="img"
          alt={image.alt}
          sx={{
            height: { xs: 216, md: '100%' },
            width: { xs: '100%', md: 400 },
          }}
        />
        <CardRibbon
          icon={type.icon}
          label={type.name}
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
            label={projectActivitesList.label}
            items={projectActivitesList.items}
            sx={{ width: 318 }}
          />
        </Flex>
        {button?.text && (
          <ContainedButton
            href={button.href}
            LinkComponent={linkComponent}
            sx={{ width: 'fit-content' }}
          >
            {button.text}
          </ContainedButton>
        )}
      </Box>
    </Card>
  );
};

export { EcologicalCreditCard };
