import React from 'react';
import { environment } from '../../environment';
import { FieldUpdate } from '../../model/fieldUpdate';
import '../../general.scss';
import { PositiveIntegerInputComponent } from '../input/positiveIntegerInput.component';
import { TextInputComponent } from '../input/textinput.component';
import { DropDownListInputComponent } from '../input/dopdownlist.component';
import { Role } from '../../model/role';

interface IUserUpdateProps {
    updateMessage: (newMessage: string) => void
}

interface IUserUpdateState {
    updateUserId: FieldUpdate<number>;
    currentField: FieldUpdate<any>;
    roleList: Role[];
}

export class UserUpdateComponent extends React.Component<IUserUpdateProps, IUserUpdateState> {
    updateableFields: FieldUpdate<any>[];


    constructor(props: any) {
        super(props);

        this.updateableFields = [new FieldUpdate<string>('', 'username', 'Username'),
        new FieldUpdate<string>('', 'password', 'Password'),
        new FieldUpdate<string>('', 'firstName', 'First Name'),
        new FieldUpdate<string>('', 'lastName', 'Last Name'),
        new FieldUpdate<string>('', 'email', 'Email'),
        new FieldUpdate<Role>(new Role(-1, ''), 'roleid', 'Role')];


        this.state = {
            updateUserId: new FieldUpdate<number>(NaN, 'Id', 'Id'),
            currentField: this.updateableFields[0],
            roleList: []
        };
    }

    async componentDidMount() {
        await this.getUserRoleList();
    }

    async getUserRoleList() {
        const resp = await fetch(environment.context + '/universal/UserRoleList', {
            method: 'GET'
        })

        if (resp.status >= 200 && resp.status < 300) {
            const body = await resp.json();
            let parsedRoleList: Role[] = [];
            for (let role of body) {
                parsedRoleList.push(new Role(role.roleId, role.role));
            }
            this.setState({
                roleList: parsedRoleList
            });
            this.props.updateMessage('');
        } else {
            let failMessage = `Access User Role List Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.props.updateMessage(failMessage);
        }
    }

    updateUser = async () => {
        // check user id
        if (!(this.state.updateUserId.value) || this.state.updateUserId.value <= 0) {
            this.props.updateMessage('invalid user id for update');
            return;
        }
        // check that field has a valid value
        if (this.state.currentField.value === undefined) {
            return;
        }
        let patchBody = {
            userid: this.state.updateUserId.value
        }
        console.log(patchBody);
        if (this.state.currentField.name === 'roleid') {
            patchBody[this.state.currentField.name.toLowerCase()] = this.state.currentField.value.roleId;
        }
        else {
            patchBody[this.state.currentField.name.toLowerCase()] = this.state.currentField.value;
        }
        const resp = await fetch(environment.context + '/users', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(patchBody),
            headers: {
                'content-type': 'application/json'
            }
        })

        if (resp.status >= 200 && resp.status < 300) {
            this.props.updateMessage('user updated');
        }
        else {
            let failMessage = `Patch Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.props.updateMessage(failMessage);
        }
    }

    renderUpdateField() {
        console.log(typeof (this.state.currentField.value));
        console.log(this.state.currentField.value.constructor.name);
        if (typeof (this.state.currentField.value) === 'string') {
            return (<TextInputComponent key='FieldUpdaterInput' fieldUpdateModel={this.state.currentField} />);
        }
        else if (typeof (this.state.currentField.value) === 'object' && this.state.currentField.value.constructor.name === 'Role') {
            return (<DropDownListInputComponent<Role> key='FieldUpdaterInput'
                optionsList={this.state.roleList} updateSelection={this.state.currentField.updateFunction} />);
        }
        else {
            return (<p>Error Field Not Supported</p>);
        }
    }

    updateUpdateField = (newUpdateField: FieldUpdate<any>) => {
        this.setState({
            currentField: newUpdateField
        });
    }

    render() {
        return (
            <>
                <PositiveIntegerInputComponent key={this.state.updateUserId.name + 'UpdateInput'}
                    fieldUpdateModel={this.state.updateUserId} />
                <DropDownListInputComponent<FieldUpdate<any>> key='FieldUpdateSelector'
                    optionsList={this.updateableFields} updateSelection={this.updateUpdateField} />
                {this.renderUpdateField()}
                <div className="centerHorizontalCard mediumBuffer">
                    <button onClick={this.updateUser}
                        className="btn btn-primary">Update User</button>
                </div>
            </>
        );
    }
}
