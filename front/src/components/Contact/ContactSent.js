import React from 'react';
import { Icon, Message } from 'semantic-ui-react';

const ContactSent = () => (
  <Message positive icon>
    <Icon name='check circle' />
    <Message.Content>
      <Message.Header>Your message has been sent</Message.Header>
      We&apos;ll read your message soon.
    </Message.Content>
  </Message>
);

export default ContactSent;
