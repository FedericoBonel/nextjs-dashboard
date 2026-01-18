import { Suspense } from "react";
import AcmeLogo from "@/components/acme-logo";
import LoginForm from "@/app/sign-in/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        {/* Is wrapped in suspense because it will be dynamic since we get info from the request */}
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
