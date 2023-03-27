const fs = require('fs');
const path = require('path');
const { SitemapStream } = require('sitemap');
const baseUrl = 'https://resultsjntuh.vercel.app';
const pagesDir = path.join(__dirname, 'pages');
const pages = fs.readdirSync(pagesDir);
const urls = pages.map((page) => `${baseUrl}/${page}`);
const stream = new SitemapStream({ hostname: baseUrl });
urls.forEach((url) => {
  stream.write({ url });
});
stream.end();
const writeStream = fs.createWriteStream(
    path.join(__dirname, 'public', 'sitemap.xml')
  );
  stream.pipe(writeStream);
  