// Express Request type extension
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
    };
  }
}

