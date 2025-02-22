import React from 'react';

const Card = ({ title, children, className = "" }: any) => (
  <div className={`bg-white shadow-md rounded-lg p-5 ${className} min-h-full`}>
    <h2 className="text-lg font-bold border-b pb-2 mb-4">{title}</h2>
    {children}
  </div>
);

export default Card;