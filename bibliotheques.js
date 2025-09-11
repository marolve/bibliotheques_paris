
var map;
var markers = [];

$(window).on( 'load', function() {
	
	initMap();
	
	$('.nav-maplist').click(function() {
		event.preventDefault();
		updateNav();
	});

	$('.btnradioday').click(function(){
		updateList();
	});
	
	$('.btnradiohour').click(function(){
		updateList();
	});
	
});

$(window).on( 'pageshow', function() {
	
	update();
	
});


var bibliotheques = [
{ name: 'Médiathèque de la Canopée', x: 48.8624488, y: 2.3468200 },
{ name: 'Bibliothèque du cinéma François Truffaut', x: 48.8624222, y: 2.3447374 },
{ name: 'Médiathèque musicale de Paris – Christiane Eda-Pierre', x: 48.86271, y: 2.3458 },
{ name: 'Bibliothèque Charlotte Delbo', x: 48.8665219, y: 2.3404139 },
{ name: 'Bibliothèque Marguerite Audoux', x: 48.8637097, y: 2.3601006 },
{ name: 'Bibliothèque de l\'Hôtel de Ville (BHdV)', x: 48.8567195, y: 2.3532017 },
{ name: 'Bibliothèque Forney', x: 48.8534078, y: 2.3591424 },
{ name: 'Bibliothèque Arthur Rimbaud', x: 48.8560527, y: 2.3563220 },
{ name: 'Bibliothèque historique de la Ville de Paris (BHVP)', x: 48.85687, y: 2.36198 },
{ name: 'Bibliothèque Mohammed Arkoun', x: 48.8424593, y: 2.3496593 },
{ name: 'Bibliothèque Buffon', x: 48.8425359, y: 2.3619057 },
{ name: 'Bibliothèque des littératures policières (BiLiPo)', x: 48.8465706, y: 2.3512935 },
{ name: 'Bibliothèque L\'Heure joyeuse', x: 48.8519721, y: 2.3449774 },
{ name: 'Bibliothèque Rainer Maria Rilke', x: 48.8394, y: 2.33885 },
{ name: 'Bibliothèque André Malraux', x: 48.8479961, y: 2.3275248 },
{ name: 'Bibliothèque Amélie', x: 48.8580602, y: 2.3089956 },
{ name: 'Bibliothèque Saint-Simon', x: 48.85691, y: 2.32009 },
{ name: 'Bibliothèque Jean d\'Ormesson (ex-Europe)', x: 48.8777273, y: 2.3175191 },
{ name: 'Bibliothèque Agustina Bessa-Luís (ex Courcelles)', x: 48.8780917, y: 2.3027106 },
{ name: 'Bibliothèque Louise Walser-Gaillard', x: 48.88151, y: 2.33244 },
{ name: 'Bibliothèque Valeyre', x: 48.8779906, y: 2.3450959 },
{ name: 'Bibliothèque Drouot', x: 48.8733857, y: 2.3404264 },
{ name: 'Fonds Patrimonial Heure Joyeuse', x: 48.87568, y: 2.35378 },
{ name: 'Médiathèque Françoise Sagan', x: 48.87557, y: 2.35375  },
{ name: 'Bibliothèque Claire Bretécher (ex-Lancry)', x: 48.8695100, y: 2.3602240 },
{ name: 'Bibliothèque François Villon', x: 48.8772247, y: 2.3706998 },
{ name: 'Bibliothèque Toni Morrison - Parmentier', x: 48.8602360, y: 2.3791681 },
{ name: 'Médiathèque Violette Leduc', x: 48.8515628, y: 2.3840327 },
{ name: 'Bibliothèque Saint-Eloi', x:  48.8454696, y: 2.3871278 },
{ name: 'Bibliothèque de la Maison Paris Nature', x: 48.8396, y: 2.44158 },
{ name: 'Bibliothèque Jeunesse Diderot', x:  48.8459092, y: 2.3777264 },
{ name: 'Bibliothèque de l\'Ecole Du Breuil', x: 48.8239291, y: 2.4591392 },
{ name: 'Médiathèque Hélène Berr', x: 48.84251, y: 2.39738 },
{ name: 'Bibliothèque de la maison du jardinage et du compostage', x: 48.83561 , y: 2.38222 },
{ name: 'Bibliothèque de l\'Ecole Estienne', x: 48.83105 , y: 2.35206 },
{ name: 'Bibliothèque Italie', x: 48.8308701, y: 2.3570791 },
{ name: 'Médiathèque Jean-Pierre Melville', x: 48.8267459, y: 2.3664051 },
{ name: 'Bibliothèque Marguerite Durand (BMD)', x: 48.8267781, y: 2.3663163 },
{ name: 'Médiathèque Virginia Woolf', x: 48.8173717, y: 2.359075 },
{ name: 'Bibliothèque Glacière - Marina Tsvetaïeva', x: 48.8273570, y: 2.3419023 },
{ name: 'Bibliothèque Georges Brassens', x: 48.83379, y: 2.32576 },
{ name: 'Bibliothèque Benoîte Groult', x: 48.8382460, y: 2.3199849 },
{ name: 'Bibliothèque Aimé Césaire', x: 48.8312882, y: 2.3115582 },
{ name: 'Médiathèque Marguerite Yourcenar', x: 48.8369, y: 2.30362 },
{ name: 'Bibliothèque Vaugirard', x: 48.8417871, y: 2.2993261 },
{ name: 'Bibliothèque Andrée Chedid', x: 48.8500551, y: 2.2863669 },
{ name: 'Bibliothèque Gutenberg', x: 48.84012, y: 2.27877 },
{ name: 'Bibliothèque Musset', x: 48.8421613, y: 2.2631956 },
{ name: 'Bibliothèque Germaine Tillion', x:  48.8619235, y: 2.2845474 },
{ name: 'Bibliothèque du tourisme et des voyages - Germaine Tillion (BTV)', x: 48.86191, y: 2.28465 },
{ name: 'Bibliothèque Colette Vivier', x: 48.8897843, y: 2.3196463 },
{ name: 'Bibliothèque des Batignolles', x: 48.8844548, y: 2.3219231 },
{ name: 'Médiathèque Edmond Rostand', x: 48.8883391, y: 2.3034488 },
{ name: 'Bibliothèque Robert Sabatier', x: 48.89157, y: 2.34434 },
{ name: 'Bibliothèque Goutte d\'Or', x: 48.8844, y: 2.35424 },
{ name: 'Bibliothèque Jacqueline de Romilly', x: 48.8994635, y: 2.3364756 },
{ name: 'Bibliothèque Václav Havel', x: 48.88899, y: 2.36311 },
{ name: 'Bibliothèque Maurice Genevoix', x: 48.8949090, y: 2.3637139 },
{ name: 'Bibliothèque Astrid Lindgren', x: 48.8848656, y: 2.3830530 },
{ name: 'Bibliothèque Hergé', x: 48.8850502, y: 2.3673219 },
{ name: 'Bibliothèque Jacqueline Dreyfus-Weill ', x: 48.87629, y: 2.38818 },
{ name: 'Bibliothèque Claude Lévi-Strauss', x: 48.8866840, y: 2.3712948 },
{ name: 'Bibliothèque Louise Michel', x: 48.8533051, y: 2.4010825 },
{ name: 'Bibliothèque Benjamin Rabier', x: 48.8927830, y: 2.3790539 },
{ name: 'Médiathèque James Baldwin', x: 48.876730, y: 2.396590 },
{ name: 'Bibliothèque Place des Fêtes', x: 48.8794010, y: 2.3973642 },
{ name: 'Archives de Paris - Salle de lecture et bibliothèque', x: 48.87909, y: 2.4067 },
{ name: 'Bibliothèque Oscar Wilde', x: 48.8720638, y: 2.3998952 },
{ name: 'Bibliothèque Naguib Mahfouz', x: 48.8700484, y: 2.3852126 },
{ name: 'Bibliothèque Jeunesse Mortier', x: 48.8714000, y: 2.4083505 },
{ name: 'Bibliothèque Maryse Condé', x: 48.8659982, y: 2.3928863 },
{ name: 'Médiathèque Marguerite Duras', x: 48.85992, y: 2.403 },
{ name: 'Bibliothèque Assia Djebar', x: 48.8492175, y: 2.4121327 }
];

