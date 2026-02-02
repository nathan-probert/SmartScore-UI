"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AuthForm({ onAuth }: { onAuth?: () => void }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let result;
        if (mode === "sign-in") {
            result = await supabase.auth.signInWithPassword({ email, password });
        } else {
            result = await supabase.auth.signUp({ email, password });
        }
        if (result.error) {
            setError(result.error.message);
        } else {
            setError(null);
            if (onAuth) onAuth();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="border p-2 rounded"
            />
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded w-full pr-10"
                />
                <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-grey4 hover:text-primary focus:outline-none"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? (mode === "sign-in" ? "Signing in..." : "Signing up...") : (mode === "sign-in" ? "Sign In" : "Sign Up")}
            </button>
            <button
                type="button"
                className="text-blue-600 underline text-sm"
                onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
            >
                {mode === "sign-in" ? "Create an account" : "Already have an account? Sign in"}
            </button>
        </form>
    );
}
