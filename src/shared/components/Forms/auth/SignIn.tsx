import * as React from 'react';
import {FormikHelpers} from 'formik';

/**
 * ? Local & Shared Import Imports
 */
import {FormContainer} from '../FormContainer';
import {FormField} from '../FormField';
import {PasswordField} from '../PasswordField';
import {SubmitButton} from '../SubmitButton';

import {SignInFormType} from '@utils/@types';
import {SignInFormSchema} from '@utils/form-schemas';

interface SignInFormProps {
	handleSubmit: (
		values: SignInFormType,
		actions: FormikHelpers<SignInFormType>
	) => Promise<void>;
	loading: boolean;
}

export const SignInForm: React.FC<SignInFormProps> = ({
	handleSubmit,
	loading,
}) => {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		password: false,
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
				}}
				validationSchema={SignInFormSchema}
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
				<div></div>
				<div></div>
				<div></div>
				<div className='flex w-full flex-col'>
					<SubmitButton
						textLabel='sign in'
						className='text-lg capitalize'
						isLoading={loading}
					/>
				</div>
			</FormContainer>
		</div>
	);
};
