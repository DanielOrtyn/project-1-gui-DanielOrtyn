
export class ReimbursementType {
    typeId: number;
    type: string;

    constructor(newTypeId: number, newType: string) {
        this.typeId = newTypeId;
        this.type = newType;
    }
}