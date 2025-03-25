
import { SettingsForm } from "@/features/user/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Настройка профиля'
} 

export default function SettingsPage() {
  return <SettingsForm />;
}
