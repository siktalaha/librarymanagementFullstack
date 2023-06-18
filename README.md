Create react-app
Inside src - apicalls- the routes linked with backend is mentioned.
Inside components - loaders are present as well as the protectedroute which deals with jwt token authentication (verified user can access certain pages)
Inside pages- We have Login(/Register) Home(once a user is logged in -shown a gallery of book items) ;Based on user roles namely patron admin librarian the access management has been defined in Profile(Basic Detail,Book,BorrowedBooks Reports,Users).
Inside Basic details- indivual user detail and their respective roles
Inside Book -Bookform (allowed for librarian and admin) to add or edit book , Issueform to issue book to patron,Issues shows the patrons already issued the same book
Inside Reports-avaliable to admin - linked to backend via apicalls route get-reports get the data regarding total revenue,total users and total books.
Inside Users - issuedList , details of indivual user taken from mongdb userRoute .
