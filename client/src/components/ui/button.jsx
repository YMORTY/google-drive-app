import React from 'react';
import { Button as BSButton } from 'react-bootstrap';

function Button({ className, variant, size, asChild = false, ...props }) {
  // Map custom variants/sizes to Bootstrap equivalents if necessary
  // For now, directly pass variant and size to Bootstrap Button
  return (
    <BSButton className={className} variant={variant} size={size} {...props} />
  );
}

export { Button };