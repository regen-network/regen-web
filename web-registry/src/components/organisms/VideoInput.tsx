import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CardMedia, IconButton, Collapse } from '@material-ui/core';
import { FieldProps } from 'formik';
import cx from 'clsx';

import Card from 'web-components/lib/components/cards/Card';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import FieldFormControl from 'web-components/lib/components/inputs/FieldFormControl';
import Input from 'web-components/lib/components/inputs/Input';
import TrashIcon from 'web-components/lib/components/icons/TrashIcon';

export interface VideoInputProps extends FieldProps {
  className?: string;
  classes?: {
    root?: string;
    main?: string;
    button?: string;
  };
  label?: string;
  optional?: boolean;
  labelSubText?: string;
  buttonText?: string;
}

const useStyles = makeStyles(theme => ({
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
  video: {
    height: 318, //todo
    width: '100%',
    borderRadius: 5,
  },
  inputRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    marginRight: theme.spacing(4),
  },
  button: {},
  deleteButton: {
    background: theme.palette.primary.main,
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing(4),
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
  labelSubText,
  buttonText,
  ...fieldProps
}: VideoInputProps): JSX.Element {
  const [videoUrl, setVideoUrl] = useState('');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const styles = useStyles();
  const theme = useTheme();
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
    setIframeLoaded(false);
  };

  return (
    <FieldFormControl
      className={cx(styles.root, classes?.root, className)}
      label={label}
      disabled={form.isSubmitting}
      optional={optional}
      labelSubText={labelSubText}
      {...fieldProps}
    >
      {() => (
        <>
          <Collapse
            classes={{ entered: styles.collapse, hidden: styles.collapseHidden }}
            in={!!field.value && iframeLoaded}
          >
            <Card className={styles.preview}>
              <CardMedia
                className={styles.video}
                component="iframe"
                src={field.value}
                frameBorder="0"
                onLoad={() => setIframeLoaded(true)}
              />
              <IconButton classes={{ root: styles.deleteButton }} onClick={handleDelete} aria-label="delete">
                <TrashIcon color={theme.palette.error.light} />
              </IconButton>
            </Card>
          </Collapse>
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
        </>
      )}
    </FieldFormControl>
  );
}

export { VideoInput };
