import CloseIcon from '../../../icons/CloseIcon';
import { OpenInNewIcon } from '../../../icons/OpenInNewIcon';

type Props = {
  onClose: () => void;
  selectedUrl: string;
};

const Buttons = ({ onClose, selectedUrl }: Props) => (
  <>
    <div
      onClick={onClose}
      className="cursor-pointer absolute top-[13px] right-[13px] z-10"
    >
      <CloseIcon className="h-[24px] w-[24px] rounded-[50%] text-grey-0 bg-grey-700/[.6] p-3" />
    </div>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={selectedUrl}
      className="outline-none cursor-pointer absolute top-[13px] right-[47px] z-10"
    >
      <OpenInNewIcon className="h-[24px] w-[24px] rounded-[50%] text-grey-0 bg-grey-700/[.6] p-3" />
    </a>
  </>
);

export { Buttons };
