/**
 * ? Local & Shared Import
 */

interface LoadingAnimationProps {
  variants?: 'small' | 'medium' | 'large';
}

export const LoadingAnimation = ({
  variants = 'medium',
}: LoadingAnimationProps) => {
  const sizeClassName = variants !== 'medium' ? ` ${variants}` : '';

  return (
    <div
      aria-hidden={true}
      role='spinbutton'
      aria-label='Spinner'
      className={`loading_animation ${sizeClassName} border-whites relative box-border inline-block animate-spin rounded-full border-4`}
    ></div>
  );
};
