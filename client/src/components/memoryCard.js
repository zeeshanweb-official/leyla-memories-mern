import React from 'react';
import { NavLink } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { UpdateMemory, deleteMemory } from './memoryData';
import toastr from 'toastr';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      success: false,
      memory: {
        title: '',
        body: ''
      }
    };
  }

  // async componentDidMount() {
  //   this.setState({ id: this.props.id });
  // }
  componentDidMount() {
    this.setState({ id: this.props.id });
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false
    };
    M.Modal.init(this.Modal, options);
  }

  async componentDidUpdate() {
    if (this.props.id !== this.state.id) {
      this.setState({ id: this.props.id });
    }
  }
  changeHandler = e => {
    let memory = this.state.memory;
    memory[e.target.name] = e.target.value;
    this.setState({ memory });
  };
  UpdateMemory = () => {
    UpdateMemory(this.state.memory).then(response => {
      this.props.updated();
      if (response.status == 200) {
        toastr.success('Memory Updated Successfully');
      } else {
        toastr.error(
          'Cannot Update a Memory!!! kindly check your console for more information'
        );
      }
    });
  };
  setMemory = () => {
    this.setState({ memory: this.props.memory });
  };
  dltMemory = () => {
    deleteMemory(this.props.memory._id).then(response => {
      this.props.updated();
      if (response.status == 200) {
        toastr.success('Memory Deleted Successfully');
      } else {
        toastr.error(
          'Cannot Delete a Memory!!! kindly check your console for more information'
        );
      }
    });
  };
  render() {
    return (
      <div className='col m3 s12 memoryCard' onClick={this.props.clickFunction}>
        <div className='card darken-1 center-align'>
          <div className='card-body '>
            <h2>{this.props.title}</h2>
            <p>{this.props.body}</p>
          </div>
          <div className='card-action'>
            <div className='row mb0'>
              <div className='col m6'>
                <a
                  className='btn modal-trigger'
                  data-target={'modal1' + this.props.id}
                  onClick={this.setMemory}>
                  <i className='material-icons'>edit</i>
                </a>
                <div
                  ref={Modal => {
                    this.Modal = Modal;
                  }}
                  id={'modal1' + this.props.id}
                  className='modal'>
                  <div className='modal-content'>
                    <h4>Update Memory</h4>
                    <form onSubmit={this.UpdateMemory}>
                      <label>Memory Title</label>
                      <input
                        type='text'
                        name='title'
                        value={this.state.memory ? this.state.memory.title : ''}
                        onChange={this.changeHandler}
                        placeholder='Give your memory a name'
                      />
                      <label> Memory Description</label>
                      <input
                        type='text'
                        name='body'
                        value={this.state.memory ? this.state.memory.body : ''}
                        onChange={this.changeHandler}
                        placeholder='Describe your memory'
                      />
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <a
                      className='modal-close waves-effect waves-red red btn-flat'
                      onClick={this.Dismentle}>
                      Cancel
                    </a>
                    <a
                      className='modal-close waves-effect waves-green green btn-flat'
                      onClick={this.UpdateMemory}>
                      Update
                    </a>
                  </div>
                </div>
              </div>
              <div className='col m6'>
                <a className='btn' onClick={this.dltMemory}>
                  <i className='material-icons'>delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
