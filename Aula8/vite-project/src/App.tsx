import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about/:id" element={<About />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>

    </>
  )
}

export default App