import {useState, React} from 'react';
import {Job} from "../App.js";
import {JobItem} from './JobItem.js';

export const JobsList = ({jobList, setJobList}) => {
    
    
    
    let [newJob, setNewJob] = useState(new Job("", "", false));
    
    function handleChangeNewId(e) {
        setNewJob(
            new Job(
                e.target.value,
                newJob.jobRole,
                newJob.isActive
            )
        );
    }
    
    // List is not being assigned? Can't print anything after the initial line
    function handleRemove(id) {
        
        let tempBotlist = [...jobList];
        
        const indexToRemove = tempBotlist.findIndex((element) => 
            element.id === id
        );
        
        tempBotlist.splice(indexToRemove, 1);
        
        setJobList(
            tempBotlist
        );
    }


    function handleChangeNewRole(e) {
        setNewJob(
            new Job(
                newJob.id,
                e.target.value,
                newJob.isActive
            )
        );
    }

    function handleChangeNewHiring(e) {
        setNewJob
        (
            new Job(
                newJob.id,
                newJob.jobRole,
                e.target.checked ?? false
            )
        );
        
        {console.log(newJob)}
    };
    

    function addNewJob()
    {
        if ((newJob.id === "") || (newJob.jobRole === "")) {
            alert("Input fields cannot be empty!")
            return;
        }
        else if (jobList.findIndex(job => job.id === newJob.id) !== -1) {
            alert(`Id ${newJob.id} already exists!`)
            return;
        }
        setJobList([...jobList, newJob]);
        resetNewJob()
    }
    
    function resetNewJob()
    {
        setNewJob(new Job("", "", false));
    }
    
    return (
        <div>

            <div className="job-container">
                {
                    jobList.map(job => {
                        return (
                            <JobItem key={job.id} job={job} onDelete={handleRemove}/>
                        )
                    })
                }
            </div>    
        
            
            
            {/* Add Bot Buttons */}
            <div className="job-input-area" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem"}}>
            <input 
            value={newJob.id}
            type="text"
            onChange={(e) => handleChangeNewId(e)}
            placeholder='Enter new job title here...'
            />
            <input
            value={newJob.jobRole}
            type="text"
            onChange={(e) => handleChangeNewRole(e)} 
            placeholder='Enter new job role here...'
            />
            <div className="div" style={{display: "flex"}}>
            <p>Hiring?</p>
            <input
            type="checkbox"
            checked={newJob.isHiring}
            onChange={(e) => handleChangeNewHiring(e)}
            />
            </div>
            
            <button onClick={() => addNewJob()}>Add Job</button>
            
            </div>
            <p>Add hide/show button</p>
        </div>
    );


}

export default JobsList;