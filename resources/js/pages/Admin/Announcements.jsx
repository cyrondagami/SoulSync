import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function AdminAnnouncements({
    announcements = [],
}) {
    const [form, setForm] = useState({
        title: '',
        category: 'Event',
        description: '',
        date: '',
        time: '',
        priority: 'Normal',
        icon: '📢',
        published: true,
    });

    const [processing, setProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        setProcessing(true);

        router.post('/admin/announcements', form, {
            onFinish: () => {
                setProcessing(false);
            },
            onSuccess: () => {
                setForm({
                    title: '',
                    category: 'Event',
                    description: '',
                    date: '',
                    time: '',
                    priority: 'Normal',
                    icon: '📢',
                    published: true,
                });
            },
        });
    };

    const deleteAnnouncement = (id) => {
        if (!confirm('Are you sure you want to delete this announcement?')) {
            return;
        }

        router.delete(`/admin/announcements/${id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Announcements" />

            <div className="min-h-screen bg-slate-50 p-6">

                <div className="mx-auto max-w-7xl">

                    {/* HEADER */}

                    <div className="mb-8">

                        <p className="font-bold text-indigo-600">
                            ADMINISTRATION
                        </p>

                        <h1 className="mt-1 text-3xl font-black text-gray-900">
                            Manage Announcements
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create and manage announcements for the youth
                            ministry.
                        </p>

                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">

                        {/* ===============================
                            CREATE FORM
                        =============================== */}

                        <div className="rounded-2xl bg-white p-6 shadow-lg lg:col-span-1">

                            <h2 className="text-xl font-black text-gray-900">
                                Create Announcement
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add a new announcement for students.
                            </p>

                            <form
                                onSubmit={submit}
                                className="mt-6 space-y-4"
                            >

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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="Event">
                                            Event
                                        </option>

                                        <option value="Training">
                                            Training
                                        </option>

                                        <option value="Community">
                                            Community
                                        </option>

                                        <option value="Worship">
                                            Worship
                                        </option>

                                        <option value="Reminder">
                                            Reminder
                                        </option>

                                        <option value="General">
                                            General
                                        </option>
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option value="Important">
                                            Important
                                        </option>

                                        <option value="Normal">
                                            Normal
                                        </option>

                                        <option value="Reminder">
                                            Reminder
                                        </option>
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
                                        className="w-full rounded-xl border-gray-200 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>

                                {/* PUBLISHED */}

                                <label className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">

                                    <input
                                        type="checkbox"
                                        name="published"
                                        checked={form.published}
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
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
                                    className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
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

                            <div className="rounded-2xl bg-white p-6 shadow-lg">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h2 className="text-xl font-black text-gray-900">
                                            Existing Announcements
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {announcements.length} announcement(s)
                                        </p>

                                    </div>

                                    <div className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                                        📢 {announcements.length}
                                    </div>

                                </div>

                                {/* LIST */}

                                <div className="mt-6 space-y-4">

                                    {announcements.length === 0 ? (

                                        <div className="rounded-2xl bg-gray-50 p-10 text-center">

                                            <div className="text-5xl">
                                                📢
                                            </div>

                                            <h3 className="mt-4 font-bold text-gray-900">
                                                No announcements yet
                                            </h3>

                                            <p className="mt-2 text-sm text-gray-500">
                                                Create your first announcement
                                                using the form.
                                            </p>

                                        </div>

                                    ) : (

                                        announcements.map(
                                            (announcement) => (

                                                <div
                                                    key={announcement.id}
                                                    className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                                                >

                                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                                        <div className="flex gap-4">

                                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                                                                {announcement.icon ||
                                                                    '📢'}
                                                            </div>

                                                            <div>

                                                                <div className="flex flex-wrap items-center gap-2">

                                                                    <h3 className="font-black text-gray-900">
                                                                        {
                                                                            announcement.title
                                                                        }
                                                                    </h3>

                                                                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-bold text-indigo-700">
                                                                        {
                                                                            announcement.category
                                                                        }
                                                                    </span>

                                                                </div>

                                                                <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                                                                    {
                                                                        announcement.description
                                                                    }
                                                                </p>

                                                                <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">

                                                                    <span>
                                                                        📅{' '}
                                                                        {
                                                                            announcement.date
                                                                        }
                                                                    </span>

                                                                    <span>
                                                                        🕐{' '}
                                                                        {
                                                                            announcement.time
                                                                        }
                                                                    </span>

                                                                    <span>
                                                                        📌{' '}
                                                                        {
                                                                            announcement.priority
                                                                        }
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
                                                                    announcement.id
                                                                )
                                                            }
                                                            className="rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100"
                                                        >
                                                            🗑️ Delete
                                                        </button>

                                                    </div>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </AuthenticatedLayout>
    );
}