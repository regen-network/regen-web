import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { Box, Flex } from '../box';
import Modal, { RegenModalProps } from '../modal';
import { Body, Title } from '../typography';

const SCROLL_BAR_WIDTH = 8;

const useStyles = makeStyles()(theme => ({
  modal: {
    [theme.breakpoints.up('sm')]: {
      height: 'inherit',
      padding: `${theme.spacing(10.75)} ${theme.spacing(7.5)} ${theme.spacing(
        12.5,
      )}`,
      maxWidth: theme.spacing(140 + SCROLL_BAR_WIDTH),
    },
  },
}));

interface FormModalTemplateProps extends RegenModalProps {
  title: string;
  subtitle?: string;
  image?: JSX.Element;
}

const FormModalTemplate: React.FC<
  React.PropsWithChildren<FormModalTemplateProps>
> = ({ title, subtitle, image, open, onClose, children }) => {
  const { classes: styles } = useStyles();

  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      {image && (
        <Flex justifyContent="center" sx={{ pb: 5 }}>
          {image}
        </Flex>
      )}
      <Title variant="h3" align="center">
        {title}
      </Title>
      {subtitle && (
        <Body size="lg" mobileSize="sm" align="center" sx={{ mt: 5 }}>
          {subtitle}
        </Body>
      )}
      <Box sx={{ mt: [7.5, 10] }}>{children}</Box>
    </Modal>
  );
};

export { FormModalTemplate };
