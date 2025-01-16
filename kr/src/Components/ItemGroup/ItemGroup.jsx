import "./ItemGroup.css";
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ItemIcon from "../ItemIcon/ItemIcon";
import { fetchItems } from '../../http/itemsAPI.js';

const ItemGroup = observer((props) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedItems = await fetchItems();
                setItems(loadedItems);
            } catch (error) {
                console.error("Ошибка при загрузке предметов:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            const filtered = items.filter(item => {
                // Фильтрация по props.text, учитывая ItemType и ItemType2
                const itemTypeMatch = item.ItemType?.toUpperCase() === props.text?.toUpperCase();
                const itemType2Match = item.ItemType2?.toUpperCase() === props.text?.toUpperCase();
                return itemTypeMatch || itemType2Match;
            });
            setFilteredItems(filtered);
        }
    }, [props.text, items]);

    return (
        <div className={props.className}>
            <div className="Name">
                <p>{props.text}</p>
            </div>
            <div className="Items">
                {filteredItems.map(item => (
                    <ItemIcon key={item.ItemId} item={item} img={item.ItemImg} />
                ))}
            </div>
        </div>
    );
});

export default ItemGroup;