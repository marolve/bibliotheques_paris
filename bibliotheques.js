
var map;
var markers = [];
var holdings = null;

$(window).on( 'load', function() {

	readHoldingsParam();
	
	if (holdings != null) {
		$("#modalcaller").attr('data-bs-target', '#infoModalDoc');
		$("#maintitle").html(holdings.title);
		$("#bibstatusheader").show();
	}
	
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

// spec (bibliothèque spécialisée) 0=non 1=oui 2=inconnu
var bibliotheques = [
{ spec: 0, name: 'Médiathèque de la Canopée', namecode:'La Canopée', code:'CP', x: 48.8624488, y: 2.3468200 },
{ spec: 1, name: 'Bibliothèque du cinéma François Truffaut', namecode:'75XXX', code:'FT', x: 48.8624222, y: 2.3447374 },
{ spec: 0, name: 'Médiathèque musicale de Paris – Christiane Eda-Pierre', namecode:'Médiathèque Musicale', code:'EP', x: 48.86271, y: 2.3458 },
{ spec: 0, name: 'Bibliothèque Charlotte Delbo', namecode:'Charlotte Delbo', code:'DL', x: 48.8665219, y: 2.3404139 },
{ spec: 0, name: 'Bibliothèque Marguerite Audoux', namecode:'Marguerite Audoux', code:'AD', x: 48.8637097, y: 2.3601006 },
{ spec: 2, name: 'Bibliothèque de l\'Hôtel de Ville (BHdV)', namecode:'75XXX', code:'HV', x: 48.8567195, y: 2.3532017 },
{ spec: 1, name: 'Bibliothèque Forney', namecode:'75XXX', code:'FY', x: 48.8534078, y: 2.3591424 },
{ spec: 0, name: 'Bibliothèque Arthur Rimbaud', namecode:'Arthur Rimbaud', code:'RB', x: 48.8560527, y: 2.3563220 },
{ spec: 1, name: 'Bibliothèque historique de la Ville de Paris (BHVP)', namecode:'75XXX', code:'HP', x: 48.85687, y: 2.36198 },
{ spec: 0, name: 'Bibliothèque Mohammed Arkoun', namecode:'Mohammed Arkoun', code:'AK', x: 48.8424593, y: 2.3496593 },
{ spec: 0, name: 'Bibliothèque Buffon', namecode:'Buffon', code:'BU', x: 48.8425359, y: 2.3619057 },
{ spec: 1, name: 'Bibliothèque des littératures policières (BiLiPo)', namecode:'75XXX', code:'LP', x: 48.8465706, y: 2.3512935 },
{ spec: 0, name: 'Bibliothèque L\'Heure joyeuse', namecode:'L\'Heure Joyeuse', code:'HJ', x: 48.8519721, y: 2.3449774 },
{ spec: 0, name: 'Bibliothèque Rainer Maria Rilke', namecode:'Rainer Maria Rilke', code:'RK', x: 48.8394, y: 2.33885 },
{ spec: 0, name: 'Bibliothèque André Malraux', namecode:'André Malraux', code:'ML', x: 48.8479961, y: 2.3275248 },
{ spec: 0, name: 'Bibliothèque Amélie', namecode:'Amélie', code:'AM', x: 48.8580602, y: 2.3089956 },
{ spec: 0, name: 'Bibliothèque Saint-Simon', namecode:'Saint-Simon', code:'SS', x: 48.85691, y: 2.32009 },
{ spec: 0, name: 'Bibliothèque Jean d\'Ormesson (ex-Europe)', namecode:'Jean d\'Ormesson', code:'OR', x: 48.8777273, y: 2.3175191 },
{ spec: 0, name: 'Bibliothèque Agustina Bessa-Luís (ex Courcelles)', namecode:'Agustina Bessa-Luis', code:'BL', x: 48.8780917, y: 2.3027106 },
{ spec: 0, name: 'Bibliothèque Louise Walser-Gaillard', namecode:'Louise Walser-Gaillard', code:'WG', x: 48.88151, y: 2.33244 },
{ spec: 0, name: 'Bibliothèque Valeyre', namecode:'Valeyre', code:'VY', x: 48.8779906, y: 2.3450959 },
{ spec: 0, name: 'Bibliothèque Drouot', namecode:'Drouot', code:'DO', x: 48.8733857, y: 2.3404264 },
{ spec: 1, name: 'Fonds Patrimonial Heure Joyeuse', namecode:'75XXX', code:'PH', x: 48.87568, y: 2.35378 },
{ spec: 0, name: 'Médiathèque Françoise Sagan', namecode:'Françoise Sagan', code:'FS', x: 48.87557, y: 2.35375  },
{ spec: 0, name: 'Bibliothèque Claire Bretécher (ex-Lancry)', namecode:'Claire Bretécher', code:'CB', x: 48.8695100, y: 2.3602240 },
{ spec: 0, name: 'Bibliothèque François Villon', namecode:'François Villon', code:'VI', x: 48.8772247, y: 2.3706998 },
{ spec: 0, name: 'Bibliothèque Toni Morrison - Parmentier', namecode:'Toni Morrison', code:'TM', x: 48.8602360, y: 2.3791681 },
{ spec: 0, name: 'Médiathèque Violette Leduc', namecode:'Violette Leduc', code:'VL', x: 48.8515628, y: 2.3840327 },
{ spec: 0, name: 'Bibliothèque Saint-Eloi', namecode:'Saint-Eloi', code:'SE', x:  48.8454696, y: 2.3871278 },
{ spec: 1, name: 'Bibliothèque de la Maison Paris Nature', namecode:'75XXX', code:'PN', x: 48.8396, y: 2.44158 },
{ spec: 0, name: 'Bibliothèque Jeunesse Diderot', namecode:'Diderot', code:'DI', x:  48.8459092, y: 2.3777264 },
{ spec: 2, name: 'Bibliothèque de l\'Ecole Du Breuil', namecode:'75XXX', code:'EB', x: 48.8239291, y: 2.4591392 },
{ spec: 0, name: 'Médiathèque Hélène Berr', namecode:'Hélène Berr', code:'HB', x: 48.84251, y: 2.39738 },
{ spec: 2, name: 'Bibliothèque de la maison du jardinage et du compostage', namecode:'75XXX', code:'JC', x: 48.83561 , y: 2.38222 },
{ spec: 2, name: 'Bibliothèque de l\'Ecole Estienne', namecode:'75XXX', code:'ES', x: 48.83105 , y: 2.35206 },
{ spec: 0, name: 'Bibliothèque Italie', namecode:'Italie', code:'IT', x: 48.8308701, y: 2.3570791 },
{ spec: 0, name: 'Médiathèque Jean-Pierre Melville', namecode:'Jean-Pierre Melville', code:'JP', x: 48.8267459, y: 2.3664051 },
{ spec: 2, name: 'Bibliothèque Marguerite Durand (BMD)', namecode:'75XXX', code:'DD', x: 48.8267781, y: 2.3663163 },
{ spec: 0, name: 'Médiathèque Virginia Woolf', namecode:'Virginia Woolf', code:'VW', x: 48.8173717, y: 2.359075 },
{ spec: 0, name: 'Bibliothèque Glacière - Marina Tsvetaïeva', namecode:'Marina Tsvetaïeva', code:'TS', x: 48.8273570, y: 2.3419023 },
{ spec: 0, name: 'Bibliothèque Georges Brassens', namecode:'Georges Brassens', code:'GB', x: 48.83379, y: 2.32576 },
{ spec: 0, name: 'Bibliothèque Benoîte Groult', namecode:'Benoîte Groult', code:'BG', x: 48.8382460, y: 2.3199849 },
{ spec: 0, name: 'Bibliothèque Aimé Césaire', namecode:'Aimé Césaire', code:'AC', x: 48.8312882, y: 2.3115582 },
{ spec: 0, name: 'Médiathèque Marguerite Yourcenar', namecode:'Marguerite Yourcenar', code:'MY', x: 48.8369, y: 2.30362 },
{ spec: 0, name: 'Bibliothèque Vaugirard', namecode:'75015 - Vaugirard', code:'VD', x: 48.8417871, y: 2.2993261 },
{ spec: 0, name: 'Bibliothèque Andrée Chedid', namecode:'Andrée Chedid', code:'CH', x: 48.8500551, y: 2.2863669 },
{ spec: 0, name: 'Bibliothèque Gutenberg', namecode:'Gutenberg', code:'GU', x: 48.84012, y: 2.27877 },
{ spec: 0, name: 'Bibliothèque Musset', namecode:'Musset', code:'MT', x: 48.8421613, y: 2.2631956 },
{ spec: 0, name: 'Bibliothèque Germaine Tillion', namecode:'Germaine Tillion', code:'GT', x:  48.8619235, y: 2.2845474 },
{ spec: 2, name: 'Bibliothèque du tourisme et des voyages - Germaine Tillion (BTV)', namecode:'75XXX', code:'TV', x: 48.86191, y: 2.28465 },
{ spec: 0, name: 'Bibliothèque Colette Vivier', namecode:'Colette Vivier', code:'CV', x: 48.8897843, y: 2.3196463 },
{ spec: 0, name: 'Bibliothèque des Batignolles', namecode:'Batignolles', code:'BA', x: 48.8844548, y: 2.3219231 },
{ spec: 0, name: 'Médiathèque Edmond Rostand', namecode:'Edmond Rostand', code:'ER', x: 48.8883391, y: 2.3034488 },
{ spec: 0, name: 'Bibliothèque Robert Sabatier', namecode:'Robert Sabatier', code:'RS', x: 48.89157, y: 2.34434 },
{ spec: 0, name: 'Bibliothèque Goutte d\'Or', namecode:'Goutte d\'Or', code:'GO', x: 48.8844, y: 2.35424 },
{ spec: 0, name: 'Bibliothèque Jacqueline de Romilly', namecode:'Jacqueline de Romilly', code:'JR', x: 48.8994635, y: 2.3364756 },
{ spec: 0, name: 'Bibliothèque Václav Havel', namecode:'Vaclav Havel', code:'VH', x: 48.88899, y: 2.36311 },
{ spec: 0, name: 'Bibliothèque Maurice Genevoix', namecode:'Maurice Genevoix', code:'MX', x: 48.8949090, y: 2.3637139 },
{ spec: 0, name: 'Bibliothèque Astrid Lindgren', namecode:'Astrid Lindgren', code:'AG', x: 48.8848656, y: 2.3830530 },
{ spec: 0, name: 'Bibliothèque Hergé', namecode:'Hergé', code:'HG', x: 48.8850502, y: 2.3673219 },
{ spec: 0, name: 'Bibliothèque Jacqueline Dreyfus-Weill ', namecode:'Jacqueline Dreyfus-Weill', code:'DW', x: 48.87629, y: 2.38818 },
{ spec: 0, name: 'Bibliothèque Claude Lévi-Strauss', namecode:'Claude Levi-Strauss', code:'LS', x: 48.8866840, y: 2.3712948 },
{ spec: 0, name: 'Bibliothèque Louise Michel', namecode:'Louise Michel', code:'MI', x: 48.8533051, y: 2.4010825 },
{ spec: 0, name: 'Bibliothèque Benjamin Rabier', namecode:'Benjamin Rabier ', code:'BR', x: 48.8927830, y: 2.3790539 },
{ spec: 0, name: 'Médiathèque James Baldwin', namecode:'James Baldwin', code:'BW', x: 48.876730, y: 2.396590 },
{ spec: 2, name: 'Archives de Paris - Salle de lecture et bibliothèque', namecode:'75XXX', code:'AR', x: 48.87909, y: 2.4067 },
{ spec: 0, name: 'Bibliothèque Oscar Wilde', namecode:'Oscar Wilde', code:'OW', x: 48.8720638, y: 2.3998952 },
{ spec: 0, name: 'Bibliothèque Naguib Mahfouz', namecode:'Naguib Mahfouz', code:'NM', x: 48.8700484, y: 2.3852126 },
{ spec: 0, name: 'Bibliothèque Jeunesse Mortier', namecode:'Mortier', code:'MO', x: 48.8714000, y: 2.4083505 },
{ spec: 0, name: 'Bibliothèque Maryse Condé', namecode:'Maryse Condé', code:'MC', x: 48.8659982, y: 2.3928863 },
{ spec: 0, name: 'Médiathèque Marguerite Duras', namecode:'Marguerite Duras', code:'DS', x: 48.85992, y: 2.403 },
{ spec: 0, name: 'Bibliothèque Assia Djebar', namecode:'Assia Djebar', code:'DJ', x: 48.8492175, y: 2.4121327 }
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
		
		let bibliotheque = findBibliotheque(bibliothequeName);
		
		var holdingsBib = null;
		if (bibliotheque != null && holdings != null) {
			for (var i = 0; i < holdings.bibs.length; i++) {
				var holdingsBibTemp = holdings.bibs[i];
				if (holdingsBibTemp.code == bibliotheque.code) {
					holdingsBib = holdingsBibTemp;
					break;
				}
			}
		}
		
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
		
		var holdingsStatus = '';
		if (holdings != null) {
			if (holdingsBib == null) {
				openLevel = -1;
			} else {
				if (openLevel >= 0) {
					var bibStatusElt = $(this).find('.bibstatus');
					bibStatusElt.html(holdingsBib.status);
					bibStatusElt.show();
					scheduleTextComplete = scheduleTextComplete + '<br/>' + holdingsBib.status;
					if (holdingsBib.date != null) {
						openLevel = 3;
					}
					if (!holdingsBib.visible) {
						openLevel = -1;
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
		
		if (openLevel == 1 || openLevel == 2) {
			$(this).show();
		} else {
			$(this).hide();
		}
		if (openLevel >= 0) {
			if (bibliotheque != null) {
				let bibliothequeText = '<h6><a href="' + bibliothequeLink + '">' + bibliotheque.name + '</a></h6><br/>' + scheduleTextComplete;
				addMarker(bibliotheque.x, bibliotheque.y, bibliothequeText, openLevel);
			}
		}
	});
}

function readHoldingsParam() {
	// data sent in url : YYYYMMDD[{bibCode}{nbdays}]_{docTitle}
	var data = window.location.hash.substring(1);
	if (data.length > 0) {
		
		var holdingsTitle = '';
		var holdingsDate = null;
		var holdingsBibs = [];
		
		// extract Title
		var posTitle = data.indexOf('_');
		if (posTitle != -1) {
			holdingsTitle = decodeURIComponent(data.substr(posTitle+1));
			data = data.substr(0, posTitle);
		}
		
		// extract Date
		if (data.length >= 8) {
			curDateStr = data.substr(0, 8);
			holdingsDate = new Date( parseInt(curDateStr.substr(0,4)), parseInt(curDateStr.substr(4,2)) - 1, parseInt(curDateStr.substr(6,2)), 12);
			data = data.substr(8);
		}
		
		// extract Bibs
		for (var i = 0; i < data.length; i+=4) {
			var bibName = '';
			var bibCode = data.substr(i, 2);
			for (var j = 0; j < bibliotheques.length; j++) {
				var bibliotheque = bibliotheques[j];
				if (bibCode == bibliotheque.code) {
					bibName = bibliotheque.name;
					break;
				}
			}
			var days36 = parseInt(data.substr(i+2, 2),36);
			var bibStatus = '';
			var bibDate = null;
			var bibVisible = true;
			if (days36 == 647) {
				bibStatus = 'En rayon';
			} else if (days36 == 646) {
				bibStatus = 'Indisponible';
				bibVisible = false;
			} else {
				var nbDays = days36 - 648;
				bibDate = new Date(holdingsDate);
				bibDate.setDate(bibDate.getDate() + nbDays);
				var bibIsoDate = bibDate.toISOString();
				bibStatus = 'Retour prévu le ' + bibIsoDate.substr(8,2) + '/' + bibIsoDate.substr(5,2) + '/' + bibIsoDate.substr(0,4) ;
			}
			holdingsBibs.push( {
				code: bibCode,
				name: bibName,
				status: bibStatus,
				visible: bibVisible,
				date: bibDate
			});
		}
		
		if (holdingsTitle.length > 0 && holdingsDate != null) {
			holdings = {
				title: holdingsTitle,
				date: holdingsDate,
				bibs: holdingsBibs
			};
			console.log(holdings);
		}
	}
}