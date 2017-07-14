import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask, deleteTask, moveTask } from '../actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }

    this.onChange = this.onChange.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addTask(e) {
    this.props.addTask(this.state.text, this.state.dueDate);
  }

  deleteTask(id, current_task_state) {
    this.props.deleteTask(id, current_task_state);
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragStart(current_task_state, task,  e) {
    e.dataTransfer.setData('from_task', current_task_state);
    e.dataTransfer.setData('task_id', task.id);
  }

  onDrop(e) {
        var task_id = e.dataTransfer.getData('task_id');
        var from_task = e.dataTransfer.getData('from_task');
        var to_task =  e.target.getAttribute('data-name');

        this.props.moveTask(task_id, from_task, to_task)

  }

  renderTasks(current_task_state) {
      const { tasks } = this.props;
      return(
        <ul className="list-group">
          {
            tasks[current_task_state].map(task => {
              return (
                <li key={task.id}
                    className={ current_task_state + " list-group-item" }
                    draggable="true"
                    onDragStart={this.onDragStart.bind(this, current_task_state, task)}>
                   <div className="list-item">{task.text}</div>
                   <div className="list-item delete-button" onClick={this.deleteTask.bind(this, task.id, current_task_state)}>
                      &#x2715;
                   </div>
                   <div style={{fontSize: 12}}><em>{moment(new Date(task.dueDate)).fromNow()}</em></div>
                </li>
              )
            })
          }
        </ul>
      )
  }

  render() {
    return(
      <div className="App">
        <div className="title">
          Tasks Board
        </div>

        <div className="form-inline remainder-form">
          <div className="form-group">
            <input className="form-control" placeholder="I have to.." name="text" value={this.state.text} onChange={this.onChange} />
            <input className="form-control" type="date" name="dueDate" value={this.state.dueDate} onChange={this.onChange} placeholder="dd-mm-yyyy" />
          </div>
          <button type="button" className="btn btn-success" onClick={this.addTask}>
            Add Task
          </button>
        </div>
        <div>
          <div className="todo" data-name="todo_tasks" onDragOver={this.onDragOver.bind(this)} onDrop={this.onDrop.bind(this)}>
            <div className="tasks_status_header">
              TODO
            </div>
              { this.renderTasks("todo_tasks") }
          </div>
          <div className="in_progress" data-name="in_progress_tasks" onDragOver={this.onDragOver.bind(this)} onDrop={this.onDrop.bind(this)}>
            <div className="tasks_status_header">
              IN PROGRESS
            </div>
            { this.renderTasks("in_progress_tasks") }
          </div>
          <div className="completed" data-name="completed_tasks" onDragOver={this.onDragOver.bind(this)} onDrop={this.onDrop.bind(this)}>
            <div className="tasks_status_header">
              COMPLETED
            </div>
            { this.renderTasks("completed_tasks") }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state
  }
}

export default connect(mapStateToProps, { addTask, deleteTask, moveTask }) (App);
