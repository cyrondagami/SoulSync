import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PrayerRequests() {
    const [name, setName] = useState('');
    const [request, setRequest] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [requests, setRequests] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!request.trim()) return;

        setRequests([
            {
                id: Date.now(),
                name: anonymous || !name.trim() ? 'Anonymous' : name,
                request: request,
            },
            ...requests,
        ]);

        setName('');
        setRequest('');
        setAnonymous(false);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Prayer Requests" />

            <div className="min-h-screen bg-slate-50">

                {/* ===============================
                    HERO — SAME BACKGROUND AS DASHBOARD
                =============================== */}

                <section className="relative overflow-hidden">

                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=2200&q=85')",
                        }}
                    />

                    {/* Main dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-violet-900/80" />

                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent" />

                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-blue-400/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-violet-500/20 blur-3xl" />

                    <div className="pointer-events-none absolute right-[20%] top-[15%] h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                    {/* Floating particles */}
                    <div className="absolute left-[12%] top-[25%] h-2 w-2 animate-pulse rounded-full bg-white/70" />
                    <div className="absolute left-[35%] top-[18%] h-1.5 w-1.5 animate-pulse rounded-full bg-blue-200" />
                    <div className="absolute right-[30%] top-[32%] h-2 w-2 animate-pulse rounded-full bg-violet-200" />
                    <div className="absolute right-[12%] top-[20%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/60" />

                    {/* Content */}
                    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-36 pt-20 text-white sm:px-6 lg:px-8 lg:pb-40 lg:pt-24">

                        <div className="max-w-3xl">

                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                                </span>
                                🙏 PRAYER COMMUNITY
                            </span>

                            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                                Pray Together.
                                <br />
                                <span className="bg-gradient-to-r from-blue-100 via-white to-violet-200 bg-clip-text text-transparent">
                                    Grow Together.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                                Share your prayer needs and lift up others in
                                prayer as a youth ministry community.
                            </p>

                            <a
                                href="#submit"
                                className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-white/20"
                            >
                                Submit a Request →
                            </a>

                        </div>

                    </div>

                </section>

                <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                    {/* ===============================
                        STATS
                    =============================== */}

                    <div className="relative z-20 -mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="rounded-2xl bg-white p-6 shadow-xl">
                            <div className="text-3xl">🙏</div>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {requests.length}
                            </p>

                            <p className="text-sm text-gray-500">
                                Prayer Requests
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-xl">
                            <div className="text-3xl">🕊️</div>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {
                                    requests.filter(
                                        (item) => item.name === 'Anonymous'
                                    ).length
                                }
                            </p>

                            <p className="text-sm text-gray-500">
                                Anonymous Requests
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-xl sm:col-span-2 lg:col-span-1">
                            <div className="text-3xl">❤️</div>

                            <p className="mt-3 text-3xl font-black text-gray-900">
                                {
                                    requests.filter(
                                        (item) => item.name !== 'Anonymous'
                                    ).length
                                }
                            </p>

                            <p className="text-sm text-gray-500">
                                Shared With Name
                            </p>
                        </div>

                    </div>

                    {/* ===============================
                        FORM + LIST
                    =============================== */}

                    <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">

                        {/* FORM */}
                        <section
                            id="submit"
                            className="h-fit overflow-hidden rounded-3xl bg-white shadow-lg"
                        >
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white">
                                <div className="text-5xl">🙏</div>

                                <h2 className="mt-4 text-2xl font-black">
                                    Submit a Prayer Request
                                </h2>

                                <p className="mt-2 text-sm text-white/80">
                                    Your request will be lifted up by the
                                    community.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8">

                                <div>
                                    <label className="block text-sm font-bold text-gray-700">
                                        Name (optional)
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        disabled={anonymous}
                                        className="mt-2 block w-full rounded-xl border-gray-200 bg-white px-5 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="mt-5">
                                    <label className="block text-sm font-bold text-gray-700">
                                        Prayer Request
                                    </label>

                                    <textarea
                                        value={request}
                                        onChange={(e) =>
                                            setRequest(e.target.value)
                                        }
                                        rows="5"
                                        className="mt-2 block w-full rounded-xl border-gray-200 bg-white px-5 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Write your prayer request here..."
                                    />
                                </div>

                                <label className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={anonymous}
                                        onChange={(e) =>
                                            setAnonymous(e.target.checked)
                                        }
                                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    Post as anonymous
                                </label>

                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
                                >
                                    Submit Request
                                </button>

                            </form>
                        </section>

                        {/* LIST */}
                        <section>

                            <p className="font-bold text-indigo-600">
                                PRAYER WALL
                            </p>

                            <h2 className="mt-1 text-3xl font-black text-gray-900">
                                Recent Prayer Requests
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Stand with others through prayer and
                                encouragement.
                            </p>

                            {requests.length === 0 ? (
                                <div className="mt-6 rounded-2xl bg-white p-12 text-center shadow-sm">
                                    <div className="text-5xl">🕊️</div>

                                    <h3 className="mt-4 text-xl font-bold text-gray-900">
                                        No prayer requests yet
                                    </h3>

                                    <p className="mt-2 text-gray-500">
                                        Be the first to share a prayer
                                        request.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {requests.map((item) => (
                                        <article
                                            key={item.id}
                                            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 text-lg font-black text-indigo-600">
                                                    {item.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <p className="font-black text-gray-900">
                                                    {item.name}
                                                </p>
                                            </div>

                                            <p className="mt-4 leading-7 text-gray-600">
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
