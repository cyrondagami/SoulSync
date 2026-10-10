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
    /* Each value gets one of the four brand colors (green, yellow, red, white) */
    const values = [
        {
            icon: Heart,
            title: 'Faith',
            description:
                'Growing deeper in our relationship with God through prayer, worship, and His Word.',
            gradient: 'from-green-600 to-green-800',
            text: 'text-white',
            desc: 'text-green-50/90',
            chip: 'bg-white/20 text-white',
            mark: 'text-white/10',
        },
        {
            icon: Users,
            title: 'Fellowship',
            description:
                'Building genuine friendships and a strong sense of community among the youth.',
            gradient: 'from-yellow-400 to-yellow-500',
            text: 'text-green-950',
            desc: 'text-green-950/80',
            chip: 'bg-green-950/15 text-green-950',
            mark: 'text-green-950/10',
        },
        {
            icon: HandHeart,
            title: 'Service',
            description:
                'Serving the church and community with humility, compassion, and love.',
            gradient: 'from-red-600 to-red-800',
            text: 'text-white',
            desc: 'text-red-50/90',
            chip: 'bg-white/20 text-white',
            mark: 'text-white/10',
        },
        {
            icon: BookOpen,
            title: 'Growth',
            description:
                'Encouraging every member to grow spiritually, mentally, socially, and personally.',
            gradient: 'from-white to-green-50',
            text: 'text-green-950',
            desc: 'text-green-900/75',
            chip: 'bg-green-700 text-white',
            mark: 'text-green-700/10',
        },
    ];

    /* Each step links to a real feature so the journey is actionable. */
    const journey = [
        {
            number: '1',
            title: 'Connect',
            description:
                'Meet people, build friendships, and find a community where every young person feels valued.',
            icon: Users,
            route: 'events',
            cta: 'Join an event',
        },
        {
            number: '2',
            title: 'Grow',
            description:
                'Develop your faith, character, and talents through learning and guided practice.',
            icon: Sparkles,
            route: 'music.classes',
            cta: 'Try a music class',
        },
        {
            number: '3',
            title: 'Serve',
            description:
                'Use your gifts to support others, stand with them in prayer, and make a real impact.',
            icon: HandHeart,
            route: 'prayer.requests',
            cta: 'Join the prayer community',
        },
        {
            number: '4',
            title: 'Lead',
            description:
                'Become a responsible, compassionate, and purpose-driven leader for the next generation.',
            icon: Target,
            goal: true,
        },
    ];

    const impact = [
        {
            value: '4',
            label: 'Core Values',
            icon: Sparkles,
            iconBg: 'bg-yellow-400/20',
            color: 'text-yellow-300',
        },
        {
            value: '6+',
            label: 'Youth Activities',
            icon: CalendarDays,
            iconBg: 'bg-green-400/20',
            color: 'text-green-300',
        },
        {
            value: '100%',
            label: 'Community Focus',
            icon: Users,
            iconBg: 'bg-red-400/20',
            color: 'text-red-300',
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

                    {/* LARGE SOULSYNC LOGO WATERMARK */}
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

                    {/* HERO CONTENT */}
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

                <main className="relative z-20 mx-auto max-w-7xl space-y-16 px-4 pb-14 pt-10 sm:px-6 lg:px-8">

                    {/* ==================================================
                        STATS — one glass strip instead of 3 white boxes
                    ================================================== */}

                    <section className="relative z-20 -mt-24 grid overflow-hidden rounded-3xl border border-white/15 bg-green-950/70 shadow-2xl shadow-black/30 backdrop-blur-xl sm:grid-cols-3 sm:divide-x sm:divide-white/10">

                        {impact.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-4 border-b border-white/10 p-6 last:border-b-0 sm:border-b-0 sm:p-7"
                                >

                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${item.color}`}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-3xl font-black leading-none text-white">
                                            {item.value}
                                        </p>

                                        <p className="mt-1.5 text-sm font-semibold text-green-100/80">
                                            {item.label}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}

                    </section>

                    {/* ==================================================
                        WHO WE ARE — open text layout (no white box)
                    ================================================== */}

                    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

                        <div className="border-l-4 border-yellow-400 pl-6 sm:pl-8">

                            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
                                Who We Are
                            </span>

                            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                                A place where young people can belong.
                            </h2>

                            <p className="mt-5 leading-8 text-green-50/85">
                                SoulSync began with a simple idea: creating a
                                better way for the youth ministry to connect,
                                communicate, and grow together.
                            </p>

                            <p className="mt-4 leading-8 text-green-50/85">
                                Through organized activities, announcements,
                                prayer support, music development, and
                                community involvement, SoulSync helps create
                                an environment where young people can
                                participate and discover their purpose.
                            </p>

                            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">

                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-400">
                                    <MessageCircleHeart className="h-6 w-6 text-green-950" />
                                </div>

                                <div>
                                    <h3 className="font-black text-white">
                                        Everyone has a place here.
                                    </h3>

                                    <p className="mt-1 text-sm text-green-100/80">
                                        Connect, participate, and grow with the
                                        community.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* MISSION + VISION */}

                        <div className="space-y-6">

                            {/* Mission — solid green */}
                            <div className="rounded-3xl bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-8 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

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

                            {/* Vision — outlined glass, different from Mission */}
                            <div className="rounded-3xl border-2 border-dashed border-yellow-300/40 bg-white/5 p-8 text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-yellow-300/70 hover:bg-white/10">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-300/40 bg-yellow-400/15">
                                    <Eye className="h-6 w-6 text-yellow-300" />
                                </div>

                                <p className="mt-6 text-xs font-bold uppercase tracking-widest text-yellow-300">
                                    Our Vision
                                </p>

                                <h2 className="mt-2 text-2xl font-black">
                                    A Generation Ready to Lead
                                </h2>

                                <p className="mt-4 text-sm leading-7 text-green-50/85">
                                    A generation of young people rooted in
                                    faith, united in fellowship, active in
                                    service, and prepared to lead with
                                    purpose.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* ==================================================
                        VALUES — each value has its own brand color
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
                                        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${value.gradient} p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                                    >

                                        {/* Large faded icon watermark */}
                                        <Icon
                                            className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 transition duration-500 group-hover:scale-110 group-hover:-rotate-6 ${value.mark}`}
                                        />

                                        <div className="relative">

                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${value.chip}`}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <h3
                                                className={`mt-5 text-xl font-black ${value.text}`}
                                            >
                                                {value.title}
                                            </h3>

                                            <p
                                                className={`mt-3 text-sm leading-6 ${value.desc}`}
                                            >
                                                {value.description}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* ==================================================
                        JOURNEY — a connected pathway (Connect → Lead)
                        (unchanged)
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl border border-yellow-300/20 bg-gradient-to-br from-green-800 via-green-900 to-red-950 p-8 text-white shadow-2xl shadow-green-950/60 sm:p-12">

                        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />

                        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

                        {/* Heading */}
                        <div className="relative mx-auto max-w-2xl text-center">

                            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
                                Our Journey
                            </span>

                            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                                From Connection to Leadership
                            </h2>

                            <p className="mt-4 leading-7 text-green-50/90">
                                Youth development is a journey, not a single
                                event. Every step you take here prepares you
                                for the next one.
                            </p>

                        </div>

                        {/* Steps */}
                        <div className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6">

                            {/* Connecting line — vertical on mobile */}
                            <div className="pointer-events-none absolute bottom-7 left-7 top-7 w-px bg-gradient-to-b from-green-300/50 via-yellow-300/60 to-yellow-300/30 lg:hidden" />

                            {/* Connecting line — horizontal on desktop */}
                            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-green-300/50 via-yellow-300/60 to-yellow-300/80 lg:block" />

                            {journey.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                                    >

                                        {/* Step marker */}
                                        <div className="relative z-10 shrink-0">

                                            <div
                                                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-lg ${
                                                    item.goal
                                                        ? 'border-yellow-200 bg-yellow-400 shadow-yellow-400/30'
                                                        : 'border-yellow-300/40 bg-green-900'
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-6 w-6 ${
                                                        item.goal
                                                            ? 'text-green-950'
                                                            : 'text-yellow-300'
                                                    }`}
                                                />
                                            </div>

                                            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-700 text-[11px] font-black text-white ring-2 ring-green-900">
                                                {item.number}
                                            </span>

                                        </div>

                                        {/* Step content */}
                                        <div className="min-w-0 lg:mt-6">

                                            <h3 className="text-xl font-black">
                                                {item.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-green-50/85">
                                                {item.description}
                                            </p>

                                            {item.goal ? (
                                                <span className="mt-4 inline-flex rounded-full bg-yellow-400 px-3 py-1 text-xs font-black text-green-950">
                                                    Where it leads
                                                </span>
                                            ) : (
                                                <Link
                                                    href={route(item.route)}
                                                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-yellow-300 transition hover:text-white"
                                                >
                                                    {item.cta}

                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            )}

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* ==================================================
                        STORY — open text + gifts card
                    ================================================== */}

                    <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">

                        <div className="flex flex-col justify-center border-l-4 border-green-400 pl-6 sm:pl-8">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/20">
                                <BookOpen className="h-6 w-6 text-green-300" />
                            </div>

                            <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
                                Our Story
                            </h2>

                            <p className="mt-4 leading-7 text-green-50/85">
                                What started as a simple idea to bring young
                                people closer together has grown into a
                                platform that supports communication,
                                organization, participation, and community
                                engagement.
                            </p>

                            <p className="mt-4 leading-7 text-green-50/85">
                                SoulSync continues to provide opportunities
                                for young people to discover their gifts,
                                strengthen relationships, and take an active
                                role in ministry.
                            </p>

                        </div>

                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-800 to-green-900 p-8 text-white shadow-xl shadow-green-950/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-400/20 blur-2xl" />

                            <Music className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-white/10" />

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
                        COMMUNITY SCHEDULE — bold yellow banner
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-300 p-8 shadow-xl shadow-green-950/50 sm:p-10">

                        <CalendarDays className="pointer-events-none absolute -bottom-10 left-1/3 h-48 w-48 text-green-950/5" />

                        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                            <div>

                                <span className="text-xs font-black uppercase tracking-widest text-green-900">
                                    Community Schedule
                                </span>

                                <h2 className="mt-2 text-3xl font-black text-green-950 sm:text-4xl">
                                    When We Meet
                                </h2>

                                <p className="mt-4 max-w-2xl leading-7 text-green-950/80">
                                    Join us for regular fellowship and
                                    community activities where you can
                                    connect with other young people and grow
                                    together.
                                </p>

                            </div>

                            <div className="rounded-2xl bg-green-950 p-6 text-white shadow-xl lg:min-w-[280px]">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                                        <CalendarDays className="h-6 w-6 text-green-950" />
                                    </div>

                                    <div>

                                        <p className="font-black">
                                            Every Sunday
                                        </p>

                                        <p className="mt-1 text-sm text-green-100">
                                            3:00 PM
                                        </p>

                                        <p className="mt-1 text-xs text-green-200/70">
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
