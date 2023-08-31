import {Dispatch} from "react";
import {GamesListAction, GamesListActionTypes} from "../../types/gamesList";

export const changePage = (newPage: number) => {
    return (dispatch: Dispatch<GamesListAction>) => {
        dispatch({type: GamesListActionTypes.CHANGE_PAGE, payload: newPage});
    }
}