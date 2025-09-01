import { useEffect, useState } from 'react';
import { useLingui } from '@lingui/react';
import useClickOutside from 'utils/hooks/useClickOutside';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import CloseIcon from 'web-components/src/components/icons/CloseIcon';
import { ImageField } from 'web-components/src/components/inputs/new/ImageField/ImageField';
import { ImageFieldAvatar } from 'web-components/src/components/inputs/new/ImageField/ImageField.Avatar';
import { Title as H } from 'web-components/src/components/typography';

import {
  CANCEL_LABEL,
  CHANGE_LABEL,
  DESCRIPTION_LABEL,
  NAME_LABEL,
  PERSONAL_PROFILE_SUBHEADER,
  PERSONAL_PROFILE_TITLE,
  PROFILE_IMAGE_LABEL,
  SAVE_LABEL,
  TITLE_LABEL,
  TITLE_SUBHEADER,
} from '../OrganizationMembers.constants';

interface PersonalProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialName: string;
  initialAvatar?: string;
  initialDescription?: string;
  initialTitle?: string;
  onUploadAvatar?: (file: File) => Promise<{ url: string }>;
  onSave: (data: {
    name: string;
    avatar?: string;
    title?: string;
    description?: string;
  }) => void;
}

export const PersonalProfileModal = ({
  open,
  onClose,
  initialName,
  initialAvatar,
  initialDescription,
  initialTitle,
  onUploadAvatar,
  onSave,
}: PersonalProfileModalProps) => {
  const { _ } = useLingui();
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar);
  const [title, setTitle] = useState<string | undefined>(initialTitle);
  const [description, setDescription] = useState<string | undefined>(
    initialDescription,
  );
  const modalRef = useClickOutside<HTMLDivElement>(() => onClose());

  useEffect(() => {
    if (open) {
      setName(initialName);
      setAvatar(initialAvatar);
      setTitle(initialTitle);
      setDescription(initialDescription);
    }
  }, [open, initialName, initialAvatar, initialDescription, initialTitle]);

  if (!open) return null;

  const disabledSave = name.trim() === '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-bc-neutral-700/40 backdrop-blur-sm" />
      <div
        ref={modalRef}
        className="bg-bc-neutral-100 rounded-lg relative flex flex-col border-solid border-[1px] border-bc-neutral-300 w-[360px] md:w-[560px] max-h-[90vh] overflow-hidden shadow-md shadow-bc-neutral-700/10"
      >
        <div className="flex-shrink-0 px-20 py-40 md:px-40 md:pt-40 md:pb-0">
          <button
            onClick={onClose}
            aria-label="close"
            className="absolute top-10 right-5 p-8 bg-transparent border-none cursor-pointer"
          >
            <CloseIcon className="w-6 h-6 text-bc-neutral-500" />
          </button>
          <H variant="h4" className="mb-10 text-center">
            {_(PERSONAL_PROFILE_TITLE)}
          </H>
          <p className="text-sm md:text-md text-bc-neutral-500 text-center mb-30 px-10">
            {_(PERSONAL_PROFILE_SUBHEADER)}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-20 md:px-40">
          <div className="flex flex-col gap-30 bg-bc-neutral-0 border border-solid border-bc-neutral-300 rounded px-20 py-30">
            {/* Name */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-bold text-md md:text-lg">
                {_(NAME_LABEL)}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full h-[60px] border-solid border-[1px] border-bc-neutral-300 rounded px-12 text-sm focus:outline-none p-20"
              />
            </div>
            {/* Profile Image */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-bold text-md md:text-lg">
                {_(PROFILE_IMAGE_LABEL)}
              </label>
              <ImageField
                label=""
                buttonText={_(CHANGE_LABEL)}
                name="personal-profile-avatar"
                setValue={({ value }: { value: string }) => setAvatar(value)}
                uploadText={_(CHANGE_LABEL)}
                updateText={_(CHANGE_LABEL)}
                applyText={_(CHANGE_LABEL)}
                title={_(CHANGE_LABEL)}
                titleIgnoreCrop={_(CHANGE_LABEL)}
                circularCrop
                onUpload={onUploadAvatar}
                value={avatar || ''}
              >
                <ImageFieldAvatar value={avatar || ''} />
              </ImageField>
            </div>
            {/* Title */}
            <div className="flex flex-col">
              <label className="font-bold text-md md:text-lg">
                {_(TITLE_LABEL)}
              </label>
              <span className="text-sm md:text-md text-bc-neutral-500 mb-[8px]">
                {_(TITLE_SUBHEADER)}
              </span>
              <input
                type="text"
                value={title || ''}
                onChange={e => setTitle(e.target.value)}
                placeholder={_(TITLE_LABEL)}
                className="w-full h-[60px] border-solid border-[1px] border-bc-neutral-300 rounded px-12 text-sm focus:outline-none p-20"
              />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-[8px]">
              <label className="font-bold text-md md:text-lg">
                {_(DESCRIPTION_LABEL)}
              </label>
              <textarea
                value={description || ''}
                onChange={e => setDescription(e.target.value)}
                className="w-full min-h-[120px] border-solid border-[1px] border-bc-neutral-300 rounded px-12 py-12 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 px-20 py-20 md:px-40 md:py-40">
          <div className="flex justify-end gap-40">
            <button
              onClick={onClose}
              className="bg-transparent border-none cursor-pointer text-sm font-bold text-bc-neutral-400 font-muli"
            >
              {_(CANCEL_LABEL)}
            </button>
            <ContainedButton
              disabled={disabledSave}
              onClick={() => {
                onSave({ name, avatar, title, description });
                onClose();
              }}
              className="h-[53px] w-[138px] text-[18px]"
            >
              {_(SAVE_LABEL)}
            </ContainedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfileModal;
