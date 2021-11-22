
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() {}

    const identity = x => x;

    function assign(tar, src) {
      // @ts-ignore
      for (const k in src) tar[k] = src[k];

      return tar;
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
      return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
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
      return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
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

      for (const k in props) if (k[0] !== '$') result[k] = props[k];

      return result;
    }

    function compute_rest_props(props, keys) {
      const rest = {};
      keys = new Set(keys);

      for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];

      return rest;
    }

    function null_to_empty(value) {
      return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client ? () => window.performance.now() : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop; // used internally for testing

    const tasks = new Set();

    function run_tasks(now) {
      tasks.forEach(task => {
        if (!task.c(now)) {
          tasks.delete(task);
          task.f();
        }
      });
      if (tasks.size !== 0) raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */


    function loop(callback) {
      let task;
      if (tasks.size === 0) raf(run_tasks);
      return {
        promise: new Promise(fulfill => {
          tasks.add(task = {
            c: callback,
            f: fulfill
          });
        }),

        abort() {
          tasks.delete(task);
        }

      };
    } // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM

    function append(target, node) {
      target.appendChild(node);
    }

    function get_root_for_style(node) {
      if (!node) return document;
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
        if (iterations[i]) iterations[i].d(detaching);
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
      if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
    }

    function set_attributes(node, attributes) {
      // @ts-ignore
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

      for (const key in attributes) {
        if (attributes[key] == null) {
          node.removeAttribute(key);
        } else if (key === 'style') {
          node.style.cssText = attributes[key];
        } else if (key === '__value') {
          node.value = node[key] = attributes[key];
        } else if (descriptors[key] && descriptors[key].set) {
          node[key] = attributes[key];
        } else {
          attr(node, key, attributes[key]);
        }
      }
    }

    function get_binding_group_value(group, __value, checked) {
      const value = new Set();

      for (let i = 0; i < group.length; i += 1) {
        if (group[i].checked) value.add(group[i].__value);
      }

      if (!checked) {
        value.delete(__value);
      }

      return Array.from(value);
    }

    function children(element) {
      return Array.from(element.childNodes);
    }

    function set_data(text, data) {
      data = '' + data;
      if (text.wholeText !== data) text.data = data;
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
    let active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

    function hash(str) {
      let hash = 5381;
      let i = str.length;

      while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);

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
      const next = previous.filter(name ? anim => anim.indexOf(name) < 0 // remove specific animation
      : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
      );
      const deleted = previous.length - next.length;

      if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active) clear_rules();
      }
    }

    function clear_rules() {
      raf(() => {
        if (active) return;
        active_docs.forEach(doc => {
          const stylesheet = doc.__svelte_stylesheet;
          let i = stylesheet.cssRules.length;

          while (i--) stylesheet.deleteRule(i);

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
      if (!current_component) throw new Error('Function called outside component initialization');
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
      if (flushing) return;
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

        while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
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
        if (outroing.has(block)) return;
        outroing.add(block);
        outros.c.push(() => {
          outroing.delete(block);

          if (callback) {
            if (detach) block.d(1);
            callback();
          }
        });
        block.o(local);
      }
    }

    const null_transition = {
      duration: 0
    };

    function create_in_transition(node, fn, params) {
      let config = fn(node, params);
      let running = false;
      let animation_name;
      let task;
      let uid = 0;

      function cleanup() {
        if (animation_name) delete_rule(node, animation_name);
      }

      function go() {
        const {
          delay = 0,
          duration = 300,
          easing = identity,
          tick = noop,
          css
        } = config || null_transition;
        if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task) task.abort();
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
          if (started) return;
          started = true;
          delete_rule(node);

          if (is_function(config)) {
            config = config();
            wait().then(go);
          } else {
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
        const {
          delay = 0,
          duration = 300,
          easing = identity,
          tick = noop,
          css
        } = config || null_transition;
        if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
          if (running) {
            if (now >= end_time) {
              tick(0, 1);
              dispatch(node, false, 'end');

              if (! --group.r) {
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
      } else {
        go();
      }

      return {
        end(reset) {
          if (reset && config.tick) {
            config.tick(1, 0);
          }

          if (running) {
            if (animation_name) delete_rule(node, animation_name);
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
        if (animation_name) delete_rule(node, animation_name);
      }

      function init(program, duration) {
        const d = program.b - t;
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
        const {
          delay = 0,
          duration = 300,
          easing = identity,
          tick = noop,
          css
        } = config || null_transition;
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
        } else {
          // if this is an intro, and there's a delay, we need to do
          // an initial tick and/or apply CSS animation immediately
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, b, duration, delay, easing, css);
          }

          if (b) tick(0, 1);
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
                  } else {
                    // outro — needs to be coordinated
                    if (! --running_program.group.r) run_all(running_program.group.c);
                  }
                }

                running_program = null;
              } else if (now >= running_program.start) {
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
          } else {
            go(b);
          }
        },

        end() {
          clear_animation();
          running_program = pending_program = null;
        }

      };
    }

    const globals = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : global;

    function get_spread_update(levels, updates) {
      const update = {};
      const to_null_out = {};
      const accounted_for = {
        $$scope: 1
      };
      let i = levels.length;

      while (i--) {
        const o = levels[i];
        const n = updates[i];

        if (n) {
          for (const key in o) {
            if (!(key in n)) to_null_out[key] = 1;
          }

          for (const key in n) {
            if (!accounted_for[key]) {
              update[key] = n[key];
              accounted_for[key] = 1;
            }
          }

          levels[i] = n;
        } else {
          for (const key in o) {
            accounted_for[key] = 1;
          }
        }
      }

      for (const key in to_null_out) {
        if (!(key in update)) update[key] = undefined;
      }

      return update;
    }

    function get_spread_object(spread_props) {
      return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    } // source: https://html.spec.whatwg.org/multipage/indices.html

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
      const {
        fragment,
        on_mount,
        on_destroy,
        after_update
      } = component.$$;
      fragment && fragment.m(target, anchor);

      if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);

          if (on_destroy) {
            on_destroy.push(...new_on_destroy);
          } else {
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
        $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
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

      component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
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
      $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
        const value = rest.length ? rest[0] : ret;

        if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
          if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
          if (ready) make_dirty(component, i);
        }

        return ret;
      }) : [];
      $$.update();
      ready = true;
      run_all($$.before_update); // `false` as a special case of no DOM component

      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

      if (options.target) {
        if (options.hydrate) {
          const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          $$.fragment && $$.fragment.l(nodes);
          nodes.forEach(detach);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          $$.fragment && $$.fragment.c();
        }

        if (options.intro) transition_in(component.$$.fragment);
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
        const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return () => {
          const index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
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

    function backOut(t) {
      const s = 1.70158;
      return --t * t * ((s + 1) * t + s) + 1;
    }

    function cubicOut(t) {
      const f = t - 1.0;
      return f * f * f + 1.0;
    }

    function elasticOut(t) {
      return Math.sin(-13.0 * (t + 1.0) * Math.PI / 2) * Math.pow(2.0, -10.0 * t) + 1.0;
    }

    function expoInOut(t) {
      return t === 0.0 || t === 1.0 ? t : t < 0.5 ? +0.5 * Math.pow(2.0, 20.0 * t - 10.0) : -0.5 * Math.pow(2.0, 10.0 - t * 20.0) + 1.0;
    }

    function expoOut(t) {
      return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
    }

    function sineIn(t) {
      const v = Math.cos(t * Math.PI * 0.5);
      if (Math.abs(v) < 1e-14) return 1;else return 1 - v;
    }

    function fade(node, {
      delay = 0,
      duration = 400,
      easing = identity
    } = {}) {
      const o = +getComputedStyle(node).opacity;
      return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
      };
    }

    function fly(node, {
      delay = 0,
      duration = 400,
      easing = cubicOut,
      x = 0,
      y = 0,
      opacity = 0
    } = {}) {
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
			opacity: ${target_opacity - od * u}`
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

          if (stop) {
            // store is ready
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

      return {
        set,
        update,
        subscribe
      };
    }

    function derived(stores, fn, initial_value) {
      const single = !Array.isArray(stores);
      const stores_array = single ? [stores] : stores;
      const auto = fn.length < 2;
      return readable(initial_value, set => {
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
          } else {
            cleanup = is_function(result) ? result : noop;
          }
        };

        const unsubscribers = stores_array.map((store, i) => subscribe(store, value => {
          values[i] = value;
          pending &= ~(1 << i);

          if (inited) {
            sync();
          }
        }, () => {
          pending |= 1 << i;
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
      return { ...source.location,
        state: source.history.state,
        key: source.history.state && source.history.state.key || "initial"
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
            listener({
              location,
              action: "POP"
            });
          };

          source.addEventListener("popstate", popstateListener);
          return () => {
            source.removeEventListener("popstate", popstateListener);
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, {
          state,
          replace = false
        } = {}) {
          state = { ...state,
            key: Date.now() + ""
          }; // try...catch iOS Safari limits to 100 pushState calls

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
          listeners.forEach(listener => listener({
            location,
            action: "PUSH"
          }));
        }

      };
    } // Stores history entries in memory for testing or other platforms like Native


    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{
        pathname: initialPathname,
        search: ""
      }];
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
            stack.push({
              pathname,
              search
            });
            states.push(state);
          },

          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = {
              pathname,
              search
            };
            states[index] = state;
          }

        }
      };
    } // Global history uses window.history as the source if available,
    // otherwise a memory history


    const canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const {
      navigate
    } = globalHistory;

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
      return uri // Strip starting/ending `/`
      .replace(/(^\/+|\/+$)/g, "").split("/");
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
      const score = route.default ? 0 : segmentize(route.path).reduce((score, segment) => {
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
      return {
        route,
        score,
        index
      };
    }
    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */


    function rankRoutes(routes) {
      return routes.map(rankRoute) // If two routes have the exact same score, we go by index instead
      .sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index);
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
            params[splatName] = uriSegments.slice(index).map(decodeURIComponent).join("/");
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
      const baseSegments = segmentize(basePathname); // ?a=b, /users?b=c => /users?a=b

      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      } // profile, /users/789 => /users/789/profile


      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");
        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      } // ./       , /users/123 => /users/123
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
      return `${stripSlashes(path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`)}/`;
    }
    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */


    function shouldNavigate(event) {
      return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.44.2 */

    function create_fragment(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

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

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

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

    class Router extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, { basepath: 3, url: 4 });
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.44.2 */

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

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	return {
    		c() {
    			if (default_slot) default_slot.c();
    		},
    		m(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
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
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
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

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
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
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
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

    class Route extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { path: 8, component: 0 });
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.44.2 */

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

    	return {
    		c() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    		},
    		m(target, anchor) {
    			insert(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen(a, "click", /*onClick*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
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

    class Link extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});
    	}
    }

    /* src/Components/Design/Atoms/Logo.svelte generated by Svelte v3.44.2 */

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

    	return {
    		c() {
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
    			attr(rect0, "x", "0");
    			attr(rect0, "y", "0");
    			attr(rect0, "width", "100%");
    			attr(rect0, "height", "100%");
    			attr(rect0, "fill", "white");
    			attr(polyline0, "points", "1050, 0 565, 505 1050, 500");
    			attr(polyline0, "fill", "black");
    			attr(path, "d", "M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95\n                Q10,65,10,35 Z");
    			attr(path, "fill", "black");
    			attr(mask, "id", "gMask");
    			attr(stop0, "offset", "0%");
    			set_style(stop0, "stop-color", "rgb(0,0,0)");
    			set_style(stop0, "stop-opacity", "0.125");
    			attr(stop1, "offset", "100%");
    			set_style(stop1, "stop-color", "rgb(0,0,0)");
    			set_style(stop1, "stop-opacity", "1");
    			attr(linearGradient0, "id", "ringgrad");
    			attr(linearGradient0, "x1", "0%");
    			attr(linearGradient0, "y1", "0%");
    			attr(linearGradient0, "x2", "100%");
    			attr(linearGradient0, "y2", "0%");
    			attr(stop2, "offset", "0%");
    			set_style(stop2, "stop-color", "rgb(10,10,10)");
    			set_style(stop2, "stop-opacity", "1");
    			attr(stop3, "offset", "15%");
    			set_style(stop3, "stop-color", "rgb(111,111,111)");
    			set_style(stop3, "stop-opacity", "1");
    			attr(stop4, "offset", "17%");
    			set_style(stop4, "stop-color", "rgb(255,255,255)");
    			set_style(stop4, "stop-opacity", "1");
    			attr(stop5, "offset", "35%");
    			set_style(stop5, "stop-color", "rgb(177,177,177)");
    			set_style(stop5, "stop-opacity", "1");
    			attr(stop6, "offset", "50%");
    			set_style(stop6, "stop-color", "rgb(177,177,177)");
    			set_style(stop6, "stop-opacity", "1");
    			attr(stop7, "offset", "100%");
    			set_style(stop7, "stop-color", "rgb(177,177,177)");
    			set_style(stop7, "stop-opacity", "1");
    			attr(linearGradient1, "id", "angelgrad");
    			attr(linearGradient1, "x1", "0%");
    			attr(linearGradient1, "y1", "0%");
    			attr(linearGradient1, "x2", "100%");
    			attr(linearGradient1, "y2", "0%");
    			attr(linearGradient1, "gradientTransform", "rotate(135)");
    			attr(stop8, "offset", "0%");
    			set_style(stop8, "stop-color", "rgb(177,177,177)");
    			set_style(stop8, "stop-opacity", "1");
    			attr(stop9, "offset", "37%");
    			set_style(stop9, "stop-color", "rgb(177,177,177)");
    			set_style(stop9, "stop-opacity", "1");
    			attr(stop10, "offset", "52%");
    			set_style(stop10, "stop-color", "rgb(255,255,255)");
    			set_style(stop10, "stop-opacity", "1");
    			attr(stop11, "offset", "55%");
    			set_style(stop11, "stop-color", "rgb(177,177,177)");
    			set_style(stop11, "stop-opacity", "1");
    			attr(stop12, "offset", "100%");
    			set_style(stop12, "stop-color", "rgb(0,0,0)");
    			set_style(stop12, "stop-opacity", "1");
    			attr(linearGradient2, "id", "angelgrad2");
    			attr(linearGradient2, "x1", "0%");
    			attr(linearGradient2, "y1", "0%");
    			attr(linearGradient2, "x2", "100%");
    			attr(linearGradient2, "y2", "0%");
    			attr(linearGradient2, "gradientTransform", "rotate(45)");
    			attr(feOffset, "result", "offOut");
    			attr(feOffset, "in", "SourceAlpha");
    			attr(feOffset, "dx", "-30");
    			attr(feOffset, "dy", "0");
    			attr(feColorMatrix, "result", "matrixOut");
    			attr(feColorMatrix, "in", "offOut");
    			attr(feColorMatrix, "type", "matrix");
    			attr(feColorMatrix, "values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.45 0");
    			attr(feGaussianBlur, "result", "blurOut");
    			attr(feGaussianBlur, "in", "matrixOut");
    			attr(feGaussianBlur, "stdDeviation", "20");
    			attr(feBlend, "in", "SourceGraphic");
    			attr(feBlend, "in2", "blurOut");
    			attr(feBlend, "mode", "normal");
    			attr(filter, "id", "vertShadow");
    			attr(filter, "x", "-450%");
    			attr(filter, "y", "0");
    			attr(filter, "width", "540%");
    			attr(filter, "height", "200%");
    			attr(polyline1, "class", "top-angle svelte-ntwmk");
    			attr(polyline1, "points", "1050, 0 550, 505");
    			attr(polyline2, "class", "bottom-angle svelte-ntwmk");
    			attr(polyline2, "points", "550, 495 1050, 1000");
    			attr(circle, "class", "ring svelte-ntwmk");
    			attr(circle, "cx", "500");
    			attr(circle, "cy", "500");
    			attr(circle, "r", "300");
    			attr(circle, "mask", "url(#gMask)");
    			attr(rect1, "class", "vert svelte-ntwmk");
    			attr(rect1, "x", "48%");
    			attr(rect1, "y", "0");
    			attr(rect1, "filter", "url(#vertShadow)");
    			attr(svg, "class", "svg-logo -mt-2 w-32 h-32 md:w-20 md:h-20 svelte-ntwmk");
    			attr(svg, "viewBox", "0 0 1000 1000");
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, mask);
    			append(mask, rect0);
    			append(mask, polyline0);
    			append(mask, path);
    			append(svg, defs);
    			append(defs, linearGradient0);
    			append(linearGradient0, stop0);
    			append(linearGradient0, stop1);
    			append(defs, linearGradient1);
    			append(linearGradient1, stop2);
    			append(linearGradient1, stop3);
    			append(linearGradient1, stop4);
    			append(linearGradient1, stop5);
    			append(linearGradient1, stop6);
    			append(linearGradient1, stop7);
    			append(defs, linearGradient2);
    			append(linearGradient2, stop8);
    			append(linearGradient2, stop9);
    			append(linearGradient2, stop10);
    			append(linearGradient2, stop11);
    			append(linearGradient2, stop12);
    			append(defs, filter);
    			append(filter, feOffset);
    			append(filter, feColorMatrix);
    			append(filter, feGaussianBlur);
    			append(filter, feBlend);
    			append(svg, polyline1);
    			append(svg, polyline2);
    			append(svg, circle);
    			append(svg, rect1);
    		},
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*ready*/ ctx[0] && create_if_block$1();

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (/*ready*/ ctx[0]) {
    				if (if_block) ; else {
    					if_block = create_if_block$1();
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
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let ready = false;

    	onMount(async () => {
    		$$invalidate(0, ready = true);
    	});

    	return [ready];
    }

    class Logo extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Atoms/SVGText.svelte generated by Svelte v3.44.2 */

    function create_if_block_1$1(ctx) {
    	let linearGradient;
    	let stop0;
    	let stop0_style_value;
    	let stop1;
    	let stop1_style_value;
    	let linearGradient_id_value;
    	let linearGradient_gradientTransform_value;

    	return {
    		c() {
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			attr(stop0, "offset", "0%");
    			attr(stop0, "style", stop0_style_value = `stop-color:${/*hoverStartGrad*/ ctx[5]};stop-opacity:1`);
    			attr(stop1, "offset", "100%");
    			attr(stop1, "style", stop1_style_value = `stop-color:${/*hoverEndGrad*/ ctx[6]};stop-opacity:1`);
    			attr(linearGradient, "id", linearGradient_id_value = `textGradient-hover`);
    			attr(linearGradient, "x1", "0%");
    			attr(linearGradient, "y1", "0%");
    			attr(linearGradient, "x2", "100%");
    			attr(linearGradient, "y2", "0%");
    			attr(linearGradient, "gradientTransform", linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`);
    		},
    		m(target, anchor) {
    			insert(target, linearGradient, anchor);
    			append(linearGradient, stop0);
    			append(linearGradient, stop1);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*hoverStartGrad*/ 32 && stop0_style_value !== (stop0_style_value = `stop-color:${/*hoverStartGrad*/ ctx[5]};stop-opacity:1`)) {
    				attr(stop0, "style", stop0_style_value);
    			}

    			if (dirty & /*hoverEndGrad*/ 64 && stop1_style_value !== (stop1_style_value = `stop-color:${/*hoverEndGrad*/ ctx[6]};stop-opacity:1`)) {
    				attr(stop1, "style", stop1_style_value);
    			}

    			if (dirty & /*gRotate*/ 4 && linearGradient_gradientTransform_value !== (linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`)) {
    				attr(linearGradient, "gradientTransform", linearGradient_gradientTransform_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(linearGradient);
    		}
    	};
    }

    // (59:4) {#if hoverStartGrad && hoverEndGrad }
    function create_if_block$2(ctx) {
    	let text_1;
    	let t;
    	let text_1_fill_value;

    	return {
    		c() {
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[0]);
    			attr(text_1, "class", "hover-text svelte-ug9hhg");
    			attr(text_1, "fill", text_1_fill_value = `url(#textGradient-hover)`);
    			attr(text_1, "x", "0");
    			attr(text_1, "y", "75%");
    		},
    		m(target, anchor) {
    			insert(target, text_1, anchor);
    			append(text_1, t);
    			/*text_1_binding_1*/ ctx[11](text_1);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*text*/ 1) set_data(t, /*text*/ ctx[0]);
    		},
    		d(detaching) {
    			if (detaching) detach(text_1);
    			/*text_1_binding_1*/ ctx[11](null);
    		}
    	};
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

    	return {
    		c() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			linearGradient = svg_element("linearGradient");
    			stop0 = svg_element("stop");
    			stop1 = svg_element("stop");
    			if (if_block0) if_block0.c();
    			text_1 = svg_element("text");
    			t = text(/*text*/ ctx[0]);
    			if (if_block1) if_block1.c();
    			attr(stop0, "offset", "0%");
    			attr(stop0, "style", stop0_style_value = `stop-color:${/*startGrad*/ ctx[3]};stop-opacity:1`);
    			attr(stop1, "offset", "100%");
    			attr(stop1, "style", stop1_style_value = `stop-color:${/*endGrad*/ ctx[4]};stop-opacity:1`);
    			attr(linearGradient, "id", linearGradient_id_value = `textGradient-${/*random*/ ctx[9]}`);
    			attr(linearGradient, "x1", "0%");
    			attr(linearGradient, "y1", "0%");
    			attr(linearGradient, "x2", "100%");
    			attr(linearGradient, "y2", "0%");
    			attr(linearGradient, "gradientTransform", linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`);
    			attr(text_1, "fill", text_1_fill_value = `url(#textGradient-${/*random*/ ctx[9]})`);
    			attr(text_1, "x", "0");
    			attr(text_1, "y", "75%");
    			attr(svg, "class", "svg-text-component inline-block svelte-ug9hhg");
    			attr(svg, "viewbbox", "0 0 240 80");
    			attr(svg, "width", /*width*/ ctx[1]);
    			attr(svg, "height", /*height*/ ctx[8]);
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, defs);
    			append(defs, linearGradient);
    			append(linearGradient, stop0);
    			append(linearGradient, stop1);
    			if (if_block0) if_block0.m(defs, null);
    			append(svg, text_1);
    			append(text_1, t);
    			/*text_1_binding*/ ctx[10](text_1);
    			if (if_block1) if_block1.m(svg, null);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*startGrad*/ 8 && stop0_style_value !== (stop0_style_value = `stop-color:${/*startGrad*/ ctx[3]};stop-opacity:1`)) {
    				attr(stop0, "style", stop0_style_value);
    			}

    			if (dirty & /*endGrad*/ 16 && stop1_style_value !== (stop1_style_value = `stop-color:${/*endGrad*/ ctx[4]};stop-opacity:1`)) {
    				attr(stop1, "style", stop1_style_value);
    			}

    			if (dirty & /*gRotate*/ 4 && linearGradient_gradientTransform_value !== (linearGradient_gradientTransform_value = `rotate(${/*gRotate*/ ctx[2]})`)) {
    				attr(linearGradient, "gradientTransform", linearGradient_gradientTransform_value);
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

    			if (dirty & /*text*/ 1) set_data(t, /*text*/ ctx[0]);

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
    				attr(svg, "width", /*width*/ ctx[1]);
    			}

    			if (dirty & /*height*/ 256) {
    				attr(svg, "height", /*height*/ ctx[8]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    			if (if_block0) if_block0.d();
    			/*text_1_binding*/ ctx[10](null);
    			if (if_block1) if_block1.d();
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
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

    class SVGText extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			text: 0,
    			width: 1,
    			gRotate: 2,
    			startGrad: 3,
    			endGrad: 4,
    			hoverStartGrad: 5,
    			hoverEndGrad: 6
    		});
    	}
    }

    /* src/Components/Design/Atoms/SiteTitle.svelte generated by Svelte v3.44.2 */

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
    			}
    		});

    	svgtext1 = new SVGText({
    			props: {
    				text: /*description*/ ctx[1],
    				width: "300px",
    				startGrad: "rgb(124,74,94)",
    				endGrad: "rgb(55,170,195)"
    			}
    		});

    	return {
    		c() {
    			div = element("div");
    			h1 = element("h1");
    			create_component(svgtext0.$$.fragment);
    			t = space();
    			h2 = element("h2");
    			create_component(svgtext1.$$.fragment);
    			attr(h1, "class", "site-title bg-whiteFade text-3xl md:text-xl font-hairline uppercase svelte-1em240d");
    			attr(h2, "class", "site-description svelte-1em240d");
    			attr(div, "class", "inline-block self-center -mt-10 md:mt-0 md:self-start");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			mount_component(svgtext0, h1, null);
    			append(div, t);
    			append(div, h2);
    			mount_component(svgtext1, h2, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const svgtext0_changes = {};
    			if (dirty & /*title*/ 1) svgtext0_changes.text = /*title*/ ctx[0];
    			svgtext0.$set(svgtext0_changes);
    			const svgtext1_changes = {};
    			if (dirty & /*description*/ 2) svgtext1_changes.text = /*description*/ ctx[1];
    			svgtext1.$set(svgtext1_changes);
    		},
    		i(local) {
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
    		o(local) {
    			transition_out(svgtext0.$$.fragment, local);
    			transition_out(svgtext1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(svgtext0);
    			destroy_component(svgtext1);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { title, description } = $$props;

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	return [title, description];
    }

    class SiteTitle extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { title: 0, description: 1 });
    	}
    }

    /* src/Components/Design/Molecules/SiteTitleHeader.svelte generated by Svelte v3.44.2 */

    function create_default_slot_1(ctx) {
    	let div;
    	let logo;
    	let t;
    	let sitetitle;
    	let current;
    	logo = new Logo({});

    	sitetitle = new SiteTitle({
    			props: {
    				title: /*title*/ ctx[0],
    				description: /*description*/ ctx[1]
    			}
    		});

    	return {
    		c() {
    			div = element("div");
    			create_component(logo.$$.fragment);
    			t = space();
    			create_component(sitetitle.$$.fragment);
    			attr(div, "class", "logo-container flex flex-row md:content-start svelte-9v8ce");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(logo, div, null);
    			append(div, t);
    			mount_component(sitetitle, div, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const sitetitle_changes = {};
    			if (dirty & /*title*/ 1) sitetitle_changes.title = /*title*/ ctx[0];
    			if (dirty & /*description*/ 2) sitetitle_changes.description = /*description*/ ctx[1];
    			sitetitle.$set(sitetitle_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(sitetitle.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(sitetitle.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(logo);
    			destroy_component(sitetitle);
    		}
    	};
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
    			}
    		});

    	return {
    		c() {
    			create_component(link.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(link, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const link_changes = {};

    			if (dirty & /*$$scope, title, description*/ 7) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(link, detaching);
    		}
    	};
    }

    function create_fragment$6(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(router.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, title, description*/ 7) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(router, detaching);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { title, description } = $$props;

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('description' in $$props) $$invalidate(1, description = $$props.description);
    	};

    	return [title, description];
    }

    class SiteTitleHeader extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { title: 0, description: 1 });
    	}
    }

    /* src/Components/Design/Organisms/Header.svelte generated by Svelte v3.44.2 */

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
    			}
    		});

    	return {
    		c() {
    			header = element("header");
    			create_component(sitetitleheader.$$.fragment);
    			t = space();
    			div = element("div");
    			attr(header, "class", "site-header fixed flex flex-col svelte-33juzm");
    			attr(div, "id", "header-placeholder");
    			attr(div, "class", "w-32 sm:w-2 svelte-33juzm");
    		},
    		m(target, anchor) {
    			insert(target, header, anchor);
    			mount_component(sitetitleheader, header, null);
    			insert(target, t, anchor);
    			insert(target, div, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(sitetitleheader.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(sitetitleheader.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(header);
    			destroy_component(sitetitleheader);
    			if (detaching) detach(t);
    			if (detaching) detach(div);
    		}
    	};
    }

    class Header extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$7, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Atoms/Burger.svelte generated by Svelte v3.44.2 */

    function create_fragment$8(ctx) {
    	let button;
    	let div1;
    	let t2;
    	let div2;
    	let t3;
    	let svg1;
    	let mask;
    	let path1;
    	let t4;
    	let div5;
    	let button_class_value;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			button = element("button");
    			div1 = element("div");

    			div1.innerHTML = `<div class="burger-container svelte-1m8v1if"><span class="bun-top svelte-1m8v1if"></span> 
            <span class="burger-filling svelte-1m8v1if"></span> 
            <span class="bun-bottom svelte-1m8v1if"></span></div>`;

    			t2 = space();
    			div2 = element("div");
    			div2.innerHTML = `<svg class="svg-ring svelte-1m8v1if"><path class="path svelte-1m8v1if" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"></path></svg>`;
    			t3 = space();
    			svg1 = svg_element("svg");
    			mask = svg_element("mask");
    			path1 = svg_element("path");
    			t4 = space();
    			div5 = element("div");
    			div5.innerHTML = `<div class="animate-path svelte-1m8v1if"><div class="path-rotation svelte-1m8v1if"></div></div>`;
    			attr(div1, "class", "burger-icon svelte-1m8v1if");
    			attr(div2, "class", "burger-ring svelte-1m8v1if");
    			attr(path1, "xmlns", "http://www.w3.org/2000/svg");
    			attr(path1, "fill", "none");
    			attr(path1, "stroke", "#ff0000");
    			attr(path1, "stroke-miterlimit", "10");
    			attr(path1, "stroke-width", "4");
    			attr(path1, "d", "M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4");
    			attr(mask, "id", "mask");
    			attr(svg1, "width", "0");
    			attr(svg1, "height", "0");
    			attr(div5, "class", "path-burger svelte-1m8v1if");
    			attr(button, "class", button_class_value = "" + (null_to_empty(`burger ${/*template*/ ctx[1]} mt-4 md:mt-0 ${/*ready*/ ctx[2] ? 'ready' : ''} ${/*active*/ ctx[0]}`) + " svelte-1m8v1if"));
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, div1);
    			append(button, t2);
    			append(button, div2);
    			append(button, t3);
    			append(button, svg1);
    			append(svg1, mask);
    			append(mask, path1);
    			append(button, t4);
    			append(button, div5);

    			if (!mounted) {
    				dispose = listen(button, "click", /*addActive*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*template, ready, active*/ 7 && button_class_value !== (button_class_value = "" + (null_to_empty(`burger ${/*template*/ ctx[1]} mt-4 md:mt-0 ${/*ready*/ ctx[2] ? 'ready' : ''} ${/*active*/ ctx[0]}`) + " svelte-1m8v1if"))) {
    				attr(button, "class", button_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(button);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
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

    	$$self.$$set = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('template' in $$props) $$invalidate(1, template = $$props.template);
    	};

    	return [active, template, ready, addActive];
    }

    class Burger extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$7, create_fragment$8, safe_not_equal, { active: 0, template: 1 });
    	}
    }

    /* src/Components/Design/Atoms/Copyright.svelte generated by Svelte v3.44.2 */

    function create_fragment$9(ctx) {
    	let small;
    	let small_transition;
    	let current;

    	return {
    		c() {
    			small = element("small");
    			small.textContent = `Kevin Garubba ©${/*year*/ ctx[0]}`;
    			attr(small, "class", "copy-text self-center uppercase bold text-gray-500 svelte-wm5iss");
    		},
    		m(target, anchor) {
    			insert(target, small, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!small_transition) small_transition = create_bidirectional_transition(small, fade, { duration: 3000 }, true);
    				small_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			if (!small_transition) small_transition = create_bidirectional_transition(small, fade, { duration: 3000 }, false);
    			small_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(small);
    			if (detaching && small_transition) small_transition.end();
    		}
    	};
    }

    function instance$8($$self) {
    	let year = new Date().getFullYear();
    	return [year];
    }

    class Copyright extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$8, create_fragment$9, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Molecules/Nav.svelte generated by Svelte v3.44.2 */

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	child_ctx[8] = i;
    	return child_ctx;
    }

    // (52:20) <Link to="{link.slug}" on:click="{addActive}">
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
    			}
    		});

    	return {
    		c() {
    			span = element("span");
    			create_component(svgtext.$$.fragment);
    			attr(span, "class", "link-text svelte-tdpa6e");
    			attr(span, "style", span_style_value = `transition-delay: ${/*i*/ ctx[8] * 2 + 4}00ms`);
    		},
    		m(target, anchor) {
    			insert(target, span, anchor);
    			mount_component(svgtext, span, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const svgtext_changes = {};
    			if (dirty & /*links*/ 2) svgtext_changes.text = /*link*/ ctx[6].title;
    			svgtext.$set(svgtext_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(svgtext.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(svgtext.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(span);
    			destroy_component(svgtext);
    		}
    	};
    }

    // (47:12) {#each links as link, i}
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
    			}
    		});

    	link.$on("click", /*addActive*/ ctx[2]);

    	return {
    		c() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			t = space();
    			attr(li, "class", "nav-item after list-none text-5xl my-2 svelte-tdpa6e");
    			attr(li, "style", li_style_value = `animation-delay: ${/*i*/ ctx[8] * 1 + 3}00ms;`);
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(link, li, null);
    			append(li, t);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const link_changes = {};
    			if (dirty & /*links*/ 2) link_changes.to = /*link*/ ctx[6].slug;

    			if (dirty & /*$$scope, links*/ 514) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			destroy_component(link);
    		}
    	};
    }

    // (42:0) <Router>
    function create_default_slot$1(ctx) {
    	let nav;
    	let ul;
    	let nav_class_value;
    	let current;
    	let each_value = /*links*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			nav = element("nav");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(ul, "class", "flex flex-col text-left mt-32 ml-32 justify-start");
    			attr(nav, "class", nav_class_value = "" + (null_to_empty(`site-nav ${/*className*/ ctx[0]} fixed w-full h-full flex content-left justify-start`) + " svelte-tdpa6e"));
    		},
    		m(target, anchor) {
    			insert(target, nav, anchor);
    			append(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*links, addActive*/ 6) {
    				each_value = /*links*/ ctx[1];
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
    				attr(nav, "class", nav_class_value);
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function create_fragment$a(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(router.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, className, links*/ 515) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(router, detaching);
    		}
    	};
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { className } = $$props;
    	let { active = "" } = $$props;
    	let links = [];

    	let addActive = () => {
    		// if( ready == true ){
    		$$invalidate(3, active = active === "active" ? "closed" : "active");
    	}; // }

    	const apiURL = "http://localhost:8080/wp-json";

    	onMount(async () => {
    		const res = await fetch(`${apiURL}/menus/v1/locations/menu-1`);
    		const json = await res.json();
    		$$invalidate(1, links = json.items);
    	});

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('active' in $$props) $$invalidate(3, active = $$props.active);
    	};

    	return [className, links, addActive, active];
    }

    class Nav extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$9, create_fragment$a, safe_not_equal, { className: 0, active: 3 });
    	}
    }

    /* src/Components/Design/Molecules/Footer.svelte generated by Svelte v3.44.2 */

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

    	burger = new Burger({ props: burger_props });
    	binding_callbacks.push(() => bind(burger, 'active', burger_active_binding));
    	copyright = new Copyright({});

    	function nav_active_binding(value) {
    		/*nav_active_binding*/ ctx[3](value);
    	}

    	let nav_props = { className: /*active*/ ctx[1] };

    	if (/*active*/ ctx[1] !== void 0) {
    		nav_props.active = /*active*/ ctx[1];
    	}

    	nav = new Nav({ props: nav_props });
    	binding_callbacks.push(() => bind(nav, 'active', nav_active_binding));

    	return {
    		c() {
    			footer = element("footer");
    			create_component(burger.$$.fragment);
    			t0 = space();
    			create_component(copyright.$$.fragment);
    			t1 = space();
    			create_component(nav.$$.fragment);
    			attr(footer, "class", footer_class_value = "" + (null_to_empty(`site-footer grid fixed text-center`) + " svelte-gpzxn4"));
    		},
    		m(target, anchor) {
    			insert(target, footer, anchor);
    			mount_component(burger, footer, null);
    			append(footer, t0);
    			mount_component(copyright, footer, null);
    			insert(target, t1, anchor);
    			mount_component(nav, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(burger.$$.fragment, local);
    			transition_in(copyright.$$.fragment, local);
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(burger.$$.fragment, local);
    			transition_out(copyright.$$.fragment, local);
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(footer);
    			destroy_component(burger);
    			destroy_component(copyright);
    			if (detaching) detach(t1);
    			destroy_component(nav, detaching);
    		}
    	};
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { template = '' } = $$props;
    	let active;

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

    	return [template, active, burger_active_binding, nav_active_binding];
    }

    class Footer extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$a, create_fragment$b, safe_not_equal, { template: 0 });
    	}
    }

    /* src/Components/Design/Molecules/SocialNav.svelte generated by Svelte v3.44.2 */

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (22:8) {#each links as link, i}
    function create_each_block$1(ctx) {
    	let li;
    	let a;
    	let i_1;
    	let i_1_class_value;
    	let a_href_value;
    	let t;
    	let li_style_value;

    	return {
    		c() {
    			li = element("li");
    			a = element("a");
    			i_1 = element("i");
    			t = space();
    			attr(i_1, "class", i_1_class_value = `text-3xl fab ${/*link*/ ctx[3].acf.icon}`);
    			attr(a, "href", a_href_value = /*link*/ ctx[3].url);
    			attr(a, "class", "text-gray-400 hover:text-blue duration-500");
    			attr(a, "target", "_blank");
    			attr(li, "class", "my-6 py-2 text-center svelte-iae26c");
    			attr(li, "style", li_style_value = `transition: transform 0.25s ${Math.floor(/*i*/ ctx[5] * 1.5 + 4.49)}00ms`);
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, a);
    			append(a, i_1);
    			append(li, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*links*/ 1 && i_1_class_value !== (i_1_class_value = `text-3xl fab ${/*link*/ ctx[3].acf.icon}`)) {
    				attr(i_1, "class", i_1_class_value);
    			}

    			if (dirty & /*links*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[3].url)) {
    				attr(a, "href", a_href_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    		}
    	};
    }

    function create_fragment$c(ctx) {
    	let nav;
    	let ul;
    	let nav_class_value;
    	let each_value = /*links*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	return {
    		c() {
    			nav = element("nav");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(nav, "class", nav_class_value = "" + (null_to_empty(`${/*loadState*/ ctx[1] ? 'loaded' : ''} social-nav relative w-8 self-center mr-2`) + " svelte-iae26c"));
    		},
    		m(target, anchor) {
    			insert(target, nav, anchor);
    			append(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*Math, links*/ 1) {
    				each_value = /*links*/ ctx[0];
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
    				attr(nav, "class", nav_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(nav);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let links = [];
    	let loadState = false;
    	const apiURL = "http://localhost:8080/wp-json";

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

    	return [links, loadState];
    }

    class SocialNav extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$b, create_fragment$c, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Organisms/Sidebar.svelte generated by Svelte v3.44.2 */

    function create_fragment$d(ctx) {
    	let aside;
    	let div;
    	let t;
    	let socialnav;
    	let current;
    	socialnav = new SocialNav({});

    	return {
    		c() {
    			aside = element("aside");
    			div = element("div");
    			t = space();
    			create_component(socialnav.$$.fragment);
    			attr(div, "class", "sidebar-line absolute mx-auto svelte-88y5zg");
    			attr(aside, "class", "sidebar fixed flex flex-col content-center justify-center w-32 md:w-20 h-full sm:hidden svelte-88y5zg");
    		},
    		m(target, anchor) {
    			insert(target, aside, anchor);
    			append(aside, div);
    			append(aside, t);
    			mount_component(socialnav, aside, null);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(socialnav.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(socialnav.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(aside);
    			destroy_component(socialnav);
    		}
    	};
    }

    class Sidebar extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$d, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Atoms/PageTitle.svelte generated by Svelte v3.44.2 */

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

    	return {
    		c() {
    			div = element("div");
    			h1 = element("h1");
    			span = element("span");
    			attr(h1, "class", h1_class_value = "" + (null_to_empty(`${/*className*/ ctx[2]} text-base font-bold tracking-widest uppercase before`) + " svelte-hj94cn"));
    			attr(h1, "style", h1_style_value = `${/*style*/ ctx[3]}`);
    			attr(div, "class", div_class_value = `${/*containerClass*/ ctx[1]}`);
    			attr(div, "style", div_style_value = `overflow-y:hidden;`);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			append(h1, span);
    			span.innerHTML = /*title*/ ctx[0];
    			/*h1_binding*/ ctx[6](h1);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (!current || dirty & /*title*/ 1) span.innerHTML = /*title*/ ctx[0];
    			if (!current || dirty & /*className*/ 4 && h1_class_value !== (h1_class_value = "" + (null_to_empty(`${/*className*/ ctx[2]} text-base font-bold tracking-widest uppercase before`) + " svelte-hj94cn"))) {
    				attr(h1, "class", h1_class_value);
    			}

    			if (!current || dirty & /*style*/ 8 && h1_style_value !== (h1_style_value = `${/*style*/ ctx[3]}`)) {
    				attr(h1, "style", h1_style_value);
    			}

    			if (!current || dirty & /*containerClass*/ 2 && div_class_value !== (div_class_value = `${/*containerClass*/ ctx[1]}`)) {
    				attr(div, "class", div_class_value);
    			}
    		},
    		i(local) {
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
    		o(local) {
    			if (h1_intro) h1_intro.invalidate();
    			h1_outro = create_out_transition(h1, fly, { y: /*height*/ ctx[4] });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			/*h1_binding*/ ctx[6](null);
    			if (detaching && h1_outro) h1_outro.end();
    		}
    	};
    }

    function create_fragment$e(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*title*/ ctx[0] !== '' && create_if_block$3(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { title = '', containerClass = '', className = '', style = '', height = 50 } = $$props;
    	let text;

    	onMount(async () => {
    		
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

    	return [title, containerClass, className, style, height, text, h1_binding];
    }

    class PageTitle extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$c, create_fragment$e, safe_not_equal, {
    			title: 0,
    			containerClass: 1,
    			className: 2,
    			style: 3,
    			height: 4
    		});
    	}
    }

    /* src/Components/Functional/Head.svelte generated by Svelte v3.44.2 */

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i].name;
    	child_ctx[11] = list[i].property;
    	child_ctx[12] = list[i].content;
    	return child_ctx;
    }

    // (74:78) 
    function create_if_block_1$2(ctx) {
    	let meta_1;
    	let meta_1_name_value;
    	let meta_1_content_value;

    	return {
    		c() {
    			meta_1 = element("meta");
    			attr(meta_1, "name", meta_1_name_value = /*property*/ ctx[11]);
    			attr(meta_1, "content", meta_1_content_value = /*content*/ ctx[12]);
    		},
    		m(target, anchor) {
    			insert(target, meta_1, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*meta*/ 4 && meta_1_name_value !== (meta_1_name_value = /*property*/ ctx[11])) {
    				attr(meta_1, "name", meta_1_name_value);
    			}

    			if (dirty & /*meta*/ 4 && meta_1_content_value !== (meta_1_content_value = /*content*/ ctx[12])) {
    				attr(meta_1, "content", meta_1_content_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(meta_1);
    		}
    	};
    }

    // (72:8) {#if name != undefined || name != null || name != ''}
    function create_if_block$4(ctx) {
    	let meta_1;
    	let meta_1_name_value;
    	let meta_1_content_value;

    	return {
    		c() {
    			meta_1 = element("meta");
    			attr(meta_1, "name", meta_1_name_value = /*name*/ ctx[10]);
    			attr(meta_1, "content", meta_1_content_value = /*content*/ ctx[12]);
    		},
    		m(target, anchor) {
    			insert(target, meta_1, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*meta*/ 4 && meta_1_name_value !== (meta_1_name_value = /*name*/ ctx[10])) {
    				attr(meta_1, "name", meta_1_name_value);
    			}

    			if (dirty & /*meta*/ 4 && meta_1_content_value !== (meta_1_content_value = /*content*/ ctx[12])) {
    				attr(meta_1, "content", meta_1_content_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(meta_1);
    		}
    	};
    }

    // (71:4) {#each meta as { name, property, content }}
    function create_each_block$2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*name*/ ctx[10] != undefined || /*name*/ ctx[10] != null || /*name*/ ctx[10] != '') return create_if_block$4;
    		if (/*property*/ ctx[11] != undefined || /*property*/ ctx[11] != null || /*property*/ ctx[11] != '') return create_if_block_1$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
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
    		d(detaching) {
    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function create_fragment$f(ctx) {
    	let title_value;
    	let link;
    	let each_1_anchor;
    	document.title = title_value = /*title*/ ctx[1];
    	let each_value = /*meta*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	return {
    		c() {
    			link = element("link");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr(link, "rel", "icon");
    			attr(link, "href", /*fav*/ ctx[0]);
    		},
    		m(target, anchor) {
    			append(document.head, link);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(document.head, null);
    			}

    			append(document.head, each_1_anchor);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*title*/ 2 && title_value !== (title_value = /*title*/ ctx[1])) {
    				document.title = title_value;
    			}

    			if (dirty & /*fav*/ 1) {
    				attr(link, "href", /*fav*/ ctx[0]);
    			}

    			if (dirty & /*meta, undefined*/ 4) {
    				each_value = /*meta*/ ctx[2];
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
    		d(detaching) {
    			detach(link);
    			destroy_each(each_blocks, detaching);
    			detach(each_1_anchor);
    		}
    	};
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { pageTagData = {} } = $$props;

    	let fav = "",
    		favJson = "",
    		siteTitle = "",
    		siteJson = "",
    		title = "",
    		meta = [],
    		stateStore = "";

    	const apiURL = "http://localhost:8080/wp-json";

    	const getJsonResponse = async () => {
    		const [favResponse, siteResponse] = await Promise.all([fetch(`${apiURL}/wp/v2/favicon`), fetch(`${apiURL}/`)]);
    		favJson = await favResponse.json();
    		siteJson = await siteResponse.json();
    		tick();
    		$$invalidate(0, fav = favJson.url);
    		siteTitle = siteJson.name + " " + siteJson.description;

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

    	$$self.$$set = $$props => {
    		if ('pageTagData' in $$props) $$invalidate(3, pageTagData = $$props.pageTagData);
    	};

    	return [fav, title, meta, pageTagData];
    }

    class Head extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$d, create_fragment$f, safe_not_equal, { pageTagData: 3 });
    	}
    }

    /* node_modules/svelte-feather-icons/src/icons/ChevronLeftIcon.svelte generated by Svelte v3.44.2 */

    function create_fragment$g(ctx) {
    	let svg;
    	let polyline;
    	let svg_class_value;

    	return {
    		c() {
    			svg = svg_element("svg");
    			polyline = svg_element("polyline");
    			attr(polyline, "points", "15 18 9 12 15 6");
    			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr(svg, "width", /*size*/ ctx[0]);
    			attr(svg, "height", /*size*/ ctx[0]);
    			attr(svg, "fill", "none");
    			attr(svg, "viewBox", "0 0 24 24");
    			attr(svg, "stroke", "currentColor");
    			attr(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr(svg, "stroke-linecap", "round");
    			attr(svg, "stroke-linejoin", "round");
    			attr(svg, "class", svg_class_value = "feather feather-chevron-left " + /*customClass*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, polyline);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*size*/ 1) {
    				attr(svg, "width", /*size*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr(svg, "height", /*size*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*customClass*/ 4 && svg_class_value !== (svg_class_value = "feather feather-chevron-left " + /*customClass*/ ctx[2])) {
    				attr(svg, "class", svg_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { size = "100%" } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { class: customClass = "" } = $$props;

    	if (size !== "100%") {
    		size = size.slice(-1) === 'x'
    		? size.slice(0, size.length - 1) + 'em'
    		: parseInt(size) + 'px';
    	}

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('class' in $$props) $$invalidate(2, customClass = $$props.class);
    	};

    	return [size, strokeWidth, customClass];
    }

    class ChevronLeftIcon extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$e, create_fragment$g, safe_not_equal, { size: 0, strokeWidth: 1, class: 2 });
    	}
    }

    /* node_modules/svelte-feather-icons/src/icons/ChevronRightIcon.svelte generated by Svelte v3.44.2 */

    function create_fragment$h(ctx) {
    	let svg;
    	let polyline;
    	let svg_class_value;

    	return {
    		c() {
    			svg = svg_element("svg");
    			polyline = svg_element("polyline");
    			attr(polyline, "points", "9 18 15 12 9 6");
    			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr(svg, "width", /*size*/ ctx[0]);
    			attr(svg, "height", /*size*/ ctx[0]);
    			attr(svg, "fill", "none");
    			attr(svg, "viewBox", "0 0 24 24");
    			attr(svg, "stroke", "currentColor");
    			attr(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			attr(svg, "stroke-linecap", "round");
    			attr(svg, "stroke-linejoin", "round");
    			attr(svg, "class", svg_class_value = "feather feather-chevron-right " + /*customClass*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, polyline);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*size*/ 1) {
    				attr(svg, "width", /*size*/ ctx[0]);
    			}

    			if (dirty & /*size*/ 1) {
    				attr(svg, "height", /*size*/ ctx[0]);
    			}

    			if (dirty & /*strokeWidth*/ 2) {
    				attr(svg, "stroke-width", /*strokeWidth*/ ctx[1]);
    			}

    			if (dirty & /*customClass*/ 4 && svg_class_value !== (svg_class_value = "feather feather-chevron-right " + /*customClass*/ ctx[2])) {
    				attr(svg, "class", svg_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { size = "100%" } = $$props;
    	let { strokeWidth = 2 } = $$props;
    	let { class: customClass = "" } = $$props;

    	if (size !== "100%") {
    		size = size.slice(-1) === 'x'
    		? size.slice(0, size.length - 1) + 'em'
    		: parseInt(size) + 'px';
    	}

    	$$self.$$set = $$props => {
    		if ('size' in $$props) $$invalidate(0, size = $$props.size);
    		if ('strokeWidth' in $$props) $$invalidate(1, strokeWidth = $$props.strokeWidth);
    		if ('class' in $$props) $$invalidate(2, customClass = $$props.class);
    	};

    	return [size, strokeWidth, customClass];
    }

    class ChevronRightIcon extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$f, create_fragment$h, safe_not_equal, { size: 0, strokeWidth: 1, class: 2 });
    	}
    }

    /* src/Components/Design/Atoms/Button.svelte generated by Svelte v3.44.2 */

    function create_fragment$i(ctx) {
    	let button;
    	let button_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	return {
    		c() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr(button, "class", button_class_value = "" + (null_to_empty(`${/*priorityClass*/ ctx[1]} ${/*className*/ ctx[0]} rounded-full py-2`) + " svelte-6b1d20"));
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    				attr(button, "class", button_class_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
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

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('priority' in $$props) $$invalidate(2, priority = $$props.priority);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	return [className, priorityClass, priority, $$scope, slots];
    }

    class Button extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$g, create_fragment$i, safe_not_equal, { className: 0, priority: 2 });
    	}
    }

    /* src/Components/Design/Molecules/DescriptionPanel.svelte generated by Svelte v3.44.2 */

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (20:4) {#if tags}
    function create_if_block_2(ctx) {
    	let ul;
    	let current;
    	let each_value_1 = /*tags*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(ul, "class", "inline-block");
    		},
    		m(target, anchor) {
    			insert(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*tags*/ 4) {
    				each_value_1 = /*tags*/ ctx[2];
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
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (23:93) <Button priority="tag" >
    function create_default_slot_3(ctx) {
    	let t0;
    	let t1_value = /*tag*/ ctx[8].name + "";
    	let t1;

    	return {
    		c() {
    			t0 = text("#");
    			t1 = text(t1_value);
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, t1, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*tags*/ 4 && t1_value !== (t1_value = /*tag*/ ctx[8].name + "")) set_data(t1, t1_value);
    		},
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(t1);
    		}
    	};
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
    			}
    		});

    	return {
    		c() {
    			li = element("li");
    			create_component(button.$$.fragment);
    			attr(li, "class", "inline-block mr-1");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(button, li, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope, tags*/ 2052) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			destroy_component(button);
    		}
    	};
    }

    // (22:8) {#each tags as tag }
    function create_each_block_1(ctx) {
    	let link_1;
    	let current;

    	link_1 = new Link({
    			props: {
    				to: `projects/?workflow=${/*tag*/ ctx[8].id}&tech=&year=`,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(link_1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(link_1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const link_1_changes = {};
    			if (dirty & /*tags*/ 4) link_1_changes.to = `projects/?workflow=${/*tag*/ ctx[8].id}&tech=&year=`;

    			if (dirty & /*$$scope, tags*/ 2052) {
    				link_1_changes.$$scope = { dirty, ctx };
    			}

    			link_1.$set(link_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(link_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(link_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(link_1, detaching);
    		}
    	};
    }

    // (27:4) {#if swatches}
    function create_if_block$5(ctx) {
    	let p;
    	let t1;
    	let ul;
    	let each_value = /*swatches*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	return {
    		c() {
    			p = element("p");
    			p.textContent = "Swatch";
    			t1 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(p, "class", "mt-4 mb-2");
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    			insert(target, t1, anchor);
    			insert(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*swatches*/ 8) {
    				each_value = /*swatches*/ ctx[3];
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
    		d(detaching) {
    			if (detaching) detach(p);
    			if (detaching) detach(t1);
    			if (detaching) detach(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (31:12) {#if i < 4}
    function create_if_block_1$3(ctx) {
    	let li;
    	let div;
    	let div_style_value;

    	return {
    		c() {
    			li = element("li");
    			div = element("div");
    			attr(div, "class", "rounded-full w-12 h-12 shadow-md");
    			attr(div, "style", div_style_value = `background: ${/*swatch*/ ctx[5].color};`);
    			attr(li, "class", "inline-block mr-2");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, div);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*swatches*/ 8 && div_style_value !== (div_style_value = `background: ${/*swatch*/ ctx[5].color};`)) {
    				attr(div, "style", div_style_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    		}
    	};
    }

    // (30:8) {#each swatches as swatch, i }
    function create_each_block$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[7] < 4 && create_if_block_1$3(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    		},
    		p(ctx, dirty) {
    			if (/*i*/ ctx[7] < 4) if_block.p(ctx, dirty);
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    // (38:35) <Button priority="primary" className="my-5" >
    function create_default_slot_1$2(ctx) {
    	let t;
    	let html_tag;
    	let html_anchor;

    	return {
    		c() {
    			t = text("See Project ");
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    			html_tag.m(arrow, target, anchor);
    			insert(target, html_anchor, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(t);
    			if (detaching) detach(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};
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
    			}
    		});

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 2048) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    function create_fragment$j(ctx) {
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
    			}
    		});

    	let if_block0 = /*tags*/ ctx[2] && create_if_block_2(ctx);
    	let if_block1 = /*swatches*/ ctx[3] && create_if_block$5(ctx);

    	link_1 = new Link({
    			props: {
    				to: `projects/${/*link*/ ctx[4]}`,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
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
    			attr(h4, "class", "text-sm tracking-wider bold uppercase");
    			attr(h3, "class", "text-gray-600 font-bold");
    			attr(div, "class", "description-panel w-64 mt-auto md:mr-0 md:mx-0 mx-32 -mb-5 px-8 py-3 bg-white rounded-lg shadow-2xl svelte-c03sw6");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h4);
    			mount_component(svgtext, h4, null);
    			append(div, t0);
    			append(div, h2);
    			append(h2, t1);
    			append(div, t2);
    			append(div, h3);
    			append(h3, t3);
    			append(div, t4);
    			if (if_block0) if_block0.m(div, null);
    			append(div, t5);
    			if (if_block1) if_block1.m(div, null);
    			append(div, t6);
    			mount_component(link_1, div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data(t1, /*title*/ ctx[0]);
    			if (!current || dirty & /*year*/ 2) set_data(t3, /*year*/ ctx[1]);

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

    			if (dirty & /*$$scope*/ 2048) {
    				link_1_changes.$$scope = { dirty, ctx };
    			}

    			link_1.$set(link_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(svgtext.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(link_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(svgtext.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(link_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(svgtext);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(link_1);
    		}
    	};
    }

    let arrow = '<i class="ml-5 fas fa-chevron-circle-right">';

    function instance$h($$self, $$props, $$invalidate) {
    	let { title, year, tags, swatches, link } = $$props;

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('year' in $$props) $$invalidate(1, year = $$props.year);
    		if ('tags' in $$props) $$invalidate(2, tags = $$props.tags);
    		if ('swatches' in $$props) $$invalidate(3, swatches = $$props.swatches);
    		if ('link' in $$props) $$invalidate(4, link = $$props.link);
    	};

    	return [title, year, tags, swatches, link];
    }

    class DescriptionPanel extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$h, create_fragment$j, safe_not_equal, {
    			title: 0,
    			year: 1,
    			tags: 2,
    			swatches: 3,
    			link: 4
    		});
    	}
    }

    /* src/Components/Design/Organisms/ProjectFeature.svelte generated by Svelte v3.44.2 */

    function create_fragment$k(ctx) {
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
    			}
    		});

    	return {
    		c() {
    			div = element("div");
    			create_component(descriptionpanel.$$.fragment);
    			attr(div, "class", "project-feature flex flex-row flex-grow-0 flex-shrink-0 justify-start content-end w-full h-full shadow-lg svelte-1x9tzyu");
    			attr(div, "style", div_style_value = `background: url(${/*image*/ ctx[0]}) no-repeat center/contain;`);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(descriptionpanel, div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const descriptionpanel_changes = {};
    			if (dirty & /*title*/ 2) descriptionpanel_changes.title = /*title*/ ctx[1];
    			if (dirty & /*year*/ 4) descriptionpanel_changes.year = /*year*/ ctx[2];
    			if (dirty & /*tags*/ 8) descriptionpanel_changes.tags = /*tags*/ ctx[3];
    			if (dirty & /*swatches*/ 16) descriptionpanel_changes.swatches = /*swatches*/ ctx[4];
    			if (dirty & /*link*/ 32) descriptionpanel_changes.link = /*link*/ ctx[5];
    			descriptionpanel.$set(descriptionpanel_changes);

    			if (!current || dirty & /*image*/ 1 && div_style_value !== (div_style_value = `background: url(${/*image*/ ctx[0]}) no-repeat center/contain;`)) {
    				attr(div, "style", div_style_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(descriptionpanel.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(descriptionpanel.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(descriptionpanel);
    		}
    	};
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { data } = $$props;
    	let image, title, year, tags, swatches, link;

    	const defineProps = () => {
    		$$invalidate(1, title = data.title.rendered);
    		$$invalidate(2, year = data.date.slice(0, 4));
    		console.log(data._embedded["wp:featuredmedia"][0].media_details.sizes);
    		$$invalidate(0, image = data._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url);
    		$$invalidate(5, link = data.slug);
    		$$invalidate(3, tags = data._embedded["wp:term"][0]);
    		$$invalidate(4, swatches = data.acf.swatch);
    	};

    	onMount(async () => {
    		defineProps();
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(6, data = $$props.data);
    	};

    	return [image, title, year, tags, swatches, link, data];
    }

    class ProjectFeature extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$i, create_fragment$k, safe_not_equal, { data: 6 });
    	}
    }

    /* src/Components/Design/Organisms/Slideshow.svelte generated by Svelte v3.44.2 */

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
    	projectfeature = new ProjectFeature({ props: { data: /*slide*/ ctx[12] } });

    	return {
    		c() {
    			li = element("li");
    			create_component(projectfeature.$$.fragment);
    			t = space();

    			attr(li, "class", li_class_value = "" + (null_to_empty(`${/*currentSlide*/ ctx[2] == /*i*/ ctx[14]
			? 'currentSlide'
			: ''} ${/*prevSlide*/ ctx[3] == /*i*/ ctx[14] ? 'prevSlide' : ''} slide w-full h-full`) + " svelte-13g5o3k"));

    			attr(li, "style", li_style_value = `transition: ${/*transition*/ ctx[1]}ms`);
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(projectfeature, li, null);
    			append(li, t);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const projectfeature_changes = {};
    			if (dirty & /*data*/ 1) projectfeature_changes.data = /*slide*/ ctx[12];
    			projectfeature.$set(projectfeature_changes);

    			if (!current || dirty & /*currentSlide, prevSlide*/ 12 && li_class_value !== (li_class_value = "" + (null_to_empty(`${/*currentSlide*/ ctx[2] == /*i*/ ctx[14]
			? 'currentSlide'
			: ''} ${/*prevSlide*/ ctx[3] == /*i*/ ctx[14] ? 'prevSlide' : ''} slide w-full h-full`) + " svelte-13g5o3k"))) {
    				attr(li, "class", li_class_value);
    			}

    			if (!current || dirty & /*transition*/ 2 && li_style_value !== (li_style_value = `transition: ${/*transition*/ ctx[1]}ms`)) {
    				attr(li, "style", li_style_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(projectfeature.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(projectfeature.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			destroy_component(projectfeature);
    		}
    	};
    }

    function create_fragment$l(ctx) {
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
    	chevronlefticon = new ChevronLeftIcon({});
    	chevronrighticon = new ChevronRightIcon({});
    	let each_value = /*data*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
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

    			attr(button0, "class", "slide-control prev svelte-13g5o3k");
    			attr(button1, "class", "slide-control next svelte-13g5o3k");
    			attr(div, "class", "slideshow-container relative flex  svelte-13g5o3k");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, button0);
    			mount_component(chevronlefticon, button0, null);
    			append(div, t0);
    			append(div, button1);
    			mount_component(chevronrighticon, button1, null);
    			append(div, t1);
    			append(div, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(button0, "click", /*click_handler*/ ctx[6]),
    					listen(button1, "click", /*click_handler_1*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*currentSlide, prevSlide, transition, data*/ 15) {
    				each_value = /*data*/ ctx[0];
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
    		i(local) {
    			if (current) return;
    			transition_in(chevronlefticon.$$.fragment, local);
    			transition_in(chevronrighticon.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			transition_out(chevronlefticon.$$.fragment, local);
    			transition_out(chevronrighticon.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(chevronlefticon);
    			destroy_component(chevronrighticon);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$j($$self, $$props, $$invalidate) {
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

    class Slideshow extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$j, create_fragment$l, safe_not_equal, { data: 0, duration: 5, transition: 1 });
    	}
    }

    /* src/Components/Design/Templates/Home.svelte generated by Svelte v3.44.2 */

    function create_fragment$m(ctx) {
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
    			props: { pageTagData: /*pageData*/ ctx[1] }
    		});

    	slideshow = new Slideshow({
    			props: {
    				data: /*featuredPosts*/ ctx[0],
    				duration: 8000,
    				transition: 4000
    			}
    		});

    	return {
    		c() {
    			create_component(head.$$.fragment);
    			t = space();
    			section = element("section");
    			div = element("div");
    			create_component(slideshow.$$.fragment);
    			attr(section, "class", "w-full h-full overflow-hidden");
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t, anchor);
    			insert(target, section, anchor);
    			append(section, div);
    			mount_component(slideshow, div, null);
    			current = true;
    		},
    		p(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const slideshow_changes = {};
    			if (dirty & /*featuredPosts*/ 1) slideshow_changes.data = /*featuredPosts*/ ctx[0];
    			slideshow.$set(slideshow_changes);
    		},
    		i(local) {
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
    		o(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(slideshow.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: -1000 });
    			if (section_intro) section_intro.invalidate();
    			section_outro = create_out_transition(section, fly, { y: 500 });
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t);
    			if (detaching) detach(section);
    			destroy_component(slideshow);
    			if (detaching && div_outro) div_outro.end();
    			if (detaching && section_outro) section_outro.end();
    		}
    	};
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let featuredPosts = [];
    	let pageData = {};

    	// export let slug;
    	const apiURL = "http://localhost:8080/wp-json";

    	onMount(async () => {
    		const [pageResponse, projResponse] = await Promise.all([
    			fetch(`${apiURL}/wp/v2/pages?slug=home`),
    			fetch(`${apiURL}/wp/v2/project?_embed`)
    		]);

    		const page = await pageResponse.json();
    		const posts = await projResponse.json();

    		if (page[0] !== "") {
    			$$invalidate(1, pageData = page[0]);
    		}

    		$$invalidate(0, featuredPosts = posts.filter(post => post.acf.feature_project == true));
    	});

    	return [featuredPosts, pageData];
    }

    class Home extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$k, create_fragment$m, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Atoms/Ribbon.svelte generated by Svelte v3.44.2 */

    function create_fragment$n(ctx) {
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

    	return {
    		c() {
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			filter = svg_element("filter");
    			feOffset = svg_element("feOffset");
    			feColorMatrix = svg_element("feColorMatrix");
    			feGaussianBlur = svg_element("feGaussianBlur");
    			feBlend = svg_element("feBlend");
    			polyline = svg_element("polyline");
    			attr(feOffset, "result", "offOut");
    			attr(feOffset, "in", "SourceGraphic");
    			attr(feOffset, "dx", "-5");
    			attr(feOffset, "dy", "5");
    			attr(feColorMatrix, "result", "matrixOut");
    			attr(feColorMatrix, "in", "offOut");
    			attr(feColorMatrix, "type", "matrix");
    			attr(feColorMatrix, "values", "0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.35 0");
    			attr(feGaussianBlur, "result", "blurOut");
    			attr(feGaussianBlur, "in", "matrixOut");
    			attr(feGaussianBlur, "stdDeviation", "3");
    			attr(feBlend, "in", "SourceGraphic");
    			attr(feBlend, "in2", "blurOut");
    			attr(feBlend, "mode", "normal");
    			attr(filter, "id", "overlayShadow");
    			attr(filter, "x", "0");
    			attr(filter, "y", "0");
    			attr(filter, "width", "200%");
    			attr(filter, "height", "200%");
    			attr(polyline, "stroke-width", polyline_stroke_width_value = `${/*strokeWidth*/ ctx[4]}`);
    			attr(polyline, "filter", polyline_filter_value = `${/*shadow*/ ctx[2] ? 'url(#overlayShadow)' : ''}`);
    			attr(polyline, "points", /*points*/ ctx[0]);
    			attr(polyline, "class", "svelte-1jbnpy0");
    			attr(svg, "class", svg_class_value = "" + (null_to_empty(`${/*className*/ ctx[1]} ribbon`) + " svelte-1jbnpy0"));
    			attr(svg, "style", svg_style_value = `${/*style*/ ctx[3]}`);
    			attr(svg, "viewBox", "0 0 1000 1000");
    		},
    		m(target, anchor) {
    			insert(target, svg, anchor);
    			append(svg, defs);
    			append(defs, filter);
    			append(filter, feOffset);
    			append(filter, feColorMatrix);
    			append(filter, feGaussianBlur);
    			append(filter, feBlend);
    			append(svg, polyline);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*strokeWidth*/ 16 && polyline_stroke_width_value !== (polyline_stroke_width_value = `${/*strokeWidth*/ ctx[4]}`)) {
    				attr(polyline, "stroke-width", polyline_stroke_width_value);
    			}

    			if (dirty & /*shadow*/ 4 && polyline_filter_value !== (polyline_filter_value = `${/*shadow*/ ctx[2] ? 'url(#overlayShadow)' : ''}`)) {
    				attr(polyline, "filter", polyline_filter_value);
    			}

    			if (dirty & /*points*/ 1) {
    				attr(polyline, "points", /*points*/ ctx[0]);
    			}

    			if (dirty & /*className*/ 2 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`${/*className*/ ctx[1]} ribbon`) + " svelte-1jbnpy0"))) {
    				attr(svg, "class", svg_class_value);
    			}

    			if (dirty & /*style*/ 8 && svg_style_value !== (svg_style_value = `${/*style*/ ctx[3]}`)) {
    				attr(svg, "style", svg_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(svg);
    		}
    	};
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { points } = $$props;
    	let { className } = $$props;
    	let { shadow = true } = $$props;
    	let { style } = $$props;
    	let { strokeWidth = 200 } = $$props;

    	$$self.$$set = $$props => {
    		if ('points' in $$props) $$invalidate(0, points = $$props.points);
    		if ('className' in $$props) $$invalidate(1, className = $$props.className);
    		if ('shadow' in $$props) $$invalidate(2, shadow = $$props.shadow);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    		if ('strokeWidth' in $$props) $$invalidate(4, strokeWidth = $$props.strokeWidth);
    	};

    	return [points, className, shadow, style, strokeWidth];
    }

    class Ribbon extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$l, create_fragment$n, safe_not_equal, {
    			points: 0,
    			className: 1,
    			shadow: 2,
    			style: 3,
    			strokeWidth: 4
    		});
    	}
    }

    /* src/Components/Design/Molecules/ScrollTo.svelte generated by Svelte v3.44.2 */

    function create_fragment$o(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let div2_class_value;

    	return {
    		c() {
    			div2 = element("div");
    			div0 = element("div");
    			t = space();
    			div1 = element("div");
    			attr(div0, "class", "arrow first w-6 h-6 absolute svelte-1yc4cs7");
    			attr(div1, "class", "arrow second w-6 h-6 absolute svelte-1yc4cs7");
    			attr(div2, "class", div2_class_value = "" + (/*className*/ ctx[0] + " " + (/*loaded*/ ctx[2] ? 'loaded' : '') + " arrow-container flex flex-col w-6 h-12 relative" + " svelte-1yc4cs7"));
    			attr(div2, "style", /*style*/ ctx[1]);
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, div0);
    			append(div2, t);
    			append(div2, div1);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*className, loaded*/ 5 && div2_class_value !== (div2_class_value = "" + (/*className*/ ctx[0] + " " + (/*loaded*/ ctx[2] ? 'loaded' : '') + " arrow-container flex flex-col w-6 h-12 relative" + " svelte-1yc4cs7"))) {
    				attr(div2, "class", div2_class_value);
    			}

    			if (dirty & /*style*/ 2) {
    				attr(div2, "style", /*style*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div2);
    		}
    	};
    }

    function instance$m($$self, $$props, $$invalidate) {
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

    	$$self.$$set = $$props => {
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('delay' in $$props) $$invalidate(3, delay = $$props.delay);
    	};

    	return [className, style, loaded, delay];
    }

    class ScrollTo extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$m, create_fragment$o, safe_not_equal, { className: 0, style: 1, delay: 3 });
    	}
    }

    /* src/Components/Design/Templates/About.svelte generated by Svelte v3.44.2 */

    const { setTimeout: setTimeout_1 } = globals;

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    // (262:0) {:else}
    function create_else_block$1(ctx) {
    	let h1;

    	return {
    		c() {
    			h1 = element("h1");
    			h1.textContent = "Loading";
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(h1);
    		}
    	};
    }

    // (69:0) {#if data != ''}
    function create_if_block$6(ctx) {
    	let head;
    	let t0;
    	let section0;
    	let pagetitle;
    	let t1;
    	let div4;
    	let div2;
    	let h20;
    	let t2_value = /*pageData*/ ctx[1].acf.hero_title + "";
    	let t2;
    	let h20_intro;
    	let h20_outro;
    	let t3;
    	let div1;
    	let div0;
    	let t4_value = /*pageData*/ ctx[1].acf.hero_text + "";
    	let t4;
    	let div0_intro;
    	let div0_outro;
    	let t5;
    	let scrollto;
    	let t6;
    	let div3;
    	let div3_intro;
    	let div3_outro;
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
    	let div6;
    	let h23;
    	let raw0_value = /*pageData*/ ctx[1].acf.final_message_title + "";
    	let t17;
    	let div5;
    	let raw1_value = /*pageData*/ ctx[1].acf.final_message_description + "";
    	let t18;
    	let if_block2_anchor;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] }
    		});

    	pagetitle = new PageTitle({
    			props: {
    				title: "About",
    				style: "position: relative; z-index:4;",
    				height: "25"
    			}
    		});

    	scrollto = new ScrollTo({ props: { delay: 5700 } });
    	let if_block0 = /*pageData*/ ctx[1].acf.hero_image !== undefined && create_if_block_5(ctx);

    	ribbon0 = new Ribbon({
    			props: {
    				className: "overlay absolute w-1/2 h-1/2 md:w-1/2",
    				style: "top: 0; right: 0;",
    				strokeWidth: "300",
    				points: "-200,-600 1900,1100"
    			}
    		});

    	ribbon1 = new Ribbon({
    			props: {
    				className: "background",
    				style: "width: 100%; left: 0; right: 0;",
    				strokeWidth: "150",
    				points: "1200,150 -200,1000",
    				shadow: false
    			}
    		});

    	let each_value_2 = /*pageData*/ ctx[1].acf.my_specialties;
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*pageData*/ ctx[1].acf.tech_list;
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	let if_block1 = /*pageData*/ ctx[1].acf.final_message_image != undefined && create_if_block_2$1(ctx);
    	let if_block2 = /*pageData*/ ctx[1].acf.call_to_action_section != undefined && create_if_block_1$4(ctx);

    	return {
    		c() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section0 = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			div4 = element("div");
    			div2 = element("div");
    			h20 = element("h2");
    			t2 = text(t2_value);
    			t3 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t4 = text(t4_value);
    			t5 = space();
    			create_component(scrollto.$$.fragment);
    			t6 = space();
    			div3 = element("div");
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
    			div6 = element("div");
    			h23 = element("h2");
    			t17 = space();
    			div5 = element("div");
    			t18 = space();
    			if (if_block2) if_block2.c();
    			if_block2_anchor = empty();
    			attr(h20, "class", "text-6xl font-bold");
    			attr(div0, "class", "typed text-gray-700 svelte-fic9vd");
    			attr(div1, "class", "w-3/4");
    			attr(div2, "class", "sm:w-full w-3/5 mt-32 md:mt-4 mx-2");
    			set_style(div2, "z-index", "4");
    			set_style(div2, "transform", "translate(0," + Math.min(100, /*y*/ ctx[2] / 5) + "px)");
    			attr(div3, "class", "sm:w-3/4 w-2/5 md:mt-4 mt-8");
    			set_style(div3, "overflow", "hidden");
    			set_style(div3, "transform", "translate(0," + Math.min(24, /*y*/ ctx[2] / 35) + "px)");
    			attr(div4, "class", "flex sm:flex-col-reverse flex-row");
    			attr(h21, "data-aos", "fade-up");
    			attr(h21, "data-aos-duration", "1500");
    			attr(h21, "class", "text-4xl mb-8");
    			attr(ul0, "class", "flex flex-row flex-wrap justify-around");
    			attr(section1, "class", "my-40 text-center");
    			attr(h22, "data-aos", "fade-up");
    			attr(h22, "data-aos-duration", "1500");
    			attr(h22, "class", "text-3xl mb-8");
    			attr(ul1, "class", "flex flex-row w-full flex-wrap");
    			attr(section2, "class", "my-32 text-center w-full");
    			attr(h23, "class", "text-6xl font-bold leading-none mb-12");
    			attr(div5, "class", "text-gray-700");
    			attr(div6, "data-aos", "fade-left");
    			attr(div6, "data-aos-duration", "1500");
    			attr(div6, "class", "w-2/5 lg:w-full lg:mt-5 px-16");
    			attr(section3, "class", "my-32 flex flex-row flex-wrap");
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, section0, anchor);
    			mount_component(pagetitle, section0, null);
    			append(section0, t1);
    			append(section0, div4);
    			append(div4, div2);
    			append(div2, h20);
    			append(h20, t2);
    			append(div2, t3);
    			append(div2, div1);
    			append(div1, div0);
    			append(div0, t4);
    			append(div2, t5);
    			mount_component(scrollto, div2, null);
    			append(div4, t6);
    			append(div4, div3);
    			if (if_block0) if_block0.m(div3, null);
    			append(section0, t7);
    			mount_component(ribbon0, section0, null);
    			append(section0, t8);
    			mount_component(ribbon1, section0, null);
    			insert(target, t9, anchor);
    			insert(target, section1, anchor);
    			append(section1, h21);
    			append(h21, t10);
    			append(section1, t11);
    			append(section1, ul0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(ul0, null);
    			}

    			insert(target, t12, anchor);
    			insert(target, section2, anchor);
    			append(section2, h22);
    			append(h22, t13);
    			append(section2, t14);
    			append(section2, ul1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul1, null);
    			}

    			insert(target, t15, anchor);
    			insert(target, section3, anchor);
    			if (if_block1) if_block1.m(section3, null);
    			append(section3, t16);
    			append(section3, div6);
    			append(div6, h23);
    			h23.innerHTML = raw0_value;
    			append(div6, t17);
    			append(div6, div5);
    			div5.innerHTML = raw1_value;
    			insert(target, t18, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert(target, if_block2_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			if ((!current || dirty & /*pageData*/ 2) && t2_value !== (t2_value = /*pageData*/ ctx[1].acf.hero_title + "")) set_data(t2, t2_value);
    			if ((!current || dirty & /*pageData*/ 2) && t4_value !== (t4_value = /*pageData*/ ctx[1].acf.hero_text + "")) set_data(t4, t4_value);

    			if (!current || dirty & /*y*/ 4) {
    				set_style(div2, "transform", "translate(0," + Math.min(100, /*y*/ ctx[2] / 5) + "px)");
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
    					if_block0.m(div3, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*y*/ 4) {
    				set_style(div3, "transform", "translate(0," + Math.min(24, /*y*/ ctx[2] / 35) + "px)");
    			}

    			if ((!current || dirty & /*pageData*/ 2) && t10_value !== (t10_value = /*pageData*/ ctx[1].acf.specialty_section_title + "")) set_data(t10, t10_value);

    			if (dirty & /*pageData, undefined*/ 2) {
    				each_value_2 = /*pageData*/ ctx[1].acf.my_specialties;
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

    			if ((!current || dirty & /*pageData*/ 2) && t13_value !== (t13_value = /*pageData*/ ctx[1].acf.tech_list_title + "")) set_data(t13, t13_value);

    			if (dirty & /*pageData, undefined*/ 2) {
    				each_value_1 = /*pageData*/ ctx[1].acf.tech_list;
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

    			if ((!current || dirty & /*pageData*/ 2) && raw0_value !== (raw0_value = /*pageData*/ ctx[1].acf.final_message_title + "")) h23.innerHTML = raw0_value;			if ((!current || dirty & /*pageData*/ 2) && raw1_value !== (raw1_value = /*pageData*/ ctx[1].acf.final_message_description + "")) div5.innerHTML = raw1_value;
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
    		i(local) {
    			if (current) return;
    			transition_in(head.$$.fragment, local);
    			transition_in(pagetitle.$$.fragment, local);

    			add_render_callback(() => {
    				if (h20_outro) h20_outro.end(1);
    				h20_intro = create_in_transition(h20, typewriter, { speed: 100, delay: 1000 });
    				h20_intro.start();
    			});

    			add_render_callback(() => {
    				if (div0_outro) div0_outro.end(1);
    				div0_intro = create_in_transition(div0, typewriter, { speed: 20, delay: -700 });
    				div0_intro.start();
    			});

    			transition_in(scrollto.$$.fragment, local);
    			transition_in(if_block0);

    			add_render_callback(() => {
    				if (div3_outro) div3_outro.end(1);
    				div3_intro = create_in_transition(div3, fly, { x: 281, duration: 1500, delay: 1000 });
    				div3_intro.start();
    			});

    			transition_in(ribbon0.$$.fragment, local);
    			transition_in(ribbon1.$$.fragment, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (h20_intro) h20_intro.invalidate();
    			h20_outro = create_out_transition(h20, fly, {});
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, {});
    			transition_out(scrollto.$$.fragment, local);
    			transition_out(if_block0);
    			if (div3_intro) div3_intro.invalidate();
    			div3_outro = create_out_transition(div3, fly, { x: 281, duration: 1500 });
    			transition_out(ribbon0.$$.fragment, local);
    			transition_out(ribbon1.$$.fragment, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(section0);
    			destroy_component(pagetitle);
    			if (detaching && h20_outro) h20_outro.end();
    			if (detaching && div0_outro) div0_outro.end();
    			destroy_component(scrollto);
    			if (if_block0) if_block0.d();
    			if (detaching && div3_outro) div3_outro.end();
    			destroy_component(ribbon0);
    			destroy_component(ribbon1);
    			if (detaching) detach(t9);
    			if (detaching) detach(section1);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach(t12);
    			if (detaching) detach(section2);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(t15);
    			if (detaching) detach(section3);
    			if (if_block1) if_block1.d();
    			if (detaching) detach(t18);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach(if_block2_anchor);
    		}
    	};
    }

    // (107:16) {#if pageData.acf.hero_image !== undefined}
    function create_if_block_5(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let img_intro;
    	let img_outro;
    	let current;

    	return {
    		c() {
    			img = element("img");
    			attr(img, "width", "562");
    			if (!src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.hero_image.sizes.medium_large)) attr(img, "src", img_src_value);
    			attr(img, "alt", img_alt_value = /*pageData*/ ctx[1].acf.hero_image.alt);
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if (!current || dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.hero_image.sizes.medium_large)) {
    				attr(img, "src", img_src_value);
    			}

    			if (!current || dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*pageData*/ ctx[1].acf.hero_image.alt)) {
    				attr(img, "alt", img_alt_value);
    			}
    		},
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (img_outro) img_outro.end(1);
    				img_intro = create_in_transition(img, fly, { x: -562, duration: 1500, delay: 1000 });
    				img_intro.start();
    			});

    			current = true;
    		},
    		o(local) {
    			if (img_intro) img_intro.invalidate();
    			img_outro = create_out_transition(img, fly, { x: -562, duration: 1500 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    			if (detaching && img_outro) img_outro.end();
    		}
    	};
    }

    // (149:24) {#if specialty.icon != undefined}
    function create_if_block_4(ctx) {
    	let img;
    	let img_width_value;
    	let img_src_value;
    	let img_alt_value;

    	return {
    		c() {
    			img = element("img");
    			attr(img, "class", "mx-auto my-5 lg:w-3/4");
    			attr(img, "width", img_width_value = /*specialty*/ ctx[14].icon.sizes['thumbnail-width']);
    			if (!src_url_equal(img.src, img_src_value = /*specialty*/ ctx[14].icon.sizes.thumbnail)) attr(img, "src", img_src_value);
    			attr(img, "alt", img_alt_value = /*specialty*/ ctx[14].icon.alt);
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && img_width_value !== (img_width_value = /*specialty*/ ctx[14].icon.sizes['thumbnail-width'])) {
    				attr(img, "width", img_width_value);
    			}

    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*specialty*/ ctx[14].icon.sizes.thumbnail)) {
    				attr(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*specialty*/ ctx[14].icon.alt)) {
    				attr(img, "alt", img_alt_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    		}
    	};
    }

    // (141:12) {#each pageData.acf.my_specialties as specialty, i}
    function create_each_block_2(ctx) {
    	let li;
    	let figure;
    	let t0;
    	let figcaption;
    	let t1_value = /*specialty*/ ctx[14].icon_text + "";
    	let t1;
    	let t2;
    	let li_data_aos_delay_value;
    	let if_block = /*specialty*/ ctx[14].icon != undefined && create_if_block_4(ctx);

    	return {
    		c() {
    			li = element("li");
    			figure = element("figure");
    			if (if_block) if_block.c();
    			t0 = space();
    			figcaption = element("figcaption");
    			t1 = text(t1_value);
    			t2 = space();
    			attr(figcaption, "class", "text-center uppercase font-light text-lg");
    			attr(figure, "class", "flex flex-col justify-center content-center");
    			attr(li, "data-aos", "fade-up");
    			attr(li, "data-aos-duration", "1500");
    			attr(li, "data-aos-delay", li_data_aos_delay_value = "" + (/*i*/ ctx[13] + "00"));
    			attr(li, "class", "w-1/4 md:w-1/2");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, figure);
    			if (if_block) if_block.m(figure, null);
    			append(figure, t0);
    			append(figure, figcaption);
    			append(figcaption, t1);
    			append(li, t2);
    		},
    		p(ctx, dirty) {
    			if (/*specialty*/ ctx[14].icon != undefined) {
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

    			if (dirty & /*pageData*/ 2 && t1_value !== (t1_value = /*specialty*/ ctx[14].icon_text + "")) set_data(t1, t1_value);
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			if (if_block) if_block.d();
    		}
    	};
    }

    // (186:24) {#if tech_item.tech_icon != undefined}
    function create_if_block_3(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	return {
    		c() {
    			img = element("img");
    			attr(img, "class", "w-16 p-1 ml-1 mr-3");
    			if (!src_url_equal(img.src, img_src_value = /*tech_item*/ ctx[11].tech_icon.sizes.thumbnail)) attr(img, "src", img_src_value);
    			attr(img, "alt", img_alt_value = /*tech_item*/ ctx[11].tech_icon.alt);
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*tech_item*/ ctx[11].tech_icon.sizes.thumbnail)) {
    				attr(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*tech_item*/ ctx[11].tech_icon.alt)) {
    				attr(img, "alt", img_alt_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    		}
    	};
    }

    // (173:12) {#each pageData.acf.tech_list as tech_item, i}
    function create_each_block_1$1(ctx) {
    	let li;
    	let figure;
    	let t0;
    	let figcaption;
    	let t1_value = /*tech_item*/ ctx[11].tech_label + "";
    	let t1;
    	let t2;
    	let li_data_aos_delay_value;
    	let if_block = /*tech_item*/ ctx[11].tech_icon != undefined && create_if_block_3(ctx);

    	return {
    		c() {
    			li = element("li");
    			figure = element("figure");
    			if (if_block) if_block.c();
    			t0 = space();
    			figcaption = element("figcaption");
    			t1 = text(t1_value);
    			t2 = space();
    			attr(figcaption, "class", "flex items-center font-bold text-xl text-left text-gray-600");
    			attr(figure, "class", "flex flex-row bg-gray-100 rounded-l-full shadow-xl");
    			set_style(figure, "border-top-right-radius", "3999px");
    			set_style(figure, "border-bottom-right-radius", "3999px");
    			attr(li, "data-aos", "fade-up");
    			attr(li, "data-aos-duration", "1500");
    			attr(li, "data-aos-delay", li_data_aos_delay_value = "" + (/*i*/ ctx[13] + "00"));
    			attr(li, "class", "w-1/2 md:w-full p-2 ");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, figure);
    			if (if_block) if_block.m(figure, null);
    			append(figure, t0);
    			append(figure, figcaption);
    			append(figcaption, t1);
    			append(li, t2);
    		},
    		p(ctx, dirty) {
    			if (/*tech_item*/ ctx[11].tech_icon != undefined) {
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

    			if (dirty & /*pageData*/ 2 && t1_value !== (t1_value = /*tech_item*/ ctx[11].tech_label + "")) set_data(t1, t1_value);
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			if (if_block) if_block.d();
    		}
    	};
    }

    // (205:8) {#if pageData.acf.final_message_image != undefined}
    function create_if_block_2$1(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	return {
    		c() {
    			div = element("div");
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.final_message_image.sizes.medium_large)) attr(img, "src", img_src_value);
    			attr(img, "alt", img_alt_value = /*pageData*/ ctx[1].acf.final_message_image.alt);
    			attr(div, "data-aos", "fade-right");
    			attr(div, "data-aos-duration", "1500");
    			attr(div, "class", "w-3/5 lg:w-full");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, img);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && !src_url_equal(img.src, img_src_value = /*pageData*/ ctx[1].acf.final_message_image.sizes.medium_large)) {
    				attr(img, "src", img_src_value);
    			}

    			if (dirty & /*pageData*/ 2 && img_alt_value !== (img_alt_value = /*pageData*/ ctx[1].acf.final_message_image.alt)) {
    				attr(img, "alt", img_alt_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (231:4) {#if pageData.acf.call_to_action_section != undefined}
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
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
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

    			attr(h2, "data-aos", "fade-up");
    			attr(h2, "data-aos-duration", "1500");
    			attr(h2, "class", "text-5xl");
    			attr(div0, "data-aos", "fade-up");
    			attr(div0, "data-aos-duration", "1500");
    			attr(div0, "class", "my-16 text-gray-700");
    			attr(div1, "data-aos", "fade-up");
    			attr(div1, "data-aos-duration", "1500");
    			attr(div1, "class", "flex align-center justify-center");
    			attr(section, "class", "my-48 lg:my-24 text-center");
    		},
    		m(target, anchor) {
    			insert(target, section, anchor);
    			append(section, h2);
    			append(h2, t0);
    			append(section, t1);
    			append(section, div0);
    			append(div0, t2);
    			append(section, t3);
    			append(section, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if ((!current || dirty & /*pageData*/ 2) && t0_value !== (t0_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_title + "")) set_data(t0, t0_value);
    			if ((!current || dirty & /*pageData*/ 2) && t2_value !== (t2_value = /*pageData*/ ctx[1].acf.call_to_action_section.section_description + "")) set_data(t2, t2_value);

    			if (dirty & /*pageData*/ 2) {
    				each_value = /*pageData*/ ctx[1].acf.call_to_action_section.call_to_action_buttons;
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
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (249:20) <Button                         priority="{cta_button.is_primary ? 'primary' : 'tertiary'}"                         className="mx-5"                     >
    function create_default_slot$3(ctx) {
    	let t0_value = /*cta_button*/ ctx[8].cta_link.title + "";
    	let t0;
    	let t1;
    	let span;

    	let raw_value = (/*cta_button*/ ctx[8].is_primary
    	? '<i class="ml-5 fas fa-chevron-circle-right">'
    	: '') + "";

    	let t2;

    	return {
    		c() {
    			t0 = text(t0_value);
    			t1 = space();
    			span = element("span");
    			t2 = space();
    		},
    		m(target, anchor) {
    			insert(target, t0, anchor);
    			insert(target, t1, anchor);
    			insert(target, span, anchor);
    			span.innerHTML = raw_value;
    			insert(target, t2, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*pageData*/ 2 && t0_value !== (t0_value = /*cta_button*/ ctx[8].cta_link.title + "")) set_data(t0, t0_value);

    			if (dirty & /*pageData*/ 2 && raw_value !== (raw_value = (/*cta_button*/ ctx[8].is_primary
    			? '<i class="ml-5 fas fa-chevron-circle-right">'
    			: '') + "")) span.innerHTML = raw_value;		},
    		d(detaching) {
    			if (detaching) detach(t0);
    			if (detaching) detach(t1);
    			if (detaching) detach(span);
    			if (detaching) detach(t2);
    		}
    	};
    }

    // (248:16) {#each pageData.acf.call_to_action_section.call_to_action_buttons as cta_button}
    function create_each_block$5(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: /*cta_button*/ ctx[8].is_primary
    				? 'primary'
    				: 'tertiary',
    				className: "mx-5",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*pageData*/ 2) button_changes.priority = /*cta_button*/ ctx[8].is_primary
    			? 'primary'
    			: 'tertiary';

    			if (dirty & /*$$scope, pageData*/ 65538) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    function create_fragment$p(ctx) {
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

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen(window, "scroll", () => {
    					scrolling = true;
    					clearTimeout(scrolling_timeout);
    					scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    					/*onwindowscroll*/ ctx[3]();
    				});

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};
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
    			node.textContent = "";

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

    function instance$n($$self, $$props, $$invalidate) {
    	const apiURL = "http://localhost:8080/wp-json";
    	let data = [];
    	let pageData = [];
    	let y;

    	const getData = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/pages/?slug=about`);
    		const json = await res.json();
    		$$invalidate(0, data = json);

    		if (data[0] !== undefined) {
    			$$invalidate(1, pageData = data[0]);
    		}
    	};

    	onMount(async () => {
    		getData();
    	});

    	function onwindowscroll() {
    		$$invalidate(2, y = window.pageYOffset);
    	}

    	return [data, pageData, y, onwindowscroll];
    }

    class About extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$n, create_fragment$p, safe_not_equal, {});
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
      } catch (err) {// Do nothing
      }

      if (components.length === 1) {
        return components;
      }

      split = split || 1; // Split the array in 2 parts

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
      } // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else


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
        encodedURI = encodedURI.replace(/\+/g, ' '); // Try the built in decoder first

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

      return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
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

              if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
                return result;
              }

              if (value === null) {
                return [...result, [encode(key, options), '[', index, ']'].join('')];
              }

              return [...result, [encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')];
            };

          case 'bracket':
            return key => (result, value) => {
              if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
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
              if (value === undefined || options.skipNull && value === null || options.skipEmptyString && value === '') {
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
              const isEncodedArray = typeof value === 'string' && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
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
          return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map(key => input[key]);
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
        if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === 'string' && value.trim() !== '') {
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
        const formatter = parserForArrayFormat(options); // Create an object with no prototype

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

          let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, ' ') : param, '='); // Missing `=` should be `null`:
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

        const shouldFilter = key => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === '';

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
            return value.reduce(formatter(key), []).join('&');
          }

          return encode(key, options) + '=' + encode(value, options);
        }).filter(x => x.length > 0).join('&');
      };

      exports.parseUrl = (url, options) => {
        options = Object.assign({
          decode: true
        }, options);
        const [url_, hash] = splitOnFirst(url, '#');
        return Object.assign({
          url: url_.split('?')[0] || '',
          query: parse(extract(url), options)
        }, options && options.parseFragmentIdentifier && hash ? {
          fragmentIdentifier: decode(hash, options)
        } : {});
      };

      exports.stringifyUrl = (object, options) => {
        options = Object.assign({
          encode: true,
          strict: true
        }, options);
        const url = removeHash(object.url).split('?')[0] || '';
        const queryFromUrl = exports.extract(object.url);
        const parsedQueryFromUrl = exports.parse(queryFromUrl, {
          sort: false
        });
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
        const {
          url,
          query,
          fragmentIdentifier
        } = exports.parseUrl(input, options);
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

    /* src/Components/Design/Molecules/FacetPanel.svelte generated by Svelte v3.44.2 */

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

    	return {
    		c() {
    			li = element("li");
    			label = element("label");
    			input = element("input");
    			t = text(" All");
    			attr(input, "type", "radio");
    			attr(input, "for", "year");
    			input.__value = "";
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);

    			attr(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0] == ''
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, label);
    			append(label, input);
    			input.checked = input.__value === /*groupSelection*/ ctx[0];
    			append(label, t);

    			if (!mounted) {
    				dispose = [
    					listen(input, "change", /*input_change_handler*/ ctx[8]),
    					listen(input, "change", function () {
    						if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    					})
    				];

    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = input.__value === /*groupSelection*/ ctx[0];
    			}

    			if (dirty & /*groupSelection*/ 1 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0] == ''
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr(label, "class", label_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
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

    	return {
    		c() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr(input, "type", "radio");

    			input.__value = input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12];

    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);

    			attr(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12])
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));
    		},
    		m(target, anchor) {
    			insert(target, label, anchor);
    			append(label, input);
    			input.checked = input.__value === /*groupSelection*/ ctx[0];
    			append(label, t0);
    			append(label, t1);

    			if (!mounted) {
    				dispose = [
    					listen(input, "change", /*input_change_handler_2*/ ctx[11]),
    					listen(input, "change", function () {
    						if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    					})
    				];

    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*facets*/ 4 && input_value_value !== (input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12])) {
    				input.__value = input_value_value;
    				input.value = input.__value;
    			}

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = input.__value === /*groupSelection*/ ctx[0];
    			}

    			if (dirty & /*facets*/ 4 && t1_value !== (t1_value = (/*facet*/ ctx[12].name
    			? /*facet*/ ctx[12].name
    			: /*facet*/ ctx[12]) + "")) set_data(t1, t1_value);

    			if (dirty & /*groupSelection, facets*/ 5 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12])
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr(label, "class", label_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(label);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
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

    	return {
    		c() {
    			label = element("label");
    			input = element("input");
    			t0 = space();
    			t1 = text(t1_value);
    			attr(input, "type", "checkbox");

    			input.__value = input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12];

    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[9][0].push(input);

    			attr(label, "class", label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12].id)
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"));
    		},
    		m(target, anchor) {
    			insert(target, label, anchor);
    			append(label, input);
    			input.checked = ~/*groupSelection*/ ctx[0].indexOf(input.__value);
    			append(label, t0);
    			append(label, t1);

    			if (!mounted) {
    				dispose = [
    					listen(input, "change", /*input_change_handler_1*/ ctx[10]),
    					listen(input, "change", function () {
    						if (is_function(/*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this))) /*addQuery*/ ctx[3](/*groupSelection*/ ctx[0], this).apply(this, arguments);
    					})
    				];

    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*facets*/ 4 && input_value_value !== (input_value_value = /*facet*/ ctx[12].id
    			? /*facet*/ ctx[12].id
    			: /*facet*/ ctx[12])) {
    				input.__value = input_value_value;
    				input.value = input.__value;
    			}

    			if (dirty & /*groupSelection*/ 1) {
    				input.checked = ~/*groupSelection*/ ctx[0].indexOf(input.__value);
    			}

    			if (dirty & /*facets*/ 4 && t1_value !== (t1_value = (/*facet*/ ctx[12].name
    			? /*facet*/ ctx[12].name
    			: /*facet*/ ctx[12]) + "")) set_data(t1, t1_value);

    			if (dirty & /*groupSelection, facets*/ 5 && label_class_value !== (label_class_value = "" + (null_to_empty(`filter-label ${/*groupSelection*/ ctx[0].includes(/*facet*/ ctx[12].id)
			? "text-gray-600"
			: "text-gray-500"}`) + " svelte-95jkel"))) {
    				attr(label, "class", label_class_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(label);
    			/*$$binding_groups*/ ctx[9][0].splice(/*$$binding_groups*/ ctx[9][0].indexOf(input), 1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
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

    	return {
    		c() {
    			li = element("li");
    			if (if_block) if_block.c();
    			t = space();
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			if (if_block) if_block.m(li, null);
    			append(li, t);
    		},
    		p(ctx, dirty) {
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
    		d(detaching) {
    			if (detaching) detach(li);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};
    }

    function create_fragment$q(ctx) {
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
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	return {
    		c() {
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

    			attr(h3, "class", "font-bold text-gray-800");
    			attr(button, "class", button_class_value = "" + (null_to_empty(`dropdown-btn ${/*dropped*/ ctx[6] ? 'dropped' : ''} before transition duration-150 rounded-full absolute bg-gray-400 mt-6 mr-5 p-5 hidden sm:block`) + " svelte-95jkel"));
    			attr(hr, "class", "my-3");
    			attr(form, "class", form_class_value = "" + (null_to_empty(`${/*dropped*/ ctx[6] ? 'dropped' : ''}`) + " svelte-95jkel"));
    			attr(div, "class", "relative w-full my-4 px-8 py-3 bg-white rounded-lg shadow-xl");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h3);
    			append(h3, t0);
    			append(div, t1);
    			append(div, button);
    			append(div, t2);
    			append(div, hr);
    			append(div, t3);
    			append(div, form);
    			append(form, ul);
    			if (if_block) if_block.m(ul, null);
    			append(ul, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			if (!mounted) {
    				dispose = listen(button, "click", /*dropdown*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*title*/ 2) set_data(t0, /*title*/ ctx[1]);

    			if (dirty & /*dropped*/ 64 && button_class_value !== (button_class_value = "" + (null_to_empty(`dropdown-btn ${/*dropped*/ ctx[6] ? 'dropped' : ''} before transition duration-150 rounded-full absolute bg-gray-400 mt-6 mr-5 p-5 hidden sm:block`) + " svelte-95jkel"))) {
    				attr(button, "class", button_class_value);
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
    				attr(form, "class", form_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let dropped = false;
    	let { title, facets, groupSelection, addQuery, inputType, all = false } = $$props;

    	const dropdown = () => {
    		$$invalidate(6, dropped = dropped == false ? true : false);
    	};

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

    class FacetPanel extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$o, create_fragment$q, safe_not_equal, {
    			title: 1,
    			facets: 2,
    			groupSelection: 0,
    			addQuery: 3,
    			inputType: 4,
    			all: 5
    		});
    	}
    }

    /* src/Components/Design/Templates/Projects.svelte generated by Svelte v3.44.2 */

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	child_ctx[23] = i;
    	return child_ctx;
    }

    // (127:8) {#if workflowTaxonomies != []}
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

    	facetpanel = new FacetPanel({ props: facetpanel_props });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding));

    	return {
    		c() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p(new_ctx, dirty) {
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
    		i(local) {
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
    		o(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};
    }

    // (141:8) {#if techTaxonomies != []}
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

    	facetpanel = new FacetPanel({ props: facetpanel_props });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding_1));

    	return {
    		c() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p(new_ctx, dirty) {
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
    		i(local) {
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
    		o(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};
    }

    // (156:8) {#if yearArray != []}
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

    	facetpanel = new FacetPanel({ props: facetpanel_props });
    	binding_callbacks.push(() => bind(facetpanel, 'groupSelection', facetpanel_groupSelection_binding_2));

    	return {
    		c() {
    			div = element("div");
    			create_component(facetpanel.$$.fragment);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(facetpanel, div, null);
    			current = true;
    		},
    		p(new_ctx, dirty) {
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
    		i(local) {
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
    		o(local) {
    			transition_out(facetpanel.$$.fragment, local);
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: 176 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(facetpanel);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};
    }

    // (214:8) {:else}
    function create_else_block_1(ctx) {
    	let p;

    	return {
    		c() {
    			p = element("p");
    			p.textContent = "No projects like that :(";
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    // (174:8) {#if posts != '' && posts !== undefined && posts !== []}
    function create_if_block$8(ctx) {
    	let ul;
    	let current;
    	let each_value = /*posts*/ ctx[0];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(ul, "class", "w-full flex row flex-wrap md:flex md:justify-center");
    		},
    		m(target, anchor) {
    			insert(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*posts*/ 1) {
    				each_value = /*posts*/ ctx[0];
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
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (198:32) {:else}
    function create_else_block$2(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", "w-full h-full bg-grayWhite");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    // (192:32) {#if post._embedded['wp:featuredmedia']}
    function create_if_block_1$6(ctx) {
    	let img;
    	let img_src_value;

    	return {
    		c() {
    			img = element("img");
    			attr(img, "class", "w-full");
    			attr(img, "alt", "project");
    			if (!src_url_equal(img.src, img_src_value = /*post*/ ctx[21]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)) attr(img, "src", img_src_value);
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*posts*/ 1 && !src_url_equal(img.src, img_src_value = /*post*/ ctx[21]._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)) {
    				attr(img, "src", img_src_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    		}
    	};
    }

    // (184:24) <Link to="projects/{post.slug}">
    function create_default_slot$4(ctx) {
    	let div;
    	let t0;
    	let p;
    	let t1_value = /*post*/ ctx[21].title.rendered + "";
    	let t1;
    	let div_intro;
    	let div_outro;
    	let current;

    	function select_block_type_1(ctx, dirty) {
    		if (/*post*/ ctx[21]._embedded['wp:featuredmedia']) return create_if_block_1$6;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block = current_block_type(ctx);

    	return {
    		c() {
    			div = element("div");
    			if_block.c();
    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			attr(p, "class", "absolute text-lg text-white my-3 mx-3 svelte-qvmaqr");
    			set_style(p, "left", "0");
    			attr(div, "class", "thumb-container relative before w-full h-64 overflow-hidden flex justify-center items-center svelte-qvmaqr");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			if_block.m(div, null);
    			append(div, t0);
    			append(div, p);
    			append(p, t1);
    			current = true;
    		},
    		p(new_ctx, dirty) {
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

    			if ((!current || dirty & /*posts*/ 1) && t1_value !== (t1_value = /*post*/ ctx[21].title.rendered + "")) set_data(t1, t1_value);
    		},
    		i(local) {
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
    		o(local) {
    			if (div_intro) div_intro.invalidate();
    			div_outro = create_out_transition(div, fly, { y: -256 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if_block.d();
    			if (detaching && div_outro) div_outro.end();
    		}
    	};
    }

    // (176:16) {#each posts as post, i}
    function create_each_block$7(ctx) {
    	let li;
    	let link;
    	let t;
    	let li_intro;
    	let li_outro;
    	let current;

    	link = new Link({
    			props: {
    				to: "projects/" + /*post*/ ctx[21].slug,
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			li = element("li");
    			create_component(link.$$.fragment);
    			t = space();
    			attr(li, "class", "project-tile inline-block mb-16 mr-16 md:mr-0 overflow-hidden svelte-qvmaqr");
    			set_style(li, "width", "22em");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			mount_component(link, li, null);
    			append(li, t);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const link_changes = {};
    			if (dirty & /*posts*/ 1) link_changes.to = "projects/" + /*post*/ ctx[21].slug;

    			if (dirty & /*$$scope, posts*/ 16777217) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i(local) {
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
    		o(local) {
    			transition_out(link.$$.fragment, local);
    			if (li_intro) li_intro.invalidate();
    			li_outro = create_out_transition(li, fly, { y: 176 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			destroy_component(link);
    			if (detaching && li_outro) li_outro.end();
    		}
    	};
    }

    function create_fragment$r(ctx) {
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
    			props: { pageTagData: /*pageData*/ ctx[4] }
    		});

    	pagetitle = new PageTitle({ props: { title: "Projects" } });
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

    	return {
    		c() {
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
    			attr(p, "class", "text-gray-500");
    			attr(div0, "class", "w-64 sm:w-full mr-5 md:mr-0 mb-8");
    			attr(div1, "class", "sm:w-full");
    			attr(div2, "class", "flex sm:flex-wrap flex-row");
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, div2, anchor);
    			append(div2, div0);
    			mount_component(pagetitle, div0, null);
    			append(div0, t1);
    			append(div0, p);
    			append(div0, t3);
    			if (if_block0) if_block0.m(div0, null);
    			append(div0, t4);
    			if (if_block1) if_block1.m(div0, null);
    			append(div0, t5);
    			if (if_block2) if_block2.m(div0, null);
    			append(div2, t6);
    			append(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
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
    		o(local) {
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
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(div2);
    			destroy_component(pagetitle);
    			if (detaching && p_outro) p_outro.end();
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			if_blocks[current_block_type_index].d();
    		}
    	};
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { location } = $$props;

    	// variables
    	let posts = [];

    	let workflowTaxonomies = [];
    	let techTaxonomies = [];
    	let yearArray = [];
    	let pageData = {};
    	let storedState = "";
    	const apiURL = "http://localhost:8080/wp-json";
    	let queryParams = queryString.parse(location.search);

    	let workflowSelection = queryParams.workflow === undefined || queryParams.workflow === ""
    	? ""
    	: queryParams.workflow;

    	let techSelection = queryParams.tech === undefined || queryParams.tech === ""
    	? ""
    	: queryParams.tech;

    	let yearSelection = queryParams.year === undefined || queryParams.year === ""
    	? ""
    	: queryParams.year;

    	const getUnifiedQueryString = () => {
    		queryParams = queryString.parse(location.search);

    		let workflow = queryParams.workflow === undefined || queryParams.workflow === ""
    		? ""
    		: "workflow=" + queryParams.workflow;

    		let tech = queryParams.tech === undefined || queryParams.tech === ""
    		? ""
    		: "&tech=" + queryParams.tech;

    		let year = queryParams.year !== undefined && queryParams.year !== ""
    		? "&after=" + queryParams.year + "-01-00T00:00:00&before=" + (parseInt(queryParams.year) + 1) + "-01-00T00:00:00"
    		: "";

    		let unifiedQuery = `${workflow}${tech}${year}`;
    		return unifiedQuery;
    	};

    	const getData = async (query = "") => {
    		let [pageResponse, workflowTaxResponse, techTaxResponse, projResponse] = await Promise.all([
    			fetch(`${apiURL}/wp/v2/pages?slug=projects`),
    			fetch(`${apiURL}/wp/v2/workflow`),
    			fetch(`${apiURL}/wp/v2/tech`),
    			fetch(`${apiURL}/wp/v2/project?_embed&${getUnifiedQueryString()}`)
    		]);

    		let page = await pageResponse.json();

    		if (page[0] !== "") {
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
    		let workflow = "workflow=" + workflowSelection;
    		let tech = "tech=" + techSelection;
    		let year = "year=" + yearSelection;
    		let queryString = `${workflow}&${tech}&${year}`;
    		navigate("/projects/?" + queryString, { replace: false });
    	};

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

    class Projects extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$p, create_fragment$r, safe_not_equal, { location: 9 });
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
      })(typeof window !== "undefined" ? window : commonjsGlobal, function () {
        var Rellax = function (el, options) {

          var self = Object.create(Rellax.prototype);
          var posY = 0;
          var screenY = 0;
          var posX = 0;
          var screenX = 0;
          var blocks = [];
          var pause = true; // check what requestAnimationFrame to use, and if
          // it's not supported, use the onscroll event

          var loop = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
            return setTimeout(callback, 1000 / 60);
          }; // store the id for later use


          var loopId = null; // Test via a getter in the options object to see if the passive property is accessed

          var supportsPassive = false;

          try {
            var opts = Object.defineProperty({}, 'passive', {
              get: function () {
                supportsPassive = true;
              }
            });
            window.addEventListener("testPassive", null, opts);
            window.removeEventListener("testPassive", null, opts);
          } catch (e) {} // check what cancelAnimation method to use


          var clearLoop = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout; // check which transform property to use

          var transformProp = window.transformProp || function () {
            var testEl = document.createElement('div');

            if (testEl.style.transform === null) {
              var vendors = ['Webkit', 'Moz', 'ms'];

              for (var vendor in vendors) {
                if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                  return vendors[vendor] + 'Transform';
                }
              }
            }

            return 'transform';
          }(); // Default Settings


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
            callback: function () {}
          }; // User defined options (might have more in the future)

          if (options) {
            Object.keys(options).forEach(function (key) {
              self.options[key] = options[key];
            });
          }

          function validateCustomBreakpoints() {
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
            } // revert defaults if set incorrectly


            self.options.breakpoints = [576, 768, 1201];
            console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted");
          }

          if (options && options.breakpoints) {
            validateCustomBreakpoints();
          } // By default, rellax class


          if (!el) {
            el = '.rellax';
          } // check if el is a className or a node


          var elements = typeof el === 'string' ? document.querySelectorAll(el) : [el]; // Now query selector

          if (elements.length > 0) {
            self.elems = elements;
          } // The elements don't exist
          else {
            console.warn("Rellax: The elements you're trying to select don't exist.");
            return;
          } // Has a wrapper and it exists


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
          } // set a placeholder for the current breakpoint


          var currentBreakpoint; // helper to determine current breakpoint

          var getCurrentBreakpoint = function (w) {
            var bp = self.options.breakpoints;
            if (w < bp[0]) return 'xs';
            if (w >= bp[0] && w < bp[1]) return 'sm';
            if (w >= bp[1] && w < bp[2]) return 'md';
            return 'lg';
          }; // Get and cache initial position of all elements


          var cacheBlocks = function () {
            for (var i = 0; i < self.elems.length; i++) {
              var block = createBlock(self.elems[i]);
              blocks.push(block);
            }
          }; // Let's kick this script off
          // Build array for cached element values


          var init = function () {
            for (var i = 0; i < blocks.length; i++) {
              self.elems[i].style.cssText = blocks[i].style;
            }

            blocks = [];
            screenY = window.innerHeight;
            screenX = window.innerWidth;
            currentBreakpoint = getCurrentBreakpoint(screenX);
            setPosition();
            cacheBlocks();
            animate(); // If paused, unpause and set listener for window resizing events

            if (pause) {
              window.addEventListener('resize', init);
              pause = false; // Start the loop

              update();
            }
          }; // We want to cache the parallax blocks'
          // values: base, top, height, speed
          // el: is dom object, return: el cache values


          var createBlock = function (el) {
            var dataPercentage = el.getAttribute('data-rellax-percentage');
            var dataSpeed = el.getAttribute('data-rellax-speed');
            var dataXsSpeed = el.getAttribute('data-rellax-xs-speed');
            var dataMobileSpeed = el.getAttribute('data-rellax-mobile-speed');
            var dataTabletSpeed = el.getAttribute('data-rellax-tablet-speed');
            var dataDesktopSpeed = el.getAttribute('data-rellax-desktop-speed');
            var dataVerticalSpeed = el.getAttribute('data-rellax-vertical-speed');
            var dataHorizontalSpeed = el.getAttribute('data-rellax-horizontal-speed');
            var dataVericalScrollAxis = el.getAttribute('data-rellax-vertical-scroll-axis');
            var dataHorizontalScrollAxis = el.getAttribute('data-rellax-horizontal-scroll-axis');
            var dataZindex = el.getAttribute('data-rellax-zindex') || 0;
            var dataMin = el.getAttribute('data-rellax-min');
            var dataMax = el.getAttribute('data-rellax-max');
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
            } // initializing at scrollY = 0 (top of browser), scrollX = 0 (left of browser)
            // ensures elements are positioned based on HTML layout.
            //
            // If the element has the percentage attribute, the posY and posX needs to be
            // the current scroll position's value, so that the elements are still positioned based on HTML layout


            var wrapperPosY = self.options.wrapper ? self.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // If the option relativeToWrapper is true, use the wrappers offset to top, subtracted from the current page scroll.

            if (self.options.relativeToWrapper) {
              var scrollPosY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
              wrapperPosY = scrollPosY - self.options.wrapper.offsetTop;
            }

            var posY = self.options.vertical ? dataPercentage || self.options.center ? wrapperPosY : 0 : 0;
            var posX = self.options.horizontal ? dataPercentage || self.options.center ? self.options.wrapper ? self.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0 : 0;
            var blockTop = posY + el.getBoundingClientRect().top;
            var blockHeight = el.clientHeight || el.offsetHeight || el.scrollHeight;
            var blockLeft = posX + el.getBoundingClientRect().left;
            var blockWidth = el.clientWidth || el.offsetWidth || el.scrollWidth; // apparently parallax equation everyone uses

            var percentageY = dataPercentage ? dataPercentage : (posY - blockTop + screenY) / (blockHeight + screenY);
            var percentageX = dataPercentage ? dataPercentage : (posX - blockLeft + screenX) / (blockWidth + screenX);

            if (self.options.center) {
              percentageX = 0.5;
              percentageY = 0.5;
            } // Optional individual block speed as data attr, otherwise global speed


            var speed = breakpoints && mapBreakpoints[currentBreakpoint] !== null ? Number(mapBreakpoints[currentBreakpoint]) : dataSpeed ? dataSpeed : self.options.speed;
            var verticalSpeed = dataVerticalSpeed ? dataVerticalSpeed : self.options.verticalSpeed;
            var horizontalSpeed = dataHorizontalSpeed ? dataHorizontalSpeed : self.options.horizontalSpeed; // Optional individual block movement axis direction as data attr, otherwise gobal movement direction

            var verticalScrollAxis = dataVericalScrollAxis ? dataVericalScrollAxis : self.options.verticalScrollAxis;
            var horizontalScrollAxis = dataHorizontalScrollAxis ? dataHorizontalScrollAxis : self.options.horizontalScrollAxis;
            var bases = updatePosition(percentageX, percentageY, speed, verticalSpeed, horizontalSpeed); // ~~Store non-translate3d transforms~~
            // Store inline styles and extract transforms

            var style = el.style.cssText;
            var transform = ''; // Check if there's an inline styled transform

            var searchResult = /transform\s*:/i.exec(style);

            if (searchResult) {
              // Get the index of the transform
              var index = searchResult.index; // Trim the style to the transform point and get the following semi-colon index

              var trimmedStyle = style.slice(index);
              var delimiter = trimmedStyle.indexOf(';'); // Remove "transform" string and save the attribute

              if (delimiter) {
                transform = " " + trimmedStyle.slice(11, delimiter).replace(/\s/g, '');
              } else {
                transform = " " + trimmedStyle.slice(11).replace(/\s/g, '');
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
          }; // set scroll position (posY, posX)
          // side effect method is not ideal, but okay for now
          // returns true if the scroll changed, false if nothing happened


          var setPosition = function () {
            var oldY = posY;
            var oldX = posX;
            posY = self.options.wrapper ? self.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
            posX = self.options.wrapper ? self.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset; // If option relativeToWrapper is true, use relative wrapper value instead.

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
            } // scroll did not change


            return false;
          }; // Ahh a pure function, gets new transform value
          // based on scrollPosition and speed
          // Allow for decimal pixel values


          var updatePosition = function (percentageX, percentageY, speed, verticalSpeed, horizontalSpeed) {
            var result = {};
            var valueX = (horizontalSpeed ? horizontalSpeed : speed) * (100 * (1 - percentageX));
            var valueY = (verticalSpeed ? verticalSpeed : speed) * (100 * (1 - percentageY));
            result.x = self.options.round ? Math.round(valueX) : Math.round(valueX * 100) / 100;
            result.y = self.options.round ? Math.round(valueY) : Math.round(valueY * 100) / 100;
            return result;
          }; // Remove event listeners and loop again


          var deferredUpdate = function () {
            window.removeEventListener('resize', deferredUpdate);
            window.removeEventListener('orientationchange', deferredUpdate);
            (self.options.wrapper ? self.options.wrapper : window).removeEventListener('scroll', deferredUpdate);
            (self.options.wrapper ? self.options.wrapper : document).removeEventListener('touchmove', deferredUpdate); // loop again

            loopId = loop(update);
          }; // Loop


          var update = function () {
            if (setPosition() && pause === false) {
              animate(); // loop again

              loopId = loop(update);
            } else {
              loopId = null; // Don't animate until we get a position updating event

              window.addEventListener('resize', deferredUpdate);
              window.addEventListener('orientationchange', deferredUpdate);
              (self.options.wrapper ? self.options.wrapper : window).addEventListener('scroll', deferredUpdate, supportsPassive ? {
                passive: true
              } : false);
              (self.options.wrapper ? self.options.wrapper : document).addEventListener('touchmove', deferredUpdate, supportsPassive ? {
                passive: true
              } : false);
            }
          }; // Transform3d on parallax element


          var animate = function () {
            var positions;

            for (var i = 0; i < self.elems.length; i++) {
              // Determine relevant movement directions
              var verticalScrollAxis = blocks[i].verticalScrollAxis.toLowerCase();
              var horizontalScrollAxis = blocks[i].horizontalScrollAxis.toLowerCase();
              var verticalScrollX = verticalScrollAxis.indexOf("x") != -1 ? posY : 0;
              var verticalScrollY = verticalScrollAxis.indexOf("y") != -1 ? posY : 0;
              var horizontalScrollX = horizontalScrollAxis.indexOf("x") != -1 ? posX : 0;
              var horizontalScrollY = horizontalScrollAxis.indexOf("y") != -1 ? posX : 0;
              var percentageY = (verticalScrollY + horizontalScrollY - blocks[i].top + screenY) / (blocks[i].height + screenY);
              var percentageX = (verticalScrollX + horizontalScrollX - blocks[i].left + screenX) / (blocks[i].width + screenX); // Subtracting initialize value, so element stays in same spot as HTML

              positions = updatePosition(percentageX, percentageY, blocks[i].speed, blocks[i].verticalSpeed, blocks[i].horizontalSpeed);
              var positionY = positions.y - blocks[i].baseY;
              var positionX = positions.x - blocks[i].baseX; // The next two "if" blocks go like this:
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
              } // Check if directional min limits are defined


              if (blocks[i].minY != null) {
                positionY = positionY <= blocks[i].minY ? blocks[i].minY : positionY;
              }

              if (blocks[i].minX != null) {
                positionX = positionX <= blocks[i].minX ? blocks[i].minX : positionX;
              } // Check if a max limit is defined


              if (blocks[i].max !== null) {
                if (self.options.vertical && !self.options.horizontal) {
                  positionY = positionY >= blocks[i].max ? blocks[i].max : positionY;
                }

                if (self.options.horizontal && !self.options.vertical) {
                  positionX = positionX >= blocks[i].max ? blocks[i].max : positionX;
                }
              } // Check if directional max limits are defined


              if (blocks[i].maxY != null) {
                positionY = positionY >= blocks[i].maxY ? blocks[i].maxY : positionY;
              }

              if (blocks[i].maxX != null) {
                positionX = positionX >= blocks[i].maxX ? blocks[i].maxX : positionX;
              }

              var zindex = blocks[i].zindex; // Move that element
              // (Set the new translation and append initial inline transforms.)

              var translate = 'translate3d(' + (self.options.horizontal ? positionX : '0') + 'px,' + (self.options.vertical ? positionY : '0') + 'px,' + zindex + 'px) ' + blocks[i].transform;
              self.elems[i].style[transformProp] = translate;
            }

            self.options.callback(positions);
          };

          self.destroy = function () {
            for (var i = 0; i < self.elems.length; i++) {
              self.elems[i].style.cssText = blocks[i].style;
            } // Remove resize event listener if not pause, and pause


            if (!pause) {
              window.removeEventListener('resize', init);
              pause = true;
            } // Clear the animation loop to prevent possible memory leak


            clearLoop(loopId);
            loopId = null;
          }; // Init


          init(); // Allow to recalculate the initial values whenever we want

          self.refresh = init;
          return self;
        };

        return Rellax;
      });
    });

    /* src/Components/Design/Molecules/BrowserFrame.svelte generated by Svelte v3.44.2 */

    function create_else_block$3(ctx) {
    	let button;
    	let t;

    	return {
    		c() {
    			button = element("button");
    			t = text(/*name*/ ctx[1]);
    			attr(button, "class", "mt-2 -mb-1 uppercase text-xs font-semibold tracking-wideset rounded-md px-4 py-2 bg-gray-300 cursor-default");
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*name*/ 2) set_data(t, /*name*/ ctx[1]);
    		},
    		d(detaching) {
    			if (detaching) detach(button);
    		}
    	};
    }

    // (56:16) {#if siteURL !== ''}
    function create_if_block_1$7(ctx) {
    	let a;
    	let button;

    	return {
    		c() {
    			a = element("a");
    			button = element("button");

    			button.innerHTML = `Click to view site
                            <i class="fas fa-link ml-2"></i>`;

    			attr(button, "class", "mt-2 -mb-1 uppercase text-xs font-semibold tracking-wideset underline rounded-md px-4 py-2 bg-gray-300");
    			attr(a, "href", /*siteURL*/ ctx[2]);
    			attr(a, "target", "_blank");
    		},
    		m(target, anchor) {
    			insert(target, a, anchor);
    			append(a, button);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*siteURL*/ 4) {
    				attr(a, "href", /*siteURL*/ ctx[2]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(a);
    		}
    	};
    }

    // (90:8) {#if image != {}}
    function create_if_block$9(ctx) {
    	let img;
    	let img_alt_value;
    	let img_src_value;

    	return {
    		c() {
    			img = element("img");
    			attr(img, "class", "w-full");
    			attr(img, "alt", img_alt_value = /*image*/ ctx[0].alt);
    			if (!src_url_equal(img.src, img_src_value = /*image*/ ctx[0].source_url)) attr(img, "src", img_src_value);
    		},
    		m(target, anchor) {
    			insert(target, img, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*image*/ 1 && img_alt_value !== (img_alt_value = /*image*/ ctx[0].alt)) {
    				attr(img, "alt", img_alt_value);
    			}

    			if (dirty & /*image*/ 1 && !src_url_equal(img.src, img_src_value = /*image*/ ctx[0].source_url)) {
    				attr(img, "src", img_src_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(img);
    		}
    	};
    }

    function create_fragment$s(ctx) {
    	let div8;
    	let div7;
    	let header;
    	let div4;
    	let t0;
    	let div3;
    	let t3;
    	let div6;
    	let div5;
    	let p;
    	let t4;
    	let div7_intro;
    	let div7_outro;
    	let div8_intro;
    	let div8_outro;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*siteURL*/ ctx[2] !== '') return create_if_block_1$7;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*image*/ ctx[0] != {} && create_if_block$9(ctx);

    	return {
    		c() {
    			div8 = element("div");
    			div7 = element("div");
    			header = element("header");
    			div4 = element("div");
    			if_block0.c();
    			t0 = space();
    			div3 = element("div");

    			div3.innerHTML = `<div class="w-3 h-3 rounded-full bg-gray-100"></div> 
                    <div class="w-3 h-3 rounded-full bg-gray-100"></div> 
                    <div class="w-3 h-3 rounded-full bg-gray-100"></div>`;

    			t3 = space();
    			div6 = element("div");
    			div5 = element("div");
    			p = element("p");
    			t4 = space();
    			if (if_block1) if_block1.c();
    			attr(div3, "class", "w-12 h-4 mt-1 mr-2 flex justify-between");
    			attr(div4, "class", "flex justify-between");
    			set_style(p, "font-size", "0.75em");
    			attr(div5, "class", "w-full h-full mx-2 my-px px-2 border-2 bg-white");
    			attr(div6, "class", "w-full flex h-6 bg-gray-300");
    			attr(header, "class", "w-full h-16");
    			attr(div7, "class", "browser-frame w-full rounded-md bg-gray-500 shadow-2xl svelte-in2oh3");
    			attr(div8, "class", "-ml-24 md:ml-0 lg:px-12 px-16 lg:py-12 py-20");
    			set_style(div8, "overflow", "hidden");
    		},
    		m(target, anchor) {
    			insert(target, div8, anchor);
    			append(div8, div7);
    			append(div7, header);
    			append(header, div4);
    			if_block0.m(div4, null);
    			append(div4, t0);
    			append(div4, div3);
    			append(header, t3);
    			append(header, div6);
    			append(div6, div5);
    			append(div5, p);
    			p.innerHTML = /*cleanedURL*/ ctx[3];
    			append(div7, t4);
    			if (if_block1) if_block1.m(div7, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div4, t0);
    				}
    			}

    			if (!current || dirty & /*cleanedURL*/ 8) p.innerHTML = /*cleanedURL*/ ctx[3];
    			if (/*image*/ ctx[0] != {}) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$9(ctx);
    					if_block1.c();
    					if_block1.m(div7, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div7_outro) div7_outro.end(1);
    				div7_intro = create_in_transition(div7, /*rotateHang*/ ctx[4], { duration: 2000, delay: 1500 });
    				div7_intro.start();
    			});

    			add_render_callback(() => {
    				if (div8_outro) div8_outro.end(1);
    				div8_intro = create_in_transition(div8, fly, { x: 50, delay: 2000 });
    				div8_intro.start();
    			});

    			current = true;
    		},
    		o(local) {
    			if (div7_intro) div7_intro.invalidate();
    			div7_outro = create_out_transition(div7, fly, { x: -400 });
    			if (div8_intro) div8_intro.invalidate();
    			div8_outro = create_out_transition(div8, fly, { x: 200 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div8);
    			if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching && div7_outro) div7_outro.end();
    			if (detaching && div8_outro) div8_outro.end();
    		}
    	};
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { image = {}, name = "", siteURL = "" } = $$props;
    	let cleanedURL = "";

    	const cleanURL = () => {
    		let reg = /http.?:\/\//;
    		let match = reg.exec(siteURL);
    		$$invalidate(3, cleanedURL = siteURL.replace(reg, '<span class="text-gray-600">' + match + "</span>"));
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

    	$$self.$$set = $$props => {
    		if ('image' in $$props) $$invalidate(0, image = $$props.image);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('siteURL' in $$props) $$invalidate(2, siteURL = $$props.siteURL);
    	};

    	return [image, name, siteURL, cleanedURL, rotateHang];
    }

    class BrowserFrame extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$q, create_fragment$s, safe_not_equal, { image: 0, name: 1, siteURL: 2 });
    	}
    }

    /* src/Components/Design/Molecules/ProjectDetailHeader.svelte generated by Svelte v3.44.2 */

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

    // (40:0) <Link to="projects">
    function create_default_slot$5(ctx) {
    	let i;
    	let i_intro;
    	let i_outro;
    	let current;

    	return {
    		c() {
    			i = element("i");
    			i.textContent = "Projects";
    		},
    		m(target, anchor) {
    			insert(target, i, anchor);
    			current = true;
    		},
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (i_outro) i_outro.end(1);
    				i_intro = create_in_transition(i, fade, { duration: 2000, delay: 2000 });
    				i_intro.start();
    			});

    			current = true;
    		},
    		o(local) {
    			if (i_intro) i_intro.invalidate();
    			i_outro = create_out_transition(i, fade, {});
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(i);
    			if (detaching && i_outro) i_outro.end();
    		}
    	};
    }

    // (55:8) {#if workflows !== []}
    function create_if_block_4$2(ctx) {
    	let div;
    	let dt;
    	let t1;
    	let each_value_2 = /*workflows*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	return {
    		c() {
    			div = element("div");
    			dt = element("dt");
    			dt.textContent = "Worflow";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(dt, "class", "svelte-15lqiar");
    			attr(div, "class", "mr-10");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, dt);
    			append(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*workflows*/ 2) {
    				each_value_2 = /*workflows*/ ctx[1];
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
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (58:16) {#each workflows as workflow}
    function create_each_block_2$1(ctx) {
    	let dd;
    	let t_value = /*workflow*/ ctx[15].name + "";
    	let t;

    	return {
    		c() {
    			dd = element("dd");
    			t = text(t_value);
    			attr(dd, "class", "svelte-15lqiar");
    		},
    		m(target, anchor) {
    			insert(target, dd, anchor);
    			append(dd, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*workflows*/ 2 && t_value !== (t_value = /*workflow*/ ctx[15].name + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(dd);
    		}
    	};
    }

    // (63:8) {#if tech !== []}
    function create_if_block_3$2(ctx) {
    	let div;
    	let dt;
    	let t1;
    	let each_value_1 = /*tech*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	return {
    		c() {
    			div = element("div");
    			dt = element("dt");
    			dt.textContent = "Tech";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(dt, "class", "svelte-15lqiar");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, dt);
    			append(div, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*tech*/ 4) {
    				each_value_1 = /*tech*/ ctx[2];
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
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (66:16) {#each tech as techItem}
    function create_each_block_1$2(ctx) {
    	let dd;
    	let t_value = /*techItem*/ ctx[12].name + "";
    	let t;

    	return {
    		c() {
    			dd = element("dd");
    			t = text(t_value);
    			attr(dd, "class", "svelte-15lqiar");
    		},
    		m(target, anchor) {
    			insert(target, dd, anchor);
    			append(dd, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*tech*/ 4 && t_value !== (t_value = /*techItem*/ ctx[12].name + "")) set_data(t, t_value);
    		},
    		d(detaching) {
    			if (detaching) detach(dd);
    		}
    	};
    }

    // (76:8) {#if projectSize !== undefined}
    function create_if_block_2$4(ctx) {
    	let dt;
    	let t1;
    	let dd;
    	let t2;

    	return {
    		c() {
    			dt = element("dt");
    			dt.textContent = "Project Size";
    			t1 = space();
    			dd = element("dd");
    			t2 = text(/*projectSize*/ ctx[5]);
    			attr(dt, "class", "svelte-15lqiar");
    			attr(dd, "class", "svelte-15lqiar");
    		},
    		m(target, anchor) {
    			insert(target, dt, anchor);
    			insert(target, t1, anchor);
    			insert(target, dd, anchor);
    			append(dd, t2);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*projectSize*/ 32) set_data(t2, /*projectSize*/ ctx[5]);
    		},
    		d(detaching) {
    			if (detaching) detach(dt);
    			if (detaching) detach(t1);
    			if (detaching) detach(dd);
    		}
    	};
    }

    // (80:8) {#if year !== ''}
    function create_if_block_1$8(ctx) {
    	let dt;
    	let t1;
    	let dd;
    	let t2;

    	return {
    		c() {
    			dt = element("dt");
    			dt.textContent = "Year";
    			t1 = space();
    			dd = element("dd");
    			t2 = text(/*year*/ ctx[3]);
    			attr(dt, "class", "svelte-15lqiar");
    			attr(dd, "class", "svelte-15lqiar");
    		},
    		m(target, anchor) {
    			insert(target, dt, anchor);
    			insert(target, t1, anchor);
    			insert(target, dd, anchor);
    			append(dd, t2);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*year*/ 8) set_data(t2, /*year*/ ctx[3]);
    		},
    		d(detaching) {
    			if (detaching) detach(dt);
    			if (detaching) detach(t1);
    			if (detaching) detach(dd);
    		}
    	};
    }

    // (85:4) {#if swatch !== []}
    function create_if_block$a(ctx) {
    	let div1;
    	let dt;
    	let t1;
    	let div0;
    	let div1_intro;
    	let div1_outro;
    	let current;
    	let each_value = /*swatch*/ ctx[4];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	return {
    		c() {
    			div1 = element("div");
    			dt = element("dt");
    			dt.textContent = "Color Swatch";
    			t1 = space();
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(dt, "class", "svelte-15lqiar");
    			attr(div0, "class", "flex flex-wrap w-1/2 lg:w-full -ml-2");
    		},
    		m(target, anchor) {
    			insert(target, div1, anchor);
    			append(div1, dt);
    			append(div1, t1);
    			append(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty & /*swatch*/ 16) {
    				each_value = /*swatch*/ ctx[4];
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
    		i(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (div1_outro) div1_outro.end(1);
    				div1_intro = create_in_transition(div1, fly, { y: -50, delay: 1750, duration: 1000 });
    				div1_intro.start();
    			});

    			current = true;
    		},
    		o(local) {
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: -50, duration: 500 });
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div1_outro) div1_outro.end();
    		}
    	};
    }

    // (92:16) {#each swatch as color}
    function create_each_block$8(ctx) {
    	let dd;
    	let dd_style_value;

    	return {
    		c() {
    			dd = element("dd");
    			attr(dd, "class", "rounded-full w-12 h-12 shadow-lg mx-2 my-1 svelte-15lqiar");
    			attr(dd, "style", dd_style_value = `background-color: ${/*color*/ ctx[9].color};`);
    		},
    		m(target, anchor) {
    			insert(target, dd, anchor);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*swatch*/ 16 && dd_style_value !== (dd_style_value = `background-color: ${/*color*/ ctx[9].color};`)) {
    				attr(dd, "style", dd_style_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(dd);
    		}
    	};
    }

    function create_fragment$t(ctx) {
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
    			}
    		});

    	pagetitle = new PageTitle({
    			props: {
    				title: /*brandName*/ ctx[0],
    				containerClass: "-ml-10 text-6xl",
    				className: "text-6xl lg:text-3xl flex tracking-widest overflow-hidden",
    				height: "192"
    			}
    		});

    	let if_block0 = /*workflows*/ ctx[1] !== [] && create_if_block_4$2(ctx);
    	let if_block1 = /*tech*/ ctx[2] !== [] && create_if_block_3$2(ctx);
    	let if_block2 = /*projectSize*/ ctx[5] !== undefined && create_if_block_2$4(ctx);
    	let if_block3 = /*year*/ ctx[3] !== '' && create_if_block_1$8(ctx);
    	let if_block4 = /*swatch*/ ctx[4] !== [] && create_if_block$a(ctx);

    	return {
    		c() {
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
    			attr(div0, "class", "flex w-1/2 justify-between");
    			attr(dl, "class", "project-deets mt-5 svelte-15lqiar");
    		},
    		m(target, anchor) {
    			mount_component(link, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(pagetitle, target, anchor);
    			insert(target, t1, anchor);
    			insert(target, dl, anchor);
    			append(dl, div0);
    			if (if_block0) if_block0.m(div0, null);
    			append(div0, t2);
    			if (if_block1) if_block1.m(div0, null);
    			append(div0, t3);
    			append(dl, div1);
    			if (if_block2) if_block2.m(div1, null);
    			append(div1, t4);
    			if (if_block3) if_block3.m(div1, null);
    			append(div1, t5);
    			if (if_block4) if_block4.m(dl, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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

    			if (/*projectSize*/ ctx[5] !== undefined) {
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
    					if_block3 = create_if_block_1$8(ctx);
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
    		i(local) {
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
    		o(local) {
    			transition_out(link.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { y: -100, duration: 1000 });
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: 50, duration: 500 });
    			transition_out(if_block4);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(link, detaching);
    			if (detaching) detach(t0);
    			destroy_component(pagetitle, detaching);
    			if (detaching) detach(t1);
    			if (detaching) detach(dl);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (detaching && div0_outro) div0_outro.end();
    			if (if_block2) if_block2.d();
    			if (if_block3) if_block3.d();
    			if (detaching && div1_outro) div1_outro.end();
    			if (if_block4) if_block4.d();
    		}
    	};
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { projectData = {} } = $$props;
    	let title = "";
    	let brandName = "";
    	let workflows = [];
    	let tech = [];
    	let year = "";
    	let swatch = [];
    	let projectSize = "";

    	onMount(async () => {
    		if (projectData[0] !== {}) {
    			title = projectData.title.rendered;

    			$$invalidate(0, brandName = projectData.acf.brand_name
    			? projectData.acf.brand_name
    			: title);

    			$$invalidate(1, workflows = projectData._embedded["wp:term"].filter(term => term[0].taxonomy == "workflow")[0]);
    			$$invalidate(2, tech = projectData._embedded["wp:term"].filter(term => term[0].taxonomy == "tech")[0]);
    			$$invalidate(3, year = projectData.year);
    			$$invalidate(4, swatch = projectData.acf.swatch);
    			$$invalidate(5, projectSize = projectData.acf.project_size);
    		}
    	});

    	$$self.$$set = $$props => {
    		if ('projectData' in $$props) $$invalidate(6, projectData = $$props.projectData);
    	};

    	return [brandName, workflows, tech, year, swatch, projectSize, projectData];
    }

    class ProjectDetailHeader extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$r, create_fragment$t, safe_not_equal, { projectData: 6 });
    	}
    }

    /* src/Components/Design/Templates/ProjectSingle.svelte generated by Svelte v3.44.2 */

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
    			props: { pageTagData: /*pageData*/ ctx[1] }
    		});

    	projectdetailheader = new ProjectDetailHeader({
    			props: { projectData: /*pageData*/ ctx[1] }
    		});

    	browserframe = new BrowserFrame({
    			props: {
    				image: /*featuredImage*/ ctx[3],
    				name: /*pageData*/ ctx[1].title.rendered,
    				siteURL: /*url*/ ctx[2]
    			}
    		});

    	link0 = new Link({
    			props: {
    				to: `projects/`,
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			}
    		});

    	link1 = new Link({
    			props: {
    				to: `contact/`,
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
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
    			attr(div0, "class", "fixed bg-black md:hidden w-1/2 h-screen -mr-8 top-0 right-0");
    			set_style(div0, "z-index", "-1");
    			attr(div1, "class", "md:w-full md:mt-16 w-1/2 pr-12 rellax");
    			attr(div1, "data-rellax-speed", "7");
    			attr(div1, "data-rellax-xs-speed", "1");
    			attr(div1, "data-rellax-mobile-speed", "1");
    			attr(div2, "class", "md:w-full w-1/2");
    			attr(div3, "class", "flex md:flex-col-reverse");
    			attr(div4, "class", "project-content");
    			attr(h2, "class", "text-3xl w-full mb-5");
    			attr(div5, "class", "flex md:justify-center md:w-full");
    			attr(div6, "class", "flex flex-wrap w-3/4 md:w-full md:text-center text-left bg-white shadow-2xl mt-12 mb-16 -ml-24 p-8 md:p-5 rounded-l-lg");
    			attr(div7, "class", "flex justify-end");
    			attr(div7, "data-aos", "fade-left");
    			attr(div7, "data-aos-delay", "600");
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, div0, anchor);
    			insert(target, t1, anchor);
    			insert(target, div3, anchor);
    			append(div3, div1);
    			mount_component(projectdetailheader, div1, null);
    			append(div3, t2);
    			append(div3, div2);
    			mount_component(browserframe, div2, null);
    			insert(target, t3, anchor);
    			insert(target, div4, anchor);
    			div4.innerHTML = /*content*/ ctx[4];
    			insert(target, t4, anchor);
    			insert(target, div7, anchor);
    			append(div7, div6);
    			append(div6, h2);
    			append(div6, t6);
    			append(div6, div5);
    			mount_component(link0, div5, null);
    			append(div5, t7);
    			mount_component(link1, div5, null);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const projectdetailheader_changes = {};
    			if (dirty & /*pageData*/ 2) projectdetailheader_changes.projectData = /*pageData*/ ctx[1];
    			projectdetailheader.$set(projectdetailheader_changes);
    			const browserframe_changes = {};
    			if (dirty & /*featuredImage*/ 8) browserframe_changes.image = /*featuredImage*/ ctx[3];
    			if (dirty & /*pageData*/ 2) browserframe_changes.name = /*pageData*/ ctx[1].title.rendered;
    			if (dirty & /*url*/ 4) browserframe_changes.siteURL = /*url*/ ctx[2];
    			browserframe.$set(browserframe_changes);
    			if (!current || dirty & /*content*/ 16) div4.innerHTML = /*content*/ ctx[4];			const link0_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    		},
    		i(local) {
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
    		o(local) {
    			transition_out(head.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { x: 500, duration: 1000 });
    			transition_out(projectdetailheader.$$.fragment, local);
    			transition_out(browserframe.$$.fragment, local);
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(div0);
    			if (detaching && div0_outro) div0_outro.end();
    			if (detaching) detach(t1);
    			if (detaching) detach(div3);
    			destroy_component(projectdetailheader);
    			destroy_component(browserframe);
    			if (detaching) detach(t3);
    			if (detaching) detach(div4);
    			if (detaching) detach(t4);
    			if (detaching) detach(div7);
    			destroy_component(link0);
    			destroy_component(link1);
    		}
    	};
    }

    // (103:20) <Button priority="primary" className="mr-5">
    function create_default_slot_3$1(ctx) {
    	let t;
    	let html_tag;
    	let html_anchor;

    	return {
    		c() {
    			t = text("See all\n                        ");
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    			html_tag.m(arrow$1, target, anchor);
    			insert(target, html_anchor, anchor);
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(t);
    			if (detaching) detach(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};
    }

    // (102:16) <Link to="{`projects/`}">
    function create_default_slot_2$1(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "primary",
    				className: "mr-5",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    // (109:20) <Button priority="tertiary">
    function create_default_slot_1$3(ctx) {
    	let t;

    	return {
    		c() {
    			t = text("Contact me");
    		},
    		m(target, anchor) {
    			insert(target, t, anchor);
    		},
    		d(detaching) {
    			if (detaching) detach(t);
    		}
    	};
    }

    // (108:16) <Link to="{`contact/`}">
    function create_default_slot$6(ctx) {
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				priority: "tertiary",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			}
    		});

    	return {
    		c() {
    			create_component(button.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 1024) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(button, detaching);
    		}
    	};
    }

    function create_fragment$u(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*data*/ ctx[0] != '' && create_if_block$b(ctx);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }
    let arrow$1 = '<i class="ml-5 fas fa-chevron-circle-right">';

    function instance$s($$self, $$props, $$invalidate) {
    	let { slug } = $$props;
    	let { template = "project-single" } = $$props;
    	let storedState;
    	let data = [];
    	let pageData = [];
    	let url = "";
    	let featuredImage = {};
    	let content = "";
    	const apiURL = "http://localhost:8080/wp-json";

    	const getData = async () => {
    		const res = await fetch(`${apiURL}/wp/v2/project/?slug=${slug}&_embed`);
    		const json = await res.json();
    		$$invalidate(0, data = json);

    		if (data[0] !== undefined) {
    			$$invalidate(1, pageData = data[0]);
    			$$invalidate(2, url = pageData.acf.site_url);
    			$$invalidate(3, featuredImage = pageData._embedded["wp:featuredmedia"][0].media_details.sizes.large);
    			$$invalidate(4, content = pageData.content.rendered);
    		}

    		storedState = slug;
    	};

    	onMount(async () => {
    		$$invalidate(5, template = "project-single");
    		getData();

    		setTimeout(
    			function () {
    				var rellax$1 = new rellax(".rellax", { breakpoints: [639, 767, 1201] });
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
    		$$invalidate(5, template = "");
    	});

    	$$self.$$set = $$props => {
    		if ('slug' in $$props) $$invalidate(6, slug = $$props.slug);
    		if ('template' in $$props) $$invalidate(5, template = $$props.template);
    	};

    	return [data, pageData, url, featuredImage, content, template, slug];
    }

    class ProjectSingle extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$s, create_fragment$u, safe_not_equal, { slug: 6, template: 5 });
    	}
    }

    /* src/Components/Design/Templates/NotFound.svelte generated by Svelte v3.44.2 */

    function create_fragment$v(ctx) {
    	let head;
    	let t0;
    	let section;
    	let pagetitle;
    	let t1;
    	let html_tag;
    	let section_intro;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[0] }
    		});

    	pagetitle = new PageTitle({ props: { title: /*title*/ ctx[1] } });

    	return {
    		c() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			html_tag = new HtmlTag();
    			html_tag.a = null;
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, section, anchor);
    			mount_component(pagetitle, section, null);
    			append(section, t1);
    			html_tag.m(/*content*/ ctx[2], section);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			const head_changes = {};
    			if (dirty & /*pageData*/ 1) head_changes.pageTagData = /*pageData*/ ctx[0];
    			head.$set(head_changes);
    			const pagetitle_changes = {};
    			if (dirty & /*title*/ 2) pagetitle_changes.title = /*title*/ ctx[1];
    			pagetitle.$set(pagetitle_changes);
    			if (!current || dirty & /*content*/ 4) html_tag.p(/*content*/ ctx[2]);
    		},
    		i(local) {
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
    		o(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(section);
    			destroy_component(pagetitle);
    		}
    	};
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let data = [];
    	let metaFields = [];
    	let pageData = {};
    	let title = "";
    	let content = "";
    	const apiURL = "http://localhost:8080/wp-json";

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

    	return [pageData, title, content];
    }

    class NotFound extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$t, create_fragment$v, safe_not_equal, {});
    	}
    }

    const defer = () => {
      var res, rej;
      var promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      promise.resolve = res;
      promise.reject = rej;
      return promise;
    };

    const browser = (() => {
      return typeof window === "object" && typeof window.document === "object";
    })();

    /**
     * Helpers.
     */
    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    /**
     * Parse or format the given `val`.
     *
     * Options:
     *
     *  - `long` verbose formatting [false]
     *
     * @param {String|Number} val
     * @param {Object} [options]
     * @throws {Error} throw an error if val is not a non-empty string or a number
     * @return {String|Number}
     * @api public
     */

    var ms = function (val, options) {
      options = options || {};
      var type = typeof val;

      if (type === 'string' && val.length > 0) {
        return parse(val);
      } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }

      throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
    };
    /**
     * Parse the given `str` and return milliseconds.
     *
     * @param {String} str
     * @return {Number}
     * @api private
     */


    function parse(str) {
      str = String(str);

      if (str.length > 100) {
        return;
      }

      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

      if (!match) {
        return;
      }

      var n = parseFloat(match[1]);
      var type = (match[2] || 'ms').toLowerCase();

      switch (type) {
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
          return n * y;

        case 'weeks':
        case 'week':
        case 'w':
          return n * w;

        case 'days':
        case 'day':
        case 'd':
          return n * d;

        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
          return n * h;

        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
          return n * m;

        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
          return n * s;

        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
          return n;

        default:
          return undefined;
      }
    }
    /**
     * Short format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */


    function fmtShort(ms) {
      var msAbs = Math.abs(ms);

      if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
      }

      if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
      }

      if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
      }

      if (msAbs >= s) {
        return Math.round(ms / s) + 's';
      }

      return ms + 'ms';
    }
    /**
     * Long format for `ms`.
     *
     * @param {Number} ms
     * @return {String}
     * @api private
     */


    function fmtLong(ms) {
      var msAbs = Math.abs(ms);

      if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
      }

      if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
      }

      if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
      }

      if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
      }

      return ms + ' ms';
    }
    /**
     * Pluralization helper.
     */


    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
    }

    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     */

    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = ms;
      createDebug.destroy = destroy;
      Object.keys(env).forEach(key => {
        createDebug[key] = env[key];
      });
      /**
      * The currently active debug mode names, and names to skip.
      */

      createDebug.names = [];
      createDebug.skips = [];
      /**
      * Map of special "%n" handling functions, for the debug "format" argument.
      *
      * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
      */

      createDebug.formatters = {};
      /**
      * Selects a color for a debug namespace
      * @param {String} namespace The namespace string for the for the debug instance to be colored
      * @return {Number|String} An ANSI color code for the given namespace
      * @api private
      */

      function selectColor(namespace) {
        let hash = 0;

        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
        }

        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }

      createDebug.selectColor = selectColor;
      /**
      * Create a debugger with the given `namespace`.
      *
      * @param {String} namespace
      * @return {Function}
      * @api public
      */

      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;

        function debug(...args) {
          // Disabled?
          if (!debug.enabled) {
            return;
          }

          const self = debug; // Set `diff` timestamp

          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);

          if (typeof args[0] !== 'string') {
            // Anything else let's inspect with %O
            args.unshift('%O');
          } // Apply any `formatters` transformations


          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            // If we encounter an escaped % then don't increase the array index
            if (match === '%%') {
              return '%';
            }

            index++;
            const formatter = createDebug.formatters[format];

            if (typeof formatter === 'function') {
              const val = args[index];
              match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

              args.splice(index, 1);
              index--;
            }

            return match;
          }); // Apply env-specific formatting (colors, etc.)

          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }

        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

        Object.defineProperty(debug, 'enabled', {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }

            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }

            return enabledCache;
          },
          set: v => {
            enableOverride = v;
          }
        }); // Env-specific initialization logic for debug instances

        if (typeof createDebug.init === 'function') {
          createDebug.init(debug);
        }

        return debug;
      }

      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      /**
      * Enables a debug mode by namespaces. This can include modes
      * separated by a colon and wildcards.
      *
      * @param {String} namespaces
      * @api public
      */


      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        const len = split.length;

        for (i = 0; i < len; i++) {
          if (!split[i]) {
            // ignore empty strings
            continue;
          }

          namespaces = split[i].replace(/\*/g, '.*?');

          if (namespaces[0] === '-') {
            createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
          } else {
            createDebug.names.push(new RegExp('^' + namespaces + '$'));
          }
        }
      }
      /**
      * Disable debug output.
      *
      * @return {String} namespaces
      * @api public
      */


      function disable() {
        const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
        createDebug.enable('');
        return namespaces;
      }
      /**
      * Returns true if the given mode name is enabled, false otherwise.
      *
      * @param {String} name
      * @return {Boolean}
      * @api public
      */


      function enabled(name) {
        if (name[name.length - 1] === '*') {
          return true;
        }

        let i;
        let len;

        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }

        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }

        return false;
      }
      /**
      * Convert regexp to namespace
      *
      * @param {RegExp} regxep
      * @return {String} namespace
      * @api private
      */


      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
      }
      /**
      * Coerce `val`.
      *
      * @param {Mixed} val
      * @return {Mixed}
      * @api private
      */


      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }

        return val;
      }
      /**
      * XXX DO NOT USE. This is a temporary stub function.
      * XXX It WILL be removed in the next major release.
      */


      function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
      }

      createDebug.enable(createDebug.load());
      return createDebug;
    }

    var common = setup;

    var browser$1 = createCommonjsModule(function (module, exports) {
      /* eslint-env browser */

      /**
       * This is the web browser implementation of `debug()`.
       */
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();

      exports.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
          }
        };
      })();
      /**
       * Colors.
       */


      exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
      /**
       * Currently only WebKit-based Web Inspectors, Firefox >= v31,
       * and the Firebug extension (any Firefox version) are known
       * to support "%c" CSS customizations.
       *
       * TODO: add a `localStorage` variable to explicitly enable/disable colors
       */
      // eslint-disable-next-line complexity

      function useColors() {
        // NB: In an Electron preload script, document will be defined but not fully
        // initialized. Since we know we're in Chrome, we'll just detect this case
        // explicitly
        if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
          return true;
        } // Internet Explorer and Edge do not support colors.


        if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        } // Is webkit? http://stackoverflow.com/a/16459606/376773
        // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


        return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
        typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
        typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      /**
       * Colorize log arguments if enabled.
       *
       * @api public
       */


      function formatArgs(args) {
        args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

        if (!this.useColors) {
          return;
        }

        const c = 'color: ' + this.color;
        args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
        // arguments passed either before or after the %c, so we need to
        // figure out the correct index to insert the CSS into

        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, match => {
          if (match === '%%') {
            return;
          }

          index++;

          if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      /**
       * Invokes `console.debug()` when available.
       * No-op when `console.debug` is not a "function".
       * If `console.debug` is not available, falls back
       * to `console.log`.
       *
       * @api public
       */


      exports.log = console.debug || console.log || (() => {});
      /**
       * Save `namespaces`.
       *
       * @param {String} namespaces
       * @api private
       */


      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem('debug', namespaces);
          } else {
            exports.storage.removeItem('debug');
          }
        } catch (error) {// Swallow
          // XXX (@Qix-) should we be logging these?
        }
      }
      /**
       * Load `namespaces`.
       *
       * @return {String} returns the previously persisted debug modes
       * @api private
       */


      function load() {
        let r;

        try {
          r = exports.storage.getItem('debug');
        } catch (error) {// Swallow
          // XXX (@Qix-) should we be logging these?
        } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


        if (!r && typeof process !== 'undefined' && 'env' in process) {
          r = process.env.DEBUG;
        }

        return r;
      }
      /**
       * Localstorage attempts to return the localstorage.
       *
       * This is necessary because safari throws
       * when a user disables cookies/localstorage
       * and you attempt to access it.
       *
       * @return {LocalStorage}
       * @api private
       */


      function localstorage() {
        try {
          // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
          // The Browser also has localStorage in the global context.
          return localStorage;
        } catch (error) {// Swallow
          // XXX (@Qix-) should we be logging these?
        }
      }

      module.exports = common(exports);
      const {
        formatters
      } = module.exports;
      /**
       * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
       */

      formatters.j = function (v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return '[UnexpectedJSONParseError]: ' + error.message;
        }
      };
    });
    var browser_1 = browser$1.formatArgs;
    var browser_2 = browser$1.save;
    var browser_3 = browser$1.load;
    var browser_4 = browser$1.useColors;
    var browser_5 = browser$1.storage;
    var browser_6 = browser$1.destroy;
    var browser_7 = browser$1.colors;
    var browser_8 = browser$1.log;

    /* node_modules/svelte-recaptcha-v2/src/Recaptcha.svelte generated by Svelte v3.44.2 */

    function create_fragment$w(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "id", "googleRecaptchaDiv");
    			attr(div, "class", "g-recaptcha");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    let recaptcha;
    let observer = defer();

    /*div that houses recaptcha iframe*/
    let iframeSrc = "google.com/recaptcha/api2/bframe";

    function instance$u($$self, $$props, $$invalidate) {
    	const dbg = browser$1("{Recaptcha}");
    	const debug = dbg;
    	const dispatch = createEventDispatcher();
    	let { sitekey } = $$props;
    	let { badge = "top" } = $$props;
    	let { size = "invisible" } = $$props;
    	let { sleepTime = 0 } = $$props;

    	/*wait time before starting injection*/
    	let instanceId = null;

    	/*setInterval tracker for captcha*/
    	let wait = null;

    	/*promise to wait*/
    	let recaptchaModal = null;

    	/*src path of google's injected iframe - used with the timer*/
    	let openObserver = null;

    	/*observer tracker*/
    	let closeObserver = null;

    	/*observer tracker*/
    	/*---------------------------------------------| dispatchers |--*/
    	const eventEmitters = {
    		onExpired: async () => {
    			debug("expired?");
    			recaptcha.reset(instanceId);
    		},
    		onError: async err => {
    			const debug = dbg.extend("onError");
    			debug("an error occured during initialization");
    			dispatch("error", { msg: "please check your site key" });
    			captcha.errors.push("empty");
    			recaptcha.reset(instanceId);
    		},
    		onSuccess: async token => {
    			const debug = dbg.extend("onSuccess");
    			debug("dispatching success, we have a token");
    			dispatch("success", { msg: "ok", token });
    			setTimeout(() => recaptcha.reset(instanceId), 1000);
    			debug("resetting, google needs allowed time if visible recaptcha..");
    			observer = defer();
    			debug("resetting observer");
    		},
    		onReady: () => {
    			const debug = dbg.extend("onReady");
    			dispatch("ready");
    			debug("captcha is ready and available in DOM");
    		},
    		onOpen: mutations => {
    			const debug = dbg.extend("onOpen");
    			dispatch("open");
    			debug("captcha decided to ask a challange");
    		},
    		onClose: mutations => {
    			const debug = dbg.extend("onClose");

    			if (browser && mutations.length === 1 && !window.grecaptcha.getResponse()) {
    				debug("captcha window was closed");
    				dispatch("close");
    			} /*
       │close mutation fires twice, probably because
       │of event bubbling or something. we also want
       │to avoid signalling when user solves the captcha.
       */
    		}
    	}; /*
        │these emitters are referenced to google recaptcha so
        │we can track its status through svelte.
        */

    	/*------------------------------------------| event-handlers |--*/
    	const captcha = {
    		ready: false,
    		/*captcha loading state*/
    		errors: [],
    		retryTimer: false,
    		/*setInterval timer to update state*/
    		isLoaded: () => {
    			const debug = dbg.extend("isLoaded");

    			captcha.ready = browser && window && window.grecaptcha && window.grecaptcha.ready && document.getElementsByTagName("iframe").find(x => {
    				return x.src.includes(iframeSrc);
    			})
    			? true
    			: false;

    			debug("captcha.isLoaded(): " + captcha.ready);
    			return captcha.ready;
    		},
    		stopTimer: () => {
    			const debug = dbg.extend("stopTimer");
    			debug("stopping timer");
    			clearInterval(captcha.retryTimer);
    		},
    		startTimer: () => {
    			const debug = dbg.extend("startTimer");
    			debug("check in 1s intervals");

    			captcha.retryTimer = setInterval(
    				() => {
    					debug("checking every second");

    					if (captcha.isLoaded()) {
    						captcha.stopTimer();
    						captcha.modal();
    						captcha.openHandle();
    						captcha.closeHandle();
    						eventEmitters.onReady();
    					}

    					if (captcha.errors.length > 3) {
    						captcha.wipe();
    						debug("too many errors, no recaptcha for you at this  time");
    					}
    				},
    				1000
    			);
    		},
    		modal: () => {
    			const debug = dbg.extend("modal");
    			debug("finding recaptcha iframe");
    			const iframe = document.getElementsByTagName("iframe");

    			recaptchaModal = iframe.find(x => {
    				return x.src.includes(iframeSrc);
    			}).parentNode.parentNode;
    		},
    		openHandle: () => {
    			const debug = dbg.extend("openHandler");
    			debug("adding observer");

    			openObserver = new MutationObserver(x => {
    					return recaptchaModal.style.opacity == 1 && eventEmitters.onOpen(x);
    				});

    			openObserver.observe(recaptchaModal, {
    				attributes: true,
    				attributeFilter: ["style"]
    			});
    		},
    		closeHandle: () => {
    			const debug = dbg.extend("closeHandle");
    			debug("adding observer");

    			closeObserver = new MutationObserver(x => {
    					return recaptchaModal.style.opacity == 0 && eventEmitters.onClose(x);
    				});

    			closeObserver.observe(recaptchaModal, {
    				attributes: true,
    				attributeFilter: ["style"]
    			});
    		},
    		inject: () => {
    			const debug = dbg.extend("inject");
    			debug("initializing API, merging google API to svelte recaptcha");
    			recaptcha = window.grecaptcha;

    			/*
     │associate window component to svelte, this allows us
     │to export grecaptcha methods in parent components.
     */
    			window.grecaptcha.ready(() => {
    				instanceId = grecaptcha.render("googleRecaptchaDiv", {
    					badge,
    					sitekey,
    					"callback": eventEmitters.onSuccess,
    					"expired-callback": eventEmitters.onExpired,
    					"error-callback": eventEmitters.onError,
    					size
    				});
    			});
    		},
    		wipe: () => {
    			const debug = dbg.extend("onDestroy");

    			try {
    				if (browser) {
    					clearInterval(captcha.retryTimer);
    					debug("cleaning up clearInterval");

    					if (recaptcha) {
    						recaptcha.reset(instanceId);
    						debug("resetting captcha api");
    						delete window.grecaptcha;
    						delete window.apiLoaded;
    						delete window.recaptchaCloseListener;
    						debug("deleting window.grecaptcha");
    						if (openObserver) openObserver.disconnect();
    						if (closeObserver) closeObserver.disconnect();

    						document.querySelectorAll("script[src*=recaptcha]").forEach(script => {
    							script.remove();
    							debug("deleting google script tag");
    						});

    						document.querySelectorAll("iframe[src*=recaptcha]").forEach(iframe => {
    							iframe.remove();
    							debug("deleting google iframe");
    						});
    					}
    				}
    			} catch(err) {
    				console.log(err.message);
    			} /*
       │extremely important to cleanup our mess, otherwise
       │everytime the component is invoked, a new recaptcha
       │iframe will get instated. Also, with SSR we need to
       │make sure all this stuff is wrapped within browser.
       */
    		}
    	};

    	const apiLoaded = async () => {
    		const debug = dbg.extend("apiLoaded");
    		debug("invoked, resolving deferred promise");
    		wait.resolve(true);
    	};

    	onMount(async () => {
    		const debug = dbg.extend("onMount");
    		if (browser) window.apiLoaded = apiLoaded;
    		debug("associate apiLoad to window object");

    		if (sleepTime) {
    			debug("sleeping for a bit before inserting recaptcha script");
    			await sleep(sleepTime);
    		}

    		if (browser) {
    			const script = document.createElement("script");
    			script.id = "googleRecaptchaScript";
    			script.src = `https://www.google.com/recaptcha/api.js?render=explicit&sitekey{sitekey}&onload=apiLoaded`;
    			script.async = true;
    			script.defer = true;
    			document.head.appendChild(script);
    		}

    		wait = defer();
    		debug("waiting for google api to finish loading");
    		await Promise.resolve(wait);
    		debug("deferred promise was resolved...");
    		if (browser) captcha.inject();
    		debug("injecting captcha code");
    		if (browser) HTMLCollection.prototype.find = Array.prototype.find;

    		/*needed to detect iframe for open, close events*/
    		captcha.startTimer();

    		debug("polling for captcha to appear in DOM");
    	});

    	onDestroy(async () => {
    		const debug = dbg.extend("onDestroy");
    		captcha.wipe();
    	});

    	const sleep = seconds => new Promise(resolve => setTimeout(resolve, seconds * 1000)).catch(err => console.log("caught"));

    	$$self.$$set = $$props => {
    		if ('sitekey' in $$props) $$invalidate(0, sitekey = $$props.sitekey);
    		if ('badge' in $$props) $$invalidate(1, badge = $$props.badge);
    		if ('size' in $$props) $$invalidate(2, size = $$props.size);
    		if ('sleepTime' in $$props) $$invalidate(3, sleepTime = $$props.sleepTime);
    	};

    	return [sitekey, badge, size, sleepTime];
    }

    class Recaptcha extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$u, create_fragment$w, safe_not_equal, {
    			sitekey: 0,
    			badge: 1,
    			size: 2,
    			sleepTime: 3
    		});
    	}
    }

    /* src/Components/Functional/FormDefault.svelte generated by Svelte v3.44.2 */

    function create_fragment$x(ctx) {
    	let div;
    	let recaptcha_1;
    	let div_class_value;
    	let current;

    	recaptcha_1 = new Recaptcha({
    			props: {
    				sitekey: googleRecaptchaSiteKey,
    				badge: 'inline',
    				size: 'normal'
    			}
    		});

    	recaptcha_1.$on("success", /*onCaptchaSuccess*/ ctx[2]);
    	recaptcha_1.$on("error", /*onCaptchaError*/ ctx[3]);
    	recaptcha_1.$on("expired", /*onCaptchaExpire*/ ctx[4]);
    	recaptcha_1.$on("close", /*onCaptchaClose*/ ctx[5]);
    	recaptcha_1.$on("ready", /*onCaptchaReady*/ ctx[1]);

    	return {
    		c() {
    			div = element("div");
    			create_component(recaptcha_1.$$.fragment);
    			attr(div, "class", div_class_value = /*recaptchaPass*/ ctx[0] ? 'hidden' : 'block');
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(recaptcha_1, div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*recaptchaPass*/ 1 && div_class_value !== (div_class_value = /*recaptchaPass*/ ctx[0] ? 'hidden' : 'block')) {
    				attr(div, "class", div_class_value);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(recaptcha_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(recaptcha_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(recaptcha_1);
    		}
    	};
    }

    const googleRecaptchaSiteKey = "6LdFOkAdAAAAAHk2IzedzYkND2NJkTVKcwclltTQ";

    function instance$v($$self, $$props, $$invalidate) {
    	const apiURL = "http://localhost:8080/wp-json";
    	let formData = {};
    	let formContainers = [];
    	let send;
    	let recaptchaPass = false;

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

    			if (resp.status == "validation_failed" || resp.status == "spam") {
    				output[0].classList.add("error-message");
    			} else {
    				output[0].classList.remove("error-message");
    				output[0].classList.add("success-message");
    				send[0].classList.add("sent");
    				send[0].innerHTML = "Sent";
    				send[0].disabled = true;
    			}

    			output[0].innerHTML = "<span>" + resp.message + "</span>";
    			console.log(resp);
    		}).catch(error => {
    			console.log("Error:", error);
    		});
    	};

    	const formDefault = async () => {
    		formContainers = await document.querySelectorAll(".wpcf7");

    		// bail if there's no form found
    		if (formContainers.length === 0) {
    			return;
    		}

    		formContainers.forEach(form => {
    			let formIDString = form.id.split("-")[1], formID = formIDString.slice(1);
    			send = form.querySelectorAll(".wpcf7-submit");
    			send[0].disabled = true;
    			console.log(send);
    			let messageBox = form.querySelectorAll(".wpcf7-response-output");

    			if (send != undefined) {
    				// send[0].classList.remove("disabled");
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

    	const onCaptchaReady = event => {
    		console.log("recaptcha init has completed.");
    	}; /*
         │You can enable your form button here.
         */

    	const onCaptchaSuccess = event => {
    		// console.log("token received: " + event.detail.token);
    		/*
         │If using checkbox method, you can attach your
         │form logic here, or dispatch your custom event.
         */
    		send[0].disabled = false;

    		send[0].classList.remove("disabled");
    		$$invalidate(0, recaptchaPass = true);
    	};

    	const onCaptchaError = event => {
    		console.log("recaptcha init has failed.");
    	}; /*
         │Usually due to incorrect siteKey.
         |Make sure you have the correct siteKey..
         */

    	const onCaptchaExpire = event => {
    		console.log("recaptcha api has expired");
    		$$invalidate(0, recaptchaPass = false);
    	}; /*
         │Normally, you wouldn't need to do anything.
         │Recaptcha should reinit itself automatically.
         */

    	const onCaptchaClose = event => {
    		console.log("google decided to challange the user");
    	}; /*
         │This fires when the puzzle frame closes.
         │Usually happens when the user clicks outside
         |the modal frame.
         */

    	return [
    		recaptchaPass,
    		onCaptchaReady,
    		onCaptchaSuccess,
    		onCaptchaError,
    		onCaptchaExpire,
    		onCaptchaClose
    	];
    }

    class FormDefault extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$v, create_fragment$x, safe_not_equal, {});
    	}
    }

    /* src/Components/Design/Templates/Default.svelte generated by Svelte v3.44.2 */

    function create_else_block$4(ctx) {
    	let p;

    	return {
    		c() {
    			p = element("p");
    			p.textContent = "Loading";
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    // (51:0) {#if data != ''}
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
    	let t2;
    	let formdefault;
    	let current;

    	head = new Head({
    			props: { pageTagData: /*pageData*/ ctx[1] }
    		});

    	pagetitle = new PageTitle({
    			props: {
    				className: "my-5",
    				title: /*title*/ ctx[2]
    			}
    		});

    	formdefault = new FormDefault({});

    	return {
    		c() {
    			create_component(head.$$.fragment);
    			t0 = space();
    			section = element("section");
    			create_component(pagetitle.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");
    			t2 = space();
    			create_component(formdefault.$$.fragment);
    			attr(div1, "class", "overflow-hidden");
    		},
    		m(target, anchor) {
    			mount_component(head, target, anchor);
    			insert(target, t0, anchor);
    			insert(target, section, anchor);
    			mount_component(pagetitle, section, null);
    			append(section, t1);
    			append(section, div1);
    			append(div1, div0);
    			div0.innerHTML = /*content*/ ctx[3];
    			insert(target, t2, anchor);
    			mount_component(formdefault, target, anchor);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const head_changes = {};
    			if (dirty & /*pageData*/ 2) head_changes.pageTagData = /*pageData*/ ctx[1];
    			head.$set(head_changes);
    			const pagetitle_changes = {};
    			if (dirty & /*title*/ 4) pagetitle_changes.title = /*title*/ ctx[2];
    			pagetitle.$set(pagetitle_changes);
    			if (!current || dirty & /*content*/ 8) div0.innerHTML = /*content*/ ctx[3];		},
    		i(local) {
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

    			transition_in(formdefault.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(head.$$.fragment, local);
    			transition_out(pagetitle.$$.fragment, local);
    			if (div0_intro) div0_intro.invalidate();
    			div0_outro = create_out_transition(div0, fly, { y: -1256 });
    			if (div1_intro) div1_intro.invalidate();
    			div1_outro = create_out_transition(div1, fly, { y: 1176 });
    			transition_out(formdefault.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(head, detaching);
    			if (detaching) detach(t0);
    			if (detaching) detach(section);
    			destroy_component(pagetitle);
    			if (detaching && div0_outro) div0_outro.end();
    			if (detaching && div1_outro) div1_outro.end();
    			if (detaching) detach(t2);
    			destroy_component(formdefault, detaching);
    		}
    	};
    }

    function create_fragment$y(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$c, create_else_block$4];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*data*/ ctx[0] != '') return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let data = [];
    	let pageData = [];
    	let title = "";
    	let content = "";
    	let storedState = "";
    	let { slug } = $$props;
    	const apiURL = "http://localhost:8080/wp-json";

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

    	$$self.$$set = $$props => {
    		if ('slug' in $$props) $$invalidate(4, slug = $$props.slug);
    	};

    	return [data, pageData, title, content, slug];
    }

    class Default extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$w, create_fragment$y, safe_not_equal, { slug: 4 });
    	}
    }

    /* src/Components/Design/Page.svelte generated by Svelte v3.44.2 */

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

    	projectsingle = new ProjectSingle({ props: projectsingle_props });
    	binding_callbacks.push(() => bind(projectsingle, 'template', projectsingle_template_binding));

    	return {
    		c() {
    			create_component(projectsingle.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(projectsingle, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const projectsingle_changes = {};
    			if (dirty & /*params*/ 8) projectsingle_changes.slug = /*params*/ ctx[3].slug;

    			if (!updating_template && dirty & /*template*/ 2) {
    				updating_template = true;
    				projectsingle_changes.template = /*template*/ ctx[1];
    				add_flush_callback(() => updating_template = false);
    			}

    			projectsingle.$set(projectsingle_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(projectsingle.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(projectsingle.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(projectsingle, detaching);
    		}
    	};
    }

    // (28:12) <Route path="about">
    function create_default_slot_3$2(ctx) {
    	let about;
    	let current;
    	about = new About({});

    	return {
    		c() {
    			create_component(about.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(about, target, anchor);
    			current = true;
    		},
    		i(local) {
    			if (current) return;
    			transition_in(about.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(about.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(about, detaching);
    		}
    	};
    }

    // (29:12) <Route path="/" exact >
    function create_default_slot_2$2(ctx) {
    	let home;
    	let current;
    	home = new Home({});

    	return {
    		c() {
    			create_component(home.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		i(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(home, detaching);
    		}
    	};
    }

    // (30:12) <Route path="/:slug" key="add-client" exact let:params>
    function create_default_slot_1$4(ctx) {
    	let default_1;
    	let current;
    	default_1 = new Default({ props: { slug: /*params*/ ctx[3].slug } });

    	return {
    		c() {
    			create_component(default_1.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(default_1, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const default_1_changes = {};
    			if (dirty & /*params*/ 8) default_1_changes.slug = /*params*/ ctx[3].slug;
    			default_1.$set(default_1_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_1.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_1.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(default_1, detaching);
    		}
    	};
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
    			}
    		});

    	route1 = new Route({
    			props: { path: "projects", component: Projects }
    		});

    	route2 = new Route({
    			props: {
    				path: "about",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			}
    		});

    	route3 = new Route({
    			props: {
    				path: "/",
    				exact: true,
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			}
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
    			}
    		});

    	route5 = new Route({
    			props: { path: "/404", component: NotFound }
    		});

    	route6 = new Route({ props: { component: NotFound } });

    	return {
    		c() {
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
    		m(target, anchor) {
    			mount_component(route0, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(route1, target, anchor);
    			insert(target, t1, anchor);
    			mount_component(route2, target, anchor);
    			insert(target, t2, anchor);
    			mount_component(route3, target, anchor);
    			insert(target, t3, anchor);
    			mount_component(route4, target, anchor);
    			insert(target, t4, anchor);
    			mount_component(route5, target, anchor);
    			insert(target, t5, anchor);
    			mount_component(route6, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
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
    		i(local) {
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
    		o(local) {
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(route4.$$.fragment, local);
    			transition_out(route5.$$.fragment, local);
    			transition_out(route6.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(route0, detaching);
    			if (detaching) detach(t0);
    			destroy_component(route1, detaching);
    			if (detaching) detach(t1);
    			destroy_component(route2, detaching);
    			if (detaching) detach(t2);
    			destroy_component(route3, detaching);
    			if (detaching) detach(t3);
    			destroy_component(route4, detaching);
    			if (detaching) detach(t4);
    			destroy_component(route5, detaching);
    			if (detaching) detach(t5);
    			destroy_component(route6, detaching);
    		}
    	};
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
    	header = new Header({});
    	sidebar = new Sidebar({});

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			}
    		});

    	footer = new Footer({ props: { template: /*template*/ ctx[1] } });

    	return {
    		c() {
    			create_component(header.$$.fragment);
    			t0 = space();
    			create_component(sidebar.$$.fragment);
    			t1 = space();
    			main = element("main");
    			create_component(router.$$.fragment);
    			t2 = space();
    			create_component(footer.$$.fragment);
    			attr(main, "class", main_class_value = "" + (null_to_empty(`site-main container mx-auto md:mt-24 mt-48 pl-3 pr-16`) + " svelte-ks7no8"));
    		},
    		m(target, anchor) {
    			mount_component(header, target, anchor);
    			insert(target, t0, anchor);
    			mount_component(sidebar, target, anchor);
    			insert(target, t1, anchor);
    			insert(target, main, anchor);
    			mount_component(router, main, null);
    			insert(target, t2, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
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
    		i(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(header, detaching);
    			if (detaching) detach(t0);
    			destroy_component(sidebar, detaching);
    			if (detaching) detach(t1);
    			if (detaching) detach(main);
    			destroy_component(router);
    			if (detaching) detach(t2);
    			destroy_component(footer, detaching);
    		}
    	};
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { url = "" } = $$props;
    	let template;

    	function projectsingle_template_binding(value) {
    		template = value;
    		$$invalidate(1, template);
    	}

    	$$self.$$set = $$props => {
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	return [url, template, projectsingle_template_binding];
    }

    class Page extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$x, create_fragment$z, safe_not_equal, { url: 0 });
    	}
    }

    /* src/Components/Functional/SiteLoadCookie.svelte generated by Svelte v3.44.2 */

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

    /* src/App.svelte generated by Svelte v3.44.2 */

    function create_fragment$A(ctx) {
    	let div;
    	let page;
    	let div_transition;
    	let current;
    	page = new Page({});

    	return {
    		c() {
    			div = element("div");
    			create_component(page.$$.fragment);
    			attr(div, "class", "svelte-root flex flex-row");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(page, div, null);
    			current = true;
    		},
    		p(new_ctx, [dirty]) {
    		},
    		i(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: durVal }, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o(local) {
    			transition_out(page.$$.fragment, local);
    			if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: durVal }, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(page);
    			if (detaching && div_transition) div_transition.end();
    		}
    	};
    }

    class App extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$A, safe_not_equal, {});
    	}
    }

    // fetch("http://localhost:8080/wp-json")
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    var app = new App({
      target: document.body,
      intro: true
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
