import { Link } from 'react-router-dom'

function Home() {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <h1 className="text-7xl font-bold">
          Home Page
        </h1>
        <p> To explore each group member's button design, visit their page by clicking below </p>
        <div class="grid grid-cols-3 gap-3 items-center"> 
          <div class="flex border shadow-md justify-center p-3 rounded-lg border-gray-200 hover:bg-blue-300 "> 
            <Link to="/janet-tsegazeab">Janet Tsgeazeab</Link>
          </div>
          <div class="flex border shadow-md justify-center p-3 rounded-lg border-gray-200 hover:bg-blue-300 "> 
            <Link to="/sam-fasakin">Sam Fasakin</Link>
          </div>
          <div class="flex border shadow-md justify-center p-3 rounded-lg border-gray-200 hover:bg-blue-300 "> 
            <Link to="/sham-muhammad">Sham Muhammad</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;