import {signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';

/**
 * > Local & Shared Imports
 */
import {TaxNigeriaAuth} from '@utils/firebase';

/**
 *
 * @returns
 * @callback promptUserForPassword
 * @param { PasswordStateType }
 */

type PromptUserPassword = {
	email: string;
	password: string;
};

export const useChangePassword = () => {
	// When the user clicks on No, we need their email and password
	const promptUserForPassword = async ({
		email,
		password,
	}: PromptUserPassword): Promise<boolean> => {
		try {
			await signInWithEmailAndPassword(TaxNigeriaAuth, email, password);
			return true;
		} catch (error) {
			let errorMessage =
				'Unable to change your password now, please try again!';

			if (error instanceof Error) {
				const firebaseError = error.message;

				if (firebaseError.includes('auth/invalid-credential')) {
					errorMessage = 'Password is incorrect, please try again';
				} else if (firebaseError.includes('auth/too-many-requests')) {
					errorMessage =
						'Access to this account has been temporarily disabled, please try again.';
				}
				// Display an alert with the appropriate error message
				toast.error(errorMessage);
			}
			return false;
		}
	};

	return {
		promptUserForPassword,
	};
};
