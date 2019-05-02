
export class Reimbursement {
    reimbursementId: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;

    constructor(newReimbursementId: number, newAuthor: number,
        newAmount: number, newDateSubmitted: number,
        newDateResolved: number, newDescription: string,
        newResolver: number, newStatus: number,
        newType: number) {

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
}