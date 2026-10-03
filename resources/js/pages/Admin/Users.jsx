import { Head, Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    CalendarDays,
    Megaphone,
    Heart,
    Music,
    ShieldCheck,
    ArrowLeft,
} from 'lucide-react';

export default function UsersPage({ users }) {
    return (
        <>
            <Head title="Manage Users" />

            <div className="min-h-screen bg-gray-100">

                {/* SIDEBAR */}
                <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-white">

                    <div className="flex h-20 items-center gap-3 border-b border-slate-700 px-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                            <ShieldCheck size={24} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">
                                SoulSync
                            </h1>

                            <p className="text-xs text-slate-400">
                                Administration
                            </p>
                        </div>
                    </div>

                    <nav className="mt-6 px-3">

                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Admin Menu
                        </p>

                        <Link
                            href="/admin/dashboard"
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/users"
                            className="mb-2 flex items-center gap-3 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium"
                        >
                            <Users size={20} />
                            Users
                        </Link>

                        <Link
                            href="/events"
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <CalendarDays size={20} />
                            Events
                        </Link>

                        <Link
                            href="/announcements"
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Megaphone size={20} />
                            Announcements
                        </Link>

                        <Link
                            href="/prayer-requests"
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Heart size={20} />
                            Prayer Requests
                        </Link>

                        <Link
                            href="/music-classes"
                            className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                        >
                            <Music size={20} />
                            Music Classes
                        </Link>

                    </nav>
                </aside>


                {/* MAIN CONTENT */}
                <main className="ml-64 min-h-screen">

                    {/* HEADER */}
                    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Manage Users
                            </h2>

                            <p className="text-sm text-gray-500">
                                View all registered SoulSync users
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                A
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Administrator
                                </p>

                                <p className="text-xs text-gray-500">
                                    System Admin
                                </p>
                            </div>

                        </div>

                    </header>


                    {/* CONTENT */}
                    <div className="p-8">

                        <Link
                            href="/admin/dashboard"
                            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            <ArrowLeft size={18} />
                            Back to Dashboard
                        </Link>


                        <div className="rounded-xl bg-white shadow-sm">

                            {/* TITLE */}
                            <div className="border-b px-6 py-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="text-xl font-bold text-gray-800">
                                            Registered Users
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Total users: {users.length}
                                        </p>

                                    </div>

                                    <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
                                        <Users size={24} />
                                    </div>

                                </div>

                            </div>


                            {/* TABLE */}
                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50">

                                        <tr>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                ID
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Role
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Registered
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody className="divide-y divide-gray-200">

                                        {users.map((user) => (

                                            <tr
                                                key={user.id}
                                                className="hover:bg-gray-50"
                                            >

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    #{user.id}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <div className="font-medium text-gray-800">
                                                        {user.name}
                                                    </div>

                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {user.email}
                                                </td>

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            user.role === 'admin'
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                        }`}
                                                    >
                                                        {user.role}
                                                    </span>

                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(
                                                        user.created_at
                                                    ).toLocaleDateString()}
                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>


                            {/* EMPTY STATE */}
                            {users.length === 0 && (

                                <div className="p-10 text-center text-gray-500">
                                    No registered users found.
                                </div>

                            )}

                        </div>

                    </div>

                </main>

            </div>
        </>
    );
}