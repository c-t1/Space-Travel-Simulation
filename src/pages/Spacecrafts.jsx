import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi.js";


function Spacecrafts() {

    const [spacecrafts, setSpacecrafts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        async function loadSpacecraft() {
            setIsLoading(true);
            const response = await SpaceTravelApi.getSpacecrafts();
            if (!response.isError) {
                setSpacecrafts(response.data);
            }
            setIsLoading(false);
        }
        loadSpacecraft();
    }, []);

    if (isLoading) {
        return <p>Now Loading...</p>
    }

    return (
        <div>
            <h1>Spacecrafts</h1>
            <ul>
                {spacecrafts.map((spacecraft) =>(
                    <li key={spacecraft.id}>{spacecraft.name} Capacity: {spacecraft.capacity} <br></br> Description: {spacecraft.description} <br></br> <img src={spacecraft.pictureUrl}/> <br></br> Location: {spacecraft.currentLocation}</li>)
                )}
            </ul>
        </div>
    );
}

export default Spacecrafts;