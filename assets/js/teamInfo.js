//api call

var teamId = "64";

var api01 = "http://api.football-data.org/v1/teams/" + teamId
var api02 = "http://api.football-data.org/v1/teams/" + teamId + "/players"
var api03 = "http://api.football-data.org/v1/teams/" + teamId + "/fixtures"

var teamData = null;
var playerData = null;
var fixtureData = null;

$.ajaxSetup({
    headers : {'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'}
});
$.getJSON(api01, function(data) {
  teamData = data;
  responseCallback();
});

$.getJSON(api02, function(data) {
  playerData = data.players;
  responseCallback();
});

$.getJSON(api03, function(data) {
  fixtureData = data.fixtures;
  responseCallback();
})

var responseCallback = function() {

  if (!teamData || !playerData || !fixtureData)
    return;

    console.log("all 3 apis called");
    // console.log(teamData);
    // console.log(playerData);
    // console.log(fixtureData);

    var playersInfo = []

    for (var i=0;i<playerData.length; i++){
      cur_player = playerData[i]
      playersInfo.push([
        cur_player.name,
        cur_player.position,
        cur_player.marketValue,
        cur_player.jerseyNumber,
        cur_player.dateOfBirth,
        cur_player.nationality
      ])
    }
    console.log(playersInfo);

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
            ]
        } );
    });
}
