// src/lib/types/auth.ts
export interface Permission {
    name: string;
    codename: string;
}

export interface Group {
    name: string;
    permissions: Permission[];
}

export interface Company {
    id: number;
    name: string;
    address: string;
    contact: string;
}

export interface Profile {
    id: number;
    user: number;
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string; // Assuming 's' means single-character (e.g., 'M', 'F')
    phone1: string;
    phone2: string;
    adminAccess: boolean;
}

export interface UserDetails {
    cGroups: Group[];
    userPermissions: Permission[];
    company: Company;
    accessibleBranches: unknown[]; // Update with specific type if known
    profile: Profile;
    email: string;
    isCompanyAdmin: boolean;
}

export interface TokenResponse {
    access: string;
}

export interface TokenObtainPairIn {
    email: string;
    password: string;
}

export interface ApiError {
    detail: string;
}