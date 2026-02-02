"use client";

import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    function handleAuthSuccess() {
        router.replace("/account");
    }
    return (
        <div className="flex flex-col items-center justify-center max-h-screen bg-gradient-to-b from-primary/10 to-background p-5">
            <div className="flex flex-col items-center bg-card/80 rounded-xl shadow-lg px-8 py-10 w-full max-w-md">
                <img src="/images/logo.jpg" alt="SmartScore Logo" className="w-24 h-24 rounded-full mb-4 shadow" />
                <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">SmartScore Account</h1>
                <p className="text-grey mb-6 text-base">Sign in or create an account to get started.</p>
                <AuthForm onAuth={handleAuthSuccess} />
            </div>
        </div>
    );
}
