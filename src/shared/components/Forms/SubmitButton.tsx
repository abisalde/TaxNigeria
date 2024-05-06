/**
 * ? Local & Shared Imports
 */
import {Button, type ButtonProps} from '@tax-nigeria-components/Button';

interface SubmitButtonProps extends ButtonProps {}

export const SubmitButton = ({...rest}: SubmitButtonProps) => {
	return <Button type='submit' {...rest} />;
};
