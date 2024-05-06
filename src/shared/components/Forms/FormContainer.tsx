import * as React from 'react';

import {Formik, type FormikHelpers} from 'formik';

interface FormContainerProps<T> {
	initialValues: T;
	validationSchema: object | unknown;
	onSubmit: (values: T, actions: FormikHelpers<T>) => Promise<void>;
	children: React.ReactNode;
}

export const FormContainer = <T extends Record<string, string>>({
	children,
	initialValues,
	onSubmit,
	validationSchema,
}: FormContainerProps<T>) => {
	return (
		<Formik
			validateOnMount={true}
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({handleSubmit}) => (
				<form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
					{children}
				</form>
			)}
		</Formik>
	);
};
