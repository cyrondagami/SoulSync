import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import UserAvatar from '@/Components/UserAvatar';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

// Shrinks any image to max 1024px and converts it to JPEG before upload
const resizeImage = (file, maxSize = 1024) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            const scale = Math.min(
                1,
                maxSize / Math.max(img.width, img.height),
            );

            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            URL.revokeObjectURL(url);

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error('Could not process image'));
                        return;
                    }
                    resolve(
                        new File([blob], 'profile.jpg', {
                            type: 'image/jpeg',
                        }),
                    );
                },
                'image/jpeg',
                0.85,
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Invalid image'));
        };

        img.src = url;
    });

const AGE_GROUP_LABELS = {
    under_18: 'Under 18 (Youth member)',
    '18_above': '18 or above (Adult member)',
};

const selectClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const photoInput = useRef();
    const [preview, setPreview] = useState(null);

    const {
        data,
        setData,
        post,
        errors,
        setError,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        _method: 'patch',
        name: user.name,
        email: user.email,
        gmail: user.gmail ?? '',
        contact_number: user.contact_number ?? '',
        full_name: user.full_name ?? '',
        birthdate: user.birthdate ? String(user.birthdate).substring(0, 10) : '',
        gender: user.gender ?? '',
        address: user.address ?? '',
        photo: null,
        remove_photo: false,
    });

    const selectPhoto = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        clearErrors('photo');

        try {
            const resized = await resizeImage(file);

            setData((prev) => ({
                ...prev,
                photo: resized,
                remove_photo: false,
            }));
            setPreview(URL.createObjectURL(resized));
        } catch {
            setError('photo', 'Could not read that image. Try a different file.');
            if (photoInput.current) photoInput.current.value = '';
        }
    };

    const removePhoto = () => {
        setData((prev) => ({ ...prev, photo: null, remove_photo: true }));
        setPreview(null);
        clearErrors('photo');
        if (photoInput.current) photoInput.current.value = '';
    };

    const submit = (e) => {
        e.preventDefault();

        // POST + _method=patch is required for file uploads in Laravel
        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPreview(null);
                setData((prev) => ({
                    ...prev,
                    photo: null,
                    remove_photo: false,
                }));
                if (photoInput.current) photoInput.current.value = '';
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your profile photo, personal information, email
                    address, Gmail, and contact number.
                </p>
            </header>

                        <form
                onSubmit={submit}
                className="mt-6 space-y-6 text-gray-900 [&_label]:!text-gray-700 [&_input:not([disabled])]:!border-gray-300 [&_input:not([disabled])]:!bg-white [&_input:not([disabled])]:!text-gray-900 [&_select]:!border-gray-300 [&_select]:!bg-white [&_select]:!text-gray-900 [&_option]:!text-gray-900"
            >
                {/* PROFILE PHOTO */}
                <div>
                    <InputLabel htmlFor="photo" value="Profile Photo" />

                    <div className="mt-2 flex items-center gap-4">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-20 w-20 rounded-full object-cover"
                            />
                        ) : data.remove_photo ? (
                            <UserAvatar
                                user={{ ...user, profile_photo: null }}
                                className="h-20 w-20"
                            />
                        ) : (
                            <UserAvatar user={user} className="h-20 w-20" />
                        )}

                        <div className="flex flex-wrap gap-2">
                            <input
                                id="photo"
                                ref={photoInput}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                className="hidden"
                                onChange={selectPhoto}
                            />

                            <button
                                type="button"
                                onClick={() => photoInput.current.click()}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                            >
                                Choose Photo
                            </button>

                            {(user.profile_photo || preview) &&
                                !data.remove_photo && (
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="rounded-md border border-red-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-red-600 shadow-sm transition hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                )}
                        </div>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                        JPG, PNG or WEBP. Large photos are resized
                        automatically.
                    </p>

                    <InputError className="mt-2" message={errors.photo} />
                </div>

                {/* NAME (display name) */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* FULL NAME */}
                <div>
                    <InputLabel htmlFor="full_name" value="Full Name" />

                    <TextInput
                        id="full_name"
                        className="mt-1 block w-full"
                        value={data.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        placeholder="Juan Dela Cruz"
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.full_name} />
                </div>

                {/* BIRTHDATE */}
                <div>
                    <InputLabel htmlFor="birthdate" value="Birthdate" />

                    <TextInput
                        id="birthdate"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.birthdate}
                        onChange={(e) => setData('birthdate', e.target.value)}
                        max={new Date().toISOString().substring(0, 10)}
                        autoComplete="bday"
                    />

                    <InputError className="mt-2" message={errors.birthdate} />
                </div>

                {/* GENDER */}
                <div>
                    <InputLabel htmlFor="gender" value="Gender" />

                    <select
                        id="gender"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        className={selectClass}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <InputError className="mt-2" message={errors.gender} />
                </div>

                {/* ADDRESS */}
                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Barangay, Municipality, Province"
                        autoComplete="street-address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                {/* EMAIL */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* GMAIL */}
                <div>
                    <InputLabel htmlFor="gmail" value="Gmail" />

                    <TextInput
                        id="gmail"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.gmail}
                        onChange={(e) => setData('gmail', e.target.value)}
                        placeholder="yourname@gmail.com"
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.gmail} />
                </div>

                {/* CONTACT NUMBER */}
                <div>
                    <InputLabel
                        htmlFor="contact_number"
                        value="Contact Number"
                    />

                    <TextInput
                        id="contact_number"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.contact_number}
                        onChange={(e) =>
                            setData('contact_number', e.target.value)
                        }
                        placeholder="09123456789"
                        autoComplete="tel"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.contact_number}
                    />
                </div>

                {/* AGE GROUP (from registration, read-only) */}
                <div>
                    <InputLabel htmlFor="age_group" value="Age Group" />

                    <input
                        id="age_group"
                        type="text"
                        readOnly
                        disabled
                        value={AGE_GROUP_LABELS[user.age_group] ?? 'Not provided'}
                        className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-100 text-gray-600 shadow-sm"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        This was set during registration and cannot be changed
                        here.
                    </p>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}