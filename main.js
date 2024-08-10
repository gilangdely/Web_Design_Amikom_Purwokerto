window.addEventListener("DOMContentLoaded", cekLebarlayar);
window.addEventListener("resize", cekLebarlayar);

// digunakan agar di setiap breakpoint menggunakan function javascript yg berbeda
function cekLebarlayar() {
    if (window.matchMedia("(min-width: 320px) and (max-width: 833.98px)").matches) {
        // ## == handphone == ##
        // list functionnya
        openNavbar();
        cardClicked();
        btnCTA();
        smoothMenu();
    } else if (window.matchMedia("(min-width: 834px) and (max-width: 1590.99px)").matches) {
        // ## == large handphone dan tablet == ##
        // list functionnya
        openNavbar();
        cardClicked();
        btnCTA();
        smoothMenu();
    } else if (window.matchMedia("(min-width: 1600px)").matches) {
        // ## == tablet dan mini dekstop == ##
        // list functionnya
        openNavbar();
        cardHover();
        btnCTA();
        smoothMenu();
    }

}

function openNavbar() {
    // ambil dulu elementnya
    var toggleButton = document.querySelector('.toggle');
    var toggleOff = document.querySelector('.toggle-off');
    var menuBar = document.querySelector('.menu');

    // berikan event listener untuk toggleButton
    toggleButton.addEventListener('click', () => {
        if (menuBar.classList.contains('dis-none')) {
            menuBar.classList.remove('dis-none');
            menuBar.classList.add('dis-block');
        } else {
            menuBar.classList.remove('dis-block');
            menuBar.classList.add('dis-none');
        }
    });

    toggleOff.addEventListener('click', () => {
        if (menuBar.classList.contains('dis-none')) {
            menuBar.classList.remove('dis-none');
            menuBar.classList.add('dis-block');
        } else {
            menuBar.classList.remove('dis-block');
            menuBar.classList.add('dis-none');
        }
    });


}

function cardHover() {
    // ambil semua element yang punya class .card
    var cardElement = document.querySelectorAll('.cards');

    // loop elementnya
    cardElement.forEach((card) => {
        // ambil data-target elementnya
        const idTarget = card.dataset.target;

        // berikan event listener untuk setiap element
        card.addEventListener('mouseover', () => {

            // ambil element card-view dari masing" targetnya
            let cardView = document.querySelector('#' + idTarget);
            cardView.style.display = "flex";
            cardView.style.animation = "zoomin 1s ease-out";

        });
        card.addEventListener('mouseout', () => {

            // ambil element card-view dari masing" targetnya
            let cardView = document.querySelector('#' + idTarget);
            cardView.style.display = "none";
            cardView.style.animation = "zoomout 1s ease-out";

        });
    });
}

function cardClicked() {
    // ambil semua element yang punya class .card
    var cardElement = document.querySelectorAll('.cards');

    // loop elementnya
    cardElement.forEach((card) => {
        // ambil data-target elementnya
        const idTarget = card.dataset.target;

        // berikan event listener untuk setiap element
        card.addEventListener('click', () => {
            // ambil element card-view dari masing" targetnya
            let cardView = document.querySelector('#' + idTarget);
            let idSubtitle = idTarget.substring(5);
            let cardSubtitle = document.querySelector('.card-subtitle-' + idSubtitle);

            closeOtherCard();

            cardView.style.display = "flex";
            cardView.style.animation = "zoomin 1s ease-out";
            cardView.setAttribute('data-active', 'true');
            cardSubtitle.style.display = "none";



        });
    });
}

function closeOtherCard() {
    var getCardView = document.querySelectorAll('.card-view');

    getCardView.forEach((card) => {
        let dataActive = card.dataset.active;

        if (dataActive == "true") {
            card.style.display = "none";
            var getIdCard = card.id;
            var getSubtitle = document.querySelector('.card-subtitle-' + getIdCard.substring(5));
            getSubtitle.style.display = "block";
            getSubtitle.style.display = "transtion 2s ease-out";
        }

    });
}

function btnCTA() {
    // membuat animasi smooth scroll untuk button cta
    const btnCta = document.querySelectorAll('.btn-cta');

    btnCta.forEach((btn) => {
        btn.addEventListener('click', function (event) {
            // ambil dulu id targetnya
            let targetElement = document.querySelector(this.getAttribute('href'));

            if (targetElement) {
                event.preventDefault();
                scrolling(targetElement, 1000); //jalankan animasi smoothScrollnya dengan waktu 1 detik
            }
        });
    });

    // end animasi smooth scroll untuk button cta
}

function smoothMenu() {
    // membuat animasi smooth scroll untuk menu
    const menuBar = document.querySelectorAll('nav ul li a');
    const menu = document.querySelector('.menu');

    menuBar.forEach((link) => {
        link.addEventListener('click', function (event) {
            var targetElement = document.querySelector(this.getAttribute('href'));
            menu.classList.remove('dis-block');
            menu.classList.add('dis-none');

            if (targetElement) {
                event.preventDefault();
                scrolling(targetElement, 1000);
            }
        });
    });
    // end smooth scroll untuk menu

}

function scrolling(target, duration) {
    // function untuk smooth scrolling
    var targetPosition = target.getBoundingClientRect().top - 74;
    var startPosition = window.pageYOffset;
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var scrollY = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, scrollY);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
    // end function smooth scrolling
}