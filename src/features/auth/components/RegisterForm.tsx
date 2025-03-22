import { AuthWrapper } from "./AuthWrapper";

export function RegisterForm() {
  return (
    <AuthWrapper
      heading="Регистрация"
      description="Чтобы войти на сайт введите ваш email и пароль"
      backButtonLabel="Уже есть аккаунт? Войти"
      backButtonHref="/auth/login"
      isShowSocial
    >
      Register Form
    </AuthWrapper>
  );
}
