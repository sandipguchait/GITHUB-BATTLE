import React from 'react'
import Popular from './Popular'
import { BrowserRouter , Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import Nav from './Nav';
import Home from './home'
import Battle from './battle'
import Results from './results'
import { Redirect } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/battle' component={Battle}/>
          <Route path='/battle/results' component={Results}/>
          <Route path='/popular' component={Popular}/>
          <Redirect from="*" exact to="/" />

        </Switch>
      </div>
    </BrowserRouter>
  )
}
 
export default App;