import ErrorIcon from 'web-components/src/components/icons/ErrorIcon';
import PendingIcon from 'web-components/src/components/icons/PendingIcon';
import SuccessIcon from 'web-components/src/components/icons/SuccessIcon';
import InfoLabel from 'web-components/src/components/info-label';
import { InfoLabelVariant } from 'web-components/src/components/info-label/InfoLabel.types';

const iconStyle = { height: '16px', verticalAlign: 'middle', mb: '2px' };

interface Props {
  status: InfoLabelVariant;
  label?: string;
}

/**
 * Displays a label with an associated icon based on the provided status.
 * The label is either the status text or the custom label passed as a prop.
 */
const StatusLabel = ({ status, label }: Props): JSX.Element => {
  const renderIcon = (variant: string): JSX.Element | undefined => {
    switch (variant) {
      case 'success':
        return <SuccessIcon sx={iconStyle} />;
      case 'complete':
        return <SuccessIcon sx={iconStyle} />;
      case 'pending':
        return (
          <PendingIcon
            sx={theme => ({
              ...iconStyle,
              color: theme.palette.primary.contrastText,
            })}
          />
        );
      case 'error':
        return <ErrorIcon sx={iconStyle} />;
      default:
        return;
    }
  };

  return (
    <InfoLabel
      label={label ?? status}
      variant={status}
      icon={renderIcon(status)}
      sx={{ textTransform: 'capitalize' }}
    />
  );
};

export { StatusLabel };
