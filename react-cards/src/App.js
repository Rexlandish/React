import React from 'react';
import './App.css'
import man1 from "./images/man-1.jpg"
import woman1 from "./images/woman-1.jpg"
import man2 from "./images/man-2.jpg"
import woman2 from "./images/woman-2.jpg"

class Profile {
  constructor(image, name, jobTitle, bio, color)
  {
    this.image = image;
    this.name = name;
    this.jobTitle = jobTitle;
    this.bio = bio;
    this.color = color;
  }
}

function App() {

  const profileList = [
    new Profile(woman1, "Mary Swansea", "Operational Services and Management", "Hi, let's get to work on some business.", "Red"),
    new Profile(man1, "Jerry Percy", "Chief Resource Synergy", "The best thing in life are meetings.", "Green"),
    new Profile(woman2, "Susan Similar", "Communications and Telemetry", "Nice to see you!", "Purple"),
    new Profile(man2, "Terry Tales", "Admin", "Working.", "Blue"),
  ]

  return (
    <div className="cards">
      {
        profileList.map((profile) => {
          return <ProfileCard profile={profile}/>
        })
      }
    </div>
  )
}

function ProfileCard({profile}) {
  console.log(profile);
  return (
    <div className="profile" style=
    {
      {boxShadow: `2px 2px ${profile.color}`}
    }>
      <div className="identification">
        <img src={profile.image} alt={profile.name}/>
        <div className="personal-info">
          <h1>{profile.name}</h1>
          <h2>{profile.jobTitle}</h2>
        </div>
      </div>
      <p className="bio">{profile.bio}</p>
    </div>
  )
}

export default App;