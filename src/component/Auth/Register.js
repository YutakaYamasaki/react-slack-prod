import React, {Component} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

class Register extends Component{
    state={
        username:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        errors:[]
    }
    handleChange = ( event )=>{
        this.setState({[event.target.name]: event.target.value })
    }
    isFormValid = ()=>{
        let errors = [];
        let error;
        if(this.isFormEmpty(this.state)){
            error = {message: "Fall in all fields"};
            this.setState({ errors: errors.concat(error) })
            return false
        }else if(!this.isPasswordValid(this.state)){
            error = {message: 'Password is invalid'}
            this.setState({ errors:errors.concat(error) })
            return false
        }else{
            return true
        }
    }
    
    isFormEmpty = ({username,email,password, passwordConfirmation})=>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }
    isPasswordValid = ({password,passwordConfirmation}) =>{
        if(password.length<6 || passwordConfirmation<6){
            return false;
        }else if(password !== passwordConfirmation){
            return false;
        }else{
            return true;
        }
    }
    displayErrors = errors => errors.map(
        (error, i) => <p key={i}>{error.message}</p>
    )

    handleSubmit = ( event ) =>{
        event.preventDefault();
        if(this.isFormValid()){
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((createdUser)=>{
                    console.log(createdUser);
                })
                .catch((error)=>{
                    console.log(error);
                })
        }

    }
    render(){
        const { username, email, passsword, passwordConfirmation, errors } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for devChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid 
                            name="username" 
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            type="text"
                            onChange={this.handleChange}
                            />
                            <Form.Input fluid 
                            name="email" 
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Address"
                            type="email"
                            onChange={this.handleChange}
                            />
                            <Form.Input fluid 
                            name="password" 
                            icon="lock"
                            iconPosition="left"
                            placeholder="password"
                            type="password"
                            onChange={this.handleChange}
                            />
                            <Form.Input fluid 
                            name="passwordConfirmation" 
                            icon="repeat"
                            iconPosition="left"
                            placeholder="passwordconfirmation"
                            type="password"
                            onChange={this.handleChange}
                            />
                            <Button color="orange" fluid size="large">Submit</Button>
                        </Segment>
                        {errors.length>0 &&(
                            <Message>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                    </Form>
                    <Message>Aleady a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;