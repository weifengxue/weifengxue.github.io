/*

 Copyright (c) 2012. Adobe Systems Incorporated.
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of Adobe Systems Incorporated nor the names of its
 contributors may be used to endorse or promote products derived from this
 software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
*/
(function (a, b) {
    function c() {}
    var d = {
        version: 0.1,
        inherit: function (a, b) {
            var c = function () {};
            c.prototype = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.prototype._super = b
        },
        ensureArray: function () {
            var b = [],
                c = arguments.length;
            c > 0 && (b = c > 1 || !a.isArray(arguments[0]) ? a.makeArray(arguments) : arguments[0]);
            return b
        },
        hasPointerCapture: function () {
            return !!b.hasPointerCapture
        },
        setPointerCapture: function (a, c) {
            if (c.pointerId && !b.hasPointerCapture)
                if (a.setPointerCapture) a.setPointerCapture(c.pointerId), b.hasPointerCapture = !0;
                else if (a.msSetPointerCapture) a.msSetPointerCapture(c.pointerId), b.hasPointerCapture = !0
        },
        releasePointerCapture: function (a, c) {
            c.pointerId && b.hasPointerCapture && (a.releasePointerCapture ? a.releasePointerCapture(c.pointerId) : a.msReleasePointerCapture && a.msReleasePointerCapture(c.pointerId), delete b.hasPointerCapture)
        },
        scopedFind: function (b, c, d, h) {
            for (var d = " " + d + " ", k = [], b = a(b).find(c), c = b.length, h = a(h)[0], i = 0; i < c; i++)
                for (var j = b[i], n = j; n;) {
                    if (n.className && (" " + n.className + " ").indexOf(d) !== -1) {
                        n ===
                            h && k.push(j);
                        break
                    }
                    n = n.parentNode
                }
            return a(k)
        }
    };
    a.extend(c.prototype, {
        bind: function (b, c, d) {
            return a(this).bind(b, c, d)
        },
        unbind: function (b, c) {
            return a(this).unbind(b, c)
        },
        trigger: function (b, c) {
            var d = a.Event(b);
            a(this).trigger(d, c);
            return d
        }
    });
    d.EventDispatcher = c;
    b.WebPro = d
})(jQuery, window, document);
(function (a, b) {
    var c = 1;
    b.ImageLoader = function (c) {
        b.EventDispatcher.call();
        var g = this;
        this.options = a.extend({}, this.defaultOptions, c);
        this._currentEntry = null;
        this._queue = [];
        this._isRunning = this._needsSort = !1;
        this._loader = new Image;
        this._loadFunc = function () {
            g._handleLoad()
        };
        this._loadErrorFunc = function () {
            g._handleError()
        };
        this._timeoutFunc = function () {
            g.trigger("wp-image-loader-timeout", this._currentEntry);
            g._loadNext()
        }
    };
    b.inherit(b.ImageLoader, b.EventDispatcher);
    a.extend(b.ImageLoader.prototype, {
        defaultOptions: {
            timeoutInterval: 1E3
        },
        add: function (d, g) {
            if (d) {
                urls = b.ensureArray(d);
                for (var f = 0; f < urls.length; f++) {
                    var l = a.extend({
                        reqId: c++,
                        src: urls[f],
                        width: 0,
                        height: 0,
                        priority: 50,
                        callback: null,
                        data: null
                    }, g);
                    this._queue.push(l);
                    this._needsSort = !0;
                    this.trigger("wp-image-loader-add", l)
                }
                this._isRunning && !this._currentEntry && this._loadNext()
            }
        },
        reprioritize: function (a, b) {
            if (!(this._currentEntry && this._currentEntry.src == a)) {
                var c;
                for (c = 0; c < this._queue.length; ++c)
                    if (this._queue[c].src == a) break;
                if (c != 0 && c < this._queue.length) this._queue = this._queue.splice(c,
                    b ? this._queue.length - c : 1).concat(this._queue)
            }
        },
        start: function () {
            if (!this._isRunning) this._isRunning = !0, this._loadNext(), this.trigger("wp-image-loader-start")
        },
        stop: function () {
            if (this._isRunning) this._currentEntry && this._queue.unshift(this._currentEntry), this._resetLoader(), this._isRunning = !1, this.trigger("wp-image-loader-stop")
        },
        clearQueue: function () {
            var a = this._isRunning;
            this.stop();
            this._queue.length = 0;
            a && this.start()
        },
        isQueueEmpty: function () {
            return this._queue.length == 0
        },
        _loadNext: function () {
            var d;
            this._resetLoader();
            var a = this._queue;
            if (a.length) {
                if (this._needsSort) d = this._queue = a.sort(function (a, b) {
                    var c = a.priority - b.priority;
                    return c ? c : a.reqId - b.reqId
                }), a = d, this._needsSort = !1;
                this._currentEntry = a = a.shift();
                var b = this._loader;
                b.onload = this._loadFunc;
                b.onerror = this._loadErrorFunc;
                b.src = a.src
            }
        },
        _resetLoader: function () {
            var a = this._loader;
            a.onload = null;
            a.onerror = null;
            this._currentEntry = a.src = null;
            if (this._timeoutTimerId) clearTimeout(this._timeoutTimerId), this._timeoutTimerId = 0
        },
        _handleLoad: function () {
            var a =
                this._loader,
                b = this._currentEntry;
            b.width = a.width;
            b.height = a.height;
            b.callback && b.callback(b.src, b.width, b.height, b.data);
            this.trigger("wp-image-loader-load-success", b);
            this._loadNext()
        },
        _handleError: function () {
            this.trigger("wp-image-loader-load-error", this._currentEntry);
            this._loadNext()
        }
    })
})(jQuery, WebPro, window, document);
(function (a, b) {
    function c() {
        b.EventDispatcher.call(this);
        this._initialize.apply(this, arguments)
    }
    b.inherit(c, b.EventDispatcher);
    a.extend(c.prototype, {
        defaultOptions: {},
        _widgetName: "Widget",
        _initialize: function () {
            var b;
            this.plugins = [];
            var c = this.trigger("before-setup");
            c.isDefaultPrevented() || (b = this._setUp.apply(this, arguments), this.trigger("setup"));
            c = this.trigger("before-init-plugins");
            c.isDefaultPrevented() || (this._initializePlugins(b), this.trigger("init-plugins"));
            this.options = a.extend({}, this.defaultOptions,
                b);
            c = this.trigger("before-extract-data");
            c.isDefaultPrevented() || (this._extractData(), this.trigger("extract-data"));
            c = this.trigger("before-transform-markup");
            c.isDefaultPrevented() || (this._transformMarkup(), this.trigger("transform-markup"));
            c = this.trigger("before-attach-behavior");
            c.isDefaultPrevented() || (this._attachBehavior(), this.trigger("attach-behavior"));
            c = this.trigger("before-ready");
            c.isDefaultPrevented() || (this._ready(), this.trigger("ready"))
        },
        _setUp: function (b, c) {
            this.$element = a(b);
            return c
        },
        _initializePlugins: function (a) {
            for (var a = a || {}, b = ((typeof a.useDefaultPlugins === "undefined" || a.useDefaultPlugins) && this.defaultPlugins ? this.defaultPlugins : []).concat(a.plugins || []), b = b.sort(function (a, b) {
                    a = typeof a.priority === "number" ? a.priority : 50;
                    b = typeof b.priority === "number" ? b.priority : 50;
                    return a - b
                }), c = 0; c < b.length; c++) {
                var l = b[c];
                l && l.initialize && l.initialize(this, a)
            }
            this.plugins = b
        },
        _extractData: function () {},
        _transformMarkup: function () {},
        _attachBehavior: function () {},
        _ready: function () {}
    });
    b.Widget =
        c;
    b.widget = function (c, g, f) {
        var l = f && g || b.Widget,
            f = f || g || {},
            g = function () {
                l.apply(this, arguments);
                this._widgetName = c
            };
        b.inherit(g, l);
        a.extend(g.prototype, f);
        g.prototype.defaultOptions = a.extend({}, l.prototype.defaultOptions, f.defaultOptions);
        var f = c.split("."),
            h = f.length;
        namespace = h > 1 && f[0] || "Widget";
        c = f[h - 1];
        b[namespace][c] = g
    }
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.Button", b.Widget, {
        defaultOptions: {
            hoverClass: "wp-button-hover",
            activeClass: "wp-button-down",
            disabledClass: "wp-button-disabled",
            disabled: !1,
            callback: null
        },
        _attachBehavior: function () {
            var b = this,
                d = function (g) {
                    b.$element.removeClass(b.options.activeClass);
                    !b.options.disabled && b.options.callback && b.mouseDown && b.options.callback.call(this, g);
                    a(b.$element).off("mouseup pointerup", d);
                    b.mouseDown = !1
                };
            this.mouseDown = !1;
            this.$element.on("mouseover", function () {
                b.options.disabled ||
                    b.$element.addClass(b.options.hoverClass + (b.mouseDown ? " " + b.options.activeClass : ""))
            }).on("mouseleave", function () {
                b.$element.removeClass(b.options.hoverClass + " " + b.options.activeClass);
                a(b.$element).off("mouseup", d)
            }).on("mousedown pointerdown", function () {
                if (!b.options.disabled) b.mouseDown = !0, b.$element.addClass(b.options.activeClass), a(b.$element).on("mouseup pointerup", d)
            });
            this.disabled(this.options.disabled)
        },
        disabled: function (a) {
            if (typeof a === "boolean") this.options.disabled = a, this.$element[a ?
                "addClass" : "removeClass"](this.options.disabledClass);
            return this.options.disabled
        }
    });
    a.fn.wpButton = function (a) {
        this.each(function () {
            new b.Widget.Button(this, a)
        });
        return this
    }
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.RadioGroup", b.Widget, {
        _widgetName: "radio-group",
        defaultOptions: {
            defaultIndex: 0,
            hoverClass: "wp-radio-hover",
            downClass: "wp-radio-down",
            disabledClass: "wp-radio-disabled",
            checkedClass: "wp-radio-checked",
            disabled: !1,
            toggleStateEnabled: !1
        },
        _attachBehavior: function () {
            var a = this;
            this.buttons = [];
            this.activeElement = null;
            this.activeIndex = -1;
            this.$element.each(function () {
                a.buttons.push(a._addButtonBehavior(this))
            });
            this.disabled(this.options.disabled)
        },
        _addButtonBehavior: function (a) {
            var d =
                this,
                g = new b.Widget.Button(a, {
                    hoverClass: this.options.hoverClass,
                    downClass: this.options.downClass,
                    disabledClass: this.options.disabledClass,
                    callback: function (b) {
                        return d._handleClick(b, g, a)
                    }
                });
            return g
        },
        _handleClick: function (a, b, g) {
            this.options.disabled || this.checkButton(g)
        },
        _getElementIndex: function (b) {
            return b ? a.inArray(b, this.$element.get()) : -1
        },
        _getElementByIndex: function (a) {
            return a >= 0 ? this.$element.eq(a)[0] : null
        },
        _getElement: function (a) {
            return typeof a === "number" ? this._getElementByIndex(a) : a
        },
        checkButton: function (b) {
            var b = this._getElement(b),
                d = this.activeElement,
                g = this.options.checkedClass;
            b !== d ? (d && a(d).removeClass(g), b && a(b).addClass(g)) : this.options.toggleStateEnabled && b && (a(b).removeClass(g), b = null);
            this.activeElement = b;
            this.activeIndex = this._getElementIndex(b)
        },
        disabled: function (b) {
            if (typeof b === "boolean") this.disabled = b, a.each(this.buttons, function () {
                this.disabled(b)
            });
            return this.options.disabled
        }
    });
    a.fn.wpRadioGroup = function (a) {
        new b.Widget.RadioGroup(this, a);
        return this
    }
})(jQuery,
    WebPro, window, document);
