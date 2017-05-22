(function($, window, undefined) {
/* !
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
  (function(e) {
    e.fn.hoverIntent=function(t, n, r) {
      let i = {interval: 100, sensitivity: 7, timeout: 0};
      if(typeof t==='object') {
        i = e.extend(i, t);
      } else if(e.isFunction(n)) {
        i=e.extend(i, {over: t, out: n, selector: r});
      } else{
        i=e.extend(i, {over: t, out: t, selector: n});
      }
      let s;
      let o;
      let u;
      let a;

      const f=function(e) {
        s=e.pageX; o=e.pageY;
      };
      const l=function(t, n) {
        n.hoverIntent_t=clearTimeout(n.hoverIntent_t);
        if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity) {
          e(n).off('mousemove.hoverIntent', f); n.hoverIntent_s=1;
          return i.over.apply(n, [t]);
        } else{
          u=s; a=o; n.hoverIntent_t=setTimeout(() => {
            l(t, n);
          }, i.interval);
        }
      };
      const c=function(e, t) {
        t.hoverIntent_t=clearTimeout(t.hoverIntent_t);
        t.hoverIntent_s=0;
        return i.out.apply(t, [e]);
      };
      const h=function(t) {
        const n=jQuery.extend({}, t);
        const r=this; if(r.hoverIntent_t) {
          r.hoverIntent_t=clearTimeout(r.hoverIntent_t);
        }
        if(t.type=='mouseenter') {
          u=n.pageX; a=n.pageY; e(r).on('mousemove.hoverIntent', f);
          if(r.hoverIntent_s!=1) {
            r.hoverIntent_t=setTimeout(() => {
              l(n, r);
            }, i.interval);
          }
        } else{
          e(r).off('mousemove.hoverIntent', f); if(r.hoverIntent_s==1) {
            r.hoverIntent_t=setTimeout(() => {
              c(n, r);
            }, i.timeout);
          }
        }
      };
      return this.on({
        'mouseenter.hoverIntent': h,
        'mouseleave.hoverIntent': h,
      }, i.selector);
    };
  })(jQuery);


  (function(c, q) {
    const m='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP/' +
            '//ywAAAAAAQABAAACAUwAOw==';
    c.fn.imagesLoaded=function(f) {
      /**
        * @param {None} empty There is no parameter here
        */
      function n() {
        const b=c(j);
        const a=c(h);
        d&&(h.length?d.reject(e, b, a):d.resolve(e));
        c.isFunction(f)&&f.call(g, e, b, a);
      }

      /**
        * @param {unknown} b Do not know what this is.
        */
      function p(b) {
        k(b.target, 'error'===b.type);
      }

      /**
        * @param {unknown} b Do not know what this is.
        * @param {unknown} a Do not know what this is.
        */
      function k(b, a) {
        b.src===m||-1!==c.inArray(b, l) ||
        (l.push(b), a?h.push(b):j.push(b), c.data(b, 'imagesLoaded',
        {isBroken: a, src: b.src}),
        r&&d.notifyWith(c(b),
          [a, e, c(j),
            c(h)]),
        e.length===l.length&&(setTimeout(n),
        e.unbind('.imagesLoaded',
        p)));
      }
      const g=this;

      // eslint-disable-next-line
      const d = c.isFunction(c.Deferred)?c.Deferred():0;
      const r = c.isFunction(d.notify);
      const e=g.find('img').add(g.filter('img'));
      const l=[];
      const j=[];
      const h=[];

      c.isPlainObject(f)&&c.each(f, (b, a) => {
        if('callback'===b)f=a;
        else if(d)d[b](a);
      });

      e.length?e.bind('load.imagesLoaded error.imagesLoaded', p)
        .each((b, a) => {
          const d = a.src;
          const e = c.data(a, 'imagesLoaded');
          if(e&&e.src===d)k(a, e.isBroken);
          else if(a.complete&&a.naturalWidth!==q)k(a, 0===a.naturalWidth ||
            0===a.naturalHeight); else if(a.readyState||
            a.complete)a.src=m, a.src=d;
        }):
      n();

      return d?d.promise(g):g;
    };
  })(jQuery);
})(jQuery, window);
