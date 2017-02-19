//api call

var teamId = getQueryVariable("id");

var team = "http://api.football-data.org/v1/teams/" + teamId
var players = "http://api.football-data.org/v1/teams/" + teamId + "/players"
var fixtures = "http://api.football-data.org/v1/teams/" + teamId + "/fixtures"

var teamData = null;
var playersData = null;
var fixturesData = null;

$.ajaxSetup({
    headers : {'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'}
});
$.getJSON(team, function(data) {
  teamData = data;
  mainLogic();
});

$.getJSON(players, function(data) {
  playersData = data.players;
  mainLogic();
});

$.getJSON(fixtures, function(data) {
  fixturesData = data.fixtures;
  mainLogic();
})

var mainLogic = function() {

  if (!teamData || !playersData || !fixturesData)
    return;

    console.log("all 3 apis called");
    // console.log(teamData);
    // console.log(fixturesData);

    var playersInfo = []

    for (var i=0;i<playersData.length; i++){
      cur_player = playersData[i]
      playersInfo.push([
        cur_player.name,
        cur_player.position,
        cur_player.marketValue,
        cur_player.jerseyNumber,
        cur_player.dateOfBirth,
        cur_player.nationality
      ])
    }

    $(document).ready(function() {
        $('#playertable').DataTable( {
            data: playersInfo,
            columns: [
                { title: "Name" },
                { title: "Position" },
                { title: "Market value" },
                { title: "Jersey no." },
                { title: "Date of birth" },
                { title: "Nationality" }
            ],
            "aLengthMenu": [[5, 10, -1], [5, 10, "All"]],
            "iDisplayLength": 5,
            aaSorting: [[2, 'dsc']]
        } );
        initMap();
    });

    var imgTag = document.getElementById("myImg");
    imgTag.src = "" + teamData.crestUrl;
    document.getElementById("fullName").innerHTML = "" + teamData.name;
    // setBackground(teamData.name);

    if ( teamData.code == null){
      document.getElementById("shortName").innerHTML = "DNE";
    }
    else {
      document.getElementById("shortName").innerHTML = teamData.code;
    }

    if ( teamData.squadMarketValue == null){
      document.getElementById("marketValue").innerHTML = "DNE";
    }
    else {
      document.getElementById("marketValue").innerHTML = teamData.squadMarketValue;
    }
}

function getQueryVariable(param)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == param){return pair[1];}
       }
       return(false);
}
