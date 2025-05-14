import { useEffect, useState } from 'react'
import "./RobotSearchForm.css"
import RobotList from "./RobotList.js"

let counter = 0;

export const RobotSearchForm = () => {


    useEffect(() => {
        localStorage.setItem("robots", JSON.stringify(robotStates))
    })

    let [robotStates, setRobotStates] = useState(() =>
        {
            const allRobots = localStorage.getItem("robots");
            console.log(allRobots != null ? "Reading from local storage" : "creating new data")
            return JSON.parse(allRobots) ??
            [
                {name: "Cooking", type: "ready", tags: ["low energy", "hospitality", "convenience"]},
                {name: "Washing Up", type: "ready", tags: ["hospitality", "convenience"]},
                {name: "Smart Dehumidifier", type: "ready", tags: ["low energy"]},
                {name: "Weather Tracker", type: "inactive", tags: ["low energy"]},
                {name: "Carbonator", type: "inactive", tags: ["low energy", "hospitality", "convenience"]},
                {name: "Water Purifier (1)", type: "busy", tags: ["hospitality"]},
                {name: "Water Purifier (2)", type: "busy", tags: ["hospitality"]},
                {name: "MP4 - MP3 Converter", type: "busy", tags: ["low energy"]},
                {name: "Yarn Winder", type: "busy", tags: ["low energy", "home"]}
            ]
        }
    );

    // Change the type of the specified robot
    function handleChangeRobotType(robotName, newType) {
        // Find the index and replace type
        let robotStatesCopy = [...robotStates]
        const robotToChangeIndex = robotStatesCopy.findIndex(robot => robot.name == robotName);
        robotStatesCopy[robotToChangeIndex].type = newType;

        setRobotStates(robotStatesCopy);
    }

    
    let [newBot, setNewBot] = useState({name: "", type: "ready"})
    function handleJobNameChange(e) {
        setNewBot(
            {name: e.target.value, type:newBot.type}
        )
    }

    function handleJobTypeChange(e) {
        setNewBot(
            {name: newBot.name, type:e.target.value}
        )
    }

    /* Set default new Job*/

    function handleDelete(name)
    {
        
        let robotStatesCopy = [...robotStates]
        const robotToChangeIndex = robotStatesCopy.findIndex(robot => robot.name == name);
        robotStatesCopy.splice(robotToChangeIndex, 1);
        setRobotStates(robotStatesCopy);
    }

    // Adds the new bot specified by the user
    function addNewBot()
    {
        if (newBot.name.trim() == "") {
            alert("Input field cannot be empty!")
            return;
        }
        console.log("Add New Job");
        setRobotStates([...robotStates, newBot]);
        setNewBot({name: "", type: "ready", tags: []});
    }

    let [botFilters, setBotFilters] = useState([]);
    
    function toggleFilterActive(filterToToggle)
    {
        const isFilterActive = (botFilters.some(filter => filter === filterToToggle))
        if (!isFilterActive) {
            setBotFilters([...botFilters, filterToToggle])
        }
        else {
            setBotFilters(botFilters.filter(filter => filter != filterToToggle))
        }
    }

    // Gets custom style based on whether the given filter is enabled
    function styleFromFilterSelected(filterName)
    {

        const filterActive = botFilters.some(filter => filter === filterName);

        if (filterActive) {
            return {
                backgroundColor: "#99ff99",
            }
        } 
        else {
            return {
                backgroundColor: "white",
            }
        }
    }

    function deleteAllBots() {

    }

    return (
    <div className="robot-search-form-container span-3">

        <form className="robot-search-form" onSubmit={(e) => {e.preventDefault(); return false}} action="">
            
            <div className="search-header">
                <div className="top-row">
                    <select 
                        name="robot-sector"
                        id="robot-sector"
                        onChange={(e) => handleJobTypeChange(e)}
                        value = {newBot.type}
                        >
                        <option value="ready">Ready</option>
                        <option value="inactive">Inactive</option>
                        <option value="busy">Busy</option>
                    </select>

                    <input 
                    className = "flex-grow"
                    name="robot-search" 
                    id="robot-search" 
                    placeholder="What bot would you like to add?"
                    onChange={(e) => handleJobNameChange(e)}
                    value = {newBot.name}
                    ></input>
                </div>

                <div>
                    <button type="submit" onClick={addNewBot}>Add</button>
                    <button style={{background: "red"}} onClick={() => {deleteAllBots()}}>DELETE ALL</button>
                </div>

            </div>
        </form>

        <div className="tag-filter">
            <button
            style={styleFromFilterSelected("low energy")}
            onClick={() => toggleFilterActive("low energy")}
            >Low Energy</button>
            
            <button
            style={styleFromFilterSelected("hospitality")}
            onClick={() => toggleFilterActive("hospitality")}
            >Hospitality</button>
            
            <button 
            style={styleFromFilterSelected("convenience")}
            onClick={() => toggleFilterActive("convenience")}
            >Convenience</button>
        </div>


        {/* Filter out the robots based on their state and send the event handlers with them */}
        <div className="robot-result-columns">
            
            <RobotList type="ready" robotList={
                robotStates.filter(robot => robot.type == "ready")
            }
            handleChangeRobotType = {handleChangeRobotType}
            handleDelete = {handleDelete}
            botFilters = {botFilters}
            />

            <RobotList type="inactive" robotList={
                robotStates.filter(robot => robot.type == "inactive")
            }
            handleChangeRobotType = {handleChangeRobotType}
            handleDelete = {handleDelete}
            botFilters = {botFilters}
            />

            <RobotList type="busy" robotList={
                robotStates.filter(robot => robot.type == "busy")
            }
            handleChangeRobotType = {handleChangeRobotType}
            handleDelete = {handleDelete}
            botFilters = {botFilters}
            />
            
        </div>

    </div>
    )
}

export default RobotSearchForm;