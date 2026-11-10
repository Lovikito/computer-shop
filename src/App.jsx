import { useState, useEffect } from 'react'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { Main } from './components/Main.jsx'
import { useTheme } from './hooks/useTheme.js'


function App() {
  const {theme, toggleTheme} = useTheme()

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme}/>
      <Main/>
      <Footer/>
    </>
  )
}

export default App
