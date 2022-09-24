import { HANDLE_PAGE, HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES, } from './actions'
import { IAction, IState } from "../models";

function reducer(state: IState, action: IAction) : IState {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, isLoading: true }
		case SET_STORIES:
			return {
				...state,
				isLoading: false,
				hits: action.payload.hits,
				nbPages: action.payload.nbPages,
			}
		case REMOVE_STORY:
			return {
				...state,
				hits: state.hits.filter((story: any) => story.objectID !== action.payload),
			}
		case HANDLE_SEARCH:
			return { ...state, query: action.payload, page: 0 }
		case HANDLE_PAGE:
			if (action.payload === 'increase') {
				let nextPage = state.page + 1
				return { ...state, page: nextPage }
			}
			else if (action.payload === 'decrease') {
				let prevPage = state.page - 1
				return { ...state, page: prevPage }
			} else {
				return state
			}
		default:
			throw new Error(`no matching "${action.type}" action type`)
	}
}

export default reducer
