import React, {SetStateAction} from 'react';
import {Select, Space} from "antd";

interface IProps {
    filters: Record<string, string>;
    setFilters: React.Dispatch<SetStateAction<Record<string, string>>>
}
const GameFilters = ({filters, setFilters}:IProps) => {
    return (
        <>
            <div>Фильтры:</div>
            <Space wrap>
                По жанру:
                <Select
                    allowClear
                    style={{width: 120}}
                    onChange={option => {
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
        </>
    );
};

export default GameFilters;