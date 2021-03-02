import React , {useState,useEffect} from 'react';
import {Form,Card,Image,Icon} from 'semantic-ui-react'; 
import {Dropdown} from 'bootstrap';

const GithubApi = () => {

const[name,setName] = useState('');
const[userName,setUsername] = useState('');
const[followers,setFollowers] = useState('');
const[following,setFollowing] = useState('');
const[repos,setRepos] = useState('');
const[avatar,setAvatar] = useState('');
const[userInput,setUserInput] = useState('');
const[error,setError] = useState(null);
const[repositories,setRepositories] = useState('');


useEffect(() => {
  fetch("https://api.github.com/users/patel-tirth")
  .then(res => res.json())
  .then(data => {
    setData(data)
  })
}, [])

// useEffect(() => {
//     fetch("https://api.github.com/users/patel-tirth")
//     .then(res => res.json())
//     .then(data => {
//       setData(data)
//     })
//   }, [props.x])

const setData = ({name, login, followers,following, public_repos,avatar_url,repos_url}) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
    // setRepositories(repos_url)
}

const setReposs= ({reposArray}) =>{
setRepositories(reposArray);
}

const handleSearch = (e) => {
    setUserInput(e.target.value)
}

const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
    .then(res => res.json())
    .then(data => {
        if(data.message){
            setError(data.message);
        }
        else{
        setData(data);
        setError(null);
        }
    })
}
const searchRepos = () => {
    fetch(`https://api.github.com/users/${userInput}/repos`)
    .then(res => res.json())
    .then(data => this.setReposs({data}))
}


return (
    <div>
        <div className="search">
            <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Github user'
              name='github user'
              value={name}
              onChange={handleSearch}
            />
            <Form.Button content='Search' />
            </Form.Group>
            </Form>
         </div>
         {error ? (<h1> {error}</h1>): ( <div class="ui card">
  <div class="image">
    <img src={avatar}/>
  </div>
  <div class="content">
    <a class="header">{userName}</a>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      {followers} followers
    </a>
    <a>
      <i class="user icon"></i>
      {repos} public repositories
      
    </a>
  </div>
</div> 

)}
<div className="repositories">
<select class="ui dropdown">
  <option value="">Repositories {repos}</option>
  
</select>
</div>
        
    </div>

);
}

export default GithubApi;