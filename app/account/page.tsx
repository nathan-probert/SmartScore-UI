"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type UserPreferences = {
    user_id: string;
    notify: boolean;
};

export default function AccountPage() {
    const [user, setUser] = useState<any>(null);
    const [prefs, setPrefs] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(async ({ data }) => {
            if (!data.user) {
                router.replace("/signin");
            } else {
                setUser(data.user);
                // Fetch user preferences
                const { data: pref, error } = await supabase
                    .from("user_preferences")
                    .select("user_id,notify")
                    .eq("user_id", data.user.id)
                    .single();
                if (!error && pref) {
                    setPrefs(pref);
                }
                setLoading(false);
            }
        });
    }, [router]);

    async function handleToggleNotify() {
        if (!user) return;
        setSaving(true);
        setError(null);
        const { error } = await supabase
            .from("user_preferences")
            .upsert({ user_id: user.id, notify: !prefs?.notify }, { onConflict: "user_id" });
        if (error) {
            setError("Failed to update preference.");
        } else {
            setPrefs(p => p ? { ...p, notify: !p.notify } : p);
        }
        setSaving(false);
    }

    if (loading) return null;
    if (!user) return null;

    // bg-gradient-to-b from-primary/10 to-background p-5
    async function handleSignOut() {
        await supabase.auth.signOut();
        router.replace("/signin");
    }

    async function handleBack() {
        router.replace("/");
    }

    return (
        <div className="flex flex-col items-center justify-center max-h-screen">
            <div className="flex flex-col items-center bg-card/80 rounded-xl shadow-lg px-8 py-10 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-primary mb-2 tracking-tight">Account Settings</h1>
                <img src="/images/logo.jpg" alt="SmartScore Logo" className="w-24 h-24 rounded-full mb-4 shadow" />
                <p className="text-grey mb-6 text-base">Welcome, <span className="font-semibold">{user.email}</span></p>
                <div className="w-full flex flex-col items-center gap-4 mt-4">
                    <div className="flex items-center gap-3">
                        <span className="font-medium">Notifications:</span>
                        <button
                            onClick={handleToggleNotify}
                            disabled={saving}
                            className={`px-4 py-1 rounded-full text-white text-sm transition-colors ${prefs?.notify ? "bg-primary" : "bg-grey4"} ${saving ? "opacity-60" : "hover:bg-secondary"}`}
                        >
                            {prefs?.notify ? "Enabled" : "Disabled"}
                        </button>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                </div>
                <div className="flex flex-col items-center gap-2 w-full mt-24">
                    <button
                        onClick={handleBack}
                        className="px-8 py-2 rounded-full bg-background border border-grey2 text-foreground font-semibold hover:bg-grey2 active:bg-grey3 transition-colors shadow-md w-auto min-w-[180px]"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="px-8 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 active:bg-primary/80 transition-colors shadow-md w-auto min-w-[180px]"
                    >
                        Sign Out
                    </button>

                </div>
            </div>
        </div>
    );
}
