import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import {expect} from "meteor/practicalmeteor:chai"
import { Messages } from './messages.js';

describe("Server Test", function(){

  it("this test is server side only", function(){
    expect(Meteor.isServer).to.be.true
    expect(Meteor.isClient).to.be.false
  });

});	
 
if (Meteor.isServer) {
     describe('Deleting a record from Server side', function(){
    	const userId = Random.id();
    	let messageId;

    	beforeEach(() => {
    		Messages.remove({});
    		messageId = Messages.insert({
    			text: 'test task',
          createdAt: new Date(),
          owner: userId,
          username: 'user1',
      		});
    	});
      it('can delete owned task', function(){
      	const deleteMessage = Meteor.server.method_handlers['messages.remove'];
        const invocation = { userId };
        deleteMessage.apply(invocation, [messageId]);
        assert.equal(Messages.find().count(), 0);
      });
    });
}

if (Meteor.isServer) {
  describe('Inseting a message from Server',function(){
    const userId = Random.id();
    	let messageId;

    	beforeEach(function(){
    		Messages.remove({});
    		Messages.insert({
    			text: 'test task',
          		createdAt: new Date(),
          		owner: userId,
          		username: 'user1',
      		});
    	});
      
      it('Task inserted successfully', function(){
      	   
        assert.equal(Messages.find().count(), 1);
      });
    });
}

if(Meteor.isClient){
	describe('Deleting a message from client', function() {

	});

	it('Inserting from client', function(){
		beforeEach(function(){
			Messages.remove({});
		});
		Meteor.call('messages.insert', "test text");

	});
}

if (Meteor.isServer) {
  describe('When message id is different',function(){
    const userId = Random.id();
    	let messageId1;
    	let messageId2;

    	beforeEach(function(){
    		Messages.remove({});
    		messageId1 = Messages.insert({
    			text: 'test task',
          		createdAt: new Date(),
          		owner: userId,
          		username: 'user1',
      		});
      		messageId2 = Messages.insert({
    			text: 'test task',
          		createdAt: new Date(),
          		owner: userId,
          		username: 'user1',
      		});
    	});
      
      it('Task inserted have different ids', function(){
      	   
        assert.equal(messageId1,messageId2);
      });
    });
}