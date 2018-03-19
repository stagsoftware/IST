
$(document).ready(function () {

    $(".jottings-up").click(function () {
        $(".jottings-dropup .dropdown-menu").slideDown("slow");
    });

    $(".jottings-dropdown-header").click(function () {
        $(".jottings-dropup .dropdown-menu").slideUp("slow");
    });

    $(".notes-up").click(function () {
        $(".notes-dropup .dropdown-menu").slideDown("slow");
    });

    $(".notes-dropdown-header").click(function () {
        $(".notes-dropup .dropdown-menu").slideUp("slow");
    });

    $(".questions-up").click(function () {
        $(".questions-dropup .dropdown-menu").slideDown("slow");
    });

    $(".questions-dropdown-header").click(function () {
        $(".questions-dropup .dropdown-menu").slideUp("slow");
    });
});
