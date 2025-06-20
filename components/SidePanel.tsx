import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidePanel = () => {
  return (
    <nav className="w-[80px] h-screen py-6 bg-dark-1 shrink-0 dark:bg-dark-1 sticky top-0 left-0 flex items-center flex-col">
      <div className="w-full flex-center gap-2">
        <div className="size-1.5 rounded-full bg-background dark:bg-foreground" />
        <div className="size-1.5 rounded-full bg-background/40 dark:bg-gray-light" />
        <div className="size-1.5 rounded-full bg-background/40 dark:bg-foreground/40" />
      </div>

      <Link href="/" className="p-1 size-5 relative mt-10 mb-9">
        <Image
          src="/assets/Logo.png"
          alt="Kanban pro"
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex-center flex-col gap-3">
        <Link
          href="/"
          className="size-12 rounded-full bg-dark-3 flex-center relative "
        >
          <Image
            src="/assets/dashboard.png"
            alt="dashboard"
            width={18}
            height={18}
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/user"
          className="size-12 rounded-full flex-center relative"
        >
          <Image
            src="/person.png"
            alt="user"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/calendar"
          className="size-12 rounded-full  flex-center relative "
        >
          <Image
            src="/calendar.png"
            alt="calendar"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/stats"
          className="size-12 rounded-full flex-center relative "
        >
          <Image
            src="/stats.png"
            alt="stats"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/upload"
          className="size-12 rounded-full flex-center relative "
        >
          <Image
            src="/upload.png"
            alt="upload"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/details"
          className="size-12 rounded-full flex-center relative "
        >
          <Image
            src="/details.png"
            alt="details"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
        <Link
          href="/settings"
          className="size-12 rounded-full flex-center relative "
        >
          <Image
            src="/settings.png"
            alt="settings"
            width={18}
            height={18}
            color="#292b31"
            className="w-[18px] h-[18px] object-contain"
          />
        </Link>
      </div>

      <div className="size-12 rounded-full flex-center absolute bottom-2 left-3">
        <Image
          src="/logout.png"
          alt="logout"
          width={18}
          height={18}
          color="#292b31"
          className="w-[18px] h-[18px] object-contain"
        />
      </div>
    </nav>
  );
};

export default SidePanel;
