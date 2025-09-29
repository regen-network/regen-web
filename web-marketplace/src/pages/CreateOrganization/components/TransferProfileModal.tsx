import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { CancelButtonFooter } from 'web-components/src/components/organisms/CancelButtonFooter/CancelButtonFooter';
import { Title as H } from 'web-components/src/components/typography';

type Props = {
  open: boolean;
  // Triggered when the user clicks SKIP
  onSkip: () => void;
  // Triggered when the user clicks YES, TRANSFER PROFILE
  onTransfer: () => void;
  name: string;
  avatar?: string;
};

export function TransferProfileModal({
  open,
  onSkip,
  onTransfer,
  name,
  avatar,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-bc-neutral-700/40 backdrop-blur-sm" />
      <div className="bg-bc-neutral-100 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 w-[360px] md:w-[560px] max-h-[90vh] overflow-y-auto shadow-md shadow-bc-neutral-700/10">
        <form
          onSubmit={e => {
            e.preventDefault();
            onTransfer();
          }}
          className="flex flex-col h-full"
        >
          <div className="flex-shrink-0 px-20 py-40 md:px-40 md:pt-40 md:pb-0">
            <button
              onClick={onSkip}
              aria-label="close"
              className="absolute top-10 right-5 p-8 bg-transparent border-none cursor-pointer"
              type="button"
            >
              <CloseIcon className="w-6 h-6 text-bc-neutral-500" />
            </button>
            <H variant="h4" className="mb-10 text-center">
              Transfer organization profile data from your personal account to
              your new organization profile?
            </H>
            <p className="text-[18px] font-normal text-bc-neutral-500 text-center mb-30 px-10">
              You can edit this profile data on the next step.
            </p>
          </div>

          <div className="flex-1 px-20 md:px-40">
            <div className="flex flex-col bg-bc-neutral-0 border border-solid border-bc-neutral-300 rounded-[5px] px-20 py-30 md:p-40">
              <p className="text-[18px] font-bold text-bc-neutral-500 mb-20">
                Data will be transferred from this profile:
              </p>
              <div className="flex items-center gap-[15px]">
                <img
                  src={avatar || ''}
                  alt={name}
                  className="w-[56px] h-[56px] rounded-full object-cover bg-bc-neutral-200"
                />
                <span className="text-[16px] font-bold text-bc-neutral-800">
                  {name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 px-20 py-20 md:px-40 md:py-40">
            <CancelButtonFooter
              onCancel={onSkip}
              cancelLabel={'SKIP'}
              label={'YES, TRANSFER PROFILE'}
              disabled={false}
              type="submit"
              className="h-[53px] w-full md:w-[260px] text-[16px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransferProfileModal;
