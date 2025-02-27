import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import ReadMore from 'web-components/src/components/read-more';
import { Label, Title } from 'web-components/src/components/typography';

import { LESS, MORE, READ } from 'lib/constants/shared.constants';

import { useProjectStorySectionStyles } from './ProjectStorySection.styles';
import { StoryTextProps } from './ProjectStorySection.types';

export function StoryText({
  storyTitle,
  story,
  hasMedia,
}: StoryTextProps): JSX.Element {
  const { classes } = useProjectStorySectionStyles();
  const { _ } = useLingui();

  return (
    <Grid
      item
      xs={12}
      md={hasMedia ? 6 : 12}
      sx={{
        ...(hasMedia && { pr: { sm: 10 } }),
        ...(!hasMedia && { maxWidth: { sm: 752 } }),
        margin: 'auto',
      }}
    >
      <Label size="sm" mobileSize="sm" color="info.main">
        <Trans>story</Trans>
      </Label>
      <Title variant="h3" mobileVariant="h5" sx={{ py: 2.5 }}>
        {storyTitle}
      </Title>
      <ReadMore
        mobileSize="md"
        maxLength={450}
        restMinLength={300}
        applyExpandedClass={233}
        classes={
          hasMedia
            ? { textContainer: classes.readMore, expanded: classes.expanded }
            : undefined
        }
        text={_(READ)}
        lessText={_(LESS)}
        moreText={_(MORE)}
        buttonClassName="text-sc-text-link hover:text-sc-text-link"
        className={hasMedia ? '' : 'mb-0'}
      >
        {story}
      </ReadMore>
    </Grid>
  );
}
