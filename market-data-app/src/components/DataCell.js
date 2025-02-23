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
      
    case 'datetime':
      const dateTime = new Date(value);
      if (isNaN(dateTime.getTime())) return <span>-</span>; // Check if the date is invalid
      const hours = dateTime.getHours().toString().padStart(2, '0');
      const minutes = dateTime.getMinutes().toString().padStart(2, '0');
      const seconds = dateTime.getSeconds().toString().padStart(2, '0');
      return <span>{`${dateTime.getDate()}/${(dateTime.getMonth() + 1)}/${dateTime.getFullYear()} ${hours}:${minutes}:${seconds}`}</span>;

    default: // Text or other types
      return <span>{value ?? '-'}</span>;
  }
};

export default DataCell;