import { useEffect, useState } from 'react';
import "../SkillBuild/SkillBuid.css";
import Skills from '../Skills/Skills';
import ItemBuild from '../ItemBuild/ItemBuild';
import {Box} from "@mui/material"


const SkillBuild = ({ buildId }) => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuildData = async () => {
            try {
                setLoading(true);
                const response = await fetch(process.env.REACT_APP_API_URL+`api/build/${buildId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const buildData = await response.json();

                const skillLvls = {
                    skill1: buildData.SkillLVL1.split(" ").map(Number),
                    skill2: buildData.SkillLVL2.split(" ").map(Number),
                    skill3: buildData.SkillLVL3.split(" ").map(Number),
                    skill4: buildData.SkillLVL4.split(" ").map(Number),
                };

                const allSkills = [];

                // Создаем элементы для каждого скилла
                for (let skillNum = 1; skillNum <= 4; skillNum++) {
                    const skillElements = [];
                    for (let i = 1; i <= 18; i++) {
                        const isActive = skillLvls[`skill${skillNum}`].includes(i);
                        skillElements.push(
                                <div key={`${skillNum}-${i}`} className="SkillLVLS">
                                    {isActive ? i : ''}
                                </div>
                        );
                    }
                    allSkills.push(<div key={`skill-${skillNum}`} className="skill-group">{skillElements}</div>);
                }

                setSkills(allSkills);

            } catch (error) {
                console.error("Ошибка при загрузке данных билда:", error);
                setSkills([]);
            } finally {
                setLoading(false);
            }
        };

        if (buildId) {
            fetchBuildData();
        }

    }, [buildId]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Box className="skill-build-with-skills">
            <Box className="gugug">
                <Skills heroId={parseInt(buildId)} className1="SkillsForBuild" className2="SkillForBuild"/>
                <Box className="skill-build">                   
                    {skills}                   
                </Box>
            </Box>
            <Box className='ItemsBuild'>
                <p className='ItemBuildP'>Usual Build</p>
                <ItemBuild buildId={parseInt(buildId)}/>
            </Box>
            
        </Box>
    );
};

export default SkillBuild;