import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './styles/index.scss';
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";
import MainPage from "./components/MainPage/MainPage";
import GamePage from "./components/GamePage/GamePage";
import ButtonUI from "./components/UI/ButtonUI/ButtonUI";


const App = () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <div className={classNames('app', {}, [theme])}>
            <header className={classNames('headerWrapper', {}, [theme])}>
                <Link to={'/'} className={classNames("mainLink", {}, [])}>Главная</Link>
                <ButtonUI onClick={toggleTheme}>Изменить тему</ButtonUI>
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path=":id" element={<GamePage/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
