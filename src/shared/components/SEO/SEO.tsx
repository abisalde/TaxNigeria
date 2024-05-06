import * as React from 'react';
import {Helmet} from 'react-helmet';

interface SEOProps {
	description?: string;
	pathname?: string;
	title?: string;
}

export const SEO: React.FC<SEOProps> = ({
	description,
	pathname = '',
	title,
}) => {
	const siteTitle =
		title ??
		'Tax Nigeria | This is a dashboard to track your tax activities & reports';
	return (
		<Helmet>
			<title>{siteTitle}</title>
			<meta name='description' content={description ?? metaDescription} />
			<meta property='og:url' content={`https://${pathname}`} />
			<link rel='canonical' href={`https:/${pathname}`} />
			{/* Open Graph */}
			<meta property='og:site_name' content={siteTitle} />
			<meta property='og:description' content={metaDescription} />
			<meta property='og:title' content={siteTitle} />
			<meta name='msapplication-TileColor' content='#ffffff' />
			{favicons.map((links) => (
				<link key={links.href} {...links} />
			))}
		</Helmet>
	);
};

const metaDescription =
	'This is a dashboard to track your tax progress, activities and reports';

interface Favicons {
	rel: string;
	href: string;
	sizes?: string;
	type?: string;
}

const favicons: Favicons[] = [
	{
		rel: 'apple-touch-icon',
		sizes: '57x57',
		href: '/favicon/apple-icon-57x57.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '60x60',
		href: '/favicon/apple-icon-60x60.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '72x72',
		href: '/favicon/apple-icon-72x72.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '76x76',
		href: '/favicon/apple-icon-76x76.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '114x114',
		href: '/favicon/apple-icon-114x114.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '120x120',
		href: '/favicon/apple-icon-120x120.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '144x144',
		href: '/favicon/apple-icon-144x144.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '152x152',
		href: '/favicon/apple-icon-152x152.png',
	},
	{
		rel: 'apple-touch-icon',
		sizes: '180x180',
		href: '/favicon/apple-icon-180x180.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '192x192',
		href: '/favicon/android-icon-192x192.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '32x32',
		href: '/favicon/favicon-32x32.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '96x96',
		href: '/favicon/favicon-96x96.png',
	},
	{
		rel: 'icon',
		type: 'image/png',
		sizes: '16x16',
		href: '/favicon/favicon-16x16.png',
	},
	{
		rel: 'manifest',
		href: '/manifest.json',
	},
	{
		rel: 'shortcut icon',
		href: '/favicon.ico',
	},
];
