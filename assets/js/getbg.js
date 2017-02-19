
$('document').ready(function() {
  var googleImgAPI = "https://www.googleapis.com/customsearch/v1?"+
                     "key=AIzaSyCLh1L38w368FuBjf5aWOI6uhrsTw0YR4o"+
                     "&cx=014307518238632820624:qhfpncr2fzy"+
                     "&num=1"+
                     "&imgSize=huge"+
                     "&q=%22"+
                     "liverpool+fc"+
                     "%22+wallpaper+background";
  $.getJSON( googleImgAPI, function( data, status, xhr ) {
    var imgURL = null
    if (data.searchInformation.totalResults == "0"){
      imgURL = "assets/images/uefa.jpg"
    } else {
      imgURL = data.items[0].pagemap.cse_image[0].src;
    }
    console.log(imgURL);
  });
});
