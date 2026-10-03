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

    return (
        <AuthenticatedLayout>
            <Head title="Announcements" />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-900 to-green-950">

                {/* =====================================================
                    PAGE-WIDE BRAND GLOWS
                ====================================================== */}

                <div className="pointer-events-none absolute left-[-12rem] top-[35rem] h-[36rem] w-[36rem] rounded-full bg-green-400/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[-12rem] top-[85rem] h-[40rem] w-[40rem] rounded-full bg-red-500/10 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-yellow-400/10 blur-3xl" />

                {/* =====================================================
                    LARGE TRANSPARENT LOGO WATERMARK
                ====================================================== */}

                <img
                    src="/images/logo.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[34rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.08] sm:w-[40rem] lg:w-[48rem]"
                />

                {/* =====================================================
                    HERO
                ====================================================== */}

                <section className="relative min-h-[560px] overflow-hidden">

                    {/* Background */}

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

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-950/30" />

                    {/* Bottom Fade */}

                    <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-green-950 to-transparent" />

                    {/* Glow */}

                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-500/15 blur-3xl" />

                    <div className="pointer-events-none absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-yellow-300/10 blur-2xl" />

                    {/* Floating Particles */}

                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-yellow-300/80" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-red-300/70" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

                    {/* Hero Content */}

                    <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 pb-32 pt-20 sm:px-6 lg:grid-cols-[1fr_330px] lg:px-8 lg:pb-36 lg:pt-28">

                        {/* LEFT */}

                        <div className="flex flex-col justify-center">

                            {/* Badge */}

                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md">

                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-300 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-300" />
                                </span>

                                <Megaphone className="h-4 w-4 text-yellow-300" />

                                Youth Ministry Updates
                            </div>

                            {/* Heading */}

                            <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">

                                Stay Informed.

                                <span className="mt-2 block bg-gradient-to-r from-yellow-200 via-white to-green-200 bg-clip-text text-transparent">
                                    Stay Connected.
                                </span>

                            </h1>

                            <p className="mt-7 max-w-xl text-sm leading-7 text-green-100 sm:text-base lg:text-lg">
                                Get the latest announcements, reminders,
                                activities, and important updates from the
                                youth ministry.
                            </p>

                            {/* Button */}

                            <div className="mt-9 flex flex-wrap gap-3">

                                <a
                                    href="#announcements"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-2xl shadow-red-900/30 transition duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-red-500/30"
                                >
                                    View Announcements

                                    <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
                                </a>

                            </div>

                            {/* Values */}

                            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">

                                {[
                                    'Stay Updated',
                                    'Stay Connected',
                                    'Get Involved',
                                ].map((value) => (
                                    <div
                                        key={value}
                                        className="flex items-center gap-2 text-xs font-semibold text-green-100"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-yellow-300" />

                                        {value}
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* RIGHT INFO CARD */}

                        <div className="hidden items-center lg:flex">

                            <div className="relative w-full">

                                <div className="absolute inset-4 rounded-[2rem] bg-yellow-400/20 blur-2xl" />

                                <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-7 text-center shadow-2xl backdrop-blur-xl">

                                    <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-200">

                                        <Bell className="h-4 w-4" />

                                        Announcement Center
                                    </div>

                                    <div className="mx-auto mt-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 shadow-xl">

                                        <Megaphone className="h-10 w-10 text-yellow-300" />

                                    </div>

                                    <p className="mt-6 text-4xl font-black text-white">
                                        {announcements.length}
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-green-100">
                                        Current Announcements
                                    </p>

                                    <div className="my-7 h-px bg-white/10" />

                                    <div className="flex items-center justify-center gap-2 text-xs text-green-100">

                                        <Sparkles className="h-4 w-4 text-yellow-300" />

                                        Keep up with the latest updates

                                    </div>

                                    <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600/80 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">

                                        <Bell className="h-3.5 w-3.5" />

                                        Stay Connected

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}

                <main
                    id="announcements"
                    className="relative z-20 mx-auto -mt-10 max-w-7xl space-y-10 px-4 pb-14 sm:px-6 lg:px-8"
                >

                    {/* =================================================
                        STATS
                    ================================================== */}

                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* TOTAL */}

                        <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl">

                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-100 opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100" />

                            <div className="relative">

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                                        <Megaphone className="h-5 w-5 text-green-700" />

                                    </div>

                                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600" />

                                </div>

                                <p className="mt-5 text-3xl font-black text-slate-900">
                                    {announcements.length}
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                    Total Announcements
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Ministry updates
                                </p>

                            </div>

                        </div>

                        {/* IMPORTANT */}

                        <div className="group relative overflow-hidden rounded-2xl border border-yellow-100 bg-white p-5 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl">

                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-100 opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100" />

                            <div className="relative">

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">

                                        <Star className="h-5 w-5 text-yellow-600" />

                                    </div>

                                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-yellow-600" />

                                </div>

                                <p className="mt-5 text-3xl font-black text-slate-900">
                                    {
                                        announcements.filter(
                                            (item) =>
                                                item.priority === 'Important'
                                        ).length
                                    }
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                    Important Updates
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Priority announcements
                                </p>

                            </div>

                        </div>

                        {/* SAVED */}

                        <div className="group relative overflow-hidden rounded-2xl border border-red-100 bg-white p-5 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:border-red-300 hover:shadow-2xl">

                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-100 opacity-0 transition duration-500 group-hover:scale-150 group-hover:opacity-100" />

                            <div className="relative">

                                <div className="flex items-center justify-between">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

                                        <Bookmark className="h-5 w-5 text-red-600" />

                                    </div>

                                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-red-600" />

                                </div>

                                <p className="mt-5 text-3xl font-black text-slate-900">
                                    {saved.length}
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                    Saved Announcements
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Your saved updates
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        FEATURED ANNOUNCEMENT
                    ================================================== */}

                    {featuredAnnouncement ? (

                        <section className="relative overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/30">

                            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

                                {/* LEFT */}

                                <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-10 text-center text-white">

                                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-300/10 blur-3xl" />

                                    <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />

                                    <div className="relative z-10">

                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 text-6xl shadow-xl backdrop-blur-md">

                                            {featuredAnnouncement.icon}

                                        </div>

                                        <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-yellow-300">

                                            Featured Announcement

                                        </p>

                                        <h2 className="mt-3 text-3xl font-black sm:text-4xl">

                                            {featuredAnnouncement.title}

                                        </h2>

                                        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">

                                            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />

                                            Latest Update

                                        </div>

                                    </div>

                                </div>

                                {/* RIGHT */}

                                <div className="p-8 sm:p-10">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span
                                            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                                                featuredAnnouncement.priority ===
                                                'Important'
                                                    ? 'bg-red-100 text-red-700'
                                                    : featuredAnnouncement.priority ===
                                                        'Reminder'
                                                      ? 'bg-yellow-100 text-yellow-700'
                                                      : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            ● {featuredAnnouncement.priority}
                                        </span>

                                        <span className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-green-700">

                                            {featuredAnnouncement.category}

                                        </span>

                                    </div>

                                    <h2 className="mt-5 text-3xl font-black text-slate-900">

                                        {featuredAnnouncement.title}

                                    </h2>

                                    <p className="mt-4 leading-7 text-slate-500">

                                        {featuredAnnouncement.description}

                                    </p>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                        <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">

                                            <CalendarDays className="h-5 w-5 text-green-700" />

                                            <div>

                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    Date
                                                </p>

                                                <p className="text-sm font-bold text-slate-700">
                                                    {featuredAnnouncement.date}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-3 rounded-xl bg-yellow-50 p-3">

                                            <Clock3 className="h-5 w-5 text-yellow-600" />

                                            <div>

                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    Time
                                                </p>

                                                <p className="text-sm font-bold text-slate-700">
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
                                        className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-900/20 transition duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-xl"
                                    >
                                        Read Full Announcement

                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />

                                    </button>

                                </div>

                            </div>

                        </section>

                    ) : (

                        <section className="rounded-3xl border border-green-100 bg-white p-12 text-center shadow-xl shadow-green-950/30">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100">

                                <Megaphone className="h-10 w-10 text-green-700" />

                            </div>

                            <h2 className="mt-5 text-2xl font-black text-slate-900">
                                No announcements yet
                            </h2>

                            <p className="mt-2 text-slate-500">
                                New ministry announcements will appear here.
                            </p>

                        </section>

                    )}

                    {/* =================================================
                        ANNOUNCEMENT DIRECTORY
                    ================================================== */}

                    <section>

                        <div className="mb-6">

                            <div className="flex items-center gap-2">

                                <Sparkles className="h-4 w-4 text-yellow-300" />

                                <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                    Announcement Center
                                </p>

                            </div>

                            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                Latest Updates
                            </h2>

                            <p className="mt-2 text-sm text-green-100/80">
                                Find important information and youth ministry
                                updates.
                            </p>

                        </div>

                        {/* SEARCH */}

                        <div className="relative">

                            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search announcements..."
                                className="w-full rounded-2xl border border-green-100 bg-white px-5 py-4 pl-12 text-sm text-slate-700 shadow-xl shadow-green-950/30 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                            />

                        </div>

                        {/* FILTERS */}

                        <div className="mt-5 flex flex-wrap gap-2">

                            {categories.map((item) => (

                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setCategory(item)}
                                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition duration-300 ${
                                        category === item
                                            ? 'bg-red-600 text-white shadow-lg shadow-red-900/20 hover:bg-red-500'
                                            : 'border border-white/10 bg-white/10 text-green-100 backdrop-blur-md hover:bg-white/20 hover:text-white'
                                    }`}
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                        {/* CARDS */}

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                            {filteredAnnouncements.map(
                                (announcement) => (

                                    <article
                                        key={announcement.id}
                                        className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl"
                                    >

                                        {/* CARD TOP */}

                                        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 p-6">

                                            {announcement.id ===
                                                featuredAnnouncement?.id && (

                                                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">

                                                    <Sparkles className="h-3 w-3" />

                                                    NEW

                                                </span>

                                            )}

                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-md transition duration-300 group-hover:scale-110 group-hover:rotate-2">

                                                {announcement.icon}

                                            </div>

                                            <span className="mt-5 inline-block rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold text-green-700">

                                                {announcement.category}

                                            </span>

                                            <h3 className="mt-3 text-xl font-black text-slate-900">

                                                {announcement.title}

                                            </h3>

                                        </div>

                                        {/* CARD BODY */}

                                        <div className="p-6">

                                            <p className="line-clamp-3 text-sm leading-6 text-slate-500">

                                                {announcement.description}

                                            </p>

                                            <div className="mt-5 space-y-3">

                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                                                    <CalendarDays className="h-4 w-4 text-green-600" />

                                                    {announcement.date}

                                                </div>

                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

                                                    <Clock3 className="h-4 w-4 text-yellow-600" />

                                                    {announcement.time}

                                                </div>

                                            </div>

                                            <div className="mt-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                                                        announcement.priority ===
                                                        'Important'
                                                            ? 'bg-red-100 text-red-700'
                                                            : announcement.priority ===
                                                                'Reminder'
                                                              ? 'bg-yellow-100 text-yellow-700'
                                                              : 'bg-green-100 text-green-700'
                                                    }`}
                                                >
                                                    {announcement.priority}
                                                </span>

                                            </div>

                                            {/* ACTIONS */}

                                            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleSaved(
                                                            announcement.id
                                                        )
                                                    }
                                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                                                        saved.includes(
                                                            announcement.id
                                                        )
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-slate-100 text-slate-500 hover:bg-green-50 hover:text-green-700'
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
                                                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-yellow-50 hover:text-yellow-700"
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
                                                        className="group/button inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-lg"
                                                    >

                                                        Read More

                                                        <ArrowRight className="h-3.5 w-3.5 transition group-hover/button:translate-x-1" />

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                        {/* NO RESULTS */}

                        {filteredAnnouncements.length === 0 && (

                            <div className="mt-8 rounded-3xl border border-green-100 bg-white p-12 text-center shadow-xl shadow-green-950/30">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100">

                                    <Search className="h-9 w-9 text-green-700" />

                                </div>

                                <h3 className="mt-5 text-xl font-bold text-slate-900">
                                    No announcements found
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    Try another keyword or select a different
                                    category.
                                </p>

                            </div>

                        )}

                    </section>

                    {/* =================================================
                        INFORMATION SECTION
                    ================================================== */}

                    <section>

                        <div className="mb-6">

                            <div className="flex items-center gap-2">

                                <Info className="h-4 w-4 text-yellow-300" />

                                <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                                    Stay Connected
                                </p>

                            </div>

                            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                                Keep Growing Together
                            </h2>

                        </div>

                        <div className="grid gap-6 md:grid-cols-3">

                            {/* CARD 1 */}

                            <div className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-7 text-center shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition group-hover:scale-110">

                                    <Bell className="h-6 w-6 text-green-700" />

                                </div>

                                <h3 className="mt-5 font-black text-slate-900">
                                    Stay Updated
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Keep track of important activities,
                                    schedules, and ministry updates.
                                </p>

                                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-green-50 transition group-hover:scale-150" />

                            </div>

                            {/* CARD 2 */}

                            <div className="group relative overflow-hidden rounded-3xl border border-yellow-100 bg-white p-7 text-center shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 transition group-hover:scale-110">

                                    <Users className="h-6 w-6 text-yellow-700" />

                                </div>

                                <h3 className="mt-5 font-black text-slate-900">
                                    Stay Connected
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Stay connected with the youth community
                                    and participate in upcoming activities.
                                </p>

                                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-yellow-50 transition group-hover:scale-150" />

                            </div>

                            {/* CARD 3 */}

                            <div className="group relative overflow-hidden rounded-3xl border border-red-100 bg-white p-7 text-center shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 transition group-hover:scale-110">

                                    <Rocket className="h-6 w-6 text-red-600" />

                                </div>

                                <h3 className="mt-5 font-black text-slate-900">
                                    Get Involved
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Discover opportunities to serve, learn,
                                    participate, and grow.
                                </p>

                                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-red-50 transition group-hover:scale-150" />

                            </div>

                        </div>

                    </section>

                    {/* =================================================
                        FINAL CTA
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-green-950 via-green-900 to-red-950 px-7 py-14 text-center text-white shadow-2xl sm:px-10">

                        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />

                        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

                        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300/10 blur-3xl" />

                        <div className="relative">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 shadow-xl">

                                <Megaphone className="h-8 w-8 text-yellow-300" />

                            </div>

                            <h2 className="mt-6 text-2xl font-black sm:text-3xl">
                                Never Miss an Update
                            </h2>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-green-100">
                                Stay informed, stay connected, and be part of
                                everything happening in the SoulSync youth
                                ministry.
                            </p>

                            <div className="mt-7 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300">

                                <Star className="h-4 w-4" />

                                SoulSync Youth Ministry

                                <Star className="h-4 w-4" />

                            </div>

                        </div>

                    </section>

                </main>

            </div>

            {/* =========================================================
                MODAL
            ========================================================== */}

            {selectedAnnouncement && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-green-950/80 p-4 backdrop-blur-md"
                    onClick={() =>
                        setSelectedAnnouncement(null)
                    }
                >

                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-green-100 bg-white shadow-2xl"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-950 p-8 text-center text-white">

                            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-300/10 blur-3xl" />

                            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-red-500/10 blur-3xl" />

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedAnnouncement(null)
                                }
                                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-red-600"
                            >

                                <X className="h-4 w-4" />

                            </button>

                            <div className="relative">

                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-5xl shadow-xl">

                                    {selectedAnnouncement.icon}

                                </div>

                                <h2 className="mt-5 text-3xl font-black">
                                    {selectedAnnouncement.title}
                                </h2>

                                <p className="mt-2 text-sm text-green-100">
                                    {selectedAnnouncement.category}
                                </p>

                            </div>

                        </div>

                        {/* MODAL BODY */}

                        <div className="p-8">

                            <p className="leading-7 text-slate-600">
                                {selectedAnnouncement.description}
                            </p>

                            <div className="mt-6 space-y-3 rounded-2xl bg-green-50 p-5 text-sm text-slate-700">

                                <div className="flex items-center gap-3">

                                    <CalendarDays className="h-5 w-5 text-green-700" />

                                    <span>
                                        <strong>Date:</strong>{' '}
                                        {selectedAnnouncement.date}
                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Clock3 className="h-5 w-5 text-yellow-600" />

                                    <span>
                                        <strong>Time:</strong>{' '}
                                        {selectedAnnouncement.time}
                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Megaphone className="h-5 w-5 text-green-700" />

                                    <span>
                                        <strong>Category:</strong>{' '}
                                        {selectedAnnouncement.category}
                                    </span>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Star className="h-5 w-5 text-yellow-500" />

                                    <span>
                                        <strong>Priority:</strong>{' '}
                                        {selectedAnnouncement.priority}
                                    </span>

                                </div>

                            </div>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleSaved(
                                            selectedAnnouncement.id
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-xl"
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

                                    {saved.includes(
                                        selectedAnnouncement.id
                                    )
                                        ? 'Saved'
                                        : 'Save'}

                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        shareAnnouncement(
                                            selectedAnnouncement
                                        )
                                    }
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-yellow-50 hover:text-green-700"
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
                                className="mt-3 w-full rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
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