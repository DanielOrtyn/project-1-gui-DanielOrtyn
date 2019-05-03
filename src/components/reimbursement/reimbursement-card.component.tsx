import React from 'react';
import { environment } from '../../environment';
import { Reimbursement } from '../../model/reimbursement';
import { User } from '../../model/user';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

interface IReimbursementCardProps {
    reimbursement: Reimbursement;
    updateMessage: (newMessage: string) => void
    currentUser?: User;
}

export class ReimbursementCardComponent extends React.PureComponent<IReimbursementCardProps> {
    shortDate(date: number) {
        console.log(date);
        if (date) {
            const dateObject = new Date(date);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth();
            const day = dateObject.getDate();
            return `${year}-${month}-${day}T`
        } else {
            return 'unknown';
        }
    }

    approveReimbursement = async () => {
        if (this.props.currentUser) {
            let patchBody = {
                reimbursementid: this.props.reimbursement.reimbursementId,
                dateresolved: new Date(),
                resolver: this.props.currentUser.userId,
                status: 4
            }
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
                this.props.updateMessage('reimbursement approved');
            } else {
                let failMessage = `Resolve Failed, Code: ${resp.status}`;
                if (resp.body && resp.body['message']) {
                    failMessage += ` Message: ${resp.body['message']}`;
                }
                this.props.updateMessage(failMessage);
            }
        }
    }

    denyReimbursement = async () => {
        if (this.props.currentUser) {
            let patchBody = {
                reimbursementid: this.props.reimbursement.reimbursementId,
                dateresolved: (new Date()).getTime(),
                resolver: this.props.currentUser.userId,
                status: 5
            }
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
                this.props.updateMessage('reimbursement denied');
            } else {
                let failMessage = `Resolve Failed, Code: ${resp.status}`;
                if (resp.body && resp.body['message']) {
                    failMessage += ` Message: ${resp.body['message']}`;
                }
                this.props.updateMessage(failMessage);
            }
        }
    }

    itemRender() {
        const reimbursement: Reimbursement = this.props.reimbursement;
        return (
            <>
                <li className="list-group-item">Id: {reimbursement.reimbursementId}</li>
                <li className="list-group-item">Author: {reimbursement.author}</li>
                <li className="list-group-item">Amount: {reimbursement.amount}</li>
                <li className="list-group-item">Submission: {this.shortDate(reimbursement.dateSubmitted)}</li>
                <li className="list-group-item">Resolved: {this.shortDate(reimbursement.dateResolved)}</li>
                <li className="list-group-item">Description: {reimbursement.description}</li>
                <li className="list-group-item">Resolver: {reimbursement.resolver ? reimbursement.resolver : 'unresolved'}</li>
                <li className="list-group-item">Status: {reimbursement.status ? reimbursement.status.status : 'unknown'}</li>
                <li className="list-group-item">Type: {reimbursement.type ? reimbursement.type.type : 'unknown'}</li>
            </>
        )
    }

    buttonRender() {
        return (
            <>
                <button className="btn btn-success" onClick={this.approveReimbursement}>Approve</button>
                <button className="btn btn-danger" onClick={this.denyReimbursement}>Deny</button>
            </>
        )
    }

    render() {
        const reimbursement: Reimbursement = this.props.reimbursement;
        return (
            <div className="card niceCardWidth">
                <ul className="list-group list-group-flush">
                    {this.itemRender()}
                </ul>
                <div className="centerHorizontalCard">
                    {reimbursement.isFurtherChangeAllowed() && this.buttonRender()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(ReimbursementCardComponent);
