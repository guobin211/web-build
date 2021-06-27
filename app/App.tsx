import React from 'react'

export interface AppProps{}


const App: React.FC<AppProps> = (props) => {
  return (
    <div>
      APP { props }
    </div>
  )
}


export default App
