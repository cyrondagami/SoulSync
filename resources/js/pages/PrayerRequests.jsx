import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { HandHeart, Heart, Send, Sparkles, Users, EyeOff } from 'lucide-react';

export default function PrayerRequests({ prayers = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        request: '',
        is_anonymous: false,
    });

    // The saved requests now come from the database
    const requests = prayers;

    const anonymousCount = requests.filter((item) => item.is_anonymous).length;
    const namedCount = requests.filter((item) => !item.is_anonymous).length;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.request.trim()) return;

        post('/prayer-requests', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const stats = [
        {
            label: 'Prayer Requests',
            value: requests.length,
            icon: HandHeart,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Anonymous Requests',
            value: anonymousCount,
            icon: EyeOff,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
        {
            label: 'Shared With Name',
            value: namedCount,
            icon: Users,
            iconBg: 'bg-green-100 dark:bg-green-800/60',
            color: 'text-green-700 dark:text-green-300',
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Prayer Requests" />

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

                                <HandHeart className="h-4 w-4 text-green-200" />

                                Prayer Community
                            </div>

                            {/* Heading */}
                            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                Pray Together.

                                <br />

                                <span className="bg-gradient-to-r from-green-200 via-white to-green-100 bg-clip-text text-transparent">
                                    Grow Together.
                                </span>

                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-3xl text-lg leading-8 text-green-50">
                                Share your prayer needs and lift up others in
                                prayer as a youth ministry community.
                            </p>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <a
                                    href="#submit"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-2xl"
                                >
                                    Submit a Request

                                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>

                                <a
                                    href="#wall"
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/20"
                                >
                                    <Heart className="h-4 w-4 text-green-200" />

                                    Prayer Wall
                                </a>

                            </div>

                            {/* Hero Values */}
                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">

                                {['Pray', 'Encourage', 'Stand Together'].map(
                                    (value) => (
                                        <div
                                            key={value}
                                            className="flex items-center gap-2 text-xs font-bold text-green-50"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-green-300" />

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
                        FORM + PRAYER WALL
                    ================================================== */}

                    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">

                        {/* ==================================================
                            FORM
                        ================================================== */}

                        <section
                            id="submit"
                            className="h-fit overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/15 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30"
                        >

                            {/* Form Header */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-8 text-white">

                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />

                                <HandHeart className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-white/10" />

                                <div className="relative">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                                        <HandHeart className="h-6 w-6 text-green-800" />
                                    </div>

                                    <h2 className="mt-5 text-2xl font-black">
                                        Submit a Prayer Request
                                    </h2>

                                    <p className="mt-2 text-sm text-green-50/90">
                                        Your request will be lifted up by the
                                        community.
                                    </p>

                                </div>

                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-8">

                                {/* Name */}
                                <div>

                                    <label className="block text-sm font-bold text-green-950 dark:text-white">
                                        Name (optional)
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        disabled={data.is_anonymous}
                                        className="mt-2 block w-full rounded-xl border-green-200 bg-white px-5 py-3 text-green-950 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 disabled:bg-green-50 disabled:text-gray-400 dark:border-green-800/50 dark:bg-green-950/60 dark:text-white dark:placeholder:text-green-100/50 dark:disabled:bg-green-900/40 dark:disabled:text-green-100/40"
                                        placeholder="Your name"
                                    />

                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                                            {errors.name}
                                        </p>
                                    )}

                                </div>

                                {/* Prayer Request */}
                                <div className="mt-5">

                                    <label className="block text-sm font-bold text-green-950 dark:text-white">
                                        Prayer Request
                                    </label>

                                    <textarea
                                        value={data.request}
                                        onChange={(e) =>
                                            setData('request', e.target.value)
                                        }
                                        rows="5"
                                        className="mt-2 block w-full rounded-xl border-green-200 bg-white px-5 py-3 text-green-950 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500 dark:border-green-800/50 dark:bg-green-950/60 dark:text-white dark:placeholder:text-green-100/50"
                                        placeholder="Write your prayer request here..."
                                    />

                                    {errors.request && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                                            {errors.request}
                                        </p>
                                    )}

                                </div>

                                {/* Anonymous */}
                                <label className="mt-5 flex items-center gap-2 text-sm font-medium text-green-800 dark:text-green-100">

                                    <input
                                        type="checkbox"
                                        checked={data.is_anonymous}
                                        onChange={(e) =>
                                            setData(
                                                'is_anonymous',
                                                e.target.checked,
                                            )
                                        }
                                        className="rounded border-green-300 text-green-700 focus:ring-green-500"
                                    />

                                    Post as anonymous

                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-bold text-white shadow-lg shadow-green-900/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl disabled:opacity-60 dark:bg-green-600 dark:hover:bg-green-500"
                                >
                                    {processing ? 'Sending...' : 'Submit Request'}

                                    {!processing && (
                                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    )}
                                </button>

                            </form>

                        </section>

                        {/* ==================================================
                            PRAYER WALL
                        ================================================== */}

                        <section id="wall">

                            <div className="border-l-4 border-green-600 pl-6 dark:border-green-400">

                                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                                    <Sparkles className="h-4 w-4" />
                                    Prayer Wall
                                </span>

                                <h2 className="mt-2 text-3xl font-black text-green-950 dark:text-white sm:text-4xl">
                                    Recent Prayer Requests
                                </h2>

                                <p className="mt-2 text-gray-600 dark:text-green-100/70">
                                    Stand with others through prayer and
                                    encouragement.
                                </p>

                            </div>

                            {/* Empty state */}
                            {requests.length === 0 ? (

                                <div className="mt-6 rounded-3xl border-2 border-dashed border-green-300 bg-green-50 p-12 text-center dark:border-green-600/50 dark:bg-green-900/30">

                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">
                                        <HandHeart className="h-8 w-8 text-green-700 dark:text-green-300" />
                                    </div>

                                    <h3 className="mt-5 text-xl font-black text-green-950 dark:text-white">
                                        No prayer requests yet
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                        Be the first to share a prayer
                                        request.
                                    </p>

                                </div>

                            ) : (

                                <div className="mt-6 space-y-4">

                                    {requests.map((item) => (

                                        <article
                                            key={item.id}
                                            className="group rounded-2xl border border-green-100 border-l-4 border-l-green-600 bg-white p-6 shadow-xl shadow-green-900/15 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-green-800/50 dark:border-l-green-400 dark:bg-green-900/40 dark:shadow-black/30"
                                        >

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-lg font-black text-white dark:bg-green-600">
                                                    {(item.name || '?')
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>

                                                    <p className="font-black text-green-950 dark:text-white">
                                                        {item.name}
                                                    </p>

                                                    <div className="mt-1 h-1 w-8 rounded-full bg-green-500 transition-all duration-300 group-hover:w-14" />

                                                </div>

                                            </div>

                                            <p className="mt-4 leading-7 text-gray-700 dark:text-green-50/85">
                                                {item.request}
                                            </p>

                                        </article>

                                    ))}

                                </div>

                            )}

                        </section>

                    </div>

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
                                <Heart className="h-7 w-7 text-green-800" />
                            </div>

                            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
                                You Are Not Alone
                            </h2>

                            <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-50">
                                Every prayer matters. Share what is on your
                                heart and let the community stand with you.
                            </p>

                            <a
                                href="#submit"
                                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                Submit a Request

                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>

                        </div>

                    </section>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}