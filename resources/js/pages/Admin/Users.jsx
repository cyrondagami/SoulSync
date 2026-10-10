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
} from 'lucide-react';

export default function UsersPage({ users }) {
    return (
        <AdminLayout
            active="users"
            title="Manage Users"
            subtitle="View and manage all registered SoulSync users"
        >
            <Head title="Manage Users" />

            {/* BACK BUTTON */}
            <Link
                href="/admin/dashboard"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-green-300"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </Link>

            {/* PAGE CARD */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* CARD HEADER */}
                <div className="border-b border-gray-200 px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-black">
                                    Registered Users
                                </h3>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                                    Active
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-gray-600">
                                Total registered users:{' '}
                                <span className="font-bold text-black">
                                    {users.length}
                                </span>
                            </p>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <Users size={25} />
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                {['ID', 'Name', 'Email', 'Role', 'Registered'].map((h) => (
                                    <th
                                        key={h}
                                        className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-black"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="transition hover:bg-gray-50">
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-semibold text-black">
                                            #{user.id}
                                        </span>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                                {user.name
                                                    ? user.name.charAt(0).toUpperCase()
                                                    : 'U'}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-black">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    SoulSync Member
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-gray-500" />
                                            <span className="text-sm text-black">
                                                {user.email}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-5">
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700">
                                                <Crown size={14} />
                                                Administrator
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                                                <Sparkles size={14} />
                                                Member
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-500" />
                                            <span className="text-sm text-black">
                                                {new Date(user.created_at).toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* EMPTY STATE */}
                {users.length === 0 && (
                    <div className="px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <Users size={30} className="text-gray-500" />
                        </div>
                        <h4 className="text-lg font-bold text-black">
                            No registered users
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                            There are currently no users registered in SoulSync.
                        </p>
                    </div>
                )}

                {/* CARD FOOTER */}
                {users.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                <p className="text-sm text-gray-700">
                                    User management is active
                                </p>
                            </div>
                            <p className="text-xs text-gray-500">
                                SoulSync Administration
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM INFORMATION CARDS */}
            <div className="mt-6 grid gap-5 md:grid-cols-3">
                <div className="rounded-xl bg-white p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                            <Users size={20} className="text-green-700" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Total Users
                            </p>
                            <p className="text-xl font-bold text-black">{users.length}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                            <Crown size={20} className="text-red-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Admin Access
                            </p>
                            <p className="text-sm font-bold text-black">Protected</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-5 shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                            <ShieldCheck size={20} className="text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                System Status
                            </p>
                            <p className="text-sm font-bold text-black">Operational</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}