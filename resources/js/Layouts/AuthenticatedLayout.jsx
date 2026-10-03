import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Home,
    Info,
    CalendarDays,
    Megaphone,
    Heart,
    Music,
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const links = [
        { label: 'HOME', name: 'dashboard', icon: Home },
        { label: 'ABOUT', name: 'about', icon: Info },
        { label: 'EVENTS', name: 'events', icon: CalendarDays },
        { label: 'ANNOUNCEMENTS', name: 'announcements', icon: Megaphone },
        { label: 'PRAYER REQUESTS', name: 'prayer.requests', icon: Heart },
        { label: 'MUSIC CLASSES', name: 'music.classes', icon: Music },
    ];

    return (
        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* LOGO */}
                        <div className="flex items-center">
                            <Link href={route('dashboard')}>
                                <div className="flex items-center gap-2">
                                    <ApplicationLogo className="h-9 w-9 fill-current text-blue-600" />
                                    <span className="text-xl font-bold text-gray-800">
                                        SoulSync
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* DESKTOP NAV */}
                        <div className="hidden items-center space-x-6 sm:flex">
                            {links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    href={route(link.name)}
                                    active={route().current(link.name)}
                                >
                                    <span className="flex items-center gap-1.5">
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                    </span>
                                </NavLink>
                            ))}
                        </div>

                        {/* USER MENU */}
                        <div className="hidden sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600"
                                    >
                                        {user.name}

                                        <svg
                                            className="ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>

                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* MOBILE BUTTON */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                            >
                                ☰
                            </button>
                        </div>

                    </div>
                </div>

                {/* MOBILE NAV */}
                {showingNavigationDropdown && (
                    <div className="border-t border-gray-200 bg-white sm:hidden">
                        <div className="space-y-1 px-4 pb-3 pt-3">
                            {links.map((link) => (
                                <ResponsiveNavLink
                                    key={link.name}
                                    href={route(link.name)}
                                    active={route().current(link.name)}
                                >
                                    <span className="flex items-center gap-2">
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                    </span>
                                </ResponsiveNavLink>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* HEADER */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* PAGE CONTENT */}
            <main>{children}</main>

        </div>
    );
}