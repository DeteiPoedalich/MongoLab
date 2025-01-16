import '../HeroByAttribute/HeroByAttribute.css';
import HeroIcon from "../HeroIcon/HeroIcon.jsx";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { fetchHeroes } from '../../http/heroesAPI.js';

const HeroByAttribute = observer((props) => {
    const [heroes, setHeroes] = useState([]);
    const [filteredHeroes, setFilteredHeroes] = useState([]); // Состояние для отфильтрованных героев

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedHeroes = await fetchHeroes();
                setHeroes(loadedHeroes);
                setFilteredHeroes(loadedHeroes); // Изначально отображаем всех героев
            } catch (error) {
                console.error("Ошибка при загрузке героев:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Фильтрация героев при изменении props.text (атрибута)
        if (props.text && heroes.length > 0) {
            const filtered = heroes.filter(hero => hero.Attribute.toUpperCase() === props.text);
            setFilteredHeroes(filtered);
        } else {
            // Если props.text пустой или null, отображаем всех героев
            setFilteredHeroes(heroes);
        }
    }, [props.text, heroes]); // Зависимости от props.text и heroes


    return (
        <div className='HeroByAttribute'>
            <div className='Attribute'>
                <img src={props.img} alt={props.text || ''} />
                <p>{props.text}</p>
            </div>
            <div className='Heroes'>
                {filteredHeroes.map(hero => ( // Отображаем отфильтрованных героев
                    <Link to={`/hero/${hero.HeroId}`} key={hero.HeroId}>
                        <HeroIcon hero={hero} img={hero.HeroImg} />
                    </Link>
                ))}
            </div>
        </div>
    );
});

export default HeroByAttribute;