type ErrorMessageProps = {
  error?: string;
  visible?: boolean;
};

export const ErrorMessage = ({
  error = '',
  visible = false,
}: ErrorMessageProps) => {
  if (!visible || error.length === 0) return null;

  return <h6 className='mt-1.5 text-sm text-red-500'>{error}</h6>;
};
