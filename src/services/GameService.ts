import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Game} from "../types/Game";


export const gameAPI = createApi({
    reducerPath: 'gameAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://free-to-play-games-database.p.rapidapi.com/api/'},  ),
    endpoints: (build) => ({
        fetchGame: build.query<Game, number>({
            query: (id: number) => ({
                url: `/game`,
                params: {
                    id: id
                },
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                },
                withCredentials: true,

            }),
            keepUnusedDataFor: 300,
        }),
    })
})
