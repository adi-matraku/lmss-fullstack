export interface UserEdit {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: string[];
}

export interface UserEditData {
  data: UserEdit;
}
