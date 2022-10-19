let wHeight = $(window).height();
let wWidth = $(window).width();
let player = {};

let canvas = document.querySelector("#the-canvas");
let context = canvas.getContext("2d");
canvas.height = wHeight;
canvas.width = wWidth;

$(window).load(() => {
  $("#loginModal").modal("show");
});

$(".name-form").submit((e) => {
  e.preventDefault();
  player["name"] = $("#name-input").val();
  console.log(player);
  $("#loginModal").modal("hide");
  $("#spawnModal").modal("show");
  $(".player-name").html(player.name);
});

$(".start-game").click((e) => {
  $(".modal").modal("hide");
  $(".hiddenOnStart").removeAttr("hidden");
  init();
});
