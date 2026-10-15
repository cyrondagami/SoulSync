import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import {
    Megaphone,
    Search,
    Bookmark,
    Share2,
    ArrowRight,
    CalendarDays,
    Clock3,
    Sparkles,
    Star,
    X,
    Bell,
    CheckCircle2,
    Info,
    Users,
    Rocket,
} from 'lucide-react';

/* Priority badge — red only for "Important" (it has meaning) */
const priorityClass = (priority) =>
    priority === 'Important'
        ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200'
        : priority === 'Reminder'
          ? 'border border-dashed border-green-500 bg-white text-green-800 dark:bg-green-950 dark:text-green-100'
          : 'bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-100';

export default function Announcements({
    announcements: databaseAnnouncements = [],
}) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [saved, setSaved] = useState([]);

    // =========================================================
    // DATABASE ANNOUNCEMENTS
    // =========================================================

    const announcements = databaseAnnouncements.map((announcement) => ({
        id: announcement.id,
        title: announcement.title,
        category: announcement.category,

        date: announcement.date
            ? new Date(`${announcement.date}T00:00:00`).toLocaleDateString(
                  'en-US',
                  {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                  }
              )
            : 'No date',

        time: announcement.time || 'No time',
        priority: announcement.priority || 'Normal',
        icon: announcement.icon || '📢',
        description: announcement.description || '',
    }));

    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = [
        'All',
        ...Array.from(
            new Set(
                announcements
                    .map((announcement) => announcement.category)
                    .filter(Boolean)
            )
        ),
    ];

    // =========================================================
    // SEARCH + FILTER
    // =========================================================

    const filteredAnnouncements = announcements.filter((announcement) => {
        const matchesCategory =
            category === 'All' || announcement.category === category;

        const text = `
            ${announcement.title}
            ${announcement.description}
            ${announcement.category}
        `.toLowerCase();

        const matchesSearch = text.includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // =========================================================
    // SAVE ANNOUNCEMENT
    // =========================================================

    const toggleSaved = (id) => {
        setSaved((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    };

    // =========================================================
    // SHARE ANNOUNCEMENT
    // =========================================================

    const shareAnnouncement = async (announcement) => {
        const text = `${announcement.title}
${announcement.date}
${announcement.description}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: announcement.title,
                    text: text,
                });
            } catch {
                // Sharing cancelled
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            alert('Announcement copied to clipboard!');
        } else {
            alert(text);
        }
    };

    // =========================================================
    // FEATURED ANNOUNCEMENT
    // =========================================================

    const featuredAnnouncement = announcements[0] || null;

    // =========================================================
    // STATISTICS
    // =========================================================

    const importantCount = announcements.filter(
        (item) => item.priority === 'Important'
    ).length;

    const stats = [
        {
            label: 'Total Announcements',
            value: announcements.length,
            icon: Megaphone,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Important Updates',
            value: importantCount,
            icon: Star,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Saved Announcements',
            value: saved.length,
            icon: Bookmark,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
    ];

    /* "Keep Growing Together" cards — same shade pattern as About values */
    const perks = [
        {
            icon: Bell,
            title: 'Stay Updated',
            description:
                'Keep track of important activities, schedules, and ministry updates.',
            gradient: 'from-green-600 to-green-800',
            text: 'text-white',
            desc: 'text-green-50/90',
            chip: 'bg-white/20 text-white',
            mark: 'text-white/10',
        },
        {
            icon: Users,
            title: 'Stay Connected',
            description:
                'Stay connected with the youth community and participate in upcoming activities.',
            gradient:
                'from-green-100 to-green-200 dark:from-green-800 dark:to-green-900',
            text: 'text-green-950 dark:text-white',
            desc: 'text-green-900/80 dark:text-green-100/80',
            chip: 'bg-green-700 text-white dark:bg-green-600',
            mark: 'text-green-700/10 dark:text-white/10',
        },
        {
            icon: Rocket,
            title: 'Get Involved',
            description:
                'Discover opportunities to serve, learn, participate, and grow.',
            gradient: 'from-green-800 to-green-950',
            text: 'text-white',
            desc: 'text-green-50/90',
            chip: 'bg-white/20 text-white',
            mark: 'text-white/10',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Announcements" />

            <div className="relative min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-green-950">

                {/* ==================================================
                    PAGE BACKGROUND DECORATIONS
                ================================================== */}

                <div className="pointer-events-none absolute left-[-10rem] top-[45rem] h-[36rem] w-[36rem] rounded-full bg-green-400/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[-12rem] top-[90rem] h-[40rem] w-[40rem] rounded-full bg-green-500/10 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-green-300/10 blur-3xl" />

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
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-green-700/85 dark:from-green-950/95 dark:via-green-900/90 dark:to-green-800/85" />

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent dark:from-green-950" />

                    {/* Glows */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-300/25 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    <div className="pointer-events-none absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    {/* LOGO WATERMARK */}
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.12] sm:w-[40rem] lg:w-[46rem]"
                    />

                    {/* Floating Particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-white/80" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-200" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-green-100" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    {/* HERO CONTENT */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-36 pt-20 text-white sm:px-6 lg:px-8 lg:pb-40 lg:pt-24">

                        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">

                            <div className="max-w-3xl">

                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">

                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />

                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
                                    </span>

                                    <Megaphone className="h-4 w-4 text-green-200" />

                                    Youth Ministry Updates
                                </div>

                                {/* Heading */}
                                <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                    Stay Informed.

                                    <br />

                                    <span className="bg-gradient-to-r from-green-200 via-white to-green-100 bg-clip-text text-transparent">
                                        Stay Connected.
                                    </span>

                                </h1>

                                {/* Description */}
                                <p className="mt-6 max-w-2xl text-lg leading-8 text-green-50">
                                    Get the latest announcements, reminders,
                                    activities, and important updates from the
                                    youth ministry.
                                </p>

                                {/* Buttons */}
                                <div className="mt-8 flex flex-wrap gap-3">

                                    <a
                                        href="#announcements"
                                        className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl"
                                    >
                                        View Announcements

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </a>

                                </div>

                                {/* Hero Values */}
                                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                                    {[
                                        'Stay Updated',
                                        'Stay Connected',
                                        'Get Involved',
                                    ].map((value) => (
                                        <div
                                            key={value}
                                            className="flex items-center gap-2 text-xs font-bold text-green-50"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-green-300" />

                                            {value}
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* ANNOUNCEMENT CENTER CARD */}
                            <div className="hidden lg:block">

                                <div className="rounded-3xl border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">

                                    <div className="flex items-center justify-between">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                                            <Megaphone className="h-6 w-6 text-green-800" />
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                                            <Bell className="h-3.5 w-3.5" />
                                            Announcement Center
                                        </span>

                                    </div>

                                    <p className="mt-8 text-sm text-green-100">
                                        Current Announcements
                                    </p>

                                    <p className="mt-1 text-5xl font-black">
                                        {announcements.length}
                                    </p>

                                    <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                                            <Sparkles className="h-5 w-5 text-green-100" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold">
                                                Keep up with the latest updates
                                            </p>

                                            <p className="text-xs text-green-200">
                                                {importantCount > 0
                                                    ? `${importantCount} important update${importantCount === 1 ? '' : 's'} waiting.`
                                                    : 'You are all caught up.'}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>

                {/* ==================================================
                    MAIN CONTENT
                ================================================== */}

                <main
                    id="announcements"
                    className="relative z-20 mx-auto max-w-7xl space-y-16 px-4 pb-14 pt-10 sm:px-6 lg:px-8"
                >

                    {/* ==================================================
                        STATS
                    ================================================== */}

                    <section className="relative z-20 -mt-24 grid overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl shadow-green-900/15 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30 sm:grid-cols-3 sm:divide-x sm:divide-green-100 dark:sm:divide-green-800/50">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-4 border-b border-green-100 p-6 last:border-b-0 dark:border-green-800/50 sm:border-b-0 sm:p-7"
                                >
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${stat.color}`}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-3xl font-black leading-none text-green-950 dark:text-white">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1.5 text-sm font-semibold text-gray-600 dark:text-green-100/70">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                    </section>

                    {/* ==================================================
                        FEATURED ANNOUNCEMENT
                    ================================================== */}

                    {featuredAnnouncement ? (

                        <section className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/15 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30">

                            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                                {/* Visual */}
                                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-10 text-center text-white">

                                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-300/20 blur-3xl" />

                                    <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                                    <div className="relative z-10">

                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/15 text-6xl shadow-xl backdrop-blur-md">

                                            {featuredAnnouncement.icon}

                                        </div>

                                        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">

                                            <Star className="h-4 w-4 text-green-200" />

                                            Featured Announcement

                                        </div>

                                        <h2 className="mt-4 text-3xl font-black sm:text-4xl">

                                            {featuredAnnouncement.title}

                                        </h2>

                                    </div>

                                </div>

                                {/* Details */}
                                <div className="p-8 sm:p-10">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClass(featuredAnnouncement.priority)}`}
                                        >
                                            {featuredAnnouncement.priority}
                                        </span>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800 dark:bg-green-800/60 dark:text-green-100">

                                            {featuredAnnouncement.category}

                                        </span>

                                    </div>

                                    <h2 className="mt-5 text-3xl font-black text-green-950 dark:text-white">

                                        {featuredAnnouncement.title}

                                    </h2>

                                    <p className="mt-4 leading-7 text-gray-700 dark:text-green-50/85">

                                        {featuredAnnouncement.description}

                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-3 dark:border-green-800/50 dark:bg-green-900/50">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 dark:bg-green-600">
                                                <CalendarDays className="h-5 w-5 text-white" />
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300">
                                                    Date
                                                </p>

                                                <p className="text-sm font-bold text-green-950 dark:text-white">
                                                    {featuredAnnouncement.date}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-3 dark:border-green-800/50 dark:bg-green-900/50">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 dark:bg-green-600">
                                                <Clock3 className="h-5 w-5 text-white" />
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300">
                                                    Time
                                                </p>

                                                <p className="text-sm font-bold text-green-950 dark:text-white">
                                                    {featuredAnnouncement.time}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedAnnouncement(
                                                featuredAnnouncement
                                            )
                                        }
                                        className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white shadow-lg shadow-green-900/20 transition duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl dark:bg-green-600 dark:hover:bg-green-500"
                                    >
                                        Read Full Announcement

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

                                    </button>

                                </div>

                            </div>

                        </section>

                    ) : (

                        <section className="rounded-3xl border-2 border-dashed border-green-300 bg-green-50 p-12 text-center dark:border-green-600/50 dark:bg-green-900/30">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">

                                <Megaphone className="h-8 w-8 text-green-700 dark:text-green-300" />

                            </div>

                            <h2 className="mt-5 text-2xl font-black text-green-950 dark:text-white">
                                No announcements yet
                            </h2>

                            <p className="mt-2 text-gray-600 dark:text-green-100/70">
                                New ministry announcements will appear here.
                            </p>

                        </section>

                    )}

                    {/* ==================================================
                        ANNOUNCEMENT DIRECTORY
                    ================================================== */}

                    <section>

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                            <div className="border-l-4 border-green-600 pl-6 dark:border-green-400">

                                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                                    <Sparkles className="h-4 w-4" />
                                    Announcement Center
                                </span>

                                <h2 className="mt-2 text-3xl font-black text-green-950 dark:text-white sm:text-4xl">
                                    Latest Updates
                                </h2>

                                <p className="mt-2 text-gray-600 dark:text-green-100/70">
                                    Find important information and youth
                                    ministry updates.
                                </p>

                            </div>

                            {/* Search */}
                            <div className="relative w-full lg:w-96">

                                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700/60 dark:text-green-300/60" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search announcements..."
                                    className="w-full rounded-2xl border border-green-200 bg-white py-3.5 pl-12 pr-5 text-sm text-green-950 shadow-lg shadow-green-900/10 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/40 dark:border-green-800/50 dark:bg-green-900/40 dark:text-white dark:placeholder:text-green-100/50"
                                />

                            </div>

                        </div>

                        {/* Filters */}
                        <div className="mt-6 flex flex-wrap gap-2">

                            {categories.map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
                                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                                        category === item
                                            ? 'bg-green-700 text-white shadow-lg shadow-green-900/20'
                                            : 'border border-green-200 bg-white text-green-800 hover:bg-green-50 dark:border-green-800/50 dark:bg-green-900/40 dark:text-green-100 dark:hover:bg-green-900/70'
                                    }`}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                        {/* Cards */}
                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {filteredAnnouncements.map((announcement) => (

                                <article
                                    key={announcement.id}
                                    className="group flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30"
                                >

                                    {/* Card Top */}
                                    <div className="relative overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-white p-6 dark:from-green-800/70 dark:via-green-900/60 dark:to-green-950/60">

                                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-400/20 blur-2xl" />

                                        {announcement.id ===
                                            featuredAnnouncement?.id && (

                                            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-green-700 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg dark:bg-green-600">

                                                <Sparkles className="h-3 w-3" />

                                                NEW

                                            </span>

                                        )}

                                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md transition duration-300 group-hover:rotate-2 group-hover:scale-110 dark:bg-green-950">

                                            {announcement.icon}

                                        </div>

                                        <span className="relative mt-5 inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold text-green-800 dark:bg-green-950 dark:text-green-100">

                                            {announcement.category}

                                        </span>

                                        <h3 className="relative mt-3 text-xl font-black text-green-950 dark:text-white">

                                            {announcement.title}

                                        </h3>

                                    </div>

                                    {/* Card Body */}
                                    <div className="flex flex-1 flex-col p-6">

                                        <p className="line-clamp-3 text-sm leading-6 text-gray-700 dark:text-green-50/85">

                                            {announcement.description}

                                        </p>

                                        <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-green-100/70">

                                            <div className="flex items-center gap-2">

                                                <CalendarDays className="h-4 w-4 text-green-700 dark:text-green-300" />

                                                {announcement.date}

                                            </div>

                                            <div className="flex items-center gap-2">

                                                <Clock3 className="h-4 w-4 text-green-700 dark:text-green-300" />

                                                {announcement.time}

                                            </div>

                                        </div>

                                        <div className="mt-5">

                                            <span
                                                className={`rounded-full px-3 py-1 text-[11px] font-bold ${priorityClass(announcement.priority)}`}
                                            >
                                                {announcement.priority}
                                            </span>

                                        </div>

                                        {/* Actions */}
                                        <div className="mt-auto flex items-center justify-between border-t border-green-100 pt-5 dark:border-green-800/50">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleSaved(announcement.id)
                                                }
                                                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                                                    saved.includes(
                                                        announcement.id
                                                    )
                                                        ? 'bg-green-700 text-white dark:bg-green-600'
                                                        : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-800/60 dark:text-green-200 dark:hover:bg-green-800'
                                                }`}
                                                title="Save announcement"
                                            >

                                                <Bookmark
                                                    className={`h-4 w-4 ${
                                                        saved.includes(
                                                            announcement.id
                                                        )
                                                            ? 'fill-current'
                                                            : ''
                                                    }`}
                                                />

                                            </button>

                                            <div className="flex gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        shareAnnouncement(
                                                            announcement
                                                        )
                                                    }
                                                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 transition hover:bg-green-100 dark:bg-green-800/60 dark:text-green-200 dark:hover:bg-green-800"
                                                    title="Share announcement"
                                                >

                                                    <Share2 className="h-4 w-4" />

                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedAnnouncement(
                                                            announcement
                                                        )
                                                    }
                                                    className="group/button inline-flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg dark:bg-green-600 dark:hover:bg-green-500"
                                                >

                                                    Read More

                                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-1" />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                        {/* No Results */}
                        {filteredAnnouncements.length === 0 && (

                            <div className="mt-8 rounded-3xl border-2 border-dashed border-green-300 bg-green-50 p-12 text-center dark:border-green-600/50 dark:bg-green-900/30">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">

                                    <Search className="h-8 w-8 text-green-700 dark:text-green-300" />

                                </div>

                                <h3 className="mt-5 text-xl font-black text-green-950 dark:text-white">
                                    No announcements found
                                </h3>

                                <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                    Try another keyword or select a different
                                    category.
                                </p>

                            </div>

                        )}

                    </section>

                    {/* ==================================================
                        KEEP GROWING TOGETHER
                    ================================================== */}

                    <section>

                        <div className="text-center">

                            <span className="text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                                Stay Connected
                            </span>

                            <h2 className="mt-2 text-3xl font-black text-green-950 dark:text-white sm:text-4xl">
                                Keep Growing Together
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-gray-600 dark:text-green-100/70">
                                Every update helps you stay close to what God
                                is doing in the youth community.
                            </p>

                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">

                            {perks.map((perk) => {
                                const Icon = perk.icon;

                                return (
                                    <div
                                        key={perk.title}
                                        className={`group relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br dark:border-green-800/50 ${perk.gradient} p-6 shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:shadow-black/30`}
                                    >

                                        <Icon
                                            className={`pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 transition duration-500 group-hover:-rotate-6 group-hover:scale-110 ${perk.mark}`}
                                        />

                                        <div className="relative">

                                            <div
                                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${perk.chip}`}
                                            >
                                                <Icon className="h-6 w-6" />
                                            </div>

                                            <h3
                                                className={`mt-5 text-xl font-black ${perk.text}`}
                                            >
                                                {perk.title}
                                            </h3>

                                            <p
                                                className={`mt-3 text-sm leading-6 ${perk.desc}`}
                                            >
                                                {perk.description}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </section>

                    {/* ==================================================
                        FINAL CTA
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-800 to-green-900 px-8 py-14 text-center text-white shadow-xl shadow-green-900/30">

                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-green-300/20 blur-xl" />

                        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

                        <img
                            src="/images/logo.png"
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
                        />

                        <div className="relative">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">

                                <Megaphone className="h-7 w-7 text-green-800" />

                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                Never Miss an Update
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">
                                Stay informed, stay connected, and be part of
                                everything happening in the SoulSync youth
                                ministry.
                            </p>

                            <a
                                href="#announcements"
                                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                View Announcements

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>

                        </div>

                    </section>

                </main>
            </div>

            {/* =========================================================
                MODAL
            ========================================================= */}

            {selectedAnnouncement && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedAnnouncement(null)}
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-green-100 bg-white shadow-2xl dark:border-green-800/50 dark:bg-green-950"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Modal Header */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-8 text-center text-white">

                            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedAnnouncement(null)
                                }
                                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur transition hover:bg-white/20"
                                aria-label="Close"
                            >

                                <X className="h-5 w-5" />

                            </button>

                            <div className="relative">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-5xl shadow-xl">

                                    {selectedAnnouncement.icon}

                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                                        {selectedAnnouncement.category}
                                    </span>

                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-green-800">
                                        {selectedAnnouncement.priority}
                                    </span>

                                </div>

                                <h2 className="mt-4 text-3xl font-black">
                                    {selectedAnnouncement.title}
                                </h2>

                            </div>

                        </div>

                        {/* Modal Body */}
                        <div className="p-8">

                            <div className="flex items-start gap-3">

                                <Info className="mt-1 h-5 w-5 shrink-0 text-green-700 dark:text-green-300" />

                                <p className="leading-7 text-gray-700 dark:text-green-50/85">
                                    {selectedAnnouncement.description}
                                </p>

                            </div>

                            <div className="mt-6 space-y-4 rounded-2xl border border-green-100 bg-green-50 p-5 text-sm dark:border-green-800/50 dark:bg-green-900/40">

                                {[
                                    [CalendarDays, 'Date', selectedAnnouncement.date],
                                    [Clock3, 'Time', selectedAnnouncement.time],
                                    [Megaphone, 'Category', selectedAnnouncement.category],
                                    [Star, 'Priority', selectedAnnouncement.priority],
                                ].map(([Icon, label, value]) => (

                                    <div key={label} className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-700 dark:bg-green-600">
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-green-700 dark:text-green-300">
                                                {label}
                                            </p>

                                            <p className="font-semibold text-green-950 dark:text-white">
                                                {value}
                                            </p>
                                        </div>

                                    </div>

                                ))}

                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleSaved(selectedAnnouncement.id)
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
                                >

                                    <Bookmark
                                        className={`h-4 w-4 ${
                                            saved.includes(
                                                selectedAnnouncement.id
                                            )
                                                ? 'fill-current'
                                                : ''
                                        }`}
                                    />

                                    {saved.includes(selectedAnnouncement.id)
                                        ? 'Saved'
                                        : 'Save'}

                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        shareAnnouncement(selectedAnnouncement)
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 px-5 py-3 font-bold text-green-800 transition hover:bg-green-50 dark:border-green-700 dark:text-green-100 dark:hover:bg-green-900/60"
                                >

                                    <Share2 className="h-4 w-4" />

                                    Share

                                </button>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedAnnouncement(null)
                                }
                                className="mt-3 w-full rounded-xl bg-green-50 px-5 py-3 font-bold text-green-900 transition hover:bg-green-100 dark:bg-green-900/50 dark:text-green-100 dark:hover:bg-green-900/80"
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