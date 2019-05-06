import React from 'react';
import { Link } from 'react-router-dom';
import Project_Logo from '../../assets/Project_0-1_Logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../../model/user';

interface INaveProps {
    currentUser?: User
}

export class NavComponent extends React.PureComponent<INaveProps> {
    render() {
        const currentUser = this.props.currentUser;
        return (
            <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-dark display-front nav-pad">
                <div className="navbar-header c-pointer shift-left">
                    <Link to="/home" className="unset-anchor">
                        <img className="img-adjust-position rev-logo" src={Project_Logo} alt="revature" />
                    </Link>
                </div>
                <div>{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "No User"}</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav ml-auto margin-nav">
                        <li className="nav-item active">
                            <Link to="/home" className="unset-anchor nav-link">Home</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/sign-in" className="unset-anchor nav-link">Sign In</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/users" className="unset-anchor nav-link">Users</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/reimbursements" className="unset-anchor nav-link">Reimbursements</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/reimbursementSubmit" className="unset-anchor nav-link">Submit Reimbursement</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentUser: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(NavComponent);
