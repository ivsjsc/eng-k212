export interface IAuthUser {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  emailVerified?: boolean;
  provider?: string;
  phone?: string;
}

export interface IAuthService {
  onChange(cb: (user: IAuthUser | null) => void): () => void;
  signUpEmail(email: string, password: string, name?: string, role?: string): Promise<IAuthUser>;
  signInEmail(email: string, password: string): Promise<IAuthUser>;
  signInGoogle(roleHint?: string): Promise<void>;
  startPhoneSignIn(phone: string): Promise<{ confirm: (code: string) => Promise<IAuthUser> }>;
  sendPasswordReset(email: string): Promise<void>;
  signOut(): Promise<void>;
  getCurrent(): IAuthUser | null;
}