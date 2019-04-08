// Do some stuff with the panels
$(document).ready(function() {

  $("#panel3").hide(300).show(1500);
  $("#panel1").slideUp(1000).delay(1000).slideDown(1000);
  $("#panel4").fadeToggle(1000).fadeToggle(1000);
  console.log("do some stuff with the panels");

  // calling student data function
  studentData();

  // calling fetchdata once : after that it'll call itself every 100 milisecond
  // fetchData();

  // calling function to display info session 
  infoSession();
  rssFormat();
});

// this function calls studentData to desplay new changes 1000 milisecond 
// after that have made on Demo.xml
function fetchData() {
  setTimeout(function(){
    studentData();
    // recursive call
    fetchData();
  }, 3000);
}

// read data from demo.xml
function studentData() {

  $.ajax({
    type: "GET",
    url: "./demo.xml",
    // data: "data",
    dataType: "xml",
    success: function (response) {
      
      // make sure the ul is empty
      $("ul").children().remove();

      $(response).find("info").each(function() {
        var _name = '<li>Name: ' + $(this).find('name').text();
        console.log(_name);
        
        var _position = '</li><li>Position: ' + $(this).find('position').text();

        var _major = '</li><li>Major: ' + $(this).find('major').text() + '</li>';

        // add content to the HTML          
        $("ul").append(_name);
        $("ul").append(_position);
        $("ul").append(_major);
      });
    }
  });
}

// read and display grad schools info session
function infoSession() {

  console.log("making the ajax call");

  $.ajax({
    type: "GET",

    // url: "https://rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true",

    url: "https://webutils.aws.stthomas.edu/rssutilities.do?url=https://rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true",
    
    // data: {
    //   'url': "https://rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true",
    //   'cacheTime': 1
    // },

    dataType: "xml",
    error: function (e) {
      console.log(e);
      console.log("fail");
      alert("An error occurred while processing XML file.");
    },

    success: function (xml_data) {

      console.log("displaying xml data");

      $(xml_data).find("info").each(function () {

        var _Title = $(this).find('title').text();
        console.log("Title: " + _Title);

        var _Description = $(this).find('description').text();
        console.log("Description: " + _Description);

        var _pubDate = $(this).find('pubDate').date();
        console.log("PubDate: " + _pubDate);

      });
    }

  });

  console.log("end of ajax call");

}


// second attempt to read and display xml data
function rssFormat() {

  var _msg = "start ajax call";

  console.log("Message: " + _msg);

  $.ajax({

    type: "GET",

    dataType: "xml",

    url: "https://webutils.aws.stthomas.edu/rssutilities.do?url=https://rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true",

    error: function (e) {
      console.log(e);
      console.log("fail");
      alert("An error occurred while processing XML file.");
    }

  })
  .done(function (xml_data){

    console.log("start reading the xml data");

    $(xml_data).find("info").each(function () {

      var _Title = $(this).find('title').text();
      console.log("Title: " + _Title);

      var _Description = $(this).find('description').text();
      console.log("Description: " + _Description);

      var _pubDate = $(this).find('pubDate').date();
      console.log("PubDate: " + _pubDate);

    });

  });

  console.log("end of ajax call");
  
}
