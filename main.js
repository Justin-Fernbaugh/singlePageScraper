// the URL you want to make a request to
var theURL = ''
var yelp = 'https://www.yelp.com/biz/503-moving-labor-services-wilsonville-2'

// Use cors-anywhere to bypass local ajax request-only
var proxy = 'https://cors-anywhere.herokuapp.com/';
//theURL URL with cors-anywhere appended to it.
var proxiedURL = proxy + theURL;
// Yelp URL not in use.
var yelpURL = proxy + yelp;

//Variable to transfer data out of function.
var htmlBody = "";

var request;

//Function to insert data from GET request into html web page.
function insertHtmlBody() {
    //The following is to make my specific GET request data usuable.
    htmlBody = htmlBody.slice(htmlBody.indexOf(")") + 1);

    htmlBody = htmlBody.replace(/[^d.,]+/,'');
    htmlBody = htmlBody.slice(2);
    htmlBody = htmlBody.substring(1, htmlBody.length-1);
    htmlBody = (htmlBody/10);
    htmlBody = Math.round(htmlBody) * 10;

    //Div element to replace GET request text with.
    $("#thumtack-reviews-numbers").html(htmlBody);
}

function getData() {
    //Variable for GET request incase .always function is used. Other than .always, variable declaration not needed.
    request = $.get(proxiedURL, function( data ) { data = data.toString(); data = $(data).find(".flex-grow-0").text(); htmlBody = data; })
    //Function called upon the GET request finishing
    .done(function() {
        if (htmlBody === "") {
            getData(); }
        else {
            insertHtmlBody(); }
        })
        //Funciton called when GET request fails
      .fail(function() {
        console.log(Error);
        getData();
      });
}
getData();