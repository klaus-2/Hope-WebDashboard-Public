(() => {
  var Xe = Object.defineProperty;
  var tn = Object.prototype.hasOwnProperty;
  var Yt = Object.getOwnPropertySymbols,
    en = Object.prototype.propertyIsEnumerable;
  var _t = (t, e, n) =>
      e in t
        ? Xe(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
        : (t[e] = n),
    $ = (t, e) => {
      for (var n in e || (e = {})) tn.call(e, n) && _t(t, n, e[n]);
      if (Yt) for (var n of Yt(e)) en.call(e, n) && _t(t, n, e[n]);
      return t;
    };
  var ot = (t, e, n) =>
    new Promise((r, i) => {
      var o = (a) => {
          try {
            c(n.next(a));
          } catch (y) {
            i(y);
          }
        },
        s = (a) => {
          try {
            c(n.throw(a));
          } catch (y) {
            i(y);
          }
        },
        c = (a) => (a.done ? r(a.value) : Promise.resolve(a.value).then(o, s));
      c((n = n.apply(t, e)).next());
    });
  var Jt =
    "/9j/4AAQSkZJRgABAQAAAQABAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAAAQAAAAAAAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wgARCADIASwDASIAAhEBAxEB/8QAHAABAAMBAQEBAQAAAAAAAAAAAgEDBAAFBwYI/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECBAMF/9oADAMBAAIQAxAAAAH8fCj6vAOXUOfIZlUVKSFKOUo59ZEPnLzlyw5cpTU0FY87rtVuNxoi7NeqrTLdrz6sNOvLqxrXoy6Ma/nSH30+AQ+o85QS1YEkFJgaZDlxDTlNicpasA7HnQbsmhY7c6N025vaDfnT01X4t+ii/G9N+e3F/n2VP0uGuXNCWkEtWBNAbYG3AbaltwW7JQ3ZKLHZKHZZm12uyaNs25sXdbnU3G3GnfXbnVttVmNfBus76HEJsmwJorbQFYgNsDscBuwDdkodlktdllktdllktdjszRY7JTYrM6Nieb1kvOutizOpsLl+Gc57eQJIKSISYWmFpkNOIaslNisDZNksWTZmmxOWLJslhpyw5ebzly84edS4csqFL8Pkrq55RQmGiZYrAx2V2DsrsldldhZZXZK7A4ssrctrrctrqslssqcWupS3KpS3KlS3OmZb5pUfEppXT5XKhJeqEaHnRpeZmp5WarMjNdmRxrsxuXY8bNlmNy7LMTNrxOXa8Sja8Sl2rEpdqxKXasSNs45l+NTmno8tKyo1LIq2LGk2rEzY8SjcsSNzwM3vApfQWBHovznHorzmvovzlHpLzXL6K85HpLzlL6K85x6C89L6CwTl8lmjvfF6zzWic8mlZUaVllNayTGxY0bFiS7lhUbngRvfno9BYFHoLz0voPzmegvPUeivPS+ivPceg/PcvoLCpfmXDvSOa5LJqmrZq5LppkummYvmiTROdGhZpjSs0mpZUalkS61kmNixo2LGzYsbNjx2S7LMdsa7Mtkvzzp7Vjp47u4nu4no4UnhSZFImHIksmuSxVIsVUlqqkumpFrpRc6WX2UWxfbRdLfZVbH4PrIbHPqHLg8uDygie6Tp7jp7ie6Tp6Tp6Tp6SZ6UlQiVDJsLHaLpXfXeWWm6X8L3c3Edx0dxEd1nd3Hd3Sd3cdPcTPcTPcTPcKe4ldxL7kT7h29xZd3S3390X3d0v//EAB0QAQEBAQEAAwEBAAAAAAAAAAABERICECAwQFD/2gAIAQEAAQUC/gnxE+mMYkSPMeY8vLw8PDw8p+8+YifGMYkSJEiR5jzHl5eXh5eU/XESfEiRIkSJGJEiRIkSJHmPLy8vLy8p+OMYxjGJGJEiRIkSJEiRIkSJHmJEeXl5efzxjGMSJEiRIkSJEiRIkSJEiRIkRHlE+2MYxjGMYkSJEiRIkSJEiRIkSJEiRIkRERPrjGMYxjGMSJEiRIkSJEiRIkSJEiRIkSJERE++MYxiRIkSJEiRIkSJEiRIkSJEiRIkSJERE/ORIkSJEiRIkSJEiRIkSJEiRIkSInxE/ORIkSJEiRIkREREiRERERP4IiIiIiIiIiIiIifxRERERERERERET41rWta1rW/hqVKlSpUqVKlSpWpUrUrUrWta1rWta1rWta1rWta1qVKlSuk9J6T0np0np06T06dOnTp06dOnTp01rWta1rWtdOnTp0np06T06T06dOnTp06dOnTp06dOnTWta1rWunTp06dOnTp06dOnTp06du3bt27dOnTp06dNa1rWta106dOnTp06dOnTp06dOnTp06dOnTp06dOnTWta1rWta1rWtdOnTp06dOnTp06dOnTp06dJ6T0np199a1rWta1rWta1rp06dOnTp06dOk9JUqVv561rWta1rWta1rWta1rUqVKlSt/l1rWta1rWtSpURE/wYiIif4ERER5ef8CIiPLy8/3xERHl5efj/8QAGxEBAQACAwEAAAAAAAAAAAAAEQABMBAgQGD/2gAIAQMBAT8B14sZmZ8uPYRrIiIiIiIiIjqRERERER8ERERERERGgiIiIiIiIjqREcERERERERHm/8QAGxEBAQACAwEAAAAAAAAAAAAAEQABQBAgMGD/2gAIAQIBAT8B0M2dLNnRz0Z4ZmZmZmZmejMzMzMzMzMzM8MzMzMzMzPwTMzMzM+LMzMzMzPizMzMzMzMzMzM6n//xAAUEAEAAAAAAAAAAAAAAAAAAACQ/9oACAEBAAY/Am2//8QAHBABAQEBAQEBAQEAAAAAAAAAAQARECAwQCEx/9oACAEBAAE/Ie5ZzLIIIIIIIIIQQhBBBEIeRAYw8j/juWWWWQQQQQQQQgghCEEQh8ANAY+bX8ssssssggggggiDgHsAA+IBaBDzy/llllllkFkQhCEIcB+AAAAtEYeAf5ZZZZZBBBBEIQh+MAAAKFUY+GWWWWcEIQhCEPyAAARFAIxj3LLLOCEIQhCEPygAAVVQAEI8FllkEEQhCH6AAACqAgACEOsssgggggg/OAAAAAAACEEIRzLIIIIIIPkAAAIQhDoCEIQhCCIiI8ERER8wAEPkACIiGGGG3pEREfQAClKUpSlDEIQhCEIcNhhhhhhj6AAAAOwOQ5SlKUpSlKU7iEIQhCEKU81U8gA4CHAQhCkIQhwOkpSlKUpSlIQhDgIcJylKUpSlKUpSlKd5SlKUpSEIQhCEKUpSlKUpCEIQhSlKU9ZlKUpSEIQhCEKUpSlKUpSlKUpSlKfGAlKUpSlKQhCEIQhClKUpSlKeYDbbbbbfYBSlKUpSlKQhCEIQhCHkKl22222222230AhCEIQhCEKUpSlPVAj23m2823m2www2xCEIQhCEIdApz5Pw7bbDbbbDDDDDDDDL08/yyyyzmWWfcjhERHoYhB/LLLLLLLPxEREQQhGMIQg/llllllllnyyyyyyyyCCCCCEIRjCEIP5f/9oADAMBAAIAAwAAABA6jEghxQo5KaVGueiMJ5pwJs4rw5aJnYxgWgNaeuxp3zkNRVlgFuA0E/W5bEOJazMl9KLD50pdbKlnlZIDxdoEwLY5BdE5DAq6/Oemq0jfZJqMdc2Rkgt/f822OZ2C0S2M56wQmJx0n5CkRQliQrwYvScWBArffPxKe1MyhdR0YQKogU3N1kfWEgY7pnruIFNdN8XD7IyiSRCTAJJeckkAS8edLLL5cNOXo1yF4L2AMOILzwCCEGH4ML//xAAZEQADAQEBAAAAAAAAAAAAAAAAAREQIDD/2gAIAQMBAT8Qxj4WIQ2C0Ji5faEJiYmJiwh6yEIJEIQSEIQhCyEIQhCYQSEhISEhISEhC8gAggggggkJCQvIALCCRCCQlsIQhCEIQmTELmbCEILUuliIQhCEIQhCEIQmL3AAhCEEiE94ACEITkJ7AAIQhMmQnUIQmJZ//8QAGhEBAQEBAQEBAAAAAAAAAAAAAAEREDAgQP/aAAgBAgEBPxD7tVaqqsWL0rea1rWtWtWqqqvSta1rWtatatWrVq1S1V6b9gUpSlKUtWrfH/rWta0pSlLfSAFKWtWrVvNa1rWta1b81V8L9XmcxjO61rWta1vN7vbzW+QA1rWta1voADWta1q1b+QAABrW91vNa1rW91atf//EACAQAAMAAQUBAQEBAAAAAAAAAAABYRARICExUTBBcUD/2gAIAQEAAT8QaGhoeBIQX+AFVZJLDY7E6eB3HB0mlodAnR+T8j9DloaHsBfYr1vq8+a1/wAIkSBE51wN8xdZ1i9CYv1gMMMLAvnVfk4YIbQKOGJLNvxdJ1C9CH4H2AeFFGItsKlsolsAiROPoiRJkiRE4OiGb6hej8jdD7BUizWOWkS20kSOGOGJEiQJEyZEiT2Xp0Lg3GKKKKyCG6r4kcMMrEjk5E8hMnjnsF0hRDoIoor4AD9ZMjhiRysSOCRLFAhi48/LbcIJwIorNYEiRImRI5WJEiRI4pECREiRIEyPwCFkEuBFFGJHd/kMEMhAiTwzJ4Y5SezCGCO1gUS4EEE/NfwAQI8IZGeVj84VBJRRdmkJCCiiiiiCCCCCCCCCZBUIItoIsrjj7ahBMTGGQ6HQ6NJoNGDDDDIZDDUZbwFE4V/KqKRWLNa/P+AAoIK4alipUsVLFCxcuXLlSpcqVKisWIj3BbFYuXLFixUqVKlihQoULFC5cqVLlSxUqVKlRWXP7FRQoUKFy5cuXLlixYuXKly5QsULFy5cuXLly5UqXKlCguHYuHZQoVKlSpcoWKlC5cuXLFixzdli5cuXLFixYoWKlzj7LlyguHYrEVQuXZQoUKlShQoVKlS5csWLFi5cuXLly5cuXLly5YsWFx7P7EV7FYirFRydnB2UKFCpUqUHejPR3o70oXKlyw70Z6WLFixYsWKlSguHZqxRRRVioVCCcTif05ChQoVKlSpUqUKFChQsWLly5cZ6VHeljg7yahBN6KhN6IoooKhUKhUU2grRo0aN9GejPRno70sWxUK474ODvOrNRM1EExBBOn9CoTEEGjcKf6gAL+MH4WDDPQ0hpsSylla4TExMQQWAggvkAAocYc/J+d1mk2DQ0Ylhd4WEIQhaiwYTGGGH22gozjC/c/8AwfwaQ0NDQ0EjQS0EsISEhISEhIQQQUXFDZH08bFzLLLDDDDGj2pGgkJCCCCCCC+4CgnF3//Z";
  function Kt(t) {
    var e = t.getBoundingClientRect();
    return (
      e.bottom >= 0 &&
      e.right >= 0 &&
      e.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      e.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  var Gt = function (t) {
    var e = t.getBoundingClientRect();
    let n = {};
    return (
      (n.top = e.top < 0),
      (n.left = e.left < 0),
      (n.bottom =
        e.bottom >
        (window.innerHeight || document.documentElement.clientHeight)),
      (n.right =
        e.right > (window.innerWidth || document.documentElement.clientWidth)),
      (n.any = n.top || n.left || n.bottom || n.right),
      (n.all = n.top && n.left && n.bottom && n.right),
      n
    );
  };
  function Zt(t, e) {
    document.addEventListener
      ? document.addEventListener(t, e, !0)
      : document.attachEvent("on" + t, e);
  }
  function K(t) {
    let { width: e, height: n } = t.getBoundingClientRect();
    return !(n === e && n === 0);
  }
  function Vt(t, e) {
    let n = document.implementation.createHTMLDocument(e);
    return (n.documentElement.innerHTML = t), n;
  }
  var Xt = (t) => t.replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  function te() {
    var t,
      e = document.createElement("fakeelement"),
      n = {
        animation: "animationend",
        OAnimationn: "oAnimationnEnd",
        MozAnimationn: "animationnend",
        WebkitAnimationn: "webkitAnimationnEnd",
      };
    for (t in n) if (e.style[t] !== void 0) return n[t];
  }
  function G(t, e) {
    let n;
    return (...r) => {
      let i = this;
      clearTimeout(n), (n = setTimeout(() => t.apply(i, r), e));
    };
  }
  function ee(t) {
    var e = document.createElement("div");
    return (e.innerHTML = t.trim()), e.firstChild;
  }
  var dt = (t, e) => {
    let n, r;
    return function () {
      let i = this,
        o = arguments;
      r
        ? (clearTimeout(n),
          (n = setTimeout(function () {
            Date.now() - r >= e && (t.apply(i, o), (r = Date.now()));
          }, e - (Date.now() - r))))
        : (t.apply(i, o), (r = Date.now()));
    };
  };
  function ne(t, e) {
    for (
      Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (n) {
          for (
            var r = (this.document || this.ownerDocument).querySelectorAll(n),
              i = r.length;
            --i >= 0 && r.item(i) !== this;

          );
          return i > -1;
        });
      t && t !== document;
      t = t.parentNode
    )
      if (t.matches(e)) return t;
    return null;
  }
  var re = Object.prototype,
    { hasOwnProperty: nn } = re;
  function pt(t, e) {
    return nn.call(t, e);
  }
  var Tt = {},
    rn = /([a-z\d])([A-Z])/g;
  function ie(t) {
    return t in Tt || (Tt[t] = t.replace(rn, "$1-$2").toLowerCase()), Tt[t];
  }
  function on(t, e) {
    return e ? e.toUpperCase() : "";
  }
  function ht(t) {
    return t.length ? on(null, t.charAt(0)) + t.slice(1) : "";
  }
  var Mt = String.prototype,
    sn =
      Mt.startsWith ||
      function (t) {
        return this.lastIndexOf(t, 0) === 0;
      };
  function mt(t, e) {
    return sn.call(t, e);
  }
  var or =
    Mt.endsWith ||
    function (t) {
      return this.substr(-t.length) === t;
    };
  var Nt = Array.prototype,
    oe = function (t, e) {
      return ~this.indexOf(t, e);
    },
    cn = Mt.includes || oe,
    an = Nt.includes || oe;
  function Z(t, e) {
    return t && (P(t) ? cn : an).call(t, e);
  }
  var sr =
    Nt.findIndex ||
    function (t) {
      for (let e = 0; e < this.length; e++)
        if (t.call(arguments[1], this[e], e, this)) return e;
      return -1;
    };
  var { isArray: B } = Array;
  function q(t) {
    return typeof t == "function";
  }
  function j(t) {
    return t !== null && typeof t == "object";
  }
  var { toString: ln } = re;
  function rt(t) {
    return j(t) && t === t.window;
  }
  function V(t) {
    return j(t) && t.nodeType === 9;
  }
  function se(t) {
    return j(t) && !!t.jquery;
  }
  function gt(t) {
    return t instanceof Node || (j(t) && t.nodeType >= 1);
  }
  function ce(t) {
    return ln.call(t).match(/^\[object (NodeList|HTMLCollection)\]$/);
  }
  function ae(t) {
    return typeof t == "boolean";
  }
  function P(t) {
    return typeof t == "string";
  }
  function Pt(t) {
    return typeof t == "number";
  }
  function yt(t) {
    return Pt(t) || (P(t) && !isNaN(t - parseFloat(t)));
  }
  function z(t) {
    return t === void 0;
  }
  function O(t) {
    return parseFloat(t) || 0;
  }
  function S(t) {
    return gt(t) || rt(t) || V(t)
      ? t
      : ce(t) || se(t)
      ? t[0]
      : B(t)
      ? S(t[0])
      : null;
  }
  function L(t) {
    return gt(t)
      ? [t]
      : ce(t)
      ? Nt.slice.call(t)
      : B(t)
      ? t.map(S).filter(Boolean)
      : se(t)
      ? t.toArray()
      : [];
  }
  var Y =
    Object.assign ||
    function (t, ...e) {
      t = Object(t);
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (r !== null) for (let i in r) pt(r, i) && (t[i] = r[i]);
      }
      return t;
    };
  function kt(t) {
    return t[t.length - 1];
  }
  function Rt(t, e) {
    for (let n in t) if (e(t[n], n) === !1) return !1;
    return !0;
  }
  function le(t, e) {
    return t.sort(({ [e]: n = 0 }, { [e]: r = 0 }) =>
      n > r ? 1 : r > n ? -1 : 0
    );
  }
  function At() {}
  function ue(t, e) {
    return (
      t.left < e.right &&
      t.right > e.left &&
      t.top < e.bottom &&
      t.bottom > e.top
    );
  }
  function fe(t, e) {
    return t.x <= e.right && t.x >= e.left && t.y <= e.bottom && t.y >= e.top;
  }
  function W(t, e, n) {
    if (j(e)) {
      for (let r in e) W(t, r, e[r]);
      return;
    }
    if (z(n)) return (t = S(t)), t && t.getAttribute(e);
    L(t).forEach((r) => {
      q(n) && (n = n.call(r, W(r, e))),
        n === null ? Ht(r, e) : r.setAttribute(e, n);
    });
  }
  function Ht(t, e) {
    (t = L(t)),
      e
        .split(" ")
        .forEach((n) =>
          t.forEach((r) => r.hasAttribute(n) && r.removeAttribute(n))
        );
  }
  var Ft = /msie|trident/i.test(window.navigator.userAgent),
    fr = W(document.documentElement, "dir") === "rtl",
    un = "ontouchstart" in window,
    dr = window.PointerEvent,
    pr =
      un ||
      (window.DocumentTouch && document instanceof DocumentTouch) ||
      navigator.maxTouchPoints;
  function pe(t, e) {
    return S(de(t, e, "querySelector"));
  }
  function Et(t, e) {
    return L(de(t, e, "querySelectorAll"));
  }
  function de(t, e = document, n) {
    if (!t || !P(t)) return null;
    t = t.replace(fn, "$1 *");
    let r;
    dn(t) &&
      ((r = []),
      (t = pn(t)
        .map((i, o) => {
          let s = e;
          if (i[0] === "!") {
            let c = i.substr(1).trim().split(" ");
            (s = it(e.parentNode, c[0])), (i = c.slice(1).join(" ").trim());
          }
          if (i[0] === "-") {
            let c = i.substr(1).trim().split(" "),
              a = (s || e).previousElementSibling;
            (s = xt(a, i.substr(1)) ? a : null), (i = c.slice(1).join(" "));
          }
          return s
            ? (s.id ||
                ((s.id = `uk-${Date.now()}${o}`), r.push(() => Ht(s, "id"))),
              `#${hn(s.id)} ${i}`)
            : null;
        })
        .filter(Boolean)
        .join(",")),
      (e = document));
    try {
      return e[n](t);
    } catch (i) {
      return null;
    } finally {
      r && r.forEach((i) => i());
    }
  }
  var mn = /(^|[^\\],)\s*[!>+~-]/,
    fn = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
  function dn(t) {
    return P(t) && t.match(mn);
  }
  var gn = /.*?[^\\](?:,|$)/g;
  function pn(t) {
    return t.match(gn).map((e) => e.replace(/,$/, "").trim());
  }
  var bt = Element.prototype,
    yn = bt.matches || bt.webkitMatchesSelector || bt.msMatchesSelector;
  function xt(t, e) {
    return L(t).some((n) => yn.call(n, e));
  }
  var An =
    bt.closest ||
    function (t) {
      let e = this;
      do {
        if (xt(e, t)) return e;
        e = e.parentNode;
      } while (e && e.nodeType === 1);
    };
  function it(t, e) {
    return (
      mt(e, ">") && (e = e.slice(1)),
      gt(t)
        ? An.call(t, e)
        : L(t)
            .map((n) => it(n, e))
            .filter(Boolean)
    );
  }
  var En =
    (window.CSS && CSS.escape) ||
    function (t) {
      return t.replace(/([^\x7f-\uFFFF\w-])/g, (e) => `\\${e}`);
    };
  function hn(t) {
    return P(t) ? En.call(null, t) : "";
  }
  function X(t) {
    return L(t).some(
      (e) => e.offsetWidth || e.offsetHeight || e.getClientRects().length
    );
  }
  function he(t, e) {
    return P(e)
      ? xt(t, e) || it(t, e)
      : t === e || (V(e) ? e.documentElement : S(e)).contains(S(t));
  }
  function tt(...t) {
    let [e, n, r, i, o] = me(t);
    return (
      (e = Qt(e)),
      i.length > 1 && (i = wn(i)),
      o && o.self && (i = Sn(i)),
      r && (i = bn(e, r, i)),
      (o = ge(o)),
      n
        .split(" ")
        .forEach((s) => e.forEach((c) => c.addEventListener(s, i, o))),
      () => xn(e, n, i, o)
    );
  }
  function xn(t, e, n, r = !1) {
    (r = ge(r)),
      (t = Qt(t)),
      e
        .split(" ")
        .forEach((i) => t.forEach((o) => o.removeEventListener(i, n, r)));
  }
  function st(...t) {
    let [e, n, r, i, o, s] = me(t),
      c = tt(
        e,
        n,
        r,
        (a) => {
          let y = !s || s(a);
          y && (c(), i(a, y));
        },
        o
      );
    return c;
  }
  function et(t, e, n) {
    return Qt(t).reduce((r, i) => r && i.dispatchEvent(Ln(e, !0, !0, n)), !0);
  }
  function Ln(t, e = !0, n = !1, r) {
    if (P(t)) {
      let i = document.createEvent("CustomEvent");
      i.initCustomEvent(t, e, n, r), (t = i);
    }
    return t;
  }
  function me(t) {
    return q(t[2]) && t.splice(2, 0, !1), t;
  }
  function bn(t, e, n) {
    return (r) => {
      t.forEach((i) => {
        let o =
          e[0] === ">"
            ? Et(e, i)
                .reverse()
                .filter((s) => he(r.target, s))[0]
            : it(r.target, e);
        o && ((r.delegate = i), (r.current = o), n.call(this, r));
      });
    };
  }
  function wn(t) {
    return (e) => (B(e.detail) ? t(...[e].concat(e.detail)) : t(e));
  }
  function Sn(t) {
    return function (e) {
      if (e.target === e.currentTarget || e.target === e.current)
        return t.call(null, e);
    };
  }
  function ge(t) {
    return t && Ft && !ae(t) ? !!t.capture : t;
  }
  function ye(t) {
    return t && "addEventListener" in t;
  }
  function Cn(t) {
    return ye(t) ? t : S(t);
  }
  function Qt(t) {
    return B(t) ? t.map(Cn).filter(Boolean) : P(t) ? Et(t) : ye(t) ? [t] : L(t);
  }
  var D = "Promise" in window ? window.Promise : Q;
  var Ae = 0,
    Ee = 1,
    wt = 2,
    vn = "setImmediate" in window ? setImmediate : setTimeout;
  function Q(t) {
    (this.state = wt), (this.value = void 0), (this.deferred = []);
    let e = this;
    try {
      t(
        (n) => {
          e.resolve(n);
        },
        (n) => {
          e.reject(n);
        }
      );
    } catch (n) {
      e.reject(n);
    }
  }
  Q.reject = function (t) {
    return new Q((e, n) => {
      n(t);
    });
  };
  Q.resolve = function (t) {
    return new Q((e, n) => {
      e(t);
    });
  };
  Q.all = function (e) {
    return new Q((n, r) => {
      let i = [],
        o = 0;
      e.length === 0 && n(i);
      function s(c) {
        return function (a) {
          (i[c] = a), (o += 1), o === e.length && n(i);
        };
      }
      for (let c = 0; c < e.length; c += 1) Q.resolve(e[c]).then(s(c), r);
    });
  };
  Q.race = function (e) {
    return new Q((n, r) => {
      for (let i = 0; i < e.length; i += 1) Q.resolve(e[i]).then(n, r);
    });
  };
  var ct = Q.prototype;
  ct.resolve = function (e) {
    let n = this;
    if (n.state === wt) {
      if (e === n) throw new TypeError("Promise settled with itself.");
      let r = !1;
      try {
        let i = e && e.then;
        if (e !== null && j(e) && q(i)) {
          i.call(
            e,
            (o) => {
              r || n.resolve(o), (r = !0);
            },
            (o) => {
              r || n.reject(o), (r = !0);
            }
          );
          return;
        }
      } catch (i) {
        r || n.reject(i);
        return;
      }
      (n.state = Ae), (n.value = e), n.notify();
    }
  };
  ct.reject = function (e) {
    let n = this;
    if (n.state === wt) {
      if (e === n) throw new TypeError("Promise settled with itself.");
      (n.state = Ee), (n.value = e), n.notify();
    }
  };
  ct.notify = function () {
    vn(() => {
      if (this.state !== wt)
        for (; this.deferred.length; ) {
          let [e, n, r, i] = this.deferred.shift();
          try {
            this.state === Ae
              ? q(e)
                ? r(e.call(void 0, this.value))
                : r(this.value)
              : this.state === Ee &&
                (q(n) ? r(n.call(void 0, this.value)) : i(this.value));
          } catch (o) {
            i(o);
          }
        }
    });
  };
  ct.then = function (e, n) {
    return new Q((r, i) => {
      this.deferred.push([e, n, r, i]), this.notify();
    });
  };
  ct.catch = function (t) {
    return this.then(void 0, t);
  };
  function xe(t, e) {
    return e
      ? L(t).indexOf(S(e))
      : L((t = S(t)) && t.parentNode.children).indexOf(t);
  }
  function qt(t, e) {
    return (t = Mn(t)), Tn(e, (n) => t.appendChild(n));
  }
  function Tn(t, e) {
    return (
      (t = P(t) ? be(t) : t), t ? ("length" in t ? L(t).map(e) : e(t)) : null
    );
  }
  var Nn = /^\s*<(\w+|!)[^>]*>/,
    Pn = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  function be(t) {
    let e = Pn.exec(t);
    if (e) return document.createElement(e[1]);
    let n = document.createElement("div");
    return (
      Nn.test(t)
        ? n.insertAdjacentHTML("beforeend", t.trim())
        : (n.textContent = t),
      n.childNodes.length > 1 ? L(n.childNodes) : n.firstChild
    );
  }
  function Mn(t, e) {
    return P(t) ? (kn(t) ? S(be(t)) : pe(t, e)) : S(t);
  }
  function kn(t) {
    return t[0] === "<" || t.match(/^\s*</);
  }
  function at(t, ...e) {
    we(t, e, "add");
  }
  function St(t, ...e) {
    we(t, e, "remove");
  }
  function Se(t, e) {
    return e && L(t).some((n) => n.classList.contains(e.split(" ")[0]));
  }
  function we(t, e, n) {
    (e = Rn(e).filter(Boolean)),
      e.length &&
        L(t).forEach(({ classList: r }) => {
          Hn.Multiple ? r[n](...e) : e.forEach((i) => r[n](i));
        });
  }
  function Rn(t) {
    return t.reduce(
      (e, n) => e.concat.call(e, P(n) && Z(n, " ") ? n.trim().split(" ") : n),
      []
    );
  }
  var Hn = {
    get Multiple() {
      return this.get("_multiple");
    },
    get Force() {
      return this.get("_force");
    },
    get(t) {
      if (!pt(this, t)) {
        let { classList: e } = document.createElement("_");
        e.add("a", "b"),
          e.toggle("c", !1),
          (this._multiple = e.contains("b")),
          (this._force = !e.contains("c"));
      }
      return this[t];
    },
  };
  var Fn = {
    "animation-iteration-count": !0,
    "column-count": !0,
    "fill-opacity": !0,
    "flex-grow": !0,
    "flex-shrink": !0,
    "font-weight": !0,
    "line-height": !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    "stroke-dasharray": !0,
    "stroke-dashoffset": !0,
    widows: !0,
    "z-index": !0,
    zoom: !0,
  };
  function w(t, e, n) {
    return L(t).map((r) => {
      if (P(e)) {
        if (((e = Lt(e)), z(n))) return Qn(r, e);
        !n && !Pt(n)
          ? r.style.removeProperty(e)
          : (r.style[e] = yt(n) && !Fn[e] ? `${n}px` : n);
      } else if (B(e)) {
        let i = Le(r);
        return e.reduce((o, s) => ((o[s] = i[Lt(s)]), o), {});
      } else j(e) && Rt(e, (i, o) => w(r, o, i));
      return r;
    })[0];
  }
  function Le(t, e) {
    return (t = S(t)), t.ownerDocument.defaultView.getComputedStyle(t, e);
  }
  function Qn(t, e, n) {
    return Le(t, n)[e];
  }
  var Ce = {};
  function Lt(t) {
    let e = Ce[t];
    return e || (e = Ce[t] = qn(t) || t), e;
  }
  var ve = ["webkit", "moz", "ms"];
  function qn(t) {
    t = ie(t);
    let { style: e } = document.documentElement;
    if (t in e) return t;
    let n = ve.length,
      r;
    for (; n--; ) if (((r = `-${ve[n]}-${t}`), r in e)) return r;
  }
  function Wn(t, e, n = 400, r = "linear") {
    return D.all(
      L(t).map(
        (i) =>
          new D((o, s) => {
            for (let a in e) {
              let y = w(i, a);
              y === "" && w(i, a, y);
            }
            let c = setTimeout(() => et(i, "transitionend"), n);
            st(
              i,
              "transitionend transitioncanceled",
              ({ type: a }) => {
                clearTimeout(c),
                  St(i, "uk-transition"),
                  w(i, {
                    "transition-property": "",
                    "transition-duration": "",
                    "transition-timing-function": "",
                  }),
                  a === "transitioncanceled" ? s() : o();
              },
              { self: !0 }
            ),
              at(i, "uk-transition"),
              w(
                i,
                Y(
                  {
                    "transition-property": Object.keys(e).map(Lt).join(","),
                    "transition-duration": `${n}ms`,
                    "transition-timing-function": r,
                  },
                  e
                )
              );
          })
      )
    );
  }
  var lt = {
      start: Wn,
      stop(t) {
        return et(t, "transitionend"), D.resolve();
      },
      cancel(t) {
        et(t, "transitioncanceled");
      },
      inProgress(t) {
        return Se(t, "uk-transition");
      },
    },
    Bn = "uk-animation-";
  var Xr = new RegExp(`${Bn}(enter|leave)`);
  var On = { width: ["x", "left", "right"], height: ["y", "top", "bottom"] };
  function ut(t, e) {
    if (((t = S(t)), e)) {
      let n = ut(t),
        r = w(t, "position");
      ["left", "top"].forEach((i) => {
        if (i in e) {
          let o = w(t, i);
          w(
            t,
            i,
            e[i] - n[i] + O(r === "absolute" && o === "auto" ? Wt(t)[i] : o)
          );
        }
      });
      return;
    }
    return Dn(t);
  }
  function Dn(t) {
    if (((t = S(t)), !t)) return {};
    let { pageYOffset: e, pageXOffset: n } = Bt(t);
    if (rt(t)) {
      let s = t.innerHeight,
        c = t.innerWidth;
      return {
        top: e,
        left: n,
        height: s,
        width: c,
        bottom: e + s,
        right: n + c,
      };
    }
    let r, i;
    !X(t) &&
      w(t, "display") === "none" &&
      ((r = W(t, "style")),
      (i = W(t, "hidden")),
      W(t, { style: `${r || ""};display:block !important;`, hidden: null }));
    let o = t.getBoundingClientRect();
    return (
      z(r) || W(t, { style: r, hidden: i }),
      {
        height: o.height,
        width: o.width,
        top: o.top + e,
        left: o.left + n,
        bottom: o.bottom + e,
        right: o.right + n,
      }
    );
  }
  function Wt(t) {
    t = S(t);
    let e = t.offsetParent || Un(t),
      n = ut(e),
      { top: r, left: i } = ["top", "left"].reduce((o, s) => {
        let c = ht(s);
        return (
          (o[s] -= n[s] + O(w(t, `margin${c}`)) + O(w(e, `border${c}Width`))), o
        );
      }, ut(t));
    return { top: r, left: i };
  }
  var Ct = Ie("height"),
    $n = Ie("width");
  function Ie(t) {
    let e = ht(t);
    return (n, r) => {
      if (((n = S(n)), z(r))) {
        if (rt(n)) return n[`inner${e}`];
        if (V(n)) {
          let i = n.documentElement;
          return Math.max(i[`offset${e}`], i[`scroll${e}`]);
        }
        return (
          (r = w(n, t)),
          (r = r === "auto" ? n[`offset${e}`] : O(r) || 0),
          r - Te(t, n)
        );
      } else w(n, t, !r && r !== 0 ? "" : +r + Te(t, n) + "px");
    };
  }
  function Te(t, e, n = "border-box") {
    return w(e, "boxSizing") === n
      ? On[t]
          .slice(1)
          .map(ht)
          .reduce(
            (r, i) => r + O(w(e, `padding${i}`)) + O(w(e, `border${i}Width`)),
            0
          )
      : 0;
  }
  function Me(t, e = 0, n = 0) {
    if (!X(t)) return !1;
    t = S(t);
    let r = Bt(t),
      i = t.getBoundingClientRect(),
      o = { top: -e, left: -n, bottom: e + Ct(r), right: n + $n(r) };
    return ue(i, o) || fe({ x: i.left, y: i.top }, o);
  }
  function Ne(t, e) {
    if (((t = S(t)), rt(t) || V(t))) {
      let { scrollTo: n, pageXOffset: r } = Bt(t);
      n(r, e);
    } else t.scrollTop = e;
  }
  function Bt(t) {
    return rt(t) ? t : Pe(t).defaultView;
  }
  function Pe(t) {
    return S(t).ownerDocument;
  }
  function Un(t) {
    return Pe(t).documentElement;
  }
  var U = {
    reads: [],
    writes: [],
    read(t) {
      return this.reads.push(t), Dt(), t;
    },
    write(t) {
      return this.writes.push(t), Dt(), t;
    },
    clear(t) {
      return ke(this.reads, t) || ke(this.writes, t);
    },
    flush: Ot,
  };
  function Ot(t = 1) {
    Re(U.reads),
      Re(U.writes.splice(0, U.writes.length)),
      (U.scheduled = !1),
      (U.reads.length || U.writes.length) && Dt(t + 1);
  }
  var jn = 5;
  function Dt(t) {
    if (!U.scheduled) {
      if (((U.scheduled = !0), t > jn))
        throw new Error("Maximum recursion limit reached.");
      t ? D.resolve().then(() => Ot(t)) : requestAnimationFrame(() => Ot());
    }
  }
  function Re(t) {
    let e;
    for (; (e = t.shift()); ) e();
  }
  function ke(t, e) {
    let n = t.indexOf(e);
    return !!~n && !!t.splice(n, 1);
  }
  function zn() {}
  zn.prototype = {
    positions: [],
    position: null,
    init() {
      (this.positions = []), (this.position = null);
      let t = !1;
      this.unbind = tt(document, "mousemove", (e) => {
        t ||
          (setTimeout(() => {
            let n = Date.now(),
              { length: r } = this.positions;
            r &&
              n - this.positions[r - 1].time > 100 &&
              this.positions.splice(0, r),
              this.positions.push({ time: n, x: e.pageX, y: e.pageY }),
              this.positions.length > 5 && this.positions.shift(),
              (t = !1);
          }, 5),
          (t = !0));
      });
    },
    cancel() {
      this.unbind && this.unbind();
    },
    movesTo(t) {
      if (this.positions.length < 2) return !1;
      let e = ut(t),
        n = kt(this.positions),
        [r] = this.positions;
      if (e.left <= n.x && n.x <= e.right && e.top <= n.y && n.y <= e.bottom)
        return !1;
      let i = [
        [
          { x: e.left, y: e.top },
          { x: e.right, y: e.bottom },
        ],
        [
          { x: e.right, y: e.top },
          { x: e.left, y: e.bottom },
        ],
      ];
      return (
        e.right <= n.x ||
          (e.left >= n.x
            ? (i[0].reverse(), i[1].reverse())
            : e.bottom <= n.y
            ? i[0].reverse()
            : e.top >= n.y && i[1].reverse()),
        !!i.reduce(
          (o, s) =>
            o + (vt(r, s[0]) < vt(n, s[0]) && vt(r, s[1]) > vt(n, s[1])),
          0
        )
      );
    },
  };
  function vt(t, e) {
    return (e.y - t.y) / (e.x - t.x);
  }
  var H = {};
  H.events = H.created = H.beforeConnect = H.connected = H.beforeDisconnect = H.disconnected = H.destroy = Ut;
  H.args = function (t, e) {
    return e !== !1 && Ut(e || t);
  };
  H.update = function (t, e) {
    return le(Ut(t, q(e) ? { read: e } : e), "order");
  };
  H.props = function (t, e) {
    return (
      B(e) && (e = e.reduce((n, r) => ((n[r] = String), n), {})),
      H.methods(t, e)
    );
  };
  H.computed = H.methods = function (t, e) {
    return e ? (t ? Y({}, t, e) : e) : t;
  };
  H.data = function (t, e, n) {
    return n
      ? He(t, e, n)
      : e
      ? t
        ? function (r) {
            return He(t, e, r);
          }
        : e
      : t;
  };
  function He(t, e, n) {
    return H.computed(q(t) ? t.call(n, n) : t, q(e) ? e.call(n, n) : e);
  }
  function Ut(t, e) {
    return (
      (t = t && !B(t) ? [t] : t), e ? (t ? t.concat(e) : B(e) ? e : [e]) : t
    );
  }
  var Si =
    "IntersectionObserver" in window
      ? window.IntersectionObserver
      : class {
          constructor(e, { rootMargin: n = "0 0" } = {}) {
            this.targets = [];
            let [r, i] = (n || "0 0").split(" ").map(O);
            (this.offsetTop = r), (this.offsetLeft = i);
            let o;
            (this.apply = () => {
              o ||
                (o = requestAnimationFrame(() =>
                  setTimeout(() => {
                    let s = this.takeRecords();
                    s.length && e(s, this), (o = !1);
                  })
                ));
            }),
              (this.off = tt(window, "scroll resize load", this.apply, {
                passive: !0,
                capture: !0,
              }));
          }
          takeRecords() {
            return this.targets.filter((e) => {
              let n = Me(e.target, this.offsetTop, this.offsetLeft);
              if (e.isIntersecting === null || n ^ e.isIntersecting)
                return (e.isIntersecting = n), !0;
            });
          }
          observe(e) {
            this.targets.push({ target: e, isIntersecting: null }),
              this.apply();
          }
          disconnect() {
            (this.targets = []), this.off();
          }
        };
  E.cms_selector = "";
  function E(t, e = { type: 1, className: "image" }) {
    (this.cms_selector = t),
      (E.cms_selector = t),
      this.indexSet,
      (this.animation = {
        enable: !0,
        duration: 250,
        easing: "ease-in-out",
        effects: "translate(0px,0px)",
        queue: !0,
      }),
      (this.isPaginated = !1),
      (this.itemsPerPage = 10),
      (this.filterOn = !1),
      (this.filterObject = null),
      this.lastFilter,
      (this.hasLoadmore = !1),
      (this.loadmoreOn = !1),
      this.addClass,
      this.nestConfig,
      (this.index = 0),
      this.hidden_collections,
      this.addClassConfig,
      (this.animationStyle = `
        

          @keyframes fade-in {
              0% {
                  opacity: 0;
                 transform:{{transform}};
              }
              100% {
                  transform:translate(0) rotate3d(0) rotate(0) scale(1);
                  opacity: 1;
              }
            }
            
            .fslib-fadeIn {
              animation-name: fade-in;
              animation-duration: {{duration}}s;
              animation-iteration-count: 1;
              animation-timing-function: {{easing}};
              animation-fill-mode: forwards;
            }
        `),
      (this.tinyImgBase64 = Jt);
  }
  E.prototype.setNextButtonIndex = function () {
    let t = document.querySelectorAll(this.cms_selector);
    for (let e = 0; e < t.length; e++) {
      let n = t[e].nextElementSibling;
      n && K(n) && n.querySelector("w-pagination-next") && (this.index = e);
    }
    this.indexSet = !0;
  };
  E.prototype.getMasterCollection = function () {
    return document.querySelector(this.cms_selector);
  };
  E.prototype.reinitializeWebflow = function () {
    window.Webflow.destroy(),
      window.Webflow.ready(),
      window.Webflow.require("ix2") && window.Webflow.require("ix2").init(),
      window.Webflow.redraw.up(),
      et(document, "readystatechange"),
      et(document, "IX2_PREVIEW_LOAD");
  };
  E.prototype.makeStyleSheet = function ({
    duration: t = 1,
    easing: e = "ease-in-out",
    transform: n = "translate(0)",
  }) {
    (this.animationStyle = this.animationStyle.replace("{{duration}}", "" + t)),
      (this.animationStyle = this.animationStyle.replace("{{ease}}", e)),
      (this.animationStyle = this.animationStyle.replace("{{transform}}", n));
    let r = document.head || document.getElementsByTagName("head")[0],
      i =
        '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/progressive-image.js/dist/progressive-image.css">';
    r.innerHTML += i;
    let o = document.createElement("style");
    return (
      r.appendChild(o),
      (o.type = "text/css"),
      o.styleSheet
        ? (o.styleSheet.cssText = this.animationStyle)
        : o.appendChild(document.createTextNode(this.animationStyle)),
      o
    );
  };
  window.FsLibrary = E;
  E.prototype.addclasses = function (
    t = { classArray: [], frequency: 2, start: 1 }
  ) {
    let e = document.querySelector(this.cms_selector),
      { frequency: n, start: r, classArray: i } = t;
    if (((this.addClassConfig = t), (this.addClass = !0), n < 0))
      throw "unaccepted value passed as frequency";
    if (r < 1) throw "unaccepted value passed as start";
    i.map(({ classTarget: o, classToAdd: s }) => {
      let c = e.querySelectorAll(o),
        a = !0;
      e.children[0] != c[0] && ((a = !1), (c = e.children));
      let y = s.replace(/\./g, "");
      for (
        let l = r - 1;
        l < c.length &&
        (a
          ? c[l].classList.toggle(y)
          : c[l].querySelectorAll(o).forEach((h) => {
              h.classList.toggle(y);
            }),
        n != 0);
        l += n
      )
        this.reinitializeWebflow();
    });
  };
  var $t = "uk-animation-target",
    It = {
      methods: {
        animate(t, e, n) {
          let { duration: r, easing: i, effects: o } = n,
            s = String(o).replace(/^fade /gi, "");
          Yn();
          let c = L(e.children),
            a = c.map((f) => Fe(f, !0)),
            y = c.map((f) => w(f, "margin")),
            l = Ct(e),
            h = window.pageYOffset;
          t(), lt.cancel(e), c.forEach(lt.cancel), Qe(e), U.flush();
          let d = Ct(e);
          c = c.concat(L(e.children).filter((f) => !Z(c, f)));
          let p = c.map((f, u) =>
            f.parentNode && u in a
              ? a[u]
                ? X(f)
                  ? qe(f)
                  : { opacity: 0 }
                : { opacity: X(f) ? 1 : 0 }
              : !1
          );
          return (
            (a = p.map((f, u) => {
              let A = c[u].parentNode === e ? a[u] || Fe(c[u]) : !1;
              if (A) {
                if (!f) delete A.opacity;
                else if (!("opacity" in f)) {
                  let { opacity: g } = A;
                  g % 1 ? (f.opacity = 1) : delete A.opacity;
                }
              }
              return A;
            })),
            at(e, $t),
            c.forEach((f, u) => {
              a[u] && w(f, a[u]);
            }),
            w(e, "height", l),
            c.map((f, u) => (f.style.margin = y[u])),
            Ne(window, h),
            D.all(
              c
                .map((f, u) =>
                  a[u] && p[u]
                    ? (p[u].opacity == 0
                        ? (p[u].transform = s)
                        : (p[u].transform = ""),
                      a[u].opacity == 0 && (f.style.transform = s),
                      lt.start(f, p[u], r, i))
                    : D.resolve()
                )
                .concat(lt.start(e, { height: d }, r, i))
            ).then(() => {
              c.forEach((f, u) => {
                w(f, { display: p[u].opacity === 0 ? "none" : "", zIndex: "" });
              }),
                Qe(e),
                U.flush();
            }, At)
          );
        },
      },
    };
  function Fe(t, e) {
    let n = w(t, "zIndex");
    return X(t)
      ? Y(
          {
            display: "",
            opacity: e ? w(t, "opacity") : "0",
            pointerEvents: "none",
            position: "absolute",
            zIndex: n === "auto" ? xe(t) : n,
          },
          qe(t)
        )
      : !1;
  }
  function Qe(t) {
    w(t.children, {
      height: "",
      left: "",
      opacity: "",
      pointerEvents: "",
      transform: "",
      position: "",
      top: "",
      width: "",
      margin: "",
    }),
      St(t, $t),
      w(t, "height", "");
  }
  function qe(t) {
    let { height: e, width: n } = t.getBoundingClientRect(),
      { top: r, left: i } = Wt(t);
    return (
      (r += O(w(t, "marginTop"))), { top: r, left: i, height: e, width: n }
    );
  }
  var jt;
  function Yn() {
    jt ||
      ((jt = qt(document.head, "<style>").sheet),
      jt.insertRule(
        `.${$t} > * {
            margin-top: 0 !important;
            /*transform: none !important;*/
        }`,
        0
      ));
  }
  var We = (t) => {
    let e = document.querySelector(t);
    return e && (e.style.display = "none"), e;
  };
  function ft(t, e, n) {
    let r = !e.trim(),
      i = t[n].query;
    return !((r && i.includes(e)) || (r && !i.length));
  }
  var Be = (t) => {
      let e = ne(t, "form");
      e && zt(e);
    },
    zt = (t) => {
      t.onsubmit = (e) => (e.stopPropagation(), e.preventDefault(), !1);
    },
    Oe = ({ filter: t, triggerSelectors: e, activeClass: n }) => (
      e.map((r) => {
        Array.from(document.querySelectorAll(r)).forEach((i, o) => {
          if ((i.classList.remove(n), i.tagName == "INPUT"))
            switch (i.type) {
              case "text":
                i.value = "";
                break;
              default:
                i.checked = !1;
                break;
            }
          i.tagName == "SELECT" && (i.selectedIndex = 0);
        });
      }),
      Object.values(t).forEach((r, i) => {
        t[i].query = [];
      }),
      t
    ),
    De = ({ index: t, active: e, itemsPerPage: n }) => {
      let r = n * parseInt(e),
        i = r - n;
      return t >= i && t < r;
    };
  E.prototype.filter = function ({
    filterArray: t = [],
    filterReset: e = "",
    animation: n = this.animation,
    activeClass: r = "active",
    initalFilter: i = 1,
    emptyMessage: o,
  }) {
    let s = t;
    (r = r || "active"),
      (r = r.replace(".", "")),
      (n = $($({}, this.animation), n));
    let c = typeof s == "string" ? "exclusive" : "multi";
    if (n) {
      n.enable = !/^false$/.test(String(n.enable));
      let g = n.effects.replace("fade", "");
      (n.effects = g),
        n.effects.indexOf("translate") < 0 &&
          (n.effects += " translate(0px,0px)  "),
        (this.animation = n);
    }
    n = this.animation;
    let a = !1,
      y = [],
      l = {},
      h = [],
      d = () => [].slice.call(document.querySelectorAll(this.cms_selector));
    if (Array.isArray(s))
      s.map((g, m) => {
        let b,
          { filterWrapper: C } = g,
          M = `${C} [filter-by]`;
        h.push(M);
        let v = [].slice.call(document.querySelectorAll(M));
        p($({ index: m, prevClicked: b, filter_group: v }, g));
      });
    else if (typeof s == "string") {
      let g,
        m = `${s} [filter-by]`;
      h.push(m);
      let b = [].slice.call(document.querySelectorAll(m));
      p({ index: 0, prevClicked: g, filter_group: b });
    } else throw "Incorrect type passed as cms_filter";
    e &&
      document.querySelector(e).addEventListener("click", () => {
        u({ reset: !0 });
      });
    function p({
      index: g,
      prevClicked: m,
      filter_group: b,
      filterType: C = c,
      filterByClass: M = null,
      filterRange: v = !1,
    }) {
      (l[g] = { target: M, query: [], filterRange: v }),
        b.map((x, N) => {
          let F = x && x.tagName,
            I = "";
          if (F == "SELECT")
            x.addEventListener(
              "change",
              G((k) => {
                let T = k.target.selectedOptions[0].value || "",
                  R = I;
                (I = T),
                  ft(l, T, g) &&
                    u({
                      filterType: C,
                      index: g,
                      filterText: T,
                      oldValue: R,
                      wildcard: !0,
                    });
              }, 500)
            );
          else if (F == "FORM") {
            zt(x);
            let k = x.querySelector('input[name="min"]'),
              T = x.querySelector('input[name="max"]'),
              R = I,
              nt = (J) => (
                (I = J),
                u({
                  index: g,
                  filterType: C,
                  wildcard: !0,
                  oldValue: R,
                  filterText: J,
                })
              );
            $e(k, T, nt), $e(T, k, nt);
          } else if (F == "INPUT")
            switch (x.type) {
              case "text":
                Be(x),
                  x.addEventListener(
                    "input",
                    G((k) => {
                      let T = k.target.value,
                        R = I;
                      (I = T),
                        ft(l, T, g) &&
                          u({
                            filterType: C,
                            index: g,
                            filterText: T,
                            oldValue: R,
                            wildcard: !0,
                          });
                    }, 500)
                  );
                break;
              default:
                x.addEventListener("change", (k) => {
                  let T = k.currentTarget.getAttribute("filter-by") || "";
                  ft(l, T, g) && u({ filterType: C, index: g, filterText: T });
                });
                break;
            }
          else
            x.addEventListener("click", (k) => {
              let T = k.currentTarget.className;
              (/^exclusive$/i.test(c) || /^exclusive$/i.test(C)) &&
                m &&
                m.classList.remove(r),
                (m = k.currentTarget),
                T.includes(r) ? m.classList.remove(r) : m.classList.add(r);
              let R = m.getAttribute("filter-by") || "";
              ft(l, R, g) && u({ filterType: C, index: g, filterText: R });
            });
        });
    }
    let f = () => {
        let g = Object.values(l).find(({ query: m }) => m.length);
        return g && (this.filterOn = !0), g;
      },
      u = ({
        filterType: g = "exclusive",
        index: m = 0,
        filterText: b = "",
        oldValue: C = "",
        wildcard: M = !1,
        reset: v = !1,
      }) => {
        b = Xt(b.replace(/\*/gi, ""));
        let x = l[m].query.includes(b),
          N = l[m].query.filter((I) => I != b),
          F = l[m].query.filter((I) => I != C);
        if (
          (v
            ? (l = Oe({ filter: l, activeClass: r, triggerSelectors: h }))
            : x && !M
            ? (l[m].query = N)
            : ((l[m].query = F),
              /^exclusive$/i.test(c) || /^exclusive$/i.test(g)
                ? (l[m].query = [b])
                : b && b.length && l[m].query.push(b)),
          f(),
          this.hasLoadmore && this.loadmoreOn)
        ) {
          (this.filterObject = l), A(), (this.lastFilter = A);
          return;
        }
        return n.enable && n.queue && a ? y.push(() => A()) : A();
      },
      A = () => {
        if (((a = !0), n.enable)) {
          let g = document.querySelector(this.cms_selector);
          return It.methods
            .animate(() => Ue(l, d(), this, o), g, n)
            .then(() => {
              a = !1;
              let m = y.shift();
              m && m.call(null);
            });
        }
        return Ue(l, d(), this, o), l;
      };
  };
  var Ue = (t, e, n, r) => {
      let i = We(r),
        o = Object.values(t),
        s = e.reduce((c, a, y) => {
          let l = o.reduce((d, { query: p, target: f, filterRange: u }) => {
              let A = u ? p : `(${p.join("|")})`,
                g = [].slice.call(a.children).map((m, b) => {
                  m.removeAttribute("wf-fslib-paginated-hide");
                  let C = new RegExp(A, "gi"),
                    M = (m.querySelector(f) || m).textContent,
                    v = u ? _n(A, M) : C.test(M),
                    x = m.cloneNode(!0);
                  return (
                    v ? (x.style.display = "") : (x.style.display = "none"), x
                  );
                });
              return d.length < 1
                ? g
                : [
                    ...d.map(
                      (m, b) => (
                        m.style.display !== g[b].style.display &&
                          (m.style.display = "none"),
                        m
                      )
                    ),
                  ];
            }, []),
            h = 0;
          if (l.length > 1) {
            let d = 0;
            [].slice.call(a.children).map((p, f) => {
              let u = l[f].style.display;
              if (((p.style.display = u), u != "none")) {
                h++, p.setAttribute("wf-fslib-paginated-hide", 2);
                let A = !1;
                n.isPaginated &&
                  ((A = De({
                    index: d,
                    active: 1,
                    itemsPerPage: n.itemsPerPage,
                  })),
                  d++),
                  A || p.setAttribute("wf-fslib-paginated-hide", 1);
              }
            });
          }
          return c + h;
        }, 0);
      if (n.isPaginated) {
        let c = Math.ceil(s / n.itemsPerPage);
        n.paginate(c == 1 ? 0 : c, 1);
      }
      if (!s) {
        let c = document.querySelector(r);
        c && (c.style.display = "block");
      }
    },
    _n = (t, e) => {
      let n = t.filter((r) => {
        let i = r.split("-").map(parseFloat),
          o = e.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") || 0;
        return (o = parseFloat(o)), (o - i[0]) * (o - i[1]) <= 0;
      });
      return t.length ? n.length : !0;
    },
    $e = (t, e, n) => {
      t.addEventListener(
        "input",
        G((r) => {
          r.target.value = r.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
          let i = r.target.name,
            o = r.target.value,
            s = e.value || 0,
            c = i == "min" ? `${o}-${s}` : `${s}-${o}`;
          n(c);
        }, 500)
      );
    };
  E.prototype.combine = function () {
    this.setNextButtonIndex();
    let t = [].slice
        .call(document.querySelectorAll(this.cms_selector))
        .filter(K),
      e = null;
    (t[0].innerHTML = t
      .reduce((r, i) => {
        let o = i.nextElementSibling;
        return o && K(o) && !e && (e = o.outerHTML), [...r, i.innerHTML];
      }, [])
      .join("")),
      e && (e.outerHTML = e.outerHTML + e);
    let n = t.map(
      (r, i) => (i > 0 && (r.parentElement.outerHTML = ""), Promise.resolve())
    );
    return Promise.all(n).then((r) => {
      window.Webflow.require("ix2") && this.reinitializeWebflow();
    });
  };
  E.prototype.nest = function ({ textList: t, nestSource: e, nestTarget: n }) {
    this.setNestConfig({ textList: t, nestSource: e, nestTarget: n });
    let r = Array.from(document.querySelectorAll(this.cms_selector)),
      i = [].slice.call(document.querySelectorAll(e + ">.w-dyn-item>*"));
    r.forEach((o, s) => {
      let c = o.querySelectorAll(t),
        a = o.querySelectorAll(n);
      c.forEach((y, l) => {
        if (y && a[l]) {
          let h = y.textContent;
          h = h.replace(/\s*,\s*/gi, "|");
          let d = h.split("|");
          (h = "(" + h + ")"),
            (a[l].innerHTML = i
              .filter((p) => {
                let f = new RegExp(h, "gi"),
                  u = p.textContent.trim();
                return f.test(u);
              })
              .sort(
                (p, f) =>
                  d.indexOf(p.textContent.trim()) -
                  d.indexOf(f.textContent.trim())
              )
              .map((p) => p.outerHTML)
              .join(""));
        }
      });
    });
  };
  E.prototype.setNestConfig = function (t) {
    this.nestConfig || (this.nestConfig = t);
  };
  E.prototype.sort = function ({
    sortTrigger: t,
    sortReverse: e,
    activeClass: n,
    animation: r,
  }) {
    if (((r = $($({}, this.animation), r)), r)) {
      r.enable = !/^false$/.test(String(r.enable));
      let l = r.effects.replace("fade", "");
      (r.effects = l),
        r.effects.indexOf("translate") < 0 &&
          (r.effects += " translate(0px,0px)  "),
        (this.animation = r);
    }
    r = this.animation;
    let i = () => [].slice.call(document.querySelectorAll(this.cms_selector)),
      o = [].slice.call(document.querySelectorAll(t));
    o.map((l) => {
      let h = l == null ? void 0 : l.tagName;
      h == "SELECT"
        ? l.addEventListener(
            "change",
            G((d) => {
              let p = d.target.selectedOptions[0].value;
              (p = p || d.getAttribute("sort-by")),
                a({ sortTarget: p, sortReverse: e });
            }, 200)
          )
        : h == "INPUT"
        ? l.addEventListener(
            "change",
            G((d) => {
              let p = d.target.getAttribute("sort-by") || "",
                f = String(n).replace(".", "");
              s(p, f),
                d.target.classList.toggle(f),
                a({ sortTarget: p, sortReverse: e });
            }, 200)
          )
        : l.addEventListener("click", (d) => {
            let p = d.currentTarget,
              f = (p == null ? void 0 : p.getAttribute("sort-by")) || "",
              u = String(n).replace(".", ""),
              A = p.classList.contains(u);
            s(p, u),
              l.classList.toggle(u),
              a({ sortTarget: f, sortReverse: A ? !e : e });
          });
    });
    let s = (l, h) => {
        o.forEach((d) => {
          d.outerHTML != l.outerHTML && d.classList.remove(h);
        });
      },
      c = new Intl.Collator("en", { numeric: !0, sensitivity: "base" }),
      a = ({ sortTarget: l, sortReverse: h }) => {
        let d = () => y({ sortReverse: h, sortTarget: l });
        if (r.enable) {
          let p = document.querySelector(this.cms_selector);
          It.methods.animate(d, p, r);
        } else d();
      },
      y = ({ sortTarget: l, sortReverse: h }) => {
        i().map((p) =>
          [].slice
            .call(p.children)
            .sort((f, u) => {
              let A = f.querySelector(l).textContent,
                g = u.querySelector(l).textContent,
                m = parseFloat(A),
                b = parseFloat(g);
              return isNaN(m + b) ? c.compare(A, g) : b - m;
            })
            .map((f) => {
              if (h) {
                p.insertBefore(f, p.firstChild);
                return;
              }
              p.appendChild(f);
            })
        );
      };
  };
  E.prototype.getNextData = function (t) {
    return new Promise((e) => {
      let n = new XMLHttpRequest();
      n.open("GET", t),
        n.send(),
        (n.onload = () => {
          if (n.status == 200) return e(n.response);
        });
    }).then((e) => e);
  };
  E.prototype.appendPaginatedData = function (t) {
    let n = Vt(t, "newDoc" + Date.now()).querySelectorAll(this.cms_selector)[
        this.index
      ],
      r = n.parentElement.querySelector(".w-pagination-next");
    if (
      (r ? this.setLoadmoreHref(r.href) : this.setLoadmoreHref(""),
      n && this.appendToCms(n.children),
      !this.hidden_collections.length && !r)
    )
      return (this.getLoadmoreHref().outerHTML = ""), "done";
  };
  E.prototype.appendToCms = function (t) {
    let e = this.getMasterCollection(),
      n = [].slice.call(t).map(
        (r) => (
          r.classList.add("fslib-fadeIn"),
          st(r, te(), ({ type: i }) => {
            r.classList.remove("fslib-fadeIn");
          }),
          (e.innerHTML += r.outerHTML),
          this.addClass && this.addclasses(this.addClassConfig),
          Promise.resolve()
        )
      );
    return this.nestConfig && this.nest(this.nestConfig), Promise.all(n);
  };
  E.prototype.setLoadmoreHref = function (t) {
    let n = this.getMasterCollection().parentElement.querySelector(
      "a.w-pagination-next"
    );
    return n.setAttribute("data-href", t), n;
  };
  E.prototype.getLoadmoreHref = function (t) {
    return this.getMasterCollection().parentElement.querySelector(
      t || "a.w-pagination-next"
    );
  };
  E.prototype.getHiddenCollections = function () {
    return [].slice
      .call(document.querySelectorAll(this.cms_selector))
      .filter((t) => !K(t));
  };
  E.prototype.setHiddenCollections = function () {
    let t = this.getHiddenCollections();
    this.hidden_collections = t.map((e) => e.parentElement.cloneNode(!0));
  };
  var je = (t) => {
    let e = document.head || document.getElementsByTagName("head")[0],
      n = document.createElement("style");
    return (
      e.appendChild(n),
      (n.type = "text/css"),
      n.styleSheet
        ? (n.styleSheet.cssText = t)
        : n.appendChild(document.createTextNode(t)),
      n
    );
  };
  var ze = ({
    bgColorActive: t = "#9AB87A",
    borderColor: e = "#3D315B",
    bgColor: n = "#444B6E",
    textColor: r = "#fff",
    textColorActive: i = "#000",
  }) => {
    je(`

      .wf-fslib-paginated-hide{
         display:none;
      }

      *[wf-fslib-paginated-hide="1"]{
        display:none;
      }

      *[wf-fslib-paginated-hide="2"]{
        display:unset;
      }

      .fs-pagination{
        display:inline-block;
        cursor:pointer;
      }


       .fs-pagination  a:hover {
            cursor: pointer;
        }

       .fs-pagination  ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
        }

       .fs-pagination  ul li {
            color: #fff;
            display: flex;
        }

       .fs-pagination  ul li a {
            background-color: ${n};
            padding: 4px 8px;
            border: 1px solid ${e};
            color: ${r};
            border-right: 0;
        }

       .fs-pagination  ul li.fs-pagination-active a {
             background-color: ${t};
             color:${i}
        }
      .fs-pagination ul li:first-child a {
            border-radius: 5px 0 0 5px;
        }
        
       .fs-pagination ul li:last-child a {
            border-radius: 0 5px 5px 0;
            border-right: 1px solid ${e};
        }`);
  };
  E.prototype.paginate = function (t, e) {
    if (
      ((this.activePageNumber = e),
      (this.totalPages = t),
      this.hasPaginationNext || this.hasPaginationNext)
    ) {
      this.updatePageCount();
      return;
    }
    let n = document.createElement("ul"),
      r,
      i = e - 1,
      o = e + 1;
    if (
      (e > 1 &&
        _({
          pages: t,
          page: e - 1,
          type: "prev",
          self: this,
          parent: n,
          classNames: "fs-pagination-prev fs-pagination-inactive",
        }),
      t < 6)
    )
      for (let s = 1; s <= t; s++)
        (r = e == s ? "fs-pagination-active" : "fs-pagination-inactive"),
          _({
            pages: t,
            page: s,
            type: "number",
            self: this,
            parent: n,
            classNames: r,
          });
    else {
      e > 2 &&
        (_({
          pages: t,
          page: 1,
          type: "number",
          self: this,
          parent: n,
          classNames: "fs-pagination-inactive",
        }),
        e > 3 &&
          _({
            pages: t,
            page: e - 2,
            type: "dots",
            self: this,
            parent: n,
            classNames: "fs-pagination-dots",
          })),
        e === 1 ? (o += 2) : e === 2 && (o += 1),
        e === t ? (i -= 2) : e === t - 1 && (i -= 1);
      for (let s = i; s <= o; s++)
        s === 0 && (s += 1),
          !(s > t) &&
            ((r = e == s ? "fs-pagination-active" : "fs-pagination-inactive"),
            _({
              pages: t,
              page: s,
              type: "number",
              self: this,
              parent: n,
              classNames: r,
            }));
      e < t - 1 &&
        (e < t - 2 &&
          _({
            pages: t,
            page: e + 2,
            type: "dots",
            self: this,
            parent: n,
            classNames: "fs-pagination-dots",
          }),
        _({
          pages: t,
          page: t,
          type: "number",
          self: this,
          parent: n,
          classNames: "fs-pagination-inactive",
        }));
    }
    e < t &&
      _({
        pages: t,
        page: e + 1,
        type: "next",
        self: this,
        parent: n,
        classNames: "fs-pagination-next fs-pagination-inactive",
      }),
      Ye(n);
  };
  function _({
    pages: t,
    page: e,
    type: n = "number",
    parent: r,
    self: i,
    classNames: o = "",
  }) {
    let s = document.createElement("li");
    s.classList.add("fs-pagination-page"), (s.className += ` ${o} `);
    let c = document.createElement("a");
    switch (n) {
      case "dots":
        c.innerHTML = "...";
        break;
      case "next":
        c.innerHTML = "Next";
        break;
      case "prev":
        c.innerHTML = "Prev";
        break;
      default:
        c.innerHTML = e;
        break;
    }
    return (
      s.appendChild(c),
      r.appendChild(s),
      c.addEventListener("click", () => {
        i.paginate(t, e);
      }),
      [s, c]
    );
  }
  function Ye(t) {
    let e = document.querySelector(".fs-pagination");
    if (e) {
      (e.innerHTML = ""), e.appendChild(t);
      return;
    }
    setTimeout(() => {
      Ye(t);
    }, 500);
  }
  E.prototype.setupPaginationButtons = function (t) {
    let e = document.querySelector(t),
      n = e.querySelector('[fs-pagination="next"]'),
      r = e.querySelector('[fs-pagination="previous"]');
    (this.paginationContainer = e),
      n &&
        ((this.hasPaginationNext = !0),
        n.addEventListener("click", () => {
          let { totalPages: i, activePageNumber: o } = this;
          i != o && this.paginate(i, o + 1);
        })),
      r &&
        ((this.hasPaginationPrevious = !0),
        r.addEventListener("click", () => {
          let { totalPages: i, activePageNumber: o } = this;
          this.activePageNumber <= 1 || this.paginate(i, o - 1);
        }));
  };
  E.prototype.updatePageCount = function () {
    let t = this.paginationContainer.querySelector(
      '[fs-pagination="page-count"]'
    );
    t && (t.textContent = `${this.activePageNumber} of ${this.totalPages}`);
  };
  E.prototype.loadmore = function (
    t = {
      button: "a.w-pagination-next",
      loadAll: !1,
      resetIx: !0,
      animation: this.animation,
      infiniteScroll: !1,
      infiniteScrollPercentage: 80,
      paginate: { enable: !1, itemsPerPage: 10, insertPagination: "" },
    }
  ) {
    let e = this,
      n = {},
      r = [];
    (this.hasLoadmore = !0), this.indexSet || this.setNextButtonIndex();
    let i = () => this.getMasterCollection();
    if (
      (this.setHiddenCollections(),
      (t.animation = $($({}, this.animation), t.animation)),
      t.animation)
    ) {
      let v = t.animation.effects.replace("fade", ""),
        { duration: x, easing: N } = t.animation;
      (x = x ? x / 1e3 : 1),
        (N = N || "linear"),
        this.makeStyleSheet({ duration: x, easing: N, transform: v });
    } else this.makeStyleSheet({});
    let {
        button: o,
        resetIx: s = !1,
        loadAll: c = !1,
        infiniteScroll: a = !1,
        infiniteScrollPercentage: y = 80,
        paginate: l = {
          enable: !1,
          itemsPerPage: 10,
          insertPagination: "",
          bgColorActive: "#9AB87A",
          borderColor: "#3D315B",
          bgColor: "#444B6E",
          textColor: "#000",
          textColorActive: "#000",
        },
      } = t,
      {
        textColor: h,
        bgColorActive: d,
        borderColor: p,
        bgColor: f,
        itemsPerPage: u,
        textColorActive: A,
      } = l,
      g = this.getLoadmoreHref(o);
    g.setAttribute("data-href", g.href),
      l.enable && this.setupPaginationButtons(l.insertPagination);
    let m = !1;
    g.addEventListener("click", (v) => {
      v.preventDefault(), C();
    }),
      c &&
        l.enable &&
        ((g.style.display = "none"),
        (this.isPaginated = !0),
        (this.itemsPerPage = u),
        ze({
          bgColorActive: d,
          textColor: h,
          borderColor: p,
          bgColor: f,
          textColorActive: A,
        }));
    let b = dt((v) => {
      let x = i(),
        N = x.children,
        F = N.length,
        I = Math.round((y * F) / 100);
      (Kt(N[I]) || !Gt(x).bottom) && C();
    }, 700);
    a && document.addEventListener("scroll", b);
    let C = (v = !1, x) => {
        if (m) return !1;
        this.loadmoreOn = !0;
        let N = g.getAttribute("data-href");
        if (((m = !0), N && !r.includes(N)))
          return this.getNextData(N).then((I) => {
            if ((r.push(N), this.appendPaginatedData(I), l.enable)) {
              let { itemsPerPage: k, insertPagination: T } = l;
              M(k, T, e).then((R) =>
                ot(this, null, function* () {
                  JSON.stringify(n) != JSON.stringify(e.filterObject) &&
                    (n = e.lastFilter ? yield e.lastFilter() : n);
                })
              );
            }
            (m = !1), s && this.reinitializeWebflow(), v && C(!0, x);
          });
        let F = this.hidden_collections.shift();
        if (F) {
          this.appendToCms(F.firstElementChild.children).then((k) => {
            if (l.enable) {
              let { itemsPerPage: T, insertPagination: R } = l;
              M(T, R, e).then((nt) => {
                JSON.stringify(n) != JSON.stringify(e.filterObject) &&
                  (n = e.lastFilter ? e.lastFilter() : n);
              });
            }
            s && this.reinitializeWebflow();
          });
          let I = F.querySelector(".w-pagination-next");
          if (
            (I && this.setLoadmoreHref(I.href),
            this.index++,
            (m = !1),
            !this.hidden_collections.length && !I)
          ) {
            (this.getLoadmoreHref().outerHTML = ""),
              x(!0),
              (this.loadmoreOn = !1);
            return;
          }
          v && C(!0, x);
        }
        s && this.reinitializeWebflow(), (this.loadmoreOn = !1), x(!0);
      },
      M = (v = 10, x, N) => {
        let F = i(),
          I = [].slice.call(F.children),
          k = I.length,
          T = Math.ceil(k / v);
        _e({ children: I, itemsPerPage: v, active: 1, filterOn: N.filterOn });
        let R = this.hasPaginationNext || this.hasPaginationNext,
          nt = document.querySelector(x),
          J = R
            ? nt
            : document.getElementById("wf-fslib-pagination") ||
              document.createElement("div");
        return (
          R ||
            ((J.id = "wf-fslib-pagination"), J.classList.add("fs-pagination")),
          J.addEventListener("click", function () {
            let Ge = i(),
              Ze = [].slice.call(Ge.children),
              Ve = N.activePageNumber;
            _e({
              children: Ze,
              itemsPerPage: v,
              active: Ve,
              filterOn: N.filterOn,
            });
          }),
          R || nt.appendChild(J),
          this.paginate(T, 1),
          Promise.resolve()
        );
      };
    return new Promise((v, x) => {
      document.addEventListener("DOMContentLoaded", function (N) {
        c &&
          C(!0, () => {
            (this.loadmoreOn = !1),
              (n = e.lastFilter ? e.lastFilter() : n),
              v();
          });
      });
    });
  };
  function _e({ children: t, itemsPerPage: e, active: n, filterOn: r }) {
    let i = [].slice.call(t);
    if (r) {
      i.filter((o) => o.hasAttribute("wf-fslib-paginated-hide")).forEach(
        (o, s) => {
          Je({ index: s, element: o, active: n, itemsPerPage: e, filterOn: r });
        }
      );
      return;
    }
    i.forEach((o, s) => {
      Je({ index: s, element: o, active: n, itemsPerPage: e, filterOn: r });
    });
  }
  var Je = ({
    index: t,
    element: e,
    active: n,
    itemsPerPage: r,
    filterOn: i = !1,
  }) => {
    let o = r * parseInt(n),
      s = o - r,
      c = e.hasAttribute("wf-fslib-paginated-hide");
    return t >= s && t < o
      ? (i
          ? c &&
            ((e.style.display = ""),
            e.setAttribute("wf-fslib-paginated-hide", 2))
          : (e.style.display = ""),
        !0)
      : (i
          ? c && e.setAttribute("wf-fslib-paginated-hide", 1)
          : (e.style.display = "none"),
        !1);
  };
  E.prototype.tabs = function ({
    tabComponent: t,
    tabContent: e,
    tabName: n,
    resetIx: r = !0,
  }) {
    let i = this.getMasterCollection(),
      o = [].slice.call(i.querySelectorAll(".w-dyn-item>*")),
      s = document.querySelector(t + " .w-tab-menu"),
      c = document.querySelector(t + " .w-tab-content"),
      a = c.children[0],
      y = s.getElementsByTagName("a")[0],
      l = window.Webflow || [],
      h = (d, p, f) =>
        o.map((u, A) => {
          let g = (u.querySelector(n) || {}).innerHTML || Zn(),
            m = u.querySelector(e) ? u.querySelector(e).innerHTML : "",
            b = Jn({ name: g, CTabName: m, prefix: d, index: A, classes: p });
          s.innerHTML += b;
          let C = u.outerHTML,
            M = Kn({ name: g, prefix: d, index: A, classes: f, content: C });
          return (c.innerHTML += M), Promise.resolve();
        });
    return new Promise((d, p) => {
      l.push(() => {
        if (window.___toggledInitTab___) return;
        let f = Gn(y.href);
        y.classList.remove("w--current"), a.classList.remove("w--tab-active");
        let u = y.className,
          A = a.className;
        (s.innerHTML = ""),
          (c.innerHTML = ""),
          Promise.all(h(f, u, A)).then((g) => {
            (window.___toggledInitTab___ = !0),
              window.Webflow.ready(),
              !!r && this.reinitializeWebflow(),
              d();
          });
      });
    }).catch((d) => null);
  };
  var Jn = ({ name: t, CTabName: e = "", prefix: n, index: r, classes: i }) => {
      let o = n + "-tab-" + r,
        s = n + "-pane-" + r,
        c = r == 0,
        a = i;
      return (
        c && (a += " w--current "),
        `<a data-w-tab="${t}" class="${a}" id="${o}" href="#${s}"
   role="tab"
   aria-controls="${s}"
   aria-selected="${c}" ${c ? "" : "tabindex='-1'"}>
          <div>${e || t}</div>
          </a>`
      );
    },
    Kn = ({ name: t, prefix: e, index: n, content: r, classes: i }) => {
      let o = e + "-tab-" + n,
        s = e + "-pane-" + n,
        c = n == 0,
        a = i;
      return (
        c && (a += " w--tab-active "),
        `<div data-w-tab="${t}" class="${a}" id="${s}" role="tabpanel" aria-labelledby="${o}">
${r}
    </div>`
      );
    },
    Gn = (t) => t.match(/(w-tabs-[0-9]{1}-data-w)/gi)[0],
    Zn = () => {
      let t = Math.random();
      return String(t).substr(2);
    };
  E.prototype.anchor = function ({
    anchorButton: t,
    buttonsTarget: e,
    activeClass: n,
    anchorId: r,
  }) {
    let i = this.getMasterCollection(),
      o = String(n).replace(".", ""),
      s = document.querySelector(e);
    s.innerHTML = "";
    let c = [].slice.call(i.querySelectorAll(".w-dyn-item")),
      a = window.Webflow || [],
      y = c.map((h, d, p) => {
        let f = h.querySelector(r).textContent.trim();
        f = f.replace(/\s+/gi, "-");
        let u = h.querySelector(t);
        (h.id = f), (u.href = "#" + f);
        let A = ee(u.outerHTML);
        return (
          s.appendChild(A), d == 0 && A.classList.add(o), Promise.resolve(h)
        );
      }),
      l = () => {
        Array.from(document.querySelectorAll(e + ">a")).forEach((h, d) => {
          if (h.classList.contains("w--current")) {
            h.classList.add(o);
            return;
          }
          h.classList.remove(o);
        });
      };
    return Promise.all(y).then((h) => {
      Zt("scroll", dt(l, 100));
    });
  };
  E.prototype.slider = function ({
    sliderComponent: t,
    itemsPerSlide: e = 1,
    resetIx: n = !0,
    continuous: r = !1,
  }) {
    let i = this.getMasterCollection(),
      o = [].slice.call(i.querySelectorAll(".w-dyn-item>*")),
      s = o.length,
      c = document.querySelector(t),
      a = c.querySelector(".w-slider-mask"),
      y = c.querySelector(".w-slider-nav"),
      l = c.querySelector(".w-slider-arrow-left"),
      h = c.querySelector(".w-slider-arrow-right"),
      d = window.Webflow || [];
    return new Promise((p, f) => {
      d.push(() => {
        if (window.___toggledInit___) return;
        let u = a.children[0].cloneNode(!0);
        a.innerHTML = "";
        let A = u.cloneNode(!0);
        (A.innerHTML = ""),
          s <= 1 &&
            ((y.outerHTML = ""), (l.outerHTML = ""), (h.outerHTML = ""));
        let g = o.map((m, b, C) => {
          let M = b + 1;
          return (
            A.setAttribute("aria-label", `${M} of ${s}`),
            (A.innerHTML += m.outerHTML),
            ((b + 1) % e == 0 || M == s) &&
              ((a.innerHTML += A.outerHTML), (A.innerHTML = "")),
            Promise.resolve(!0)
          );
        });
        Promise.all(g).then((m) => {
          (window.___toggledInit___ = !0),
            this.reinitializeWebflow(),
            r && Vn(c, a),
            p(!0);
        });
      });
    }).catch((p) => null);
  };
  var Vn = (t, e) => {
    let n = (o) => o.cloneNode(!0),
      r = t.getElementsByClassName("w-slide"),
      i = r.length;
    !i ||
      [...r].forEach((o) => {
        o.addEventListener("transitionstart", () => {
          if (o.getAttribute("aria-hidden")) return;
          let s = [...r],
            c = s.findIndex((a) => a === o) - 1;
          if (c == s.slice(i).length) {
            let a = n(r[c]);
            (a.style.transform = ""),
              e.appendChild(a),
              [...r]
                .slice(i)
                .forEach((y) => (y.style.transform = o.style.transform));
          } else if ((s.slice(i).forEach((a) => (a.outerHTML = "")), c >= 1))
            for (let a = 0; a <= c; a++) {
              let y = n(r[a]);
              (y.style.transform = ""),
                e.appendChild(y),
                [...r]
                  .slice(i)
                  .forEach((l) => (l.style.transform = o.style.transform));
            }
        });
      });
  };
  E.prototype.prevnext = function ({
    nextTarget: t,
    previousTarget: e,
    contentId: n,
    loadImages: r,
  }) {
    let i = this.getMasterCollection(),
      o = document.querySelector(t),
      s = document.querySelector(e),
      c = document.querySelector(n).textContent,
      a = [].slice.call(i.children),
      y = a.findIndex((d) => d.querySelector(n).textContent == c),
      l = a[y + 1],
      h = a[y - 1];
    if (l)
      l.querySelectorAll(r).forEach((d) => {
        d.style.display = "block";
      }),
        (o.innerHTML = l.innerHTML),
        l.querySelectorAll(r).forEach((d) => {
          d.style.display = "";
        });
    else
      try {
        (o.querySelector(":not(.prev-next-empty-message)").style.display =
          "none"),
          (o.querySelector(".prev-next-empty-message").style.display = "block");
      } catch (d) {}
    if (h)
      h.querySelectorAll(r).forEach((d) => {
        d.style.display = "block";
      }),
        (s.innerHTML = h.innerHTML),
        h.querySelectorAll(r).forEach((d) => {
          d.style.display = "";
        });
    else
      try {
        (s.querySelector(":not(.prev-next-empty-message)").style.display =
          "none"),
          (s.querySelector(".prev-next-empty-message").style.display = "block");
      } catch (d) {}
  };
  E.prototype.nest2 = function (n) {
    return ot(this, arguments, function* ({
      nestTarget: t,
      nestedCollectionsSelectors: e,
    }) {
      let r = document.querySelectorAll(`${this.cms_selector} .w-dyn-item`),
        i = e.map((c) => {
          let a = document.querySelector(`${c} .w-dyn-items`),
            y = a.querySelectorAll(".w-dyn-item"),
            l = Xn(y);
          return a.remove(), { selector: c, list: a, linksMap: l };
        }),
        o = new DOMParser(),
        s = [].slice.call(r).map((c) =>
          ot(this, null, function* () {
            var d;
            let a = (d = c.querySelector("a")) == null ? void 0 : d.href;
            if (!a) return;
            let l = yield (yield fetch(a)).text(),
              h = o.parseFromString(l, "text/html");
            i.forEach((p) => {
              var m;
              let f = h.querySelectorAll(`${p.selector} .w-dyn-item`),
                u = tr(f);
              if (!u.length) return;
              let A = Ke(p.list, !1);
              return (
                u.forEach((b) => {
                  let C = p.linksMap.get(b);
                  if (!C) return;
                  let M = Ke(C, !0);
                  A.appendChild(M);
                }),
                (m = c.querySelector(t) || c) == null || m.appendChild(A),
                A
              );
            });
          })
        );
      return Promise.all(s);
    });
  };
  var Xn = (t) => {
      let e = new Map();
      return (
        Array.from(t).forEach((n) => {
          var i;
          let r = (i = n.querySelector("a")) == null ? void 0 : i.href;
          r && e.set(r, n);
        }),
        e
      );
    },
    tr = (t) =>
      Array.from(t).reduce((n, r) => {
        var o;
        let i = (o = r.querySelector("a")) == null ? void 0 : o.href;
        return i && n.push(i), n;
      }, []),
    Ke = (t, e = !0) => t.cloneNode(e);
})();
