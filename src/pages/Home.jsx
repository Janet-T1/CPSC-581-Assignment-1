import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <h1 className="text-6xl font-bold">
            CPSC 581 - Assignment 1
        </h1>
        <p> To explore each group member's button design, visit their page by clicking below </p>
        <div class="flex justify-between gap-3 items-center"> 
          <div class="flex border shadow-md justify-center py-3 px-4 rounded-full border-gray-200 hover:bg-blue-300 "> 
            <Link to="/janet-tsegazeab">Janet Tsgeazeab</Link>
          </div>
          <div class="flex border shadow-md justify-center py-3 px-4 rounded-full border-gray-200 hover:bg-blue-300 "> 
            <Link to="/sham-muhammad">Sham Muhammad</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;