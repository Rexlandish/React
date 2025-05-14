import React from 'react'

const Card = ({personalityType, fact, imSrc}) => {
    return (
        <div className="card w-50 h-50 relative bg-linear-to-t from-black to-white/50 rounded-3xl overflow-hidden shadow-2xl/50">
            <div className="overlay absolute w-full p-5 z-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="font-sans font-black">{personalityType}</h1>
                <p className="">{fact}</p>
            </div>
            <img className="opacity-40 object-cover h-full w-full" src={imSrc} alt="" />
        </div>
    )
}

export default Card;