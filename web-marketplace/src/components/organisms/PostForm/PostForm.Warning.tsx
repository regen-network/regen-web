import WarningIcon from 'web-components/src/components/icons/WarningIcon';

export function Warning({ text }: { text: string }) {
  return (
    <div className="bg-warning-200 py-5 px-10 grid grid-cols-[25px_1fr] max-w-[310px] items-center gap-10">
      <WarningIcon />
      <em className="text-xs text-[#864A13] italic font-bold">{text}</em>
    </div>
  );
}
