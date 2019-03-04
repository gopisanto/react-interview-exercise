import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import styles from './AddFriendInput.css';

class AddFriendInput extends Component {

  render () {
    const {isDirty, errorMessages} = this.state;

    return (
      <div onKeyDown={this.handleSubmit.bind(this)}>
        {isDirty && errorMessages.length > 0 && <label className="error">Please provide {errorMessages.join(', ')}</label>}
        <input
          type="text"
          autoFocus="true"
          className={classnames('form-control', styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleChange.bind(this)} />
        <div className={styles.gender}>
          <label className={styles.genderLabel}>Gender:</label>
          <label className="radio-inline">
            <input
              type="radio"
              name="gender"
              value="male"
              onClick={this.handleGenderSelection}
              checked={this.state.gender === 'male'}
            />Male
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="gender"
              value="female"
              onClick={this.handleGenderSelection}
              checked={this.state.gender === 'female'}
            />Female
          </label>
        </div>
      </div>
    );
  }

  constructor (props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || '',
      gender: '',
      errorMessages: [],
      isDirty: false
    };
  }

  getErrorMessages = () => {
    const { name, gender } = this.state;
    const errorMessages = [];

    if (isEmpty(name)) {
      errorMessages.push('name');
    }
    if (isEmpty(gender)) {
      errorMessages.push('gender');
    }

    return errorMessages;
  }

  setErrorMessages = () => this.setState({errorMessages: this.getErrorMessages()});

  handleGenderSelection = event => {
    this.setState({gender: event.target.value}, this.setErrorMessages);
  }

  handleChange (e) {
    this.setState({name: e.target.value}, this.setErrorMessages);
  }

  handleSubmit (e) {
    const { name, gender } = this.state;
    const errorMessages = this.getErrorMessages();

    if (e.which === 13) {      
      if (errorMessages.length > 0) {
        this.setState({errorMessages, isDirty: true});
      } else {
        this.props.addFriend({ name: name.trim(), gender });
        this.setState({ name: '', gender: '', errorMessages: [], isDirty: false });
      }
    }
  }

}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput