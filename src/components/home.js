import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div className='home-container'>
            <h1>Github Battle: Compete With Friends</h1>
            
                <Link className='button' to='/battle'>
                Battle
                </Link>


                <Link className='button' to='/popular'>
                Top Repositories
                </Link>
            </div>
        )
    }
}
 export default Home;