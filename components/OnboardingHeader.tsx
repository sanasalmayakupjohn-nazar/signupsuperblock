"use client";

import Image from "next/image";
import Link from "next/link";

export default function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8E5DF] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 items-center justify-between px-5 sm:px-8">
        {/* LEFT — SUPERBLOCK BRAND */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/super%20block%201.png"
            alt="Superblock"
            width={26}
            height={26}
            priority
            className="h-[26px] w-[26px] object-contain"
          />
          <span className="whitespace-nowrap text-[15.5px] font-semibold leading-none tracking-[-0.025em] text-[#111111]">
            Superblock
          </span>
        </Link>

        {/* RIGHT — COUNTRY + SKIP */}
        <div className="flex items-center gap-3">
          {/* India Tag */}
          <div className="inline-flex items-center gap-1.5 leading-none">
            <Image
              src="/Flag_of_India.png"
              alt="India"
              width={14}
              height={10}
              className="h-2.5 w-[14px] rounded-[1px] object-cover ring-1 ring-slate-200"
            />
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#525252]">
              India
            </span>
          </div>

          {/* Skip for now */}
          <Link
            href="/"
            className="text-[12.5px] font-medium text-[#8E8B85] transition-colors hover:text-[#111111]"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </header>
  );
}
