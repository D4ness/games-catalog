import React, {useEffect, useState} from 'react';
import {Card, Col, Pagination, Row} from "antd";
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./GameList.module.scss";
import {useTheme} from "../../../theme/useTheme";
import axios from 'axios';
import {Link, Route} from "react-router-dom";
import GamePage from "../../GamePage/GamePage";

const GameList = () => {
        const {theme, toggleTheme} = useTheme();
        const [gamesList, setGamesList] = useState([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [gamesPerPage, setGamesPerPage] = useState(20);

        const testList = [
            {
                "id": 540,
                "title": "Overwatch 2",
                "thumbnail": "https:\/\/www.freetogame.com\/g\/540\/thumbnail.jpg",
                "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
                "game_url": "https:\/\/www.freetogame.com\/open\/overwatch-2",
                "genre": "Shooter",
                "platform": "PC (Windows)",
                "publisher": "Activision Blizzard",
                "developer": "Blizzard Entertainment",
                "release_date": "2022-10-04",
                "freetogame_profile_url": "https:\/\/www.freetogame.com\/overwatch-2"
            },
            {
                "id": 521,
                "title": "Diablo Immortal",
                "thumbnail": "https:\/\/www.freetogame.com\/g\/521\/thumbnail.jpg",
                "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
                "game_url": "https:\/\/www.freetogame.com\/open\/diablo-immortal",
                "genre": "MMOARPG",
                "platform": "PC (Windows)",
                "publisher": "Blizzard Entertainment",
                "developer": "Blizzard Entertainment",
                "release_date": "2022-06-02",
                "freetogame_profile_url": "https:\/\/www.freetogame.com\/diablo-immortal"
            }];

        // TODO Доставать фильтры из строки запроса и потом
        // TODO Написать в инструкции юзать свой api key
        useEffect(() => {
            const getGameList = async () => {
                setLoading(true);
                const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
                // const url = 'https://www.freetogame.com/api/games';
                const res = await axios.get(`${url}?sort-by=alphabetical`, {
                    withCredentials: true,
                    headers: {
                        'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                    }
                })
                setGamesList(res.data)
                setLoading(false);
            };
            getGameList();
        }, []);
        const getGameList = async () => {
            const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
            // const url = 'https://www.freetogame.com/api/games';
            const res = await axios.get(`${url}?sort-by=alphabetical`, {
                withCredentials: true,
                headers: {
                    'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            })
            setGamesList(res.data)
        };

        const lastGameIndex = currentPage * gamesPerPage;
        const firstGameIndex = lastGameIndex - gamesPerPage;
        const currentGames = gamesList.slice(firstGameIndex, lastGameIndex);
        return (
            <div>
                <div className={classNames(cls.wrapper, {}, [theme])}>
                    <button type="button" onClick={getGameList}>Клик</button>
                    <Row gutter={[24, 24]}>
                        {
                            currentGames.map(game =>
                                <Col span={24} md={8} xl={6} key={game.id}>
                                    <Link to={`/${game.id}`}>
                                        <Card
                                            title={game.title}
                                            cover={<img alt={`${game.title}-image`} src={game.thumbnail}/>}
                                        >
                                            <p>{game.publisher}</p>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        }
                    </Row>

                </div>
                <Row justify="center">
                    <Col>
                        <Pagination
                            current={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                            total={gamesList.length}
                            // defaultPageSize={20}
                            pageSize={gamesPerPage}
                            showSizeChanger={false}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
;

export default GameList;