import React, { Component } from 'react'

export const RobotList = (props) => {

    let botType;
    let bgColor;

    switch (props.type)
    {
        case "ready":
            botType = <h1 className="robot-type"><i className="fa-solid fa-check"/>Ready</h1>
            bgColor = "rgb(206, 255, 206)"
            break;
        case "inactive":
            botType = <h1 className="robot-type"><i className="fa-solid fa-hourglass"/>Inactive</h1>
            bgColor = "rgb(255, 203, 72)"
            break;
        case "busy":
            botType = <h1 className="robot-type"><i className="fa-solid fa-x"/>Busy</h1>
            bgColor = "rgb(246, 160, 160)"
            break;
    }


    function doesBotFitFilter(robot) {
        // Check if all of the global filters...
        const fitsFilter = props.botFilters.every((filter) => {
            // ...appear in this bot's tags.
            console.log(`Checking ${filter}...`)
            console.log(robot.tags)
            console.log(filter)
            if (robot.tags === undefined) return false;
            return robot.tags.some((tag) => {console.log(tag); return tag === filter})
        });
        return fitsFilter;
    }

    return ( 
        <div 
            className="robot-column"
            style = {{backgroundColor: bgColor}}>
            {botType}
            <div className="robot-column-list">
                {props.robotList.map(robot => 
                        
                        doesBotFitFilter(robot) &&
                        <div key={robot.name} className="robot">
                            <div className="robot-details">
                                {/*<i className="fa-solid fa-robot"></i>*/}
                                <p>{robot.name}</p>
                            </div>
                            <div className="robot-actions">
                                    {props.type == "ready" && <button onClick={() => {
                                        props.handleChangeRobotType(robot.name, "busy")
                                    }}>Begin</button>}

                                    {props.type == "inactive" && <button onClick={() => {
                                        props.handleChangeRobotType(robot.name, "ready")
                                    }}>Activate</button>}

                                    {props.type == "busy" && <button onClick={() => {
                                        props.handleChangeRobotType(robot.name, "inactive")
                                    }}>Deactivate</button>}

                                    <button onClick={() => props.handleDelete(robot.name)}>Delete</button>
                                    
                                </div>
                        </div>
                    
                )}

            </div>
        </div>
    )
}

export default RobotList
