export type TLoginRequest = {
  login: string;
  password: string;
};

export type TLogoutResponse = {
  message: string;
};

export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordChangePasswordRequest = {
  resetPasswordToken: string;
  password: string;
  passwordConfirmation: string;
};
