#Search Outlets Coding Exercise
For this exercise, you will create an application that will read in and allow the user to search for news outlets and contacts. The application should allow the user to specify a search term (can be 1 or more words). Based on the input search term, the application should display any contacts that match the input search term with the following information: 

* Contact Name (First & Last)
* Contact Title
* Outlet name (outlet that they are associated with using the OutletId)
* Contact Profile

##Requirements
The following requirements apply:

1. Contacts that contain the matching word in thier profile should be returned
2. Contacts that match on last Name exactly should be returned
3. Contacts that match on Title exactly should be returned
4. Contacts that belong to an Outlet where the Outlet Name contains the search term should be returned
5. The application can be in any format you wish (e.g. console app, windows app, web app, etc…)
6. The finished application should compile and have no external dependencies (e.g. a database connection)
7. Feel free to use any third party/open source libraries
8. Delivery of project can be via zip file, GitHub repository or other

##Data Format
Included in this project are two JSON files, one that defines Outlets and one that defines Contacts that belong to outlets. The structure of the data is defined as follows:

| Outlet                   |
|--------------------------|
| Id - int                 |
| Name - string            |
| Contacts - List<Contact> |


| Contact            |
|--------------------|
| Id - int           |
| OutletId - int     |
| FirstName - string |
| LastName - string  |
| Title - string     |
| Profile - string   |

When reading in the JSON data, Contacts should be related to thier parent Outlet.

####Example Outlet Data:
```
{
  "id": 1374048,
  "name": "Educational Marketer"
},
```

####Example Contact Data:
```
{
  "id": 4415401,
  "outletId": 1374048,
  "firstName": "Kathleen",
  "lastName": "Mickey",
  "title": "Managing Editor",
  "profile": "Mickey is the Managing Editor for Educational Marketer and Electronic Education Report and covers Print and Electronic Educational Publishing. Do not send photographs or article submissions as they only accept story ideas and press releases. She can be contacted via e-mail.  Mickey has served as the managing editor for Educational Marketer and Electronic Education Report since 2000."
},
```
