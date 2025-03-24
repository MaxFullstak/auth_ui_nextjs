"use client";

import { Loader } from "@/shared/components/ui/";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useVerificationMutation } from "../hooks";
import { AuthWrapper } from "./AuthWrapper";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verification } = useVerificationMutation();
  useEffect(() => {
    verification(token);
  }, [token]);
  return (
    <AuthWrapper heading="Подтверждение почты">
      <div>
        <Loader />
      </div>
    </AuthWrapper>
  );
}
