import React, {useEffect, useState} from 'react';
import {Card, Col, Pagination, Row} from "antd";
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./GameList.module.scss";
import {useTheme} from "../../../theme/useTheme";
import axios from 'axios';
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {DateTime} from 'luxon';

type GameCard = {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    genre: string;
    thumbnail: string;
}

interface GetGamesList extends Array<GameCard> {
    data: GameCard[];
}

const GameList = () => {
        const {theme, toggleTheme} = useTheme();
        const [gamesList, setGamesList] = useState<GameCard[]>([]);
        const [loading, setLoading] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [gamesPerPage, setGamesPerPage] = useState(20);

        // TODO Доставать фильтры из строки запроса и потом
        // TODO Написать в инструкции юзать свой api key
        useEffect(() => {
                const getGameList = async () => {
                    setLoading(true);
                    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
                    // const url = 'https://www.freetogame.com/api/games';
                    const res = await axios.get<GetGamesList>(`${url}`, {
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
            }
            ,
            []
        );

        const lastGameIndex = currentPage * gamesPerPage;
        const firstGameIndex = lastGameIndex - gamesPerPage;
        const currentGames = gamesList.slice(firstGameIndex, lastGameIndex);
        return (
            <div>
                <div className={classNames(cls.wrapper, {}, [theme])}>
                    <Row gutter={[24, 24]}>
                        {
                            currentGames.map(game =>
                                <Col span={24} md={8} xl={6} key={game.id}>
                                    <Link to={`/${game.id}`}>
                                        <Card
                                            cover={<img alt={`${game.title}-image`} src={game.thumbnail}/>}
                                        >
                                            <Meta
                                                title={game.title}
                                                description={
                                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                                        <div>{game.genre}</div>
                                                        <div>
                                                            Дата издания: {
                                                            DateTime
                                                                .fromFormat(game.release_date, 'yyyy-mm-dd')
                                                                .toFormat('dd LLL yyyy', {locale: 'ru-RU'})
                                                        }
                                                        </div>
                                                    </div>
                                                }
                                            />
                                            <div>{game.publisher}</div>
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