import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { ImageLeftCard } from 'web-components/lib/components/cards/ImageLeftCard';
import Description from 'web-components/lib/components/description';
import Title from 'web-components/lib/components/title';
import { Label } from 'web-components/lib/components/label';

const imageStorageBaseUrl = process.env.REACT_APP_IMAGE_STORAGE_BASE_URL;
const apiServerUrl = process.env.REACT_APP_API_URI;

interface DocumentationCardProps {
  mainTitle: string;
  cardTitle: string;
  version?: string;
  program?: string;
  imageSrc: string;
  imageAlt?: string;
  buttonText: string;
  buttonUrl: string;
  buttonIcon?: JSX.Element;
  buttonBlankTarget?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(17),
  },
  title: {
    paddingBottom: theme.spacing(8),
  },
  versionDetails: {
    display: 'flex',
  },
  detail: {
    display: 'flex',
    alignItems: 'baseline',
    marginRight: theme.spacing(4),
    color: theme.palette.info.dark,
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
    marginRight: theme.spacing(1),
  },
  data: {
    fontSize: theme.typography.pxToRem(14),
    marginBottom: 0,
  },
}));

function DocumentationCard({
  mainTitle,
  cardTitle,
  imageSrc,
  imageAlt,
  buttonText,
  buttonUrl,
  buttonBlankTarget,
  buttonIcon,
  version,
  program,
}: DocumentationCardProps): JSX.Element {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Title variant="h3" className={styles.title}>
        {mainTitle}
      </Title>
      <ImageLeftCard
        title={cardTitle}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
        buttonIcon={buttonIcon}
        buttonBlankTarget={buttonBlankTarget}
        imageStorageBaseUrl={imageStorageBaseUrl}
        apiServerUrl={apiServerUrl}
      >
        <div className={styles.versionDetails}>
          {version && (
            <div className={styles.detail}>
              <Label className={styles.label}>version:</Label>
              <Description className={styles.data}>{version}</Description>
            </div>
          )}
          {program && (
            <div className={styles.detail}>
              <Label className={styles.label}>program:</Label>
              <Description className={styles.data}>{program}</Description>
            </div>
          )}
        </div>
      </ImageLeftCard>
    </div>
  );
}

export { DocumentationCard };
