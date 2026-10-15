import { useState } from 'react';
import {
    BookOpen,
    Search,
    Loader2,
    Sparkles,
    Quote,
    Heart,
    Cross,
    ChevronRight,
} from 'lucide-react';

export default function BibleChat() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim() || loading) return;

        setLoading(true);
        setError(false);
        setResult(null);

        try {
            const ref = encodeURIComponent(query.trim());

            const res = await fetch(`https://bible-api.com/${ref}`);
            const data = await res.json();

            if (data.error) {
                setError(true);
            } else {
                setResult({
                    reference: data.reference,
                    text: data.text.trim(),
                });
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const suggestions = ['John 3:16', 'Psalm 23:1', 'Jeremiah 29:11'];

    return (
        <section className="relative overflow-hidden rounded-[28px] border border-green-900/10 bg-white shadow-2xl shadow-green-950/20 transition-colors duration-300 dark:border-green-800/60 dark:bg-green-950/60 dark:shadow-black/30">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
            <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

            <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-500 to-yellow-400" />

            <div className="relative">
                <div className="border-b border-gray-100 bg-gradient-to-br from-green-50 via-white to-yellow-50 px-6 py-7 dark:border-green-800/50 dark:from-green-900/70 dark:via-green-950/80 dark:to-green-900/60 sm:px-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">
                                <BookOpen className="h-7 w-7" />
                                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-green-950">
                                    <Cross className="h-2.5 w-2.5" />
                                </div>
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-black tracking-tight text-green-950 dark:text-white sm:text-2xl">
                                        Bible Verse Lookup
                                    </h2>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-green-800 dark:bg-green-800/50 dark:text-green-200">
                                        <Sparkles className="h-3 w-3" />
                                        SoulSync
                                    </span>
                                </div>

                                <p className="mt-1.5 max-w-lg text-sm leading-6 text-gray-600 dark:text-green-100/70">
                                    Find a verse, reflect on God&apos;s Word, and keep His message close to your heart.
                                </p>
                            </div>
                        </div>

                        <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm sm:flex dark:border-red-900/50 dark:bg-green-900/80">
                            <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="mt-7 flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search a verse, e.g. John 3:16"
                                disabled={loading}
                                className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm font-medium text-black shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:bg-gray-50 dark:border-green-700 dark:bg-green-950/60 dark:text-white dark:placeholder:text-green-200/50 dark:focus:ring-green-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-green-700 px-7 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 dark:bg-green-600 dark:hover:bg-green-500"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="h-4 w-4" />
                                    Find Verse
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-xs font-semibold text-gray-500 dark:text-green-200/70">
                            Try:
                        </span>

                        {suggestions.map((verse) => (
                            <button
                                key={verse}
                                type="button"
                                onClick={() => setQuery(verse)}
                                className="rounded-full border border-green-200 bg-white px-3.5 py-1.5 text-xs font-bold text-green-800 shadow-sm transition hover:border-green-400 hover:bg-green-50 dark:border-green-700 dark:bg-green-950/60 dark:text-green-100 dark:hover:bg-green-900"
                            >
                                {verse}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-6 py-7 sm:px-8">
                    {loading && (
                        <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50/60 dark:border-green-800/60 dark:bg-green-900/40">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-green-950/60">
                                <Loader2 className="h-7 w-7 animate-spin text-green-700 dark:text-green-300" />
                            </div>
                            <p className="mt-5 text-sm font-black text-black dark:text-white">
                                Finding your verse...
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-green-200/70">
                                Searching Scripture for you
                            </p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center dark:border-red-900/60 dark:bg-red-950/20">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300">
                                <Search className="h-6 w-6" />
                            </div>
                            <p className="mt-4 text-sm font-black text-red-800 dark:text-red-300">
                                Verse not found
                            </p>
                            <p className="mt-1 max-w-md text-xs leading-5 text-red-600 dark:text-red-200/80">
                                Please check the spelling and format. Try something like "John 3:16" or "Psalm 23:1".
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setError(false);
                                    setQuery('');
                                }}
                                className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-red-700 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100 dark:bg-green-950/60 dark:text-red-200 dark:ring-red-900"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {!loading && !error && !result && (
                        <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-dashed border-green-200 bg-gradient-to-br from-green-50 via-white to-yellow-50 px-5 py-8 dark:border-green-800/60 dark:from-green-900/50 dark:via-green-950/80 dark:to-green-900/40 sm:px-8">
                            <Quote className="absolute right-5 top-5 h-16 w-16 text-green-100 dark:text-green-800/50" />
                            <Quote className="absolute bottom-5 left-5 h-12 w-12 rotate-180 text-yellow-100 dark:text-yellow-900/40" />

                            <div className="relative z-10 flex min-h-[240px] flex-col items-center justify-center text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">
                                    <BookOpen className="h-7 w-7" />
                                </div>

                                <p className="mt-5 text-base font-black text-black dark:text-white sm:text-lg">
                                    Your Scripture will appear here
                                </p>

                                <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-500 dark:text-green-200/70 sm:text-sm">
                                    Search for a Bible verse above and take a moment to reflect on God's Word.
                                </p>

                                <div className="mt-5 flex w-fit items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-yellow-800 ring-1 ring-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-200 dark:ring-yellow-900/60">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Faith • Hope • Purpose
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && result && (
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-950 via-green-900 to-red-950 p-7 text-white shadow-xl sm:p-9">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl" />
                            <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-green-400/10 blur-2xl" />
                            <Quote className="absolute -right-2 -top-4 h-32 w-32 rotate-12 text-white/5" />

                            <div className="relative">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-green-950 shadow-lg">
                                            <Sparkles className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                                                Scripture for you
                                            </p>
                                            <p className="mt-0.5 text-xs text-white/60">A moment for reflection</p>
                                        </div>
                                    </div>

                                    <BookOpen className="h-5 w-5 text-white/50" />
                                </div>

                                <blockquote className="mt-7 text-lg font-medium leading-8 text-white sm:text-xl sm:leading-9">
                                    “{result.text}”
                                </blockquote>

                                <div className="mt-7 flex items-center gap-3">
                                    <div className="h-px w-8 bg-yellow-400/70" />
                                    <p className="text-sm font-black tracking-wide text-yellow-300">
                                        {result.reference}
                                    </p>
                                </div>

                                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                    <div className="flex items-start gap-3">
                                        <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-red-400 text-red-400" />
                                        <div>
                                            <p className="text-xs font-bold text-white">Take a moment to reflect.</p>
                                            <p className="mt-1 text-xs leading-5 text-white/60">
                                                Let this Scripture speak to your heart and guide your next step.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-green-800/50 dark:bg-green-950/60 sm:px-8">
                    <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-green-100/70 sm:justify-start">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                            <span>Take a moment to reflect on God's Word.</span>
                        </div>

                        <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-green-700 dark:text-green-300">
                            <span>SoulSync</span>
                            <ChevronRight className="h-3 w-3" />
                            <span>Bible Search</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}