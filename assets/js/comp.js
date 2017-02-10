$( function() {
  var cache = {};
  $( "#team" ).autocomplete({
    minLength: 2,
    source: function( request, response ) {
      var term = request.term;
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }
      var competitionsAPI = "http://api.football-data.org/v1/competitions/398/teams";
      $.ajaxSetup({
        headers : {
          'X-Auth-Token': '88c3ec8611944ce2a1a7bdc430665def'
        }
      });
      $.getJSON( competitionsAPI, request, function( data, status, xhr ) {
        var results = [];
        var teams = data.teams;
        for (var i = 0; i < data.count; i++) {
          if (teams[i].name.toLowerCase().includes(term)){
            results.push({
                id: teams[i].shortName,
                label: teams[i].name,
                value: teams[i].name
            });
          }
        }
        cache[ term ] = results;

        response( results );
      });
    }
  });
} );
