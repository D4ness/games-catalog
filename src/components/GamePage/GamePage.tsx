import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {DateTime} from "luxon";
import {Carousel} from "antd";
import {useTheme} from "../../theme/useTheme";

type Screenshot = {
    id: number;
    image: string;
}

interface Game {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    developer: string;
    genre: string;
    thumbnail: string;
    minimum_system_requirements: Record<string, string>;
    screenshots: Screenshot[];
}


const GamePage = () => {
    const {theme, toggleTheme} = useTheme();
    const {id} = useParams();
    const [game, setGame] = useState<Game>(null);
    const [imageSize, setImageSize] = useState('500px');
    const calculateImageSize = () => {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const screenSize = screenWidth > screenHeight ? screenWidth/1.78*0.7 : screenHeight*0.7;
        setImageSize(`${screenSize}px`);
    }
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
        calculateImageSize();
        console.log("GAME", game);
    }, []);
    return (
        <>
            {
                game !== null ?
                    <div>
                        <div>{game.title}</div>
                        <div>
                            Дата издания: {
                            DateTime
                                .fromFormat(game.release_date, 'yyyy-mm-dd')
                                .toFormat('dd LLL yyyy', {locale: 'ru-RU'})
                        }
                        </div>
                        <div>Издатель: {game.publisher}, Разработчик: {game.developer}, Жанр: {game.genre}</div>
                        <div>{game.minimum_system_requirements.values}</div>
                        <Carousel>
                            {game.screenshots.map(screen =>
                                <div key={screen.id}>
                                    <div
                                        style={{
                                            margin: "0 auto", backgroundImage: `url(${screen.image})`,
                                            width: "70%", minHeight: imageSize,
                                            backgroundSize: "100%", color: "white"
                                        }}
                                    >
                                    </div>
                                </div>)}
                        </Carousel>
                    </div> :
                    <div>Ошибка</div>
            }
        </>
    );
};

export default GamePage;