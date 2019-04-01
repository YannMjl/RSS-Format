// Do some stuff with the panels
$(document).ready(function() {
  $("#panel3").hide(300).show(1500);
  $("#panel1").slideUp(1000).delay(1000).slideDown(1000);
  $("#panel4").fadeToggle(1000).fadeToggle(1000);
  console.log("do some stuff with the panels");
});

// Get the data we need through an AJAX call
// Read and Process XML using jQuery Ajax
$(document).ready(function() {
  console.log(" inside jquery function");

  $.ajax({
      type: "GET",
      dataType: "xml",
      // data: {
      //   'url': unescape('https: //rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true'),
      //  'cacheTime': 1
      // },
      url: 'https://webutils.aws.stthomas.edu/rssutilities.do?url=https://rssonefeed.aws.stthomas.edu/feed?id=140&feedReverse=true&feedReverse=true',
      error: function(e) {
        console.log(e);
        console.log("fail");
      }
    })
    .done(function(xml) {
      $(xml).find('item').each(function() {
        var _Title = $(this).find('title').text();
        console.log(_Title);

        var _Description = $(this).find('description').text();
        console.log(_Description);

        var _pubDate = $(this).find('pubDate').date();
        console.log(_pubDate);
      });

    });
  console.log("end of ajax call");
});