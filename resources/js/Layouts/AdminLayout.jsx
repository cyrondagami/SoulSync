import { Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    CalendarDays,
    Camera,
    Heart,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Music,
    Shield,
    Trophy,
    Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '@/Components/ThemeToggle';
import UserAvatar from '@/Components/UserAvatar';

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
    {
        label: 'Weekly Ranking',
        href: '/admin/weekly-ranking',
        icon: Trophy,
        iconColor: 'text-yellow-300',
    },
];

export default function AdminLayout({ title = 'Dashboard', subtitle = '', children }) {
    const {
        url,
        props: {
            auth: { user },
        },
    } = usePage();
    const currentPath = url.split('?')[0];

    const photoInputRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const { data, setData, post, processing } = useForm({
        _method: 'patch',
        photo: null,
    });

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

    const handleProfilePhotoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setData('photo', file);
        setPhotoPreview(URL.createObjectURL(file));

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (photoInputRef.current) {
                    photoInputRef.current.value = '';
                }

                setPhotoPreview(null);
            },
            onError: () => {
                setPhotoPreview(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-white text-green-950 transition-colors duration-300 dark:bg-green-950 dark:text-white">

            <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 overflow-hidden border-r border-green-200 bg-white/90 text-green-950 shadow-2xl shadow-green-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-green-950/95 dark:text-white lg:block">

                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-red-500/15 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

                <div className="relative flex h-24 items-center justify-between border-b border-green-100 px-6 dark:border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-green-100 bg-green-50 shadow-lg dark:border-white/10 dark:bg-white/10">
                            <img
                                src="/images/logo.png"
                                alt="SoulSync"
                                className="h-10 w-10 object-contain"
                            />
                        </div>

                        <div>
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
                    </div>

                </div>

                <nav className="relative mt-8 px-4">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return active ? (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative mb-2 flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3.5 text-sm font-black tracking-wide text-white shadow-lg shadow-green-900/20 transition duration-300"
                            >
                                <Icon className="h-4 w-4 text-white" />
                                <span>{item.label}</span>
                                <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-600 dark:bg-green-300" />
                            </Link>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative mb-2 flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold tracking-wide text-green-800 transition duration-300 hover:bg-green-50 hover:text-green-950 dark:text-green-100 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <Icon
                                    className={`h-4 w-4 ${item.iconColor} transition group-hover:text-green-700`}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 w-full border-t border-green-200 bg-white/90 p-4 dark:border-white/10 dark:bg-green-950/90">
                    <button
                        type="button"
                        onClick={logout}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-green-800 transition duration-300 hover:bg-red-600 hover:text-white dark:text-green-100"
                    >
                        <LogOut className="h-5 w-5 transition group-hover:translate-x-1" />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-green-950 lg:ml-72">
                <header className="sticky top-0 z-40 border-b border-green-200 bg-white/90 px-4 py-4 shadow-lg shadow-green-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-green-950/80 dark:shadow-none sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-green-600 dark:text-yellow-300" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-yellow-300">
                                    Admin Panel
                                </p>
                            </div>

                            <h2 className="mt-1 text-xl font-black text-green-950 dark:text-white sm:text-2xl">
                                {title}
                            </h2>

                            {subtitle && (
                                <p className="mt-1 text-sm text-green-700 dark:text-green-200/80">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <ThemeToggle
                                className="border-green-200 bg-green-50 text-green-700 shadow-sm hover:text-green-800 dark:border-white/10 dark:bg-white/10 dark:text-green-200 dark:hover:text-white"
                            />

                            <button
                                type="button"
                                onClick={() => photoInputRef.current?.click()}
                                className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-2.5 py-2 shadow-sm transition hover:bg-green-100 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
                                title="Change profile photo"
                            >
                                <div className="relative">
                                    <UserAvatar
                                        user={{ ...user, profile_photo: photoPreview ? null : user.profile_photo }}
                                        className="h-9 w-9"
                                    />

                                    {photoPreview && (
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="absolute inset-0 h-full w-full rounded-full object-cover"
                                        />
                                    )}

                                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-green-600 text-[8px] text-white shadow-sm dark:border-green-950">
                                        <Camera className="h-2.5 w-2.5" />
                                    </span>
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-700 dark:text-green-300">
                                        Admin
                                    </p>
                                    <p className="truncate text-xs font-black text-green-950 dark:text-white">
                                        {user.name}
                                    </p>
                                </div>
                            </button>

                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={handleProfilePhotoChange}
                            />
                        </div>
                    </div>
                </header>

                <nav className="flex gap-2 overflow-x-auto border-b border-green-200 bg-green-50 px-4 py-3 dark:border-white/10 dark:bg-green-950/70 lg:hidden">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[11px] font-black tracking-wide transition ${
                                    active
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20'
                                        : 'bg-white text-green-800 hover:bg-green-100 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20'
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

                <div className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
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