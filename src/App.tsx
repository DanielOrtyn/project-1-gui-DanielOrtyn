import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import NavComponent from './components/nav/nav.component';
import './include/bootstrap';
import { HomeComponent } from './components/home/home.component';
import SignInComponent from './components/sign-in/sign-in.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { UsersComponent } from './components/users/users.component';
import { ReimbursementsComponent } from './components/reimbursement/reimbursement.component';
import ReimbursementSubmitComponent from './components/reimbursement/reimbursement-submit.component';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavComponent />
                <div id="main-content-container">
                    <Switch>
                        <Route path="/home" component={HomeComponent} />
                        <Route path="/reimbursements" component={ReimbursementsComponent} />
                        <Route path="/reimbursementSubmit" component={ReimbursementSubmitComponent} />
                        <Route path="/sign-in" component={SignInComponent} />
                        <Route path="/users" component={UsersComponent} />
                        <Route component={HomeComponent} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
