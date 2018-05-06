import React from 'react';
import PropTypes from 'prop-types';

const NewParticipantForm = props =>

  <form onSubmit={props.newParticipantHandler} className="NewParticipant">
    <input
      type="text"
      name="newName"
      placeholder="Full name"
      value={props.newName}
      onChange={e => props.handleNewParticipantInput(e.target.name, e.target.value)}
    />
    <input
      type="email"
      name="newEmail"
      placeholder="E-mail address"
      value={props.newEmail}
      onChange={e => props.handleNewParticipantInput(e.target.name, e.target.value)}
    />
    <input
      type="tel"
      name="newPhone"
      placeholder="Phone Number"
      value={props.newPhone}
      onChange={e => props.handleNewParticipantInput(e.target.name, e.target.value)}
    />
    <button
      type="submit"
      id="submit-btn"
      disabled={props.isSubmitBtnDisabled}
    >Add new</button>
  </form>;

NewParticipantForm.proptypes = {
  newName: PropTypes.string.isRequired,
  newEmail: PropTypes.string.isRequired,
  newPhone: PropTypes.string.isRequired,
  nameValid: PropTypes.bool.isRequired,
  emailValid: PropTypes.bool.isRequired,
  phoneValid: PropTypes.bool.isRequired,
  newParticipantHandler: PropTypes.func.isRequired,
  handleNewParticipantInput: PropTypes.func.isRequired,
  isSubmitBtnDisabled: PropTypes.bool.isRequired
};

export default NewParticipantForm;
