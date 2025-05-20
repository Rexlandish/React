import Header from './components/Header.jsx'
import Output from './components/Output.jsx'
import UserInput from './components/UserInput.jsx'
import { useMemo, useState } from 'react'
import './App.css'
import { generatepdf } from './util/generatereport.js'


function App() {

  let [inputVariables, setInputVariables] = useState(
    {
      initialLoan: undefined,
      interestRate: undefined,
      regularPayment: undefined
    }
  )

  let createTable = Output();

  function createTableWithUserVariables() {

    const initialLoan = parseFloat(inputVariables.initialLoan);
    const interestRate = parseFloat(inputVariables.interestRate) / 100;
    const regularPayment = parseFloat(inputVariables.regularPayment);

    let reRenderTable = true;

    [initialLoan, interestRate, regularPayment].forEach(val => {
      if (isNaN(val))
      {
        // No alert if nothing entered yet, just don't render the table
        reRenderTable = false;
      }

      else if (val < 0) {
        alert("Cannot use negative numbers!")
        reRenderTable = false;
        return;
      }
    })

    if (reRenderTable)

      {

        const tableData = createTable(initialLoan, interestRate, regularPayment);

    

        setTableOutput(
          tableData.html
        )
      }
    }
  
  let [tableOutput, setTableOutput] = useState(<></>)

  function getDataForPDF() {
  

    const initialLoan = parseFloat(inputVariables.initialLoan);
    const interestRate = parseFloat(inputVariables.interestRate) / 100;
    const regularPayment = parseFloat(inputVariables.regularPayment);

    generatepdf(createTable(initialLoan, interestRate, regularPayment).object);
  }

  return (

    <>
      <Header />
      <UserInput
      inputVariables={inputVariables}
      setInputVariables={setInputVariables}
      calculateLoan={createTableWithUserVariables}
      generatePDF={() => getDataForPDF()}
      />
      {tableOutput}
    </>
  )
}

export default App
