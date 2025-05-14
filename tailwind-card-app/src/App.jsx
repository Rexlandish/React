import { useState } from 'react'
import Card from './Cards/Card.jsx'

import './App.css'

function App() {

  return (
    <>
        <div className="card-container flex justify-center gap-5 w-screen">
          <Card personalityType="INFJ" fact="Quiet visionaries, often serving as inspiring and tireless idealists." imSrc="https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
          <Card personalityType="INFP" fact="Poetic, kind, and altruistic people, always eager to help a good cause." imSrc="https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
          <Card personalityType="ENFJ" fact="Inspiring optimists, readily taking action to do what they feel is right." imSrc="https://images.pexels.com/photos/60582/newton-s-cradle-balls-sphere-action-60582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
          <Card personalityType="ENFP" fact="Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile." imSrc="https://images.pexels.com/photos/7210748/pexels-photo-7210748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        </div>
    </>
  )
}

export default App
