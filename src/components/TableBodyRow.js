import React from 'react';
import PropTypes from 'prop-types';
import wasteBin from '../images/waste-bin.svg';
import pencil from '../images/pencil.svg';

const TableBodyRow = props => {
  if (props.isEditing) {
    return (
      <tr key={props.id}>
        <td>
          <input
            type="text"
            name="fullName"
            value={props.fullName}
            onChange={props.handleParticipantInputEdit}
          />
        </td>
        <td>
          <input
            type="email"
            name="email"
            value={props.email}
            onChange={props.handleParticipantInputEdit}
          />
        </td>
        <td>
          <input
            type="tel"
            name="phone"
            value={props.phone}
            onChange={props.handleParticipantInputEdit}
          />
        </td>
        <td>
          <button
            className="cancel-btn"
            onClick={props.cancelEditing}>
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={props.endParticipantEditing}>
            Save
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr
      key={props.id}>
      <td>
        <p onDoubleClick={props.startParticipantEditing}>
          {props.fullName}
        </p>
      </td>
      <td>
        <p onDoubleClick={props.startParticipantEditing}>
          {props.email}
        </p>
      </td>
      <td>
        <p onDoubleClick={props.startParticipantEditing}>
          {props.phone}
        </p>
      </td>
      <td>
        <button
          className="img-btn"
          onClick={props.startParticipantEditing}>
          <img src={pencil} alt="pencil"/>
          {props.isEditing}
        </button>
        <button
          className="img-btn"
          onClick={props.removeParticipant}>
          <img src={wasteBin} alt="waste-bin" />
        </button>
      </td>
    </tr>
  );
};

TableBodyRow.propTypes = {
  id: PropTypes.number,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  startParticipantEditing: PropTypes.func.isRequired,
  endParticipantEditing: PropTypes.func.isRequired,
  handleParticipantInputEdit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired
}

export default TableBodyRow;
