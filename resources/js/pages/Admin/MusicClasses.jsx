import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    CalendarDays,
    Music,
    Plus,
    Search,
    Trash2,
    Clock,
    MapPin,
    UserRound,
    Users,
    Guitar,
    Mic2,
    Piano,
    Drum,
    X,
    Check,
    Inbox,
} from 'lucide-react';

const getIcon = (type = '') => {
    const t = type.toLowerCase();

    if (['vocal', 'voice', 'sing', 'choir'].some((k) => t.includes(k))) return Mic2;
    if (['guitar', 'bass', 'ukulele'].some((k) => t.includes(k))) return Guitar;
    if (['keyboard', 'piano', 'organ'].some((k) => t.includes(k))) return Piano;
    if (['drum', 'percussion', 'cajon'].some((k) => t.includes(k))) return Drum;

    return Music;
};

const emptyForm = {
    name: '',
    instructor: '',
    schedule: '',
    time: '',
    location: '',
    capacity: '',
    type: '',
};

const inputClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100';

export default function MusicClasses({ classes: rawClasses }) {
    const { flash } = usePage().props;

    const classes = Array.isArray(rawClasses) ? rawClasses : [];

    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [requestsClassId, setRequestsClassId] = useState(null);
    const [form, setForm] = useState(emptyForm);

    const activeClass = classes.find((c) => c.id === requestsClassId);
    const activeEnrollments = activeClass?.enrollments ?? [];

    const totalStudents = classes.reduce((t, c) => t + (c.students ?? 0), 0);
    const totalPending = classes.reduce((t, c) => t + (c.pending_count ?? 0), 0);

    const filteredClasses = classes.filter((item) => {
        const keyword = search.toLowerCase();

        return (
            (item.name ?? '').toLowerCase().includes(keyword) ||
            (item.instructor ?? '').toLowerCase().includes(keyword) ||
            (item.type ?? '').toLowerCase().includes(keyword)
        );
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addClass = (e) => {
        e.preventDefault();

        router.post('/admin/music-classes', form, {
            preserveScroll: true,
            onSuccess: () => {
                setForm(emptyForm);
                setShowModal(false);
            },
        });
    };

    const deleteClass = (id) => {
        if (
            !window.confirm(
                'Delete this class? All its join requests will be removed too.',
            )
        )
            return;

        router.delete(`/admin/music-classes/${id}`, { preserveScroll: true });
    };

    const approve = (id) =>
        router.patch(
            `/admin/music-classes/enrollments/${id}/approve`,
            {},
            { preserveScroll: true },
        );

    const reject = (id) =>
        router.patch(
            `/admin/music-classes/enrollments/${id}/reject`,
            {},
            { preserveScroll: true },
        );

    return (
        <AdminLayout
            active="music"
            title="Music Classes"
            subtitle="Manage classes, instructors, schedules, and join requests."
        >
            <Head title="Admin - Music Classes" />

            {/* Flash message */}
            {(flash?.success || flash?.error) && (
                <div className="fixed right-4 top-4 z-[60] max-w-sm">
                    <div
                        className={`rounded-xl px-5 py-3 text-sm font-bold text-white shadow-2xl ${
                            flash.success ? 'bg-green-600' : 'bg-red-600'
                        }`}
                    >
                        {flash.success || flash.error}
                    </div>
                </div>
            )}

            {/* Top bar */}
            <div className="mb-6 flex justify-end">
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-green-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
                >
                    <Plus className="h-5 w-5" />
                    Add Music Class
                </button>
            </div>

            {/* ================= STATS ================= */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl shadow-green-950/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                                Total Classes
                            </p>
                            <p className="mt-2 text-3xl font-black text-black">
                                {classes.length}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                            <Music className="h-6 w-6 text-green-700" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl shadow-green-950/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                                Approved Students
                            </p>
                            <p className="mt-2 text-3xl font-black text-black">
                                {totalStudents}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                            <Users className="h-6 w-6 text-yellow-700" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl shadow-green-950/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                                Instructors
                            </p>
                            <p className="mt-2 text-3xl font-black text-black">
                                {new Set(classes.map((c) => c.instructor)).size}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                            <UserRound className="h-6 w-6 text-red-700" />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-xl shadow-green-950/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                                Pending Requests
                            </p>
                            <p className="mt-2 text-3xl font-black text-yellow-600">
                                {totalPending}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
                            <Inbox className="h-6 w-6 text-yellow-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= TABLE CARD ================= */}
            <div className="mt-7 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-green-950/40">
                <div className="border-b border-gray-200 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-black text-black">
                                All Music Classes
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                View classes and review join requests.
                            </p>
                        </div>

                        <div className="relative w-full md:max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search classes..."
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                    Class
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                    Instructor
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                    Schedule
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-500">
                                    Location
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-black uppercase tracking-wider text-gray-500">
                                    Students
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredClasses.map((item) => {
                                const Icon = getIcon(item.type);

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-100 transition hover:bg-green-50/50"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100">
                                                    <Icon className="h-5 w-5 text-green-700" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-black">
                                                        {item.name}
                                                    </p>
                                                    <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2.5 py-1 text-[10px] font-black uppercase text-yellow-800">
                                                        {item.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <UserRound className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {item.instructor}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-bold text-black">
                                                    {item.schedule}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                                <span className="text-xs text-gray-500">
                                                    {item.time}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-red-600" />
                                                <span className="text-sm text-gray-700">
                                                    {item.location}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-center">
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-800">
                                                {item.students ?? 0}/{item.capacity}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() =>
                                                        setRequestsClassId(item.id)
                                                    }
                                                    className="flex h-9 items-center gap-2 rounded-lg bg-yellow-50 px-3 text-xs font-black text-yellow-800 transition hover:bg-yellow-100"
                                                >
                                                    <Inbox className="h-4 w-4" />
                                                    Requests
                                                    {(item.pending_count ?? 0) > 0 && (
                                                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] text-white">
                                                            {item.pending_count}
                                                        </span>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => deleteClass(item.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-700 transition hover:bg-red-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {filteredClasses.length === 0 && (
                        <div className="px-6 py-16 text-center">
                            <Music className="mx-auto h-12 w-12 text-gray-300" />
                            <h3 className="mt-4 text-lg font-black text-black">
                                No music classes found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Click "Add Music Class" to create your first one.
                            </p>
                        </div>
                    )}
                </div>

                {/* Mobile Cards */}
                <div className="space-y-4 p-4 md:hidden">
                    {filteredClasses.map((item) => {
                        const Icon = getIcon(item.type);

                        return (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                                            <Icon className="h-5 w-5 text-green-700" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-black">
                                                {item.name}
                                            </h3>
                                            <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-black uppercase text-yellow-800">
                                                {item.type}
                                            </span>
                                        </div>
                                    </div>

                                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-black text-green-800">
                                        {item.students ?? 0}/{item.capacity}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <UserRound className="h-4 w-4 text-gray-400" />
                                        {item.instructor}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-green-600" />
                                        {item.schedule} • {item.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-red-600" />
                                        {item.location}
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2 border-t border-gray-200 pt-4">
                                    <button
                                        onClick={() => setRequestsClassId(item.id)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-100 py-2.5 text-sm font-bold text-yellow-800"
                                    >
                                        <Inbox className="h-4 w-4" />
                                        Requests
                                        {(item.pending_count ?? 0) > 0 && (
                                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] text-white">
                                                {item.pending_count}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => deleteClass(item.id)}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-100 py-2.5 text-sm font-bold text-red-800"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ================= ADD CLASS MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-black text-black">
                                    Add Music Class
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Create a class for any instrument.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={addClass}>
                            <div className="grid gap-5 p-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Violin for Beginners"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Instructor
                                    </label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        value={form.instructor}
                                        onChange={handleChange}
                                        placeholder="Instructor name"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Instrument
                                    </label>
                                    <input
                                        type="text"
                                        name="type"
                                        list="instrument-options"
                                        value={form.type}
                                        onChange={handleChange}
                                        placeholder="Type or pick: Violin, Bass..."
                                        className={inputClass}
                                        required
                                    />
                                    <datalist id="instrument-options">
                                        <option value="Vocal" />
                                        <option value="Guitar" />
                                        <option value="Bass Guitar" />
                                        <option value="Keyboard" />
                                        <option value="Piano" />
                                        <option value="Drums" />
                                        <option value="Violin" />
                                        <option value="Ukulele" />
                                        <option value="Flute" />
                                        <option value="Saxophone" />
                                        <option value="Trumpet" />
                                    </datalist>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Schedule
                                    </label>
                                    <select
                                        name="schedule"
                                        value={form.schedule}
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">Select day</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                        <option>Sunday</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        placeholder="e.g. 4:00 PM - 5:30 PM"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Music Room"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-bold text-black">
                                        Capacity (max students)
                                    </label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        min="1"
                                        value={form.capacity}
                                        onChange={handleChange}
                                        placeholder="15"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 rounded-xl border border-gray-300 bg-white py-3 text-sm font-black text-gray-700 transition hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-green-700 py-3 text-sm font-black text-white transition hover:bg-green-800"
                                >
                                    Add Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= REQUESTS MODAL ================= */}
            {activeClass && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-black text-black">
                                    {activeClass.name}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Join requests • {activeClass.students ?? 0}/
                                    {activeClass.capacity} approved
                                </p>
                            </div>

                            <button
                                onClick={() => setRequestsClassId(null)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-red-100 hover:text-red-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto p-6">
                            {activeEnrollments.length === 0 && (
                                <div className="py-10 text-center">
                                    <Inbox className="mx-auto h-10 w-10 text-gray-300" />
                                    <p className="mt-3 text-sm text-gray-500">
                                        No requests yet.
                                    </p>
                                </div>
                            )}

                            {activeEnrollments.map((e) => (
                                <div
                                    key={e.id}
                                    className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-black">
                                            {e.name}
                                        </p>
                                        <p className="truncate text-xs text-gray-500">
                                            {e.email}
                                        </p>
                                        <p className="mt-1 text-[11px] text-gray-400">
                                            Requested {e.requested}
                                        </p>
                                    </div>

                                    {e.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => approve(e.id)}
                                                className="flex items-center gap-1 rounded-lg bg-green-700 px-4 py-2 text-xs font-black text-white hover:bg-green-800"
                                            >
                                                <Check className="h-4 w-4" />
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => reject(e.id)}
                                                className="flex items-center gap-1 rounded-lg bg-red-100 px-4 py-2 text-xs font-black text-red-800 hover:bg-red-200"
                                            >
                                                <X className="h-4 w-4" />
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span
                                            className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase ${
                                                e.status === 'approved'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {e.status}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}