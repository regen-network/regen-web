import React, { forwardRef, useState } from 'react';
import ReactPlayer from 'react-player/es6';
import {
  CardMedia,
  Collapse,
  IconButton,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import OutlinedButton from '../../../buttons/OutlinedButton';
import Card from '../../../cards/Card';
import TrashIcon from '../../../icons/TrashIcon';
import FieldFormControl, {
  FieldFormControlProps,
} from './../FieldFormControl/FieldFormControl';
import Input from './../Input/Input';
import { VIDEO_URL_NOT_VALID } from './VideoInput.constants';
import { useVideoInputStyles } from './VideoInput.styles';

export interface VideoInputProps extends Partial<FieldFormControlProps> {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  name?: string;
  label?: string;
  value?: string;
  setValue?: (value: string) => void;
  optional?: boolean | string;
  buttonText?: string;
}

export const VideoInput = forwardRef<HTMLInputElement, VideoInputProps>(
  (
    {
      className,
      classes,
      name,
      label,
      value,
      setValue,
      optional,
      buttonText,
      ...fieldProps
    },
    ref,
  ) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const { classes: styles, cx } = useVideoInputStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (
      event: React.ChangeEvent<{ value: unknown }>,
    ): void => {
      const videoUrl = event.target.value as string;
      setVideoUrl(videoUrl);
      if (ReactPlayer.canPlay(videoUrl) && setValue) {
        setError(undefined);
        setValue && setValue(videoUrl);
      } else {
        setError(VIDEO_URL_NOT_VALID);
      }
    };

    const handleDelete = (): void => {
      setValue && setValue('');
      setVideoUrl('');
      setVideoLoaded(false);
    };

    return (
      <FieldFormControl
        className={cx(styles.root, classes?.root, className)}
        label={label}
        optional={optional}
        error={!!error}
        helperText={error ?? undefined}
        {...fieldProps}
      >
        <>
          {!!value ? (
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
                    url={value}
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
                    <TrashIcon color={theme.palette.error.dark} />
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
                name={name}
                ref={ref}
              />
            </div>
          )}
        </>
      </FieldFormControl>
    );
  },
);
