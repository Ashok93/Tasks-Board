import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRemainder, deleteRemainder } from '../actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }

    this.onChange = this.onChange.bind(this);
    this.addRemainder = this.addRemainder.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addRemainder(e) {
    console.log(this.state);
    this.props.addRemainder(this.state.text, this.state.dueDate);
  }

  deleteRemainder(id) {
    this.props.deleteRemainder(id);
  }

  renderRemainders() {
      const { remainders } = this.props;
      return(
        <ul className="list-group col-sm-4">
          {
            remainders.map(remainder => {
              return (
                <li key={remainder.id} className="list-group-item">
                   <div className="list-item">{remainder.text}</div>
                   <div className="list-item delete-button" onClick={this.deleteRemainder.bind(this, remainder.id)}>
                      &#x2715;
                   </div>
                   <div>{moment(new Date(remainder.dueDate)).fromNow()}</div>

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
            <input className="form-control" type="datetime-local" name="dueDate" value={this.state.dueDate} onChange={this.onChange} />
          </div>
          <button type="button" className="btn btn-success" onClick={this.addRemainder}>
            Add Remainder
          </button>
        </div>
        { this.renderRemainders() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    remainders: state
  }
}

export default connect(mapStateToProps, { addRemainder, deleteRemainder }) (App);
