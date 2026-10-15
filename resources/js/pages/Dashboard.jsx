
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BibleChat from '@/Components/BibleChat';
import {
    CalendarDays,
    Megaphone,
    Heart,
    Music,
    Sparkles,
    ArrowRight,
    Bell,
    BookOpen,
    Users,
    Clock3,
    Target,
    HandHeart,
    Flame,
    Star,
    CheckCircle2,
    Quote,
    Trophy,
    Medal,
    Crown,
    Activity,
    ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard({
    weeklyPoints = 0,
    lifetimePoints = 0,
    weeklyRank = null,
    completedActivities = 0,
    leaderboardPreview = [],
}) {
    const page = usePage();
    const user = page.props.auth?.user ?? { name: 'Member' };
    const firstName = user.name?.split(' ')[0] || 'Member';

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

    const stats = [
        {
            label: 'Upcoming Events',
            value: '6',
            description: 'Opportunities to connect',
            icon: CalendarDays,
            color: 'text-green-700',
            bg: 'bg-green-100',
        },
        {
            label: 'Announcements',
            value: '5',
            description: 'Latest ministry updates',
            icon: Megaphone,
            color: 'text-green-700',
            bg: 'bg-green-100',
        },
        {
            label: 'Prayer Requests',
            value: '12',
            description: 'Community prayers',
            icon: Heart,
            color: 'text-red-600',
            bg: 'bg-red-50',
        },
        {
            label: 'Music Classes',
            value: '4',
            description: 'Discover your talents',
            icon: Music,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
        },
    ];

    const quickAccess = [
        {
            title: 'Events',
            description: 'Join upcoming gatherings and activities.',
            icon: CalendarDays,
            route: 'events',
            color: 'bg-green-700',
        },
        {
            title: 'Announcements',
            description: 'Stay updated with ministry news.',
            icon: Megaphone,
            route: 'announcements',
            color: 'bg-green-600',
        },
        {
            title: 'Prayer Requests',
            description: 'Pray, encourage, and support others.',
            icon: Heart,
            route: 'prayer.requests',
            color: 'bg-red-600',
        },
        {
            title: 'Music Classes',
            description: 'Develop your musical gifts and skills.',
            icon: Music,
            route: 'music.classes',
            color: 'bg-yellow-500',
        },
    ];

    const journey = [
        {
            title: 'Connect',
            description: 'Build meaningful relationships.',
            icon: Users,
            number: '01',
        },
        {
            title: 'Grow',
            description: 'Develop your faith and talents.',
            icon: BookOpen,
            number: '02',
        },
        {
            title: 'Serve',
            description: 'Make a difference together.',
            icon: HandHeart,
            number: '03',
        },
        {
            title: 'Lead',
            description: 'Become a purpose-driven leader.',
            icon: Target,
            number: '04',
        },
    ];

    const podiumColors = [
        'bg-yellow-100 text-yellow-800',
        'bg-gray-100 text-gray-700',
        'bg-orange-100 text-orange-800',
    ];

    return (
        <AuthenticatedLayout>
            <Head title="SoulSync Dashboard" />

            {/* PAGE BACKGROUND — MATCHES ABOUT PAGE */}
            <div className="relative min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-green-950">

                {/* Green background decorations — same as About */}
                <div className="pointer-events-none absolute left-[-10rem] top-[45rem] h-[36rem] w-[36rem] rounded-full bg-green-400/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[-12rem] top-[90rem] h-[40rem] w-[40rem] rounded-full bg-green-500/10 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-green-300/10 blur-3xl" />

                {/* ==================================================
                    HERO — SAME IMAGE AND GREEN OVERLAY AS ABOUT
                ================================================== */}
                <section className="relative overflow-hidden">

                    {/* Bible background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Green overlay — matches About.jsx */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85 dark:from-green-950/95 dark:via-green-900/90 dark:to-green-800/85" />

                    {/* Fade into the white page background */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent dark:from-green-950" />

                    {/* Green glow effects */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-300/25 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    <div className="pointer-events-none absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    {/* Large SoulSync logo watermark */}
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:w-[40rem] lg:w-[46rem]"
                    />

                    {/* Floating particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-white/80" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-200" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-green-100" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    {/* Hero content */}
                    <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-36 pt-20 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:pb-40 lg:pt-24">

                        {/* Welcome section */}
                        <div className="flex flex-col justify-center">

                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
                                </span>

                                <Sparkles className="h-4 w-4 text-green-200" />

                                Your Youth Ministry Community
                            </div>

                            <p className="mt-7 text-xl font-bold text-green-100 sm:text-2xl lg:text-3xl">
                                {greeting},{' '}
                                <span className="text-white">{firstName}</span>
                                <span className="ml-2 inline-block">👋</span>
                            </p>

                            <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Connecting Hearts.
                                <span className="mt-2 block bg-gradient-to-r from-green-200 via-white to-green-100 bg-clip-text text-transparent">
                                    Growing Together.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-green-50 sm:text-lg">
                                Your journey doesn't have to be walked alone.
                                Connect with your community, grow in faith,
                                discover your gifts, and serve with purpose.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={route('events')}
                                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-green-800 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl"
                                >
                                    Explore Events
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href={route('prayer.requests')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/20"
                                >
                                    <Heart className="h-4 w-4 text-green-200" />
                                    Prayer Community
                                </Link>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                                {['Faith', 'Fellowship', 'Service', 'Growth'].map(
                                    (value) => (
                                        <div
                                            key={value}
                                            className="flex items-center gap-2 text-xs font-bold text-green-50"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-green-300" />
                                            {value}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Local time card */}
                        <div className="hidden items-center lg:flex">
                            <div className="relative w-full">
                                <div className="absolute inset-4 rounded-[2rem] bg-green-300/25 blur-2xl" />

                                <div className="relative overflow-hidden rounded-[2rem] border border-white/30 bg-white/15 p-7 text-center text-white shadow-2xl backdrop-blur-xl">

                                    <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-100">
                                        <Clock3 className="h-4 w-4" />
                                        Local Time
                                    </div>

                                    <p className="mt-7 text-4xl font-black tracking-tight">
                                        {formattedTime}
                                    </p>

                                    <p className="mt-3 text-sm font-medium leading-6 text-green-50">
                                        {formattedDate}
                                    </p>

                                    <div className="my-7 h-px bg-white/20" />

                                    <Quote className="mx-auto h-6 w-6 text-green-200" />

                                    <p className="mt-3 text-sm font-medium italic leading-6 text-green-50">
                                        "Walk by faith, not by sight."
                                    </p>

                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-green-200">
                                        2 Corinthians 5:7
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                                        <Flame className="h-3.5 w-3.5 text-green-200" />
                                        Keep Growing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================================================
                    MAIN CONTENT — WHITE BACKGROUND LIKE ABOUT
                ================================================== */}
                <main className="relative z-20 mx-auto -mt-24 max-w-7xl space-y-14 px-4 pb-16 pt-2 sm:px-6 lg:px-8">

                    {/* Statistics */}
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-900/10 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-2xl dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/20"
                                >
                                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-100/70 transition duration-500 group-hover:scale-150 dark:bg-green-700/20" />

                                    <div className="relative">
                                        <div className="flex items-center justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                                                <Icon className={`h-5 w-5 ${stat.color}`} />
                                            </div>

                                            <ChevronRight className="h-4 w-4 text-green-300 transition group-hover:translate-x-1 group-hover:text-green-600" />
                                        </div>

                                        <p className="mt-5 text-3xl font-black text-green-950 dark:text-white">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-green-800 dark:text-green-200">
                                            {stat.label}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500 dark:text-green-100/70">
                                            {stat.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* Points and ranking */}
                    <section>
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-green-700 dark:text-green-300" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                    Your Progress
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-green-950 dark:text-white sm:text-3xl">
                                Growing Through Participation
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                Every confirmed attendance and completed music class
                                helps you grow with the SoulSync community.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">

                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-6 text-white shadow-xl shadow-green-900/20">
                                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />

                                <div className="relative">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                                            <Star className="h-6 w-6 text-green-200" />
                                        </div>

                                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                                            This Week
                                        </span>
                                    </div>

                                    <p className="mt-6 text-4xl font-black">
                                        {Number(weeklyPoints) || 0}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-green-100">
                                        Weekly Points
                                    </p>

                                    <p className="mt-3 text-xs text-green-100/80">
                                        Points earned from confirmed activities.
                                    </p>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-800">
                                    <Medal className="h-6 w-6 text-green-700 dark:text-green-200" />
                                </div>

                                <p className="mt-6 text-4xl font-black text-green-950 dark:text-white">
                                    {Number(lifetimePoints) || 0}
                                </p>

                                <p className="mt-1 text-sm font-bold text-green-800 dark:text-green-200">
                                    Lifetime Points
                                </p>

                                <p className="mt-3 text-xs text-gray-500 dark:text-green-100/70">
                                    Your total points earned over time.
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/40">
                                    <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                                </div>

                                <p className="mt-6 text-4xl font-black text-green-950 dark:text-white">
                                    {weeklyRank ? `#${weeklyRank}` : '—'}
                                </p>

                                <p className="mt-1 text-sm font-bold text-green-800 dark:text-green-200">
                                    Weekly Rank
                                </p>

                                <p className="mt-3 text-xs text-gray-500 dark:text-green-100/70">
                                    Your current position in this week's ranking.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Weekly leaderboard */}
                    <section className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-green-100 p-6 dark:border-green-800/50">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                        Community Recognition
                                    </p>
                                </div>

                                <h2 className="mt-2 text-xl font-black text-green-950 dark:text-white sm:text-2xl">
                                    Weekly Leaderboard
                                </h2>

                                <p className="mt-1 text-sm text-gray-500 dark:text-green-100/70">
                                    Celebrating members who participate and serve.
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800">
                                <Activity className="h-6 w-6 text-green-700 dark:text-green-200" />
                            </div>
                        </div>

                        <div className="p-6">
                            {leaderboardPreview.length > 0 ? (
                                <div className="space-y-3">
                                    {leaderboardPreview.slice(0, 5).map((member, index) => (
                                        <div
                                            key={member.id ?? member.user_id ?? index}
                                            className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-4 transition hover:bg-green-100/70 dark:border-green-800/40 dark:bg-green-950/30 dark:hover:bg-green-900/60"
                                        >
                                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black ${podiumColors[index] ?? 'bg-green-100 text-green-800'}`}>
                                                {index < 3 ? (
                                                    <Medal className="h-5 w-5" />
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-bold text-green-950 dark:text-white">
                                                    {member.name ?? member.user?.name ?? 'Member'}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-green-100/60">
                                                    Rank #{index + 1}
                                                </p>
                                            </div>

                                            <p className="shrink-0 text-sm font-black text-green-800 dark:text-green-200">
                                                {Number(member.weekly_points ?? member.points ?? 0)} pts
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/60 px-5 py-10 text-center dark:border-green-700 dark:bg-green-950/30">
                                    <Trophy className="mx-auto h-10 w-10 text-green-400" />

                                    <h3 className="mt-4 font-bold text-green-950 dark:text-white">
                                        Your community journey starts here
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600 dark:text-green-100/70">
                                        The weekly leaderboard will appear here
                                        when ranking data is provided by the server.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Quick access */}
                    <section>
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-green-700 dark:text-green-300" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                    Explore SoulSync
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-green-950 dark:text-white sm:text-3xl">
                                Everything You Need
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                Your central space for connection, growth,
                                fellowship, and service.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {quickAccess.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.route}
                                        href={route(item.route)}
                                        className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl dark:border-green-800/50 dark:bg-green-900/40"
                                    >
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-green-950 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-600 dark:text-green-100/70">
                                            {item.description}
                                        </p>

                                        <div className="mt-5 flex items-center text-sm font-bold text-green-700 dark:text-green-300">
                                            Explore
                                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                                        </div>

                                        <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-green-50 transition duration-500 group-hover:scale-150 dark:bg-green-800/20" />
                                    </Link>
                                );
                            })}
                        </div>
                    </section>

                    {/* Daily inspiration and updates */}
                    <section>
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-green-700 dark:text-green-300" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                    Daily Inspiration
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-green-950 dark:text-white sm:text-3xl">
                                Grow in Faith
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                Explore Scripture and stay connected with your ministry community.
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* Bible Chat */}
                            <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                                <BibleChat />
                            </div>

                            {/* Upcoming event and announcement links */}
                            <div className="space-y-6">

                                <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-800">
                                                <CalendarDays className="h-5 w-5 text-green-700 dark:text-green-200" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-green-950 dark:text-white">
                                                    Upcoming Events
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-green-100/70">
                                                    Be part of the community
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={route('events')}
                                            className="text-xs font-bold text-green-700 hover:text-green-900 dark:text-green-300"
                                        >
                                            View All
                                        </Link>
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-800/50 dark:bg-green-950/40">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-green-900">
                                                <span className="text-xl font-black text-green-700 dark:text-green-200">
                                                    <CalendarDays className="h-6 w-6" />
                                                </span>
                                                <span className="text-[9px] font-black text-green-600 dark:text-green-300">
                                                    EVENTS
                                                </span>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-black text-green-950 dark:text-white">
                                                    Discover What's Next
                                                </h4>
                                                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-green-100/70">
                                                    Find gatherings, fellowship, and ministry activities.
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={route('events')}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-900 dark:text-green-300"
                                        >
                                            Browse Events
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 dark:bg-green-800">
                                                <Bell className="h-5 w-5 text-green-700 dark:text-green-200" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-green-950 dark:text-white">
                                                    Latest Announcements
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-green-100/70">
                                                    Stay informed
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={route('announcements')}
                                            className="text-xs font-bold text-green-700 hover:text-green-900 dark:text-green-300"
                                        >
                                            View All
                                        </Link>
                                    </div>

                                    <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-800/50 dark:bg-green-950/40">
                                        <div className="flex items-center gap-3">
                                            <Megaphone className="h-6 w-6 shrink-0 text-green-700 dark:text-green-300" />

                                            <div>
                                                <h4 className="font-black text-green-950 dark:text-white">
                                                    Stay Connected
                                                </h4>
                                                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-green-100/70">
                                                    Check ministry updates and important community news.
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={route('announcements')}
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-900 dark:text-green-300"
                                        >
                                            Read Announcements
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Journey section */}
                    <section>
                        <div className="mb-6">
                            <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-green-700 dark:text-green-300" />
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-300">
                                    Our Journey
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-green-950 dark:text-white sm:text-3xl">
                                Connect. Grow. Serve. Lead.
                            </h2>

                            <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                Take the next step in your journey with SoulSync.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {journey.map((step) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-lg shadow-green-900/10 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl dark:border-green-800/50 dark:bg-green-900/40"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-black text-green-100 dark:text-green-800">
                                                {step.number}
                                            </span>

                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-800">
                                                <Icon className="h-6 w-6 text-green-700 dark:text-green-200" />
                                            </div>
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-green-950 dark:text-white">
                                            {step.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-green-100/70">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Final call to action — same green style as About */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-800 via-green-900 to-green-950 px-7 py-14 text-center text-white shadow-2xl shadow-green-900/20 sm:px-10">
                        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />

                        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />

                        <div className="relative">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-xl">
                                <HandHeart className="h-8 w-8 text-green-200" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                                Be Part of Something Meaningful
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-green-50">
                                Your presence, participation, and service can
                                make a meaningful difference in the lives of others.
                            </p>

                            <div className="mt-7 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-green-200">
                                <Star className="h-4 w-4" />
                                SoulSync Youth Ministry
                                <Star className="h-4 w-4" />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
