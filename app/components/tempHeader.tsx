"use client";

import Image from "next/image";
import Link from "next/link";

export default function tempHeader() {
  return (
    <header className="w-full border-b border-[#E5E2DD] bg-white">
      <div className="flex h-[56px] w-full items-center justify-between px-6">

        {/* LEFT — SUPERBLOCK */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/super%20block%201.png"
            alt="Superblock"
            width={30}
            height={30}
            className="h-[30px] w-[30px] object-contain"
          />

          <span className="whitespace-nowrap text-[15px] font-semibold leading-none text-[#111111]">
            Superblock
          </span>
        </Link>

        {/* RIGHT — COUNTRY + SKIP */}
        <div className="flex items-center gap-5">

          {/* India */}
          <div className="flex items-center gap-2">

            <Image
              src="/Flag_of_India.png"
              alt="India"
              width={20}
              height={14}
              className="h-[14px] w-[20px] object-cover"
            />

            <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.8px] leading-none text-[#55514B]">
              India
            </span>

          </div>

          {/* Skip for now */}
          <Link
            href="/dashboard"
            className="whitespace-nowrap text-[13px] font-medium leading-none text-[#77736D] transition-colors hover:text-[#111111]"
          >
            Skip for now
          </Link>

        </div>

      </div>
    </header>
  );
}