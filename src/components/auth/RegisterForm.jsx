import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(email, password);
      if (!result.success) {
        const errorMsg = result.error || 'Registration failed. Please try again.';
        setError(errorMsg);
        // Also show as alert to persist through page refresh
      }
    } catch (error) {
      const errorMsg = error.message || 'An unexpected error occurred.';
      setError(errorMsg);
      // Also show as alert to persist through page refresh
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-violet-300 to-indigo-300 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 opacity-30 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md px-6">
        {/* Glassmorphism Card */}
        <div className="relative rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="px-6 pt-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/20 flex items-center justify-center">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">Join Document Chat AI and start chatting with your documents</p>
          </div>

          {/* Form */}
          <form className="px-6 pb-8 pt-6 space-y-6" onSubmit={handleSubmit} aria-label="Registration form">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required="true"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none ring-0 transition
                               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your email"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 peer-focus:text-indigo-500 transition">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M2.94 6.94a1.5 1.5 0 012.12 0L10 11.879l4.94-4.94a1.5 1.5 0 112.12 2.122l-6 6a1.5 1.5 0 01-2.12 0l-6-6a1.5 1.5 0 010-2.121z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    aria-required="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer block w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none ring-0 transition
                               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Create a password"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 peer-focus:text-indigo-500 transition">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9H5.25A2.25 2.25 0 003 11.25v7.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-7.5A2.25 2.25 0 0018.75 9H17.25V6.75A5.25 5.25 0 0012 1.5zm-3.75 7.5V6.75a3.75 3.75 0 117.5 0V9h-7.5z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    aria-required="true"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="peer block w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none ring-0 transition
                               focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Confirm your password"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 peer-focus:text-indigo-500 transition">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9H5.25A2.25 2.25 0 003 11.25v7.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-7.5A2.25 2.25 0 0018.75 9H17.25V6.75A5.25 5.25 0 0012 1.5zm-3.75 7.5V6.75a3.75 3.75 0 117.5 0V9h-7.5z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Animated error */}
            {error && (
              <div
                className="transform-gpu animate-[fadeIn_.25s_ease-out] rounded-xl border border-red-200 bg-red-50/80 p-3 shadow-sm"
                role="alert"
                aria-live="polite"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 6h2v6H9V6zm0 8h2v2H9v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition
                           hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                aria-busy={isLoading ? 'true' : 'false'}
              >
                <span className="absolute inset-0 -z-10 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0A12 12 0 002 12h2zm2 5.291A7.962 7.962 0 014 12H2c0 3.042 1.135 5.824 3 7.938l1-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create account'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-medium text-indigo-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

