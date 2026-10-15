import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock,
    Inbox,
    Pencil,
    Plus,
    ShieldCheck,
    Trash2,
    UserCheck,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

/* =========================================================
   CONSTANTS
========================================================= */

const REG_STYLES = {
    pending:
        'border border-dashed border-green-500 bg-white text-green-800 dark:bg-green-950 dark:text-green-100',
    approved:
        'bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-100',
    rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200',
};

const REG_LABELS = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Declined',
};

const REG_TABS = [
    ['pending', 'Pending'],
    ['approved', 'Approved'],
    ['rejected', 'Declined'],
    ['all', 'All'],
];

const EVENT_STATUS_STYLES = {
    'Registration Open':
        'bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-100',
    Upcoming:
        'border border-green-200 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/40 dark:text-green-100',
    Closed: 'bg-gray-200 text-black dark:bg-green-900/60 dark:text-white',
    Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200',
    Completed: 'bg-green-800 text-white dark:bg-green-600',
};

const EVENT_CATEGORIES = [
    'Fellowship',
    'Worship',
    'Outreach',
    'Training',
    'Music',
    'Other',
];

const EVENT_STATUSES = [
    'Registration Open',
    'Upcoming',
    'Closed',
    'Cancelled',
    'Completed',
];

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

const EMPTY_FORM = {
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

/* =========================================================
   STYLE TOKENS (shared class names)
   Text is black (light mode) / white (dark mode).
   Green is used only for highlights.
========================================================= */

const TEXT = 'text-black dark:text-white';

const CARD =
    'rounded-2xl border border-green-100 bg-white shadow-xl shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30';

const MODAL_CARD =
    'rounded-2xl border border-green-100 bg-white shadow-2xl dark:border-green-800/50 dark:bg-green-950';

const INPUT =
    'w-full rounded-xl border border-green-200 bg-white px-4 py-3 text-black outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/30 dark:border-green-800/50 dark:bg-green-950/60 dark:text-white dark:placeholder:text-white/40';

const BTN_PRIMARY =
    'rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-500';

const BTN_OUTLINE = `rounded-lg border border-green-200 bg-white px-4 py-2 text-sm font-bold transition hover:bg-green-50 disabled:opacity-50 dark:border-green-700 dark:bg-transparent dark:hover:bg-green-900/60 ${TEXT}`;

const BTN_SOFT = `rounded-lg bg-green-50 px-4 py-2 text-sm font-bold transition hover:bg-green-100 disabled:opacity-50 dark:bg-green-900/50 dark:hover:bg-green-900/80 ${TEXT}`;

// Red is kept only for destructive actions (it has meaning)
const BTN_DANGER_OUTLINE =
    'rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-500/40 dark:bg-transparent dark:text-red-300 dark:hover:bg-red-900/30';

const BTN_DANGER_SOFT =
    'rounded-lg bg-red-50 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50';

/* =========================================================
   HELPERS
========================================================= */

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

const getInitials = (name = '') =>
    name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'NA';

const formatInfoValue = (key, value) => {
    if (key === 'age_group') return AGE_GROUP_LABELS[value] ?? value;

    if (key === 'gender') {
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

    if (key === 'birthdate') {
        return new Date(
            `${String(value).substring(0, 10)}T00:00:00`,
        ).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    return String(value);
};

// Turns an event from the database into the shape the form uses
const eventToForm = (event) => ({
    title: event.title ?? '',
    category: event.category ?? 'Fellowship',
    description: event.description ?? '',
    date: String(event.date ?? '').substring(0, 10),
    time: event.time ?? '',
    location: event.location ?? '',
    organizer: event.organizer ?? 'Youth Ministry',
    capacity: event.capacity ?? 100,
    status: event.status ?? 'Registration Open',
    icon: event.icon || '🎉',
    featured: Boolean(event.featured),
    requires_approval: event.requires_approval !== false,
});

/* =========================================================
   HOOKS
========================================================= */

function useToast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => setToast(null), 4000);

        return () => clearTimeout(timer);
    }, [toast]);

    const show = useCallback(
        (type, message) => setToast({ type, message }),
        [],
    );

    const dismiss = useCallback(() => setToast(null), []);

    return { toast, show, dismiss };
}

