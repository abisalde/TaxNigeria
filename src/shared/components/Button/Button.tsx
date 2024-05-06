import * as React from 'react';

/**
 * ? Local & Shared Imports
 */

/**
 * ? Assets
 */
import {clsMerge} from '@helpers';
import CircleShimmer from '@assets/CircleShimmer';

export type ButtonProps = {
	children?: React.ReactNode;
	isLoading?: boolean;
	textLabel?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			children,
			disabled: ButtonDisabled,
			isLoading = false,
			textLabel,
			...rest
		},
		ref
	) => {
		const disabled = isLoading || ButtonDisabled;

		return (
			<button
				className={clsMerge(
					'inline-flex h-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-primary text-base font-medium text-white',
					'focus:outline-none focus-visible:bg-primary',
					'shadow-sm',
					'transition-colors duration-75',
					'disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-dark/70',

					isLoading &&
						'relative bg-slate-200 text-transparent transition-none hover:text-transparent disabled:cursor-wait',
					className
				)}
				disabled={disabled}
				ref={ref}
				{...rest}
			>
				{isLoading && <CircleShimmer className='h-7 w-7 text-primary' />}
				{isLoading ? null : textLabel}
				{'   '}
				{isLoading ? null : children}
			</button>
		);
	}
);
Button.displayName = 'CustomButton';
export {Button};
