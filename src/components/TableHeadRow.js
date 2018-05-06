import React from 'react';
import PropTypes from 'prop-types';

const TableHeadRow = props =>
  <tr>
    <th
      onClick={() => props.sortRowsBy('fullName')}
      className={(props.columnSortedBy === 'fullName') ? 'th-active' : 'th-passive'}
    >Name
      <label
        className='sort-arrow'
      >{props.sortDirArrow}</label>
    </th>
    <th
      onClick={() => props.sortRowsBy('email')}
      className={(props.columnSortedBy === 'email') ? 'th-active' : 'th-passive'}
      >E-mail address
      <label
        className='sort-arrow'
      >{props.sortDirArrow}</label>
    </th>
    <th
      onClick={() => props.sortRowsBy('phone')}
      className={(props.columnSortedBy === 'phone') ? 'th-active' : 'th-passive'}
    >Phone number
      <label
        className='sort-arrow'
      >{props.sortDirArrow}</label>
    </th>
    <th></th>
  </tr>;

TableHeadRow.propTypes = {
  sortRowsBy: PropTypes.func.isRequired,
  columnSortedBy: PropTypes.string.isRequired,
  sortDirArrow: PropTypes.string.isRequired
}

export default TableHeadRow;
