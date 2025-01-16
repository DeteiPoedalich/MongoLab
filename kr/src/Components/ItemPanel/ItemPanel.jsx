import '../ItemPanel/ItemPanel.css';
import ItemGroup from "../ItemGroup/ItemGroup.jsx";

export default function ItemPanel(props) {
    let itemGroups;
    let classname
    if (props.text === "UPGRADES") {
        itemGroups = [
            "ACCESSORIES",
            "SUPPORT",
            "MAGICAL",
            "ARMOR",
            "WEAPONS",
            "ARTIFACTS"
        ];
        classname="ItemGroup"
        
    } else if (props.text === "BASICS") {
        itemGroups = [
            "CONSUMABLES",
            "ATTRIBUTES",
            "EQUIPMENT",
            "MISCELLANEOUS",
            "SECRET SHOP"
        ];
        classname="ItemGroup"
    } else {
        itemGroups = [
            "TIER 1",
            "TIER 2",
            "TIER 3",
            "TIER 4",
            "TIER 5"
        ];
        classname="Neutrals"
    }

    return (
        <div className='ItemPanel'>
            <p>{props.text}</p>
            <div className='ItemGroups'>
                {itemGroups.map((text, index) => (
                    <ItemGroup key={index} text={text} className={classname} />
                ))}
            </div>
        </div>
    );
}