import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'

import {
	SET_LOADING,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH,
} from './reducer/actions'
import reducer from './reducer/reducer'
import { IState } from "./models";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState: IState = {
	isLoading: true,
	hits: [],
	query: 'react',
	page: 0,
	nbPages: 0,
}

const AppContext = createContext(null);

const AppProvider = ({ children }: {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const fetchStories = async (url: string) => {
		dispatch({ type: SET_LOADING })
		try {
			const response = await fetch(url)
			const data = await response.json()
			dispatch({
				type: SET_STORIES,
				payload: { hits: data.hits, nbPages: data.nbPages },
			})
		} catch (error) {
			console.log(error)
		}
	}

	const removeStory = (id: string) => {
		dispatch({ type: REMOVE_STORY, payload: id })
	}
	const handleSearch = (query: string) => {
		dispatch({ type: HANDLE_SEARCH, payload: query })
	}
	const handlePage = (value: string) => {
		dispatch({ type: HANDLE_PAGE, payload: value })
	}
	useEffect(() => {
		fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
	}, [state.query, state.page])

	return (
		<AppContext.Provider
			value={{ ...state, removeStory, handleSearch, handlePage }}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
