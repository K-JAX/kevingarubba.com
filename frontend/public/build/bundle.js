
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }
    class HtmlTag {
        constructor() {
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    const active_docs = new Set();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        active_docs.add(doc);
        const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
        const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
        if (!current_rules[name]) {
            current_rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            active_docs.forEach(doc => {
                const stylesheet = doc.__svelte_stylesheet;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                doc.__svelte_rules = {};
            });
            active_docs.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function backOut(t) {
        const s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    }
    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }
    function elasticOut(t) {
        return (Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * Math.pow(2.0, -10.0 * t) + 1.0);
    }
    function expoInOut(t) {
        return t === 0.0 || t === 1.0
            ? t
            : t < 0.5
                ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0)
                : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
    }
    function expoOut(t) {
        return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    }
    function sineIn(t) {
        const v = Math.cos(t * Math.PI * 0.5);
        if (Math.abs(v) < 1e-14)
            return 1;
        else
            return 1 - v;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.44.0 */

    function create_fragment(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			 {
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			 {
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.44.0 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			 if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		 {
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.44.0 */
    const file = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$2(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			 $$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			 $$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			 $$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			 $$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			 $$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Atoms/Logo.svelte generated by Svelte v3.44.0 */
    const file$1 = "src/Components/Design/Atoms/Logo.svelte";

    // (11:0) {#if ready}
    function create_if_block$1(ctx) {
    	let svg;
    	let mask;
    	let rect0;
    	let polyline0;
    	let path;
    	let defs;
    	let linearGradient0;
    	let stop0;
    	let stop1;
    	let linearGradient1;
    	let stop2;
    	let stop3;
    	let stop4;
    	let stop5;
    	let stop6;
    	let stop7;
    	let linearGradient2;
    	let stop8;
    	let stop9;
    	let stop10;
    	let stop11;
    	let stop12;
    	let filter;
    	let feOffset;
    	let feColorMatrix;
    	let feGaussianBlur;
    	let feBlend;
    	let polyline1;
    	let polyline2;
    	let circle;
    	let rect1;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			mask = svg_element("mask");
    			rect0 = svg_element("rect");
    			polyline0 = svg_element("polyline");
    			path = svg_element("path");
    			defs = svg_element("defs");
    			linearGradient0 = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			linearGradient1 = svg_element("linearGradient");
    			stop2 = svg_element("stop");
    			stop3 = svg_element("stop");
    			stop4 = svg_element("stop");
    			stop5 = svg_element("stop");
    			stop6 = svg_element("stop");
    			stop7 = svg_element("stop");
    			linearGradient2 = svg_element("linearGradient");
    			stop8 = svg_element("stop");
    			stop9 = svg_element("stop");
    			stop10 = svg_element("stop");
    			stop11 = svg_element("stop");
    			stop12 = svg_element("stop");
    			filter = svg_element("filter");
    			feOffset = svg_element("feOffset");
    			feColorMatrix = svg_element("feColorMatrix");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feBlend = svg_element("feBlend");
    			polyline1 = svg_element("polyline");
    			polyline2 = svg_element("polyline");
    			circle = svg_element("circle");
    			rect1 = svg_element("rect");
    			attr_dev(rect0, "x", "0");
    			attr_dev(rect0, "y", "0");
    			attr_dev(rect0, "width", "100%");
    			attr_dev(rect0, "height", "100%");
    			attr_dev(rect0, "fill", "white");
    			add_location(rect0, file$1, 18, 12, 376);
    			attr_dev(polyline0, "points", "1050, 0 565, 505 1050, 500");
    			attr_dev(polyline0, "fill", "black");
    			add_location(polyline0, file$1, 19, 12, 454);
    			attr_dev(path, "d", "M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95\n                Q10,65,10,35 Z");
    			attr_dev(path, "fill", "black");
    			add_location(path, file$1, 24, 12, 652);
    			attr_dev(mask, "id", "gMask");
    			add_location(mask, file$1, 16, 8, 278);
    			attr_dev(stop0, "offset", "0%");
    			set_style(stop0, "stop-color", "rgb(0,0,0)");
    			set_style(stop0, "stop-opacity", "0.125");
    			add_location(stop0, file$1, 33, 16, 942);
    			attr_dev(stop1, "offset", "100%");
    			set_style(stop1, "stop-color", "rgb(0,0,0)");
    			set_style(stop1, "stop-opacity", "1");
    			add_location(stop1, file$1, 37, 16, 1090);
    			attr_dev(linearGradient0, "id", "ringgrad");
    			attr_dev(linearGradient0, "x1", "0%");
    			attr_dev(linearGradient0, "y1", "0%");
    			attr_dev(linearGradient0, "x2", "100%");
    			attr_dev(linearGradient0, "y2", "0%");
    			add_location(linearGradient0, file$1, 32, 12, 861);
    			attr_dev(stop2, "offset", "0%");
    			set_style(stop2, "stop-color", "rgb(10,10,10)");
    			set_style(stop2, "stop-opacity", "1");
    			add_location(stop2, file$1, 50, 16, 1485);
    			attr_dev(stop3, "offset", "15%");
    			set_style(stop3, "stop-color", "rgb(111,111,111)");
    			set_style(stop3, "stop-opacity", "1");
    			add_location(stop3, file$1, 54, 16, 1632);
    			attr_dev(stop4, "offset", "17%");
    			set_style(stop4, "stop-color", "rgb(255,255,255)");
    			set_style(stop4, "stop-opacity", "1");
    			add_location(stop4, file$1, 58, 16, 1783);
    			attr_dev(stop5, "offset", "35%");
    			set_style(stop5, "stop-color", "rgb(177,177,177)");
    			set_style(stop5, "stop-opacity", "1");
    			add_location(stop5, file$1, 62, 16, 1934);
    			attr_dev(stop6, "offset", "50%");
    			set_style(stop6, "stop-color", "rgb(177,177,177)");
    			set_style(stop6, "stop-opacity", "1");
    			add_location(stop6, file$1, 66, 16, 2085);
    			attr_dev(stop7, "offset", "100%");
    			set_style(stop7, "stop-color", "rgb(177,177,177)");
    			set_style(stop7, "stop-opacity", "1");
    			add_location(stop7, file$1, 70, 16, 2236);
    			attr_dev(linearGradient1, "id", "angelgrad");
    			attr_dev(linearGradient1, "x1", "0%");
    			attr_dev(linearGradient1, "y1", "0%");
    			attr_dev(linearGradient1, "x2", "100%");
    			attr_dev(linearGradient1, "y2", "0%");
    			attr_dev(linearGradient1, "gradientTransform", "rotate(135)");
    			add_location(linearGradient1, file$1, 42, 12, 1262);
    			attr_dev(stop8, "offset", "0%");
    			set_style(stop8, "stop-color", "rgb(177,177,177)");
    			set_style(stop8, "stop-opacity", "1");
    			add_location(stop8, file$1, 83, 16, 2637);
    			attr_dev(stop9, "offset", "37%");
    			set_style(stop9, "stop-color", "rgb(177,177,177)");
    			set_style(stop9, "stop-opacity", "1");
    			add_location(stop9, file$1, 87, 16, 2787);
    			attr_dev(stop10, "offset", "52%");
    			set_style(stop10, "stop-color", "rgb(255,255,255)");
    			set_style(stop10, "stop-opacity", "1");
    			add_location(stop10, file$1, 91, 16, 2938);
    			attr_dev(stop11, "offset", "55%");
    			set_style(stop11, "stop-color", "rgb(177,177,177)");
    			set_style(stop11, "stop-opacity", "1");
    			add_location(stop11, file$1, 95, 16, 3089);
    			attr_dev(stop12, "offset", "100%");
    			set_style(stop12, "stop-color", "rgb(0,0,0)");
    			set_style(stop12, "stop-opacity", "1");
    			add_location(stop12, file$1, 99, 16, 3240);
    			attr_dev(linearGradient2, "id", "angelgrad2");
    			attr_dev(linearGradient2, "x1", "0%");
    			attr_dev(linearGradient2, "y1", "0%");
    			attr_dev(linearGradient2, "x2", "100%");
    			attr_dev(linearGradient2, "y2", "0%");
    			attr_dev(linearGradient2, "gradientTransform", "rotate(45)");
    			add_location(linearGradient2, file$1, 75, 12, 2414);
    			attr_dev(feOffset, "result", "offOut");
    			attr_dev(feOffset, "in", "SourceAlpha");
    			attr_dev(feOffset, "dx", "-30");
    			attr_dev(feOffset, "dy", "0");
    			add_location(feOffset, file$1, 105, 16, 3496);
    			attr_dev(feColorMatrix, "result", "matrixOut");
    			attr_dev(feColorMatrix, "in", "offOut");
    			attr_dev(feColorMatrix, "type", "matrix");
    			attr_dev(feColorMatrix, "values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.45 0");
    			add_location(feColorMatrix, file$1, 111, 16, 3680);
    			attr_dev(feGaussianBlur, "result", "blurOut");
    			attr_dev(feGaussianBlur, "in", "matrixOut");
    			attr_dev(feGaussianBlur, "stdDeviation", "20");
    			add_location(feGaussianBlur, file$1, 117, 16, 3928);
    			attr_dev(feBlend, "in", "SourceGraphic");
    			attr_dev(feBlend, "in2", "blurOut");
    			attr_dev(feBlend, "mode", "normal");
    			add_location(feBlend, file$1, 122, 16, 4105);
    			attr_dev(filter, "id", "vertShadow");
    			attr_dev(filter, "x", "-450%");
    			attr_dev(filter, "y", "0");
    			attr_dev(filter, "width", "540%");
    			attr_dev(filter, "height", "200%");
    			add_location(filter, file$1, 104, 12, 3412);
    			add_location(defs, file$1, 31, 8, 842);
    			attr_dev(polyline1, "class", "top-angle svelte-ntwmk");
    			attr_dev(polyline1, "points", "1050, 0 550, 505");
    			add_location(polyline1, file$1, 130, 8, 4296);
    			attr_dev(polyline2, "class", "bottom-angle svelte-ntwmk");
    			attr_dev(polyline2, "points", "550, 495 1050, 1000");
    			add_location(polyline2, file$1, 131, 8, 4370);
    			attr_dev(circle, "class", "ring svelte-ntwmk");
    			attr_dev(circle, "cx", "500");
    			attr_dev(circle, "cy", "500");
    			attr_dev(circle, "r", "300");
    			attr_dev(circle, "mask", "url(#gMask)");
    			add_location(circle, file$1, 133, 8, 4451);
    			attr_dev(rect1, "class", "vert svelte-ntwmk");
    			attr_dev(rect1, "x", "48%");
    			attr_dev(rect1, "y", "0");
    			attr_dev(rect1, "filter", "url(#vertShadow)");
    			add_location(rect1, file$1, 141, 8, 4605);
    			attr_dev(svg, "class", "svg-logo -mt-2 w-32 h-32 md:w-20 md:h-20 svelte-ntwmk");
    			attr_dev(svg, "viewBox", "0 0 1000 1000");
    			add_location(svg, file$1, 11, 4, 169);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, mask);
    			append_dev(mask, rect0);
    			append_dev(mask, polyline0);
    			append_dev(mask, path);
    			append_dev(svg, defs);
    			append_dev(defs, linearGradient0);
    			append_dev(linearGradient0, stop0);
    			append_dev(linearGradient0, stop1);
    			append_dev(defs, linearGradient1);
    			append_dev(linearGradient1, stop2);
    			append_dev(linearGradient1, stop3);
    			append_dev(linearGradient1, stop4);
    			append_dev(linearGradient1, stop5);
    			append_dev(linearGradient1, stop6);
    			append_dev(linearGradient1, stop7);
    			append_dev(defs, linearGradient2);
    			append_dev(linearGradient2, stop8);
    			append_dev(linearGradient2, stop9);
    			append_dev(linearGradient2, stop10);
    			append_dev(linearGradient2, stop11);
    			append_dev(linearGradient2, stop12);
    			append_dev(defs, filter);
    			append_dev(filter, feOffset);
    			append_dev(filter, feColorMatrix);
    			append_dev(filter, feGaussianBlur);
    			append_dev(filter, feBlend);
    			append_dev(svg, polyline1);
    			append_dev(svg, polyline2);
    			append_dev(svg, circle);
    			append_dev(svg, rect1);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(11:0) {#if ready}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*ready*/ ctx[0] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Logo', slots, []);
    	let ready = false;

    	onMount(async () => {
    		$$invalidate(0, ready = true);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Logo> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount, ready });

    	$$self.$inject_state = $$props => {
    		if ('ready' in $$props) $$invalidate(0, ready = $$props.ready);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ready];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/Components/Design/Atoms/SVGText.svelte generated by Svelte v3.44.0 */
    const file$2 = "src/Components/Design/Atoms/SVGText.svelte";

    // (44:8) {#if hoverStartGrad && hoverEndGrad }
    function create_if_block_1$1(ctx) {
    	let linearGradient;
    	let stop0;
    	let stop0_style_value;
    	let stop1;
    	let stop1_style_value;
    	let linearGradient_id_value;
    	let linearGradient_gradientTransform_value;

    	const block = {
    		c: function create() {
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			attr_dev(stop0, "offset", "0%");
    			attr_dev(stop0, "style", stop0_style_value = `stop-color:${/*hoverStartGrad*/ ctx[5]};stop-opacity:1`);
    			add_location(stop0, file$2, 45, 12, 1338);
    			attr_dev(stop1, "offset", "100%");
    			attr_dev(stop1, "style", stop1_style_value = `stop-color:${/*hoverEndGrad*/ ctx[6]};stop-opacity:1`);
    			add_location(stop1, file$2, 49, 12, 1475);
    			attr_dev(linearGradient, "id", linearGradient_id_value = `textGradient-hover`);
    			attr_dev(linearGradient, "x1", "0%");
    			attr_dev(linearGradient, "y1", "0%");
    			attr_dev(linearGradient, "x2", "100%");
    			attr_dev(linearGradient, "y2", "0%");
    			attr_dev(linearGradient, "gradientTransform", linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`);
    			add_location(linearGradient, file$2, 44, 8, 1208);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, linearGradient, anchor);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*hoverStartGrad*/ 32 && stop0_style_value !== (stop0_style_value = `stop-color:${/*hoverStartGrad*/ ctx[5]};stop-opacity:1`)) {
    				attr_dev(stop0, "style", stop0_style_value);
    			}

    			if (dirty & /*hoverEndGrad*/ 64 && stop1_style_value !== (stop1_style_value = `stop-color:${/*hoverEndGrad*/ ctx[6]};stop-opacity:1`)) {
    				attr_dev(stop1, "style", stop1_style_value);
    			}

    			if (dirty & /*gRotate*/ 4 && linearGradient_gradientTransform_value !== (linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`)) {
    				attr_dev(linearGradient, "gradientTransform", linearGradient_gradientTransform_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(linearGradient);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(44:8) {#if hoverStartGrad && hoverEndGrad }",
    		ctx
    	});

    	return block;
    }

    // (59:4) {#if hoverStartGrad && hoverEndGrad }
    function create_if_block$2(ctx) {
    	let text_1;
    	let t;
    	let text_1_fill_value;

    	const block = {
    		c: function create() {
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[0]);
    			attr_dev(text_1, "class", "hover-text svelte-ug9hhg");
    			attr_dev(text_1, "fill", text_1_fill_value = `url(#textGradient-hover)`);
    			attr_dev(text_1, "x", "0");
    			attr_dev(text_1, "y", "75%");
    			add_location(text_1, file$2, 59, 4, 1797);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, text_1, anchor);
    			append_dev(text_1, t);
    			/*text_1_binding_1*/ ctx[11](text_1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*text*/ 1) set_data_dev(t, /*text*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(text_1);
    			/*text_1_binding_1*/ ctx[11](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(59:4) {#if hoverStartGrad && hoverEndGrad }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let svg;
    	let defs;
    	let linearGradient;
    	let stop0;
    	let stop0_style_value;
    	let stop1;
    	let stop1_style_value;
    	let linearGradient_id_value;
    	let linearGradient_gradientTransform_value;
    	let text_1;
    	let t;
    	let text_1_fill_value;
    	let if_block0 = /*hoverStartGrad*/ ctx[5] && /*hoverEndGrad*/ ctx[6] && create_if_block_1$1(ctx);
    	let if_block1 = /*hoverStartGrad*/ ctx[5] && /*hoverEndGrad*/ ctx[6] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			if (if_block0) if_block0.c();
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[0]);
    			if (if_block1) if_block1.c();
    			attr_dev(stop0, "offset", "0%");
    			attr_dev(stop0, "style", stop0_style_value = `stop-color:${/*startGrad*/ ctx[3]};stop-opacity:1`);
    			add_location(stop0, file$2, 34, 12, 876);
    			attr_dev(stop1, "offset", "100%");
    			attr_dev(stop1, "style", stop1_style_value = `stop-color:${/*endGrad*/ ctx[4]};stop-opacity:1`);
    			add_location(stop1, file$2, 38, 12, 1008);
    			attr_dev(linearGradient, "id", linearGradient_id_value = `textGradient-${/*random*/ ctx[9]}`);
    			attr_dev(linearGradient, "x1", "0%");
    			attr_dev(linearGradient, "y1", "0%");
    			attr_dev(linearGradient, "x2", "100%");
    			attr_dev(linearGradient, "y2", "0%");
    			attr_dev(linearGradient, "gradientTransform", linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`);
    			add_location(linearGradient, file$2, 33, 8, 742);
    			add_location(defs, file$2, 32, 4, 727);
    			attr_dev(text_1, "fill", text_1_fill_value = `url(#textGradient-${/*random*/ ctx[9]})`);
    			attr_dev(text_1, "x", "0");
    			attr_dev(text_1, "y", "75%");
    			add_location(text_1, file$2, 57, 4, 1657);
    			attr_dev(svg, "class", "svg-text-component inline-block svelte-ug9hhg");
    			attr_dev(svg, "viewbbox", "0 0 240 80");
    			attr_dev(svg, "width", /*width*/ ctx[1]);
    			attr_dev(svg, "height", /*height*/ ctx[8]);
    			add_location(svg, file$2, 31, 0, 625);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, linearGradient);
    			append_dev(linearGradient, stop0);
    			append_dev(linearGradient, stop1);
    			if (if_block0) if_block0.m(defs, null);
    			append_dev(svg, text_1);
    			append_dev(text_1, t);
    			/*text_1_binding*/ ctx[10](text_1);
    			if (if_block1) if_block1.m(svg, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*startGrad*/ 8 && stop0_style_value !== (stop0_style_value = `stop-color:${/*startGrad*/ ctx[3]};stop-opacity:1`)) {
    				attr_dev(stop0, "style", stop0_style_value);
    			}

    			if (dirty & /*endGrad*/ 16 && stop1_style_value !== (stop1_style_value = `stop-color:${/*endGrad*/ ctx[4]};stop-opacity:1`)) {
    				attr_dev(stop1, "style", stop1_style_value);
    			}

    			if (dirty & /*gRotate*/ 4 && linearGradient_gradientTransform_value !== (linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`)) {
    				attr_dev(linearGradient, "gradientTransform", linearGradient_gradientTransform_value);
    			}

    			if (/*hoverStartGrad*/ ctx[5] && /*hoverEndGrad*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$1(ctx);
    					if_block0.c();
    					if_block0.m(defs, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*text*/ 1) set_data_dev(t, /*text*/ ctx[0]);

    			if (/*hoverStartGrad*/ ctx[5] && /*hoverEndGrad*/ ctx[6]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					if_block1.m(svg, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*width*/ 2) {
    				attr_dev(svg, "width", /*width*/ ctx[1]);
    			}

    			if (dirty & /*height*/ 256) {
    				attr_dev(svg, "height", /*height*/ ctx[8]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (if_block0) if_block0.d();
    			/*text_1_binding*/ ctx[10](null);
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SVGText', slots, []);
    	let { text } = $$props;
    	let { width = "100%" } = $$props;
    	let { gRotate = "90" } = $$props;
    	let { startGrad = 'rgb(190,190,190)' } = $$props;
    	let { endGrad = 'rgb(20,20,20)' } = $$props;
    	let { hoverStartGrad = '' } = $$props;
    	let { hoverEndGrad = '' } = $$props;
    	let mySVGText;
    	let box;
    	let height;
    	let random = Math.round(Math.random() * 10000);

    	onMount(async () => {
    		box = mySVGText.getBBox();
    		$$invalidate(8, height = box.height + 0);
    	}); // this.hoverStartGrad = hoverStartGrad;
    	// this.hoverEndGrad = hoverEndGrad;

    	const writable_props = [
    		'text',
    		'width',
    		'gRotate',
    		'startGrad',
    		'endGrad',
    		'hoverStartGrad',
    		'hoverEndGrad'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SVGText> was created with unknown prop '${key}'`);
    	});

    	function text_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			mySVGText = $$value;
    			$$invalidate(7, mySVGText);
    		});
    	}

    	function text_1_binding_1($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			mySVGText = $$value;
    			$$invalidate(7, mySVGText);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('gRotate' in $$props) $$invalidate(2, gRotate = $$props.gRotate);
    		if ('startGrad' in $$props) $$invalidate(3, startGrad = $$props.startGrad);
    		if ('endGrad' in $$props) $$invalidate(4, endGrad = $$props.endGrad);
    		if ('hoverStartGrad' in $$props) $$invalidate(5, hoverStartGrad = $$props.hoverStartGrad);
    		if ('hoverEndGrad' in $$props) $$invalidate(6, hoverEndGrad = $$props.hoverEndGrad);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		tick,
    		text,
    		width,
    		gRotate,
    		startGrad,
    		endGrad,
    		hoverStartGrad,
    		hoverEndGrad,
    		mySVGText,
    		box,
    		height,
    		random
    	});

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('width' in $$props) $$invalidate(1, width = $$props.width);
    		if ('gRotate' in $$props) $$invalidate(2, gRotate = $$props.gRotate);
    		if ('startGrad' in $$props) $$invalidate(3, startGrad = $$props.startGrad);
    		if ('endGrad' in $$props) $$invalidate(4, endGrad = $$props.endGrad);
    		if ('hoverStartGrad' in $$props) $$invalidate(5, hoverStartGrad = $$props.hoverStartGrad);
    		if ('hoverEndGrad' in $$props) $$invalidate(6, hoverEndGrad = $$props.hoverEndGrad);
    		if ('mySVGText' in $$props) $$invalidate(7, mySVGText = $$props.mySVGText);
    		if ('box' in $$props) box = $$props.box;
    		if ('height' in $$props) $$invalidate(8, height = $$props.height);
    		if ('random' in $$props) $$invalidate(9, random = $$props.random);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		text,
    		width,
    		gRotate,
    		startGrad,
    		endGrad,
    		hoverStartGrad,
    		hoverEndGrad,
    		mySVGText,
    		height,
    		random,
    		text_1_binding,
    		text_1_binding_1
    	];
    }

    class SVGText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			text: 0,
    			width: 1,
    			gRotate: 2,
    			startGrad: 3,
    			endGrad: 4,
    			hoverStartGrad: 5,
    			hoverEndGrad: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SVGText",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<SVGText> was created without expected prop 'text'");
    		}
    	}

    	get text() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get gRotate() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set gRotate(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get startGrad() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set startGrad(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get endGrad() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set endGrad(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hoverStartGrad() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoverStartGrad(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hoverEndGrad() {
    		throw new Error("<SVGText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set hoverEndGrad(value) {
    		throw new Error("<SVGText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Atoms/SiteTitle.svelte generated by Svelte v3.44.0 */

    const file$3 = "src/Components/Design/Atoms/SiteTitle.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let h1;
    	let svgtext0;
    	let h1_intro;
    	let t;
    	let h2;
    	let svgtext1;
    	let h2_intro;
    	let current;

    	svgtext0 = new SVGText({
    			props: {
    				text: /*title*/ ctx[0],
    				width: "300px",
    				startGrad: "rgb(130,134,184)",
    				endGrad: "rgb(0,0,4)"
    			},
    			$$inline: true
    		});

    	svgtext1 = new SVGText({
    			props: {
    				text: /*description*/ ctx[1],
    				width: "300px",
    				startGrad: "rgb(124,74,94)",
    				endGrad: "rgb(55,170,195)"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			create_component(svgtext0.$$.fragment);
    			t = space();
    			h2 = element("h2");
    			create_component(svgtext1.$$.fragment);
    			attr_dev(h1, "class", "site-title bg-whiteFade text-3xl md:text-xl font-hairline uppercase svelte-1em240d");
    			add_location(h1, file$3, 13, 4, 275);
    			attr_dev(h2, "class", "site-description svelte-1em240d");
    			add_location(h2, file$3, 14, 4, 505);
    			attr_dev(div, "class", "inline-block self-center -mt-10 md:mt-0 md:self-start");
    			add_location(div, file$3, 12, 0, 203);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			mount_component(svgtext0, h1, null);
    			append_dev(div, t);
    			append_dev(div, h2);
    			mount_component(svgtext1, h2, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const svgtext0_changes = {};
    			if (dirty & /*title*/ 1) svgtext0_changes.text = /*title*/ ctx[0];
    			svgtext0.$set(svgtext0_changes);
    			const svgtext1_changes = {};
    			if (dirty & /*description*/ 2) svgtext1_changes.text = /*description*/ ctx[1];
    			svgtext1.$set(svgtext1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svgtext0.$$.fragment, local);

    			if (!h1_intro) {
    				add_render_callback(() => {
    					h1_intro = create_in_transition(h1, fly, { x: -80, duration: 2000, delay: 1000 });
    					h1_intro.start();
    				});
    			}

    			transition_in(svgtext1.$$.fragment, local);

    			if (!h2_intro) {
    				add_render_callback(() => {
    					h2_intro = create_in_transition(h2, fly, { x: -80, duration: 2000, delay: 1400 });
    					h2_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svgtext0.$$.fragment, local);
    			transition_out(svgtext1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(svgtext0);
    			destroy_component(svgtext1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SiteTitle', slots, []);
    	let { title, description } = $$props;
    	const writable_props = ['title', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SiteTitle> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({ fade, fly, SVGText, title, description });

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description];
    }

    class SiteTitle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0, description: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SiteTitle",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<SiteTitle> was created without expected prop 'title'");
    		}

    		if (/*description*/ ctx[1] === undefined && !('description' in props)) {
    			console.warn("<SiteTitle> was created without expected prop 'description'");
    		}
    	}

    	get title() {
    		throw new Error("<SiteTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SiteTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<SiteTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<SiteTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/SiteTitleHeader.svelte generated by Svelte v3.44.0 */
    const file$4 = "src/Components/Design/Molecules/SiteTitleHeader.svelte";

    // (11:4) <Link to="/">
    function create_default_slot_1(ctx) {
    	let div;
    	let logo;
    	let t;
    	let sitetitle;
    	let current;
    	logo = new Logo({ $$inline: true });

    	sitetitle = new SiteTitle({
    			props: {
    				title: /*title*/ ctx[0],
    				description: /*description*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(logo.$$.fragment);
    			t = space();
    			create_component(sitetitle.$$.fragment);
    			attr_dev(div, "class", "logo-container flex flex-row md:content-start svelte-9v8ce");
    			add_location(div, file$4, 11, 8, 260);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(logo, div, null);
    			append_dev(div, t);
    			mount_component(sitetitle, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sitetitle_changes = {};
    			if (dirty & /*title*/ 1) sitetitle_changes.title = /*title*/ ctx[0];
    			if (dirty & /*description*/ 2) sitetitle_changes.description = /*description*/ ctx[1];
    			sitetitle.$set(sitetitle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(sitetitle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(sitetitle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(logo);
    			destroy_component(sitetitle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(11:4) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (10:0) <Router>
    function create_default_slot(ctx) {
    	let link;
    	let current;

    	link = new Link({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(link.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(link, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope, title, description*/ 7) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(10:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, title, description*/ 7) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SiteTitleHeader', slots, []);
    	let { title, description } = $$props;
    	const writable_props = ['title', 'description'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SiteTitleHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Link,
    		title,
    		description,
    		Logo,
    		SiteTitle
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, description];
    }

    class SiteTitleHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { title: 0, description: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SiteTitleHeader",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<SiteTitleHeader> was created without expected prop 'title'");
    		}

    		if (/*description*/ ctx[1] === undefined && !('description' in props)) {
    			console.warn("<SiteTitleHeader> was created without expected prop 'description'");
    		}
    	}

    	get title() {
    		throw new Error("<SiteTitleHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<SiteTitleHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<SiteTitleHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<SiteTitleHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Organisms/Header.svelte generated by Svelte v3.44.0 */
    const file$5 = "src/Components/Design/Organisms/Header.svelte";

    function create_fragment$7(ctx) {
    	let header;
    	let sitetitleheader;
    	let t;
    	let div;
    	let current;

    	sitetitleheader = new SiteTitleHeader({
    			props: {
    				title: "Kevin Garubba",
    				description: "Design | Development"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			create_component(sitetitleheader.$$.fragment);
    			t = space();
    			div = element("div");
    			attr_dev(header, "class", "site-header fixed flex flex-col svelte-33juzm");
    			add_location(header, file$5, 5, 0, 141);
    			attr_dev(div, "id", "header-placeholder");
    			attr_dev(div, "class", "w-32 sm:w-2 svelte-33juzm");
    			add_location(div, file$5, 9, 0, 282);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			mount_component(sitetitleheader, header, null);
    			insert_dev(target, t, anchor);
    			insert_dev(target, div, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sitetitleheader.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sitetitleheader.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(sitetitleheader);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SiteTitleHeader });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src/Components/Design/Atoms/Burger.svelte generated by Svelte v3.44.0 */
    const file$6 = "src/Components/Design/Atoms/Burger.svelte";

    function create_fragment$8(ctx) {
    	let button;
    	let div1;
    	let div0;
    	let span0;
    	let t0;
    	let span1;
    	let t1;
    	let span2;
    	let t2;
    	let div2;
    	let svg0;
    	let path0;
    	let t3;
    	let svg1;
    	let mask;
    	let path1;
    	let t4;
    	let div5;
    	let div4;
    	let div3;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			div1 = element("div");
    			div0 = element("div");
    			span0 = element("span");
    			t0 = space();
    			span1 = element("span");
    			t1 = space();
    			span2 = element("span");
    			t2 = space();
    			div2 = element("div");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t3 = space();
    			svg1 = svg_element("svg");
    			mask = svg_element("mask");
    			path1 = svg_element("path");
    			t4 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			attr_dev(span0, "class", "bun-top svelte-1m8v1if");
    			add_location(span0, file$6, 22, 12, 572);
    			attr_dev(span1, "class", "burger-filling svelte-1m8v1if");
    			add_location(span1, file$6, 23, 12, 614);
    			attr_dev(span2, "class", "bun-bottom svelte-1m8v1if");
    			add_location(span2, file$6, 24, 12, 663);
    			attr_dev(div0, "class", "burger-container svelte-1m8v1if");
    			add_location(div0, file$6, 21, 8, 529);
    			attr_dev(div1, "class", "burger-icon svelte-1m8v1if");
    			add_location(div1, file$6, 20, 4, 495);
    			attr_dev(path0, "class", "path svelte-1m8v1if");
    			attr_dev(path0, "fill", "none");
    			attr_dev(path0, "stroke", "#000");
    			attr_dev(path0, "stroke-miterlimit", "10");
    			attr_dev(path0, "stroke-width", "4");
    			attr_dev(path0, "d", "M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2");
    			add_location(path0, file$6, 30, 12, 797);
    			attr_dev(svg0, "class", "svg-ring svelte-1m8v1if");
    			add_location(svg0, file$6, 29, 8, 762);
    			attr_dev(div2, "class", "burger-ring svelte-1m8v1if");
    			add_location(div2, file$6, 28, 4, 728);
    			attr_dev(path1, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(path1, "fill", "none");
    			attr_dev(path1, "stroke", "#ff0000");
    			attr_dev(path1, "stroke-miterlimit", "10");
    			attr_dev(path1, "stroke-width", "4");
    			attr_dev(path1, "d", "M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4");
    			add_location(path1, file$6, 36, 12, 1064);
    			attr_dev(mask, "id", "mask");
    			add_location(mask, file$6, 35, 8, 1035);
    			attr_dev(svg1, "width", "0");
    			attr_dev(svg1, "height", "0");
    			add_location(svg1, file$6, 34, 4, 1000);
    			attr_dev(div3, "class", "path-rotation svelte-1m8v1if");
    			add_location(div3, file$6, 42, 8, 1351);
    			attr_dev(div4, "class", "animate-path svelte-1m8v1if");
    			add_location(div4, file$6, 41, 6, 1316);
    			attr_dev(div5, "class", "path-burger svelte-1m8v1if");
    			add_location(div5, file$6, 40, 4, 1284);
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(`burger ${/*template*/ ctx[1]} mt-4 md:mt-0 ${/*ready*/ ctx[2] ? 'ready' : ''} ${/*active*/ ctx[0]}`) + " svelte-1m8v1if"));
    			add_location(button, file$6, 19, 0, 385);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div1);
    			append_dev(div1, div0);
    			append_dev(div0, span0);
    			append_dev(div0, t0);
    			append_dev(div0, span1);
    			append_dev(div0, t1);
    			append_dev(div0, span2);
    			append_dev(button, t2);
    			append_dev(button, div2);
    			append_dev(div2, svg0);
    			append_dev(svg0, path0);
    			append_dev(button, t3);
    			append_dev(button, svg1);
    			append_dev(svg1, mask);
    			append_dev(mask, path1);
    			append_dev(button, t4);
    			append_dev(button, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*addActive*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*template, ready, active*/ 7 && button_class_value !== (button_class_value = "" + (null_to_empty(`burger ${/*template*/ ctx[1]} mt-4 md:mt-0 ${/*ready*/ ctx[2] ? 'ready' : ''} ${/*active*/ ctx[0]}`) + " svelte-1m8v1if"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Burger', slots, []);
    	let { active = '' } = $$props;
    	let { template = '' } = $$props;
    	let ready = false;

    	let addActive = () => {
    		if (ready == true) {
    			$$invalidate(0, active = active === 'active' ? 'closed' : 'active');
    		}
    	};

    	onMount(async () => {
    		setTimeout(
    			function () {
    				$$invalidate(2, ready = true);
    			},
    			1000
    		);
    	});

    	const writable_props = ['active', 'template'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Burger> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('template' in $$props) $$invalidate(1, template = $$props.template);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		active,
    		template,
    		ready,
    		addActive
    	});

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('template' in $$props) $$invalidate(1, template = $$props.template);
    		if ('ready' in $$props) $$invalidate(2, ready = $$props.ready);
    		if ('addActive' in $$props) $$invalidate(3, addActive = $$props.addActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [active, template, ready, addActive];
    }

    class Burger extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { active: 0, template: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Burger",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get active() {
    		throw new Error("<Burger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Burger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get template() {
    		throw new Error("<Burger>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set template(value) {
    		throw new Error("<Burger>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Atoms/Copyright.svelte generated by Svelte v3.44.0 */
    const file$7 = "src/Components/Design/Atoms/Copyright.svelte";

    function create_fragment$9(ctx) {
    	let small;
    	let small_transition;
    	let current;

    	const block = {
    		c: function create() {
    			small = element("small");
    			small.textContent = `Kevin Garubba ©${/*year*/ ctx[0]}`;
    			attr_dev(small, "class", "copy-text self-center uppercase bold text-gray-500 svelte-wm5iss");
    			add_location(small, file$7, 5, 0, 107);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, small, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!small_transition) small_transition = create_bidirectional_transition(small, fade, { duration: 3000 }, true);
    				small_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!small_transition) small_transition = create_bidirectional_transition(small, fade, { duration: 3000 }, false);
    			small_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(small);
    			if (detaching && small_transition) small_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Copyright', slots, []);
    	let year = new Date().getFullYear();
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Copyright> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fade, year });

    	$$self.$inject_state = $$props => {
    		if ('year' in $$props) $$invalidate(0, year = $$props.year);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [year];
    }

    class Copyright extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Copyright",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/Components/Design/Molecules/Nav.svelte generated by Svelte v3.44.0 */

    const file$8 = "src/Components/Design/Molecules/Nav.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (47:16) <Link to={link.slug} on:click={addActive}>
    function create_default_slot_1$1(ctx) {
    	let span;
    	let svgtext;
    	let span_style_value;
    	let current;

    	svgtext = new SVGText({
    			props: {
    				text: /*link*/ ctx[6].title,
    				width: "300px",
    				startGrad: "rgb(154,180,182)",
    				endGrad: "rgb(19,26,50)",
    				hoverStartGrad: "rgb(255,255,255)",
    				hoverEndGrad: "rgb(255,255,255)"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			span = element("span");
    			create_component(svgtext.$$.fragment);
    			attr_dev(span, "class", "link-text svelte-tdpa6e");
    			attr_dev(span, "style", span_style_value = `transition-delay: ${/*i*/ ctx[8] * 2 + 4}00ms`);
    			add_location(span, file$8, 47, 20, 1441);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			mount_component(svgtext, span, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const svgtext_changes = {};
    			if (dirty & /*links*/ 2) svgtext_changes.text = /*link*/ ctx[6].title;
    			svgtext.$set(svgtext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svgtext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svgtext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			destroy_component(svgtext);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(47:16) <Link to={link.slug} on:click={addActive}>",
    		ctx
    	});

    	return block;
    }

    // (45:8) {#each links as link, i}
    function create_each_block(ctx) {
    	let li;
    	let link;
    	let t;
    	let li_style_value;
    	let current;

    	link = new Link({
    			props: {
    				to: /*link*/ ctx[6].slug,
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link.$on("click", /*addActive*/ ctx[2]);

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			t = space();
    			attr_dev(li, "class", "nav-item after list-none text-5xl my-2 svelte-tdpa6e");
    			attr_dev(li, "style", li_style_value = `animation-delay: ${/*i*/ ctx[8] * 1 + 3}00ms;`);
    			add_location(li, file$8, 45, 12, 1261);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_changes = {};
    			if (dirty & /*links*/ 2) link_changes.to = /*link*/ ctx[6].slug;

    			if (dirty & /*$$scope, links*/ 514) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(45:8) {#each links as link, i}",
    		ctx
    	});

    	return block;
    }

    // (42:0) <Router>
    function create_default_slot$1(ctx) {
    	let nav;
    	let ul;
    	let nav_class_value;
    	let current;
    	let each_value = /*links*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "flex flex-col text-left mt-32 ml-32 justify-start");
    			add_location(ul, file$8, 43, 8, 1153);
    			attr_dev(nav, "class", nav_class_value = "" + (null_to_empty(`site-nav ${/*className*/ ctx[0]} fixed w-full h-full flex content-left justify-start`) + " svelte-tdpa6e"));
    			add_location(nav, file$8, 42, 4, 1055);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links, addActive*/ 6) {
    				each_value = /*links*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*className*/ 1 && nav_class_value !== (nav_class_value = "" + (null_to_empty(`site-nav ${/*className*/ ctx[0]} fixed w-full h-full flex content-left justify-start`) + " svelte-tdpa6e"))) {
    				attr_dev(nav, "class", nav_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(42:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, className, links*/ 515) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    	const isActive = href === "/"
    	? isCurrent
    	: isPartiallyCurrent || isCurrent;

    	// The object returned here is spread on the anchor element's attributes
    	if (isActive) {
    		return { class: "active" };
    	}

    	return {};
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	let { className } = $$props;
    	let { active = '' } = $$props;
    	let links = [];
    	let loadState = false;

    	let addActive = () => {
    		// if( ready == true ){
    		$$invalidate(3, active = active === 'active' ? 'closed' : 'active');
    	}; // }

    	const apiURL = 'http://wp:8080/wp-json';

    	onMount(async () => {
    		const res = await fetch(`${apiURL}/menus/v1/locations/menu-1`);
    		const json = await res.json();
    		$$invalidate(1, links = json.items);
    		loadState = true;
    	});

    	const writable_props = ['className', 'active'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Router,
    		Link,
    		SVGText,
    		className,
    		active,
    		links,
    		loadState,
    		addActive,
    		apiURL,
    		getProps
    	});

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    		if ('links' in $$props) $$invalidate(1, links = $$props.links);
    		if ('loadState' in $$props) loadState = $$props.loadState;
    		if ('addActive' in $$props) $$invalidate(2, addActive = $$props.addActive);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, links, addActive, active];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { className: 0, active: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$a.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*className*/ ctx[0] === undefined && !('className' in props)) {
    			console.warn("<Nav> was created without expected prop 'className'");
    		}
    	}

    	get className() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Nav>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Nav>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/Footer.svelte generated by Svelte v3.44.0 */
    const file$9 = "src/Components/Design/Molecules/Footer.svelte";

    function create_fragment$b(ctx) {
    	let footer;
    	let burger;
    	let updating_active;
    	let t0;
    	let copyright;
    	let footer_class_value;
    	let t1;
    	let nav;
    	let updating_active_1;
    	let current;

    	function burger_active_binding(value) {
    		/*burger_active_binding*/ ctx[2](value);
    	}

    	let burger_props = { template: /*template*/ ctx[0] };

    	if (/*active*/ ctx[1] !== void 0) {
    		burger_props.active = /*active*/ ctx[1];
    	}

    	burger = new Burger({ props: burger_props, $$inline: true });
    	binding_callbacks.push(() => bind(burger, 'active', burger_active_binding));
    	copyright = new Copyright({ $$inline: true });

    	function nav_active_binding(value) {
    		/*nav_active_binding*/ ctx[3](value);
    	}

    	let nav_props = { className: /*active*/ ctx[1] };

    	if (/*active*/ ctx[1] !== void 0) {
    		nav_props.active = /*active*/ ctx[1];
    	}

    	nav = new Nav({ props: nav_props, $$inline: true });
    	binding_callbacks.push(() => bind(nav, 'active', nav_active_binding));

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			create_component(burger.$$.fragment);
    			t0 = space();
    			create_component(copyright.$$.fragment);
    			t1 = space();
    			create_component(nav.$$.fragment);
    			attr_dev(footer, "class", footer_class_value = "" + (null_to_empty(`site-footer grid fixed text-center`) + " svelte-gpzxn4"));
    			add_location(footer, file$9, 13, 0, 243);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			mount_component(burger, footer, null);
    			append_dev(footer, t0);
    			mount_component(copyright, footer, null);
    			insert_dev(target, t1, anchor);
    			mount_component(nav, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const burger_changes = {};
    			if (dirty & /*template*/ 1) burger_changes.template = /*template*/ ctx[0];

    			if (!updating_active && dirty & /*active*/ 2) {
    				updating_active = true;
    				burger_changes.active = /*active*/ ctx[1];
    				add_flush_callback(() => updating_active = false);
    			}

    			burger.$set(burger_changes);
    			const nav_changes = {};
    			if (dirty & /*active*/ 2) nav_changes.className = /*active*/ ctx[1];

    			if (!updating_active_1 && dirty & /*active*/ 2) {
    				updating_active_1 = true;
    				nav_changes.active = /*active*/ ctx[1];
    				add_flush_callback(() => updating_active_1 = false);
    			}

    			nav.$set(nav_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(burger.$$.fragment, local);
    			transition_in(copyright.$$.fragment, local);
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(burger.$$.fragment, local);
    			transition_out(copyright.$$.fragment, local);
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_component(burger);
    			destroy_component(copyright);
    			if (detaching) detach_dev(t1);
    			destroy_component(nav, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	let { template = '' } = $$props;
    	let active;
    	const writable_props = ['template'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	function burger_active_binding(value) {
    		active = value;
    		$$invalidate(1, active);
    	}

    	function nav_active_binding(value) {
    		active = value;
    		$$invalidate(1, active);
    	}

    	$$self.$$set = $$props => {
    		if ('template' in $$props) $$invalidate(0, template = $$props.template);
    	};

    	$$self.$capture_state = () => ({ Burger, Copyright, Nav, template, active });

    	$$self.$inject_state = $$props => {
    		if ('template' in $$props) $$invalidate(0, template = $$props.template);
    		if ('active' in $$props) $$invalidate(1, active = $$props.active);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [template, active, burger_active_binding, nav_active_binding];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { template: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get template() {
    		throw new Error("<Footer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set template(value) {
    		throw new Error("<Footer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/SocialNav.svelte generated by Svelte v3.44.0 */
    const file$a = "src/Components/Design/Molecules/SocialNav.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (23:8) {#each links as link, i}
    function create_each_block$1(ctx) {
    	let li;
    	let a;
    	let i_1;
    	let i_1_class_value;
    	let a_href_value;
    	let li_style_value;

    	const block = {
    		c: function create() {
    			li = element("li");
    			a = element("a");
    			i_1 = element("i");
    			attr_dev(i_1, "class", i_1_class_value = `text-3xl fab ${/*link*/ ctx[3].icon}`);
    			add_location(i_1, file$a, 23, 202, 741);
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[3].url);
    			attr_dev(a, "class", "text-gray-400 hover:text-blue duration-500");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$a, 23, 116, 655);
    			attr_dev(li, "class", "my-6 py-2 text-center svelte-iae26c");
    			attr_dev(li, "style", li_style_value = `transition: transform 0.25s ${Math.floor(/*i*/ ctx[5] * 1.5 + 4.49)}00ms`);
    			add_location(li, file$a, 23, 8, 547);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, a);
    			append_dev(a, i_1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links*/ 1 && i_1_class_value !== (i_1_class_value = `text-3xl fab ${/*link*/ ctx[3].icon}`)) {
    				attr_dev(i_1, "class", i_1_class_value);
    			}

    			if (dirty & /*links*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[3].url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(23:8) {#each links as link, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let nav;
    	let ul;
    	let nav_class_value;
    	let each_value = /*links*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(ul, file$a, 21, 4, 501);
    			attr_dev(nav, "class", nav_class_value = "" + (null_to_empty(`${/*loadState*/ ctx[1] ? 'loaded' : ''} social-nav relative w-8 self-center mr-2`) + " svelte-iae26c"));
    			add_location(nav, file$a, 20, 0, 411);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Math, links*/ 1) {
    				each_value = /*links*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*loadState*/ 2 && nav_class_value !== (nav_class_value = "" + (null_to_empty(`${/*loadState*/ ctx[1] ? 'loaded' : ''} social-nav relative w-8 self-center mr-2`) + " svelte-iae26c"))) {
    				attr_dev(nav, "class", nav_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SocialNav', slots, []);
    	let links = [];
    	let loadState = false;
    	const apiURL = 'http://wp:8080/wp-json';

    	onMount(async () => {
    		const res = await fetch(`${apiURL}/menus/v1/locations/social`);
    		const json = await res.json();
    		$$invalidate(0, links = json.items);

    		setTimeout(
    			function () {
    				$$invalidate(1, loadState = true);
    			},
    			1000
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SocialNav> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ onMount, links, loadState, apiURL });

    	$$self.$inject_state = $$props => {
    		if ('links' in $$props) $$invalidate(0, links = $$props.links);
    		if ('loadState' in $$props) $$invalidate(1, loadState = $$props.loadState);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [links, loadState];
    }

    class SocialNav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SocialNav",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/Components/Design/Organisms/Sidebar.svelte generated by Svelte v3.44.0 */
    const file$b = "src/Components/Design/Organisms/Sidebar.svelte";

    function create_fragment$d(ctx) {
    	let aside;
    	let div;
    	let t;
    	let socialnav;
    	let current;
    	socialnav = new SocialNav({ $$inline: true });

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			div = element("div");
    			t = space();
    			create_component(socialnav.$$.fragment);
    			attr_dev(div, "class", "sidebar-line absolute mx-auto svelte-88y5zg");
    			add_location(div, file$b, 11, 4, 229);
    			attr_dev(aside, "class", "sidebar fixed flex flex-col content-center justify-center w-32 md:w-20 h-full sm:hidden svelte-88y5zg");
    			add_location(aside, file$b, 7, 0, 112);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			append_dev(aside, div);
    			append_dev(aside, t);
    			mount_component(socialnav, aside, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(socialnav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(socialnav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			destroy_component(socialnav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sidebar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ SocialNav });
    	return [];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src/Components/Design/Atoms/PageTitle.svelte generated by Svelte v3.44.0 */
    const file$c = "src/Components/Design/Atoms/PageTitle.svelte";

    // (15:0) {#if title !== ''}
    function create_if_block$3(ctx) {
    	let div;
    	let h1;
    	let span;
    	let h1_class_value;
    	let h1_style_value;
    	let h1_intro;
    	let h1_outro;
    	let div_class_value;
    	let div_style_value;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			span = element("span");
    			add_location(span, file$c, 22, 12, 675);
    			attr_dev(h1, "class", h1_class_value = "" + (null_to_empty(`${/*className*/ ctx[2]} text-base font-bold tracking-widest uppercase before`) + " svelte-hj94cn"));
    			attr_dev(h1, "style", h1_style_value = `${/*style*/ ctx[3]}`);
    			add_location(h1, file$c, 16, 8, 390);
    			attr_dev(div, "class", div_class_value = `${/*containerClass*/ ctx[1]}`);
    			attr_dev(div, "style", div_style_value = `overflow-y:hidden;`);
    			add_location(div, file$c, 15, 4, 319);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(h1, span);
    			span.innerHTML = /*title*/ ctx[0];
    			/*h1_binding*/ ctx[6](h1);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (!current || dirty & /*title*/ 1) span.innerHTML = /*title*/ ctx[0];
    			if (!current || dirty & /*className*/ 4 && h1_class_value !== (h1_class_value = "" + (null_to_empty(`${/*className*/ ctx[2]} text-base font-bold tracking-widest uppercase before`) + " svelte-hj94cn"))) {
    				attr_dev(h1, "class", h1_class_value);
    			}

    			if (!current || dirty & /*style*/ 8 && h1_style_value !== (h1_style_value = `${/*style*/ ctx[3]}`)) {
    				attr_dev(h1, "style", h1_style_value);
    			}

    			if (!current || dirty & /*containerClass*/ 2 && div_class_value !== (div_class_value = `${/*containerClass*/ ctx[1]}`)) {
    				attr_dev(div, "class", div_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (h1_outro) h1_outro.end(1);

    				h1_intro = create_in_transition(h1, fly, {
    					y: /*height*/ ctx[4],
    					delay: 1000,
    					duration: 1000,
    					easing: backOut
    				});

    				h1_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (h1_intro) h1_intro.invalidate();
    			h1_outro = create_out_transition(h1, fly, { y: /*height*/ ctx[4] });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			/*h1_binding*/ ctx[6](null);
    			if (detaching && h1_outro) h1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(15:0) {#if title !== ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*title*/ ctx[0] !== '' && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*title*/ ctx[0] !== '') {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*title*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PageTitle', slots, []);
    	let { title = '', containerClass = '', className = '', style = '', height = 50 } = $$props;
    	let text, placeHolderText;

    	onMount(async () => {
    		
    	});

    	const writable_props = ['title', 'containerClass', 'className', 'style', 'height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PageTitle> was created with unknown prop '${key}'`);
    	});

    	function h1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			text = $$value;
    			$$invalidate(5, text);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('containerClass' in $$props) $$invalidate(1, containerClass = $$props.containerClass);
    		if ('className' in $$props) $$invalidate(2, className = $$props.className);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    		if ('height' in $$props) $$invalidate(4, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({
    		fly,
    		backOut,
    		onMount,
    		title,
    		containerClass,
    		className,
    		style,
    		height,
    		text,
    		placeHolderText
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('containerClass' in $$props) $$invalidate(1, containerClass = $$props.containerClass);
    		if ('className' in $$props) $$invalidate(2, className = $$props.className);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    		if ('height' in $$props) $$invalidate(4, height = $$props.height);
    		if ('text' in $$props) $$invalidate(5, text = $$props.text);
    		if ('placeHolderText' in $$props) placeHolderText = $$props.placeHolderText;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, containerClass, className, style, height, text, h1_binding];
    }

    class PageTitle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {
    			title: 0,
    			containerClass: 1,
    			className: 2,
    			style: 3,
    			height: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PageTitle",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get title() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get containerClass() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set containerClass(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<PageTitle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<PageTitle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Functional/Head.svelte generated by Svelte v3.44.0 */
    const file$d = "src/Components/Functional/Head.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i].name;
    	child_ctx[11] = list[i].property;
    	child_ctx[12] = list[i].content;
    	return child_ctx;
    }

    // (69:79) 
    function create_if_block_1$2(ctx) {
    	let meta_1;
    	let meta_1_name_value;
    	let meta_1_content_value;

    	const block = {
    		c: function create() {
    			meta_1 = element("meta");
    			attr_dev(meta_1, "name", meta_1_name_value = /*property*/ ctx[11]);
    			attr_dev(meta_1, "content", meta_1_content_value = /*content*/ ctx[12]);
    			add_location(meta_1, file$d, 69, 12, 2154);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, meta_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*meta*/ 4 && meta_1_name_value !== (meta_1_name_value = /*property*/ ctx[11])) {
    				attr_dev(meta_1, "name", meta_1_name_value);
    			}

    			if (dirty & /*meta*/ 4 && meta_1_content_value !== (meta_1_content_value = /*content*/ ctx[12])) {
    				attr_dev(meta_1, "content", meta_1_content_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(meta_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(69:79) ",
    		ctx
    	});

    	return block;
    }

    // (67:8) {#if name != undefined || name != null || name != '' }
    function create_if_block$4(ctx) {
    	let meta_1;
    	let meta_1_name_value;
    	let meta_1_content_value;

    	const block = {
    		c: function create() {
    			meta_1 = element("meta");
    			attr_dev(meta_1, "name", meta_1_name_value = /*name*/ ctx[10]);
    			attr_dev(meta_1, "content", meta_1_content_value = /*content*/ ctx[12]);
    			add_location(meta_1, file$d, 67, 12, 2023);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, meta_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*meta*/ 4 && meta_1_name_value !== (meta_1_name_value = /*name*/ ctx[10])) {
    				attr_dev(meta_1, "name", meta_1_name_value);
    			}

    			if (dirty & /*meta*/ 4 && meta_1_content_value !== (meta_1_content_value = /*content*/ ctx[12])) {
    				attr_dev(meta_1, "content", meta_1_content_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(meta_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(67:8) {#if name != undefined || name != null || name != '' }",
    		ctx
    	});

    	return block;
    }

    // (66:4) {#each meta as {name, property, content}}
    function create_each_block$2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*name*/ ctx[10] != undefined || /*name*/ ctx[10] != null || /*name*/ ctx[10] != '') return create_if_block$4;
    		if (/*property*/ ctx[11] != undefined || /*property*/ ctx[11] != null || /*property*/ ctx[11] != '') return create_if_block_1$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(66:4) {#each meta as {name, property, content}}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let title_value;
    	let link;
    	let each_1_anchor;
    	document.title = title_value = /*title*/ ctx[1];
    	let each_value = /*meta*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			link = element("link");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(link, "rel", "icon");
    			attr_dev(link, "href", /*fav*/ ctx[0]);
    			add_location(link, file$d, 62, 4, 1847);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(document.head, null);
    			}

    			append_dev(document.head, each_1_anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 2 && title_value !== (title_value = /*title*/ ctx[1])) {
    				document.title = title_value;
    			}

    			if (dirty & /*fav*/ 1) {
    				attr_dev(link, "href", /*fav*/ ctx[0]);
    			}

    			if (dirty & /*meta, undefined*/ 4) {
    				each_value = /*meta*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(link);
    			destroy_each(each_blocks, detaching);
    			detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Head', slots, []);
    	let { pageTagData = {} } = $$props;

    	let fav = '',
    		favJson = '',
    		siteTitle = '',
    		siteJson = '',
    		title = '',
    		meta = [],
    		stateStore = '';

    	const apiURL = 'http://wp:8080/wp-json';

    	const getJsonResponse = async () => {
    		const [favResponse, siteResponse] = await Promise.all([fetch(`${apiURL}/wp/v2/favicon`), fetch(`${apiURL}/`)]);
    		favJson = await favResponse.json();
    		siteJson = await siteResponse.json();
    		tick();
    		$$invalidate(0, fav = favJson.url);
    		siteTitle = siteJson.name + ' ' + siteJson.description;

    		// Check if there's yoast data then and assign with what exists
    		if (pageTagData.yoast_title == undefined) {
    			$$invalidate(
    				3,
    				pageTagData.yoast_title = pageTagData.title != undefined
    				? pageTagData.title.rendered
    				: siteTitle,
    				pageTagData
    			);
    		}

    		if (pageTagData.yoast_meta == undefined) {
    			$$invalidate(
    				3,
    				pageTagData.yoast_meta = [
    					{
    						name: "description",
    						content: "Welcome to Kevin Garubba Design & Development site, where I showcase my latest portfolio pieces in web design and mobile application development."
    					}
    				],
    				pageTagData
    			);
    		}

    		$$invalidate(1, title = pageTagData.yoast_title);
    		$$invalidate(2, meta = pageTagData.yoast_meta);

    		if (pageTagData.title !== undefined) {
    			stateStore = pageTagData.title.rendered;
    		}
    	};

    	onMount(async () => {
    		await getJsonResponse();
    	});

    	afterUpdate(async () => {
    		if (pageTagData.title !== undefined) {
    			if (stateStore != pageTagData.title.rendered) {
    				await getJsonResponse();
    			}
    		}
    	});

    	AOS.init();
    	const writable_props = ['pageTagData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Head> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('pageTagData' in $$props) $$invalidate(3, pageTagData = $$props.pageTagData);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		tick,
    		pageTagData,
    		fav,
    		favJson,
    		siteTitle,
    		siteJson,
    		title,
    		meta,
    		stateStore,
    		apiURL,
    		getJsonResponse
    	});

    	$$self.$inject_state = $$props => {
    		if ('pageTagData' in $$props) $$invalidate(3, pageTagData = $$props.pageTagData);
    		if ('fav' in $$props) $$invalidate(0, fav = $$props.fav);
    		if ('favJson' in $$props) favJson = $$props.favJson;
    		if ('siteTitle' in $$props) siteTitle = $$props.siteTitle;
    		if ('siteJson' in $$props) siteJson = $$props.siteJson;
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('meta' in $$props) $$invalidate(2, meta = $$props.meta);
    		if ('stateStore' in $$props) stateStore = $$props.stateStore;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [fav, title, meta, pageTagData];
    }

    class Head extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, { pageTagData: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Head",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get pageTagData() {
    		throw new Error("<Head>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pageTagData(value) {
    		throw new Error("<Head>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-feather-icons/src/icons/ArrowRightIcon.svelte generated by Svelte v3.44.0 */

    const file$e = "node_modules/svelte-feather-icons/src/icons/ArrowRightIcon.svelte";

    function create_fragment$g(ctx) {
    	let svg;
    	let line;
    	let polyline;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			line = svg_element("line");
    			polyline = svg_element("polyline");
    			attr_dev(line, "x1", "5");
    			attr_dev(line, "y1", "12");
    			attr_dev(line, "x2", "19");
    			attr_dev(line, "y2", "12");
    			add_location(line, file$e, 13, 248, 534);
    			attr_dev(polyline, "points", "12 5 19 12 12 19");
    			add_location(polyline, file$e, 13, 292, 578);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[0]);
    			attr_dev(svg, "height", /*size*/ ctx[0]);
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", svg_class_value = "feather feather-arrow-right " + /*customClass*/ ctx[2]);
    			add_location(svg, file$e, 13, 0, 286);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, line);
    			append_dev(svg, polyline);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "width", /*size*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "height", /*size*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*customClass*/ 4 && svg_class_value !== (svg_class_value = "feather feather-arrow-right " + /*customClass*/ ctx[2])) {
    				attr_dev(svg, "class", svg_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ArrowRightIcon', slots, []);
    	let { size = "100%" } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { class: customClass = "" } = $$props;

    	if (size !== "100%") {
    		size = size.slice(-1) === 'x'
    		? size.slice(0, size.length - 1) + 'em'
    		: parseInt(size) + 'px';
    	}

    	const writable_props = ['size', 'strokeWidth', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ArrowRightIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('class' in $$props) $$invalidate(2, customClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({ size, strokeWidth, customClass });

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('customClass' in $$props) $$invalidate(2, customClass = $$props.customClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [size, strokeWidth, customClass];
    }

    class ArrowRightIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { size: 0, strokeWidth: 1, class: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ArrowRightIcon",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get size() {
    		throw new Error("<ArrowRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ArrowRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeWidth() {
    		throw new Error("<ArrowRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeWidth(value) {
    		throw new Error("<ArrowRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ArrowRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ArrowRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-feather-icons/src/icons/ChevronLeftIcon.svelte generated by Svelte v3.44.0 */

    const file$f = "node_modules/svelte-feather-icons/src/icons/ChevronLeftIcon.svelte";

    function create_fragment$h(ctx) {
    	let svg;
    	let polyline;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			polyline = svg_element("polyline");
    			attr_dev(polyline, "points", "15 18 9 12 15 6");
    			add_location(polyline, file$f, 13, 249, 535);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[0]);
    			attr_dev(svg, "height", /*size*/ ctx[0]);
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", svg_class_value = "feather feather-chevron-left " + /*customClass*/ ctx[2]);
    			add_location(svg, file$f, 13, 0, 286);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, polyline);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "width", /*size*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "height", /*size*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*customClass*/ 4 && svg_class_value !== (svg_class_value = "feather feather-chevron-left " + /*customClass*/ ctx[2])) {
    				attr_dev(svg, "class", svg_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChevronLeftIcon', slots, []);
    	let { size = "100%" } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { class: customClass = "" } = $$props;

    	if (size !== "100%") {
    		size = size.slice(-1) === 'x'
    		? size.slice(0, size.length - 1) + 'em'
    		: parseInt(size) + 'px';
    	}

    	const writable_props = ['size', 'strokeWidth', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronLeftIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('class' in $$props) $$invalidate(2, customClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({ size, strokeWidth, customClass });

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('customClass' in $$props) $$invalidate(2, customClass = $$props.customClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [size, strokeWidth, customClass];
    }

    class ChevronLeftIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, { size: 0, strokeWidth: 1, class: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChevronLeftIcon",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get size() {
    		throw new Error("<ChevronLeftIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ChevronLeftIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeWidth() {
    		throw new Error("<ChevronLeftIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeWidth(value) {
    		throw new Error("<ChevronLeftIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ChevronLeftIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChevronLeftIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-feather-icons/src/icons/ChevronRightIcon.svelte generated by Svelte v3.44.0 */

    const file$g = "node_modules/svelte-feather-icons/src/icons/ChevronRightIcon.svelte";

    function create_fragment$i(ctx) {
    	let svg;
    	let polyline;
    	let svg_class_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			polyline = svg_element("polyline");
    			attr_dev(polyline, "points", "9 18 15 12 9 6");
    			add_location(polyline, file$g, 13, 250, 536);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "width", /*size*/ ctx[0]);
    			attr_dev(svg, "height", /*size*/ ctx[0]);
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "stroke", "currentColor");
    			attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr_dev(svg, "stroke-linecap", "round");
    			attr_dev(svg, "stroke-linejoin", "round");
    			attr_dev(svg, "class", svg_class_value = "feather feather-chevron-right " + /*customClass*/ ctx[2]);
    			add_location(svg, file$g, 13, 0, 286);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, polyline);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "width", /*size*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr_dev(svg, "height", /*size*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr_dev(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*customClass*/ 4 && svg_class_value !== (svg_class_value = "feather feather-chevron-right " + /*customClass*/ ctx[2])) {
    				attr_dev(svg, "class", svg_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChevronRightIcon', slots, []);
    	let { size = "100%" } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { class: customClass = "" } = $$props;

    	if (size !== "100%") {
    		size = size.slice(-1) === 'x'
    		? size.slice(0, size.length - 1) + 'em'
    		: parseInt(size) + 'px';
    	}

    	const writable_props = ['size', 'strokeWidth', 'class'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChevronRightIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('class' in $$props) $$invalidate(2, customClass = $$props.class);
    	};

    	$$self.$capture_state = () => ({ size, strokeWidth, customClass });

    	$$self.$inject_state = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('customClass' in $$props) $$invalidate(2, customClass = $$props.customClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [size, strokeWidth, customClass];
    }

    class ChevronRightIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { size: 0, strokeWidth: 1, class: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChevronRightIcon",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get size() {
    		throw new Error("<ChevronRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<ChevronRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeWidth() {
    		throw new Error("<ChevronRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeWidth(value) {
    		throw new Error("<ChevronRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get class() {
    		throw new Error("<ChevronRightIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<ChevronRightIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Atoms/Button.svelte generated by Svelte v3.44.0 */

    const file$h = "src/Components/Design/Atoms/Button.svelte";

    function create_fragment$j(ctx) {
    	let button;
    	let button_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(`${/*priorityClass*/ ctx[1]} ${/*className*/ ctx[0]} rounded-full py-2`) + " svelte-6b1d20"));
    			add_location(button, file$h, 26, 0, 782);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*priorityClass, className*/ 3 && button_class_value !== (button_class_value = "" + (null_to_empty(`${/*priorityClass*/ ctx[1]} ${/*className*/ ctx[0]} rounded-full py-2`) + " svelte-6b1d20"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { className = '' } = $$props;
    	let { priority = 'tertiary' } = $$props;
    	let priorityClass;

    	switch (priority) {
    		case 'primary':
    			priorityClass = "bg-topaz text-white px-8 md:px-5 shadow-md hover:shadow-lg";
    			break;
    		case 'secondary':
    			priorityClass = "bg-agua text-white px-8 md:px-5 shadow-md hover:shadow-lg";
    			break;
    		case 'tertiary':
    			priorityClass = "bg-black text-white px-8 md:px-5 shadow-md hover:shadow-lg";
    			break;
    		case 'tag':
    			priorityClass = "bg-gray-300 text-gray-700 hover:bg-gray-400 px-4";
    			break;
    		default:
    			priorityClass = "bg-gray-300 text-gray-700 px-8 md:px-5";
    	}

    	const writable_props = ['className', 'priority'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('priority' in $$props) $$invalidate(2, priority = $$props.priority);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ className, priority, priorityClass });

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('priority' in $$props) $$invalidate(2, priority = $$props.priority);
    		if ('priorityClass' in $$props) $$invalidate(1, priorityClass = $$props.priorityClass);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, priorityClass, priority, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, { className: 0, priority: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$j.name
    		});
    	}

    	get className() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get priority() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set priority(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/DescriptionPanel.svelte generated by Svelte v3.44.0 */
    const file$i = "src/Components/Design/Molecules/DescriptionPanel.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (20:4) {#if tags}
    function create_if_block_2(ctx) {
    	let ul;
    	let current;
    	let each_value_1 = /*tags*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "inline-block");
    			add_location(ul, file$i, 20, 4, 712);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 4) {
    				each_value_1 = /*tags*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(20:4) {#if tags}",
    		ctx
    	});

    	return block;
    }

    // (23:93) <Button priority="tag" >
    function create_default_slot_3(ctx) {
    	let t0;
    	let t1_value = /*tag*/ ctx[9].name + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("#");
    			t1 = text(t1_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tags*/ 4 && t1_value !== (t1_value = /*tag*/ ctx[9].name + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(23:93) <Button priority=\\\"tag\\\" >",
    		ctx
    	});

    	return block;
    }

    // (23:8) <Link to={`projects/?workflow=${tag.id}&tech=&year=`} >
    function create_default_slot_2(ctx) {
    	let li;
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "tag",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(button.$$.fragment);
    			attr_dev(li, "class", "inline-block mr-1");
    			add_location(li, file$i, 22, 63, 830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(button, li, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope, tags*/ 4100) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(23:8) <Link to={`projects/?workflow=${tag.id}&tech=&year=`} >",
    		ctx
    	});

    	return block;
    }

    // (22:8) {#each tags as tag }
    function create_each_block_1(ctx) {
    	let link_1;
    	let current;

    	link_1 = new Link({
    			props: {
    				to: `projects/?workflow=${/*tag*/ ctx[9].id}&tech=&year=`,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(link_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(link_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const link_1_changes = {};
    			if (dirty & /*tags*/ 4) link_1_changes.to = `projects/?workflow=${/*tag*/ ctx[9].id}&tech=&year=`;

    			if (dirty & /*$$scope, tags*/ 4100) {
    				link_1_changes.$$scope = { dirty, ctx };
    			}

    			link_1.$set(link_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(22:8) {#each tags as tag }",
    		ctx
    	});

    	return block;
    }

    // (27:4) {#if swatches}
    function create_if_block$5(ctx) {
    	let p;
    	let t1;
    	let ul;
    	let each_value = /*swatches*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Swatch";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(p, "class", "mt-4 mb-2");
    			add_location(p, file$i, 27, 4, 976);
    			add_location(ul, file$i, 28, 4, 1012);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*swatches*/ 8) {
    				each_value = /*swatches*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(27:4) {#if swatches}",
    		ctx
    	});

    	return block;
    }

    // (31:12) {#if i < 4}
    function create_if_block_1$3(ctx) {
    	let li;
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			attr_dev(div, "class", "rounded-full w-12 h-12 shadow-md");
    			attr_dev(div, "style", div_style_value = `background: ${/*swatch*/ ctx[6].color};`);
    			add_location(div, file$i, 31, 42, 1122);
    			attr_dev(li, "class", "inline-block mr-2");
    			add_location(li, file$i, 31, 12, 1092);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*swatches*/ 8 && div_style_value !== (div_style_value = `background: ${/*swatch*/ ctx[6].color};`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(31:12) {#if i < 4}",
    		ctx
    	});

    	return block;
    }

    // (30:8) {#each swatches as swatch, i }
    function create_each_block$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[8] < 4 && create_if_block_1$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*i*/ ctx[8] < 4) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(30:8) {#each swatches as swatch, i }",
    		ctx
    	});

    	return block;
    }

    // (38:35) <Button priority="primary" className="my-5" >
    function create_default_slot_1$2(ctx) {
    	let t;
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			t = text("See Project ");
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			html_tag.m(/*arrow*/ ctx[5], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(38:35) <Button priority=\\\"primary\\\" className=\\\"my-5\\\" >",
    		ctx
    	});

    	return block;
    }

    // (38:4) <Link to={`projects/${link}`} >
    function create_default_slot$2(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "primary",
    				className: "my-5",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(38:4) <Link to={`projects/${link}`} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let div;
    	let h4;
    	let svgtext;
    	let t0;
    	let h2;
    	let t1;
    	let t2;
    	let h3;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let link_1;
    	let current;

    	svgtext = new SVGText({
    			props: {
    				text: "Featured",
    				startGrad: '#3196BE',
    				endGrad: '#2FA6AE'
    			},
    			$$inline: true
    		});

    	let if_block0 = /*tags*/ ctx[2] && create_if_block_2(ctx);
    	let if_block1 = /*swatches*/ ctx[3] && create_if_block$5(ctx);

    	link_1 = new Link({
    			props: {
    				to: `projects/${/*link*/ ctx[4]}`,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			create_component(svgtext.$$.fragment);
    			t0 = space();
    			h2 = element("h2");
    			t1 = text(/*title*/ ctx[0]);
    			t2 = space();
    			h3 = element("h3");
    			t3 = text(/*year*/ ctx[1]);
    			t4 = space();
    			if (if_block0) if_block0.c();
    			t5 = space();
    			if (if_block1) if_block1.c();
    			t6 = space();
    			create_component(link_1.$$.fragment);
    			attr_dev(h4, "class", "text-sm tracking-wider bold uppercase");
    			add_location(h4, file$i, 16, 4, 495);
    			add_location(h2, file$i, 17, 4, 624);
    			attr_dev(h3, "class", "text-gray-600 font-bold");
    			add_location(h3, file$i, 18, 4, 645);
    			attr_dev(div, "class", "description-panel w-64 mt-auto md:mr-0 md:mx-0 mx-32 -mb-5 px-8 py-3 bg-white rounded-lg shadow-2xl svelte-c03sw6");
    			add_location(div, file$i, 15, 0, 377);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			mount_component(svgtext, h4, null);
    			append_dev(div, t0);
    			append_dev(div, h2);
    			append_dev(h2, t1);
    			append_dev(div, t2);
    			append_dev(div, h3);
    			append_dev(h3, t3);
    			append_dev(div, t4);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t5);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t6);
    			mount_component(link_1, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t1, /*title*/ ctx[0]);
    			if (!current || dirty & /*year*/ 2) set_data_dev(t3, /*year*/ ctx[1]);

    			if (/*tags*/ ctx[2]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*tags*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t5);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*swatches*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$5(ctx);
    					if_block1.c();
    					if_block1.m(div, t6);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			const link_1_changes = {};
    			if (dirty & /*link*/ 16) link_1_changes.to = `projects/${/*link*/ ctx[4]}`;

    			if (dirty & /*$$scope*/ 4096) {
    				link_1_changes.$$scope = { dirty, ctx };
    			}

    			link_1.$set(link_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svgtext.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(link_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svgtext.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(link_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(svgtext);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(link_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DescriptionPanel', slots, []);
    	let { title, year, tags, swatches, link } = $$props;
    	let arrow = '<i class="ml-5 fas fa-chevron-circle-right">';
    	const writable_props = ['title', 'year', 'tags', 'swatches', 'link'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DescriptionPanel> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    		if ('tags' in $$props) $$invalidate(2, tags = $$props.tags);
    		if ('swatches' in $$props) $$invalidate(3, swatches = $$props.swatches);
    		if ('link' in $$props) $$invalidate(4, link = $$props.link);
    	};

    	$$self.$capture_state = () => ({
    		Link,
    		ArrowRightIcon,
    		SVGText,
    		Button,
    		title,
    		year,
    		tags,
    		swatches,
    		link,
    		arrow
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    		if ('tags' in $$props) $$invalidate(2, tags = $$props.tags);
    		if ('swatches' in $$props) $$invalidate(3, swatches = $$props.swatches);
    		if ('link' in $$props) $$invalidate(4, link = $$props.link);
    		if ('arrow' in $$props) $$invalidate(5, arrow = $$props.arrow);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, year, tags, swatches, link, arrow];
    }

    class DescriptionPanel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {
    			title: 0,
    			year: 1,
    			tags: 2,
    			swatches: 3,
    			link: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DescriptionPanel",
    			options,
    			id: create_fragment$k.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[0] === undefined && !('title' in props)) {
    			console.warn("<DescriptionPanel> was created without expected prop 'title'");
    		}

    		if (/*year*/ ctx[1] === undefined && !('year' in props)) {
    			console.warn("<DescriptionPanel> was created without expected prop 'year'");
    		}

    		if (/*tags*/ ctx[2] === undefined && !('tags' in props)) {
    			console.warn("<DescriptionPanel> was created without expected prop 'tags'");
    		}

    		if (/*swatches*/ ctx[3] === undefined && !('swatches' in props)) {
    			console.warn("<DescriptionPanel> was created without expected prop 'swatches'");
    		}

    		if (/*link*/ ctx[4] === undefined && !('link' in props)) {
    			console.warn("<DescriptionPanel> was created without expected prop 'link'");
    		}
    	}

    	get title() {
    		throw new Error("<DescriptionPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<DescriptionPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get year() {
    		throw new Error("<DescriptionPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set year(value) {
    		throw new Error("<DescriptionPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tags() {
    		throw new Error("<DescriptionPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tags(value) {
    		throw new Error("<DescriptionPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get swatches() {
    		throw new Error("<DescriptionPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set swatches(value) {
    		throw new Error("<DescriptionPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<DescriptionPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<DescriptionPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Organisms/ProjectFeature.svelte generated by Svelte v3.44.0 */

    const file$j = "src/Components/Design/Organisms/ProjectFeature.svelte";

    function create_fragment$l(ctx) {
    	let div;
    	let descriptionpanel;
    	let div_style_value;
    	let current;

    	descriptionpanel = new DescriptionPanel({
    			props: {
    				title: /*title*/ ctx[1],
    				year: /*year*/ ctx[2],
    				tags: /*tags*/ ctx[3],
    				swatches: /*swatches*/ ctx[4],
    				link: /*link*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(descriptionpanel.$$.fragment);
    			attr_dev(div, "class", "project-feature flex flex-row flex-grow-0 flex-shrink-0 justify-start content-end w-full h-full shadow-lg svelte-qur8fy");
    			attr_dev(div, "style", div_style_value = `background: url(${/*image*/ ctx[0]}) no-repeat center/contain;`);
    			add_location(div, file$j, 26, 0, 611);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(descriptionpanel, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const descriptionpanel_changes = {};
    			if (dirty & /*title*/ 2) descriptionpanel_changes.title = /*title*/ ctx[1];
    			if (dirty & /*year*/ 4) descriptionpanel_changes.year = /*year*/ ctx[2];
    			if (dirty & /*tags*/ 8) descriptionpanel_changes.tags = /*tags*/ ctx[3];
    			if (dirty & /*swatches*/ 16) descriptionpanel_changes.swatches = /*swatches*/ ctx[4];
    			if (dirty & /*link*/ 32) descriptionpanel_changes.link = /*link*/ ctx[5];
    			descriptionpanel.$set(descriptionpanel_changes);

    			if (!current || dirty & /*image*/ 1 && div_style_value !== (div_style_value = `background: url(${/*image*/ ctx[0]}) no-repeat center/contain;`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(descriptionpanel.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(descriptionpanel.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(descriptionpanel);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectFeature', slots, []);
    	let { data } = $$props;
    	let image, title, year, tags, swatches, link;

    	const defineProps = () => {
    		$$invalidate(1, title = data.title.rendered);
    		$$invalidate(2, year = data.date.slice(0, 4));
    		$$invalidate(0, image = data._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url);
    		$$invalidate(5, link = data.slug);
    		$$invalidate(3, tags = data._embedded["wp:term"][0]);
    		$$invalidate(4, swatches = data.acf.swatch);
    	};

    	onMount(async () => {
    		defineProps();
    	});

    	const writable_props = ['data'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectFeature> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(6, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		DescriptionPanel,
    		data,
    		image,
    		title,
    		year,
    		tags,
    		swatches,
    		link,
    		defineProps
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(6, data = $$props.data);
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('year' in $$props) $$invalidate(2, year = $$props.year);
    		if ('tags' in $$props) $$invalidate(3, tags = $$props.tags);
    		if ('swatches' in $$props) $$invalidate(4, swatches = $$props.swatches);
    		if ('link' in $$props) $$invalidate(5, link = $$props.link);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [image, title, year, tags, swatches, link, data];
    }

    class ProjectFeature extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { data: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectFeature",
    			options,
    			id: create_fragment$l.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[6] === undefined && !('data' in props)) {
    			console.warn("<ProjectFeature> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<ProjectFeature>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<ProjectFeature>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Organisms/Slideshow.svelte generated by Svelte v3.44.0 */

    const file$k = "src/Components/Design/Organisms/Slideshow.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[14] = i;
    	return child_ctx;
    }

    // (55:8) {#each data as slide, i}
    function create_each_block$4(ctx) {
    	let li;
    	let projectfeature;
    	let t;
    	let li_class_value;
    	let li_style_value;
    	let current;

    	projectfeature = new ProjectFeature({
    			props: { data: /*slide*/ ctx[12] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(projectfeature.$$.fragment);
    			t = space();

    			attr_dev(li, "class", li_class_value = "" + (null_to_empty(`${/*currentSlide*/ ctx[2] == /*i*/ ctx[14]
			? 'currentSlide'
			: ''} ${/*prevSlide*/ ctx[3] == /*i*/ ctx[14] ? 'prevSlide' : ''} slide w-full h-full`) + " svelte-13g5o3k"));

    			attr_dev(li, "style", li_style_value = `transition: ${/*transition*/ ctx[1]}ms`);
    			add_location(li, file$k, 55, 12, 1406);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(projectfeature, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const projectfeature_changes = {};
    			if (dirty & /*data*/ 1) projectfeature_changes.data = /*slide*/ ctx[12];
    			projectfeature.$set(projectfeature_changes);

    			if (!current || dirty & /*currentSlide, prevSlide*/ 12 && li_class_value !== (li_class_value = "" + (null_to_empty(`${/*currentSlide*/ ctx[2] == /*i*/ ctx[14]
			? 'currentSlide'
			: ''} ${/*prevSlide*/ ctx[3] == /*i*/ ctx[14] ? 'prevSlide' : ''} slide w-full h-full`) + " svelte-13g5o3k"))) {
    				attr_dev(li, "class", li_class_value);
    			}

    			if (!current || dirty & /*transition*/ 2 && li_style_value !== (li_style_value = `transition: ${/*transition*/ ctx[1]}ms`)) {
    				attr_dev(li, "style", li_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projectfeature.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projectfeature.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(projectfeature);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(55:8) {#each data as slide, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let div;
    	let button0;
    	let chevronlefticon;
    	let t0;
    	let button1;
    	let chevronrighticon;
    	let t1;
    	let ul;
    	let current;
    	let mounted;
    	let dispose;
    	chevronlefticon = new ChevronLeftIcon({ $$inline: true });
    	chevronrighticon = new ChevronRightIcon({ $$inline: true });
    	let each_value = /*data*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			create_component(chevronlefticon.$$.fragment);
    			t0 = space();
    			button1 = element("button");
    			create_component(chevronrighticon.$$.fragment);
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(button0, "class", "slide-control prev svelte-13g5o3k");
    			add_location(button0, file$k, 51, 4, 1152);
    			attr_dev(button1, "class", "slide-control next svelte-13g5o3k");
    			add_location(button1, file$k, 52, 4, 1254);
    			add_location(ul, file$k, 53, 4, 1356);
    			attr_dev(div, "class", "slideshow-container relative flex  svelte-13g5o3k");
    			add_location(div, file$k, 50, 0, 1099);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			mount_component(chevronlefticon, button0, null);
    			append_dev(div, t0);
    			append_dev(div, button1);
    			mount_component(chevronrighticon, button1, null);
    			append_dev(div, t1);
    			append_dev(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[6], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[7], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*currentSlide, prevSlide, transition, data*/ 15) {
    				each_value = /*data*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(chevronlefticon.$$.fragment, local);
    			transition_in(chevronrighticon.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(chevronlefticon.$$.fragment, local);
    			transition_out(chevronrighticon.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(chevronlefticon);
    			destroy_component(chevronrighticon);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Slideshow', slots, []);
    	let { data } = $$props;
    	let { duration = 4000 } = $$props;
    	let { transition = 2000 } = $$props;
    	let index = 1;
    	let timer;
    	let currentSlide, prevSlide;

    	// Timer funciton
    	const userSlide = n => {
    		clearTimeout(timer);
    		incrementSlide(n);

    		timer = setTimeout(
    			function () {
    				showSlides();
    			},
    			duration
    		);
    	};

    	const incrementSlide = n => {
    		if (data.length > 1) {
    			$$invalidate(3, prevSlide = index - 1);
    		}

    		if (index >= data.length) {
    			index = 1;
    		} else if (index <= 1) {
    			index = data.length;
    		} else {
    			index += n;
    		}

    		$$invalidate(2, currentSlide = index - 1);
    	};

    	const showSlides = () => {
    		incrementSlide(1);

    		timer = setTimeout(
    			function () {
    				showSlides();
    			},
    			duration
    		);
    	};

    	onMount(async () => {
    		showSlides();
    	});

    	const writable_props = ['data', 'duration', 'transition'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Slideshow> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		userSlide(-1);
    	};

    	const click_handler_1 = () => {
    		userSlide(1);
    	};

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('duration' in $$props) $$invalidate(5, duration = $$props.duration);
    		if ('transition' in $$props) $$invalidate(1, transition = $$props.transition);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		ChevronLeftIcon,
    		ChevronRightIcon,
    		ProjectFeature,
    		data,
    		duration,
    		transition,
    		index,
    		timer,
    		currentSlide,
    		prevSlide,
    		userSlide,
    		incrementSlide,
    		showSlides
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('duration' in $$props) $$invalidate(5, duration = $$props.duration);
    		if ('transition' in $$props) $$invalidate(1, transition = $$props.transition);
    		if ('index' in $$props) index = $$props.index;
    		if ('timer' in $$props) timer = $$props.timer;
    		if ('currentSlide' in $$props) $$invalidate(2, currentSlide = $$props.currentSlide);
    		if ('prevSlide' in $$props) $$invalidate(3, prevSlide = $$props.prevSlide);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		data,
    		transition,
    		currentSlide,
    		prevSlide,
    		userSlide,
    		duration,
    		click_handler,
    		click_handler_1
    	];
    }

    class Slideshow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { data: 0, duration: 5, transition: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Slideshow",
    			options,
    			id: create_fragment$m.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[0] === undefined && !('data' in props)) {
    			console.warn("<Slideshow> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Slideshow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Slideshow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<Slideshow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Slideshow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get transition() {
    		throw new Error("<Slideshow>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set transition(value) {
    		throw new Error("<Slideshow>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Templates/Home.svelte generated by Svelte v3.44.0 */
    const file$l = "src/Components/Design/Templates/Home.svelte";

    function create_fragment$n(ctx) {
    	let head;
    	let t;
    	let section;
    	let div;
    	let slideshow;
    	let div_intro;
    	let div_outro;
    	let section_intro;
    	let section_outro;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] },
    			$$inline: true
    		});

    	slideshow = new Slideshow({
    			props: {
    				data: /*featuredPosts*/ ctx[0],
    				duration: 8000,
    				transition: 4000
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t = space();
    			section = element("section");
    			div = element("div");
    			create_component(slideshow.$$.fragment);
    			add_location(div, file$l, 39, 4, 1159);
    			attr_dev(section, "class", "w-full h-full overflow-hidden");
    			add_location(section, file$l, 38, 0, 1031);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div);
    			mount_component(slideshow, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const slideshow_changes = {};
    			if (dirty & /*featuredPosts*/ 1) slideshow_changes.data = /*featuredPosts*/ ctx[0];
    			slideshow.$set(slideshow_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(slideshow.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fly, {
    					y: -1000,
    					duration: 2000,
    					easing: expoInOut
    				});

    				div_intro.start();
    			});

    			add_render_callback(() => {
    				if (section_outro) section_outro.end(1);

    				section_intro = create_in_transition(section, fly, {
    					y: 500,
    					duration: 2000,
    					easing: expoInOut
    				});

    				section_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(slideshow.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: -1000 });
    			if (section_intro) section_intro.invalidate();
    			section_outro = create_out_transition(section, fly, { y: 500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(section);
    			destroy_component(slideshow);
    			if (detaching && div_outro) div_outro.end();
    			if (detaching && section_outro) section_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let posts = [];
    	let featuredPosts = [];
    	let example = '';
    	let pageData = {};

    	// export let slug;
    	const apiURL = 'http://wp:8080/wp-json';

    	onMount(async () => {
    		const [pageResponse, projResponse] = await Promise.all([
    			fetch(`${apiURL}/wp/v2/pages?slug=home`),
    			fetch(`${apiURL}/wp/v2/project?_embed`)
    		]);

    		const page = await pageResponse.json();
    		const posts = await projResponse.json();

    		if (page[0] !== '') {
    			$$invalidate(1, pageData = page[0]);
    		}

    		$$invalidate(0, featuredPosts = posts.filter(post => post.acf.feature_project == true));
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		fly,
    		expoInOut,
    		PageTitle,
    		Head,
    		Slideshow,
    		posts,
    		featuredPosts,
    		example,
    		pageData,
    		apiURL
    	});

    	$$self.$inject_state = $$props => {
    		if ('posts' in $$props) posts = $$props.posts;
    		if ('featuredPosts' in $$props) $$invalidate(0, featuredPosts = $$props.featuredPosts);
    		if ('example' in $$props) example = $$props.example;
    		if ('pageData' in $$props) $$invalidate(1, pageData = $$props.pageData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [featuredPosts, pageData];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /* src/Components/Design/Atoms/Ribbon.svelte generated by Svelte v3.44.0 */

    const file$m = "src/Components/Design/Atoms/Ribbon.svelte";

    function create_fragment$o(ctx) {
    	let svg;
    	let defs;
    	let filter;
    	let feOffset;
    	let feColorMatrix;
    	let feGaussianBlur;
    	let feBlend;
    	let polyline;
    	let polyline_stroke_width_value;
    	let polyline_filter_value;
    	let svg_class_value;
    	let svg_style_value;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			filter = svg_element("filter");
    			feOffset = svg_element("feOffset");
    			feColorMatrix = svg_element("feColorMatrix");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feBlend = svg_element("feBlend");
    			polyline = svg_element("polyline");
    			attr_dev(feOffset, "result", "offOut");
    			attr_dev(feOffset, "in", "SourceGraphic");
    			attr_dev(feOffset, "dx", "-5");
    			attr_dev(feOffset, "dy", "5");
    			add_location(feOffset, file$m, 11, 12, 332);
    			attr_dev(feColorMatrix, "result", "matrixOut");
    			attr_dev(feColorMatrix, "in", "offOut");
    			attr_dev(feColorMatrix, "type", "matrix");
    			attr_dev(feColorMatrix, "values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.35 0");
    			add_location(feColorMatrix, file$m, 12, 12, 407);
    			attr_dev(feGaussianBlur, "result", "blurOut");
    			attr_dev(feGaussianBlur, "in", "matrixOut");
    			attr_dev(feGaussianBlur, "stdDeviation", "3");
    			add_location(feGaussianBlur, file$m, 13, 12, 540);
    			attr_dev(feBlend, "in", "SourceGraphic");
    			attr_dev(feBlend, "in2", "blurOut");
    			attr_dev(feBlend, "mode", "normal");
    			add_location(feBlend, file$m, 14, 12, 620);
    			attr_dev(filter, "id", "overlayShadow");
    			attr_dev(filter, "x", "0");
    			attr_dev(filter, "y", "0");
    			attr_dev(filter, "width", "200%");
    			attr_dev(filter, "height", "200%");
    			add_location(filter, file$m, 10, 8, 253);
    			add_location(defs, file$m, 9, 4, 238);
    			attr_dev(polyline, "stroke-width", polyline_stroke_width_value = `${/*strokeWidth*/ ctx[4]}`);
    			attr_dev(polyline, "filter", polyline_filter_value = `${/*shadow*/ ctx[2] ? 'url(#overlayShadow)' : ''}`);
    			attr_dev(polyline, "points", /*points*/ ctx[0]);
    			attr_dev(polyline, "class", "svelte-1jbnpy0");
    			add_location(polyline, file$m, 17, 4, 713);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(`${/*className*/ ctx[1]} ribbon`) + " svelte-1jbnpy0"));
    			attr_dev(svg, "style", svg_style_value = `${/*style*/ ctx[3]}`);
    			attr_dev(svg, "viewBox", "0 0 1000 1000");
    			add_location(svg, file$m, 8, 0, 155);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, defs);
    			append_dev(defs, filter);
    			append_dev(filter, feOffset);
    			append_dev(filter, feColorMatrix);
    			append_dev(filter, feGaussianBlur);
    			append_dev(filter, feBlend);
    			append_dev(svg, polyline);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*strokeWidth*/ 16 && polyline_stroke_width_value !== (polyline_stroke_width_value = `${/*strokeWidth*/ ctx[4]}`)) {
    				attr_dev(polyline, "stroke-width", polyline_stroke_width_value);
    			}

    			if (dirty & /*shadow*/ 4 && polyline_filter_value !== (polyline_filter_value = `${/*shadow*/ ctx[2] ? 'url(#overlayShadow)' : ''}`)) {
    				attr_dev(polyline, "filter", polyline_filter_value);
    			}

    			if (dirty & /*points*/ 1) {
    				attr_dev(polyline, "points", /*points*/ ctx[0]);
    			}

    			if (dirty & /*className*/ 2 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`${/*className*/ ctx[1]} ribbon`) + " svelte-1jbnpy0"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (dirty & /*style*/ 8 && svg_style_value !== (svg_style_value = `${/*style*/ ctx[3]}`)) {
    				attr_dev(svg, "style", svg_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Ribbon', slots, []);
    	let { points } = $$props;
    	let { className } = $$props;
    	let { shadow = true } = $$props;
    	let { style } = $$props;
    	let { strokeWidth = 200 } = $$props;
    	const writable_props = ['points', 'className', 'shadow', 'style', 'strokeWidth'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Ribbon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('points' in $$props) $$invalidate(0, points = $$props.points);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('shadow' in $$props) $$invalidate(2, shadow = $$props.shadow);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    		if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
    	};

    	$$self.$capture_state = () => ({
    		points,
    		className,
    		shadow,
    		style,
    		strokeWidth
    	});

    	$$self.$inject_state = $$props => {
    		if ('points' in $$props) $$invalidate(0, points = $$props.points);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('shadow' in $$props) $$invalidate(2, shadow = $$props.shadow);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    		if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [points, className, shadow, style, strokeWidth];
    }

    class Ribbon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {
    			points: 0,
    			className: 1,
    			shadow: 2,
    			style: 3,
    			strokeWidth: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Ribbon",
    			options,
    			id: create_fragment$o.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*points*/ ctx[0] === undefined && !('points' in props)) {
    			console.warn("<Ribbon> was created without expected prop 'points'");
    		}

    		if (/*className*/ ctx[1] === undefined && !('className' in props)) {
    			console.warn("<Ribbon> was created without expected prop 'className'");
    		}

    		if (/*style*/ ctx[3] === undefined && !('style' in props)) {
    			console.warn("<Ribbon> was created without expected prop 'style'");
    		}
    	}

    	get points() {
    		throw new Error("<Ribbon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set points(value) {
    		throw new Error("<Ribbon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get className() {
    		throw new Error("<Ribbon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<Ribbon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shadow() {
    		throw new Error("<Ribbon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shadow(value) {
    		throw new Error("<Ribbon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Ribbon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Ribbon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get strokeWidth() {
    		throw new Error("<Ribbon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set strokeWidth(value) {
    		throw new Error("<Ribbon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/ScrollTo.svelte generated by Svelte v3.44.0 */
    const file$n = "src/Components/Design/Molecules/ScrollTo.svelte";

    function create_fragment$p(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let div2_class_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr_dev(div0, "class", "arrow first w-6 h-6 absolute svelte-1yc4cs7");
    			add_location(div0, file$n, 14, 4, 357);
    			attr_dev(div1, "class", "arrow second w-6 h-6 absolute svelte-1yc4cs7");
    			add_location(div1, file$n, 15, 4, 410);
    			attr_dev(div2, "class", div2_class_value = "" + (/*className*/ ctx[0] + " " + (/*loaded*/ ctx[2] ? 'loaded' : '') + " arrow-container flex flex-col w-6 h-12 relative" + " svelte-1yc4cs7"));
    			attr_dev(div2, "style", /*style*/ ctx[1]);
    			add_location(div2, file$n, 13, 0, 238);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t);
    			append_dev(div2, div1);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*className, loaded*/ 5 && div2_class_value !== (div2_class_value = "" + (/*className*/ ctx[0] + " " + (/*loaded*/ ctx[2] ? 'loaded' : '') + " arrow-container flex flex-col w-6 h-12 relative" + " svelte-1yc4cs7"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (dirty & /*style*/ 2) {
    				attr_dev(div2, "style", /*style*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ScrollTo', slots, []);
    	let { className = "", style = "", delay = 0 } = $$props;
    	let loaded = false;

    	onMount(async () => {
    		setTimeout(
    			function () {
    				$$invalidate(2, loaded = true);
    			},
    			delay
    		);
    	});

    	const writable_props = ['className', 'style', 'delay'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ScrollTo> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('delay' in $$props) $$invalidate(3, delay = $$props.delay);
    	};

    	$$self.$capture_state = () => ({ onMount, className, style, delay, loaded });

    	$$self.$inject_state = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('delay' in $$props) $$invalidate(3, delay = $$props.delay);
    		if ('loaded' in $$props) $$invalidate(2, loaded = $$props.loaded);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [className, style, loaded, delay];
    }

    class ScrollTo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { className: 0, style: 1, delay: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ScrollTo",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get className() {
    		throw new Error("<ScrollTo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set className(value) {
    		throw new Error("<ScrollTo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<ScrollTo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<ScrollTo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get delay() {
    		throw new Error("<ScrollTo>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set delay(value) {
    		throw new Error("<ScrollTo>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Templates/About.svelte generated by Svelte v3.44.0 */

    const { Error: Error_1, setTimeout: setTimeout_1 } = globals;
    const file$o = "src/Components/Design/Templates/About.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    // (151:0) {:else}
    function create_else_block$1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Loading";
    			add_location(h1, file$o, 151, 0, 6663);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(151:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (70:0) {#if data != ''}
    function create_if_block$6(ctx) {
    	let head;
    	let t0;
    	let section0;
    	let pagetitle;
    	let t1;
    	let div3;
    	let div1;
    	let h20;
    	let t2_value = /*pageData*/ ctx[1].acf.hero_title + "";
    	let t2;
    	let h20_intro;
    	let h20_outro;
    	let t3;
    	let div0;
    	let code0;
    	let t4_value = /*pageData*/ ctx[1].acf.hero_text + "";
    	let t4;
    	let code0_intro;
    	let code0_outro;
    	let t5;
    	let scrollto;
    	let t6;
    	let div2;
    	let div2_intro;
    	let div2_outro;
    	let t7;
    	let ribbon0;
    	let t8;
    	let ribbon1;
    	let t9;
    	let section1;
    	let h21;
    	let t10_value = /*pageData*/ ctx[1].acf.specialty_section_title + "";
    	let t10;
    	let t11;
    	let ul0;
    	let t12;
    	let section2;
    	let h22;
    	let t13_value = /*pageData*/ ctx[1].acf.tech_list_title + "";
    	let t13;
    	let t14;
    	let ul1;
    	let t15;
    	let section3;
    	let t16;
    	let div4;
    	let h23;
    	let raw0_value = /*pageData*/ ctx[1].acf.final_message_title + "";
    	let t17;
    	let code1;
    	let raw1_value = /*pageData*/ ctx[1].acf.final_message_description + "";
    	let t18;
    	let if_block2_anchor;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] },
    			$$inline: true
    		});

    	pagetitle = new PageTitle({
    			props: {
    				title: "About",
    				style: "position: relative; z-index:4;",
    				height: "25"
    			},
    			$$inline: true
    		});

    	scrollto = new ScrollTo({ props: { delay: 5700 }, $$inline: true });
    	let if_block0 = /*pageData*/ ctx[1].acf.hero_image !== undefined && create_if_block_5(ctx);

    	ribbon0 = new Ribbon({
    			props: {
    				className: "overlay absolute w-1/2 h-1/2 md:w-1/2",
    				style: "top: 0; right: 0;",
    				strokeWidth: "300",
    				points: "-200,-600 1900,1100"
    			},
    			$$inline: true
    		});

    	ribbon1 = new Ribbon({
    			props: {
    				className: "background",
    				style: "width: 100%; left: 0; right: 0;",
    				strokeWidth: "150",
    				points: "1200,150 -200,1000",
    				shadow: false
    			},
    			$$inline: true
    		});

    	let each_value_2 = /*pageData*/ ctx[1].acf.my_specialties;
    	validate_each_argument(each_value_2);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*pageData*/ ctx[1].acf.tech_list;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let if_block1 = /*pageData*/ ctx[1].acf.final_message_image != undefined && create_if_block_2$1(ctx);
    	let if_block2 = /*pageData*/ ctx[1].acf.call_to_action_section != undefined && create_if_block_1$4(ctx);

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section0 = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			h20 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			div0 = element("div");
    			code0 = element("code");
    			t4 = text(t4_value);
    			t5 = space();
    			create_component(scrollto.$$.fragment);
    			t6 = space();
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t7 = space();
    			create_component(ribbon0.$$.fragment);
    			t8 = space();
    			create_component(ribbon1.$$.fragment);
    			t9 = space();
    			section1 = element("section");
    			h21 = element("h2");
    			t10 = text(t10_value);
    			t11 = space();
    			ul0 = element("ul");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t12 = space();
    			section2 = element("section");
    			h22 = element("h2");
    			t13 = text(t13_value);
    			t14 = space();
    			ul1 = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t15 = space();
    			section3 = element("section");
    			if (if_block1) if_block1.c();
    			t16 = space();
    			div4 = element("div");
    			h23 = element("h2");
    			t17 = space();
    			code1 = element("code");
    			t18 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    			attr_dev(h20, "class", "text-6xl font-bold");
    			add_location(h20, file$o, 76, 12, 2170);
    			attr_dev(code0, "class", "typed svelte-xs2dy9");
    			add_location(code0, file$o, 78, 16, 2330);
    			attr_dev(div0, "class", "w-3/4");
    			add_location(div0, file$o, 77, 12, 2294);
    			attr_dev(div1, "class", "sm:w-full w-3/5 mt-32 md:mt-4 mx-2");
    			set_style(div1, "z-index", "4");
    			set_style(div1, "transform", "translate(0," + Math.min(100, /*y*/ ctx[2] / 5) + "px)");
    			add_location(div1, file$o, 75, 8, 2039);
    			attr_dev(div2, "class", "sm:w-3/4 w-2/5 md:mt-4 mt-8");
    			set_style(div2, "overflow", "hidden");
    			set_style(div2, "transform", "translate(0," + Math.min(24, /*y*/ ctx[2] / 35) + "px)");
    			add_location(div2, file$o, 82, 8, 2511);
    			attr_dev(div3, "class", "flex sm:flex-col-reverse flex-row");
    			add_location(div3, file$o, 74, 4, 1983);
    			add_location(section0, file$o, 72, 0, 1887);
    			attr_dev(h21, "data-aos", "fade-up");
    			attr_dev(h21, "data-aos-duration", "1500");
    			attr_dev(h21, "class", "text-4xl mb-8");
    			add_location(h21, file$o, 95, 4, 3510);
    			attr_dev(ul0, "class", "flex flex-row flex-wrap justify-around");
    			add_location(ul0, file$o, 97, 4, 3629);
    			attr_dev(section1, "class", "my-40 text-center");
    			add_location(section1, file$o, 94, 0, 3470);
    			attr_dev(h22, "data-aos", "fade-up");
    			attr_dev(h22, "data-aos-duration", "1500");
    			attr_dev(h22, "class", "text-3xl mb-8");
    			add_location(h22, file$o, 112, 4, 4384);
    			attr_dev(ul1, "class", "flex flex-row w-full flex-wrap");
    			add_location(ul1, file$o, 113, 4, 4494);
    			attr_dev(section2, "class", "my-32 text-center w-full");
    			add_location(section2, file$o, 111, 0, 4337);
    			attr_dev(h23, "class", "text-6xl font-bold leading-none mb-12");
    			add_location(h23, file$o, 133, 8, 5655);
    			add_location(code1, file$o, 134, 8, 5759);
    			attr_dev(div4, "data-aos", "fade-left");
    			attr_dev(div4, "data-aos-duration", "1500");
    			attr_dev(div4, "class", "w-2/5 lg:w-full lg:mt-5 px-16");
    			add_location(div4, file$o, 132, 4, 5557);
    			attr_dev(section3, "class", "my-32 flex flex-row flex-wrap");
    			add_location(section3, file$o, 126, 0, 5230);
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section0, anchor);
    			mount_component(pagetitle, section0, null);
    			append_dev(section0, t1);
    			append_dev(section0, div3);
    			append_dev(div3, div1);
    			append_dev(div1, h20);
    			append_dev(h20, t2);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, code0);
    			append_dev(code0, t4);
    			append_dev(div1, t5);
    			mount_component(scrollto, div1, null);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			if (if_block0) if_block0.m(div2, null);
    			append_dev(section0, t7);
    			mount_component(ribbon0, section0, null);
    			append_dev(section0, t8);
    			mount_component(ribbon1, section0, null);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, h21);
    			append_dev(h21, t10);
    			append_dev(section1, t11);
    			append_dev(section1, ul0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul0, null);
    			}

    			insert_dev(target, t12, anchor);
    			insert_dev(target, section2, anchor);
    			append_dev(section2, h22);
    			append_dev(h22, t13);
    			append_dev(section2, t14);
    			append_dev(section2, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul1, null);
    			}

    			insert_dev(target, t15, anchor);
    			insert_dev(target, section3, anchor);
    			if (if_block1) if_block1.m(section3, null);
    			append_dev(section3, t16);
    			append_dev(section3, div4);
    			append_dev(div4, h23);
    			h23.innerHTML = raw0_value;
    			append_dev(div4, t17);
    			append_dev(div4, code1);
    			code1.innerHTML = raw1_value;
    			insert_dev(target, t18, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			if ((!current || dirty & /*pageData*/ 2) && t2_value !== (t2_value = /*pageData*/ ctx[1].acf.hero_title + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*pageData*/ 2) && t4_value !== (t4_value = /*pageData*/ ctx[1].acf.hero_text + "")) set_data_dev(t4, t4_value);

    			if (!current || dirty & /*y*/ 4) {
    				set_style(div1, "transform", "translate(0," + Math.min(100, /*y*/ ctx[2] / 5) + "px)");
    			}

    			if (/*pageData*/ ctx[1].acf.hero_image !== undefined) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*pageData*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_5(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div2, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*y*/ 4) {
    				set_style(div2, "transform", "translate(0," + Math.min(24, /*y*/ ctx[2] / 35) + "px)");
    			}

    			if ((!current || dirty & /*pageData*/ 2) && t10_value !== (t10_value = /*pageData*/ ctx[1].acf.specialty_section_title + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*pageData, undefined*/ 2) {
    				each_value_2 = /*pageData*/ ctx[1].acf.my_specialties;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(ul0, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if ((!current || dirty & /*pageData*/ 2) && t13_value !== (t13_value = /*pageData*/ ctx[1].acf.tech_list_title + "")) set_data_dev(t13, t13_value);

    			if (dirty & /*pageData, undefined*/ 2) {
    				each_value_1 = /*pageData*/ ctx[1].acf.tech_list;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (/*pageData*/ ctx[1].acf.final_message_image != undefined) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					if_block1.m(section3, t16);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if ((!current || dirty & /*pageData*/ 2) && raw0_value !== (raw0_value = /*pageData*/ ctx[1].acf.final_message_title + "")) h23.innerHTML = raw0_value;			if ((!current || dirty & /*pageData*/ 2) && raw1_value !== (raw1_value = /*pageData*/ ctx[1].acf.final_message_description + "")) code1.innerHTML = raw1_value;
    			if (/*pageData*/ ctx[1].acf.call_to_action_section != undefined) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*pageData*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1$4(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(if_block2_anchor.parentNode, if_block2_anchor);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			add_render_callback(() => {
    				if (h20_outro) h20_outro.end(1);
    				h20_intro = create_in_transition(h20, typewriter, { speed: 100, delay: 1000 });
    				h20_intro.start();
    			});

    			add_render_callback(() => {
    				if (code0_outro) code0_outro.end(1);
    				code0_intro = create_in_transition(code0, typewriter, { speed: 20, delay: -700 });
    				code0_intro.start();
    			});

    			transition_in(scrollto.$$.fragment, local);
    			transition_in(if_block0);

    			add_render_callback(() => {
    				if (div2_outro) div2_outro.end(1);
    				div2_intro = create_in_transition(div2, fly, { x: 281, duration: 1500, delay: 1000 });
    				div2_intro.start();
    			});

    			transition_in(ribbon0.$$.fragment, local);
    			transition_in(ribbon1.$$.fragment, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (h20_intro) h20_intro.invalidate();
    			h20_outro = create_out_transition(h20, fly, {});
    			if (code0_intro) code0_intro.invalidate();
    			code0_outro = create_out_transition(code0, fly, {});
    			transition_out(scrollto.$$.fragment, local);
    			transition_out(if_block0);
    			if (div2_intro) div2_intro.invalidate();
    			div2_outro = create_out_transition(div2, fly, { x: 281, duration: 1500 });
    			transition_out(ribbon0.$$.fragment, local);
    			transition_out(ribbon1.$$.fragment, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section0);
    			destroy_component(pagetitle);
    			if (detaching && h20_outro) h20_outro.end();
    			if (detaching && code0_outro) code0_outro.end();
    			destroy_component(scrollto);
    			if (if_block0) if_block0.d();
    			if (detaching && div2_outro) div2_outro.end();
    			destroy_component(ribbon0);
    			destroy_component(ribbon1);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(section1);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(section2);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(section3);
    			if (if_block1) if_block1.d();
    			if (detaching) detach_dev(t18);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(if_block2_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(70:0) {#if data != ''}",
    		ctx
    	});

    	return block;
    }

    // (84:12) {#if pageData.acf.hero_image !== undefined}
    function create_if_block_5(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let img_intro;
    	let img_outro;
    	let current;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "width", "562");
    			if (!src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.hero_image.sizes.medium_large)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*pageData*/ ctx[1].acf.hero_image.alt);
    			add_location(img, file$o, 85, 12, 2947);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.hero_image.sizes.medium_large)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*pageData*/ ctx[1].acf.hero_image.alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (img_outro) img_outro.end(1);
    				img_intro = create_in_transition(img, fly, { x: -562, duration: 1500, delay: 1000 });
    				img_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (img_intro) img_intro.invalidate();
    			img_outro = create_out_transition(img, fly, { x: -562, duration: 1500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			if (detaching && img_outro) img_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(84:12) {#if pageData.acf.hero_image !== undefined}",
    		ctx
    	});

    	return block;
    }

    // (102:16) {#if specialty.icon != undefined}
    function create_if_block_4(ctx) {
    	let img;
    	let img_width_value;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "mx-auto my-5 lg:w-3/4");
    			attr_dev(img, "width", img_width_value = /*specialty*/ ctx[18].icon.sizes['thumbnail-width']);
    			if (!src_url_equal(img.src, img_src_value = /*specialty*/ ctx[18].icon.sizes.thumbnail)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*specialty*/ ctx[18].icon.alt);
    			add_location(img, file$o, 102, 20, 3983);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && img_width_value !== (img_width_value = /*specialty*/ ctx[18].icon.sizes['thumbnail-width'])) {
    				attr_dev(img, "width", img_width_value);
    			}

    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*specialty*/ ctx[18].icon.sizes.thumbnail)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*specialty*/ ctx[18].icon.alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(102:16) {#if specialty.icon != undefined}",
    		ctx
    	});

    	return block;
    }

    // (99:4) {#each pageData.acf.my_specialties as specialty, i}
    function create_each_block_2(ctx) {
    	let li;
    	let figure;
    	let t0;
    	let figcaption;
    	let t1_value = /*specialty*/ ctx[18].icon_text + "";
    	let t1;
    	let t2;
    	let li_data_aos_delay_value;
    	let if_block = /*specialty*/ ctx[18].icon != undefined && create_if_block_4(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			figure = element("figure");
    			if (if_block) if_block.c();
    			t0 = space();
    			figcaption = element("figcaption");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(figcaption, "class", "text-center uppercase font-light text-lg");
    			add_location(figcaption, file$o, 104, 16, 4169);
    			attr_dev(figure, "class", "flex flex-col justify-center content-center");
    			add_location(figure, file$o, 100, 12, 3852);
    			attr_dev(li, "data-aos", "fade-up");
    			attr_dev(li, "data-aos-duration", "1500");
    			attr_dev(li, "data-aos-delay", li_data_aos_delay_value = "" + (/*i*/ ctx[17] + "00"));
    			attr_dev(li, "class", "w-1/4 md:w-1/2");
    			add_location(li, file$o, 99, 8, 3745);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, figure);
    			if (if_block) if_block.m(figure, null);
    			append_dev(figure, t0);
    			append_dev(figure, figcaption);
    			append_dev(figcaption, t1);
    			append_dev(li, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (/*specialty*/ ctx[18].icon != undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_4(ctx);
    					if_block.c();
    					if_block.m(figure, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*pageData*/ 2 && t1_value !== (t1_value = /*specialty*/ ctx[18].icon_text + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(99:4) {#each pageData.acf.my_specialties as specialty, i}",
    		ctx
    	});

    	return block;
    }

    // (118:12) {#if tech_item.tech_icon != undefined}
    function create_if_block_3(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "w-16 p-1 ml-1 mr-3");
    			if (!src_url_equal(img.src, img_src_value = /*tech_item*/ ctx[15].tech_icon.sizes.thumbnail)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*tech_item*/ ctx[15].tech_icon.alt);
    			add_location(img, file$o, 118, 16, 4922);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*tech_item*/ ctx[15].tech_icon.sizes.thumbnail)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*tech_item*/ ctx[15].tech_icon.alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(118:12) {#if tech_item.tech_icon != undefined}",
    		ctx
    	});

    	return block;
    }

    // (115:4) {#each pageData.acf.tech_list as tech_item, i}
    function create_each_block_1$1(ctx) {
    	let li;
    	let figure;
    	let t0;
    	let figcaption;
    	let t1_value = /*tech_item*/ ctx[15].tech_label + "";
    	let t1;
    	let t2;
    	let li_data_aos_delay_value;
    	let if_block = /*tech_item*/ ctx[15].tech_icon != undefined && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			figure = element("figure");
    			if (if_block) if_block.c();
    			t0 = space();
    			figcaption = element("figcaption");
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(figcaption, "class", "flex items-center font-bold text-xl text-left");
    			add_location(figcaption, file$o, 120, 12, 5059);
    			attr_dev(figure, "class", "flex flex-row bg-gray-100 rounded-l-full shadow-xl");
    			set_style(figure, "border-top-right-radius", "3999px");
    			set_style(figure, "border-bottom-right-radius", "3999px");
    			add_location(figure, file$o, 116, 12, 4710);
    			attr_dev(li, "data-aos", "fade-up");
    			attr_dev(li, "data-aos-duration", "1500");
    			attr_dev(li, "data-aos-delay", li_data_aos_delay_value = "" + (/*i*/ ctx[17] + "00"));
    			attr_dev(li, "class", "w-1/2 md:w-full p-2 ");
    			add_location(li, file$o, 115, 8, 4597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, figure);
    			if (if_block) if_block.m(figure, null);
    			append_dev(figure, t0);
    			append_dev(figure, figcaption);
    			append_dev(figcaption, t1);
    			append_dev(li, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (/*tech_item*/ ctx[15].tech_icon != undefined) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(figure, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*pageData*/ 2 && t1_value !== (t1_value = /*tech_item*/ ctx[15].tech_label + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(115:4) {#each pageData.acf.tech_list as tech_item, i}",
    		ctx
    	});

    	return block;
    }

    // (128:4) {#if pageData.acf.final_message_image != undefined}
    function create_if_block_2$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.final_message_image.sizes.medium_large)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*pageData*/ ctx[1].acf.final_message_image.alt);
    			add_location(img, file$o, 129, 8, 5423);
    			attr_dev(div, "data-aos", "fade-right");
    			attr_dev(div, "data-aos-duration", "1500");
    			attr_dev(div, "class", "w-3/5 lg:w-full");
    			add_location(div, file$o, 128, 4, 5338);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.final_message_image.sizes.medium_large)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*pageData*/ ctx[1].acf.final_message_image.alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(128:4) {#if pageData.acf.final_message_image != undefined}",
    		ctx
    	});

    	return block;
    }

    // (139:0) {#if pageData.acf.call_to_action_section != undefined}
    function create_if_block_1$4(ctx) {
    	let section;
    	let h2;
    	let t0_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_title + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_description + "";
    	let t2;
    	let t3;
    	let div1;
    	let current;
    	let each_value = /*pageData*/ ctx[1].acf.call_to_action_section.call_to_action_buttons;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "data-aos", "fade-up");
    			attr_dev(h2, "data-aos-duration", "1500");
    			attr_dev(h2, "class", "text-5xl");
    			add_location(h2, file$o, 140, 4, 5946);
    			attr_dev(div0, "data-aos", "fade-up");
    			attr_dev(div0, "data-aos-duration", "1500");
    			attr_dev(div0, "class", "my-16");
    			add_location(div0, file$o, 141, 4, 6072);
    			attr_dev(div1, "data-aos", "fade-up");
    			attr_dev(div1, "data-aos-duration", "1500");
    			attr_dev(div1, "class", "flex align-center justify-center");
    			add_location(div1, file$o, 142, 4, 6203);
    			attr_dev(section, "class", "my-48 lg:my-24 text-center");
    			add_location(section, file$o, 139, 0, 5897);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(h2, t0);
    			append_dev(section, t1);
    			append_dev(section, div0);
    			append_dev(div0, t2);
    			append_dev(section, t3);
    			append_dev(section, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*pageData*/ 2) && t0_value !== (t0_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_title + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*pageData*/ 2) && t2_value !== (t2_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_description + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*pageData*/ 2) {
    				each_value = /*pageData*/ ctx[1].acf.call_to_action_section.call_to_action_buttons;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(139:0) {#if pageData.acf.call_to_action_section != undefined}",
    		ctx
    	});

    	return block;
    }

    // (145:8) <Button priority={cta_button.is_primary ? 'primary' : 'tertiary'} className="mx-5" >
    function create_default_slot$3(ctx) {
    	let t0_value = /*cta_button*/ ctx[12].cta_link.title + "";
    	let t0;
    	let t1;
    	let span;

    	let raw_value = (/*cta_button*/ ctx[12].is_primary
    	? '<i class="ml-5 fas fa-chevron-circle-right">'
    	: '') + "";

    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			t2 = space();
    			add_location(span, file$o, 144, 120, 6499);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, span, anchor);
    			span.innerHTML = raw_value;
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && t0_value !== (t0_value = /*cta_button*/ ctx[12].cta_link.title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*pageData*/ 2 && raw_value !== (raw_value = (/*cta_button*/ ctx[12].is_primary
    			? '<i class="ml-5 fas fa-chevron-circle-right">'
    			: '') + "")) span.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(145:8) <Button priority={cta_button.is_primary ? 'primary' : 'tertiary'} className=\\\"mx-5\\\" >",
    		ctx
    	});

    	return block;
    }

    // (144:4) {#each pageData.acf.call_to_action_section.call_to_action_buttons as cta_button}
    function create_each_block$5(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: /*cta_button*/ ctx[12].is_primary
    				? 'primary'
    				: 'tertiary',
    				className: "mx-5",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*pageData*/ 2) button_changes.priority = /*cta_button*/ ctx[12].is_primary
    			? 'primary'
    			: 'tertiary';

    			if (dirty & /*$$scope, pageData*/ 1048578) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(144:4) {#each pageData.acf.call_to_action_section.call_to_action_buttons as cta_button}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[3]);
    	const if_block_creators = [create_if_block$6, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*data*/ ctx[0] != '') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[3]();
    				});

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*y*/ 4 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo(window.pageXOffset, /*y*/ ctx[2]);
    				scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function typewriter(node, { speed = 30, delay = 500 }) {
    	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    	if (!valid) {
    		throw new Error(`This transition only works on elements with a single text node child`);
    	}

    	const text = node.textContent;
    	const duration = text.length * speed;

    	return {
    		duration,
    		tick: t => {
    			node.textContent = '';

    			setTimeout(
    				function () {
    					const i = ~~(text.length * t);
    					node.textContent = text.slice(0, i);
    				},
    				delay + duration
    			);
    		}
    	};
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	const apiURL = 'http://wp:8080/wp-json';
    	let data = [];
    	let pageData = [];
    	let title = "";
    	let content = "";
    	let metaFields = [];
    	let storedState = "";
    	let slug = "about";
    	let y;

    	const getData = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/pages/?slug=about`);
    		const json = await res.json();
    		$$invalidate(0, data = json);

    		if (data[0] !== undefined) {
    			$$invalidate(1, pageData = data[0]);
    		}

    		storedState = slug;
    	};

    	onMount(async () => {
    		getData();
    	});

    	let visible = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	function onwindowscroll() {
    		$$invalidate(2, y = window.pageYOffset);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		fade,
    		fly,
    		expoInOut,
    		Head,
    		PageTitle,
    		Ribbon,
    		Button,
    		ScrollTo,
    		apiURL,
    		data,
    		pageData,
    		title,
    		content,
    		metaFields,
    		storedState,
    		slug,
    		y,
    		getData,
    		visible,
    		typewriter
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('pageData' in $$props) $$invalidate(1, pageData = $$props.pageData);
    		if ('title' in $$props) title = $$props.title;
    		if ('content' in $$props) content = $$props.content;
    		if ('metaFields' in $$props) metaFields = $$props.metaFields;
    		if ('storedState' in $$props) storedState = $$props.storedState;
    		if ('slug' in $$props) slug = $$props.slug;
    		if ('y' in $$props) $$invalidate(2, y = $$props.y);
    		if ('visible' in $$props) visible = $$props.visible;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data, pageData, y, onwindowscroll];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

    var token = '%[a-f0-9]{2}';
    var singleMatcher = new RegExp(token, 'gi');
    var multiMatcher = new RegExp('(' + token + ')+', 'gi');

    function decodeComponents(components, split) {
    	try {
    		// Try to decode the entire string first
    		return decodeURIComponent(components.join(''));
    	} catch (err) {
    		// Do nothing
    	}

    	if (components.length === 1) {
    		return components;
    	}

    	split = split || 1;

    	// Split the array in 2 parts
    	var left = components.slice(0, split);
    	var right = components.slice(split);

    	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
    }

    function decode(input) {
    	try {
    		return decodeURIComponent(input);
    	} catch (err) {
    		var tokens = input.match(singleMatcher);

    		for (var i = 1; i < tokens.length; i++) {
    			input = decodeComponents(tokens, i).join('');

    			tokens = input.match(singleMatcher);
    		}

    		return input;
    	}
    }

    function customDecodeURIComponent(input) {
    	// Keep track of all the replacements and prefill the map with the `BOM`
    	var replaceMap = {
    		'%FE%FF': '\uFFFD\uFFFD',
    		'%FF%FE': '\uFFFD\uFFFD'
    	};

    	var match = multiMatcher.exec(input);
    	while (match) {
    		try {
    			// Decode as big chunks as possible
    			replaceMap[match[0]] = decodeURIComponent(match[0]);
    		} catch (err) {
    			var result = decode(match[0]);

    			if (result !== match[0]) {
    				replaceMap[match[0]] = result;
    			}
    		}

    		match = multiMatcher.exec(input);
    	}

    	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
    	replaceMap['%C2'] = '\uFFFD';

    	var entries = Object.keys(replaceMap);

    	for (var i = 0; i < entries.length; i++) {
    		// Replace all decoded components
    		var key = entries[i];
    		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
    	}

    	return input;
    }

    var decodeUriComponent = function (encodedURI) {
    	if (typeof encodedURI !== 'string') {
    		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
    	}

    	try {
    		encodedURI = encodedURI.replace(/\+/g, ' ');

    		// Try the built in decoder first
    		return decodeURIComponent(encodedURI);
    	} catch (err) {
    		// Fallback to a more advanced decoder
    		return customDecodeURIComponent(encodedURI);
    	}
    };

    var splitOnFirst = (string, separator) => {
    	if (!(typeof string === 'string' && typeof separator === 'string')) {
    		throw new TypeError('Expected the arguments to be of type `string`');
    	}

    	if (separator === '') {
    		return [string];
    	}

    	const separatorIndex = string.indexOf(separator);

    	if (separatorIndex === -1) {
    		return [string];
    	}

    	return [
    		string.slice(0, separatorIndex),
    		string.slice(separatorIndex + separator.length)
    	];
    };

    var filterObj = function (obj, predicate) {
    	var ret = {};
    	var keys = Object.keys(obj);
    	var isArr = Array.isArray(predicate);

    	for (var i = 0; i < keys.length; i++) {
    		var key = keys[i];
    		var val = obj[key];

    		if (isArr ? predicate.indexOf(key) !== -1 : predicate(key, val, obj)) {
    			ret[key] = val;
    		}
    	}

    	return ret;
    };

    var queryString = createCommonjsModule(function (module, exports) {





    const isNullOrUndefined = value => value === null || value === undefined;

    function encoderForArrayFormat(options) {
    	switch (options.arrayFormat) {
    		case 'index':
    			return key => (result, value) => {
    				const index = result.length;

    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[', index, ']'].join('')];
    				}

    				return [
    					...result,
    					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
    				];
    			};

    		case 'bracket':
    			return key => (result, value) => {
    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, [encode(key, options), '[]'].join('')];
    				}

    				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
    			};

    		case 'comma':
    		case 'separator':
    			return key => (result, value) => {
    				if (value === null || value === undefined || value.length === 0) {
    					return result;
    				}

    				if (result.length === 0) {
    					return [[encode(key, options), '=', encode(value, options)].join('')];
    				}

    				return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
    			};

    		default:
    			return key => (result, value) => {
    				if (
    					value === undefined ||
    					(options.skipNull && value === null) ||
    					(options.skipEmptyString && value === '')
    				) {
    					return result;
    				}

    				if (value === null) {
    					return [...result, encode(key, options)];
    				}

    				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
    			};
    	}
    }

    function parserForArrayFormat(options) {
    	let result;

    	switch (options.arrayFormat) {
    		case 'index':
    			return (key, value, accumulator) => {
    				result = /\[(\d*)\]$/.exec(key);

    				key = key.replace(/\[\d*\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = {};
    				}

    				accumulator[key][result[1]] = value;
    			};

    		case 'bracket':
    			return (key, value, accumulator) => {
    				result = /(\[\])$/.exec(key);
    				key = key.replace(/\[\]$/, '');

    				if (!result) {
    					accumulator[key] = value;
    					return;
    				}

    				if (accumulator[key] === undefined) {
    					accumulator[key] = [value];
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};

    		case 'comma':
    		case 'separator':
    			return (key, value, accumulator) => {
    				const isArray = typeof value === 'string' && value.includes(options.arrayFormatSeparator);
    				const isEncodedArray = (typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator));
    				value = isEncodedArray ? decode(value, options) : value;
    				const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);
    				accumulator[key] = newValue;
    			};

    		default:
    			return (key, value, accumulator) => {
    				if (accumulator[key] === undefined) {
    					accumulator[key] = value;
    					return;
    				}

    				accumulator[key] = [].concat(accumulator[key], value);
    			};
    	}
    }

    function validateArrayFormatSeparator(value) {
    	if (typeof value !== 'string' || value.length !== 1) {
    		throw new TypeError('arrayFormatSeparator must be single character string');
    	}
    }

    function encode(value, options) {
    	if (options.encode) {
    		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    	}

    	return value;
    }

    function decode(value, options) {
    	if (options.decode) {
    		return decodeUriComponent(value);
    	}

    	return value;
    }

    function keysSorter(input) {
    	if (Array.isArray(input)) {
    		return input.sort();
    	}

    	if (typeof input === 'object') {
    		return keysSorter(Object.keys(input))
    			.sort((a, b) => Number(a) - Number(b))
    			.map(key => input[key]);
    	}

    	return input;
    }

    function removeHash(input) {
    	const hashStart = input.indexOf('#');
    	if (hashStart !== -1) {
    		input = input.slice(0, hashStart);
    	}

    	return input;
    }

    function getHash(url) {
    	let hash = '';
    	const hashStart = url.indexOf('#');
    	if (hashStart !== -1) {
    		hash = url.slice(hashStart);
    	}

    	return hash;
    }

    function extract(input) {
    	input = removeHash(input);
    	const queryStart = input.indexOf('?');
    	if (queryStart === -1) {
    		return '';
    	}

    	return input.slice(queryStart + 1);
    }

    function parseValue(value, options) {
    	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
    		value = Number(value);
    	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
    		value = value.toLowerCase() === 'true';
    	}

    	return value;
    }

    function parse(query, options) {
    	options = Object.assign({
    		decode: true,
    		sort: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ',',
    		parseNumbers: false,
    		parseBooleans: false
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const formatter = parserForArrayFormat(options);

    	// Create an object with no prototype
    	const ret = Object.create(null);

    	if (typeof query !== 'string') {
    		return ret;
    	}

    	query = query.trim().replace(/^[?#&]/, '');

    	if (!query) {
    		return ret;
    	}

    	for (const param of query.split('&')) {
    		if (param === '') {
    			continue;
    		}

    		let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '=');

    		// Missing `=` should be `null`:
    		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    		value = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);
    		formatter(decode(key, options), value, ret);
    	}

    	for (const key of Object.keys(ret)) {
    		const value = ret[key];
    		if (typeof value === 'object' && value !== null) {
    			for (const k of Object.keys(value)) {
    				value[k] = parseValue(value[k], options);
    			}
    		} else {
    			ret[key] = parseValue(value, options);
    		}
    	}

    	if (options.sort === false) {
    		return ret;
    	}

    	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
    		const value = ret[key];
    		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
    			// Sort object keys, not values
    			result[key] = keysSorter(value);
    		} else {
    			result[key] = value;
    		}

    		return result;
    	}, Object.create(null));
    }

    exports.extract = extract;
    exports.parse = parse;

    exports.stringify = (object, options) => {
    	if (!object) {
    		return '';
    	}

    	options = Object.assign({
    		encode: true,
    		strict: true,
    		arrayFormat: 'none',
    		arrayFormatSeparator: ','
    	}, options);

    	validateArrayFormatSeparator(options.arrayFormatSeparator);

    	const shouldFilter = key => (
    		(options.skipNull && isNullOrUndefined(object[key])) ||
    		(options.skipEmptyString && object[key] === '')
    	);

    	const formatter = encoderForArrayFormat(options);

    	const objectCopy = {};

    	for (const key of Object.keys(object)) {
    		if (!shouldFilter(key)) {
    			objectCopy[key] = object[key];
    		}
    	}

    	const keys = Object.keys(objectCopy);

    	if (options.sort !== false) {
    		keys.sort(options.sort);
    	}

    	return keys.map(key => {
    		const value = object[key];

    		if (value === undefined) {
    			return '';
    		}

    		if (value === null) {
    			return encode(key, options);
    		}

    		if (Array.isArray(value)) {
    			return value
    				.reduce(formatter(key), [])
    				.join('&');
    		}

    		return encode(key, options) + '=' + encode(value, options);
    	}).filter(x => x.length > 0).join('&');
    };

    exports.parseUrl = (url, options) => {
    	options = Object.assign({
    		decode: true
    	}, options);

    	const [url_, hash] = splitOnFirst(url, '#');

    	return Object.assign(
    		{
    			url: url_.split('?')[0] || '',
    			query: parse(extract(url), options)
    		},
    		options && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}
    	);
    };

    exports.stringifyUrl = (object, options) => {
    	options = Object.assign({
    		encode: true,
    		strict: true
    	}, options);

    	const url = removeHash(object.url).split('?')[0] || '';
    	const queryFromUrl = exports.extract(object.url);
    	const parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});

    	const query = Object.assign(parsedQueryFromUrl, object.query);
    	let queryString = exports.stringify(query, options);
    	if (queryString) {
    		queryString = `?${queryString}`;
    	}

    	let hash = getHash(object.url);
    	if (object.fragmentIdentifier) {
    		hash = `#${encode(object.fragmentIdentifier, options)}`;
    	}

    	return `${url}${queryString}${hash}`;
    };

    exports.pick = (input, filter, options) => {
    	options = Object.assign({
    		parseFragmentIdentifier: true
    	}, options);

    	const {url, query, fragmentIdentifier} = exports.parseUrl(input, options);
    	return exports.stringifyUrl({
    		url,
    		query: filterObj(query, filter),
    		fragmentIdentifier
    	}, options);
    };

    exports.exclude = (input, filter, options) => {
    	const exclusionFilter = Array.isArray(filter) ? key => !filter.includes(key) : (key, value) => !filter(key, value);

    	return exports.pick(input, exclusionFilter, options);
    };
    });
    var queryString_1 = queryString.extract;
    var queryString_2 = queryString.parse;
    var queryString_3 = queryString.stringify;
    var queryString_4 = queryString.parseUrl;
    var queryString_5 = queryString.stringifyUrl;
    var queryString_6 = queryString.pick;
    var queryString_7 = queryString.exclude;

    /* src/Components/Design/Molecules/FacetPanel.svelte generated by Svelte v3.44.0 */

    const file$p = "src/Components/Design/Molecules/FacetPanel.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (19:12) {#if all}
    function create_if_block_2$2(ctx) {
    	let li;
    	let label;
    	let input;
    	let t;
    	let label_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			li = element("li");
    			label = element("label");
    			input = element("input");
    			t = text(" All");
    			attr_dev(input, "type", "radio");
    			attr_dev(input, "for", "year");
    			input.__value = "";
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);
    			add_location(input, file$p, 19, 110, 746);

    			attr_dev(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0] == ''
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));

    			add_location(label, file$p, 19, 20, 656);
    			add_location(li, file$p, 19, 16, 652);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, label);
    			append_dev(label, input);
    			input.checked = input.__value === /*groupSelection*/ ctx[0];
    			append_dev(label, t);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[8]),
    					listen_dev(
    						input,
    						"change",
    						function () {
    							if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = input.__value === /*groupSelection*/ ctx[0];
    			}

    			if (dirty & /*groupSelection*/ 1 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0] == ''
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr_dev(label, "class", label_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(19:12) {#if all}",
    		ctx
    	});

    	return block;
    }

    // (26:51) 
    function create_if_block_1$5(ctx) {
    	let label;
    	let input;
    	let input_value_value;
    	let t0;

    	let t1_value = (/*facet*/ ctx[12].name
    	? /*facet*/ ctx[12].name
    	: /*facet*/ ctx[12]) + "";

    	let t1;
    	let label_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(input, "type", "radio");

    			input.__value = input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12];

    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);
    			add_location(input, file$p, 26, 124, 1480);

    			attr_dev(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12])
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));

    			add_location(label, file$p, 26, 24, 1380);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = input.__value === /*groupSelection*/ ctx[0];
    			append_dev(label, t0);
    			append_dev(label, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler_2*/ ctx[11]),
    					listen_dev(
    						input,
    						"change",
    						function () {
    							if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*facets*/ 4 && input_value_value !== (input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12])) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = input.__value === /*groupSelection*/ ctx[0];
    			}

    			if (dirty & /*facets*/ 4 && t1_value !== (t1_value = (/*facet*/ ctx[12].name
    			? /*facet*/ ctx[12].name
    			: /*facet*/ ctx[12]) + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*groupSelection, facets*/ 5 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12])
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr_dev(label, "class", label_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(26:51) ",
    		ctx
    	});

    	return block;
    }

    // (24:20) {#if inputType == 'checkbox'}
    function create_if_block$7(ctx) {
    	let label;
    	let input;
    	let input_value_value;
    	let t0;

    	let t1_value = (/*facet*/ ctx[12].name
    	? /*facet*/ ctx[12].name
    	: /*facet*/ ctx[12]) + "";

    	let t1;
    	let label_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr_dev(input, "type", "checkbox");

    			input.__value = input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12];

    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);
    			add_location(input, file$p, 24, 127, 1129);

    			attr_dev(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12].id)
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));

    			add_location(label, file$p, 24, 24, 1026);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label, anchor);
    			append_dev(label, input);
    			input.checked = ~/*groupSelection*/ ctx[0].indexOf(input.__value);
    			append_dev(label, t0);
    			append_dev(label, t1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[10]),
    					listen_dev(
    						input,
    						"change",
    						function () {
    							if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*facets*/ 4 && input_value_value !== (input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12])) {
    				prop_dev(input, "__value", input_value_value);
    				input.value = input.__value;
    			}

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = ~/*groupSelection*/ ctx[0].indexOf(input.__value);
    			}

    			if (dirty & /*facets*/ 4 && t1_value !== (t1_value = (/*facet*/ ctx[12].name
    			? /*facet*/ ctx[12].name
    			: /*facet*/ ctx[12]) + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*groupSelection, facets*/ 5 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12].id)
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr_dev(label, "class", label_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(24:20) {#if inputType == 'checkbox'}",
    		ctx
    	});

    	return block;
    }

    // (22:12) {#each facets as facet}
    function create_each_block$6(ctx) {
    	let li;
    	let t;

    	function select_block_type(ctx, dirty) {
    		if (/*inputType*/ ctx[4] == 'checkbox') return create_if_block$7;
    		if (/*inputType*/ ctx[4] == 'radio') return create_if_block_1$5;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t = space();
    			add_location(li, file$p, 22, 16, 947);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(li, t);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(22:12) {#each facets as facet}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let div;
    	let h3;
    	let t0;
    	let t1;
    	let button;
    	let button_class_value;
    	let t2;
    	let hr;
    	let t3;
    	let form;
    	let ul;
    	let t4;
    	let form_class_value;
    	let mounted;
    	let dispose;
    	let if_block = /*all*/ ctx[5] && create_if_block_2$2(ctx);
    	let each_value = /*facets*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(/*title*/ ctx[1]);
    			t1 = space();
    			button = element("button");
    			t2 = space();
    			hr = element("hr");
    			t3 = space();
    			form = element("form");
    			ul = element("ul");
    			if (if_block) if_block.c();
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h3, "class", "font-bold text-gray-800");
    			add_location(h3, file$p, 13, 4, 292);
    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(`dropdown-btn ${/*dropped*/ ctx[6] ? 'dropped' : ''} before transition duration-150 rounded-full absolute bg-gray-400 mt-6 mr-5 p-5 hidden sm:block`) + " svelte-95jkel"));
    			add_location(button, file$p, 14, 4, 345);
    			attr_dev(hr, "class", "my-3");
    			add_location(hr, file$p, 15, 4, 534);
    			add_location(ul, file$p, 17, 8, 609);
    			attr_dev(form, "class", form_class_value = "" + (null_to_empty(`${/*dropped*/ ctx[6] ? 'dropped' : ''}`) + " svelte-95jkel"));
    			add_location(form, file$p, 16, 4, 556);
    			attr_dev(div, "class", "relative w-full my-4 px-8 py-3 bg-white rounded-lg shadow-xl");
    			add_location(div, file$p, 12, 0, 213);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);
    			append_dev(div, button);
    			append_dev(div, t2);
    			append_dev(div, hr);
    			append_dev(div, t3);
    			append_dev(div, form);
    			append_dev(form, ul);
    			if (if_block) if_block.m(ul, null);
    			append_dev(ul, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*dropdown*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 2) set_data_dev(t0, /*title*/ ctx[1]);

    			if (dirty & /*dropped*/ 64 && button_class_value !== (button_class_value = "" + (null_to_empty(`dropdown-btn ${/*dropped*/ ctx[6] ? 'dropped' : ''} before transition duration-150 rounded-full absolute bg-gray-400 mt-6 mr-5 p-5 hidden sm:block`) + " svelte-95jkel"))) {
    				attr_dev(button, "class", button_class_value);
    			}

    			if (/*all*/ ctx[5]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2$2(ctx);
    					if_block.c();
    					if_block.m(ul, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*groupSelection, facets, addQuery, inputType*/ 29) {
    				each_value = /*facets*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*dropped*/ 64 && form_class_value !== (form_class_value = "" + (null_to_empty(`${/*dropped*/ ctx[6] ? 'dropped' : ''}`) + " svelte-95jkel"))) {
    				attr_dev(form, "class", form_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FacetPanel', slots, []);
    	let dropped = false;
    	let { title, facets, groupSelection, addQuery, inputType, all = false } = $$props;

    	const dropdown = () => {
    		$$invalidate(6, dropped = dropped == false ? true : false);
    	};

    	const writable_props = ['title', 'facets', 'groupSelection', 'addQuery', 'inputType', 'all'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FacetPanel> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input_change_handler() {
    		groupSelection = this.__value;
    		$$invalidate(0, groupSelection);
    	}

    	function input_change_handler_1() {
    		groupSelection = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(0, groupSelection);
    	}

    	function input_change_handler_2() {
    		groupSelection = this.__value;
    		$$invalidate(0, groupSelection);
    	}

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('facets' in $$props) $$invalidate(2, facets = $$props.facets);
    		if ('groupSelection' in $$props) $$invalidate(0, groupSelection = $$props.groupSelection);
    		if ('addQuery' in $$props) $$invalidate(3, addQuery = $$props.addQuery);
    		if ('inputType' in $$props) $$invalidate(4, inputType = $$props.inputType);
    		if ('all' in $$props) $$invalidate(5, all = $$props.all);
    	};

    	$$self.$capture_state = () => ({
    		dropped,
    		title,
    		facets,
    		groupSelection,
    		addQuery,
    		inputType,
    		all,
    		dropdown
    	});

    	$$self.$inject_state = $$props => {
    		if ('dropped' in $$props) $$invalidate(6, dropped = $$props.dropped);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('facets' in $$props) $$invalidate(2, facets = $$props.facets);
    		if ('groupSelection' in $$props) $$invalidate(0, groupSelection = $$props.groupSelection);
    		if ('addQuery' in $$props) $$invalidate(3, addQuery = $$props.addQuery);
    		if ('inputType' in $$props) $$invalidate(4, inputType = $$props.inputType);
    		if ('all' in $$props) $$invalidate(5, all = $$props.all);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		groupSelection,
    		title,
    		facets,
    		addQuery,
    		inputType,
    		all,
    		dropped,
    		dropdown,
    		input_change_handler,
    		$$binding_groups,
    		input_change_handler_1,
    		input_change_handler_2
    	];
    }

    class FacetPanel extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {
    			title: 1,
    			facets: 2,
    			groupSelection: 0,
    			addQuery: 3,
    			inputType: 4,
    			all: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FacetPanel",
    			options,
    			id: create_fragment$r.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<FacetPanel> was created without expected prop 'title'");
    		}

    		if (/*facets*/ ctx[2] === undefined && !('facets' in props)) {
    			console.warn("<FacetPanel> was created without expected prop 'facets'");
    		}

    		if (/*groupSelection*/ ctx[0] === undefined && !('groupSelection' in props)) {
    			console.warn("<FacetPanel> was created without expected prop 'groupSelection'");
    		}

    		if (/*addQuery*/ ctx[3] === undefined && !('addQuery' in props)) {
    			console.warn("<FacetPanel> was created without expected prop 'addQuery'");
    		}

    		if (/*inputType*/ ctx[4] === undefined && !('inputType' in props)) {
    			console.warn("<FacetPanel> was created without expected prop 'inputType'");
    		}
    	}

    	get title() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get facets() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set facets(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get groupSelection() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set groupSelection(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get addQuery() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set addQuery(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputType() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputType(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get all() {
    		throw new Error("<FacetPanel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set all(value) {
    		throw new Error("<FacetPanel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Templates/Projects.svelte generated by Svelte v3.44.0 */
    const file$q = "src/Components/Design/Templates/Projects.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	child_ctx[25] = i;
    	return child_ctx;
    }

    // (102:2) {#if workflowTaxonomies != []}
    function create_if_block_4$1(ctx) {
    	let div;
    	let facetpanel;
    	let updating_groupSelection;
    	let div_intro;
    	let div_outro;
    	let current;

    	function facetpanel_groupSelection_binding(value) {
    		/*facetpanel_groupSelection_binding*/ ctx[10](value);
    	}

    	let facetpanel_props = {
    		title: "Workflow",
    		facets: /*workflowTaxonomies*/ ctx[1],
    		addQuery: /*addQuery*/ ctx[8],
    		inputType: 'checkbox'
    	};

    	if (/*workflowSelection*/ ctx[5] !== void 0) {
    		facetpanel_props.groupSelection = /*workflowSelection*/ ctx[5];
    	}

    	facetpanel = new FacetPanel({ props: facetpanel_props, $$inline: true });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    			add_location(div, file$q, 102, 3, 3368);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const facetpanel_changes = {};
    			if (dirty & /*workflowTaxonomies*/ 2) facetpanel_changes.facets = /*workflowTaxonomies*/ ctx[1];

    			if (!updating_groupSelection && dirty & /*workflowSelection*/ 32) {
    				updating_groupSelection = true;
    				facetpanel_changes.groupSelection = /*workflowSelection*/ ctx[5];
    				add_flush_callback(() => updating_groupSelection = false);
    			}

    			facetpanel.$set(facetpanel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(facetpanel.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fly, {
    					y: 176,
    					duration: 1500,
    					delay: 350,
    					easing: expoInOut
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(102:2) {#if workflowTaxonomies != []}",
    		ctx
    	});

    	return block;
    }

    // (107:2) {#if techTaxonomies != []}
    function create_if_block_3$1(ctx) {
    	let div;
    	let facetpanel;
    	let updating_groupSelection;
    	let div_intro;
    	let div_outro;
    	let current;

    	function facetpanel_groupSelection_binding_1(value) {
    		/*facetpanel_groupSelection_binding_1*/ ctx[11](value);
    	}

    	let facetpanel_props = {
    		title: "Tech Stack",
    		facets: /*techTaxonomies*/ ctx[2],
    		addQuery: /*addQuery*/ ctx[8],
    		inputType: 'checkbox'
    	};

    	if (/*techSelection*/ ctx[6] !== void 0) {
    		facetpanel_props.groupSelection = /*techSelection*/ ctx[6];
    	}

    	facetpanel = new FacetPanel({ props: facetpanel_props, $$inline: true });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding_1));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    			add_location(div, file$q, 107, 3, 3659);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const facetpanel_changes = {};
    			if (dirty & /*techTaxonomies*/ 4) facetpanel_changes.facets = /*techTaxonomies*/ ctx[2];

    			if (!updating_groupSelection && dirty & /*techSelection*/ 64) {
    				updating_groupSelection = true;
    				facetpanel_changes.groupSelection = /*techSelection*/ ctx[6];
    				add_flush_callback(() => updating_groupSelection = false);
    			}

    			facetpanel.$set(facetpanel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(facetpanel.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fly, {
    					y: 176,
    					duration: 1500,
    					delay: 450,
    					easing: expoInOut
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(107:2) {#if techTaxonomies != []}",
    		ctx
    	});

    	return block;
    }

    // (113:2) {#if yearArray != []}
    function create_if_block_2$3(ctx) {
    	let div;
    	let facetpanel;
    	let updating_groupSelection;
    	let div_intro;
    	let div_outro;
    	let current;

    	function facetpanel_groupSelection_binding_2(value) {
    		/*facetpanel_groupSelection_binding_2*/ ctx[12](value);
    	}

    	let facetpanel_props = {
    		title: "Year",
    		facets: /*yearArray*/ ctx[3],
    		addQuery: /*addQuery*/ ctx[8],
    		inputType: "radio",
    		all: true
    	};

    	if (/*yearSelection*/ ctx[7] !== void 0) {
    		facetpanel_props.groupSelection = /*yearSelection*/ ctx[7];
    	}

    	facetpanel = new FacetPanel({ props: facetpanel_props, $$inline: true });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding_2));

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    			add_location(div, file$q, 113, 3, 3940);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const facetpanel_changes = {};
    			if (dirty & /*yearArray*/ 8) facetpanel_changes.facets = /*yearArray*/ ctx[3];

    			if (!updating_groupSelection && dirty & /*yearSelection*/ 128) {
    				updating_groupSelection = true;
    				facetpanel_changes.groupSelection = /*yearSelection*/ ctx[7];
    				add_flush_callback(() => updating_groupSelection = false);
    			}

    			facetpanel.$set(facetpanel_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(facetpanel.$$.fragment, local);

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fly, {
    					y: 176,
    					duration: 1500,
    					delay: 550,
    					easing: expoInOut
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(113:2) {#if yearArray != []}",
    		ctx
    	});

    	return block;
    }

    // (138:2) {:else}
    function create_else_block_1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "No projects like that :(";
    			add_location(p, file$q, 138, 2, 5230);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(138:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (121:2) {#if posts != '' && posts !== undefined && posts !== [] }
    function create_if_block$8(ctx) {
    	let ul;
    	let current;
    	let each_value = /*posts*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "w-full flex row flex-wrap md:flex md:justify-center");
    			add_location(ul, file$q, 121, 2, 4281);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*posts*/ 1) {
    				each_value = /*posts*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(121:2) {#if posts != '' && posts !== undefined && posts !== [] }",
    		ctx
    	});

    	return block;
    }

    // (129:7) {:else}
    function create_else_block$2(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "w-full h-full bg-grayWhite");
    			add_location(div, file$q, 129, 8, 5004);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(129:7) {:else}",
    		ctx
    	});

    	return block;
    }

    // (127:7) {#if post._embedded['wp:featuredmedia']}
    function create_if_block_1$6(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "w-full");
    			attr_dev(img, "alt", "project");
    			if (!src_url_equal(img.src, img_src_value = /*post*/ ctx[23]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)) attr_dev(img, "src", img_src_value);
    			add_location(img, file$q, 127, 8, 4862);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*posts*/ 1 && !src_url_equal(img.src, img_src_value = /*post*/ ctx[23]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$6.name,
    		type: "if",
    		source: "(127:7) {#if post._embedded['wp:featuredmedia']}",
    		ctx
    	});

    	return block;
    }

    // (125:5) <Link to="projects/{post.slug}" >
    function create_default_slot$4(ctx) {
    	let div;
    	let t0;
    	let p;
    	let t1_value = /*post*/ ctx[23].title.rendered + "";
    	let t1;
    	let div_intro;
    	let div_outro;
    	let current;

    	function select_block_type_1(ctx, dirty) {
    		if (/*post*/ ctx[23]._embedded['wp:featuredmedia']) return create_if_block_1$6;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			attr_dev(p, "class", "absolute text-lg text-white my-3 mx-3 svelte-qvmaqr");
    			set_style(p, "left", "0");
    			add_location(p, file$q, 131, 7, 5071);
    			attr_dev(div, "class", "thumb-container relative before w-full h-64 overflow-hidden flex justify-center items-center svelte-qvmaqr");
    			add_location(div, file$q, 125, 6, 4608);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    			append_dev(div, t0);
    			append_dev(div, p);
    			append_dev(p, t1);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, t0);
    				}
    			}

    			if ((!current || dirty & /*posts*/ 1) && t1_value !== (t1_value = /*post*/ ctx[23].title.rendered + "")) set_data_dev(t1, t1_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div_outro) div_outro.end(1);

    				div_intro = create_in_transition(div, fly, {
    					y: -256,
    					duration: 1500,
    					delay: 50,
    					easing: expoInOut
    				});

    				div_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: -256 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(125:5) <Link to=\\\"projects/{post.slug}\\\" >",
    		ctx
    	});

    	return block;
    }

    // (123:3) {#each posts as post, i}
    function create_each_block$7(ctx) {
    	let li;
    	let link;
    	let t;
    	let li_intro;
    	let li_outro;
    	let current;

    	link = new Link({
    			props: {
    				to: "projects/" + /*post*/ ctx[23].slug,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			t = space();
    			attr_dev(li, "class", "project-tile inline-block mb-16 mr-16 md:mr-0 overflow-hidden svelte-qvmaqr");
    			set_style(li, "width", "22em");
    			add_location(li, file$q, 123, 4, 4378);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			mount_component(link, li, null);
    			append_dev(li, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const link_changes = {};
    			if (dirty & /*posts*/ 1) link_changes.to = "projects/" + /*post*/ ctx[23].slug;

    			if (dirty & /*$$scope, posts*/ 67108865) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);

    			add_render_callback(() => {
    				if (li_outro) li_outro.end(1);

    				li_intro = create_in_transition(li, fly, {
    					y: 176,
    					duration: 1500,
    					delay: 50,
    					easing: expoInOut
    				});

    				li_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			if (li_intro) li_intro.invalidate();
    			li_outro = create_out_transition(li, fly, { y: 176 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(link);
    			if (detaching && li_outro) li_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(123:3) {#each posts as post, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let head;
    	let t0;
    	let div2;
    	let div0;
    	let pagetitle;
    	let t1;
    	let p;
    	let p_intro;
    	let p_outro;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let div1;
    	let current_block_type_index;
    	let if_block3;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[4] },
    			$$inline: true
    		});

    	pagetitle = new PageTitle({
    			props: { title: "Projects" },
    			$$inline: true
    		});

    	let if_block0 = /*workflowTaxonomies*/ ctx[1] != [] && create_if_block_4$1(ctx);
    	let if_block1 = /*techTaxonomies*/ ctx[2] != [] && create_if_block_3$1(ctx);
    	let if_block2 = /*yearArray*/ ctx[3] != [] && create_if_block_2$3(ctx);
    	const if_block_creators = [create_if_block$8, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*posts*/ ctx[0] != '' && /*posts*/ ctx[0] !== undefined && /*posts*/ ctx[0] !== []) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			p = element("p");
    			p.textContent = "Select below to filter.";
    			t3 = space();
    			if (if_block0) if_block0.c();
    			t4 = space();
    			if (if_block1) if_block1.c();
    			t5 = space();
    			if (if_block2) if_block2.c();
    			t6 = space();
    			div1 = element("div");
    			if_block3.c();
    			attr_dev(p, "class", "text-gray-500");
    			add_location(p, file$q, 100, 2, 3208);
    			attr_dev(div0, "class", "w-64 sm:w-full mr-5 md:mr-0 mb-8");
    			add_location(div0, file$q, 98, 1, 3126);
    			attr_dev(div1, "class", "w-full");
    			add_location(div1, file$q, 119, 1, 4198);
    			attr_dev(div2, "class", "flex sm:flex-wrap flex-row");
    			add_location(div2, file$q, 97, 0, 3084);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(pagetitle, div0, null);
    			append_dev(div0, t1);
    			append_dev(div0, p);
    			append_dev(div0, t3);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t4);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t5);
    			if (if_block2) if_block2.m(div0, null);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 16) head_changes.pageTagData = /*pageData*/ ctx[4];
    			head.$set(head_changes);

    			if (/*workflowTaxonomies*/ ctx[1] != []) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*workflowTaxonomies*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_4$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, t4);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*techTaxonomies*/ ctx[2] != []) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*techTaxonomies*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_3$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div0, t5);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*yearArray*/ ctx[3] != []) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*yearArray*/ 8) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_2$3(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div0, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block3 = if_blocks[current_block_type_index];

    				if (!if_block3) {
    					if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block3.c();
    				} else {
    					if_block3.p(ctx, dirty);
    				}

    				transition_in(if_block3, 1);
    				if_block3.m(div1, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			add_render_callback(() => {
    				if (p_outro) p_outro.end(1);
    				p_intro = create_in_transition(p, fade, { duration: 2000, delay: 2000 });
    				p_intro.start();
    			});

    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (p_intro) p_intro.invalidate();
    			p_outro = create_out_transition(p, fade, { duration: 500 });
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			destroy_component(pagetitle);
    			if (detaching && p_outro) p_outro.end();
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	let { location } = $$props;

    	// variables
    	let posts = [];

    	let workflowTaxonomies = [];
    	let techTaxonomies = [];
    	let yearArray = [];
    	let filter = false;
    	let categoryFilters = [];
    	let query = '';
    	let parsed = {};
    	let pageData = {};
    	let storedState = '';
    	const apiURL = 'http://wp:8080/wp-json';
    	let queryParams = queryString.parse(location.search);

    	let workflowSelection = queryParams.workflow !== undefined && queryParams.workflow !== ''
    	? queryParams.workflow
    	: '';

    	let techSelection = queryParams.tech !== undefined && queryParams.tech !== ''
    	? queryParams.tech
    	: '';

    	let yearSelection = queryParams.year !== undefined && queryParams.year !== ''
    	? queryParams.year
    	: '';

    	const getUnifiedQueryString = () => {
    		queryParams = queryString.parse(location.search);

    		let workflow = queryParams.workflow !== undefined
    		? 'workflow=' + queryParams.workflow
    		: '';

    		let tech = queryParams.tech !== undefined
    		? '&tech=' + queryParams.tech
    		: '';

    		let year = queryParams.year !== undefined && queryParams.year !== ''
    		? '&after=' + queryParams.year + '-01-00T00:00:00&before=' + (parseInt(queryParams.year) + 1) + '-01-00T00:00:00'
    		: '';

    		let unifiedQuery = `${workflow}${tech}${year}`;
    		return unifiedQuery;
    	};

    	const getData = async (query = '') => {
    		let [pageResponse, workflowTaxResponse, techTaxResponse, projResponse] = await Promise.all([
    			fetch(`${apiURL}/wp/v2/pages?slug=projects`),
    			fetch(`${apiURL}/wp/v2/workflow`),
    			fetch(`${apiURL}/wp/v2/tech`),
    			fetch(`${apiURL}/wp/v2/project?_embed&${getUnifiedQueryString()}`)
    		]);

    		let page = await pageResponse.json();

    		if (page[0] !== '') {
    			$$invalidate(4, pageData = page[0]);
    		}

    		$$invalidate(1, workflowTaxonomies = await workflowTaxResponse.json());
    		$$invalidate(2, techTaxonomies = await techTaxResponse.json());
    		$$invalidate(0, posts = await projResponse.json());
    		storedState = location.search;
    	};

    	const getYears = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/project`);
    		const data = await res.json();
    		let dataArray = [];

    		data.forEach(dataItem => {
    			if (!dataArray.includes(dataItem.year)) {
    				dataArray.push(dataItem.year);
    			}
    		});

    		$$invalidate(3, yearArray = dataArray);
    	};

    	onMount(async () => {
    		getData();
    		getYears();
    	});

    	afterUpdate(async () => {
    		if (location.search != storedState) {
    			getData();
    			getYears();
    		}
    	});

    	const addQuery = (group, e) => {
    		let workflow = 'workflow=' + workflowSelection;
    		let tech = 'tech=' + techSelection;
    		let year = 'year=' + yearSelection;
    		let queryString = `${workflow}&${tech}&${year}`;
    		navigate("/projects/?" + queryString, { replace: false });
    	};

    	const writable_props = ['location'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	function facetpanel_groupSelection_binding(value) {
    		workflowSelection = value;
    		$$invalidate(5, workflowSelection);
    	}

    	function facetpanel_groupSelection_binding_1(value) {
    		techSelection = value;
    		$$invalidate(6, techSelection);
    	}

    	function facetpanel_groupSelection_binding_2(value) {
    		yearSelection = value;
    		$$invalidate(7, yearSelection);
    	}

    	$$self.$$set = $$props => {
    		if ('location' in $$props) $$invalidate(9, location = $$props.location);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		Router,
    		Link,
    		navigate,
    		queryString,
    		fly,
    		fade,
    		expoInOut,
    		Head,
    		PageTitle,
    		FacetPanel,
    		location,
    		posts,
    		workflowTaxonomies,
    		techTaxonomies,
    		yearArray,
    		filter,
    		categoryFilters,
    		query,
    		parsed,
    		pageData,
    		storedState,
    		apiURL,
    		queryParams,
    		workflowSelection,
    		techSelection,
    		yearSelection,
    		getUnifiedQueryString,
    		getData,
    		getYears,
    		addQuery
    	});

    	$$self.$inject_state = $$props => {
    		if ('location' in $$props) $$invalidate(9, location = $$props.location);
    		if ('posts' in $$props) $$invalidate(0, posts = $$props.posts);
    		if ('workflowTaxonomies' in $$props) $$invalidate(1, workflowTaxonomies = $$props.workflowTaxonomies);
    		if ('techTaxonomies' in $$props) $$invalidate(2, techTaxonomies = $$props.techTaxonomies);
    		if ('yearArray' in $$props) $$invalidate(3, yearArray = $$props.yearArray);
    		if ('filter' in $$props) filter = $$props.filter;
    		if ('categoryFilters' in $$props) categoryFilters = $$props.categoryFilters;
    		if ('query' in $$props) query = $$props.query;
    		if ('parsed' in $$props) parsed = $$props.parsed;
    		if ('pageData' in $$props) $$invalidate(4, pageData = $$props.pageData);
    		if ('storedState' in $$props) storedState = $$props.storedState;
    		if ('queryParams' in $$props) queryParams = $$props.queryParams;
    		if ('workflowSelection' in $$props) $$invalidate(5, workflowSelection = $$props.workflowSelection);
    		if ('techSelection' in $$props) $$invalidate(6, techSelection = $$props.techSelection);
    		if ('yearSelection' in $$props) $$invalidate(7, yearSelection = $$props.yearSelection);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		posts,
    		workflowTaxonomies,
    		techTaxonomies,
    		yearArray,
    		pageData,
    		workflowSelection,
    		techSelection,
    		yearSelection,
    		addQuery,
    		location,
    		facetpanel_groupSelection_binding,
    		facetpanel_groupSelection_binding_1,
    		facetpanel_groupSelection_binding_2
    	];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { location: 9 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*location*/ ctx[9] === undefined && !('location' in props)) {
    			console.warn("<Projects> was created without expected prop 'location'");
    		}
    	}

    	get location() {
    		throw new Error("<Projects>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set location(value) {
    		throw new Error("<Projects>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var rellax = createCommonjsModule(function (module) {
    // ------------------------------------------
    // Rellax.js
    // Buttery smooth parallax library
    // Copyright (c) 2016 Moe Amaya (@moeamaya)
    // MIT license
    //
    // Thanks to Paraxify.js and Jaime Cabllero
    // for parallax concepts
    // ------------------------------------------

    (function (root, factory) {
      if ( module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
      } else {
        // Browser globals (root is window)
        root.Rellax = factory();
      }
    }(typeof window !== "undefined" ? window : commonjsGlobal, function () {
      var Rellax = function(el, options){

        var self = Object.create(Rellax.prototype);

        var posY = 0;
        var screenY = 0;
        var posX = 0;
        var screenX = 0;
        var blocks = [];
        var pause = true;

        // check what requestAnimationFrame to use, and if
        // it's not supported, use the onscroll event
        var loop = window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function(callback){ return setTimeout(callback, 1000 / 60); };

        // store the id for later use
        var loopId = null;

        // Test via a getter in the options object to see if the passive property is accessed
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            get: function() {
              supportsPassive = true;
            }
          });
          window.addEventListener("testPassive", null, opts);
          window.removeEventListener("testPassive", null, opts);
        } catch (e) {}

        // check what cancelAnimation method to use
        var clearLoop = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;

        // check which transform property to use
        var transformProp = window.transformProp || (function(){
            var testEl = document.createElement('div');
            if (testEl.style.transform === null) {
              var vendors = ['Webkit', 'Moz', 'ms'];
              for (var vendor in vendors) {
                if (testEl.style[ vendors[vendor] + 'Transform' ] !== undefined) {
                  return vendors[vendor] + 'Transform';
                }
              }
            }
            return 'transform';
          })();

        // Default Settings
        self.options = {
          speed: -2,
    	    verticalSpeed: null,
    	    horizontalSpeed: null,
          breakpoints: [576, 768, 1201],
          center: false,
          wrapper: null,
          relativeToWrapper: false,
          round: true,
          vertical: true,
          horizontal: false,
          verticalScrollAxis: "y",
          horizontalScrollAxis: "x",
          callback: function() {},
        };

        // User defined options (might have more in the future)
        if (options){
          Object.keys(options).forEach(function(key){
            self.options[key] = options[key];
          });
        }

        function validateCustomBreakpoints () {
          if (self.options.breakpoints.length === 3 && Array.isArray(self.options.breakpoints)) {
            var isAscending = true;
            var isNumerical = true;
            var lastVal;
            self.options.breakpoints.forEach(function (i) {
              if (typeof i !== 'number') isNumerical = false;
              if (lastVal !== null) {
                if (i < lastVal) isAscending = false;
              }
              lastVal = i;
            });
            if (isAscending && isNumerical) return;
          }
          // revert defaults if set incorrectly
          self.options.breakpoints = [576, 768, 1201];
          console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted");
        }

        if (options && options.breakpoints) {
          validateCustomBreakpoints();
        }

        // By default, rellax class
        if (!el) {
          el = '.rellax';
        }

        // check if el is a className or a node
        var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el];

        // Now query selector
        if (elements.length > 0) {
          self.elems = elements;
        }

        // The elements don't exist
        else {
          console.warn("Rellax: The elements you're trying to select don't exist.");
          return;
        }

        // Has a wrapper and it exists
        if (self.options.wrapper) {
          if (!self.options.wrapper.nodeType) {
            var wrapper = document.querySelector(self.options.wrapper);

            if (wrapper) {
              self.options.wrapper = wrapper;
            } else {
              console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
              return;
            }
          }
        }

        // set a placeholder for the current breakpoint
        var currentBreakpoint;

        // helper to determine current breakpoint
        var getCurrentBreakpoint = function (w) {
          var bp = self.options.breakpoints;
          if (w < bp[0]) return 'xs';
          if (w >= bp[0] && w < bp[1]) return 'sm';
          if (w >= bp[1] && w < bp[2]) return 'md';
          return 'lg';
        };

        // Get and cache initial position of all elements
        var cacheBlocks = function() {
          for (var i = 0; i < self.elems.length; i++){
            var block = createBlock(self.elems[i]);
            blocks.push(block);
          }
        };


        // Let's kick this script off
        // Build array for cached element values
        var init = function() {
          for (var i = 0; i < blocks.length; i++){
            self.elems[i].style.cssText = blocks[i].style;
          }

          blocks = [];

          screenY = window.innerHeight;
          screenX = window.innerWidth;
          currentBreakpoint = getCurrentBreakpoint(screenX);

          setPosition();

          cacheBlocks();

          animate();

          // If paused, unpause and set listener for window resizing events
          if (pause) {
            window.addEventListener('resize', init);
            pause = false;
            // Start the loop
            update();
          }
        };

        // We want to cache the parallax blocks'
        // values: base, top, height, speed
        // el: is dom object, return: el cache values
        var createBlock = function(el) {
          var dataPercentage = el.getAttribute( 'data-rellax-percentage' );
          var dataSpeed = el.getAttribute( 'data-rellax-speed' );
          var dataXsSpeed = el.getAttribute( 'data-rellax-xs-speed' );
          var dataMobileSpeed = el.getAttribute( 'data-rellax-mobile-speed' );
          var dataTabletSpeed = el.getAttribute( 'data-rellax-tablet-speed' );
          var dataDesktopSpeed = el.getAttribute( 'data-rellax-desktop-speed' );
          var dataVerticalSpeed = el.getAttribute('data-rellax-vertical-speed');
          var dataHorizontalSpeed = el.getAttribute('data-rellax-horizontal-speed');
          var dataVericalScrollAxis = el.getAttribute('data-rellax-vertical-scroll-axis');
          var dataHorizontalScrollAxis = el.getAttribute('data-rellax-horizontal-scroll-axis');
          var dataZindex = el.getAttribute( 'data-rellax-zindex' ) || 0;
          var dataMin = el.getAttribute( 'data-rellax-min' );
          var dataMax = el.getAttribute( 'data-rellax-max' );
          var dataMinX = el.getAttribute('data-rellax-min-x');
          var dataMaxX = el.getAttribute('data-rellax-max-x');
          var dataMinY = el.getAttribute('data-rellax-min-y');
          var dataMaxY = el.getAttribute('data-rellax-max-y');
          var mapBreakpoints;
          var breakpoints = true;

          if (!dataXsSpeed && !dataMobileSpeed && !dataTabletSpeed && !dataDesktopSpeed) {
            breakpoints = false;
          } else {
            mapBreakpoints = {
              'xs': dataXsSpeed,
              'sm': dataMobileSpeed,
              'md': dataTabletSpeed,
              'lg': dataDesktopSpeed
            };
          }

          // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
          // ensures elements are positioned based on HTML layout.
          //
          // If the element has the percentage attribute, the posY and posX needs to be
          // the current scroll position's value, so that the elements are still positioned based on HTML layout
          var wrapperPosY = self.options.wrapper ? self.options.wrapper.scrollTop : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
          // If the option relativeToWrapper is true, use the wrappers offset to top, subtracted from the current page scroll.
          if (self.options.relativeToWrapper) {
            var scrollPosY = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
            wrapperPosY = scrollPosY - self.options.wrapper.offsetTop;
          }
          var posY = self.options.vertical ? ( dataPercentage || self.options.center ? wrapperPosY : 0 ) : 0;
          var posX = self.options.horizontal ? ( dataPercentage || self.options.center ? self.options.wrapper ? self.options.wrapper.scrollLeft : (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0 ) : 0;

          var blockTop = posY + el.getBoundingClientRect().top;
          var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;

          var blockLeft = posX + el.getBoundingClientRect().left;
          var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth;

          // apparently parallax equation everyone uses
          var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
          var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);
          if(self.options.center){ percentageX = 0.5; percentageY = 0.5; }

          // Optional individual block speed as data attr, otherwise global speed
          var speed = (breakpoints && mapBreakpoints[currentBreakpoint] !== null) ? Number(mapBreakpoints[currentBreakpoint]) : (dataSpeed ? dataSpeed : self.options.speed);
          var verticalSpeed = dataVerticalSpeed ? dataVerticalSpeed : self.options.verticalSpeed;
          var horizontalSpeed = dataHorizontalSpeed ? dataHorizontalSpeed : self.options.horizontalSpeed;

          // Optional individual block movement axis direction as data attr, otherwise gobal movement direction
          var verticalScrollAxis = dataVericalScrollAxis ? dataVericalScrollAxis : self.options.verticalScrollAxis;
          var horizontalScrollAxis = dataHorizontalScrollAxis ? dataHorizontalScrollAxis : self.options.horizontalScrollAxis;

          var bases = updatePosition(percentageX, percentageY, speed, verticalSpeed, horizontalSpeed);

          // ~~Store non-translate3d transforms~~
          // Store inline styles and extract transforms
          var style = el.style.cssText;
          var transform = '';

          // Check if there's an inline styled transform
          var searchResult = /transform\s*:/i.exec(style);
          if (searchResult) {
            // Get the index of the transform
            var index = searchResult.index;

            // Trim the style to the transform point and get the following semi-colon index
            var trimmedStyle = style.slice(index);
            var delimiter = trimmedStyle.indexOf(';');

            // Remove "transform" string and save the attribute
            if (delimiter) {
              transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g,'');
            } else {
              transform = " " + trimmedStyle.slice(11).replace(/\s/g,'');
            }
          }

          return {
            baseX: bases.x,
            baseY: bases.y,
            top: blockTop,
            left: blockLeft,
            height: blockHeight,
            width: blockWidth,
            speed: speed,
            verticalSpeed: verticalSpeed,
            horizontalSpeed: horizontalSpeed,
            verticalScrollAxis: verticalScrollAxis,
            horizontalScrollAxis: horizontalScrollAxis,
            style: style,
            transform: transform,
            zindex: dataZindex,
            min: dataMin,
            max: dataMax,
            minX: dataMinX,
            maxX: dataMaxX,
            minY: dataMinY,
            maxY: dataMaxY
          };
        };

        // set scroll position (posY, posX)
        // side effect method is not ideal, but okay for now
        // returns true if the scroll changed, false if nothing happened
        var setPosition = function() {
          var oldY = posY;
          var oldX = posX;

          posY = self.options.wrapper ? self.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
          posX = self.options.wrapper ? self.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;
          // If option relativeToWrapper is true, use relative wrapper value instead.
          if (self.options.relativeToWrapper) {
            var scrollPosY = (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
            posY = scrollPosY - self.options.wrapper.offsetTop;
          }


          if (oldY != posY && self.options.vertical) {
            // scroll changed, return true
            return true;
          }

          if (oldX != posX && self.options.horizontal) {
            // scroll changed, return true
            return true;
          }

          // scroll did not change
          return false;
        };

        // Ahh a pure function, gets new transform value
        // based on scrollPosition and speed
        // Allow for decimal pixel values
        var updatePosition = function(percentageX, percentageY, speed, verticalSpeed, horizontalSpeed) {
          var result = {};
          var valueX = ((horizontalSpeed ? horizontalSpeed : speed) * (100 * (1 - percentageX)));
          var valueY = ((verticalSpeed ? verticalSpeed : speed) * (100 * (1 - percentageY)));

          result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
          result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;

          return result;
        };

        // Remove event listeners and loop again
        var deferredUpdate = function() {
          window.removeEventListener('resize', deferredUpdate);
          window.removeEventListener('orientationchange', deferredUpdate);
          (self.options.wrapper ? self.options.wrapper : window).removeEventListener('scroll', deferredUpdate);
          (self.options.wrapper ? self.options.wrapper : document).removeEventListener('touchmove', deferredUpdate);

          // loop again
          loopId = loop(update);
        };

        // Loop
        var update = function() {
          if (setPosition() && pause === false) {
            animate();

            // loop again
            loopId = loop(update);
          } else {
            loopId = null;

            // Don't animate until we get a position updating event
            window.addEventListener('resize', deferredUpdate);
            window.addEventListener('orientationchange', deferredUpdate);
            (self.options.wrapper ? self.options.wrapper : window).addEventListener('scroll', deferredUpdate, supportsPassive ? { passive: true } : false);
            (self.options.wrapper ? self.options.wrapper : document).addEventListener('touchmove', deferredUpdate, supportsPassive ? { passive: true } : false);
          }
        };

        // Transform3d on parallax element
        var animate = function() {
          var positions;
          for (var i = 0; i < self.elems.length; i++){
            // Determine relevant movement directions
            var verticalScrollAxis = blocks[i].verticalScrollAxis.toLowerCase();
            var horizontalScrollAxis = blocks[i].horizontalScrollAxis.toLowerCase();
            var verticalScrollX = verticalScrollAxis.indexOf("x") != -1 ? posY : 0;
            var verticalScrollY = verticalScrollAxis.indexOf("y") != -1 ? posY : 0;
            var horizontalScrollX = horizontalScrollAxis.indexOf("x") != -1 ? posX : 0;
            var horizontalScrollY = horizontalScrollAxis.indexOf("y") != -1 ? posX : 0;

            var percentageY = ((verticalScrollY + horizontalScrollY - blocks[i].top + screenY) / (blocks[i].height + screenY));
            var percentageX = ((verticalScrollX + horizontalScrollX - blocks[i].left + screenX) / (blocks[i].width + screenX));

            // Subtracting initialize value, so element stays in same spot as HTML
            positions = updatePosition(percentageX, percentageY, blocks[i].speed, blocks[i].verticalSpeed, blocks[i].horizontalSpeed);
            var positionY = positions.y - blocks[i].baseY;
            var positionX = positions.x - blocks[i].baseX;

            // The next two "if" blocks go like this:
            // Check if a limit is defined (first "min", then "max");
            // Check if we need to change the Y or the X
            // (Currently working only if just one of the axes is enabled)
            // Then, check if the new position is inside the allowed limit
            // If so, use new position. If not, set position to limit.

            // Check if a min limit is defined
            if (blocks[i].min !== null) {
              if (self.options.vertical && !self.options.horizontal) {
                positionY = positionY <= blocks[i].min ? blocks[i].min : positionY;
              }
              if (self.options.horizontal && !self.options.vertical) {
                positionX = positionX <= blocks[i].min ? blocks[i].min : positionX;
              }
            }

            // Check if directional min limits are defined
            if (blocks[i].minY != null) {
                positionY = positionY <= blocks[i].minY ? blocks[i].minY : positionY;
            }
            if (blocks[i].minX != null) {
                positionX = positionX <= blocks[i].minX ? blocks[i].minX : positionX;
            }

            // Check if a max limit is defined
            if (blocks[i].max !== null) {
              if (self.options.vertical && !self.options.horizontal) {
                positionY = positionY >= blocks[i].max ? blocks[i].max : positionY;
              }
              if (self.options.horizontal && !self.options.vertical) {
                positionX = positionX >= blocks[i].max ? blocks[i].max : positionX;
              }
            }

            // Check if directional max limits are defined
            if (blocks[i].maxY != null) {
                positionY = positionY >= blocks[i].maxY ? blocks[i].maxY : positionY;
            }
            if (blocks[i].maxX != null) {
                positionX = positionX >= blocks[i].maxX ? blocks[i].maxX : positionX;
            }

            var zindex = blocks[i].zindex;

            // Move that element
            // (Set the new translation and append initial inline transforms.)
            var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
            self.elems[i].style[transformProp] = translate;
          }
          self.options.callback(positions);
        };

        self.destroy = function() {
          for (var i = 0; i < self.elems.length; i++){
            self.elems[i].style.cssText = blocks[i].style;
          }

          // Remove resize event listener if not pause, and pause
          if (!pause) {
            window.removeEventListener('resize', init);
            pause = true;
          }

          // Clear the animation loop to prevent possible memory leak
          clearLoop(loopId);
          loopId = null;
        };

        // Init
        init();

        // Allow to recalculate the initial values whenever we want
        self.refresh = init;

        return self;
      };
      return Rellax;
    }));
    });

    /* src/Components/Design/Molecules/BrowserFrame.svelte generated by Svelte v3.44.0 */
    const file$r = "src/Components/Design/Molecules/BrowserFrame.svelte";

    // (57:8) {#if image != {}}
    function create_if_block$9(ctx) {
    	let img;
    	let img_alt_value;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "class", "w-full");
    			attr_dev(img, "alt", img_alt_value = /*image*/ ctx[0].alt);
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[0].source_url)) attr_dev(img, "src", img_src_value);
    			add_location(img, file$r, 57, 8, 2225);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*image*/ 1 && img_alt_value !== (img_alt_value = /*image*/ ctx[0].alt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*image*/ 1 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[0].source_url)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(57:8) {#if image != {}}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$t(ctx) {
    	let div8;
    	let div7;
    	let header;
    	let div4;
    	let a;
    	let button;
    	let t0;
    	let i;
    	let t1;
    	let div3;
    	let div0;
    	let t2;
    	let div1;
    	let t3;
    	let div2;
    	let t4;
    	let div6;
    	let div5;
    	let p;
    	let t5;
    	let div7_intro;
    	let div7_outro;
    	let div8_intro;
    	let div8_outro;
    	let current;
    	let if_block = /*image*/ ctx[0] != {} && create_if_block$9(ctx);

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div7 = element("div");
    			header = element("header");
    			div4 = element("div");
    			a = element("a");
    			button = element("button");
    			t0 = text("Click to view site ");
    			i = element("i");
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			t3 = space();
    			div2 = element("div");
    			t4 = space();
    			div6 = element("div");
    			div5 = element("div");
    			p = element("p");
    			t5 = space();
    			if (if_block) if_block.c();
    			attr_dev(i, "class", "fas fa-link ml-2");
    			add_location(i, file$r, 42, 158, 1532);
    			attr_dev(button, "class", "mt-2 -mb-1 uppercase text-xs font-semibold tracking-wideset underline rounded-md px-4 py-2 bg-gray-300");
    			add_location(button, file$r, 42, 20, 1394);
    			attr_dev(a, "href", /*siteURL*/ ctx[1]);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$r, 41, 16, 1338);
    			attr_dev(div0, "class", "w-3 h-3 rounded-full bg-gray-100");
    			add_location(div0, file$r, 45, 20, 1685);
    			attr_dev(div1, "class", "w-3 h-3 rounded-full bg-gray-100");
    			add_location(div1, file$r, 46, 20, 1758);
    			attr_dev(div2, "class", "w-3 h-3 rounded-full bg-gray-100");
    			add_location(div2, file$r, 47, 20, 1831);
    			attr_dev(div3, "class", "w-12 h-4 mt-1 mr-2 flex justify-between");
    			add_location(div3, file$r, 44, 16, 1611);
    			attr_dev(div4, "class", "flex justify-between");
    			add_location(div4, file$r, 40, 12, 1287);
    			set_style(p, "font-size", "0.75em");
    			add_location(p, file$r, 52, 20, 2078);
    			attr_dev(div5, "class", "w-full h-full mx-2 my-px px-2 border-2 bg-white");
    			add_location(div5, file$r, 51, 16, 1996);
    			attr_dev(div6, "class", "w-full flex h-6 bg-gray-300");
    			add_location(div6, file$r, 50, 12, 1938);
    			attr_dev(header, "class", "w-full h-16");
    			add_location(header, file$r, 39, 8, 1246);
    			attr_dev(div7, "class", "browser-frame w-full rounded-md bg-gray-500 shadow-2xl svelte-in2oh3");
    			add_location(div7, file$r, 38, 4, 1099);
    			attr_dev(div8, "class", "-ml-24 md:ml-0 lg:px-12 px-16 lg:py-12 py-20");
    			set_style(div8, "overflow", "hidden");
    			add_location(div8, file$r, 37, 0, 957);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div7);
    			append_dev(div7, header);
    			append_dev(header, div4);
    			append_dev(div4, a);
    			append_dev(a, button);
    			append_dev(button, t0);
    			append_dev(button, i);
    			append_dev(div4, t1);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(header, t4);
    			append_dev(header, div6);
    			append_dev(div6, div5);
    			append_dev(div5, p);
    			p.innerHTML = /*cleanedURL*/ ctx[2];
    			append_dev(div7, t5);
    			if (if_block) if_block.m(div7, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*siteURL*/ 2) {
    				attr_dev(a, "href", /*siteURL*/ ctx[1]);
    			}

    			if (!current || dirty & /*cleanedURL*/ 4) p.innerHTML = /*cleanedURL*/ ctx[2];
    			if (/*image*/ ctx[0] != {}) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$9(ctx);
    					if_block.c();
    					if_block.m(div7, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div7_outro) div7_outro.end(1);
    				div7_intro = create_in_transition(div7, /*rotateHang*/ ctx[3], { duration: 2000, delay: 1500 });
    				div7_intro.start();
    			});

    			add_render_callback(() => {
    				if (div8_outro) div8_outro.end(1);
    				div8_intro = create_in_transition(div8, fly, { x: 50, delay: 2000 });
    				div8_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div7_intro) div7_intro.invalidate();
    			div7_outro = create_out_transition(div7, fly, { x: -400 });
    			if (div8_intro) div8_intro.invalidate();
    			div8_outro = create_out_transition(div8, fly, { x: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			if (if_block) if_block.d();
    			if (detaching && div7_outro) div7_outro.end();
    			if (detaching && div8_outro) div8_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BrowserFrame', slots, []);
    	let { image = {}, siteURL = "" } = $$props;
    	let cleanedURL = '';

    	const cleanURL = () => {
    		let reg = /http.?:\/\//;
    		let match = reg.exec(siteURL);
    		$$invalidate(2, cleanedURL = siteURL.replace(reg, '<span class="text-gray-600">' + match + '</span>'));
    		return cleanedURL;
    	};

    	onMount(async () => {
    		cleanURL();
    	});

    	function rotateHang(node, { duration, delay }) {
    		return {
    			duration,
    			delay,
    			css: t => {
    				const eased = elasticOut(t);
    				const zipped = expoOut(t);
    				const slow = sineIn(t);

    				return `
                    opacity: ${slow * 2};
                    transform: perspective(800px) translateX(${-100 + zipped * 100}px) rotateY(${-30 + eased * 20}deg);`;
    			}
    		};
    	}

    	const writable_props = ['image', 'siteURL'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BrowserFrame> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('siteURL' in $$props) $$invalidate(1, siteURL = $$props.siteURL);
    	};

    	$$self.$capture_state = () => ({
    		image,
    		siteURL,
    		onMount,
    		fly,
    		expoOut,
    		elasticOut,
    		sineIn,
    		cleanedURL,
    		cleanURL,
    		rotateHang
    	});

    	$$self.$inject_state = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('siteURL' in $$props) $$invalidate(1, siteURL = $$props.siteURL);
    		if ('cleanedURL' in $$props) $$invalidate(2, cleanedURL = $$props.cleanedURL);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [image, siteURL, cleanedURL, rotateHang];
    }

    class BrowserFrame extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$t, create_fragment$t, safe_not_equal, { image: 0, siteURL: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BrowserFrame",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get image() {
    		throw new Error("<BrowserFrame>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<BrowserFrame>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get siteURL() {
    		throw new Error("<BrowserFrame>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set siteURL(value) {
    		throw new Error("<BrowserFrame>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Molecules/ProjectDetailHeader.svelte generated by Svelte v3.44.0 */

    const file$s = "src/Components/Design/Molecules/ProjectDetailHeader.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (35:0) <Link to="projects">
    function create_default_slot$5(ctx) {
    	let i;
    	let i_intro;
    	let i_outro;
    	let current;

    	const block = {
    		c: function create() {
    			i = element("i");
    			i.textContent = "Projects";
    			add_location(i, file$s, 34, 20, 1049);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (i_outro) i_outro.end(1);
    				i_intro = create_in_transition(i, fade, { duration: 2000, delay: 2000 });
    				i_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (i_intro) i_intro.invalidate();
    			i_outro = create_out_transition(i, fade, {});
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching && i_outro) i_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(35:0) <Link to=\\\"projects\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:8) {#if workflows !== []}
    function create_if_block_4$2(ctx) {
    	let div;
    	let dt;
    	let t1;
    	let each_value_2 = /*workflows*/ ctx[1];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			dt = element("dt");
    			dt.textContent = "Worflow";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(dt, "class", "svelte-15lqiar");
    			add_location(dt, file$s, 40, 12, 1490);
    			attr_dev(div, "class", "mr-10");
    			add_location(div, file$s, 39, 8, 1456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, dt);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*workflows*/ 2) {
    				each_value_2 = /*workflows*/ ctx[1];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$2.name,
    		type: "if",
    		source: "(39:8) {#if workflows !== []}",
    		ctx
    	});

    	return block;
    }

    // (42:12) {#each workflows as workflow}
    function create_each_block_2$1(ctx) {
    	let dd;
    	let t_value = /*workflow*/ ctx[15].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			dd = element("dd");
    			t = text(t_value);
    			attr_dev(dd, "class", "svelte-15lqiar");
    			add_location(dd, file$s, 42, 12, 1561);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dd, anchor);
    			append_dev(dd, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*workflows*/ 2 && t_value !== (t_value = /*workflow*/ ctx[15].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dd);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(42:12) {#each workflows as workflow}",
    		ctx
    	});

    	return block;
    }

    // (47:8) {#if tech !== []}
    function create_if_block_3$2(ctx) {
    	let div;
    	let dt;
    	let t1;
    	let each_value_1 = /*tech*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			dt = element("dt");
    			dt.textContent = "Tech";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(dt, "class", "svelte-15lqiar");
    			add_location(dt, file$s, 48, 12, 1687);
    			add_location(div, file$s, 47, 8, 1669);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, dt);
    			append_dev(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tech*/ 4) {
    				each_value_1 = /*tech*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$2.name,
    		type: "if",
    		source: "(47:8) {#if tech !== []}",
    		ctx
    	});

    	return block;
    }

    // (50:12) {#each tech as techItem}
    function create_each_block_1$2(ctx) {
    	let dd;
    	let t_value = /*techItem*/ ctx[12].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			dd = element("dd");
    			t = text(t_value);
    			attr_dev(dd, "class", "svelte-15lqiar");
    			add_location(dd, file$s, 50, 12, 1750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dd, anchor);
    			append_dev(dd, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tech*/ 4 && t_value !== (t_value = /*techItem*/ ctx[12].name + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dd);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(50:12) {#each tech as techItem}",
    		ctx
    	});

    	return block;
    }

    // (57:8) {#if projectSize !== []}
    function create_if_block_2$4(ctx) {
    	let dt;
    	let t1;
    	let dd;
    	let t2;

    	const block = {
    		c: function create() {
    			dt = element("dt");
    			dt.textContent = "Project Size";
    			t1 = space();
    			dd = element("dd");
    			t2 = text(/*projectSize*/ ctx[5]);
    			attr_dev(dt, "class", "svelte-15lqiar");
    			add_location(dt, file$s, 57, 8, 1966);
    			attr_dev(dd, "class", "svelte-15lqiar");
    			add_location(dd, file$s, 58, 8, 1996);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dt, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, dd, anchor);
    			append_dev(dd, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projectSize*/ 32) set_data_dev(t2, /*projectSize*/ ctx[5]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dt);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(dd);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$4.name,
    		type: "if",
    		source: "(57:8) {#if projectSize !== []}",
    		ctx
    	});

    	return block;
    }

    // (61:8) {#if year !== ''}
    function create_if_block_1$7(ctx) {
    	let dt;
    	let t1;
    	let dd;
    	let t2;

    	const block = {
    		c: function create() {
    			dt = element("dt");
    			dt.textContent = "Year";
    			t1 = space();
    			dd = element("dd");
    			t2 = text(/*year*/ ctx[3]);
    			attr_dev(dt, "class", "svelte-15lqiar");
    			add_location(dt, file$s, 61, 8, 2069);
    			attr_dev(dd, "class", "svelte-15lqiar");
    			add_location(dd, file$s, 62, 8, 2091);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dt, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, dd, anchor);
    			append_dev(dd, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*year*/ 8) set_data_dev(t2, /*year*/ ctx[3]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dt);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(dd);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$7.name,
    		type: "if",
    		source: "(61:8) {#if year !== ''}",
    		ctx
    	});

    	return block;
    }

    // (66:4) {#if swatch !== []}
    function create_if_block$a(ctx) {
    	let div1;
    	let dt;
    	let t1;
    	let div0;
    	let div1_intro;
    	let div1_outro;
    	let current;
    	let each_value = /*swatch*/ ctx[4];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			dt = element("dt");
    			dt.textContent = "Color Swatch";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(dt, "class", "svelte-15lqiar");
    			add_location(dt, file$s, 67, 8, 2256);
    			attr_dev(div0, "class", "flex flex-wrap w-1/2 lg:w-full -ml-2");
    			add_location(div0, file$s, 68, 8, 2286);
    			add_location(div1, file$s, 66, 4, 2160);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, dt);
    			append_dev(div1, t1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*swatch*/ 16) {
    				each_value = /*swatch*/ ctx[4];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				div1_intro = create_in_transition(div1, fly, { y: -50, delay: 1750, duration: 1000 });
    				div1_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: -50, duration: 500 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(66:4) {#if swatch !== []}",
    		ctx
    	});

    	return block;
    }

    // (70:12) {#each swatch as color}
    function create_each_block$8(ctx) {
    	let dd;
    	let dd_style_value;

    	const block = {
    		c: function create() {
    			dd = element("dd");
    			attr_dev(dd, "class", "rounded-full w-12 h-12 shadow-lg mx-2 my-1 svelte-15lqiar");
    			attr_dev(dd, "style", dd_style_value = `background-color: ${/*color*/ ctx[9].color};`);
    			add_location(dd, file$s, 70, 12, 2385);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dd, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*swatch*/ 16 && dd_style_value !== (dd_style_value = `background-color: ${/*color*/ ctx[9].color};`)) {
    				attr_dev(dd, "style", dd_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dd);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(70:12) {#each swatch as color}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let link;
    	let t0;
    	let pagetitle;
    	let t1;
    	let dl;
    	let div0;
    	let t2;
    	let t3;
    	let div0_intro;
    	let div0_outro;
    	let div1;
    	let t4;
    	let t5;
    	let div1_intro;
    	let div1_outro;
    	let current;

    	link = new Link({
    			props: {
    				to: "projects",
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	pagetitle = new PageTitle({
    			props: {
    				title: /*brandName*/ ctx[0],
    				containerClass: "-ml-10 text-6xl",
    				className: "text-6xl lg:text-3xl flex tracking-widest",
    				height: "192"
    			},
    			$$inline: true
    		});

    	let if_block0 = /*workflows*/ ctx[1] !== [] && create_if_block_4$2(ctx);
    	let if_block1 = /*tech*/ ctx[2] !== [] && create_if_block_3$2(ctx);
    	let if_block2 = /*projectSize*/ ctx[5] !== [] && create_if_block_2$4(ctx);
    	let if_block3 = /*year*/ ctx[3] !== '' && create_if_block_1$7(ctx);
    	let if_block4 = /*swatch*/ ctx[4] !== [] && create_if_block$a(ctx);

    	const block = {
    		c: function create() {
    			create_component(link.$$.fragment);
    			t0 = space();
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			dl = element("dl");
    			div0 = element("div");
    			if (if_block0) if_block0.c();
    			t2 = space();
    			if (if_block1) if_block1.c();
    			t3 = space();
    			div1 = element("div");
    			if (if_block2) if_block2.c();
    			t4 = space();
    			if (if_block3) if_block3.c();
    			t5 = space();
    			if (if_block4) if_block4.c();
    			attr_dev(div0, "class", "flex w-1/2 justify-between");
    			add_location(div0, file$s, 37, 4, 1291);
    			add_location(div1, file$s, 55, 4, 1839);
    			attr_dev(dl, "class", "project-deets mt-5 svelte-15lqiar");
    			add_location(dl, file$s, 36, 0, 1255);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(link, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(pagetitle, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, dl, anchor);
    			append_dev(dl, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(div0, t2);
    			if (if_block1) if_block1.m(div0, null);
    			append_dev(div0, t3);
    			append_dev(dl, div1);
    			if (if_block2) if_block2.m(div1, null);
    			append_dev(div1, t4);
    			if (if_block3) if_block3.m(div1, null);
    			append_dev(div1, t5);
    			if (if_block4) if_block4.m(dl, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link_changes = {};

    			if (dirty & /*$$scope*/ 262144) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    			const pagetitle_changes = {};
    			if (dirty & /*brandName*/ 1) pagetitle_changes.title = /*brandName*/ ctx[0];
    			pagetitle.$set(pagetitle_changes);

    			if (/*workflows*/ ctx[1] !== []) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_4$2(ctx);
    					if_block0.c();
    					if_block0.m(div0, t2);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*tech*/ ctx[2] !== []) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_3$2(ctx);
    					if_block1.c();
    					if_block1.m(div0, t3);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*projectSize*/ ctx[5] !== []) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_2$4(ctx);
    					if_block2.c();
    					if_block2.m(div1, t4);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (/*year*/ ctx[3] !== '') {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);
    				} else {
    					if_block3 = create_if_block_1$7(ctx);
    					if_block3.c();
    					if_block3.m(div1, t5);
    				}
    			} else if (if_block3) {
    				if_block3.d(1);
    				if_block3 = null;
    			}

    			if (/*swatch*/ ctx[4] !== []) {
    				if (if_block4) {
    					if_block4.p(ctx, dirty);

    					if (dirty & /*swatch*/ 16) {
    						transition_in(if_block4, 1);
    					}
    				} else {
    					if_block4 = create_if_block$a(ctx);
    					if_block4.c();
    					transition_in(if_block4, 1);
    					if_block4.m(dl, null);
    				}
    			} else if (if_block4) {
    				group_outros();

    				transition_out(if_block4, 1, 1, () => {
    					if_block4 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, fly, { y: -100, delay: 1000, duration: 1000 });
    				div0_intro.start();
    			});

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				div1_intro = create_in_transition(div1, fly, { y: 50, delay: 1750, duration: 1000 });
    				div1_intro.start();
    			});

    			transition_in(if_block4);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { y: -100, duration: 1000 });
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: 50, duration: 500 });
    			transition_out(if_block4);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(link, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(pagetitle, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(dl);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching && div0_outro) div0_outro.end();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (detaching && div1_outro) div1_outro.end();
    			if (if_block4) if_block4.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectDetailHeader', slots, []);
    	let { projectData = {} } = $$props;
    	let title = '';
    	let brandName = '';
    	let featuredImage = {};
    	let workflows = [];
    	let tech = [];
    	let year = '';
    	let swatch = [];
    	let projectSize = '';

    	onMount(async () => {
    		if (projectData[0] !== {}) {
    			title = projectData.title.rendered;

    			$$invalidate(0, brandName = projectData.acf.brand_name !== ''
    			? projectData.acf.brand_name
    			: title);

    			$$invalidate(1, workflows = projectData._embedded['wp:term'].filter(term => term[0].taxonomy == 'workflow')[0]);
    			$$invalidate(2, tech = projectData._embedded['wp:term'].filter(term => term[0].taxonomy == 'tech')[0]);
    			$$invalidate(3, year = projectData.year);
    			$$invalidate(4, swatch = projectData.acf.swatch);
    			$$invalidate(5, projectSize = projectData.acf.project_size);
    		}
    	});

    	const writable_props = ['projectData'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectDetailHeader> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('projectData' in $$props) $$invalidate(6, projectData = $$props.projectData);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		Link,
    		fly,
    		fade,
    		PageTitle,
    		projectData,
    		title,
    		brandName,
    		featuredImage,
    		workflows,
    		tech,
    		year,
    		swatch,
    		projectSize
    	});

    	$$self.$inject_state = $$props => {
    		if ('projectData' in $$props) $$invalidate(6, projectData = $$props.projectData);
    		if ('title' in $$props) title = $$props.title;
    		if ('brandName' in $$props) $$invalidate(0, brandName = $$props.brandName);
    		if ('featuredImage' in $$props) featuredImage = $$props.featuredImage;
    		if ('workflows' in $$props) $$invalidate(1, workflows = $$props.workflows);
    		if ('tech' in $$props) $$invalidate(2, tech = $$props.tech);
    		if ('year' in $$props) $$invalidate(3, year = $$props.year);
    		if ('swatch' in $$props) $$invalidate(4, swatch = $$props.swatch);
    		if ('projectSize' in $$props) $$invalidate(5, projectSize = $$props.projectSize);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [brandName, workflows, tech, year, swatch, projectSize, projectData];
    }

    class ProjectDetailHeader extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, { projectData: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectDetailHeader",
    			options,
    			id: create_fragment$u.name
    		});
    	}

    	get projectData() {
    		throw new Error("<ProjectDetailHeader>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projectData(value) {
    		throw new Error("<ProjectDetailHeader>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Templates/ProjectSingle.svelte generated by Svelte v3.44.0 */
    const file$t = "src/Components/Design/Templates/ProjectSingle.svelte";

    // (69:0) {#if data != ''}
    function create_if_block$b(ctx) {
    	let head;
    	let t0;
    	let div0;
    	let div0_intro;
    	let div0_outro;
    	let t1;
    	let div3;
    	let div1;
    	let projectdetailheader;
    	let t2;
    	let div2;
    	let browserframe;
    	let t3;
    	let div4;
    	let t4;
    	let div7;
    	let div6;
    	let h2;
    	let t6;
    	let div5;
    	let link0;
    	let t7;
    	let link1;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] },
    			$$inline: true
    		});

    	projectdetailheader = new ProjectDetailHeader({
    			props: { projectData: /*pageData*/ ctx[1] },
    			$$inline: true
    		});

    	browserframe = new BrowserFrame({
    			props: {
    				image: /*featuredImage*/ ctx[3],
    				siteURL: /*url*/ ctx[2]
    			},
    			$$inline: true
    		});

    	link0 = new Link({
    			props: {
    				to: `projects/`,
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link({
    			props: {
    				to: `contact/`,
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			t1 = space();
    			div3 = element("div");
    			div1 = element("div");
    			create_component(projectdetailheader.$$.fragment);
    			t2 = space();
    			div2 = element("div");
    			create_component(browserframe.$$.fragment);
    			t3 = space();
    			div4 = element("div");
    			t4 = space();
    			div7 = element("div");
    			div6 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Want to see more?";
    			t6 = space();
    			div5 = element("div");
    			create_component(link0.$$.fragment);
    			t7 = space();
    			create_component(link1.$$.fragment);
    			attr_dev(div0, "class", "fixed bg-black md:hidden w-1/2 h-screen -mr-8 top-0 right-0");
    			set_style(div0, "z-index", "-1");
    			add_location(div0, file$t, 70, 0, 1895);
    			attr_dev(div1, "class", "md:w-full md:mt-16 w-1/2 pr-12 rellax");
    			attr_dev(div1, "data-rellax-speed", "7");
    			attr_dev(div1, "data-rellax-xs-speed", "1");
    			attr_dev(div1, "data-rellax-mobile-speed", "1");
    			add_location(div1, file$t, 72, 4, 2123);
    			attr_dev(div2, "class", "md:w-full w-1/2");
    			add_location(div2, file$t, 75, 4, 2322);
    			attr_dev(div3, "class", "flex md:flex-col-reverse");
    			add_location(div3, file$t, 71, 0, 2080);
    			attr_dev(div4, "class", "project-content");
    			add_location(div4, file$t, 79, 0, 2431);
    			attr_dev(h2, "class", "text-3xl w-full mb-5");
    			add_location(h2, file$t, 84, 8, 2706);
    			attr_dev(div5, "class", "flex md:justify-center md:w-full");
    			add_location(div5, file$t, 85, 8, 2770);
    			attr_dev(div6, "class", "flex flex-wrap w-3/4 md:w-full md:text-center text-left bg-white shadow-2xl mt-12 mb-16 -ml-24 p-8 md:p-5 rounded-l-lg");
    			add_location(div6, file$t, 83, 4, 2565);
    			attr_dev(div7, "class", "flex justify-end");
    			attr_dev(div7, "data-aos", "fade-left");
    			attr_dev(div7, "data-aos-delay", "600");
    			add_location(div7, file$t, 82, 0, 2488);
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			mount_component(projectdetailheader, div1, null);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			mount_component(browserframe, div2, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div4, anchor);
    			div4.innerHTML = /*content*/ ctx[4];
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, h2);
    			append_dev(div6, t6);
    			append_dev(div6, div5);
    			mount_component(link0, div5, null);
    			append_dev(div5, t7);
    			mount_component(link1, div5, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const projectdetailheader_changes = {};
    			if (dirty & /*pageData*/ 2) projectdetailheader_changes.projectData = /*pageData*/ ctx[1];
    			projectdetailheader.$set(projectdetailheader_changes);
    			const browserframe_changes = {};
    			if (dirty & /*featuredImage*/ 8) browserframe_changes.image = /*featuredImage*/ ctx[3];
    			if (dirty & /*url*/ 4) browserframe_changes.siteURL = /*url*/ ctx[2];
    			browserframe.$set(browserframe_changes);
    			if (!current || dirty & /*content*/ 16) div4.innerHTML = /*content*/ ctx[4];			const link0_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, fly, { x: 500, delay: 1200, duration: 1250 });
    				div0_intro.start();
    			});

    			transition_in(projectdetailheader.$$.fragment, local);
    			transition_in(browserframe.$$.fragment, local);
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { x: 500, duration: 1000 });
    			transition_out(projectdetailheader.$$.fragment, local);
    			transition_out(browserframe.$$.fragment, local);
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div0);
    			if (detaching && div0_outro) div0_outro.end();
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			destroy_component(projectdetailheader);
    			destroy_component(browserframe);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div7);
    			destroy_component(link0);
    			destroy_component(link1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(69:0) {#if data != ''}",
    		ctx
    	});

    	return block;
    }

    // (87:36) <Button priority='primary' className="mr-5" >
    function create_default_slot_3$1(ctx) {
    	let t;
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			t = text("See all ");
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			html_tag.m(/*arrow*/ ctx[5], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(87:36) <Button priority='primary' className=\\\"mr-5\\\" >",
    		ctx
    	});

    	return block;
    }

    // (87:12) <Link to={`projects/`} >
    function create_default_slot_2$1(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "primary",
    				className: "mr-5",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(87:12) <Link to={`projects/`} >",
    		ctx
    	});

    	return block;
    }

    // (88:35) <Button priority='tertiary'>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Contact me");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(88:35) <Button priority='tertiary'>",
    		ctx
    	});

    	return block;
    }

    // (88:12) <Link to={`contact/`} >
    function create_default_slot$6(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "tertiary",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(button.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4096) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(88:12) <Link to={`contact/`} >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*data*/ ctx[0] != '' && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*data*/ ctx[0] != '') {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*data*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$b(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ProjectSingle', slots, []);
    	let { slug } = $$props;
    	let { template = 'project-single' } = $$props;
    	let storedState;
    	let data = [];
    	let pageData = [];
    	let title = '';
    	let url = '';
    	let featuredImage = {};
    	let content = '';
    	let arrow = '<i class="ml-5 fas fa-chevron-circle-right">';
    	const apiURL = 'http://wp:8080/wp-json';

    	const getData = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/project/?slug=${slug}&_embed`);
    		const json = await res.json();
    		$$invalidate(0, data = json);

    		if (data[0] !== undefined) {
    			$$invalidate(1, pageData = data[0]);
    			$$invalidate(2, url = pageData.acf.site_url);
    			$$invalidate(3, featuredImage = pageData._embedded['wp:featuredmedia'][0].media_details.sizes.large);
    			$$invalidate(4, content = pageData.content.rendered);
    		}

    		storedState = slug;
    	};

    	onMount(async () => {
    		$$invalidate(6, template = 'project-single');
    		getData();

    		setTimeout(
    			function () {
    				var rellax$1 = new rellax('.rellax', { breakpoints: [639, 767, 1201] });
    			},
    			500
    		);
    	});

    	afterUpdate(async () => {
    		if (slug != storedState) {
    			getData();
    		}
    	});

    	onDestroy(() => {
    		$$invalidate(6, template = '');
    	});

    	const writable_props = ['slug', 'template'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ProjectSingle> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('slug' in $$props) $$invalidate(7, slug = $$props.slug);
    		if ('template' in $$props) $$invalidate(6, template = $$props.template);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		onDestroy,
    		Link,
    		Rellax: rellax,
    		fly,
    		Head,
    		PageTitle,
    		ProjectFeature,
    		BrowserFrame,
    		ProjectDetailHeader,
    		Button,
    		slug,
    		template,
    		storedState,
    		data,
    		pageData,
    		title,
    		url,
    		featuredImage,
    		content,
    		arrow,
    		apiURL,
    		getData
    	});

    	$$self.$inject_state = $$props => {
    		if ('slug' in $$props) $$invalidate(7, slug = $$props.slug);
    		if ('template' in $$props) $$invalidate(6, template = $$props.template);
    		if ('storedState' in $$props) storedState = $$props.storedState;
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('pageData' in $$props) $$invalidate(1, pageData = $$props.pageData);
    		if ('title' in $$props) title = $$props.title;
    		if ('url' in $$props) $$invalidate(2, url = $$props.url);
    		if ('featuredImage' in $$props) $$invalidate(3, featuredImage = $$props.featuredImage);
    		if ('content' in $$props) $$invalidate(4, content = $$props.content);
    		if ('arrow' in $$props) $$invalidate(5, arrow = $$props.arrow);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data, pageData, url, featuredImage, content, arrow, template, slug];
    }

    class ProjectSingle extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, { slug: 7, template: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectSingle",
    			options,
    			id: create_fragment$v.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slug*/ ctx[7] === undefined && !('slug' in props)) {
    			console.warn("<ProjectSingle> was created without expected prop 'slug'");
    		}
    	}

    	get slug() {
    		throw new Error("<ProjectSingle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<ProjectSingle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get template() {
    		throw new Error("<ProjectSingle>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set template(value) {
    		throw new Error("<ProjectSingle>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Templates/NotFound.svelte generated by Svelte v3.44.0 */

    const { console: console_1 } = globals;
    const file$u = "src/Components/Design/Templates/NotFound.svelte";

    function create_fragment$w(ctx) {
    	let head;
    	let t0;
    	let section;
    	let pagetitle;
    	let t1;
    	let html_tag;
    	let section_intro;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[0] },
    			$$inline: true
    		});

    	pagetitle = new PageTitle({
    			props: { title: /*title*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			html_tag = new HtmlTag();
    			html_tag.a = null;
    			add_location(section, file$u, 31, 0, 811);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(pagetitle, section, null);
    			append_dev(section, t1);
    			html_tag.m(/*content*/ ctx[2], section);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 1) head_changes.pageTagData = /*pageData*/ ctx[0];
    			head.$set(head_changes);
    			const pagetitle_changes = {};
    			if (dirty & /*title*/ 2) pagetitle_changes.title = /*title*/ ctx[1];
    			pagetitle.$set(pagetitle_changes);
    			if (!current || dirty & /*content*/ 4) html_tag.p(/*content*/ ctx[2]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			if (!section_intro) {
    				add_render_callback(() => {
    					section_intro = create_in_transition(section, fade, {});
    					section_intro.start();
    				});
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(pagetitle);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NotFound', slots, []);
    	let data = [];
    	let metaFields = [];
    	let pageData = {};
    	let title = "";
    	let content = "";
    	const apiURL = 'http://wp:8080/wp-json';

    	onMount(async () => {
    		const res = await fetch(`${apiURL}/wp/v2/pages?slug=404-not-found`);
    		const json = await res.json();
    		data = json;
    		metaFields = data.yoast_meta;

    		if (data[0] !== "") {
    			$$invalidate(0, pageData = data[0]);
    			$$invalidate(1, title = data[0].title.rendered);
    			$$invalidate(2, content = data[0].content.rendered);
    		}

    		console.log(data);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<NotFound> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		PageTitle,
    		fade,
    		Head,
    		onMount,
    		data,
    		metaFields,
    		pageData,
    		title,
    		content,
    		apiURL
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) data = $$props.data;
    		if ('metaFields' in $$props) metaFields = $$props.metaFields;
    		if ('pageData' in $$props) $$invalidate(0, pageData = $$props.pageData);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('content' in $$props) $$invalidate(2, content = $$props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pageData, title, content];
    }

    class NotFound extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NotFound",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* src/Components/Functional/FormDefault.svelte generated by Svelte v3.44.0 */

    const { console: console_1$1 } = globals;

    function create_fragment$x(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FormDefault', slots, []);
    	const apiURL = 'http://wp:8080/wp-json';
    	let formData = {};

    	const postData = async (fID, output, send) => {
    		const inputs = document.querySelectorAll(".wpcf7-form-control:not(.wpcf7-submit)");

    		inputs.forEach(input => {
    			formData[input.name] = input.value;
    		});

    		const resp = await fetch(`${apiURL}/contact-form-7/v1/contact-forms/${fID}/feedback`, {
    			method: "POST",
    			headers: {
    				"Content-Type": "application/x-www-form-urlencoded"
    			},
    			body: queryString.stringify(formData)
    		}).then(resp => resp.json()).then(resp => {
    			output[0].classList.remove("wpcf7-display-none");

    			if (resp.status == "validation_failed") {
    				output[0].classList.add("error-message");
    			} else {
    				output[0].classList.remove("error-message");
    				output[0].classList.add("success-message");
    				send[0].classList.add("sent");
    				send[0].innerHTML = "Sent";
    				send[0].disabled = true;
    			}

    			output[0].innerHTML = "<span>" + resp.message + "</span>";
    		}).catch(error => {
    			console.log("Error:", error);
    		});
    	};

    	const formDefault = async () => {
    		const formContainers = await document.querySelectorAll(".wpcf7");

    		// bail if there's no form found
    		if (formContainers.length === 0) {
    			return;
    		}

    		formContainers.forEach(form => {
    			let formIDString = form.id.split("-")[1], formID = formIDString.slice(1);
    			let send = form.querySelectorAll(".wpcf7-submit");
    			let messageBox = form.querySelectorAll(".wpcf7-response-output");

    			if (send != undefined) {
    				send[0].classList.remove("loading");

    				send[0].addEventListener("click", function (event) {
    					event.preventDefault();
    					postData(formID, messageBox, send);
    				});
    			}
    		});
    	};

    	afterUpdate(async () => {
    		setTimeout(
    			function () {
    				formDefault();
    			},
    			2000
    		);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<FormDefault> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		queryString,
    		apiURL,
    		formData,
    		postData,
    		formDefault
    	});

    	$$self.$inject_state = $$props => {
    		if ('formData' in $$props) formData = $$props.formData;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [];
    }

    class FormDefault extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FormDefault",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    /* src/Components/Design/Templates/Default.svelte generated by Svelte v3.44.0 */
    const file$v = "src/Components/Design/Templates/Default.svelte";

    // (64:0) {:else}
    function create_else_block$3(ctx) {
    	let notfound;
    	let current;
    	notfound = new NotFound({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(notfound.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(notfound, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(notfound.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(notfound.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(notfound, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(64:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (54:0) {#if data != ''}
    function create_if_block$c(ctx) {
    	let head;
    	let t0;
    	let section;
    	let pagetitle;
    	let t1;
    	let div1;
    	let div0;
    	let div0_intro;
    	let div0_outro;
    	let div1_intro;
    	let div1_outro;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] },
    			$$inline: true
    		});

    	pagetitle = new PageTitle({
    			props: {
    				className: "my-5",
    				title: /*title*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			add_location(div0, file$v, 58, 8, 1557);
    			attr_dev(div1, "class", "overflow-hidden");
    			add_location(div1, file$v, 57, 4, 1428);
    			add_location(section, file$v, 55, 0, 1365);
    		},
    		m: function mount(target, anchor) {
    			mount_component(head, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(pagetitle, section, null);
    			append_dev(section, t1);
    			append_dev(section, div1);
    			append_dev(div1, div0);
    			div0.innerHTML = /*content*/ ctx[3];
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const pagetitle_changes = {};
    			if (dirty & /*title*/ 4) pagetitle_changes.title = /*title*/ ctx[2];
    			pagetitle.$set(pagetitle_changes);
    			if (!current || dirty & /*content*/ 8) div0.innerHTML = /*content*/ ctx[3];		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);

    				div0_intro = create_in_transition(div0, fly, {
    					y: -1256,
    					duration: 1500,
    					delay: 50,
    					easing: expoInOut
    				});

    				div0_intro.start();
    			});

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);

    				div1_intro = create_in_transition(div1, fly, {
    					y: 1176,
    					duration: 1500,
    					delay: 50,
    					easing: expoInOut
    				});

    				div1_intro.start();
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { y: -1256 });
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: 1176 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(section);
    			destroy_component(pagetitle);
    			if (detaching && div0_outro) div0_outro.end();
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$c.name,
    		type: "if",
    		source: "(54:0) {#if data != ''}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$y(ctx) {
    	let formdefault;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	formdefault = new FormDefault({ $$inline: true });
    	const if_block_creators = [create_if_block$c, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*data*/ ctx[0] != '') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			create_component(formdefault.$$.fragment);
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(formdefault, target, anchor);
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(formdefault.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(formdefault.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(formdefault, detaching);
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Default', slots, []);
    	let data = [];
    	let pageData = [];
    	let title = '';
    	let content = '';
    	let metaFields = [];
    	let isLoaded = false;
    	let storedState = '';
    	let successMessage = '';
    	let error = '';
    	let loading = false;
    	let { slug } = $$props;
    	const apiURL = 'http://wp:8080/wp-json';

    	const getData = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/pages/?slug=${slug}`);
    		const json = await res.json();
    		$$invalidate(0, data = json);

    		if (data[0] !== undefined) {
    			$$invalidate(1, pageData = data[0]);
    			$$invalidate(2, title = pageData.title.rendered);
    			$$invalidate(3, content = pageData.content.rendered);
    		}

    		storedState = slug;
    	};

    	onMount(async () => {
    		getData();
    	});

    	afterUpdate(async () => {
    		if (slug != storedState) {
    			getData();
    		}
    	});

    	const writable_props = ['slug'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Default> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('slug' in $$props) $$invalidate(4, slug = $$props.slug);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		afterUpdate,
    		fly,
    		expoInOut,
    		queryString,
    		PageTitle,
    		Head,
    		NotFound,
    		FormDefault,
    		data,
    		pageData,
    		title,
    		content,
    		metaFields,
    		isLoaded,
    		storedState,
    		successMessage,
    		error,
    		loading,
    		slug,
    		apiURL,
    		getData
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(0, data = $$props.data);
    		if ('pageData' in $$props) $$invalidate(1, pageData = $$props.pageData);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('content' in $$props) $$invalidate(3, content = $$props.content);
    		if ('metaFields' in $$props) metaFields = $$props.metaFields;
    		if ('isLoaded' in $$props) isLoaded = $$props.isLoaded;
    		if ('storedState' in $$props) storedState = $$props.storedState;
    		if ('successMessage' in $$props) successMessage = $$props.successMessage;
    		if ('error' in $$props) error = $$props.error;
    		if ('loading' in $$props) loading = $$props.loading;
    		if ('slug' in $$props) $$invalidate(4, slug = $$props.slug);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [data, pageData, title, content, slug];
    }

    class Default extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { slug: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Default",
    			options,
    			id: create_fragment$y.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*slug*/ ctx[4] === undefined && !('slug' in props)) {
    			console.warn("<Default> was created without expected prop 'slug'");
    		}
    	}

    	get slug() {
    		throw new Error("<Default>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set slug(value) {
    		throw new Error("<Default>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Design/Page.svelte generated by Svelte v3.44.0 */
    const file$w = "src/Components/Design/Page.svelte";

    // (26:12) <Route path="projects/:slug" key="add-client" exact let:params>
    function create_default_slot_4(ctx) {
    	let projectsingle;
    	let updating_template;
    	let current;

    	function projectsingle_template_binding(value) {
    		/*projectsingle_template_binding*/ ctx[2](value);
    	}

    	let projectsingle_props = { slug: /*params*/ ctx[3].slug };

    	if (/*template*/ ctx[1] !== void 0) {
    		projectsingle_props.template = /*template*/ ctx[1];
    	}

    	projectsingle = new ProjectSingle({
    			props: projectsingle_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(projectsingle, 'template', projectsingle_template_binding));

    	const block = {
    		c: function create() {
    			create_component(projectsingle.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projectsingle, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const projectsingle_changes = {};
    			if (dirty & /*params*/ 8) projectsingle_changes.slug = /*params*/ ctx[3].slug;

    			if (!updating_template && dirty & /*template*/ 2) {
    				updating_template = true;
    				projectsingle_changes.template = /*template*/ ctx[1];
    				add_flush_callback(() => updating_template = false);
    			}

    			projectsingle.$set(projectsingle_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projectsingle.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projectsingle.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projectsingle, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(26:12) <Route path=\\\"projects/:slug\\\" key=\\\"add-client\\\" exact let:params>",
    		ctx
    	});

    	return block;
    }

    // (28:12) <Route path="about">
    function create_default_slot_3$2(ctx) {
    	let about;
    	let current;
    	about = new About({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(about.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(about, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(about.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(about.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(about, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(28:12) <Route path=\\\"about\\\">",
    		ctx
    	});

    	return block;
    }

    // (29:12) <Route path="/" exact >
    function create_default_slot_2$2(ctx) {
    	let home;
    	let current;
    	home = new Home({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(29:12) <Route path=\\\"/\\\" exact >",
    		ctx
    	});

    	return block;
    }

    // (30:12) <Route path="/:slug" key="add-client" exact let:params>
    function create_default_slot_1$4(ctx) {
    	let default_1;
    	let current;

    	default_1 = new Default({
    			props: { slug: /*params*/ ctx[3].slug },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(default_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(default_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const default_1_changes = {};
    			if (dirty & /*params*/ 8) default_1_changes.slug = /*params*/ ctx[3].slug;
    			default_1.$set(default_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(default_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(30:12) <Route path=\\\"/:slug\\\" key=\\\"add-client\\\" exact let:params>",
    		ctx
    	});

    	return block;
    }

    // (25:4) <Router url="{url}">
    function create_default_slot$7(ctx) {
    	let route0;
    	let t0;
    	let route1;
    	let t1;
    	let route2;
    	let t2;
    	let route3;
    	let t3;
    	let route4;
    	let t4;
    	let route5;
    	let t5;
    	let route6;
    	let current;

    	route0 = new Route({
    			props: {
    				path: "projects/:slug",
    				key: "add-client",
    				exact: true,
    				$$slots: {
    					default: [
    						create_default_slot_4,
    						({ params }) => ({ 3: params }),
    						({ params }) => params ? 8 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: { path: "projects", component: Projects },
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "about",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "/",
    				exact: true,
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route4 = new Route({
    			props: {
    				path: "/:slug",
    				key: "add-client",
    				exact: true,
    				$$slots: {
    					default: [
    						create_default_slot_1$4,
    						({ params }) => ({ 3: params }),
    						({ params }) => params ? 8 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route5 = new Route({
    			props: { path: "/404", component: NotFound },
    			$$inline: true
    		});

    	route6 = new Route({
    			props: { component: NotFound },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route0.$$.fragment);
    			t0 = space();
    			create_component(route1.$$.fragment);
    			t1 = space();
    			create_component(route2.$$.fragment);
    			t2 = space();
    			create_component(route3.$$.fragment);
    			t3 = space();
    			create_component(route4.$$.fragment);
    			t4 = space();
    			create_component(route5.$$.fragment);
    			t5 = space();
    			create_component(route6.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(route6, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope, params, template*/ 26) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    			const route4_changes = {};

    			if (dirty & /*$$scope, params*/ 24) {
    				route4_changes.$$scope = { dirty, ctx };
    			}

    			route4.$set(route4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(route4.$$.fragment, local);
    			transition_in(route5.$$.fragment, local);
    			transition_in(route6.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			transition_out(route6.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(route5, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(route6, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(25:4) <Router url=\\\"{url}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let header;
    	let t0;
    	let sidebar;
    	let t1;
    	let main;
    	let router;
    	let main_class_value;
    	let t2;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	sidebar = new Sidebar({ $$inline: true });

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	footer = new Footer({
    			props: { template: /*template*/ ctx[1] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(sidebar.$$.fragment);
    			t1 = space();
    			main = element("main");
    			create_component(router.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", main_class_value = "" + (null_to_empty(`site-main container mx-auto md:mt-24 mt-48 pl-3 pr-16`) + " svelte-ks7no8"));
    			add_location(main, file$w, 23, 0, 883);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(header, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(sidebar, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			insert_dev(target, t2, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope, template*/ 18) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    			const footer_changes = {};
    			if (dirty & /*template*/ 2) footer_changes.template = /*template*/ ctx[1];
    			footer.$set(footer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(sidebar, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    			if (detaching) detach_dev(t2);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, []);
    	let { url = "" } = $$props;
    	let template;
    	const writable_props = ['url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	function projectsingle_template_binding(value) {
    		template = value;
    		$$invalidate(1, template);
    	}

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Route,
    		fly,
    		Header,
    		Footer,
    		Sidebar,
    		Home,
    		About,
    		Projects,
    		ProjectSingle,
    		Default,
    		NotFound,
    		FormDefault,
    		url,
    		template
    	});

    	$$self.$inject_state = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    		if ('template' in $$props) $$invalidate(1, template = $$props.template);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, template, projectsingle_template_binding];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get url() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Components/Functional/SiteLoadCookie.svelte generated by Svelte v3.44.0 */

    function setCookie(cname, cvalue, exdays) {
    	var d = new Date();
    	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    	var expires = "expires=" + d.toUTCString();
    	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
    	var name = cname + "=";
    	var decodedCookie = decodeURIComponent(document.cookie);
    	var ca = decodedCookie.split(";");

    	for (var i = 0; i < ca.length; i++) {
    		var c = ca[i];

    		while (c.charAt(0) == " ") {
    			c = c.substring(1);
    		}

    		if (c.indexOf(name) == 0) {
    			return c.substring(name.length, c.length);
    		}
    	}

    	return "";
    }

    function checkCookie() {
    	var visited = getCookie("siteload");
    	var durVal;

    	if (visited != "") {
    		// alert("Welcome again " + visited);
    		durVal = 2000;
    	} else {
    		visited = "visited";

    		if (visited != "" && visited != null) {
    			setCookie("siteload", visited, 1);
    		}

    		durVal = 3500;
    	}

    	return durVal;
    }

    const durVal = checkCookie();

    /* src/App.svelte generated by Svelte v3.44.0 */
    const file$x = "src/App.svelte";

    function create_fragment$A(ctx) {
    	let div;
    	let page;
    	let div_transition;
    	let current;
    	page = new Page({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(page.$$.fragment);
    			attr_dev(div, "class", "svelte-root flex flex-row");
    			add_location(div, file$x, 12, 0, 217);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(page, div, null);
    			current = true;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: durVal }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page.$$.fragment, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: durVal }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(page);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fade, Page, durVal });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$A.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        intro: true
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
