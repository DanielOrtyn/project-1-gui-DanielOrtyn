import React from 'react';
import { environment } from '../../environment';
import { UserCardComponent } from './user-card.component';
import { User } from '../../model/user';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { UserUpdateComponent } from './user-update.component';
import '../../general.scss';

interface IUsersProps {
    currentUser?: User;
}

interface IUsersState {
    message: string;
    users: User[];
    userSearchId: number;
}

export class UsersComponent extends React.Component<IUsersProps, IUsersState> {
    // all users
    // specific user
    // patch user

    constructor(props: any) {
        super(props);
        const emptyUserArray: User[] = [];
        this.state = {
            message: '',
            users: emptyUserArray,
            userSearchId: this.props.currentUser ? this.props.currentUser.userId : 0
        };
    }

    // in here we should initialize http calls
    componentDidMount = async () => {
        await this.getUsers();
    }

    async getUsers() {
        const resp = await fetch(environment.context + '/users', {
            method: 'GET',
            credentials: 'include'
        })


        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            this.setState({
                users: body
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

    updateUserSearchId = (event) => {
        this.setState({
            userSearchId: Number(event.target.value)
        });
    }

    getUserById = async () => {
        const userId = this.state.userSearchId;
        console.log(`${environment.context}/users/${userId}`)
        const resp = await fetch(`${environment.context}/users/${userId}`, {
            method: 'GET',
            credentials: 'include'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            this.setState({
                users: [body]
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
                <UserUpdateComponent updateMessage={this.updateMessage} />
                <div className="largeBuffer noLeftPad">
                    <div className='textInputBlock'>
                        <h5 className="basicText">Select User Id:</h5>
                        <input className="textInputBoxInput" type='number' min='0'
                            placeholder={'User Id'} value={this.props.currentUser && this.props.currentUser.userId}
                            onChange={this.updateUserSearchId} />
                    </div>
                    <div className="centerHorizontalCard mediumBuffer">
                        <button onClick={this.getUserById}
                            className="btn btn-success">Select User</button>
                    </div>
                </div>
                <div className="container">
                    < div className="row">
                        {this.state.users.map(user => (
                            <UserCardComponent key={'user-' + user.userId} user={user} />
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(UsersComponent);
