import React, { Component } from 'react'

export const RobotList = (props) => {

    let botType;
    let bgColor;

    switch (props.type)
    {
        case "ready":
            botType = <h1 class="robot-type"><i class="fa-solid fa-check"/>Ready</h1>
            bgColor = "rgb(206, 255, 206)"
            break;
        case "inactive":
            botType = <h1 class="robot-type"><i class="fa-solid fa-hourglass"/>Inactive</h1>
            bgColor = "rgb(255, 203, 72)"
            break;
        case "busy":
            botType = <h1 class="robot-type"><i class="fa-solid fa-x"/>Busy</h1>
            bgColor = "rgb(246, 160, 160)"
            break;
    }

    console.log(bgColor)

    return (
        <div 
            className="robot-column"
            style = {{backgroundColor: bgColor}}>
            <h1>{botType}</h1>
            {props.robotList.map(robot => 
                
                <div key={robot.name} className="robot">
                    <i className="fa-solid fa-robot"></i>
                    <p>{robot.name}</p>
                </div>
            )}
        </div>
    )
}

export default RobotList
