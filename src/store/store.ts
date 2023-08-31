import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {gamesReducer} from "./reducers/gamesReducer";

const rootReducer = combineReducers({
    games: gamesReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch']