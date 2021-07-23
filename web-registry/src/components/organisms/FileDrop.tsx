import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { FieldProps } from 'formik';

import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import FieldFormControl from 'web-components/lib/components/inputs/FieldFormControl';
import CropImageModal from 'web-components/lib/components/modal/CropImageModal';

export interface FileDropProps extends FieldProps {
  className?: string;
  description?: string;
  label?: string;
  optional?: boolean;
  onChange: (file: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 200,
    width: 300,
  },
  drop: {},
}));

function FileDrop({
  className,
  description,
  label,
  optional,
  onChange,
  ...fieldProps
}: FileDropProps): JSX.Element {
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [initialImage, setInitialImage] = useState('');
  const styles = useStyles();
  const { form, field } = fieldProps;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event && event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      toBase64(file).then(base64String => {
        if (typeof base64String === 'string') {
          setCropModalOpen(true);
          setInitialImage(base64String);
        }
      });
    }
  };

  // Convert file to base64 string
  const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleCropModalClose = (): void => {
    setInitialImage('');
    setCropModalOpen(false);
  };

  const handleCropModalSubmit = (croppedImage: HTMLImageElement): void => {
    form.setFieldValue(field.name, croppedImage.src);
    setCropModalOpen(false);
  };

  return (
    <div className={styles.root}>
      <FieldFormControl
        className={className}
        label={label}
        disabled={form.isSubmitting}
        optional={optional}
        {...fieldProps}
      >
        {() =>
          field.value ? (
            <img src={field.value} alt="preview" />
          ) : (
            <div className={styles.drop}>
              <input type="file" hidden onChange={handleFileChange} accept="image/*" id="file-drop-input" />
              <label htmlFor="file-drop-input">
                <OutlinedButton isImageBtn>Add Preview photo</OutlinedButton>
              </label>
            </div>
          )
        }
      </FieldFormControl>
      <CropImageModal
        open={cropModalOpen}
        onClose={handleCropModalClose}
        onSubmit={handleCropModalSubmit}
        initialImage={initialImage}
      />
    </div>
  );
}

export { FileDrop };
