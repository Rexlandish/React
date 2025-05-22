import React from 'react'

export default function Header() {
  return (
    <div className="header">

        <div className="flex gap-1 justify-around width-full">
            <h1 className="text-gray-200 align-middle self-center text-5xl">Movie Review Website</h1>
            <div className="grow">
                    {/* Center gap */}
                </div>
            <div className="flex gap-0 justify-center m-5">
                <input className="bg-white grow text-black ml-10 w-100" type="text"/>
                <button className="bg-blue-700 p-2">SEARCH</button>
            </div>
        </div>

        <nav>
            <ul className="flex justify-center gap-5 my-5">
                <li><a className='bg-gray-600 p-2 hover:bg-gray-700 hover:cursor-pointer rounded-xl' href="#">Trending</a></li>
                <li><a className='bg-gray-600 p-2 hover:bg-gray-700 hover:cursor-pointer rounded-xl' href="#">New Releases</a></li>
                <li><a className='bg-gray-600 p-2 hover:bg-gray-700 hover:cursor-pointer rounded-xl' href="#">A-Z</a></li>
            </ul>
        </nav>

    </div>
  )
}
