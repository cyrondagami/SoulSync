
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import {
    Trophy,
    Crown,
    Sparkles,
    Star,
} from 'lucide-react';

const podiumStyle = {
    1: {
        height: 'h-48 sm:h-60',
        bar: 'from-green-600 to-green-800 dark:from-green-500 dark:to-green-700',
        avatar: 'h-20 w-20 sm:h-28 sm:w-28 text-3xl sm:text-4xl',
    },
    2: {
        height: 'h-36 sm:h-44',
        bar: 'from-green-500 to-green-700 dark:from-green-600 dark:to-green-800',
        avatar: 'h-16 w-16 sm:h-24 sm:w-24 text-2xl sm:text-3xl',
    },
    3: {
        height: 'h-28 sm:h-32',
        bar: 'from-green-400 to-green-600 dark:from-green-700 dark:to-green-900',
        avatar: 'h-16 w-16 sm:h-24 sm:w-24 text-2xl sm:text-3xl',
    },
};

const getInitials = (name = '') =>
    name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'NA';

function PodiumColumn({ entry, place }) {
    const style = podiumStyle[place];

    if (!entry) {
        return (
            <div className="flex flex-1 flex-col items-center justify-end">
                <div
                    className={`flex w-full items-start justify-center rounded-t-2xl border-2 border-dashed border-green-300 bg-green-50 pt-4 dark:border-green-600/50 dark:bg-green-900/30 ${style.height}`}
                >
                    <span className="text-5xl font-black text-green-300 dark:text-green-700">
                        {place}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col items-center justify-end">
            <div className="mb-3 flex flex-col items-center text-center">
                {place === 1 && (
                    <Crown className="mb-1 h-8 w-8 text-green-700 dark:text-green-300" />
                )}

                <div
                    className={`flex items-center justify-center rounded-full border-4 border-white bg-green-700 font-black text-white shadow-xl shadow-green-900/20 dark:border-green-900 dark:bg-green-600 ${style.avatar}`}
                >
                    {getInitials(entry.name)}
                </div>

                <p className="mt-3 max-w-[7rem] truncate text-sm font-black text-green-950 dark:text-white sm:max-w-[10rem] sm:text-base">
                    {entry.name}
                </p>

                <p className="mt-1 text-xs text-gray-600 dark:text-green-100/70">
                    {entry.activities_completed ?? 0} activities
                </p>

                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-800 dark:bg-green-800/60 dark:text-green-100">
                    <Star className="h-3 w-3" />
                    {entry.weekly_points ?? 0} pts
                </p>
            </div>

            <div
                className={`relative flex w-full items-start justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b pt-4 shadow-xl shadow-green-900/20 ${style.bar} ${style.height}`}
            >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/15 blur-2xl" />

                <span className="relative text-6xl font-black text-white sm:text-7xl">
                    {place}
                </span>
            </div>
        </div>
    );
}

export default function WeeklyRanking({
    leaderboard = [],
    weekLabel = '',
    previousWeek = '',
    nextWeek = '',
    selectedWeek = '',
}) {
    const sortedLeaderboard = [...leaderboard].sort(
        (a, b) =>
            Number(b.weekly_points ?? 0) -
            Number(a.weekly_points ?? 0)
    );

    return (
        <AdminLayout
            title="Weekly Ranking"
            subtitle="Track participation and celebrate the week's top performers."
        >
            <Head title="Weekly Ranking" />

            <div className="space-y-6">
                {/* PODIUM BOX */}
                {sortedLeaderboard.length > 0 && (
                    <div className="relative overflow-hidden rounded-3xl border border-green-100 bg-white px-4 pb-6 pt-8 shadow-xl shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30 sm:px-8">
                        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-green-300/20 blur-3xl" />

                        <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-green-400/15 blur-3xl" />

                        <div className="relative text-center">
                            <span className="text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-300">
                                Top 3
                            </span>

                            <h3 className="mt-2 text-2xl font-black text-green-950 dark:text-white sm:text-3xl">
                                This Week's Leaders
                            </h3>

                            {weekLabel && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                    {weekLabel}
                                </p>
                            )}
                        </div>

                        <div className="relative mx-auto mt-8 max-w-2xl">
                            <div className="flex items-end gap-3 sm:gap-5">
                                <PodiumColumn
                                    entry={sortedLeaderboard[1]}
                                    place={2}
                                />

                                <PodiumColumn
                                    entry={sortedLeaderboard[0]}
                                    place={1}
                                />

                                <PodiumColumn
                                    entry={sortedLeaderboard[2]}
                                    place={3}
                                />
                            </div>

                            <div className="h-5 w-full rounded-xl bg-green-950 shadow-xl shadow-green-900/30 dark:bg-green-800" />
                        </div>

                        {/* MOTIVATIONAL QUOTE INSIDE THE SAME BOX */}
                        <p className="relative mx-auto mt-6 max-w-2xl px-2 text-center text-sm italic leading-7 text-gray-500 dark:text-green-100/70 sm:text-base">
                            "Keep growing, keep believing, and never stop doing your best. Every small step forward is still progress."
                        </p>
                    </div>
                )}

                {/* FULL RANKING TABLE */}
                <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/10 dark:border-green-800/50 dark:bg-green-900/40 dark:shadow-black/30">
                    <div className="flex flex-col gap-3 border-b border-green-100 bg-gradient-to-r from-green-100 via-green-50 to-white p-5 dark:border-green-800/50 dark:from-green-800/70 dark:via-green-900/60 dark:to-green-950/60 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-xl font-black text-green-950 dark:text-white">
                                Full Ranking
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-green-100/70">
                                Ranked by points earned in the selected week.
                            </p>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black uppercase tracking-widest text-green-800 dark:bg-green-950 dark:text-green-100">
                            <Sparkles className="h-4 w-4 text-green-600 dark:text-green-300" />
                            {sortedLeaderboard.length} members
                        </div>
                    </div>

                    {sortedLeaderboard.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 dark:bg-green-800/60">
                                <Trophy className="h-8 w-8 text-green-700 dark:text-green-300" />
                            </div>

                            <h3 className="mt-5 text-xl font-black text-green-950 dark:text-white">
                                No rankings yet
                            </h3>

                            <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
                                No points were earned for this week yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-green-50 text-xs font-black uppercase tracking-widest text-green-800 dark:bg-green-900/60 dark:text-green-200">
                                    <tr>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">Member</th>
                                        <th className="px-6 py-4">Events</th>
                                        <th className="px-6 py-4">Classes</th>
                                        <th className="px-6 py-4">Activities</th>
                                        <th className="px-6 py-4">Weekly Points</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {sortedLeaderboard.map((entry, index) => (
                                        <tr
                                            key={entry.user_id}
                                            className="border-t border-green-100 transition hover:bg-green-50/60 dark:border-green-800/50 dark:hover:bg-green-900/50"
                                        >
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-xl px-2 text-sm font-black ${
                                                        index < 3
                                                            ? 'bg-green-700 text-white dark:bg-green-600'
                                                            : 'bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-100'
                                                    }`}
                                                >
                                                    #{index + 1}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-sm font-black text-white dark:bg-green-600">
                                                        {getInitials(entry.name)}
                                                    </div>

                                                    <span className="font-bold text-green-950 dark:text-white">
                                                        {entry.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700 dark:text-green-50/85">
                                                {entry.events_attended ?? 0}
                                            </td>

                                            <td className="px-6 py-4 text-gray-700 dark:text-green-50/85">
                                                {entry.music_classes_completed ?? 0}
                                            </td>

                                            <td className="px-6 py-4 font-bold text-green-950 dark:text-white">
                                                {entry.activities_completed ?? 0}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-black text-green-800 dark:bg-green-800/60 dark:text-green-100">
                                                    <Star className="h-3.5 w-3.5" />
                                                    {entry.weekly_points ?? 0}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
