export class JwtTokenObj {
    user: string;
    iss: string;
    iat: number;
    aud: string;
    scope: string[];
    id: string;
    type: string;
    exp: number;
}
