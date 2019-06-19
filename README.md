# ProductCatalog

# Base Stories

    Admin Area. The admin shall be able to CRUD products and their related comments;
        For Products
            Views:
                Full List
                Details/Edit
            Available Actions:
                CRUD,
                View Comments for this product;
        For Comments
            Views:
                 All Comment List;
                 Per Product comment list;
            Available Actions:
                View,
                Delete,
                Download Attached File;
    User Area. The user shall be able to see a list of products and leave a comment for a product;
        Views:
            List of products
            Product Details
        Actions:
            View Product Details 
            Add Comment with attached file product.
                If the user decides not to upload a file, the system shall allow saving a comment without it;

# How to run

# Backend

1. Install SDK 2.2.107 https://dotnet.microsoft.com/download/thank-you/dotnet-sdk-2.2.107-windows-x64-installer
2. Open directory ProductCatalog.Api and run command 'dotnet ef database update'
3. Run Visual Studio 2017 or above
3. Open ProductCatalog.sln
4. Run ProductCatalog.Api

# Frontend

1. Open directory ProductCatalog.React
2. Run command 'npm install'
3. Run command 'npm start'
4. For admin use http://localhost:3000/admin
5. For user use http://localhost:3000