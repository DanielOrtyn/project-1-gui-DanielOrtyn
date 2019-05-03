
export class ReimbursementType {
    typeId: number;
    type: string;

    constructor(newTypeId: number, newType: string) {
        this.typeId = newTypeId;
        this.type = newType;
    }

    public static sqlConverter(jsonObj: ReimbursementType) {
        return new ReimbursementType(jsonObj.typeId, jsonObj.type);
    }

    toString(): string {
        return this.type;
    }
}