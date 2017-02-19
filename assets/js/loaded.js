if (typeof all_teams_in_each_competition === "undefined") {
  all_teams_in_each_competition = {};
}
if (typeof team_by_category === "undefined") {
  team_by_category = [];
}

$('#search-button').click(function(){
  if ( $( "#dialog").val() == "") {
    $("#dialog").text("Type your TeamName in the Search box and select your preferred team from the dropdown list.");
  }
  $("#dialog").dialog();
});
