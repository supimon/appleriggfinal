$(document).ready(function() {
    var menuDivEasing, hamburgerTimer, currWidth = getCurrWidth(),
        menuAreaLeftPos = {
            "pos" : getMenuLeftPos()
        },
        leftPos = {
            '#aboutApplerigg': $('#aboutApplerigg').offset().left,
            '#ourCompanies' : $('#ourCompanies').offset().left,
            '#ourBoard' : $('#ourBoard').offset().left
        },
        currThumb = 0,
        moveY = "",
        maxTestimHeight = 0,
        testimItempad = parseInt($('#testim-slider ul li').css('paddingRight')),
        testimItemWidth = $('#testim-slider').width()+testimItempad,
        testimSlideCount = $('#testim-slider ul li').length,
        testimSliderWidth = testimItemWidth * testimSlideCount;
    /* initial setups */
    if(currWidth == 'xxl' || currWidth == 'lg' || currWidth == 'md')
        $('.about-title').height($('.about-contents').height());

    // testimonial slider
    $('#testim-slider ul li').each(function(i) {
        var $liItem = i == 0 ?
            '<li class="is-active"><a href="#testim'+i+'" data-pos="'+i+'"></a></li>':
            '<li><a href="#testim'+i+'" data-pos="'+i+'"></a></li>';
        $(this).width(testimItemWidth - testimItempad).attr("id", "testim"+i);
        maxTestimHeight = maxTestimHeight > $(this).height() ? maxTestimHeight : $(this).height();
        $('.testimonails .slide-indicator-ul').append($liItem);
    });
    $('#testim-slider ul li').each(function() { $(this).height(maxTestimHeight); });
    $('#testim-slider').css({ height: maxTestimHeight });
    $('#testim-slider  ul').css({ width: testimSliderWidth});
    // $('#testim-slider  ul li:last-child').prependTo('#testim-slider ul');
    $('.about-title .slide-indicator-ul li a').click(function(e){
        e.preventDefault();
        $('.testimonails .slide-indicator-ul li').removeClass('is-active');
        $(this).parent().addClass('is-active');
        var that = this;
        $('#testim-slider  ul').animate({
            left: - $(that).data('pos')* testimItemWidth
        }, 600);
    });

    // preloader animations
    $('.menu-area .cool-line').addClass('expand-line').on('animationend', function(){
        $('body').removeClass('green').removeClass('pointer-events-none');
    });
    menuDivEasing = anime({
        targets: '.menu-area',
        translateX: [0, menuAreaLeftPos.pos],
        delay: 2000,
        easing: 'easeInOutQuart',
        complete: function(){

            $('.menu-area').removeClass('initial-pos');
            $('.menu-area .cool-line').removeClass('expand-line');
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

    /* manage browser resize */

    // recalculate initial values
    $(window).on('resize', function(){
        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            $('.body-section').animate({
                scrollLeft: 0,
                easing: "easein"
            }, 200, function(){
                currWidth = getCurrWidth();
                if(currWidth == 'xxl' || currWidth == 'lg' || currWidth == 'md')
                    $('.about-title').height($('.about-contents').height());
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

                $('#testim-slider, #testim-slider ul li').each(function(){ $(this).height('auto'); });
                testimItemWidth = $('#testim-slider').width()+testimItempad;
                testimSliderWidth = testimItemWidth * testimSlideCount;
                $('#testim-slider ul li').each(function(i) {
                    $(this).width(testimItemWidth - testimItempad);
                    maxTestimHeight = maxTestimHeight > $(this).height() ? maxTestimHeight : $(this).height();
                });
                $('#testim-slider ul li').each(function() { $(this).height(maxTestimHeight); });
                $('#testim-slider').css({ height: maxTestimHeight });
                $('#testim-slider  ul').css({ width: testimSliderWidth});
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
    $('.company-details-item')
        .on('mouseover', function(){
        $(this).children(".detailed").removeClass('dip-company').addClass('lift-company').end()
            .children(".cool-line").removeClass("raise-line").addClass("sink-line").end()
            .find("img.grey").addClass('display-none').end()
            .find("img.color").removeClass('display-none');
    })
        .on('mouseout', function(){
        $(this).children(".detailed").removeClass('lift-company').addClass('dip-company').end()
            .children(".cool-line").removeClass("sink-line").addClass("raise-line").end()
            .find("img.color").addClass('display-none').end()
            .find("img.grey").removeClass('display-none');
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

    /* gallery animations and resets */

    // prepare clones for gallery
    $('img.original').each(function(k){
        var that = this;
        k == ($('img.original').length - 1) ?
            $(this).clone().appendTo($('.thumb-slider-holder'))
                .removeClass('original')
                .addClass('thumb-item')
                .css({
                    'margin': '0px 0px 0px 0px',
                    'width': $(that).width(),
                    'height': 120.75/*$(that).height()*/
                }):
            $(this).clone().appendTo($('.thumb-slider-holder'))
                .removeClass('original')
                .addClass('thumb-item')
                .css({
                    'margin': '0px 0px 12px 0px',
                    'width': $(that).width(),
                    'height': 120.75/*$(that).height()*/
                });
    });
    // go into gallery detail view
    $('.img-gallery > .relative-div > .original').click(function(){
        // set the width and height of gallery for animation
        $('.img-gallery > .relative-div')
            .width($('.img-gallery > .relative-div').width())
            .height($('.img-gallery > .relative-div').height());
        var that = this,
            $tempItem = $(this).clone(),
            boardMem = $(this).data('name'),
            leftPos = $(this).position().left, // for holding the selected image
            topPos = $(this).position().top,
            offLeftPos = $('.img-gallery').offset().left - $(this).offset().left, // for moving the selected image
            offTopPos = $('.img-gallery').offset().top - $(this).offset().top;
        $('.img-reel').css('display', 'block'); // if not hidden before clicks on image thumbnails arent possible
        // clone into position
        $tempItem
            .css({
                'left': leftPos+'px',
                'top': topPos+'px'
            })
            .removeClass('original')
            .addClass('duplicate')
            .appendTo(".img-gallery > .relative-div");
        $('.img-gallery > .relative-div').css({'overflow-y': 'hidden'}); // remove the thumbnail scrolls if any
        // animate the gallery
        $('.img-gallery .original').fadeOut('slow');
        var detailedViewAnim = anime({
            targets: '.img-gallery .duplicate',
            translateX: {
                value: '+='+offLeftPos,
                duration: 700,
                delay: 1000
            },
            translateY: {
                value: '+='+offTopPos,
                duration: 700,
                delay: 1000
            },
            width: {
                value: '*=2.12',
                delay: 1200,
                duration: 600
            },
            height: {
                value: '*=2.12',
                delay: 1200,
                duration: 600
            },
            easing: 'easeInOutQuart',
            complete: function(){
                $tempItem.appendTo(".img-reel > .relative-div");
                var easing = anime({
                    targets: '.img-gallery .thumb-slider',
                    translateY: ['100%', '0%'],
                    duration: 800,
                    easing: 'easeInOutQuart',
                    complete: function(){
                        $('.slider-arrow-bottom, .slider-arrow-top').fadeIn('slow');
                        animateText(boardMem);
                    }
                });
            }
        });
    });
    // gallery thumb animations
    $('.img-reel .thumb-item').click(function(){
        var that = this,
            boardMem = $(this).data('name'),
            $tempItem = $(this).clone(),
            leftPos = $(this).position().left, // for holding the selected image
            topPos = $(this).position().top,
            offLeftPos = $('.img-gallery').offset().left - $(this).offset().left, // for moving the selected image
            offTopPos = $('.img-gallery').offset().top - $(this).offset().top;
        // clone into position
        $tempItem
            .css({
                'position': 'absolute',
                'left': -(offLeftPos)+'px',
                'top': -(offTopPos)+'px'
            })
            .addClass('thumb-item-expanded')
            .removeClass('thumb-item')
            .appendTo('.img-reel .relative-div');
        // animate the gallery
        $('.img-gallery .duplicate').fadeOut('fast', function(){
            var easing = anime({
                targets: '.img-gallery .thumb-item-expanded',
                translateX: {
                    value: '+='+offLeftPos,
                    duration: 700
                },
                translateY: {
                    value: '+='+offTopPos,
                    duration: 700
                },
                width: {
                    value: '*=2.12',
                    delay: 200,
                    duration: 600
                },
                height: {
                    value: '*=2.12',
                    delay: 200,
                    duration: 600
                },
                easing: 'easeInOutQuart',
                complete: function(){
                    $('.img-gallery .duplicate').remove();
                    $tempItem.addClass('duplicate');
                    animateText(boardMem);
                }
            });
        });
    });
    // animate gallery text
    function animateText(boardMem){
        var titlePos = $('.gallery.'+boardMem+' .title-position').clone().css({'display' : 'block'}),
            personIntro = $('.details.'+boardMem+' .person-intro').clone().css({'display' : 'block'});
        $('.gallery.hidden-mobile .title-position, .details.hidden-mobile .person-intro').fadeOut('slow', function() {
            $('.gallery.hidden-mobile .title-position').remove();
            $('.details.hidden-mobile .person-intro').remove();
            $('.gallery.hidden-mobile h2').after(titlePos);
            $('.details.hidden-mobile').append(personIntro);
            $('.gallery.hidden-mobile .title-position, .details.hidden-mobile .person-intro')
                .addClass('animated fadeInUpSmall');
        });
    }
    // go back to gallery tile view
    $('.board-section .gallery:first-child h2').click(function(){
        currThumb = 0;
        $('.thumb-slider-holder').css('transform', 'none');
        var easing = anime({
            targets: '.img-gallery .thumb-slider',
            translateY: ['0%', '100%'],
            duration: 800,
            easing: 'easeInOutQuart'
        });
        $('.slider-arrow-bottom, .slider-arrow-top').fadeOut('slow');
        $('.img-gallery .duplicate').fadeOut('slow', function(){
            var that = this;
            $('.img-gallery .original').fadeIn('slow', function(){
                $('.img-gallery > .relative-div').css({'overflow-y': 'auto'});
                $(that).remove();
                $('.img-reel').css('display', 'none');
            });
        })
        $('.gallery.hidden-mobile .title-position, .details.hidden-mobile .person-intro').fadeOut('slow', function() {
            $('.gallery.hidden-mobile .title-position, .details.hidden-mobile .person-intro')
                .removeClass('animated fadeinUpSmall')
                .empty();
        });
    });
    // slider move actions
    $('.slider-arrow-bottom, .slider-arrow-top').one('click', function(){
        moveY = $($('.thumb-item')[currThumb+1]).offset().top - $('.img-gallery').offset().top;
        moveThumb(this);
    })
    /*utility function to move thumb*/
    function moveThumb(that){
        var tempPos = '';
        if($(that).hasClass('slider-arrow-bottom')){
            if(currThumb == ($('.thumb-item').length - 2)) {
                $('.slider-arrow-bottom, .slider-arrow-top').unbind();
                $('.slider-arrow-bottom, .slider-arrow-top').one('click', function(){
                    moveThumb(this);
                });
               return;
            }
            tempPos = '-='+moveY;

            currThumb++;
        }
        else if($(that).hasClass('slider-arrow-top')){
            if(currThumb == 0){
                $('.slider-arrow-bottom, .slider-arrow-top').unbind();
                $('.slider-arrow-bottom, .slider-arrow-top').one('click', function(){
                    moveThumb(this);
                });
                return;
            }
            tempPos = '+='+moveY;

            currThumb--;
        }
        var easing = anime({
            targets: '.thumb-slider-holder',
            translateY: tempPos,
            duration: 800,
            easing: 'easeInOutQuart',
            complete: function(){
                $('.slider-arrow-bottom, .slider-arrow-top').unbind();
                $('.slider-arrow-bottom, .slider-arrow-top').one('click', function(){
                    moveThumb(this);
                });
            }
        });
    }

});