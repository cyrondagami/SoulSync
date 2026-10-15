import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    CalendarDays,
    Music,
    Clock,
    MapPin,
    UserRound,
    Users,
    Guitar,
    Mic2,
    Piano,
    Drum,
    Sparkles,
    CheckCircle2,
    Clock3,
    ArrowRight,
    AlertCircle,
    Star,
} from 'lucide-react';

const getIcon = (type = '') => {
    const t = type.toLowerCase();

    if (['vocal', 'voice', 'sing', 'choir'].some((k) => t.includes(k))) return Mic2;
    if (['guitar', 'bass', 'ukulele'].some((k) => t.includes(k))) return Guitar;
    if (['keyboard', 'piano', 'organ'].some((k) => t.includes(k))) return Piano;
    if (['drum', 'percussion', 'cajon'].some((k) => t.includes(k))) return Drum;

    return Music;
};

export default function MusicClasses({ classes: rawClasses }) {
    const { flash } = usePage().props;
    const classes = Array.isArray(rawClasses) ? rawClasses : [];

    const join = (id) =>
        router.post(`/music-classes/${id}/join`, {}, { preserveScroll: true });

    const cancel = (id) => {
        if (!window.confirm('Cancel your request for this class?')) return;
        router.delete(`/music-classes/${id}/cancel`, { preserveScroll: true });
    };

    // =========================================================
    // STATISTICS
    // =========================================================

    const enrolledCount = classes.filter(
        (item) => item.my_status === 'approved' && !item.my_completed,
    ).length;

    const pendingCount = classes.filter(
        (item) => item.my_status === 'pending',
    ).length;

    const completedCount = classes.filter((item) => item.my_completed).length;

    const stats = [
        {
            label: 'Available Classes',
            value: classes.length,
            icon: Music,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Enrolled',
            value: enrolledCount,
            icon: CheckCircle2,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Pending Approval',
            value: pendingCount,
            icon: Clock3,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Points Earned',
            value: completedCount * 10,
            icon: Star,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
    ];

    // =========================================================
    // CLASS ACTION (Join / Pending / Enrolled / Completed / Full)
    // =========================================================

    const renderAction = (item) => {
        if (item.my_completed) {
            return (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-green-700 py-3 text-sm font-black text-white dark:bg-green-600">
                    <Sparkles className="h-4 w-4" />
                    +10 Points Earned
                </div>
            );
        }

        if (item.my_status === 'approved') {
            return (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3 text-sm font-black text-green-800 dark:bg-green-800/60 dark:text-green-100">
                    <CheckCircle2 className="h-4 w-4" />
                    Enrolled
                </div>
            );
        }

        if (item.my_status === 'pending') {
            return (
                <div className="flex gap-2">
                    <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-green-300 bg-green-50 py-3 text-sm font-black text-green-800 dark:border-green-600/50 dark:bg-green-900/30 dark:text-green-100">
                        <Clock3 className="h-4 w-4" />
                        Pending approval
                    </div>

                    <button
                        onClick={() => cancel(item.id)}
                        className="rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-900/30"
                    >
                        Cancel
                    </button>
                </div>
            );
        }

        if (item.is_full) {
            return (
                <div className="flex items-center justify-center rounded-xl bg-gray-100 py-3 text-sm font-black text-gray-400 dark:bg-green-900/40 dark:text-green-100/40">
                    Class Full
                </div>
            );
        }

        return (
            <button
                onClick={() => join(item.id)}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 text-sm font-black text-white shadow-lg shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
            >
                {item.my_status === 'rejected' ? 'Request Again' : 'Join Class'}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Music Classes" />

            {/* =========================================================
                FLASH MESSAGE
            ========================================================= */}

            {(flash?.success || flash?.error) && (
                <div className="fixed right-4 top-20 z-[60] max-w-sm">
                    <div
                        className={`flex items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
                            flash.success ? 'bg-green-700' : 'bg-red-700'
                        }`}
                    >
                        {flash.success ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                        ) : (
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        )}

                        <p className="leading-5">{flash.success || flash.error}</p>
                    </div>
                </div>
            )}

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

                        <div className="max-w-4xl">

                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">

                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />

                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300" />
                                </span>

                                <Music className="h-4 w-4 text-green-200" />

                                Music Ministry
                            </div>

                            {/* Heading */}
                            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                Learn. Play.

                                <br />

                                <span className="bg-gradient-to-r from-green-200 via-white to-green-100 bg-clip-text text-transparent">
                                    Worship Together.
                                </span>

                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-green-50">
                                Join a class, wait for approval, and earn 10
                                points when your instructor marks it
                                completed.
                            </p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <a
                                    href="#classes"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl"
                                >
                                    Browse Classes

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>

                            </div>

                            {/* Hero Values */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                                {['Learn', 'Practice', 'Serve'].map((value) => (
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

                    </div>
                </section>

                {/* ==================================================
                    MAIN CONTENT
                ================================================== */}

                <main
                    id="classes"
                    className="relative z-20 mx-auto max-w-7xl space-y-16 px-4 pb-14 pt-10 sm:px-6 lg:px-8"
                >

                    {/* ==================================================
                        STATS
                    ================================================== */}

                    <section className="relative z-20 -mt-24 grid overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl shadow-green-900/15 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-green-100 dark:lg:divide-green-800/50">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="flex items-center gap-4 border-b border-green-100 p-6 dark:border-green-800/50 lg:border-b-0"
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
                        CLASS DIRECTORY
                    ================================================== */}

                    <section>

                        <div className="border-l-4 border-green-600 pl-6 dark:border-green-400">

                            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                                <Music className="h-4 w-4" />
                                Music Classes
                            </span>

                            <h2 className="mt-2 text-3xl font-black text-green-950 dark:text-white sm:text-4xl">
                                Choose Your Class
                            </h2>

                            <p className="mt-2 text-gray-600 dark:text-green-100/70">
                                Pick an instrument or vocal class and send
                                your request to join.
                            </p>

                        </div>

                        {classes.length === 0 ? (

                            <div className="mt-8 rounded-3xl border-2 border-dashed border-green-300 bg-green-50 p-12 text-center dark:border-green-600/50 dark:bg-green-900/30">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">
                                    <Music className="h-8 w-8 text-green-700 dark:text-green-300" />
                                </div>

                                <h3 className="mt-5 text-xl font-black text-green-950 dark:text-white">
                                    No music classes yet
                                </h3>

                                <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                    Please check back soon.
                                </p>

                            </div>

                        ) : (

                            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                                {classes.map((item) => {
                                    const Icon = getIcon(item.type);

                                    return (
                                        <article
                                            key={item.id}
                                            className={`group flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30 ${
                                                item.my_completed ||
                                                item.my_status === 'approved'
                                                    ? 'ring-2 ring-green-500 dark:ring-green-400'
                                                    : item.my_status === 'pending'
                                                      ? 'ring-2 ring-green-300 dark:ring-green-600/60'
                                                      : ''
                                            }`}
                                        >

                                            {/* Card Header */}
                                            <div className="relative overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-white p-6 dark:from-green-800/70 dark:via-green-900/60 dark:to-green-950/60">

                                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-400/20 blur-2xl" />

                                                <Icon className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 text-green-700/10 transition duration-500 group-hover:-rotate-6 group-hover:scale-110 dark:text-white/10" />

                                                <div className="relative flex items-start justify-between gap-3">

                                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 shadow-md transition duration-300 group-hover:rotate-2 group-hover:scale-110 dark:bg-green-600">
                                                        <Icon className="h-7 w-7 text-white" />
                                                    </div>

                                                    <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-black text-green-800 dark:bg-green-950 dark:text-green-100">
                                                        <Users className="h-3 w-3" />
                                                        {item.approved_count ?? 0}/{item.capacity}
                                                    </span>

                                                </div>

                                                <div className="relative mt-4">

                                                    <span className="inline-block rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-green-800 dark:bg-green-950 dark:text-green-100">
                                                        {item.type}
                                                    </span>

                                                    <h3 className="mt-2 text-xl font-black text-green-950 dark:text-white">
                                                        {item.name}
                                                    </h3>

                                                </div>

                                            </div>

                                            {/* Card Body */}
                                            <div className="flex flex-1 flex-col p-6">

                                                <div className="space-y-3 text-sm text-gray-700 dark:text-green-50/85">

                                                    <div className="flex items-center gap-2">
                                                        <UserRound className="h-4 w-4 text-green-700 dark:text-green-300" />
                                                        {item.instructor}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <CalendarDays className="h-4 w-4 text-green-700 dark:text-green-300" />
                                                        {item.schedule}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-green-700 dark:text-green-300" />
                                                        {item.time}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-green-700 dark:text-green-300" />
                                                        {item.location}
                                                    </div>

                                                </div>

                                                <div className="mt-auto border-t border-green-100 pt-5 dark:border-green-800/50">
                                                    <div className="mt-0">
                                                        {renderAction(item)}
                                                    </div>
                                                </div>

                                            </div>

                                        </article>
                                    );
                                })}

                            </div>

                        )}

                    </section>

                    {/* ==================================================
                        FINAL CTA
                    ================================================== */}

                    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-800 to-green-900 px-8 py-14 text-center text-white shadow-xl shadow-green-900/30">

                        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-green-300/20 blur-xl" />

                        <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

                        <Music className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-white/10" />

                        <img
                            src="/images/logo.png"
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1/2 top-1/2 w-72 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
                        />

                        <div className="relative">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                                <Music className="h-7 w-7 text-green-800" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                Use Your Gifts for Worship
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">
                                Whether you sing or play an instrument, there
                                is a place for you in the music ministry.
                            </p>

                            <a
                                href="#classes"
                                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                Join a Class

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>

                        </div>

                    </section>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}