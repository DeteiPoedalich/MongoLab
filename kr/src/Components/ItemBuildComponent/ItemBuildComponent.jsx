import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ItemIcon from "../ItemIcon/ItemIcon";
import { fetchItems } from '../../http/itemsAPI.js';
import "./ItemBuildComponent.css"

const ItemBuildComponent = observer(({ itemIds }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedItems = await fetchItems();

                // Map itemIds to find corresponding items in loadedItems, maintaining order
                const filteredItems = itemIds.map(itemId => {
                    return loadedItems.find(item => item.ItemId === itemId);
                }).filter(item => item !== undefined); // Filter out undefined in case an item ID isn't found


                setItems(filteredItems);
            } catch (error) {
                console.error("Ошибка при загрузке предметов:", error);
                setItems([]);
            }
        };

        if (itemIds && itemIds.length > 0) {
            fetchData();
        }

    }, [itemIds]);

    return (
        <div className='papapa'>
            <div className="ItemsForBuild">
                {items.map(item => (
                    <ItemIcon key={item.ItemId} item={item} img={item.ItemImg} />
                ))}
            </div>
        </div>
    );
});

export default ItemBuildComponent;