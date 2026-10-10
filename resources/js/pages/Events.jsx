import { Head, router } from '@inertiajs/react';
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
    UserPlus,
    Loader2,
    Ban,
    AlertCircle,
    Ticket,
} from 'lucide-react';

/* Statuses where joining is not allowed (keep in sync with EventController) */
const CLOSED_STATUSES = ['Cancelled', 'Completed', 'Closed'];

const statusClass = (status) =>
    status === 'Registration Open'
        ? 'bg-green-100 text-green-700'
        : status === 'Cancelled'
          ? 'bg-red-100 text-red-700'
          : 'bg-yellow-100 text-yellow-800';

// =========================================================
// PARTICIPANT BAR (joined / capacity / spots left)
// =========================================================

function ParticipantBar({ event }) {
    const pct =
        event.capacity > 0
            ? Math.min(100, Math.round((event.attendees / event.capacity) * 100))
            : 0;

    const low =
        !event.isFull &&
        event.spotsLeft <= Math.max(3, Math.ceil(event.capacity * 0.15));

    return (
        <div>
            <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-500">
                    {event.attendees} / {event.capacity} joined
                </span>

                <span
                    className={
                        event.isFull
                            ? 'text-red-600'
                            : low
                              ? 'text-amber-600'
                              : 'text-green-700'
                    }
                >
                    {event.isFull
                        ? 'Event full'
                        : `${event.spotsLeft} spot${event.spotsLeft === 1 ? '' : 's'} left`}
                </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                    className={`h-full rounded-full transition-all duration-700 ${
                        event.isFull
                            ? 'bg-green-800'
                            : low
                              ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                              : 'bg-gradient-to-r from-green-600 to-green-400'
                    }`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// =========================================================
// JOIN ACTION (Join / You're Going + Leave / Full / Closed)
// =========================================================

function JoinAction({ event, processing, onJoin, onLeave, large = false }) {
    const base = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition ${
        large ? 'px-6 py-3.5 text-base' : 'px-4 py-3 text-sm'
    }`;

    /* Approved by admin */
    if (event.joined) {
        return (
            <div className="flex gap-2">
                <div
                    className={`${base} flex-1 cursor-default bg-green-100 text-green-800`}
                >
                    <CheckCircle2 className="h-4 w-4" />
                    {event.isEnded ? 'You Attended' : "You're Going"}
                </div>

                {!event.isEnded && (
                    <button
                        type="button"
                        onClick={() => onLeave(event)}
                        disabled={processing}
                        className={`${base} border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50`}
                    >
                        Leave
                    </button>
                )}
            </div>
        );
    }

    /* Waiting for admin approval */
    if (event.pending) {
        return (
            <div className="flex gap-2">
                <div
                    className={`${base} flex-1 cursor-default bg-yellow-100 text-yellow-800`}
                >
                    <Clock3 className="h-4 w-4" />
                    Awaiting Approval
                </div>

                {!event.isEnded && (
                    <button
                        type="button"
                        onClick={() => onLeave(event)}
                        disabled={processing}
                        className={`${base} border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50`}
                    >
                        Cancel
                    </button>
                )}
            </div>
        );
    }

    /* Declined by admin (with reason) */
    if (event.rejected) {
        return (
            <div className="w-full rounded-xl border border-red-200 bg-red-50 p-4 text-left">
                <div className="flex items-center gap-2 text-sm font-black text-red-700">
                    <Ban className="h-4 w-4 shrink-0" />
                    Request Declined
                </div>

                <p className="mt-2 text-sm leading-6 text-red-600">
                    {event.declineReason ||
                        'Your request was not approved by the admin.'}
                </p>
            </div>
        );
    }

    /* Not available */
    if (event.isEnded || event.isClosed || event.isFull) {
        const label = event.isEnded
            ? 'Event Ended'
            : event.isCancelled
              ? 'Event Cancelled'
              : event.isClosed
                ? 'Registration Closed'
                : 'Event Full';

        return (
            <button
                type="button"
                disabled
                className={`${base} w-full cursor-not-allowed bg-gray-100 text-gray-400`}
            >
                <Ban className="h-4 w-4" />
                {label}
            </button>
        );
    }

    /* Can join / request */
    return (
        <button
            type="button"
            onClick={() => onJoin(event)}
            disabled={processing}
            className={`${base} w-full bg-red-600 text-white shadow-lg shadow-red-600/20 hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70`}
        >
            {processing ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {event.requiresApproval ? 'Sending...' : 'Joining...'}
                </>
            ) : (
                <>
                    <UserPlus className="h-4 w-4" />
                    {event.requiresApproval ? 'Request to Join' : 'Join Event'}
                </>
            )}
        </button>
    );
}


export default function Events({ events: databaseEvents = [] }) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [view, setView] = useState('all'); // all | joined
    const [selectedId, setSelectedId] = useState(null);
    const [confirmLeaveId, setConfirmLeaveId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const [processingId, setProcessingId] = useState(null);
    const [toast, setToast] = useState(null);

    // =========================================================
    // DATABASE EVENTS
    // =========================================================

    const events = databaseEvents.map((event) => {
        const dateOnly = String(event.date).substring(0, 10);
        const dateObject = new Date(`${dateOnly}T00:00:00`);

        const attendees = Number(event.attendees ?? 0);
        const capacity = Number(event.capacity ?? 100);
        const status = event.status || 'Upcoming';

        const isEnded = new Date(`${dateOnly}T23:59:59`) < new Date();
        const isCancelled = status === 'Cancelled';
        const isClosed = CLOSED_STATUSES.includes(status);
        const isFull = capacity > 0 && attendees >= capacity;

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
                .toLocaleDateString('en-US', { month: 'short' })
                .toUpperCase(),

            attendees,
            capacity,
            spotsLeft: Math.max(0, capacity - attendees),
            featured: Boolean(event.featured),
            icon: event.icon || '🎉',
            status,

            registration: event.registration_status || null,
            joined: event.registration_status === 'approved',
            pending: event.registration_status === 'pending',
            rejected: event.registration_status === 'rejected',
            declineReason: event.decline_reason || null,
            requiresApproval:
                event.requires_approval === undefined
                    ? true
                    : Boolean(event.requires_approval),
            isEnded,
            isCancelled,
            isClosed,
            isFull,

            description:
                event.description ||
                'Join us for this meaningful youth ministry event.',
        };
    });

    const selectedEvent = events.find((e) => e.id === selectedId) ?? null;
    const leaveTarget = events.find((e) => e.id === confirmLeaveId) ?? null;

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

    const featuredEvent = events.find((event) => event.featured);

    // =========================================================
    // TOAST
    // =========================================================

    const showToast = (type, message) => setToast({ type, message });

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => setToast(null), 4500);

        return () => clearTimeout(timer);
    }, [toast]);

    // =========================================================
    // JOIN / LEAVE
    // =========================================================

    const joinEvent = (event) => {
        setProcessingId(event.id);

        router.post(
            route('events.join', event.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () =>
                    showToast(
                        'success',
                        event.requiresApproval
                            ? 'Request sent! You will be able to join once the admin approves it.'
                            : `You're in! See you at ${event.title}.`,
                    ),
                onError: (errors) =>
                    showToast(
                        'error',
                        Object.values(errors)[0] ||
                            'Unable to join this event. Please try again.',
                    ),
                onFinish: () => setProcessingId(null),
            },
        );
    };

    const leaveEvent = (event) => {
        setProcessingId(event.id);

        router.delete(route('events.leave', event.id), {
            preserveScroll: true,
            onSuccess: () => {
                setConfirmLeaveId(null);
                showToast(
                    'success',
                    event.pending
                        ? 'Join request cancelled.'
                        : `You left ${event.title}.`,
                );
            },
            onError: (errors) =>
                showToast(
                    'error',
                    Object.values(errors)[0] ||
                        'Unable to leave this event. Please try again.',
                ),
            onFinish: () => setProcessingId(null),
        });
    };

    // =========================================================
    // COUNTDOWN
    // =========================================================

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const countdowns = {};

            events.forEach((event) => {
                const target = new Date(`${event.date}T18:00:00`).getTime();
                const distance = target - now;

                if (distance > 0) {
                    countdowns[event.id] = {
                        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((distance / (1000 * 60)) % 60),
                        seconds: Math.floor((distance / 1000) % 60),
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

        const matchesView = view === 'all' || event.joined || event.pending;

        const text =
            `${event.title} ${event.description || ''} ${event.location} ${event.organizer}`.toLowerCase();

        const matchesSearch = text.includes(search.toLowerCase());

        return matchesCategory && matchesView && matchesSearch;
    });

    // =========================================================
    // FAVORITES / SHARE / CALENDAR
    // =========================================================

    const toggleFavorite = (id) => {
        setFavorites((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const shareEvent = async (event) => {
        const text = `${event.title}
${event.displayDate}
${event.time}
${event.location}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: event.title, text });
            } catch {
                // User cancelled sharing
            }
        } else {
            try {
                await navigator.clipboard.writeText(text);
                showToast('success', 'Event information copied to clipboard.');
            } catch {
                showToast('error', 'Unable to copy event information.');
            }
        }
    };

    const addToCalendar = (event) => {
        const start = event.date.replaceAll('-', '') + 'T180000';
        const end = event.date.replaceAll('-', '') + 'T203000';

        const calendarUrl =
            `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(event.title)}` +
            `&dates=${start}/${end}` +
            `&details=${encodeURIComponent(event.description || '')}` +
            `&location=${encodeURIComponent(event.location)}`;

        window.open(calendarUrl, '_blank');
    };

    // =========================================================
    // STATISTICS
    // =========================================================

    const totalParticipants = events.reduce(
        (total, event) => total + event.attendees,
        0,
    );

    const openCount = events.filter(
        (event) => !event.isEnded && !event.isClosed && !event.isFull,
    ).length;

    const joinedCount = events.filter((event) => event.joined).length;
    const pendingCount = events.filter((event) => event.pending).length;
    const myCount = joinedCount + pendingCount;

    const stats = [
        {
            label: 'Total Events',
            value: events.length,
            icon: CalendarDays,
            iconBg: 'bg-green-400/20',
            color: 'text-green-300',
        },
        {
            label: 'Open to Join',
            value: openCount,
            icon: CheckCircle2,
            iconBg: 'bg-yellow-400/20',
            color: 'text-yellow-300',
        },
        {
            label: 'Total Participants',
            value: totalParticipants,
            icon: Users,
            iconBg: 'bg-white/15',
            color: 'text-white',
        },
        {
            label: 'Events You Joined',
            value: joinedCount,
            icon: Ticket,
            iconBg: 'bg-red-400/20',
            color: 'text-red-300',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Youth Events" />

            <div className="min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-green-950">

                {/* =====================================================
                    HERO
                ===================================================== */}

                <section className="relative min-h-[560px] overflow-hidden">

                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/90 to-green-800/80" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-950/30 via-transparent to-yellow-500/10" />
                    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-green-950 to-transparent" />

                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-yellow-400/10 blur-3xl" />
                    <div className="pointer-events-none absolute right-[15%] top-[18%] h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-yellow-300/80" />
                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-300" />
                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-yellow-200" />
                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    {/* LOGO WATERMARK */}
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[30rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:w-[38rem] lg:w-[46rem]"
                    />

                    {/* HERO CONTENT */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-40 pt-20 text-white sm:px-6 lg:px-8 lg:pt-24">

                        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

                            <div className="max-w-3xl">

                                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
                                    </span>
                                    SoulSync Youth Events
                                </span>

                                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                                    Connect.
                                    <br />
                                    <span className="bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                                        Participate. Grow.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">
                                    Browse the events prepared by your ministry
                                    leaders and reserve your spot in one tap.
                                    Join, serve, and grow with the SoulSync
                                    youth community.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3">

                                    <a
                                        href="#events"
                                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-red-900/30"
                                    >
                                        Join an Event
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

                                <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
                                    <div>
                                        <p className="font-black text-white">Connect</p>
                                        <p className="mt-1 text-xs text-green-200">Build friendships</p>
                                    </div>

                                    <div>
                                        <p className="font-black text-white">Participate</p>
                                        <p className="mt-1 text-xs text-green-200">Join activities</p>
                                    </div>

                                    <div>
                                        <p className="font-black text-white">Grow</p>
                                        <p className="mt-1 text-xs text-green-200">Discover purpose</p>
                                    </div>
                                </div>

                            </div>

                            {/* EVENT CENTER CARD */}
                            <div className="hidden lg:block">

                                <div className="rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/15">
                                            <CalendarDays className="h-6 w-6 text-yellow-300" />
                                        </div>

                                        <span className="rounded-full bg-green-400/15 px-3 py-1 text-xs font-bold text-green-200">
                                            {openCount} open
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

                                    <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                                            <Ticket className="h-5 w-5 text-red-200" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold">
                                                {joinedCount === 0
                                                    ? "You haven't joined yet"
                                                    : `You joined ${joinedCount} event${joinedCount === 1 ? '' : 's'}`}
                                            </p>

                                            <p className="text-xs text-green-200">
                                                {pendingCount > 0
                                                    ? `${pendingCount} request${pendingCount === 1 ? '' : 's'} awaiting approval.`
                                                    : 'Pick an event below to get started.'}
                                            </p>
                                        </div>

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
                    className="relative z-20 mx-auto -mt-10 max-w-7xl space-y-12 px-4 pb-14 sm:px-6 lg:px-8"
                >

                    {/* =================================================
                        STATS — one glass strip
                    ================================================= */}

                    <div className="grid gap-px overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl shadow-black/30 sm:grid-cols-2 lg:grid-cols-4">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-4 bg-green-950/90 p-6"
                                >
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                                    >
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>

                                    <div>
                                        <p className="text-3xl font-black leading-none text-white">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1.5 text-sm font-semibold text-green-100/80">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

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
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(featuredEvent.status)}`}
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
                                                    ['Days', timeLeft[featuredEvent.id].days],
                                                    ['Hours', timeLeft[featuredEvent.id].hours],
                                                    ['Min', timeLeft[featuredEvent.id].minutes],
                                                    ['Sec', timeLeft[featuredEvent.id].seconds],
                                                ].map(([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="rounded-xl bg-green-50 p-3 text-center"
                                                    >
                                                        <p className="text-xl font-black text-green-700">
                                                            {String(value).padStart(2, '0')}
                                                        </p>

                                                        <p className="text-[10px] font-bold uppercase text-gray-400">
                                                            {label}
                                                        </p>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    )}

                                    {/* Details */}
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

                                    <div className="mt-6">
                                        <ParticipantBar event={featuredEvent} />
                                    </div>

                                    <div className="mt-6 space-y-3">

                                        <JoinAction
                                            event={featuredEvent}
                                            large
                                            processing={processingId === featuredEvent.id}
                                            onJoin={joinEvent}
                                            onLeave={(e) => setConfirmLeaveId(e.id)}
                                        />

                                        <div className="flex flex-wrap gap-3">

                                            <button
                                                type="button"
                                                onClick={() => setSelectedId(featuredEvent.id)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => addToCalendar(featuredEvent)}
                                                className="inline-flex items-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                            >
                                                <CalendarPlus className="h-4 w-4" />
                                                Add to Calendar
                                            </button>

                                        </div>

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
                                    Choose an event and join with one tap.
                                </p>

                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-96">

                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search events..."
                                    className="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-5 text-sm shadow-xl outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-yellow-400"
                                />

                            </div>

                        </div>

                        {/* View toggle */}
                        <div className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 p-1 backdrop-blur">

                            {[
                                ['all', 'All Events', events.length],
                                ['joined', 'My Events', myCount],
                            ].map(([key, label, count]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setView(key)}
                                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition ${
                                        view === key
                                            ? 'bg-white text-green-900 shadow'
                                            : 'text-green-100 hover:text-white'
                                    }`}
                                >
                                    {label}

                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[11px] ${
                                            view === key
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-white/15 text-white'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            ))}

                        </div>

                        {/* Filters */}
                        <div className="mt-4 flex flex-wrap gap-2">

                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
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

                            {filteredEvents.map((event) => (
                                <article
                                    key={event.id}
                                    className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                                        event.joined
                                            ? 'ring-2 ring-green-400'
                                            : event.pending
                                              ? 'ring-2 ring-yellow-400'
                                              : ''
                                    }`}
                                >

                                    {/* Card Header */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6">

                                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-300/30 blur-2xl" />

                                        <button
                                            type="button"
                                            onClick={() => toggleFavorite(event.id)}
                                            className="absolute right-4 top-4 z-10 rounded-full bg-white p-2.5 shadow-md transition hover:scale-110"
                                            title="Save event"
                                        >
                                            <Heart
                                                className={`h-5 w-5 ${
                                                    favorites.includes(event.id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        </button>

                                        <div className="relative flex items-center gap-4">

                                            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-md">
                                                <span className="text-2xl font-black text-green-700">
                                                    {event.day}
                                                </span>

                                                <span className="text-xs font-bold text-gray-400">
                                                    {event.month}
                                                </span>
                                            </div>

                                            <div className="pr-8">

                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">
                                                        {event.category}
                                                    </span>

                                                    {event.joined && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-[11px] font-bold text-white">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            Joined
                                                        </span>
                                                    )}

                                                    {event.pending && (
                                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-[11px] font-bold text-green-950">
                                                            <Clock3 className="h-3 w-3" />
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className="mt-2 line-clamp-2 text-lg font-black text-gray-900">
                                                    {event.title}
                                                </h3>

                                            </div>

                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="flex flex-1 flex-col p-6">

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

                                        <div className="mt-5">
                                            <ParticipantBar event={event} />
                                        </div>

                                        {/* Primary action */}
                                        <div className="mt-5">
                                            <JoinAction
                                                event={event}
                                                processing={processingId === event.id}
                                                onJoin={joinEvent}
                                                onLeave={(e) => setConfirmLeaveId(e.id)}
                                            />
                                        </div>

                                        {/* Secondary actions */}
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">

                                            <span
                                                className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusClass(event.status)}`}
                                            >
                                                {event.status}
                                            </span>

                                            <div className="flex gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() => shareEvent(event)}
                                                    className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                                                    title="Share"
                                                >
                                                    <Share2 className="h-4 w-4" />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedId(event.id)}
                                                    className="rounded-lg border border-green-200 px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
                                                >
                                                    Details
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </article>
                            ))}

                        </div>

                        {/* No Events */}
                        {filteredEvents.length === 0 && (
                            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-12 text-center text-white backdrop-blur">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10">
                                    {view === 'joined' ? (
                                        <Ticket className="h-8 w-8 text-yellow-300" />
                                    ) : (
                                        <Search className="h-8 w-8 text-yellow-300" />
                                    )}
                                </div>

                                <h3 className="mt-5 text-xl font-bold">
                                    {view === 'joined'
                                        ? "You haven't joined any events yet"
                                        : 'No events found'}
                                </h3>

                                <p className="mt-2 text-sm text-green-100">
                                    {view === 'joined'
                                        ? 'Browse all events and tap "Join Event" to reserve your spot.'
                                        : 'Try another keyword or select a different category.'}
                                </p>

                                {view === 'joined' && (
                                    <button
                                        type="button"
                                        onClick={() => setView('all')}
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-green-950 transition hover:bg-yellow-300"
                                    >
                                        Browse All Events
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                )}

                            </div>
                        )}

                    </section>

                    {/* =================================================
                        WHY PARTICIPATE — color-coded cards
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
                                Every gathering is an opportunity to connect,
                                grow, serve, and make meaningful memories.
                            </p>

                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-3">

                            {/* Connections */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-green-800 p-7 text-white shadow-xl transition duration-300 hover:-translate-y-2">

                                <Users className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/10 transition duration-500 group-hover:scale-110" />

                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                                        <Users className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black">
                                        Build Connections
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-green-50/90">
                                        Meet new people and create meaningful
                                        friendships within the youth community.
                                    </p>
                                </div>

                            </div>

                            {/* Skills */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-7 text-green-950 shadow-xl transition duration-300 hover:-translate-y-2">

                                <Rocket className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-green-950/10 transition duration-500 group-hover:scale-110" />

                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-950/15">
                                        <Rocket className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black">
                                        Develop Skills
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-green-950/80">
                                        Improve leadership, teamwork,
                                        communication, creativity, and
                                        confidence.
                                    </p>
                                </div>

                            </div>

                            {/* Impact */}
                            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-7 text-white shadow-xl transition duration-300 hover:-translate-y-2">

                                <Sparkles className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-white/10 transition duration-500 group-hover:scale-110" />

                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                                        <Sparkles className="h-6 w-6" />
                                    </div>

                                    <h3 className="mt-5 text-lg font-black">
                                        Make an Impact
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-red-50/90">
                                        Use your time and talents to serve
                                        others and create meaningful community
                                        impact.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        CTA
                    ================================================= */}

                    <section className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-700 via-green-800 to-red-700 px-8 py-14 text-center text-white shadow-2xl">

                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-red-400/20 blur-3xl" />

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
                                Don't just watch from the sidelines. Join an
                                event, serve, and grow with the youth
                                community.
                            </p>

                            <a
                                href="#events"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-3 font-bold text-green-950 transition hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-lg"
                            >
                                Join an Event
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
                    onClick={() => setSelectedId(null)}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal Header */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-center text-white">

                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

                            <button
                                type="button"
                                onClick={() => setSelectedId(null)}
                                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="relative">

                                <div className="text-6xl">
                                    {selectedEvent.icon}
                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                    <span className="rounded-full bg-yellow-400/15 px-3 py-1 text-xs font-bold text-yellow-200 backdrop-blur">
                                        {selectedEvent.category}
                                    </span>

                                    {selectedEvent.joined && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Joined
                                        </span>
                                    )}

                                    {selectedEvent.pending && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-green-950">
                                            <Clock3 className="h-3 w-3" />
                                            Pending approval
                                        </span>
                                    )}
                                </div>

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

                            <div className="mt-6 space-y-4 rounded-2xl bg-gradient-to-br from-green-50 via-white to-yellow-50 p-5 text-sm">

                                {[
                                    [CalendarDays, 'Date', selectedEvent.displayDate],
                                    [Clock3, 'Time', selectedEvent.time],
                                    [MapPin, 'Location', selectedEvent.location],
                                    [UserRound, 'Organizer', selectedEvent.organizer],
                                ].map(([Icon, label, value]) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <Icon className="h-5 w-5 text-green-700" />

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                                                {label}
                                            </p>

                                            <p className="font-semibold text-gray-800">
                                                {value}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="mt-5">
                                <ParticipantBar event={selectedEvent} />
                            </div>

                            {/* Modal Actions */}
                            <div className="mt-6 space-y-3">

                                <JoinAction
                                    event={selectedEvent}
                                    large
                                    processing={processingId === selectedEvent.id}
                                    onJoin={joinEvent}
                                    onLeave={(e) => setConfirmLeaveId(e.id)}
                                />

                                <div className="grid gap-3 sm:grid-cols-2">

                                    <button
                                        type="button"
                                        onClick={() => addToCalendar(selectedEvent)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                    >
                                        <CalendarPlus className="h-4 w-4" />
                                        Add Calendar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => shareEvent(selectedEvent)}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50"
                                    >
                                        <Share2 className="h-4 w-4" />
                                        Share Event
                                    </button>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedId(null)}
                                    className="w-full rounded-xl bg-gray-100 px-5 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
                                >
                                    Close
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* =========================================================
                LEAVE CONFIRMATION
            ========================================================= */}

            {leaveTarget && (
                <div
                    className="fixed inset-0 z-[55] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setConfirmLeaveId(null)}
                >
                    <div
                        className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                            <AlertCircle className="h-7 w-7 text-red-600" />
                        </div>

                        <h3 className="mt-5 text-xl font-black text-gray-900">
                            {leaveTarget.pending ? 'Cancel your request?' : 'Leave this event?'}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {leaveTarget.pending
                                ? 'Your join request will be withdrawn for'
                                : 'You will give up your spot in'}{' '}
                            <span className="font-bold text-gray-800">
                                {leaveTarget.title}
                            </span>
                            . You can join again later if spots are still
                            available.
                        </p>

                        <div className="mt-6 grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={() => setConfirmLeaveId(null)}
                                className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
                            >
                                Keep it
                            </button>

                            <button
                                type="button"
                                onClick={() => leaveEvent(leaveTarget)}
                                disabled={processingId === leaveTarget.id}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-70"
                            >
                                {processingId === leaveTarget.id && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                {leaveTarget.pending ? 'Yes, cancel' : 'Yes, leave'}
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================
                TOAST
            ========================================================= */}

            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed right-4 top-20 z-[60] flex max-w-sm items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
                        toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'
                    }`}
                >
                    {toast.type === 'success' ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    ) : (
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    )}

                    <p className="leading-5">{toast.message}</p>

                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        className="ml-2 shrink-0 opacity-70 transition hover:opacity-100"
                        aria-label="Dismiss"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
