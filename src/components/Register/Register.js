import React from 'react';

class Register extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }
    
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://serene-lowlands-83822.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        
    }

    render() {
        return (
            <article className="testest br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pv4">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw5 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-80"
                                    type="password"
                                    name="password" 
                                    id="password"
                                    onChange={this.onPasswordChange}    
                                />
                            </div>                        
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register" />
                        </div>                   
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;