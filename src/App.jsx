import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Story from './pages/Story'
import Gallery from './pages/Gallery'
import Recruitment from './pages/Recruitment'
import Fleet from './pages/Fleet'
import Contact from './pages/Contact'
import ContactWrite from './pages/ContactWrite'

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<Story />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/recruitment" element={<Recruitment />} />
          {/* Fleet은 네비게이션에 노출하지 않고 Home/Story 링크로만 접근 */}
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/write" element={<ContactWrite />} />
          <Route path="/contact/write/:id" element={<ContactWrite />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </>
  )
}

export default App
