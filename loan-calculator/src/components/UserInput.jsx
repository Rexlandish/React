import React, { useState } from 'react'
import '../App.css'

const UserInput = ({inputVariables, setInputVariables, calculateLoan, generatePDF}) => {



  function UpdateUserVariable(variableName, value) {

    let inputVariablesCopy = inputVariables;
    inputVariablesCopy[variableName] = value;

    setInputVariables(inputVariablesCopy);
    console.log(inputVariables);
    
    calculateLoan();
  }

  return(
    <section id="user-input">
      
      <div className="input-group">
        <h2>Initial Loan (£)</h2>
        <input
        type="number"
        placeholder='Enter amount here...'
        onChange={(e) => UpdateUserVariable("initialLoan", e.target.value)}
        value={inputVariables.initialLoan}
        >

        </input>
      </div>

      <div className="input-group">
        <h2>Interest Rate (%)</h2>
        <input
        type="number"
        placeholder='Enter percentage here...'
        onChange={(e) => UpdateUserVariable("interestRate", e.target.value)}
        value={inputVariables.interestRate}
        ></input>
      </div>

      <div className="input-group">
        <h2>Regular Payment (£)</h2>
        <input
        type="number"
        placeholder='Enter payment here...'
        onChange={(e) => UpdateUserVariable("regularPayment", e.target.value)}
        value={inputVariables.regularPayment}
        ></input>
      </div>
      <button onClick={() => generatePDF()}>Generate Report</button>
    </section>
  ) 
}

export default UserInput