import express from 'express';
import { PostgrestError } from '@supabase/supabase-js';

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err);

  if (isPostgrestError(err)) {
    return res.status(400).json({
      message: 'Database error',
      details: err.message,
      code: err.code
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      details: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal server error',
  });
};

// Type guard function to check if an error is a PostgrestError
function isPostgrestError(error: any): error is PostgrestError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'details' in error &&
    'hint' in error &&
    'message' in error
  );
}