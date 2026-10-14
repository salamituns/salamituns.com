// Proxies the GitHub contributions calendar so the page reads it from
// this origin. Vercel's edge caches the response; the upstream API is only
// hit when the cache goes stale, and a stale copy keeps serving if it fails.
const UPSTREAM =
    'https://github-contributions-api.jogruber.de/v4/salamituns?y=last';

module.exports = async function handler(req, res) {
    try {
        const upstream = await fetch(UPSTREAM, {
            signal: AbortSignal.timeout(8000),
        });
        if (!upstream.ok) throw new Error('upstream ' + upstream.status);
        const data = await upstream.json();

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=21600, stale-while-revalidate=86400'
        );
        res.status(200).json({
            total: data.total,
            contributions: data.contributions,
        });
    } catch (err) {
        res.setHeader('Cache-Control', 'no-store');
        res.status(502).json({ error: 'contributions unavailable' });
    }
};
