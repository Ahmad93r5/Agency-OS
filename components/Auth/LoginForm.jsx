import Link from "next/link";

export default function LoginForm({
email, setEmail, password, setPassword, handleSubmit
})
  {
    return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8">

      <h1 className="text-2xl font-semibold text-gray-800 mb-6"> Login </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label  htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1"> Email </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"> Password </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 cursor-pointer text-white py-2 rounded-md hover:bg-gray-800 transition">
          Login
        </button>

      </form>

      <p className="text-center mt-5 text-sm text-gray-600">
        Dont have an account?{" "}
        <Link href="/signup" className="text-gray-900 font-medium hover:underline">
          Sign up
        </Link>
      </p>

    </div>
  </div>
 );
 }