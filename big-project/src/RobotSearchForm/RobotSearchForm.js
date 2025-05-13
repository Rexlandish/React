import React from 'react'
import "./RobotSearchForm.css"
import RobotList from "./RobotList.js"

function show(data) {
    console.log(data);
}

export const RobotSearchForm = () => {
    return (
    <div className="robot-search-form-container span-3">

        <form className="robot-search-form" onSubmit={(e) => {e.preventDefault(); return false}} action="">
            
            <div className="search-header">
                <div className="top-row">
                    <select name="robot-sector" id="robot-sector">
                        <option value="all">All</option>
                        <option value="corporate">Corporate</option>
                        <option value="automotive">Automotive</option>
                        <option value="household">Household</option>
                        <option value="personal">Personal</option>
                        <option value="misc">Miscellaneous</option>
                    </select>

                    <input 
                    className = "flex-grow"
                    name="robot-search" 
                    id="robot-search" 
                    placeholder="What bot are you looking for today?"
                    ></input>
                </div>

                <button type="submit">Search</button>

            </div>
        </form>

        <div className="robot-result-columns">
            <RobotList type="ready" robotList={[
                {name: "Cooking"},
                {name: "Washing Up"},
                {name: "Smart Dehumidifier"},
            ]}/>
            <RobotList type="inactive" robotList={[
                {name: "Weather Tracker"},
                {name: "Carbonator"}
            ]}/>
            <RobotList type="busy" robotList={[
                {name: "Water Purifier (1)"},
                {name: "Water Purifier (2)"},
                {name: "MP4 - MP3 Converter"},
                {name: "Yarn Winder"}
            ]}/>
        </div>

    </div>
    )
}

export default RobotSearchForm;