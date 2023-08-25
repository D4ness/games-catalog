import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './styles/index.scss';
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";
import MainPage from "./components/MainPage/MainPage";
import GamePage from "./components/GamePage/GamePage";


const App = () => {
    const {theme, toggleTheme} = useTheme();
    const bool = true;
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to={'/'}>Главная</Link>
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
