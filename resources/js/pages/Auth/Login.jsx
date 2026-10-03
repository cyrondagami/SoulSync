import InputError from '@/Components/InputError';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    /*
    |--------------------------------------------------------------------------
    | SOULSYNC COLOR SYSTEM
    |--------------------------------------------------------------------------
    |
    | Green  = Main identity / growth / community
    | White  = Clean surfaces / readability
    | Red    = Main action / interaction
    | Yellow = Highlight / energy / hope
    |
    */

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-red-500 dark:focus:bg-slate-700';

    return (
        <>
            <Head title="Log in" />

            {/* =========================================================
                PAGE BACKGROUND
            ========================================================== */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800 transition-colors duration-300">

                {/* =====================================================
                    BACKGROUND DECORATIONS
                ====================================================== */}

                {/* Green glow */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-green-700 blur-3xl" />

                {/* Red glow */}
                <div className="pointer-events-none absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-red-800 blur-3xl" />

                {/* Yellow glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 blur-3xl" />

                {/* Decorative dots */}
                <div className="pointer-events-none absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-yellow-400" />

                <div className="pointer-events-none absolute right-[15%] top-[25%] h-2 w-2 rounded-full bg-red-500" />

                <div className="pointer-events-none absolute bottom-[20%] left-[20%] h-1.5 w-1.5 rounded-full bg-yellow-300" />

                {/* =====================================================
                    MAIN CONTAINER
                ====================================================== */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">

                    {/* =================================================
                        MAIN CARD
                    ================================================== */}
                    <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/30 dark:border-green-800 dark:bg-slate-900 lg:grid-cols-2">

                        {/* =================================================
                            LEFT BRANDING PANEL
                        ================================================== */}
                        <div className="relative hidden overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-green-900 p-12 lg:flex lg:flex-col lg:justify-between">

                            {/* Green decorative glow */}
                            <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-green-600 blur-3xl" />

                            {/* Red decorative glow */}
                            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-red-700 blur-3xl" />

                            {/* Yellow decorative glow */}
                            <div className="pointer-events-none absolute right-10 top-1/2 h-32 w-32 rounded-full bg-yellow-500 blur-3xl" />

                            {/* =================================================
                                LARGE LOGO WATERMARK
                            ================================================== */}
                            <img
                                src="/images/logo.png"
                                alt=""
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12]"
                            />

                            {/* =================================================
                                BRAND + WELCOME CONTENT
                            ================================================== */}
                            <div className="relative z-10">

                                {/* Brand */}
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-3"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
                                        <ShieldCheck className="h-6 w-6 text-green-800" />
                                    </div>

                                    <div>
                                        <h1 className="text-xl font-black text-white">
                                            SoulSync
                                        </h1>

                                        <p className="text-xs font-medium text-green-100">
                                            Youth Ministry
                                        </p>
                                    </div>
                                </Link>

                                {/* =================================================
                                    WELCOME CONTENT
                                ================================================== */}
                                <div className="mt-24 max-w-md">

                                    {/* Welcome Badge */}
                                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wider text-green-950 shadow-lg">
                                        <Sparkles className="h-4 w-4 text-red-700" />
                                        Welcome Back
                                    </div>

                                    {/* Main Heading */}
                                    <h2 className="text-4xl font-black leading-tight text-white xl:text-5xl">
                                        Your journey
                                        <span className="block text-yellow-300">
                                            continues here.
                                        </span>
                                    </h2>

                                    {/* Description */}
                                    <p className="mt-6 text-sm leading-7 text-green-50 xl:text-base">
                                        Connect with your community, grow in
                                        faith, discover your gifts, and serve
                                        with purpose.
                                    </p>

                                </div>
                            </div>

                            {/* =================================================
                                VALUES
                            ================================================== */}
                            <div className="relative z-10 flex flex-wrap gap-x-6 gap-y-3">

                                <span className="text-xs font-bold text-white">
                                    ✦ Faith
                                </span>

                                <span className="text-xs font-bold text-white">
                                    ✦ Fellowship
                                </span>

                                <span className="text-xs font-bold text-white">
                                    ✦ Service
                                </span>

                                <span className="text-xs font-bold text-white">
                                    ✦ Growth
                                </span>

                            </div>
                        </div>

                        {/* =================================================
                            RIGHT LOGIN PANEL
                        ================================================== */}
                        <div className="relative bg-white p-6 transition-colors duration-300 dark:bg-slate-900 sm:p-10 lg:p-12">

                            {/* =================================================
                                THEME TOGGLE
                            ================================================== */}
                            <div className="absolute right-5 top-5 z-20">
                                <ThemeToggle />
                            </div>

                            <div className="mx-auto max-w-md">

                                {/* =================================================
                                    MOBILE LOGO
                                ================================================== */}
                                <div className="mb-8 flex justify-center lg:hidden">

                                    <Link
                                        href="/"
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-800 shadow-lg">
                                            <ShieldCheck className="h-6 w-6 text-white" />
                                        </div>

                                        <div>
                                            <h1 className="text-xl font-black text-slate-900 dark:text-white">
                                                SoulSync
                                            </h1>

                                            <p className="text-xs font-bold text-green-700 dark:text-green-400">
                                                Youth Ministry
                                            </p>
                                        </div>
                                    </Link>

                                </div>

                                {/* =================================================
                                    HEADER
                                ================================================== */}
                                <div className="mb-8">

                                    {/* Header Icon */}
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900">
                                        <LockKeyhole className="h-6 w-6 text-green-700 dark:text-green-300" />
                                    </div>

                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                                        Welcome back
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Sign in to continue your SoulSync
                                        journey.
                                    </p>

                                </div>

                                {/* =================================================
                                    STATUS MESSAGE
                                ================================================== */}
                                {status && (
                                    <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-300">
                                        {status}
                                    </div>
                                )}

                                {/* =================================================
                                    LOGIN FORM
                                ================================================== */}
                                <form
                                    onSubmit={submit}
                                    className="space-y-5"
                                >

                                    {/* =================================================
                                        EMAIL
                                    ================================================== */}
                                    <div>

                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200"
                                        >
                                            Email
                                        </label>

                                        <div className="relative">

                                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                autoFocus
                                                placeholder="Enter your email"
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} pr-4`}
                                            />

                                        </div>

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />

                                    </div>

                                    {/* =================================================
                                        PASSWORD
                                    ================================================== */}
                                    <div>

                                        <div className="mb-2 flex items-center justify-between">

                                            <label
                                                htmlFor="password"
                                                className="text-sm font-bold text-slate-700 dark:text-slate-200"
                                            >
                                                Password
                                            </label>

                                            {canResetPassword && (
                                                <Link
                                                    href={route(
                                                        'password.request',
                                                    )}
                                                    className="text-xs font-bold text-green-700 transition hover:text-red-700 dark:text-green-400 dark:hover:text-red-400"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}

                                        </div>

                                        <div className="relative">

                                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                value={data.password}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} pr-12`}
                                            />

                                            {/* Show / Hide Password */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400"
                                                aria-label={
                                                    showPassword
                                                        ? 'Hide password'
                                                        : 'Show password'
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>

                                        </div>

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />

                                    </div>

                                    {/* =================================================
                                        REMEMBER ME
                                    ================================================== */}
                                    <label className="flex cursor-pointer items-center gap-3">

                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked,
                                                )
                                            }
                                            className="h-4 w-4 rounded border-slate-300 bg-white text-red-600 focus:ring-red-500 dark:border-slate-600 dark:bg-slate-800"
                                        />

                                        <span className="text-sm text-slate-600 dark:text-slate-400">
                                            Remember me
                                        </span>

                                    </label>

                                    {/* =================================================
                                        LOGIN BUTTON
                                    ================================================== */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-red-700/30 transition duration-300 hover:-translate-y-0.5 hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Signing in...'
                                            : 'Log in'}

                                        {!processing && (
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        )}
                                    </button>

                                </form>

                                {/* =================================================
                                    REGISTER LINK
                                ================================================== */}
                                <div className="mt-8 border-t border-slate-200 pt-7 text-center dark:border-slate-700">

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Don't have an account?{' '}

                                        <Link
                                            href={route('register')}
                                            className="font-bold text-green-700 transition hover:text-red-700 dark:text-green-400 dark:hover:text-red-400"
                                        >
                                            Register
                                        </Link>
                                    </p>

                                </div>

                                {/* =================================================
                                    COLOR ACCENT
                                ================================================== */}
                                <div className="mt-6 flex items-center justify-center gap-2">

                                    <span className="h-1.5 w-8 rounded-full bg-green-700" />

                                    <span className="h-1.5 w-8 rounded-full bg-yellow-400" />

                                    <span className="h-1.5 w-8 rounded-full bg-red-700" />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}