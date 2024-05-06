import * as React from 'react';
import { IoIosEyeOff, IoIosEye } from 'react-icons/io';

/**
 * ? Local & Shared Imports
 */

import { FormField, type FormFieldProps } from './FormField';

export interface PasswordFieldProps extends FormFieldProps {
  showPassword: Record<string, boolean>;
  updatePassword: (fieldId: string) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  field,
  fieldId,
  showPassword,
  updatePassword,
  ...rest
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <FormField
      field={field}
      fieldId={fieldId}
      type={showPassword[fieldId] ? 'text' : 'password'}
      endAndornment={
        <button
          type='button'
          aria-label='toggle password visibility'
          onClick={() => updatePassword(fieldId)}
          onMouseDown={handleMouseDown}
        >
          {showPassword[fieldId] ? (
            <IoIosEye fontSize={23} className='text-slate-700' />
          ) : (
            <IoIosEyeOff fontSize={23} className='text-slate-700' />
          )}
        </button>
      }
      {...rest}
    />
  );
};
