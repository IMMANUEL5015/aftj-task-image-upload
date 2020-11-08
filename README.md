# AFTJ IMAGE UPLOAD TASK

## Description
This project is an API which allows an image to be uploaded.

When the image uploads successfully, the endpoint responds with the image url.

If for any reason (**for instance uploading a spreadsheet document instead of an image file**) 
the upload fails, the endpoint will respond with an appropriate error message.

## Main Tools and Technologies Used
* Node.js - JavaScript Runtime for Creating Server-Side Applications
* Express - Node.js Framework
* Cloudinary - Service to Host the Image Files
* Heroku - Server for the Deployed Aplication
* POSTMAN - Endpoint Testing

## Sample Request and Response for Successful Image Upload
* Request:
    * endpoint: https://aftj-image-upload-immanuel.herokuapp.com/upload-image
    * request body data format: (formdata)
    * request body sample data: {image: imma.jpg}
    * request http method: POST

* Response:
    * status code: 200 - ok
    * http response format : json
    * http response sample:
     ```
     {
        "status": "success",
        "url": "https://res.cloudinary.com/immanueldiai/image/upload/v1604843402/az3cbbrzffejpth7w1bz.jpg"
    }
    ```

The url can be inserted on a browser window in order to view the uploaded image file.

## Sample Request and Response for Error During Upload
In this example, a word document is uploaded to ensure that an error occurs.

This example shows what the error looks like.

* Request:
    * endpoint: https://aftj-image-upload-immanuel.herokuapp.com/upload-image
    * request body data format: (formdata)
    * request body sample data: {image: imma.docx}
    * request http method: POST

* Response:
    * status code: 400 - Bad Request
    * http response format : json
    * http response sample:
     ```
     {
        "status": "error",
        "message": "Please upload an image file!"
     }
    ```