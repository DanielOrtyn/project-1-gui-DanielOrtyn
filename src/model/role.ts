
export class Role {
    roleId: number = 0;
    role: string = '';

    constructor(roleId = 0, role = '') {
        this.roleId = roleId;
        this.role = role;
    }

    toString() {
        return this.role;
    }
}