function setBackground(team_name) {
  var googleImgAPI = "https://www.googleapis.com/customsearch/v1?"+
                     "key=AIzaSyCLh1L38w368FuBjf5aWOI6uhrsTw0YR4o"+
                     "&cx=014307518238632820624:qhfpncr2fzy"+
                     "&num=1"+
                     "&imgSize=huge"+
                     "&q=%22"+
                     team_name.replace(" ", "+")+
                     "%22+football+wallpaper+background";
  console.log( $(team_name));
  $.ajaxSetup({async : false});
  $.getJSON( googleImgAPI, function( data, status, xhr ) {
    if (data.searchInformation.totalResults != "0"){
      var imgURL = data.items[0].pagemap.cse_image[0].src;
      document.body.style.backgroundImage = "url("+imgURL+")";
      console.log(document.body.style.backgroundImage);
    }
  });
};
