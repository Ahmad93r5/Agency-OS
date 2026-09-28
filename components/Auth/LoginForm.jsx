import Link from "next/link";
import {
  X,
  AlertCircle,
  Mail,
  Lock,
  Loader2,
  LogIn,
} from "lucide-react";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
  setError,
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-gray-50 to-purple-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        {/* Header with icon */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <LogIn size={24} className="text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your Agency OS account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between gap-2">
            <span className="text-sm md:text-base flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 text-black rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full border border-gray-300 text-black rounded-lg pl-10 pr-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base transition"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base font-medium flex items-center justify-center gap-2 active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}