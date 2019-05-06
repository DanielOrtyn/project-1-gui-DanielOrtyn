export class FieldUpdate<T> {
    name: string = '';
    displayName: string = '';
    value?: T;
    updateFunction: (newValue?: T) => void;

    constructor(value?: T, name: string = '', displayName: string = '') {
        this.name = name;
        this.displayName = displayName;
        this.value = value;
        this.updateFunction = (newValue?: T) => {
            this.value = newValue;
        };
    }

    toString() {
        return this.displayName;
    }
}