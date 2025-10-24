// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
    namespace App {
        interface UserPermission {
            name: string;
            codename: string;
        }

        interface Group {
            name: string;
            permissions: UserPermission[];
        }

        interface Company {
            id: number;
            name: string;
            address: string;
            contact: string;
        }

        interface Branch {
            id: number;
            name: string;
            location: string;
        }

        interface Profile {
            id: number;
            user: number;
            first_name: string;
            last_name: string;
            middle_name: string;
            gender: string; // "M", "F", or others
            phone_1: string;
            phone_2: string;
            admin_access: boolean;
        }

        interface User {
            id: number;
            email: string;
            first_name: string;
            last_name: string;
            is_company_admin: boolean;
            c_groups: any[]; // Add the missing property
            user_permissions: any[]; // Add the missing property
            company: any; // Add the missing property
            accessible_branches: any[]; // Add the missing property
            profile: any; // Add the missing property
            [key: string]: any;
        }
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
