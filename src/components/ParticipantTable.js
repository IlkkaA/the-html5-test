import React from 'react';
import PropTypes from 'prop-types';

import TableHeadRow from './TableHeadRow';
import TableBodyRow from './TableBodyRow';

const ParticipantTable = props => {
  if (props.participants.length === 0) {
    return (
      <p className="loading">
        Loading...
      </p>
    );
  }

  return (
    <table className="ParticipantTable">
      <thead>
        <TableHeadRow
          sortRowsBy={props.sortRowsBy}
          columnSortedBy={props.columnSortedBy}
          sortDirArrow={props.sortDirArrow}
        />
      </thead>
      <tbody>
      {
        props.participants.map((participant) =>
        <TableBodyRow
          key={participant.id}
          fullName={participant.fullName}
          email={participant.email}
          phone={participant.phone}
          isEditing={participant.isEditing}
          handleParticipantInputEdit={e => props.handleParticipantInputEdit(participant.id, e.target.name, e.target.value)}
          startParticipantEditing={e => props.startParticipantEditing(participant.id)}
          endParticipantEditing={e =>props.endParticipantEditing(participant.id)}
          cancelEditing={() => props.cancelEditing(participant.id)}
          removeParticipant={() => props.removeParticipant(participant.id)}
        />
      )}
      </tbody>
    </table>
  );
};

ParticipantTable.propTypes = {
  sortRowsBy: PropTypes.func.isRequired,
  columnSortedBy: PropTypes.string.isRequired,
  sortDirArrow: PropTypes.string.isRequired,
  participants: PropTypes.array.isRequired,
  startParticipantEditing: PropTypes.func.isRequired,
  endParticipantEditing: PropTypes.func.isRequired,
  handleParticipantInputEdit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired
}

export default ParticipantTable;
