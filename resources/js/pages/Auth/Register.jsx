import InputError from '@/Components/InputError';
import ThemeToggle from '@/Components/ThemeToggle';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    Sparkles,
    User,
} from 'lucide-react';
import { useState } from 'react';

const ageOptions = [
    { value: 'under_18', label: 'Under 18', hint: 'Youth member' },
    { value: '18_above', label: '18 or above', hint: 'Adult member' },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        age_group: '',
        guardian_consent: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const selectAge = (value) => {
        setData((prev) => ({
            ...prev,
            age_group: value,
            guardian_consent:
                value === 'under_18' ? prev.guardian_consent : false,
        }));
    };

    /*
    |--------------------------------------------------------------------------
    | SOULSYNC COLOR SYSTEM
    |--------------------------------------------------------------------------
    |
    | Green  = Main brand / growth / community
    | White  = Clean content / readability
    | Red    = Primary actions / important states
    | Yellow = Highlights / energy / hope
    |
    */

    const inputClass =
        'w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-600/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-red-500 dark:focus:bg-slate-700';

    const iconClass =
        'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500';

    const labelClass =
        'mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200';

    return (
        <>
            <Head title="Register" />

            {/* =========================================================
                PAGE BACKGROUND
            ========================================================== */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-green-800">

                {/* =====================================================
                    BACKGROUND DECORATIONS
                ====================================================== */}

                {/* Green glow */}
                <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-green-700 blur-3xl" />

                {/* Red glow */}
                <div className="pointer-events-none absolute -bottom-48 -right-40 h-[32rem] w-[32rem] rounded-full bg-red-800 blur-3xl" />

                {/* Yellow glow */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 blur-3xl" />

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

                            {/* Decorative green shape */}
                            <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-green-600 blur-3xl" />

                            {/* Decorative red shape */}
                            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-red-700 blur-3xl" />

                            {/* Decorative yellow glow */}
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

                                {/* Brand Header */}
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

                                {/* Welcome Content */}
                                <div className="mt-24 max-w-md">

                                    {/* Join Badge */}
                                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-300 bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-wider text-green-950 shadow-lg">
                                        <Sparkles className="h-4 w-4 text-red-700" />
                                        Join Our Community
                                    </div>

                                    {/* Main Heading */}
                                    <h2 className="text-4xl font-black leading-tight text-white xl:text-5xl">
                                        Grow together.
                                        <span className="block text-yellow-300">
                                            Serve with purpose.
                                        </span>
                                    </h2>

                                    {/* Description */}
                                    <p className="mt-6 text-sm leading-7 text-green-50 xl:text-base">
                                        Create your SoulSync account and become
                                        part of a community where faith,
                                        fellowship, service, and personal
                                        growth come together.
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
                            RIGHT REGISTRATION PANEL
                        ================================================== */}
                        <div className="relative bg-white p-6 dark:bg-slate-900 sm:p-10 lg:p-12">

                            {/* Theme Toggle */}
                            <div className="absolute right-5 top-5 z-20">
                                <ThemeToggle />
                            </div>

                            <div className="mx-auto max-w-md">

                                {/* =================================================
                                    MOBILE BRAND
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

                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-900">
                                        <BadgeCheck className="h-6 w-6 text-green-700 dark:text-green-300" />
                                    </div>

                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                                        Create your account
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        Fill in your details to start your
                                        SoulSync journey.
                                    </p>

                                </div>

                                {/* =================================================
                                    REGISTRATION FORM
                                ================================================== */}
                                <form
                                    onSubmit={submit}
                                    className="space-y-5"
                                >

                                    {/* NAME */}
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className={labelClass}
                                        >
                                            Name
                                        </label>

                                        <div className="relative">
                                            <User className={iconClass} />

                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                autoComplete="name"
                                                autoFocus
                                                placeholder="Enter your full name"
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} pr-4`}
                                            />
                                        </div>

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* EMAIL */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className={labelClass}
                                        >
                                            Email
                                        </label>

                                        <div className="relative">
                                            <Mail className={iconClass} />

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
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

                                    {/* AGE VERIFICATION */}
                                    <div>
                                        <span className={labelClass}>
                                            Age verification
                                        </span>

                                        <div className="grid grid-cols-2 gap-3">

                                            {ageOptions.map((option) => {
                                                const selected =
                                                    data.age_group ===
                                                    option.value;

                                                return (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() =>
                                                            selectAge(
                                                                option.value,
                                                            )
                                                        }
                                                        aria-pressed={selected}
                                                        className={`rounded-xl border px-4 py-3 text-left transition duration-200 ${
                                                            selected
                                                                ? 'border-red-600 bg-red-50 ring-2 ring-red-600/20 dark:border-red-500 dark:bg-red-950'
                                                                : 'border-slate-200 bg-slate-50 hover:border-green-500 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-green-500'
                                                        }`}
                                                    >
                                                        <p
                                                            className={`text-sm font-black ${
                                                                selected
                                                                    ? 'text-red-700 dark:text-red-300'
                                                                    : 'text-slate-800 dark:text-slate-200'
                                                            }`}
                                                        >
                                                            {option.label}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                                            {option.hint}
                                                        </p>
                                                    </button>
                                                );
                                            })}

                                        </div>

                                        <InputError
                                            message={errors.age_group}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* GUARDIAN CONSENT */}
                                    {data.age_group === 'under_18' && (
                                        <div>

                                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-950">

                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        data.guardian_consent
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'guardian_consent',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                                                />

                                                <span className="text-sm leading-6 text-yellow-950 dark:text-yellow-200">
                                                    I have my parent or
                                                    guardian's permission to
                                                    create this account.
                                                </span>

                                            </label>

                                            <InputError
                                                message={
                                                    errors.guardian_consent
                                                }
                                                className="mt-2"
                                            />

                                        </div>
                                    )}

                                    {/* PASSWORD */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className={labelClass}
                                        >
                                            Password
                                        </label>

                                        <div className="relative">
                                            <LockKeyhole
                                                className={iconClass}
                                            />

                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password"
                                                value={data.password}
                                                autoComplete="new-password"
                                                placeholder="Create a password"
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} pr-12`}
                                            />

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

                                    {/* CONFIRM PASSWORD */}
                                    <div>
                                        <label
                                            htmlFor="password_confirmation"
                                            className={labelClass}
                                        >
                                            Confirm Password
                                        </label>

                                        <div className="relative">
                                            <LockKeyhole
                                                className={iconClass}
                                            />

                                            <input
                                                id="password_confirmation"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                autoComplete="new-password"
                                                placeholder="Confirm your password"
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                className={`${inputClass} pr-4`}
                                            />
                                        </div>

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* REGISTER BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-red-700/30 transition duration-300 hover:-translate-y-0.5 hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? 'Creating account...'
                                            : 'Register'}

                                        {!processing && (
                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        )}
                                    </button>
                                </form>

                                {/* =================================================
                                    LOGIN
                                ================================================== */}
                                <div className="mt-8 border-t border-slate-200 pt-7 text-center dark:border-slate-700">

                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Already registered?{' '}

                                        <Link
                                            href={route('login')}
                                            className="font-bold text-green-700 transition hover:text-red-700 dark:text-green-400 dark:hover:text-red-400"
                                        >
                                            Log in
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