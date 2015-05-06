jQuery(document).ready(function($) {

	// default stuff
	var teams = []; // has to be declared before it's used by var arsenal etc
	var arsenal = new Team('Arsenal',63),
		tottingham = new Team('Tottingham',54),
		chelsea = new Team('Chelsea',70)

	function Team(nameOfTeam,points) { // constructor, create teams
		var lowerCase = nameOfTeam.toLowerCase();
		this.teamName = nameOfTeam;
		this.points = points;
		this.originalPoints = points;
		this.fixtures = getTeamsFixtures(lowerCase);
		this.lowerCase = lowerCase;
		teams.push(this);
	}

	function resultsTable(teams){
		var startTable = '<div class="col-xs-6"><table class="table"><tbody><tr><th>Position</th><th>Team</th><th>Points</th></tr>',
			endTable = '</tbody></table></div>';
		var position = [];	
		$.each(teams, function(index, val) {
			position.push({"teamName":this.teamName,"points":this.points});
		});
		position.sort(function(a,b){return b.points - a.points;}); // http://stackoverflow.com/questions/25127711/jquery-sorting-a-json-object		
		output = '';
		var placing = ['1st','2nd','3rd'];
		$.each(position, function(index, val) {
			output += '<tr><td>'+placing[index]+'</td><td>'+this.teamName+'</td><td>'+this.points+'</td></tr>';
		});		
		$('.team-table').html(startTable + output + endTable);
	}	

	function predictions(teams) { // adds predicted points to actual points
		$.each(teams, function(index, val) {
			var loop = $('.'+teams[index].lowerCase+' option:selected');
			points = 0;
			$.each(loop, function(index, val) {			
				// this.value = value of select box				
				var num = parseInt(this.value);
				points += num;
			});			
			teams[index].points = teams[index].originalPoints + points;
		});	
		resultsTable(teams);
	}

	// create html fixtures

	function fixturesStructure(team,content){
		var heading = '<div class="col-xs-4"><h2>'+team.teamName+'</h2>';
		var startTable = '<table class="table table-condensed"><tbody><tr><th>Opponent</th><th>Home/Away</th><th>Prediction</th></tr>';
		var endTable = '</tbody></table></div>';
		return heading+startTable+content+endTable;
	}

	function displayFixture(team) {
		var container = $('.team-fixtures');
		var output = '';
		var fixtureArray = team.fixtures;
		var predictionSelect = '<select class="'+team.lowerCase+'"><option value="3">Win</option><option value="0" selected>Lose</option><option value="1">Draw</option></select>'
		$.each(fixtureArray, function(index, val) {
			output += '<tr><td>'+this.opponent+'</td><td>'+this.matchLoc+'</td><td>'+predictionSelect+'</td></tr>';
		});
		output = fixturesStructure(team,output);
		container.append(output);
	}
	
	function getTeamsFixtures(team) {	// add fixtures to team's objects
		var fixtureArray = [];
		$.each(fixtures[team], function(index, val) {
			fixtureArray.push({"matchLoc":this.matchLoc,"opponent":this.opponent});
		});
		return fixtureArray;
	}

	Team.prototype.support = function() {
		console.log('I support '+this.teamName);
	}

	// on page load display this:
	// fixtures, tables can't be manipulated until after these added

	$.each(teams, function(index, val) { // show fixtures
		 displayFixture(teams[index]);
	});

	resultsTable(teams); // show table

	$('select').on('blur', function(event) {
		predictions(teams);
	});

	arsenal.support();
	
});