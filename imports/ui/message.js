import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './message.html';

Template.message.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.message.events({
  'click .delete'() {
  	if ( confirm ("Are you sure to delete?") ){
    	Meteor.call('messages.remove', this._id);
  	}
  },
});