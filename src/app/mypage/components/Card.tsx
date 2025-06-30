import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, children, className = '' }: CardProps) => (
  <div className={`bg-white shadow-md rounded-lg p-5 ${className} min-h-full`}>
    <div className="sticky top-0 bg-white z-10">
      <div className="text-lg font-bold border-b pb-2 mb-4">{title}</div>
    </div>
    <div className="overflow-y-auto max-h-[calc(100vh-200px)]">{children}</div>
  </div>
);

export default Card;
