import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import Loading from "../components/Loading.jsx";


function Spacecrafts() {

    const [spacecrafts, setSpacecrafts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    async function loadSpacecraft() {
        setIsLoading(true);
        const response = await SpaceTravelApi.getSpacecrafts();
        if (!response.isError) {
            setSpacecrafts(response.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadSpacecraft();
    }, []);

    async function handleDestroy(id) {
        await SpaceTravelApi.destroySpacecraftById({ id });
        loadSpacecraft();
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>Spacecrafts</h1>
            <Link to="/spacecrafts/new">Build A New Spacecraft</Link>
            <ul>
                {spacecrafts.map((spacecraft) =>(
                    <li key={spacecraft.id}>
                        <Link to={`/spacecrafts/${spacecraft.id}`}>{spacecraft.name}</Link> Capacity: {spacecraft.capacity} <br></br> Description: {spacecraft.description} <br></br> <img src={spacecraft.pictureUrl}/> <br></br> Location: {spacecraft.currentLocation}
                        <br></br>
                        <button onClick={ () => handleDestroy(spacecraft.id)}>Destroy</button>
                    </li>)
                )}
            </ul>
        </div>
    );
}

export default Spacecrafts;