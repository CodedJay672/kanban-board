import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserImage = ({ imgUrl, name }: { imgUrl: string; name: string }) => {
  return (
    <Avatar className="bg-dark-3 dark:bg-gray-light">
      <AvatarImage src={imgUrl} />
      <AvatarFallback className="capitalize text-dark-2 dark:text-dark-1">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserImage;
