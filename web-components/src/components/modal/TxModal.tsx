import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { SxProps } from '@mui/system';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import { Theme } from '../../theme/muiTheme';
import { cn } from '../../utils/styles/cn';
import { truncate } from '../../utils/truncate';
import OutlinedButton from '../buttons/OutlinedButton';
import Card from '../cards/Card';
import { LinkItem } from '../footer/footer-new';
import Modal, { RegenModalProps } from '../modal';
import ShareSection from '../share-section';
import { SocialItems } from '../share-section/ShareSection.types';
import { Body, Label, Title } from '../typography';
import { TextSize } from '../typography/sizing';
import { CardItemValue, CardItemValueList } from './TxModal.CardItemValue';

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

export interface ItemValue {
  label?: string;
  name?: string | number;
  url?: string;
  icon?: ReactNode;
  children?: ReactNode;
  size?: TextSize;
  mobileSize?: TextSize;
  className?: string;
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

export type LinkComponentProp = React.FC<React.PropsWithChildren<LinkProps>>;

export interface TxModalProps extends RegenModalProps {
  onButtonClick: () => void;
  cardTitle: string;
  buttonTitle: string;
  cardItems?: Item[];
  linkComponent: LinkComponentProp;
  txHash: string;
  txHashUrl: string;
  icon?: JSX.Element;
  title?: string;
  description?: string;
  buttonLink?: string;
  socialItems?: SocialItems;
  blockchainRecordText: string;
  seeMoreText: string;
  seeLessText: string;
  shareTitle?: string;
  classes?: {
    root?: string;
    title?: string;
    description?: string;
    content?: string;
  };
  titleVariant?: Variant;
  titleMobileVariant?: Variant;
  header?: JSX.Element;
}

interface CardItemProps extends Item {
  linkComponent: LinkComponentProp;
  seeMoreText: string;
  seeLessText: string;
}

export const CardItem: React.FC<React.PropsWithChildren<CardItemProps>> = ({
  color,
  label,
  value,
  linkComponent,
  seeMoreText,
  seeLessText,
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
          seeMoreText={seeMoreText}
          seeLessText={seeLessText}
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

const TxModal: React.FC<React.PropsWithChildren<TxModalProps>> = ({
  icon,
  title,
  description,
  buttonTitle,
  open,
  onClose,
  onButtonClick,
  cardTitle,
  cardItems,
  txHash,
  txHashUrl,
  linkComponent,
  buttonLink,
  socialItems,
  blockchainRecordText,
  seeMoreText,
  seeLessText,
  shareTitle,
  classes,
  titleVariant,
  titleMobileVariant,
  header,
}) => {
  const { classes: styles } = useStyles();
  const hasCardItems = !!cardItems && cardItems.length > 0;
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={cn(styles.root, classes?.root)}
    >
      {header}
      {icon}
      <div className={cn('flex items-center flex-col', classes?.content)}>
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
          variant={titleVariant || 'h3'}
          mobileVariant={titleMobileVariant}
          className={classes?.title}
        >
          {title}
        </Title>
        {description && (
          <Body
            size="lg"
            sx={{
              pt: [2.5, 5],
              pb: [4.75, 0],
              mb: hasCardItems ? '' : { sm: 10, xs: 7.5 },
              textAlign: 'center',
            }}
            className={classes?.description}
          >
            {ReactHtmlParser(description)}
          </Body>
        )}
        {hasCardItems && (
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
              <CardItem
                {...item}
                linkComponent={linkComponent}
                key={i}
                seeMoreText={seeMoreText}
                seeLessText={seeLessText}
              />
            ))}
            {txHash && (
              <CardItem
                label={blockchainRecordText}
                value={{ name: truncate(txHash), url: txHashUrl }}
                linkComponent={linkComponent}
                seeMoreText={seeMoreText}
                seeLessText={seeLessText}
              />
            )}
          </Card>
        )}
        <OutlinedButton
          sx={{ fontSize: { xs: 12, sm: 18 } }}
          onClick={onButtonClick}
          LinkComponent={linkComponent}
          href={buttonLink}
        >
          {buttonTitle}
        </OutlinedButton>
        {socialItems && shareTitle && (
          <ShareSection
            items={socialItems}
            sx={{ mt: 10, maxWidth: 370 }}
            title={shareTitle}
          />
        )}
      </div>
    </Modal>
  );
};

export { TxModal };
