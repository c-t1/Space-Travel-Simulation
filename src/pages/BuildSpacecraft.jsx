import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";

function BuildSpacecraft() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "The name is required.";}

        if (!capacity) {
            newErrors.capacity = "The capacity is required.";}
        
            if (!description.trim()) {
            newErrors.description = "The description is required.";}
        
        return newErrors;
    }

    async function handleSubmit(event) {
    
        event.preventDefault();

        const validationErrors = validate();
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
            }

        await SpaceTravelApi.buildSpacecraft({
            name,
            capacity: Number(capacity),
            description,
            pictureUrl: pictureUrl || undefined
        });

        navigate("/spacecrafts");
    }

    return (
        <div>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
            <h1>Build a New Spacecraft</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}/>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                        id="capacity"
                        type="number"
                        value={capacity}
                        onChange={(event) => setCapacity(event.target.value)}
                    />
                    {errors.capacity && <p>{errors.capacity}</p>}
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    {errors.description && <p>{errors.description}</p>}
                </div>
                <div>
                    <label htmlFor="pictureUrl">Picture URL (optional)</label>
                    <input
                        id="pictureUrl"
                        type="text"
                        value={pictureUrl}
                        onChange={(event) => setPictureUrl(event.target.value)}
                    />
                </div>
                <button type="submit">Build Spacecraft</button>
            </form>
        </div>
    );
}

export default BuildSpacecraft;
