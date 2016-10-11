"use strict";

var $ = {};


$.width = window.innerWidth;
$.height = window.innerHeight;

$.colors = {
	black: 'rgb(100, 100, 100)',
	white: 'rgb(255, 255, 255)',
	red: 'rgb(255, 0, 0)'
};

$.entities = [];

$.init = function () {
	$.canvas = document.getElementById('main');
	$.canvas.width = $.width;
	$.canvas.height = $.height;
	$.ctx = $.canvas.getContext('2d');

	$.ctx.fillStyle = "#36bdfc";
	$.ctx.fillRect(0, 0, $.width, $.height);
	$.entities.push(new GameOfLife($.ctx, 0, 0, $.width, $.height, { back: "#5fcafc", fore: "#73defc" }));

	$.loop();
};

$.loop = function () {
	window.requestAnimationFrame($.loop);

	for (var i = 0; i < $.entities.length; i++) {
		$.entities[i].update();
	}
};

window.addEventListener('load', $.init, false);
//window.addEventListener('click', $.loop, false);
