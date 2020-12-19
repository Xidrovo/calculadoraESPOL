
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
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
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
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
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
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
            else if (key === '__value' || descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
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
    function add_render_callback(fn) {
        render_callbacks.push(fn);
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
    const outroing = new Set();
    let outros;
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
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
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
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
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
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
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
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
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
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.22.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/MediaQuery.svelte generated by Svelte v3.22.2 */
    const get_default_slot_changes = dirty => ({ matches: dirty & /*matches*/ 1 });
    const get_default_slot_context = ctx => ({ matches: /*matches*/ ctx[0] });

    function create_fragment(ctx) {
    	let current;
    	const default_slot_template = /*$$slots*/ ctx[8].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context);

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
    				if (default_slot.p && dirty & /*$$scope, matches*/ 129) {
    					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[7], get_default_slot_context), get_slot_changes(default_slot_template, /*$$scope*/ ctx[7], dirty, get_default_slot_changes));
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
    	let { query } = $$props;
    	let mql;
    	let mqlListener;
    	let wasMounted = false;
    	let matches = false;

    	onMount(() => {
    		$$invalidate(4, wasMounted = true);

    		return () => {
    			removeActiveListener();
    		};
    	});

    	function addNewListener(query) {
    		mql = window.matchMedia(query);
    		mqlListener = v => $$invalidate(0, matches = v.matches);
    		mql.addListener(mqlListener);
    		$$invalidate(0, matches = mql.matches);
    	}

    	function removeActiveListener() {
    		if (mql && mqlListener) {
    			mql.removeListener(mqlListener);
    		}
    	}

    	const writable_props = ["query"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MediaQuery> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("MediaQuery", $$slots, ['default']);

    	$$self.$set = $$props => {
    		if ("query" in $$props) $$invalidate(1, query = $$props.query);
    		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		query,
    		mql,
    		mqlListener,
    		wasMounted,
    		matches,
    		addNewListener,
    		removeActiveListener
    	});

    	$$self.$inject_state = $$props => {
    		if ("query" in $$props) $$invalidate(1, query = $$props.query);
    		if ("mql" in $$props) mql = $$props.mql;
    		if ("mqlListener" in $$props) mqlListener = $$props.mqlListener;
    		if ("wasMounted" in $$props) $$invalidate(4, wasMounted = $$props.wasMounted);
    		if ("matches" in $$props) $$invalidate(0, matches = $$props.matches);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*wasMounted, query*/ 18) {
    			 {
    				if (wasMounted) {
    					removeActiveListener();
    					addNewListener(query);
    				}
    			}
    		}
    	};

    	return [
    		matches,
    		query,
    		mql,
    		mqlListener,
    		wasMounted,
    		addNewListener,
    		removeActiveListener,
    		$$scope,
    		$$slots
    	];
    }

    class MediaQuery extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { query: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MediaQuery",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*query*/ ctx[1] === undefined && !("query" in props)) {
    			console.warn("<MediaQuery> was created without expected prop 'query'");
    		}
    	}

    	get query() {
    		throw new Error("<MediaQuery>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set query(value) {
    		throw new Error("<MediaQuery>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Footer.svelte generated by Svelte v3.22.2 */
    const file = "src/Footer.svelte";

    // (40:4) <MediaQuery query="(min-width: 1281px)" let:matches>
    function create_default_slot(ctx) {
    	let div5;
    	let div0;
    	let p0;
    	let t1;
    	let strong0;
    	let t3;
    	let p1;
    	let t4;
    	let a0;
    	let t6;
    	let strong1;
    	let t8;
    	let t9;
    	let p2;
    	let strong2;
    	let t11;
    	let div0_class_value;
    	let t12;
    	let div4;
    	let div1;
    	let t14;
    	let div3;
    	let a1;
    	let t16;
    	let a2;
    	let t18;
    	let div2;
    	let div5_class_value;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "Herramienta para calcular los promedios de la ESPOL. Las\n                    notas son colocadas sobre 100 y calculado luego de acuerdo\n                    al porcentaje práctico/teórico.";
    			t1 = space();
    			strong0 = element("strong");
    			strong0.textContent = "Nuevo";
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Esta aplicación permite ser instalada en celulares. Esto\n                    gracias al poder de las\n                    ");
    			a0 = element("a");
    			a0.textContent = "Progresive Web App (PWA)";
    			t6 = text(". Si\n                    ");
    			strong1 = element("strong");
    			strong1.textContent = "NO";
    			t8 = text("\n                    aceptaste la instalación puedes borrar caché e intentar de\n                    nuevo. ¡Gracias!");
    			t9 = space();
    			p2 = element("p");
    			strong2 = element("strong");
    			strong2.textContent = "Creador:";
    			t11 = text(" Xavier Idrovo Vallejo");
    			t12 = space();
    			div4 = element("div");
    			div1 = element("div");
    			div1.textContent = "Contacto";
    			t14 = space();
    			div3 = element("div");
    			a1 = element("a");
    			a1.textContent = "Github";
    			t16 = space();
    			a2 = element("a");
    			a2.textContent = "LinkedIn";
    			t18 = space();
    			div2 = element("div");
    			div2.textContent = "Email: Xidrovo@hotmail.com";
    			add_location(p0, file, 43, 16, 1026);
    			add_location(strong0, file, 48, 16, 1275);
    			attr_dev(a0, "href", "https://developer.mozilla.org/es/docs/Web/Progressive_web_apps");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-260bdv");
    			add_location(a0, file, 52, 20, 1459);
    			add_location(strong1, file, 55, 20, 1649);
    			add_location(p1, file, 49, 16, 1314);
    			add_location(strong2, file, 59, 19, 1825);
    			add_location(p2, file, 59, 16, 1822);
    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`${/*matches*/ ctx[0] ? "w-half" : "w-full"} desc-text`) + " svelte-260bdv"));
    			add_location(div0, file, 42, 12, 951);
    			attr_dev(div1, "class", "link-title svelte-260bdv");
    			add_location(div1, file, 62, 16, 1959);
    			attr_dev(a1, "href", "https://github.com/Xidrovo");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-260bdv");
    			add_location(a1, file, 64, 20, 2075);
    			attr_dev(a2, "href", "https://www.linkedin.com/in/xavier-idrovo-vallejo-34a4b2119/");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "class", "svelte-260bdv");
    			add_location(a2, file, 67, 20, 2207);
    			attr_dev(div2, "class", "svelte-260bdv");
    			add_location(div2, file, 70, 20, 2375);
    			attr_dev(div3, "class", "flex flex-col social-media svelte-260bdv");
    			add_location(div3, file, 63, 16, 2014);
    			attr_dev(div4, "class", "flex flex-col social svelte-260bdv");
    			add_location(div4, file, 61, 12, 1908);
    			attr_dev(div5, "class", div5_class_value = "" + (null_to_empty(`footer flex ${!/*matches*/ ctx[0] ? "flex-col" : "flex-row"} justify-between `) + " svelte-260bdv"));
    			add_location(div5, file, 40, 8, 844);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t1);
    			append_dev(div0, strong0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(p1, t4);
    			append_dev(p1, a0);
    			append_dev(p1, t6);
    			append_dev(p1, strong1);
    			append_dev(p1, t8);
    			append_dev(div0, t9);
    			append_dev(div0, p2);
    			append_dev(p2, strong2);
    			append_dev(p2, t11);
    			append_dev(div5, t12);
    			append_dev(div5, div4);
    			append_dev(div4, div1);
    			append_dev(div4, t14);
    			append_dev(div4, div3);
    			append_dev(div3, a1);
    			append_dev(div3, t16);
    			append_dev(div3, a2);
    			append_dev(div3, t18);
    			append_dev(div3, div2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*matches*/ 1 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`${/*matches*/ ctx[0] ? "w-half" : "w-full"} desc-text`) + " svelte-260bdv"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*matches*/ 1 && div5_class_value !== (div5_class_value = "" + (null_to_empty(`footer flex ${!/*matches*/ ctx[0] ? "flex-col" : "flex-row"} justify-between `) + " svelte-260bdv"))) {
    				attr_dev(div5, "class", div5_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(40:4) <MediaQuery query=\\\"(min-width: 1281px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let current;

    	const mediaquery = new MediaQuery({
    			props: {
    				query: "(min-width: 1281px)",
    				$$slots: {
    					default: [
    						create_default_slot,
    						({ matches }) => ({ 0: matches }),
    						({ matches }) => matches ? 1 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(mediaquery.$$.fragment);
    			add_location(main, file, 38, 0, 772);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(mediaquery, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const mediaquery_changes = {};

    			if (dirty & /*$$scope, matches*/ 3) {
    				mediaquery_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery.$set(mediaquery_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mediaquery.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mediaquery.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(mediaquery);
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
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("Footer", $$slots, []);
    	$$self.$capture_state = () => ({ MediaQuery });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.22.2 */
    const file$1 = "src/App.svelte";

    // (135:4) <MediaQuery query="(min-width: 1281px)" let:matches>
    function create_default_slot_3(ctx) {
    	let div6;
    	let div2;
    	let div0;
    	let label0;
    	let p0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let label1;
    	let p1;
    	let t4;
    	let input1;
    	let div2_class_value;
    	let t5;
    	let div5;
    	let div3;
    	let label2;
    	let p2;
    	let t7;
    	let input2;
    	let t8;
    	let div4;
    	let label3;
    	let p3;
    	let t10;
    	let input3;
    	let div5_class_value;
    	let dispose;
    	let input0_levels = [/*_settings*/ ctx[8], { name: "first" }, { placeholder: "ej: 80" }];
    	let input0_data = {};

    	for (let i = 0; i < input0_levels.length; i += 1) {
    		input0_data = assign(input0_data, input0_levels[i]);
    	}

    	let input1_levels = [{ name: "second" }, { placeholder: "ej: 75" }, /*_settings*/ ctx[8]];
    	let input1_data = {};

    	for (let i = 0; i < input1_levels.length; i += 1) {
    		input1_data = assign(input1_data, input1_levels[i]);
    	}

    	let input2_levels = [{ name: "practique" }, { placeholder: "ej: 90" }, /*_settings*/ ctx[8]];
    	let input2_data = {};

    	for (let i = 0; i < input2_levels.length; i += 1) {
    		input2_data = assign(input2_data, input2_levels[i]);
    	}

    	let input3_levels = [{ name: "third" }, { placeholder: "ej: 90" }, /*_settings*/ ctx[8]];
    	let input3_data = {};

    	for (let i = 0; i < input3_levels.length; i += 1) {
    		input3_data = assign(input3_data, input3_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div6 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			p0 = element("p");
    			p0.textContent = "Primer Parcial sobre 100";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			p1 = element("p");
    			p1.textContent = "Parcial sobre 100";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			div5 = element("div");
    			div3 = element("div");
    			label2 = element("label");
    			p2 = element("p");
    			p2.textContent = "Nota prácitca";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			div4 = element("div");
    			label3 = element("label");
    			p3 = element("p");
    			p3.textContent = "Mejoramiento";
    			t10 = space();
    			input3 = element("input");
    			attr_dev(p0, "class", "text-label");
    			add_location(p0, file$1, 140, 9, 3315);
    			set_attributes(input0, input0_data);
    			add_location(input0, file$1, 143, 9, 3396);
    			attr_dev(label0, "class", "flex flex-col");
    			attr_dev(label0, "for", "first");
    			add_location(label0, file$1, 139, 8, 3264);
    			attr_dev(div0, "class", "mr-4");
    			add_location(div0, file$1, 138, 7, 3237);
    			attr_dev(p1, "class", "text-label");
    			attr_dev(p1, "primer", "");
    			add_location(p1, file$1, 153, 9, 3668);
    			set_attributes(input1, input1_data);
    			add_location(input1, file$1, 156, 9, 3749);
    			attr_dev(label1, "class", "flex flex-col");
    			attr_dev(label1, "for", "second");
    			add_location(label1, file$1, 152, 8, 3616);
    			add_location(div1, file$1, 151, 7, 3602);
    			attr_dev(div2, "class", div2_class_value = `flex ${/*matches*/ ctx[24] ? "flex-row" : "flex-col"}`);
    			add_location(div2, file$1, 136, 6, 3165);
    			attr_dev(p2, "class", "text-label");
    			add_location(p2, file$1, 169, 9, 4128);
    			set_attributes(input2, input2_data);
    			add_location(input2, file$1, 170, 9, 4177);
    			attr_dev(label2, "class", "flex flex-col");
    			attr_dev(label2, "for", "practique");
    			add_location(label2, file$1, 168, 8, 4073);
    			attr_dev(div3, "class", "mr-4");
    			add_location(div3, file$1, 167, 7, 4046);
    			attr_dev(p3, "class", "text-label");
    			add_location(p3, file$1, 179, 9, 4447);
    			set_attributes(input3, input3_data);
    			add_location(input3, file$1, 180, 9, 4495);
    			attr_dev(label3, "class", "flex flex-col");
    			attr_dev(label3, "for", "third");
    			add_location(label3, file$1, 178, 8, 4396);
    			add_location(div4, file$1, 177, 7, 4382);
    			attr_dev(div5, "class", div5_class_value = `flex ${/*matches*/ ctx[24] ? "flex-row" : "flex-col mb-2"}`);
    			add_location(div5, file$1, 165, 6, 3969);
    			attr_dev(div6, "class", "flex flex-col");
    			add_location(div6, file$1, 135, 5, 3131);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div2);
    			append_dev(div2, div0);
    			append_dev(div0, label0);
    			append_dev(label0, p0);
    			append_dev(label0, t1);
    			append_dev(label0, input0);
    			set_input_value(input0, /*first*/ ctx[2]);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, label1);
    			append_dev(label1, p1);
    			append_dev(label1, t4);
    			append_dev(label1, input1);
    			set_input_value(input1, /*second*/ ctx[3]);
    			append_dev(div6, t5);
    			append_dev(div6, div5);
    			append_dev(div5, div3);
    			append_dev(div3, label2);
    			append_dev(label2, p2);
    			append_dev(label2, t7);
    			append_dev(label2, input2);
    			set_input_value(input2, /*practique*/ ctx[1]);
    			append_dev(div5, t8);
    			append_dev(div5, div4);
    			append_dev(div4, label3);
    			append_dev(label3, p3);
    			append_dev(label3, t10);
    			append_dev(label3, input3);
    			set_input_value(input3, /*third*/ ctx[4]);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "input", prevent_default(/*handle_change*/ ctx[11]), false, true, false),
    				listen_dev(input0, "input", /*input0_input_handler*/ ctx[20]),
    				listen_dev(input1, "input", prevent_default(/*handle_change*/ ctx[11]), false, true, false),
    				listen_dev(input1, "input", /*input1_input_handler*/ ctx[21]),
    				listen_dev(input2, "input", prevent_default(/*handle_change*/ ctx[11]), false, true, false),
    				listen_dev(input2, "input", /*input2_input_handler*/ ctx[22]),
    				listen_dev(input3, "input", prevent_default(/*handle_change*/ ctx[11]), false, true, false),
    				listen_dev(input3, "input", /*input3_input_handler*/ ctx[23])
    			];
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(input0, get_spread_update(input0_levels, [
    				dirty & /*_settings*/ 256 && /*_settings*/ ctx[8],
    				{ name: "first" },
    				{ placeholder: "ej: 80" }
    			]));

    			if (dirty & /*first*/ 4 && input0.value !== /*first*/ ctx[2]) {
    				set_input_value(input0, /*first*/ ctx[2]);
    			}

    			set_attributes(input1, get_spread_update(input1_levels, [
    				{ name: "second" },
    				{ placeholder: "ej: 75" },
    				dirty & /*_settings*/ 256 && /*_settings*/ ctx[8]
    			]));

    			if (dirty & /*second*/ 8 && input1.value !== /*second*/ ctx[3]) {
    				set_input_value(input1, /*second*/ ctx[3]);
    			}

    			if (dirty & /*matches*/ 16777216 && div2_class_value !== (div2_class_value = `flex ${/*matches*/ ctx[24] ? "flex-row" : "flex-col"}`)) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			set_attributes(input2, get_spread_update(input2_levels, [
    				{ name: "practique" },
    				{ placeholder: "ej: 90" },
    				dirty & /*_settings*/ 256 && /*_settings*/ ctx[8]
    			]));

    			if (dirty & /*practique*/ 2 && input2.value !== /*practique*/ ctx[1]) {
    				set_input_value(input2, /*practique*/ ctx[1]);
    			}

    			set_attributes(input3, get_spread_update(input3_levels, [
    				{ name: "third" },
    				{ placeholder: "ej: 90" },
    				dirty & /*_settings*/ 256 && /*_settings*/ ctx[8]
    			]));

    			if (dirty & /*third*/ 16 && input3.value !== /*third*/ ctx[4]) {
    				set_input_value(input3, /*third*/ ctx[4]);
    			}

    			if (dirty & /*matches*/ 16777216 && div5_class_value !== (div5_class_value = `flex ${/*matches*/ ctx[24] ? "flex-row" : "flex-col mb-2"}`)) {
    				attr_dev(div5, "class", div5_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div6);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(135:4) <MediaQuery query=\\\"(min-width: 1281px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    // (193:4) {#if matches}
    function create_if_block_2(ctx) {
    	let div3;
    	let div2;
    	let div0;

    	let t0_value = `${/*final_score*/ ctx[5] >= 60
	? "¡ Felicidades has Aprobado :D !"
	: "¡ Oh no has Reprobado :( !"}` + "";

    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let div2_class_value;
    	let t4;
    	let div3_class_value;
    	let if_block = /*final_score*/ ctx[5] < 60 && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*final_score*/ ctx[5]);
    			t3 = text("\n\t\t\t\t\t\t\t\tde 100");
    			t4 = space();
    			if (if_block) if_block.c();
    			add_location(div0, file$1, 197, 7, 5029);
    			attr_dev(div1, "class", "bold margin-score");
    			add_location(div1, file$1, 200, 7, 5156);

    			attr_dev(div2, "class", div2_class_value = `veredict-text failed w-half ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`);

    			add_location(div2, file$1, 195, 6, 4916);
    			attr_dev(div3, "class", div3_class_value = `w-right flex flex-col justify-around h-full ${!/*calculated*/ ctx[6] && "hidden"}`);
    			add_location(div3, file$1, 193, 5, 4817);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div3, t4);
    			if (if_block) if_block.m(div3, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*final_score*/ 32 && t0_value !== (t0_value = `${/*final_score*/ ctx[5] >= 60
			? "¡ Felicidades has Aprobado :D !"
			: "¡ Oh no has Reprobado :( !"}` + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*final_score*/ 32) set_data_dev(t2, /*final_score*/ ctx[5]);

    			if (dirty & /*final_score*/ 32 && div2_class_value !== (div2_class_value = `veredict-text failed w-half ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`)) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (/*final_score*/ ctx[5] < 60) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_3(ctx);
    					if_block.c();
    					if_block.m(div3, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*calculated*/ 64 && div3_class_value !== (div3_class_value = `w-right flex flex-col justify-around h-full ${!/*calculated*/ ctx[6] && "hidden"}`)) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(193:4) {#if matches}",
    		ctx
    	});

    	return block;
    }

    // (206:6) {#if final_score < 60}
    function create_if_block_3(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let div2_class_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Nota mínima para aprobar";
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*min_score*/ ctx[7]);
    			t3 = text("\n\t\t\t\t\t\t\t\t\tde 100");
    			add_location(div0, file$1, 208, 8, 5403);
    			attr_dev(div1, "class", "bold margin-score");
    			add_location(div1, file$1, 209, 8, 5447);

    			attr_dev(div2, "class", div2_class_value = `veredict-text failed w-half ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`);

    			add_location(div2, file$1, 206, 7, 5288);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*min_score*/ 128) set_data_dev(t2, /*min_score*/ ctx[7]);

    			if (dirty & /*final_score*/ 32 && div2_class_value !== (div2_class_value = `veredict-text failed w-half ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`)) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(206:6) {#if final_score < 60}",
    		ctx
    	});

    	return block;
    }

    // (192:3) <MediaQuery query="(min-width: 1281px)" let:matches>
    function create_default_slot_2(ctx) {
    	let if_block_anchor;
    	let if_block = /*matches*/ ctx[24] && create_if_block_2(ctx);

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
    			if (/*matches*/ ctx[24]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(192:3) <MediaQuery query=\\\"(min-width: 1281px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    // (220:2) <MediaQuery query="(min-width: 1281px)" let:matches>
    function create_default_slot_1(ctx) {
    	let div;
    	let button;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "¡Calcular!";
    			attr_dev(button, "id", "calc-btn");
    			attr_dev(button, "class", "button");
    			add_location(button, file$1, 221, 4, 5730);
    			attr_dev(div, "class", "w-full align-center flex flex-row justify-center");
    			add_location(div, file$1, 220, 3, 5663);
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			if (remount) dispose();
    			dispose = listen_dev(button, "click", /*calculate_final*/ ctx[10], false, false, false);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(220:2) <MediaQuery query=\\\"(min-width: 1281px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    // (229:3) {#if !matches}
    function create_if_block(ctx) {
    	let div3;
    	let div2;
    	let div0;

    	let t0_value = `${/*final_score*/ ctx[5] >= 60
	? "¡ Felicidades has Aprobado :D !"
	: "¡ Oh no has Reprobado :( !"}` + "";

    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let div2_class_value;
    	let t4;
    	let div3_class_value;
    	let if_block = /*final_score*/ ctx[5] < 60 && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*final_score*/ ctx[5]);
    			t3 = text("\n\t\t\t\t\t\t\tde 100");
    			t4 = space();
    			if (if_block) if_block.c();
    			add_location(div0, file$1, 233, 6, 6115);
    			attr_dev(div1, "class", "bold margin-score");
    			add_location(div1, file$1, 236, 6, 6239);

    			attr_dev(div2, "class", div2_class_value = `veredict-text failed ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`);

    			add_location(div2, file$1, 231, 5, 6011);
    			attr_dev(div3, "class", div3_class_value = `block w-right flex flex-col ${!/*calculated*/ ctx[6] && "none"}`);
    			add_location(div3, file$1, 229, 4, 5932);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    			append_dev(div3, t4);
    			if (if_block) if_block.m(div3, null);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*final_score*/ 32 && t0_value !== (t0_value = `${/*final_score*/ ctx[5] >= 60
			? "¡ Felicidades has Aprobado :D !"
			: "¡ Oh no has Reprobado :( !"}` + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*final_score*/ 32) set_data_dev(t2, /*final_score*/ ctx[5]);

    			if (dirty & /*final_score*/ 32 && div2_class_value !== (div2_class_value = `veredict-text failed ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`)) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (/*final_score*/ ctx[5] < 60) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div3, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*calculated*/ 64 && div3_class_value !== (div3_class_value = `block w-right flex flex-col ${!/*calculated*/ ctx[6] && "none"}`)) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(229:3) {#if !matches}",
    		ctx
    	});

    	return block;
    }

    // (242:5) {#if final_score < 60}
    function create_if_block_1(ctx) {
    	let div2;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let t3;
    	let div2_class_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "Nota mínima para aprobar";
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*min_score*/ ctx[7]);
    			t3 = text("\n\t\t\t\t\t\t\t\tde 100");
    			add_location(div0, file$1, 244, 7, 6471);
    			attr_dev(div1, "class", "bold margin-score");
    			add_location(div1, file$1, 245, 7, 6514);

    			attr_dev(div2, "class", div2_class_value = `veredict-text failed ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`);

    			add_location(div2, file$1, 242, 6, 6365);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*min_score*/ 128) set_data_dev(t2, /*min_score*/ ctx[7]);

    			if (dirty & /*final_score*/ 32 && div2_class_value !== (div2_class_value = `veredict-text failed ${/*final_score*/ ctx[5] >= 60
			? "aproved-text"
			: "failed-text "}`)) {
    				attr_dev(div2, "class", div2_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(242:5) {#if final_score < 60}",
    		ctx
    	});

    	return block;
    }

    // (228:2) <MediaQuery query="(min-width: 1281px)" let:matches>
    function create_default_slot$1(ctx) {
    	let if_block_anchor;
    	let if_block = !/*matches*/ ctx[24] && create_if_block(ctx);

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
    			if (!/*matches*/ ctx[24]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(228:2) <MediaQuery query=\\\"(min-width: 1281px)\\\" let:matches>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let div1;
    	let div0;
    	let t1;
    	let div5;
    	let div4;
    	let div3;
    	let div2;
    	let label;
    	let p;
    	let t3;
    	let input;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let current;
    	let dispose;

    	let input_levels = [
    		{ placeholder: "ej: 80" },
    		{ name: "theoric" },
    		{ class: "max-m-input" },
    		/*_settings*/ ctx[8]
    	];

    	let input_data = {};

    	for (let i = 0; i < input_levels.length; i += 1) {
    		input_data = assign(input_data, input_levels[i]);
    	}

    	const mediaquery0 = new MediaQuery({
    			props: {
    				query: "(min-width: 1281px)",
    				$$slots: {
    					default: [
    						create_default_slot_3,
    						({ matches }) => ({ 24: matches }),
    						({ matches }) => matches ? 16777216 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const mediaquery1 = new MediaQuery({
    			props: {
    				query: "(min-width: 1281px)",
    				$$slots: {
    					default: [
    						create_default_slot_2,
    						({ matches }) => ({ 24: matches }),
    						({ matches }) => matches ? 16777216 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const mediaquery2 = new MediaQuery({
    			props: {
    				query: "(min-width: 1281px)",
    				$$slots: {
    					default: [
    						create_default_slot_1,
    						({ matches }) => ({ 24: matches }),
    						({ matches }) => matches ? 16777216 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const mediaquery3 = new MediaQuery({
    			props: {
    				query: "(min-width: 1281px)",
    				$$slots: {
    					default: [
    						create_default_slot$1,
    						({ matches }) => ({ 24: matches }),
    						({ matches }) => matches ? 16777216 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Calculadora de promedios ESPOL";
    			t1 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			label = element("label");
    			p = element("p");
    			p.textContent = "Porcentaje teórico";
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			create_component(mediaquery0.$$.fragment);
    			t5 = space();
    			create_component(mediaquery1.$$.fragment);
    			t6 = space();
    			create_component(mediaquery2.$$.fragment);
    			t7 = space();
    			create_component(mediaquery3.$$.fragment);
    			t8 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(div0, "class", "m-nav text-white semibold title");
    			add_location(div0, file$1, 115, 2, 2476);
    			attr_dev(div1, "class", "w-full nav-style");
    			add_location(div1, file$1, 114, 1, 2443);
    			attr_dev(p, "class", "text-label");
    			add_location(p, file$1, 124, 6, 2798);
    			set_attributes(input, input_data);
    			add_location(input, file$1, 125, 6, 2849);
    			attr_dev(label, "class", "flex flex-col");
    			attr_dev(label, "for", "theoric");
    			add_location(label, file$1, 123, 5, 2748);
    			attr_dev(div2, "class", "flex flex-col mb-2 mt-2");
    			add_location(div2, file$1, 122, 4, 2705);
    			attr_dev(div3, "class", "w-left my-auto flex-col flex");
    			add_location(div3, file$1, 121, 3, 2658);
    			attr_dev(div4, "class", "input-container flex-row h-input my-auto");
    			add_location(div4, file$1, 120, 2, 2600);
    			attr_dev(div5, "class", "container");
    			add_location(div5, file$1, 119, 1, 2574);
    			add_location(main, file$1, 113, 0, 2435);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, div0);
    			append_dev(main, t1);
    			append_dev(main, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, label);
    			append_dev(label, p);
    			append_dev(label, t3);
    			append_dev(label, input);
    			set_input_value(input, /*theoric_porcentage*/ ctx[0]);
    			append_dev(div3, t4);
    			mount_component(mediaquery0, div3, null);
    			append_dev(div4, t5);
    			mount_component(mediaquery1, div4, null);
    			append_dev(div5, t6);
    			mount_component(mediaquery2, div5, null);
    			append_dev(div5, t7);
    			mount_component(mediaquery3, div5, null);
    			append_dev(main, t8);
    			mount_component(footer, main, null);
    			current = true;
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(window, "keydown", /*handleKeydown*/ ctx[9], false, false, false),
    				listen_dev(input, "input", prevent_default(/*handle_change*/ ctx[11]), false, true, false),
    				listen_dev(input, "input", /*input_input_handler*/ ctx[19])
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			set_attributes(input, get_spread_update(input_levels, [
    				{ placeholder: "ej: 80" },
    				{ name: "theoric" },
    				{ class: "max-m-input" },
    				dirty & /*_settings*/ 256 && /*_settings*/ ctx[8]
    			]));

    			if (dirty & /*theoric_porcentage*/ 1 && input.value !== /*theoric_porcentage*/ ctx[0]) {
    				set_input_value(input, /*theoric_porcentage*/ ctx[0]);
    			}

    			const mediaquery0_changes = {};

    			if (dirty & /*$$scope, matches, third, practique, second, first*/ 50331678) {
    				mediaquery0_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery0.$set(mediaquery0_changes);
    			const mediaquery1_changes = {};

    			if (dirty & /*$$scope, calculated, final_score, min_score, matches*/ 50331872) {
    				mediaquery1_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery1.$set(mediaquery1_changes);
    			const mediaquery2_changes = {};

    			if (dirty & /*$$scope*/ 33554432) {
    				mediaquery2_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery2.$set(mediaquery2_changes);
    			const mediaquery3_changes = {};

    			if (dirty & /*$$scope, calculated, final_score, min_score, matches*/ 50331872) {
    				mediaquery3_changes.$$scope = { dirty, ctx };
    			}

    			mediaquery3.$set(mediaquery3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(mediaquery0.$$.fragment, local);
    			transition_in(mediaquery1.$$.fragment, local);
    			transition_in(mediaquery2.$$.fragment, local);
    			transition_in(mediaquery3.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(mediaquery0.$$.fragment, local);
    			transition_out(mediaquery1.$$.fragment, local);
    			transition_out(mediaquery2.$$.fragment, local);
    			transition_out(mediaquery3.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(mediaquery0);
    			destroy_component(mediaquery1);
    			destroy_component(mediaquery2);
    			destroy_component(mediaquery3);
    			destroy_component(footer);
    			run_all(dispose);
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
    	let theoric_porcentage = 0;
    	let practique = 0;
    	let first = 0;
    	let second = 0;
    	let third = 0;
    	let get_higher_sum_avg = 0;
    	let final_score = 0;
    	let calculated = false;

    	let _settings = {
    		maxlength: 3,
    		min: "0",
    		max: "100",
    		type: "number"
    	};

    	let min_score = 0;

    	const handleKeydown = event => {
    		const keyCode = event.keyCode;

    		if (keyCode === 13) {
    			const element = document.getElementById("calc-btn");
    			element.click();
    		}
    	};

    	const calculate_final = () => {
    		if (!calculated) {
    			$$invalidate(6, calculated = true);
    		}

    		const result = theoric_score + practique_Score;
    		$$invalidate(5, final_score = fixed(result));
    		get_min_score(result);
    	};

    	const get_min_score = value => {
    		if (value < 60) {
    			const max_value = Math.max(first, second);
    			const result = (60 - practique_Score) * 2 / (theoric_porcentage / 100) - max_value;

    			// min_score = Math.abs(result);
    			if (isFinite(result)) {
    				$$invalidate(7, min_score = fixed(Math.abs(result)));
    			}
    		}
    	};

    	const fixed = number => {
    		return Math.round((number + Number.EPSILON) * 100) / 100;
    	};

    	const cut_max_value = value => {
    		if (value > 100) {
    			return 100;
    		}

    		if (value < 0) {
    			return 0;
    		}

    		return parseInt(value, 10);
    	};

    	const value_by_name = (name, value) => {
    		switch (name) {
    			case "theoric":
    				$$invalidate(0, theoric_porcentage = cut_max_value(value));
    				return;
    			case "first":
    				$$invalidate(2, first = cut_max_value(value));
    				return;
    			case "second":
    				$$invalidate(3, second = cut_max_value(value));
    				return;
    			case "third":
    				$$invalidate(4, third = cut_max_value(value));
    				return;
    			case "practique":
    				$$invalidate(1, practique = cut_max_value(value));
    				return;
    			default:
    				return 0;
    		}
    	};

    	const handle_change = evt => {
    		const { target } = evt;
    		const { value, name } = target;
    		const parsed_value = parseInt(value, 10);
    		value_by_name(name, parsed_value);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	function input_input_handler() {
    		theoric_porcentage = this.value;
    		$$invalidate(0, theoric_porcentage);
    	}

    	function input0_input_handler() {
    		first = this.value;
    		$$invalidate(2, first);
    	}

    	function input1_input_handler() {
    		second = this.value;
    		$$invalidate(3, second);
    	}

    	function input2_input_handler() {
    		practique = this.value;
    		$$invalidate(1, practique);
    	}

    	function input3_input_handler() {
    		third = this.value;
    		$$invalidate(4, third);
    	}

    	$$self.$capture_state = () => ({
    		MediaQuery,
    		Footer,
    		theoric_porcentage,
    		practique,
    		first,
    		second,
    		third,
    		get_higher_sum_avg,
    		final_score,
    		calculated,
    		_settings,
    		min_score,
    		handleKeydown,
    		calculate_final,
    		get_min_score,
    		fixed,
    		cut_max_value,
    		value_by_name,
    		handle_change,
    		theoric_score,
    		practique_Score
    	});

    	$$self.$inject_state = $$props => {
    		if ("theoric_porcentage" in $$props) $$invalidate(0, theoric_porcentage = $$props.theoric_porcentage);
    		if ("practique" in $$props) $$invalidate(1, practique = $$props.practique);
    		if ("first" in $$props) $$invalidate(2, first = $$props.first);
    		if ("second" in $$props) $$invalidate(3, second = $$props.second);
    		if ("third" in $$props) $$invalidate(4, third = $$props.third);
    		if ("get_higher_sum_avg" in $$props) $$invalidate(12, get_higher_sum_avg = $$props.get_higher_sum_avg);
    		if ("final_score" in $$props) $$invalidate(5, final_score = $$props.final_score);
    		if ("calculated" in $$props) $$invalidate(6, calculated = $$props.calculated);
    		if ("_settings" in $$props) $$invalidate(8, _settings = $$props._settings);
    		if ("min_score" in $$props) $$invalidate(7, min_score = $$props.min_score);
    		if ("theoric_score" in $$props) theoric_score = $$props.theoric_score;
    		if ("practique_Score" in $$props) practique_Score = $$props.practique_Score;
    	};

    	let theoric_score;
    	let practique_Score;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*first, second, third*/ 28) {
    			 {
    				const int_first = parseInt(first, 10) || 0;
    				const int_second = parseInt(second, 10) || 0;
    				const int_third = parseInt(third, 10) || 0;
    				const to_substract = Math.min(int_first, int_second, int_third);
    				const total = int_first + int_second + int_third - to_substract;
    				$$invalidate(12, get_higher_sum_avg = total / 2);
    			}
    		}

    		if ($$self.$$.dirty & /*get_higher_sum_avg, theoric_porcentage*/ 4097) {
    			 theoric_score = get_higher_sum_avg * (theoric_porcentage / 100);
    		}

    		if ($$self.$$.dirty & /*practique, theoric_porcentage*/ 3) {
    			 practique_Score = practique * ((100 - theoric_porcentage) / 100);
    		}
    	};

    	return [
    		theoric_porcentage,
    		practique,
    		first,
    		second,
    		third,
    		final_score,
    		calculated,
    		min_score,
    		_settings,
    		handleKeydown,
    		calculate_final,
    		handle_change,
    		get_higher_sum_avg,
    		theoric_score,
    		practique_Score,
    		get_min_score,
    		fixed,
    		cut_max_value,
    		value_by_name,
    		input_input_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
