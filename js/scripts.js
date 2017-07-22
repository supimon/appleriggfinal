var easing = anime({
    targets: '.menu-div',
    translateX: [$('.menu-div').position().left, 0],
    easing: 'easeInOutQuart',
    delay: 2000
});
