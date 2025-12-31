// next-sitemap.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://nazeemkhan.com', // Replace with your domain
    generateRobotsTxt: true, // Optionally generate a robots.txt file
    sitemapSize: 7000, // Maximum number of URLs per sitemap file
};
