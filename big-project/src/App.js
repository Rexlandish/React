import './App.css';
import React, { useState } from 'react';
import OrderInfo from './Tickets/OrderInfo.js'
import JobsList from "./Jobs/JobsList.js"
import RobotSearchForm from './RobotSearchForm/RobotSearchForm.js';

const JobCounter = () => {

  let buttonDisabled = false;


  // Styling
  const divAttributes = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }

  const h1Attributes = {
      textAlign: "center",
      color: "yellow",
      backgroundColor: "black",
      padding: "0.5rem",
      margin: "0.25rem 1rem",
      width: "max-content",
      boxSizing: "border-box"
  }

  const buttonAttributes = {
    textAlign: "center",
    width: "max-content",
    padding: "1rem",
    backgroundColor: "yellow",
    color: "black",
    border: "4px black solid",
    borderRadius: "2rem"
  }

  if (buttonDisabled) {
    buttonAttributes.opacity = 0.3;
  }

  
  let [jobCount, setJobCount] = useState(0);

  function handleAddJob () {
    jobCount++;
    updateJobCount();
  }

  function handleRemoveJob () {
    jobCount--;
    updateJobCount();
  }

  function handleResetJob () {
    jobCount = 0;
    updateJobCount();
  }

  let [jobStatusMessage, updateJobStatusMessage] = useState("");
  function updateJobCount() {

    if (jobCount < 0)
      jobStatusMessage = "WHAT"
    else if (jobCount === 0)
      jobStatusMessage = "No jobs available..."
    else if (jobCount >= 1 && jobCount <= 5)
      jobStatusMessage = "Few jobs available."
    else if (jobCount > 5)
      jobStatusMessage = "Many jobs available!!!"
    updateJobStatusMessage(jobStatusMessage);

    setJobCount(jobCount)
    console.log(jobCount);
  }

  return (
    <div style={divAttributes}>
      <h1 style={h1Attributes}>Job Counter!</h1>
      <p>Job Count... {jobCount}</p>
      <p>{jobStatusMessage}</p>
      <button style={buttonAttributes} onClick={handleAddJob} disabled={buttonDisabled}>Add Job</button>
      <button style={buttonAttributes} onClick={handleRemoveJob} disabled={buttonDisabled}>Remove Job</button>
      <button style={buttonAttributes} onClick={handleResetJob} disabled={buttonDisabled}>Reset Job</button>
    </div>
  )
}

const DynamicInput = () => {

  const [formInput, changeFormInput] = useState("");

  const pStyle = 
    {
      textAlign: "center",
      fontWeight: 800,
      textTransform: "uppercase",
      margin: 0
    } 
  

    let stringInput = "";

  return (
    <div className="form-input">
      <Header/>
      <div className="input-area">
        <input value={formInput} placeholder="Type here!" style={{marginBottom: "1rem"}} onChange={data => changeFormInput(data.target.value)}></input>
        <button  onClick={() => {stringInput = ""; changeFormInput("")}}>Reset</button>
      </div>
      <p style={pStyle}>{formInput}</p>
      <p style={pStyle}>{formInput.length}</p>
      <Footer/>
    </div>
  )
}

// Bot tasks

// How do I create a state procedurally, so that every bot has a 'useState' function? (I know this can't be done so what are some potential workarounds?)
const BotTasks = () => {
  class Bot {
    constructor(key, goal, taskList) {
      this.key = key;
      this.goal = goal;
      this.taskList = taskList;

      this.currentTask = -1;
      this.isActive = false;

    }
  }

  let [botStates, setBotStates] = useState(
    
    [
      new Bot(1, "Find missing item", ["Looking...", "Getting...", "Returning...", "Returned!"]),
      new Bot(2, "Bop it", ["Bopping it...", "Twisting it...", "Pulling it...", "High Score!"]),
      new Bot(3, "Think", ["Pondering...", "Considering...", "Questioning...", "Aristotl'd!"])
    ]


  );

  // Create a state variable to hold the current task the bot is executing.


  async function startTask(obj, bot) {

    bot.currentTask = 0;
    if (bot.isActive)
    {
      console.error(`Task ${bot.goal} is already active!`);
      return;
    }
    
    obj.target.disabled = true;
  
    bot.isActive = true;
    for (let i = 0; i < bot.taskList.length; i++) {
      
      // Update task states, turn them into jsx, then display them.
      
      bot.currentTask++;
      

      const task = bot.taskList[i];
      console.log(task);
      console.log([...botStates]);
      
      
      setBotStates([...botStates])
      
      
      await new Promise((res) => setTimeout(res, 500 + Math.random() * 1500)) // Random delay between 500 and 1500
      
      if (bot.currentTask == bot.taskList.length)
      {
        break;
      }
    }

    bot.isActive = false;
    
    console.log("Done");
    obj.target.disabled = false;
  }

  function getJSXBotStates() {

    return (
      <div className="bot-container">
          {botStates.map(bot => 
            <div key={bot.key} className="bot">
              <h1><b>Bot {bot.key}</b><br/>{bot.goal}</h1>
              <button onClick={obj => startTask(obj, bot)} style={{marginBottom: "1rem"}}>Begin</button>
              <h2>{bot.taskList[bot.currentTask]}</h2>
            </div>
          )}
      </div>
    )
  }

  
  return (
    getJSXBotStates()
  )
}

export class Job {
  constructor(id, jobRole, isHiring) {
      this.id = id === undefined ? "" : id.toUpperCase();
      this.jobRole = jobRole;
      this.isHiring = isHiring ?? false;
  }
}

const DynamicJobManager = () => {




    let [jobList, setJobList] = useState([
        new Job("SMTH", "do something", true),
        new Job("DSE", "do something else", false)
    ])


    return (
        <div className="dynamic-bot-display">
          <h1>Active Jobs</h1>
          <JobsList jobList={jobList} setJobList={setJobList}/>
        </div>
    )
}

const StatusBoard = () => {
  return (
    <div className="status-board">
      <OrderInfo type="completed" icon="fa-check">
        <p>
          046,
          047,
          050,
          056
        </p>
      </OrderInfo>
      <OrderInfo type="in-progress" icon="fa-clock">
        <p>
          048,
          049,
          052,
          055
        </p>
      </OrderInfo>
      <OrderInfo type="failed" icon="fa-xmark">
        <p>
          050,
          051,
          053,
          054
        </p>
      </OrderInfo>
    </div>

  )
}


const Header = () => {
  return (
    <div className="header">
      <i className="fa-solid fa-arrow-up"></i>
      <h1>HEADER</h1>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <i className="fa-solid fa-arrow-down"></i>
      <h1>FOOTER</h1>
    </div>
  )
}

const App = () => {
  return (
    <div className="widget-container">
      <JobCounter/>
      <DynamicInput/>
      <BotTasks/>
      <DynamicJobManager/>
      <StatusBoard/>
      <RobotSearchForm/>
    </div>    
  )
}

export default App;
