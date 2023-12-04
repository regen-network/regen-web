import { cn } from '../utils/styles/cn';

const Swatch = ({
  bgColor,
  className,
}: {
  bgColor: string;
  className?: string;
}) => (
  <div className={cn(bgColor, className, 'p-10 rounded-md')}>
    {bgColor.substring(3)}
  </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-10">{children}</div>
);

const Pallete = () => (
  <div className="flex flex-col gap-30 bg-grey-0 text-grey-700 p-50">
    <Row>
      <Swatch bgColor="bg-brand-400" />
      <Swatch bgColor="bg-brand-300" />
      <Swatch bgColor="bg-brand-200" />
      <Swatch bgColor="bg-brand-100" />
    </Row>
    <Row>
      <Swatch bgColor="bg-grey-0" />
      <Swatch bgColor="bg-grey-100" />
      <Swatch bgColor="bg-grey-200" />
      <Swatch bgColor="bg-grey-300" />
      <Swatch bgColor="bg-grey-400" className="text-grey-0" />
      <Swatch bgColor="bg-grey-500" className="text-grey-0" />
      <Swatch bgColor="bg-grey-600" className="text-grey-0" />
      <Swatch bgColor="bg-grey-700" className="text-grey-0" />
    </Row>
    <Row>
      <Swatch bgColor="bg-warning-400" />
      <Swatch bgColor="bg-warning-300" />
      <Swatch bgColor="bg-warning-200" />
      <Swatch bgColor="bg-warning-100" />
    </Row>
    <Row>
      <Swatch bgColor="bg-error-400" className="text-grey-0" />
      <Swatch bgColor="bg-error-300" />
      <Swatch bgColor="bg-error-200" />
      <Swatch bgColor="bg-error-100" />
    </Row>
    <Row>
      <Swatch bgColor="bg-blue-400" className="text-grey-0" />
      <Swatch bgColor="bg-blue-300" />
      <Swatch bgColor="bg-blue-200" />
      <Swatch bgColor="bg-blue-100" />
    </Row>
  </div>
);

export default {
  title: 'Colors',
  component: Pallete,
};

export const Light = {};

export const Dark = {
  render: () => (
    <div className="dark">
      <Pallete />
    </div>
  ),
};
