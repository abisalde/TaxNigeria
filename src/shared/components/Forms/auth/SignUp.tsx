import * as React from 'react';
import {FormikHelpers} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {FormContainer} from '../FormContainer';
import {FormField} from '../FormField';
import {PasswordField} from '../PasswordField';
import {SubmitButton} from '../SubmitButton';

import {SignUpFormSchema} from '@utils/form-schemas';
import {SignUpFormType} from '@utils/@types';

interface SignUpFormProps {
	handleSubmit: (
		values: SignUpFormType,
		actions: FormikHelpers<SignUpFormType>
	) => Promise<void>;
	loading: boolean;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
	handleSubmit,
	loading,
}) => {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		password: false,
		confirm_password: false,
	});

	const updatePassword = (fieldId: string) => {
		setShowPassword({
			...showPassword,
			[fieldId]: !showPassword[fieldId],
		});
	};

	return (
		<div className='h-full w-full'>
			<FormContainer
				initialValues={{
					email: '',
					password: '',
					confirm_password: '',
				}}
				validationSchema={SignUpFormSchema}
				onSubmit={handleSubmit}
			>
				<FormField
					field='email'
					fieldId='email'
					placeholder='Enter your email'
				/>
				<PasswordField
					field='password'
					fieldId='password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					placeholder='Enter your password'
				/>
				<PasswordField
					field='confirm_password'
					fieldId='confirm_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					placeholder='Confirm your password'
				/>
				<div></div>
				<div></div>
				<div></div>
				<div className='flex w-full flex-col'>
					<SubmitButton
						textLabel='sign up'
						className='text-base capitalize'
						isLoading={loading}
					/>
				</div>
			</FormContainer>
		</div>
	);
};
