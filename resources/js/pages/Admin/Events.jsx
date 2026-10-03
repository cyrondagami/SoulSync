import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function AdminEvents({ events = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});

    const emptyForm = {
        title: '',
        category: 'Fellowship',
        description: '',
        date: '',
        time: '',
        location: '',
        organizer: 'Youth Ministry',
        capacity: 100,
        status: 'Registration Open',
        icon: '🎉',
        featured: false,
    };

    const [form, setForm] = useState(emptyForm);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Remove error for this field once user changes it
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        setErrors({});

        router.post('/admin/events', form, {
            preserveScroll: true,

            onSuccess: () => {
                setForm(emptyForm);
                setErrors({});
                setShowForm(false);
            },

            onError: (serverErrors) => {
                console.log('Laravel validation errors:', serverErrors);
                setErrors(serverErrors);
            },

            onFinish: () => {
                console.log('Event submission finished.');
            },
        });
    };

    const deleteEvent = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(`/admin/events/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Events" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-7xl">

                    {/* HEADER */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900">
                                Manage Events
                            </h1>

                            <p className="mt-1 text-gray-500">
                                Create and manage youth ministry events.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(!showForm);
                                setErrors({});
                            }}
                            className="rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow hover:bg-indigo-700"
                        >
                            + Create Event
                        </button>
                    </div>

                    {/* CREATE EVENT FORM */}
                    {showForm && (
                        <div className="mb-8 rounded-2xl bg-white p-6 shadow">

                            <h2 className="mb-6 text-xl font-black text-gray-900">
                                Create New Event
                            </h2>

                            {/* GENERAL ERROR */}
                            {Object.keys(errors).length > 0 && (
                                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                                    <p className="font-bold text-red-700">
                                        Please check the following:
                                    </p>

                                    <ul className="mt-2 list-disc pl-5 text-sm text-red-600">
                                        {Object.entries(errors).map(
                                            ([field, message]) => (
                                                <li key={field}>
                                                    {message}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            <form
                                onSubmit={submit}
                                className="grid gap-5 md:grid-cols-2"
                            >

                                {/* TITLE */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Event Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Youth Fellowship Night"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                                    />

                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* CATEGORY */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Category
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    >
                                        <option value="Fellowship">
                                            Fellowship
                                        </option>

                                        <option value="Worship">
                                            Worship
                                        </option>

                                        <option value="Outreach">
                                            Outreach
                                        </option>

                                        <option value="Training">
                                            Training
                                        </option>

                                        <option value="Music">
                                            Music
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>

                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                {/* STATUS */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    >
                                        <option value="Registration Open">
                                            Registration Open
                                        </option>

                                        <option value="Upcoming">
                                            Upcoming
                                        </option>

                                        <option value="Full">
                                            Full
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>

                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* DATE */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.date && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {/* TIME */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Time
                                    </label>

                                    <input
                                        type="text"
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        required
                                        placeholder="6:00 PM - 8:30 PM"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.time && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.time}
                                        </p>
                                    )}
                                </div>

                                {/* LOCATION */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        required
                                        placeholder="Youth Center"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.location && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                {/* ORGANIZER */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Organizer
                                    </label>

                                    <input
                                        type="text"
                                        name="organizer"
                                        value={form.organizer}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.organizer && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.organizer}
                                        </p>
                                    )}
                                </div>

                                {/* CAPACITY */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Capacity
                                    </label>

                                    <input
                                        type="number"
                                        name="capacity"
                                        value={form.capacity}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.capacity && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.capacity}
                                        </p>
                                    )}
                                </div>

                                {/* ICON */}
                                <div>
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Icon / Emoji
                                    </label>

                                    <input
                                        type="text"
                                        name="icon"
                                        value={form.icon}
                                        onChange={handleChange}
                                        placeholder="🎉"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.icon && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.icon}
                                        </p>
                                    )}
                                </div>

                                {/* DESCRIPTION */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block font-bold text-gray-700">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe the event..."
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3"
                                    />

                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* FEATURED */}
                                <div className="flex items-center gap-3 md:col-span-2">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleChange}
                                        className="h-5 w-5"
                                    />

                                    <label className="font-bold text-gray-700">
                                        Featured Event
                                    </label>
                                </div>

                                {/* BUTTONS */}
                                <div className="flex gap-3 md:col-span-2">
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white hover:bg-indigo-700"
                                    >
                                        Create Event
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForm(false);
                                            setErrors({});
                                        }}
                                        className="rounded-xl bg-gray-200 px-6 py-3 font-bold text-gray-700 hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}

                    {/* EVENTS LIST */}
                    <div className="overflow-hidden rounded-2xl bg-white shadow">

                        <div className="border-b p-6">
                            <h2 className="text-xl font-black text-gray-900">
                                Existing Events
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {events.length} event
                                {events.length !== 1 ? 's' : ''} found.
                            </p>
                        </div>

                        {events.length === 0 ? (
                            <div className="p-10 text-center">
                                <div className="text-5xl">📅</div>

                                <h3 className="mt-4 text-lg font-bold text-gray-900">
                                    No events yet
                                </h3>

                                <p className="mt-2 text-gray-500">
                                    Create your first event using the button
                                    above.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="flex items-center gap-4">

                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                                                {event.icon || '🎉'}
                                            </div>

                                            <div>
                                                <h3 className="font-black text-gray-900">
                                                    {event.title}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {event.category} •{' '}
                                                    {event.date}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    📍 {event.location}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    👥 {event.attendees}/
                                                    {event.capacity}
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteEvent(event.id)
                                            }
                                            className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-600 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}