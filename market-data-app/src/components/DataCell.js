import React from 'react';

const DataCell = ({ value, type }) => {
  if (value === undefined || value === null) {
    return <span>-</span>; // Default placeholder for undefined/null values
  }

  switch (type) {
    case 'number':
      return <span>{value ?? '-'}</span>;

    case 'percentage':
      return <span>{typeof value === 'number' ? value.toFixed(2) + '%' : '-'}</span>;

    case 'currency':
      return <span>{typeof value === 'number' ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value) : '-'}</span>;

    case 'date':
      const date = new Date(value);
      if (isNaN(date.getTime())) return <span>-</span>; // Check if the date is invalid
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return <span>{`${day}/${month}/${year}`}</span>;

    default: // Text or other types
      return <span>{value ?? '-'}</span>;
  }
};

export default DataCell;