// Extensión de tipos para Express Request
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
    };
  }
}

