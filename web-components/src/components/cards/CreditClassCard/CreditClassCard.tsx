import { Box, Card, CardMedia, SxProps } from '@mui/material';

import { CardRibbon } from '../../../components/atoms/CardRibbon/CardRibbon';
import { Flex } from '../../../components/box';
import InfoTooltipWithIcon from '../../../components/tooltip/InfoTooltipWithIcon';
import { Account } from '../../../components/user/UserInfoCard';
import { Theme } from '../../../theme/muiTheme';
import { LinkType } from '../../../types/shared/linkType';
import { parseText } from '../../../utils/textParser';
import { OptimizeImageProps } from '../../image';
import { Body, Subtitle, Title } from '../../typography';
import { ProgramImageChildren } from '../ProjectCard/ProjectCard.ImageChildren';
import {
  CREDIT_CLASS_TOOLTIP,
  METHODOLOGY,
  OFFSET_GENERATION_METHOD,
} from './CreditClassCard.constants';
import { CreditClassCardItem } from './CreditClassCard.Item';
import { useCreditClassCardStyles } from './CreditClassCard.styles';
import { CreditClassCardItemType } from './CreditClassCard.types';

export interface Props extends OptimizeImageProps {
  type?: CreditClassCardItemType;
  title: string | JSX.Element;
  description: string | JSX.Element;
  imgSrc: string;
  generationMethods?: CreditClassCardItemType[];
  methodology?: Partial<LinkType>;
  program?: Account;
  sx?: SxProps<Theme>;
}

const CreditClassCard = ({
  title,
  description,
  imgSrc,
  type,
  generationMethods,
  methodology,
  program,
  sx = [],
}: Props): JSX.Element => {
  const { classes } = useCreditClassCardStyles();

  return (
    <Box
      sx={[
        { display: 'block', width: '100%', maxWidth: 701 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Card
        elevation={1}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          border: '1px solid',
          borderColor: 'grey.100',
          borderRadius: '10px',
        }}
      >
        {type && (
          <CardRibbon
            icon={type.icon}
            label={type.name}
            labelSize="xs"
            labelMobileSize="xxs"
            sx={{
              position: 'absolute',
              left: 0,
              top: 30,
              zIndex: 1,
              py: { xs: 1, sm: 1.5 },
            }}
            sxIcon={{ with: 20, height: 20 }}
          />
        )}
        <Box className={classes.image}>
          <CardMedia
            image={imgSrc || ''}
            sx={{ with: '100%', height: '100%' }}
          />
          <ProgramImageChildren program={program} />
        </Box>
        <Box sx={{ px: { xs: 3.875, sm: 5 }, py: { xs: 5, sm: 7.5 } }}>
          <Subtitle
            size="xs"
            color="info.main"
            sx={{
              fontWeight: 800,
              mb: 3,
              letterSpacing: '1px',
              mt: [0, 2.5],
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {'CREDIT CLASS'}
            <InfoTooltipWithIcon
              title={CREDIT_CLASS_TOOLTIP}
              outlined
              sx={{ ml: 1, fontSize: 16 }}
            />
          </Subtitle>
          <Title variant="h5" mobileVariant="h6" as="div" sx={{ mb: 2 }}>
            {parseText(title)}
          </Title>
          <Body
            size="sm"
            mobileSize="xs"
            sx={{
              mb: 5,
              display: '-webkit-box',
              '-webkit-line-clamp': '3',
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
            }}
          >
            {parseText(description)}
          </Body>
          <Flex flexDirection={{ xs: 'column', sm: 'row' }}>
            {generationMethods && (
              <CreditClassCardItem
                label={OFFSET_GENERATION_METHOD}
                items={generationMethods}
                sx={{ maxWidth: { sm: 195 }, mr: 5, mb: { xs: 5, sm: 0 } }}
                sxListContainer={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                sxListItem={{ mb: 1 }}
              />
            )}
            {methodology && (
              <CreditClassCardItem
                label={METHODOLOGY}
                link={methodology}
                sx={{ maxWidth: { sm: 195 } }}
              />
            )}
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export { CreditClassCard };
