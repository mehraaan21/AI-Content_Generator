import React from 'react';
import Image from 'next/image'; // Importing Image from Next.js
import { TEMPLATE } from './TemplateListSection';
import Link from 'next/link';

const TemplateCard: React.FC<TEMPLATE> = ({ name, desc, icon,slug }) => {
  return (
    <Link href={`/dashboard/content/${slug}`} passHref>
    <div className="p-5 shadow-md rounded-md border bg-white flex flex-col items-center text-center gap-3 cursor-pointer hover:scale-105 transition-all">
      {/* Icon */}
      <div className="flex justify-center items-center bg-gray-100 rounded-full p-3">
        <Image src={icon.trimEnd()} alt="icon" width={50} height={50} className="w-12 h-12" />
      </div>

      {/* Title */}
      <h2 className="font-medium text-bold text-lg">{name}</h2>

      {/* Description */}
      <p className="text-gray-500 line-clamp-3 text-sm">{desc}</p>
    </div>
    </Link>
  );
};

export default TemplateCard;
