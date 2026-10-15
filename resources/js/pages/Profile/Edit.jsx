import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserAvatar from '@/Components/UserAvatar';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    function ChangeProfileButton() {
        const [open, setOpen] = useState(false);
        const [preview, setPreview] = useState(null);
        const { data, setData, post, processing, recentlySuccessful, reset } = useForm({
            _method: 'patch',
            photo: null,
        });

        const onFileChange = (e) => {
            const file = e.target.files[0];
            setData('photo', file);
            if (file) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
        };

        const submit = (e) => {
            e.preventDefault();
            post(route('profile.update'), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                    reset();
                    setPreview(null);
                },
            });
        };

        return (
            <div className="flex flex-col items-center">
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white shadow hover:bg-green-700"
                >
                    Change Profile Photo
                </button>

                {open && (
                    <form onSubmit={submit} className="mt-3 w-72">
                        <div className="flex flex-col items-center gap-2">
                            <label className="w-full text-left text-xs font-medium text-gray-700">Choose a photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                className="w-full text-sm"
                            />

                            {preview && (
                                <img src={preview} alt="preview" className="mt-2 h-24 w-24 rounded-full object-cover" />
                            )}
                        </div>

                        <div className="mt-2 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setOpen(false);
                                    setPreview(null);
                                    reset();
                                }}
                                className="rounded-md px-3 py-1 text-sm font-medium text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-green-600 px-3 py-1 text-sm font-bold text-white disabled:opacity-50"
                            >
                                Save
                            </button>
                        </div>

                        {recentlySuccessful && <p className="mt-2 text-xs text-green-600">Saved.</p>}
                    </form>
                )}
            </div>
        );
    }

    const formatDate = (value) => {
        if (!value) return 'Not specified';

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const details = [
        { label: 'Full name:', value: user.full_name || user.name || 'Not provided' },
        { label: 'Date of Birth:', value: formatDate(user.birthdate) },
        { label: 'Gender:', value: user.gender || 'Not provided' },
        { label: 'Nationality:', value: user.nationality || 'Not provided' },
        { label: 'Address:', value: user.address || 'Not provided' },
        { label: 'Phone Number:', value: user.contact_number || 'Not provided' },
        { label: 'Email:', value: user.email || 'Not provided' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="min-h-screen text-black dark:text-white bg-[#f3f4f6] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] bg-[size:24px_24px] dark:bg-green-950 dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] dark:bg-[size:24px_24px]">
                <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-4 px-2 pb-8 pt-2 text-center">
                        <div className="relative">
                            <UserAvatar
                                user={user}
                                className="h-28 w-28 border-4 border-white shadow-lg shadow-green-900/10 dark:border-green-900"
                            />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-4xl font-black tracking-tight text-current inline-flex items-center justify-center">
                                <span>{user.full_name || user.name}</span>
                                <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white shadow-md">
                                    ✓
                                </span>
                            </h1>

                            <p className="mt-2 text-lg text-current">{user.email}</p>

                            <div className="mt-4">
                                <ChangeProfileButton />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-green-950/70">
                        <div className="border-b border-gray-200 px-6 py-5 dark:border-white/10">
                            <h2 className="text-2xl font-black text-current">
                                Personal details
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-200 dark:divide-white/10">
                            {details.map((detail) => (
                                <div
                                    key={detail.label}
                                    className="flex items-center justify-between gap-4 px-6 py-4"
                                >
                                                    <div className="w-48 text-xl font-medium text-current">
                                        {detail.label}
                                    </div>

                                                    <div className="flex-1 text-right text-xl font-semibold text-current">
                                                        {detail.value}
                                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="rounded-2xl border border-green-200 bg-white/90 p-4 shadow-xl shadow-green-900/5 backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-green-950/70 dark:shadow-none">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="rounded-2xl border border-red-200 bg-white/90 p-4 shadow-xl shadow-red-900/5 backdrop-blur-xl sm:p-8 dark:border-red-500 dark:bg-red-900/10 dark:shadow-md">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
