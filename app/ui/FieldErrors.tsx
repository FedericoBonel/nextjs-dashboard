import { ActionState } from "@/app/lib/controllers/types";

const FieldErrors = ({
  id,
  errors,
}: {
  id?: string;
  errors?: ActionState["errors"][number];
}) => {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error, index) => (
        <p key={index} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )) || null}
    </div>
  );
};

export default FieldErrors;
