import React, { useState } from 'react';
import { Box, Collapse, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SxProps } from '@mui/system';

import { truncate } from '../../utils/truncate';
import OutlinedButton from '../buttons/OutlinedButton';
import { TextButton } from '../buttons/TextButton';
import Card from '../cards/Card';
import { LinkItem } from '../footer/footer-new';
import Modal, { RegenModalProps } from '../modal';
import { Label, Subtitle, Title } from '../typography';

const useStyles = makeStyles(theme => ({
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

export interface ItemValue {
  name: string | number;
  url?: string;
  icon?: React.ReactNode;
}

export interface Item {
  label: string;
  value: ItemValue | ItemValue[];
  color?: string;
}

interface LinkProps extends LinkItem {
  className?: string;
  sx?: SxProps<Theme>;
}

type LinkComponentProp = React.FC<LinkProps>;

export interface TxModalProps extends RegenModalProps {
  onButtonClick: () => void;
  cardTitle: string;
  buttonTitle?: string;
  cardItems?: Item[];
  linkComponent: LinkComponentProp;
  txHash: string;
  txHashUrl: string;
  icon?: JSX.Element;
  title?: string;
}

interface CardItemValueProps {
  value: ItemValue;
  color?: string;
  linkComponent: LinkComponentProp;
}

const CardItemValue = ({
  value,
  color,
  linkComponent: LinkComponent,
}: CardItemValueProps): JSX.Element => {
  return (
    <Subtitle
      key={value.name}
      size="lg"
      mobileSize="sm"
      color={color || 'info.dark'}
    >
      {value.icon && value.icon}
      {value.url ? (
        <LinkComponent
          sx={{ color: 'secondary.main' }}
          href={value.url}
          target={value.url.startsWith('/') ? '_self' : '_blank'}
        >
          {value.name}
        </LinkComponent>
      ) : (
        <>{value.name}</>
      )}
    </Subtitle>
  );
};

interface CardItemValueListProps {
  value: ItemValue[];
  color?: string;
  linkComponent: LinkComponentProp;
}

const CardItemValueList = (props: CardItemValueListProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (props.value.length <= 2) {
    return (
      <>
        {props.value.map(row => (
          <CardItemValue {...props} value={row} />
        ))}
      </>
    );
  }

  const alwaysVisible = props.value.slice(0, 2);
  const underCollapse = props.value.slice(2);

  return (
    <>
      {alwaysVisible.map(row => (
        <CardItemValue {...props} value={row} />
      ))}

      <TextButton
        textSize="xxs"
        onClick={() => setExpanded(!expanded)}
        sx={{
          px: [0],
          ':hover': { bgcolor: 'transparent !important' },
        }}
      >
        {expanded ? '- see less' : '+ see more'}
      </TextButton>

      <Collapse in={expanded}>
        {underCollapse.map(row => (
          <CardItemValue {...props} value={row} />
        ))}
      </Collapse>
    </>
  );
};

interface CardItemProps extends Item {
  linkComponent: LinkComponentProp;
}

export const CardItem: React.FC<CardItemProps> = ({
  color,
  label,
  value,
  linkComponent,
}) => {
  return (
    <Box sx={{ pt: 5 }}>
      <Label size="sm" sx={{ pb: [3, 2.25], color }}>
        {label}
      </Label>

      {Array.isArray(value) ? (
        <CardItemValueList
          value={value}
          color={color}
          linkComponent={linkComponent}
        />
      ) : (
        <CardItemValue
          value={value}
          color={color}
          linkComponent={linkComponent}
        />
      )}
    </Box>
  );
};

const TxModal: React.FC<TxModalProps> = ({
  icon,
  title,
  buttonTitle = 'view your portfolio',
  open,
  onClose,
  onButtonClick,
  cardTitle,
  cardItems,
  txHash,
  txHashUrl,
  linkComponent,
}) => {
  const styles = useStyles();
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
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          width: '100%',
          px: { sm: 7.75, xs: 5.5 },
          py: { sm: 9, xs: 7.5 },
          mt: { sm: 9.5, xs: 2.75 },
          mb: { sm: 10, xs: 7.5 },
        }}
      >
        <Title variant="h5">{cardTitle}</Title>
        {cardItems?.map((item, i) => (
          <CardItem {...item} linkComponent={linkComponent} key={i} />
        ))}
        {txHash && (
          <CardItem
            label="hash"
            value={{ name: truncate(txHash), url: txHashUrl }}
            linkComponent={linkComponent}
          />
        )}
      </Card>
      <OutlinedButton
        sx={{ fontSize: { xs: 12, sm: 18 } }}
        onClick={onButtonClick}
      >
        {buttonTitle}
      </OutlinedButton>
    </Modal>
  );
};

export { TxModal };
