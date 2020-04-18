import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import MemoryCard from './memoryCard';
import { getMemories } from './memoryData';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memories: [],
      loading: true,
      firstLoad: true
    };
  }

  async componentDidMount() {
    document.title = 'Home';
    let memories = await getMemories();
    this.setState({ memories: memories, loading: false });
    // console.log(this.state);
  }
  updated = () => {
    this.componentDidMount();
  };
  render() {
    return (
      <div className='memoryList'>
        <h1>My memories</h1>
        <div className='row'>
          {this.state.memories.map(memory => {
            return (
              <MemoryCard
                id={memory.id}
                key={memory._id}
                title={memory.title}
                body={memory.body}
                id={memory._id}
                memory={memory}
                updated={this.updated}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
