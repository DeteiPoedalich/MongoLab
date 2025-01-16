// ItemBuild.js
import { useEffect, useState } from 'react';
import "../SkillBuild/SkillBuid.css";
import ItemBuildComponent from "../ItemBuildComponent/ItemBuildComponent";
import HeroReport from '../HeroReport/HeroReport';

const ItemBuild = ({ buildId }) => {
    const [itemIds, setItemIds] = useState([]); // Store item IDs


    useEffect(() => {
        const fetchBuildData = async () => {
            try {
                
                const response = await fetch(process.env.REACT_APP_API_URL+`api/build/${buildId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const ids = [
                    data.ItemId1,
                    data.ItemId2,
                    data.ItemId3,
                    data.ItemId4,
                    data.ItemId5,
                    data.ItemId6,
                ].filter(id => id !== null && id !== undefined); // Filter out null/undefined IDs
                console.log(ids)
                setItemIds(ids); // Set the item IDs


            } catch (error) {
                console.error("Ошибка при загрузке данных билда:", error);
                setItemIds([]); // Set empty array on error
            } 
        };

        if (buildId) {
            fetchBuildData();
        }
    }, [buildId]);
    return (
        <div className='ItemBuild'>            
                <ItemBuildComponent itemIds={itemIds} /> {/* Pass itemIds prop */}
        </div>
    );
};

export default ItemBuild;