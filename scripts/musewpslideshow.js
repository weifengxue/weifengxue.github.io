/*
 ADOBE CONFIDENTIAL
 ___________________

 Copyright 2012 Adobe Systems Incorporated
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
(function (a, b, c, d, g) {
    c.Plugins.SlideShowCaptions = {
        defaultOptions: {
            captionClassName: "SSSlideCaption"
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b.bind("attach-behavior", function () {
                d._attachBehavior(b)
            })
        },
        _attachBehavior: function (a) {
            var b = a._findWidgetElements("." + a.options.captionClassName);
            if (b.length) a._sscpCaptions = b, b.css("display", "none"), a.slides.bind("wp-panel-show", function (a, c) {
                b.eq(c.panelIndex).css("display", "block")
            }), a.slides.bind("wp-panel-hide",
                function (a, c) {
                    b.eq(c.panelIndex).css("display", "none")
                }), a.bind("ready", function () {
                -1 != a.slides.activeIndex && b.eq(a.slides.activeIndex).css("display", "block")
            })
        }
    };
    c.Plugins.SlideShowLabel = {
        defaultOptions: {
            labelClassName: "SlideShowLabel"
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b.bind("attach-behavior", function () {
                d._attachBehavior(b)
            })
        },
        _attachBehavior: function (a) {
            var b = this,
                c = a._findWidgetElements("." + a.options.labelClassName);
            if (c.length) a._$sslpLabels = c, a.slides.bind("wp-panel-show",
                function () {
                    b._updateLabels(a)
                }), a.bind("ready", function () {
                b._updateLabels(a)
            })
        },
        _findAllTextNodes: function (a, b) {
            b = b || [];
            switch (a.nodeType) {
                case 3:
                    b.push(a);
                    break;
                case 1:
                    if (a.nodeName.toLowerCase() !== "script")
                        for (var c = a.firstChild; c;) this._findAllTextNodes(c, b), c = c.nextSibling
            }
            a.nextSibling && this._findAllTextNodes(a.nextSibling, b);
            return b
        },
        _updateLabels: function (a) {
            var b = this,
                c = a.slides,
                d = c.activeIndex + 1,
                g = c.$element.length;
            a._$sslpLabels.each(function () {
                for (var a = b._findAllTextNodes(this), c = a.length,
                        f = 0, h = function (a) {
                            return ++f === 1 ? d : f === 2 ? g : a
                        }, r = 0; r < c; r++) {
                    var m = a[r],
                        q = m.nodeValue,
                        u = q.replace(/\d+/g, h);
                    if (u !== q) m.nodeValue = u
                }
            })
        }
    };
    c.Plugins.Lightbox = {
        defaultOptions: {
            lightboxPartsSelector: ".PamphletLightboxPart",
            closeBtnClassName: "PamphletCloseButton"
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b._sslbpAutoPlay = c.autoPlay;
            c.autoPlay = !1;
            b.bind("before-transform-markup", function () {
                d._beforeTransformMarkup(b)
            });
            b.bind("attach-behavior", function () {
                d._attachBehavior(b)
            });
            c.autoActivate_runtime && b.bind("ready", function () {
                d._openLightbox(b)
            })
        },
        _beforeTransformMarkup: function (a) {
            a._sslbpShownInitially = !0;
            var b = a._findWidgetElements("." + a.options.slideClassName);
            if (b.filter(":hidden").length == 0) a._sslbpSlideOffset = b.offset();
            else {
                a._sslbpShownInitially = !1;
                var d = a._findWidgetElements("." + a.options.viewClassName);
                a._sslbpSlideOffset = {
                    top: c.Utils.getCSSIntValue(d, "top") + c.Utils.getCSSIntValue(b, "top"),
                    left: c.Utils.getCSSIntValue(d, "left") + c.Utils.getCSSIntValue(b, "left")
                }
            }
        },
        _attachBehavior: function (a) {
            var b = this,
                d = a.options;
            a.tabs.$element.bind(d.event, function () {
                b._openLightbox(a)
            });
            a.slides.bind("wp-panel-before-show", function () {
                b._openLightbox(a)
            });
            if (c.Browser.Features.Touch && d.elastic === "fullScreen") a.slides.$element.not("a[href]").on("click", function () {
                b._closeLightbox(a)
            });
            a._$sslbpCloseBtn = a._findWidgetElements("." + d.closeBtnClassName).bind("click", function () {
                b._closeLightbox(a)
            });
            b._initializeMarkup(a)
        },
        _initializeMarkup: function (b) {
            var d = b.options,
                g = d.elastic !==
                "off",
                k = b._findWidgetElements("." + d.viewClassName),
                i = b.slides.$element,
                j = k,
                n = b._sslbpSlideOffset,
                o = i.outerWidth(),
                p = i.outerHeight(),
                r = b._findWidgetElements(d.lightboxPartsSelector),
                j = a(k[0].parentNode).filter("." + d.clipClassName);
            j.length === 0 && (j = k);
            r.each(function (d, i) {
                var l = a(i);
                if (l.css("position") !== "fixed") {
                    var j = b._sslbpShownInitially ? l.offset() : {
                            top: c.Utils.getCSSIntValue(l, "top"),
                            left: c.Utils.getCSSIntValue(l, "left")
                        },
                        k = {
                            top: j.top - n.top
                        };
                    if (!g) k.left = j.left - n.left;
                    l.css(k)
                }
            }).addClass("popup_element");
            var m = a('<div id="' + (k.attr("id") || "") + '"></div>').css({
                    left: 0,
                    top: 0,
                    width: "auto",
                    height: "auto",
                    padding: 0,
                    margin: 0,
                    zIndex: "auto"
                }),
                q;
            g && (q = a("<div/>"), d.elastic === "fullScreen" ? q.addClass("fullscreen") : d.elastic === "fullWidth" && q.addClass("fullwidth"), q.css({
                paddingLeft: k.css("padding-left"),
                paddingRight: k.css("padding-right"),
                paddingTop: k.css("padding-top"),
                paddingBottom: k.css("padding-bottom"),
                borderColor: k.css("border-left-color"),
                borderStyle: k.css("border-left-style"),
                borderLeftWidth: k.css("border-left-width"),
                borderRightWidth: k.css("border-right-width"),
                borderTopWidth: k.css("border-top-width"),
                borderBottomWidth: k.css("border-bottom-width")
            }), q.append(c.Utils.includeMEditableTags(j)), q.append(c.Utils.includeMEditableTags(r)), m.css({
                border: "none"
            }));
            k.removeAttr("id");
            var u = a("<div class='overlayWedge'></div>").insertBefore(c.Utils.includeMEditableTags(i)[0]);
            m.append(c.Utils.includeMEditableTags(k.children().not("." + d.slideClassName)));
            k.append(c.Utils.includeMEditableTags(i));
            m.css({
                visibility: "hidden"
            }).appendTo(document.body);
            var k = m.outerWidth(),
                D = m.outerHeight();
            m.detach().css({
                visibility: ""
            });
            j.css({
                position: d.elastic === "fullScreen" ? "relative" : "absolute",
                padding: 0,
                left: d.elastic === "fullWidth" ? "" : 0,
                top: 0,
                borderWidth: 0,
                background: "none"
            });
            d.elastic !== "fullScreen" && j.css({
                width: o,
                height: p
            });
            d.transitionStyle === "fading" && i.css({
                position: "absolute",
                left: 0,
                top: 0
            });
            var E;
            if (b._fstpPositionSlides || b._csspResizeFullScreenImages) E = function (a, c) {
                b._fstpPositionSlides && b._fstpPositionSlides(a, c);
                b._csspResizeFullScreenImages &&
                    b._csspResizeFullScreenImages(b, b.slides.$element, d.heroFitting)
            };
            i = -o / 2;
            p = -p / 2;
            j = a("<div class='LightboxContent'></div>").css({
                position: "absolute"
            }).append(g ? q : j);
            g || j.append(c.Utils.includeMEditableTags(r));
            j.museOverlay({
                autoOpen: !1,
                offsetLeft: i,
                offsetTop: p,
                overlayExtraWidth: k,
                overlayExtraHeight: D,
                $overlaySlice: m,
                $overlayWedge: u,
                onClose: function () {
                    b.stop();
                    b.slides.hidePanel(b.slides.activeElement)
                },
                $elasticContent: q,
                resizeSlidesFn: E
            });
            if (a.browser.msie && a.browser.version < 9) {
                c.Assert.assert(!c.Utils.isIBE(),
                    "IBE doesn't support <IE10, so how did we get here?");
                var B = m[0];
                c.Utils.needPIE(function () {
                    PIE.detach(B);
                    PIE.attach(B)
                })
            }
            b._$sslbpOverlay = j
        },
        _openLightbox: function (a) {
            var b = a._$sslbpOverlay;
            b.data("museOverlay").isOpen || (b.museOverlay("open"), a._sslbpAutoPlay && a.play())
        },
        _closeLightbox: function (a) {
            a._$sslbpOverlay.data("museOverlay").isOpen && a._$sslbpOverlay.museOverlay("close")
        }
    };
    c.Plugins.ContentSlideShow = {
        defaultOptions: {
            displayInterval: 3E3,
            transitionDuration: 500,
            transitionStyle: "fading",
            contentLayout_runtime: "stack",
            event: "click",
            deactivationEvent: "none",
            hideAllContentsFirst: !1,
            shuffle: !1,
            resumeAutoplay: !1,
            resumeAutoplayInterval: 3E3,
            elastic: "off",
            autoActivate_runtime: !1
        },
        slideShowOverrides: {
            slideshowClassName: "SlideShowWidget",
            viewClassName: "SlideShowContentPanel",
            slideClassName: "SSSlide",
            slideLinksClassName: "SSSlideLinks",
            slideLinkClassName: "SSSlideLink",
            slideLinkActiveClassName: "SSSlideLinkSelected",
            slideCountClassName: "SSSlideCount",
            firstBtnClassName: "SSFirstButton",
            lastBtnClassName: "SSLastButton",
            prevBtnClassName: "SSPreviousButton",
            nextBtnClassName: "SSNextButton",
            playBtnClassName: "SSPlayButton",
            stopBtnClassName: "SSStopButton",
            closeBtnClassName: "SSCloseButton",
            heroFitting: "fitContentProportionally",
            thumbFitting: "fillFrameProportionally",
            lightboxPartsSelector: ".SlideShowCaptionPanel, .SSFirstButton, .SSPreviousButton, .SSNextButton, .SSLastButton, .SlideShowLabel, .SSCloseButton",
            lightboxEnabled_runtime: !1
        },
        compositionOverrides: {
            slideshowClassName: "PamphletWidget",
            viewClassName: "ContainerGroup",
            slideClassName: "Container",
            slideLinkClassName: "Thumb",
            slideLinkActiveClassName: "PamphletThumbSelected",
            prevBtnClassName: "PamphletPrevButton",
            nextBtnClassName: "PamphletNextButton",
            closeBtnClassName: "PamphletCloseButton",
            lightboxPartsSelector: ".PamphletLightboxPart"
        },
        initialize: function (d, g) {
            var h = this,
                k = d.$element.hasClass("SlideShowWidget"),
                i = k ? h.slideShowOverrides : h.compositionOverrides;
            d._csspIsImageSlideShow = k;
            this._restartTimer = 0;
            a.extend(g, a.extend({}, h.defaultOptions, i, g));
            if (g.lightboxEnabled_runtime) g.contentLayout_runtime = "lightbox";
            if (g.contentLayout_runtime ==
                "lightbox" && !g.autoActivate_runtime) g.hideAllContentsFirst = !0;
            if (g.hideAllContentsFirst) g.defaultIndex = -1;
            if (g.elastic !== "off") d._csspPositionImage = h._positionImage;
            k && (b.Widget.ContentSlideShow.slideImageIncludePlugin.initialize(d, g), c.Plugins.SlideShowLabel.initialize(d, g), c.Plugins.SlideShowCaptions.initialize(d, g));
            g.transitionStyle == "fading" ? b.Widget.ContentSlideShow.fadingTransitionPlugin.initialize(d, g) : b.Widget.ContentSlideShow.filmstripTransitionPlugin.initialize(d, g);
            b.Widget.ContentSlideShow.alignPartsToPagePlugin.initialize(d,
                g);
            if (g.contentLayout_runtime === "lightbox") {
                if (g.elastic !== "off") d._csspResizeFullScreenImages = h._resizeFullScreenImages;
                c.Plugins.Lightbox.initialize(d, g)
            }
            g.shuffle === !0 && b.Widget.ContentSlideShow.shufflePlayPlugin.initialize(d, g);
            d.bind("transform-markup", function () {
                h._transformMarkup(d)
            });
            d.bind("attach-behavior", function () {
                h._attachBehavior(d)
            })
        },
        _transformMarkup: function (b) {
            var d = b.options,
                g = b._findWidgetElements("." + d.viewClassName);
            if (d.transitionStyle !== "fading") {
                var k = a('<div class="' + d.clipClassName +
                        '"/>'),
                    i = b._findWidgetElements("." + d.slideClassName),
                    b = i.outerWidth(),
                    i = i.outerHeight();
                if (d.elastic === "fullScreen") k.addClass("fullscreen");
                else {
                    var j = {
                            position: "relative",
                            width: b + "px",
                            height: i + "px",
                            overflow: "hidden"
                        },
                        n = g.css("position");
                    if (n === "absolute") j.position = n, j.left = g.css("left"), j.top = g.css("top");
                    else if (n === "fixed") {
                        var o = c.Utils.getStyleSheetRuleById(c.Utils.getPageStyleSheet(), g.get(0).id);
                        j.position = n;
                        j.left = c.Utils.getRuleProperty(o, "left");
                        j.top = c.Utils.getRuleProperty(o, "top");
                        j.bottom = c.Utils.getRuleProperty(o, "bottom");
                        j.right = c.Utils.getRuleProperty(o, "right")
                    }
                    k.css(j)
                }
                d.elastic !== "fullScreen" && g.css({
                    width: b + "px",
                    height: i + "px"
                });
                g.css({
                    position: "relative",
                    top: "0",
                    left: "0",
                    margin: "0",
                    overflow: "hidden"
                }).wrap(k)
            } else n = g.css("position"), d.elastic !== "fullScreen" && n !== "fixed" && g.css({
                width: "0",
                height: "0"
            })
        },
        _attachBehavior: function (b) {
            var g = this,
                h = b.options,
                k = b.tabs,
                i = b.slides.$element,
                j = h.slideLinkActiveClassName,
                n = h.contentLayout_runtime === "lightbox";
            if (h.elastic !== "off" &&
                (g._resizeFullScreenImages(b, b.slides.$element, h.heroFitting), !n)) a(d).on("orientationchange resize", function () {
                g._resizeFullScreenImages(b, b.slides.$element, h.heroFitting)
            });
            if (n && !h.autoActivate_runtime) h.hideAllContentsFirst = !0;
            if (k) {
                var o = k.$element;
                h.event === "mouseover" && o.bind("mouseenter", function () {
                    var b = a(this);
                    b.data("enter", !0);
                    k.selectTab(o.index(b))
                });
                h.deactivationEvent === "mouseout_trigger" ? o.bind("mouseleave", function () {
                        var c = a(this);
                        c.data("enter", !1);
                        b.slides.hidePanel(o.index(c))
                    }) :
                    h.deactivationEvent === "mouseout_both" && (o.bind("mouseleave", function () {
                        var c = a(this),
                            d = o.index(c),
                            g = i.eq(d);
                        c.data("enter", !1);
                        c.data("setTimeout") || (c.data("setTimeout", !0), setTimeout(function () {
                            !g.data("enter") && !c.data("enter") && b.slides.hidePanel(d);
                            c.data("setTimeout", !1)
                        }, 300))
                    }), i.bind("mouseenter", function () {
                        a(this).data("enter", !0)
                    }), i.bind("mouseleave", function () {
                        var c = a(this),
                            d = i.index(c),
                            g = o.eq(d);
                        c.data("enter", !1);
                        g.data("setTimeout") || (g.data("setTimeout", !0), setTimeout(function () {
                            !c.data("enter") &&
                                !g.data("enter") && b.slides.hidePanel(d);
                            g.data("setTimeout", !1)
                        }, 300))
                    }))
            }
            k && j && (h.hideAllContentsFirst || k.$element.eq(k.options.defaultIndex).addClass(j), b._findWidgetElements("a." + j).each(function () {
                a(this).data("default-active", !0)
            }), b.slides.bind("wp-panel-show", function (a, b) {
                k.$element.eq(b.panelIndex).addClass(j)
            }).bind("wp-panel-hide", function (a, b) {
                var c = k.$element.eq(b.panelIndex);
                c.data("default-active") || c.removeClass(j)
            }));
            g._attachStopOnClickHandler(b, b.$firstBtn);
            g._attachStopOnClickHandler(b,
                b.$lastBtn);
            g._attachStopOnClickHandler(b, b.$previousBtn);
            g._attachStopOnClickHandler(b, b.$nextBtn);
            g._attachStopOnClickHandler(b, b.$playBtn);
            g._attachStopOnClickHandler(b, b.$stopBtn);
            g._attachStopOnClickHandler(b, b.$closeBtn);
            k && !n && g._attachStopOnClickHandler(b, k.$element);
            b._csspIsImageSlideShow || (b.slides.bind("wp-panel-hide", function (b, d) {
                c.Utils.detachIframesAndObjectsToPauseMedia(a(d.panel))
            }).bind("wp-panel-show", function (d, g) {
                setTimeout(function () {
                        c.Utils.attachIframesAndObjectsToResumeMedia(a(g.panel))
                    },
                    b.options.transitionDuration)
            }), i.each(function () {
                this != b.slides.activeElement || h.hideAllContentsFirst ? c.Utils.detachIframesAndObjectsToPauseMedia(a(this)) : c.Utils.attachIframesAndObjectsToResumeMedia(a(this))
            }));
            b.bind("wp-swiped", function () {
                (b.options.autoPlay || b._sslbpAutoPlay) && b.options.resumeAutoplay && 0 < b.options.resumeAutoplayInterval && g._startRestartTimer(b)
            })
        },
        _startRestartTimer: function (a) {
            this._stopRestartTimer();
            this._restartTimer = setTimeout(function () {
                    a.play(!0)
                }, a.options.resumeAutoplayInterval +
                a.options.transitionDuration)
        },
        _stopRestartTimer: function () {
            this._restartTimer && clearTimeout(this._restartTimer);
            this._restartTimer = 0
        },
        _attachStopOnClickHandler: function (a, b) {
            var c = this;
            b.bind(a.options.event === "click" ? "click" : "mouseover", function () {
                a.stop();
                (a.options.autoPlay || a._sslbpAutoPlay) && a.options.resumeAutoplay && 0 < a.options.resumeAutoplayInterval && c._startRestartTimer(a)
            })
        },
        _hitTest: function (a, b) {
            b.outerWidth() === 0 && (b = b.children(".popup_anchor").children(".popup_element").eq(0));
            var c =
                b.offset(),
                c = {
                    x: c.left,
                    y: c.top,
                    width: b.outerWidth(),
                    height: b.outerHeight()
                };
            return a.pageX >= c.x && a.pageX <= c.x + c.width && a.pageY >= c.y && a.pageY <= c.y + c.height
        },
        _layoutThumbs: function (b) {
            var d = b.options,
                g = c.Utils.getStyleValue;
            b._findWidgetElements("." + d.slideLinksClassName).each(function () {
                var b = a(this).find("." + d.slideLinkClassName);
                firstThumb = b[0];
                tWidth = g(firstThumb, "width");
                tHeight = g(firstThumb, "height");
                gapH = g(firstThumb, "margin-right");
                gapV = g(firstThumb, "margin-bottom");
                borderL = g(firstThumb, "border-left-width");
                borderR = g(firstThumb, "border-right-width");
                borderT = g(firstThumb, "border-top-width");
                borderB = g(firstThumb, "border-bottom-width");
                gWidth = g(this, "width");
                paddingL = g(this, "padding-left");
                paddingT = g(this, "padding-top");
                maxNumThumb = Math.floor((gWidth + gapH) / (tWidth + borderL + borderR + gapH));
                gStyle = this.runtimeStyle ? this.runtimeStyle : this.style;
                numRow = Math.ceil(b.length / maxNumThumb);
                firstRowNum = b.length < maxNumThumb ? b.length : maxNumThumb;
                leftPos = leftMostPos = c.Utils.pixelRound((gWidth - (tWidth + borderL + borderR) *
                    firstRowNum - gapH * (firstRowNum - 1)) / 2) + paddingL;
                topPos = paddingT;
                numInRow = 1;
                gStyle.height = (tHeight + borderT + borderB) * numRow + gapV * (numRow - 1) + "px";
                b.each(function () {
                    numInRow > firstRowNum && (numInRow = 1, leftPos = leftMostPos, topPos += tHeight + borderT + borderB + gapV);
                    numInRow++ > 1 && (leftPos += tWidth + borderL + borderR + gapH);
                    var a = this.runtimeStyle ? this.runtimeStyle : this.style;
                    a.marginRight = "0px";
                    a.marginBottom = "0px";
                    a.left = leftPos + "px";
                    a.top = topPos + "px"
                })
            })
        },
        _resizeFullScreenImages: function (b, c, d) {
            c.each(function () {
                a(this).find("img").each(function () {
                    this.complete &&
                        !a(this).hasClass(b.options.imageIncludeClassName) && b._csspPositionImage(this, d, b.options.elastic)
                })
            })
        },
        _setupImagePositioning: function (b, c, d, g) {
            var i = this;
            c.each(function () {
                a(this).find("img").each(function () {
                    var b = this;
                    b.complete ? i._positionImage(b, d, g) : a(b).load(function () {
                        i._positionImage(b, d, g)
                    })
                })
            })
        },
        _positionImage: function (b, l, h, k, i) {
            var j = a(d),
                n = b.runtimeStyle ? b.runtimeStyle : b.style,
                o = h === "fullWidth" || h === "fullScreen",
                p = h === "fullHeight" || h === "fullScreen",
                r = l == "fitContentProportionally";
            $img =
                a(b);
            o = o ? d.innerWidth ? d.innerWidth : j.width() : r ? $img.data("width") : $img.parent().width();
            j = p ? d.innerHeight ? d.innerHeight : j.height() : r ? $img.data("height") : $img.parent().height();
            k = k !== g ? k : c.Utils.getNaturalWidth(b);
            b = i !== g ? i : c.Utils.getNaturalHeight(b);
            h !== "off" && (k === 0 && (k = $img.data("imageWidth")), b === 0 && (b = $img.data("imageHeight")));
            if (o == k && j == b) n.marginTop = "0px", n.marginLeft = "0px";
            else {
                p = k;
                i = b;
                if (l == "fillFrameProportionally") {
                    if (h !== "off" || k > o && b > j) l = k / o, h = b / j, l < h ? (i = b / l, p = o) : (i = j, p = k / h)
                } else if (l ==
                    "fitContentProportionally" && (h !== "off" || k > o || b > j)) l = k / o, h = b / j, l > h ? (i = b / l, p = k / l) : (i = b / h, p = k / h);
                n.width = c.Utils.pixelRound(p) + "px";
                n.height = c.Utils.pixelRound(i) + "px";
                n.marginTop = c.Utils.pixelRound((j - i) / 2) + "px";
                n.marginLeft = c.Utils.pixelRound((o - p) / 2) + "px"
            }
        }
    };
    a.extend(b.Widget.ContentSlideShow.slideImageIncludePlugin.defaultOptions, {
        imageIncludeClassName: "ImageInclude",
        slideLoadingClassName: "SSSlideLoading"
    });
    b.Widget.ContentSlideShow.prototype.defaultPlugins = [c.Plugins.ContentSlideShow];
    b.Widget.ContentSlideShow.prototype._getAjaxSrcForImage =
        function (b) {
            for (var c = a(d).data("ResolutionManager").getDataSrcAttrName(), g = c.length, k, i = 0; i < g; i++)
                if ((k = b.data(c[i])) && k.length) return k;
            return b.data("src")
        }
})(jQuery, WebPro, Muse, window);;
(function () {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function (a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                if (a[c] == b) return c;
            return -1
        }(Muse.assets.required, "musewpslideshow.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2015.0.2.310" != d.getAttribute("content") && Muse.assets.outOfDate.push("musewpslideshow.js");
                    break
                }
            }
        }
    }
})();