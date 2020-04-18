import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './styles.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


import MemoryCard from './components/memoryCard';
import { getMemories } from "./components/memoryData";
import MemoryList from "./components/memoryList"
import AddMemory from './components/addMemory';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Quote from './components/quote';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      memories : []
    };
  }

  async componentDidMount(){
    document.title = "Home";
    let memories = await getMemories();
    this.setState({ memories: memories});
  }

  render(){
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch> {/* allows Only One Route to be displayed  */}
                    <Route exact path='/' component={Login} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/quote' component={Quote} />
                    <Route path='/add' component={AddMemory} />
                    <Route path='/memories' component={MemoryList} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
