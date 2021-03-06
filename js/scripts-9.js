
$(document).ready(function() {
    var myScroll, menuDivEasing, hamburgerTimer, currWidth = getCurrWidth(),
        footerWidth = $('footer').width(),
        menuAreaLeftPos = {
            "pos" : getMenuLeftPos()
        },
        leftPos = {
            '#aboutApplerigg': [$('#aboutApplerigg').offset().left, 0],
            '#ourCompanies' : [$('#ourCompanies').offset().left, 0.25],
            '#ourBoard' : [$('#ourBoard').offset().left, 0.75],
            '#footer' : [  '', 1]
        },
        currThumb = 0,
        moveY = "",
        maxTestimHeight = 0,
        testimItempad = parseInt($('#testim-slider ul li').css('paddingRight')),
        testimItemWidth = $('#testim-slider').width()+testimItempad,
        testimSlideCount = $('#testim-slider ul li').length,
        testimSliderWidth = testimItemWidth * testimSlideCount,
        totalBodyWidth, leftLimit, totalBodyHeight,
        beingScrolled = false,
        tablet = (currWidth == 'xxl' || currWidth == 'lg' || currWidth == 'md') ? true : false, // test
        pageOffset = currWidth == 'md' ? 136 : 236,
        visibleRegion, compItemWidth, itemsPerPage, totalPages, companyPagePosArr, currCompPage = 1;

    /* initial setups */

    $('.company-pager').hide();
    if(tablet){
        totalBodyWidth = $('#aboutApplerigg').width()+ $('#ourCompanies').width()+
            $('.company-holder').width()+ $('#ourBoard').width(),
            leftLimit = totalBodyWidth - $(window).width(),
            totalBodyHeight = leftLimit + $(window).height();
        $('.body-section').addClass('fixed-pos-div').width(totalBodyWidth);
        $('.about-title').height($('.about-contents').height());

        visibleRegion = $(window).width() - pageOffset; // rough total area occupied
        compItemWidth = $($('.company-details-item')[0]).outerWidth();
        itemsPerPage = Math.floor(visibleRegion / compItemWidth);
        totalPages = Math.ceil($('.company-details-item').length / itemsPerPage);
        if(totalPages == 1) $('.comp-arrow-holder').addClass('inactive');
        $('.curr-comp-page').text(""+currCompPage);
        $('.total-comp-page').text(""+totalPages);
        companyPageLookupArray();
        $('#ourBoard .page-nav-bar').css('right', footerWidth);
        //console.log(companyPagePosArr[0]+'\n'+companyPagePosArr[1]+'\n'+companyPagePosArr[2]);
        //console.log("totalPages: "+totalPages);
        //console.log("itemsPerPage: "+itemsPerPage);
        //console.log("compItemWidth: "+compItemWidth);
    }
    // utility function for creating company sub section positions
    function companyPageLookupArray(){
        companyPagePosArr = []; // array needs to be created during resize
        for(var i = 0; i < totalPages; i++){
            companyPagePosArr.push( $('.company-holder').offset().left + (i * itemsPerPage * compItemWidth) - 50 );
        }
    }

    // fix for latest safari
    setTimeout(function(){
        if(tablet && ($('.about-title').height() != $('.about-contents').height()))
            $('.about-title').height($('.about-contents').height());
    }, 400);
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
    $('.about-title .slide-indicator-ul li a').click(function(e){
        e.preventDefault();
        $('.testimonails .slide-indicator-ul li').removeClass('is-active');
        $(this).parent().addClass('is-active');
        var that = this;
        $('#testim-slider  ul').animate({
            left: - $(that).data('pos')* testimItemWidth
        }, 600);
    });

    /* preloader */

    // preloader animations and horizontal scroll setup
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
            if(tablet) {
                addHorizontalScroll();
            }
            var temp = $('#scroller').width() - ($('#ourBoard').offset().left + $(window).width());
            leftPos['#footer'][0] = $('#ourBoard').offset().left + temp;
            /*console.log('#aboutApplerigg: '+leftPos['#aboutApplerigg'][0]+
                        '\n#ourCompanies: '+leftPos['#ourCompanies'][0]+
                        '\n#ourBoard: '+leftPos['#ourBoard'][0] +
                        '\n#footer: '+leftPos['#footer'][0]);*/

        }
    });

    /* manual scroll utility function */

    function addHorizontalScroll(){
        myScroll = new IScroll('#wrapper', {scrollX: true, scrollY: false, mouseWheel: true});
        myScroll.on('scrollStart', function(){ beingScrolled = true; });
        myScroll.on('scrollEnd', function(){
            $('.company-details-item')
                .find("img.color").addClass('display-none').end()
                .find("img.grey").removeClass('display-none');


            if (($('#ourCompanies').offset().left <= 0) &&
                ($('#ourCompanies').offset().left > -$('#ourCompanies').width() - $('.company-holder').width())) {
                $(".page-nav-arrow").removeClass("left").addClass("right").data("href", "#ourBoard");
                //console.log('in our companies pointing to ourBoard');
            }
            else if(($('#ourBoard').offset().left <= 0) &&
                ((Math.abs($('#scroller').offset().left - $(window).width() + $('#scroller').width())) > 2)) {
                $(".page-nav-arrow").removeClass("left").addClass("right").data("href", "#footer");
                console.log('in our board pointing to footer');
            }
            else if($('#aboutApplerigg').offset().left <= 0 &&
                ($('#aboutApplerigg').offset().left > -$('#aboutApplerigg').width())){
                $(".page-nav-arrow").removeClass("left").addClass("right").data("href", "#ourCompanies");
                //console.log('in aboutApplerigg pointing to ourCompanies');
            }
            else if(($('#ourBoard').width() <= $(window).width()) ||
                ($('#ourBoard').offset().left <= 0) &&
                ((Math.abs($('#scroller').offset().left - $(window).width() + $('#scroller').width())) <= 2)) {
                $(".page-nav-arrow").removeClass("right").addClass("left").data("href", "#aboutApplerigg");
                console.log('in footer pointing to aboutApplerigg');
            }

            if($('#ourBoard .page-nav-bar').offset().left <= ($(window).width() - 45)){
                $('body > .page-nav-bar').hide();
            }else{
                if($('body > .page-nav-bar').css('display') == 'none') $('body > .page-nav-bar').show();
            }

            if(($('#ourCompanies').offset().left < 100) &&
                //($('#ourBoard').offset().left > ($(window).width()/2))){
                ($('#ourBoard').offset().left > 200)){
                if($('.company-pager').css('display') == "none") $('.company-pager').fadeIn();
            }else{
                if($('.company-pager').css('display') != "none") $('.company-pager').fadeOut();
            }

            if(companyPagePosArr.length > 1){
                for(var q = 1; q < companyPagePosArr.length; q++){

                    if( (q == 1) && ($('#scroller').offset().left > -companyPagePosArr[q]) ) {
                        currCompPage = q;
                        $('.curr-comp-page').text(""+q);
                        $('.comp-arrow-holder.right').removeClass('inactive');
                        $('.comp-arrow-holder.left').addClass('inactive');
                        break;
                    }
                    if( (q == companyPagePosArr.length - 1) && ($('#scroller').offset().left < -companyPagePosArr[q])) {
                        currCompPage = q+1;
                        $('.curr-comp-page').text(""+(q+1));
                        $('.comp-arrow-holder.left').removeClass('inactive');
                        $('.comp-arrow-holder.right').addClass('inactive');
                        break;
                    }
                    if( $('#scroller').offset().left < -companyPagePosArr[q-1] &&
                        $('#scroller').offset().left > -companyPagePosArr[q]) {
                        currCompPage = q;
                        $('.curr-comp-page').text(""+q);
                        $('.comp-arrow-holder').removeClass('inactive');
                        break;
                    }

                }
            }

        });
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
                capture: false,
                passive: false
            } : false);
    }

    /* manage browser resize */

    // recalculate initial values
    $(window).on('resize', function(){
        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            currWidth = getCurrWidth();
            tablet = (currWidth == 'xxl' || currWidth == 'lg' || currWidth == 'md') ? true : false;
            if(!tablet){
                if(myScroll) myScroll.destroy();
                myScroll = null;
                $('.body-section').removeClass('fixed-pos-div').width('auto');
                $('.vertical-scroll-div').css({'display': 'none'});
                $('.body-section').animate({
                    scrollLeft: 0,
                    easing: "easein"
                }, 200, resizeHandler);
            }
            else{
                $('body').scrollTop(0);
                $('.body-section').animate({
                    left: 0,
                    easing: "easein"
                }, 200, function(){
                    totalBodyWidth = $('#aboutApplerigg').width()+ $('#ourCompanies').width()+
                        $('.company-holder').width()+ $('#ourBoard').width();
                    leftLimit = totalBodyWidth - $(window).width();
                    totalBodyHeight = leftLimit + $(window).height();

                    $('.body-section').addClass('fixed-pos-div').width(totalBodyWidth);
                    resizeHandler();
                });
            }
        }, 250));
    });
    // utility function to handle resizing
    function resizeHandler(){
        if(tablet){
            $('.about-title').height($('.about-contents').height());
            footerWidth = $('footer').width();
            $('#ourBoard .page-nav-bar').css('right', footerWidth);
            pageOffset = currWidth == 'md' ? 136 : 236
            visibleRegion = $(window).width() - pageOffset;
            compItemWidth = $($('.company-details-item')[0]).outerWidth();
            itemsPerPage = visibleRegion / compItemWidth;
            totalPages = Math.ceil($('.company-details-item').length / itemsPerPage);
            currCompPage = 1;
            $('.comp-arrow.left').addClass('inactive');
            if(totalPages == 1) $('.comp-arrow').addClass('inactive');
            $('.curr-comp-page').text(""+currCompPage);
            $('.total-comp-page').text(""+totalPages);
            companyPageLookupArray();
            addHorizontalScroll();
        }
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
        var temp = $('#scroller').width() - ($('#ourBoard').offset().left + $(window).width());
        leftPos = {
            '#aboutApplerigg': [$('#aboutApplerigg').offset().left, 0],
            '#ourCompanies' : [$('#ourCompanies').offset().left, 0.25],
            '#ourBoard' : [$('#ourBoard').offset().left, 0.75],
            '#footer' : [$('#ourBoard').offset().left + temp, 1]
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
    }
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

    /* menu swipe animation */

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
            if($('.img-gallery').hasClass('detail-view')) galleryCloseHandler();
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

    /* scroll to the intended section */

    // navigation via menu and grey fixed bar
    $('.section-slider a, .menu-holder a, .page-nav-arrow').click(function (e) {
        e.preventDefault();
        var id = $(this).attr("href") || $(this).data("href");
        switch (id){
            case "#aboutApplerigg":
                $(".page-nav-arrow").removeClass("left").addClass("right").data("href", "#ourCompanies");
                $("body > .page-nav-bar").show();
                break;
            case "#ourCompanies":
                $(".page-nav-arrow").data("href", "#ourBoard");
                break;
            case "#ourBoard":
                if($('#ourBoard').width() == $(window).width()){
                    $(".page-nav-arrow").removeClass("right").addClass("left").data("href", "#aboutApplerigg");
                }
                else{
                    $(".page-nav-arrow").data("href", "#footer");
                }
                $("body > .page-nav-bar").fadeOut('slow');
                break;
            default :
                $(".page-nav-arrow").removeClass("right").addClass("left").data("href", "#aboutApplerigg");
                break;
        }
        if((id != '#ourBoard') && $('.img-gallery').hasClass('detail-view')) galleryCloseHandler();
        if($(this).parents('.menu-holder').length) $('.hamburger').trigger('click');
        $('.section-slider li').removeClass('is-active');
        $('.'+id.substring(1)).addClass('is-active');
        if(tablet){
            myScroll.scrollTo(-leftPos[id][0], 0, 1000, IScroll.utils.ease.quadratic);
        }
        else {
            $('body').animate({
                scrollTop: $(id).offset().top,
                easing: "easein"
            }, 1000);
        }
    });
    // navigation within the company section
    $('.comp-arrow-holder').click(function (e) {
        if(!$(this).hasClass('inactive')){
            if($(this).hasClass('right')){
                if((currCompPage + 1) == totalPages) $(this).addClass('inactive');
                $('.comp-arrow-holder.left').removeClass('inactive');
                currCompPage += 1;
            }
            else{
                if((currCompPage - 1) == 1) $(this).addClass('inactive');
                $('.comp-arrow-holder.right').removeClass('inactive');
                currCompPage -= 1;
            }
            $('.curr-comp-page').text(""+currCompPage);
            myScroll.scrollTo(-companyPagePosArr[currCompPage-1], 0, 1000, IScroll.utils.ease.quadratic);
        }
    });


    /* gallery animations and resets */

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
                animateText(boardMem);
                $('.img-gallery').addClass('detail-view').children('.close-gal')
                    .one('click', galleryCloseHandler);
            }
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
    $('.board-section .gallery:first-child h2').click(galleryCloseHandler);
    // utility function to close detail view
    function galleryCloseHandler(){
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
            $('.img-gallery').removeClass('detail-view');
        });
    }

});