
import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Heart,
    Megaphone,
    Music,
    Settings,
    Sparkles,
    Users,
    HandHeart,
    BarChart3,
} from 'lucide-react';

import AdminLayout from '@/Layouts/AdminLayout';

const formatNumber = (value) =>
    Number(value ?? 0).toLocaleString();

const MANAGEMENT_ITEMS = [
    {
        title: 'User Management',
        description: 'View and manage SoulSync members.',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Events Management',
        description: 'Manage upcoming community events.',
        href: '/admin/events',
        icon: CalendarDays,
    },
    {
        title: 'Announcements',
        description: 'Publish important community updates.',
        href: '/admin/announcements',
        icon: Megaphone,
    },
    {
        title: 'Prayer Requests',
        description: 'Review submitted prayer requests.',
        href: '/admin/prayer-requests',
        icon: Heart,
    },
    {
        title: 'Music Classes',
        description: 'Manage music classes and activities.',
        href: '/admin/music-classes',
        icon: Music,
    },
];

const SUMMARY_ITEMS = [
    {
        key: 'totalUsers',
        title: 'Registered Users',
        icon: Users,
        color: 'bg-emerald-600',
        light: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
        key: 'totalEvents',
        title: 'Total Events',
        icon: CalendarDays,
        color: 'bg-green-600',
        light: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
    },
    {
        key: 'totalAnnouncements',
        title: 'Announcements',
        icon: Megaphone,
        color: 'bg-lime-600',
        light: 'bg-lime-50 text-lime-700 dark:bg-lime-950 dark:text-lime-300',
    },
    {
        key: 'totalPrayerRequests',
        title: 'Prayer Requests',
        icon: HandHeart,
        color: 'bg-teal-600',
        light: 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300',
    },
];

