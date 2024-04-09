'use client'

import { useState, useEffect } from 'react'

const ThemeSwitcher = () => {
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const isDarkMode = localStorage.getItem('darkMode') === 'true'
		setDarkMode(isDarkMode)
	}, [])

	const toggleDarkMode = () => {
		setDarkMode(prevMode => !prevMode)
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', JSON.stringify(darkMode))
	}

	return (
		<button
			onClick={toggleDarkMode}
			// className='px-4 py-2 rounded-md bg-gray-800 text-white'
			className={`px-4 py-2 rounded-full ${
				darkMode ? 'bg-yellow-400' : 'bg-gray-800'
			} ${
				darkMode ? 'text-gray-900' : 'text-white'
			} transition-colors duration-200`}
		>
			{darkMode ? 'Light Mode' : 'Dark Mode'}
		</button>
	)
}

export default ThemeSwitcher
