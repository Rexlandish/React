import "./App.css";

export class JobBoard {
  constructor(postcode, vacancyCount) {
    this.postcode = postcode;
    this.vacancyCount = vacancyCount;
  }

  static newRandomAreaSearch() {
    return new JobBoard(
      this.randomPostcode(), // Random postcode
      Math.floor(Math.random() * 500) // Random number
    );
  }

  static randomPostcode() {
    return (
      this.randomLetter() +
      this.randomLetter() +
      this.randomDigit() +
      this.randomDigit() +
      " " + 
      this.randomLetter() +
      this.randomDigit() +
      this.randomDigit()
    );
  }

  static randomLetter() {
    const upperCaseStartPoint = 65
    const randomOffset = Math.floor(Math.random() * 26);
    return String.fromCharCode(upperCaseStartPoint + randomOffset);
  }

  static randomDigit() {
    return Math.floor(Math.random() * 10);
  }

  render() {

    const backgroundColor =
      (this.vacancyCount >= 400) ? "Lime":
      (this.vacancyCount >= 250) ? "Yellow":
      "Red";

    const status =
      (this.vacancyCount >= 400) ? "Plenty of jobs!":
      (this.vacancyCount >= 250) ? "Less than average job count":
      "Few jobs in this area.";

    return (
      <div className="area-search" style = {
        {"backgroundColor": backgroundColor}
      }>
        <h1>{this.postcode}</h1>
        <h2>Vacancies: <b>{this.vacancyCount}</b></h2>
        <h3>{status}</h3>
      </div>
    )
  }
}

function App() {

  let jobAreaSearches = []
  for (let i = 0; i < 9; i++) {
    jobAreaSearches.push(JobBoard.newRandomAreaSearch())
  }

  return (

    <div className="container">
      <h1>Local Jobs</h1>
      <div className="job-area-searches">
        {jobAreaSearches.map(job =>job.render())}
      </div>
    </div>
  )
}

export default App;