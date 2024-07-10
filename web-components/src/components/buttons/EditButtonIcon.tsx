import EditIcon from '../icons/EditIcon';

interface ButtonProps {
  onClick: () => void;
  className?: string;
}

export function EditButtonIcon({ onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-transparent border-none hover:cursor-pointer hover:opacity-80 ${className}`}
    >
      <EditIcon
        sx={{
          height: '24px',
          width: '24px',
          p: '2px',
          color: 'info.main',
        }}
      />
    </button>
  );
}
