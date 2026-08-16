import { useLogin } from "../hooks/useLogin"

export function LoginForm() {
    const {email,setEmail, password, setPassword, handleSubmit, isSubmitting, fieldErrors, formError, successUser } = useLogin()

    if(successUser) {
        return (
            <div>
                <h2>Welcome, {successUser.name}!</h2>
                <p>Login successful. Redirecting to dashboard...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {formError && (
                <div>
                    {formError}
                </div>
            )}
        </form>
    )
}