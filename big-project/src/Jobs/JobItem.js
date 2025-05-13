import React from 'react';

export const JobItem = ({job, onDelete}) => {

    const hiringTextStyle =  {
            "color": job.isHiring ? "green" : "red"
        };

    return (
        <div className="job">
            <h3>{job.id}</h3>
            <p>
                {job.jobRole}
            </p>
            <p style={hiringTextStyle}>
                {job.isHiring ? "HIRING" : "NOT HIRING"}
            </p>
            <button onClick={() => onDelete(job.id)}>Delete Job</button>
        </div>
    )
}

export default JobItem;