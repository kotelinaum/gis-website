(function () {
    var INTERVAL = 4000; // ms between automatic slides

    function init(root) {
        var track = root.querySelector(".carousel__track");
        var slides = Array.prototype.slice.call(root.querySelectorAll(".carousel__slide"));
        if (!track || slides.length < 2) return;

        var index = 0, timer = null;

        var prev = document.createElement("button");
        prev.className = "carousel__btn carousel__btn--prev";
        prev.setAttribute("aria-label", "Претходна слика");
        prev.innerHTML = '<i class="bi bi-chevron-left"></i>';

        var next = document.createElement("button");
        next.className = "carousel__btn carousel__btn--next";
        next.setAttribute("aria-label", "Следна слика");
        next.innerHTML = '<i class="bi bi-chevron-right"></i>';

        // Indicator bars
        var dotsWrap = document.createElement("div");
        dotsWrap.className = "carousel__dots";
        var dots = slides.map(function (_, i) {
            var d = document.createElement("button");
            d.className = "carousel__dot";
            d.setAttribute("aria-label", "Слика " + (i + 1));
            d.addEventListener("click", function () { go(i, true); });
            dotsWrap.appendChild(d);
            return d;
        });

        root.appendChild(prev);
        root.appendChild(next);
        root.appendChild(dotsWrap);

        function go(i, userAction) {
            index = (i + slides.length) % slides.length;
            track.style.transform = "translateX(" + (-index * 100) + "%)";
            dots.forEach(function (d, n) {
                d.setAttribute("aria-current", n === index ? "true" : "false");
            });
            if (userAction) restart();
        }

        function start() {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            stop();
            timer = setInterval(function () { go(index + 1); }, INTERVAL);
        }
        function stop() { if (timer) { clearInterval(timer); timer = null; } }
        function restart() { start(); }

        prev.addEventListener("click", function () { go(index - 1, true); });
        next.addEventListener("click", function () { go(index + 1, true); });

        // Pause while the mouse is over the gallery
        root.addEventListener("mouseenter", stop);
        root.addEventListener("mouseleave", start);

        // Pause when the tab is hidden
        document.addEventListener("visibilitychange", function () {
            document.hidden ? stop() : start();
        });

        // Swipe on phones
        var startX = null;
        root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
        root.addEventListener("touchend", function (e) {
            if (startX !== null) {
                var dx = e.changedTouches[0].clientX - startX;
                if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1), true);
            }
            startX = null;
            start();
        });

        // Keyboard arrows when the carousel is focused
        root.tabIndex = 0;
        root.addEventListener("keydown", function (e) {
            if (e.key === "ArrowLeft")  go(index - 1, true);
            if (e.key === "ArrowRight") go(index + 1, true);
        });

        go(0);
        start();
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".carousel").forEach(init);
    });
})();