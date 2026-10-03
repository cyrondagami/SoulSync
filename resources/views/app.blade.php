<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <script>
            (function () {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
            })();
        </script>

        <title>{{ config('app.name', 'SoulSync') }}</title>

        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    </head>

    <body class="font-sans antialiased">
        @inertia
    </body>
</html>