"use client";

import { LoginSchema, TypeLoginSchema } from "@/features/auth/schemas";
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
import { useLoginMutation } from "../hooks";
import { AuthWrapper } from "./AuthWrapper";

export function LoginForm() {
  const { theme } = useTheme();
  const [recValue, setRecValue] = useState<string | null>(null);

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login, isLoadingLogin } = useLoginMutation();

  const onSubmit = (values: TypeLoginSchema) => {
    if (recValue) {
      login({ values, recaptcha: recValue });
    } else {
      toast.error("Пожалуйста, завершите reCAPTCHA");
    }
  };
  return (
    <AuthWrapper
      heading="Войти"
      description="Чтобы войти на сайт введите ваш email и пароль"
      backButtonLabel="Ещё нет аккаунта? Регистрация"
      backButtonHref="/auth/register"
      isShowSocial
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
                    disabled={isLoadingLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                    disabled={isLoadingLogin}
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
          <Button type="submit" disabled={isLoadingLogin}>
            Войти в аккаунт
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
