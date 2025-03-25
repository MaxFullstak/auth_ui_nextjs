"use client";

import {
  ResetPasswordSchema,
  TypeResetPasswordSchema,
} from "@/features/auth/schemas";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../hooks";
import { AuthWrapper } from "./AuthWrapper";

export function ResetPasswordForm() {
  const { theme } = useTheme();
  const [recValue, setRecValue] = useState<string | null>(null);

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { reset, isLoadingReset } = useResetPasswordMutation();

  const onSubmit = (values: TypeResetPasswordSchema) => {
    if (recValue) {
      reset({ values, recaptcha: recValue });
    } else {
      toast.error("Пожалуйста, завершите reCAPTCHA");
    }
  };
  return (
    <AuthWrapper
      heading="Сброс пароля"
      description="Для сброса пароля введите свою почту"
      backButtonLabel="Войти в аккаунт"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ivan@example.ru(com)"
                    type="email"
                    disabled={isLoadingReset}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ReCAPTCHA
            sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
            onChange={setRecValue}
            theme={theme === "light" ? "light" : "dark"}
          />
          <Button type="submit" disabled={isLoadingReset}>
            Сбросить
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
