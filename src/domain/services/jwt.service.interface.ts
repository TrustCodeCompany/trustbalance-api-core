export interface JwtService {
  generateToken(payload: any): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
