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

import { UseStateSetter } from '../../../../types/react/useState';
import Card from '../../../cards/Card';
import TrashIcon from '../../../icons/TrashIcon';
import FieldFormControl, {
  FieldFormControlProps,
} from './../FieldFormControl/FieldFormControl';
import Input from './../Input/Input';
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
  urlNotValidText: string;
  loadingText: string;
  addPlaceholder: string;
  setValue?: (params: { value?: string }) => void;
  optional?: boolean | string;
  buttonText?: string;
  setError: (error: string | undefined) => void;
  setErrorBanner?: UseStateSetter<string>;
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
      error,
      urlNotValidText,
      loadingText,
      addPlaceholder,
      setError,
      setErrorBanner,
      helperText,
      ...fieldProps
    },
    ref,
  ) => {
    const [videoUrl, setVideoUrl] = useState('');
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
        setValue && setValue({ value: videoUrl });
      } else {
        setError(urlNotValidText);
      }
    };

    const handleBlur = (): void => {
      if (error && setErrorBanner && helperText) {
        // We set a timeout so the click event (blur) doesn't cause the error banner
        // to close too quickly
        setTimeout(() => setErrorBanner(helperText), 200);
      }
    };

    const handleKeyUp = (
      event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (event.key === 'Enter' && error && setErrorBanner && helperText) {
        setErrorBanner(helperText);
      }
    };

    const handleDelete = (): void => {
      setValue && setValue({ value: '' });
      setVideoUrl('');
      setVideoLoaded(false);
    };

    return (
      <FieldFormControl
        className={cx(styles.root, classes?.root, className)}
        label={label}
        optional={optional}
        error={!!error}
        helperText={helperText}
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
                    fallback={<div>{loadingText}</div>}
                    width="100%"
                  />
                  <IconButton
                    classes={{ root: styles.deleteButton }}
                    onClick={handleDelete}
                    aria-label="delete"
                    size="large"
                  >
                    <TrashIcon className="text-error-300" />
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
                placeholder={addPlaceholder}
                name={name}
                ref={ref}
                onBlur={handleBlur}
                onKeyUp={handleKeyUp}
              />
            </div>
          )}
        </>
      </FieldFormControl>
    );
  },
);
