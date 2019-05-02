import React from 'react';
import '../../general.scss';
import { FieldUpdate } from '../../model/fieldUpdate';

interface IInputProps {
    fieldUpdateModel: FieldUpdate<number>;
}

export class UserPositiveIntegerInputComponent extends React.PureComponent<IInputProps> {
    idInputBox: string = `${this.props.fieldUpdateModel.name}InputBox`;

    updateValue = (event) => {
        let newValue: string = event.target.value
        if (newValue === '') {
            newValue = 'NaN';
        }

        this.props.fieldUpdateModel.updateFunction(Number(newValue));
    }

    render() {
        return (
            <div className='textInputBlock'>
                <h5 className="basicText">{this.props.fieldUpdateModel.displayName}:</h5>
                <input className="textInputBoxInput" type='number' min='0'
                    id={this.idInputBox} placeholder={this.props.fieldUpdateModel.displayName}
                    onChange={this.updateValue} />
            </div >
        )
    }
}
