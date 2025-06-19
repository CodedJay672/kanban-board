import { BellIcon, Calendar1Icon, SearchIcon } from "lucide-react";
import React from "react";
import UserImage from "./shared/UserImage";
import dayjs from "dayjs";

const Topbar = () => {
  const today = dayjs().format("DD MMM YY").toLowerCase();
  return (
    <div className="w-full flex-between py-3">
      <h1 className="text-xl font-bold text-foreground dark:text-foreground font-exo">
        Welcome back, Vincent 👋
      </h1>

      <div className="flex-center gap-4">
        <SearchIcon
          size={18.33}
          className="text-foreground dark:text-gray-light"
        />
        <BellIcon
          size={18.33}
          className="text-foreground dark:text-gray-light"
        />
        <div className="flex items-center">
          <Calendar1Icon
            size={18.33}
            className="text-foreground dark:text-gray-light"
          />
          <span className="ml-2 text-base font-exo font-semibold text-foreground dark:text-gray-light">
            {today}
          </span>
        </div>

        <UserImage imgUrl="/img" name="emmanuel" />
      </div>
    </div>
  );
};

export default Topbar;
