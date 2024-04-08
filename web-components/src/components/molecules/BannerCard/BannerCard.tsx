import { useState } from 'react';

import { ImageType } from '../../../types/shared/imageType';
import { cn } from '../../../utils/styles/cn';
import { BlockContent, SanityBlockContent } from '../../block-content';
import { TextButton } from '../../buttons/TextButton';
import CloseIcon from '../../icons/CloseIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import InfoTooltip from '../../tooltip/InfoTooltip';
import { Body, Title } from '../../typography';

export interface Props {
  title: string;
  image: ImageType;
  description: SanityBlockContent | string;
  buttonLabel: string;
  onClick: () => void;
  onClose: () => void;
  icon?: JSX.Element;
  buttonLabelClassName?: string;
  tooltip?: string;
}

const BannerCard = ({
  title,
  image,
  description,
  buttonLabel,
  onClick,
  onClose,
  icon,
  buttonLabelClassName,
  tooltip,
}: Props): JSX.Element => {
  return (
    <div className="relative flex items-start sm:items-center rounded-[8px] border border-solid bg-grey-200 border-grey-300 border-l-[10px] border-l-brand-200 px-20 sm:px-30 py-15">
      <CloseIcon
        className="cursor-pointer absolute top-5 right-5"
        onClick={onClose}
      />
      <img
        className="w-50 h-50 sm:w-[80px] sm:h-[80px]"
        src={image.src}
        alt={image.alt}
      />
      <div className="pl-20 sm:pl-30">
        <Title variant="h6">{title}</Title>
        <Body className="pt-5 pb-10 sm:pt-[8px] sm:pb-20">
          {typeof description === 'string' ? (
            description
          ) : (
            <BlockContent content={description} />
          )}
        </Body>
        <InfoTooltip arrow placement="top" title={tooltip}>
          <TextButton
            className={cn(buttonLabelClassName, 'flex')}
            textSize="xs"
            onClick={onClick}
          >
            {icon && <>{icon}&nbsp;</>}
            <span className={buttonLabelClassName}>{buttonLabel}</span>
            {!icon && (
              <>
                &nbsp;
                <SmallArrowIcon className="h-10" />
              </>
            )}
          </TextButton>
        </InfoTooltip>
      </div>
    </div>
  );
};

export { BannerCard };
