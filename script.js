const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

/** @type {import("gsap")} */
gsap;
gsap.registerPlugin(ScrollTrigger)

//Section 1

gsap.from(".landing__content", {
    x: window.innerWidth / 2,
    duration: 1.8,
}, 0)

gsap.from(".landing__content button", {
    y: window.innerHeight / 2,
    duration: 1.8,
}, 0)

//Section 2
const timeline = gsap.timeline({ paused: true });
const tagline = document.querySelector(".reasons__tagline");
const section2 = document.querySelector(".reasons");

timeline.fromTo(tagline,
    {
        y: "10vh",
    },
    {
        y: "150vh",
        duration: 1,
        ease: 'sin.out',
        pin: true,
    }
)

ScrollTrigger.create({
    animation: timeline,
    trigger: section2,
    start: 'top top',
    end: 'bottom center',
    scrub: true
});

//Section 3
const section3 = document.querySelector(".recommendations");
const animes = gsap.utils.toArray(".anime");

gsap.to(animes, {
    xPercent: -100 * (animes.length - 1) - 150,
    ease: "sine.out",
    scrollTrigger: {
        trigger: section3,
        pin: true,
        scrub: true,
        snap: 1 / (animes.length - 2),
        end: "+=" + section3.offsetWidth
    }
});

animes.forEach(anime => {
    anime.addEventListener("mouseenter", () => {
        gsap.to(anime, {
            scale: 1.1,
            duration: 0.2
        })
    })

    anime.addEventListener("mouseleave", () => {
        gsap.to(anime, {
            scale: 1,
            duration: 0.2
        })
    })
})

//Scroll
lenis.on('scroll', ({ progress }) => {
    let px = document.querySelector(".progress__thumb")
    gsap.to(px, {
        width: `${progress * 100}%`,
        duration: 0.2
    })
})

//Buttons
window.lesGo = function () {
    lenis.scrollTo("#reasons");
}

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

window.send = function () {
    let name = document.querySelector("#name").value;
    let content = document.querySelector("#content").value;

    if (name == "" || content == "") {
        toastr.error("Please fill in all fields!", "Error")
        return;
    }

    let webhook = "https://discord.com/api/webhooks/1326027606784479392/rGSLIJSJWWFezUz8iXYZ7WDi8HFHy-44IsdWaCLginmDp56xEERzl2zysChT7ZpFO3nf"

    let data = {
        content,
        username: name
    }

    fetch(webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(() => {
        toastr.success("Your feedback has been sent!", "Success")
    })
}
