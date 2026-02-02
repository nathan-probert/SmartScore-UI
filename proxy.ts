import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(req: NextRequest) {
    const hostname = req.headers.get('host');

    if (hostname?.startsWith('smartscore.')) {
        const url = req.nextUrl.clone();

        if (url.pathname === '/') {
            // If at the root, rewrite to serve from the smartscore directory
            url.pathname = '/smartscore';
        } else if (url.pathname === '/help') {
            // If it's '/help', treat it like a route on the main site, without the '/smartscore' prefix
            url.pathname = `/smartscore${url.pathname}`;
        } else {
            // For all other routes, strip the "/smartscore" part from the path to resolve assets correctly
            url.pathname = url.pathname.replace(/^\/smartscore/, '');
        }

        return NextResponse.rewrite(url);
    }

    // If it's not the smartscore subdomain, continue with the request as usual
    return NextResponse.next();
}