/* =========================================================
   SMALL UI PIECES
========================================================= */

function StatCard({ label, value, icon: Icon }) {
    return (
        <div className={`group relative overflow-hidden p-5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${CARD}`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 transition duration-300 group-hover:scale-110 dark:bg-green-800/60">
                <Icon className="h-6 w-6 text-green-700 dark:text-green-300" />
            </div>

            <p className={`mt-5 text-3xl font-black ${TEXT}`}>{value}</p>

            <p className={`mt-1 text-sm font-bold ${TEXT}`}>{label}</p>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-green-500 to-green-700 opacity-0 transition group-hover:opacity-100" />
        </div>
    );
}

function InfoTile({ label, value }) {
    return (
        <div className="rounded-xl border border-green-100 bg-green-50 p-3.5 dark:border-green-800/50 dark:bg-green-900/50">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-green-700 dark:text-green-300">
                {label}
            </p>

            <p className={`mt-1 text-sm font-bold ${TEXT}`}>{value}</p>
        </div>
    );
}

function Field({ label, error, hint, className = '', children }) {
    return (
        <div className={className}>
            <label className={`mb-2 block text-sm font-bold ${TEXT}`}>
                {label}
            </label>

            {children}

            {hint && !error && (
                <p className={`mt-1 text-xs ${TEXT}`}>{hint}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                    {error}
                </p>
            )}
        </div>
    );
}

function EmptyState({ icon: Icon, title, text }) {
    return (
        <div className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">
                <Icon className="h-8 w-8 text-green-700 dark:text-green-300" />
            </div>

            <h3 className={`mt-5 text-xl font-black ${TEXT}`}>{title}</h3>

            <p className={`mt-2 text-sm ${TEXT}`}>{text}</p>
        </div>
    );
}

function Toast({ toast, onDismiss }) {
    if (!toast) return null;

    const Icon = toast.type === 'success' ? CheckCircle2 : AlertCircle;

    return (
        <div
            role="status"
            aria-live="polite"
            className={`fixed right-4 top-24 z-[80] flex max-w-sm items-start gap-3 rounded-2xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${
                toast.type === 'success' ? 'bg-green-700' : 'bg-red-700'
            }`}
        >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />

            <p className="leading-5">{toast.message}</p>

            <button
                type="button"
                onClick={onDismiss}
                className="ml-2 shrink-0 opacity-70 transition hover:opacity-100"
                aria-label="Dismiss"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

/* =========================================================
   MEMBER INFORMATION (View Info)
========================================================= */

function MemberInfo({ user }) {
    return (
        <div className="mt-4 rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-800/50 dark:bg-green-900/40">
            <p className="mb-3 text-xs font-black uppercase tracking-wider text-green-700 dark:text-green-300">
                Member Information
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
                {INFO_FIELDS.map(([key, label]) => {
                    const value = user?.[key];
                    const empty =
                        value === null || value === undefined || value === '';

                    return (
                        <div key={key}>
                            <p className={`text-[11px] font-bold uppercase ${TEXT}`}>
                                {label}
                            </p>

                            <p
                                className={`break-words text-sm font-semibold ${TEXT} ${
                                    empty ? 'opacity-60' : ''
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
    );
}

/* =========================================================
   ONE REGISTRATION ROW (inbox + per-event panel)
========================================================= */

function RegistrationRow({
    reg,
    eventTitle,
    busy,
    onApprove,
    onReject,
    onRemove,
    onConfirmAttendance,
}) {
    const [showInfo, setShowInfo] = useState(false);

    const name = reg.user?.name ?? 'Unknown user';

    return (
        <div className="py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                {/* Who */}
                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-black text-white dark:bg-green-600">
                        {getInitials(name)}
                    </div>

                    <div className="min-w-0">
                        <p className={`truncate font-bold ${TEXT}`}>{name}</p>

                        <p className={`truncate text-xs ${TEXT}`}>
                            {reg.user?.email}
                            {eventTitle && (
                                <>
                                    {' • '}
                                    <span className="font-black text-green-700 dark:text-green-300">
                                        {eventTitle}
                                    </span>
                                </>
                            )}
                        </p>

                        <p className={`text-xs ${TEXT}`}>
                            Requested {formatDate(reg.created_at)}
                        </p>

                        {reg.status === 'rejected' && reg.decline_reason && (
                            <p className="mt-1 text-xs font-semibold text-red-600 dark:text-red-300">
                                Reason: {reg.decline_reason}
                            </p>
                        )}
                    </div>

                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${REG_STYLES[reg.status]}`}
                    >
                        {REG_LABELS[reg.status]}
                    </span>

                    <button
                        type="button"
                        onClick={() => setShowInfo((current) => !current)}
                        className={BTN_OUTLINE}
                    >
                        {showInfo ? 'Hide Info' : 'View Info'}
                    </button>

                    {reg.status !== 'approved' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onApprove(reg)}
                            className={BTN_PRIMARY}
                        >
                            Approve
                        </button>
                    )}

                    {reg.status === 'approved' &&
                        !reg.attendance_confirmed_at &&
                        onConfirmAttendance && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => onConfirmAttendance(reg)}
                                className={BTN_PRIMARY}
                            >
                                Mark Attended
                            </button>
                        )}

                    {reg.status === 'approved' && reg.attendance_confirmed_at && (
                        <span className="rounded-lg bg-green-100 px-3 py-2 text-xs font-black text-green-800 dark:bg-green-800/60 dark:text-green-100">
                            +10 pts
                        </span>
                    )}

                    {reg.status === 'pending' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onReject(reg)}
                            className={BTN_DANGER_OUTLINE}
                        >
                            Decline
                        </button>
                    )}

                    {reg.status !== 'pending' && (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={() => onRemove(reg)}
                            className={BTN_SOFT}
                        >
                            Remove
                        </button>
                    )}

                </div>
            </div>

            {showInfo && <MemberInfo user={reg.user} />}
        </div>
    );
}

/* =========================================================
   EVENT FORM (create + edit)
   - no `event` prop  -> Create mode (POST /admin/events)
   - `event` prop     -> Edit mode   (PUT  /admin/events/{id})
========================================================= */

function EventForm({ event = null, onClose, onDone, className = CARD }) {
    const isEdit = Boolean(event);

    const [form, setForm] = useState(event ? eventToForm(event) : EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    // In edit mode the capacity can not go below the people already approved
    const approvedCount = isEdit ? Number(event.attendees ?? 0) : 0;
    const minCapacity = Math.max(1, approvedCount);

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
        setProcessing(true);

        const options = {
            preserveScroll: true,
            onSuccess: () => onDone(),
            onError: (serverErrors) => setErrors(serverErrors),
            onFinish: () => setProcessing(false),
        };

        if (isEdit) {
            router.put(`/admin/events/${event.id}`, form, options);
        } else {
            router.post('/admin/events', form, options);
        }
    };

    const hasErrors = Object.values(errors).some(Boolean);

    return (
        <section className={`p-6 ${className}`}>

            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className={`text-xl font-black ${TEXT}`}>
                        {isEdit ? 'Edit Event' : 'Create New Event'}
                    </h2>

                    {isEdit && (
                        <p className={`mt-1 text-sm ${TEXT}`}>
                            Fix any mistakes in{' '}
                            <span className="font-black text-green-700 dark:text-green-300">
                                {event.title}
                            </span>
                            . Existing registrations are kept.
                        </p>
                    )}
                </div>

                {isEdit && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 transition hover:bg-green-50 dark:hover:bg-green-900/60"
                        aria-label="Close"
                    >
                        <X className={`h-5 w-5 ${TEXT}`} />
                    </button>
                )}
            </div>

            {hasErrors && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/40 dark:bg-red-900/30">
                    <p className="font-bold text-red-700 dark:text-red-200">
                        Please check the following:
                    </p>

                    <ul className="mt-2 list-disc pl-5 text-sm text-red-600 dark:text-red-200/90">
                        {Object.entries(errors)
                            .filter(([, message]) => message)
                            .map(([field, message]) => (
                                <li key={field}>{message}</li>
                            ))}
                    </ul>
                </div>
            )}

            <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">

                <Field label="Event Title" error={errors.title} className="md:col-span-2">
                    <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="Youth Fellowship Night" className={INPUT} />
                </Field>

                <Field label="Category" error={errors.category}>
                    <select name="category" value={form.category} onChange={handleChange} className={INPUT}>
                        {EVENT_CATEGORIES.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Status" error={errors.status}>
                    <select name="status" value={form.status} onChange={handleChange} className={INPUT}>
                        {EVENT_STATUSES.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Date" error={errors.date}>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={isEdit ? undefined : getToday()}
                        required
                        className={INPUT}
                    />
                </Field>

                <Field label="Time" error={errors.time}>
                    <input type="text" name="time" value={form.time} onChange={handleChange} required placeholder="6:00 PM - 8:30 PM" className={INPUT} />
                </Field>

                <Field label="Location" error={errors.location}>
                    <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="Youth Center" className={INPUT} />
                </Field>

                <Field label="Organizer" error={errors.organizer}>
                    <input type="text" name="organizer" value={form.organizer} onChange={handleChange} required className={INPUT} />
                </Field>

                <Field
                    label="Capacity"
                    error={errors.capacity}
                    hint={
                        isEdit && approvedCount > 0
                            ? `${approvedCount} already approved, so capacity can't go lower than that.`
                            : undefined
                    }
                >
                    <input type="number" name="capacity" value={form.capacity} onChange={handleChange} min={minCapacity} required className={INPUT} />
                </Field>

                <Field label="Icon / Emoji" error={errors.icon}>
                    <input type="text" name="icon" value={form.icon} onChange={handleChange} placeholder="🎉" className={INPUT} />
                </Field>

                <Field label="Description" error={errors.description} className="md:col-span-2">
                    <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Describe the event..." className={INPUT} />
                </Field>

                {/* Approval */}
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-dashed border-green-300 bg-green-50 p-4 dark:border-green-600/50 dark:bg-green-900/30 md:col-span-2">
                    <input
                        type="checkbox"
                        name="requires_approval"
                        checked={form.requires_approval}
                        onChange={handleChange}
                        className="mt-0.5 h-5 w-5 rounded border-green-300 text-green-700 focus:ring-green-600"
                    />

                    <span>
                        <span className={`block font-bold ${TEXT}`}>
                            Require approval to join
                        </span>

                        <span className={`block text-sm ${TEXT}`}>
                            When on, users send a request and you decide who can join.
                            When off, users who join are approved automatically.
                        </span>
                    </span>
                </label>

                {/* Featured */}
                <label className="flex cursor-pointer items-center gap-3 md:col-span-2">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-green-300 text-green-700 focus:ring-green-600"
                    />

                    <span className={`font-bold ${TEXT}`}>Featured Event</span>
                </label>

                {/* Buttons */}
                <div className="flex gap-3 md:col-span-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-800 disabled:opacity-60 dark:bg-green-600 dark:hover:bg-green-500"
                    >
                        {processing
                            ? isEdit ? 'Saving...' : 'Creating...'
                            : isEdit ? 'Save Changes' : 'Create Event'}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className={`rounded-xl bg-green-50 px-6 py-3 font-bold transition hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900/80 ${TEXT}`}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </section>
    );
}

/* =========================================================
   EDIT EVENT MODAL (wraps the form)
========================================================= */

function EditEventModal({ event, onClose, onDone }) {
    return (
        <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="my-8 w-full max-w-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <EventForm
                    event={event}
                    onClose={onClose}
                    onDone={onDone}
                    className={MODAL_CARD}
                />
            </div>
        </div>
    );
}

/* =========================================================
   JOIN REQUESTS INBOX (all pending requests)
========================================================= */

function JoinRequestsInbox({ requests, busyKey, onApprove, onReject, onRemove }) {
    if (requests.length === 0) return null;

    return (
        <section className={`overflow-hidden ${CARD}`}>

            <div className="flex items-center justify-between border-b border-green-100 bg-gradient-to-r from-green-100 via-green-50 to-white px-6 py-4 dark:border-green-800/50 dark:from-green-800/70 dark:via-green-900/60 dark:to-green-950/60">
                <div>
                    <h2 className={`text-lg font-black ${TEXT}`}>
                        Join Requests
                    </h2>

                    <p className={`text-sm ${TEXT}`}>
                        {requests.length} waiting for your decision
                    </p>
                </div>

                <span className="rounded-full bg-green-700 px-3 py-1 text-sm font-black text-white dark:bg-green-600">
                    {requests.length}
                </span>
            </div>

            <div className="max-h-[420px] divide-y divide-green-100 overflow-y-auto px-6 dark:divide-green-800/50">
                {requests.map((reg) => (
                    <RegistrationRow
                        key={reg.id}
                        reg={reg}
                        eventTitle={reg.event.title}
                        busy={busyKey === reg.id}
                        onApprove={onApprove}
                        onReject={onReject}
                        onRemove={onRemove}
                    />
                ))}
            </div>

        </section>
    );
}

/* =========================================================
   REGISTRATIONS PANEL (inside one event)
========================================================= */

function RegistrationsPanel({
    event,
    tab,
    onTabChange,
    busyKey,
    onApprove,
    onReject,
    onRemove,
    onConfirmAttendance,
}) {
    const registrations = event.registrations ?? [];

    const visible = registrations.filter(
        (reg) => tab === 'all' || reg.status === tab,
    );

    return (
        <div className="border-t border-green-100 bg-green-50/60 px-6 py-5 dark:border-green-800/50 dark:bg-green-950/40">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
                {REG_TABS.map(([key, label]) => {
                    const count =
                        key === 'all'
                            ? registrations.length
                            : registrations.filter((reg) => reg.status === key)
                                  .length;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onTabChange(key)}
                            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                                tab === key
                                    ? 'bg-green-700 text-white dark:bg-green-600'
                                    : `border border-green-200 bg-white hover:bg-green-50 dark:border-green-800/50 dark:bg-green-900/40 dark:hover:bg-green-900/70 ${TEXT}`
                            }`}
                        >
                            {label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* List */}
            {visible.length === 0 ? (
                <p className={`py-8 text-center text-sm ${TEXT}`}>
                    No {tab === 'all' ? '' : REG_LABELS[tab]?.toLowerCase()}{' '}
                    registrations yet.
                </p>
            ) : (
                <div className="mt-2 divide-y divide-green-100 dark:divide-green-800/50">
                    {visible.map((reg) => (
                        <RegistrationRow
                            key={reg.id}
                            reg={reg}
                            busy={busyKey === reg.id}
                            onApprove={onApprove}
                            onReject={(target) => onReject(target, event)}
                            onRemove={onRemove}
                            onConfirmAttendance={onConfirmAttendance}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

/* =========================================================
   ONE EVENT CARD
========================================================= */

function EventCard({
    event,
    isOpen,
    tab,
    onTabChange,
    onTogglePanel,
    onEdit,
    onDelete,
    busyKey,
    onApprove,
    onReject,
    onRemove,
    onConfirmAttendance,
}) {
    const registrations = event.registrations ?? [];
    const approved = Number(event.attendees ?? 0);
    const capacity = Number(event.capacity ?? 100);
    const pct =
        capacity > 0 ? Math.min(100, Math.round((approved / capacity) * 100)) : 0;
    const pendingCount = Number(event.pending_count ?? 0);
    const rejectedCount = registrations.filter(
        (reg) => reg.status === 'rejected',
    ).length;
    const availableSpots = Math.max(capacity - approved, 0);

    return (
        <div>
            <div className="p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">

                    {/* LEFT: details */}
                    <div className="flex min-w-0 flex-1 items-start gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl dark:bg-green-800/60">
                            {event.icon || '🎉'}
                        </div>

                        <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className={`text-xl font-black ${TEXT}`}>
                                    {event.title}
                                </h3>

                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-green-800 dark:bg-green-800/60 dark:text-green-100">
                                    {event.category}
                                </span>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                                        EVENT_STATUS_STYLES[event.status] ||
                                        `bg-gray-100 ${TEXT}`
                                    }`}
                                >
                                    {event.status}
                                </span>

                                {event.featured && (
                                    <span className="rounded-full bg-green-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white dark:bg-green-600">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <p className={`mt-3 max-w-3xl text-[15px] leading-7 ${TEXT}`}>
                                {event.description ||
                                    'No event description provided yet.'}
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                <InfoTile label="Date" value={formatDate(event.date)} />
                                <InfoTile label="Time" value={event.time} />
                                <InfoTile label="Location" value={event.location} />
                                <InfoTile label="Organizer" value={event.organizer} />
                            </div>

                            <div className="mt-5">
                                <div className={`mb-2 flex items-center justify-between gap-3 text-xs font-bold ${TEXT}`}>
                                    <span>Registration progress</span>
                                    <span>
                                        {approved}/{capacity} approved
                                    </span>
                                </div>

                                <div className="h-2.5 overflow-hidden rounded-full bg-green-100 dark:bg-green-800/60">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: counts + actions */}
                    <div className="flex min-w-[220px] flex-col gap-2 xl:items-end">

                        <div className="grid w-full gap-2 sm:grid-cols-2 xl:grid-cols-1">
                            <InfoTile label="Pending" value={pendingCount} />
                            <InfoTile label="Declined" value={rejectedCount} />
                        </div>

                        <div className="w-full rounded-xl border border-green-100 bg-green-50 p-3.5 text-left dark:border-green-800/50 dark:bg-green-900/50 xl:text-right">
                            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-green-700 dark:text-green-300">
                                Capacity
                            </p>

                            <p className={`mt-1 text-lg font-black ${TEXT}`}>
                                {availableSpots} spots left
                            </p>
                        </div>

                        <div className="flex w-full flex-wrap gap-2 xl:justify-end">
                            <button
                                type="button"
                                onClick={() => onTogglePanel(event)}
                                className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                                    isOpen
                                        ? 'bg-green-700 text-white dark:bg-green-600'
                                        : `bg-green-100 hover:bg-green-200 dark:bg-green-800/60 dark:hover:bg-green-800 ${TEXT}`
                                }`}
                            >
                                {isOpen ? 'Hide' : 'Registrations'} ({registrations.length})
                            </button>

                            <button
                                type="button"
                                onClick={() => onEdit(event)}
                                className={`inline-flex items-center gap-1.5 rounded-xl border border-green-300 bg-white px-4 py-2 text-sm font-bold transition hover:bg-green-50 dark:border-green-600 dark:bg-transparent dark:hover:bg-green-900/60 ${TEXT}`}
                            >
                                <Pencil className="h-4 w-4 text-green-700 dark:text-green-300" />
                                Edit
                            </button>

                            <button
                                type="button"
                                onClick={() => onDelete(event)}
                                className={`inline-flex items-center gap-1.5 ${BTN_DANGER_SOFT}`}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {isOpen && (
                <RegistrationsPanel
                    event={event}
                    tab={tab}
                    onTabChange={onTabChange}
                    busyKey={busyKey}
                    onApprove={onApprove}
                    onReject={onReject}
                    onRemove={onRemove}
                    onConfirmAttendance={onConfirmAttendance}
                />
            )}
        </div>
    );
}

/* =========================================================
   DECLINE MODAL
========================================================= */

function DeclineModal({ target, onClose, onConfirm }) {
    const [reasonKey, setReasonKey] = useState(DECLINE_REASONS[0].key);
    const [message, setMessage] = useState(DECLINE_REASONS[0].message);
    const [error, setError] = useState('');

    const chooseReason = (key) => {
        const chosen = DECLINE_REASONS.find((item) => item.key === key);

        setReasonKey(key);
        setMessage(chosen ? chosen.message : '');
        setError('');
    };

    const confirm = () => {
        const reason = message.trim();

        if (!reason) {
            setError('Please write the reason for declining.');
            return;
        }

        onConfirm(reason);
    };

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={`w-full max-w-lg p-6 ${MODAL_CARD} rounded-3xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className={`text-xl font-black ${TEXT}`}>
                    Decline Request
                </h3>

                <p className={`mt-1 text-sm ${TEXT}`}>
                    You are declining{' '}
                    <span className="font-black">
                        {target.user?.name ?? 'this user'}
                    </span>
                    {target.event?.title && (
                        <>
                            {' '}for{' '}
                            <span className="font-black text-green-700 dark:text-green-300">
                                {target.event.title}
                            </span>
                        </>
                    )}
                    . They will receive a notification with your reason.
                </p>

                <Field label="Reason" className="mt-5">
                    <select
                        value={reasonKey}
                        onChange={(e) => chooseReason(e.target.value)}
                        className={INPUT}
                    >
                        {DECLINE_REASONS.map((item) => (
                            <option key={item.key} value={item.key}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label="Message the user will see" error={error} className="mt-4">
                    <textarea
                        rows="4"
                        maxLength="500"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                            setError('');
                        }}
                        placeholder="Write why this request was declined..."
                        className={INPUT}
                    />
                </Field>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`rounded-xl bg-green-50 px-5 py-2.5 font-bold transition hover:bg-green-100 dark:bg-green-900/50 dark:hover:bg-green-900/80 ${TEXT}`}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={confirm}
                        className="rounded-xl bg-red-600 px-5 py-2.5 font-bold text-white transition hover:bg-red-700"
                    >
                        Decline Request
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminEvents({ events = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [openEventId, setOpenEventId] = useState(null);
    const [tab, setTab] = useState('pending');
    const [busyKey, setBusyKey] = useState(null);
    const [declineTarget, setDeclineTarget] = useState(null);

    const { toast, show: showToast, dismiss: dismissToast } = useToast();

    /* ------------------------------ events */

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

    const togglePanel = (event) => {
        if (openEventId === event.id) {
            setOpenEventId(null);
            return;
        }

        setOpenEventId(event.id);
        setTab((event.pending_count ?? 0) > 0 ? 'pending' : 'approved');
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

    const confirmAttendance = (reg) =>
        runAction(
            reg,
            'patch',
            `/admin/registrations/${reg.id}/confirm-attendance`,
            `${reg.user?.name ?? 'User'} was marked as attended.`,
        );

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

    /* ------------------------------ decline (with reason) */

    // Opens the decline pop-up. The event is attached so the pop-up can show its title.
    const reject = (reg, event) =>
        setDeclineTarget({ ...reg, event: reg.event ?? event });

    const confirmDecline = (reason) => {
        const reg = declineTarget;

        setDeclineTarget(null);

        runAction(
            reg,
            'patch',
            `/admin/registrations/${reg.id}/reject`,
            `${reg.user?.name ?? 'User'} was declined.`,
            { reason },
        );
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

    const approvalRequiredCount = events.filter(
        (event) => event.requires_approval !== false,
    ).length;

    const stats = [
        { label: 'Total Events', value: events.length, icon: CalendarDays },
        { label: 'Pending Requests', value: pendingRequests.length, icon: Clock },
        { label: 'Approved Participants', value: totalApproved, icon: UserCheck },
        { label: 'Approval Required', value: approvalRequiredCount, icon: ShieldCheck },
    ];

    return (
        <AdminLayout title="Manage Events">
            <Head title="Manage Events" />

            {/* HEADER */}
            <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="border-l-4 border-green-600 pl-5 dark:border-green-400">

                    <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                        <CalendarDays className="h-4 w-4" />
                        Events
                    </span>

                    <h2 className={`mt-2 text-2xl font-black sm:text-3xl ${TEXT}`}>
                        Manage Events
                    </h2>

                    <p className={`mt-1 text-sm ${TEXT}`}>
                        Create events, edit them, and approve who can join.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={() => setShowForm((current) => !current)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-black text-white shadow-xl shadow-green-900/30 transition duration-300 hover:-translate-y-1 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
                >
                    {showForm ? (
                        <>
                            <X className="h-4 w-4" />
                            Close Form
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4" />
                            Create Event
                        </>
                    )}
                </button>

            </section>

            {/* STATS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </section>

            {/* CREATE EVENT FORM */}
            {showForm && (
                <EventForm
                    onClose={() => setShowForm(false)}
                    onDone={() => {
                        setShowForm(false);
                        showToast('success', 'Event created.');
                    }}
                />
            )}

            {/* PENDING REQUESTS INBOX */}
            <JoinRequestsInbox
                requests={pendingRequests}
                busyKey={busyKey}
                onApprove={approve}
                onReject={reject}
                onRemove={remove}
            />

            {/* EVENTS LIST */}
            <section className={`overflow-hidden ${CARD}`}>

                <div className="border-b border-green-100 p-6 dark:border-green-800/50">
                    <h2 className={`text-xl font-black ${TEXT}`}>
                        Existing Events
                    </h2>

                    <p className={`mt-1 text-sm ${TEXT}`}>
                        {events.length} event{events.length !== 1 ? 's' : ''} found.
                    </p>
                </div>

                {events.length === 0 ? (
                    <EmptyState
                        icon={Inbox}
                        title="No events yet"
                        text="Create your first event using the button above."
                    />
                ) : (
                    <div className="divide-y divide-green-100 dark:divide-green-800/50">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                isOpen={openEventId === event.id}
                                tab={tab}
                                onTabChange={setTab}
                                onTogglePanel={togglePanel}
                                onEdit={setEditingEvent}
                                onDelete={deleteEvent}
                                busyKey={busyKey}
                                onApprove={approve}
                                onReject={reject}
                                onRemove={remove}
                                onConfirmAttendance={confirmAttendance}
                            />
                        ))}
                    </div>
                )}

            </section>

            {/* EDIT EVENT MODAL */}
            {editingEvent && (
                <EditEventModal
                    key={editingEvent.id}
                    event={editingEvent}
                    onClose={() => setEditingEvent(null)}
                    onDone={() => {
                        setEditingEvent(null);
                        showToast('success', 'Event updated.');
                    }}
                />
            )}

            {/* DECLINE MODAL */}
            {declineTarget && (
                <DeclineModal
                    target={declineTarget}
                    onClose={() => setDeclineTarget(null)}
                    onConfirm={confirmDecline}
                />
            )}

            {/* TOAST */}
            <Toast toast={toast} onDismiss={dismissToast} />
        </AdminLayout>
    );
}