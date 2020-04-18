import React from 'react';
import { addMemory } from './memoryData';
import { NavLink } from 'react-router-dom';
import toastr from 'toastr';
export default class AddMemory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: {
        title: '',
        body: ' '
      }
    };
  }

  // handleTitleChange = event => {
  //   var content =  this.state.content;
  //   content.title = event.target.value;
  //   this.setState({content:content}, () => {
  //     console.log(this.state.content.title);
  //   });
  // };

  // handleBodyChange = event => {
  //   var content =  this.state.content;
  //   content.body = event.target.value;
  //   this.setState({content:content}, () => {
  //     console.log(this.state.content.title);
  //   });
  // };
  changeHandler = e => {
    var content = this.state.content;
    content[e.target.name] = e.target.value;
    this.setState({ content });
  };

  addMemory = event => {
    event.preventDefault();
    addMemory(this.state.content).then(response => {
      if (response.data) {
        if (response.data._id) {
          toastr.success('Memory Added Successfully');
          this.props.history.push('/memories');
        } else {
          toastr.error(
            'Cannot add a Memory!!! kindly check your console for more information'
          );
        }
      }
      // alert(`New Message with id ${response} created!`);
    });
  };

  componentDidMount = () => {
    document.title = 'Add a memory';
  };

  render() {
    return (
      <div className='addMemory'>
        <h1> Add a new memory </h1>
        <form onSubmit={this.addMemory}>
          <label>Memory Title</label>
          <input
            type='text'
            name='title'
            onChange={this.changeHandler}
            placeholder='Give your memory a name'
          />
          <label> Memory Description</label>
          <input
            type='text'
            name='body'
            onChange={this.changeHandler}
            placeholder='Describe your memory'
          />
          {/* <input type='submit' className='btn btn-primary' /> */}
          <button
            className='btn waves-effect waves-light'
            type='submit'
            name='action'>
            Submit
            <i className='material-icons right'>send</i>
          </button>
        </form>
      </div>
    );
  }
}
