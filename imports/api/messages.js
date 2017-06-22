import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find({owner: this.userId });
  });
}

Meteor.methods({
  'messages.insert'(text) {
    check(text, String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Messages.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'messages.remove'(messageId) {
    check(messageId, String);

    const message = Messages.findOne(messageId);
    if (message.private && message.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Messages.remove(messageId);
  },
});