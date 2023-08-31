import {GameCardType} from "../components/MainPage/GameList/GameList";

export interface GamesListState {
    gamesList: GameCardType[];
    loading: boolean;
    error: null | string;
    gamesPerPage: number;
    currentPage: number;
}

export enum GamesListActionTypes {
    FETCH_GAMES_LIST = "FETCH_GAMES_LIST",
    FETCH_GAMES_LIST_SUCCESS = "FETCH_GAMES_LIST_SUCCESS",
    FETCH_GAMES_LIST_ERROR = "FETCH_GAMES_LIST_ERROR",
    CHANGE_PAGE = "CHANGE_PAGE"
}

interface FetchGamesListAction {
    type: GamesListActionTypes.FETCH_GAMES_LIST;
}

interface FetchGamesListSuccessAction {
    type: GamesListActionTypes.FETCH_GAMES_LIST_SUCCESS;
    payload: GameCardType[];
}

interface FetchGamesListErrorAction {
    type: GamesListActionTypes.FETCH_GAMES_LIST_ERROR;
    payload: string;
}

interface ChangePageAction {
    type: GamesListActionTypes.CHANGE_PAGE;
    payload: number;
}

export type GamesListAction =
    FetchGamesListAction
    | FetchGamesListErrorAction
    | FetchGamesListSuccessAction
    | ChangePageAction;