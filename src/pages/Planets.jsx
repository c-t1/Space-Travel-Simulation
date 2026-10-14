import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import Loading from "../components/Loading.jsx";

function Planets() {

    const [planets, setPlanets] = useState([]);
    const [spacecrafts, setSpacecrafts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dispatchErrors, setDispatchErrors] = useState({});

    async function loadData() {
        setIsLoading(true);
        const [planetsResponse, spacecraftsResponse] = await Promise.all([
            SpaceTravelApi.getPlanets(),
            SpaceTravelApi.getSpacecrafts()]);

        if (!planetsResponse.isError) {
            setPlanets(planetsResponse.data);
        }

        if (!spacecraftsResponse.isError) {
            setSpacecrafts(spacecraftsResponse.data);
        }

        setIsLoading(false);
    }

    useEffect(() => {loadData();}, []);

    async function handleDispatch(spacecraftId, targetPlanetId) {
        setDispatchErrors((prev) => ({ ...prev, [spacecraftId]: null }));

        const response = await SpaceTravelApi.sendSpacecraftToPlanet({
            spacecraftId,
            targetPlanetId: Number(targetPlanetId)
        });

        if (response.isError) {
            setDispatchErrors((prev) => ({ ...prev, [spacecraftId]: response.data.message }));
            return;
        }

        loadData();
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h1>Planets</h1>
            {planets.map((planet) => {
                const stationedSpacecrafts = spacecrafts.filter(
                    (spacecraft) => spacecraft.currentLocation === planet.id
                );

                return (
                    <div key={planet.id}>
                        <h2>{planet.name}</h2>
                        <img src={planet.pictureUrl} alt={planet.name} width="150" />
                        <p>Population: {planet.currentPopulation}</p>
                        <ul>
                            {stationedSpacecrafts.map((spacecraft) => (
                                <li key={spacecraft.id}>
                                    {spacecraft.name} (capacity: {spacecraft.capacity})
                                    <select
                                        defaultValue=""
                                        onChange={(event) => {
                                            if (event.target.value) {
                                                handleDispatch(spacecraft.id, event.target.value);
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Send to...</option>
                                        {planets
                                            .filter((target) => target.id !== planet.id)
                                            .map((target) => (
                                                <option key={target.id} value={target.id}>
                                                    {target.name}
                                                </option>
                                            ))}
                                    </select>
                                    {dispatchErrors[spacecraft.id] && (
                                        <p>{dispatchErrors[spacecraft.id]}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}

export default Planets;


//Promise.all will run independent reqs in parallel