export class SimpleUser {
    userId: number;
    username: string;

    constructor(userId = 0, username = '') {
        this.userId = userId;
        this.username = username;
    }

    toString(): string {
        return this.username;
    }
}