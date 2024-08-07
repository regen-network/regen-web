import { PrefinanceTag } from 'web-components/src/components/PrefinanceTag/PrefinanceTag';

export function OrderSummaryImage({
  src,
  prefinanceProject,
}: {
  src: string;
  prefinanceProject?: boolean;
}) {
  return (
    <div className="w-[90px] sm:w-full  sm:h-[160px]">
      {prefinanceProject && <PrefinanceTag />}
      <img
        src={src}
        alt="order summary"
        className="w-[90px] h-[60px] px-15 sm:h-[160px] sm:px-0 sm:w-full object-cover object-center"
      />
    </div>
  );
}
