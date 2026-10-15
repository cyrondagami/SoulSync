import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { CheckCircle2, EyeOff, Heart, Trash2, User } from 'lucide-react';
import { useState } from 'react';

const STATUS_STYLES = {
    approved: 'bg-green-100 text-green-700',
    hidden: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-800',
};

const formatDate = (value) => {
    if (!value) return '—';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function AdminPrayerRequests({ prayers = [] }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const togglePrayer = (prayer) => {
        router.patch(
            `/admin/prayer-requests/${prayer.id}/toggle`,
            {},
            { preserveScroll: true }
        );
    };

    const filteredPrayers = (prayers || []).filter((p) => {
        const kw = (search || '').toLowerCase();
        if (statusFilter !== 'All' && p.status !== statusFilter) return false;
        if (!kw) return true;
        return (
            (p.request || '').toLowerCase().includes(kw) ||
            (p.name || '').toLowerCase().includes(kw) ||
            (p.author || '').toLowerCase().includes(kw)
        );
    });

    const deletePrayer = (prayer) => {
        if (!confirm(`Delete this prayer request from ${prayer.name || 'anonymous member'}?`)) {
            return;
        }

        router.delete(`/admin/prayer-requests/${prayer.id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Manage Prayer Requests">
            <Head title="Manage Prayer Requests" />

            <section>
                <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-300" />

                    <p className="text-xs font-black uppercase tracking-[0.2em] text-black dark:text-white">
                        Administration
                    </p>
                </div>

                <h2 className="mt-2 text-2xl font-black text-black dark:text-white sm:text-3xl">
                    Manage Prayer Requests
                </h2>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Review, approve, hide, and remove prayer requests from the ministry feed.
                </p>
            </section>

            <div className="mt-4 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-full md:max-w-xs">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search prayer requests..."
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 px-4 text-sm text-gray-700 outline-none"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm"
                    >
                        {['All', 'approved', 'pending', 'hidden'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="text-sm text-gray-500">{prayers.length} total requests</div>
            </div>

            <div className="space-y-5">
                
                {/* filtered list below */}
                
                {
                    /* compute filtered prayers */
                }
                
                
                {filteredPrayers.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-white p-10 text-center shadow-xl shadow-green-950/30">
                        <Heart className="mx-auto h-10 w-10 text-green-400" />
                        <h3 className="mt-4 text-xl font-black text-gray-900">
                            {prayers.length === 0 ? 'No prayer requests yet' : 'No prayer requests match your filters'}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {prayers.length === 0 ? 'New prayer submissions will appear here for review.' : 'Try clearing the search or changing the status filter.'}
                        </p>
                    </div>
                ) : (
                    filteredPrayers.map((prayer) => (
                        <div
                            key={prayer.id}
                            className="rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-950/30"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-green-600">
                                        <User className="h-3.5 w-3.5" />
                                        {prayer.is_anonymous ? 'Anonymous Prayer' : prayer.name || prayer.author}
                                    </div>

                                    <h3 className="text-xl font-black text-gray-900">
                                        {prayer.is_anonymous ? 'Anonymous request' : prayer.name || 'Community member'}
                                    </h3>
                                </div>

                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                                        STATUS_STYLES[prayer.status] || 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {prayer.status}
                                </span>
                            </div>

                            <div className="mt-5 rounded-2xl border border-green-50 bg-green-50/60 p-4">
                                <p className="text-base leading-7 text-gray-700">
                                    {prayer.request}
                                </p>
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span>
                                    Author: <span className="font-semibold text-gray-700">{prayer.author || 'Unknown'}</span>
                                </span>

                                <span>
                                    Email: <span className="font-semibold text-gray-700">{prayer.author_email || 'Not provided'}</span>
                                </span>

                                <span>
                                    Submitted: <span className="font-semibold text-gray-700">{formatDate(prayer.created_at)}</span>
                                </span>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => togglePrayer(prayer)}
                                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                                        prayer.status === 'approved'
                                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    {prayer.status === 'approved' ? (
                                        <>
                                            <EyeOff className="h-4 w-4" />
                                            Hide
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Approve
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => deletePrayer(prayer)}
                                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}
