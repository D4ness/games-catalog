import axios from "axios";
import {FiltersType, GameCardType, GamesListAction, GamesListActionTypes} from "../../types/gamesList";
import {Dispatch} from "react";

interface GetGamesList extends Array<GameCardType> {
    data: GameCardType[];
}

export const fetchGamesList = (filters?: FiltersType) => {
    return async (dispatch: Dispatch<GamesListAction>) => {
        try {
            dispatch({type: GamesListActionTypes.FETCH_GAMES_LIST})
            let url: string = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
            const res = await axios.get<GetGamesList>(url, {
                withCredentials: true,
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                },
                params: filters && {
                    category: filters.genre,
                    platform: filters.platform,
                    "sort-by": filters.sortBy
                }
            })
            dispatch({type: GamesListActionTypes.FETCH_GAMES_LIST_SUCCESS, payload: res.data})
            dispatch({type: GamesListActionTypes.SET_FILTERS, payload: filters})
        } catch (err) {
            dispatch({
                type: GamesListActionTypes.FETCH_GAMES_LIST_ERROR,
                payload: "Произошла ошибка при загрузке списка игр"
            })
        }
    }
}


