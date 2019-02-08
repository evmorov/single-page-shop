import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Grid, Input, TextArea
} from 'semantic-ui-react';

import PageHeader from '~/src/components/shared/PageHeader';
import ContactSent from './ContactSent';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      message: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, message } = this.state;
    this.props.createContact(email, message);
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <PageHeader content='Contact us' />

          {this.props.contactSent ? (
            <ContactSent />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                required
                control={Input}
                label='Your email'
                value={this.state.email}
                onChange={this.handleEmailChange}
                placeholder='myemail@mail.com' />
              <Form.Field
                required
                control={TextArea}
                label='Message'
                value={this.state.message}
                onChange={this.handleMessageChange}
                placeholder='Tell us something' />

              <Form.Field control={Button}>Submit</Form.Field>
            </Form>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

Contact.propTypes = {
  createContact: PropTypes.func.isRequired,
  contactSent: PropTypes.bool.isRequired
};

export default Contact;
