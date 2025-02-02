import React from 'react';

const AlignedCell = ({ children, alignment }) => {
  return <td style={{ textAlign: alignment }}>{children}</td>;
};

export default AlignedCell;