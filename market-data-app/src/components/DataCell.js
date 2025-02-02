import React from 'react';

const DataCell = ({ value, type }) => {
  switch (type) {
    case 'number':
      return <span>{value}</span>;
    case 'percentage':
      return <span>{value.toFixed(2)}%</span>;
    case 'currency':
      return <span>{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)}</span>;
    case 'date':
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return <span>{`${day}/${month}/${year}`}</span>;
    default: // texto
      return <span>{value}</span>;
  }
};

export default DataCell;