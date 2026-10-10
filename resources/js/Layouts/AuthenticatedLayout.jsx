import UserAvatar from '@/Components/UserAvatar';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Menu,
    X,
    Home,
    Info,
    CalendarDays,
    Megaphone,
    Heart,
    Music,
    LogOut,
    UserCircle,
    ChevronDown,
    Sparkles,
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navigation = [
        {
            name: 'HOME',
            href: route('dashboard'),
            icon: Home,
            active: route().current('dashboard'),
        },
        {
            name: 'ABOUT',
            href: route('about'),
            icon: Info,
            active: route().current('about'),
        },
        {
            name: 'EVENTS',
            href: route('events'),
            icon: CalendarDays,
            active: route().current('events'),
        },
        {
            name: 'ANNOUNCEMENTS',
            href: route('announcements'),
            icon: Megaphone,
            active: route().current('announcements'),
        },
        {
            name: 'PRAYER REQUESTS',
            href: route('prayer.requests'),
            icon: Heart,
            active: route().current('prayer.requests'),
        },
        {
            name: 'MUSIC CLASSES',
            href: route('music.classes'),
            icon: Music,
            active: route().current('music.classes'),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-950 to-red-950 text-white">

            {/* =====================================================
                BACKGROUND DECORATION
            ====================================================== */}

            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

                <div className="absolute -right-40 top-[35rem] h-[32rem] w-[32rem] rounded-full bg-red-500/10 blur-3xl" />

                <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />
            </div>

            {/* =====================================================
                NAVIGATION BAR
            ====================================================== */}

            <nav className="sticky top-0 z-50 border-b border-white/10 bg-green-950/90 shadow-xl backdrop-blur-xl">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-20 items-center justify-between">

                        {/* =================================================
                            LOGO
                        ================================================== */}

                        <Link
                            href={route('dashboard')}
                            className="group flex items-center gap-3"
                        >

                            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/10 shadow-lg">

                                <img
                                    src="/images/logo.png"
                                    alt="SoulSync"
                                    className="h-10 w-10 object-contain transition duration-300 group-hover:scale-110"
                                />

                            </div>

                            <div className="hidden sm:block">
                                <p className="text-lg font-black tracking-tight text-white">
                                    Soul<span className="text-green-400">Sync</span>
                                </p>

                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-300">
                                    Youth Ministry
                                </p>
                            </div>

                        </Link>

                        {/* =================================================
                            DESKTOP NAVIGATION
                        ================================================== */}

                        <div className="hidden items-center gap-1 lg:flex">

                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-black tracking-wide transition duration-300 ${
                                            item.active
                                                ? 'bg-green-600 text-white shadow-lg shadow-green-950/50'
                                                : 'text-green-100 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >

                                        <Icon
                                            className={`h-4 w-4 transition ${
                                                item.active
                                                    ? 'text-yellow-300'
                                                    : 'text-green-300 group-hover:text-yellow-300'
                                            }`}
                                        />

                                        {item.name}

                                        {item.active && (
                                            <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-yellow-300" />
                                        )}

                                    </Link>
                                );
                            })}

                        </div>

                        {/* =================================================
                            USER MENU
                        ================================================== */}

                        <div className="relative hidden lg:block">

                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 transition duration-300 hover:bg-white/15"
                            >

                                {/* Profile photo (falls back to initials) */}
                                <UserAvatar
                                    user={user}
                                    className="h-9 w-9 shrink-0 border border-white/20"
                                />

                                <div className="max-w-[120px] text-left">
                                    <p className="truncate text-xs font-black text-white">
                                        {user.name}
                                    </p>

                                    <p className="text-[9px] font-bold uppercase tracking-wider text-green-300">
                                        Member
                                    </p>
                                </div>

                                <ChevronDown
                                    className={`h-4 w-4 text-green-300 transition ${
                                        profileOpen ? 'rotate-180' : ''
                                    }`}
                                />

                            </button>

                            {/* Profile Dropdown */}

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-green-950/95 p-2 shadow-2xl backdrop-blur-xl">

                                    <div className="border-b border-white/10 px-4 py-3">

                                        <p className="text-xs font-black text-white">
                                            {user.name}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-green-300">
                                            {user.email}
                                        </p>

                                    </div>

                                    <Link
                                        href={route('profile.edit')}
                                        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-bold text-green-100 transition hover:bg-white/10 hover:text-white"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <UserCircle className="h-4 w-4 text-green-400" />
                                        Profile
                                    </Link>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold text-red-200 transition hover:bg-red-500/10 hover:text-red-100"
                                    >
                                        <LogOut className="h-4 w-4 text-red-400" />
                                        Log Out
                                    </Link>

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            MOBILE MENU BUTTON
                        ================================================== */}

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
                        >

                            {mobileOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}

                        </button>

                    </div>

                </div>

                {/* =====================================================
                    MOBILE NAVIGATION
                ====================================================== */}

                {mobileOpen && (
                    <div className="border-t border-white/10 bg-green-950/98 px-4 pb-5 pt-3 shadow-2xl lg:hidden">

                        <div className="space-y-1">

                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-black transition ${
                                            item.active
                                                ? 'bg-green-600 text-white shadow-lg'
                                                : 'text-green-100 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >

                                        <Icon
                                            className={`h-5 w-5 ${
                                                item.active
                                                    ? 'text-yellow-300'
                                                    : 'text-green-300'
                                            }`}
                                        />

                                        {item.name}

                                    </Link>
                                );
                            })}

                        </div>

                        {/* Mobile User Info */}

                        <div className="mt-4 border-t border-white/10 pt-4">

                            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">

                                {/* Profile photo (falls back to initials) */}
                                <UserAvatar
                                    user={user}
                                    className="h-10 w-10 shrink-0 border border-white/20"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-black text-white">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-[10px] text-green-300">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            <Link
                                href={route('profile.edit')}
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-green-100 hover:bg-white/10"
                            >
                                <UserCircle className="h-4 w-4 text-green-400" />
                                Profile
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold text-red-200 hover:bg-red-500/10"
                            >
                                <LogOut className="h-4 w-4 text-red-400" />
                                Log Out
                            </Link>

                        </div>

                    </div>
                )}

            </nav>

            {/* =====================================================
                OPTIONAL HEADER
            ====================================================== */}

            {header && (
                <header className="relative z-10 border-b border-white/10 bg-green-950/60 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* =====================================================
                PAGE CONTENT
            ====================================================== */}

            <main className="relative z-10">
                {children}
            </main>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="relative z-10 border-t border-white/10 bg-green-950/90">

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                <img
                                    src="/images/logo.png"
                                    alt="SoulSync"
                                    className="h-7 w-7 object-contain"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-black text-white">
                                    Soul<span className="text-green-400">Sync</span>
                                </p>

                                <p className="text-[9px] font-bold uppercase tracking-widest text-green-400">
                                    Youth Ministry
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-green-300">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                            Connect • Grow • Serve
                        </div>

                        <p className="text-[10px] text-green-400">
                            © {new Date().getFullYear()} SoulSync. All rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
}
