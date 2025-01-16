import { useEffect, useState } from 'react';
import "./Skills.css"
import Skill from '../Skill/Skill.jsx' 

const Skills = ({ heroId,className1,className2 }) => {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!heroId) {
            console.error('Hero ID is not provided');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL+`api/heroes/${heroId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`); // Обработка ошибок HTTP
                }
                const data = await response.json();
                setHero(data);
            } catch (error) {
                console.error("Ошибка при загрузке героя:", error);
                setError("Не удалось загрузить данные о герое");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [heroId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!hero) return <div>Hero not found</div>;

    const { SkillId1, SkillId2, SkillId3, SkillId4 } = hero;
    const skillIds = [SkillId1, SkillId2, SkillId3, SkillId4];

    return (
        <div className={className1}>
            {skillIds.map((skillId) => (
                <Skill skillId={skillId} className3={className2}/>
            ))}
        </div>
    );
};

export default Skills;
