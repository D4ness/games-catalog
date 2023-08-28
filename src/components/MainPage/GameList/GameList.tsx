import React, {useEffect, useState} from 'react';
import {Card, Col, Pagination, Row, Select, Space} from "antd";
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./GameList.module.scss";
import {useTheme} from "../../../theme/useTheme";
import axios from 'axios';
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {DateTime} from 'luxon';
import {json} from "stream/consumers";

type GameCard = {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    genre: string;
    thumbnail: string;
    platform: string;
}

interface GetGamesList extends Array<GameCard> {
    data: GameCard[];
}

// type filterType = {
//     genres: string[];
//     platforms: string[];
// }
const GameList = () => {
        const {theme, toggleTheme} = useTheme();
        const [gamesList, setGamesList] = useState<GameCard[]>([]);
        const [loading, setLoading] = useState<boolean>(false);
        const [currentPage, setCurrentPage] = useState<number>(1);
        const [gamesPerPage, setGamesPerPage] = useState<number>(20);
        const [filters, setFilters] = useState<Record<string, string>>({
            genre: undefined,
            platform: undefined,
            sortBy: undefined
        })
        const [genreList, setGenreList] = useState<string[]>([]);
        const [sort, setSort] = useState('');
        const updateFiltersLists = (data: GameCard[]) => {
            const preparedGenreList: string[] = [];
            const preparedPlatformList: string[] = [];
            data.map(game => {
                preparedGenreList.push(game.genre);
                preparedPlatformList.push(game.platform);
            })
            const preparedGenreSet: Set<string> = new Set(preparedGenreList);
            const preparedPlatformSet: Set<string> = new Set(preparedPlatformList);
            setGenreList(Array.from(preparedGenreSet))
        }
        const prep = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
        const prep2: Record<string, string>[] = prep.map(ig => {
            return {value: ig, label: ig}
        })
        // console.log(JSON.stringify(prep2))
        // console.log(filters.values)
        // TODO Сделать подставление параметров иначе
    const createUrl = () => {
        console.log('createURL')
        let url: string = 'https://free-to-play-games-database.p.rapidapi.com/api/games?';
        url = `${url}${Object.keys(filters).map(key => {
            if (filters[key]) {
                switch (key){
                    case "genre":
                        return `category=${filters[key]}&`;
                    case "platform":
                        return `platform=${filters[key]}&`                    
                    case "sortBy":
                        return `sort-by=${filters[key]}&`
                    default:
                        return ""
                }
            } else {
                return ''
            }
        })}`.replace(/,/g,"")
        console.log(url)
        return url
    }
        // TODO Доставать фильтры из строки запроса и потом
        // TODO Написать в инструкции юзать свой api key
        useEffect(() => {
                const getGameList = async () => {
                    setLoading(true);
                    // const url = 'https://www.freetogame.com/api/games';
                    const res = await axios.get<GetGamesList>(`${createUrl()}`, {
                        withCredentials: true,
                        headers: {
                            'X-RapidAPI-Key': 'e63c24b3a6mshad443ba4cc4945bp19c8a0jsn8cb40823ecb9',
                            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                        }
                    })
                    updateFiltersLists(res.data);
                    setGamesList(res.data)
                    setLoading(false);
                };
                getGameList();
            }
            ,
            [filters]
        );

        const lastGameIndex = currentPage * gamesPerPage;
        const firstGameIndex = lastGameIndex - gamesPerPage;
        const currentGames = gamesList.slice(firstGameIndex, lastGameIndex);
        return (
            <div>
                <div>Фильтры:</div>
                <Space wrap>
                    По жанру:
                    <Select
                        allowClear
                        style={{width: 120}}
                        onChange={option => {
                            console.log(option)
                            setFilters({...filters, genre: option})
                        }}
                        // defaultValue={genre}
                        options={
                            [{"value": "mmorpg", "label": "mmorpg"}, {"value": "shooter", "label": "shooter"}, {"value": "strategy", "label": "strategy"}, {"value": "moba", "label": "moba"}, {"value": "racing", "label": "racing"}, {"value": "sports", "label": "sports"}, {"value": "social", "label": "social"}, {"value": "sandbox", "label": "sandbox"}, {"value": "open-world", "label": "open-world"}, {"value": "survival", "label": "survival"}, {"value": "pvp", "label": "pvp"}, {"value": "pve", "label": "pve"}, {"value": "pixel", "label": "pixel"}, {"value": "voxel", "label": "voxel"}, {"value": "zombie", "label": "zombie"}, {"value": "turn-based", "label": "turn-based"}, {"value": "first-person", "label": "first-person"}, {"value": "third-Person", "label": "third-Person"}, {"value": "top-down", "label": "top-down"}, {"value": "tank", "label": "tank"}, {"value": "space", "label": "space"}, {"value": "sailing", "label": "sailing"}, {"value": "side-scroller", "label": "side-scroller"}, {"value": "superhero", "label": "superhero"}, {"value": "permadeath", "label": "permadeath"}, {"value": "card", "label": "card"}, {"value": "battle-royale", "label": "battle-royale"}, {"value": "mmo", "label": "mmo"}, {"value": "mmofps", "label": "mmofps"}, {"value": "mmotps", "label": "mmotps"}, {"value": "3d", "label": "3d"}, {"value": "2d", "label": "2d"}, {"value": "anime", "label": "anime"}, {"value": "fantasy", "label": "fantasy"}, {"value": "sci-fi", "label": "sci-fi"}, {"value": "fighting", "label": "fighting"}, {"value": "action-rpg", "label": "action-rpg"}, {"value": "action", "label": "action"}, {"value": "military", "label": "military"}, {"value": "martial-arts", "label": "martial-arts"}, {"value": "flight", "label": "flight"}, {"value": "low-spec", "label": "low-spec"}, {"value": "tower-defense", "label": "tower-defense"}, {"value": "horror", "label": "horror"}, {"value": "mmorts", "label": "mmorts"}]
                        }

                    />
                    По платформе:
                    <Select
                        style={{width: 120}}
                        onChange={option => setFilters({...filters, platform: option})}
                        options={[
                            {value: "pc", label: "PC"},
                            {value: "browser", label: "Browser"}
                        ]}
                    />

                </Space>
                <Select
                    style={{width: 120}}
                    onChange={option => setFilters({...filters, sortBy: option})}
                    options={[
                        {value: "alphabetical", label: "По алфавитному порядку"},
                        {value: "release-date", label: "По дате релиза"},
                        {value: "popularity", label: "По популярности"},
                    ]}
                />

                <div className={classNames(cls.wrapper, {}, [theme])}>
                    <Row gutter={[24, 24]}>
                        {
                            currentGames.map(game =>
                                <Col span={24} md={8} xl={6} key={game.id}>
                                    <Link to={`/${game.id}`}>
                                        <Card
                                            cover={<img alt={`${game.title}-image`} src={game.thumbnail}/>}
                                            style={{backgroundColor: "var(--primary-color)", border: "none"}}
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