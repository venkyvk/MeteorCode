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
      event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    Meteor.call('messages.insert', text);
    target.text.value = '';
  }, 
});