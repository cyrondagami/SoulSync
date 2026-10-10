import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';
import { useEffect, useState } from 'react';

const PRIORITY_STYLES = {
    Important: 'bg-red-100 text-red-700',
    Normal: 'bg-green-100 text-green-700',
    Reminder: 'bg-yellow-100 text-yellow-800',
};

const inputClass =
    'w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20';

const emptyForm = {
    title: '',
    category: 'Event',
    description: '',
    date: '',
    time: '',
    priority: 'Normal',
    icon: '📢',
    published: true,
};

const formatDate = (value) => {
    if (!value) return '';

    const date = new Date(String(value).substring(0, 10) + 'T00:00:00');

    if (Number.isNaN(date.getTime())) return String(value);

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function AdminAnnouncements({ announcements = [] }) {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [toast, setToast] = useState(null);

    /* ------------------------------ toast */

    const showToast = (type, message) => setToast({ type, message });

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => setToast(null), 4000);

        return () => clearTimeout(timer);
    }, [toast]);

    /* ------------------------------ form */

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        setProcessing(true);
        setErrors({});

        router.post('/admin/announcements', form, {
            preserveScroll: true,
            onSuccess: () => {
                setForm(emptyForm);
                showToast('success', 'Announcement created.');
            },
            onError: (serverErrors) => setErrors(serverErrors),
            onFinish: () => setProcessing(false),
        });
    };

    const deleteAnnouncement = (announcement) => {
        if (
            !confirm(
                `Delete "${announcement.title}"? This cannot be undone.`,
            )
        ) {
            return;
        }

        router.delete(`/admin/announcements/${announcement.id}`, {
            preserveScroll: true,
            onSuccess: () => showToast('success', 'Announcement deleted.'),
        });
    };

    return (
        <AdminLayout title="Manage Announcements">
            <Head title="Manage Announcements" />

            {/* HEADER */}
            <section>
                <div className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-yellow-300" />

                    <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                        Administration
                    </p>
                </div>

                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    Manage Announcements
                </h2>

                <p className="mt-2 text-sm text-green-100/70">
                    Create and manage announcements for the youth ministry.
                </p>
            </section>

            <div className="grid gap-8 lg:grid-cols-3">

                {/* ===============================
                    CREATE FORM
                =============================== */}

                <div className="h-fit rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-950/40 lg:col-span-1">

                    <h2 className="text-xl font-black text-gray-900">
                        Create Announcement
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add a new announcement for students.
                    </p>

                    {Object.values(errors).some(Boolean) && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="text-sm font-bold text-red-700">
                                Please check the following:
                            </p>

                            <ul className="mt-2 list-disc pl-5 text-sm text-red-600">
                                {Object.entries(errors)
                                    .filter(([, message]) => message)
                                    .map(([field, message]) => (
                                        <li key={field}>{message}</li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6 space-y-4">

                        {/* TITLE */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                placeholder="Announcement title"
                                className={inputClass}
                            />
                        </div>

                        {/* CATEGORY */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Category
                            </label>

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {[
                                    'Event',
                                    'Training',
                                    'Community',
                                    'Worship',
                                    'Reminder',
                                    'General',
                                ].map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* DESCRIPTION */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Write the announcement..."
                                className={inputClass}
                            />
                        </div>

                        {/* DATE */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* TIME */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Time
                            </label>

                            <input
                                type="text"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                required
                                placeholder="6:00 PM"
                                className={inputClass}
                            />
                        </div>

                        {/* PRIORITY */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className={inputClass}
                            >
                                {['Important', 'Normal', 'Reminder'].map(
                                    (item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>

                        {/* ICON */}
                        <div>
                            <label className="mb-1 block text-sm font-bold text-gray-700">
                                Icon
                            </label>

                            <input
                                type="text"
                                name="icon"
                                value={form.icon}
                                onChange={handleChange}
                                placeholder="📢"
                                maxLength="20"
                                className={inputClass}
                            />
                        </div>

                        {/* PUBLISHED */}
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                            <input
                                type="checkbox"
                                name="published"
                                checked={form.published}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
                            />

                            <div>
                                <p className="font-bold text-gray-800">
                                    Published
                                </p>

                                <p className="text-xs text-gray-500">
                                    Show this announcement to students.
                                </p>
                            </div>
                        </label>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-red-600 px-5 py-3 font-black text-white shadow-xl shadow-red-950/20 transition duration-300 hover:-translate-y-0.5 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Creating...'
                                : '➕ Create Announcement'}
                        </button>

                    </form>

                </div>

                {/* ===============================
                    ANNOUNCEMENT LIST
                =============================== */}

                <div className="lg:col-span-2">

                    <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-950/40">

                        <div className="flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-black text-gray-900">
                                    Existing Announcements
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {announcements.length} announcement
                                    {announcements.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            <div className="rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                                📢 {announcements.length}
                            </div>

                        </div>

                        <div className="mt-6 space-y-4">

                            {announcements.length === 0 ? (
                                <div className="rounded-2xl bg-gray-50 p-10 text-center">
                                    <div className="text-5xl">📢</div>

                                    <h3 className="mt-4 font-bold text-gray-900">
                                        No announcements yet
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Create your first announcement using
                                        the form.
                                    </p>
                                </div>
                            ) : (
                                announcements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                            <div className="flex min-w-0 gap-4">

                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                                                    {announcement.icon || '📢'}
                                                </div>

                                                <div className="min-w-0">

                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="font-black text-gray-900">
                                                            {announcement.title}
                                                        </h3>

                                                        <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                                                            {announcement.category}
                                                        </span>

                                                        <span
                                                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                                                PRIORITY_STYLES[
                                                                    announcement
                                                                        .priority
                                                                ] ??
                                                                'bg-gray-100 text-gray-600'
                                                            }`}
                                                        >
                                                            {announcement.priority}
                                                        </span>
                                                    </div>

                                                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                                        {announcement.description}
                                                    </p>

                                                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                                                        <span>
                                                            📅{' '}
                                                            {formatDate(
                                                                announcement.date,
                                                            )}
                                                        </span>

                                                        <span>
                                                            🕐 {announcement.time}
                                                        </span>

                                                        <span
                                                            className={
                                                                announcement.published
                                                                    ? 'font-bold text-green-600'
                                                                    : 'font-bold text-gray-400'
                                                            }
                                                        >
                                                            {announcement.published
                                                                ? '● Published'
                                                                : '● Draft'}
                                                        </span>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteAnnouncement(
                                                        announcement,
                                                    )
                                                }
                                                className="shrink-0 rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>
                                    </div>
                                ))
                            )}

                        </div>

                    </div>

                </div>

            </div>

            {/* TOAST */}
            {toast && (
                <div
                    role="status"
                    aria-live="polite"
                    className={`fixed right-4 top-24 z-[70] max-w-sm rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
                        toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'
                    }`}
                >
                    {toast.message}
                </div>
            )}
        </AdminLayout>
    );
}