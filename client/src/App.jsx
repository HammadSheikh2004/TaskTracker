import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Context from './Components/Context/Context'
import Routing from './Components/Routing/Routing';
const App = () => {

  return (
    <>
      <Context>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Context>
    </>
  )
}

export default App