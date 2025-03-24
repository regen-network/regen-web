import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonProps, SxProps, Theme } from '@mui/material';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';

import type {
  ButtonFieldsFragment,
  Maybe,
} from '../../generated/sanity-graphql';
import { getBtnHref, isInternalLink, openLink } from '../../lib/button';

interface Props extends ButtonProps {
  btn?: Maybe<ButtonFieldsFragment>;
  variant?: 'contained' | 'outlined';
  openModal?: (url: string) => void;
  sx?: SxProps<Theme>;
}

/**
 * A wrapper for Sanity buttons to be used in the marketplace app. Handles internal
 * links through `react-router` and forwards button props to a `Contained` or
 * `Outlined` button */
function SanityButton({
  btn,
  openModal,
  variant = 'contained',
  sx = [],
  ...btnProps
}: Props): JSX.Element {
  const navigate = useNavigate();
  const url = getBtnHref(btn);

  function handleClick(): void {
    if (btn?.buttonModal && openModal) {
      return openModal(url);
    }
    if (btn?.buttonBlankTarget) {
      // if internal link and blank target, append root URL
      const fullUrl = isInternalLink(url) ? window.location.origin + url : url;
      return openLink(fullUrl, true);
    }
    return isInternalLink(url)
      ? navigate(url)
      : openLink(url, !!btn?.buttonBlankTarget);
  }

  const Button = variant === 'contained' ? ContainedButton : OutlinedButton;
  return (
    <Button onClick={handleClick} {...btnProps} sx={sx as any}>
      {btn?.buttonText}
    </Button>
  );
}

export { SanityButton };
