import PageHeader from '@/app/[lang]/blog/components/PageHeader'
import { fetchAPI } from '@/app/[lang]/blog/utils/fetch-api'
import ArticlesList from '@/app/[lang]/blog/components/ArticlesList'

// Todo: write the category types
const fetchPostsByCategory = async (filter: string) => {
	try {
		const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
		const path = `/articles`
		const urlParamsObject = {
			sort: { createdAt: 'desc' },
			filters: {
				category: {
					slug: filter,
				},
			},
			populate: {
				cover: { fields: ['url'] },
				category: {
					populate: '*',
				},
				authorsBio: {
					populate: '*',
				},
			},
		}

		const options = { headers: { Authorization: `Bearer ${token}` } }
		const responseData = await fetchAPI(path, urlParamsObject, options)

		return responseData
	} catch (error) {
		console.error(error)
	}
}

const CategoryRoute = async ({ params }: { params: { category: string } }) => {
	const filter = params.category
	const { data } = await fetchPostsByCategory(filter)

	if (data.length === 0) return <div>Not Posts In this category</div>

	const { name, description } = data[0]?.attributes.category.data.attributes

	return (
		<div>
			<PageHeader heading={name} text={description} />
			<ArticlesList articles={data} />
		</div>
	)
}

export default CategoryRoute

export async function generateStaticParams() {
	return []
}
