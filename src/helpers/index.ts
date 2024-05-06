import clsx, {ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {format} from 'date-fns';

type OpenGraphType = {
	title: string;
	description: string;
	logo?: string;
};

export const openGraph = ({
	title,
	description,
	logo = '',
}: OpenGraphType): string => {
	const ogLogo = encodeURIComponent(logo);
	const ogSiteName = encodeURIComponent(title.trim());
	const ogDesc = encodeURIComponent(description.trim());

	return `${ogLogo} + ${ogSiteName} + ${ogDesc} `;
};

/** Merge classes with tailwind-merge with clsx full feature */
export const clsMerge = (...classes: ClassValue[]): string => {
	return twMerge(clsx(...classes));
};

export const getRandomKeys = () => {
	const keys = ['x', 'y'];
	const randomIndex = Math.floor(Math.random() * keys.length);

	return keys[randomIndex];
};

export const maskEmail = (email: string): string => {
	const [local, domain] = email.split('@');

	let emailId = '';
	let emailTDD = '';
	let result = '';

	try {
		if (local.length > 0) {
			emailId = local;
		}
		if (domain.length > 0) {
			const [, tdd] = domain.split('.');
			emailTDD = tdd;
		}

		if (emailId.length < 4) {
			result = `${emailId.charAt(0)}${'*'.repeat(6)}@${'*'.repeat(
				5
			)}.${emailTDD}`;
			return result;
		}

		const maskedLocal = emailId.slice(0, 2) + '*'.repeat(6) + emailId.slice(-2);
		const maskedDomain = `${'*'.repeat(5)}.${emailTDD}`;

		result = `${maskedLocal}@${maskedDomain}`;
	} catch (error) {
		throw new Error(`Masked Email:${error}`);
	}

	return result;
};

export const formatTime = async (date: string): Promise<string> => {
	let timeValue = '';
	try {
		const dateTime = new Date(date);

		timeValue = format(dateTime, 'hh:mm a');
	} catch (error) {
		timeValue = '';
		throw error;
	}

	return timeValue;
};

export const sayGreeting = () => {
	const currentTime = new Date();
	const currentHour = currentTime.getHours();

	let greeting;

	if (currentHour >= 5 && currentHour < 12) {
		greeting = 'Good Morning';
	} else if (currentHour >= 12 && currentHour < 17) {
		greeting = 'Good Afternoon';
	} else if (currentHour >= 17 && currentHour < 22) {
		greeting = 'Good Evening';
	} else {
		greeting = 'Good Night';
	}

	return greeting;
};
