"use client";

import React, { useState } from "react";

const CustomInput = ({
  label,
  id,
  name,
}: {
  label: string;
  id: string;
  name: string;
}) => {
  const [details, setDetails] = useState("");

  return (
    <div className="w-full flex flex-col space-y-2">
      <label
        htmlFor={id}
        className="text-base text-foreground dark:text-gray-light font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        required
        className="w-full p-3 border border-gray text-foreground dark:text-foreground/80 dark:border-gray-light outline-none rounded-lg"
      />
    </div>
  );
};

export default CustomInput;
