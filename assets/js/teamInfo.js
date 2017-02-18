//api call

var teamId = "64";

var api01 = "http://api.football-data.org/v1/teams/" + teamId
var api02 = "http://api.football-data.org/v1/teams/" + teamId + "/players"
var api03 = "http://api.football-data.org/v1/teams/" + teamId + "/fixtures"

var urls =[api01, api02, api03]

function GetJSONResult(url)
{
  $.ajaxSetup({
    headers : {
      'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'
    }
  });
  $.getJSON(url,
  function(data){
    console.log(data);
   });
}

for (var i=0;i<=3;i++)
{
    GetJSONResult(urls[i]);
}



var dataSet = [
    [ "Sadio Mané", "Left Wing", "30,000,000 €"],
    [ "Alexander Manninger", "Keeper", "200,000 €"],
    [ "Ragnar Klavan", "Centre Back", "4,000,000 €"]
  ];

$(document).ready(function() {
    $('#playertable').DataTable( {
        data: dataSet,
        columns: [
            { title: "Name" },
            { title: "Position" },
            { title: "Market value" },
        ]
    } );
} );
