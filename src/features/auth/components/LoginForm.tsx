import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isSubmitting,
    fieldErrors,
    formError,
    successUser,
  } = useLogin();

  if (successUser) {
    return (
      <div>
        <h2>Welcome, {successUser.name}!</h2>
        <p>Login successful. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formError && <div>{formError}</div>}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          // Accessibility: Mark input as invalid if there's an error
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {/* Field-level error message */}
        {fieldErrors.email && (
          <p id="email-error" className="field-error" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          aria-invalid={!!fieldErrors.password}
          aria-describedby={fieldErrors.password ? "password-error" : undefined}
        />
        {fieldErrors.password && (
          <p id="password-error" className="field-error" role="alert">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
