import { useState } from 'react';

import { ImageType } from '../../../types/shared/imageType';
import { parseText } from '../../../utils/textParser';
import { BlockContent } from '../../block-content';
import { TextButton } from '../../buttons/TextButton';
import CloseIcon from '../../icons/CloseIcon';
import SmallArrowIcon from '../../icons/SmallArrowIcon';
import { Body, Title } from '../../typography';

export interface Props {
  title: string;
  image: ImageType;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}

const BannerCard = ({
  title,
  image,
  description,
  buttonLabel,
  onClick,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {open ? (
        <div className="relative flex items-start sm:items-center rounded-[8px] border-solid bg-grey-200 border-grey-300 border-l-[10px] border-l-brand-200 px-20 sm:px-30 py-15">
          <CloseIcon
            className="cursor-pointer absolute top-5 right-5"
            onClick={() => setOpen(false)}
          />
          <img
            className="w-50 h-50 sm:w-[80px] sm:h-[80px]"
            src={image.src}
            alt={image.alt}
          />
          <div className="pl-20 sm:pl-30">
            <Title variant="h6">{title}</Title>
            <Body className="pt-5 pb-10 sm:pt-[8px] sm:pb-20">
              {description}
            </Body>
            <TextButton textSize="xs" onClick={onClick}>
              {buttonLabel}&nbsp;
              <SmallArrowIcon className="h-10" />
            </TextButton>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { BannerCard };
