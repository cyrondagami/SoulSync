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
    MessageCircle,
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

    const suggestions = [
        'John 3:16',
        'Psalm 23:1',
        'Jeremiah 29:11',
    ];

    return (
        <>
            {/* =========================================================
                SOULSYNC MASCOT ANIMATIONS
            ========================================================== */}
            <style>{`
                @keyframes soulFloat {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-9px);
                    }
                }

                @keyframes soulBlink {
                    0%,
                    42%,
                    46%,
                    100% {
                        transform: scaleY(1);
                    }

                    44% {
                        transform: scaleY(0.08);
                    }
                }

                @keyframes soulGlow {
                    0%,
                    100% {
                        opacity: .45;
                        transform: scale(1);
                    }

                    50% {
                        opacity: 1;
                        transform: scale(1.15);
                    }
                }

                @keyframes soulWave {
                    0%,
                    100% {
                        transform: rotate(15deg);
                    }

                    50% {
                        transform: rotate(-10deg);
                    }
                }

                @keyframes soulSparkle {
                    0%,
                    100% {
                        opacity: .25;
                        transform: scale(.8) rotate(0deg);
                    }

                    50% {
                        opacity: 1;
                        transform: scale(1.15) rotate(15deg);
                    }
                }

                @keyframes soulTalk {
                    0%,
                    100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-3px);
                    }
                }

                .soul-float {
                    animation: soulFloat 3.8s ease-in-out infinite;
                }

                .soul-blink {
                    animation: soulBlink 5s ease-in-out infinite;
                }

                .soul-glow {
                    animation: soulGlow 1.8s ease-in-out infinite;
                }

                .soul-wave {
                    animation: soulWave 3s ease-in-out infinite;
                    transform-origin: top center;
                }

                .soul-sparkle {
                    animation: soulSparkle 2s ease-in-out infinite;
                }

                .soul-talk {
                    animation: soulTalk 2.5s ease-in-out infinite;
                }

                .soul-bot-shadow {
                    animation: soulGlow 2.5s ease-in-out infinite;
                }

                @media (max-width: 639px) {
                    .soul-mascot {
                        transform: scale(.82);
                        transform-origin: center bottom;
                    }
                }
            `}</style>

            {/* =========================================================
                MAIN BIBLE CHAT CARD
            ========================================================== */}
            <section className="relative overflow-hidden rounded-[28px] border border-green-900/10 bg-white shadow-2xl shadow-green-950/20">

                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-600/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />

                <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />

                {/* Top accent */}
                <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-500 to-yellow-400" />

                <div className="relative">

                    {/* =================================================
                        HEADER
                    ================================================== */}
                    <div className="border-b border-gray-100 bg-gradient-to-br from-green-50 via-white to-yellow-50 px-6 py-7 sm:px-8">

                        <div className="flex items-start justify-between gap-4">

                            <div className="flex items-start gap-4">

                                {/* Bible icon */}
                                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20">

                                    <BookOpen className="h-7 w-7" />

                                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-green-950">
                                        <Cross className="h-2.5 w-2.5" />
                                    </div>

                                </div>

                                <div>

                                    <div className="flex flex-wrap items-center gap-2">

                                        <h2 className="text-xl font-black tracking-tight text-black sm:text-2xl">
                                            Bible Verse Lookup
                                        </h2>

                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-green-800">
                                            <Sparkles className="h-3 w-3" />
                                            SoulSync
                                        </span>

                                    </div>

                                    <p className="mt-1.5 max-w-lg text-sm leading-6 text-gray-600">
                                        Find a verse, reflect on God&apos;s Word,
                                        and keep His message close to your heart.
                                    </p>

                                </div>

                            </div>

                            {/* Heart */}
                            <div className="hidden h-11 w-11 items-center justify-center rounded-full border border-red-100 bg-white shadow-sm sm:flex">
                                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                            </div>

                        </div>

                        {/* =================================================
                            SEARCH
                        ================================================== */}
                        <form
                            onSubmit={handleSearch}
                            className="mt-7 flex flex-col gap-3 sm:flex-row"
                        >

                            <div className="relative flex-1">

                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search a verse, e.g. John 3:16"
                                    disabled={loading}
                                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm font-medium text-black shadow-sm outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:bg-gray-50"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading || !query.trim()}
                                className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-green-700 px-7 text-sm font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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
                        <div className="mt-4 flex flex-wrap items-center gap-2">

                            <span className="mr-1 text-xs font-semibold text-gray-500">
                                Try:
                            </span>

                            {suggestions.map((verse) => (
                                <button
                                    key={verse}
                                    type="button"
                                    onClick={() => setQuery(verse)}
                                    className="rounded-full border border-green-200 bg-white px-3.5 py-1.5 text-xs font-bold text-green-800 shadow-sm transition hover:border-green-400 hover:bg-green-50"
                                >
                                    {verse}
                                </button>
                            ))}

                        </div>

                    </div>

                    {/* =================================================
                        RESULT AREA
                    ================================================== */}
                    <div className="px-6 py-7 sm:px-8">

                        {/* =================================================
                            LOADING
                        ================================================== */}
                        {loading && (
                            <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-green-100 bg-green-50/60">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
                                    <Loader2 className="h-7 w-7 animate-spin text-green-700" />
                                </div>

                                <p className="mt-5 text-sm font-black text-black">
                                    Finding your verse...
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Searching Scripture for you
                                </p>

                            </div>
                        )}

                        {/* =================================================
                            ERROR
                        ================================================== */}
                        {!loading && error && (
                            <div className="flex min-h-[230px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                                    <Search className="h-6 w-6" />
                                </div>

                                <p className="mt-4 text-sm font-black text-red-800">
                                    Verse not found
                                </p>

                                <p className="mt-1 max-w-md text-xs leading-5 text-red-600">
                                    Please check the spelling and format.
                                    Try something like &quot;John 3:16&quot;
                                    or &quot;Psalm 23:1&quot;.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setError(false);
                                        setQuery('');
                                    }}
                                    className="mt-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-red-700 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100"
                                >
                                    Try Again
                                </button>

                            </div>
                        )}

                        {/* =================================================
                            EMPTY STATE WITH SOULSYNC MASCOT
                        ================================================== */}
                        {!loading && !error && !result && (
                            <div className="relative min-h-[430px] overflow-hidden rounded-3xl border border-dashed border-green-200 bg-gradient-to-br from-green-50 via-white to-yellow-50 px-5 py-8 sm:px-8">

                                {/* Decorative quotes */}
                                <Quote className="absolute right-5 top-5 h-16 w-16 text-green-100" />

                                <Quote className="absolute bottom-5 left-5 h-12 w-12 rotate-180 text-yellow-100" />

                                {/* Background glow */}
                                <div className="pointer-events-none absolute right-10 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-green-300/10 blur-3xl" />

                                <div className="relative z-10 flex min-h-[390px] flex-col items-center justify-center gap-2 lg:flex-row lg:justify-between lg:gap-8 lg:px-8">

                                    {/* =================================================
                                        SCRIPTURE MESSAGE
                                    ================================================== */}
                                    <div className="w-full max-w-xl text-center lg:text-left">

                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-900/20 lg:mx-0">
                                            <BookOpen className="h-7 w-7" />
                                        </div>

                                        <p className="mt-5 text-base font-black text-black sm:text-lg">
                                            Your Scripture will appear here
                                        </p>

                                        <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-gray-500 sm:text-sm lg:mx-0">
                                            Search for a Bible verse above and
                                            take a moment to reflect on
                                            God&apos;s Word.
                                        </p>

                                        <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-yellow-800 ring-1 ring-yellow-200 lg:mx-0">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Faith • Hope • Purpose
                                        </div>

                                    </div>

                                    {/* =================================================
                                        SOULSYNC MASCOT
                                    ================================================== */}
                                    <div className="relative mt-4 shrink-0 sm:mt-0">

                                        {/* Speech bubble */}
                                        <div className="soul-talk absolute -left-20 -top-3 z-40 hidden rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg sm:block lg:-left-36 lg:-top-5">

                                            <div className="flex items-center gap-2">

                                                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-green-100 text-green-700">
                                                    <MessageCircle className="h-4 w-4" />
                                                </div>

                                                <div>

                                                    <p className="text-[9px] font-black uppercase tracking-wider text-green-700">
                                                        SoulSync AI
                                                    </p>

                                                    <p className="mt-0.5 whitespace-nowrap text-[10px] font-medium text-gray-600">
                                                        I&apos;m here to guide you
                                                    </p>

                                                </div>

                                            </div>

                                            {/* Bubble arrow */}
                                            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-green-100 bg-white" />

                                        </div>

                                        {/* Mascot */}
                                        <div className="soul-float soul-mascot relative h-[270px] w-[190px]">

                                            {/* =====================================
                                                SPARKLES
                                            ====================================== */}
                                            <div className="soul-sparkle absolute left-3 top-[65px] z-30 text-xl text-yellow-400">
                                                ✦
                                            </div>

                                            <div
                                                className="soul-sparkle absolute right-0 top-[95px] z-30 text-lg text-green-500"
                                                style={{ animationDelay: '0.5s' }}
                                            >
                                                ✦
                                            </div>

                                            <div
                                                className="soul-sparkle absolute bottom-[65px] left-5 z-30 text-sm text-yellow-400"
                                                style={{ animationDelay: '1s' }}
                                            >
                                                ✧
                                            </div>

                                            {/* =====================================
                                                GROUND SHADOW
                                            ====================================== */}
                                            <div className="soul-bot-shadow absolute bottom-0 left-1/2 h-5 w-[125px] -translate-x-1/2 rounded-full bg-green-700/20 blur-md" />

                                            {/* =====================================
                                                ANTENNA
                                            ====================================== */}
                                            <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 flex-col items-center">

                                                <div className="h-7 w-[5px] rounded-full bg-gradient-to-b from-green-800 to-green-400" />

                                                <div className="soul-glow flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-yellow-400 shadow-lg">

                                                    <div className="h-2 w-2 rounded-full bg-green-900" />

                                                </div>

                                            </div>

                                            {/* =====================================
                                                HEAD
                                            ====================================== */}
                                            <div className="absolute left-1/2 top-[28px] z-20 h-[92px] w-[130px] -translate-x-1/2 rounded-[35px] border-[4px] border-green-800 bg-gradient-to-br from-white via-gray-50 to-green-100 shadow-xl shadow-green-900/20">

                                                {/* Head cap */}
                                                <div className="absolute left-1/2 top-[-4px] h-[13px] w-[68px] -translate-x-1/2 rounded-b-full bg-green-600" />

                                                {/* Left ear */}
                                                <div className="absolute -left-[22px] top-[28px] h-[44px] w-[22px] rounded-l-2xl border-[3px] border-green-800 bg-green-600">

                                                    <div className="absolute left-[7px] top-[11px] h-[17px] w-[5px] rounded-full bg-green-200" />

                                                </div>

                                                {/* Right ear */}
                                                <div className="absolute -right-[22px] top-[28px] h-[44px] w-[22px] rounded-r-2xl border-[3px] border-green-800 bg-green-600">

                                                    <div className="absolute right-[7px] top-[11px] h-[17px] w-[5px] rounded-full bg-green-200" />

                                                </div>

                                                {/* Face screen */}
                                                <div className="absolute left-1/2 top-[21px] h-[58px] w-[103px] -translate-x-1/2 rounded-[25px] border-[3px] border-green-900 bg-green-950 shadow-inner">

                                                    {/* Left eye */}
                                                    <div className="soul-blink absolute left-[27px] top-[16px] h-[18px] w-[14px] rounded-full bg-green-300 shadow-[0_0_8px_rgba(134,239,172,.9)]" />

                                                    {/* Right eye */}
                                                    <div className="soul-blink absolute right-[27px] top-[16px] h-[18px] w-[14px] rounded-full bg-green-300 shadow-[0_0_8px_rgba(134,239,172,.9)]" />

                                                    {/* Smile */}
                                                    <div className="absolute bottom-[9px] left-1/2 h-[11px] w-[28px] -translate-x-1/2 rounded-b-full border-b-[3px] border-green-400" />

                                                </div>

                                                {/* Face status */}
                                                <div className="absolute bottom-[7px] right-[9px] h-[6px] w-[6px] rounded-full bg-green-400 shadow-[0_0_7px_rgba(74,222,128,.8)]" />

                                            </div>

                                            {/* =====================================
                                                NECK
                                            ====================================== */}
                                            <div className="absolute left-1/2 top-[110px] z-10 h-[21px] w-[39px] -translate-x-1/2 rounded-b-xl bg-green-800" />

                                            {/* =====================================
                                                BODY
                                            ====================================== */}
                                            <div className="absolute bottom-[42px] left-1/2 z-10 h-[123px] w-[105px] -translate-x-1/2 rounded-[33px] border-[4px] border-green-800 bg-gradient-to-br from-white via-gray-100 to-green-100 shadow-xl shadow-green-900/20">

                                                {/* Left shoulder */}
                                                <div className="absolute left-[-3px] top-[15px] h-[56px] w-[14px] rounded-r-xl bg-green-600" />

                                                {/* Right shoulder */}
                                                <div className="absolute right-[-3px] top-[15px] h-[56px] w-[14px] rounded-l-xl bg-green-600" />

                                                {/* Chest screen */}
                                                <div className="absolute left-1/2 top-[17px] h-[68px] w-[67px] -translate-x-1/2 rounded-[18px] border-[3px] border-green-800 bg-green-950 shadow-inner">

                                                    {/* Cross vertical */}
                                                    <div className="absolute left-1/2 top-[14px] h-[31px] w-[7px] -translate-x-1/2 rounded-full bg-yellow-400 shadow-[0_0_7px_rgba(250,204,21,.5)]" />

                                                    {/* Cross horizontal */}
                                                    <div className="absolute left-1/2 top-[23px] h-[7px] w-[26px] -translate-x-1/2 rounded-full bg-yellow-400 shadow-[0_0_7px_rgba(250,204,21,.5)]" />

                                                    {/* Status line */}
                                                    <div className="absolute bottom-[9px] left-1/2 h-[3px] w-[20px] -translate-x-1/2 rounded-full bg-green-400" />

                                                </div>

                                                {/* Label */}
                                                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-100 px-2 py-1 text-[6px] font-black tracking-[0.12em] text-green-800">
                                                    SOULSYNC AI
                                                </div>

                                            </div>

                                            {/* =====================================
                                                LEFT ARM
                                            ====================================== */}
                                            <div className="soul-wave absolute bottom-[83px] left-[28px] z-20 h-[85px] w-[25px]">

                                                <div className="absolute left-1/2 top-0 h-[67px] w-[20px] -translate-x-1/2 rounded-full border-[3px] border-green-800 bg-gradient-to-b from-white to-gray-200 shadow-md" />

                                                <div className="absolute bottom-0 left-1/2 flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-green-800 bg-green-600 shadow-md">

                                                    <div className="h-2 w-2 rounded-full bg-green-200" />

                                                </div>

                                            </div>

                                            {/* =====================================
                                                RIGHT ARM
                                            ====================================== */}
                                            <div className="absolute bottom-[79px] right-[25px] z-20 h-[85px] w-[25px]">

                                                <div className="absolute left-1/2 top-0 h-[67px] w-[20px] -translate-x-1/2 rotate-[-22deg] rounded-full border-[3px] border-green-800 bg-gradient-to-b from-white to-gray-200 shadow-md" />

                                                <div className="absolute bottom-0 left-1/2 flex h-[35px] w-[35px] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-green-800 bg-green-600 shadow-md">

                                                    <div className="h-2 w-2 rounded-full bg-green-200" />

                                                </div>

                                            </div>

                                            {/* =====================================
                                                BIBLE
                                            ====================================== */}
                                            <div className="absolute bottom-[66px] right-[1px] z-40 h-[54px] w-[64px] rotate-[-8deg] rounded-[7px] border-[3px] border-yellow-700 bg-green-900 shadow-lg">

                                                {/* Left page */}
                                                <div className="absolute left-[3px] top-[5px] h-[39px] w-[25px] rounded-l-md bg-green-700" />

                                                {/* Right page */}
                                                <div className="absolute right-[3px] top-[5px] h-[39px] w-[25px] rounded-r-md bg-green-700" />

                                                {/* Center line */}
                                                <div className="absolute left-1/2 top-[4px] h-[43px] w-[3px] -translate-x-1/2 rounded-full bg-yellow-200" />

                                                {/* Bible cross */}
                                                <div className="absolute left-1/2 top-[18px] h-[18px] w-[5px] -translate-x-1/2 rounded-full bg-yellow-400" />

                                                <div className="absolute left-1/2 top-[24px] h-[5px] w-[17px] -translate-x-1/2 rounded-full bg-yellow-400" />

                                            </div>

                                            {/* =====================================
                                                LEGS
                                            ====================================== */}
                                            <div className="absolute bottom-[7px] left-[60px] z-10 h-[44px] w-[27px] rounded-b-2xl border-[3px] border-green-800 bg-gradient-to-b from-white to-gray-300" />

                                            <div className="absolute bottom-[7px] right-[60px] z-10 h-[44px] w-[27px] rounded-b-2xl border-[3px] border-green-800 bg-gradient-to-b from-white to-gray-300" />

                                            {/* =====================================
                                                FEET
                                            ====================================== */}
                                            <div className="absolute bottom-0 left-[51px] z-20 h-[16px] w-[43px] rounded-full bg-green-800 shadow-md" />

                                            <div className="absolute bottom-0 right-[51px] z-20 h-[16px] w-[43px] rounded-full bg-green-800 shadow-md" />

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                        {/* =================================================
                            SCRIPTURE RESULT
                        ================================================== */}
                        {!loading && result && (
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-950 via-green-900 to-red-950 p-7 text-white shadow-xl sm:p-9">

                                {/* Decorative */}
                                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-2xl" />

                                <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-green-400/10 blur-2xl" />

                                <Quote className="absolute -right-2 -top-4 h-32 w-32 rotate-12 text-white/5" />

                                <div className="relative">

                                    {/* Result header */}
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-green-950 shadow-lg">
                                                <Sparkles className="h-5 w-5" />
                                            </div>

                                            <div>

                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                                                    Scripture for you
                                                </p>

                                                <p className="mt-0.5 text-xs text-white/60">
                                                    A moment for reflection
                                                </p>

                                            </div>

                                        </div>

                                        <BookOpen className="h-5 w-5 text-white/50" />

                                    </div>

                                    {/* Verse */}
                                    <blockquote className="mt-7 text-lg font-medium leading-8 text-white sm:text-xl sm:leading-9">
                                        &ldquo;{result.text}&rdquo;
                                    </blockquote>

                                    {/* Reference */}
                                    <div className="mt-7 flex items-center gap-3">

                                        <div className="h-px w-8 bg-yellow-400/70" />

                                        <p className="text-sm font-black tracking-wide text-yellow-300">
                                            {result.reference}
                                        </p>

                                    </div>

                                    {/* Reflection */}
                                    <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">

                                        <div className="flex items-start gap-3">

                                            <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-red-400 text-red-400" />

                                            <div>

                                                <p className="text-xs font-bold text-white">
                                                    Take a moment to reflect.
                                                </p>

                                                <p className="mt-1 text-xs leading-5 text-white/60">
                                                    Let this Scripture speak to
                                                    your heart and guide your
                                                    next step.
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================== */}
                    <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 sm:px-8">

                        <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 sm:justify-start">

                                <Sparkles className="h-3.5 w-3.5 text-yellow-500" />

                                <span>
                                    Take a moment to reflect on God&apos;s Word.
                                </span>

                            </div>

                            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-green-700">

                                <span>SoulSync</span>

                                <ChevronRight className="h-3 w-3" />

                                <span>Bible Search</span>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
}