import * as React from 'react';

/**
 * ? Local & Shared Imports
 */
import { clsMerge } from '@helpers';

export type InputProps = {
  endAndornment?: React.ReactNode;
  startAndornment?: React.ReactNode;
  containerClassName?: string;
} & React.ComponentPropsWithRef<'input'>;

const ForwardedInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  { containerClassName, endAndornment, startAndornment, className, ...rest },
  ref,
) => {
  const isStartActive = typeof startAndornment !== 'undefined';
  const isEndActive = typeof endAndornment !== 'undefined';
  return (
    <div
      className={clsMerge(
        'relative h-11 w-full rounded-lg',
        containerClassName,
      )}
    >
      {isStartActive && (
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center px-2'>
          {startAndornment}
        </div>
      )}
      <input
        ref={ref}
        spellCheck={false}
        autoComplete='false'
        className={clsMerge(
          'block h-full w-full rounded-md border border-primary px-3 font-primary text-base font-medium outline-none placeholder:text-dark/50',
          className,
          isStartActive && ['pl-7'],
          isEndActive && ['pr-7'],
        )}
        {...rest}
      />
      {isEndActive && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-4'>
          {endAndornment}
        </div>
      )}
    </div>
  );
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(ForwardedInput);
Input.displayName = 'Input';

export { Input };
