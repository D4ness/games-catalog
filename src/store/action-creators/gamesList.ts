import axios from "axios";
import {GameCardType} from "../../components/MainPage/GameList/GameList";
import {GamesListAction, GamesListActionTypes} from "../../types/gamesList";
import {Dispatch} from "react";
interface GetGamesList extends Array<GameCardType> {
    data: GameCardType[];
}

const createUrl = (filters: Record<string, string>) => {
    let url: string = 'https://free-to-play-games-database.p.rapidapi.com/api/games?';
    url = `${url}${Object.keys(filters).map(key => {
        if (filters[key]) {
            switch (key) {
                case "genre":
                    return `category=${filters[key]}&`;
                case "platform":
                    return `platform=${filters[key]}&`
                case "sortBy":
                    return `sort-by=${filters[key]}&`
                default:
                    return ""
            }
        } else {
            return ''
        }
    })}`.replace(/,/g, "")
    return url
}


export const fetchGamesList = (filters: Record<string, string>) => {
    return async (dispatch: Dispatch<GamesListAction>) => {
        try {
            dispatch({type: GamesListActionTypes.FETCH_GAMES_LIST})
            const res = await axios.get<GetGamesList>(createUrl(filters), {
                withCredentials: true,
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
            console.log("ща будет")
            dispatch({type: GamesListActionTypes.FETCH_GAMES_LIST_SUCCESS, payload: res.data})
        } catch (err) {
            console.log("error!")
            dispatch({
                type: GamesListActionTypes.FETCH_GAMES_LIST_ERROR,
                payload: "Произошла ошибка при загрузке списка игр"
            })
        }
    }
}


