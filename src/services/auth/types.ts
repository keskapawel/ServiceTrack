export type TLoginRequest = {
  email: string;
  password: string;
};

export type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
  surname: string;
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

export type TChangePasswordRequest = {
  password: string;
  newPassword: string;
  newPasswordConfirmation: string;
};
