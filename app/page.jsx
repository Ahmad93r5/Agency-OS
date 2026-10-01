import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Users,
  FileText,
  Bot,
  Paperclip,
  Lock,
  ArrowRight,
  Sparkles,
  UserPlus,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Building2,
      title: "Workspaces",
      description:
        "Organize clients by project, department, or team. Keep everything separate and clean.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Users,
      title: "Clients",
      description:
        "Store client name, email, phone, and full history — all in one place.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: FileText,
      title: "Notes",
      description:
        "Write meeting notes, follow-ups, and ideas. Attach files for full context.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Bot,
      title: "AI Briefings",
      description:
        "Generate summaries from your notes automatically — save hours of manual work.",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: Paperclip,
      title: "File Uploads",
      description:
        "Attach multiple files per note — images, PDFs, documents. Stored securely in cloud.",
      color: "bg-pink-50 text-pink-600",
    },
    {
      icon: Lock,
      title: "Secure Auth",
      description:
        "JWT-based authentication with bcrypt password hashing. Your data stays private.",
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  const steps = [
    { icon: UserPlus, title: "Sign up free", description: "30 seconds setup" },
    { icon: Building2, title: "Create workspace", description: "By project or client" },
    { icon: Users, title: "Add clients", description: "Contact info and history" },
    { icon: FileText, title: "Add notes", description: "Write notes, attach files" },
    { icon: Sparkles, title: "Generate briefing", description: "AI summarizes notes" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Agency OS"
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg object-contain"
              priority
            />
            <span className="text-lg font-bold text-gray-900">Agency OS</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/login"
              className="px-3 md:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 md:px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-sm active:scale-95"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-blue-50 via-white to-white"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 text-center">
          

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Client
            <br />
            Management for{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Agencies
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Manage your workspaces, clients, and notes in one place. Get
            AI-powered briefings to save hours of manual work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="group w-full sm:w-auto px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
            >
              Get Started Free
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center active:scale-95"
            >
              Learn More
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            ✅ No credit card required · ✅ Free forever · ✅ Setup in 30 seconds
          </p>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              All the tools to manage your clients, projects, and team — in one
              simple platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in 5 easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative text-center">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="absolute top-0 left-1/2 translate-x-6 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== WHY AGENCY OS ===== */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Agency OS?
            </h2>
            <p className="text-lg text-gray-600">
              Built for modern agencies and freelancers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Free forever",
              "AI-powered briefings",
              "No credit card required",
              "Cloud file storage",
              "Mobile friendly",
              "Real-time updates",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200"
              >
                <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 p-10 md:p-16 text-center shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start managing your clients the smart way. Free forever, no
                credit card required.
              </p>

              <Link
                href="/signup"
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg active:scale-95"
              >
                Sign Up Free
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Agency OS"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain"
              />
              <div>
                <p className="text-base font-bold text-gray-900">Agency OS</p>
                <p className="text-xs text-gray-500">
                  AI-powered client management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/login" className="hover:text-gray-900 transition">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-900 transition">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Agency OS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}