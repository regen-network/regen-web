import React from 'react';
import { Box, Button } from '@mui/material';
import { SxProps } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import ContainedButton from '../buttons/ContainedButton';
import Card from '../cards/Card';
import { LinkItem } from '../footer/footer-new';
import { Label, Subtitle, Title } from '../typography';
import Modal, { RegenModalProps } from '.';

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      maxHeight: '100%',
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
  },
}));

export interface Item {
  label: string;
  value: {
    name: string | number;
    url?: string;
    icon?: React.ReactNode;
  };
  color?: string;
}

interface LinkProps extends LinkItem {
  className?: string;
  sx?: SxProps<Theme>;
}

export type LinkComponentProp = React.FC<React.PropsWithChildren<LinkProps>>;

export interface ConfirmModalProps extends RegenModalProps {
  onConfirm: () => void;
  cardTitle?: string;
  onCancelTitle?: string;
  onConfirmTitle?: string;
  cardItems?: Item[];
  linkComponent: LinkComponentProp;
  icon?: JSX.Element;
  title?: string;
}

interface CardItemProps extends Item {
  linkComponent: LinkComponentProp;
}

export const CardItem: React.FC<React.PropsWithChildren<CardItemProps>> = ({
  color,
  label,
  value,
  linkComponent: LinkComponent,
}) => {
  return (
    <Box sx={{ pt: 5, ':first-child': { pt: 0 } }}>
      <Label size="sm" sx={{ pb: [3, 2.25], color }}>
        {label}
      </Label>

      <Subtitle size="lg" mobileSize="sm" color={color || 'info.dark'}>
        {value.icon && value.icon}
        {value.url ? (
          <LinkComponent
            sx={{ color: 'secondary.main' }}
            href={value.url}
            target="_blank"
          >
            {value.name}
          </LinkComponent>
        ) : (
          <>{value.name}</>
        )}
      </Subtitle>
    </Box>
  );
};

const ConfirmModal: React.FC<React.PropsWithChildren<ConfirmModalProps>> = ({
  icon,
  title,
  onCancelTitle,
  onConfirmTitle,
  open,
  onClose,
  onConfirm,
  cardTitle,
  cardItems,
  linkComponent,
}) => {
  const { classes: styles } = useStyles();
  return (
    <Modal open={open} onClose={onClose} className={styles.root}>
      {icon}
      <Title
        sx={{
          lineHeight: {
            xs: '150%',
            sm: '140%',
          },
          px: {
            sm: 6.5,
          },
        }}
        align="center"
        variant="h3"
      >
        {title}
      </Title>
      <Card
        sx={{
          width: '100%',
          px: { sm: 7.75, xs: 5.5 },
          py: { sm: 9, xs: 7.5 },
          mt: { sm: 9.5, xs: 2.75 },
          mb: { sm: 10, xs: 7.5 },
        }}
      >
        {cardTitle && <Title variant="h5">{cardTitle}</Title>}
        {cardItems?.map((item, i) => (
          <CardItem {...item} linkComponent={linkComponent} key={i} />
        ))}
      </Card>
      <Box sx={{ display: 'flex' }}>
        <Button
          onClick={onClose}
          variant="text"
          size="small"
          sx={{
            border: 0,
            color: 'info.main',
          }}
        >
          {onCancelTitle}
        </Button>
        <ContainedButton
          sx={{ fontSize: { xs: 12, sm: 18 } }}
          onClick={onConfirm}
        >
          {onConfirmTitle}
        </ContainedButton>
      </Box>
    </Modal>
  );
};

export { ConfirmModal };
