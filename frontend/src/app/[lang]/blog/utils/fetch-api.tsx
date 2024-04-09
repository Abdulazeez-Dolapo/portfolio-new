import qs from 'qs'
import { getStrapiURL } from '@/app/[lang]/blog/utils/api-helpers'

export const fetchAPI = async (
	path: string,
	urlParamsObject = {},
	options = {}
) => {
	try {
		// Merge default and user options
		const mergedOptions = {
			next: { revalidate: 60 },
			headers: {
				'Content-Type': 'application/json',
			},
			...options,
		}

		// Build request URL
		const queryString = qs.stringify(urlParamsObject)
		const requestUrl = `${getStrapiURL(
			`/api${path}${queryString ? `?${queryString}` : ''}`
		)}`

		// Trigger API call
		const response = await fetch(requestUrl, mergedOptions)
		const data = await response.json()

		return data
	} catch (error) {
		console.error(error)

		throw new Error(
			`Please check if your server is running and you set all the required tokens.`
		)
	}
}
