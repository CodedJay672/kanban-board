"use client";

import React, { Dispatch, useState } from "react";

const CustomInput = ({
  label,
  id,
  name,
  value,
  setValue,
}: {
  label: string;
  id: string;
  name: string;
  value: string;
  setValue: Dispatch<string>;
}) => {
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full p-3 border border-gray text-foreground dark:text-foreground/80 dark:border-gray-light outline-none rounded-lg"
      />
    </div>
  );
};

export default CustomInput;
