import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const GamePage = () => {
    const {id} = useParams();
    const [game, setGame] = useState<Record<string, string | number>>(null);
    const getGameInfo = async (id: string) => {
        try {
            const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
            const res = await axios.get(`${url}`, {
                withCredentials: true,
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
            setGame(res.data)
        } catch (e) {
            console.log(e)
            setGame(null);
        }
    };
    useEffect(() => {
        getGameInfo(id);
    }, []);
    console.log(game)

    return (
        <>
            ИГРА
        </>
    );
};

export default GamePage;