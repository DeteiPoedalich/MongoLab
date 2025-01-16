import React, { useEffect, useState } from 'react';
import "./Facets.css"
import Facet from "../Facet/Facet.jsx"

export default function Facets({ heroId }) {
    const [facets, setFacets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!heroId) { 
            console.error('HeroId is not provided');
            setLoading(false);
            return;
        }

        const fetchFacets = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL+`api/facet/${heroId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();               
                setFacets(data);
            } catch (err) {
                console.error('Error fetching facets:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFacets();
    }, [heroId]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="Facets">
            {facets.length > 0 ? (
                facets.map(facet => (
                    <Facet color={facet.Color } text={facet.FacetName} description={facet.FacetDescription}/>
                ))
            ) : (
                <p>No facets available for this hero.</p>
            )}
        </div>
    );
}