(function (a, b) {
    b.widget("Widget.TabGroup", b.Widget.RadioGroup, {
        defaultOptions: {
            defaultIndex: 0,
            hoverClass: "wp-tab-hover",
            downClass: "wp-tab-down",
            disabledClass: "wp-tab-disabled",
            checkedClass: "wp-tab-active",
            disabled: !1,
            toggleStateEnabled: !1
        },
        selectTab: function (a) {
            this.checkButton(a)
        },
        checkButton: function (a) {
            var b = this._getElement(a),
                g = this._getElementIndex(b),
                b = {
                    tab: b,
                    tabIndex: g
                };
            this.trigger("wp-tab-before-select", b);
            this._super.prototype.checkButton.apply(this, arguments);
            this.trigger("wp-tab-select", b)
        }
    });
    a.fn.wpTabGroup = function (a) {
        new b.Widget.TabGroup(this, a);
        return this
    }
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.PanelGroup", b.Widget, {
        _widgetName: "panel-group",
        defaultOptions: {
            defaultIndex: 0,
            panelClass: "wp-panel",
            activeClass: "wp-panel-active",
            toggleStateEnabled: !1,
            tabGroups: null
        },
        _setUp: function () {
            var a = this;
            this.tabGroups = [];
            this._tabCallback = function (b, g) {
                a._handleTabSelect(b, g)
            };
            this.showLock = 0;
            this.tabDriver = null;
            return this._super.prototype._setUp.apply(this, arguments)
        },
        _attachBehavior: function () {
            this.activeElement = null;
            this.activeIndex = -1;
            this.$element.addClass(this.options.panelClass);
            var a = this.options.defaultIndex;
            typeof a === "number" && a >= 0 && this.showPanel(a);
            this.addTabGroup(this.options.tabGroups)
        },
        _getElementIndex: function (b) {
            return b ? a.inArray(b, this.$element.get()) : -1
        },
        _getElementByIndex: function (a) {
            return this.$element.eq(a)[0]
        },
        _getElement: function (a) {
            return typeof a === "number" ? this._getElementByIndex(a) : a
        },
        showPanel: function (b) {
            if (!this.showLock) {
                ++this.showLock;
                var d = this._getElement(b),
                    g = this.activeElement,
                    f = this.options.activeClass;
                if (d)
                    if (d !== g) {
                        b = {
                            panel: d,
                            panelIndex: this._getElementIndex(d)
                        };
                        this.trigger("wp-panel-before-show", b);
                        g && this.hidePanel(g);
                        a(d).addClass(f);
                        this.activeElement = d;
                        this.activeIndex = this._getElementIndex(d);
                        d = this.tabGroups;
                        for (g = 0; g < d.length; g++) f = d[g], f !== this.tabDriver && f.selectTab(this.activeIndex);
                        this.trigger("wp-panel-show", b)
                    } else this.options.toggleStateEnabled && this.hidePanel(d);
                --this.showLock
            }
        },
        hidePanel: function (b) {
            if (b = typeof b === "number" ? this.$element.eq(b)[0] : b) {
                var d = {
                    panel: b,
                    panelIndex: this._getElementIndex(b)
                };
                this.trigger("wp-panel-before-hide",
                    d);
                a(b).removeClass(this.options.activeClass);
                if (b === this.activeElement) this.activeElement = null, this.activeIndex = -1;
                this.trigger("wp-panel-hide", d)
            }
        },
        _handleTabSelect: function (a, b) {
            if (!this.showLock) this.tabDriver = a.target, this.showPanel(b.tabIndex), this.tabDriver = null
        },
        addTabGroup: function (c) {
            if (c)
                for (var c = b.ensureArray(c), d = c.length, g = 0; g < d; g++) {
                    var f = c[g];
                    a.inArray(this.tabGroups, f) === -1 && (this.tabGroups.push(f), f.selectTab(this.activeIndex), f.bind("wp-tab-select", this._tabCallback))
                }
        },
        removeTabGroup: function (c) {
            for (var c =
                    b.ensureArray(c), d = c.length, g = 0; g < d; g++) {
                var f = c[g];
                sets = this.tabGroups;
                loc = a.inArray(sets, f);
                loc !== -1 && sets.splice(loc, 1)
            }
        }
    });
    a.fn.wpPanelGroup = function (a) {
        new b.Widget.PanelGroup(this, a);
        return this
    }
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.Disclosure", b.Widget, {
        defaultOptions: {
            widgetClassName: "wp-disclosure-panels",
            tabClassName: "wp-disclosure-panels-tab",
            tabHoverClassName: "wp-disclosure-panels-tab-hover",
            tabDownClassName: "wp-disclosure-panels-tab-down",
            panelClassName: "wp-disclosure-panels-panel",
            tabActiveClassName: "wp-disclosure-panels-tab-active",
            panelActiveClassName: "wp-disclosure-panels-panel-active",
            defaultIndex: 0,
            toggleStateEnabled: !1
        },
        _attachBehavior: function () {
            var a = this.$element[0],
                d = this.options.widgetClassName,
                g = b.scopedFind(a, "." + this.options.tabClassName, d, a),
                a = b.scopedFind(a, "." + this.options.panelClassName, d, a);
            this.tabs = new b.Widget.TabGroup(g, {
                hoverClass: this.options.tabHoverClassName,
                downClass: this.options.tabDownClassName,
                checkedClass: this.options.tabActiveClassName,
                toggleStateEnabled: this.options.toggleStateEnabled
            });
            this.panels = new b.Widget.PanelGroup(a, {
                panelClass: this.options.panelClassName,
                activeClass: this.options.panelActiveClassName,
                defaultIndex: this.options.defaultIndex,
                toggleStateEnabled: this.options.toggleStateEnabled
            });
            this.panels.addTabGroup(this.tabs)
        }
    });
    b.widget("Widget.TabbedPanels", b.Widget.Disclosure, {
        defaultOptions: {
            widgetClassName: "wp-tabbed-panels-panels",
            tabClassName: "wp-tabbed-panels-panels-tab",
            tabHoverClassName: "wp-tabbed-panels-panels-tab-hover",
            tabDownClassName: "wp-tabbed-panels-panels-tab-down",
            tabActiveClassName: "wp-tabbed-panels-panels-tab-active",
            panelClassName: "wp-tabbed-panels-panels-panel",
            panelActiveClassName: "wp-tabbed-panels-panels-panel-active",
            toggleStateEnabled: !1
        }
    });
    b.widget("Widget.Accordion",
        b.Widget.Disclosure, {
            defaultOptions: {
                widgetClassName: "wp-accordion",
                tabClassName: "wp-accordion-tab",
                tabHoverClassName: "wp-accordion-tab-hover",
                tabDownClassName: "wp-accordion-tab-down",
                tabActiveClassName: "wp-accordion-tab-active",
                panelClassName: "wp-accordion-panel",
                panelActiveClassName: "wp-accordion-panel-active",
                toggleStateEnabled: !1
            }
        })
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.Widget.Disclosure.DisplayPropertyTransitionPlugin = {
        defaultOptions: {},
        initialize: function (b, d) {
            var g = this;
            a.extend(d, a.extend({}, g.defaultOptions, d));
            b.bind("attach-behavior", function () {
                g._attachBehavior(b)
            })
        },
        _attachBehavior: function (a) {
            var a = a.panels,
                b = a.$element,
                g = a.activeIndex;
            a.bind("wp-panel-show", function (a, b) {
                b.panel.style.display = "block"
            });
            a.bind("wp-panel-hide", function (a, b) {
                b.panel.style.display = "none"
            });
            b.each(function (a) {
                this.style.display = a !== g ? "none" : "block"
            })
        }
    };
    b.Widget.Disclosure.AccordionTransitionPlugin = {
        defaultOptions: {
            transitionDirection: "vertical",
            transitionDuration: 500,
            dispatchTransitionEvents: !0
        },
        initialize: function (b, d) {
            var g = this;
            a.extend(d, a.extend({}, g.defaultOptions, d));
            b.bind("attach-behavior", function () {
                g._attachBehavior(b)
            })
        },
        _attachBehavior: function (b) {
            var d = this,
                g = b.panels,
                f = g.$element,
                l = g.activeIndex,
                h = b.options.transitionDirection,
                k = b.options.widgetClassName === "AccordionWidget" ? a(f[0]).closest("*[data-rotate]") : null;
            if (k && k.length > 0) b.options.marginBottom = Muse.Utils.getCSSIntValue(k,
                "margin-bottom"), b.options.originalHeight = k[0].scrollHeight;
            b.options.rotatedAccordion = k;
            g.bind("wp-panel-show", function (a, f) {
                d._showPanel(b, f)
            });
            g.bind("wp-panel-hide", function (a, f) {
                d._hidePanel(b, f)
            });
            f.each(function (b) {
                if (b !== l) {
                    a(this).css("overflow", "hidden");
                    if (h === "vertical" || h === "both") this.style.height = "0";
                    if (h === "horizontal" || h === "both") this.style.width = "0"
                }
            })
        },
        _updateMarginBottomForRotatedAccordion: function (a) {
            a.options.rotatedAccordion.css("margin-bottom", Math.round(a.options.marginBottom -
                (a.options.rotatedAccordion[0].scrollHeight - a.options.originalHeight)) + "px")
        },
        _transitionPanel: function (b, d, g) {
            a("body").trigger("wp-page-height-change", d - b);
            if ((b = g.options.rotatedAccordion) && b.length > 0) {
                if (g.options.originalHeight == 0 && "undefined" !== typeof d) g.options.marginBottom = Muse.Utils.getCSSIntValue(b, "margin-bottom"), g.options.originalHeight = b[0].scrollHeight;
                this._updateMarginBottomForRotatedAccordion(g)
            }
        },
        _showPanel: function (b, d) {
            var g = b.options,
                f = g.transitionDirection,
                l = a(d.panel),
                h = {},
                k = g.dispatchTransitionEvents,
                i = this,
                j = l.height(),
                n = function (a) {
                    a = parseInt(a.elem.style.height);
                    i._transitionPanel(j, a, b);
                    j = a
                };
            if (f === "vertical" || f === "both") h.height = l[0].scrollHeight + "px";
            if (f === "horizontal" || f === "both") h.width = l[0].scrollWidth + "px";
            l.stop(!0, !0).queue("animationFrameFx", a.animationFrameFx).animate(h, {
                duration: g.transitionDuration,
                progress: k ? n : null,
                queue: "animationFrameFx",
                complete: function () {
                    var a = {
                        overflow: ""
                    };
                    if (f === "vertical" || f === "both") a.height = "auto";
                    if (f === "horizontal" || f ===
                        "both") a.width = "auto";
                    l.css(a);
                    (a = b.options.rotatedAccordion) && a.length > 0 && i._updateMarginBottomForRotatedAccordion(b)
                }
            }).dequeue("animationFrameFx")
        },
        _hidePanel: function (b, d) {
            var g = b.options,
                f = g.transitionDirection,
                l = a(d.panel),
                h = {},
                k = g.dispatchTransitionEvents,
                i = this,
                j = l.height(),
                n = function (a) {
                    a = parseInt(a.elem.style.height);
                    i._transitionPanel(j, a, b);
                    j = a
                };
            if (f === "vertical" || f === "both") h.height = "0";
            if (f === "horizontal" || f === "both") h.width = "0";
            l.stop(!0, !0).queue("animationFrameFx", a.animationFrameFx).animate(h, {
                duration: g.transitionDuration,
                queue: "animationFrameFx",
                progress: k ? n : null,
                complete: function () {
                    l.css("overflow", "hidden");
                    var a = b.options.rotatedAccordion;
                    a && a.length > 0 && i._updateMarginBottomForRotatedAccordion(b)
                }
            }).dequeue("animationFrameFx")
        }
    }
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.SlideShowBase", b.Widget, {
        _widgetName: "slideshow-base",
        defaultOptions: {
            displayInterval: 6E3,
            autoPlay: !1,
            loop: !0,
            playOnce: !1
        },
        _setUp: function () {
            var a = this;
            this._ssTimer = 0;
            this._ssTimerTriggered = !1;
            this._ssTimerCallback = function () {
                a._ssTimerTriggered = !0;
                a.next();
                a._ssTimerTriggered = !1
            };
            return b.Widget.prototype._setUp.apply(this, arguments)
        },
        _ready: function () {
            this.options.autoPlay && this.play()
        },
        play: function (a) {
            e = this.trigger("wp-slideshow-before-play");
            e.isDefaultPrevented() ||
                (this._startTimer(!1, a), this.trigger("wp-slideshow-play"))
        },
        stop: function () {
            e = this.trigger("wp-slideshow-before-stop");
            e.isDefaultPrevented() || (this._stopTimer(), this.trigger("wp-slideshow-stop"))
        },
        isPlaying: function () {
            return this._ssTimer !== 0
        },
        _startTimer: function (a, b) {
            this._stopTimer();
            var g = b ? 0 : this.options.displayInterval;
            a && (g += this.options.transitionDuration);
            this._ssTimer = setTimeout(this._ssTimerCallback, g)
        },
        _stopTimer: function () {
            this._ssTimer && clearTimeout(this._ssTimer);
            this._ssTimer = 0
        },
        _executeCall: function (a, b) {
            e = this.trigger("wp-slideshow-before-" + a);
            e.isDefaultPrevented() || (this["_" + a].apply(this, b) && this.stop(), this.isPlaying() && this._startTimer(!0), this.trigger("wp-slideshow-" + a))
        },
        first: function () {
            return this._executeCall("first", arguments)
        },
        last: function () {
            return this._executeCall("last", arguments)
        },
        previous: function () {
            return this._executeCall("previous", arguments)
        },
        next: function () {
            return this._executeCall("next", arguments)
        },
        goTo: function () {
            return this._executeCall("goTo",
                arguments)
        },
        close: function () {
            return this._executeCall("close", arguments)
        },
        _first: function () {},
        _last: function () {},
        _previous: function () {},
        _next: function () {},
        _goTo: function () {},
        _close: function () {}
    })
})(jQuery, WebPro, window, document);
(function (a, b) {
    b.widget("Widget.ContentSlideShow", b.Widget.SlideShowBase, {
        _widgetName: "content-slideshow",
        defaultOptions: {
            slideshowClassName: "wp-slideshow",
            clipClassName: "wp-slideshow-clip",
            viewClassName: "wp-slideshow-view",
            slideClassName: "wp-slideshow-slide",
            slideLinkClassName: "wp-slideshow-slide-link",
            firstBtnClassName: "wp-slideshow-first-btn",
            lastBtnClassName: "wp-slideshow-last-btn",
            prevBtnClassName: "wp-slideshow-prev-btn",
            nextBtnClassName: "wp-slideshow-next-btn",
            playBtnClassName: "wp-slideshow-play-btn",
            stopBtnClassName: "wp-slideshow-stop-btn",
            closeBtnClassName: "wp-slideshow-close-btn",
            playingClassName: "wp-slideshow-playing"
        },
        _findWidgetElements: function (a) {
            var d = this.$element[0];
            return b.scopedFind(d, a, this.options.slideshowClassName, d)
        },
        _attachBtnHandler: function (a, b) {
            var g = this;
            this["$" + b + "Btn"] = this._findWidgetElements("." + a).bind("click", function (a) {
                g[b]();
                a.preventDefault()
            })
        },
        _getAjaxSrcForImage: function (a) {
            return a.data("src")
        },
        _reprioritizeImageLoadingIfRequired: function (b) {
            !this._isLoaded(b) &&
                this._cssilLoader && !this._cssilLoader.isQueueEmpty() && (b = a(this.slides.$element[b]), this._cssilLoader.reprioritize(this._getAjaxSrcForImage(b.is("img") ? b : b.find("img")), this.isPlaying()))
        },
        _attachBehavior: function () {
            var a = this,
                d = this.options;
            this._super.prototype._attachBehavior.call(this);
            this._panelShowCallback = function () {
                a._ssTimerTriggered || a.isPlaying() && a._startTimer(!1)
            };
            this.$element.addClass(d.slideshowClassName);
            var g = this._findWidgetElements("." + d.slideClassName),
                f = this._findWidgetElements("." +
                    d.slideLinkClassName),
                l = d.event === "click" && d.deactivationEvent === "mouseout_click";
            this.slides = new b.Widget.PanelGroup(g, {
                defaultIndex: d.defaultIndex || 0,
                toggleStateEnabled: l
            });
            this.slides.bind("wp-panel-show", this._panelShowCallback);
            this.tabs = null;
            if (f.length) this.tabs = new b.Widget.TabGroup(f, {
                defaultIndex: d.defaultIndex || 0,
                toggleStateEnabled: l
            }), this.slides.addTabGroup(this.tabs);
            this.slides.bind("wp-panel-before-show", function (b, f) {
                a._reprioritizeImageLoadingIfRequired(f.panelIndex)
            });
            this._attachBtnHandler(d.firstBtnClassName,
                "first");
            this._attachBtnHandler(d.lastBtnClassName, "last");
            this._attachBtnHandler(d.prevBtnClassName, "previous");
            this._attachBtnHandler(d.nextBtnClassName, "next");
            this._attachBtnHandler(d.playBtnClassName, "play");
            this._attachBtnHandler(d.stopBtnClassName, "stop");
            this._attachBtnHandler(d.closeBtnClassName, "close");
            this.bind("wp-slideshow-play", function () {
                this.$element.addClass(d.playingClassName)
            });
            this.bind("wp-slideshow-stop", function () {
                this.$element.removeClass(d.playingClassName)
            })
        },
        _first: function () {
            this.slides.showPanel(0)
        },
        _last: function () {
            var a = this.slides;
            a.showPanel(a.$element.length - 1)
        },
        _previous: function () {
            var a = this.slides,
                b = a.$element.length,
                g = a.activeIndex,
                b = (g < 1 ? b : g) - 1;
            !this.options.loop && 0 == g ? this.isPlaying() && this.stop() : a.showPanel(b)
        },
        _next: function () {
            var a = this.slides,
                b = a.activeIndex,
                g = (b + 1) % a.$element.length;
            !this.options.loop && 0 == g ? this.isPlaying() && this.stop() : this.options.playOnce && 0 == g && this.isPlaying() ? this.stop() : (!this.isPlaying() || this._isLoaded(b) && this._isLoaded(g)) && a.showPanel(g)
        },
        _goTo: function () {
            var a =
                this.slides;
            a.showPanel.apply(a, arguments)
        },
        _close: function () {
            var a = this.slides;
            a.hidePanel(a.activeElement)
        },
        _isLoaded: function (b) {
            if (this._csspIsImageSlideShow && (b = a(this.slides.$element[b]), b = b.is("img") ? b : b.find("img"), b.length > 0 && (b.hasClass(this.options.imageIncludeClassName) || !b[0].complete))) return !1;
            return !0
        }
    })
})(jQuery, WebPro, window, document);
(function (a, b, c, d, g) {
    b.Widget.ContentSlideShow.fadingTransitionPlugin = {
        defaultOptions: {
            transitionDuration: 500
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b.bind("attach-behavior", function () {
                d.attachBehavior(b)
            })
        },
        attachBehavior: function (f) {
            var l = this,
                h = f.slides,
                k = h.$element,
                i = h.activeIndex,
                j = f._findWidgetElements("." + f.options.viewClassName);
            h.bind("wp-panel-show", function (b, c) {
                l._showElement(f, a(c.panel));
                f.options.contentLayout_runtime === "stack" && l._showElement(f,
                    f.$closeBtn)
            }).bind("wp-panel-hide", function (b, c) {
                l._hideElement(f, a(c.panel))
            });
            f.options.contentLayout_runtime === "stack" && f.bind("wp-slideshow-close", function () {
                l._hideElement(f, f.$closeBtn)
            });
            for (var n = 0; n < k.length; n++)
                if (n !== i) k[n].style.display = "none";
            if (f.options.elastic === "fullWidth") {
                var o = a(c),
                    p = a(d.body),
                    r = function (b) {
                        b === g && (b = Math.max(o.width(), parseInt(p.css("min-width"))));
                        f.options.contentLayout_runtime !== "lightbox" && j.css("left", j.position().left - j.offset().left);
                        j.width(b);
                        l._showElement(f,
                            a(h.activeElement))
                    };
                r();
                for (n = 0; n < k.length; n++) {
                    var m = a(k[n]);
                    m.width("100%");
                    m.addClass("borderbox")
                }
                if (f.options.contentLayout_runtime === "lightbox") f._fstpPositionSlides = r;
                else o.on("orientationchange resize", function () {
                    r()
                })
            }
            i === -1 && f.options.contentLayout_runtime === "stack" && f.$closeBtn.hide();
            if (Muse.Browser.Features.Touch && f.options.enableSwipe === !0) {
                var q = f.options.transitionDuration;
                f._ftpSwipeNoInterrupt = !1;
                k.each(function () {
                    var c = a(this);
                    c.data("opacity", c.css("opacity"));
                    var d = Muse.Utils.getCanvasDirection(c,
                            "horizontal"),
                        h = d.dir === "horizontal",
                        g = d.reverse;
                    if (d = c.swipe.defaults.excludedElements) {
                        var d = d.split(/\s*,\s*/),
                            i = d.indexOf("a");
                        if (0 <= i) d.splice(i, 1), c.swipe.defaults.excludedElements = d.join(", ")
                    }
                    c.swipe({
                        triggerOnTouchEnd: !0,
                        allowPageScroll: h ? "vertical" : "horizontal",
                        threshold: 75,
                        swipeStatus: function (a, d, i, o) {
                            if (d == "start") f.stop();
                            else if (d == "move" && (h && (i == "left" || i == "right") || !h && (i == "up" || i == "down"))) !b.hasPointerCapture() && Math.abs(o) > 1 && b.setPointerCapture(c[0], a), l._scrollTo(f, -1, o * (!g &&
                                (i == "left" || i == "up") || g && (i == "right" || i == "down") ? 1 : -1), 0);
                            else if (d == "cancel") l._scrollTo(f, f.slides.activeIndex, 0, q), b.releasePointerCapture(c[0], a), f.trigger("wp-swiped");
                            else if (d == "end") {
                                d = f.slides.activeIndex;
                                o = -1;
                                if (h && (i == "right" && !g || i == "left" && g) || !h && (i == "down" && !g || i == "up" && g)) o = d - 1 < 0 ? k.length - 1 : d - 1;
                                else if (h && (i == "left" && !g || i == "right" && g) || !h && (i == "up" && !g || i == "down" && g)) o = d + 1 > k.length - 1 ? 0 : d + 1;
                                o != -1 && l._scrollTo(f, o, 0, q);
                                b.releasePointerCapture(c[0], a);
                                f.trigger("wp-swiped")
                            }
                        }
                    })
                })
            }
        },
        _showElement: function (a, b) {
            var c = !1,
                d = function () {
                    c || (c = !0, b.show().css("opacity", ""))
                },
                g = setTimeout(d, a.options.transitionDuration + 10);
            b.stop(!1, !0).fadeIn(a.options.transitionDuration, function () {
                clearTimeout(g);
                d()
            })
        },
        _hideElement: function (a, b) {
            var c = !1,
                d = function () {
                    c || (c = !0, b.hide().css("opacity", ""))
                },
                g = setTimeout(d, a.options.transitionDuration + 10);
            b.stop(!1, !0).fadeOut(a.options.transitionDuration, function () {
                clearTimeout(g);
                d()
            })
        },
        _scrollTo: function (b, c, d, g) {
            if (!b._ftpSwipeNoInterrupt) {
                var i =
                    b.slides.$element,
                    j = b.slides.activeIndex,
                    n = c == -1;
                c == -1 && (c = d < 0 ? j - 1 < 0 ? i.length - 1 : j - 1 : j + 1 > i.length - 1 ? 0 : j + 1);
                var o = a(i[j]),
                    p = a(i[c]);
                if (!n && d == 0 || j == c) {
                    b._ftpSwipeNoInterrupt = !0;
                    var r = 0,
                        m = !1,
                        q = function () {
                            if (!m && (m = !0, p.show().css("opacity", ""), c != j && b.slides.showPanel(c), ++r == i.length)) b._ftpSwipeNoInterrupt = !1
                        };
                    if (p.css("opacity") != p.data("opacity")) {
                        var u = setTimeout(q, g + 10);
                        p.stop(!1, !0).animate({
                            opacity: p.data("opacity")
                        }, g, function () {
                            clearTimeout(u);
                            q()
                        })
                    } else q();
                    i.each(function (d) {
                        var h = a(this),
                            o = !1,
                            j = function () {
                                if (!o && (o = !0, h.hide().css("opacity", ""), ++r == i.length)) b._ftpSwipeNoInterrupt = !1
                            },
                            p;
                        d != c && (h.css("display") != "none" && h.css("opacity") != 0 ? (p = setTimeout(j, g + 10), h.stop(!1, !0).animate({
                            opacity: 0
                        }, g, function () {
                            clearTimeout(p);
                            j()
                        })) : j())
                    })
                } else d = Math.abs(d), n = o.width(), d > n && (d = n), d = p.data("opacity") * (d / n), n = o.data("opacity") * (1 - d), o.stop(!1, !0).animate({
                    opacity: n
                }, g), p.stop(!1, !0).show().animate({
                    opacity: d
                }, g)
            }
        }
    };
    b.Widget.ContentSlideShow.filmstripTransitionPlugin = {
        defaultOptions: {
            transitionDuration: 500,
            transitionStyle: "horizontal"
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b.bind("attach-behavior", function () {
                d.attachBehavior(b)
            })
        },
        attachBehavior: function (f) {
            var l = this,
                h = a(c),
                k = a(d.body),
                i = f.options,
                j = function () {
                    return i.elastic === "fullWidth" ? Math.max(h.width(), parseInt(k.css("min-width"))) : r.width()
                },
                n = i.transitionStyle === "horizontal",
                o = f.slides,
                p = o.$element,
                r = f._findWidgetElements("." + i.clipClassName),
                m = f._findWidgetElements("." + i.viewClassName),
                q = j(),
                u = r.height(),
                D = {
                    left: 1,
                    right: 1
                },
                E = {
                    up: 1,
                    down: 1
                },
                B = {
                    top: "0",
                    left: "0"
                },
                v = r.css("position");
            v !== "absolute" && v !== "fixed" && i.elastic !== "fullScreen" && r.css("position", "relative");
            m.css("position") !== "absolute" && (B.position = "relative");
            f._fstpOffsetSize = n ? j() : r.height();
            f._fstp$Clip = r;
            f._fstp$View = m;
            f._fstpStyleProp = n ? "left" : "top";
            f._fstpStylePropZero = n ? "top" : "left";
            o.bind("wp-panel-show", function (a, b) {
                l._goToSlide(f, b.panel, i.transitionDuration);
                f.options.contentLayout_runtime === "stack" && f.$closeBtn.stop(!0).fadeIn(i.transitionDuration)
            });
            f.options.contentLayout_runtime === "stack" && f.bind("wp-slideshow-close", function () {
                r.css({
                    opacity: 0.99
                }).stop(!0).animate({
                    opacity: 0
                }, {
                    queue: !1,
                    duration: i.transitionDuration,
                    complete: function () {
                        B[f._fstpStyleProp] = (n ? r.width() : r.height()) + "px";
                        B[f._fstpStylePropZero] = "0";
                        m.css(B);
                        r.css({
                            opacity: ""
                        })
                    }
                });
                f.$closeBtn.stop(!0).fadeOut(i.transitionDuration)
            });
            f._fstpRequestType = null;
            f.bind("wp-slideshow-before-previous wp-slideshow-before-next", function (a) {
                f._fstpRequestType = a.type.replace(/.*-/, "");
                f._fstpOldActiveIndex =
                    f.slides.activeIndex
            }).bind("wp-slideshow-previous wp-slideshow-next", function () {
                f._fstpRequestType = null;
                f._fstpOldActiveIndex = -1
            });
            var A = function (a, b) {
                    if (a === g || b === g) a = j(), b = r.height();
                    i.elastic === "fullWidth" && (b = r.height(), r.width(a), i.contentLayout_runtime !== "lightbox" && r.css("left", r.position().left - r.offset().left), m.width(a));
                    for (var c = 0, d = n ? a : b, h = f._fstpStyleProp, k = f._fstpStylePropZero, q = 0; q < p.length; q++) {
                        var u = p[q].style;
                        u[k] = "0";
                        u[h] = c + "px";
                        u.margin = "0";
                        u.position = "absolute";
                        c += d
                    }
                    l._goToSlide(f,
                        o.activeElement, 0);
                    return c
                },
                v = A();
            if (i.elastic === "fullWidth")
                for (var x = 0; x < p.length; x++) {
                    var s = a(p[x]);
                    s.width("100%");
                    s.addClass("borderbox")
                }
            if (i.elastic !== "off")
                if (i.contentLayout_runtime === "lightbox") f._fstpPositionSlides = A;
                else h.on("orientationchange resize", function () {
                    A()
                });
            else B[n ? "width" : "height"] = v + "px", B[n ? "height" : "width"] = (n ? u : q) + "px";
            o.activeElement || (B[f._fstpStyleProp] = (n ? q : u) + "px", B[f._fstpStylePropZero] = "0", f.options.contentLayout_runtime === "stack" && f.$closeBtn.hide());
            B.overflow =
                "visible";
            m.css(B);
            l._goToSlide(f, o.activeElement, i.transitionDuration);
            Muse.Browser.Features.Touch && f.options.enableSwipe === !0 && (a(this), m.swipe({
                triggerOnTouchEnd: !0,
                allowPageScroll: n ? "vertical" : "horizontal",
                threshold: 75,
                swipeStatus: function (a, c, d, g) {
                    var h = Muse.Utils.getCanvasDirection(m, i.transitionStyle).reverse,
                        h = !h && (d == "left" || d == "up") || h && (d == "right" || d == "down") ? 1 : -1;
                    switch (c) {
                        case "start":
                            f.stop();
                            break;
                        case "move":
                            if (n && d in D || !n && d in E) !b.hasPointerCapture() && Math.abs(g) > 1 && b.setPointerCapture(m[0],
                                a), l._scrollBy(f, g * h);
                            break;
                        case "cancel":
                            l._goToSlide(f, o.activeElement, 0);
                            b.releasePointerCapture(m[0], a);
                            f.trigger("wp-swiped");
                            break;
                        case "end":
                            l._finalizeSwipe(f, f._fstpOffsetSize * f.slides.activeIndex + g * h, h, d), b.releasePointerCapture(m[0], a)
                    }
                }
            }))
        },
        _scrollBy: function (a, b) {
            var c = a._fstp$View,
                d = a.slides.activeIndex * -a._fstpOffsetSize,
                g = a._fstpStyleProp,
                j = {};
            c.stop(!1, !0);
            j[g] = d - b + "px";
            c.css(j)
        },
        _finalizeSwipe: function (a, b, c) {
            var d = a.slides,
                g = a._fstp$View,
                j = b / a._fstpOffsetSize,
                b = a._fstpStyleProp,
                n = {},
                j = c === 1 ? Math.ceil(j) : Math.floor(j),
                j = Math.max(0, Math.min(j, d.$element.length - 1));
            n[b] = -(j * a._fstpOffsetSize) + "px";
            g.animate(n, a.options.transitionDuration, function () {
                d.showPanel(j);
                a.trigger("wp-swiped")
            })
        },
        _goToSlide: function (b, c, d) {
            if (b) {
                var g = a(c),
                    i = b._fstp$View,
                    j = b._fstpStyleProp,
                    n = j === "left" ? "offsetLeft" : "offsetTop",
                    o = j === "left" ? "offsetWidth" : "offsetHeight",
                    p = c ? -c[n] : b._fstp$Clip[0][o],
                    r = {};
                r[j] = p + "px";
                var m = b._fstpRequestType,
                    q = b._fstpOldActiveIndex;
                if (m && q !== -1) {
                    var u = b.slides.activeIndex,
                        D = b.slides.$element.length - 1;
                    if (u !== q) {
                        var E = 0;
                        m === "previous" && q === 0 && u === D ? E = -c[o] : m === "next" && q === D && u === 0 && (b = b.slides.$element[q], E = b[n] + b[o]);
                        E && (r[j] = -E + "px", g.css(j, E + "px"))
                    }
                }
                i.stop(!1, !0).animate(r, d, function () {
                    E && (g.css(j, -p + "px"), i.css(j, p + "px"))
                })
            }
        }
    };
    b.Widget.ContentSlideShow.alignPartsToPagePlugin = {
        defaultOptions: {
            alignPartToPageClassName: "wp-slideshow-align-part-to-page"
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions, c));
            b.bind("attach-behavior", function () {
                d.attachBehavior(b)
            })
        },
        attachBehavior: function (b) {
            if (!("fullWidth" !== b.options.elastic || !b.$element.hasClass("align_parts_to_page") || "fixed" !== b.$element.css("position") || b.options.contentLayout_runtime === "lightbox")) {
                var d = a(c),
                    g = a("#page"),
                    k = b.options,
                    i = function () {
                        var c = g.offset().left + "px";
                        a("." + k.alignPartToPageClassName, b.$element).each(function () {
                            a(this).css("margin-left", c)
                        })
                    };
                b.$element.children().each(function () {
                    var b = a(this);
                    0 < a("." + k.viewClassName, b).length || b.addClass(k.alignPartToPageClassName)
                });
                i();
                d.on("orientationchange resize",
                    function () {
                        i()
                    })
            }
        }
    };
    b.Widget.ContentSlideShow.slideImageIncludePlugin = {
        defaultOptions: {
            imageIncludeClassName: "wp-slideshow-slide-image-include",
            slideLoadingClassName: "wp-slideshow-slide-loading"
        },
        initialize: function (c, d) {
            var g = this;
            a.extend(d, a.extend({}, g.defaultOptions, d));
            c._cssilLoader = new b.ImageLoader;
            c.bind("attach-behavior", function () {
                g._attachBehavior(c)
            })
        },
        _attachBehavior: function (a) {
            for (var b = this, c = a._cssilLoader, d = a._findWidgetElements("." + a.options.slideClassName), g = d.length, j = "." + a.options.imageIncludeClassName,
                    n = a.options.slideLoadingClassName, o = function (c, d, g, h) {
                        b._handleImageLoad(a, c, d, g, h)
                    }, p = 0; p < g; p++) {
                var r = d.eq(a._shuffleArray ? a._shuffleArray[p] : p),
                    m = r.is("img") ? r : r.find(j),
                    q = m[0];
                if (q) {
                    var u = a._getAjaxSrcForImage(m) || q.href;
                    if (u) m = {
                        width: m.data("width"),
                        height: m.data("height"),
                        $ele: m,
                        $slide: r
                    }, q.style.visibility = "hidden", c.add(u, {
                        callback: o,
                        data: m
                    }), r.addClass(n)
                }
            }
            a._cssilLoader.start()
        },
        _handleImageLoad: function (a, b, c, d, g) {
            var j = g.$ele,
                n = j[0];
            n.src = b;
            a.options.elastic !== "off" ? (j.data("imageWidth",
                c), j.data("imageHeight", d), a._csspPositionImage(n, a.options.heroFitting, a.options.elastic, c, d)) : (n.width = g.width || c, n.height = g.height || d);
            n.style.visibility = "";
            j.removeClass(a.options.imageIncludeClassName);
            g.$slide.removeClass(a.options.slideLoadingClassName);
            a.isPlaying() && a.slides.$element[a.slides.activeIndex] == g.$slide[0] && a._startTimer(!1)
        }
    };
    b.Widget.ContentSlideShow.shufflePlayPlugin = {
        defaultOptions: {
            randomDefaultIndex: !0
        },
        initialize: function (b, c) {
            var d = this;
            a.extend(c, a.extend({}, d.defaultOptions,
                c));
            b._shuffleArray = [];
            b._shuffleNextDict = {};
            b._realNext = b._next;
            b._next = function () {
                d._handleNext(b)
            };
            b._shufflePlayCount = 1;
            b.bind("before-attach-behavior", function () {
                d._reshuffle(b);
                if (c.randomDefaultIndex && typeof c.defaultIndex === "undefined") b.options.defaultIndex = b._shuffleArray[0]
            })
        },
        _fisherYatesArrayShuffle: function (a) {
            if (a && a.length)
                for (var b = a.length; --b;) {
                    var c = Math.floor(Math.random() * (b + 1)),
                        d = a[c];
                    a[c] = a[b];
                    a[b] = d
                }
        },
        _reshuffle: function (a) {
            var b = a._shuffleArray,
                c = {},
                d = a.slides ? a.slides.$element.length :
                a._findWidgetElements("." + a.options.slideClassName).length;
            if (b.length !== d)
                for (var g = b.length = 0; g < d; g++) b[g] = g;
            this._fisherYatesArrayShuffle(b);
            for (g = 0; g < d; g++) c[b[g]] = b[(g + 1) % d];
            a._shuffleNextDict = c;
            a._shufflePlayCount = 1
        },
        _handleNext: function (a) {
            if (a.isPlaying()) {
                var b = a.slides.activeIndex,
                    c = a._shuffleNextDict[b] || 0;
                a._isLoaded(b) && a._isLoaded(c) && (a._goTo(c), ++a._shufflePlayCount >= a.slides.$element.length && (this._reshuffle(a), (!a.options.loop || a.options.playOnce) && a.stop()))
            } else a._realNext()
        }
    }
})(jQuery,
    WebPro, window, document);
