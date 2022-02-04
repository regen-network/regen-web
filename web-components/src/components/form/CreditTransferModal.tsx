import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Modal, { RegenModalProps } from '../modal';
import Title from '../title';
import { CreditTransferForm } from './CreditTransferForm';
import Description from '../description';
// import CheckboxLabel from '../inputs/CheckboxLabel';
import { CreditRetireForm } from './CreditRetireForm';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  mainTitle: {
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

const CreditTransferModal: React.FC<RegenModalProps> = ({ open, onClose }) => {
  const sender = 'i-am-a-sender-from-modal';
  const styles = useStyles();
  const [showRetire, setShowRetire] = useState<boolean>(false);

  const retireHandler = (): void => setShowRetire(prev => !prev);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h3" align="center" className={styles.mainTitle}>
          Transfer
        </Title>
        <CreditTransferForm sender={sender}>
          <FormControlLabel
            control={
              <MuiCheckbox checked={showRetire} onChange={retireHandler} />
            }
            label={'Retire credits upon transfer'}
          />
        </CreditTransferForm>

        {/* <Field
          component={CheckboxLabel}
          type="checkbox"
          name="retireOption"
          label={
            <Description
            // className={classes.checkboxLabel}
            >
              Retire credits upon transfer..
            </Description>
          }
        /> */}
        {/* <CheckboxLabel label={'Retire credits upon transfer'} /> */}

        {showRetire && <CreditRetireForm sender={sender} />}
      </div>
    </Modal>
  );
};

export { CreditTransferModal };
