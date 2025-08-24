import React,{ useState, useEffect } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldDark =
      theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", shouldDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // basic client-side validation
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      // TODO: integrate with backend
      await new Promise((res) => setTimeout(res, 800));
      // Example: on success, navigate or show toast
      // navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
  {/* Left: Brand / Value panel (hidden on mobile) */}
  <section
    aria-label="Welcome"
    className="relative hidden md:flex items-center justify-center overflow-hidden
               bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500"
  >
    {/* Decorative pattern */}
    <div className="pointer-events-none absolute inset-0 opacity-20">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    {/* Grows with screen size, keeps readable line length */}
    <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl px-6 sm:px-10 lg:px-16 text-white">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur" />
        <span className="text-xl font-semibold">Application Tracker</span>
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
        Welcome back
      </h1>
      <p className="text-white/90 text-lg mb-8">
        Stay on top of your applications with timelines, reminders, and insights—all in one place.
      </p>

      <ul className="space-y-3 text-white/90">
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-white/90" />
          <span className="text-base">Track stages across companies and roles.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-white/90" />
          <span className="text-base">Get reminders for follow‑ups and deadlines.</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-white/90" />
          <span className="text-base">Visualize progress with clean dashboards.</span>
        </li>
      </ul>
    </div>
  </section>

  {/* Right: Form panel */}
  <main
    aria-label="Login"
    className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-8 lg:px-16 py-10 md:py-16"
  >
    {/* Let the container be fluid; cap the form itself responsively */}
    <div className="relative w-full">
      {/* Theme switcher */}
      <div className="absolute right-0 -top-12 flex gap-2">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`px-3 py-1 rounded border text-sm transition
            ${theme === "light"
              ? "bg-white text-gray-900 border-gray-300"
              : "bg-transparent text-gray-600 dark:text-gray-300 border-transparent hover:border-gray-400"
            }`}
          aria-pressed={theme === "light"}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`px-3 py-1 rounded border text-sm transition
            ${theme === "dark"
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-transparent text-gray-600 dark:text-gray-300 border-transparent hover:border-gray-600"
            }`}
          aria-pressed={theme === "dark"}
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className={`px-3 py-1 rounded border text-sm transition
            ${theme === "system"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-transparent text-gray-600 dark:text-gray-300 border-transparent hover:border-blue-400"
            }`}
          aria-pressed={theme === "system"}
        >
          System
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg
                   p-4 sm:p-6 md:p-8 transition
                   w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto"
      >
        <header className="mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white">
            Sign in
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enter your credentials to access your dashboard.
          </p>
        </header>

        {/* Error message */}
        {error && (
          <div
            className="mb-4 rounded border border-red-200 dark:border-red-400/30
                       bg-red-50 dark:bg-red-900/20 px-4 py-2 text-sm text-red-700 dark:text-red-300"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="email-help"
          />
          <p id="email-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Use your registered email address.
          </p>
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              aria-controls="password"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                       transition"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember + Forgot */}
        <div className="mb-6 flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 dark:border-gray-600
                         text-blue-600 focus:ring-blue-500"
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full inline-flex items-center justify-center gap-2
                     bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                     text-white font-semibold py-2.5 rounded
                     transition disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
          )}
          <span>Sign in</span>
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Secondary action */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          New here?{" "}
          <a href="#" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            Create an account
          </a>
        </p>
      </form>
    </div>
  </main>
</div>
  );
}

    

export default LoginForm;