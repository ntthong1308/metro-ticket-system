import type { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Đăng ký | MetroNext",
  description: "Tạo tài khoản MetroNext để bắt đầu hành trình của bạn",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12v4M20 12v4M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M12 2v4M8 6h8M6 10h12M6 14h12" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">MetroNext</h1>
              <p className="text-blue-200 text-sm">Passenger System</p>
            </div>
          </div>

          {/* Slogan */}
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Bắt đầu hành trình của bạn
          </h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Đăng ký tài khoản MetroNext để trải nghiệm dịch vụ vé điện tử
            tiện lợi và nhanh chóng.
          </p>

          {/* Features */}
          <div className="space-y-4 text-left">
            {[
              {
                icon: "🎫",
                title: "Mua vé trực tuyến",
                desc: "Mua vé metro chỉ trong vài giây",
              },
              {
                icon: "📱",
                title: "Quản lý hành trình",
                desc: "Theo dõi lịch sử và vé đã mua",
              },
              {
                icon: "⚡",
                title: "Thanh toán nhanh chóng",
                desc: "Hỗ trợ nhiều phương thức thanh toán",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-blue-200 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-blue-600">MetroNext</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Tạo tài khoản mới
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Điền thông tin bên dưới để đăng ký
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <SignupForm />
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} MetroNext. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </div>
  );
}
