export class ReimbursementStatus {
    statusId: number;
    status: string;

    constructor(newStatusId: number, newStatus: string) {
        this.statusId = newStatusId;
        this.status = newStatus;
    }
}