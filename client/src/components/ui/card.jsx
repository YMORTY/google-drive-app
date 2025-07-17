import React from 'react';
import { Card as BSCard } from 'react-bootstrap';

function Card({ className, ...props }) {
  return (
    <BSCard className={className} {...props} />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <BSCard.Header className={className} {...props} />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <BSCard.Title className={className} {...props} />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <BSCard.Text className={className} {...props} />
  );
}

function CardAction({ className, ...props }) {
  // There's no direct Bootstrap equivalent for CardAction, 
  // so we'll just render a div with the class for now.
  return (
    <div className={className} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return (
    <BSCard.Body className={className} {...props} />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <BSCard.Footer className={className} {...props} />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};