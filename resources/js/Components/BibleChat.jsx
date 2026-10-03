
import { useState } from 'react';
import {
    BookOpen,
    Search,
    Loader2,
    Sparkles,
    Quote,
    Heart,
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

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-blue-900 to-violet-900 p-1 shadow-xl">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[22px] bg-white">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-6 py-6 sm:px-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
                                <BookOpen className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        Bible Verse Lookup
                                    </h2>

                                    <span className="hidden items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 sm:flex">
                                        <Sparkles className="h-3 w-3" />
                                        SoulSync
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    Find a verse and keep God&apos;s Word close.
                                </p>
                            </div>
                        </div>

                        <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 sm:flex">
                            <Heart className="h-5 w-5 text-indigo-500" />
                        </div>
                    </div>

                    {/* Search */}
                    <form
                        onSubmit={handleSearch}
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search a verse, e.g. John 3:16"
                                disabled={loading}
                                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !query.trim()}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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

                    {/* Suggestions */}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-gray-400">
                            Try:
                        </span>

                        {['John 3:16', 'Psalm 23:1', 'Jeremiah 29:11'].map(
                            (verse) => (
                                <button
                                    key={verse}
                                    type="button"
                                    onClick={() => setQuery(verse)}
                                    className="rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-medium text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50"
                                >
                                    {verse}
                                </button>
                            ),
                        )}
                    </div>
                </div>

                {/* Result Area */}
                <div className="px-6 py-6 sm:px-8">
                    {loading && (
                        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-gray-700">
                                Finding your verse...
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Searching the Bible for you
                            </p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
                                <Search className="h-5 w-5" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-red-700">
                                Verse not found
                            </p>

                            <p className="mt-1 max-w-md text-xs leading-5 text-red-500">
                                Please check the spelling and format, such as
                                &quot;John 3:16&quot; or &quot;Psalm 23:1&quot;.
                            </p>
                        </div>
                    )}

                    {!loading && !error && !result && (
                        <div className="relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/70 px-6 text-center">
                            <div className="absolute right-5 top-5 text-indigo-100">
                                <Quote className="h-12 w-12" />
                            </div>

                            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-sm ring-1 ring-indigo-100">
                                <BookOpen className="h-6 w-6" />
                            </div>

                            <p className="relative mt-4 text-sm font-semibold text-gray-700">
                                Your verse will appear here
                            </p>

                            <p className="relative mt-1 max-w-sm text-xs leading-5 text-gray-400">
                                Search for a Bible verse above to begin your
                                reflection.
                            </p>
                        </div>
                    )}

                    {!loading && result && (
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
                            {/* Decorative quote */}
                            <Quote className="absolute -right-2 -top-5 h-28 w-28 rotate-12 text-white/10" />

                            <div className="relative">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                                            <Sparkles className="h-4 w-4" />
                                        </div>

                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
                                            Scripture for you
                                        </span>
                                    </div>

                                    <BookOpen className="h-5 w-5 text-white/60" />
                                </div>

                                <blockquote className="text-lg font-medium leading-8 sm:text-xl sm:leading-9">
                                    &ldquo;{result.text}&rdquo;
                                </blockquote>

                                <div className="mt-6 flex items-center gap-3">
                                    <div className="h-px w-8 bg-white/40" />

                                    <p className="text-sm font-bold tracking-wide text-white/90">
                                        {result.reference}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 bg-gray-50/70 px-6 py-4 sm:px-8">
                    <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 sm:justify-start">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                            <span>
                                Take a moment to reflect on God&apos;s Word.
                            </span>
                        </div>

                        <span className="text-[10px] font-medium uppercase tracking-wider text-gray-300">
                            Bible Search
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
