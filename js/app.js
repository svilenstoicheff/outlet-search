//create outlet search namespace
var OS = OS || {};

//mepty array to hold the processed contacts
OS.fullContacts = [];

//load data files
OS.loadData = function(){
	//get contacts
	$.ajax({
		url:'js/Contacts.json',
		dataType: 'json' 
	})
	.done(function(contacts){
		//get outlets
		$.ajax({
			url: 'js/Outlets.json', 
			dataType: 'json'
		})
		.done(function(outlets){
			//match contacts to outlets
			contacts.forEach(function(contact, i, contactarray){
				outlets.forEach(function(outlet, j, outletarray){
					//if match found, extend the contact record and add it to fullContacts, to be searched on
					if(contact.outletId === outlet.id) {
						var newContact = $.extend({}, contact, {"outletName": outlet.name});
						OS.fullContacts.push(newContact);
					}

				});

			});
		})
		.fail(function(){
			console.log('error loading outlets');
		});
	})
	.fail(function(){
		//error handling here
		console.log('error loading contacts');
	});
};

OS.buildContacts = function(contacts){
	contacts.forEach(function(contact, i, arr){
			var html = '<section><p>' + contact.firstName +' '+ contact.lastName +', '+ contact.title + '</p><blockquote>'+ contact.profile +'</blockquote</section>';

		$('main').append(html);
	});
};
$(document).ready(function(){
	OS.loadData();	
});

/* example
OS.fullContacts.forEach(function(el, i, arr){
if(el.profile.indexOf('can') > 0){console.log(el)}
}) */

