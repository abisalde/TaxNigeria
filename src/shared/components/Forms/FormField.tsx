import * as React from 'react';
import {useField} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {ErrorMessage} from './ErrorMessage';
import {type InputProps, Input} from '@tax-nigeria-components/Input';

export interface FormFieldProps extends InputProps {
	field: string;
	fieldId: string;
}

export const FormField: React.FC<FormFieldProps> = ({
	field,
	fieldId,
	...props
}) => {
	const [fieldProps, meta] = useField(field);

	const visible = meta.touched && Boolean(meta.error);
	const helperText = String(meta.error) ?? '';

	return (
		<div>
			<Input id={fieldId} {...fieldProps} {...props} />
			<ErrorMessage visible={visible} error={helperText} />
		</div>
	);
};