function SectionHeading({ icon: Icon, title, description }) {
    return (
        <div className="mb-5 flex items-start gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/60 dark:text-green-300">
                <Icon size={22} />
            </div>

            <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

function SummaryCard({ item, value }) {
    const Icon = item.icon;

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-green-900 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3">
                <div className={`rounded-xl p-3 ${item.light}`}>
                    <Icon size={22} />
                </div>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 dark:bg-green-950 dark:text-green-300">
                    Live count
                </span>
            </div>

            <p className="mt-5 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {item.title}
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900 dark:text-white">
                {formatNumber(value)}
            </p>
        </div>
    );
}

function WeeklyActivityChart({ data }) {
    const chartData = Array.isArray(data) ? data : [];

    const maxCount = Math.max(
        1,
        ...chartData.map((item) => Number(item.count) || 0),
    );

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm dark:border-green-900 dark:bg-gray-900 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">
                        Weekly Activity
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        New records created in the last seven days
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950 dark:text-green-300">
                    <Activity size={15} />
                    Last 7 days
                </div>
            </div>

            {chartData.length > 0 ? (
                <div className="mt-8 flex h-60 items-end gap-2 border-b border-gray-200 pb-2 dark:border-gray-700 sm:gap-4">
                    {chartData.map((item, index) => {
                        const count = Number(item.count) || 0;
                        const height =
                            count > 0
                                ? Math.max(8, (count / maxCount) * 100)
                                : 3;

                        return (
                            <div
                                key={`${item.label}-${index}`}
                                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                            >
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                                    {formatNumber(count)}
                                </span>

                                <div className="flex h-[75%] w-full items-end justify-center">
                                    <div
                                        title={`${item.label}: ${count} records`}
                                        className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-green-700 to-emerald-400 transition-all duration-500 hover:from-green-800 hover:to-lime-400"
                                        style={{ height: `${height}%` }}
                                    />
                                </div>

                                <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 sm:text-xs">
                                    {item.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="mt-6 flex h-60 flex-col items-center justify-center rounded-xl bg-green-50 text-center dark:bg-green-950/40">
                    <BarChart3 size={38} className="text-green-600 dark:text-green-300" />

                    <p className="mt-3 font-bold text-gray-800 dark:text-white">
                        No activity data available
                    </p>

                    <p className="mt-1 px-4 text-sm text-gray-500 dark:text-gray-400">
                        Data will appear here when the server provides weekly activity.
                    </p>
                </div>
            )}
        </div>
    );
}

function ContentBreakdown({ analytics }) {
    const items = [
        {
            label: 'Registered Users',
            value: Number(analytics.totalUsers) || 0,
        },
        {
            label: 'Events',
            value: Number(analytics.totalEvents) || 0,
        },
        {
            label: 'Announcements',
            value: Number(analytics.totalAnnouncements) || 0,
        },
        {
            label: 'Prayer Requests',
            value: Number(analytics.totalPrayerRequests) || 0,
        },
    ];

    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm dark:border-green-900 dark:bg-gray-900 sm:p-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white">
                Data Overview
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Distribution of available records
            </p>

            <div className="mt-6 space-y-5">
                {items.map((item, index) => {
                    const percentage =
                        total > 0 ? (item.value / total) * 100 : 0;

                    const colors = [
                        'bg-emerald-600',
                        'bg-green-500',
                        'bg-lime-500',
                        'bg-teal-500',
                    ];

                    return (
                        <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                <span className="font-semibold text-gray-700 dark:text-gray-300">
                                    {item.label}
                                </span>

                                <span className="font-black text-gray-900 dark:text-white">
                                    {formatNumber(item.value)}
                                </span>
                            </div>

                            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${colors[index]}`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-7 rounded-xl bg-green-50 p-4 dark:bg-green-950/40">
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Total records across these categories
                </p>
                <p className="mt-1 text-2xl font-black text-green-900 dark:text-white">
                    {formatNumber(total)}
                </p>
            </div>
        </div>
    );
}

export default function Dashboard({ analytics = {} }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    const hour = currentTime.getHours();

    const greeting =
        hour < 12
            ? 'Good morning'
            : hour < 18
              ? 'Good afternoon'
              : 'Good evening';

    const weeklyActivity = analytics.weeklyActivity ?? [];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard | SoulSync" />

            <div className="min-h-screen space-y-8 bg-gray-50 p-4 dark:bg-gray-950 sm:p-6 lg:p-8">
                {/* Welcome banner */}
                <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 p-6 text-white shadow-lg sm:p-8">
                    <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[30px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-20 right-36 h-48 w-48 rounded-full bg-lime-400/10 blur-2xl" />

                    <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold">
                                <Sparkles size={15} />
                                SOULSYNC ADMIN CENTER
                            </div>

                            <h1 className="text-3xl font-black sm:text-4xl">
                               {greeting} Admin!
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-green-50 sm:text-base">
                                Manage your community, monitor activity, and
                                keep everything connected in one place.
                            </p>

                            <p className="mt-4 flex items-center gap-2 text-sm text-green-100">
                                <CalendarDays size={16} />
                                {currentTime.toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/20 bg-white/10 sm:self-center">
                            <Heart size={42} />
                        </div>
                    </div>
                </section>

                {/* System overview */}
                <section>
                    <SectionHeading
                        icon={Activity}
                        title="System Overview"
                        description="Current totals from your SoulSync database."
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {SUMMARY_ITEMS.map((item) => (
                            <SummaryCard
                                key={item.key}
                                item={item}
                                value={analytics[item.key] ?? 0}
                            />
                        ))}
                    </div>
                </section>

                {/* Visual analytics */}
                <section>
                    <SectionHeading
                        icon={BarChart3}
                        title="Visual Analytics"
                        description="Review weekly activity and the distribution of community records."
                    />

                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
                        <div className="xl:col-span-3">
                            <WeeklyActivityChart data={weeklyActivity} />
                        </div>

                        <div className="xl:col-span-2">
                            <ContentBreakdown analytics={analytics} />
                        </div>
                    </div>
                </section>

                {/* Management shortcuts */}
                <section>
                    <SectionHeading
                        icon={Settings}
                        title="System Management"
                        description="Quick access to your administrative modules."
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {MANAGEMENT_ITEMS.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="group flex items-start gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-green-300 hover:shadow-md dark:border-green-900 dark:bg-gray-900 dark:hover:border-green-700"
                                >
                                    <div className="rounded-xl bg-green-50 p-3 text-green-700 transition group-hover:bg-green-700 group-hover:text-white dark:bg-green-950 dark:text-green-300">
                                        <Icon size={23} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-black text-gray-900 dark:text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
                                            {item.description}
                                        </p>

                                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-green-700 dark:text-green-300">
                                            Open module
                                            <ArrowRight
                                                size={15}
                                                className="transition group-hover:translate-x-1"
                                            />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* System status */}
                <section>
                    <SectionHeading
                        icon={CheckCircle2}
                        title="System Status"
                        description="Basic interface status indicators."
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[
                            {
                                title: 'Admin Dashboard',
                                description: 'Dashboard interface loaded',
                            },
                            {
                                title: 'Analytics Interface',
                                description: 'Charts and summaries available',
                            },
                            {
                                title: 'Management Links',
                                description: 'Quick-access navigation ready',
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 dark:border-green-900 dark:bg-gray-900"
                            >
                                <CheckCircle2
                                    size={22}
                                    className="shrink-0 text-green-600 dark:text-green-400"
                                />

                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">
                                        {item.title}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="border-t border-gray-200 pt-5 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                    SoulSync Admin Center · {currentTime.getFullYear()}
                </footer>
            </div>
        </AdminLayout>
    );
}
