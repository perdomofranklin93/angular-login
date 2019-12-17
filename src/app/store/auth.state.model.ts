export interface AuthStateModel {
  token: string | null;
  email: string | null;
  rememberMe?: boolean | null;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string, rememberMe?: boolean }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
