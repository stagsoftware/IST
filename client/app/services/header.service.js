
var ist = angular.module('ist');
ist.service('HeaderService', function ($timeout, $interval) {

    var timer = {
        sessionTime: "0:00"
    };

    function countdown(minutes) {
        var seconds = 60;
        var mins = minutes;
        function tick() {
            var currMinutes = mins - 1;
            seconds--;
            if (seconds > 0) {
                timer.sessionTime = currMinutes + ":" + seconds;
                $timeout(tick, 1000);
            } else {
                if (mins > 1) {
                    $timeout(function () { countdown(mins - 1); }, 1000);
                }
            }
        }
        tick();
    }

    function startTimer() {
        var sessionTimer = document.getElementById("sessionTimer");
        sessionTimer.classList.add("active");
        function hourGlass() {
            sessionTimer.classList.add("fa-hourglass-start");
            sessionTimer.classList.remove("fa-hourglass-half", "fa-hourglass-end");
            $timeout(function () {
                sessionTimer.classList.remove("fa-hourglass-start", "fa-hourglass-end");
                sessionTimer.classList.add("fa-hourglass-half");
            }, 1000);
            $timeout(function () {
                sessionTimer.classList.remove("fa-hourglass-start", "fa-hourglass-half");
                sessionTimer.classList.add("fa-hourglass-end");
            }, 2000);
        }
        hourGlass();
        $interval(hourGlass, 3000);
    }

    function startCountDown(minutes) {
        countdown(minutes);
        --minutes;
    }

    function wireUpEventHandlers() {
        $(document).ready(function () {

            $('#sessionTitle').on('click', function (event) {
                $('.session-menu').toggleClass('show');
                $('.project-menu').removeClass('show');
            });

            $('#projectTitle').on('click', function (event) {
                $('.project-menu').toggleClass('show');
                $('.session-menu').removeClass('show');
            });

            $('#hamburgerCheckBox').change(function () {
                if ($('#hamburgerCheckBox').is(":checked")) {
                    $('#myModal').modal('show');
                } else {
                    $('#myModal').modal('hide');
                }
            });

            $('#myModal').on('hidden.bs.modal', function () {
                $('#hamburgerCheckBox').prop('checked', false).change();
                $('.session-menu').removeClass('show');
                $('.project-menu').removeClass('show');
            });

            $(".jottings-dropup-header").click(function () {
                $(".jottings-dropup .dropdown-menu").slideDown("slow");
            });

            $(".jottings-dropdown-header").click(function () {
                $(".jottings-dropup .dropdown-menu").slideUp("slow");
            });

            $(".notes-dropup-header").click(function () {
                $(".notes-dropup .dropdown-menu").slideDown("slow");
            });

            $(".notes-dropdown-header").click(function () {
                $(".notes-dropup .dropdown-menu").slideUp("slow");
            });

            $(".questions-dropup-header").click(function () {
                $(".questions-dropup .dropdown-menu").slideDown("slow");
            });

            $(".questions-dropdown-header").click(function () {
                $(".questions-dropup .dropdown-menu").slideUp("slow");
            });

        });
    }

    return {
        timer: timer,
        startTimer: startTimer,
        startCountDown: startCountDown,
        wireUpEventHandlers: wireUpEventHandlers
    }
});
