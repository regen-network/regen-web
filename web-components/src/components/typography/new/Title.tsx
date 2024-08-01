import { ReactNode } from 'react';

type TitleProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
};

const Title = ({ as, children, className = '' }: TitleProps) => {
  const Tag = as;

  return <Tag className={`font-[muli] ${className}`}>{children}</Tag>;
};

export default Title;
