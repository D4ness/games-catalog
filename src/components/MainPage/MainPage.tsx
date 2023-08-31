import React, {useEffect, useState} from 'react';
import GameList from "./GameList/GameList";
import GameFilters from "./GameFilters/GameFilters";
import GamesPagination from "./GamesPagination/GamesPagination";
import gameList from "./GameList/GameList";
import {useTypedSelector} from "../../helpers/hooks/useTypedSelector";
import type {} from 'redux-thunk/extend-redux';
import {useActions} from "../../helpers/hooks/useActions";
import {FiltersType} from "../../types/gamesList";


const MainPage = () => {
        const {gamesList, loading, error, gamesPerPage, currentPage, filters} = useTypedSelector(state => state.gamesList);
        const lastGameIndex = currentPage * gamesPerPage;
        const firstGameIndex = lastGameIndex - gamesPerPage;
        const [filtersPage, setFiltersPage] = useState<FiltersType>(filters);
        const {fetchGamesList} = useActions();
        useEffect(() => {
            fetchGamesList();
        }, []);

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
                            <GameFilters filters={filtersPage} setFilters={setFiltersPage}/>
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