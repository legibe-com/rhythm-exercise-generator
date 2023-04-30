function rhythmExerciseRandomPattern(withwhat)
{
	// feel free to replace these emojis with some images or letters like "R" for right hand and "L" for left hand etc
	let values = null;
	if(withwhat == 'hands')
	{ values = ['<div style="rotate: -50deg;">🫱</span>', '<div style="rotate: 50deg;">🫲</div>', '🙌', null]; }
	else if(withwhat == 'feet')
	{ values = ['<div style="rotate: -30deg; -webkit-transform: scaleX(-1); transform: scaleX(-1);">🦶</span>', '<div style="rotate: 30deg;">🦶</div>', null]; }

	// to adjust the difficulty, just add more or less null values to the array
	let difficulty = document.querySelector("#rhythm_exercise_settings_difficulty select").value;
	     if(difficulty == 1) { values.push(null, null, null, null, null, null, null, null); }
	else if(difficulty == 2) { values.push(null, null, null); }

	return values[Math.floor(Math.random() * values.length)];
}

function rhythmExercisePopulateTable(withwhat)
{
	const array_random_pattern = Array.from({ length: 8 }, () => rhythmExerciseRandomPattern(withwhat));
	const table_row = document.getElementById('js_rhythm_exercise_' + withwhat);
	const table_cells = table_row.getElementsByTagName('td');

	for(let i = 0; i < table_cells.length; i++)
	{ table_cells[i].innerHTML = array_random_pattern[i] || ''; }
}
rhythmExercisePopulateTable('hands');
rhythmExercisePopulateTable('feet');

// if we change the difficulty
document.querySelector("#rhythm_exercise_settings_difficulty select").addEventListener('change', function() {
	// repopulate the table
	rhythmExercisePopulateTable('hands');
	rhythmExercisePopulateTable('feet');

	// remember the difficulty with a cookie so we don't need to change it all the time
	let date = new Date();
	date.setDate(date.getDate() + 365);
	document.cookie = "difficulty=" + document.querySelector("#rhythm_exercise_settings_difficulty select").value + "; expires=" + date.toUTCString() + "; path=/";
});

// if there's a "difficulty" cookie, adjust the select value
let cookie_difficulty = document.cookie.replace(/(?:(?:^|.*;\s*)difficulty\s*\=\s*([^;]*).*$)|^.*$/, "$1");
if(cookie_difficulty != '')
{
	for(var opt, j = 0; opt = document.querySelector("#rhythm_exercise_settings_difficulty select").options[j]; j++)
	{
		if(opt.value == cookie_difficulty)
		{ document.querySelector("#rhythm_exercise_settings_difficulty select").selectedIndex = j; break; }
	}
}