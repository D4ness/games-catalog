import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Game} from "../../types/Game";

export const fetchGame = createAsyncThunk(
    'game',
    async (gameId: number, thunkAPI) => {
        try {
            const url = "https://free-to-play-games-database.p.rapidapi.com/api/game"
            const res = await axios.get<Game>(url, {
                withCredentials: true,
                params: {
                  id: gameId
                },
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })

            return res.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить данные об игре")
        }
    }
)
