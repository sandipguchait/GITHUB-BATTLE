import  axios from 'axios'

var id = 'YOUR_CLIENT_ID';
var sec = 'YOUR_SECRET_ID';
var params = '?client_id='+ id + '&client_secret=' + sec ;


  function getProfile(username){
    return axios.get('https://api.github.com/users/'+ username + params)
      .then(user =>{
        return user.data;
      });
  }

  function getRepos (username){
    return axios.get('https://api.github.com/users/'+ username + '/repos'+ params + '&per_page=100')
      
  }

  function getStarCount (repos) {
    return repos.data.reduce((count, repo)=>{
      return count + repo.stargazers_count;
    }, 0);
  }

  function calculateScore (profile, repos){
     var followers = profile.followers;
     var totalStars = getStarCount(repos);

     return(followers * 3 ) + totalStars;
  }
  function handleError ( error ) {
    console.warn(error);
    return null;
  }
 
   function getUserdata (player) {
     return axios.all([
       getProfile(player),
       getRepos(player)
     ]).then (data =>{
       var profile = data[0];
       var repos = data[1];

       return {
         profile:profile,
         score: calculateScore(profile, repos)
       }
     })
   }

   function sortPlayers(player){
     return player.sort((a,b)=>{
       return b.score - a.score;
     });
   }

    export default {
      battle(players) {
        return axios.all(players.map(getUserdata))
         .then(sortPlayers)
         .catch(handleError)
    }
  }
  


  export function  FetchRepos (language){
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=starts&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then((response) => {
        return response.data.items;
      })
  }
  
  


  