import React,{Component} from 'react';
import fire from './firebase';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="col-md-6">
                {/* <h1>Hi, Welcome to home page!</h1> */}
            </div>
        );
    }
}

export default Home;