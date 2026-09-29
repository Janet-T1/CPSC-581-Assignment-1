import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import JanetTsegazeab from './pages/JanetTsegazeab'
import ShamMuhammad from './pages/ShamMuhammad'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/janet-tsegazeab" element={<JanetTsegazeab />} />
      <Route path="/sham-muhammad" element={<ShamMuhammad />} />
    </Routes>
  )
}

export default App

