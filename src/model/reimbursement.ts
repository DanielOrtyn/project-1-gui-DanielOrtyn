import { ReimbursementStatus } from "./ReimbursementStatus";
import { ReimbursementType } from "./ReimbursementType";

export class Reimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status?: ReimbursementStatus;
    type?: ReimbursementType;

    constructor(newReimbursementId: number, newAuthor: number,
        newAmount: number, newDateSubmitted: number,
        newDateResolved: number, newDescription: string,
        newResolver: number, newStatus: ReimbursementStatus,
        newType: ReimbursementType) {

        this.reimbursementId = newReimbursementId;
        this.author = newAuthor;
        this.amount = newAmount;
        this.dateSubmitted = newDateSubmitted;
        this.dateResolved = newDateResolved;
        this.description = newDescription;
        this.resolver = newResolver;
        this.status = newStatus;
        this.type = newType;
    }

    public static sqlConverter(jsonObj: Reimbursement, newStatus: ReimbursementStatus,
        newType: ReimbursementType) {
        console.log(jsonObj);
        console.log(newStatus);
        console.log(newType);
        return new Reimbursement(jsonObj.reimbursementId, jsonObj.author,
            jsonObj.amount, jsonObj.dateSubmitted, jsonObj.dateResolved,
            jsonObj.description, jsonObj.resolver, newStatus, newType);
    }

    isFurtherChangeAllowed() {
        if (this.status) {
            return this.status.statusId !== 4 && this.status.statusId !== 5;
        }
        return false;
    }
}