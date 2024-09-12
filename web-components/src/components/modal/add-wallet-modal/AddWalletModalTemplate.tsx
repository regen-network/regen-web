import { Box, Grid } from '@mui/material';

import Card from '../../cards/Card';
import { Body, Title } from '../../typography';
import UserAvatar from '../../user/UserAvatar';
import Modal from '..';
import { AddWalletModalConnectProps } from './AddWalletModalConnect';

export interface AddWalletModalTemplateProps
  extends AddWalletModalConnectProps {}

const AddWalletModalTemplate: React.FC<
  React.PropsWithChildren<AddWalletModalTemplateProps>
> = ({ title, subtitle, partyInfo, children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} isFullscreenMobile={false}>
      <Box sx={{ maxWidth: 460 }}>
        <Title align="center" variant="h4" mt={1.75}>
          {title}
        </Title>
        {subtitle && (
          <Body size="lg" align="center" mt={5}>
            {subtitle}
          </Body>
        )}
      </Box>
      {partyInfo && (
        <Card sx={{ mt: 6, p: 5 }}>
          <Grid container wrap="nowrap" alignItems="center">
            <Grid item pr={5}>
              <UserAvatar src={partyInfo.profileImage} size="xxl" />
            </Grid>
            <Grid item>
              <Body size="lg" color="primary.light" sx={{ fontWeight: 'bold' }}>
                {partyInfo.addr}
              </Body>
              <Body size="sm" color="info.main">
                {partyInfo.name}
              </Body>
            </Grid>
          </Grid>
        </Card>
      )}
      {children}
    </Modal>
  );
};

export { AddWalletModalTemplate };
