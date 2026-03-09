export interface ValuesLogin {
  // Se houver algum parâmetro extra necessário para o seu fluxo de login
  // (ex: redirecionamento, tipo de acesso, etc.)
  redirectUrl?: string;
  rememberMe?: boolean;
}