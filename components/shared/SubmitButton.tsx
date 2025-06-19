"use client";

import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full p-3 bg-dark-1 text-background dark:text-foreground dark:bg-accent rounded-full"
    >
      {pending ? (
        <Loader2Icon
          size={16}
          className="text-background dark:text-foreground animate-spin"
        />
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
