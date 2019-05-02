import React from 'react';
import '../../general.scss';
import { FieldUpdate } from '../../model/fieldUpdate';

interface IInputProps {
    fieldUpdateModel: FieldUpdate<string>;
}

export class TextInputComponent extends React.PureComponent<IInputProps> {
    idInputBox: string = `${this.props.fieldUpdateModel.name}InputBox`;

    updateValue = (event) => {
        const newValue = event.target.value;
        this.props.fieldUpdateModel.updateFunction(newValue);
    }

    render() {
        return (
            <div className='textInputBlock'>
                <h5 className="basicText">{this.props.fieldUpdateModel.displayName}:</h5>
                <input className="textInputBoxInput" type='string'
                    id={this.idInputBox} placeholder={this.props.fieldUpdateModel.displayName}
                    onChange={this.updateValue} />
            </div >
        )
    }
}
