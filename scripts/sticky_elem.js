window.addEventListener('scroll', function() {
    var footer = document.querySelector('footer');
    var stickyContainer = document.querySelector('.sticky-container');
    var stickyImage = document.getElementById('sticky-image');
    var distanceToFooter = footer.getBoundingClientRect().top - stickyContainer.getBoundingClientRect().bottom;

    if (distanceToFooter < 0) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = (distanceToFooter + stickyContainer.getBoundingClientRect().height) + 'px';
    } else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = '0';
    }
});
