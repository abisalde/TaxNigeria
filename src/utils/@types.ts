export type SignUpFormType = {
	email: string;
	password: string;
	confirm_password: string;
};

export type SignInFormType = {
	email: string;
	password: string;
};

export enum COLLECTIONS_NAME {
	USERS = 'USERS',
}

export type UpdatePasswordType = {
	old_password: string;
	password: string;
	confirm_password: string;
};
