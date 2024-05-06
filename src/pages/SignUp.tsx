import * as React from 'react';
import {FormikHelpers} from 'formik';

import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

/***
 * ? Local & Shared Imports
 */
import {SignUpForm} from '@tax-nigeria-components/Forms';

import {TaxNigeriaAuth} from '@utils/firebase';
import {storeCookie} from '@lib/storage';

import {USER_EMAIL_KEY} from '@constants/env';
import {SignUpFormType} from '@utils/@types';

export const SignUp = () => {
	const [isLoading, setLoading] = React.useState(false);

	const navigate = useNavigate();

	const submitForm = async (
		values: SignUpFormType,
		actions: FormikHelpers<SignUpFormType>
	) => {
		setLoading(true);
		const {email, password} = values;

		try {
			const result = await createUserWithEmailAndPassword(
				TaxNigeriaAuth,
				email,
				password
			);

			if (typeof result !== 'undefined') {
				const email = result.user.email ?? undefined;
				storeCookie({key: USER_EMAIL_KEY, value: email});
				navigate('/verify-email');
				sendEmailVerification(result.user);
			}
		} catch (error) {
			toast.error('Sign up error :> kindly try again!');
			if (error instanceof Error) {
				throw Error(`${error.message}: Sign Up Failed`);
			}
		} finally {
			actions.setSubmitting(false);
			actions.resetForm();
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col space-y-6 w-full'>
			<div></div>
			<div>
				<h3 className='text-2xl font-extrabold leading-8'>
					Get started with TaxNigeria
				</h3>
				<p className='text-lg leading-5 font-medium text-dark md:text-2xl'>
					Experience a week of premium features, flexible subscription
				</p>
			</div>
			<SignUpForm handleSubmit={submitForm} loading={isLoading} />
		</div>
	);
};
