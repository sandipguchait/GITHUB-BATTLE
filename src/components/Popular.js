import React, { Component } from 'react'
import { FetchRepos } from '../utils/api'
import Loading from './loading'

// statesless functional component
function SelectLanguage(props){
var languages = ['All', 'Javascript', 'Ruby', 'Java','Python', 'Machine Learning']

  return(
    <ul className="languages">
      {languages.map((item) => {
        return (
          <li key={item}
            style={item === props.selectedLanguage ?
              { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null,item)}
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}

class RepoGrid extends Component {
  render(){
    return(
      <ul className='popular-list'>
      {this.props.repos.map(function(repo,index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index +1 }</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for '+ repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
      </ul>
    )
  }
  
}

// class component starts here for state and rendering
class Popular extends Component {

// default state declaration
 constructor(props){
   super(props);
   this.state = {
    selectedLanguage: 'All',
    repos: null
  };
  this.updateLanguage = this.updateLanguage.bind(this);
 }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  
// changing the state using the function on click handler
  updateLanguage(item) {
    this.setState({
      selectedLanguage:item,
      repos:null
    })
    FetchRepos(item)
      .then(function (repos) {
        this.setState(function(){
          return{
            repos:repos
          }
        })
      }.bind(this))
   
  }
// rendering the UI component 
  render(){
    return(
      <div>
      <SelectLanguage
      selectedLanguage ={this.state.selectedLanguage}
      onSelect={this.updateLanguage}
      />
      {!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos}/> }
      
      </div>
    )
  }
}
export default Popular;