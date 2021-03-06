/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2011 Adobe Systems Incorporated
 All Rights Reserved.

 NOTICE:  All information contained herein is, and remains
 the property of Adobe Systems Incorporated and its suppliers,
 if any.  The intellectual and technical concepts contained
 herein are proprietary to Adobe Systems Incorporated and its
 suppliers and may be covered by U.S. and Foreign Patents,
 patents in process, and are protected by trade secret or copyright law.
 Dissemination of this information or reproduction of this material
 is strictly forbidden unless prior written permission is obtained
 from Adobe Systems Incorporated.
*/
(function (a) {
    function b(a) {
        var b = a.css("background-image");
        a.css("background-image", "");
        var c = a.css("background-image");
        b != c && a.css("background-image", b);
        return c.replace(/^\s*url\(\"?/, "").replace(/['"]?\)$/, "")
    }
    if (!Muse.Browser.Features.checkCSSFeature("background-size")) {
        var c = function (c) {
                var d = a(c),
                    j = b(d),
                    h = document.createElement("img"),
                    l = document.createElement("div"),
                    i = this,
                    k = !1,
                    n = !1,
                    o = !0,
                    p = {};
                a(l).css({
                    overflow: "hidden",
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    width: c.clientWidth + "px",
                    height: c.clientHeight +
                        "px",
                    marginBottom: "-" + c.clientHeight + "px",
                    marginRight: "-" + c.clientWidth + "px",
                    zIndex: "-1"
                }).addClass("museBgSizePolyfill");
                h.src = j;
                h.alt = "";
                h.style.position = "absolute";
                l.appendChild(h);
                c.children.length > 0 ? c.insertBefore(l, c.children[0]) : c.appendChild(l);
                if (c === document.body) d = a("html"), c = d.get(0), j = b(d), h.src = j, d.css("background-attachment") == "fixed" ? (l.style.position = "fixed", o = !1) : l.style.position = "absolute";
                else if (d.is("#page")) d.css("marginLeft").toLowerCase() == "auto" && (n = !0), l.style.top = d.offset().top +
                    parseInt(d.css("borderTopWidth")) + "px", l.style.bottom = parseInt(d.parent().css("paddingBottom")) + parseInt(d.css("borderBottomWidth")) + "px", l.style.left = d.offset().left + parseInt(d.css("borderLeftWidth")) + "px", l.style.right = d.offset().left + parseInt(d.css("borderRightWidth")) + "px", l.style.zIndex = 0;
                else if (d.css("position") == "static") c.style.position = "relative";
                this.reloadImage = function () {
                    var a = b(d),
                        j = d.css("background-color");
                    if (a != h.src) h.src = a;
                    c.style.backgroundImage = "none";
                    c.style.backgroundColor =
                        "transparent";
                    l.style.backgroundColor = j;
                    a = (d.css("background-position-x") + " " + d.css("background-position-y")).replace(/^\s+/, "").replace(/\s+$/, "").split(/\s+/);
                    a.length == 1 && a[0].indexOf("center") >= 0 && a.push("center");
                    if (d.data("hasBackgroundPositionScrollEffect") != !0)
                        for (var j = 0, i = a.length; j < i; j++) switch (a[j]) {
                            case "center":
                            case "50%":
                                j == 0 ? (h.style.right = "", h.style.left = "50%", h.style.marginLeft = "-" + Math.ceil(h.offsetWidth / 2) + "px") : (h.style.bottom = "", h.style.top = "50%", h.style.marginTop = "-" + Math.ceil(h.offsetHeight /
                                    2) + "px");
                                break;
                            case "left":
                                h.style.right = "";
                                h.style.left = "0px";
                                h.style.marginLeft = "0px";
                                break;
                            case "right":
                                h.style.left = "";
                                h.style.right = "0px";
                                h.style.marginLeft = "0px";
                                break;
                            case "top":
                                h.style.bottom = "";
                                h.style.top = "0px";
                                h.style.marginTop = "0px";
                                break;
                            case "bottom":
                                h.style.top = "";
                                h.style.bottom = "0px";
                                h.style.marginTop = "0px";
                                break;
                            default:
                                j == 0 ? (h.style.left = a[j], h.style.marginLeft = "-" + Math.ceil(h.offsetWidth / 2) + "px") : (h.style.top = a[j], h.style.marginTop = "-" + Math.ceil(h.offsetHeight / 2) + "px")
                        }
                };
                this.resizeImage =
                    function (a) {
                        var b = c.getBoundingClientRect(),
                            j = c.scrollWidth - (Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder ? b.right - b.left - d.innerWidth() : 0),
                            b = c.scrollHeight - (Muse.Browser.Bugs.ScrollWidthHeightIncludesBorder ? b.bottom - b.top - d.innerHeight() : 0),
                            j = !o ? c.clientWidth : Math.max(j, c.clientWidth),
                            b = !o ? c.clientHeight : Math.max(b, c.clientHeight);
                        !p[h.src] && h.clientWidth && (p[h.src] = {
                            width: h.clientWidth,
                            height: h.clientHeight
                        });
                        var i = j / (p[h.src] ? p[h.src].width : 1),
                            k = b / (p[h.src] ? p[h.src].height : 1);
                        l.style.height =
                            b + "px";
                        l.style.marginBottom = "-" + b + "px";
                        l.style.width = j + "px";
                        l.style.marginRight = "-" + j + "px";
                        i < k == a ? (h.style.height = b + 1 + "px", h.style.width = "auto") : (h.style.width = j + 1 + "px", h.style.height = "auto")
                    };
                this.update = function () {
                    if (k) {
                        c.style.backgroundImage = "";
                        d.css("background-color", "");
                        var a = d.css("background-image").toLowerCase(),
                            b = (c.currentStyle || window.getComputedStyle(c, null))["background-size"];
                        b && b.toLowerCase();
                        if (a != "none" && (b == "cover" || b == "contain")) {
                            if (i.reloadImage(), l.style.display = "block", l.style.width =
                                "0px", l.style.height = "0px", i.resizeImage(b == "cover"), n) l.style.left = d.offset().left + parseInt(d.css("borderLeftWidth")) + "px", l.style.right = d.offset().left + parseInt(d.css("borderRightWidth")) + "px"
                        } else l.style.display = "none"
                    }
                };
                if (h.complete || j == "none") k = !0;
                else a(h).one("load", function () {
                    k = !0;
                    i.update()
                });
                this.update()
            },
            d = function () {
                this.updateList = []
            };
        d.prototype.initialize = function (b) {
            var d = this;
            b.each(function () {
                var b = new c(this);
                this !== document.body ? d.updateList.push(b) : (a(window).resize(function () {
                    setTimeout(function () {
                            b.update()
                        },
                        10)
                }), a(window).load(function () {
                    setTimeout(function () {
                        b.update()
                    }, 10)
                }))
            });
            var j = d.updateList.length;
            j > 0 && setInterval(function () {
                for (var a = 0; a < j; a++) d.updateList[a].update()
            }, Math.max(120, 16 * j))
        };
        a(window).data("musePolyfill.bgSize", new d)
    }
})(jQuery);;
(function () {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function (a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                if (a[c] == b) return c;
            return -1
        }(Muse.assets.required, "jquery.musepolyfill.bgsize.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2015.0.2.310" != d.getAttribute("content") && Muse.assets.outOfDate.push("jquery.musepolyfill.bgsize.js");
                    break
                }
            }
        }
    }
})();