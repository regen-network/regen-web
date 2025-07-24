import { Box } from '@mui/material';

import { RoundLogo } from '../../../components/atoms/RoundLogo/RoundLogo';
import { Label, Subtitle } from '../../../components/typography';
import { LinkWrapper } from './RoundLogoItemsList.LinkWrapper';
import { RoundLogoItemsListType } from './RoundLogoItemsList.types';

export type Props = RoundLogoItemsListType & {
  className?: string;
};

const RoundLogoItemsList = ({
  title,
  items,
  className,
}: Props): JSX.Element => {
  const hasItems = items?.length > 0;
  return (
    <>
      {hasItems && (
        <div className={className}>
          <Label size="xs" sx={{ mb: 3.75, fontSize: 11 }}>
            {title}
          </Label>
          <Box
            component="ul"
            sx={{ listStyleType: 'none', paddingInlineStart: 0 }}
          >
            {items.map(({ image, link }) => (
              <Box
                component="li"
                key={link.text}
                sx={{
                  mb: 3.75,
                  display: 'flex',
                  alignItems: 'center',
                  ':last-child': {
                    mb: 0,
                  },
                }}
              >
                <LinkWrapper link={link}>
                  <RoundLogo image={image} className="mr-10" />
                  <Subtitle color="primary.light" size="lg">
                    {link.text}
                  </Subtitle>
                </LinkWrapper>
              </Box>
            ))}
          </Box>
        </div>
      )}
    </>
  );
};

export { RoundLogoItemsList };
