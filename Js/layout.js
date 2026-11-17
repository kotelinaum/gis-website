/*
 * Shared header + footer for every page.
 * Each page only needs ONE line in <head>.
 *   index.html (main folder):  <script src="JS/layout.js" defer></script>
 *   pages in Pages/:           <script src="../JS/layout.js" defer></script>
 */
(function () {
    // Site root, worked out from where this script lives (…/JS/layout.js -> …/)
    var ROOT = new URL("../", document.currentScript.src).href;

    // Styles + fonts + icons, added once so pages don't repeat them
    [
        "https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        ROOT + "css/layout.css",
        ROOT + "css/header.css",
        ROOT + "css/footer.css"
    ].forEach(function (href) {
        var l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = href;
        document.head.appendChild(l);
    });

    // ---- Content you edit in ONE place ----
    var LOGO_TEXT = "GDi";
    var LOGO_IMG  = "";   // e.g. "Images/logo.png" to use a real image

    var NAV = [
        { label: "Почетна", href: "index.html" },
        { label: "Видео",   href: "Pages/Video.html" },
        { label: "Контакт", href: "Pages/Contact.html" },
        { label: "Галерија",href: "Pages/Images.html" }
    ];

    var LANGS = [
        { name: "Македонски", flag: "mk", url: "#" },
        { name: "English",    flag: "gb", url: "#" },
        { name: "Shqip",      flag: "al", url: "#" }
    ];

    var FOOTER_COPY    = "2026 Kladilnici, GIS Сите права задржени.";
    var FOOTER_TAGLINE = "Направено со страст за географски мапи";

    var SOCIAL = [
        { name: "Instagram", icon: "fa-instagram", url: "https://www.instagram.com" },
        { name: "Facebook",  icon: "fa-facebook",  url: "https://www.facebook.com" },
        { name: "Twitter",   icon: "fa-twitter",   url: "https://twitter.com" },
        { name: "LinkedIn",  icon: "fa-linkedin",  url: "https://www.linkedin.com/in" },
        { name: "GitHub",    icon: "fa-github",    url: "https://github.com" }
    ];

    // ---- The two components ----
    function currentFile() {
        var p = location.pathname.replace(/\/$/, "");
        return p.substring(p.lastIndexOf("/") + 1) || "index.html";
    }

    class SiteHeader extends HTMLElement {
        connectedCallback() {
            var here = currentFile();
            var links = NAV.map(function (n) {
                var active = n.href.split("/").pop() === here ? ' aria-current="page"' : "";
                return '<li><a href="' + ROOT + n.href + '"' + active + ">" + n.label + "</a></li>";
            }).join("");

            var logo = LOGO_IMG
                ? '<img src="' + ROOT + LOGO_IMG + '" alt="' + LOGO_TEXT + '">'
                : LOGO_TEXT;

            var flags = LANGS.map(function (l) {
                return '<li><a href="' + l.url + '" aria-label="' + l.name + '" title="' + l.name + '">' +
                    '<img src="https://flagcdn.com/w80/' + l.flag + '.png" alt="" width="36" height="26">' +
                    "</a></li>";
            }).join("");

            this.innerHTML =
                '<header class="site-header">' +
                '<div class="site-header__inner">' +
                '<a class="site-header__logo" href="' + ROOT + 'index.html" aria-label="Почетна">' + logo + "</a>" +
                '<nav class="site-header__menu" aria-label="Main"><ul class="site-header__nav">' + links + "</ul></nav>" +
                '<ul class="site-header__langs">' + flags + "</ul>" +
                "</div>" +
                "</header>";
        }
    }

    class SiteFooter extends HTMLElement {
        connectedCallback() {
            var icons = SOCIAL.map(function (s) {
                return '<li><a href="' + s.url + '" aria-label="' + s.name + '">' +
                    '<i class="fa-brands ' + s.icon + '"></i></a></li>';
            }).join("");

            this.innerHTML =
                '<footer class="site-footer">' +
                '<div class="site-footer__inner">' +
                '<div class="site-footer__copy">' + FOOTER_COPY + "</div>" +
                '<div class="site-footer__tagline">' + FOOTER_TAGLINE + "</div>" +
                '<ul class="site-footer__social">' + icons + "</ul>" +
                "</div>" +
                "</footer>";
        }
    }

    customElements.define("site-header", SiteHeader);
    customElements.define("site-footer", SiteFooter);

    // Auto-insert: header at the top, footer at the bottom
    function mount() {
        if (!document.querySelector("site-header")) {
            document.body.insertBefore(document.createElement("site-header"), document.body.firstChild);
        }
        if (!document.querySelector("site-footer")) {
            document.body.appendChild(document.createElement("site-footer"));
        }
    }
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mount);
    } else {
        mount();
    }
})();