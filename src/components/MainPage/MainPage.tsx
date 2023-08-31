import React, {useEffect, useState} from 'react';
import GameList from "./GameList/GameList";
import GameFilters from "./GameFilters/GameFilters";
import GamesPagination from "./GamesPagination/GamesPagination";
import gameList from "./GameList/GameList";
import {useTypedSelector} from "../../helpers/hooks/useTypedSelector";
import type {} from 'redux-thunk/extend-redux';
import {useActions} from "../../helpers/hooks/useActions";


const MainPage = () => {
        const {gamesList, loading, error, gamesPerPage, currentPage} = useTypedSelector(state => state.gamesList);
        const lastGameIndex = currentPage * gamesPerPage;
        const firstGameIndex = lastGameIndex - gamesPerPage;
        const [filters, setFilters] = useState<Record<string, string>>({
            genre: undefined,
            platform: undefined,
            sortBy: undefined
        })

        const prep = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
        const prep2: Record<string, string>[] = prep.map(ig => {
            return {value: ig, label: ig}
        })
        // console.log(JSON.stringify(prep2))
        // // TODO Доставать фильтры из строки запроса и потом
        // // TODO Написать в инструкции юзать свой api key
        // TODO сделать, чтобы фильтры не обнулялись
        const {fetchGamesList} = useActions();
        useEffect(() => {
            fetchGamesList(filters);
        }, [filters]);

        if (loading) {
            return <h1>Идёт загрузка...</h1>
        }
        if (error) {
            return <h1>{error}</h1>
        }
        return (
            <div>
                {
                    gameList &&
                        <>
                            <GameFilters filters={filters} setFilters={setFilters}/>
                            <GameList
                                currentGames={gamesList.slice(firstGameIndex, lastGameIndex)}
                            />
                            <GamesPagination
                                gamesListLength={gamesList.length}
                                currentPage={currentPage}
                                gamesPerPage={gamesPerPage}
                            />
                        </>
                }
            </div>
        )
            ;
    }
;

export default MainPage;