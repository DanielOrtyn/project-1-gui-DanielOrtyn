import React from 'react';
import { User } from '../../model/user';

interface IUserProps {
    user: User;
}

export class UserCardComponent extends React.PureComponent<IUserProps> {
    render() {
        const user: User = this.props.user;
        const fullName: string = `${user.firstName} ${user.lastName}`;
        return (
            <div className="card niceCardWidth">
                <div className="card-body">
                    <h5 className="card-title">{fullName}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">UserId: {user.userId}</li>
                    <li className="list-group-item">Username: {user.username}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                    <li className="list-group-item">RoleId: {user.role ? user.role.roleId : 'unknown'}</li>
                    <li className="list-group-item">Role: {user.role ? user.role.role : 'unknown'}</li>
                </ul>
            </div>
        )
    }
}
