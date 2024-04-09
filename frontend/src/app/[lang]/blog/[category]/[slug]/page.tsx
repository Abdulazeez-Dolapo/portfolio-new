import type { Metadata } from 'next'

import Article from '@/app/[lang]/blog/components/Article'

import { fetchAPI } from '@/app/[lang]/blog/utils/fetch-api'

const getPostBySlug = async (slug: string) => {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
	const path = `/articles`
	const urlParamsObject = {
		filters: { slug },
		populate: {
			cover: { fields: ['url'] },
			authorsBio: { populate: '*' },
			category: { fields: ['name'] },
			blocks: { populate: '*' },
		},
	}
	const options = { headers: { Authorization: `Bearer ${token}` } }
	const response = await fetchAPI(path, urlParamsObject, options)

	return response
}

const getMetaData = async (slug: string) => {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
	const path = `/articles`
	const urlParamsObject = {
		filters: { slug },
		populate: { seo: { populate: '*' } },
	}
	const options = { headers: { Authorization: `Bearer ${token}` } }
	const response = await fetchAPI(path, urlParamsObject, options)

	return response.data
}

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> => {
	const meta = await getMetaData(params.slug)
	const metadata = meta[0].attributes.seo

	return {
		title: metadata.metaTitle,
		description: metadata.metaDescription,
	}
}

const PostRoute = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params
	const data = await getPostBySlug(slug)

	if (data.data.length === 0) return <h2>no post found</h2>

	return <Article article={data.data[0]} />
}

export default PostRoute

export async function generateStaticParams() {
	const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
	const path = `/articles`
	const options = { headers: { Authorization: `Bearer ${token}` } }
	const articleResponse = await fetchAPI(
		path,
		{
			populate: ['category'],
		},
		options
	)

	return articleResponse.data.map(
		(article: {
			attributes: {
				slug: string
				category: {
					slug: string
				}
			}
		}) => ({
			slug: article.attributes.slug,
			category: article.attributes.slug,
		})
	)
}
