import React from 'react';
import { environment } from '../../environment';
import '../../general.scss';
import ReimbursementCardComponent from './reimbursement-card.component';
import { Reimbursement } from '../../model/reimbursement';
import { ReimbursementStatus } from '../../model/ReimbursementStatus';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { SimpleUser } from '../../model/simpleUser';
import { ReimbursementUpdateComponent } from './reimbursement-update.component';
import { ReimbursementType } from '../../model/ReimbursementType';

const SEARCH_TYPES = ['Status', 'Author'];

interface IReimbursementsState {
    message: string;
    userList: SimpleUser[];
    reimbursements: Reimbursement[];
    reimbursementStatusList: ReimbursementStatus[];
    searchType: number;
    searchNumber: number;
}

export class ReimbursementsComponent extends React.Component<any, IReimbursementsState> {
    constructor(props: any) {
        super(props);
        const emptySimpleUserArray: SimpleUser[] = [];
        const emptyReimbursementArray: Reimbursement[] = [];
        const emptyReimbursementStatusArray: ReimbursementStatus[] = [];
        this.state = {
            message: '',
            userList: emptySimpleUserArray,
            reimbursements: emptyReimbursementArray,
            reimbursementStatusList: emptyReimbursementStatusArray,
            searchType: 0,
            searchNumber: 1
        };
    }

    componentDidMount = async () => {
        await this.getReimbursementStatusList();
        await this.getSimpleUserList();
    }

    async getReimbursementStatusList() {
        const resp = await fetch(environment.context + '/universal/statusList', {
            method: 'GET'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            let parsedStatusList: ReimbursementStatus[] = [];
            for (let status of body) {
                parsedStatusList.push(new ReimbursementStatus(status.statusId, status.status));
            }
            this.setState({
                reimbursementStatusList: parsedStatusList
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

    async getSimpleUserList() {
        const resp = await fetch(environment.context + '/universal/simpleUserList', {
            method: 'GET'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            console.log(body);
            let parsedUserList: SimpleUser[] = [];
            for (let i = 1; i < body.length; i++) {
                const user = body[i];
                parsedUserList.push(new SimpleUser(user.userId, user.username));
            }
            console.log(parsedUserList);
            this.setState({
                userList: parsedUserList
            });
            this.updateMessage('');
        } else {
            let failMessage = `Access Simple User List Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.updateMessage(failMessage);
        }
    }

    updateSearchType = (newSearch: string) => {
        this.setState({
            searchType: SEARCH_TYPES.indexOf(newSearch, 0),
            searchNumber: 0
        });
    }

    updateAuthorSearchId = (newAuthor: SimpleUser) => {
        console.log(newAuthor);
        this.setState({
            searchNumber: newAuthor.userId
        });
    }

    updateStatusSearchId = (newStatus: ReimbursementStatus) => {
        this.setState({
            searchNumber: newStatus.statusId
        });
    }


    searchClickHandler = async () => {
        const searchId: number = this.state.searchNumber;
        if (this.state.searchType === 0) {
            this.getReimbursementsByStatus(searchId);
        }
        if (this.state.searchType === 1) {
            this.getReimbursementsByAuthor(searchId);
        }
    }


    async getReimbursementsByStatus(statusId: number) {
        const resp = await fetch(environment.context + '/reimbursements/status/' + statusId, {
            method: 'GET',
            credentials: 'include'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            const reimbursementList: Reimbursement[] = [];
            for (let reimbursementJson of body) {
                const status = ReimbursementStatus.sqlConverter(reimbursementJson.status);
                const type = ReimbursementType.sqlConverter(reimbursementJson.type);
                const reimbursementObj = Reimbursement.sqlConverter(reimbursementJson, status, type);
                reimbursementList.push(reimbursementObj);
            }
            console.log(reimbursementList);
            this.setState({
                reimbursements: reimbursementList
            });
            this.updateMessage('');
        } else {
            let failMessage = `Access Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.updateMessage(failMessage);
        }
    }

    async getReimbursementsByAuthor(authorId: number) {
        const resp = await fetch(environment.context + '/reimbursements/author/userId/' + authorId, {
            method: 'GET',
            credentials: 'include'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            console.log(body);
            this.setState({
                reimbursements: body
            });
            this.updateMessage('');
        } else {
            let failMessage = `Access Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.updateMessage(failMessage);
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
                <ReimbursementUpdateComponent updateMessage={this.updateMessage} />
                <div className="largeBuffer noLeftPad">
                    <div className='centerHorizontalCard mediumBuffer'>
                        <DropDownListInputComponent<string> optionsList={SEARCH_TYPES} updateSelection={this.updateSearchType} />
                        {
                            this.state.searchType === 0 && <DropDownListInputComponent<ReimbursementStatus> optionsList={this.state.reimbursementStatusList} updateSelection={this.updateStatusSearchId} />
                        }
                        {
                            this.state.searchType === 1 && <DropDownListInputComponent<SimpleUser> optionsList={this.state.userList} updateSelection={this.updateAuthorSearchId} />
                        }
                    </div>
                    <div className="centerHorizontalCard mediumBuffer">
                        <button onClick={this.searchClickHandler}
                            className="btn btn-primary">Search Reimbursements</button>
                    </div>
                </div>
                <div className="container">
                    < div className="row">
                        {this.state.reimbursements.map(reimbursement => (
                            <ReimbursementCardComponent key={'user-' + reimbursement.reimbursementId}
                                reimbursement={reimbursement} updateMessage={this.updateMessage} />
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}
