import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
  handleFormSubmit(values){
    console.log(values);
  }


  render(){
    //handleSubmit comes from redux form 
    // note how we hook up email ...email and password ...password to form
    // our form needs to listen to the onSubmit event
    // which comes from the handleSubmit and we pass that the function to handle it.
    // We need to bind it otherwise this is tied to the form.
    const { handleSubmit, fields: {email, password}} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control"/>
        </fieldset> 
        <button action="submit" className="btn btn-primary">Sign in</button>     
      </form>
    );
  }
};

// redux form 
// first set of params if for configuration
// second set is for redux sign
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);