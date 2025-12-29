import clsx from "clsx";

interface FormErrorProps {
  message: string;
  className?: string;
}

const FormError = ({ message, className }: FormErrorProps) => {
  return message ? (
    <div
      id="form-errors"
      aria-live="polite"
      aria-atomic="true"
      className={clsx("border-t pt-1", className)}
    >
      <p className="mt-2 text-sm text-red-600">{message}</p>
    </div>
  ) : null;
};

export default FormError;
