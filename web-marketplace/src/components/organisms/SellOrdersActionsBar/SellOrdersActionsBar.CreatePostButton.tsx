import { useLingui } from '@lingui/react';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';

import { CREATE_POST } from './SellOrdersActionsBar.constants';

export function SellOrdersActionsBarCreatePostButton({
  onClickCreatePost,
  isCreatePostButtonDisabled,
}: {
  onClickCreatePost: () => void;
  isCreatePostButtonDisabled: boolean;
}) {
  const { _ } = useLingui();
  return (
    <OutlinedButton
      onClick={onClickCreatePost}
      className="mr-20"
      disabled={isCreatePostButtonDisabled}
    >
      {_(CREATE_POST)}
    </OutlinedButton>
  );
}
