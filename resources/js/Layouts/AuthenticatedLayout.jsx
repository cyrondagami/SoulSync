import UserAvatar from '@/Components/UserAvatar';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
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
    Sun,
    Moon,
    Bell,
    CheckCheck,
    Clock3,
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, notifications = [] } = usePage().props;
    const user = auth.user;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    /* =====================================================
       THEME (light / dark) — saved in localStorage
    ====================================================== */

    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'light';

        try {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark' || saved === 'light') return saved;
        } catch {
            // localStorage not available
        }

        return 'light';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');

        try {
            localStorage.setItem('theme', theme);
        } catch {
            // localStorage not available
        }
    }, [theme]);

    const toggleTheme = () =>
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    /* =====================================================
       NOTIFICATIONS — real data from the database
    ====================================================== */

    const unreadNotifications = notifications.filter((item) => !item.read).length;

    const openNotifications = () => setNotificationsOpen((current) => !current);

    const markAllRead = () => {
        if (unreadNotifications === 0) return;

        router.post(route('notifications.read-all'), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

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

    /* Reusable theme toggle button */
    const ThemeButton = (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
            }
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-green-200 bg-green-50 text-green-700 transition duration-300 hover:bg-green-100 dark:border-white/10 dark:bg-white/10 dark:text-green-200 dark:hover:bg-white/15"
        >
            {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );

    const NotificationButton = (
        <div className="relative">
            <button
                type="button"
                onClick={openNotifications}
                aria-label="Notifications"
                title="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-green-200 bg-green-50 text-green-700 transition duration-300 hover:bg-green-100 dark:border-white/10 dark:bg-white/10 dark:text-green-200 dark:hover:bg-white/15"
            >
                <Bell className="h-5 w-5" />

                {unreadNotifications > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                )}
            </button>

            {notificationsOpen && (
                <div className="absolute right-0 z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-green-100 bg-white shadow-2xl shadow-green-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-green-950/95">
                    <div className="flex items-center justify-between border-b border-green-100 px-4 py-3 dark:border-white/10">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700 dark:text-green-300">
                                Notifications
                            </p>
                            <p className="text-[10px] text-gray-500 dark:text-green-200">
                                {unreadNotifications} unread
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={markAllRead}
                            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 transition hover:bg-green-100 dark:bg-white/10 dark:text-green-200 dark:hover:bg-white/15"
                        >
                            <CheckCheck className="h-3 w-3" />
                            Mark all
                        </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-green-200">
                                No notifications yet.
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`border-b border-green-50 px-4 py-3 last:border-b-0 dark:border-white/5 ${
                                        item.read ? 'bg-white dark:bg-transparent' : 'bg-green-50/70 dark:bg-white/5'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                                            {item.read ? (
                                                <CheckCheck className="h-4 w-4" />
                                            ) : (
                                                <Bell className="h-4 w-4" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-black text-green-950 dark:text-white">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-[11px] leading-5 text-gray-600 dark:text-green-100/80">
                                                {item.message}
                                            </p>
                                            <div className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-green-700 dark:text-green-300">
                                                <Clock3 className="h-3 w-3" />
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-green-950 transition-colors duration-300 dark:bg-green-950 dark:text-white">
            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-green-400/10 blur-3xl" />
                <div className="absolute -right-40 top-[35rem] h-[32rem] w-[32rem] rounded-full bg-green-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />
            </div>

            {/* NAVIGATION BAR */}
            <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 shadow-lg shadow-green-900/5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-green-950/90 dark:shadow-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* LOGO */}
                        <Link
                            href={route('dashboard')}
                            className="group flex items-center gap-3"
                        >
                            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-green-100 bg-green-50 shadow-lg dark:border-white/10 dark:bg-white/10">
                                <img
                                    src="/images/logo.png"
                                    alt="SoulSync"
                                    className="h-10 w-10 object-contain transition duration-300 group-hover:scale-110"
                                />
                            </div>

                            <div className="hidden sm:block">
                                <p className="text-lg font-black tracking-tight text-green-950 dark:text-white">
                                    Soul
                                    <span className="text-green-600 dark:text-green-400">
                                        Sync
                                    </span>
                                </p>

                                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                    Youth Ministry
                                </p>
                            </div>
                        </Link>

                        {/* DESKTOP NAVIGATION */}
                        <div className="hidden items-center gap-1 lg:flex">
                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-black tracking-wide transition duration-300 ${
                                            item.active
                                                ? 'bg-green-600 text-white shadow-lg shadow-green-900/20'
                                                : 'text-green-800 hover:bg-green-50 hover:text-green-950 dark:text-green-100 dark:hover:bg-white/10 dark:hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            className={`h-4 w-4 transition ${
                                                item.active
                                                    ? 'text-white'
                                                    : 'text-green-600 group-hover:text-green-700 dark:text-green-300 dark:group-hover:text-white'
                                            }`}
                                        />

                                        {item.name}

                                        {item.active && (
                                            <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-600 dark:bg-green-300" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* RIGHT SIDE — NOTIFICATIONS + THEME TOGGLE + USER MENU */}
                        <div className="hidden items-center gap-3 lg:flex">
                            {NotificationButton}
                            {ThemeButton}

                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-3 py-2 transition duration-300 hover:bg-green-100 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
                                >
                                    <UserAvatar
                                        user={user}
                                        className="h-9 w-9 shrink-0 border border-green-200 dark:border-white/20"
                                    />

                                    <div className="max-w-[120px] text-left">
                                        <p className="truncate text-xs font-black text-green-950 dark:text-white">
                                            {user.name}
                                        </p>

                                        <p className="text-[9px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300">
                                            Member
                                        </p>
                                    </div>

                                    <ChevronDown
                                        className={`h-4 w-4 text-green-700 transition dark:text-green-300 ${
                                            profileOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-green-100 bg-white p-2 shadow-2xl shadow-green-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-green-950/95">
                                        <div className="border-b border-green-100 px-4 py-3 dark:border-white/10">
                                            <p className="text-xs font-black text-green-950 dark:text-white">
                                                {user.name}
                                            </p>

                                            <p className="mt-1 truncate text-[10px] text-gray-500 dark:text-green-300">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Link
                                            href={route('profile.edit')}
                                            className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-bold text-green-800 transition hover:bg-green-50 hover:text-green-950 dark:text-green-100 dark:hover:bg-white/10 dark:hover:text-white"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <UserCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            Profile
                                        </Link>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold text-red-600 transition hover:bg-red-50 dark:text-red-200 dark:hover:bg-red-500/10 dark:hover:text-red-100"
                                        >
                                            <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
                                            Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* MOBILE — NOTIFICATIONS + THEME TOGGLE + MENU BUTTON */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {NotificationButton}
                            {ThemeButton}

                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-green-200 bg-green-50 text-green-800 transition hover:bg-green-100 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
                            >
                                {mobileOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE NAVIGATION */}
                {mobileOpen && (
                    <div className="border-t border-green-100 bg-white px-4 pb-5 pt-3 shadow-2xl dark:border-white/10 dark:bg-green-950 lg:hidden">
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
                                                : 'text-green-800 hover:bg-green-50 dark:text-green-100 dark:hover:bg-white/10 dark:hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${
                                                item.active
                                                    ? 'text-white'
                                                    : 'text-green-600 dark:text-green-300'
                                            }`}
                                        />

                                        {item.name}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-4 border-t border-green-100 pt-4 dark:border-white/10">
                            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3 dark:bg-white/5">
                                <UserAvatar
                                    user={user}
                                    className="h-10 w-10 shrink-0 border border-green-200 dark:border-white/20"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-black text-green-950 dark:text-white">
                                        {user.name}
                                    </p>

                                    <p className="truncate text-[10px] text-gray-500 dark:text-green-300">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={route('profile.edit')}
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-green-800 hover:bg-green-50 dark:text-green-100 dark:hover:bg-white/10"
                            >
                                <UserCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                Profile
                            </Link>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-200 dark:hover:bg-red-500/10"
                            >
                                <LogOut className="h-4 w-4 text-red-500 dark:text-red-400" />
                                Log Out
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* OPTIONAL HEADER */}
            {header && (
                <header className="relative z-10 border-b border-green-100 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-green-950/60">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* PAGE CONTENT */}
            <main className="relative z-10">{children}</main>

            {/* FOOTER */}
            <footer className="relative z-10 border-t border-green-100 bg-white dark:border-white/10 dark:bg-green-950/90">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 dark:bg-white/10">
                                <img
                                    src="/images/logo.png"
                                    alt="SoulSync"
                                    className="h-7 w-7 object-contain"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-black text-green-950 dark:text-white">
                                    Soul
                                    <span className="text-green-600 dark:text-green-400">
                                        Sync
                                    </span>
                                </p>

                                <p className="text-[9px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                                    Youth Ministry
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-300">
                            <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-300" />
                            Connect • Grow • Serve
                        </div>

                        <p className="text-[10px] text-gray-500 dark:text-green-400">
                            © {new Date().getFullYear()} SoulSync. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}