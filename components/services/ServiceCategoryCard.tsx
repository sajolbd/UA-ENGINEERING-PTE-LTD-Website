import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getImageUrl } from "../../lib/api";

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
}

export default function ServiceCategoryCard({
  title,
  description,
  slug,
  image,
}: ServiceCategoryCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative flex flex-col transition-all duration-500 ease-in-out hover:-translate-y-2 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_25px_50px_rgba(100,18,21,0.24)]"
    >
      <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden">
        <div
          className="w-full h-full flex flex-col bg-[#FDFDFD] group-hover:bg-primary transition-all duration-500 ease-in-out"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)" }}
        >
          {/* Card Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-50 border-b border-slate-100/50">
            <Image
              src={getImageUrl(image)}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-350" />
            <div className="absolute top-4 left-4">
              <span className="inline-block rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary shadow-sm">
                UA Engineering
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-xl font-bold tracking-tight text-secondary transition-colors duration-500 group-hover:text-white sm:text-2xl mb-3">
              {title}
            </h3>
            
            <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-500 group-hover:text-white/80 flex-grow mb-4">
              {description}
            </p>

            {/* Action Link */}
            <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-500 group-hover:text-white">
              <span>Explore Services</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
