export interface NewUser {
  emails: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
}

export interface NewUserData {
  data: NewUser;
}
