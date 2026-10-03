import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from 'react';
import {
    CalendarDays,
    Clock3,
    MapPin,
    Users,
    Search,
    Heart,
    Share2,
    ArrowRight,
    Sparkles,
    Star,
    X,
    CheckCircle2,
    Rocket,
    UserRound,
    CalendarPlus,
    Info,
} from 'lucide-react';

export default function Events({ events: databaseEvents = [] }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});

    // =========================================================
    // DATABASE EVENTS
    // =========================================================

    const events = databaseEvents.map((event) => {
        const dateOnly = String(event.date).substring(0, 10);
        const dateObject = new Date(`${dateOnly}T00:00:00`);

        return {
            ...event,

            date: dateOnly,

            displayDate: dateObject.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            }),

            day: dateObject.getDate().toString().padStart(2, '0'),

            month: dateObject
                .toLocaleDateString('en-US', {
                    month: 'short',
                })
                .toUpperCase(),

            attendees: Number(event.attendees ?? 0),
            capacity: Number(event.capacity ?? 100),
            featured: Boolean(event.featured),
            icon: event.icon || '🎉',
            status: event.status || 'Upcoming',

            description:
                event.description ||
                'Join us for this meaningful youth ministry event.',
        };
    });

    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = [
        'All',
        'Worship',
        'Fellowship',
        'Outreach',
        'Training',
        'Music',
        'Other',
    ];

    // =========================================================
    // FEATURED EVENT
    // =========================================================

    const featuredEvent = events.find((event) => event.featured);

    // =========================================================
    // COUNTDOWN
    // =========================================================

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const countdowns = {};

            events.forEach((event) => {
                const target = new Date(
                    `${event.date}T18:00:00`,
                ).getTime();

                const distance = target - now;

                if (distance > 0) {
                    countdowns[event.id] = {
                        days: Math.floor(
                            distance / (1000 * 60 * 60 * 24),
                        ),

                        hours: Math.floor(
                            (distance / (1000 * 60 * 60)) % 24,
                        ),

                        minutes: Math.floor(
                            (distance / (1000 * 60)) % 60,
                        ),

                        seconds: Math.floor(
                            (distance / 1000) % 60,
                        ),
                    };
                }
            });

            setTimeLeft(countdowns);
        };

        updateCountdown();

        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, [databaseEvents]);

    // =========================================================
    // FILTER EVENTS
    // =========================================================

    const filteredEvents = events.filter((event) => {
        const matchesCategory =
            category === 'All' || event.category === category;

        const text =
            `${event.title} ${event.description || ''} ${event.location} ${event.organizer}`
                .toLowerCase();

        const matchesSearch = text.includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // =========================================================
    // FAVORITES
    // =========================================================

    const toggleFavorite = (id) => {
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    // =========================================================
    // SHARE
    // =========================================================

    const shareEvent = async (event) => {
        const text = `${event.title}
${event.displayDate}
${event.time}
${event.location}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: text,
                });
            } catch {
                // User cancelled sharing
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);

                alert(
                    'Event information copied to clipboard!',
                );
            } catch {
                alert(
                    'Unable to copy event information.',
                );
            }
        }
    };

    // =========================================================
    // ADD TO GOOGLE CALENDAR
    // =========================================================

    const addToCalendar = (event) => {
        const start =
            event.date.replaceAll('-', '') + 'T180000';

        const end =
            event.date.replaceAll('-', '') + 'T203000';

        const calendarUrl =
            `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(event.title)}` +
            `&dates=${start}/${end}` +
            `&details=${encodeURIComponent(
                event.description || '',
            )}` +
            `&location=${encodeURIComponent(
                event.location,
            )}`;

        window.open(calendarUrl, '_blank');
    };

    // =========================================================
    // STATISTICS
    // =========================================================

    const totalParticipants = events.reduce(
        (total, event) =>
            total + Number(event.attendees || 0),
        0,
    );

    const upcomingEvents = events.filter(
        (event) => event.status !== 'Cancelled',
    ).length;

    return (
        <AuthenticatedLayout>
            <Head title="Youth Events" />

            <div className="min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-green-950">

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="relative min-h-[560px] overflow-hidden">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Green Brand Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/90 to-green-800/80" />

                    {/* Red Accent */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-950/30 via-transparent to-yellow-500/10" />

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-green-950 to-transparent" />

                    {/* Green Glow */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    {/* Yellow Glow */}
                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-yellow-400/10 blur-3xl" />

                    {/* Red Glow */}
                    <div className="pointer-events-none absolute right-[15%] top-[18%] h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

                    {/* Small Particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-yellow-300/80" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-300" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-yellow-200" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    {/* =================================================
                        LOGO WATERMARK
                    ================================================= */}

                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[30rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:w-[38rem] lg:w-[46rem]"
                    />

                    {/* =================================================
                        HERO CONTENT
                    ================================================= */}

                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-40 pt-20 text-white sm:px-6 lg:px-8 lg:pt-24">

                        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

                            <div className="max-w-3xl">

                                {/* Badge */}

                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">

                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />

                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                                    </span>

                                    SoulSync Youth Events
                                </span>

                                {/* Heading */}

                                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                    Connect.

                                    <br />

                                    <span className="bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                                        Participate. Grow.
                                    </span>

                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">
                                    Discover meaningful events,
                                    build friendships, serve
                                    together, develop your
                                    gifts, and grow with the
                                    SoulSync youth community.
                                </p>

                                {/* Buttons */}

                                <div className="mt-8 flex flex-wrap gap-3">

                                    <a
                                        href="#events"
                                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-red-900/30"
                                    >
                                        Explore Events
                                        <ArrowRight className="h-4 w-4" />
                                    </a>

                                    {featuredEvent && (
                                        <a
                                            href="#featured"
                                            className="inline-flex items-center gap-2 rounded-xl border border-yellow-300/30 bg-yellow-400/10 px-6 py-3 font-bold text-yellow-100 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-yellow-400/20"
                                        >
                                            <Star className="h-4 w-4 text-yellow-300" />
                                            Featured Event
                                        </a>
                                    )}

                                </div>

                                {/* Values */}

                                <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">

                                    <div>
                                        <p className="font-black text-white">
                                            Connect
                                        </p>

                                        <p className="mt-1 text-xs text-green-200">
                                            Build friendships
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-black text-white">
                                            Participate
                                        </p>

                                        <p className="mt-1 text-xs text-green-200">
                                            Join activities
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-black text-white">
                                            Grow
                                        </p>

                                        <p className="mt-1 text-xs text-green-200">
                                            Discover purpose
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                EVENT CENTER CARD
                            ================================================= */}

                            <div className="hidden lg:block">

                                <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/15">
                                            <CalendarDays className="h-6 w-6 text-yellow-300" />
                                        </div>

                                        <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-bold text-green-200">
                                            Active
                                        </span>

                                    </div>

                                    <p className="mt-8 text-sm text-green-100">
                                        Event Center
                                    </p>

                                    <p className="mt-1 text-5xl font-black">
                                        {events.length}
                                    </p>

                                    <p className="mt-1 text-sm text-green-200">
                                        Current Events
                                    </p>

                                    <div className="mt-7 border-t border-white/10 pt-6">

                                        <p className="text-sm font-semibold">
                                            Make memories together.
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-green-200">
                                            Join worship,
                                            fellowship,
                                            outreach, training,
                                            and music activities.
                                        </p>

                                    </div>

                                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white">
                                        <Sparkles className="h-4 w-4 text-yellow-300" />
                                        Be part of the community
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>

                {/* =====================================================
                    MAIN
                ===================================================== */}

                <main
                    id="events"
                    className="relative z-20 mx-auto -mt-10 max-w-7xl space-y-10 px-4 pb-14 sm:px-6 lg:px-8"
                >

                    {/* =================================================
                        STATS
                    ================================================= */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                        {/* Total */}

                        <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <CalendarDays className="h-7 w-7 text-green-700" />
                            </div>

                            <p className="mt-4 text-3xl font-black text-gray-900">
                                {events.length}
                            </p>

                            <p className="text-sm text-gray-500">
                                Total Events
                            </p>

                        </div>

                        {/* Active */}

                        <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                                <CheckCircle2 className="h-7 w-7 text-green-700" />
                            </div>

                            <p className="mt-4 text-3xl font-black text-gray-900">
                                {upcomingEvents}
                            </p>

                            <p className="text-sm text-gray-500">
                                Active Events
                            </p>

                        </div>

                        {/* Participants */}

                        <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <Users className="h-7 w-7 text-green-700" />
                            </div>

                            <p className="mt-4 text-3xl font-black text-gray-900">
                                {totalParticipants}
                            </p>

                            <p className="text-sm text-gray-500">
                                Expected Participants
                            </p>

                        </div>

                        {/* Favorites */}

                        <div className="group rounded-2xl border border-green-100 bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                                <Heart className="h-7 w-7 text-red-600" />
                            </div>

                            <p className="mt-4 text-3xl font-black text-gray-900">
                                {favorites.length}
                            </p>

                            <p className="text-sm text-gray-500">
                                Saved Events
                            </p>

                        </div>

                    </div>

                    {/* =================================================
                        FEATURED EVENT
                    ================================================= */}

                    {featuredEvent && (
                        <section
                            id="featured"
                            className="overflow-hidden rounded-3xl bg-white shadow-xl"
                        >

                            <div className="grid lg:grid-cols-2">

                                {/* Visual */}

                                <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-10 text-center text-white">

                                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

                                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

                                    <div className="relative">

                                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yellow-200 backdrop-blur">
                                            <Star className="h-4 w-4 text-yellow-300" />
                                            Featured Event
                                        </div>

                                        <div className="text-7xl">
                                            {featuredEvent.icon}
                                        </div>

                                        <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                            {featuredEvent.title}
                                        </h2>

                                    </div>

                                </div>

                                {/* Details */}

                                <div className="p-8 sm:p-10">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                            {featuredEvent.category}
                                        </span>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                featuredEvent.status ===
                                                'Registration Open'
                                                    ? 'bg-green-100 text-green-700'
                                                    : featuredEvent.status ===
                                                      'Cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {featuredEvent.status}
                                        </span>

                                    </div>

                                    <h2 className="mt-5 text-3xl font-black text-gray-900">
                                        {featuredEvent.title}
                                    </h2>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        {featuredEvent.description}
                                    </p>

                                    {/* Countdown */}

                                    {timeLeft[featuredEvent.id] && (
                                        <div className="mt-6">

                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Event starts in
                                            </p>

                                            <div className="mt-3 grid grid-cols-4 gap-2">

                                                {[
                                                    [
                                                        'Days',
                                                        timeLeft[
                                                            featuredEvent.id
                                                        ].days,
                                                    ],
                                                    [
                                                        'Hours',
                                                        timeLeft[
                                                            featuredEvent.id
                                                        ].hours,
                                                    ],
                                                    [
                                                        'Min',
                                                        timeLeft[
                                                            featuredEvent.id
                                                        ].minutes,
                                                    ],
                                                    [
                                                        'Sec',
                                                        timeLeft[
                                                            featuredEvent.id
                                                        ].seconds,
                                                    ],
                                                ].map(
                                                    ([label, value]) => (
                                                        <div
                                                            key={label}
                                                            className="rounded-xl bg-green-50 p-3 text-center"
                                                        >
                                                            <p className="text-xl font-black text-green-700">
                                                                {String(
                                                                    value,
                                                                ).padStart(
                                                                    2,
                                                                    '0',
                                                                )}
                                                            </p>

                                                            <p className="text-[10px] font-bold uppercase text-gray-400">
                                                                {label}
                                                            </p>
                                                        </div>
                                                    ),
                                                )}

                                            </div>
                                        </div>
                                    )}

                                    {/* Event Details */}

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <CalendarDays className="h-4 w-4 text-green-700" />
                                            {featuredEvent.displayDate}
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Clock3 className="h-4 w-4 text-green-700" />
                                            {featuredEvent.time}
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4 text-green-700" />
                                            {featuredEvent.location}
                                        </div>

                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <UserRound className="h-4 w-4 text-green-700" />
                                            {featuredEvent.organizer}
                                        </div>

                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedEvent(
                                                    featuredEvent,
                                                )
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
                                        >
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                addToCalendar(
                                                    featuredEvent,
                                                )
                                            }
                                            className="inline-flex items-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                        >
                                            <CalendarPlus className="h-4 w-4" />
                                            Add to Calendar
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </section>
                    )}

                    {/* =================================================
                        EVENT DIRECTORY
                    ================================================= */}

                    <section>

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                            <div>

                                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
                                    <CalendarDays className="h-4 w-4" />
                                    Event Center
                                </p>

                                <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                                    Upcoming Events
                                </h2>

                                <p className="mt-2 text-green-100">
                                    Find activities that inspire,
                                    connect, and help you grow.
                                </p>

                            </div>

                            {/* Search */}

                            <div className="relative w-full lg:w-96">

                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Search events..."
                                    className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-5 text-sm shadow-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                                />

                            </div>

                        </div>

                        {/* Filters */}

                        <div className="mt-6 flex flex-wrap gap-2">

                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        setCategory(item)
                                    }
                                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                                        category === item
                                            ? 'bg-yellow-400 text-green-950 shadow-lg'
                                            : 'border border-white/10 bg-white/10 text-white backdrop-blur hover:bg-white/20'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}

                        </div>

                        {/* Event Cards */}

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {filteredEvents.map((event) => {

                                const percentage =
                                    event.capacity > 0
                                        ? Math.min(
                                              100,
                                              Math.round(
                                                  (event.attendees /
                                                      event.capacity) *
                                                      100,
                                              ),
                                          )
                                        : 0;

                                return (
                                    <article
                                        key={event.id}
                                        className="group overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    >

                                        {/* Card Header */}

                                        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6">

                                            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-300/30 blur-2xl" />

                                            {/* Favorite */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleFavorite(
                                                        event.id,
                                                    )
                                                }
                                                className="absolute right-4 top-4 z-10 rounded-full bg-white p-2.5 shadow-md transition hover:scale-110"
                                                title="Save event"
                                            >
                                                <Heart
                                                    className={`h-5 w-5 ${
                                                        favorites.includes(
                                                            event.id,
                                                        )
                                                            ? 'fill-red-500 text-red-500'
                                                            : 'text-gray-400'
                                                    }`}
                                                />
                                            </button>

                                            <div className="relative flex items-center gap-4">

                                                {/* Date */}

                                                <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-md">

                                                    <span className="text-2xl font-black text-green-700">
                                                        {event.day}
                                                    </span>

                                                    <span className="text-xs font-bold text-gray-400">
                                                        {event.month}
                                                    </span>

                                                </div>

                                                <div className="pr-8">

                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">
                                                        {event.category}
                                                    </span>

                                                    <h3 className="mt-2 line-clamp-2 text-lg font-black text-gray-900">
                                                        {event.title}
                                                    </h3>

                                                </div>

                                            </div>
                                        </div>

                                        {/* Card Body */}

                                        <div className="p-6">

                                            <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                                                {event.description}
                                            </p>

                                            <div className="mt-5 space-y-3 text-sm text-gray-500">

                                                <div className="flex items-center gap-2">
                                                    <Clock3 className="h-4 w-4 text-green-600" />
                                                    {event.time}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-green-600" />
                                                    {event.location}
                                                </div>

                                            </div>

                                            {/* Participants */}

                                            <div className="mt-5">

                                                <div className="flex justify-between text-xs font-semibold">

                                                    <span className="text-gray-500">
                                                        Participants
                                                    </span>

                                                    <span className="text-green-700">
                                                        {event.attendees}
                                                        /
                                                        {event.capacity}
                                                    </span>

                                                </div>

                                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-green-600 via-green-500 to-yellow-400 transition-all"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                            {/* Bottom */}

                                            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                                                        event.status ===
                                                        'Registration Open'
                                                            ? 'bg-green-100 text-green-700'
                                                            : event.status ===
                                                              'Cancelled'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {event.status}
                                                </span>

                                                <div className="flex gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            shareEvent(
                                                                event,
                                                            )
                                                        }
                                                        className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                                                        title="Share"
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedEvent(
                                                                event,
                                                            )
                                                        }
                                                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"
                                                    >
                                                        Details
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>

                        {/* No Events */}

                        {filteredEvents.length === 0 && (
                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-12 text-center text-white backdrop-blur">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10">
                                    <Search className="h-8 w-8 text-yellow-300" />
                                </div>

                                <h3 className="mt-5 text-xl font-bold">
                                    No events found
                                </h3>

                                <p className="mt-2 text-sm text-green-100">
                                    Try another keyword or
                                    select a different
                                    category.
                                </p>

                            </div>
                        )}

                    </section>

                    {/* =================================================
                        WHY PARTICIPATE
                    ================================================= */}

                    <section>

                        <div className="text-center">

                            <p className="text-sm font-bold uppercase tracking-wider text-yellow-300">
                                Why Participate?
                            </p>

                            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                                More Than Just Events
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-green-100">
                                Every gathering is an opportunity
                                to connect, grow, serve, and make
                                meaningful memories.
                            </p>

                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">

                            {/* Connections */}

                            <div className="rounded-3xl bg-white p-7 text-center shadow-xl transition duration-300 hover:-translate-y-2">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                                    <Users className="h-7 w-7 text-green-700" />
                                </div>

                                <h3 className="mt-5 font-black text-gray-900">
                                    Build Connections
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Meet new people and create
                                    meaningful friendships within
                                    the youth community.
                                </p>

                            </div>

                            {/* Skills */}

                            <div className="rounded-3xl bg-white p-7 text-center shadow-xl transition duration-300 hover:-translate-y-2">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
                                    <Rocket className="h-7 w-7 text-green-700" />
                                </div>

                                <h3 className="mt-5 font-black text-gray-900">
                                    Develop Skills
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Improve leadership, teamwork,
                                    communication, creativity,
                                    and confidence.
                                </p>

                            </div>

                            {/* Impact */}

                            <div className="rounded-3xl bg-white p-7 text-center shadow-xl transition duration-300 hover:-translate-y-2">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                                    <Sparkles className="h-7 w-7 text-red-600" />
                                </div>

                                <h3 className="mt-5 font-black text-gray-900">
                                    Make an Impact
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Use your time and talents to
                                    serve others and create meaningful
                                    community impact.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        CTA
                    ================================================= */}

                    <section className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-700 via-green-800 to-red-700 px-8 py-14 text-center text-white shadow-2xl">

                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />

                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-400/20 blur-3xl" />

                        {/* Logo Watermark */}

                        <img
                            src="/images/logo.png"
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
                        />

                        <div className="relative">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/15 backdrop-blur">
                                <Sparkles className="h-8 w-8 text-yellow-300" />
                            </div>

                            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
                                Be Part of Something Bigger
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl text-green-100">
                                Don't just watch from the sidelines.
                                Connect, participate, serve, and
                                grow with the youth community.
                            </p>

                            <a
                                href="#events"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-3 font-bold text-green-950 transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
                            >
                                Explore Events
                                <ArrowRight className="h-4 w-4" />
                            </a>

                        </div>

                    </section>

                </main>
            </div>

            {/* =========================================================
                EVENT MODAL
            ========================================================= */}

            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedEvent(null)
                    }
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Modal Header */}

                        <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-red-700 p-8 text-center text-white">

                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedEvent(null)
                                }
                                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="relative">

                                <div className="text-6xl">
                                    {selectedEvent.icon}
                                </div>

                                <span className="mt-5 inline-block rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-bold text-yellow-200 backdrop-blur">
                                    {selectedEvent.category}
                                </span>

                                <h2 className="mt-4 text-3xl font-black">
                                    {selectedEvent.title}
                                </h2>

                                <p className="mt-2 text-white/80">
                                    {selectedEvent.status}
                                </p>

                            </div>

                        </div>

                        {/* Modal Body */}

                        <div className="p-8">

                            <div className="flex items-start gap-3">

                                <Info className="mt-1 h-5 w-5 shrink-0 text-green-700" />

                                <p className="leading-7 text-gray-600">
                                    {selectedEvent.description}
                                </p>

                            </div>

                            {/* Details */}

                            <div className="mt-6 space-y-4 rounded-2xl bg-gradient-to-br from-green-50 via-white to-yellow-50 p-5 text-sm">

                                <div className="flex items-center gap-3">

                                    <CalendarDays className="h-5 w-5 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Date
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {selectedEvent.displayDate}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Clock3 className="h-5 w-5 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Time
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {selectedEvent.time}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <MapPin className="h-5 w-5 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Location
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {selectedEvent.location}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <UserRound className="h-5 w-5 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Organizer
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {selectedEvent.organizer}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Users className="h-5 w-5 text-green-700" />

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Participants
                                        </p>

                                        <p className="font-semibold text-gray-800">
                                            {selectedEvent.attendees}
                                            {' / '}
                                            {selectedEvent.capacity}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Modal Actions */}

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        addToCalendar(
                                            selectedEvent,
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
                                >
                                    <CalendarPlus className="h-4 w-4" />
                                    Add Calendar
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        shareEvent(
                                            selectedEvent,
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                >
                                    <Share2 className="h-4 w-4" />
                                    Share Event
                                </button>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedEvent(null)
                                }
                                className="mt-3 w-full rounded-xl bg-gray-100 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
                            >
                                Close
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}