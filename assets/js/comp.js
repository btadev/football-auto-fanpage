
var dataList = document.getElementById('teamnames');
var input = document.getElementById('team')
var all_teams_in_each_competition = {};
var team_by_category = []

function team_names(competition_name, url) {
  name_to_id = null;
  $.getJSON( url, function( data2, status2, xhr2 ) {
    var competition = data2;
    var teams = competition.teams;
    var team_in_competition = {}
    for (var j = 0; j < competition.count; j++) {
      var cur_team = teams[j];
      var cur_team_name = cur_team.name;
      var cur_team_id = cur_team._links.self.href.split("/").pop();
      team_in_competition[cur_team_name] = cur_team_id;
    }
    name_to_id = team_in_competition;
  })
  return name_to_id;
}

$('document').ready(function() {
  $.ajaxSetup({
    headers : {'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'},
    async : false
  });
  var allCompetitionsAPI = "http://api.football-data.org/v1/competitions/?season=2016";
  $.getJSON( allCompetitionsAPI, function( data, status, xhr ) {
    var all_competitions = data;
    for (var i = 0; i < all_competitions.length; i++) {
      var competition_name = all_competitions[i].caption;
      var competitionAPI = "http://api.football-data.org/v1/competitions/"+all_competitions[i].id+"/teams";

      var competion_name2id= team_names(competition_name, competitionAPI);
      all_teams_in_each_competition[competition_name] = competion_name2id;
      for (team_name in competion_name2id) {
        team_by_category.push({label: team_name, category: competition_name})
      }
      // console.log(team_by_category)
    }
    $.ajaxSetup({async : true});
  })

  $.widget( "custom.catcomplete", $.ui.autocomplete, {
      _create: function() {
        this._super();
        this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
      },
      _renderMenu: function( ul, items ) {
        var that = this,
          currentCategory = "";
        $.each( items, function( index, item ) {
          var li;
          if ( item.category != currentCategory ) {
            ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
            currentCategory = item.category;
          }
          li = that._renderItemData( ul, item );
          if ( item.category ) {
            li.attr( "aria-label", item.category + " : " + item.label );
          }
        });
      }
    });

    $("#team").catcomplete({
      delay: 0,
      source: team_by_category
    });
});
