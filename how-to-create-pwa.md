### Create `manifest.ts` within the `app` directory
```ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'My Next.js PWA',
        short_name: 'MyPWA',
        description: 'A PWA built with Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            { src: '/192x192.png', sizes: '192x192', type: 'image/png' },
            { src: '/512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    }
}
```

Next.js automatically converts `manifest.ts` to JSON and serves it at `/manifest.webmanifest` at build time. No changes needed in `layout.tsx`.