import * as React from 'react';
import {sendEmailVerification} from 'firebase/auth';
import {toast} from 'react-toastify';

import {redirect, useNavigate} from 'react-router-dom';
/**
 * ? Local & Shared Imports
 */
import {Button} from '@tax-nigeria-components/Button';

import {deleteStoredCookie, getCookie} from '@local-storage';
import {maskEmail} from '@helpers';
import {loginUser, useGlobalState} from '@lib/reducer';

import {USER_EMAIL_KEY} from '@constants/env';

export const VerifyEmail = () => {
	const email = getCookie({key: USER_EMAIL_KEY}) ?? '';

	const [timer, setTimer] = React.useState<boolean>(true);
	const [countdown, setCountdown] = React.useState<number>(60);

	const {state, dispatch} = useGlobalState();
	const navigate = useNavigate();

	const resendEmail = React.useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			if (state.User !== null) {
				sendEmailVerification(state.User);
				setTimer(true);

				toast.info(
					'Please check your email for verification link and follow the prompt'
				);
			}
		},
		[state.User]
	);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			state.User?.reload()
				.then(() => {
					if (state.User?.emailVerified) {
						loginUser(dispatch, state.User);
						clearInterval(intervalId);
						setTimeout(() => {
							navigate('/');
							deleteStoredCookie({key: USER_EMAIL_KEY});
						}, 800);
					}
				})
				.catch((error) => {
					toast.error('Error validating the your email');
					throw new Error(`${error.message}: Email Validation`);
				});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [state.User]);

	React.useEffect(() => {
		let intervalTimer: ReturnType<typeof setInterval>;

		if (timer && countdown !== 0) {
			intervalTimer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
		} else if (countdown === 0) {
			setTimer(false);
			setCountdown(60);

			if (state.User?.emailVerified) {
				loginUser(dispatch, state.User);
				deleteStoredCookie({key: USER_EMAIL_KEY});
				setTimeout(() => {
					navigate('/');
				}, 800);
			}
		}

		return () => clearInterval(intervalTimer);
	}, [timer, countdown]);

	return (
		<div className='flex flex-col items-center justify-center gap-5'>
			<h2 className='font-primary text-xl font-medium text-dark lg:text-2xl'>
				Verify your Email Address
			</h2>
			<h5 className='font-primary text-base font-semibold text-primary-dark'>
				Kindly check your email {`${maskEmail(email)}`} for a verification link:
			</h5>
			<p className='font-primary text-xs font-light text-dark/75'>
				Follow the instruction in the email to verify your account
			</p>
			<Button
				type='button'
				disabled={timer}
				textLabel={`Resend Email ${timer ? `(${countdown})` : ''}`}
				className='w-44'
				onClick={resendEmail}
			/>
		</div>
	);
};

export const VerifyEmailLoader = async () => {
	const email = getCookie({key: USER_EMAIL_KEY});

	if (typeof email === 'undefined') {
		return redirect('/sign-in');
	}
	return null;
};
