import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function MusicClasses() {
    return (
        <AuthenticatedLayout>
            <Head title="Music Classes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-8 shadow-sm sm:rounded-lg">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Music Classes
                        </h1>

                        <p className="mt-4 text-gray-600">
                            Learn and grow in music ministry through classes
                            for vocals, guitar, keyboard, drums, and more.
                        </p>

                        <div className="mt-6 rounded-lg bg-gray-50 p-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Available Classes
                            </h2>

                            <p className="mt-2 text-gray-500">
                                No music classes yet.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}