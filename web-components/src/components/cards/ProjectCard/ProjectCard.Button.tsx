import { Buy1Event, Track } from 'web-marketplace/src/lib/tracker/types';

import OutlinedButton from '../../buttons/OutlinedButton';
import { ProjectPrefinancing } from './ProjectCard.types';

export function ProjectCardButton({
  id,
  name,
  creditClassId,
  onClick,
  onButtonClick,
  track,
  pathname,
  projectPrefinancing,
  offChain,
  asAdmin,
  isPrefinanceProject,
  buttonText,
  buttonStartIcon,
  buttonClassName,
  isButtonDisabled,
  isSoldOut,
}: {
  id: string | undefined;
  name: string;
  creditClassId: string | undefined;
  onClick?: () => void;
  onButtonClick?: () => void;
  track?: Track;
  pathname?: string;
  projectPrefinancing?: ProjectPrefinancing;
  offChain?: boolean;
  asAdmin?: boolean;
  isPrefinanceProject?: boolean;
  buttonText: string;
  buttonStartIcon?: React.ReactNode;
  buttonClassName?: string;
  isButtonDisabled?: boolean;
  isSoldOut?: boolean;
}) {
  const onHandleClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    if (asAdmin) {
      onButtonClick && onButtonClick();
    } else if (isSoldOut) {
      onClick && onClick();
    } else if (isPrefinanceProject) {
      window.open(projectPrefinancing?.stripePaymentLink, '_newtab');
    } else if (offChain) {
      onClick && onClick();
    } else {
      track &&
        track<Buy1Event>('buy1', {
          url: pathname ?? '',
          cardType: 'project',
          buttonLocation: 'projectCard',
          projectName: name,
          projectId: id,
          creditClassId: creditClassId,
        });
      onButtonClick && onButtonClick();
    }
  };

  return (
    <OutlinedButton
      onClick={onHandleClick}
      size="small"
      startIcon={buttonStartIcon}
      disabled={isButtonDisabled}
      sx={{
        width: '100%',
      }}
      className={buttonClassName}
    >
      {buttonText}
    </OutlinedButton>
  );
}
