(function (win, undefined) {
    "use strict";

    const l = win.location,
        doc = win.document,
        base_path = l.hostname === 'localhost' ? '/projects/ema4rl.github.io/assets/' : '/assets/';

    $O.setDefaults({
        basePath: base_path + 'js/'
    });

    // load CSS.load to handle rel=preload hack and CSS loading
    $O.js('CSS.load.min.js');
    $O.js('vendor/jquery.js').wait(function () {
        (function ($) {
            $O.js('vendor/bootstrap.min.js').wait(function () {
                // init tooltip
                $('[data-toggle="tooltip"]').tooltip();
            }); // load bootstrap js without delay

            const spNav = '.navbar-default #navbar-full';

            var $window = $(win),
                $dropdown = $('.dropdown'),
                $header = $("#header"),
                lastScroll = 0,
                $mainUrls = $('a:not([href="#"]):not([target]):not([download])'),
                $header_fixed = $("#header-body-fixed"),
                full_screen_block = function () {
                    $(".full-screen-block").css({
                        'width': $window.width(),
                        'height': ($window.height() > 400) ? $window.height() : 400
                    });
                },
                fixed_header = function () {
                    var st = $window.scrollTop();
                    if (st > lastScroll) {
                        if (st > 50) {
                            $header.addClass("header-top-fixed");
                            $header_fixed.addClass("header-body-fixed");
                            $("#totop").css("display", "block");
                        }
                    }
                    else {
                        if (st < 50) {
                            $header.removeClass("header-top-fixed");
                            $header_fixed.removeClass("header-body-fixed");
                            $("#totop").css("display", "none");
                        }
                    }
                    lastScroll = st;
                };

            // Full screen divs
            full_screen_block();
            $window.on('resize', full_screen_block);

            // Hide navbar on click (Mobile)
            $(".navbar-collapse ul li a").on("click", function () {
                $(".navbar-collapse").removeClass("in");
            });

            // menu hover open
            $dropdown.on("mouseenter", function () {
                $(this).addClass('open');
            });
            $dropdown.on("mouseleave", function () {
                $(this).removeClass('open');
            });

            // fixed Header
            fixed_header();
            $window.on('scroll', fixed_header);

            // smooth scroll
            $('[data-smooth-scroll]').on("click", function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: parseInt($($(this).data('smooth-scroll')).offset().top)
                }, '1200');
            });

            // data-src controller
            $('img[data-src]').each(function () {
                var $this = $(this);
                $this.attr('src', $this.data('src'));
            });

            // Make sure all external URLs are pointed to a separate named tab
            $mainUrls.filter(function() {
                return this.hostname && this.hostname !== l.hostname;
            }).prop('target', 'ema4rl_git');

            // ensure document is ready...
            $O.ready(function () {
                // remove pre-loader
                $("#status").fadeOut();
                $("#preloader").delay(450).fadeOut();

                // singlePageNav init
                $O.test(spNav).js('vendor/jquery.singlePageNav.min.js')
                    .wait(function(){
                        $(spNav).singlePageNav({
                            currentClass: 'current',
                            updateHash: true,
                            speed: 750,
                            offset: 0,
                            threshold: 120,
                            filter: ':not(.external)',
                            easing: 'swing'
                        });
                    });
            });

            // init after window has loaded
            $window.on('load', function () {
                // run in production only!
                if (l.hostname !== 'localhost') {
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(win,doc,'script','https://www.google-analytics.com/analytics.js','ga');

                    ga('create', 'UA-49045270-6', 'auto');
                    ga('send', 'pageview');
                }
            });
        })(jQuery);
    });
})(window);
