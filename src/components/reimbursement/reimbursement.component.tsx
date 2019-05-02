import React from 'react';
import { environment } from '../../environment';
import '../../general.scss';
import { ReimbursementCardComponent } from './reimbursement-card.component';
import { Reimbursement } from '../../model/reimbursement';

interface IReimbursementsState {
    message: string;
    reimbursements: Reimbursement[];
}

export class ReimbursementsComponent extends React.Component<any, IReimbursementsState> {
    constructor(props: any) {
        super(props);
        const emptyReimbursementArray: Reimbursement[] = [];
        this.state = {
            message: '',
            reimbursements: emptyReimbursementArray
        };
    }

    // in here we should initialize http calls
    componentDidMount = async () => {
        await this.getReimbursements();
    }

    async getReimbursements() {
        const resp = await fetch(environment.context + '/reimbursements/status/2', {
            method: 'GET',
            credentials: 'include'
        })


        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            console.log(body);
            this.setState({
                reimbursements: body
            });
        } else {
            let failMessage = `Access Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.setState({
                message: failMessage
            })
        }
    }

    updateMessage = (newMessage: string) => {
        this.setState({
            message: newMessage
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    < div className="row">
                        {this.state.reimbursements.map(reimbursement => (
                            <ReimbursementCardComponent key={'user-' + reimbursement.reimbursementId}
                                reimbursement={reimbursement} />
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}
