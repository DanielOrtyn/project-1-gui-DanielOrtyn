import React from 'react';
import { Reimbursement } from '../../model/reimbursement';

interface IReimbursementCardProps {
    reimbursement: Reimbursement;
}

export class ReimbursementCardComponent extends React.PureComponent<IReimbursementCardProps> {
    render() {
        const reimbursement: Reimbursement = this.props.reimbursement;
        return (
            <div className="card niceCardWidth">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Id: {reimbursement.reimbursementId}</li>
                    <li className="list-group-item">Author: {reimbursement.author}</li>
                    <li className="list-group-item">Amount: {reimbursement.amount}</li>
                    <li className="list-group-item">Submission: {reimbursement.dateSubmitted}</li>
                    <li className="list-group-item">Resolved: {reimbursement.dateResolved ? reimbursement.dateResolved : 'unknown'}</li>
                    <li className="list-group-item">Description: {reimbursement.description}</li>
                    <li className="list-group-item">Resolver: {reimbursement.resolver ? reimbursement.resolver : 'unresolved'}</li>
                    <li className="list-group-item">Status: {reimbursement.status}</li>
                    <li className="list-group-item">Type: {reimbursement.type}</li>
                </ul>
            </div>
        )
    }
}
