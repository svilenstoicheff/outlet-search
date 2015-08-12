//create outlet search (OS) namespace 
var OS = OS || {};

// array to hold the processed contacts
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

// build out a contact list from a passed-in object and display on page
OS.buildContacts = function(contacts){
	//remove previous results
	$('.contactList').remove();
	contacts.forEach(function(contact, i, arr){
			var html = '<section class="contactList box"><p><strong>' +
						contact.firstName +' '+ contact.lastName +'</strong>, '+ contact.title +
						', <em>' + contact.outletName + '</em>' +
						'</p><blockquote>'+ contact.profile +'</blockquote</section>';

		$('#searchResults').append(html);
	});
};

// search full contact list by field name and search term
OS.searchContacts = function(field, value){

	//check and prompt for a valid search term, to prevent the loading of the complete result set - potential performance issue
	if (value.length < 2){
		alert('Please provide a valid search term - two or more characters');
	}
	
	var contactsFound = [];

	OS.fullContacts.forEach(function(el, i, arr){
		
		var term = value.toLowerCase(), 
			stringSearched = el[field].toLowerCase();

		//busienss logic: based on type of input, compare exact values or keyword matches
		switch(field){
			case 'firstName':
				if(term === stringSearched){
					contactsFound.push(el);
				}
			break;
			case 'lastName':
				if(term === stringSearched){
					contactsFound.push(el);
				}
			break;
			case 'title':
				if(term === stringSearched){
					contactsFound.push(el);
				}
			break;
			case 'outletName':
				if(stringSearched.indexOf(term) > -1){
					contactsFound.push(el);
				}
			break;
			case 'profile':
				if(stringSearched.indexOf(term) > -1){
					contactsFound.push(el);
				}
			break;
			default:
			console.log('search field is missing');
		}
		
	});

	OS.buildContacts(contactsFound);
};

$(document).ready(function(){
	
	//initial data load
	OS.loadData();	
	
	//bind the button click to the search function, pass parameters
	$('#contactSearch').on('click', function(e){
		e.preventDefault();
		var searchBy = $('#searchBy option:selected').val(), 
			searchTerm =  $('#searchTerm').val().trim();
			OS.searchContacts(searchBy, searchTerm);
	});
});

