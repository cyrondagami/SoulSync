import { Link, router, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    CalendarDays,
    Heart,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Music,
    Shield,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    {
        label: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
        iconColor: 'text-green-300',
    },
    {
        label: 'Users',
        href: '/admin/users',
        icon: Users,
        iconColor: 'text-green-300',
    },
    {
        label: 'Events',
        href: '/admin/events',
        icon: CalendarDays,
        iconColor: 'text-yellow-300',
    },
    {
        label: 'Announcements',
        href: '/admin/announcements',
        icon: Megaphone,
        iconColor: 'text-red-300',
    },
    {
        label: 'Prayer Requests',
        href: '/admin/prayer-requests',
        icon: Heart,
        iconColor: 'text-red-300',
    },
    {
        label: 'Music Classes',
        href: '/admin/music-classes',
        icon: Music,
        iconColor: 'text-yellow-300',
    },
];

export default function AdminLayout({ title = 'Dashboard', children }) {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        return () => clearInterval(timer);
    }, []);

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

    const isActive = (href) =>
        currentPath === href || currentPath.startsWith(`${href}/`);

    const logout = () => {
        router.post('/logout');
    };

    return (
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
                        <h1 className="text-xl font-black tracking-tight text-white">
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

                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return active ? (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group mb-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/50 transition duration-300 hover:-translate-y-0.5 hover:from-green-500 hover:to-green-700"
                            >
                                <Icon className="h-5 w-5" />

                                <span>{item.label}</span>

                                <ArrowRight className="ml-auto h-4 w-4 opacity-70 transition group-hover:translate-x-1" />
                            </Link>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-100 transition duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <Icon
                                    className={`h-5 w-5 ${item.iconColor} transition group-hover:opacity-80`}
                                />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                </nav>

                {/* LOGOUT */}
                <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-green-950/90 p-4">

                    <button
                        type="button"
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

                {/* TOP BAR */}
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
                                {title}
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

                {/* MOBILE NAV (sidebar is hidden on small screens) */}
                <nav className="flex gap-2 overflow-x-auto border-b border-white/10 bg-green-950/70 px-4 py-3 lg:hidden">

                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                                    active
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white/10 text-green-100 hover:bg-white/20'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}

                    <button
                        type="button"
                        onClick={logout}
                        className="flex shrink-0 items-center gap-2 rounded-full bg-red-600/80 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-600"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>

                </nav>

                {/* PAGE CONTENT */}
                <div className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                    {/* Background glows */}
                    <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-32 top-[40rem] h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl space-y-8">
                        {children}
                    </div>

                </div>

            </main>

        </div>
    );
}