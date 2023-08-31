import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Game} from "../../types/Game";
import {fetchGame} from "../action-creators/game";

interface GameState {
    game: Game;
    isLoading: boolean;
    error: string;
}

const initialState: GameState = {
    game: undefined,
    isLoading: false,
    error: '',
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGame.fulfilled.type]: (state, action: PayloadAction<Game>) => {
            state.isLoading = false;
            state.error = ''
            state.game = action.payload;
        },
        [fetchGame.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchGame.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default gameSlice.reducer;
