import * as React from 'react';
import {FormikHelpers} from 'formik';

import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

/***
 * ? Local & Shared Imports
 */
import {SignInForm} from '@tax-nigeria-components/Forms';

import {loginUser, useGlobalState} from '@lib/reducer';

import {TaxNigeriaAuth} from '@utils/firebase';
import {storeCookie} from '@lib/storage';

import {USER_EMAIL_KEY} from '@constants/env';
import {SignInFormType} from '@utils/@types';

export const SignIn = () => {
	const [isLoading, setLoading] = React.useState(false);

	const {dispatch} = useGlobalState();
	const navigate = useNavigate();

	const submitForm = async (
		values: SignInFormType,
		actions: FormikHelpers<SignInFormType>
	) => {
		setLoading(true);
		const {email, password} = values;

		try {
			const result = await signInWithEmailAndPassword(
				TaxNigeriaAuth,
				email,
				password
			);

			if (!result.user?.emailVerified) {
				const email = result.user.email ?? undefined;
				storeCookie({key: USER_EMAIL_KEY, value: email});
				navigate('/verify-email');
				sendEmailVerification(result.user);
				return; // Early return
			} else {
				toast.success('Welcome to your TaxNigeria Dashboard');
				loginUser(dispatch, result.user);
				navigate('/');
			}
		} catch (error) {
			if (error instanceof Error) {
				throw Error(`${error.message}: Login Failed`);
			}
			toast.error('Login attempt failed, Please try again');
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
					Login to your TaxNigeria account
				</h3>
				<p className='text-lg leading-5 font-medium text-dark md:text-2xl'>
					Experience a premium features
				</p>
			</div>
			<SignInForm handleSubmit={submitForm} loading={isLoading} />
		</div>
	);
};
