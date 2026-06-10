(function () {
    const root = document.documentElement;
    const appearance = root.dataset.appearance || 'system';

    if (appearance === 'dark') {
        root.classList.add('dark');
        return;
    }

    if (appearance === 'light') {
        root.classList.remove('dark');
        return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
})();
