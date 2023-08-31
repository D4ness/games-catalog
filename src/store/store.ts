import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {gamesListReducer} from "./reducers/gamesListReducer";
import {gameAPI} from "../services/GameService";

const rootReducer = combineReducers({
    gamesList: gamesListReducer,
    [gameAPI.reducerPath] : gameAPI.reducer,
})
export type RootState = ReturnType<typeof rootReducer>
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(gameAPI.middleware)
    })
}
export type AppStore = ReturnType<typeof setupStore>;
