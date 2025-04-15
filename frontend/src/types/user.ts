export type AccessToken = string | null;
export type Email = string | undefined;
export type Password = string | undefined;
export type Name = string | undefined;
export type Message = string | undefined;
export type Success = boolean;
export type Id = number | undefined;

export interface User {
  id: Id;
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
  password: {
    new: string,
    old: string,
  };
  name: Name;
}


// Response Types
export interface CreateUserResponse {
  user: User;
  accessToken: AccessToken;
}

export interface GetUserResponse {
  user: User;
  accessToken: AccessToken;
}

export interface UpdateUserResponse {
  user: User;
}