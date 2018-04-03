import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect} from 'react-redux';

import { signinUser } from '../../actions';

class Signin extends Component {
  handleFormSubmit( {email, password}){
    console.log(`Email is ${email} password is ${password}`);
    //this.props.signinUser({email, password});
    this.props.signinUser({email, password});
  }


  render(){
    //handleSubmit comes from redux form 
    // note how we hook up email ...email and password ...password to form
    // our form needs to listen to the onSubmit event
    // which comes from the handleSubmit and we pass that the function to handle it.
    // We need to bind it otherwise this is tied to the form.
    const { handleSubmit } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div clsssName="form-group">
          <label>Email</label>
            <Field
              name="email"
              component="input"
              type="text"
              placeholder="Email"
              className="form-control"
            />
        </div>
        <div clsssName="form-group">
          <label>Password </label>
            <Field
              name="password"
              component="input"
              type="text"
              placeholder="Password"
              className="form-control"
            />
          </div>
        <button action="submit" className="btn btn-primary button">Sign in</button>     
      </form>
    );
  }
};

// redux form 
// first set of params if for configuration
// second set is for redux sign
// by setting up actions below we get access to our actions on props
export default reduxForm({
  form: 'signin'
})(connect( null, {signinUser})(Signin));