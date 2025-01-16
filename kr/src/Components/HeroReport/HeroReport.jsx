import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

function HeroReport({heroId}) {
    
    const [hero, setHero] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(heroId)
    useEffect(() => {
        if (!heroId) {
            console.error('Hero ID is not provided');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const heroResponse = await fetch(process.env.REACT_APP_API_URL+`api/heroes/${heroId}`);
                if (!heroResponse.ok) {
                    throw new Error(`HTTP error fetching hero! status: ${heroResponse.status}`);
                }
                const loadedHero = await heroResponse.json();

                setHero(loadedHero);

                const skillIds = [
                    loadedHero.SkillId1,
                    loadedHero.SkillId2,
                    loadedHero.SkillId3,
                    loadedHero.SkillId4,
                ].filter(id => id !== null); // Filter out null skill IDs

                const skillPromises = skillIds.map(skillId =>
                    fetch(process.env.REACT_APP_API_URL+`api/skill/${skillId}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error fetching skill ${skillId}! status: ${response.status}`);
                            }
                            return response.json();
                        })
                );

                const loadedSkills = await Promise.all(skillPromises);
                setSkills(loadedSkills);

            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load hero or skill data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [heroId]);



    function generateHeroReport() {
        const accessToken = localStorage.getItem('token');
        const userInfo = jwtDecode(accessToken); // Use jwt-decode to get user info

        

        const pdfDoc = new jsPDF();
        pdfDoc.setFont("times", "bold");
        pdfDoc.setFontSize(14);
        pdfDoc.setCharSpace(0.5);
        const formattedDate = new Date().toLocaleDateString();
        pdfDoc.text(`All users report. Date: ${formattedDate}`, 10, 10);
        pdfDoc.text(`Creator of report: ${userInfo.NickName}`, 10,20)

        const heroName = hero ? hero.HeroName : "N/A"; // Handle case where hero is not yet loaded
        const skillNames = skills.map(skill => skill.SkillName);

        // Fill in missing skill names if necessary
        while (skillNames.length < 4) {
            skillNames.push("N/A");
        }
        const columns = ["Hero", "Skill 1", "Skill 2","Skill 3","Skill 4"];
        const rows =  [heroName, skillNames[0],skillNames[1],skillNames[2],skillNames[3] ];

        

        autoTable(pdfDoc, {
            theme: "grid",
            headStyles: { fontSize: 10 },
            bodyStyles: { fontSize: 8, fontStyle: "italic" },
            head:[columns],
            body: [rows],
            startY: 30, // Adjust starting position as needed
        });

        pdfDoc.save(`${hero.HeroName}.pdf`);
    }


    if (loading) {
        return <div>Loading hero data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div style={{display:"flex", justifyContent:"center"}} >
            <button className='CreateReport' onClick={generateHeroReport}>Generate Hero Report</button>
        </div>
    );
}

export default HeroReport;