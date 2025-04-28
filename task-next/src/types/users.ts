export interface userLogin {
    identifier: string;
    password: string;
}
export interface LoginResponse {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
}

export interface userSignup {
    username: string;
    email: string;
    password: string;
}

export interface TokenData {
  access_token?: string;
}

export interface UserData {
  email: string;
  name?: string;
}

export interface RegisterData {
  user: {
    id: number;
  };
}