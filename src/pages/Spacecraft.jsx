import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import Loading from "../components/Loading.jsx";

function Spacecraft() {

    const {id} = useParams();  //always strings 
    const [spacecraft, setSpacecraft] = useState(null); //object needs null 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadSpacecraft() {
            setIsLoading(true);

            const response = await SpaceTravelApi.getSpacecraftById({ id });

            if (!response.isError) {
                setSpacecraft(response.data);
            }
            setIsLoading(false);
        }
        loadSpacecraft();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    if (!spacecraft) {
        return <p>Spacecraft not found.</p>;
    }

    return (
        <div>
            <Link to="/spacecrafts">Back to Spacecrafts</Link>
            <h1>{spacecraft.name}</h1>
            {spacecraft.pictureUrl && <img src={spacecraft.pictureUrl} alt={spacecraft.name} />}
            <p>Capacity: {spacecraft.capacity}</p>
            <p>Description: {spacecraft.description}</p>
            <p>Current Location: {spacecraft.currentLocation}</p>
        </div>
    );
}

export default Spacecraft;
