import { Head, Link, usePage } from '@inertiajs/react';
import BibleChat from '@/Components/BibleChat';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
    Bookmark,
    ChevronRight,
    Target,
    HandHeart,
    Flame,
    Star,
    CheckCircle2,
    Quote,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const user = usePage().props.auth.user;

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

    const firstName = user.name.split(' ')[0];

    const stats = [
        {
            label: 'Upcoming Events',
            value: '6',
            description: 'This month',
            icon: CalendarDays,
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            label: 'Announcements',
            value: '5',
            description: 'Latest updates',
            icon: Megaphone,
            color: 'text-green-600',
            bg: 'bg-green-50',
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
            description: 'Available classes',
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
            gradient: 'from-green-500 to-green-600',
        },
        {
            title: 'Announcements',
            description: 'Stay updated with ministry news.',
            icon: Megaphone,
            route: 'announcements',
            gradient: 'from-green-500 to-red-600',
        },
        {
            title: 'Prayer Requests',
            description: 'Pray, encourage, and support others.',
            icon: Heart,
            route: 'prayer.requests',
            gradient: 'from-red-500 to-red-600',
        },
        {
            title: 'Music Classes',
            description: 'Develop your musical gifts and skills.',
            icon: Music,
            route: 'music.classes',
            gradient: 'from-yellow-400 to-green-600',
        },
    ];

    const journey = [
        {
            title: 'Connect',
            description: 'Build meaningful relationships',
            icon: Users,
            progress: 80,
        },
        {
            title: 'Grow',
            description: 'Develop your gifts and skills',
            icon: BookOpen,
            progress: 65,
        },
        {
            title: 'Serve',
            description: 'Make a difference together',
            icon: HandHeart,
            progress: 50,
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="SoulSync Dashboard" />

            {/* PAGE BACKGROUND — dark green / green / red theme (no more white) */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-950 to-red-950">

                {/* Page-wide glow blobs */}
                <div className="pointer-events-none absolute left-[-10rem] top-[48rem] h-[36rem] w-[36rem] rounded-full bg-green-500/10 blur-3xl" />
                <div className="pointer-events-none absolute right-[-12rem] top-[90rem] h-[40rem] w-[40rem] rounded-full bg-red-500/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-green-500/10 blur-3xl" />

                {/* =====================================================
                    HERO
                ====================================================== */}
                <section className="relative min-h-[620px] overflow-hidden">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Main dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/90 to-red-900/80" />

                    {/* Bottom fade (blends into dark page background) */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-green-950 to-transparent" />

                    {/* Decorative glow */}
                    <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    <div className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-500/20 blur-3xl" />

                    <div className="absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    {/* Large SoulSync logo watermark */}
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] lg:w-[42rem]"
                    />

                    {/* Floating particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-white/70" />
                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-200" />
                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-red-200" />
                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

                    {/* Content */}
                    <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-32 pt-20 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8 lg:pb-36 lg:pt-28">

                        {/* LEFT */}
                        <div className="flex flex-col justify-center">

                            {/* Badge */}
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                </span>

                                <Sparkles className="h-4 w-4 text-yellow-300" />

                                {greeting}
                            </div>

                            {/* Heading */}
                            <div className="mt-7 max-w-3xl">
                                {/* Welcome line (above the title) */}
                                <p className="text-xl font-bold text-green-100 sm:text-2xl lg:text-3xl">
                                    Welcome,{' '}
                                    <span className="text-white">
                                        {firstName}
                                    </span>{' '}
                                    <span className="inline-block">👋</span>
                                </p>

                                {/* Main title */}
                                <h1 className="mt-3 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
                                    Living
                                    <span className="mt-2 block bg-gradient-to-r from-green-100 via-white to-red-200 bg-clip-text text-transparent">
                                        Faith
                                    </span>
                                </h1>
                            </div>

                            <p className="mt-7 max-w-xl text-sm leading-7 text-green-100 sm:text-base lg:text-lg">
                                Your journey doesn't have to be walked alone.
                                Connect with your community, grow in faith,
                                discover your gifts, and serve with purpose.
                            </p>

                            {/* Buttons */}
                            <div className="mt-9 flex flex-wrap gap-3">

                                <Link
                                    href={route('events')}
                                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-green-700 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-white/20"
                                >
                                    Explore Events

                                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href={route('announcements')}
                                    className="group inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
                                >
                                    <Bell className="h-4 w-4" />

                                    Latest Updates
                                </Link>

                            </div>

                            {/* Values */}
                            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                                {['Faith', 'Fellowship', 'Service', 'Growth'].map(
                                    (value) => (
                                        <div
                                            key={value}
                                            className="flex items-center gap-2 text-xs font-semibold text-green-100"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-green-300" />
                                            {value}
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* RIGHT - CLOCK CARD */}
                        <div className="hidden items-center lg:flex">

                            <div className="relative w-full">

                                {/* Glow behind card */}
                                <div className="absolute inset-4 rounded-[2rem] bg-green-400/20 blur-2xl" />

                                <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-7 text-center shadow-2xl backdrop-blur-xl">

                                    {/* Top label */}
                                    <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-200">
                                        <Clock3 className="h-4 w-4" />
                                        Local Time
                                    </div>

                                    {/* Clock */}
                                    <p className="mt-7 text-4xl font-black tracking-tight text-white">
                                        {formattedTime}
                                    </p>

                                    <p className="mt-3 text-sm font-medium leading-6 text-green-100">
                                        {formattedDate}
                                    </p>

                                    <div className="my-7 h-px bg-white/10" />

                                    {/* Scripture-inspired quote */}
                                    <Quote className="mx-auto h-6 w-6 text-green-200/70" />

                                    <p className="mt-3 text-sm font-medium italic leading-6 text-green-100">
                                        "Walk by faith, not by sight."
                                    </p>

                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-yellow-300">
                                        2 Corinthians 5:7
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-green-200">
                                        <Flame className="h-3.5 w-3.5" />
                                        Keep Growing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <div className="relative z-20 mx-auto -mt-10 max-w-7xl space-y-10 px-4 pb-14 sm:px-6 lg:px-8">

                    {/* =================================================
                        STATS
                    ================================================== */}
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white p-5 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
                                >

                                    {/* Decorative background */}
                                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100" />

                                    <div className="relative">

                                        <div className="flex items-center justify-between">

                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} transition duration-300 group-hover:scale-110`}
                                            >
                                                <Icon
                                                    className={`h-5 w-5 ${stat.color}`}
                                                />
                                            </div>

                                            <ChevronRight className="h-4 w-4 text-green-300 transition group-hover:translate-x-1 group-hover:text-green-500" />
                                        </div>

                                        <p className="mt-5 text-3xl font-black text-green-950">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-green-700">
                                            {stat.label}
                                        </p>

                                        <p className="mt-1 text-xs text-green-400">
                                            {stat.description}
                                        </p>

                                    </div>
                                </div>
                            );
                        })}
                    </section>

                    {/* =================================================
                        QUICK ACCESS
                    ================================================== */}
                    <section>

                        <div className="mb-6">

                            <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-green-300" />

                                <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                    Explore SoulSync
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                Everything You Need
                            </h2>

                            <p className="mt-2 text-sm text-green-200/80">
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
                                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
                                    >

                                        {/* Icon */}
                                        <div
                                            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                        >
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <h3 className="relative z-10 mt-5 text-lg font-black text-green-950">
                                            {item.title}
                                        </h3>

                                        <p className="relative z-10 mt-2 min-h-[48px] text-sm leading-6 text-green-500">
                                            {item.description}
                                        </p>

                                        <div className="relative z-10 mt-5 flex items-center text-sm font-bold text-green-600">
                                            Explore

                                            <ArrowRight className="ml-1 h-4 w-4 transition duration-300 group-hover:translate-x-2" />
                                        </div>

                                        {/* Decorative circle */}
                                        <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-green-50 transition duration-500 group-hover:scale-150" />

                                    </Link>
                                );
                            })}

                        </div>
                    </section>

                    {/* =================================================
                        FAITH SECTION
                    ================================================== */}
                    <section>

                        <div className="mb-6">

                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-green-300" />

                                <p className="text-xs font-black uppercase tracking-[0.2em] text-green-300">
                                    Daily Inspiration
                                </p>
                            </div>

                            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                Grow in Faith
                            </h2>

                            <p className="mt-2 text-sm text-green-200/80">
                                Explore Scripture and stay connected with your
                                ministry community.
                            </p>

                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">

                            {/* Bible Chat */}
                            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl">
                                <BibleChat />
                            </div>

                            {/* Updates */}
                            <div className="space-y-6">

                                {/* EVENT */}
                                <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                                                <CalendarDays className="h-5 w-5 text-green-600" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-green-950">
                                                    Upcoming Event
                                                </h3>

                                                <p className="text-xs text-green-400">
                                                    Don't miss what's next
                                                </p>
                                            </div>

                                        </div>

                                        <Link
                                            href={route('events')}
                                            className="text-xs font-bold text-green-600 hover:text-green-700"
                                        >
                                            View All
                                        </Link>

                                    </div>

                                    <div className="mt-5 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-green-50 p-5 transition duration-300 hover:shadow-md">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm">
                                                <span className="text-xl font-black text-green-600">
                                                    28
                                                </span>

                                                <span className="text-[9px] font-black text-green-400">
                                                    SEP
                                                </span>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-black text-green-950">
                                                    Youth Fellowship Night
                                                </h4>

                                                <div className="mt-2 flex flex-wrap gap-3 text-xs text-green-500">
                                                    <span>6:00 PM</span>
                                                    <span>•</span>
                                                    <span>Youth Center</span>
                                                </div>
                                            </div>

                                            <ArrowRight className="h-5 w-5 text-green-500" />

                                        </div>
                                    </div>
                                </div>

                                {/* ANNOUNCEMENT */}
                                <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                                                <Megaphone className="h-5 w-5 text-red-600" />
                                            </div>

                                            <div>
                                                <h3 className="font-black text-green-950">
                                                    Latest Announcement
                                                </h3>

                                                <p className="text-xs text-green-400">
                                                    Stay informed
                                                </p>
                                            </div>

                                        </div>

                                        <Link
                                            href={route('announcements')}
                                            className="text-xs font-bold text-green-600 hover:text-green-700"
                                        >
                                            View All
                                        </Link>

                                    </div>

                                    <div className="mt-5 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-green-50 p-5">

                                        <div className="flex items-start gap-4">

                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                                <Megaphone className="h-5 w-5 text-red-600" />
                                            </div>

                                            <div>

                                                <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-green-600">
                                                    New
                                                </span>

                                                <h4 className="mt-2 font-black text-green-950">
                                                    Youth Fellowship Night
                                                </h4>

                                                <p className="mt-1 text-xs leading-5 text-green-500">
                                                    Check out the latest youth
                                                    ministry updates and
                                                    activities.
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>

                    {/* =================================================
                        VERSE BANNER
                    ================================================== */}
                    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-green-800 via-green-700 to-red-700 p-8 text-white shadow-xl shadow-green-950/50 sm:p-10">

                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                                <BookOpen className="h-8 w-8 text-white" />
                            </div>

                            <div className="flex-1">

                                <p className="text-lg font-bold leading-8 sm:text-xl">
                                    "Let all that you do be done in love."
                                </p>

                                <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-green-200">
                                    1 Corinthians 16:14
                                </p>

                            </div>

                            <div className="hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold sm:block">
                                Daily Reminder
                            </div>

                        </div>
                    </section>

                    {/* =================================================
                        JOURNEY
                    ================================================== */}
                    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white p-7 shadow-xl shadow-green-950/40 sm:p-8">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <div className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-green-600" />

                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-green-600">
                                        Your Journey
                                    </p>
                                </div>

                                <h2 className="mt-2 text-2xl font-black text-green-950">
                                    Connect. Grow. Serve.
                                </h2>

                                <p className="mt-1 text-sm text-green-500">
                                    Every step brings you closer to community
                                    and purpose.
                                </p>

                            </div>

                            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-red-50 px-6 py-4 text-center">

                                <p className="text-[10px] font-black tracking-wider text-green-500">
                                    OVERALL PROGRESS
                                </p>

                                <p className="mt-1 text-2xl font-black text-green-700">
                                    65%
                                </p>

                            </div>

                        </div>

                        <div className="mt-8 grid gap-7 md:grid-cols-3">

                            {journey.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.title}>

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                                                    <Icon className="h-5 w-5 text-green-600" />
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-green-800">
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-xs text-green-400">
                                                        {item.description}
                                                    </p>
                                                </div>

                                            </div>

                                            <span className="text-sm font-black text-green-600">
                                                {item.progress}%
                                            </span>

                                        </div>

                                        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-green-50">

                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-green-500 via-green-500 to-red-600 transition-all duration-1000"
                                                style={{
                                                    width: `${item.progress}%`,
                                                }}
                                            />

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    </section>

                    {/* =================================================
                        ACTION CARDS
                    ================================================== */}
                    <section className="grid gap-6 md:grid-cols-2">

                        <Link
                            href={route('prayer.requests')}
                            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-red-800 p-7 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >

                            <div className="relative z-10">

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                                        <Heart className="h-6 w-6" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />

                                </div>

                                <h2 className="mt-6 text-xl font-black">
                                    Prayer Community
                                </h2>

                                <p className="mt-2 max-w-md text-sm leading-6 text-green-100">
                                    Share your prayer requests and stand with
                                    others through prayer and encouragement.
                                </p>

                                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                                    <Heart className="h-3.5 w-3.5" />
                                    Pray Together
                                </div>

                            </div>

                            <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-white/10 transition duration-500 group-hover:scale-125" />

                        </Link>

                        <Link
                            href={route('music.classes')}
                            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-green-700 to-green-800 p-7 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        >

                            <div className="relative z-10">

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                                        <Music className="h-6 w-6" />
                                    </div>

                                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-2" />

                                </div>

                                <h2 className="mt-6 text-xl font-black">
                                    Develop Your Gifts
                                </h2>

                                <p className="mt-2 max-w-md text-sm leading-6 text-green-100">
                                    Explore music classes and discover
                                    opportunities to develop your talents.
                                </p>

                                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                                    <Music className="h-3.5 w-3.5" />
                                    Discover Your Talent
                                </div>

                            </div>

                            <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-white/10 transition duration-500 group-hover:scale-125" />

                        </Link>

                    </section>

                    {/* =================================================
                        FINAL CTA
                    ================================================== */}
                    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-950 via-green-950 to-red-950 px-7 py-14 text-center text-white shadow-2xl sm:px-10">

                        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />

                        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

                        <div className="relative">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-xl">
                                <Bookmark className="h-8 w-8 text-green-300" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                                Be Part of Something Meaningful
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-green-200">
                                Your presence, participation, and service can
                                make a meaningful difference in the lives of
                                others.
                            </p>

                            <div className="mt-7 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-green-300">
                                <Star className="h-4 w-4" />
                                SoulSync Youth Ministry
                                <Star className="h-4 w-4" />
                            </div>

                        </div>
                    </section>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}