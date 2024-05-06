/**
 * ? Local & Shared Imports
 */
import {AUTH_TOKEN} from '@constants/env';
import CookieHandler from './cookie-handler';

interface StorageProps {
	key: string;
	value?: string;
}

export const storeCookie = ({key, value}: StorageProps): void => {
	const maxAge = 7 * 60 * 60;

	if (key && value) {
		CookieHandler.setCookie(key, JSON.stringify(value), {
			days: 1,
			maxAge,
			sameSite: 'Strict',
			domain: '',
		});
	}
};

export const getAuthToken = (): string | undefined => {
	const cookie = CookieHandler.getCookie(AUTH_TOKEN, {
		domain: '',
		sameSite: 'Strict',
	});

	return typeof cookie === 'string' ? cookie : undefined;
};

export const getCookie = ({key}: StorageProps): string | undefined => {
	const cookie = CookieHandler.getCookie(key, {
		domain: '',
		sameSite: 'Strict',
	});

	return typeof cookie === 'string' ? JSON.parse(cookie) : undefined;
};

export const deleteStoredCookie = ({key}: StorageProps) =>
	CookieHandler.deleteCookie(key, {
		domain: '',
		maxAge: -1,
		sameSite: 'Strict',
	});

export const setSessionLocalItem = ({key, value}: StorageProps) => {
	if (typeof window !== 'undefined' && window.sessionStorage && value) {
		window.sessionStorage.setItem(key, JSON.stringify(value));
	}
};

export const setLocalItem = ({key, value}: StorageProps) => {
	if (typeof window !== 'undefined' && window.localStorage && value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
};

export const getLocalItem = <T>({key}: StorageProps): T | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const item = window.localStorage.getItem(key);
		if (item !== null) {
			try {
				return JSON.parse(item);
			} catch (err) {
				throw new Error(`${err}: Error getting local item from local storage`);
			}
		}
	}
	return null;
};

export const getSessionItem = <T>({key}: StorageProps): T | null => {
	if (typeof window !== 'undefined' && window.sessionStorage) {
		const item = window.sessionStorage.getItem(key);
		if (item !== null) {
			try {
				return JSON.parse(item);
			} catch (err) {
				throw new Error(`${err}: Error getting local item from local storage`);
			}
		}
	}
	return null;
};

export const removeSessionItem = ({key}: StorageProps) =>
	window.sessionStorage.removeItem(key);
export const removeLocalItem = ({key}: StorageProps) =>
	window.localStorage.removeItem(key);

export const clearStorage = () => {
	window.sessionStorage.clear();
	window.localStorage.clear();
};
