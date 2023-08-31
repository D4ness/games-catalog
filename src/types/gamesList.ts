export type GameCardType = {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    genre: string;
    thumbnail: string;
    platform: string;
}
export type FiltersType = {
    genre?: string;
    platform?: string;
    sortBy?: string;
}

export interface GamesListState {
    gamesList: GameCardType[];
    loading: boolean;
    error: null | string;
    gamesPerPage: number;
    currentPage: number;
    filters: FiltersType;
}

export enum GamesListActionTypes {
    FETCH_GAMES_LIST = "FETCH_GAMES_LIST",
    FETCH_GAMES_LIST_SUCCESS = "FETCH_GAMES_LIST_SUCCESS",
    FETCH_GAMES_LIST_ERROR = "FETCH_GAMES_LIST_ERROR",
    CHANGE_PAGE = "CHANGE_PAGE",
    SET_FILTERS = "SET_FILTERS"
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

interface SetFiltersAction {
    type: GamesListActionTypes.SET_FILTERS;
    payload: FiltersType;
}

export type GamesListAction =
    FetchGamesListAction
    | FetchGamesListErrorAction
    | FetchGamesListSuccessAction
    | ChangePageAction
    | SetFiltersAction;