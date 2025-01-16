import { useEffect, useState } from 'react';

const Skill = ({ skillId,className3} ) => {
    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        if (!skillId) {
            console.error('Skill ID is not provided');
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL+`api/skill/${skillId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSkill(data);
            } catch (error) {
                console.error("Ошибка при загрузке скилла:", error); // Исправлено сообщение об ошибке
                setError("Не удалось загрузить данные о скилле"); // Исправлено сообщение об ошибке
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [skillId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!skill) return <div>Skill not found</div>;
    const imageUrl = process.env.REACT_APP_API_URL+`${skill.SkillImg}`;
    console.log(imageUrl)
    return (
        <div>
            {isShown && (
                    <div className='OnHover' onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}>
                    <div className='Hover'>
                        <img className='HoverImgSkill' src={imageUrl} alt="" />
                        <p>{skill.SkillName}</p>
                    </div>
                    <div className='Hover-description'>
                        <p>{skill.SkillDescription}</p>
                    </div>
                </div>
            )}
        
        <div className={className3} onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            <img src={imageUrl} alt={skill.SkillName || "Skill"} /> 
        </div>
        </div>
    );
};

export default Skill;