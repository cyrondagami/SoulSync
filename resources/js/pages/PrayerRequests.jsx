import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PrayerRequests({ prayers = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        request: '',
        is_anonymous: false,
    });

    // The saved requests now come from the database
    const requests = prayers;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.request.trim()) return;

        post('/prayer-requests', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Prayer Requests" />

            {/* =====================================================
                PAGE BACKGROUND — SAME AS DASHBOARD
            ====================================================== */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-green-950 via-green-950 to-red-950">

                {/* Page-wide glow blobs */}
                <div className="pointer-events-none absolute left-[-10rem] top-[45rem] h-[36rem] w-[36rem] rounded-full bg-green-500/10 blur-3xl" />

                <div className="pointer-events-none absolute right-[-12rem] top-[90rem] h-[40rem] w-[40rem] rounded-full bg-red-500/15 blur-3xl" />

                <div className="pointer-events-none absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-green-500/10 blur-3xl" />

                {/* =====================================================
                    HERO
                ====================================================== */}
                <section className="relative overflow-hidden">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* SAME DASHBOARD OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-950/95 via-green-900/90 to-red-900/80" />

                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-green-950 to-transparent" />

                    {/* Green glow */}
                    <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-green-400/20 blur-3xl" />

                    {/* Red glow */}
                    <div className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-500/20 blur-3xl" />

                    {/* White glow */}
                    <div className="absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    {/* SoulSync logo watermark */}
                    <img
                        src="/images/logo.png"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-[55%] z-0 w-[30rem] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.10] sm:w-[36rem] lg:w-[42rem]"
                    />

                    {/* Floating particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-white/70" />

                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-green-200" />

                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-red-200" />

                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

                    {/* Hero content */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-36 pt-20 text-white sm:px-6 lg:px-8 lg:pb-40 lg:pt-24">

                        <div className="max-w-3xl">

                            {/* Badge */}
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md">

                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                </span>

                                🙏 PRAYER COMMUNITY

                            </span>

                            {/* Heading */}
                            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">

                                Pray Together.

                                <br />

                                <span className="bg-gradient-to-r from-green-100 via-white to-red-200 bg-clip-text text-transparent">
                                    Grow Together.
                                </span>

                            </h1>

                            {/* Description */}
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">
                                Share your prayer needs and lift up others in
                                prayer as a youth ministry community.
                            </p>

                            {/* CTA */}
                            <a
                                href="#submit"
                                className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-green-700 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-white/20"
                            >
                                Submit a Request →
                            </a>

                        </div>

                    </div>
                </section>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <main className="relative z-20 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                    {/* =================================================
                        STATS
                    ================================================== */}
                    <div className="relative z-20 -mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Prayer Requests */}
                        <div className="rounded-2xl border border-white/10 border-t-4 border-t-green-500 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="text-3xl">
                                🙏
                            </div>

                            <p className="mt-3 text-3xl font-black text-green-950">
                                {requests.length}
                            </p>

                            <p className="text-sm font-medium text-green-500">
                                Prayer Requests
                            </p>

                        </div>

                        {/* Anonymous */}
                        <div className="rounded-2xl border border-white/10 border-t-4 border-t-red-500 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

                            <div className="text-3xl">
                                🕊️
                            </div>

                            <p className="mt-3 text-3xl font-black text-red-700">
                                {
                                    requests.filter(
                                        (item) => item.is_anonymous
                                    ).length
                                }
                            </p>

                            <p className="text-sm font-medium text-green-500">
                                Anonymous Requests
                            </p>

                        </div>

                        {/* Shared With Name */}
                        <div className="rounded-2xl border border-white/10 border-t-4 border-t-yellow-400 bg-white p-6 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-1">

                            <div className="text-3xl">
                                ❤️
                            </div>

                            <p className="mt-3 text-3xl font-black text-yellow-600">
                                {
                                    requests.filter(
                                        (item) => !item.is_anonymous
                                    ).length
                                }
                            </p>

                            <p className="text-sm font-medium text-green-500">
                                Shared With Name
                            </p>

                        </div>

                    </div>

                    {/* =================================================
                        FORM + PRAYER WALL
                    ================================================== */}
                    <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">

                        {/* =================================================
                            FORM
                        ================================================== */}
                        <section
                            id="submit"
                            className="h-fit overflow-hidden rounded-3xl border border-white/10 bg-white shadow-xl shadow-green-950/40"
                        >

                            {/* Form Header */}
                            <div className="bg-gradient-to-br from-green-800 via-green-700 to-red-800 p-8 text-white">

                                <div className="text-5xl">
                                    🙏
                                </div>

                                <h2 className="mt-4 text-2xl font-black">
                                    Submit a Prayer Request
                                </h2>

                                <p className="mt-2 text-sm text-green-100">
                                    Your request will be lifted up by the
                                    community.
                                </p>

                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-8"
                            >

                                {/* Name */}
                                <div>

                                    <label className="block text-sm font-bold text-green-900">
                                        Name (optional)
                                    </label>

                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        disabled={data.is_anonymous}
                                        className="mt-2 block w-full rounded-xl border-green-100 bg-white px-5 py-3 text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500 disabled:bg-gray-100"
                                        placeholder="Your name"
                                    />

                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.name}
                                        </p>
                                    )}

                                </div>

                                {/* Prayer Request */}
                                <div className="mt-5">

                                    <label className="block text-sm font-bold text-green-900">
                                        Prayer Request
                                    </label>

                                    <textarea
                                        value={data.request}
                                        onChange={(e) =>
                                            setData('request', e.target.value)
                                        }
                                        rows="5"
                                        className="mt-2 block w-full rounded-xl border-green-100 bg-white px-5 py-3 text-gray-800 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        placeholder="Write your prayer request here..."
                                    />

                                    {errors.request && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.request}
                                        </p>
                                    )}

                                </div>

                                {/* Anonymous */}
                                <label className="mt-5 flex items-center gap-2 text-sm text-green-700">

                                    <input
                                        type="checkbox"
                                        checked={data.is_anonymous}
                                        onChange={(e) =>
                                            setData('is_anonymous', e.target.checked)
                                        }
                                        className="rounded border-green-300 text-green-600 focus:ring-green-500"
                                    />

                                    Post as anonymous

                                </label>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 w-full rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-lg disabled:opacity-60"
                                >
                                    {processing ? 'Sending...' : 'Submit Request'}
                                </button>

                            </form>

                        </section>

                        {/* =================================================
                            PRAYER WALL
                        ================================================== */}
                        <section>

                            <p className="font-black tracking-[0.2em] text-green-300">
                                PRAYER WALL
                            </p>

                            <h2 className="mt-1 text-3xl font-black text-white">
                                Recent Prayer Requests
                            </h2>

                            <p className="mt-2 text-sm text-green-200/80">
                                Stand with others through prayer and
                                encouragement.
                            </p>

                            {/* Empty state */}
                            {requests.length === 0 ? (

                                <div className="mt-6 rounded-2xl border border-white/10 bg-white p-12 text-center shadow-xl shadow-green-950/40">

                                    <div className="text-5xl">
                                        🕊️
                                    </div>

                                    <h3 className="mt-4 text-xl font-bold text-green-950">
                                        No prayer requests yet
                                    </h3>

                                    <p className="mt-2 text-green-500">
                                        Be the first to share a prayer
                                        request.
                                    </p>

                                    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-yellow-400" />

                                </div>

                            ) : (

                                <div className="mt-6 space-y-4">

                                    {requests.map((item) => (

                                        <article
                                            key={item.id}
                                            className="rounded-2xl border border-white/10 border-l-4 border-l-green-500 bg-white p-6 shadow-xl shadow-green-950/30 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                        >

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg font-black text-green-700">
                                                    {item.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>

                                                    <p className="font-black text-green-950">
                                                        {item.name}
                                                    </p>

                                                    <div className="mt-1 h-1 w-8 rounded-full bg-red-500" />

                                                </div>

                                            </div>

                                            <p className="mt-4 leading-7 text-green-700">
                                                {item.request}
                                            </p>

                                        </article>

                                    ))}

                                </div>

                            )}

                        </section>

                    </div>

                </main>
            </div>
        </AuthenticatedLayout>
    );
}