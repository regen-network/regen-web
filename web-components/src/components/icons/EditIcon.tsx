import { SxProps, Theme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';

import { sxToArray } from '../../utils/mui/sxToArray';

interface EditIconProps {
  sx?: SxProps<Theme>;
}

export default function EditIcon({ sx }: EditIconProps): JSX.Element {
  return (
    <SvgIcon
      sx={[{ color: '#4FB573' }, ...sxToArray(sx)]}
      width="13"
      height="13"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.198198 10.3981C0.151314 10.445 0.124974 10.5086 0.124974 10.5749L0.124969 12.6246C0.124969 12.7628 0.237136 12.8748 0.37536 12.8746L2.42156 12.8714C2.48773 12.8713 2.55116 12.845 2.59795 12.7982L10.8856 4.51056L8.48566 2.11065L0.198198 10.3981ZM9.19277 1.40355L11.5927 3.80345L12.439 2.95709C12.8296 2.56656 12.8296 1.93339 12.439 1.54287L11.4534 0.557175C11.0628 0.166651 10.4297 0.166651 10.0391 0.557175L9.19277 1.40355Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
}
