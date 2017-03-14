var psPZQwsid="c8Rw9a67yuAT";
// safe-monitor@gecko.js

var psPZQwiso;
try {
	psPZQwiso = (opener != null) && (typeof(opener.name) != "unknown") && (opener.psPZQwwid != null);
} catch(e) {
	psPZQwiso = false;
}
if (psPZQwiso) {
	window.psPZQwwid = opener.psPZQwwid + 1;
	psPZQwsid = psPZQwsid + "_" + window.psPZQwwid;
} else {
	window.psPZQwwid = 1;
}
function psPZQwn() {
	return (new Date()).getTime();
}
var psPZQws = psPZQwn();
function psPZQwst(f, t) {
	if ((psPZQwn() - psPZQws) < 7200000) {
		return setTimeout(f, t * 1000);
	} else {
		return null;
	}
}
var psPZQwil;
var psPZQwit;
function psPZQwpi() {
	var il;
	if (3 == 2) {
		il = window.pageXOffset + 50;
	} else if (3 == 3) {
		il = (window.innerWidth * 50 / 100) + window.pageXOffset;
	} else {
		il = 50;
	}
	il -= (271 / 2);
	var it;
	if (3 == 2) {
		it = window.pageYOffset + 50;
	} else if (3 == 3) {
		it = (window.innerHeight * 50 / 100) + window.pageYOffset;
	} else {
		it = 50;
	}
	it -= (191 / 2);
	if ((il != psPZQwil) || (it != psPZQwit)) {
		psPZQwil = il;
		psPZQwit = it;
		var d = document.getElementById('ciPZQw');
		if (d != null) {
			d.style.left  = Math.round(psPZQwil) + "px";
			d.style.top  = Math.round(psPZQwit) + "px";
		}
	}
	setTimeout("psPZQwpi()", 100);
}
var psPZQwlc = 0;
function psPZQwsi(t) {
	window.onscroll = psPZQwpi;
	window.onresize = psPZQwpi;
	psPZQwpi();
	psPZQwlc = 0;
	var url = "http://messenger.providesupport.com/" + ((t == 2) ? "auto" : "chat") + "-invitation/0pqg7rq2ifl170wn9rvxln5yus.html?ps_t=" + psPZQwn() + "&ps_vsid=" + psPZQwsid + "";
	var d = document.getElementById('ciPZQw');
	if (d != null) {
		d.innerHTML = '<iframe allowtransparency="true" style="background:transparent;width:271;height:191" src="' + url + 
			'" onload="psPZQwld()" frameborder="no" width="271" height="191" scrolling="no"></iframe>';
	}
}
function psPZQwld() {
	if (psPZQwlc == 1) {
		var d = document.getElementById('ciPZQw');
		if (d != null) {
			d.innerHTML = "";
		}
	}
	psPZQwlc++;
}
if (false) {
	psPZQwsi(1);
}
var psPZQwop = false;
function psPZQwco() {
	var w1 = psPZQwci.width - 1;
	psPZQwscf((w1 & 2) != 0);
	var h = psPZQwci.height;

	if (h == 1) {
		psPZQwop = false;

	// manual invitation
	} else if ((h == 2) && (!psPZQwop)) {
		psPZQwop = true;
		psPZQwsi(1);

	// auto invitation
	} else if ((h == 3) && (!psPZQwop)) {
		psPZQwop = true;
		psPZQwsi(2);
	}
}
var psPZQwci = new Image();
psPZQwci.onload = psPZQwco;
var psPZQwpm = false;
var psPZQwcp = psPZQwpm ? 30 : 60;
var psPZQwct = null;
function psPZQwscf(p) {
	if (psPZQwpm != p) {
		psPZQwpm = p;
		psPZQwcp = psPZQwpm ? 30 : 60;
		if (psPZQwct != null) {
			clearTimeout(psPZQwct);
			psPZQwct = null;
		}
		psPZQwct = psPZQwst("psPZQwrc()", psPZQwcp);
	}
}
function psPZQwrc() {
	psPZQwct = psPZQwst("psPZQwrc()", psPZQwcp);
	try {
		psPZQwci.src = "http://image.providesupport.com/cmd/0pqg7rq2ifl170wn9rvxln5yus?" + "ps_t=" + psPZQwn() + "&ps_l=" + escape(document.location) + "&ps_r=" + escape(document.referrer) + "&ps_s=" + psPZQwsid + "" + "";
	} catch(e) {
	}
}
psPZQwrc();


