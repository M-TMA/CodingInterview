$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*
        $(document).on("click", "#btnUpdate", function () {
            //console.log("clicked");
            $("html, body").animate({
                scrollTop: 190
            }, 600);
            $("#tableSub1").addClass("addScroll", 3000, "easeOutBounce");
            return false;
        });

        $(document).on("click", "#btnYesSearchAge", function () {
            console.log("clicked");
            $("html, body").animate({
                scrollTop: 800
            }, 600);
            $("#tableResult").addClass("addBackground", 3000, "easeOutBounce");
            return false;
        });

        $(document).on("click", "#maleBtn", function () {
            console.log("clicked");
            $("html, body").animate({
                scrollTop: 800
            }, 600);
            $("#tableResult").addClass("addBackground", 3000, "easeOutBounce");
            return false;
        });

        $(document).on("click", "#femaleBtn", function () {
            console.log("clicked");
            $("html, body").animate({
                scrollTop: 800
            }, 600);
            $("#tableResult").addClass("addBackground", 3000, "easeOutBounce");
            return false;
        });
        */
});
