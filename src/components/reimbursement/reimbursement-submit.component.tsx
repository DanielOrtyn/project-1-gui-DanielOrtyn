import React from 'react';
import { environment } from '../../environment';
import { FieldUpdate } from '../../model/fieldUpdate';
import '../../general.scss';
import { PositiveIntegerInputComponent } from '../input/positiveIntegerInput.component';
import { TextInputComponent } from '../input/textinput.component';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { ReimbursementType } from '../../model/ReimbursementType';

interface IReimbursementUpdateProps {
    currentUser?: User;
}

interface IReimbursementUpdateState {
    message: string;
    amount: FieldUpdate<number>;
    description: FieldUpdate<string>;
    possibleTypes: ReimbursementType[];
    selectedType: number;
}

export class ReimbursementSubmitComponent extends React.Component<IReimbursementUpdateProps, IReimbursementUpdateState> {
    constructor(props: any) {
        super(props);
        this.state = {
            message: '',
            amount: new FieldUpdate<number>(0, 'amount', 'Amount'),
            description: new FieldUpdate<string>('', 'description', 'Description'),
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
            for (let type of body) {
                parsedTypeList.push(new ReimbursementType(type.typeId, type.type));
            }
            this.setState({
                possibleTypes: parsedTypeList
            });
            this.updateMessage('');
        } else {
            let failMessage = `Access Reimbursement Status List Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.updateMessage(failMessage);
        }
    }

    submitReimbursement = async () => {
        if (this.props.currentUser) {
            let postBody = {
                author: this.props.currentUser.userId,
                amount: this.state.amount.value,
                datesubmitted: new Date(),
                description: this.state.description.value,
                status: 2,
                type: this.state.selectedType
            }
            console.log(postBody);
            const resp = await fetch(environment.context + '/reimbursements', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(postBody),
                headers: {
                    'content-type': 'application/json'
                }
            })

            if (resp.status >= 200 && resp.status < 300) {
                this.updateMessage('reimbursement submitted');
            } else {
                let failMessage = `Submit Failed, Code: ${resp.status}`;
                if (resp.body && resp.body['message']) {
                    failMessage += ` Message: ${resp.body['message']}`;
                }
                this.updateMessage(failMessage);
            }
        }
    }

    updateMessage = (newMessage: string) => {
        this.setState({
            message: newMessage
        });
    }

    updateSelectedType = (newType: ReimbursementType) => {
        this.setState({
            selectedType: newType.typeId
        });
    }

    render() {
        return (
            <>
                <PositiveIntegerInputComponent key={'AmountInput'}
                    fieldUpdateModel={this.state.amount} />
                <TextInputComponent key={'DescriptionInput'}
                    fieldUpdateModel={this.state.description} />
                <div className='textInputBlock'>
                    <h5 className="basicText">Type:</h5>
                    <DropDownListInputComponent<ReimbursementType> key={'TypeInput'}
                        optionsList={this.state.possibleTypes} updateSelection={this.updateSelectedType} />
                </div >
                <div className="centerHorizontalCard mediumBuffer">
                    <button onClick={this.submitReimbursement} className="btn btn-primary">Submit Reimbursement</button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(ReimbursementSubmitComponent);
