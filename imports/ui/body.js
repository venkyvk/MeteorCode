import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Messages } from '../api/messages.js';

import './message.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('messages');
});

Template.body.helpers({
  messages() {
    
    return Messages.find({}, { sort: { createdAt: -1 } });
  },
  
});

Template.body.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a message into the collection
    Meteor.call('messages.insert', text);

    // Clear form
    target.text.value = '';
  }, 
});