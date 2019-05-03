import React from 'react';
import '../../general.scss';

interface IDropDownListInputProps<T> {
    optionsList: T[];
    updateSelection: (newSelection: T) => void;
}

export class DropDownListInputComponent<T> extends React.PureComponent<IDropDownListInputProps<T>> {

    sendChangeInfo = (event) => {
        let selectedObject: T = this.props.optionsList[event.target.selectedIndex];
        this.props.updateSelection(selectedObject);
    }

    render() {
        return (
            <select onChange={this.sendChangeInfo}>
                {this.props.optionsList.map(optionOfList => (
                    <option key={optionOfList.toString()} value={optionOfList.toString()}>
                        {optionOfList.toString()}
                    </option>
                ))}
            </select >
        )
    }
}
