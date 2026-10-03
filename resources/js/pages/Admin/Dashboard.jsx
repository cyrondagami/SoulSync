import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    Megaphone,
    Heart,
    Music,
    LogOut,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Activity,
    Settings,
    CheckCircle2,
    UserCheck,
    Bell,
    Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hour = currentTime.getHours();

    const greeting =
        hour < 12
            ? 'Good morning'
            : hour < 18
              ? 'Good afternoon'
              : 'Good evening';

    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const logout = () => {
        router.post('/logout');
    };

    const statistics = [
        {
            title: 'Registered Users',
            value: '—',
            description: 'Total members',
            icon: Users,
            gradient: 'from-green-500 to-green-700',
            bg: 'bg-green-50',
            iconColor: 'text-green-700',
        },
        {
            title: 'Total Events',
            value: '—',
            description: 'Scheduled activities',
            icon: CalendarDays,
            gradient: 'from-yellow-400 to-yellow-600',
            bg: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
        },
        {
            title: 'Announcements',
            value: '—',
            description: 'Published updates',
            icon: Megaphone,
            gradient: 'from-red-500 to-red-700',
            bg: 'bg-red-50',
            iconColor: 'text-red-600',
        },
        {
            title: 'Prayer Requests',
            value: '—',
            description: 'Community prayers',
            icon: Heart,
            gradient: 'from-green-600 to-green-800',
            bg: 'bg-green-50',
            iconColor: 'text-green-700',
        },
    ];

    const managementItems = [
        {
            title: 'Manage Users',
            description: 'View and manage registered SoulSync users.',
            icon: Users,
            href: '/admin/users',
            gradient: 'from-green-500 to-green-700',
        },
        {
            title: 'Manage Events',
            description: 'Create, update, and manage ministry events.',
            icon: CalendarDays,
            href: '/admin/events',
            gradient: 'from-yellow-400 to-yellow-600',
        },
        {
            title: 'Announcements',
            description: 'Publish and manage ministry announcements.',
            icon: Megaphone,
            href: '/admin/announcements',
            gradient: 'from-red-500 to-red-700',
        },
        {
            title: 'Prayer Requests',
            description: 'View and manage community prayer requests.',
            icon: Heart,
            href: '/prayer-requests',
            gradient: 'from-green-600 to-green-800',
        },
        {
            title: 'Music Classes',
            description: 'Manage music classes and ministry activities.',
            icon: Music,
            href: '/music-classes',
            gradient: 'from-yellow-500 to-green-600',
        },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-950">

                {/* =====================================================
                    SIDEBAR
                ====================================================== */}

                <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 overflow-hidden border-r border-white/10 bg-green-950/95 text-white shadow-2xl backdrop-blur-xl lg:block">

                    {/* Decorative glows */}
                    <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-red-500/15 blur-3xl" />
                    <div className="pointer-events-none absolute right-0 top-1/3 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

                    {/* LOGO */}
                    <div className="relative flex h-24 items-center gap-3 border-b border-white/10 px-6">

                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/10 shadow-lg">
                            <img
                                src="/images/logo.png"
                                alt="SoulSync"
                                className="h-10 w-10 object-contain"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-black tracking-tight">
                                SoulSync
                            </h1>

                            <p className="text-xs font-medium text-green-300">
                                Administration
                            </p>
                        </div>

                    </div>

                    {/* ADMIN PROFILE */}
                    <div className="relative mx-4 mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-700 shadow-lg">
                                <Shield className="h-5 w-5 text-white" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-white">
                                    Administrator
                                </p>

                                <p className="text-xs text-green-300">
                                    System Admin
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* NAVIGATION */}
                    <nav className="relative mt-8 px-4">

                        <p className="mb-4 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-green-400/60">
                            Administration
                        </p>

                        {/* Dashboard */}
                        <Link
                            href="/admin/dashboard"
                            className="group mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/50 transition duration-300 hover:-translate-y-0.5 hover:from-green-500 hover:to-green-700"
                        >
                            <LayoutDashboard className="h-5 w-5" />

                            <span>Dashboard</span>

                            <ArrowRight className="ml-auto h-4 w-4 opacity-70 transition group-hover:translate-x-1" />
                        </Link>

                        {/* Users */}
                        <Link
                            href="/admin/users"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <Users className="h-5 w-5 text-green-300 transition group-hover:text-green-200" />
                            <span>Users</span>
                        </Link>

                        {/* Events */}
                        <Link
                            href="/admin/events"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <CalendarDays className="h-5 w-5 text-yellow-300 transition group-hover:text-yellow-200" />
                            <span>Events</span>
                        </Link>

                        {/* Announcements */}
                        <Link
                            href="/admin/announcements"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <Megaphone className="h-5 w-5 text-red-300 transition group-hover:text-red-200" />
                            <span>Announcements</span>
                        </Link>

                        {/* Prayer Requests */}
                        <Link
                            href="/prayer-requests"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <Heart className="h-5 w-5 text-red-300 transition group-hover:text-red-200" />
                            <span>Prayer Requests</span>
                        </Link>

                        {/* Music Classes */}
                        <Link
                            href="/music-classes"
                            className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                        >
                            <Music className="h-5 w-5 text-yellow-300 transition group-hover:text-yellow-200" />
                            <span>Music Classes</span>
                        </Link>

                    </nav>

                    {/* LOGOUT */}
                    <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-green-950/90 p-4">

                        <button
                            onClick={logout}
                            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-red-600 hover:text-white"
                        >
                            <LogOut className="h-5 w-5 transition group-hover:translate-x-1" />

                            Logout
                        </button>

                    </div>

                </aside>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <main className="min-h-screen lg:ml-72">

                    {/* =================================================
                        TOP BAR
                    ================================================== */}

                    <header className="sticky top-0 z-40 border-b border-white/10 bg-green-950/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">

                        <div className="flex items-center justify-between">

                            <div>

                                <div className="flex items-center gap-2">

                                    <Activity className="h-4 w-4 text-yellow-300" />

                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                        Admin Panel
                                    </p>

                                </div>

                                <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                                    Dashboard
                                </h2>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="hidden text-right sm:block">

                                    <p className="text-xs font-medium text-green-200/70">
                                        {formattedDate}
                                    </p>

                                    <p className="text-sm font-bold text-white">
                                        {formattedTime}
                                    </p>

                                </div>

                                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-lg">
                                    <img
                                        src="/images/logo.png"
                                        alt="SoulSync"
                                        className="h-9 w-9 object-contain"
                                    />
                                </div>

                            </div>

                        </div>

                    </header>

                    {/* =================================================
                        CONTENT
                    ================================================== */}

                    <div className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                        {/* Background glows */}
                        <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute -right-32 top-[40rem] h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute left-1/3 top-[80rem] h-96 w-96 rounded-full bg-yellow-400/5 blur-3xl" />

                        <div className="relative mx-auto max-w-7xl space-y-8">

                            {/* =================================================
                                HERO / WELCOME
                            ================================================== */}

                            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-7 text-white shadow-2xl shadow-green-950/50 sm:p-10">

                                {/* Logo watermark */}
                                <img
                                    src="/images/logo.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-[-3rem] top-1/2 z-0 w-[28rem] -translate-y-1/2 select-none opacity-[0.10] sm:w-[34rem] lg:w-[40rem]"
                                />

                                {/* Decorative circles */}
                                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />

                                <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-red-400/10 blur-3xl" />

                                <div className="absolute right-[25%] top-[20%] h-24 w-24 rounded-full bg-white/10 blur-2xl" />

                                <div className="absolute left-[10%] top-[15%] h-2 w-2 animate-pulse rounded-full bg-yellow-300" />

                                <div className="absolute right-[18%] top-[30%] h-2 w-2 animate-pulse rounded-full bg-red-300" />

                                <div className="relative z-10">

                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">

                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-300" />
                                        </span>

                                        <Sparkles className="h-4 w-4 text-yellow-300" />

                                        {greeting}

                                    </div>

                                    <h1 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                                        SoulSync
                                        <span className="block bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                                            Administration Center
                                        </span>
                                    </h1>

                                    <p className="mt-5 max-w-2xl text-sm leading-7 text-green-100 sm:text-base">
                                        Manage your youth ministry community,
                                        organize activities, publish updates,
                                        and keep SoulSync running smoothly
                                        from one central place.
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-3">

                                        <Link
                                            href="/admin/users"
                                            className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-red-950/30 transition duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-red-500/20"
                                        >
                                            Manage Users

                                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                        </Link>

                                        <Link
                                            href="/admin/events"
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
                                        >
                                            <CalendarDays className="h-4 w-4 text-yellow-300" />

                                            Manage Events
                                        </Link>

                                    </div>

                                    {/* Admin values */}
                                    <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

                                        {[
                                            'Community',
                                            'Organization',
                                            'Service',
                                            'Growth',
                                        ].map((value, index) => (
                                            <div
                                                key={value}
                                                className="flex items-center gap-2 text-xs font-semibold text-green-100"
                                            >
                                                <CheckCircle2
                                                    className={`h-4 w-4 ${
                                                        index % 3 === 0
                                                            ? 'text-green-300'
                                                            : index % 3 === 1
                                                              ? 'text-yellow-300'
                                                              : 'text-red-300'
                                                    }`}
                                                />
                                                {value}
                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </section>

                            {/* =================================================
                                STATISTICS
                            ================================================== */}

                            <section>

                                <div className="mb-5">

                                    <div className="flex items-center gap-2">

                                        <Activity className="h-4 w-4 text-yellow-300" />

                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                            System Overview
                                        </p>

                                    </div>

                                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                        SoulSync Statistics
                                    </h2>

                                    <p className="mt-2 text-sm text-green-100/70">
                                        Monitor the current state of your
                                        ministry management system.
                                    </p>

                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                                    {statistics.map((stat) => {
                                        const Icon = stat.icon;

                                        return (
                                            <div
                                                key={stat.title}
                                                className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                            >

                                                {/* Decorative circle */}
                                                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-green-50 opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100" />

                                                <div className="relative">

                                                    <div className="flex items-center justify-between">

                                                        <div
                                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} transition duration-300 group-hover:scale-110`}
                                                        >
                                                            <Icon
                                                                className={`h-6 w-6 ${stat.iconColor}`}
                                                            />
                                                        </div>

                                                        <span className="text-[10px] font-black tracking-widest text-slate-400">
                                                            SYSTEM
                                                        </span>

                                                    </div>

                                                    <p className="mt-5 text-3xl font-black text-slate-900">
                                                        {stat.value}
                                                    </p>

                                                    <p className="mt-1 text-sm font-bold text-slate-700">
                                                        {stat.title}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {stat.description}
                                                    </p>

                                                </div>

                                                {/* Bottom gradient */}
                                                <div
                                                    className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.gradient} opacity-0 transition group-hover:opacity-100`}
                                                />

                                            </div>
                                        );
                                    })}

                                </div>

                            </section>

                            {/* =================================================
                                MANAGEMENT
                            ================================================== */}

                            <section>

                                <div className="mb-6">

                                    <div className="flex items-center gap-2">

                                        <Settings className="h-4 w-4 text-yellow-300" />

                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                            Administration
                                        </p>

                                    </div>

                                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                        System Management
                                    </h2>

                                    <p className="mt-2 text-sm text-green-100/70">
                                        Access the tools you need to manage
                                        SoulSync.
                                    </p>

                                </div>

                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                                    {managementItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl"
                                            >

                                                {/* Decorative circle */}
                                                <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-green-50 transition duration-500 group-hover:scale-150" />

                                                <div className="relative z-10">

                                                    <div className="flex items-center justify-between">

                                                        <div
                                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                                        >
                                                            <Icon className="h-6 w-6" />
                                                        </div>

                                                        <ArrowRight className="h-5 w-5 text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-green-600" />

                                                    </div>

                                                    <h3 className="mt-5 text-lg font-black text-slate-900">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                                                        {item.description}
                                                    </p>

                                                    <div className="mt-5 flex items-center text-sm font-bold text-green-700">

                                                        Open Management

                                                        <ArrowRight className="ml-1 h-4 w-4 transition duration-300 group-hover:translate-x-2" />

                                                    </div>

                                                </div>

                                            </Link>
                                        );
                                    })}

                                </div>

                            </section>

                            {/* =================================================
                                SYSTEM STATUS
                            ================================================== */}

                            <section className="grid gap-6 lg:grid-cols-2">

                                {/* System Status */}
                                <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-7 shadow-xl shadow-green-950/40">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                                                <Activity className="h-5 w-5 text-green-700" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-slate-900">
                                                    System Status
                                                </h3>

                                                <p className="text-xs text-slate-400">
                                                    SoulSync services
                                                </p>
                                            </div>

                                        </div>

                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">

                                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                                            Online

                                        </span>

                                    </div>

                                    <div className="mt-6 space-y-4">

                                        <div className="flex items-center justify-between rounded-xl bg-green-50/60 p-4">

                                            <div className="flex items-center gap-3">

                                                <UserCheck className="h-5 w-5 text-green-700" />

                                                <span className="text-sm font-semibold text-slate-700">
                                                    User Management
                                                </span>

                                            </div>

                                            <CheckCircle2 className="h-5 w-5 text-green-500" />

                                        </div>

                                        <div className="flex items-center justify-between rounded-xl bg-yellow-50/70 p-4">

                                            <div className="flex items-center gap-3">

                                                <Bell className="h-5 w-5 text-yellow-600" />

                                                <span className="text-sm font-semibold text-slate-700">
                                                    Announcements
                                                </span>

                                            </div>

                                            <CheckCircle2 className="h-5 w-5 text-green-500" />

                                        </div>

                                        <div className="flex items-center justify-between rounded-xl bg-red-50/60 p-4">

                                            <div className="flex items-center gap-3">

                                                <CalendarDays className="h-5 w-5 text-red-600" />

                                                <span className="text-sm font-semibold text-slate-700">
                                                    Event Management
                                                </span>

                                            </div>

                                            <CheckCircle2 className="h-5 w-5 text-green-500" />

                                        </div>

                                    </div>

                                </div>

                                {/* Admin Info */}
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-7 text-white shadow-xl shadow-green-950/50">

                                    {/* Logo watermark */}
                                    <img
                                        src="/images/logo.png"
                                        alt=""
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-[-3rem] top-1/2 z-0 w-64 -translate-y-1/2 opacity-[0.10]"
                                    />

                                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/10 blur-2xl" />

                                    <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />

                                    <div className="relative z-10">

                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                            <ShieldCheck className="h-7 w-7 text-yellow-300" />
                                        </div>

                                        <h2 className="mt-6 text-2xl font-black">
                                            Administration Center
                                        </h2>

                                        <p className="mt-3 text-sm leading-7 text-green-100">
                                            Keep your SoulSync community
                                            organized, connected, and active.
                                            Use the administration tools to
                                            manage the different areas of the
                                            ministry system.
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                            <Shield className="h-4 w-4" />
                                            Secure Administration
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* =================================================
                                FOOTER CTA
                            ================================================== */}

                            <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-950 via-green-900 to-red-950 px-7 py-12 text-center text-white shadow-2xl sm:px-10">

                                {/* Logo watermark */}
                                <img
                                    src="/images/logo.png"
                                    alt=""
                                    aria-hidden="true"
                                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-80 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
                                />

                                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

                                <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />

                                <div className="relative z-10">

                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-xl">
                                        <ShieldCheck className="h-8 w-8 text-yellow-300" />
                                    </div>

                                    <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                                        Managing SoulSync with Purpose
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-green-100">
                                        Every administrative action helps
                                        create a better experience for the
                                        SoulSync youth community.
                                    </p>

                                    <div className="mt-7 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300">

                                        <Sparkles className="h-4 w-4" />

                                        SoulSync Administration

                                        <Sparkles className="h-4 w-4" />

                                    </div>

                                </div>

                            </section>

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}