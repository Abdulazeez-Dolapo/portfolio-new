'use client'

import { useState, useEffect, useCallback } from 'react'

import Loader from '@/app/[lang]/blog/components/Loader'
import ArticlesList from '@/app/[lang]/blog/components/ArticlesList'
import PageHeader from '@/app/[lang]/blog/components/PageHeader'

import { fetchAPI } from '@/app/[lang]/blog/utils/fetch-api'
import { ArticleType } from '@/types'

interface Meta {
	pagination: {
		start: number
		limit: number
		total: number
	}
}

const BlogPage = () => {
	const [meta, setMeta] = useState<Meta | undefined>()
	const [articles, setArticles] = useState<ArticleType[]>([])
	const [isLoading, setLoading] = useState(true)

	const fetchArticles = useCallback(async (start: number, limit: number) => {
		setLoading(true)

		try {
			const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
			const path = `/articles`
			const urlParamsObject = {
				sort: { createdAt: 'desc' },
				populate: {
					cover: { fields: ['url'] },
					category: { populate: '*' },
					authorsBio: {
						populate: '*',
					},
				},
				pagination: {
					start: start,
					limit: limit,
				},
			}
			const options = { headers: { Authorization: `Bearer ${token}` } }
			const responseData = await fetchAPI(path, urlParamsObject, options)

			if (start === 0) {
				setArticles(responseData.data)
			} else {
				setArticles((prevData: any[]) => [
					...prevData,
					...responseData.data,
				])
			}

			setMeta(responseData.meta)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}, [])

	function loadMorePosts(): void {
		const nextPosts = meta!.pagination.start + meta!.pagination.limit
		fetchArticles(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
	}

	useEffect(() => {
		fetchArticles(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
	}, [fetchArticles])

	if (isLoading) return <Loader />

	return (
		<div>
			<PageHeader heading='Our Blog' text='Checkout Something Cool' />

			<ArticlesList articles={articles}>
				{meta!.pagination.start + meta!.pagination.limit <
					meta!.pagination.total && (
					<div className='flex justify-center'>
						<button
							type='button'
							className='px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400'
							onClick={loadMorePosts}
						>
							Load more posts...
						</button>
					</div>
				)}
			</ArticlesList>
		</div>
	)
}

export default BlogPage
