export class ReimbursementStatus {
    statusId: number;
    status: string;

    public constructor(newStatusId: number, newStatus: string) {
        this.statusId = newStatusId;
        this.status = newStatus;
    }

    public static sqlConverter(jsonObj: ReimbursementStatus) {
        return new ReimbursementStatus(jsonObj.statusId, jsonObj.status);
    }

    toString() {
        return this.status;
    }
}