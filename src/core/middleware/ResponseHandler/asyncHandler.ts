/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
import type { NextFunction, Request, Response } from 'express';

/**
 * Async handler to wrap the API routes, allowing for async error handling and response sending.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      // Send the response
      const { errors, ...rest } = result;
      res.status(200).json(rest); // Modify as per your response format
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  };
