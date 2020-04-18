import React, {
Component
} from 'react';
import Memory from './memory';

class Memories extends Component {

render() {
  return this.props.memories.map(posts => (
    <Memory
      key={this.props.memories.id}
      deleteMemory={this.props.deleteMemory}
      memories={this.props.memories}
    />
  ));
}
}

export default Memories;
