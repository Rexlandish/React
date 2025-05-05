import './App.css';
import React, { useState } from 'react';

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
  

  return (
    <div className="form-input">
      <div className="input-area">
        <input placeholder="Type here!" style={{marginBottom: "1rem"}} onChange={data => changeFormInput(data.target.value)}></input>
        <button onClick={() => changeFormInput("")}>Reset</button>
      </div>
      <p style={pStyle}>{formInput}</p>
      <p style={pStyle}>{formInput.length}</p>
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

      this.currentTask = 0;
      this.isActive = false;

    }
  }

  const [botStates, setBotStates] = useState([]);

  // Create a state variable to hold the current task the bot is executing.


  async function startTask(obj, bot) {

    if (bot.isActive)
    {
      console.error(`Task ${bot.goal} is already active!`);
      return;
    }
    
    obj.target.disabled = true;
  
    bot.isActive = true;
    for (let i = 0; i < bot.taskList.length; i++) {
      
      // Update task states, turn them into jsx, then display them.
      
      setBotStates(getJSXBotStates())

      const task = bot.taskList[i];
      console.log(task);
      bot.currentTask++;
      await new Promise((res) => setTimeout(res, 500 + Math.random() * 1500)) // Random delay between 500 and 1500


    }
    
    console.log("Done");
    obj.target.disabled = false;
  }

  function getJSXBotStates() {
    return (
      <div className="bot-container">
          {allBots.map(bot => 
            <div key={bot.key} className="bot">
              <h1><b>Bot {bot.key}</b><br/>{bot.goal}</h1>
              <button onClick={obj => startTask(obj, bot)} style={{marginBottom: "1rem"}}>Begin</button>
              <h2>{bot.taskList[bot.currentTask]}</h2>
            </div>
          )}
      </div>
    )
  }

  let allBots = [
    new Bot(1, "Find missing item", ["Looking...", "Getting...", "Returning..."]),
    new Bot(2, "Bop it", ["Bopping it...", "Twisting it...", "Pulling it..."]),
    new Bot(3, "Think", ["Pondering...", "Considering...", "Questioning..."])
  ]

  
  return (
    getJSXBotStates()
  )
}


const DynamicBotManager = () => {

  class Bot {
    constructor(id, task, isActive) {
      this.id = id.toUpperCase();
      this.task = task;
      this.isActive = isActive
    }
  }

  let [botList, setBotList] = useState([
    new Bot("SMTH", "do something", true),
    new Bot("DSE", "do something else", false)
  ])

  let [newBotId, setNewBotId] = useState("");
  let [newBotTask, setNewBotTask] = useState("");
  
  // List is not being assigned? Can't print anything after the initial line
  function handleRemove(id) {
    console.log(`handle remove ${id}`);

    let tempBotlist = botList;
    
    const indexToRemove = tempBotlist.findIndex((element) => 
      element.id == id
    );
    
    tempBotlist = tempBotlist.splice(indexToRemove, 1);
    setBotList(
      tempBotlist
    );
  }

  function handleChangeNewId(e) {
    console.log(`change new id ${e.target.value}`);
    setNewBotId(e.target.value);
  }

  function handleChangeNewTask(e) {
    console.log(`change new task ${e.target.value}`);
    setNewBotTask(e.target.value);
  }

  function addNewBot()
  {
    setBotList([...botList, new Bot(newBotId, newBotTask)])
  }

  return (
    <div className="dynamic-bot-display">
      {botList.map(bot => (
        <div key={bot.id} className="dynamic-bot">
          <p><b>Bot {bot.id}</b>: {bot.task}</p>


          <p style = {{
            color: bot.isActive ? "green" : "red"
          }}>
            {bot.isActive ? "ENABLED" : "DISABLED"}
          </p>
          <button onClick={() => handleRemove(bot.id)}>Remove</button>
        
        </div>
      ))}

      {/* Add Bot Buttons */}
      <input type="text" onChange={(e) => handleChangeNewId(e)} placeholder='Enter new bot id here...'/>
      <input type="text" onChange={(e) => handleChangeNewTask(e)} placeholder='Enter new bot task here...'/>
      <button onClick={() => addNewBot()}>Add Bot</button>
    </div>
  );
}

const App = () => {
  return (
    <div className="widget-container">
      <JobCounter/>
      <DynamicInput/>
      {/*<BotTasks/>*/}
      <DynamicBotManager/>
    </div>    
  )
}

export default App;
