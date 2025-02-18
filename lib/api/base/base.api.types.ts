export type Headers = { [key: string]: string };

export type QueryParams = { [key: string]: string };

export type AuthTypes = 'basic-auth' | 'bearer-token' | 'no-auth';

export interface Base64EncodedString {
    key: string;
    secret: string;
}

export interface BearerToken {
    token: string;
}

export type Credentials = Base64EncodedString | BearerToken | null;

export interface Auth {
    authType: AuthTypes;
    credentials?: Credentials;
}
