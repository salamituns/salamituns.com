(function () {
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();

(function () {
    var root = document.documentElement;
    var button = document.getElementById('theme-toggle');
    var themeColor = document.querySelector('meta[name="theme-color"]');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    var chosen = false;

    try {
        chosen = !!localStorage.getItem('theme');
    } catch (e) {}

    function applyTheme(theme) {
        var next = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        themeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
        button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
        button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }

    applyTheme(root.getAttribute('data-theme') || 'light');

    button.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark'
            ? 'light'
            : 'dark';
        chosen = true;
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}
        applyTheme(next);
    });

    // Follow OS light/dark changes until the visitor picks a theme.
    systemDark.addEventListener('change', function (e) {
        if (!chosen) applyTheme(e.matches ? 'dark' : 'light');
    });
})();

// Header corners (desktop only), as on bolabanjo.com: the time zone on
// the left, a 24-hour clock on the right. The zone label in the HTML is
// the single source of truth for which zone the clock shows.
(function () {
    var zone = document.getElementById('local-zone');
    var clock = document.getElementById('local-clock');
    if (!zone || !clock) return;

    var format = new Intl.DateTimeFormat('en-GB', {
        timeZone: zone.textContent.trim(),
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    function render() {
        clock.textContent = format.format(new Date());
    }

    render();
    setInterval(render, 1000);
})();

(function () {
    var mount = document.getElementById('contrib-graph');
    if (!mount) return;

    var USER = 'salamituns';
    var status = document.getElementById('contrib-status');
    var profile = 'https://github.com/' + USER;

    function getJSON(url) {
        return fetch(url).then(function (res) {
            if (!res.ok) throw new Error('bad response');
            return res.json();
        });
    }

    // Edge-cached copy first; the public API directly if that fails
    // (e.g. when the site is served as plain static files).
    getJSON('/api/contributions')
        .catch(function () {
            return getJSON('https://github-contributions-api.jogruber.de/v4/' + USER + '?y=last');
        })
        .then(function (data) {
            var days = data.contributions || [];
            var total = (data.total && data.total.lastYear) || 0;
            var frag = document.createDocumentFragment();

            if (days.length) {
                var parts = days[0].date.split('-');
                var pad = new Date(
                    Date.UTC(+parts[0], +parts[1] - 1, +parts[2])
                ).getUTCDay();
                var i;
                for (i = 0; i < pad; i++) {
                    var spacer = document.createElement('span');
                    spacer.className = 'contrib-cell contrib-pad';
                    spacer.setAttribute('aria-hidden', 'true');
                    frag.appendChild(spacer);
                }
            }

            days.forEach(function (day) {
                var cell = document.createElement('span');
                var count = day.count;
                cell.className = 'contrib-cell';
                cell.dataset.level = String(day.level);
                cell.title = count + ' contribution' +
                    (count === 1 ? '' : 's') + ' on ' + day.date;
                frag.appendChild(cell);
            });

            mount.textContent = '';
            mount.appendChild(frag);
            mount.setAttribute('role', 'img');
            mount.setAttribute(
                'aria-label',
                total.toLocaleString() +
                    ' GitHub contributions in the last year'
            );
            status.textContent = '';
            var totalLink = document.createElement('a');
            totalLink.href = profile;
            totalLink.textContent = total.toLocaleString() +
                ' contributions';
            status.appendChild(totalLink);
            status.appendChild(
                document.createTextNode(' in the last year')
            );
        })
        .catch(function () {
            status.textContent = 'Could not load the graph. See ';
            var fallback = document.createElement('a');
            fallback.href = profile;
            fallback.textContent = 'GitHub';
            status.appendChild(fallback);
            status.appendChild(document.createTextNode('.'));
        });
})();
