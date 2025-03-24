import { NewVerificationForm } from "@/features/auth/components/NewVerificationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

export default function NewVerificationPage() {
  return <NewVerificationForm />;
}
