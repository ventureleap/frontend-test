export interface Login {
  username: string;
  password: string;
}

// can't be used in `register user`, idk why
export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Application {
  id: string;
  name: string;
  secret: string;
  lang: string;
  version: string;
}
