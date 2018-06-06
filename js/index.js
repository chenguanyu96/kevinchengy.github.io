(function(){
    "user strict";

    parseURL();

    setLayoutPref();

    window.onresize = function() {setLayoutPref()};

    $(".aboutme_btn").click(function() {
        enableItem(".aboutme_btn");
        enableSection("#about");
    });

    $(".projects_btn").click(function() {
        enableItem(".projects_btn");
        enableSection("#projects");
    });

    $(".popup").popup({ boundary: ".segment" });

    $(".toggle-sidebar").click(function(){$(".custom-sidebar").sidebar("toggle");});

    function enableItem(item) {
        $(".item").removeClass("active");
        $(".item").removeClass("custom-active");
        $(item).addClass("active");
    }

    function enableSection(id) {
        $("#about").removeClass("shown");
        $("#projects").removeClass("shown");
        $(id).addClass("shown");
        if ($(".custom-sidebar").hasClass("sidebar")) $(".custom-sidebar").sidebar("toggle");
    }

    function setLayoutPref() {
        var width = $(window).width();
        if (width <= 800) {
            $(".custom-sidebar").addClass("sidebar");
        } 
        else {
            $(".custom-sidebar").remove("sidebar");
        }
    }

    function parseURL() {
        var contents = window.location.href.split("?");
        if (contents.length == 2) {
            if (contents[1] === "about") window.location = contents[0];
            else if (contents[1] == "projects") {
                enableItem(".projects_btn");
                enableSection("#projects");
            }
            else if (contents[1] == "resume") {
                enableItem(".resume-item");
                enableSection("#resume");
            }
            else {
                var moreConts = contents[1].split("=");
                if (moreConts.length == 2 && moreConts[0] == "course") {
                    if(moreConts[1] === "csca08") {
                        if (!lockCourses && !lockA08) {
                            enableItem(".courses-item");
                            $(".csca08").addClass("custom-active");
                        }
                        else {
                            window.location = contents[0];
                        }
                    }
                    else if (moreConts[1] === "csca48") {
                        if (!lockCourses && !lockA48) {
                            enableItem(".courses-item");
                            $(".csca48").addClass("custom-active");
                        } else {
                            window.location = contents[0];
                        }
                    }
                }
                else {
                    window.location = contents[0] + "404.html";
                }
            }
        }
        else if (contents.length > 2) {
            window.location = contents[0]+"404.html";
        }
    }

}());