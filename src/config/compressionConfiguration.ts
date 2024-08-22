import compression from 'compression';
import type { Request, Response } from 'express';

function shouldCompress(req: Request, res: Response): boolean {
  if (Object.prototype.hasOwnProperty.call(req.headers, 'x-no-compression')) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

export default shouldCompress;
