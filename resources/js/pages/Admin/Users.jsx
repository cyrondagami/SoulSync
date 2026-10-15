
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    Users,
    ShieldCheck,
    ArrowLeft,
    Mail,
    Calendar,
    Crown,
    Sparkles,
    UserRound,
    UserCheck,
    Activity,
    ArrowUpRight,
} from 'lucide-react';

export default function UsersPage({ users = [] }) {
    const totalUsers = users.length;
    const totalAdmins = users.filter(
        (user) => user.role === 'admin'
    ).length;
    const totalMembers = totalUsers - totalAdmins;

    const formatDate = (date) => {
        if (!date) return 'Not available';

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return 'Not available';
        }

        return parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AdminLayout
            active="users"
            title="Manage Users"
            subtitle="View and manage all registered SoulSync users"
        >
            <Head title="Manage Users" />

            <div className="relative isolate min-h-screen overflow-hidden rounded-3xl bg-gradient-to-br from-white via-green-50/60 to-white p-4 sm:p-6 lg:p-8">
                {/* Background decorations */}
                <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-yellow-100/40 blur-3xl" />

                <div
                    className="pointer-events-none absolute inset-0 -z-10 bg-center bg-no-repeat opacity-[0.035]"
                    style={{
                        backgroundImage: "url('/images/logo.png')",
                        backgroundSize: 'min(65%, 520px)',
                    }}
                />

                <div className="relative mx-auto max-w-7xl">
                    {/* Back navigation */}
                    <Link
                        href="/admin/dashboard"
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white/90 px-4 py-2.5 text-sm font-bold text-green-800 shadow-sm transition hover:-translate-x-1 hover:border-green-300 hover:bg-green-50"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    {/* Page heading */}
                    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            

                            <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
                                Manage{' '}
                                <span className="text-green-700">
                                    Users
                                </span>
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                                Manage your community and keep track of
                                registered SoulSync members in one place.
                            </p>
                        </div>

                        
                    </div>

                    {/* Summary cards */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <div className="group rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        Total Users
                                    </p>
                                    <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                                        {totalUsers}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500">
                                        All registered accounts
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                                    <Users size={23} />
                                </div>
                            </div>

                            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-green-50">
                                <div className="h-full w-full rounded-full bg-green-600" />
                            </div>
                        </div>

                        <div className="group rounded-2xl border border-red-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        Administrators
                                    </p>
                                    <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                                        {totalAdmins}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Accounts with admin access
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                    <Crown size={23} />
                                </div>
                            </div>

                            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-red-50">
                                <div
                                    className="h-full rounded-full bg-red-500"
                                    style={{
                                        width: totalUsers
                                            ? `${(totalAdmins / totalUsers) * 100}%`
                                            : '0%',
                                    }}
                                />
                            </div>
                        </div>

                        <div className="group rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-yellow-900/5 sm:col-span-2 xl:col-span-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">
                                        Community Members
                                    </p>
                                    <p className="mt-3 text-3xl font-black tracking-tight text-gray-950">
                                        {totalMembers}
                                    </p>
                                    <p className="mt-2 text-xs text-gray-500">
                                        Registered non-admin accounts
                                    </p>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-500 group-hover:text-white">
                                    <UserRound size={23} />
                                </div>
                            </div>

                            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-yellow-50">
                                <div
                                    className="h-full rounded-full bg-yellow-500"
                                    style={{
                                        width: totalUsers
                                            ? `${(totalMembers / totalUsers) * 100}%`
                                            : '0%',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main users panel */}
                    <section className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-950/[0.04]">
                        {/* Panel header */}
                        <div className="border-b border-gray-100 px-5 py-6 sm:px-7">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-700/20">
                                        <Users size={24} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-black text-gray-950">
                                            Registered Users
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Overview of your SoulSync community
                                        </p>
                                    </div>
                                </div>

                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3.5 py-2 text-xs font-bold text-green-800">
                                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                    {totalUsers} {totalUsers === 1 ? 'Account' : 'Accounts'}
                                </div>
                            </div>
                        </div>

                        {/* Users table */}
                        {totalUsers > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[760px] text-left">
                                        <thead>
                                            <tr className="border-b border-green-100 bg-green-50/70">
                                                {[
                                                    'User',
                                                    'Email Address',
                                                    'Role',
                                                    'Date Registered',
                                                ].map((heading) => (
                                                    <th
                                                        key={heading}
                                                        className="px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-green-900"
                                                    >
                                                        {heading}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {users.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="group transition-colors hover:bg-green-50/50"
                                                >
                                                    {/* User information */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-green-100 bg-gradient-to-br from-green-100 to-green-50 text-base font-black text-green-800 transition group-hover:from-green-700 group-hover:to-green-600 group-hover:text-white">
                                                                {user.name
                                                                    ? user.name.charAt(0).toUpperCase()
                                                                    : 'U'}
                                                            </div>

                                                            <div>
                                                                <p className="font-bold text-gray-900">
                                                                    {user.name || 'Unnamed User'}
                                                                </p>
                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    User ID: #{user.id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2.5">
                                                            <Mail
                                                                size={16}
                                                                className="shrink-0 text-green-700"
                                                            />
                                                            <span className="text-sm text-gray-700">
                                                                {user.email}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Role */}
                                                    <td className="px-6 py-5">
                                                        {user.role === 'admin' ? (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                                                <Crown size={14} />
                                                                Administrator
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-bold text-green-800">
                                                                <Sparkles size={14} />
                                                                Member
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* Registration date */}
                                                    <td className="px-6 py-5">
                                                        <div className="flex items-center gap-2.5">
                                                            <Calendar
                                                                size={16}
                                                                className="shrink-0 text-green-700"
                                                            />
                                                            <span className="text-sm text-gray-700">
                                                                {formatDate(user.created_at)}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Table footer */}
                                <div className="flex flex-col justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center sm:px-7">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <UserCheck
                                            size={17}
                                            className="text-green-700"
                                        />
                                        Showing{' '}
                                        <span className="font-bold text-gray-900">
                                            {totalUsers}
                                        </span>{' '}
                                        registered {totalUsers === 1 ? 'user' : 'users'}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                                        <ShieldCheck
                                            size={15}
                                            className="text-green-700"
                                        />
                                        Secure administration
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Empty state */
                            <div className="px-6 py-16 text-center sm:py-20">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700 ring-1 ring-green-100">
                                    <Users size={34} />
                                </div>

                                <h3 className="mt-5 text-xl font-black text-gray-950">
                                    No registered users yet
                                </h3>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                                    Registered SoulSync accounts will appear here
                                    when users join your community.
                                </p>

                                <Link
                                    href="/admin/dashboard"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800"
                                >
                                    Return to Dashboard
                                    <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Bottom information */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white/90 p-4 shadow-sm">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                <Activity size={21} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">
                                    User Management
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Account overview available
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-white/90 p-4 shadow-sm">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Crown size={21} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">
                                    Administrator Access
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Role indicators enabled
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-yellow-100 bg-white/90 p-4 shadow-sm sm:col-span-2 lg:col-span-1">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
                                <ShieldCheck size={21} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">
                                    System Status
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    SoulSync administration
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs font-medium text-gray-400">
                        SoulSync · Empowering Youth With Purpose
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
