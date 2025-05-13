import React from 'react';
import auth from '../services/authService';

class LogoutForm extends React.Component {

    componentDidMount() {
        auth.logout();
        window.location = '/';
    }

    render() {
        return null;
    }
}

export default LogoutForm;