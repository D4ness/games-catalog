import {GamesListAction, GamesListActionTypes, GamesListState} from "../../types/gamesList";

const initialState: GamesListState = {
    gamesList: [],
    loading: false,
    error: null,
    gamesPerPage: 20,
    currentPage: 1
}
export const gamesListReducer = (state = initialState, action: GamesListAction): GamesListState => {
    switch (action.type) {
        case GamesListActionTypes.FETCH_GAMES_LIST:
            return {...state, loading: true, error: null, gamesList: []}
        case GamesListActionTypes.FETCH_GAMES_LIST_SUCCESS:
            return {...state, loading: false, error: null, gamesList: action.payload}
        case GamesListActionTypes.FETCH_GAMES_LIST_ERROR:
            return {...state, loading: false, error: action.payload, gamesList: []}
        case GamesListActionTypes.CHANGE_PAGE:
            return {...state, currentPage: action.payload}
        default:
            return state
    }
}