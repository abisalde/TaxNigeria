import * as Yup from 'yup';

/**
 * ? Local Imports
 */
import type {
	SignInFormType,
	SignUpFormType,
	UpdatePasswordType,
} from './@types';

export const SignUpFormSchema: Yup.Schema<SignUpFormType> = Yup.object().shape({
	email: Yup.string()
		.lowercase()
		.trim()
		.email('Enter a valid email address')
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			'Invalid email address'
		)
		.required('Email is required')
		.label('Email'),
	password: Yup.string()
		.trim()
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		)
		.required('Password is required')
		.label('Password'),

	confirm_password: Yup.string()
		.trim()
		.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
		.required('Confirm Password is required')
		.label('Confirm Password'),
});

export const SignInFormSchema: Yup.Schema<SignInFormType> = Yup.object().shape({
	email: Yup.string()
		.lowercase()
		.trim()
		.email('Enter a valid email address')
		.matches(
			/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
			'Invalid email address'
		)
		.required('Email is required')
		.label('Email'),
	password: Yup.string()
		.trim()
		.required('Password is required')
		.label('Password'),
});

export const UpdatePasswordSchema: Yup.Schema<UpdatePasswordType> =
	Yup.object().shape({
		old_password: Yup.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('Old Password is required')
			.label('Old Password'),
		password: Yup.string()
			.trim()
			.min(8, 'Password must be at least 8 characters')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			)
			.required('New Password is required')
			.label('New Password'),

		confirm_password: Yup.string()
			.trim()
			.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
			.required('Confirm New Password is required')
			.label('Confirm New Password'),
	});
