import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

const TacoCard = () => {
	let [recipe, setRecipe] = useState(['Loading Recipe!'])

	useEffect(() => {
		axios
			.get('http://taco-randomizer.herokuapp.com/random/?full-taco=true')
			.then((res) => {
				newTaco(
					'https://iron-cors-anywhere.herokuapp.com/' + res.data.base_layer.url
				)
			})
	}, [])

	function newTaco(taco) {
		fetch(taco)
			.then((response) => {
				console.log('hello', response)
				if (response.ok) return response.text()
				else return Promise.reject("Didn't fetch text correctly!")
			})
			.then((text) => {
				console.log(text)
				setRecipe(text)
			})
			.catch((error) => console.error(error))
	}

	return (
		<div className='tacoCard'>
			<ReactMarkdown>{recipe}</ReactMarkdown>
		</div>
	)
}

export default TacoCard
