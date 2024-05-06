import * as React from 'react';
import {FormikHelpers} from 'formik';

/**
 *
 * ? Local & Shared Imports
 */
import {FormContainer} from './FormContainer';
import {PasswordField} from './PasswordField';
import {SubmitButton} from './SubmitButton';

import {UpdatePasswordSchema} from '@utils/form-schemas';
import {type UpdatePasswordType} from '@utils/@types';

interface UpdatePasswordFormProps {
	onSubmit: (
		value: UpdatePasswordType,
		actions: FormikHelpers<UpdatePasswordType>
	) => Promise<void>;
	loading: boolean;
}

export const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
	onSubmit,
	loading,
}) => {
	const [showPassword, setShowPassword] = React.useState<
		Record<string, boolean>
	>({
		old_password: false,
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
		<div className='w-full max-w-lg'>
			<h3 className='pb-6 text-center text-lg font-semibold leading-7 lg:text-xl'>
				Change Your Password
			</h3>
			<FormContainer
				initialValues={{
					old_password: '',
					password: '',
					confirm_password: '',
				}}
				validationSchema={UpdatePasswordSchema}
				onSubmit={onSubmit}
			>
				<PasswordField
					field='old_password'
					fieldId='old_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					placeholder='Enter your old password'
				/>
				<PasswordField
					field='password'
					fieldId='password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					placeholder='Enter your new password'
				/>
				<PasswordField
					field='confirm_password'
					fieldId='confirm_password'
					showPassword={showPassword}
					updatePassword={updatePassword}
					placeholder='Enter to confirm your new password'
				/>
				<SubmitButton textLabel='Update Password' isLoading={loading} />
			</FormContainer>
		</div>
	);
};
