import { useState  } from "react";
import type { User } from "../../../contracts/user.contract";
import { loginUser } from "../../../api/authApi";
import { AuthenticationError, ValidationError } from "../../../api/error";

export function useLogin() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [isSubmitting, setIsSubmitting] = useState(false);

const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
const [formError, setFormError] = useState<string | null>(null);

const [successUser, setSuccessUser] = useState<User | null>(null);

const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFieldErrors({});
    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await loginUser({ email, password });
      setSuccessUser(response.user);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string> = {};
        error.details.forEach((detail) => {
          errors[detail.field] = detail.message;
        });

        setFieldErrors(errors);
      } else if (error instanceof AuthenticationError) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // inputs
    email,
    setEmail,
    password,
    setPassword,
    // actions
    handleSubmit,
    // states
    isSubmitting,
    fieldErrors,
    formError,
    successUser,
  };
}
