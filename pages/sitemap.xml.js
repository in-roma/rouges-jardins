// resource: https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js

import React from 'react';
import fs from 'fs';
import { getAllSlugs } from '../lib/api';

const Sitemap = () => {};

export async function getServerSideProps({ res }) {
	const baseUrl = {
		development: 'http://localhost:3000',
		production: 'https://rouges-jardins-8yzlk.ondigitalocean.app/',
	}[process.env.NODE_ENV];

	// Static pages
	const staticPages = fs
		.readdirSync('pages')
		.filter((staticPage) => {
			return ![
				'_app.js',
				'_document.js',
				'404.js',
				'500.js',
				'sitemap.xml.js',
			].includes(staticPage);
		})
		.map((staticPagePath) => {
			return `${baseUrl}/${staticPagePath}`;
		});

	// Dynamic pages
	const data = await getAllSlugs();
	const posts = data.posts.edges.filter(
		(el) =>
			el.node.status === 'publish' &&
			[5, 6, 7, 11, 12, 13, 14, 15].includes(
				el.node.categories.edges[0].node.categoryId
			)
	);
	const podcasts = data.posts.edges.filter(
		(el) =>
			el.node.status === 'publish' &&
			[8].includes(el.node.categories.edges[0].node.categoryId)
	);
	const publications = data.posts.edges.filter(
		(el) =>
			el.node.status === 'publish' &&
			[9].includes(el.node.categories.edges[0].node.categoryId)
	);

	// Sitemap
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
			.map((url) => {
				return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
			})
			.join('')}
            
            ${posts
				.map(
					(el) =>
						`
                      <url>
                        <loc>${baseUrl}/blog/${el.node.slug}</loc>
                        <lastmod>${el.node.date}</lastmod>
                        <changefreq>monthly</changefreq>
                        <priority>1.0</priority>
                      </url>
                    `
				)
				.join('')}
            ${podcasts
				.map(
					(el) =>
						`
                          <url>
                            <loc>${baseUrl}/podcasts/${el.node.slug}</loc>
                            <lastmod>${el.node.date}</lastmod>
                            <changefreq>monthly</changefreq>
                            <priority>1.0</priority>
                          </url>
                        `
				)
				.join('')}
                ${publications
					.map(
						(el) =>
							`
                              <url>
                                <loc>${baseUrl}/publications/${el.node.slug}</loc>
                                <lastmod>${el.node.date}</lastmod>
                                <changefreq>monthly</changefreq>
                                <priority>1.0</priority>
                              </url>
                            `
					)
					.join('')}
      </urlset>
    `;

	res.setHeader('Content-Type', 'text/xml');
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default Sitemap;