function initMap() {
	var lat = 48.8621;
	var lon = 2.3397;
	map = L.map('map').setView([lat, lon], 12);

	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© OpenStreetMap'
	}).addTo(map);
	
/*	L.control.locate({
		drawCircle: true
	}).addTo(map);
	*/
}

function findBibliotheque(name) {
	var result = null;
	bibliotheques.forEach( bibliotheque => {
		if (bibliotheque.name.indexOf(name) == 0)
			result = bibliotheque;
	});
	return result;
}

function removeAllMarkers() {
	markers.forEach(marker => {
		map.removeLayer(marker);
	});
	markers = [];
}

function addMarker(lat, lon, text, openLevel) {
	marker = L.marker([lat, lon]).addTo(map);
	marker.bindPopup(text);
	marker._icon.classList.add("openlevel" + openLevel);
	markers.push(marker);
	return marker;
}


function update() {
	
	updateNav();

	let dayclicked = $('input[name=btnradioday]:checked');
	if (!dayclicked.length) {
		const dayidPrevious = $('#btngroupday').attr('data-dayselected');
		if (dayidPrevious) {
			$('#btnradioday'+dayidPrevious).click();
		} else {
			const currentDayNumber = new Date().getDate();
			$('.btnradiodaynumber'+currentDayNumber).click();
		}
	}
	
	let hourclicked = $('input[name=btnradiohour]:checked');
	if (!hourclicked.length) {
		const houridPrevious = $('#btngrouphour').attr('data-hourselected');
		if (houridPrevious) {
			$('#btnradiohour'+houridPrevious).click();
		} else {
			const currentHour = new Date().getHours();
			let hourText = '';
			if (currentHour < 10)
				hourText = '0';
			hourText += currentHour;
			$('#btnradiohour'+hourText).click();
		}
	}
}

