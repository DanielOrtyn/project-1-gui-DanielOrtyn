import React from 'react';
import { environment } from '../../environment';
import { FieldUpdate } from '../../model/fieldUpdate';
import '../../general.scss';
import { PositiveIntegerInputComponent } from '../input/positiveIntegerInput.component';
import { TextInputComponent } from '../input/textinput.component';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { ReimbursementType } from '../../model/ReimbursementType';

interface IReimbursementUpdateProps {
    updateMessage: (newMessage: string) => void
}

interface IReimbursementUpdateState {
    reimbursementId: FieldUpdate<number>;
    amount: FieldUpdate<number>;
    description: FieldUpdate<string>;
    possibleTypes: ReimbursementType[];
    selectedType: number;
}

export class ReimbursementUpdateComponent extends React.Component<IReimbursementUpdateProps, IReimbursementUpdateState> {

    constructor(props: any) {
        super(props);
        this.state = {
            reimbursementId: new FieldUpdate<number>(NaN, 'Id', 'Id'),
            amount: new FieldUpdate<number>(NaN, 'Amount', 'Amount'),
            description: new FieldUpdate<string>('', 'Description', 'Description'),
            possibleTypes: [],
            selectedType: NaN
        };
    }

    componentDidMount = async () => {
        await this.getReimbursementStatusList();
    }

    async getReimbursementStatusList() {
        const resp = await fetch(environment.context + '/universal/typeList', {
            method: 'GET'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            let parsedTypeList: ReimbursementType[] = [];
            parsedTypeList.push(new ReimbursementType(-1, ''));
            for (let type of body) {
                parsedTypeList.push(new ReimbursementType(type.typeId, type.type));
            }
            this.setState({
                possibleTypes: parsedTypeList
            });
            this.props.updateMessage('');
        } else {
            let failMessage = `Access Reimbursement Status List Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.props.updateMessage(failMessage);
        }
    }

    updateReimbursement = async () => {
        let patchBody = {
            reimbursementid: this.state.reimbursementId.value
        };
        this.state.amount.value && (patchBody[this.state.amount.name.toLowerCase()] = this.state.amount.value);
        this.state.description.value && (patchBody[this.state.description.name.toLowerCase()] = this.state.description.value);
        this.state.selectedType > 1 && (patchBody['type'] = this.state.selectedType);
        this.state.amount && (patchBody[this.state.amount.name.toLowerCase()] = this.state.amount.value);
        console.log(patchBody);
        const resp = await fetch(environment.context + '/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(patchBody),
            headers: {
                'content-type': 'application/json'
            }
        })

        if (resp.status >= 200 && resp.status < 300) {
            this.props.updateMessage('reimbursement updated');
        } else {
            let failMessage = `Patch Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.props.updateMessage(failMessage);
        }
    }

    updateSelectedType = (newType: ReimbursementType) => {
        this.setState({
            selectedType: newType.typeId
        });
    }

    render() {
        return (
            <>
                <PositiveIntegerInputComponent key={this.state.reimbursementId.name + 'Input'}
                    fieldUpdateModel={this.state.reimbursementId} />
                <PositiveIntegerInputComponent key={this.state.amount.name + 'Input'}
                    fieldUpdateModel={this.state.amount} />
                <TextInputComponent key={this.state.description.name + 'Input'}
                    fieldUpdateModel={this.state.description} />
                <div className='textInputBlock'>
                    <h5 className="basicText">Type:</h5>
                    <DropDownListInputComponent<ReimbursementType> key={'TypeInput'}
                        optionsList={this.state.possibleTypes} updateSelection={this.updateSelectedType} />
                </div >

                <div className="centerHorizontalCard mediumBuffer">
                    <button onClick={this.updateReimbursement}
                        className="btn btn-primary">Update Reimbursement</button>
                </div>
            </>
        );
    }
}
