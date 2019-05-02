import React from 'react';
import { environment } from '../../environment';
import { FieldUpdate } from '../../model/fieldUpdate';
import '../../general.scss';
import { PositiveIntegerInputComponent } from '../input/positiveIntegerInput.component';
import { TextInputComponent } from '../input/textinput.component';

interface IUserUpdateProps {
    updateMessage: (newMessage: string) => void
}

interface IUserUpdateState {
    updateUserId: FieldUpdate<number>;
    fieldsToUpdate: FieldUpdate<string>[];
}

export class UserUpdateComponent extends React.Component<IUserUpdateProps, IUserUpdateState> {

    constructor(props: any) {
        super(props);
        this.state = {
            updateUserId: new FieldUpdate<number>(NaN, 'Id', 'Id'),
            fieldsToUpdate: [new FieldUpdate<string>('', 'Username', 'Username'),
            new FieldUpdate<string>('', 'Password', 'Password'),
            new FieldUpdate<string>('', 'FirstName', 'First Name'),
            new FieldUpdate<string>('', 'LastName', 'Last Name'),
            new FieldUpdate<string>('', 'Email', 'Email'),
            new FieldUpdate<string>('', 'Role', 'Role')]
        };
    }

    updateUser = async () => {
        let patchBody = {
            userid: this.state.updateUserId.value
        }
        for (let field of this.state.fieldsToUpdate) {
            patchBody[field.name.toLowerCase()] = field.value;
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
        } else {
            let failMessage = `Patch Failed, Code: ${resp.status}`;
            if (resp.body && resp.body['message']) {
                failMessage += ` Message: ${resp.body['message']}`;
            }
            this.props.updateMessage(failMessage);
        }
    }

    render() {
        return (
            <>
                <PositiveIntegerInputComponent key={this.state.updateUserId.name + 'UpdateInput'}
                    fieldUpdateModel={this.state.updateUserId} />
                {this.state.fieldsToUpdate.map(field => (
                    <TextInputComponent key={field.name + 'UpdateInput'}
                        fieldUpdateModel={field} />
                ))}
                <div className="centerHorizontalCard mediumBuffer">
                    <button onClick={this.updateUser}
                        className="btn btn-success">Update User</button>
                </div>
            </>
        );
    }
}
