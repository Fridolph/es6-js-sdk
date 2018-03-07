const utils = {
    domSelector: (selector) => {
        return window.document.querySelector(selector);
    },

    getUrlParams: (key) => {
        const query = location.search.replace(/^\?/, '');
        let obj = {};
        query.split('&').map((item) => {
            let tmp = item.split('=');
            obj[tmp[0]] = tmp[1];
        })
        if (!key) {
            return obj;
        }
        else {
            return obj[key];
        }
    },

    obj2query: (obj) => {
        if (!obj) {
            return;
        }
        var query = Object.keys(obj)
           .filter(key => obj[key] !== '' && obj[key] !== null)
           .map(key => key + '=' + obj[key])
           .join('&');
        return query.length > 0 ? '?' + query : null;
    },

    hasClass: function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function (obj, cls) {
        obj.className.trim();
        if (!utils.hasClass(obj, cls)) obj.className += " " + cls;
    },

    removeClass: function (obj, cls) {
        if (utils.hasClass(obj, cls)) {
            const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    },

    isArray: function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    },

    isObject: function(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    },

    /*
     * 事件绑定or代理，
     * bindEvent(el, event fn)  //事件直接绑定
     * bindEvent(el, event, classSelector fn) //事件代理
     */
    bindEvent: function () {
        let target;
        let selector;
        let fn;
        const findNode = (el, selector, endel) =>  {
            if (el === endel) {
                return;
            }
            // console.log(el, tagName);
            if (document.querySelector(selector).className === el.className) {
                target = el;
            }
            else {
                findNode(el.parentNode, selector, endel);
            }
        };
        const el = arguments[0];
        const type = arguments[1];
        if (typeof arguments[2] === 'string') {
            selector = arguments[2];
            if (typeof arguments[3] === 'function') {
                fn = arguments[3];
            }
        }
        else if (typeof arguments[2] === 'function') {
            fn = arguments[2];
        }

        el.addEventListener(type, function (e) {
            if (!selector) {
                fn.call(el, e);
            }
            else if (selector) {
                findNode(e.target, selector, el);
                target && fn.call(target, {target: target});
            }
        });
    }
}

export default utils