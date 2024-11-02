// src/components/ErrorAlert.jsx
import React from 'react';
import { Alert, AlertIcon, Text } from '@chakra-ui/react';
import { MdErrorOutline } from 'react-icons/md';

const ErrorAlert = ({ error }) => {
  if (!error) return null;

  return (
    <Alert status="error" mb={4} icon={<MdErrorOutline />}>
      <AlertIcon />
      <Text>{error}</Text>
    </Alert>
  );
};

export default ErrorAlert;
