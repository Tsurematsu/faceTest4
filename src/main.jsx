import React from 'react'
import styles from './main.module.css'
import ReactDOM from 'react-dom/client'
import VideoComponent from './VideoComponent/VideoComponent.jsx'
import script from './main.js'
import Training from './training/Training.jsx';
const Elementos = [
  {id: 1, nombre: 'Elemento 1' },
]
script({Elementos})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className={styles.parent}>
      <VideoComponent id="1"/>
      <Training/>
    </div>
  </React.StrictMode>,
)
