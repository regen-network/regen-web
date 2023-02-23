import { Box, SxProps } from '@mui/material';

import { BlockContent } from '../../../components/block-content';
import ContainedButton from '../../../components/buttons/ContainedButton';
import { Body, Subtitle } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { ButtonType } from '../../../types/shared/buttonType';
import { ImageType } from '../../../types/shared/imageType';

export interface Props {
  title: string;
  description: string | JSX.Element;
  image?: ImageType;
  button: ButtonType;
  note?: string | JSX.Element;
  sx?: SxProps<Theme>;
}

const ActionCard = ({
  title,
  description,
  image,
  button,
  note,
  sx = [],
}: Props): JSX.Element => {
  return (
    <Box
      sx={[
        {
          maxWidth: 500,
          borderRadius: '5px',
          background: theme =>
            image ? `url(${image.src}), ${theme.palette.primary.main}` : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom 0 right 0',
          boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.15)',
          border: theme => `1px solid ${theme.palette.grey[100]}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ p: 7.5 }}>
        <Box sx={{ maxWidth: 275 }}>
          <Subtitle size="xl" sx={{ mb: 2 }}>
            {title}
          </Subtitle>
          <Body as="div" sx={{ mb: 5 }}>
            <BlockContent content={description} />
          </Body>
          <ContainedButton size="small" onClick={button.onClick}>
            {button.text}
          </ContainedButton>
          {note && (
            <Body as="div" sx={{ mt: 2.5 }}>
              <BlockContent content={note} />
            </Body>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { ActionCard };
