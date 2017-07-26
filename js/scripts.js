(function() {
    var menuDivEasing, hamburgerTimer, currWidth = getCurrWidth(),
        menuAreaLeftPos = {
            "pos" : getMenuLeftPos()
        },
        leftPos = {
            '#aboutApplerigg': $('#aboutApplerigg').offset().left,
            '#ourCompanies' : $('#ourCompanies').offset().left,
            '#ourBoard' : $('#ourBoard').offset().left
        };
    // preloader animations
    $('.menu-area .cool-line').addClass('collapse-line');
    menuDivEasing = anime({
        targets: '.menu-area',
        translateX: [0, menuAreaLeftPos.pos],
        delay: 2000,
        easing: 'easeInOutQuart',
        complete: function(){
            $('.menu-area').removeClass('initial-pos');
            $('.menu-area .cool-line').removeClass('collapse-line');
        }
    });
    // menu swipe animation
    $('.hamburger').on('click', function(){
        if($('.hamburger').hasClass('open')){
            clearInterval(hamburgerTimer);
            menuDivEasing = anime({
                targets: '.menu-area',
                translateX: [0, menuAreaLeftPos.pos],
                easing: 'easeInOutQuart',
                complete: function(){
                    $('.hamburger').removeClass('open');
                    $('.menu-area .cool-line').removeClass('collapse-line');
                }
            });
        }
        else{
            menuDivEasing = anime({
                targets: '.menu-area',
                translateX: [menuAreaLeftPos.pos, 0],
                easing: 'easeInOutQuart',
                complete: function(){
                    $('.menu-area .cool-line').addClass('collapse-line');
                    $('.hamburger').addClass('open');
                    hamburgerTimer = setInterval(function () {
                        var arrowTimeline = anime.timeline();
                        arrowTimeline
                            .add({
                                targets: '.hamburger.open .hamburger-inner',
                                translateX: '-=20',
                                duration: 800,
                                easing: 'easeOutQuad'
                            })
                            .add({
                                targets: '.hamburger.open .hamburger-inner',
                                translateX: '+=20',
                                duration: 500
                            });
                    }, 5000);
                }
            });
        }
    });
    // recalculate initial values
    $(window).on('resize', function(){
        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            $('.body-section').animate({
                scrollLeft: 0,
                easing: "easein"
            }, 200, function(){
                currWidth = getCurrWidth();
                menuAreaLeftPos = {
                    "pos" : getMenuLeftPos()
                };
                clearInterval(hamburgerTimer);
                menuDivEasing = anime({
                    targets: '.menu-area',
                    translateX: [$('.menu-area').position().left, menuAreaLeftPos.pos],
                    easing: 'easeInOutQuart',
                    complete: function(){
                        $('.hamburger').removeClass('open');
                        $('.cool-line').removeClass('collapse-line');
                    }
                });
                leftPos = {
                    '#aboutApplerigg': $('#aboutApplerigg').offset().left,
                    '#ourCompanies' : $('#ourCompanies').offset().left,
                    '#ourBoard' : $('#ourBoard').offset().left
                };
            });
        }, 250));
    });
    // utility function to determine device
    function getCurrWidth(){
        switch ($('.width-calc').width()){
            case 1570:
                return 'xxl';
            case 1170:
                return 'lg';
            case 960:
                return 'md';
            case 730:
                return 'sm';
            case 550:
                return 'xs';
            default:
                return 'xxs';
        }
    }
    // utility to get menu left position
    function getMenuLeftPos(){
        switch(currWidth){
            case "xxl":
            case "lg":
            case "md":
            case "sm":
                return 50 - $(window).width();
            default:
                return 30 - $(window).width();
        }
    }
    // company lift animation
    $('.company-details-item').on('mouseover', function(){
        $(this).children(".detailed").removeClass('dip-company').addClass('lift-company').end()
            .children(".cool-line").removeClass("raise-line").addClass("sink-line");
    }).on('mouseout', function(){
        $(this).children(".detailed").removeClass('lift-company').addClass('dip-company').end()
            .children(".cool-line").removeClass("sink-line").addClass("raise-line");
    });
    // scroll to the intended section
    $('.section-slider a, .menu-holder a').click(function (e) {
        e.preventDefault();
        var id = $(this).attr("href");
        if($(this).parents('.menu-holder').length) $('.hamburger').trigger('click');
        $('.section-slider li').removeClass('is-active');
        $('.'+id.substring(1)).addClass('is-active');
        $('.body-section').animate({
            scrollLeft: leftPos[id],
            easing: "easein"
        }, 1000);
    });
    // highlight slider dots based on scroll position
    $('.body-section').scroll(function() {
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function() {
            if (($('#ourCompanies').offset().left < ($(window).width()/2)) &&
               ($('#ourCompanies').offset().left >= -($(window).width()/2)) &&
                !$('.ourCompanies').hasClass('is-active')) {
                    $('.section-slider li').removeClass('is-active');
                    $('.ourCompanies').addClass('is-active');
            }
            else if(($('#ourBoard').offset().left < ($(window).width()/2)) &&
                !$('.ourBoard').hasClass('is-active')){
                $('.section-slider li').removeClass('is-active');
                $('.ourBoard').addClass('is-active');
            }else if(($('#ourCompanies').offset().left >= ($(window).width()/2)) &&
                !$('.aboutApplerigg').hasClass('is-active')){
                $('.section-slider li').removeClass('is-active');
                $('.aboutApplerigg').addClass('is-active');
            }
        }, 250));
    });

    $()

    // image gallery experiments
    /*$('.img-gallery .img-reel').css({
        'max-height': 'calc('+$('.img-gallery').height()+'px - '+$($('.img-gallery .item')[0]).css('margin-bottom')+')',
        'width' : $($('.img-gallery .item')[0]).width()+'px',
        'left': $($('.img-gallery .item')[2]).position().left+'px'
    });
    $('.img-gallery .item').each(function(i){
        $(this).click(function(){
            $(this).css({
                'transform': 'translateX(-'+$(this).position().left+'px) scale(2.12, 2.12)',
                'transform-origin': i <= 2 ? 'top left' : 'bottom left'
            })
        });
    });*/
})();