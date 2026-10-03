
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Heart,
    Users,
    Sparkles,
    BookOpen,
    Target,
    Eye,
    ArrowRight,
    CalendarDays,
    HandHeart,
    MessageCircleHeart,
    Music,
} from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: Heart,
            title: 'Faith',
            description:
                'Growing deeper in our relationship with God through prayer, worship, and His Word.',
            gradient: 'from-green-600 to-green-800',
        },
        {
            icon: Users,
            title: 'Fellowship',
            description:
                'Building genuine friendships and a strong sense of community among the youth.',
            gradient: 'from-green-500 to-green-700',
        },
        {
            icon: HandHeart,
            title: 'Service',
            description:
                'Serving the church and community with humility, compassion, and love.',
            gradient: 'from-red-600 to-red-800',
        },
        {
            icon: BookOpen,
            title: 'Growth',
            description:
                'Encouraging every member to grow spiritually, mentally, socially, and personally.',
            gradient: 'from-yellow-500 to-yellow-600',
        },
    ];

    const journey = [
        {
            number: '01',
            title: 'Connect',
            description:
                'Create meaningful relationships and build a welcoming community where every young person feels valued.',
            icon: Users,
        },
        {
            number: '02',
            title: 'Grow',
            description:
                'Develop faith, character, skills, leadership, and a deeper understanding of God’s purpose.',
            icon: Sparkles,
        },
        {
            number: '03',
            title: 'Serve',
            description:
                'Use our gifts and talents to serve the church, support others, and make a positive impact.',
            icon: HandHeart,
        },
        {
            number: '04',
            title: 'Lead',
            description:
                'Prepare young people to become responsible, compassionate, and purpose-driven leaders.',
            icon: Target,
        },
    ];

    const impact = [
        {
            value: '4',
            label: 'Core Values',
            icon: Sparkles,
            bg: 'bg-yellow-50',
            color: 'text-yellow-600',
        },
        {
            value: '6+',
            label: 'Youth Activities',
            icon: CalendarDays,
            bg: 'bg-green-50',
            color: 'text-green-700',
        },
        {
            value: '100%',
            label: 'Community Focus',
            icon: Users,
            bg: 'bg-red-50',
            color: 'text-red-700',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="About SoulSync" />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-green-950">

                {/* ==================================================
                    PAGE BACKGROUND DECORATIONS
                ================================================== */}

                <div className="pointer-events-none absolute left-[-10rem] top-[45rem] h-[36rem] w-[36rem] rounded-full bg-green-500/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[-12rem] top-[90rem] h-[40rem] w-[40rem] rounded-full bg-red-500/10 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-yellow-500/10 blur-3xl" />

                {/* ==================================================
                    HERO
                ================================================== */}

                <section className="relative overflow-hidden">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Green Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/92 to-green-800/85" />

                    {/* Red Accent Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-950/40 via-transparent to-red-950/30" />

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-green-950 to-transparent" />

                    {/* Decorative Green Glow */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-500/20 blur-3xl" />

                    {/* Decorative Red Glow */}
                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-600/20 blur-3xl" />

                    {/* Yellow Glow */}
                    <div className="pointer-events-none absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-yellow-400/15 blur-2xl" />

                    {/* ==================================================
                        LARGE SOULSYNC LOGO WATERMARK
                    ================================================== */}

                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:w-[40rem] lg:w-[46rem]"
                    />

                    {/* Floating Particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-yellow-300/80" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-red-300" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200/70" />

                    {/* ==================================================
                        HERO CONTENT
                    ================================================== */}

                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-36 pt-20 text-white sm:px-6 lg:px-8 lg:pb-40 lg:pt-24">

                        <div className="max-w-4xl">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">

                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />

                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                                </span>

                                <Sparkles className="h-4 w-4 text-yellow-300" />

                                About SoulSync
                            </div>

                            {/* Heading */}
                            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                Connecting Hearts.

                                <br />

                                <span className="bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                                    Growing Together.
                                </span>

                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-green-50">
                                SoulSync is a Youth Ministry Management
                                and Engagement System designed to connect,
                                organize, and engage young people through
                                faith, fellowship, service, and growth.
                            </p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <Link
                                    href={route('events')}
                                    className="group inline-flex items-center gap-2 rounded-xl bg-red-700 px-6 py-3 font-bold text-white shadow-xl shadow-red-950/30 transition duration-300 hover:-translate-y-1 hover:bg-red-800 hover:shadow-2xl"
                                >
                                    Explore Events

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href={route('prayer.requests')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/20"
                                >
                                    <Heart className="h-4 w-4 text-yellow-300" />

                                    Prayer Community
                                </Link>

                            </div>

                            {/* Hero Values */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                                {['Faith', 'Fellowship', 'Service', 'Growth'].map(
                                    (value) => (
                                        <div
                                            key={value}
                                            className="flex items-center gap-2 text-xs font-bold text-green-50"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-yellow-400" />
                                            {value}
                                        </div>
                                    ),
                                )}

                            </div>

                        </div>

                    </div>
                </section>

                {/* ==================================================
                    MAIN CONTENT
                ================================================== */}

                <main className="relative z-20 mx-auto max-w-7xl space-y-10 px-4 pb-14 pt-10 sm:px-6 lg:px-8">

                    {/* ==================================================
                        STATS
                    ================================================== */}

                    <section className="relative z-20 -mt-24 grid gap-4 sm:grid-cols-3">

                        {impact.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="group rounded-2xl border border-white/10 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
                                >

                                    <div className="flex items-center justify-between">

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} transition group-hover:scale-110`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 ${item.color}`}
                                            />
                                        </div>

                                        <span className="text-3xl font-black text-slate-900">
                                            {item.value}
                                        </span>

                                    </div>

                                    <p className="mt-4 text-sm font-semibold text-slate-500">
                                        {item.label}
                                    </p>

                                </div>
                            );
                        })}

                    </section>

                    {/* ==================================================
                        WHO WE ARE
                    ================================================== */}

                    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

                        <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl sm:p-10">

                            <span className="text-xs font-black uppercase tracking-widest text-green-700">
                                Who We Are
                            </span>

                            <h2 className="mt-3 text-3xl font-black text-slate-900">
                                A place where young people can belong.
                            </h2>

                            <p className="mt-5 leading-8 text-slate-600">
                                SoulSync began with a simple idea: creating a
                                better way for the youth ministry to connect,
                                communicate, and grow together.
                            </p>

                            <p className="mt-4 leading-8 text-slate-600">
                                Through organized activities, announcements,
                                prayer support, music development, and
                                community involvement, SoulSync helps create
                                an environment where young people can
                                participate and discover their purpose.
                            </p>

                            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-yellow-50 p-5">

                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                    <MessageCircleHeart className="h-6 w-6 text-green-700" />
                                </div>

                                <div>
                                    <h3 className="font-black text-slate-900">
                                        Everyone has a place here.
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Connect, participate, and grow with the
                                        community.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* ==================================================
                            MISSION + VISION
                        ================================================== */}

                        <div className="space-y-6">

                            {/* Mission */}
                            <div className="rounded-3xl bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                                    <Target className="h-6 w-6 text-green-950" />
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-yellow-300">
                                    Our Mission
                                </p>

                                <h2 className="mt-2 text-2xl font-black">
                                    Empowering Youth With Purpose
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-green-50">
                                    To guide and empower the youth in their
                                    walk with God, helping them grow in faith,
                                    character, and purpose as they serve the
                                    church and community.
                                </p>

                            </div>

                            {/* Vision */}
                            <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                    <Eye className="h-6 w-6 text-green-700" />
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-green-700">
                                    Our Vision
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-slate-900">
                                    A Generation Ready to Lead
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    A generation of young people rooted in
                                    faith, united in fellowship, active in
                                    service, and prepared to lead with
                                    purpose.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        VALUES
                    ================================================== */}

                    <section>

                        <div className="text-center">

                            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
                                What We Believe
                            </span>

                            <h2 className="mt-2 text-3xl font-black text-white">
                                Our Core Values
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-green-100/80">
                                These values guide how we connect, serve,
                                learn, and grow as a youth community.
                            </p>

                        </div>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {values.map((value) => {
                                const Icon = value.icon;

                                return (
                                    <div
                                        key={value.title}
                                        className="group rounded-2xl border border-green-100 bg-white p-6 text-center shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
                                    >

                                        <div
                                            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} text-white shadow-md transition duration-300 group-hover:scale-110 group-hover:rotate-3`}
                                        >
                                            <Icon className="h-7 w-7" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-black text-slate-900">
                                            {value.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-slate-500">
                                            {value.description}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* ==================================================
                        JOURNEY
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl border border-green-700/30 bg-gradient-to-br from-green-950 via-green-900 to-green-950 p-8 text-white shadow-xl shadow-green-950/50 sm:p-10">

                        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

                        <div className="relative">

                            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
                                Our Journey
                            </span>

                            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                                From Connection to Leadership
                            </h2>

                            <p className="mt-4 max-w-2xl leading-7 text-green-100/70">
                                We believe youth development is a journey.
                                Every connection creates an opportunity to
                                grow, serve, and lead.
                            </p>

                        </div>

                        <div className="relative mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                            {journey.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/10"
                                    >

                                        <div className="flex items-center justify-between">

                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                                <Icon className="h-5 w-5 text-yellow-300 transition group-hover:scale-110" />
                                            </div>

                                            <span className="text-2xl font-black text-white/20">
                                                {item.number}
                                            </span>

                                        </div>

                                        <h3 className="mt-6 text-xl font-black">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-green-100/60">
                                            {item.description}
                                        </p>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* ==================================================
                        STORY
                    ================================================== */}

                    <section className="grid gap-6 lg:grid-cols-2">

                        <div className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <BookOpen className="h-6 w-6 text-green-700" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black text-slate-900">
                                Our Story
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                What started as a simple idea to bring young
                                people closer together has grown into a
                                platform that supports communication,
                                organization, participation, and community
                                engagement.
                            </p>

                            <p className="mt-4 leading-7 text-slate-600">
                                SoulSync continues to provide opportunities
                                for young people to discover their gifts,
                                strengthen relationships, and take an active
                                role in ministry.
                            </p>

                        </div>

                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-800 to-green-900 p-8 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-400/20 blur-2xl" />

                            <div className="relative">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                                    <Music className="h-6 w-6 text-red-950" />
                                </div>

                                <h2 className="mt-6 text-2xl font-black">
                                    Discover Your Gifts
                                </h2>

                                <p className="mt-4 leading-7 text-red-50/90">
                                    Whether your passion is music, leadership,
                                    service, communication, or helping others,
                                    there is an opportunity for you to
                                    contribute.
                                </p>

                                <Link
                                    href={route('music.classes')}
                                    className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-800 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    Explore Music Classes

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        COMMUNITY SCHEDULE
                    ================================================== */}

                    <section className="rounded-3xl border border-green-100 bg-white p-8 shadow-xl shadow-green-950/40 transition duration-300 hover:shadow-2xl sm:p-10">

                        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div>

                                <span className="text-xs font-black uppercase tracking-widest text-green-700">
                                    Community Schedule
                                </span>

                                <h2 className="mt-2 text-3xl font-black text-slate-900">
                                    When We Meet
                                </h2>

                                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                                    Join us for regular fellowship and
                                    community activities where you can
                                    connect with other young people and grow
                                    together.
                                </p>

                            </div>

                            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-yellow-50 p-6 lg:min-w-[280px]">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                                        <CalendarDays className="h-6 w-6 text-green-700" />
                                    </div>

                                    <div>

                                        <p className="font-black text-slate-900">
                                            Every Sunday
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            3:00 PM
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Fellowship Hall
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        FINAL CTA
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-800 to-red-800 px-8 py-14 text-center text-white shadow-xl shadow-green-950/50">

                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/15 blur-xl" />

                        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-red-500/20 blur-2xl" />

                        <div className="relative">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg">
                                <Heart className="h-7 w-7 text-green-950" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                Be Part of the Community
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">
                                Connect with others, discover meaningful
                                activities, grow in faith, and use your gifts
                                to serve.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-3">

                                <Link
                                    href={route('events')}
                                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    View Events

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href={route('prayer.requests')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-yellow-300/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition duration-300 hover:bg-white/20"
                                >
                                    <Heart className="h-4 w-4 text-yellow-300" />

                                    Prayer Requests
                                </Link>

                            </div>

                        </div>

                    </section>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}

