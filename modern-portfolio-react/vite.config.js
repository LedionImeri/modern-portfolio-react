import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * Small SEO helper plugin:
 *  - replaces %SITE_URL% in HTML files with VITE_SITE_URL (or an empty string),
 *    so canonical / Open Graph URLs become absolute once the domain is known;
 *  - emits robots.txt and sitemap.xml at build time when VITE_SITE_URL is set.
 */
function seo(siteUrl) {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      let out = html.replaceAll('%SITE_URL%', siteUrl);
      // Without a known domain, drop tags that require an absolute URL.
      if (!siteUrl) out = out.replace(/^\s*<[^>]*data-needs-site-url[^>]*>\s*$/gm, '');
      return out.replaceAll(' data-needs-site-url', '');
    },
    generateBundle() {
      if (!siteUrl) return;
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), seo(siteUrl)],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        input: {
          main: `${root}index.html`,
          notFound: `${root}404.html`,
        },
      },
    },
  };
});
