import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import Footer from '@/app/[lang]/blog/components/Footer'
import Navbar from '@/app/[lang]/blog/components/Navbar'

import {
	getStrapiMedia,
	getStrapiURL,
} from '@/app/[lang]/blog/utils/api-helpers'
import { fetchAPI } from '@/app/[lang]/blog/utils/fetch-api'
import { i18n } from '../../../i18n-config'
import './globals.css'
import ThemeSwitcher from './blog/components/ThemeSwitcher'

const inter = Inter({ subsets: ['latin'] })

const FALLBACK_SEO: Metadata = {
	title: 'Abdulazeez Abdulrafiu Portfolio',
	description:
		'The portfolio of Abdulazeez Abdulrafiu, a fullstack software engineer with over 5 years of experience.',
}

const getGlobal = async (): Promise<any> => {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

	if (!token)
		throw new Error('The Strapi API Token environment variable is not set.')

	const path = `/global`
	const options = { headers: { Authorization: `Bearer ${token}` } }

	const urlParamsObject = {
		populate: [
			'metadata.shareImage',
			'favicon',
			'navbar.links',
			'navbar.navbarLogo.logoImg',
			'footer.footerLogo.logoImg',
			'footer.menuLinks',
			'footer.legalLinks',
			'footer.socialLinks',
			'footer.categories',
		],
	}

	const response = await fetchAPI(path, urlParamsObject, options)
	return response
}

export const generateMetadata = async (): Promise<Metadata> => {
	const meta = await getGlobal()

	if (!meta.data) return FALLBACK_SEO

	const { metadata, favicon } = meta.data.attributes
	const { url } = favicon.data.attributes

	return {
		title: metadata.metaTitle,
		description: metadata.metaDescription,
		icons: {
			icon: [new URL(url, getStrapiURL())],
		},
	}
}

const RootLayout = async ({
	children,
	params,
}: {
	children: ReactNode
	params: { lang: string }
}) => {
	const global = await getGlobal()
	// TODO: CREATE A CUSTOM ERROR PAGE
	if (!global.data) return null

	const { navbar, footer } = global.data.attributes

	const navbarLogoUrl = getStrapiMedia(
		navbar.navbarLogo.logoImg.data.attributes.url
	)

	const footerLogoUrl = getStrapiMedia(
		footer.footerLogo.logoImg.data.attributes.url
	)

	return (
		<html lang={params.lang}>
			<body className={inter.className}>
				<Navbar
					links={navbar.links}
					logoUrl={navbarLogoUrl}
					logoText={navbar.navbarLogo.logoText}
				/>

				<ThemeSwitcher />

				<main className='dark:bg-black dark:text-gray-100 min-h-screen'>
					{children}
				</main>

				<Footer
					logoUrl={footerLogoUrl}
					logoText={footer.footerLogo.logoText}
					menuLinks={footer.menuLinks}
					categoryLinks={footer.categories.data}
					legalLinks={footer.legalLinks}
					socialLinks={footer.socialLinks}
				/>
			</body>
		</html>
	)
}

export default RootLayout

export const generateStaticParams = async () => {
	return i18n.locales.map(locale => ({ lang: locale }))
}
