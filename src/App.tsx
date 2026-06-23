// import { useState } from 'react'
import {Navbar} from './components/Navbar';
import {Footer} from './components/Footer';
import {Content} from './components/Content';
import './App.css';

function App() {

  return (
    <>
      <Navbar />
      <Content />
      <Footer />
      
      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
