import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Box } from '@mui/material';

import Modal from 'web-components/src/components/modal';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title } from 'web-components/src/components/typography';

import Form from 'components/molecules/Form/Form';

import { useStyles } from './ModalTemplate.styles';

interface ModalTemplateProps<T extends FieldValues> {
  title: string;
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<T>;
  handleSubmit: () => void;
  submitDisabled: boolean;
  children?: React.ReactNode;
  submitLabel?: string;
}

const ModalTemplate = <T extends FieldValues>({
  title,
  open,
  onClose,
  form,
  handleSubmit,
  submitDisabled,
  children,
  submitLabel = 'save',
}: ModalTemplateProps<T>): JSX.Element => {
  const { classes: styles } = useStyles();

  return (
    <Modal open={open} onClose={onClose} className={styles.root}>
      <Title
        variant="h4"
        align="center"
        sx={{ pb: [6, 12.5], maxWidth: 425, margin: '0 auto' }}
      >
        {title}
      </Title>
      <Form form={form}>
        <Box
          sx={{
            border: theme => `1px solid ${theme.palette.info.light}`,
            backgroundColor: 'primary.main',
            borderRadius: '5px',
            py: 10,
            px: { xs: 2.5, sm: 10 },
            mb: 12.5,
          }}
        >
          {children}
        </Box>
        <CancelButtonFooter
          onClick={handleSubmit}
          onCancel={onClose}
          label={submitLabel}
          sx={{ px: [10.75] }}
          disabled={submitDisabled}
          type="submit"
        />
      </Form>
    </Modal>
  );
};

export { ModalTemplate };
