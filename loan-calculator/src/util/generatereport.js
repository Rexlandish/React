import jsPDF from 'jspdf';

export function generatepdf(data){

    console.log("GENERATING")
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Loan Report', 10, 10);


    doc.setFontSize(12);
    doc.text(`Beginning Investment: £${data[0].previousDebt}`, 10, 30);
    doc.text(`Investment Rate: ${data[0].interestRate * 100}%`, 10, 40);
    doc.text(`Regular Payment: £${data[0].payment}`, 10, 50);

    let yOffset = 80;
    const linespacing = 10;
    const pageHeight = doc.internal.pageSize.height
    data.forEach((result) =>{
        if (yOffset+50 > pageHeight){
            doc.addPage();
            yOffset = 20;
        }
        doc.text(`Term: ${result.loanTerm}`, 10, yOffset)
        doc.text(`Added interest: £${result.addedInterest.toFixed(2)}`,10, (yOffset+3*linespacing))
        doc.text(`Debt with interest: £${result.debtWithInterest.toFixed(2)}`,10, (yOffset+linespacing))
        doc.text(`Debt after payment: £${result.debtAfterPayment.toFixed(2)}`,10, (yOffset+2*linespacing))

        yOffset+=50;
    })
    
    doc.save('Investment Report.pdf')
}