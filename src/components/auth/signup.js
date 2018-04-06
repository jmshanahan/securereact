import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { connect} from 'react-redux';

import { signupUser } from '../../actions';

class Signup extends Component {

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      )
    }
  }
  renderField(field){
    const { autoComplete,input, label,placeholder, meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger': "" }`
    return (
      <div className={className}>
      <label>{label}</label>
        <input className="form-control" placeholder={placeholder} type={field.type} {...input} autoComplete={autoComplete}/>
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  // If the form is not valid redux-form will not allow handleSubmit to be called.
  handleFormSubmit(formProps){
    //Call action creator to sign up user.
    this.props.signupUser(formProps);
  }

  render(){
    const {handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field label="Email" name="email" className="form-control" type="email" component={this.renderField} placeholder="Email" />
        <Field label="Password" name="password" className="form-control" type="password" component={this.renderField} placeholder="Password"  autoComplete="off"/>
        <Field label="Confirm Password" name="passwordConfirm"className="form-control" type="password" component={this.renderField}   placeholder="Confirm Password"autoComplete="off"/>
        <button action="submit" className="btn btn-primary">Sign up</button>     
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};
  if(!formProps.email){
    errors.email = 'Please enter an email';
  }  
  if(!formProps.password){
    errors.password = 'Please enter a password';
  }  
  if(!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please confirm password';
  }      
  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  //console.log(formProps);

  return errors;
}
function mapStateToProps(state){
  return { errorMessage: state.auth.error}
}
export default reduxForm({
  form:'signup',
  validate
})(connect( mapStateToProps, {signupUser})(Signup));