(function (a, b, c) {
    b.widget("Widget.Form", b.Widget, {
        _widgetName: "form",
        defaultOptions: {
            validationEvent: "blur",
            errorStateSensitivity: "low",
            ajaxSubmit: !0,
            fieldWrapperClass: "field",
            formErrorClass: "form-error",
            formSubmittedClass: "form-submitted",
            formDeliveredClass: "form-delivered",
            focusClass: "focus",
            notEmptyClass: "not-empty",
            emptyClass: "empty",
            validClass: "valid",
            invalidClass: "invalid",
            requiredClass: "required"
        },
        validationTypes: {
            "always-valid": /.*/,
            email: /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
            alpha: /^[A-z\s]+$/,
            numeric: /^[0-9]+$/,
            phone: /^([0-9])?(\s)?(\([0-9]{3}\)|[0-9]{3}(\-)?)(\s)?[0-9]{3}(\s|\-)?[0-9]{4}(\s|\sext|\sx)?(\s)?[0-9]*$/,
            captcha: function (a) {
                return a.data("captchaValid")
            },
            recaptcha: function () {
                if ("undefined" == typeof Recaptcha) return !1;
                var a = Recaptcha.get_response();
                return a && 0 < a.length
            },
            checkbox: function () {
                return !0
            },
            checkboxgroup: function () {
                return !0
            },
            radio: function () {
                return !0
            },
            radiogroup: function () {
                return !0
            },
            time: function (a) {
                var a = a.find("input, textarea"),
                    b = a.val().replace(/[^0-9:APM]/g, "");
                if (b.indexOf(":") != -1 && b.match(/:/).length == 1) {
                    var c = b.split(":"),
                        l = parseInt(c[0]),
                        c = parseInt(c[1]);
                    if (l < 0 || l > 24) return !0;
                    if (c < 0 || c > 59) return !0
                } else return !1;
                a.val(b);
                return !0
            }
        },
        _transformMarkup: function () {
            var b = this;
            b.hasCAPTCHA = !1;
            b.hasReCAPTCHA = !1;
            this.$element.find("." + this.options.fieldWrapperClass).each(function () {
                var c = a(this);
                switch (c.attr("data-type")) {
                    case "captcha":
                        b.hasCAPTCHA = !0;
                        c.find('input[name="CaptchaV2"]').remove();
                        c.find('input[name="muse_CaptchaV2"]').attr("name", "CaptchaV2");
                        break;
                    case "recaptcha":
                        b.hasReCAPTCHA = !0
                }
            })
        },
        _extractData: function () {
            this.event = this.options.validationEvent;
            this.errorSensitivity = this.options.errorStateSensitivity;
            this.classNames = {
                focus: this.options.focusClass,
                blur: this.options.emptyClass,
                keydown: this.options.notEmptyClass
            }
        },
        _isEmpty: function (b) {
            var c = b.find("input, textarea");
            switch (b.data("type")) {
                case "checkboxgroup":
                case "radiogroup":
                    return b = c.attr("name"), a('input[name="' + b + '"]:checked').length == 0;
                case "checkbox":
                case "radio":
                    return typeof c.attr("checked") ===
                        "undefined";
                default:
                    return c.val() == ""
            }
        },
        _getGroupField: function (b) {
            switch (b.data("type")) {
                case "radio":
                    return b.parent().closest("." + this.options.fieldWrapperClass).filter(function () {
                        return "radiogroup" == a(this).data("type")
                    });
                case "checkbox":
                    return b.parent().closest("." + this.options.fieldWrapperClass).filter(function () {
                        return "checkboxgroup" == a(this).data("type")
                    })
            }
            return null
        },
        _attachBehavior: function () {
            var b = this;
            this.$element.find("." + this.options.fieldWrapperClass).each(function () {
                var c = a(this);
                b._isEmpty(c) || c.find("input, textarea").each(function () {
                    a(this).removeClass(b.options.emptyClass)
                });
                c.attr("data-type") == "captcha" && (c.data("captchaValid", !1), c.find('input[name="CaptchaV2"]').keyup(function () {
                    var f = a(this).val(),
                        l = c.find('input[name="CaptchaHV2"]').val();
                    b._validateCaptcha(l, f, function (a) {
                        c.data("captchaValid", a);
                        c.data("error-state") && b.errorSensitivity == "high" && b._validate(c)
                    })
                }));
                b._isEmpty(c) || c.addClass(b.classNames.keydown)
            });
            this.$element.find("input, textarea").bind("focus blur keydown change propertychange",
                function (c) {
                    var f = b.classNames[c.type],
                        l = b.classNames.focus,
                        h = b.classNames.keydown,
                        k = b.classNames.blur,
                        i = a(this).closest("." + b.options.fieldWrapperClass),
                        j = b._getGroupField(i);
                    switch (c.type) {
                        case "focus":
                            i.addClass(f).removeClass(k);
                            break;
                        case "keydown":
                            "checkbox" != i.data("type") && "radio" != i.data("type") && i.addClass(f).removeClass(k);
                            break;
                        case "blur":
                            i.removeClass(l);
                            b._isEmpty(i) && i.addClass(f).removeClass(h);
                            j && b._isEmpty(j) && j.addClass(f).removeClass(h);
                            break;
                        case "change":
                        case "propertychange":
                            "radio" ==
                            i.data("type") && j.find("." + b.options.fieldWrapperClass).removeClass(h), b._isEmpty(i) ? i.addClass(k).removeClass(h) : i.addClass(h).removeClass(k), j && (b._isEmpty(j) ? j.addClass(k).removeClass(h) : j.addClass(h).removeClass(k))
                    }
                });
            switch (this.event) {
                case "blur":
                case "keyup":
                    this.$element.find("." + this.options.fieldWrapperClass + " input, ." + this.options.fieldWrapperClass + " textarea").bind(this.event, function () {
                        b._validate(a(this).closest("." + b.options.fieldWrapperClass))
                    });
                case "submit":
                    this.$element.submit(function (c) {
                        var f = !0,
                            l = b.$element.find("." + b.options.fieldWrapperClass).length - 1;
                        b.$element.find("." + b.options.fieldWrapperClass).each(function (h) {
                            if ((f = b._validate(a(this)) ? f : !1) && h == l && b.options.ajaxSubmit) c.preventDefault(), b._submitForm();
                            f || c.preventDefault()
                        });
                        a("." + b.options.fieldWrapperClass, b.$element).each(function () {
                            var b = a(this);
                            b.attr("data-type") == "email" && (b = b.find("input, textarea"), b.val() == "no.reply@example.com" && b.val(""))
                        })
                    })
            }
        },
        _validateCaptcha: function (b, c, f) {
            c.length != 6 ? f(!1) : a.get("/ValidateCaptcha.ashx", {
                key: b,
                answer: c
            }, function (a) {
                f(a == "true")
            })
        },
        _validateReCaptcha: function (b, c) {
            a.get("/ValidateCaptcha.ashx", {
                key: Recaptcha.get_challenge(),
                answer: Recaptcha.get_response(),
                imageVerificationType: "recaptcha"
            }, function (a) {
                a == "true" ? b() : c()
            })
        },
        _submitForm: function () {
            var b = this,
                c = a("#ReCaptchaAnswer", b.$element),
                f = a("#ReCaptchaChallenge", b.$element);
            b.hasReCAPTCHA && 1 == c.length && 1 == f.length ? (c.val(Recaptcha.get_response()), f.val(Recaptcha.get_challenge()), b._validateReCaptcha(function () {
                    b._submitFormInternal()
                },
                function () {
                    a("." + b.options.fieldWrapperClass, b.$element).each(function () {
                        var c = a(this);
                        c.attr("data-type") == "recaptcha" && b._switchState("invalid", c)
                    });
                    Recaptcha.reload()
                })) : b._submitFormInternal()
        },
        _submitFormInternal: function () {
            var b = this,
                g = this.options.formSubmittedClass,
                f = this.options.formDeliveredClass,
                l = this.options.formErrorClass,
                h = g + " " + f + " " + l,
                k = this.$element.find("input[type=submit], button");
            a.ajax({
                url: this.$element.attr("action"),
                type: "post",
                data: this.$element.serialize(),
                beforeSend: function () {
                    b.$element.removeClass(h);
                    b.$element.addClass(g);
                    b.$element.find("." + b.options.fieldWrapperClass).removeClass(b.options.focusClass);
                    k.attr("disabled", "disabled")
                },
                complete: function (h) {
                    h && (h.status >= 400 || h.responseText && h.responseText.indexOf("<?php") >= 0) && alert("Form PHP script is missing from web server, or PHP is not configured correctly on your web hosting provider. Check if the form PHP script has been uploaded correctly, then contact your hosting provider about PHP configuration.");
                    b.$element.removeClass(g);
                    var j = null;
                    if (h && h.responseText) try {
                        j = jQuery.parseJSON(h.responseText), j = j.FormProcessV2Response || j.FormResponse || j.MusePHPFormResponse || j
                    } catch (n) {}
                    if (j && j.success) {
                        b.$element.addClass(f);
                        if (j.redirect) {
                            c.location.href = j.redirect;
                            return
                        }
                        b.$element[0].reset();
                        b.hasCAPTCHA && b.$element.find("input:not([type=submit]), textarea").each(function () {
                            a(this).attr("disabled", "disabled")
                        });
                        b.$element.find("." + b.options.notEmptyClass).each(function () {
                            a(this).removeClass(b.options.notEmptyClass)
                        })
                    } else if (h = b._getFieldsWithError(j))
                        for (j =
                            0; j < h.length; j++) b._switchState("invalid", h[j]);
                    else b.$element.addClass(l);
                    b.hasCAPTCHA || k.removeAttr("disabled");
                    b.hasReCAPTCHA && Recaptcha.reload()
                }
            })
        },
        _getFieldsWithError: function (b) {
            if (!b || !b.error || !b.error.fields || !b.error.fields.length) return null;
            for (var c = [], f = 0; f < b.error.fields.length; f++) {
                var l = a('[name="' + b.error.fields[f].field + '"]', this.$element).parents("." + this.options.fieldWrapperClass);
                1 == l.length && c.push(l)
            }
            return c
        },
        _validate: function (a) {
            var b = a.attr("data-type") || "always-valid",
                c = a.find("input, textarea"),
                l = this.validationTypes[b],
                h = a.attr("data-required") === "true",
                k = this._isEmpty(a),
                l = l instanceof RegExp ? Boolean(c.val().match(l)) : l(a);
            if (h && k) return this._switchState("required", a);
            b == "email" && k && c.val("no.reply@example.com");
            if (!l && (h || !k)) return this._switchState("invalid", a);
            return this._switchState("valid", a)
        },
        _switchState: function (a, b) {
            var c = b.attr("data-type"),
                l = this.options.validClass,
                h = this.options.invalidClass,
                k = this.options.requiredClass,
                i = this,
                j = function () {
                    i._validate(b)
                };
            b.removeClass(l + " " + h + " " + k);
            if (a == "required" || a == "invalid") return a == "invalid" ? b.addClass(h) : b.addClass(k), "recaptcha" != c && this.errorSensitivity != "low" && (l = this.errorSensitivity == "high" ? "keyup" : "blur", b.data("error-state") || (b.data("error-state", !0), b.find("input, textarea").bind(l, j))), !1;
            b.data("error-state") && (this.errorSensitivity == "high" ? this.event != "keyup" && b.data("error-state", !1).find("input, textarea").unbind("keyup", j) : this.errorSensitivity == "medium" && this.event != "blur" && b.data("error-state",
                !1).find("input, textarea").unbind("blur", j));
            if ("checkbox" == c || "radio" == c)
                if ((j = this._getGroupField(b)) && j.hasClass(k)) {
                    b.addClass(k);
                    return
                } b.addClass(l);
            return !0
        }
    });
    a.fn.wpForm = function (a) {
        new b.Widget.Form(this, a);
        return this
    }
})(jQuery, WebPro, window, document);;
(function () {
    if (!("undefined" == typeof Muse || "undefined" == typeof Muse.assets)) {
        var a = function (a, b) {
            for (var c = 0, d = a.length; c < d; c++)
                if (a[c] == b) return c;
            return -1
        }(Muse.assets.required, "webpro.js");
        if (-1 != a) {
            Muse.assets.required.splice(a, 1);
            for (var a = document.getElementsByTagName("meta"), b = 0, c = a.length; b < c; b++) {
                var d = a[b];
                if ("generator" == d.getAttribute("name")) {
                    "2015.0.2.310" != d.getAttribute("content") && Muse.assets.outOfDate.push("webpro.js");
                    break
                }
            }
        }
    }
})();