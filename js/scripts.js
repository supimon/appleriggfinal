(function() {
    var menuDivEasing, hamburgerTimer, currWidth = getCurrWidth(),
        menuAreaLeftPos = $('.menu-area').position().left;
    // menu swipe animation
    $('.hamburger').on('click', function(){
        if($('.hamburger').hasClass('open')){
            clearInterval(hamburgerTimer);
            menuDivEasing = anime({
                targets: '.menu-area',
                translateX: [0, menuAreaLeftPos],
                easing: 'easeInOutQuart',
                complete: function(){
                    $('.hamburger').removeClass('open');
                    $('.cool-line').removeClass('collapse-line');
                }
            });
        }
        else{
            menuDivEasing = anime({
                targets: '.menu-area',
                translateX: [menuAreaLeftPos, 0],
                easing: 'easeInOutQuart',
                complete: function(){
                    $('.cool-line').addClass('collapse-line');
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
        currWidth = getCurrWidth();
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

    $('.img-gallery .img-reel').css({
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
    });
    // company lift animation
    $('.company-details-item').on('mouseover', function(){
        $(this).children(".detailed").removeClass('dip-company').addClass('lift-company').end()
            .children(".cool-line").removeClass("raise-line").addClass("sink-line");
    }).on('mouseout', function(){
        $(this).children(".detailed").removeClass('lift-company').addClass('dip-company').end()
            .children(".cool-line").removeClass("sink-line").addClass("raise-line");;
    });

        /*$(this).css({
            'transform': 'translateX(-'+$(this).position().left+'px) scale(2.12, 2.12)',
            'transform-origin': '0px 0px'
        });*/
})();