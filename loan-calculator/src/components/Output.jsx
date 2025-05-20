import React from 'react'

// For formatting numbers as currency
const formatter = new Intl.NumberFormat("en-GB", {
style: "currency",
currency: "GBP"
});

function Iterate(debt, interestRate, payment, loanTerm) {

    const interestToAdd =  parseFloat((interestRate * debt).toFixed(2))


    return {
        loanTerm: loanTerm,
        previousDebt: debt,
        debtWithInterest: parseFloat((debt + debt * interestRate).toFixed(2)),
        debtAfterPayment: parseFloat((debt + debt * interestRate - payment).toFixed(2)),
        addedInterest: interestToAdd,
        payment: payment,
        interestRate: interestRate
    }
}

// Iterate debt until amount of debt equals zero or the interaction count exceeds a given limit.
export function createTable(debt, interestRate, payment) {

    let loanHistory = [];

    let currentDebt = debt;
    // Add initial loan history


    for (let i = 0; i < 100; i++)
    {
        const res = Iterate(currentDebt, interestRate, payment, i + 1);
        currentDebt = res.debtAfterPayment;
        loanHistory.push(res);

        if (res.debtAfterPayment <= 0 || i >= 100)
            break;
    }

    console.log(loanHistory);

    
    // Return the html of the loan history, then the object of it
    return {"html":(
        <table>
            <thead>
                <tr>
                    <th>Loan Term</th>
                    {/*<th>Previous debt</th>*/}
                    <th>Interest Rate</th>
                    <th>Added interest</th>
                    {/*<th>Debt with interest</th>*/}
                    <th>Loan Payment</th>
                    <th>Net reduction</th>
                    <th>Debt after payment</th>
                </tr>
            </thead>
                
            
            <tbody>            
            {

                loanHistory.map(loan => {

                    return (
                        <tr key={loan.loanTerm}>
                            <td><i>Term {loan.loanTerm}</i></td>
                            {/*<td><b>{formatter.format(loan.previousDebt)}</b></td>*/}
                            <td>{loan.interestRate * 100 + "%"}</td>
                            <td>{"+" + formatter.format(loan.addedInterest)}</td>
                            {/*<td><i>{formatter.format(loan.debtWithInterest)}</i></td>*/}
                            <td>{"-" + formatter.format(loan.payment)}</td>
                            <td>{formatter.format(loan.addedInterest - loan.payment)}</td>
                            <td><b>{"=" + formatter.format(loan.debtAfterPayment)}</b></td>
                        </tr>
                    )
                    }
                    
                )
            }
            </tbody>

        </table>
    ),
    "object": loanHistory}

}

// Return the function that controls creating the loan table
const Output = () => {  

    return createTable;

}

export default Output
