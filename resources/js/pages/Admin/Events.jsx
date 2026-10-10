import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    CalendarDays,
    Clock,
    ShieldCheck,
    UserCheck,
} from 'lucide-react';
import { useEffect, useState } from 'react';

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */

const REG_STYLES = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

const REG_LABELS = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Declined',
};

// Ready-made decline reasons. The admin can still edit the message.
const DECLINE_REASONS = [
    {
        key: 'underage',
        label: 'Below 18 years old',
        message:
            'Your request was not approved because you are below 18 years old. This event is for ages 18 and above.',
    },
    {
        key: 'not_qualified',
        label: 'Not qualified for this event',
        message:
            'Your request was not approved because you do not meet the requirements for this particular event.',
    },
    {
        key: 'full',
        label: 'Event is already full',
        message:
            'Your request was not approved because the event has reached its maximum capacity.',
    },
    {
        key: 'other',
        label: 'Other (write your own reason)',
        message: '',
    },
];

const formatDate = (value) => {
    if (!value) return '';

    return new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

// Today's date (local time) as YYYY-MM-DD, used as the earliest allowed event date
const getToday = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${now.getFullYear()}-${month}-${day}`;
};

const inputClass =
    'w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20';

/* ---------------------------------------------------------
   Member information (View Info)
--------------------------------------------------------- */

// Order and labels of the member information shown to the admin
const INFO_FIELDS = [
    ['full_name', 'Full Name'],
    ['name', 'Display Name'],
    ['email', 'Email'],
    ['gmail', 'Gmail'],
    ['contact_number', 'Contact Number'],
    ['birthdate', 'Birthdate'],
    ['gender', 'Gender'],
    ['address', 'Address'],
    ['age_group', 'Age Group'],
];

const AGE_GROUP_LABELS = {
    under_18: 'Under 18 (Youth member)',
    '18_above': '18 or above (Adult member)',
};

const formatInfoValue = (key, value) => {
    if (key === 'age_group') return AGE_GROUP_LABELS[value] ?? value;

    if (key === 'gender') {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

    if (key === 'birthdate') {
        return new Date(`${String(value).substring(0, 10)}T00:00:00`)
            .toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
    }

    return String(value);
};

/* ---------------------------------------------------------
   One registration row (used in inbox + per-event panel)
--------------------------------------------------------- */

function RegistrationRow({
    reg,
    eventTitle,
    busy,
    onApprove,
    onReject,
    onRemove,
}) {
    const [showInfo, setShowInfo] = useState(false);

    const name = reg.user?.name ?? 'Unknown user';

    const initials = name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <div className="py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-black text-green-800">
                        {initials}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-bold text-gray-900">{name}</p>

                        <p className="truncate text-xs text-gray-500">
                            {reg.user?.email}
                            {eventTitle && (
                                <>
                                    {' • '}
                                    <span className="font-semibold text-green-700">
                                        {eventTitle}
                                    </span>
                                </>
                            )}
                        </p>

                        <p className="text-xs text-gray-400">
                            Requested {formatDate(reg.created_at)}
                        </p>

                        {reg.status === 'rejected' && reg.decline_reason && (
                            <p className="mt-1 text-xs font-semibold text-red-600">
                                Reason: {reg.decline_reason}
                            </p>
                        )}
                    </div>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${REG_STYLES[reg.status]}`}
                    >
                        {REG_LABELS[reg.status]}
                    </span>

                    <button
                        type="button"
                        onClick={() => setShowInfo(!showInfo)}
                        className="rounded-lg border border-green-200 bg-white px-4 py-2 text-sm font-bold text-green-800 transition hover:bg-green-50"
                    >
                        {showInfo ? 'Hide Info' : 'View Info'}
                    </button>

                    {reg.status !== 'approved' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onApprove(reg)}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700 disabled:opacity-50"
                        >
                            Approve
                        </button>
                    )}

                    {reg.status === 'pending' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onReject(reg)}
                            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                            Decline
                        </button>
                    )}

                    {reg.status !== 'pending' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onRemove(reg)}
                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-50"
                        >
                            Remove
                        </button>
                    )}

                </div>
            </div>

            {/* MEMBER INFORMATION */}
            {showInfo && (
                <div className="mt-4 rounded-xl border border-green-100 bg-green-50/60 p-4">

                    <p className="mb-3 text-xs font-black uppercase tracking-wider text-green-800">
                        Member Information
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {INFO_FIELDS.map(([key, label]) => {
                            const value = reg.user?.[key];
                            const empty =
                                value === null ||
                                value === undefined ||
                                value === '';

                            return (
                                <div key={key}>
                                    <p className="text-[11px] font-bold uppercase text-gray-400">
                                        {label}
                                    </p>

                                    <p
                                        className={`break-words text-sm font-semibold ${
                                            empty
                                                ? 'text-gray-400'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {empty
                                            ? 'Not provided'
                                            : formatInfoValue(key, value)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminEvents({ events = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [errors, setErrors] = useState({});
    const [openEventId, setOpenEventId] = useState(null);
    const [tab, setTab] = useState('pending');
    const [busyKey, setBusyKey] = useState(null);
    const [toast, setToast] = useState(null);

    // Decline modal state
    const [declineTarget, setDeclineTarget] = useState(null);
    const [declineKey, setDeclineKey] = useState('underage');
    const [declineMessage, setDeclineMessage] = useState(
        DECLINE_REASONS[0].message,
    );
    const [declineError, setDeclineError] = useState('');

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
        requires_approval: true,
    };

    const [form, setForm] = useState(emptyForm);

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

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
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
                showToast('success', 'Event created.');
            },

            onError: (serverErrors) => setErrors(serverErrors),
        });
    };

    const deleteEvent = (event) => {
        if (
            confirm(
                `Delete "${event.title}"? All registrations for this event will be deleted too.`,
            )
        ) {
            router.delete(`/admin/events/${event.id}`, {
                preserveScroll: true,
                onSuccess: () => showToast('success', 'Event deleted.'),
            });
        }
    };

    /* ------------------------------ registrations */

    const runAction = (reg, method, url, successMessage, data = {}) => {
        setBusyKey(reg.id);

        const options = {
            preserveScroll: true,
            onSuccess: () => showToast('success', successMessage),
            onError: (serverErrors) =>
                showToast(
                    'error',
                    Object.values(serverErrors)[0] ||
                        'Something went wrong. Please try again.',
                ),
            onFinish: () => setBusyKey(null),
        };

        if (method === 'delete') {
            router.delete(url, options);
        } else {
            router.patch(url, data, options);
        }
    };

    const approve = (reg) =>
        runAction(
            reg,
            'patch',
            `/admin/registrations/${reg.id}/approve`,
            `${reg.user?.name ?? 'User'} was approved.`,
        );

    /* ------------------------------ decline (with reason) */

    // Opens the decline pop-up
    const reject = (reg) => {
        setDeclineTarget(reg);
        setDeclineKey(DECLINE_REASONS[0].key);
        setDeclineMessage(DECLINE_REASONS[0].message);
        setDeclineError('');
    };

    const closeDecline = () => {
        setDeclineTarget(null);
        setDeclineError('');
    };

    const chooseDeclineReason = (key) => {
        const chosen = DECLINE_REASONS.find((item) => item.key === key);

        setDeclineKey(key);
        setDeclineMessage(chosen ? chosen.message : '');
        setDeclineError('');
    };

    const confirmDecline = () => {
        const reason = declineMessage.trim();

        if (!reason) {
            setDeclineError('Please write the reason for declining.');
            return;
        }

        const reg = declineTarget;

        closeDecline();

        runAction(
            reg,
            'patch',
            `/admin/registrations/${reg.id}/reject`,
            `${reg.user?.name ?? 'User'} was declined.`,
            { reason },
        );
    };

    const remove = (reg) => {
        if (confirm(`Remove ${reg.user?.name ?? 'this user'} from this event?`)) {
            runAction(
                reg,
                'delete',
                `/admin/registrations/${reg.id}`,
                'Registration removed.',
            );
        }
    };

    const togglePanel = (event) => {
        if (openEventId === event.id) {
            setOpenEventId(null);
            return;
        }

        setOpenEventId(event.id);
        setTab((event.pending_count ?? 0) > 0 ? 'pending' : 'approved');
    };

    /* ------------------------------ derived data */

    const allRegistrations = events.flatMap((event) =>
        (event.registrations ?? []).map((reg) => ({ ...reg, event })),
    );

    const pendingRequests = allRegistrations.filter(
        (reg) => reg.status === 'pending',
    );

    const totalApproved = allRegistrations.filter(
        (reg) => reg.status === 'approved',
    ).length;

    const stats = [
        {
            label: 'Total Events',
            value: events.length,
            icon: CalendarDays,
            bg: 'bg-green-50',
            iconColor: 'text-green-700',
            gradient: 'from-green-500 to-green-700',
        },
        {
            label: 'Pending Requests',
            value: pendingRequests.length,
            icon: Clock,
            bg: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
            gradient: 'from-yellow-400 to-yellow-600',
        },
        {
            label: 'Approved Participants',
            value: totalApproved,
            icon: UserCheck,
            bg: 'bg-green-50',
            iconColor: 'text-green-700',
            gradient: 'from-green-600 to-green-800',
        },
        {
            label: 'Approval Required',
            value: events.filter((event) => event.requires_approval !== false)
                .length,
            icon: ShieldCheck,
            bg: 'bg-red-50',
            iconColor: 'text-red-600',
            gradient: 'from-red-500 to-red-700',
        },
    ];

    return (
        <AdminLayout title="Manage Events">
            <Head title="Manage Events" />

            {/* HEADER */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-yellow-300" />

                        <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                            Events
                        </p>
                    </div>

                    <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                        Manage Events
                    </h2>

                    <p className="mt-2 text-sm text-green-100/70">
                        Create events and approve who can join.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setShowForm(!showForm);
                        setErrors({});
                    }}
                    className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-red-950/30 transition duration-300 hover:-translate-y-1 hover:bg-red-700"
                >
                    {showForm ? 'Close Form' : '+ Create Event'}
                </button>
            </section>

            {/* STATS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-2xl border border-green-100 bg-white p-5 shadow-xl shadow-green-950/40 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="relative">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} transition duration-300 group-hover:scale-110`}
                                >
                                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                                </div>

                                <p className="mt-5 text-3xl font-black text-slate-900">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-700">
                                    {stat.label}
                                </p>
                            </div>

                            <div
                                className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.gradient} opacity-0 transition group-hover:opacity-100`}
                            />
                        </div>
                    );
                })}
            </section>

            {/* CREATE EVENT FORM */}
            {showForm && (
                <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-xl shadow-green-950/40">

                    <h2 className="mb-6 text-xl font-black text-gray-900">
                        Create New Event
                    </h2>

                    {Object.values(errors).some(Boolean) && (
                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                            <p className="font-bold text-red-700">
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

                    <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">

                        {/* TITLE */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-bold text-gray-700">Event Title</label>
                            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Youth Fellowship Night" className={inputClass} />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* CATEGORY */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Category</label>
                            <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                                {['Fellowship', 'Worship', 'Outreach', 'Training', 'Music', 'Other'].map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                        </div>

                        {/* STATUS */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                                {['Registration Open', 'Upcoming', 'Closed', 'Cancelled', 'Completed'].map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>

                        {/* DATE (today and future only) */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} min={getToday()} required className={inputClass} />
                            {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                        </div>

                        {/* TIME */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Time</label>
                            <input type="text" name="time" value={form.time} onChange={handleChange} required placeholder="6:00 PM - 8:30 PM" className={inputClass} />
                            {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
                        </div>

                        {/* LOCATION */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Location</label>
                            <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="Youth Center" className={inputClass} />
                            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                        </div>

                        {/* ORGANIZER */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Organizer</label>
                            <input type="text" name="organizer" value={form.organizer} onChange={handleChange} required className={inputClass} />
                            {errors.organizer && <p className="mt-1 text-sm text-red-600">{errors.organizer}</p>}
                        </div>

                        {/* CAPACITY */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Capacity</label>
                            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min="1" required className={inputClass} />
                            {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                        </div>

                        {/* ICON */}
                        <div>
                            <label className="mb-2 block font-bold text-gray-700">Icon / Emoji</label>
                            <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="🎉" className={inputClass} />
                            {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon}</p>}
                        </div>

                        {/* DESCRIPTION */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block font-bold text-gray-700">Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Describe the event..." className={inputClass} />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* APPROVAL */}
                        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-yellow-300 bg-yellow-50 p-4 md:col-span-2">
                            <input
                                type="checkbox"
                                name="requires_approval"
                                checked={form.requires_approval}
                                onChange={handleChange}
                                className="mt-0.5 h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
                            />

                            <span>
                                <span className="block font-bold text-gray-800">
                                    Require approval to join
                                </span>

                                <span className="block text-sm text-gray-600">
                                    When on, users send a request and you decide who can join.
                                    When off, users who join are approved automatically.
                                </span>
                            </span>
                        </label>

                        {/* FEATURED */}
                        <div className="flex items-center gap-3 md:col-span-2">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={form.featured}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-600"
                            />

                            <label className="font-bold text-gray-700">Featured Event</label>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex gap-3 md:col-span-2">
                            <button type="submit" className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800">
                                Create Event
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setErrors({});
                                }}
                                className="rounded-xl bg-gray-200 px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </section>
            )}

            {/* PENDING REQUESTS INBOX */}
            {pendingRequests.length > 0 && (
                <section className="overflow-hidden rounded-2xl border border-yellow-300 bg-white shadow-xl shadow-green-950/40">

                    <div className="flex items-center justify-between border-b border-yellow-200 bg-yellow-50 px-6 py-4">
                        <div>
                            <h2 className="text-lg font-black text-gray-900">
                                Join Requests
                            </h2>

                            <p className="text-sm text-gray-600">
                                {pendingRequests.length} waiting for your decision
                            </p>
                        </div>

                        <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-black text-green-950">
                            {pendingRequests.length}
                        </span>
                    </div>

                    <div className="max-h-[420px] divide-y divide-gray-100 overflow-y-auto px-6">
                        {pendingRequests.map((reg) => (
                            <RegistrationRow
                                key={reg.id}
                                reg={reg}
                                eventTitle={reg.event.title}
                                busy={busyKey === reg.id}
                                onApprove={approve}
                                onReject={reject}
                                onRemove={remove}
                            />
                        ))}
                    </div>

                </section>
            )}

            {/* EVENTS LIST */}
            <section className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-950/40">

                <div className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-black text-gray-900">
                        Existing Events
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {events.length} event{events.length !== 1 ? 's' : ''} found.
                    </p>
                </div>

                {events.length === 0 ? (
                    <div className="p-10 text-center">
                        <div className="text-5xl">📅</div>

                        <h3 className="mt-4 text-lg font-bold text-gray-900">
                            No events yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Create your first event using the button above.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {events.map((event) => {
                            const registrations = event.registrations ?? [];
                            const approved = Number(event.attendees ?? 0);
                            const capacity = Number(event.capacity ?? 100);
                            const pct = capacity > 0 ? Math.min(100, Math.round((approved / capacity) * 100)) : 0;
                            const pendingCount = Number(event.pending_count ?? 0);
                            const isOpen = openEventId === event.id;

                            const tabs = [
                                ['pending', 'Pending'],
                                ['approved', 'Approved'],
                                ['rejected', 'Declined'],
                                ['all', 'All'],
                            ];

                            const visible = registrations.filter(
                                (reg) => tab === 'all' || reg.status === tab,
                            );

                            return (
                                <div key={event.id}>

                                    <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">

                                        <div className="flex items-center gap-4">

                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                                {event.icon || '🎉'}
                                            </div>

                                            <div className="min-w-0">

                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="font-black text-gray-900">{event.title}</h3>

                                                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                                                        event.requires_approval === false
                                                            ? 'bg-gray-100 text-gray-600'
                                                            : 'bg-green-100 text-green-700'
                                                    }`}>
                                                        {event.requires_approval === false ? 'Auto-join' : 'Approval required'}
                                                    </span>

                                                    {pendingCount > 0 && (
                                                        <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-[11px] font-black text-green-950">
                                                            {pendingCount} pending
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {event.category} • {String(event.date).substring(0, 10)} • {event.status}
                                                </p>

                                                <p className="text-sm text-gray-500">📍 {event.location}</p>

                                                <div className="mt-2 w-56 max-w-full">
                                                    <div className="flex justify-between text-xs font-semibold text-gray-500">
                                                        <span>👥 {approved}/{capacity} approved</span>
                                                        <span>{pct}%</span>
                                                    </div>

                                                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                        <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-700" style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="flex flex-wrap gap-2">

                                            <button
                                                type="button"
                                                onClick={() => togglePanel(event)}
                                                className={`rounded-xl px-4 py-2 font-bold transition ${
                                                    isOpen
                                                        ? 'bg-green-700 text-white'
                                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                }`}
                                            >
                                                {isOpen ? 'Hide' : 'Registrations'} ({registrations.length})
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deleteEvent(event)}
                                                className="rounded-xl bg-red-100 px-4 py-2 font-bold text-red-600 transition hover:bg-red-200"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                    {/* REGISTRATIONS PANEL */}
                                    {isOpen && (
                                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">

                                            <div className="flex flex-wrap gap-2">
                                                {tabs.map(([key, label]) => {
                                                    const count = key === 'all'
                                                        ? registrations.length
                                                        : registrations.filter((reg) => reg.status === key).length;

                                                    return (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            onClick={() => setTab(key)}
                                                            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                                                                tab === key
                                                                    ? 'bg-green-700 text-white'
                                                                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-green-50'
                                                            }`}
                                                        >
                                                            {label} ({count})
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {visible.length === 0 ? (
                                                <p className="py-8 text-center text-sm text-gray-500">
                                                    No {tab === 'all' ? '' : REG_LABELS[tab]?.toLowerCase()} registrations yet.
                                                </p>
                                            ) : (
                                                <div className="mt-2 divide-y divide-gray-200">
                                                    {visible.map((reg) => (
                                                        <RegistrationRow
                                                            key={reg.id}
                                                            reg={reg}
                                                            busy={busyKey === reg.id}
                                                            onApprove={approve}
                                                            onReject={reject}
                                                            onRemove={remove}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                )}

            </section>

            {/* DECLINE MODAL */}
            {declineTarget && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
                    onClick={closeDecline}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-xl font-black text-gray-900">
                            Decline Request
                        </h3>

                        <p className="mt-1 text-sm text-gray-600">
                            You are declining{' '}
                            <span className="font-bold text-gray-900">
                                {declineTarget.user?.name ?? 'this user'}
                            </span>
                            {declineTarget.event?.title && (
                                <>
                                    {' '}for{' '}
                                    <span className="font-bold text-green-700">
                                        {declineTarget.event.title}
                                    </span>
                                </>
                            )}
                            . They will receive a notification with your reason.
                        </p>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-bold text-gray-700">
                                Reason
                            </label>

                            <select
                                value={declineKey}
                                onChange={(e) => chooseDeclineReason(e.target.value)}
                                className={inputClass}
                            >
                                {DECLINE_REASONS.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-bold text-gray-700">
                                Message the user will see
                            </label>

                            <textarea
                                rows="4"
                                maxLength="500"
                                value={declineMessage}
                                onChange={(e) => {
                                    setDeclineMessage(e.target.value);
                                    setDeclineError('');
                                }}
                                placeholder="Write why this request was declined..."
                                className={inputClass}
                            />

                            {declineError && (
                                <p className="mt-1 text-sm text-red-600">{declineError}</p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeDecline}
                                className="rounded-xl bg-gray-200 px-5 py-2.5 font-bold text-gray-700 transition hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmDecline}
                                className="rounded-xl bg-red-600 px-5 py-2.5 font-bold text-white transition hover:bg-red-700"
                            >
                                Decline Request
                            </button>
                        </div>
                    </div>
                </div>
            )}

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