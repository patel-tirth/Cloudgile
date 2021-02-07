// import React, {Component} from 'react';
// import fire from './firebase';

// class Login extends Component {
//     constructor(props) 
// {
//     super(props);
//     this.login = this.login.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state ={
//         email: '',
//         password: ''
//     }
//  }

// login(e){
//     e.preventDeafult();
//     fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( (u) => {
//     }).catch((error) => {
//         console.log(error);
//     });
   
// }
// handleChange(e)
// {
//     this.setState({ [e.target.name]: e.target.value});
// }

// render()
// {
//     return(
//         <div className="col-md-6">
//             <form>
//                 <div class="from-group">
//                     <label htmlFor="exampleInputEmail1">Email address</label>
//                     <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">

//                     </input>
//                     <small id="emailHelp" class="form-text text-muted">  </small>
//                 </div>
//                 <div class="form-group">
//                     <label htmlFor="exampleInputPassword1">Password</label>
//                     <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
//                 </div>
//                 <button type="submit" onClick={this.Login} className="btn btn-primary">Login </button>
//                 <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Sign Up</button>
//             </form>
//         </div>
//     );

// }
// }

// export default Login;