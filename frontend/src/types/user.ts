export type AccessToken = string | null;
export type Email = string | undefined;
export type Password = string | undefined;
export type Name = string | undefined;
export type Message = string | undefined;
export type Success = boolean;

export interface User {
  email: Email;
  name: Name;
}

// Request Types
export interface CreateUserRequest {
  email: Email;
  password: Password;
  name: Name;
}

export interface GetUserRequest {
  email: Email;
  password: Password;
}

export interface UpdateUserRequest {
  email: Email;
  password: string,
  name: Name;
}


// Response Types
export interface CreateUserResponse {
  user: User;
  access_token: AccessToken;
}

export interface GetUserResponse {
  email: string;
  name: string;
  access_token: AccessToken;
}

export interface UpdateUserResponse {
  user: User;
}