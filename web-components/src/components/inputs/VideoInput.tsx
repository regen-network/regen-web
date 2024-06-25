import React, { useState } from 'react';
import ReactPlayer from 'react-player/es6';
import {
  CardMedia,
  Collapse,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FieldProps } from 'formik';
import { makeStyles } from 'tss-react/mui';

import OutlinedButton from '../buttons/OutlinedButton';
import Card from '../cards/Card';
import TrashIcon from '../icons/TrashIcon';
import FieldFormControl from './FieldFormControl';
import Input from './Input';

export interface VideoInputProps extends FieldProps {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  label?: string;
  optional?: boolean | string;
  buttonText?: string;
}

const useStyles = makeStyles()(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  collapse: {
    marginBottom: theme.spacing(4),
  },
  collapseHidden: {
    marginBottom: 0,
  },
  preview: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
  button: {
    width: theme.typography.pxToRem(124),
  },
  deleteButton: {
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    '&:hover': {
      background: theme.palette.grey[100],
    },
  },
}));

function VideoInput({
  className,
  classes,
  label,
  optional,
  buttonText,
  ...fieldProps
}: VideoInputProps): JSX.Element {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { classes: styles, cx } = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { form, field } = fieldProps;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setVideoUrl(event.target.value as string);
  };

  const handleUrlSubmit = (): void => {
    form.setFieldValue(field.name, videoUrl);
  };

  const handleDelete = (): void => {
    form.setFieldValue(field.name, null);
    setVideoUrl('');
    setVideoLoaded(false);
  };

  return (
    <FieldFormControl
      className={cx(styles.root, classes?.root, className)}
      label={label}
      disabled={form.isSubmitting}
      optional={optional}
      {...fieldProps}
    >
      {() => (
        <>
          {!!field.value ? (
            <>
              <Collapse
                classes={{
                  entered: styles.collapse,
                  hidden: styles.collapseHidden,
                }}
                in={videoLoaded}
              >
                <Card className={styles.preview}>
                  <CardMedia
                    sx={{ width: '100%', borderRadius: 5, height: [210, 318] }}
                    // note: the following props are passed to ReactPlayer
                    component={ReactPlayer}
                    url={field.value}
                    onReady={() => setVideoLoaded(true)}
                    height={isMobile ? 210 : 318}
                    fallback={<div>Loading video player...</div>}
                    width="100%"
                  />
                  <IconButton
                    classes={{ root: styles.deleteButton }}
                    onClick={handleDelete}
                    aria-label="delete"
                    size="large"
                  >
                    <TrashIcon className="text-error-200" />
                  </IconButton>
                </Card>
              </Collapse>
              {!videoLoaded && (
                <LinearProgress color="secondary" sx={{ mb: 4 }} />
              )}
            </>
          ) : (
            <div className={cx(styles.inputRow, classes?.main)}>
              <Input
                className={styles.input}
                onChange={handleChange}
                value={videoUrl}
                placeholder="Add video url"
              />
              <OutlinedButton
                classes={{ root: cx(styles.button, classes?.button) }}
                onClick={handleUrlSubmit}
                aria-label="set video url"
              >
                {buttonText || '+ video'}
              </OutlinedButton>
            </div>
          )}
        </>
      )}
    </FieldFormControl>
  );
}

export { VideoInput };
