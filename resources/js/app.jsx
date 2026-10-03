import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const pages = import.meta.glob('./pages/**/*.jsx');

createInertiaApp({
    resolve: async (name) => {
        const page = pages[`./pages/${name}.jsx`];

        if (!page) {
            console.error('Inertia page not found:', name);
            console.log('Available pages:', Object.keys(pages));
            throw new Error(`Page not found: ${name}`);
        }

        return await page();
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: '#4B5563',
    },
});
