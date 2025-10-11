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
            c_groups: Group[];
            user_permissions: UserPermission[];
            company: Company;
            accessible_branches: Branch[];
            profile: Profile;
            email: string;
            is_company_admin: boolean;
        }
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