function updateNav() {
	let clicked = $('.nav-tabs button.active');
	let showMap = clicked.attr('id') == 'map-tab';
	if (showMap) {
		$('#tablecontainer').addClass('d-none');	// hide
		$('#mapcontainer').removeClass('d-none');	// show
		map.invalidateSize();
	} else {
		$('#mapcontainer').addClass('d-none');	// hide
		$('#tablecontainer').removeClass('d-none');	// show
	}
}

function updateList() {
	
	removeAllMarkers();
	
	let dayid = '';
	let dayclicked = $('input[name=btnradioday]:checked');
	if (!dayclicked.length) return;
	let dayidclicked = dayclicked.attr('id');
	if (dayidclicked.indexOf('btnradioday') == 0) {
		dayid = dayidclicked.substring(11);
	}
	
	let hourid = '';
	let hourclicked = $('input[name=btnradiohour]:checked');
	if (!hourclicked.length) return;
	let houridclicked = hourclicked.attr('id');
	if (houridclicked.indexOf('btnradiohour') == 0) {
		hourid = houridclicked.substring(12);
	}
	
	if (dayid.length == 0 || hourid.length == 0) return;
	$('#btngroupday').attr('data-dayselected', dayid);
	$('#btngrouphour').attr('data-hourselected', hourid);

	let hour = parseInt(hourid);
	
	$('#tablecontainer tbody tr').each(function() {
		
		let bibliothequeName = $(this).attr('data-name');
		let bibliothequeLink = $(this).attr('data-link');
		let scheduleData = $(this).attr('data-schedule-data' + dayid);
		let scheduleTextComplete = $(this).attr('data-schedule-text' + dayid);
		let scheduleText = '';
		
		// schedule datas "420-510;690-810"
		let timestart = hour * 60;
		let timeend = timestart + 59;
		let start = 0;
		let openLevel = -1;
		while (start != -1) {
			let schedule = '';
			let sep = scheduleData.indexOf(';', start);
			if (sep == -1) {
				schedule = scheduleData.substring(start);
				start = -1;
			}
			else {
				schedule = scheduleData.substring(start, sep);
				start = sep + 1;
			}
			if (schedule.length > 0) {
				if (openLevel == -1)
					openLevel = 0;
				let sep = schedule.indexOf('-');
				if (sep != -1) {
					let low = parseInt(schedule.substring(0, sep));
					let high = parseInt(schedule.substring(sep + 1));
					let timestartok = (timestart >= low && timestart < high);
					let timeendok = (timeend >= low && timeend <= high);
					let addText = false;
					if (timestartok && timeendok) {
						openLevel = 1;
						addText = true;
					}
					if (openLevel == 0) {
						if ((timestartok && !timeendok) || (!timestartok && timeendok)) {
							openLevel = 2;
							addText = true;
						}
					}
					if (addText) {
						if (scheduleText.length > 0)
							scheduleText += '<br/>';
						let lowhour = (Math.floor(low/60)).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
						let lowminute = (low%60).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
						let highhour = (Math.floor(high/60)).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
						let highminute = (high%60).toLocaleString('fr-FR', {minimumIntegerDigits: 2});
						scheduleText += lowhour + ':' + lowminute + ' à ' + highhour + ':' + highminute;
					}
				}
			}
		}
		$(this).find('.schedulecell').html(scheduleText);
		$(this).removeClass('table-info');
		if (openLevel == 2)
			$(this).css('font-style', 'italic');
		if (openLevel == 1) {
			$(this).css('font-style', 'normal');
			$(this).addClass('table-info');
		}
		if (openLevel <= 0) {
			$(this).hide();
		} else {
			$(this).show();
		}
		if (openLevel >= 0) {
			let bibliotheque = findBibliotheque(bibliothequeName);
			if (bibliotheque != null) {
				let bibliothequeText = '<h6><a href="' + bibliothequeLink + '">' + bibliotheque.name + '</a></h6><br/>' + scheduleTextComplete;
				addMarker(bibliotheque.x, bibliotheque.y, bibliothequeText, openLevel);
			}
		}
	});
}