export interface User {
    id: string,
    username: string,
    hourlyRate: number,
    token: string
    email: string
}

export interface UserFormValues {
    email: string,
    password: string,
}

export interface RegistrationFormValues {
    email: string,
    name: string,
    password: string,
}

export interface UserConfig {
    id: string;
    hourlyRate: number;
    colourScheme: string;
    currency: string;
}