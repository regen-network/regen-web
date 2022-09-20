import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps extends SvgIconProps {}

export default function QuestionIconOutlined({
  sx = [],
  ...props
}: IconProps): JSX.Element {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      sx={[{ fill: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    >
      <circle cx={10} cy={10} r={9.5} fill="#fff" stroke="currentColor" />
      <path
        d="M8.359 5.785c.308-.177.634-.308.98-.392.354-.093.704-.14 1.05-.14.55 0 1.04.094 1.47.28.43.187.76.453.994.798.233.336.35.728.35 1.176 0 .495-.112.929-.336 1.302-.224.364-.556.78-.994 1.246-.392.43-.69.803-.896 1.12a2.48 2.48 0 0 0-.378 1.078l-.056.322h-.826v-.448c0-.55.098-1.017.294-1.4.196-.392.48-.821.854-1.288.298-.373.518-.686.658-.938.15-.261.224-.555.224-.882 0-.364-.126-.648-.378-.854-.252-.214-.607-.322-1.064-.322-.654 0-1.302.196-1.946.588V5.785Zm.952 7.868h1.666v1.68H9.31v-1.68Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
