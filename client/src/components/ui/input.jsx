import React from 'react';
import { Form } from 'react-bootstrap';

function Input({
  className,
  type,
  ...props
}) {
  return (
    <Form.Control
      type={type}
      className={className}
      {...props}
    />
  );
}

export { Input };