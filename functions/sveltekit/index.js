var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@sveltejs/kit/src/exports/node/polyfills.js
function installPolyfills() {
  for (const name in globals) {
    if (name in globalThis)
      continue;
    Object.defineProperty(globalThis, name, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: globals[name]
    });
  }
}
var import_node_buffer, import_node_crypto, File, globals;
var init_polyfills = __esm({
  "node_modules/@sveltejs/kit/src/exports/node/polyfills.js"() {
    init_shims();
    import_node_buffer = __toESM(require("node:buffer"), 1);
    import_node_crypto = require("node:crypto");
    File = /** @type {import('node:buffer') & { File?: File}} */
    import_node_buffer.default.File;
    globals = {
      crypto: import_node_crypto.webcrypto,
      File
    };
  }
});

// node_modules/svelte-adapter-firebase/src/files/shims.js
var init_shims = __esm({
  "node_modules/svelte-adapter-firebase/src/files/shims.js"() {
    init_polyfills();
    installPolyfills();
  }
});

// .svelte-kit/output/server/chunks/ssr.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component23) {
  current_component = component23;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function validate_component(component23, name) {
  if (!component23 || !component23.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(
      `<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
    );
  }
  return component23;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      // these will be immediately discarded
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css22) => css22.code).join("\n"),
          map: null
          // TODO
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
var current_component, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_ssr = __esm({
  ".svelte-kit/output/server/chunks/ssr.js"() {
    init_shims();
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module2, file) {
    if (!module2)
      return;
    for (const key2 in module2) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    init_shims();
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str[i];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i) + replacement;
      last_pos = i + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
function enumerable_symbols(object) {
  return Object.getOwnPropertySymbols(object).filter(
    (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
  );
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    init_shims();
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys.push(`[${i}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i) => i in thing ? stringify2(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_shims();
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants = __esm({
  "node_modules/devalue/src/constants.js"() {
    init_shims();
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_shims();
    init_constants();
  }
});

// node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index24 = p++;
    indexes.set(thing, index24);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index24] = `["${key2}",${flatten(value2)}]`;
        return index24;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          const valid = !isNaN(thing.getDate());
          str = `["Date","${valid ? thing.toISOString() : ""}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys.push(`[${i}]`);
              str += flatten(thing[i]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
            keys.pop();
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (enumerable_symbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index24] = str;
    return index24;
  }
  const index23 = flatten(value);
  if (index23 < 0)
    return `${index23}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_shims();
    init_utils();
    init_constants();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_shims();
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    init_shims();
    exports.parse = parse3;
    exports.serialize = serialize2;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse3(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index23 = 0;
      while (index23 < str.length) {
        var eqIdx = str.indexOf("=", index23);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index23);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index23 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index23, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index23 = endIdx + 1;
      }
      return obj;
    }
    function serialize2(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module2) {
    "use strict";
    init_shims();
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides = part.split("=");
        var key2 = sides.shift().trimLeft().toLowerCase();
        var value2 = sides.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse3(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module2.exports = parse3;
    module2.exports.parse = parse3;
    module2.exports.parseString = parseString2;
    module2.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var MediaQuery, css, Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_shims();
    init_ssr();
    MediaQuery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { query } = $$props;
      let matches = false;
      if ($$props.query === void 0 && $$bindings.query && query !== void 0)
        $$bindings.query(query);
      return `${slots.default ? slots.default({ matches }) : ``}`;
    });
    css = {
      code: 'body{margin:0px;background-color:#6f1f8f;font-family:"Inter", sans-serif}.slot.svelte-dfyjk8{color:white;max-width:96.25%;width:2000px;margin:auto;display:flex}.nav-bar.svelte-dfyjk8{width:100%;text-transform:uppercase;justify-content:space-between;background-color:#222;height:42px;z-index:2;position:fixed;top:0;left:0;display:flex}.home-button.svelte-dfyjk8{background:linear-gradient(219.01deg, #eb6c85 0%, #c265e8 100%);padding:12px;color:#f4eaec;font-weight:700;display:flex;flex-direction:column}.links.svelte-dfyjk8{color:white;font-weight:700;height:42px;display:flex}a.svelte-dfyjk8{color:#fff !important;text-decoration:none}a.svelte-dfyjk8:hover{background-color:#444;text-shadow:none}.link.svelte-dfyjk8{padding:12px;display:flex;flex-direction:column}',
      map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n  import MediaQuery from \\"./MediaQuery.svelte\\";\\n  import { beforeUpdate } from \\"svelte\\";\\n  //   import { MetaTags } from 'svelte-meta-tags'\\n  export let atDocs = false;\\n  beforeUpdate(() => {\\n    if (location !== undefined) {\\n      atDocs =\\n        location.href === \\"http://localhost:1234/docs\\" ||\\n        location.href === \\"https://sayitwithflair.com/docs\\";\\n    }\\n  });\\n</script>\\n\\n<div class=\\"page-container\\">\\n  <!-- Desktop -->\\n  <MediaQuery query=\\"(min-width: 700px)\\" let:matches>\\n    {#if matches}\\n      <div class=\\"container\\">\\n        <nav class=\\"nav-bar\\">\\n          <div class=\\"links\\">\\n            <a href=\\"https://12triangles.com\\" class=\\"home-button\\"\\n              >12 Triangles</a\\n            >\\n            <a class=\\"link\\" href=\\"/\\">Flair</a>\\n          </div>\\n          <div class=\\"links\\">\\n            <a class=\\"link\\" href=\\"/how-to-use-flair\\">How to Flair</a>\\n            <a class=\\"link\\" href=\\"/themes\\">Themes</a>\\n          </div>\\n        </nav>\\n        <div class=\\"slot\\">\\n          <slot />\\n        </div>\\n      </div>\\n    {/if}\\n  </MediaQuery>\\n  <!-- Mobile -->\\n  <MediaQuery query=\\"(max-width: 699px)\\" let:matches>\\n    {#if matches}\\n      <div class=\\"container-mobile\\">\\n        <nav class=\\"nav-bar\\">\\n          <div class=\\"links\\">\\n            <a href=\\"https://12triangles.com\\" class=\\"home-button\\"\\n              >12 Triangles</a\\n            >\\n            <a class=\\"link\\" href=\\"/\\">Flair</a>\\n          </div>\\n          <div class=\\"links\\">\\n            <a class=\\"link\\" href=\\"/how-to-flair\\">Help</a>\\n            <a class=\\"link\\" href=\\"/themes\\">Themes</a>\\n          </div>\\n        </nav>\\n        <div class=\\"slot\\">\\n          <slot />\\n        </div>\\n      </div>\\n    {/if}\\n  </MediaQuery>\\n</div>\\n\\n<style>\\n  :global(body) {\\n    margin: 0px;\\n    background-color: #6f1f8f;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  .slot {\\n    color: white;\\n    max-width: 96.25%;\\n    width: 2000px;\\n    margin: auto;\\n    display: flex;\\n  }\\n\\n  .nav-bar {\\n    width: 100%;\\n    text-transform: uppercase;\\n    justify-content: space-between;\\n    background-color: #222;\\n    height: 42px;\\n    z-index: 2;\\n    position: fixed;\\n    top: 0;\\n    left: 0;\\n    display: flex;\\n  }\\n\\n  .home-button {\\n    background: linear-gradient(219.01deg, #eb6c85 0%, #c265e8 100%);\\n    padding: 12px;\\n    color: #f4eaec;\\n    font-weight: 700;\\n    display: flex;\\n    flex-direction: column;\\n  }\\n\\n  .links {\\n    color: white;\\n    font-weight: 700;\\n    height: 42px;\\n    display: flex;\\n  }\\n\\n  a {\\n    color: #fff !important;\\n\\n    text-decoration: none;\\n  }\\n\\n  a:hover {\\n    background-color: #444;\\n    text-shadow: none;\\n  }\\n\\n  .link {\\n    padding: 12px;\\n    display: flex;\\n    flex-direction: column;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA8DU,IAAM,CACZ,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,OAAO,CACzB,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEA,mBAAM,CACJ,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IACX,CAEA,sBAAS,CACP,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,SAAS,CACzB,eAAe,CAAE,aAAa,CAC9B,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IACX,CAEA,0BAAa,CACX,UAAU,CAAE,gBAAgB,SAAS,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAChE,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB,CAEA,oBAAO,CACL,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IACX,CAEA,eAAE,CACA,KAAK,CAAE,IAAI,CAAC,UAAU,CAEtB,eAAe,CAAE,IACnB,CAEA,eAAC,MAAO,CACN,gBAAgB,CAAE,IAAI,CACtB,WAAW,CAAE,IACf,CAEA,mBAAM,CACJ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAClB"}`
    };
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { atDocs = false } = $$props;
      if ($$props.atDocs === void 0 && $$bindings.atDocs && atDocs !== void 0)
        $$bindings.atDocs(atDocs);
      $$result.css.add(css);
      return `<div class="page-container"> ${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: "(min-width: 700px)" }, {}, {
        default: ({ matches }) => {
          return `${matches ? `<div class="container"><nav class="nav-bar svelte-dfyjk8" data-svelte-h="svelte-1cubomj"><div class="links svelte-dfyjk8"><a href="https://12triangles.com" class="home-button svelte-dfyjk8">12 Triangles</a> <a class="link svelte-dfyjk8" href="/">Flair</a></div> <div class="links svelte-dfyjk8"><a class="link svelte-dfyjk8" href="/how-to-use-flair">How to Flair</a> <a class="link svelte-dfyjk8" href="/themes">Themes</a></div></nav> <div class="slot svelte-dfyjk8">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
        }
      })}  ${validate_component(MediaQuery, "MediaQuery").$$render($$result, { query: "(max-width: 699px)" }, {}, {
        default: ({ matches }) => {
          return `${matches ? `<div class="container-mobile"><nav class="nav-bar svelte-dfyjk8" data-svelte-h="svelte-my90rj"><div class="links svelte-dfyjk8"><a href="https://12triangles.com" class="home-button svelte-dfyjk8">12 Triangles</a> <a class="link svelte-dfyjk8" href="/">Flair</a></div> <div class="links svelte-dfyjk8"><a class="link svelte-dfyjk8" href="/how-to-flair">Help</a> <a class="link svelte-dfyjk8" href="/themes">Themes</a></div></nav> <div class="slot svelte-dfyjk8">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
        }
      })} </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    init_shims();
    index = 0;
    component = async () => component_cache ??= (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    imports = ["_app/immutable/nodes/0.osDX-12L.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets = ["_app/immutable/assets/0.BdphCcYt.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
function get(key2, parse3 = JSON.parse) {
  try {
    return parse3(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_shims();
    init_ssr();
    init_exports();
    init_devalue();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get(SCROLL_KEY) ?? {};
    get(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    init_shims();
    index2 = 1;
    component2 = async () => component_cache2 ??= (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    imports2 = ["_app/immutable/nodes/1.DS36Zn2k.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js", "_app/immutable/chunks/entry.BZIRZRT2.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
var css2, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css2 = {
      code: '.svelte-1p9xxvj{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;background-color:#6f1f8f !important;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1p9xxvj{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1p9xxvj{width:100%;height:100%;background-color:#6f1f8f;z-index:0;position:absolute;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1p9xxvj{position:absolute;background-color:#ff5f6996;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1p9xxvj{position:absolute;background-color:#ff5f6996;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1p9xxvj{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1p9xxvj{width:200px;height:60px;margin:0px auto 24px}.flair-text.svelte-1p9xxvj{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1p9xxvj{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1p9xxvj{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1p9xxvj{max-width:96.25%;width:480px;height:256px}a.svelte-1p9xxvj{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1p9xxvj{font-size:24px}.container-text.svelte-1p9xxvj{font-size:16px;font-weight:400}}.small-logo.svelte-1p9xxvj{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <br />\\n  <br />\\n\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    background-color: #6f1f8f !important;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-color: #6f1f8f;\\n    z-index: 0;\\n    position: absolute;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #ff5f6996;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #ff5f6996;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css2);
      return `<br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj">  <div class="bokeh svelte-1p9xxvj" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1p9xxvj"></div> <div class="right-bokeh svelte-1p9xxvj"></div></div>  <div class="card-container svelte-1p9xxvj" data-svelte-h="svelte-m4frei"><br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj"> <a href="/" class="svelte-1p9xxvj"><img class="big-logo svelte-1p9xxvj" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1p9xxvj">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj"> <div class="app-stores svelte-1p9xxvj"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1p9xxvj"><img class="store apple svelte-1p9xxvj" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1p9xxvj"> <br class="svelte-1p9xxvj">  <div class="card-list svelte-1p9xxvj"><div class="svelte-1p9xxvj"><img class="card svelte-1p9xxvj" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1p9xxvj">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1p9xxvj"><img class="card svelte-1p9xxvj" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1p9xxvj">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1p9xxvj"><img class="card svelte-1p9xxvj" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1p9xxvj">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1p9xxvj"><img class="card svelte-1p9xxvj" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1p9xxvj">Quickly Share Your Stickers Anywhere!</div></div></div>  <div class="app-stores svelte-1p9xxvj"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1p9xxvj"><img class="store apple svelte-1p9xxvj" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1p9xxvj"><a class="footer-link svelte-1p9xxvj" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1p9xxvj" href="/terms">Terms of Service</a></div> <br class="svelte-1p9xxvj"> <div class="small-logo svelte-1p9xxvj"><a class="footer-link svelte-1p9xxvj" href="/"><img class="small-logo svelte-1p9xxvj" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1p9xxvj" href="https://12triangles.com"><img class="small-logo svelte-1p9xxvj" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1p9xxvj"> <div class="contact svelte-1p9xxvj">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1p9xxvj"> <div class="contact svelte-1p9xxvj">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1p9xxvj"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    init_shims();
    index3 = 2;
    component3 = async () => component_cache3 ??= (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    imports3 = ["_app/immutable/nodes/2.BdewQJTo.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets3 = ["_app/immutable/assets/2.CZ0fQkRX.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/entries/pages/acrylic/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => Page2
});
var css3, Page2;
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/acrylic/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css3 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css3);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    init_shims();
    index4 = 3;
    component4 = async () => component_cache4 ??= (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default;
    imports4 = ["_app/immutable/nodes/3.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets4 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/black-ink/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => Page3
});
var css4, Page3;
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/black-ink/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css4 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css4);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  stylesheets: () => stylesheets5
});
var index5, component_cache5, component5, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    init_shims();
    index5 = 4;
    component5 = async () => component_cache5 ??= (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default;
    imports5 = ["_app/immutable/nodes/4.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets5 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/collage-paper/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => Page4
});
var css5, Page4;
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/collage-paper/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css5 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css5);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_shims();
    index6 = 5;
    component6 = async () => component_cache6 ??= (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default;
    imports6 = ["_app/immutable/nodes/5.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets6 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/colorful-foil/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => Page5
});
var css6, Page5;
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/colorful-foil/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css6 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoGE,eAAE,CACA,MAAM,CAAE,GAAG,CACX,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,IAAM,CACZ,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,SAAW,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,YAAY,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAC9C,CAEA,8BAAgB,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACX,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,sBAAsB,CACxC,eAAe,CAAE,KAAK,CACtB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GACR,CAEA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,SAAS,CAC3B,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,KAAK,CACpB,CAEA,2BAAa,CACX,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,SAAS,CAC3B,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,KAAK,CACpB,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,GACnB,CAEA,0BAAY,CACV,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CAEf,MAAM,CAAE,IAAI,CAEZ,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,MAAM,CACb,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC1B,CAEA,8BAAgB,CACd,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,GAAG,CAAC,IACnB,CAEA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,YAAY,CAC7B,MAAM,CAAE,IAAI,CAAC,IACf,CAEA,oBAAM,CACJ,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KACV,CAEA,gBAAE,CACA,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OACT,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAY,CACV,SAAS,CAAE,IACb,CAEA,8BAAgB,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GACf,CACF,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,KAAK,CAAE,KACT,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IACnB"}'
    };
    Page5 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css6);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/6.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/6.js"() {
    init_shims();
    index7 = 6;
    component7 = async () => component_cache7 ??= (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default;
    imports7 = ["_app/immutable/nodes/6.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets7 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/colorful-marble/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => Page6
});
var css7, Page6;
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/colorful-marble/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css7 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page6 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css7);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/7.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/7.js"() {
    init_shims();
    index8 = 7;
    component8 = async () => component_cache8 ??= (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default;
    imports8 = ["_app/immutable/nodes/7.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets8 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/gold-foil/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => Page7
});
var css8, Page7;
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/gold-foil/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css8 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page7 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css8);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_shims();
    index9 = 8;
    component9 = async () => component_cache9 ??= (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default;
    imports9 = ["_app/immutable/nodes/8.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets9 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/gold-marble/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => Page8
});
var css9, Page8;
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/gold-marble/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css9 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page8 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css9);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  stylesheets: () => stylesheets10
});
var index10, component_cache10, component10, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_shims();
    index10 = 9;
    component10 = async () => component_cache10 ??= (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default;
    imports10 = ["_app/immutable/nodes/9.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets10 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/gold-paper/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => Page9
});
var css10, Page9;
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/gold-paper/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css10 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoGE,eAAE,CACA,MAAM,CAAE,GAAG,CACX,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,IAAM,CACZ,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,SAAW,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,YAAY,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAC9C,CAEA,8BAAgB,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACX,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,sBAAsB,CACxC,eAAe,CAAE,KAAK,CACtB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GACR,CAEA,0BAAY,CACV,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,SAAS,CAC3B,IAAI,CAAE,IAAI,CACV,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,KAAK,CACpB,CAEA,2BAAa,CACX,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,SAAS,CAC3B,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,KAAK,KAAK,CACpB,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,GACnB,CAEA,0BAAY,CACV,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CAEf,MAAM,CAAE,IAAI,CAEZ,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,MAAM,CACb,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC1B,CAEA,8BAAgB,CACd,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,GAAG,CAAC,IACnB,CAEA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,YAAY,CAC7B,MAAM,CAAE,IAAI,CAAC,IACf,CAEA,oBAAM,CACJ,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KACV,CAEA,gBAAE,CACA,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OACT,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAY,CACV,SAAS,CAAE,IACb,CAEA,8BAAgB,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GACf,CACF,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,KAAK,CAAE,KACT,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IACnB"}'
    };
    Page9 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css10);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  stylesheets: () => stylesheets11
});
var index11, component_cache11, component11, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_shims();
    index11 = 10;
    component11 = async () => component_cache11 ??= (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default;
    imports11 = ["_app/immutable/nodes/10.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets11 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/entries/pages/gradients/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => Page10
});
var css11, Page10;
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/gradients/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css11 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page10 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css11);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  fonts: () => fonts12,
  imports: () => imports12,
  index: () => index12,
  stylesheets: () => stylesheets12
});
var index12, component_cache12, component12, imports12, stylesheets12, fonts12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_shims();
    index12 = 11;
    component12 = async () => component_cache12 ??= (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default;
    imports12 = ["_app/immutable/nodes/11.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets12 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts12 = [];
  }
});

// .svelte-kit/output/server/entries/pages/halftone/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => Page11
});
var css12, Page11;
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/halftone/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css12 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page11 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css12);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  fonts: () => fonts13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component_cache13, component13, imports13, stylesheets13, fonts13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_shims();
    index13 = 12;
    component13 = async () => component_cache13 ??= (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default;
    imports13 = ["_app/immutable/nodes/12.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets13 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts13 = [];
  }
});

// .svelte-kit/output/server/entries/pages/holographic/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => Page12
});
var css13, Page12;
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/holographic/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css13 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page12 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css13);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  fonts: () => fonts14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component_cache14, component14, imports14, stylesheets14, fonts14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_shims();
    index14 = 13;
    component14 = async () => component_cache14 ??= (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default;
    imports14 = ["_app/immutable/nodes/13.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets14 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/how-to-flair/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => Page13
});
var css14, Page13;
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/how-to-flair/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css14 = {
      code: '.svelte-1auqvxc{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1auqvxc{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1auqvxc{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.app-stores.svelte-1auqvxc{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1auqvxc{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1auqvxc{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1auqvxc{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1auqvxc{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1auqvxc{max-width:96.25%;width:480px;height:256px}a.svelte-1auqvxc{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1auqvxc{font-size:24px}.container-text.svelte-1auqvxc{font-size:16px;font-weight:400}}.small-logo.svelte-1auqvxc{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1auqvxc{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1auqvxc{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<div class=\\"card-container\\">\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <br />\\n  <br />\\n\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">Popular Themes, Specially Picked For You</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Make Your Own Stickers and Sticker Packs</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Intuitive Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <br />\\n\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    /* background-color: #6f1f8f !important; */\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .copyright {\\n    color: #1f172e;\\n    text-align: center;\\n    font-size: 12px;\\n    width: 100%;\\n    margin: auto auto 16px;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAyFE,eAAE,CACA,MAAM,CAAE,GAAG,CACX,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,IAAM,CACZ,MAAM,CAAE,GAAG,CAEX,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,OAAO,CAAC,CAAC,UACxB,CAEQ,SAAW,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,YAAY,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,SAAS,CAC9C,CAEA,8BAAgB,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACX,CAEA,qBAAO,CACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,sBAAsB,CACxC,eAAe,CAAE,KAAK,CACtB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GACR,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,GACnB,CAEA,0BAAY,CACV,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CAEZ,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,MAAM,CACb,KAAK,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC1B,CAEA,8BAAgB,CACd,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,GAAG,CAAC,IACnB,CAEA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,YAAY,CAC7B,MAAM,CAAE,IAAI,CAAC,IACf,CAEA,oBAAM,CACJ,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KACV,CAEA,gBAAE,CACA,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OACT,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,0BAAY,CACV,SAAS,CAAE,IACb,CAEA,8BAAgB,CACd,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GACf,CACF,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,KAAK,CAAE,KACT,CAUA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IACV,CAEA,qBAAO,CACL,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IACnB"}'
    };
    Page13 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css14);
      return `<br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <div class="bokeh svelte-1auqvxc" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1auqvxc"></div> <div class="right-bokeh svelte-1auqvxc"></div></div> <div class="card-container svelte-1auqvxc" data-svelte-h="svelte-3o3z54"><br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <a href="/" class="svelte-1auqvxc"><img class="big-logo svelte-1auqvxc" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1auqvxc">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <div class="app-stores svelte-1auqvxc"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1auqvxc"><img class="store apple svelte-1auqvxc" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1auqvxc"> <br class="svelte-1auqvxc"> <div class="card-list svelte-1auqvxc"><div class="svelte-1auqvxc"><img class="card svelte-1auqvxc" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1auqvxc">Popular Themes, Specially Picked For You</div></div> <div class="svelte-1auqvxc"><img class="card svelte-1auqvxc" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1auqvxc">Make Your Own Stickers and Sticker Packs</div></div> <div class="svelte-1auqvxc"><img class="card svelte-1auqvxc" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1auqvxc">Intuitive Graphic Design Tools</div></div> <div class="svelte-1auqvxc"><img class="card svelte-1auqvxc" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1auqvxc">Share Your Stickers Anywhere!</div></div></div> <br class="svelte-1auqvxc"> <div class="small-logo svelte-1auqvxc"><a class="footer-link svelte-1auqvxc" href="/"><img class="small-logo svelte-1auqvxc" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1auqvxc" href="https://12triangles.com"><img class="small-logo svelte-1auqvxc" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1auqvxc"> <div class="contact svelte-1auqvxc">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1auqvxc"> <div class="app-stores svelte-1auqvxc"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1auqvxc"><img class="store apple svelte-1auqvxc" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="contact svelte-1auqvxc">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1auqvxc"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  fonts: () => fonts15,
  imports: () => imports15,
  index: () => index15,
  stylesheets: () => stylesheets15
});
var index15, component_cache15, component15, imports15, stylesheets15, fonts15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_shims();
    index15 = 14;
    component15 = async () => component_cache15 ??= (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default;
    imports15 = ["_app/immutable/nodes/14.BCqnkDMv.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets15 = ["_app/immutable/assets/14.XJawti0E.css"];
    fonts15 = [];
  }
});

// .svelte-kit/output/server/entries/pages/mixed-media/_page.svelte.js
var page_svelte_exports14 = {};
__export(page_svelte_exports14, {
  default: () => Page14
});
var css15, Page14;
var init_page_svelte14 = __esm({
  ".svelte-kit/output/server/entries/pages/mixed-media/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css15 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page14 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css15);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/15.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  fonts: () => fonts16,
  imports: () => imports16,
  index: () => index16,
  stylesheets: () => stylesheets16
});
var index16, component_cache16, component16, imports16, stylesheets16, fonts16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/15.js"() {
    init_shims();
    index16 = 15;
    component16 = async () => component_cache16 ??= (await Promise.resolve().then(() => (init_page_svelte14(), page_svelte_exports14))).default;
    imports16 = ["_app/immutable/nodes/15.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets16 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts16 = [];
  }
});

// .svelte-kit/output/server/entries/pages/pastel/_page.svelte.js
var page_svelte_exports15 = {};
__export(page_svelte_exports15, {
  default: () => Page15
});
var css16, Page15;
var init_page_svelte15 = __esm({
  ".svelte-kit/output/server/entries/pages/pastel/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css16 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page15 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css16);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  fonts: () => fonts17,
  imports: () => imports17,
  index: () => index17,
  stylesheets: () => stylesheets17
});
var index17, component_cache17, component17, imports17, stylesheets17, fonts17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    init_shims();
    index17 = 16;
    component17 = async () => component_cache17 ??= (await Promise.resolve().then(() => (init_page_svelte15(), page_svelte_exports15))).default;
    imports17 = ["_app/immutable/nodes/16.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets17 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts17 = [];
  }
});

// .svelte-kit/output/server/entries/pages/pretty-textures/_page.svelte.js
var page_svelte_exports16 = {};
__export(page_svelte_exports16, {
  default: () => Page16
});
var css17, Page16;
var init_page_svelte16 = __esm({
  ".svelte-kit/output/server/entries/pages/pretty-textures/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css17 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page16 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css17);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports18 = {};
__export(__exports18, {
  component: () => component18,
  fonts: () => fonts18,
  imports: () => imports18,
  index: () => index18,
  stylesheets: () => stylesheets18
});
var index18, component_cache18, component18, imports18, stylesheets18, fonts18;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    init_shims();
    index18 = 17;
    component18 = async () => component_cache18 ??= (await Promise.resolve().then(() => (init_page_svelte16(), page_svelte_exports16))).default;
    imports18 = ["_app/immutable/nodes/17.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets18 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/retro/_page.svelte.js
var page_svelte_exports17 = {};
__export(page_svelte_exports17, {
  default: () => Page17
});
var css18, Page17;
var init_page_svelte17 = __esm({
  ".svelte-kit/output/server/entries/pages/retro/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css18 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page17 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css18);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports19 = {};
__export(__exports19, {
  component: () => component19,
  fonts: () => fonts19,
  imports: () => imports19,
  index: () => index19,
  stylesheets: () => stylesheets19
});
var index19, component_cache19, component19, imports19, stylesheets19, fonts19;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    init_shims();
    index19 = 18;
    component19 = async () => component_cache19 ??= (await Promise.resolve().then(() => (init_page_svelte17(), page_svelte_exports17))).default;
    imports19 = ["_app/immutable/nodes/18.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets19 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts19 = [];
  }
});

// .svelte-kit/output/server/entries/pages/template/_page.svelte.js
var page_svelte_exports18 = {};
__export(page_svelte_exports18, {
  default: () => Page18
});
var css19, Page18;
var init_page_svelte18 = __esm({
  ".svelte-kit/output/server/entries/pages/template/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css19 = {
      code: '.svelte-16rqfy9{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-16rqfy9{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-16rqfy9{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-16rqfy9{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-16rqfy9{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-16rqfy9{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-16rqfy9{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-16rqfy9{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-16rqfy9{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-16rqfy9{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-16rqfy9{max-width:96.25%;width:480px;height:256px}a.svelte-16rqfy9{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-16rqfy9{font-size:24px}.container-text.svelte-16rqfy9{font-size:16px;font-weight:400}}.small-logo.svelte-16rqfy9{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-16rqfy9{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-16rqfy9{width:200px;height:60px;margin:0px auto 24px}.feature-link-group.svelte-16rqfy9{display:flex;flex-wrap:wrap;margin:64px auto;max-width:960px;justify-content:center}.hover-effect.svelte-16rqfy9{width:240px;height:240px;margin:auto 32px;border-radius:120px;background-size:contain}.hover-effect.svelte-16rqfy9:hover{box-shadow:0 0 0 16px #fff inset;transition:all 0.25s}.hover-effect.svelte-16rqfy9:not(:hover){box-shadow:0 0 0 0px #fff inset;transition:all 0.25s}.flair.svelte-16rqfy9{background-image:url("/watercolor.jpg");background-position:center;background-size:cover}.icg.svelte-16rqfy9{background-image:url("../assets/icgPreview.jpg")}.ionhipster.svelte-16rqfy9{background-image:url("../assets/ionhipsterPreview.jpg")}.title.svelte-16rqfy9{text-transform:uppercase;text-align:center;font-size:12px;font-weight:700;padding-top:16px;padding-bottom:32px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <div class=\\"feature-link-group\\">\\n    <a href=\\"https://sayitwithflair.com\\">\\n      <div class=\\"hover-effect flair\\" />\\n      <div class=\\"title\\">Watercolor</div>\\n    </a>\\n    <a href=\\"https://instantcardgrading.com\\">\\n      <div class=\\"hover-effect icg\\" />\\n      <div class=\\"title\\">Instant Card Grading</div>\\n    </a>\\n    <!-- <a href=\\"https://magnetic.photo\\">\\n      <div class=\\"hover-effect magnetic\\" />\\n      <div class=\\"title\\">Magnetic</div>\\n    </a> -->\\n    <a href=\\"https://ionhipster.com\\">\\n      <div class=\\"hover-effect ionhipster\\" />\\n      <div class=\\"title\\">ionhipster</div>\\n    </a>\\n  </div>\\n  <br />\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n\\n  .feature-link-group {\\n    display: flex;\\n    flex-wrap: wrap;\\n    margin: 64px auto;\\n    max-width: 960px;\\n    justify-content: center;\\n  }\\n\\n  .hover-effect {\\n    width: 240px;\\n    height: 240px;\\n    margin: auto 32px;\\n    border-radius: 120px;\\n    background-size: contain;\\n  }\\n\\n  .hover-effect:hover {\\n    box-shadow: 0 0 0 16px #fff inset;\\n    transition: all 0.25s;\\n  }\\n\\n  .hover-effect:not(:hover) {\\n    box-shadow: 0 0 0 0px #fff inset;\\n    transition: all 0.25s;\\n  }\\n\\n  .flair {\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-position: center;\\n    background-size: cover;\\n  }\\n\\n  .icg {\\n    background-image: url(\\"../assets/icgPreview.jpg\\");\\n  }\\n\\n  .ionhipster {\\n    background-image: url(\\"../assets/ionhipsterPreview.jpg\\");\\n  }\\n\\n  .title {\\n    text-transform: uppercase;\\n    /* color: #6f1f8f; */\\n    text-align: center;\\n    font-size: 12px;\\n    font-weight: 700;\\n    padding-top: 16px;\\n    padding-bottom: 32px;\\n  }\\n\\n  /* a {\\n    color: #6f1f8f;\\n    text-decoration: none;\\n  } */\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page18 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css19);
      return `<br class="svelte-16rqfy9"> <br class="svelte-16rqfy9">  <div class="bokeh svelte-16rqfy9" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-16rqfy9"></div> <div class="right-bokeh svelte-16rqfy9"></div></div>  <div class="card-container svelte-16rqfy9" data-svelte-h="svelte-1o565u8"> <br class="svelte-16rqfy9"> <br class="svelte-16rqfy9"> <br class="svelte-16rqfy9"> <br class="svelte-16rqfy9"> <a href="/" class="svelte-16rqfy9"><img class="big-logo svelte-16rqfy9" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-16rqfy9">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-16rqfy9"> <br class="svelte-16rqfy9"> <div class="app-stores svelte-16rqfy9"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-16rqfy9"><img class="store apple svelte-16rqfy9" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-16rqfy9"> <br class="svelte-16rqfy9">  <div class="card-list svelte-16rqfy9"><div class="svelte-16rqfy9"><img class="card svelte-16rqfy9" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-16rqfy9">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-16rqfy9"><img class="card svelte-16rqfy9" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-16rqfy9">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-16rqfy9"><img class="card svelte-16rqfy9" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-16rqfy9">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-16rqfy9"><img class="card svelte-16rqfy9" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-16rqfy9">Quickly Share Your Stickers Anywhere!</div></div></div>  <div class="feature-link-group svelte-16rqfy9"><a href="https://sayitwithflair.com" class="svelte-16rqfy9"><div class="hover-effect flair svelte-16rqfy9"></div> <div class="title svelte-16rqfy9">Watercolor</div></a> <a href="https://instantcardgrading.com" class="svelte-16rqfy9"><div class="hover-effect icg svelte-16rqfy9"></div> <div class="title svelte-16rqfy9">Instant Card Grading</div></a>  <a href="https://ionhipster.com" class="svelte-16rqfy9"><div class="hover-effect ionhipster svelte-16rqfy9"></div> <div class="title svelte-16rqfy9">ionhipster</div></a></div> <br class="svelte-16rqfy9">  <div class="app-stores svelte-16rqfy9"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-16rqfy9"><img class="store apple svelte-16rqfy9" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-16rqfy9"><a class="footer-link svelte-16rqfy9" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-16rqfy9" href="/terms">Terms of Service</a></div> <br class="svelte-16rqfy9"> <div class="small-logo svelte-16rqfy9"><a class="footer-link svelte-16rqfy9" href="/"><img class="small-logo svelte-16rqfy9" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-16rqfy9" href="https://12triangles.com"><img class="small-logo svelte-16rqfy9" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-16rqfy9"> <div class="contact svelte-16rqfy9">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-16rqfy9"> <div class="contact svelte-16rqfy9">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-16rqfy9"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports20 = {};
__export(__exports20, {
  component: () => component20,
  fonts: () => fonts20,
  imports: () => imports20,
  index: () => index20,
  stylesheets: () => stylesheets20
});
var index20, component_cache20, component20, imports20, stylesheets20, fonts20;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    init_shims();
    index20 = 19;
    component20 = async () => component_cache20 ??= (await Promise.resolve().then(() => (init_page_svelte18(), page_svelte_exports18))).default;
    imports20 = ["_app/immutable/nodes/19.DLpT0_Yt.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets20 = ["_app/immutable/assets/19.U5JjkL8A.css"];
    fonts20 = [];
  }
});

// .svelte-kit/output/server/entries/pages/terms/_page.svelte.js
var page_svelte_exports19 = {};
__export(page_svelte_exports19, {
  default: () => Page19
});
var css20, Page19;
var init_page_svelte19 = __esm({
  ".svelte-kit/output/server/entries/pages/terms/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css20 = {
      code: ".title.svelte-f8awr0{font-size:48px;font-weight:800;margin-top:126px}.section.svelte-f8awr0{margin:auto;font-size:24px;font-weight:700;max-width:740px}.body-text.svelte-f8awr0{margin:auto;color:#f2f2f2;line-height:2;max-width:740px}.date-text.svelte-f8awr0{margin:auto;color:#999999;line-height:2;max-width:740px}a.svelte-f8awr0{color:#f2f2f2;text-decoration:underline;font-weight:800}div.svelte-f8awr0{margin:auto;color:#f2f2f2;line-height:2;max-width:740px}.jump.svelte-f8awr0{margin-bottom:160px}",
      map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n\\n  onMount(() => {\\n    window.scrollTo(0, 0);\\n  });\\n</script>\\n\\n<div>\\n  <br />\\n\\n  <div class=\\"title\\">Terms of Use</div>\\n  <div class=\\"date-text\\">Effective January 8, 2023</div>\\n  <div class=\\"jump\\">\\n    Jump to:\\n    <a href=\\"/terms/#privacyPolicy\\">PRIVACY POLICY</a>\\n  </div>\\n\\n  <div class=\\"section\\">1. INTRODUCTION AND ACCEPTANCE</div>\\n  <br />\\n  <div class=\\"body-text\\">\\n    This Terms of Use Agreement (\u201CTerms of Use\u201D) is entered into by and between\\n    12 Triangles, LLC d/b/a 12 Triangles (\u201CCompany\u201D, \u201Cwe\u201D, \u201Cus and \u201Cour\u201D) and\\n    you, and is made effective as of the date of your use of this website (\\n    <a href=\\"https://12triangles.com\\">www.12Triangles.com</a>\\n    ) or any Flair application (\u201CApplication\u201D), or the date of electronic acceptance.\\n    These Terms of Use together with our Privacy Policy (which can be found below,\\n    the \u201CPrivacy Policy\u201D) and any additional terms set forth the general terms and\\n    conditions of your use of the website and the products and services purchased\\n    or accessed through the website or Application (individually and collectively,\\n    the \u201CServices\u201D).\\n  </div>\\n  <br />\\n  <div>\\n    PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING OUR SERVICES. BY\\n    VISITING OR ACCESSING ANY PART OF OUR WEBSITE (OTHER THAN TO READ THESE\\n    TERMS OF USE FOR THE FIRST TIME), DOWNLOADING OUR APPLICATION, PROVIDING\\n    INFORMATION TO US THROUGH THE WEBSITE OR APPLICATION, REGISTERING FOR A\\n    MEMBERSHIP (AS DEFINED HEREIN) OR USING OUR SERVICES IN ANY WAY, YOU (the\\n    terms \u201Cyou\u201D, \u201Cyour\u201D, and \u201Cyours\u201D shall refer to any and all users (INCLUDING\\n    COMPANY USERS AND TEAM USER (AS DEFINED HEREIN)) of the Website, Application\\n    or Services (the \u201CUser\u201D)) EXPRESSLY CONSENT AND AGREE TO BE BOUND BY AND TO\\n    COMPLY WITH THESE TERMS OF USE AND OUR PRIVACY POLICY. THESE TERMS OF USE\\n    AND OUR PRIVACY POLICY MAY CHANGE FROM TIME TO TIME AS SET FORTH IN SECTION\\n    TITLED \u201CAMENDMENTS; ADDITIONAL TERMS\u201D. IF YOU DO NOT AGREE TO BE BOUND BY\\n    THESE TERMS OF USE AND/OR THE PRIVACY POLICY, YOU DO NOT HAVE OUR\\n    AUTHORIZATION TO USE ANY OF THE SERVICES AND YOU MAY NOT ACCESS OR USE ANY\\n    PORTION OF THE WEBSITE OR APPLICATION.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">2. INTELLECTUAL PROPERTY</div>\\n  <br />\\n  <div>\\n    The entire contents displayed on the Website and Application (and any\\n    derivative works or enhancements of the same) including, but not limited to,\\n    all text, fonts, illustrations, files, images, software, scripts, graphics,\\n    photos, sounds, music, videos, information, content, materials, products,\\n    services, URLs, technology, documentation, and interactive features included\\n    with or available through our Services (collectively, the \u201CService Content\u201D)\\n    and all intellectual property rights to the same are owned by us, our\\n    licensors, or both. Additionally, all trademarks, service marks, trade names\\n    and trade dress that may appear in our Services are owned by us, our\\n    licensors, or identified third parties. All Service Content have copyright\\n    protection as a collective work under the laws of the United States and\\n    other copyright laws and, except for the limited use rights granted to you\\n    in these Terms of Use, you shall not acquire any right, title or interest in\\n    our Services or any Service Content. You are allowed to display and, subject\\n    to any expressly stated restrictions or limitations relating to specific\\n    material, download portions of the Service Content from the different areas\\n    of the Website and/or Application only for non-commercial use, unless\\n    otherwise permitted. Any redistribution, retransmission or publication of\\n    any copyrighted material is strictly prohibited without the express written\\n    permission of the copyright owner. You agree not to use any of our logos or\\n    any other proprietary graphic or trademark without our express written\\n    consent. Any rights not expressly granted in these Terms of Use are\\n    expressly reserved.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">3. ACCESS AND USE</div>\\n  <br />\\n  <div>\\n    (A) Our Services are provided for your personal and commercial use except\\n    when our Service Content is used to create end products for sale where the\\n    lifetime sales of the end product for sale exceeds 400 units. An end product\\n    for sale can be either a digital design or physical item created using our\\n    Services that you and/or your client intends to sell (an \u201CEnd Product\u201D). You\\n    understand and agree that End Products you create using our Service Content\\n    must be a unique implementation of the Service Content, significantly\\n    different than the original piece of Service Content and require time,\\n    effort, and skill to produce. For example, if you incorporate the Service\\n    Content into sticker or sticker pack that you design and sell to multiple\\n    people, that is considered an End Product. End Products must not be used or\\n    sold in a way that is directly competitive with the Service Content. End\\n    Products must not redistribute the Service Content to any third parties in a\\n    manner that allows for the extraction of the Service Content. We may offer\\n    certain portions of our Services at no charge and others for a one-time fee,\\n    on a subscription basis or under any other lawful pricing structure. In all\\n    instances, our Services are not being sold to you; rather, subject to these\\n    Terms of Use, and upon your registration for a Membership, you are being\\n    granted or purchasing a revocable, non-exclusive, non-transferable and\\n    limited license to use our Services.\\n  </div>\\n  <br />\\n  <div>\\n    (B) When using our Services, you agree to comply with all applicable\\n    federal, state, and local laws including, without limitation, copyright law.\\n    You acknowledge that you do not acquire any ownership rights by downloading,\\n    installing or printing Service Content.\\n  </div>\\n  <br />\\n  <div>\\n    (C) Furthermore, except as expressly permitted in these Terms of Use, you\\n    may not:\\n  </div>\\n  <br />\\n  <div>\\n    (i) remove, alter, cover, or distort any copyright, trademark, or other\\n    proprietary rights notice we include in or through our Services or Service\\n    Content; (ii) circumvent, disable or otherwise interfere with our\\n    security-related features including, without limitation, any features that\\n    prevent or restrict the use of or copying of any software or other Service\\n    Content; (iii) use an automatic device (such as a robot or spider) or manual\\n    process to copy or \u201Cscrape\u201D the Website or Service Content for any purpose\\n    without our express written permission; (iv) collect or harvest any\\n    personally identifiable information from our Services including, without\\n    limitation, user names, passwords, email addresses; (v) solicit other users\\n    to join or become members of any commercial online service or other\\n    organization without our prior written approval; (vi) attempt to or\\n    interfere with the proper working of our Services or impair, overburden, or\\n    disable the same; (vii) decompile, reverse engineer, or disassemble any\\n    portion of our software or other Service Content, or our Services; (viii)\\n    use network-monitoring software to determine architecture of or extract\\n    usage data from our Services; (ix) encourage conduct that violates any\\n    local, state or federal law, either civil or criminal, or impersonate\\n    another user, person, or entity (e.g., using another person\u2019s Membership;\\n    (x) violate U.S. export laws, including, without limitation, violations of\\n    the Export Administration Act and the Export Administration Regulations\\n    administered by the Department of Commerce; or (xi) engage in any conduct\\n    that restricts or inhibits any other user from using or enjoying our\\n    Services.\\n  </div>\\n  <br />\\n  <div>\\n    (D) You agree to fully cooperate with us to investigate any suspected or\\n    actual activity that is in breach of these Terms of Use.\\n  </div>\\n  <br />\\n  <div>\\n    (E) Additionally, in connection with the use of the Application, you\\n    understand and agree that (i) your use of the Application is conditioned\\n    upon your acceptance of these Terms of Use; (ii) the Application contains\\n    copyrighted material, trade secrets, and other proprietary materials of the\\n    Company and our licensors; (iii) you will only use the Application to access\\n    and/or use the Services; (iv) you will not use any software or services in\\n    conjunction with the Service or authorized third-party software which\\n    modifies or reroutes, or attempts to modify or reroute, the Service; (v) you\\n    will not authorize any third party to access and/or use the Service on your\\n    behalf using any automated process such as a BOT, a spider or periodic\\n    caching of information stored by the Service on your behalf without a\\n    separate written agreement with us; (vi) you will not use any software or\\n    hardware that reduces the number of Users directly accessing or using the\\n    Service (sometimes called 'multiplexing' or 'pooling' software or hardware);\\n    (vii) you will not lend, lease, rent or sublicense the Application; (viii)\\n    you will permit us to send and deliver updates and notifications to you as\\n    part of your use of the Application; (ix) you will allow the Application to\\n    automatically download and install updates from time to time from us which\\n    are designed to improve, enhance and further develop the Application and may\\n    take the form of bug fixes, enhanced functions, new software modules and\\n    completely new versions; and (x) in order to protect those proprietary\\n    materials, except as expressly permitted by applicable law, neither you nor\\n    a third party acting on your behalf will: (a) decompile, disassemble or\\n    reverse engineer the Application; (b) modify or create derivative works of\\n    the Application; (c) use the Application in any manner to provide service\\n    bureau, commercial time-sharing or other computer services to third parties;\\n    (d) transmit the Application or provide its functionality, in whole or in\\n    part, over the Internet or other network (except as expressly permitted\\n    above); (e) sell, distribute, rent, lease, sublicense or otherwise transfer\\n    the Application to a third party; or (f) use components of the Application\\n    to run applications not running on the Application.\\n  </div>\\n  <br />\\n  <div>\\n    (F) Local Language Limitations. Services do not support all local languages.\\n    If a local language is not supported, then the Service will default to\\n    English only.\\n    <!--A list of supported languages include: English, Spanish, French, German, Portuguese, Dutch, Danish, Swedish, Finnish, Norwegian, Indonesian and Italian (this list is subject to change). -->\\n    To the extent that the Services are used with a local language (other than English),\\n    there may be limitations to certain features or functionality within the Service.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">4. USER REGISTRATION</div>\\n  <br />\\n  <div>\\n    (A) In order to access or use some features of our Services, you may have to\\n    become a registered user by registering for a Membership. If you are under\\n    the age of thirteen, then you are not permitted to register as a User or\\n    otherwise submit personal information.\\n  </div>\\n  <br />\\n  <div>\\n    (B) If you become a registered User, you agree to (i) provide true, accurate\\n    and complete registration information for yourself (ii) provide any credit\\n    card or other payment information (the \u201CCredit Card\u201D), if applicable; (iii)\\n    maintain and promptly update your Membership to keep it true, accurate,\\n    current and complete; and (iv) authorize us and our affiliates to charge\\n    your Credit Card for any and all fees incurred by you for your use of the\\n    Services. During registration, you will create a username and password (a\\n    \u201CMembership\u201D). You are responsible for safeguarding and maintaining the\\n    confidentiality of your Membership. You are solely responsible for the\\n    activity that occurs under your Membership, whether or not you have\\n    authorized the activity. You agree to Contact us immediately if you become\\n    aware of any breach of security or unauthorized use of your Membership. If\\n    you provide any information that is untrue, inaccurate, not current or\\n    incomplete, or we have reasonable grounds to suspect that such information\\n    is untrue, inaccurate, not current or incomplete, we have the right to\\n    suspend or terminate your Membership and refuse any and all current or\\n    future use of the Services (or any portion thereof).\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">5. USER CONTENT</div>\\n  <br />\\n  <div>\\n    (A) We may now or in the future permit Users to post, upload, transmit\\n    through, or otherwise make available through our Services and for use or\\n    display to others (collectively, \u201Csubmit\u201D) messages, text, illustrations,\\n    data, files, images, graphics, photos, comments, sounds, music, videos,\\n    information, content, and/or other materials (\u201CUser Content\u201D). Subject to\\n    the rights and license you grant herein, you retain all right, title and\\n    interest in your User Content. We do not guarantee any confidentiality with\\n    respect to User Content even if it is not published through our Services. It\\n    is solely your responsibility to monitor and protect any intellectual\\n    property rights that you may have in your User Content, and we do not accept\\n    any responsibility for the same. You agree that we may reveal your identity\\n    and whatever information we know about you to any law enforcement agent or\\n    official in the event of legal action arising from any User Content posting\\n    by you.\\n  </div>\\n  <br />\\n  <div>\\n    (B) You shall not submit any User Content protected by copyright, trademark,\\n    patent, trade secret, moral right, or other intellectual property or\\n    proprietary right without the express permission of the owner of the\\n    respective right. You are solely liable for any damage resulting from your\\n    failure to obtain such permission or from any other harm resulting from User\\n    Content that you submit.\\n  </div>\\n  <br />\\n  <div>\\n    (C) You represent, warrant, and covenant that you will not submit any User\\n    Content that:\\n  </div>\\n  <br />\\n  <div>\\n    (i) violates or infringes in any way upon the rights of others, including,\\n    but not limited to, any copyright, trademark, patent, trade secret, moral\\n    right, or other intellectual property or proprietary right of any person or\\n    entity; (ii) impersonates another or is unlawful, threatening, abusive,\\n    libelous, defamatory, invasive of privacy or publicity rights, vulgar,\\n    obscene, profane, pornographic, or otherwise objectionable; (iii) encourages\\n    conduct that would constitute a criminal offense, give rise to civil\\n    liability or otherwise violate any law; (iv) is an advertisement for goods\\n    or services or a solicitation of funds; (v) includes personal information\\n    such as messages which identify phone numbers, social security numbers,\\n    account numbers, addresses, or employer references; (vi) contains a formula,\\n    instruction, or advice that could cause harm or injury; or (vii) is a chain\\n    letter of any kind.\\n  </div>\\n  <br />\\n  <div>\\n    Moreover, any conduct by a User that in our sole discretion restricts or\\n    inhibits any other User from using or enjoying our Services will not be\\n    permitted.\\n  </div>\\n  <br />\\n  <div>\\n    (D) We will not use your User Content (e.g., images, etc.) without your\\n    permission. Where you have provided us permission (e.g., to share your image\\n    on Facebook or Instagram, display your image on our Website under a\\n    promotion, etc.), by submitting User Content to us, you simultaneously\\n    grant, or warrant that the owner has expressly granted, to us a worldwide,\\n    royalty-free, perpetual, irrevocable, non-exclusive, fully sublicensable,\\n    and transferable right and license to use, reproduce, distribute, create\\n    derivative works based upon (including, without limitation, translations),\\n    publicly display, publicly perform, transmit, and publish the User Content\\n    (in whole or in part) in the manner you have requested. We may exercise this\\n    for the full term of any copyright that may exist in such User Content.\\n    Furthermore, you also grant other Users permission to access your User\\n    Content and to use, reproduce, distribute, create derivative works based\\n    upon, publicly display, publicly perform, transmit, and publish your User\\n    Content for personal and commercial use as permitted by the functionality of\\n    our Services and these Terms of Use. Notwithstanding the foregoing, you\\n    waive any and all claims you may now or later have in any jurisdiction to\\n    so-called \u201Cmoral rights\u201D or rights of \u201Cdroit moral\u201D with respect to the User\\n    Content.\\n  </div>\\n  <br />\\n  <div>\\n    (E) By submitting User Content, you also grant us the right, but not the\\n    obligation to use your biographical information including, without\\n    limitation, your name and geographical location in connection with\\n    broadcast, print, online, or other use or publication of your User Content;\\n    provided, however, that all such uses will be consistent with the terms of\\n    our Privacy Policy.\\n  </div>\\n  <br />\\n  <div>\\n    (F) Pursuant to a promotion or in certain other instances, you may give us\\n    permission to share or use your User Content on our Website or on a third\\n    party platform. In such instances, you acknowledge and agree that we may use\\n    your User Content to promote our Services and that your User Content may\\n    appear in proximity to third party advertisements and/or content. You\\n    acknowledge and agree that no compensation will be paid to you with respect\\n    to the use of your User Content, as provided herein.\\n  </div>\\n  <br />\\n  <div>\\n    (G) Your participation in communications through the Services, if any and if\\n    allowed by us, will occur in real time and is not edited, censored, or\\n    otherwise controlled by us. We have the right, but not the obligation, to\\n    monitor User Content. We have the right in our sole discretion and for any\\n    reason whatsoever to edit, refuse to post, remove, or disable access to any\\n    User Content.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">\\n    6. SERVICE CONTENT & THIRD PARTY IMAGES, SOFTWARE & LINKS\\n  </div>\\n  <br />\\n  <div>\\n    (A) We provide our Services including, without limitation, Service Content\\n    for educational, entertainment, promotional and/or commercial purposes\\n    expressly stated in this Terms of Use. You may not rely on any information\\n    and opinions expressed through any of our Services for any other purpose. In\\n    all instances, it is your responsibility to evaluate the accuracy,\\n    timeliness, completeness, or usefulness of any Service Content. We do not\\n    assume any responsibility or liability for any User Content, opinion or\\n    other commentary posted on the Website, the Application or any third party\\n    website linked to the Website or Application. We further do not make any\\n    express or implied warranty or guarantee about the accuracy, copyright\\n    compliance, legality, or any other aspect of the Service Content and, under\\n    no circumstances will we be liable for any loss or damage caused by your\\n    reliance on any Service Content.\\n  </div>\\n  <br />\\n  <div>\\n    (B) In many instances, Service Content will include content posted by a\\n    third-party or will represent the opinions and judgments of a third-party.\\n    You understand that we do not endorse, warrant and are not responsible for\\n    the accuracy, timeliness, completeness, or reliability of any opinion,\\n    advice, or statement offered through our Services by anyone other than our\\n    authorized employees or spokespersons while acting in their official\\n    capacities. You further understand and acknowledge that you may be exposed\\n    to third party content that may be offensive, indecent, inaccurate, or\\n    objectionable, and you agree to waive, and hereby do waive, any legal or\\n    equitable rights or remedies you have or may have against us with respect\\n    thereto.\\n  </div>\\n  <br />\\n  <div>\\n    (C) Our Services may link or contain links to other websites maintained by\\n    third parties. It is your responsibility when viewing other websites to\\n    abide by any privacy statements and terms of use posted in connection with\\n    these links. You understand these links may lead unintentionally to websites\\n    containing information that you or others may find inappropriate or\\n    offensive. We do not operate or control, in any respect, or necessarily\\n    endorse the content found on these third-party websites. You assume sole\\n    responsibility for your use of third-party links and agree that we are not\\n    responsible for any content posted on third-party websites or liable to you\\n    for any loss or damage of any sort incurred as a result of your dealings\\n    with any third-party or their website.\\n  </div>\\n  <br />\\n  <div>\\n    (D) As part of our Services, you may be allowed to use certain (i)\\n    photographers, illustrations, or other images (\u201CImages\u201D) and/or (ii)\\n    software, widgets, or other applications (\u201CSoftware\u201D) developed, owned, or\\n    licensed by a third-party. Your use of these Images and Software may be\\n    subject to additional terms. If the Images and Software are accompanied by\\n    or require a license agreement from the third-party provider, you use of the\\n    Images and Software is subject to that license agreement, in addition to\\n    this Terms of Use. You may use the Images and Software solely as part of\\n    Services. Your use of the Images and Software is subject to the following:\\n    (i) You may not remove, modify, or obscure any copyright, trademark, or\\n    other proprietary rights notices that are contained in or on the Images and\\n    Software; (ii) you may not sell, modify, re-use reverse-engineer, decompile,\\n    disassemble, reverse compile, create derivative works of or attempt to\\n    derive the source code from the Images and Software; (iii) Company may\\n    provide your personal information to third-party providers as required to\\n    provide the third-party Images and Software; (iv) Company reserves the right\\n    to modify, change, or discontinue provision of the Images and Software at\\n    any time; (v) Company makes no representations or warranties about any\\n    third-party Images and Software offered in connection with Services, and\\n    expressly disclaims any liability.\\n  </div>\\n  <br />\\n  <div>\\n    You will indemnify, defend, and hold harmless Company from and against any\\n    and all claims imposed upon or incurred by Company directly or indirectly\\n    arising from your use or misuse of the third-party Images and Software. The\\n    providers of the third-party Images and Software are third-party\\n    beneficiaries to these Terms of Use for purposes of enforcing their rights\\n    under these Terms of Use.\\n  </div>\\n  <br />\\n  <div>\\n    The third-party providers listed in this section make no representations or\\n    warranties about any Images or Software offered in connection with the\\n    Services, and expressly disclaim any liability or damages (whether direct,\\n    indirect, or consequential) arising from the use of the Images or Software.\\n  </div>\\n  <br />\\n  <div>\\n    You are responsible for managing and maintaining in good standing any paid\\n    subscription and/or account required with a third-party provider. You must\\n    cancel or terminate your paid subscription and/or account with the\\n    applicable third-party provider and not Company.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">7. FEES AND PAYMENT</div>\\n  <br />\\n  <div>\\n    You agree that your Payment Method may be charged by 12 Triangles, LLC. and\\n    subject to the provisions of our Privacy Policy.\\n  </div>\\n  <br />\\n  <div>\\n    (A) GENERAL TERMS, INCLUDING AUTOMATIC RENEWAL TERMS. Payment Due at Time of\\n    Order; Non-Refundable. You agree to pay all amounts due for Services at the\\n    time you order them. All amounts are non-refundable unless otherwise noted\\n    in the\\n    <a\\n      href=\\"https://www.notion.so/Requesting-a-Refund-a66e34a9b22f439b89cad92865b246ff\\"\\n    >\\n      Refund Policy\\n    </a>\\n    .\\n  </div>\\n  <br />\\n  <div>\\n    Price Changes. Company reserves the right to change its prices and fees at\\n    any time, and such changes shall be posted online at this website and\\n    effective immediately without need for further notice to you. If you have\\n    purchased or obtained Services for a period of months or years, changes in\\n    prices and fees shall be effective when the Services in question come up for\\n    renewal as further described below.\\n  </div>\\n  <br />\\n  <div>\\n    Payment Types. Except as prohibited in any product-specific agreement, you\\n    may pay for Services by using a valid credit card, provided by either Visa,\\n    Mastercard, Amex, or Discover each a \u201CPayment Method\u201D. The \u201CExpress\\n    Checkout\u201D feature automatically places an order for the applicable Service\\n    and charges the default Express Checkout Payment Method for your Account.\\n    Confirmation of that order will be sent to the email address on file for\\n    your Account. Your Payment Method on file must be kept valid if you have any\\n    active Services in your Account. In addition, you agree that the location\\n    for the processing of your payments may change for any reason, including the\\n    type of Payment Method chosen, the currency selected, or changes or updates\\n    made to your Payment Method.\\n  </div>\\n  <br />\\n  <div>\\n    Refunds Issued. You agree that where refunds are issued to your Payment\\n    Method, Company\u2019s issuance of a refund receipt is only confirmation that\\n    Company has submitted your refund to the Payment Method charged at the time\\n    of the original sale, and that Company has no control over when the refund\\n    will be applied towards your Payment Method\u2019s available balance. You further\\n    acknowledge and agree that the payment provider and/or individual issuing\\n    bank associated with your Payment Method establish and regulate the time\\n    frames for posting your refund, and that such refund posting time frames may\\n    range from five (5) business days to a full billing cycle, or longer.\\n  </div>\\n  <br />\\n  <div>\\n    In the event a refund is issued to your Payment Method and the payment\\n    provider, payment processor or individual issuing bank associated with your\\n    Payment Method imposes any limitations on refunds, including but not limited\\n    to, limitations as to the timing of the refund or the number of refunds\\n    allowed, then Company, in its sole and absolute discretion, reserves the\\n    right to issue the refund either (i) in the form of an in-store credit; (ii)\\n    via issuance of a Company check, which will be sent to the mailing address\\n    on file for your Account; or (iii) in some jurisdictions, as a bank\\n    transfer, when the payment processor cannot refund back to the Payment\\n    Method. Company also has the right to offer an in-store credit for customers\\n    seeking refunds, even if there are no limitations on refunds imposed by the\\n    Payment Method.\\n  </div>\\n  <br />\\n  <div>\\n    Monthly Billing Date. If you are being billed on a monthly basis, your\\n    monthly billing date will be based on the date of the month you purchased\\n    the Services, unless that date falls after the 28th of the month, in which\\n    case your billing date will be the 28th of each month.\\n  </div>\\n  <br />\\n  <div>\\n    Auto-Renewal Terms. Other than as required by applicable law, Company does\\n    not retain hard copies or electronic versions of mandate, standing order or\\n    standing instruction forms and/or any signed consents relating to your usage\\n    of our automatic renewal services, and we are therefore unable to provide\\n    any such document upon request. You may view or change your automatic\\n    renewal settings at any time by logging into your Company account.\\n  </div>\\n  <br />\\n  <div>\\n    IN ORDER TO ENSURE THAT YOU DO NOT EXPERIENCE AN INTERRUPTION OR LOSS OF\\n    SERVICES, ALL SERVICES ARE OFFERED ON AUTOMATIC RENEWAL. EXCEPT FOR REASONS\\n    DESCRIBED BELOW IN THIS SECTION, AUTOMATIC RENEWAL AUTOMATICALLY RENEWS THE\\n    APPLICABLE SERVICE UPON EXPIRATION OF THE THEN CURRENT TERM FOR A RENEWAL\\n    PERIOD EQUAL IN TIME TO THE MOST RECENT SERVICE PERIOD. FOR EXAMPLE, IF YOUR\\n    LAST SERVICE PERIOD IS FOR ONE YEAR, YOUR RENEWAL PERIOD WILL TYPICALLY BE\\n    FOR ONE YEAR. HOWEVER, IN THE EVENT RENEWAL WITH THE PAYMENT METHOD ON FILE\\n    FAILS, COMPANY MAY ATTEMPT TO RENEW THE APPLICABLE SERVICE FOR A PERIOD LESS\\n    THAN THE ORIGINAL SUBSCRIPTION PERIOD TO THE EXTENT NECESSARY FOR THE\\n    TRANSACTION TO SUCCEED.\\n  </div>\\n  <br />\\n  <div>\\n    UNLESS YOU DISABLE THE AUTOMATIC RENEWAL OPTION, COMPANY WILL AUTOMATICALLY\\n    RENEW THE APPLICABLE SERVICE WHEN IT COMES UP FOR RENEWAL AND WILL TAKE\\n    PAYMENT FROM THE PAYMENT METHOD ASSOCIATED WITH THE SERVICE(S) IN YOUR\\n    ACCOUNT OR YOUR DESIGNATED BACKUP PAYMENT METHOD(S) ON FILE WITH COMPANY. IN\\n    AUTOMATICALLY RENEWING YOUR SERVICES, COMPANY WILL FIRST ATTEMPT TO CHARGE\\n    THE PAYMENT METHOD ASSOCIATED WITH THE SERVICE(S) IN YOUR ACCOUNT. IN THE\\n    EVENT COMPANY CANNOT SUCCESSFULLY CHARGE THIS PAYMENT METHOD, WE WILL\\n    ATTEMPT TO CHARGE THE PAYMENT METHOD(S) DESIGNATED AS \\"BACKUP\\" IN YOUR\\n    ACCOUNT. RENEWALS WILL BE CHARGED AT COMPANY\u2019S THEN CURRENT RATES, WHICH YOU\\n    ACKNOWLEDGE AND AGREE MAY BE HIGHER OR LOWER THAN THE RATES FOR THE ORIGINAL\\n    SERVICE PERIOD. IN ORDER TO SEE THE RENEWAL SETTINGS APPLICABLE TO YOU AND\\n    YOUR SERVICES, SIMPLY LOG INTO YOUR ACCOUNT MANAGER FROM THIS SITE AND\\n    FOLLOW THE STEPS FOUND HERE. IF YOU DO NOT WISH FOR ANY SERVICE TO\\n    AUTOMATICALLY RENEW, YOU MAY ELECT TO CANCEL RENEWAL, IN WHICH CASE, YOUR\\n    SERVICES WILL TERMINATE UPON EXPIRATION OF THE THEN CURRENT TERM, UNLESS YOU\\n    MANUALLY RENEW YOUR SERVICES PRIOR TO THAT DATE. IN OTHER WORDS, SHOULD YOU\\n    ELECT TO CANCEL YOUR PRODUCT AND FAIL TO MANUALLY RENEW YOUR SERVICES BEFORE\\n    THEY EXPIRE, YOU MAY EXPERIENCE AN INTERRUPTION OR LOSS OF SERVICES, AND\\n    COMPANY SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY REGARDING THE SAME.\\n  </div>\\n  <br />\\n  <div>\\n    IN ADDITION, COMPANY MAY PARTICIPATE IN \u201CRECURRING BILLING PROGRAMS\u201D OR\\n    \u201CACCOUNT UPDATER SERVICES\u201D SUPPORTED BY YOUR CREDIT CARD PROVIDER (AND\\n    ULTIMATELY DEPENDENT ON YOUR BANK\u2019S PARTICIPATION). IF WE ARE UNABLE TO\\n    SUCCESSFULLY CHARGE YOUR EXISTING PAYMENT METHOD, YOUR CREDIT CARD PROVIDER\\n    (OR YOUR BANK) MAY NOTIFY US OF UPDATES TO YOUR CREDIT CARD NUMBER AND/OR\\n    EXPIRATION DATE, OR THEY MAY AUTOMATICALLY CHARGE YOUR NEW CREDIT CARD ON\\n    OUR BEHALF WITHOUT NOTIFICATION TO US. IN ACCORDANCE WITH RECURRING BILLING\\n    PROGRAM REQUIREMENTS, IN THE EVENT THAT WE ARE NOTIFIED OF AN UPDATE TO YOUR\\n    CREDIT CARD NUMBER AND/OR EXPIRATION DATE, COMPANY WILL AUTOMATICALLY UPDATE\\n    YOUR PAYMENT PROFILE ON YOUR BEHALF. COMPANY MAKES NO GUARANTEES THAT WE\\n    WILL REQUEST OR RECEIVE UPDATED CREDIT CARD INFORMATION. YOU ACKNOWLEDGE AND\\n    AGREE THAT IT IS YOUR SOLE RESPONSIBILITY TO MODIFY AND MAINTAIN YOUR\\n    ACCOUNT SETTINGS, INCLUDING BUT NOT LIMITED TO (I) CANCELLING PRODUCTS AND\\n    (II) ENSURING YOUR ASSOCIATED PAYMENT METHOD(S) ARE CURRENT AND VALID.\\n    FURTHER, YOU ACKNOWLEDGE AND AGREE THAT YOUR FAILURE TO DO SO, MAY RESULT IN\\n    THE INTERRUPTION OR LOSS OF SERVICES, AND COMPANY SHALL NOT BE LIABLE TO YOU\\n    OR ANY THIRD PARTY REGARDING THE SAME.\\n  </div>\\n  <br />\\n  <div>\\n    If for any reason Company is unable to charge your Payment Method for the\\n    full amount owed, or if Company receives notification of a chargeback,\\n    reversal, payment dispute, or is charged a penalty for any fee it previously\\n    charged to your Payment Method, you agree that Company may pursue all\\n    available lawful remedies in order to obtain payment, including but not\\n    limited to, immediate cancellation, without notice to you, of any domain\\n    names or Services registered or renewed on your behalf. Company also\\n    reserves the right to charge you reasonable \u201Cadministrative\u201D fees\\" for (i)\\n    tasks Company may perform outside the normal scope of its Services, (ii)\\n    additional time and/or costs Company may incur in providing its Services,\\n    and/or (iii) your noncompliance with this Agreement (as determined by\\n    Company in its sole and absolute discretion). Typical administrative or\\n    processing fee scenarios include, but are not limited to (i) customer\\n    service issues that require additional personal time or attention; (ii) UDRP\\n    actions(s) in connection with your domain name(s) and/or disputes that\\n    require accounting or legal services, whether performed by Company staff or\\n    by outside firms retained by Company; (iii) recouping any and all costs and\\n    fees, including the cost of Services, incurred by Company as the results of\\n    chargebacks or other payment disputes brought by you, your bank or Payment\\n    Method processor. These administrative fees or processing fees will be\\n    billed to the Payment Method you have on file with Company.\\n  </div>\\n  <br />\\n  <div>\\n    Company may offer product-level pricing in various currencies. The\\n    transaction will be processed in the selected currency and the pricing\\n    displayed during the checkout process will be the actual amount submitted\\n    for payment. For certain Payment Methods, the issuer of your Payment Method\\n    may charge you a foreign transaction fee or other charge, which may be added\\n    to the final amount that appears on your bank statement or post as a\\n    separate amount. Please check with the issuer of your Payment Method for\\n    details. In addition, regardless of the selected currency, you acknowledge\\n    and agree that you may be charged Value Added Tax (\\"VAT\\"), Goods and\\n    Services Tax (\\"GST\\"), or other localized fees and/or taxes, based on your\\n    bank and/or the country indicated in your billing address section.\\n  </div>\\n  <br />\\n  <div>(B) REFUND POLICY</div>\\n  <div>\\n    Products and Services available for refunds are described\\n    <a\\n      href=\\"https://www.notion.so/Requesting-a-Refund-a66e34a9b22f439b89cad92865b246ff\\"\\n    >\\n      here\\n    </a>\\n    (\u201CRefund Policy\u201D).\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">8. INDEMNIFICATION</div>\\n  <br />\\n  <div>\\n    You agree to indemnify and hold harmless Company and its officers,\\n    directors, employees, parents, partners, successors, agents, distribution\\n    partners, affiliates, subsidiaries, and their related companies from and\\n    against any and all claims, liabilities, losses, damages, obligations, costs\\n    and expenses (including reasonable attorneys\u2019 fees and costs) arising out\\n    of, related to, or that may arise in connection with: (i) your use of our\\n    Services; (ii) User Content provided by you or through use of your\\n    Membership; (iii) any actual or alleged violation or breach by you of these\\n    Terms of Use; (iv) any actual or alleged breach of any representation,\\n    warranty, or covenant that you have made to us; (v) your acts or omissions\\n    breaches of these Terms of Use; and (vi) any activity related to your\\n    Membership (including infringement of third parties\u2019 worldwide intellectual\\n    property rights or negligent or wrongful conduct) by you or any other person\\n    accessing the Website, the Application or the Services using your\\n    Membership. You agree to cooperate fully with us in the defense of any claim\\n    that is the subject of your obligations hereunder.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">9. DISCLAIMER OF WARRANTIES; WAIVER AND RELEASE</div>\\n  <br />\\n  <div>\\n    (A) YOU EXPRESSLY AGREE THAT USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR\\n    SERVICES AND SERVICE CONTENT (INCLUDING SOFTWARE) ARE PROVIDED ON AN \u201CAS IS\u201D\\n    AND \u201CAS AVAILABLE\u201D BASIS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR\\n    IMPLIED. WITHOUT LIMITING THE FOREGOING AND TO THE FULLEST EXTENT PERMITTED\\n    BY LAW, COMPANY AND ITS OFFICERS, DIRECTORS, EMPLOYEES, PARENTS, PARTNERS,\\n    SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS, AFFILIATES, SUBSIDIARIES, AND\\n    THEIR RELATED COMPANIES DISCLAIM ANY AND ALL WARRANTIES INCLUDING ANY: (1)\\n    WARRANTIES THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS; (2) WARRANTIES\\n    CONCERNING THE AVAILABILITY, ACCURACY, SECURITY, USEFULNESS, TIMELINESS, OR\\n    INFORMATIONAL CONTENT OF OUR SERVICES OR SERVICE CONTENT; (3) WARRANTIES OF\\n    TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR\\n    PURPOSE; (4) WARRANTIES FOR SERVICES OR GOODS RECEIVED THROUGH OR ADVERTISED\\n    OR ACCESSED THROUGH OUR SERVICES; (5) WARRANTIES CONCERNING THE ACCURACY OR\\n    RELIABILITY OF THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF OUR\\n    SERVICES; (6) WARRANTIES THAT YOUR USE OF OUR SERVICES WILL BE SECURE OR\\n    UNINTERRUPTED; AND (7) WARRANTIES THAT ERRORS IN OUR SERVICES OR SERVICE\\n    CONTENT (INCLUDING SOFTWARE) WILL BE CORRECTED. THERE ARE NO WARRANTIES THAT\\n    EXTEND BEYOND THE FACE OF THESE TERMS. WE CANNOT AND DO NOT WARRANT AGAINST\\n    HUMAN AND MACHINE ERRORS, OMISSIONS, DELAYS, INTERRUPTIONS OR LOSSES,\\n    INCLUDING LOSS OF DATA. WE CANNOT AND DO NOT GUARANTEE OR WARRANT THAT FILES\\n    AVAILABLE FOR DOWNLOADING FROM THE WEBSITE OR THE APPLICATION WILL BE FREE\\n    OF INFECTION BY VIRUSES, WORMS, TROJAN HORSES OR OTHER CODE THAT MANIFEST\\n    CONTAMINATING OR DESTRUCTIVE PROPERTIES. THIS DISCLAIMER OF WARRANTY\\n    CONSTITUTES AN ESSENTIAL PART OF THESE TERMS OF USE. IF YOU ARE DISSATISFIED\\n    WITH ANY PORTION OF THE SERVICE, OR WITH ANY OF THESE TERMS OF USE, YOUR\\n    SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SERVICE. WE MAY CHANGE\\n    THE SERVICE OR THE FEATURES IN ANY WAY, AND AT ANY TIME AND FOR ANY REASON.\\n    ALTHOUGH WE HAVE ATTEMPTED TO PROVIDE ACCURATE INFORMATION ON THE WEBSITE\\n    AND APPLICATION, WE ASSUME NO RESPONSIBILITY FOR THE ACCURACY OR\\n    COMPLETENESS OF THE INFORMATION.\\n  </div>\\n  <br />\\n  <div>\\n    (B) YOU AGREE THAT NEITHER THE COMPANY NOR ITS OFFICERS, DIRECTORS,\\n    EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS SHALL HAVE ANY LIABILITY TO YOU\\n    UNDER ANY THEORY OF LIABILITY OR INDEMNITY IN CONNECTION WITH YOUR USE OF\\n    THE WEBSITE, THE APPLICATION, THE SERVICE, OR THE CONTENT. YOU SPECIFICALLY\\n    ACKNOWLEDGE THAT THE COMPANY SHALL NOT BE LIABLE FOR THE DEFAMATORY,\\n    OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE RISK OF HARM\\n    OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH YOU. YOU HEREBY RELEASE AND\\n    FOREVER WAIVE ANY AND ALL CLAIMS YOU MAY HAVE AGAINST THE COMPANY, ITS\\n    OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS (INCLUDING\\n    BUT NOT LIMITED TO CLAIMS BASED UPON THE NEGLIGENCE OF THE COMPANY, ITS\\n    OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS) FOR LOSSES\\n    OR DAMAGES YOU SUSTAIN IN CONNECTION WITH YOUR USE OF THE WEBSITE, THE\\n    APPLICATION, THE SERVICE, OR THE SERVICE CONTENT.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">10. LIMITATION ON LIABILITY</div>\\n  <br />\\n  <div>\\n    (A) UNDER NO CIRCUMSTANCES SHALL COMPANY OR ITS OFFICERS, DIRECTORS,\\n    EMPLOYEES, PARENTS, PARTNERS, SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS,\\n    AFFILIATES, SUBSIDIARIES, OR THEIR RELATED COMPANIES BE LIABLE FOR INDIRECT,\\n    INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES (EVEN IF WE HAVE\\n    BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), ARISING OUT OF, RELATING\\n    TO, OR IN ANY WAY CONNECTED WITH OUR SERVICES OR THESE TERMS OF USE. YOUR\\n    SOLE REMEDY FOR DISSATISFACTION WITH OUR SERVICES INCLUDING, WITHOUT\\n    LIMITATION, SERVICE CONTENT IS TO STOP USING OUR SERVICES. SUCH LIMITATION\\n    SHALL ALSO APPLY WITH RESPECT TO DAMAGES INCURRED BY REASON OF GOODS\\n    RECEIVED THROUGH OR ADVERTISED IN CONNECTION WITH OUR SERVICES OR ANY LINKS\\n    PLACED IN OUR SERVICES, AS WELL AS BY REASON OF ANY INFORMATION OR ADVICE\\n    RECEIVED THROUGH OR ADVERTISED IN CONNECTION WITH OUR SERVICES OR ANY LINKS\\n    PLACED IN OUR SERVICES. SUCH LIMITATION SHALL ALSO APPLY WITH RESPECT TO\\n    DAMAGES INCURRED BY REASON OF ANY CONTENT POSTED BY A THIRD PARTY OR CONDUCT\\n    OF A THIRD PARTY USING OUR SERVICES.\\n  </div>\\n  <br />\\n  <div>\\n    (B) NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT\\n    SHALL THE CUMULATIVE LIABILITY OF COMPANY AND ITS OFFICERS, DIRECTORS,\\n    EMPLOYEES, PARENTS, PARTNERS, SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS,\\n    AFFILIATES, SUBSIDIARIES, AND THEIR RELATED COMPANIES EXCEED THE LESSER OF\\n    THE TOTAL PAYMENTS RECEIVED FROM YOU BY COMPANY DURING THE PRECEDING TWELVE\\n    (12) MONTH PERIOD OR $100. FURTHERMORE, YOU AGREE THAT ANY CAUSE OF ACTION\\n    ARISING OUT OF, RELATING TO, OR IN ANY WAY CONNECTED WITH ANY OF OUR\\n    SERVICES OR THESE TERMS OF USE MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE\\n    CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF ACTION SHALL BE\\n    PERMANENTLY BARRED.\\n  </div>\\n  <br />\\n  <div>\\n    (C) In some jurisdictions limitations of liability are not permitted. In\\n    such jurisdictions, some of the foregoing limitations may not apply to you.\\n    These limitations shall apply to the fullest extent permitted by law.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">11. TERMINATION</div>\\n  <br />\\n  <div>\\n    (A) We reserve the right in our sole discretion and at any time to terminate\\n    or suspend your Membership and/or block your use of our Services for any\\n    reason including, without limitation if you have failed to comply with the\\n    letter and spirit of these Terms of Use. You agree that Company is not\\n    liable to you or any third party for any termination or suspension of your\\n    Membership or for blocking your use of our Services.\\n  </div>\\n  <br />\\n  <div>\\n    (B) Any suspension or termination shall not affect your obligations to us\\n    under these Terms of Use. The provisions of these Terms of Use which by\\n    their nature should survive the suspension or termination of your Membership\\n    or these Terms of Use shall survive including, but not limited to the rights\\n    and licenses that you have granted hereunder, indemnities, releases,\\n    disclaimers, limitations on liability, provisions related to choice of law,\\n    and all of the provisions in the Section titled \u201CMISCELLANEOUS\u201D.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">12. COPYRIGHT POLICY</div>\\n  <br />\\n  <div>\\n    (A) We respect the intellectual property rights of others and expect users\\n    to do the same. In appropriate circumstances and at our sole discretion, we\\n    may terminate and/or disable the Membership of users suspected to be\\n    infringing the copyrights (or other intellectual property rights) of others.\\n    Additionally, in appropriate circumstances and in our sole discretion, we\\n    may remove or disable access to material on any of our websites or hosted on\\n    our systems that may be infringing or the subject of infringing activity.\\n  </div>\\n  <br />\\n  <div>\\n    (B) In accordance with the Digital Millennium Copyright Act of 1998, Title\\n    17 of the United States Code, Section 512 (\u201CDMCA\u201D), we will respond promptly\\n    to claims of copyright infringement that are reported to the agent that we\\n    have designated to receive notifications of claims infringement (its\\n    \u201CDesignated Agent\u201D). Our Designated Agent is:\\n  </div>\\n  <br />\\n  <div>\\n    12 Triangles, LLC., 950 S 10th St #58, Omaha, NE 68108 USA. Claims can be\\n    directed to us at\\n    <a href=\\"mailto:legal@12triangles.com\\">legal@12Triangles.com.</a>\\n  </div>\\n  <br />\\n  <div>\\n    (C) If you are a copyright owner (or authorized to act on behalf of the\\n    copyright owner) and believe that your work\u2019s copyright has been infringed,\\n    please report your notice of infringement to us by providing our Designated\\n    Agent with a written notification of claimed infringement that includes\\n    substantially the following:\\n  </div>\\n  <br />\\n  <div>\\n    (i) A physical or electronic signature of a person authorized to act on\\n    behalf of the owner of an exclusive right that is allegedly infringed. (ii)\\n    Identification of the copyrighted work claimed to have been infringed, or,\\n    if multiple copyrighted works at a single online site are covered by a\\n    single notification, a representative list of such works at that site. (iii)\\n    Identification of the material that is claimed to be infringing or to be the\\n    subject of infringing activity and that is to be removed or access to which\\n    is to be disabled, and information reasonably sufficient to permit us to\\n    locate the material. (iv) Information reasonably sufficient to permit us to\\n    contact you, such as an address, telephone number, and, if available, an\\n    electronic mail address at which you may be contacted. (v) A statement that\\n    you have a good faith belief that use of the material in the manner\\n    complained of is not authorized by the copyright owner, its agent, or the\\n    law. (vi) A statement that the information in the notification is accurate,\\n    and under penalty of perjury, that you are authorized to act on behalf of\\n    the owner of an exclusive right that is allegedly infringed.\\n  </div>\\n  <br />\\n  <div>\\n    We will investigate notices of copyright infringement and take appropriate\\n    actions under the DMCA. Inquiries that do not follow this procedure may not\\n    receive a response.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">13. CHOICE OF LAW; JURISDICTION AND VENUE</div>\\n  <br />\\n  <div>\\n    These Terms of Use shall be construed in accordance with the laws of the\\n    State of Nebraska without regard to its conflict of laws rules. Any legal\\n    proceedings against Company that may arise out of, relate to, or be in any\\n    way connected with our Website, Application, Services or these Terms of Use\\n    shall be brought exclusively in the state and federal courts of the State of\\n    Nebraska and you waive any jurisdictional, venue, or inconvenient forum\\n    objections to such courts.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">14. DISPUTE RESOLUTION & MANDATORY ARBITRATION</div>\\n  <br />\\n  <div>\\n    (A) We each agree to first contact each other with any disputes and provide\\n    a written description of the problem, all relevant documents/information and\\n    the proposed resolution. You agree to contact us with disputes by contacting\\n    us at the address provided in these Terms of Use. We will contact you based\\n    on the contact information you have provided us.\\n  </div>\\n  <br />\\n  <div>\\n    (B) If after 30 days the parties are unable to resolve any dispute raised\\n    under the previous provision, the dispute may be submitted to arbitration\\n    consistent with this Section. The parties understand that they would have\\n    had a right or opportunity to litigate disputes through a court and to have\\n    a judge or jury decide their case, but they choose to have any disputes\\n    resolved through arbitration.\\n  </div>\\n  <br />\\n  <div>\\n    (C) We each agree that any claim or dispute between us, and any claim by\\n    either of us against any agent, employee, successor, or assign of the other,\\n    including, to the full extent permitted by applicable law, third parties who\\n    are not signatories to this agreement, whether related to this agreement or\\n    otherwise, including past, present, and future claims and disputes, and\\n    including any dispute as to the validity or applicability of this\\n    arbitration clause, shall be resolved by binding arbitration administered by\\n    the JAMS under its rules and procedures in effect when the claim is filed.\\n    The rules and procedures and other information, including information on\\n    fees, may be obtained from JAMS\u2019 website\\n    <a href=\\"https://www.jamsadr.com/\\">(www.jamsadr.com).</a>\\n    or by calling JAMS at 949-224-1810.\\n  </div>\\n  <br />\\n  <div>\\n    (D) We are entering into this arbitration agreement in connection with a\\n    transaction involving interstate commerce. Accordingly, this arbitration\\n    agreement and any proceedings thereunder shall be governed by the Federal\\n    Arbitration Act (\u201CFAA\u201D), 9 U.S.C. \xA7\xA7 1-16. Any award by the arbitrator(s)\\n    may be entered as a judgment in any court having jurisdiction.\\n  </div>\\n  <br />\\n  <div>\\n    (E) Exception to Arbitrate. Either of us may bring qualifying claims in\\n    small claims court. Further, as set forth below, we each agree that any\\n    arbitration will be solely between you and Company, not as part of a class\\n    wide claim (i.e., not brought on behalf of or together with another\\n    individual's claim). If for any reason any court or arbitrator holds that\\n    this restriction is unconscionable or unenforceable, then our agreement to\\n    arbitrate doesn't apply and the class wide dispute must be brought in court.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">15. NO CLASS ACTIONS</div>\\n  <br />\\n  <div>\\n    TO THE EXTENT ALLOWED BY LAW, WE EACH WAIVE ANY RIGHT TO PURSUE DISPUTES ON\\n    A CLASS WIDE BASIS; THAT IS, TO EITHER JOIN A CLAIM WITH THE CLAIM OF ANY\\n    OTHER PERSON OR ENTITY, OR ASSERT A CLAIM IN A REPRESENTATIVE CAPACITY ON\\n    BEHALF OF ANYONE ELSE IN ANY LAWSUIT, ARBITRATION OR OTHER PROCEEDING.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">16. NO TRIAL BY JURY</div>\\n  <br />\\n  <div>\\n    TO THE EXTENT ALLOWED BY LAW, WE EACH WAIVE ANY RIGHT TO TRIAL BY JURY IN\\n    ANY LAWSUIT, ARBITRATION OR OTHER PROCEEDING.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">17. AMENDMENT; ADDITIONAL TERMS</div>\\n  <br />\\n  <div>\\n    (A) We reserve the right in our sole discretion and at any time and for any\\n    reason, to modify or discontinue any aspect or feature of our Services or to\\n    modify these Terms of Use. In addition, we reserve the right to provide you\\n    with operating rules or additional terms that may govern your use of our\\n    Services generally, unique of our Services, or both (\u201CAdditional Terms\u201D).\\n    Any Additional Terms that we may provide to you will be incorporated by\\n    reference into these Terms of Use. To the extent any Additional Terms\\n    conflict with these Terms of Use, the Additional Terms will control.\\n  </div>\\n  <br />\\n  <div>\\n    (B) Modifications to these Terms of Use or Additional Terms will be\\n    effective immediately upon notice, either by posting on the Website,\\n    notification by email or through any of our Applications. It is your\\n    responsibility to review the Terms of Use from time to time for any changes\\n    or Additional Terms. Your access and use of our Services following any\\n    modification of these Terms of Use or the provision of Additional Terms will\\n    signify your assent to and acceptance of the same. If you object to any\\n    subsequent revision to the Terms of Use or to any Additional Terms,\\n    immediately discontinue use of our Services and, if applicable, terminate\\n    your Membership.\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"section\\">18. MISCELLANEOUS</div>\\n  <br />\\n  <div>\\n    (A) No waiver by either party of any breach or default hereunder shall be\\n    deemed to be a waiver of any preceding or subsequent breach or default. No\\n    waiver shall be binding unless executed in writing by the party making the\\n    waiver. The section headings used herein are for convenience only and shall\\n    not be given any legal import.\\n  </div>\\n  <br />\\n  <div>\\n    (B) Except where specifically stated otherwise, if any part of these Terms\\n    of Use is unlawful or unenforceable for any reason, we both agree that only\\n    that part of the Terms of Use shall be stricken and that the remaining terms\\n    in the Terms of Use shall not be affected.\\n  </div>\\n  <br />\\n  <div>\\n    (C) These Terms of Use (including the Privacy Policy and any Additional\\n    Terms incorporated by reference) constitute the entire agreement of the\\n    parties with respect to the subject matter hereof, and supersede all\\n    previous written or oral agreements between us with respect to such subject\\n    matter.\\n  </div>\\n  <br />\\n  <div>\\n    (D) You may not assign these Terms of Use or assign any rights or delegate\\n    any obligations hereunder, in whole or in part, without our prior written\\n    consent. Any such purported assignment or delegation by you without the\\n    appropriate prior written consent will be null and void and of no force and\\n    effect. We may assign these Terms of Use or any rights hereunder without\\n    your consent and without notice.\\n  </div>\\n  <br />\\n  <div>\\n    (E) No provisions of these Terms of Use are intended, nor will be\\n    interpreted, to provide or create any third party beneficiary rights or any\\n    other rights of any kind in any nonprofit user, client, customer, affiliate,\\n    or any party hereto or any other person unless specifically provided\\n    otherwise herein, and except as so provided, all provisions hereof will be\\n    personal solely between the parties to these Terms of Use; except that\\n    Sections 7, 8(b), and 9 are intended to benefit the Company and its\\n    officers, directors, employees, agents, licensors, and suppliers.\\n  </div>\\n  <br />\\n  <div>\\n    (F) We may deliver notice to you under these Terms of Use by means of\\n    electronic mail, a general notice on the Website or the Application, or by\\n    written communication delivered by first class U.S. mail to your address on\\n    record in the Membership. You may give notice to us at any time via\\n    electronic mail to the Website at the following address:\\n    <a href=\\"mailto:legal@12triangles.com\\">legal@12Triangles.com.</a>\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <div class=\\"title\\" id=\\"privacyPolicy\\">Privacy Policy</div>\\n\\n  <div>Effective June 3, 2021</div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n\\n  <div>\\n    We care about your privacy. For this reason, we collect and use personal\\n    information only as needed to deliver our products, services, websites and\\n    mobile applications, and to communicate with you about the same, or as you\\n    have requested (collectively, our \u201CServices\u201D). Your personal information\\n    includes information such as:\\n  </div>\\n\\n  <div class=\\"body-text\\">\\n    <ul>\\n      <li>Name</li>\\n      <li>Address</li>\\n      <li>Telephone number</li>\\n      <li>Date of birth</li>\\n      <li>Email address</li>\\n      <li>Billing and payment information</li>\\n      <li>Candidate information (for job applicants)</li>\\n      <li>\\n        Other data collected that could directly or indirectly identify you.\\n      </li>\\n    </ul>\\n  </div>\\n\\n  <div>\\n    Our Privacy Policy not only explains how and why we use your personal\\n    information that we collect, but also how you can access, update or\\n    otherwise take control of your personal information.\\n  </div>\\n  <br />\\n  <div>\\n    If at any time you have questions about our practices or any of your rights\\n    described below, you may reach our Data Protection Officer (\u201CDPO\u201D) and our\\n    dedicated team that supports this office by contacting us at\\n    <a href=\\"mailto:privacy@12triangles.com\\">privacy@12Triangles.com.</a>\\n    This inbox is actively monitored and managed so that we can deliver an experience\\n    that you can confidently trust.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>What information we collect, how we collect it, and why</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    Much of what you likely consider personal information is collected directly\\n    from you when you:\\n    <ul>\\n      <li>\\n        create an account or purchase any of our Services (ex: billing\\n        information, including name, address, credit card number);\\n      </li>\\n      <li>\\n        request assistance from our award-winning customer support team (ex:\\n        phone number);\\n      </li>\\n      <li>\\n        complete contact forms or request newsletters or other information from\\n        us (ex: email); or\\n      </li>\\n      <li>\\n        participate in contests and surveys, apply for a job, or otherwise\\n        participate in activities we promote that might require information\\n        about you.\\n      </li>\\n    </ul>\\n  </div>\\n  <div>\\n    However, we also collect additional information when delivering our Services\\n    to you to ensure necessary and optimal performance. These methods of\\n    collection may not be as obvious to you, so we thought we\u2019d highlight and\\n    explain a bit more about what these might be (as they vary from time to\\n    time):\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Cookies and similar technologies</b>\\n    on our websites and our mobile applications allow us to track your browsing behavior,\\n    links clicked, items purchased, your device type, and to collect various data,\\n    including analytics, about how you use and interact with our Services. These\\n    technologies automatically collect data when you use and interact with our Services,\\n    including metadata, log files, cookie/device IDs, page load time, server response\\n    time, and approximate location information to measure website performance and\\n    improve our systems, including optimizing DNS resolution, network routing and\\n    server configurations. Specifically, interactions with the features, content\\n    and links (including those of third-parties, such as social media plugins) contained\\n    within the Services, Internet Protocol (IP) address, browser type and settings,\\n    the date and time the Services were used, information about browser configuration\\n    and plugins, language preferences and cookie data, information about devices\\n    accessing the Services, including type of device, what operating system is used,\\n    device settings, application IDs, unique device identifiers and error data is\\n    collected. All this allows us to provide you with more relevant product offerings,\\n    a better experience on our sites and mobile applications, and to collect, analyze\\n    and improve the performance of our Services. We may also collect your location\\n    (IP address) so that we can personalize our Services. For additional information,\\n    and to learn how to manage the technologies we utilize, please visit our\\n    <a href=\\"/privacy\\">Cookie Policy</a>\\n    . If you wish to opt out of interest-based advertising click\\n    <a href=\\"http://preferences-mgr.truste.com/\\">here</a>\\n    [or if located in the European Union click\\n    <a href=\\"https://www.youronlinechoices.com/\\">here</a>\\n    ]. Please note you will continue to receive generic ads.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Supplemented Data</b>\\n    may be received about you from other sources, including publicly available databases\\n    or third parties from whom we have purchased data, in which case we may combine\\n    this data with information we already have about you so that we can update, expand\\n    and analyze the accuracy of our records, assess the qualifications of a candidate\\n    for employment, identify new customers, and provide products and services that\\n    may be of interest to you. If you provide us personal information about others,\\n    or if others give us your information, we will only use that information for\\n    the specific reason for which it was provided to us.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>How we utilize information.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We strongly believe in both minimizing the data we collect and limiting its\\n    use and purpose to only that (1) for which we have been given permission,\\n    (2) as necessary to deliver the Services you purchase or interact with, or\\n    (3) as we might be required or permitted for legal compliance or other\\n    lawful purposes:\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Delivering, improving, updating and enhancing our Services.</b>\\n    We collect various information relating to your purchase, use and/or interactions\\n    with our Services. We utilize this information to:\\n  </div>\\n  <br />\\n  <div>\\n    <ul>\\n      <li>\\n        Improve and optimize the operation and performance of our Services\\n        (again, including our websites and mobile applications)\\n      </li>\\n      <li>\\n        Diagnose problems with and identify any security and compliance risks,\\n        errors, or needed enhancements to the Services\\n      </li>\\n      <li>Detect and prevent fraud and abuse of our Services and systems</li>\\n      <li>Collecting aggregate statistics about use of the Services</li>\\n      <li>\\n        Understand and analyze how you use our Services and what products and\\n        services are most relevant to you.\\n      </li>\\n    </ul>\\n  </div>\\n  <br />\\n  <div>\\n    Much of the data collected is aggregated or statistical data about how\\n    individuals use our Services, and is not linked to any personal information.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Sharing with trusted third parties.</b>\\n    We may share your personal information with third parties that we have partnered\\n    to allow you to integrate their services into our own Services, and with our\\n    affiliates or trusted third party service providers as necessary for them to\\n    perform services on our behalf, such as:\\n  </div>\\n  <br />\\n\\n  <div>\\n    <ul>\\n      <li>Processing credit card payments</li>\\n      <li>Serving advertisements</li>\\n      <li>Conducting contests or surveys</li>\\n      <li>Performing analysis of our Services and customers demographics</li>\\n      <li>Communicating with you, such as by way email or survey delivery</li>\\n      <li>Customer relationship management</li>\\n      <li>Security risk management and compliance</li>\\n      <li>Recruiting support and related services.</li>\\n    </ul>\\n  </div>\\n  <br />\\n  <div>\\n    These third parties (and any subcontractors they may be permitted to use)\\n    have agreed not to share, use or retain your personal information for any\\n    purpose other than as necessary for the provision of Services.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We will also disclose your information to our affiliates or third parties:\\n    <ul>\\n      <li>\\n        in the event that we sell or buy any business or assets (whether a\\n        result of liquidation, bankruptcy or otherwise), in which case we will\\n        disclose your data to the prospective seller or buyer of such business\\n        or assets; or\\n      </li>\\n      <li>\\n        if we sell, buy, merge, are acquired by, or partner with other companies\\n        or businesses, or sell some or all of our assets. In such transactions,\\n        your information may be among the transferred assets.\\n      </li>\\n    </ul>\\n    <br />\\n    <b>Communicating with you.</b>\\n    We may contact you directly or through a third party service provider regarding\\n    products or services you have signed up or purchased from us, such as necessary\\n    to deliver transactional or service related communications. We may also contact\\n    you with offers for additional services we think you\u2019ll find valuable if you\\n    give us consent, or where allowed based upon legitimate interests. You don\u2019t\\n    need to provide consent as a condition to purchase our goods or services. These\\n    contacts may include:\\n  </div>\\n  <br />\\n\\n  <div>\\n    <ul>\\n      <li>Email</li>\\n      <li>Text (SMS) messages</li>\\n      <li>Telephone calls</li>\\n      <li>Messenger applications (e.g. WhatsApp, etc.)</li>\\n      <li>Automated phone calls or text messages.</li>\\n    </ul>\\n  </div>\\n  <br />\\n\\n  <div>\\n    You may also update your subscription preferences with respect to receiving\\n    communications from us and/or our partners by signing into your account and\\n    visiting \u201CAccount Settings\u201D page.\\n  </div>\\n  <div>\\n    <br />\\n    If we collect information from you in connection with a co-branded offer, it\\n    will be clear at the point of collection who is collecting the information and\\n    whose privacy policy applies. In addition, it will describe any choice options\\n    you have in regards to the use and/or sharing of your personal information with\\n    a co-branded partner, as well as how to exercise those options. We are not responsible\\n    for the privacy practices or the content of third-party sites. Please read the\\n    privacy policy of any website you visit.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you make use of a service that allows you to import contacts (ex. using\\n    email marketing services to send emails on your behalf), we will only use\\n    the contacts and any other personal information for the requested service.\\n    If you believe that anyone has provided us with your personal information\\n    and you would like to request that it be removed from our database, please\\n    contact us at\\n    <a href=\\"mailto:privacy@12triangles.com\\">privacy@12Triangles.com.</a>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Transfer of personal information abroad.</b>\\n    If you utilize our Services from a country other than the country where our servers\\n    are located, your personal information may be transferred across international\\n    borders, which will only be done when necessary for the performance of our contract\\n    with you, when we have your consent to do so, or when the appropriate standard\\n    contractual clauses are in place. Also, when you call us or initiate a chat,\\n    we may provide you with support from one of our global locations outside your\\n    country of origin.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Compliance with legal, regulatory and law enforcement requests.</b>\\n    We cooperate with government and law enforcement officials and private parties\\n    to enforce and comply with the law. We will disclose any information about you\\n    to government or law enforcement officials or private parties as we, in our sole\\n    discretion, believe necessary or appropriate to respond to claims and legal process\\n    (such as subpoena requests), to protect our property and rights or the property\\n    and rights of a third party, to protect the safety of the public or any person,\\n    or to prevent or stop activity we consider to be illegal or unethical.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    To the extent we are legally permitted to do so, we will take reasonable\\n    steps to notify you in the event that we are required to provide your\\n    personal information to third parties as part of legal process. We will also\\n    share your information to the extent necessary to comply with any ICANN,\\n    registry or ccTLD rules, regulations and policies when you register a domain\\n    name with us. For reasons critical to maintaining the security, stability\\n    and resiliency of the Internet, this includes the transfer of domain name\\n    registration information to the underlying domain registry operator and\\n    escrow provider, and publication of that information as required by ICANN in\\n    the public WHOIS database or with other third parties that demonstrate a\\n    legitimate legal interest to such information.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>How we secure, store and retain your data.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We follow generally accepted standards to store and protect the personal\\n    information we collect, both during transmission and once received and\\n    stored, including utilization of encryption where appropriate.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We retain personal information only for as long as necessary to provide the\\n    Services you have requested and thereafter for a variety of legitimate legal\\n    or business purposes. These might include retention periods:\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <ul>\\n      <li>\\n        mandated by law, contract or similar obligations applicable to our\\n        business operations;\\n      </li>\\n      <li>\\n        for preserving, resolving, defending or enforcing our legal/contractual\\n        rights; or\\n      </li>\\n      <li>\\n        needed to maintain adequate and accurate business and financial records.\\n      </li>\\n    </ul>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you have any questions about the security or retention of your personal\\n    information, you can contact us at\\n    <a href=\\"mailto:privacy@12triangles.com\\">privacy@12Triangles.com.</a>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>How you can access, update or delete your data.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    To easily access, view, or update your personal information, or to update\\n    your subscription preferences, please sign into your Account and visit\\n    \u201CAccount Settings.\u201D\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you wish to delete or port your personal information, you may submit your\\n    request to\\n    <a href=\\"mailto:privacy@12triangles.com\\">privacy@12Triangles.com.</a>\\n    If you make a request to delete your personal information and that data is necessary\\n    for the products or services you have purchased, the request will be honored\\n    only to the extent it is no longer necessary for any Services purchased or required\\n    for our legitimate business purposes or legal or contractual record keeping requirements.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you are unable for any reason to access your Account Settings, you may\\n    also contact us by one of the methods described in the \u201CContact Us\u201D section\\n    below.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>\u2018Do Not Track\u2019 notifications.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    Some browsers allow you to automatically notify websites you visit not to\\n    track you using a \u201CDo Not Track\u201D signal. There is no consensus among\\n    industry participants as to what \u201CDo Not Track\u201D means in this context. Like\\n    many websites and online services, we currently do not alter our practices\\n    when we receive a \u201CDo Not Track\u201D signal from a visitor\u2019s browser. To find\\n    out more about \u201CDo Not Track,\u201D you may wish to visit\\n    <a href=\\"https://www.allaboutdnt.com/\\">www.allaboutdnt.com.</a>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Age restrictions.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    Our Services are available for purchase only for those over the age of 18.\\n    Our Services are not targeted to, intended to be consumed by or designed to\\n    entice individuals under the age of 18. If you know of or have reason to\\n    believe anyone under the age of 18 has provided us with any personal\\n    information, please contact us.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Non-Discrimination.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We will not discriminate against you for exercising any of your privacy\\n    rights. Unless permitted under applicable laws, we will not:\\n    <br />\\n    <br />\\n    <ul>\\n      <li>Deny you goods or services.</li>\\n      <li>\\n        Charge you different prices or rates for goods or services, including\\n        through granting discounts or other benefits, or imposing penalties.\\n      </li>\\n      <li>Provide you a different level or quality of goods or services.</li>\\n      <li>\\n        Suggest that you may receive a different price or rate for goods or\\n        services or a different level or quality of goods or services.\\n      </li>\\n    </ul>\\n  </div>\\n  <br />\\n  <div>\\n    <b>Changes to this policy.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    We reserve the right to modify this Privacy Policy at any time. If we decide\\n    to change our Privacy Policy, we will post those changes to this Privacy\\n    Policy and any other places we deem appropriate, so that you are aware of\\n    what information we collect, how we use it, and under what circumstances, if\\n    any, we disclose it. If we make material changes to this Privacy Policy, we\\n    will notify you here, by email, or by means of a notice on our home page, at\\n    least thirty (30) days prior to the implementation of the changes.\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Data Protection Authority.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you are a resident of the European Economic Area (EEA) and believe we\\n    maintain your personal information subject to the General Data Protection\\n    Regulation (GDPR), you may direct questions or complaints to your local\\n    supervisory authority or our lead supervisory authority, the UK's\\n    Information Commissioner\u2019s Office, as noted below:\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <a href=\\"https://www.ico.org.uk\\">www.ico.org.uk</a>\\n    <br />\\n    <br />\\n    Information Commissioner\u2019s Office\\n    <br />\\n    <br />\\n    Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, United Kingdom\\n    <br />\\n    <br />\\n    Phone: 0303 123 1113\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>Contact us.</b>\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    If you have any privacy-related questions, concerns or complaints about our\\n    Privacy Policy, our practices or our Services, you may contact our Office of\\n    the DPO by email at\\n    <a href=\\"mailto:privacy@12triangles.com\\">privacy@12Triangles.com.</a>\\n    In the alternative, you may contact us by either of the following means:\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    By Mail: Attn: Office of the Data Protection Officer, 950 S 10th Street #58,\\n    Omaha, NE 68108 USA \u200D\\n  </div>\\n  <br />\\n  <br />\\n  <div>\\n    <b>\\n      We will respond to all requests, inquiries or concerns within thirty (30)\\n      days.\\n    </b>\\n  </div>\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n</div>\\n\\n<style>\\n  .title {\\n    font-size: 48px;\\n    font-weight: 800;\\n    margin-top: 126px;\\n  }\\n\\n  .section {\\n    margin: auto;\\n    font-size: 24px;\\n    font-weight: 700;\\n    max-width: 740px;\\n  }\\n\\n  .body-text {\\n    margin: auto;\\n    color: #f2f2f2;\\n    line-height: 2;\\n    max-width: 740px;\\n  }\\n\\n  .date-text {\\n    margin: auto;\\n    color: #999999;\\n    line-height: 2;\\n    max-width: 740px;\\n  }\\n\\n  a {\\n    color: #f2f2f2;\\n    text-decoration: underline;\\n    font-weight: 800;\\n  }\\n\\n  div {\\n    margin: auto;\\n    color: #f2f2f2;\\n    line-height: 2;\\n    max-width: 740px;\\n  }\\n\\n  .jump {\\n    margin-bottom: 160px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAy/CE,oBAAO,CACL,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,KACd,CAEA,sBAAS,CACP,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,KACb,CAEA,wBAAW,CACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,CAAC,CACd,SAAS,CAAE,KACb,CAEA,wBAAW,CACT,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,CAAC,CACd,SAAS,CAAE,KACb,CAEA,eAAE,CACA,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,SAAS,CAC1B,WAAW,CAAE,GACf,CAEA,iBAAI,CACF,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,CAAC,CACd,SAAS,CAAE,KACb,CAEA,mBAAM,CACJ,aAAa,CAAE,KACjB"}`
    };
    Page19 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css20);
      return `<div class="svelte-f8awr0" data-svelte-h="svelte-1mofjdx"><br> <div class="title svelte-f8awr0">Terms of Use</div> <div class="date-text svelte-f8awr0">Effective January 8, 2023</div> <div class="jump svelte-f8awr0">Jump to:
    <a href="/terms/#privacyPolicy" class="svelte-f8awr0">PRIVACY POLICY</a></div> <div class="section svelte-f8awr0">1. INTRODUCTION AND ACCEPTANCE</div> <br> <div class="body-text svelte-f8awr0">This Terms of Use Agreement (\u201CTerms of Use\u201D) is entered into by and between
    12 Triangles, LLC d/b/a 12 Triangles (\u201CCompany\u201D, \u201Cwe\u201D, \u201Cus and \u201Cour\u201D) and
    you, and is made effective as of the date of your use of this website (
    <a href="https://12triangles.com" class="svelte-f8awr0">www.12Triangles.com</a>
    ) or any Flair application (\u201CApplication\u201D), or the date of electronic acceptance.
    These Terms of Use together with our Privacy Policy (which can be found below,
    the \u201CPrivacy Policy\u201D) and any additional terms set forth the general terms and
    conditions of your use of the website and the products and services purchased
    or accessed through the website or Application (individually and collectively,
    the \u201CServices\u201D).</div> <br> <div class="svelte-f8awr0">PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING OUR SERVICES. BY
    VISITING OR ACCESSING ANY PART OF OUR WEBSITE (OTHER THAN TO READ THESE
    TERMS OF USE FOR THE FIRST TIME), DOWNLOADING OUR APPLICATION, PROVIDING
    INFORMATION TO US THROUGH THE WEBSITE OR APPLICATION, REGISTERING FOR A
    MEMBERSHIP (AS DEFINED HEREIN) OR USING OUR SERVICES IN ANY WAY, YOU (the
    terms \u201Cyou\u201D, \u201Cyour\u201D, and \u201Cyours\u201D shall refer to any and all users (INCLUDING
    COMPANY USERS AND TEAM USER (AS DEFINED HEREIN)) of the Website, Application
    or Services (the \u201CUser\u201D)) EXPRESSLY CONSENT AND AGREE TO BE BOUND BY AND TO
    COMPLY WITH THESE TERMS OF USE AND OUR PRIVACY POLICY. THESE TERMS OF USE
    AND OUR PRIVACY POLICY MAY CHANGE FROM TIME TO TIME AS SET FORTH IN SECTION
    TITLED \u201CAMENDMENTS; ADDITIONAL TERMS\u201D. IF YOU DO NOT AGREE TO BE BOUND BY
    THESE TERMS OF USE AND/OR THE PRIVACY POLICY, YOU DO NOT HAVE OUR
    AUTHORIZATION TO USE ANY OF THE SERVICES AND YOU MAY NOT ACCESS OR USE ANY
    PORTION OF THE WEBSITE OR APPLICATION.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">2. INTELLECTUAL PROPERTY</div> <br> <div class="svelte-f8awr0">The entire contents displayed on the Website and Application (and any
    derivative works or enhancements of the same) including, but not limited to,
    all text, fonts, illustrations, files, images, software, scripts, graphics,
    photos, sounds, music, videos, information, content, materials, products,
    services, URLs, technology, documentation, and interactive features included
    with or available through our Services (collectively, the \u201CService Content\u201D)
    and all intellectual property rights to the same are owned by us, our
    licensors, or both. Additionally, all trademarks, service marks, trade names
    and trade dress that may appear in our Services are owned by us, our
    licensors, or identified third parties. All Service Content have copyright
    protection as a collective work under the laws of the United States and
    other copyright laws and, except for the limited use rights granted to you
    in these Terms of Use, you shall not acquire any right, title or interest in
    our Services or any Service Content. You are allowed to display and, subject
    to any expressly stated restrictions or limitations relating to specific
    material, download portions of the Service Content from the different areas
    of the Website and/or Application only for non-commercial use, unless
    otherwise permitted. Any redistribution, retransmission or publication of
    any copyrighted material is strictly prohibited without the express written
    permission of the copyright owner. You agree not to use any of our logos or
    any other proprietary graphic or trademark without our express written
    consent. Any rights not expressly granted in these Terms of Use are
    expressly reserved.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">3. ACCESS AND USE</div> <br> <div class="svelte-f8awr0">(A) Our Services are provided for your personal and commercial use except
    when our Service Content is used to create end products for sale where the
    lifetime sales of the end product for sale exceeds 400 units. An end product
    for sale can be either a digital design or physical item created using our
    Services that you and/or your client intends to sell (an \u201CEnd Product\u201D). You
    understand and agree that End Products you create using our Service Content
    must be a unique implementation of the Service Content, significantly
    different than the original piece of Service Content and require time,
    effort, and skill to produce. For example, if you incorporate the Service
    Content into sticker or sticker pack that you design and sell to multiple
    people, that is considered an End Product. End Products must not be used or
    sold in a way that is directly competitive with the Service Content. End
    Products must not redistribute the Service Content to any third parties in a
    manner that allows for the extraction of the Service Content. We may offer
    certain portions of our Services at no charge and others for a one-time fee,
    on a subscription basis or under any other lawful pricing structure. In all
    instances, our Services are not being sold to you; rather, subject to these
    Terms of Use, and upon your registration for a Membership, you are being
    granted or purchasing a revocable, non-exclusive, non-transferable and
    limited license to use our Services.</div> <br> <div class="svelte-f8awr0">(B) When using our Services, you agree to comply with all applicable
    federal, state, and local laws including, without limitation, copyright law.
    You acknowledge that you do not acquire any ownership rights by downloading,
    installing or printing Service Content.</div> <br> <div class="svelte-f8awr0">(C) Furthermore, except as expressly permitted in these Terms of Use, you
    may not:</div> <br> <div class="svelte-f8awr0">(i) remove, alter, cover, or distort any copyright, trademark, or other
    proprietary rights notice we include in or through our Services or Service
    Content; (ii) circumvent, disable or otherwise interfere with our
    security-related features including, without limitation, any features that
    prevent or restrict the use of or copying of any software or other Service
    Content; (iii) use an automatic device (such as a robot or spider) or manual
    process to copy or \u201Cscrape\u201D the Website or Service Content for any purpose
    without our express written permission; (iv) collect or harvest any
    personally identifiable information from our Services including, without
    limitation, user names, passwords, email addresses; (v) solicit other users
    to join or become members of any commercial online service or other
    organization without our prior written approval; (vi) attempt to or
    interfere with the proper working of our Services or impair, overburden, or
    disable the same; (vii) decompile, reverse engineer, or disassemble any
    portion of our software or other Service Content, or our Services; (viii)
    use network-monitoring software to determine architecture of or extract
    usage data from our Services; (ix) encourage conduct that violates any
    local, state or federal law, either civil or criminal, or impersonate
    another user, person, or entity (e.g., using another person\u2019s Membership;
    (x) violate U.S. export laws, including, without limitation, violations of
    the Export Administration Act and the Export Administration Regulations
    administered by the Department of Commerce; or (xi) engage in any conduct
    that restricts or inhibits any other user from using or enjoying our
    Services.</div> <br> <div class="svelte-f8awr0">(D) You agree to fully cooperate with us to investigate any suspected or
    actual activity that is in breach of these Terms of Use.</div> <br> <div class="svelte-f8awr0">(E) Additionally, in connection with the use of the Application, you
    understand and agree that (i) your use of the Application is conditioned
    upon your acceptance of these Terms of Use; (ii) the Application contains
    copyrighted material, trade secrets, and other proprietary materials of the
    Company and our licensors; (iii) you will only use the Application to access
    and/or use the Services; (iv) you will not use any software or services in
    conjunction with the Service or authorized third-party software which
    modifies or reroutes, or attempts to modify or reroute, the Service; (v) you
    will not authorize any third party to access and/or use the Service on your
    behalf using any automated process such as a BOT, a spider or periodic
    caching of information stored by the Service on your behalf without a
    separate written agreement with us; (vi) you will not use any software or
    hardware that reduces the number of Users directly accessing or using the
    Service (sometimes called &#39;multiplexing&#39; or &#39;pooling&#39; software or hardware);
    (vii) you will not lend, lease, rent or sublicense the Application; (viii)
    you will permit us to send and deliver updates and notifications to you as
    part of your use of the Application; (ix) you will allow the Application to
    automatically download and install updates from time to time from us which
    are designed to improve, enhance and further develop the Application and may
    take the form of bug fixes, enhanced functions, new software modules and
    completely new versions; and (x) in order to protect those proprietary
    materials, except as expressly permitted by applicable law, neither you nor
    a third party acting on your behalf will: (a) decompile, disassemble or
    reverse engineer the Application; (b) modify or create derivative works of
    the Application; (c) use the Application in any manner to provide service
    bureau, commercial time-sharing or other computer services to third parties;
    (d) transmit the Application or provide its functionality, in whole or in
    part, over the Internet or other network (except as expressly permitted
    above); (e) sell, distribute, rent, lease, sublicense or otherwise transfer
    the Application to a third party; or (f) use components of the Application
    to run applications not running on the Application.</div> <br> <div class="svelte-f8awr0">(F) Local Language Limitations. Services do not support all local languages.
    If a local language is not supported, then the Service will default to
    English only.
    
    To the extent that the Services are used with a local language (other than English),
    there may be limitations to certain features or functionality within the Service.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">4. USER REGISTRATION</div> <br> <div class="svelte-f8awr0">(A) In order to access or use some features of our Services, you may have to
    become a registered user by registering for a Membership. If you are under
    the age of thirteen, then you are not permitted to register as a User or
    otherwise submit personal information.</div> <br> <div class="svelte-f8awr0">(B) If you become a registered User, you agree to (i) provide true, accurate
    and complete registration information for yourself (ii) provide any credit
    card or other payment information (the \u201CCredit Card\u201D), if applicable; (iii)
    maintain and promptly update your Membership to keep it true, accurate,
    current and complete; and (iv) authorize us and our affiliates to charge
    your Credit Card for any and all fees incurred by you for your use of the
    Services. During registration, you will create a username and password (a
    \u201CMembership\u201D). You are responsible for safeguarding and maintaining the
    confidentiality of your Membership. You are solely responsible for the
    activity that occurs under your Membership, whether or not you have
    authorized the activity. You agree to Contact us immediately if you become
    aware of any breach of security or unauthorized use of your Membership. If
    you provide any information that is untrue, inaccurate, not current or
    incomplete, or we have reasonable grounds to suspect that such information
    is untrue, inaccurate, not current or incomplete, we have the right to
    suspend or terminate your Membership and refuse any and all current or
    future use of the Services (or any portion thereof).</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">5. USER CONTENT</div> <br> <div class="svelte-f8awr0">(A) We may now or in the future permit Users to post, upload, transmit
    through, or otherwise make available through our Services and for use or
    display to others (collectively, \u201Csubmit\u201D) messages, text, illustrations,
    data, files, images, graphics, photos, comments, sounds, music, videos,
    information, content, and/or other materials (\u201CUser Content\u201D). Subject to
    the rights and license you grant herein, you retain all right, title and
    interest in your User Content. We do not guarantee any confidentiality with
    respect to User Content even if it is not published through our Services. It
    is solely your responsibility to monitor and protect any intellectual
    property rights that you may have in your User Content, and we do not accept
    any responsibility for the same. You agree that we may reveal your identity
    and whatever information we know about you to any law enforcement agent or
    official in the event of legal action arising from any User Content posting
    by you.</div> <br> <div class="svelte-f8awr0">(B) You shall not submit any User Content protected by copyright, trademark,
    patent, trade secret, moral right, or other intellectual property or
    proprietary right without the express permission of the owner of the
    respective right. You are solely liable for any damage resulting from your
    failure to obtain such permission or from any other harm resulting from User
    Content that you submit.</div> <br> <div class="svelte-f8awr0">(C) You represent, warrant, and covenant that you will not submit any User
    Content that:</div> <br> <div class="svelte-f8awr0">(i) violates or infringes in any way upon the rights of others, including,
    but not limited to, any copyright, trademark, patent, trade secret, moral
    right, or other intellectual property or proprietary right of any person or
    entity; (ii) impersonates another or is unlawful, threatening, abusive,
    libelous, defamatory, invasive of privacy or publicity rights, vulgar,
    obscene, profane, pornographic, or otherwise objectionable; (iii) encourages
    conduct that would constitute a criminal offense, give rise to civil
    liability or otherwise violate any law; (iv) is an advertisement for goods
    or services or a solicitation of funds; (v) includes personal information
    such as messages which identify phone numbers, social security numbers,
    account numbers, addresses, or employer references; (vi) contains a formula,
    instruction, or advice that could cause harm or injury; or (vii) is a chain
    letter of any kind.</div> <br> <div class="svelte-f8awr0">Moreover, any conduct by a User that in our sole discretion restricts or
    inhibits any other User from using or enjoying our Services will not be
    permitted.</div> <br> <div class="svelte-f8awr0">(D) We will not use your User Content (e.g., images, etc.) without your
    permission. Where you have provided us permission (e.g., to share your image
    on Facebook or Instagram, display your image on our Website under a
    promotion, etc.), by submitting User Content to us, you simultaneously
    grant, or warrant that the owner has expressly granted, to us a worldwide,
    royalty-free, perpetual, irrevocable, non-exclusive, fully sublicensable,
    and transferable right and license to use, reproduce, distribute, create
    derivative works based upon (including, without limitation, translations),
    publicly display, publicly perform, transmit, and publish the User Content
    (in whole or in part) in the manner you have requested. We may exercise this
    for the full term of any copyright that may exist in such User Content.
    Furthermore, you also grant other Users permission to access your User
    Content and to use, reproduce, distribute, create derivative works based
    upon, publicly display, publicly perform, transmit, and publish your User
    Content for personal and commercial use as permitted by the functionality of
    our Services and these Terms of Use. Notwithstanding the foregoing, you
    waive any and all claims you may now or later have in any jurisdiction to
    so-called \u201Cmoral rights\u201D or rights of \u201Cdroit moral\u201D with respect to the User
    Content.</div> <br> <div class="svelte-f8awr0">(E) By submitting User Content, you also grant us the right, but not the
    obligation to use your biographical information including, without
    limitation, your name and geographical location in connection with
    broadcast, print, online, or other use or publication of your User Content;
    provided, however, that all such uses will be consistent with the terms of
    our Privacy Policy.</div> <br> <div class="svelte-f8awr0">(F) Pursuant to a promotion or in certain other instances, you may give us
    permission to share or use your User Content on our Website or on a third
    party platform. In such instances, you acknowledge and agree that we may use
    your User Content to promote our Services and that your User Content may
    appear in proximity to third party advertisements and/or content. You
    acknowledge and agree that no compensation will be paid to you with respect
    to the use of your User Content, as provided herein.</div> <br> <div class="svelte-f8awr0">(G) Your participation in communications through the Services, if any and if
    allowed by us, will occur in real time and is not edited, censored, or
    otherwise controlled by us. We have the right, but not the obligation, to
    monitor User Content. We have the right in our sole discretion and for any
    reason whatsoever to edit, refuse to post, remove, or disable access to any
    User Content.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">6. SERVICE CONTENT &amp; THIRD PARTY IMAGES, SOFTWARE &amp; LINKS</div> <br> <div class="svelte-f8awr0">(A) We provide our Services including, without limitation, Service Content
    for educational, entertainment, promotional and/or commercial purposes
    expressly stated in this Terms of Use. You may not rely on any information
    and opinions expressed through any of our Services for any other purpose. In
    all instances, it is your responsibility to evaluate the accuracy,
    timeliness, completeness, or usefulness of any Service Content. We do not
    assume any responsibility or liability for any User Content, opinion or
    other commentary posted on the Website, the Application or any third party
    website linked to the Website or Application. We further do not make any
    express or implied warranty or guarantee about the accuracy, copyright
    compliance, legality, or any other aspect of the Service Content and, under
    no circumstances will we be liable for any loss or damage caused by your
    reliance on any Service Content.</div> <br> <div class="svelte-f8awr0">(B) In many instances, Service Content will include content posted by a
    third-party or will represent the opinions and judgments of a third-party.
    You understand that we do not endorse, warrant and are not responsible for
    the accuracy, timeliness, completeness, or reliability of any opinion,
    advice, or statement offered through our Services by anyone other than our
    authorized employees or spokespersons while acting in their official
    capacities. You further understand and acknowledge that you may be exposed
    to third party content that may be offensive, indecent, inaccurate, or
    objectionable, and you agree to waive, and hereby do waive, any legal or
    equitable rights or remedies you have or may have against us with respect
    thereto.</div> <br> <div class="svelte-f8awr0">(C) Our Services may link or contain links to other websites maintained by
    third parties. It is your responsibility when viewing other websites to
    abide by any privacy statements and terms of use posted in connection with
    these links. You understand these links may lead unintentionally to websites
    containing information that you or others may find inappropriate or
    offensive. We do not operate or control, in any respect, or necessarily
    endorse the content found on these third-party websites. You assume sole
    responsibility for your use of third-party links and agree that we are not
    responsible for any content posted on third-party websites or liable to you
    for any loss or damage of any sort incurred as a result of your dealings
    with any third-party or their website.</div> <br> <div class="svelte-f8awr0">(D) As part of our Services, you may be allowed to use certain (i)
    photographers, illustrations, or other images (\u201CImages\u201D) and/or (ii)
    software, widgets, or other applications (\u201CSoftware\u201D) developed, owned, or
    licensed by a third-party. Your use of these Images and Software may be
    subject to additional terms. If the Images and Software are accompanied by
    or require a license agreement from the third-party provider, you use of the
    Images and Software is subject to that license agreement, in addition to
    this Terms of Use. You may use the Images and Software solely as part of
    Services. Your use of the Images and Software is subject to the following:
    (i) You may not remove, modify, or obscure any copyright, trademark, or
    other proprietary rights notices that are contained in or on the Images and
    Software; (ii) you may not sell, modify, re-use reverse-engineer, decompile,
    disassemble, reverse compile, create derivative works of or attempt to
    derive the source code from the Images and Software; (iii) Company may
    provide your personal information to third-party providers as required to
    provide the third-party Images and Software; (iv) Company reserves the right
    to modify, change, or discontinue provision of the Images and Software at
    any time; (v) Company makes no representations or warranties about any
    third-party Images and Software offered in connection with Services, and
    expressly disclaims any liability.</div> <br> <div class="svelte-f8awr0">You will indemnify, defend, and hold harmless Company from and against any
    and all claims imposed upon or incurred by Company directly or indirectly
    arising from your use or misuse of the third-party Images and Software. The
    providers of the third-party Images and Software are third-party
    beneficiaries to these Terms of Use for purposes of enforcing their rights
    under these Terms of Use.</div> <br> <div class="svelte-f8awr0">The third-party providers listed in this section make no representations or
    warranties about any Images or Software offered in connection with the
    Services, and expressly disclaim any liability or damages (whether direct,
    indirect, or consequential) arising from the use of the Images or Software.</div> <br> <div class="svelte-f8awr0">You are responsible for managing and maintaining in good standing any paid
    subscription and/or account required with a third-party provider. You must
    cancel or terminate your paid subscription and/or account with the
    applicable third-party provider and not Company.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">7. FEES AND PAYMENT</div> <br> <div class="svelte-f8awr0">You agree that your Payment Method may be charged by 12 Triangles, LLC. and
    subject to the provisions of our Privacy Policy.</div> <br> <div class="svelte-f8awr0">(A) GENERAL TERMS, INCLUDING AUTOMATIC RENEWAL TERMS. Payment Due at Time of
    Order; Non-Refundable. You agree to pay all amounts due for Services at the
    time you order them. All amounts are non-refundable unless otherwise noted
    in the
    <a href="https://www.notion.so/Requesting-a-Refund-a66e34a9b22f439b89cad92865b246ff" class="svelte-f8awr0">Refund Policy</a>
    .</div> <br> <div class="svelte-f8awr0">Price Changes. Company reserves the right to change its prices and fees at
    any time, and such changes shall be posted online at this website and
    effective immediately without need for further notice to you. If you have
    purchased or obtained Services for a period of months or years, changes in
    prices and fees shall be effective when the Services in question come up for
    renewal as further described below.</div> <br> <div class="svelte-f8awr0">Payment Types. Except as prohibited in any product-specific agreement, you
    may pay for Services by using a valid credit card, provided by either Visa,
    Mastercard, Amex, or Discover each a \u201CPayment Method\u201D. The \u201CExpress
    Checkout\u201D feature automatically places an order for the applicable Service
    and charges the default Express Checkout Payment Method for your Account.
    Confirmation of that order will be sent to the email address on file for
    your Account. Your Payment Method on file must be kept valid if you have any
    active Services in your Account. In addition, you agree that the location
    for the processing of your payments may change for any reason, including the
    type of Payment Method chosen, the currency selected, or changes or updates
    made to your Payment Method.</div> <br> <div class="svelte-f8awr0">Refunds Issued. You agree that where refunds are issued to your Payment
    Method, Company\u2019s issuance of a refund receipt is only confirmation that
    Company has submitted your refund to the Payment Method charged at the time
    of the original sale, and that Company has no control over when the refund
    will be applied towards your Payment Method\u2019s available balance. You further
    acknowledge and agree that the payment provider and/or individual issuing
    bank associated with your Payment Method establish and regulate the time
    frames for posting your refund, and that such refund posting time frames may
    range from five (5) business days to a full billing cycle, or longer.</div> <br> <div class="svelte-f8awr0">In the event a refund is issued to your Payment Method and the payment
    provider, payment processor or individual issuing bank associated with your
    Payment Method imposes any limitations on refunds, including but not limited
    to, limitations as to the timing of the refund or the number of refunds
    allowed, then Company, in its sole and absolute discretion, reserves the
    right to issue the refund either (i) in the form of an in-store credit; (ii)
    via issuance of a Company check, which will be sent to the mailing address
    on file for your Account; or (iii) in some jurisdictions, as a bank
    transfer, when the payment processor cannot refund back to the Payment
    Method. Company also has the right to offer an in-store credit for customers
    seeking refunds, even if there are no limitations on refunds imposed by the
    Payment Method.</div> <br> <div class="svelte-f8awr0">Monthly Billing Date. If you are being billed on a monthly basis, your
    monthly billing date will be based on the date of the month you purchased
    the Services, unless that date falls after the 28th of the month, in which
    case your billing date will be the 28th of each month.</div> <br> <div class="svelte-f8awr0">Auto-Renewal Terms. Other than as required by applicable law, Company does
    not retain hard copies or electronic versions of mandate, standing order or
    standing instruction forms and/or any signed consents relating to your usage
    of our automatic renewal services, and we are therefore unable to provide
    any such document upon request. You may view or change your automatic
    renewal settings at any time by logging into your Company account.</div> <br> <div class="svelte-f8awr0">IN ORDER TO ENSURE THAT YOU DO NOT EXPERIENCE AN INTERRUPTION OR LOSS OF
    SERVICES, ALL SERVICES ARE OFFERED ON AUTOMATIC RENEWAL. EXCEPT FOR REASONS
    DESCRIBED BELOW IN THIS SECTION, AUTOMATIC RENEWAL AUTOMATICALLY RENEWS THE
    APPLICABLE SERVICE UPON EXPIRATION OF THE THEN CURRENT TERM FOR A RENEWAL
    PERIOD EQUAL IN TIME TO THE MOST RECENT SERVICE PERIOD. FOR EXAMPLE, IF YOUR
    LAST SERVICE PERIOD IS FOR ONE YEAR, YOUR RENEWAL PERIOD WILL TYPICALLY BE
    FOR ONE YEAR. HOWEVER, IN THE EVENT RENEWAL WITH THE PAYMENT METHOD ON FILE
    FAILS, COMPANY MAY ATTEMPT TO RENEW THE APPLICABLE SERVICE FOR A PERIOD LESS
    THAN THE ORIGINAL SUBSCRIPTION PERIOD TO THE EXTENT NECESSARY FOR THE
    TRANSACTION TO SUCCEED.</div> <br> <div class="svelte-f8awr0">UNLESS YOU DISABLE THE AUTOMATIC RENEWAL OPTION, COMPANY WILL AUTOMATICALLY
    RENEW THE APPLICABLE SERVICE WHEN IT COMES UP FOR RENEWAL AND WILL TAKE
    PAYMENT FROM THE PAYMENT METHOD ASSOCIATED WITH THE SERVICE(S) IN YOUR
    ACCOUNT OR YOUR DESIGNATED BACKUP PAYMENT METHOD(S) ON FILE WITH COMPANY. IN
    AUTOMATICALLY RENEWING YOUR SERVICES, COMPANY WILL FIRST ATTEMPT TO CHARGE
    THE PAYMENT METHOD ASSOCIATED WITH THE SERVICE(S) IN YOUR ACCOUNT. IN THE
    EVENT COMPANY CANNOT SUCCESSFULLY CHARGE THIS PAYMENT METHOD, WE WILL
    ATTEMPT TO CHARGE THE PAYMENT METHOD(S) DESIGNATED AS &quot;BACKUP&quot; IN YOUR
    ACCOUNT. RENEWALS WILL BE CHARGED AT COMPANY\u2019S THEN CURRENT RATES, WHICH YOU
    ACKNOWLEDGE AND AGREE MAY BE HIGHER OR LOWER THAN THE RATES FOR THE ORIGINAL
    SERVICE PERIOD. IN ORDER TO SEE THE RENEWAL SETTINGS APPLICABLE TO YOU AND
    YOUR SERVICES, SIMPLY LOG INTO YOUR ACCOUNT MANAGER FROM THIS SITE AND
    FOLLOW THE STEPS FOUND HERE. IF YOU DO NOT WISH FOR ANY SERVICE TO
    AUTOMATICALLY RENEW, YOU MAY ELECT TO CANCEL RENEWAL, IN WHICH CASE, YOUR
    SERVICES WILL TERMINATE UPON EXPIRATION OF THE THEN CURRENT TERM, UNLESS YOU
    MANUALLY RENEW YOUR SERVICES PRIOR TO THAT DATE. IN OTHER WORDS, SHOULD YOU
    ELECT TO CANCEL YOUR PRODUCT AND FAIL TO MANUALLY RENEW YOUR SERVICES BEFORE
    THEY EXPIRE, YOU MAY EXPERIENCE AN INTERRUPTION OR LOSS OF SERVICES, AND
    COMPANY SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY REGARDING THE SAME.</div> <br> <div class="svelte-f8awr0">IN ADDITION, COMPANY MAY PARTICIPATE IN \u201CRECURRING BILLING PROGRAMS\u201D OR
    \u201CACCOUNT UPDATER SERVICES\u201D SUPPORTED BY YOUR CREDIT CARD PROVIDER (AND
    ULTIMATELY DEPENDENT ON YOUR BANK\u2019S PARTICIPATION). IF WE ARE UNABLE TO
    SUCCESSFULLY CHARGE YOUR EXISTING PAYMENT METHOD, YOUR CREDIT CARD PROVIDER
    (OR YOUR BANK) MAY NOTIFY US OF UPDATES TO YOUR CREDIT CARD NUMBER AND/OR
    EXPIRATION DATE, OR THEY MAY AUTOMATICALLY CHARGE YOUR NEW CREDIT CARD ON
    OUR BEHALF WITHOUT NOTIFICATION TO US. IN ACCORDANCE WITH RECURRING BILLING
    PROGRAM REQUIREMENTS, IN THE EVENT THAT WE ARE NOTIFIED OF AN UPDATE TO YOUR
    CREDIT CARD NUMBER AND/OR EXPIRATION DATE, COMPANY WILL AUTOMATICALLY UPDATE
    YOUR PAYMENT PROFILE ON YOUR BEHALF. COMPANY MAKES NO GUARANTEES THAT WE
    WILL REQUEST OR RECEIVE UPDATED CREDIT CARD INFORMATION. YOU ACKNOWLEDGE AND
    AGREE THAT IT IS YOUR SOLE RESPONSIBILITY TO MODIFY AND MAINTAIN YOUR
    ACCOUNT SETTINGS, INCLUDING BUT NOT LIMITED TO (I) CANCELLING PRODUCTS AND
    (II) ENSURING YOUR ASSOCIATED PAYMENT METHOD(S) ARE CURRENT AND VALID.
    FURTHER, YOU ACKNOWLEDGE AND AGREE THAT YOUR FAILURE TO DO SO, MAY RESULT IN
    THE INTERRUPTION OR LOSS OF SERVICES, AND COMPANY SHALL NOT BE LIABLE TO YOU
    OR ANY THIRD PARTY REGARDING THE SAME.</div> <br> <div class="svelte-f8awr0">If for any reason Company is unable to charge your Payment Method for the
    full amount owed, or if Company receives notification of a chargeback,
    reversal, payment dispute, or is charged a penalty for any fee it previously
    charged to your Payment Method, you agree that Company may pursue all
    available lawful remedies in order to obtain payment, including but not
    limited to, immediate cancellation, without notice to you, of any domain
    names or Services registered or renewed on your behalf. Company also
    reserves the right to charge you reasonable \u201Cadministrative\u201D fees&quot; for (i)
    tasks Company may perform outside the normal scope of its Services, (ii)
    additional time and/or costs Company may incur in providing its Services,
    and/or (iii) your noncompliance with this Agreement (as determined by
    Company in its sole and absolute discretion). Typical administrative or
    processing fee scenarios include, but are not limited to (i) customer
    service issues that require additional personal time or attention; (ii) UDRP
    actions(s) in connection with your domain name(s) and/or disputes that
    require accounting or legal services, whether performed by Company staff or
    by outside firms retained by Company; (iii) recouping any and all costs and
    fees, including the cost of Services, incurred by Company as the results of
    chargebacks or other payment disputes brought by you, your bank or Payment
    Method processor. These administrative fees or processing fees will be
    billed to the Payment Method you have on file with Company.</div> <br> <div class="svelte-f8awr0">Company may offer product-level pricing in various currencies. The
    transaction will be processed in the selected currency and the pricing
    displayed during the checkout process will be the actual amount submitted
    for payment. For certain Payment Methods, the issuer of your Payment Method
    may charge you a foreign transaction fee or other charge, which may be added
    to the final amount that appears on your bank statement or post as a
    separate amount. Please check with the issuer of your Payment Method for
    details. In addition, regardless of the selected currency, you acknowledge
    and agree that you may be charged Value Added Tax (&quot;VAT&quot;), Goods and
    Services Tax (&quot;GST&quot;), or other localized fees and/or taxes, based on your
    bank and/or the country indicated in your billing address section.</div> <br> <div class="svelte-f8awr0">(B) REFUND POLICY</div> <div class="svelte-f8awr0">Products and Services available for refunds are described
    <a href="https://www.notion.so/Requesting-a-Refund-a66e34a9b22f439b89cad92865b246ff" class="svelte-f8awr0">here</a>
    (\u201CRefund Policy\u201D).</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">8. INDEMNIFICATION</div> <br> <div class="svelte-f8awr0">You agree to indemnify and hold harmless Company and its officers,
    directors, employees, parents, partners, successors, agents, distribution
    partners, affiliates, subsidiaries, and their related companies from and
    against any and all claims, liabilities, losses, damages, obligations, costs
    and expenses (including reasonable attorneys\u2019 fees and costs) arising out
    of, related to, or that may arise in connection with: (i) your use of our
    Services; (ii) User Content provided by you or through use of your
    Membership; (iii) any actual or alleged violation or breach by you of these
    Terms of Use; (iv) any actual or alleged breach of any representation,
    warranty, or covenant that you have made to us; (v) your acts or omissions
    breaches of these Terms of Use; and (vi) any activity related to your
    Membership (including infringement of third parties\u2019 worldwide intellectual
    property rights or negligent or wrongful conduct) by you or any other person
    accessing the Website, the Application or the Services using your
    Membership. You agree to cooperate fully with us in the defense of any claim
    that is the subject of your obligations hereunder.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">9. DISCLAIMER OF WARRANTIES; WAIVER AND RELEASE</div> <br> <div class="svelte-f8awr0">(A) YOU EXPRESSLY AGREE THAT USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR
    SERVICES AND SERVICE CONTENT (INCLUDING SOFTWARE) ARE PROVIDED ON AN \u201CAS IS\u201D
    AND \u201CAS AVAILABLE\u201D BASIS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR
    IMPLIED. WITHOUT LIMITING THE FOREGOING AND TO THE FULLEST EXTENT PERMITTED
    BY LAW, COMPANY AND ITS OFFICERS, DIRECTORS, EMPLOYEES, PARENTS, PARTNERS,
    SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS, AFFILIATES, SUBSIDIARIES, AND
    THEIR RELATED COMPANIES DISCLAIM ANY AND ALL WARRANTIES INCLUDING ANY: (1)
    WARRANTIES THAT OUR SERVICES WILL MEET YOUR REQUIREMENTS; (2) WARRANTIES
    CONCERNING THE AVAILABILITY, ACCURACY, SECURITY, USEFULNESS, TIMELINESS, OR
    INFORMATIONAL CONTENT OF OUR SERVICES OR SERVICE CONTENT; (3) WARRANTIES OF
    TITLE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR A PARTICULAR
    PURPOSE; (4) WARRANTIES FOR SERVICES OR GOODS RECEIVED THROUGH OR ADVERTISED
    OR ACCESSED THROUGH OUR SERVICES; (5) WARRANTIES CONCERNING THE ACCURACY OR
    RELIABILITY OF THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF OUR
    SERVICES; (6) WARRANTIES THAT YOUR USE OF OUR SERVICES WILL BE SECURE OR
    UNINTERRUPTED; AND (7) WARRANTIES THAT ERRORS IN OUR SERVICES OR SERVICE
    CONTENT (INCLUDING SOFTWARE) WILL BE CORRECTED. THERE ARE NO WARRANTIES THAT
    EXTEND BEYOND THE FACE OF THESE TERMS. WE CANNOT AND DO NOT WARRANT AGAINST
    HUMAN AND MACHINE ERRORS, OMISSIONS, DELAYS, INTERRUPTIONS OR LOSSES,
    INCLUDING LOSS OF DATA. WE CANNOT AND DO NOT GUARANTEE OR WARRANT THAT FILES
    AVAILABLE FOR DOWNLOADING FROM THE WEBSITE OR THE APPLICATION WILL BE FREE
    OF INFECTION BY VIRUSES, WORMS, TROJAN HORSES OR OTHER CODE THAT MANIFEST
    CONTAMINATING OR DESTRUCTIVE PROPERTIES. THIS DISCLAIMER OF WARRANTY
    CONSTITUTES AN ESSENTIAL PART OF THESE TERMS OF USE. IF YOU ARE DISSATISFIED
    WITH ANY PORTION OF THE SERVICE, OR WITH ANY OF THESE TERMS OF USE, YOUR
    SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SERVICE. WE MAY CHANGE
    THE SERVICE OR THE FEATURES IN ANY WAY, AND AT ANY TIME AND FOR ANY REASON.
    ALTHOUGH WE HAVE ATTEMPTED TO PROVIDE ACCURATE INFORMATION ON THE WEBSITE
    AND APPLICATION, WE ASSUME NO RESPONSIBILITY FOR THE ACCURACY OR
    COMPLETENESS OF THE INFORMATION.</div> <br> <div class="svelte-f8awr0">(B) YOU AGREE THAT NEITHER THE COMPANY NOR ITS OFFICERS, DIRECTORS,
    EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS SHALL HAVE ANY LIABILITY TO YOU
    UNDER ANY THEORY OF LIABILITY OR INDEMNITY IN CONNECTION WITH YOUR USE OF
    THE WEBSITE, THE APPLICATION, THE SERVICE, OR THE CONTENT. YOU SPECIFICALLY
    ACKNOWLEDGE THAT THE COMPANY SHALL NOT BE LIABLE FOR THE DEFAMATORY,
    OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE RISK OF HARM
    OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH YOU. YOU HEREBY RELEASE AND
    FOREVER WAIVE ANY AND ALL CLAIMS YOU MAY HAVE AGAINST THE COMPANY, ITS
    OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS (INCLUDING
    BUT NOT LIMITED TO CLAIMS BASED UPON THE NEGLIGENCE OF THE COMPANY, ITS
    OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, LICENSORS OR SUPPLIERS) FOR LOSSES
    OR DAMAGES YOU SUSTAIN IN CONNECTION WITH YOUR USE OF THE WEBSITE, THE
    APPLICATION, THE SERVICE, OR THE SERVICE CONTENT.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">10. LIMITATION ON LIABILITY</div> <br> <div class="svelte-f8awr0">(A) UNDER NO CIRCUMSTANCES SHALL COMPANY OR ITS OFFICERS, DIRECTORS,
    EMPLOYEES, PARENTS, PARTNERS, SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS,
    AFFILIATES, SUBSIDIARIES, OR THEIR RELATED COMPANIES BE LIABLE FOR INDIRECT,
    INCIDENTAL, SPECIAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES (EVEN IF WE HAVE
    BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), ARISING OUT OF, RELATING
    TO, OR IN ANY WAY CONNECTED WITH OUR SERVICES OR THESE TERMS OF USE. YOUR
    SOLE REMEDY FOR DISSATISFACTION WITH OUR SERVICES INCLUDING, WITHOUT
    LIMITATION, SERVICE CONTENT IS TO STOP USING OUR SERVICES. SUCH LIMITATION
    SHALL ALSO APPLY WITH RESPECT TO DAMAGES INCURRED BY REASON OF GOODS
    RECEIVED THROUGH OR ADVERTISED IN CONNECTION WITH OUR SERVICES OR ANY LINKS
    PLACED IN OUR SERVICES, AS WELL AS BY REASON OF ANY INFORMATION OR ADVICE
    RECEIVED THROUGH OR ADVERTISED IN CONNECTION WITH OUR SERVICES OR ANY LINKS
    PLACED IN OUR SERVICES. SUCH LIMITATION SHALL ALSO APPLY WITH RESPECT TO
    DAMAGES INCURRED BY REASON OF ANY CONTENT POSTED BY A THIRD PARTY OR CONDUCT
    OF A THIRD PARTY USING OUR SERVICES.</div> <br> <div class="svelte-f8awr0">(B) NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT
    SHALL THE CUMULATIVE LIABILITY OF COMPANY AND ITS OFFICERS, DIRECTORS,
    EMPLOYEES, PARENTS, PARTNERS, SUCCESSORS, AGENTS, DISTRIBUTION PARTNERS,
    AFFILIATES, SUBSIDIARIES, AND THEIR RELATED COMPANIES EXCEED THE LESSER OF
    THE TOTAL PAYMENTS RECEIVED FROM YOU BY COMPANY DURING THE PRECEDING TWELVE
    (12) MONTH PERIOD OR $100. FURTHERMORE, YOU AGREE THAT ANY CAUSE OF ACTION
    ARISING OUT OF, RELATING TO, OR IN ANY WAY CONNECTED WITH ANY OF OUR
    SERVICES OR THESE TERMS OF USE MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE
    CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF ACTION SHALL BE
    PERMANENTLY BARRED.</div> <br> <div class="svelte-f8awr0">(C) In some jurisdictions limitations of liability are not permitted. In
    such jurisdictions, some of the foregoing limitations may not apply to you.
    These limitations shall apply to the fullest extent permitted by law.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">11. TERMINATION</div> <br> <div class="svelte-f8awr0">(A) We reserve the right in our sole discretion and at any time to terminate
    or suspend your Membership and/or block your use of our Services for any
    reason including, without limitation if you have failed to comply with the
    letter and spirit of these Terms of Use. You agree that Company is not
    liable to you or any third party for any termination or suspension of your
    Membership or for blocking your use of our Services.</div> <br> <div class="svelte-f8awr0">(B) Any suspension or termination shall not affect your obligations to us
    under these Terms of Use. The provisions of these Terms of Use which by
    their nature should survive the suspension or termination of your Membership
    or these Terms of Use shall survive including, but not limited to the rights
    and licenses that you have granted hereunder, indemnities, releases,
    disclaimers, limitations on liability, provisions related to choice of law,
    and all of the provisions in the Section titled \u201CMISCELLANEOUS\u201D.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">12. COPYRIGHT POLICY</div> <br> <div class="svelte-f8awr0">(A) We respect the intellectual property rights of others and expect users
    to do the same. In appropriate circumstances and at our sole discretion, we
    may terminate and/or disable the Membership of users suspected to be
    infringing the copyrights (or other intellectual property rights) of others.
    Additionally, in appropriate circumstances and in our sole discretion, we
    may remove or disable access to material on any of our websites or hosted on
    our systems that may be infringing or the subject of infringing activity.</div> <br> <div class="svelte-f8awr0">(B) In accordance with the Digital Millennium Copyright Act of 1998, Title
    17 of the United States Code, Section 512 (\u201CDMCA\u201D), we will respond promptly
    to claims of copyright infringement that are reported to the agent that we
    have designated to receive notifications of claims infringement (its
    \u201CDesignated Agent\u201D). Our Designated Agent is:</div> <br> <div class="svelte-f8awr0">12 Triangles, LLC., 950 S 10th St #58, Omaha, NE 68108 USA. Claims can be
    directed to us at
    <a href="mailto:legal@12triangles.com" class="svelte-f8awr0">legal@12Triangles.com.</a></div> <br> <div class="svelte-f8awr0">(C) If you are a copyright owner (or authorized to act on behalf of the
    copyright owner) and believe that your work\u2019s copyright has been infringed,
    please report your notice of infringement to us by providing our Designated
    Agent with a written notification of claimed infringement that includes
    substantially the following:</div> <br> <div class="svelte-f8awr0">(i) A physical or electronic signature of a person authorized to act on
    behalf of the owner of an exclusive right that is allegedly infringed. (ii)
    Identification of the copyrighted work claimed to have been infringed, or,
    if multiple copyrighted works at a single online site are covered by a
    single notification, a representative list of such works at that site. (iii)
    Identification of the material that is claimed to be infringing or to be the
    subject of infringing activity and that is to be removed or access to which
    is to be disabled, and information reasonably sufficient to permit us to
    locate the material. (iv) Information reasonably sufficient to permit us to
    contact you, such as an address, telephone number, and, if available, an
    electronic mail address at which you may be contacted. (v) A statement that
    you have a good faith belief that use of the material in the manner
    complained of is not authorized by the copyright owner, its agent, or the
    law. (vi) A statement that the information in the notification is accurate,
    and under penalty of perjury, that you are authorized to act on behalf of
    the owner of an exclusive right that is allegedly infringed.</div> <br> <div class="svelte-f8awr0">We will investigate notices of copyright infringement and take appropriate
    actions under the DMCA. Inquiries that do not follow this procedure may not
    receive a response.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">13. CHOICE OF LAW; JURISDICTION AND VENUE</div> <br> <div class="svelte-f8awr0">These Terms of Use shall be construed in accordance with the laws of the
    State of Nebraska without regard to its conflict of laws rules. Any legal
    proceedings against Company that may arise out of, relate to, or be in any
    way connected with our Website, Application, Services or these Terms of Use
    shall be brought exclusively in the state and federal courts of the State of
    Nebraska and you waive any jurisdictional, venue, or inconvenient forum
    objections to such courts.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">14. DISPUTE RESOLUTION &amp; MANDATORY ARBITRATION</div> <br> <div class="svelte-f8awr0">(A) We each agree to first contact each other with any disputes and provide
    a written description of the problem, all relevant documents/information and
    the proposed resolution. You agree to contact us with disputes by contacting
    us at the address provided in these Terms of Use. We will contact you based
    on the contact information you have provided us.</div> <br> <div class="svelte-f8awr0">(B) If after 30 days the parties are unable to resolve any dispute raised
    under the previous provision, the dispute may be submitted to arbitration
    consistent with this Section. The parties understand that they would have
    had a right or opportunity to litigate disputes through a court and to have
    a judge or jury decide their case, but they choose to have any disputes
    resolved through arbitration.</div> <br> <div class="svelte-f8awr0">(C) We each agree that any claim or dispute between us, and any claim by
    either of us against any agent, employee, successor, or assign of the other,
    including, to the full extent permitted by applicable law, third parties who
    are not signatories to this agreement, whether related to this agreement or
    otherwise, including past, present, and future claims and disputes, and
    including any dispute as to the validity or applicability of this
    arbitration clause, shall be resolved by binding arbitration administered by
    the JAMS under its rules and procedures in effect when the claim is filed.
    The rules and procedures and other information, including information on
    fees, may be obtained from JAMS\u2019 website
    <a href="https://www.jamsadr.com/" class="svelte-f8awr0">(www.jamsadr.com).</a>
    or by calling JAMS at 949-224-1810.</div> <br> <div class="svelte-f8awr0">(D) We are entering into this arbitration agreement in connection with a
    transaction involving interstate commerce. Accordingly, this arbitration
    agreement and any proceedings thereunder shall be governed by the Federal
    Arbitration Act (\u201CFAA\u201D), 9 U.S.C. \xA7\xA7 1-16. Any award by the arbitrator(s)
    may be entered as a judgment in any court having jurisdiction.</div> <br> <div class="svelte-f8awr0">(E) Exception to Arbitrate. Either of us may bring qualifying claims in
    small claims court. Further, as set forth below, we each agree that any
    arbitration will be solely between you and Company, not as part of a class
    wide claim (i.e., not brought on behalf of or together with another
    individual&#39;s claim). If for any reason any court or arbitrator holds that
    this restriction is unconscionable or unenforceable, then our agreement to
    arbitrate doesn&#39;t apply and the class wide dispute must be brought in court.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">15. NO CLASS ACTIONS</div> <br> <div class="svelte-f8awr0">TO THE EXTENT ALLOWED BY LAW, WE EACH WAIVE ANY RIGHT TO PURSUE DISPUTES ON
    A CLASS WIDE BASIS; THAT IS, TO EITHER JOIN A CLAIM WITH THE CLAIM OF ANY
    OTHER PERSON OR ENTITY, OR ASSERT A CLAIM IN A REPRESENTATIVE CAPACITY ON
    BEHALF OF ANYONE ELSE IN ANY LAWSUIT, ARBITRATION OR OTHER PROCEEDING.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">16. NO TRIAL BY JURY</div> <br> <div class="svelte-f8awr0">TO THE EXTENT ALLOWED BY LAW, WE EACH WAIVE ANY RIGHT TO TRIAL BY JURY IN
    ANY LAWSUIT, ARBITRATION OR OTHER PROCEEDING.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">17. AMENDMENT; ADDITIONAL TERMS</div> <br> <div class="svelte-f8awr0">(A) We reserve the right in our sole discretion and at any time and for any
    reason, to modify or discontinue any aspect or feature of our Services or to
    modify these Terms of Use. In addition, we reserve the right to provide you
    with operating rules or additional terms that may govern your use of our
    Services generally, unique of our Services, or both (\u201CAdditional Terms\u201D).
    Any Additional Terms that we may provide to you will be incorporated by
    reference into these Terms of Use. To the extent any Additional Terms
    conflict with these Terms of Use, the Additional Terms will control.</div> <br> <div class="svelte-f8awr0">(B) Modifications to these Terms of Use or Additional Terms will be
    effective immediately upon notice, either by posting on the Website,
    notification by email or through any of our Applications. It is your
    responsibility to review the Terms of Use from time to time for any changes
    or Additional Terms. Your access and use of our Services following any
    modification of these Terms of Use or the provision of Additional Terms will
    signify your assent to and acceptance of the same. If you object to any
    subsequent revision to the Terms of Use or to any Additional Terms,
    immediately discontinue use of our Services and, if applicable, terminate
    your Membership.</div> <br> <br> <br> <br> <div class="section svelte-f8awr0">18. MISCELLANEOUS</div> <br> <div class="svelte-f8awr0">(A) No waiver by either party of any breach or default hereunder shall be
    deemed to be a waiver of any preceding or subsequent breach or default. No
    waiver shall be binding unless executed in writing by the party making the
    waiver. The section headings used herein are for convenience only and shall
    not be given any legal import.</div> <br> <div class="svelte-f8awr0">(B) Except where specifically stated otherwise, if any part of these Terms
    of Use is unlawful or unenforceable for any reason, we both agree that only
    that part of the Terms of Use shall be stricken and that the remaining terms
    in the Terms of Use shall not be affected.</div> <br> <div class="svelte-f8awr0">(C) These Terms of Use (including the Privacy Policy and any Additional
    Terms incorporated by reference) constitute the entire agreement of the
    parties with respect to the subject matter hereof, and supersede all
    previous written or oral agreements between us with respect to such subject
    matter.</div> <br> <div class="svelte-f8awr0">(D) You may not assign these Terms of Use or assign any rights or delegate
    any obligations hereunder, in whole or in part, without our prior written
    consent. Any such purported assignment or delegation by you without the
    appropriate prior written consent will be null and void and of no force and
    effect. We may assign these Terms of Use or any rights hereunder without
    your consent and without notice.</div> <br> <div class="svelte-f8awr0">(E) No provisions of these Terms of Use are intended, nor will be
    interpreted, to provide or create any third party beneficiary rights or any
    other rights of any kind in any nonprofit user, client, customer, affiliate,
    or any party hereto or any other person unless specifically provided
    otherwise herein, and except as so provided, all provisions hereof will be
    personal solely between the parties to these Terms of Use; except that
    Sections 7, 8(b), and 9 are intended to benefit the Company and its
    officers, directors, employees, agents, licensors, and suppliers.</div> <br> <div class="svelte-f8awr0">(F) We may deliver notice to you under these Terms of Use by means of
    electronic mail, a general notice on the Website or the Application, or by
    written communication delivered by first class U.S. mail to your address on
    record in the Membership. You may give notice to us at any time via
    electronic mail to the Website at the following address:
    <a href="mailto:legal@12triangles.com" class="svelte-f8awr0">legal@12Triangles.com.</a></div> <br> <br> <br> <br> <div class="title svelte-f8awr0" id="privacyPolicy">Privacy Policy</div> <div class="svelte-f8awr0">Effective June 3, 2021</div> <br> <br> <br> <br> <br> <br> <div class="svelte-f8awr0">We care about your privacy. For this reason, we collect and use personal
    information only as needed to deliver our products, services, websites and
    mobile applications, and to communicate with you about the same, or as you
    have requested (collectively, our \u201CServices\u201D). Your personal information
    includes information such as:</div> <div class="body-text svelte-f8awr0"><ul><li>Name</li> <li>Address</li> <li>Telephone number</li> <li>Date of birth</li> <li>Email address</li> <li>Billing and payment information</li> <li>Candidate information (for job applicants)</li> <li>Other data collected that could directly or indirectly identify you.</li></ul></div> <div class="svelte-f8awr0">Our Privacy Policy not only explains how and why we use your personal
    information that we collect, but also how you can access, update or
    otherwise take control of your personal information.</div> <br> <div class="svelte-f8awr0">If at any time you have questions about our practices or any of your rights
    described below, you may reach our Data Protection Officer (\u201CDPO\u201D) and our
    dedicated team that supports this office by contacting us at
    <a href="mailto:privacy@12triangles.com" class="svelte-f8awr0">privacy@12Triangles.com.</a>
    This inbox is actively monitored and managed so that we can deliver an experience
    that you can confidently trust.</div> <br> <br> <div class="svelte-f8awr0"><b>What information we collect, how we collect it, and why</b></div> <br> <br> <div class="svelte-f8awr0">Much of what you likely consider personal information is collected directly
    from you when you:
    <ul><li>create an account or purchase any of our Services (ex: billing
        information, including name, address, credit card number);</li> <li>request assistance from our award-winning customer support team (ex:
        phone number);</li> <li>complete contact forms or request newsletters or other information from
        us (ex: email); or</li> <li>participate in contests and surveys, apply for a job, or otherwise
        participate in activities we promote that might require information
        about you.</li></ul></div> <div class="svelte-f8awr0">However, we also collect additional information when delivering our Services
    to you to ensure necessary and optimal performance. These methods of
    collection may not be as obvious to you, so we thought we\u2019d highlight and
    explain a bit more about what these might be (as they vary from time to
    time):</div> <br> <br> <div class="svelte-f8awr0"><b>Cookies and similar technologies</b>
    on our websites and our mobile applications allow us to track your browsing behavior,
    links clicked, items purchased, your device type, and to collect various data,
    including analytics, about how you use and interact with our Services. These
    technologies automatically collect data when you use and interact with our Services,
    including metadata, log files, cookie/device IDs, page load time, server response
    time, and approximate location information to measure website performance and
    improve our systems, including optimizing DNS resolution, network routing and
    server configurations. Specifically, interactions with the features, content
    and links (including those of third-parties, such as social media plugins) contained
    within the Services, Internet Protocol (IP) address, browser type and settings,
    the date and time the Services were used, information about browser configuration
    and plugins, language preferences and cookie data, information about devices
    accessing the Services, including type of device, what operating system is used,
    device settings, application IDs, unique device identifiers and error data is
    collected. All this allows us to provide you with more relevant product offerings,
    a better experience on our sites and mobile applications, and to collect, analyze
    and improve the performance of our Services. We may also collect your location
    (IP address) so that we can personalize our Services. For additional information,
    and to learn how to manage the technologies we utilize, please visit our
    <a href="/privacy" class="svelte-f8awr0">Cookie Policy</a>
    . If you wish to opt out of interest-based advertising click
    <a href="http://preferences-mgr.truste.com/" class="svelte-f8awr0">here</a>
    [or if located in the European Union click
    <a href="https://www.youronlinechoices.com/" class="svelte-f8awr0">here</a>
    ]. Please note you will continue to receive generic ads.</div> <br> <br> <div class="svelte-f8awr0"><b>Supplemented Data</b>
    may be received about you from other sources, including publicly available databases
    or third parties from whom we have purchased data, in which case we may combine
    this data with information we already have about you so that we can update, expand
    and analyze the accuracy of our records, assess the qualifications of a candidate
    for employment, identify new customers, and provide products and services that
    may be of interest to you. If you provide us personal information about others,
    or if others give us your information, we will only use that information for
    the specific reason for which it was provided to us.</div> <br> <br> <div class="svelte-f8awr0"><b>How we utilize information.</b></div> <br> <br> <div class="svelte-f8awr0">We strongly believe in both minimizing the data we collect and limiting its
    use and purpose to only that (1) for which we have been given permission,
    (2) as necessary to deliver the Services you purchase or interact with, or
    (3) as we might be required or permitted for legal compliance or other
    lawful purposes:</div> <br> <br> <div class="svelte-f8awr0"><b>Delivering, improving, updating and enhancing our Services.</b>
    We collect various information relating to your purchase, use and/or interactions
    with our Services. We utilize this information to:</div> <br> <div class="svelte-f8awr0"><ul><li>Improve and optimize the operation and performance of our Services
        (again, including our websites and mobile applications)</li> <li>Diagnose problems with and identify any security and compliance risks,
        errors, or needed enhancements to the Services</li> <li>Detect and prevent fraud and abuse of our Services and systems</li> <li>Collecting aggregate statistics about use of the Services</li> <li>Understand and analyze how you use our Services and what products and
        services are most relevant to you.</li></ul></div> <br> <div class="svelte-f8awr0">Much of the data collected is aggregated or statistical data about how
    individuals use our Services, and is not linked to any personal information.</div> <br> <br> <div class="svelte-f8awr0"><b>Sharing with trusted third parties.</b>
    We may share your personal information with third parties that we have partnered
    to allow you to integrate their services into our own Services, and with our
    affiliates or trusted third party service providers as necessary for them to
    perform services on our behalf, such as:</div> <br> <div class="svelte-f8awr0"><ul><li>Processing credit card payments</li> <li>Serving advertisements</li> <li>Conducting contests or surveys</li> <li>Performing analysis of our Services and customers demographics</li> <li>Communicating with you, such as by way email or survey delivery</li> <li>Customer relationship management</li> <li>Security risk management and compliance</li> <li>Recruiting support and related services.</li></ul></div> <br> <div class="svelte-f8awr0">These third parties (and any subcontractors they may be permitted to use)
    have agreed not to share, use or retain your personal information for any
    purpose other than as necessary for the provision of Services.</div> <br> <br> <div class="svelte-f8awr0">We will also disclose your information to our affiliates or third parties:
    <ul><li>in the event that we sell or buy any business or assets (whether a
        result of liquidation, bankruptcy or otherwise), in which case we will
        disclose your data to the prospective seller or buyer of such business
        or assets; or</li> <li>if we sell, buy, merge, are acquired by, or partner with other companies
        or businesses, or sell some or all of our assets. In such transactions,
        your information may be among the transferred assets.</li></ul> <br> <b>Communicating with you.</b>
    We may contact you directly or through a third party service provider regarding
    products or services you have signed up or purchased from us, such as necessary
    to deliver transactional or service related communications. We may also contact
    you with offers for additional services we think you\u2019ll find valuable if you
    give us consent, or where allowed based upon legitimate interests. You don\u2019t
    need to provide consent as a condition to purchase our goods or services. These
    contacts may include:</div> <br> <div class="svelte-f8awr0"><ul><li>Email</li> <li>Text (SMS) messages</li> <li>Telephone calls</li> <li>Messenger applications (e.g. WhatsApp, etc.)</li> <li>Automated phone calls or text messages.</li></ul></div> <br> <div class="svelte-f8awr0">You may also update your subscription preferences with respect to receiving
    communications from us and/or our partners by signing into your account and
    visiting \u201CAccount Settings\u201D page.</div> <div class="svelte-f8awr0"><br>
    If we collect information from you in connection with a co-branded offer, it
    will be clear at the point of collection who is collecting the information and
    whose privacy policy applies. In addition, it will describe any choice options
    you have in regards to the use and/or sharing of your personal information with
    a co-branded partner, as well as how to exercise those options. We are not responsible
    for the privacy practices or the content of third-party sites. Please read the
    privacy policy of any website you visit.</div> <br> <br> <div class="svelte-f8awr0">If you make use of a service that allows you to import contacts (ex. using
    email marketing services to send emails on your behalf), we will only use
    the contacts and any other personal information for the requested service.
    If you believe that anyone has provided us with your personal information
    and you would like to request that it be removed from our database, please
    contact us at
    <a href="mailto:privacy@12triangles.com" class="svelte-f8awr0">privacy@12Triangles.com.</a></div> <br> <br> <div class="svelte-f8awr0"><b>Transfer of personal information abroad.</b>
    If you utilize our Services from a country other than the country where our servers
    are located, your personal information may be transferred across international
    borders, which will only be done when necessary for the performance of our contract
    with you, when we have your consent to do so, or when the appropriate standard
    contractual clauses are in place. Also, when you call us or initiate a chat,
    we may provide you with support from one of our global locations outside your
    country of origin.</div> <br> <br> <div class="svelte-f8awr0"><b>Compliance with legal, regulatory and law enforcement requests.</b>
    We cooperate with government and law enforcement officials and private parties
    to enforce and comply with the law. We will disclose any information about you
    to government or law enforcement officials or private parties as we, in our sole
    discretion, believe necessary or appropriate to respond to claims and legal process
    (such as subpoena requests), to protect our property and rights or the property
    and rights of a third party, to protect the safety of the public or any person,
    or to prevent or stop activity we consider to be illegal or unethical.</div> <br> <br> <div class="svelte-f8awr0">To the extent we are legally permitted to do so, we will take reasonable
    steps to notify you in the event that we are required to provide your
    personal information to third parties as part of legal process. We will also
    share your information to the extent necessary to comply with any ICANN,
    registry or ccTLD rules, regulations and policies when you register a domain
    name with us. For reasons critical to maintaining the security, stability
    and resiliency of the Internet, this includes the transfer of domain name
    registration information to the underlying domain registry operator and
    escrow provider, and publication of that information as required by ICANN in
    the public WHOIS database or with other third parties that demonstrate a
    legitimate legal interest to such information.</div> <br> <br> <div class="svelte-f8awr0"><b>How we secure, store and retain your data.</b></div> <br> <br> <div class="svelte-f8awr0">We follow generally accepted standards to store and protect the personal
    information we collect, both during transmission and once received and
    stored, including utilization of encryption where appropriate.</div> <br> <br> <div class="svelte-f8awr0">We retain personal information only for as long as necessary to provide the
    Services you have requested and thereafter for a variety of legitimate legal
    or business purposes. These might include retention periods:</div> <br> <br> <div class="svelte-f8awr0"><ul><li>mandated by law, contract or similar obligations applicable to our
        business operations;</li> <li>for preserving, resolving, defending or enforcing our legal/contractual
        rights; or</li> <li>needed to maintain adequate and accurate business and financial records.</li></ul></div> <br> <br> <div class="svelte-f8awr0">If you have any questions about the security or retention of your personal
    information, you can contact us at
    <a href="mailto:privacy@12triangles.com" class="svelte-f8awr0">privacy@12Triangles.com.</a></div> <br> <br> <div class="svelte-f8awr0"><b>How you can access, update or delete your data.</b></div> <br> <br> <div class="svelte-f8awr0">To easily access, view, or update your personal information, or to update
    your subscription preferences, please sign into your Account and visit
    \u201CAccount Settings.\u201D</div> <br> <br> <div class="svelte-f8awr0">If you wish to delete or port your personal information, you may submit your
    request to
    <a href="mailto:privacy@12triangles.com" class="svelte-f8awr0">privacy@12Triangles.com.</a>
    If you make a request to delete your personal information and that data is necessary
    for the products or services you have purchased, the request will be honored
    only to the extent it is no longer necessary for any Services purchased or required
    for our legitimate business purposes or legal or contractual record keeping requirements.</div> <br> <br> <div class="svelte-f8awr0">If you are unable for any reason to access your Account Settings, you may
    also contact us by one of the methods described in the \u201CContact Us\u201D section
    below.</div> <br> <br> <div class="svelte-f8awr0"><b>\u2018Do Not Track\u2019 notifications.</b></div> <br> <br> <div class="svelte-f8awr0">Some browsers allow you to automatically notify websites you visit not to
    track you using a \u201CDo Not Track\u201D signal. There is no consensus among
    industry participants as to what \u201CDo Not Track\u201D means in this context. Like
    many websites and online services, we currently do not alter our practices
    when we receive a \u201CDo Not Track\u201D signal from a visitor\u2019s browser. To find
    out more about \u201CDo Not Track,\u201D you may wish to visit
    <a href="https://www.allaboutdnt.com/" class="svelte-f8awr0">www.allaboutdnt.com.</a></div> <br> <br> <div class="svelte-f8awr0"><b>Age restrictions.</b></div> <br> <br> <div class="svelte-f8awr0">Our Services are available for purchase only for those over the age of 18.
    Our Services are not targeted to, intended to be consumed by or designed to
    entice individuals under the age of 18. If you know of or have reason to
    believe anyone under the age of 18 has provided us with any personal
    information, please contact us.</div> <br> <br> <div class="svelte-f8awr0"><b>Non-Discrimination.</b></div> <br> <br> <div class="svelte-f8awr0">We will not discriminate against you for exercising any of your privacy
    rights. Unless permitted under applicable laws, we will not:
    <br> <br> <ul><li>Deny you goods or services.</li> <li>Charge you different prices or rates for goods or services, including
        through granting discounts or other benefits, or imposing penalties.</li> <li>Provide you a different level or quality of goods or services.</li> <li>Suggest that you may receive a different price or rate for goods or
        services or a different level or quality of goods or services.</li></ul></div> <br> <div class="svelte-f8awr0"><b>Changes to this policy.</b></div> <br> <br> <div class="svelte-f8awr0">We reserve the right to modify this Privacy Policy at any time. If we decide
    to change our Privacy Policy, we will post those changes to this Privacy
    Policy and any other places we deem appropriate, so that you are aware of
    what information we collect, how we use it, and under what circumstances, if
    any, we disclose it. If we make material changes to this Privacy Policy, we
    will notify you here, by email, or by means of a notice on our home page, at
    least thirty (30) days prior to the implementation of the changes.</div> <br> <br> <div class="svelte-f8awr0"><b>Data Protection Authority.</b></div> <br> <br> <div class="svelte-f8awr0">If you are a resident of the European Economic Area (EEA) and believe we
    maintain your personal information subject to the General Data Protection
    Regulation (GDPR), you may direct questions or complaints to your local
    supervisory authority or our lead supervisory authority, the UK&#39;s
    Information Commissioner\u2019s Office, as noted below:</div> <br> <br> <div class="svelte-f8awr0"><a href="https://www.ico.org.uk" class="svelte-f8awr0">www.ico.org.uk</a> <br> <br>
    Information Commissioner\u2019s Office
    <br> <br>
    Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, United Kingdom
    <br> <br>
    Phone: 0303 123 1113</div> <br> <br> <div class="svelte-f8awr0"><b>Contact us.</b></div> <br> <br> <div class="svelte-f8awr0">If you have any privacy-related questions, concerns or complaints about our
    Privacy Policy, our practices or our Services, you may contact our Office of
    the DPO by email at
    <a href="mailto:privacy@12triangles.com" class="svelte-f8awr0">privacy@12Triangles.com.</a>
    In the alternative, you may contact us by either of the following means:</div> <br> <br> <div class="svelte-f8awr0">By Mail: Attn: Office of the Data Protection Officer, 950 S 10th Street #58,
    Omaha, NE 68108 USA \u200D</div> <br> <br> <div class="svelte-f8awr0"><b>We will respond to all requests, inquiries or concerns within thirty (30)
      days.</b></div> <br> <br> <br> <br> <br> <br> <br> <br> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/20.js
var __exports21 = {};
__export(__exports21, {
  component: () => component21,
  fonts: () => fonts21,
  imports: () => imports21,
  index: () => index21,
  stylesheets: () => stylesheets21
});
var index21, component_cache21, component21, imports21, stylesheets21, fonts21;
var init__21 = __esm({
  ".svelte-kit/output/server/nodes/20.js"() {
    init_shims();
    index21 = 20;
    component21 = async () => component_cache21 ??= (await Promise.resolve().then(() => (init_page_svelte19(), page_svelte_exports19))).default;
    imports21 = ["_app/immutable/nodes/20.u_w7Vs0B.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets21 = ["_app/immutable/assets/20.B69x2LzP.css"];
    fonts21 = [];
  }
});

// .svelte-kit/output/server/entries/pages/watercolor/_page.svelte.js
var page_svelte_exports20 = {};
__export(page_svelte_exports20, {
  default: () => Page20
});
var css21, Page20;
var init_page_svelte20 = __esm({
  ".svelte-kit/output/server/entries/pages/watercolor/_page.svelte.js"() {
    init_shims();
    init_ssr();
    css21 = {
      code: '.svelte-1oypzer{margin:0px;font-family:"Inter", sans-serif}body{margin:0px;color:#222222;font-family:"Inter", sans-serif}.big-logo{margin:32px auto;width:160px;height:160px;filter:drop-shadow(32px 32px 80px #00000010)}.card-container.svelte-1oypzer{display:flex;flex-direction:column;text-align:center;max-width:1200px;width:100%;margin:auto;position:relative;z-index:1}.bokeh.svelte-1oypzer{width:100%;height:100%;background-image:url("/watercolor.jpg");background-size:cover;z-index:0;position:fixed;overflow-x:hidden;top:0px;left:0px}.left-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;left:-10%;top:-10%;width:100%;height:60%;border-radius:50%;filter:blur(150px)}.right-bokeh.svelte-1oypzer{position:absolute;background-color:#22222217;right:-40%;top:-40%;width:120%;height:80%;border-radius:50%;filter:blur(150px)}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 8px}.flair-text.svelte-1oypzer{text-align:center;font-size:32px;margin:auto;max-width:680px;width:96.25%;color:rgb(255, 255, 255)}.container-text.svelte-1oypzer{color:white;font-size:20px;font-weight:700;margin:16px 0px 80px}.card-list.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:space-around;margin:auto 16px}.card.svelte-1oypzer{max-width:96.25%;width:480px;height:256px}a.svelte-1oypzer{text-decoration:none;color:inherit}@media(max-width: 500px){.flair-text.svelte-1oypzer{font-size:24px}.container-text.svelte-1oypzer{font-size:16px;font-weight:400}}.small-logo.svelte-1oypzer{display:flex;justify-content:center;height:66px;width:60px;margin:auto;padding:0px 16px;color:white}.app-stores.svelte-1oypzer{display:flex;flex-wrap:wrap;justify-content:center;width:66%;max-width:400px;margin:auto}.store.svelte-1oypzer{width:200px;height:60px;margin:0px auto 24px}',
      map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<br />\\n<br />\\n<!-- Background -->\\n<div class=\\"bokeh\\">\\n  <div class=\\"left-bokeh\\" />\\n  <div class=\\"right-bokeh\\" />\\n</div>\\n<!-- Main Page -->\\n<div class=\\"card-container\\">\\n  <!-- Header -->\\n  <br />\\n  <br />\\n  <br />\\n  <br />\\n  <a href=\\"/\\">\\n    <img class=\\"big-logo\\" src=\\"flairLogo.svg\\" alt=\\"Flair Logo\\" />\\n  </a>\\n  <div class=\\"flair-text\\">\\n    Flair makes it fast and easy to create and share your own custom stickers!\\n  </div>\\n  <br />\\n  <br />\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <br />\\n  <!-- Cards -->\\n  <div class=\\"card-list\\">\\n    <div>\\n      <img class=\\"card\\" src=\\"themes-feature.svg\\" alt=\\"Popular Themes\\" />\\n      <div class=\\"container-text\\">High-Quality, Carefully Chosen Textures</div>\\n    </div>\\n    <div>\\n      <img\\n        class=\\"card\\"\\n        src=\\"stickers-feature.svg\\"\\n        alt=\\"Make Your Own Stickers\\"\\n      />\\n      <div class=\\"container-text\\">Unique Fonts, Only Available Using Flair</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"tools-feature.svg\\" alt=\\"Design Tools\\" />\\n      <div class=\\"container-text\\">Easy-To-Use Graphic Design Tools</div>\\n    </div>\\n    <div>\\n      <img class=\\"card\\" src=\\"share-feature.svg\\" alt=\\"Share Your Stickers\\" />\\n      <div class=\\"container-text\\">Quickly Share Your Stickers Anywhere!</div>\\n    </div>\\n  </div>\\n  <!-- More Themes -->\\n  <!-- <div>Here</div>\\n  <br /> -->\\n  <!-- Footer -->\\n  <div class=\\"app-stores\\">\\n    <a\\n      href=\\"https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526\\"\\n    >\\n      <img\\n        class=\\"store apple\\"\\n        src=\\"app-store.png\\"\\n        alt=\\"Flair: Sticker Design Maker\\"\\n      />\\n    </a>\\n  </div>\\n\\n  <div class=\\"quick-links-flair\\">\\n    <a class=\\"footer-link\\" href=\\"/how-to-flair\\">How to Flair</a>\\n    &nbsp;&nbsp;\u2728&nbsp;&nbsp;\\n    <a class=\\"footer-link\\" href=\\"/terms\\">Terms of Service</a>\\n  </div>\\n  <br />\\n  <div class=\\"small-logo\\">\\n    <a class=\\"footer-link\\" href=\\"/\\">\\n      <img class=\\"small-logo\\" src=\\"flairLogo.svg\\" alt=\\"flair logo\\" />\\n    </a>\\n    <a class=\\"footer-link\\" href=\\"https://12triangles.com\\">\\n      <img\\n        class=\\"small-logo\\"\\n        src=\\"12TrianglesWhite.svg\\"\\n        alt=\\"12 Triangles logo\\"\\n      />\\n    </a>\\n  </div>\\n  <br />\\n  <div class=\\"contact\\">FLAIR IS A PRODUCT OF 12 TRIANGLES</div>\\n  <br />\\n  <div class=\\"contact\\">\xA9 12 Triangles, LLC 2023</div>\\n  <br />\\n</div>\\n\\n<style>\\n  * {\\n    margin: 0px;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(body) {\\n    margin: 0px;\\n    color: #222222;\\n    font-family: \\"Inter\\", sans-serif;\\n  }\\n\\n  :global(.big-logo) {\\n    margin: 32px auto;\\n    width: 160px;\\n    height: 160px;\\n    filter: drop-shadow(32px 32px 80px #00000010);\\n  }\\n\\n  .card-container {\\n    display: flex;\\n    flex-direction: column;\\n    text-align: center;\\n    max-width: 1200px;\\n    width: 100%;\\n    margin: auto;\\n    position: relative;\\n    z-index: 1;\\n  }\\n\\n  .bokeh {\\n    width: 100%;\\n    height: 100%;\\n    background-image: url(\\"/watercolor.jpg\\");\\n    background-size: cover;\\n    z-index: 0;\\n    position: fixed;\\n    overflow-x: hidden;\\n    top: 0px;\\n    left: 0px;\\n  }\\n\\n  .left-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    left: -10%;\\n    top: -10%;\\n    width: 100%;\\n    height: 60%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .right-bokeh {\\n    position: absolute;\\n    background-color: #22222217;\\n    right: -40%;\\n    top: -40%;\\n    width: 120%;\\n    height: 80%;\\n    border-radius: 50%;\\n    filter: blur(150px);\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 8px;\\n  }\\n\\n  .flair-text {\\n    text-align: center;\\n    font-size: 32px;\\n\\n    margin: auto;\\n\\n    max-width: 680px;\\n    width: 96.25%;\\n    color: rgb(255, 255, 255);\\n  }\\n\\n  .container-text {\\n    color: white;\\n    font-size: 20px;\\n    font-weight: 700;\\n    margin: 16px 0px 80px;\\n  }\\n\\n  .card-list {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: space-around;\\n    margin: auto 16px;\\n  }\\n\\n  .card {\\n    max-width: 96.25%;\\n    width: 480px;\\n    height: 256px;\\n  }\\n\\n  a {\\n    text-decoration: none;\\n    color: inherit;\\n  }\\n\\n  @media (max-width: 500px) {\\n    .flair-text {\\n      font-size: 24px;\\n    }\\n\\n    .container-text {\\n      font-size: 16px;\\n      font-weight: 400;\\n    }\\n  }\\n\\n  .small-logo {\\n    display: flex;\\n    justify-content: center;\\n    height: 66px;\\n    width: 60px;\\n    margin: auto;\\n    padding: 0px 16px;\\n    color: white;\\n  }\\n\\n  .app-stores {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    width: 66%;\\n    max-width: 400px;\\n    margin: auto;\\n  }\\n\\n  .store {\\n    width: 200px;\\n    height: 60px;\\n    margin: 0px auto 24px;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}'
    };
    Page20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      $$result.css.add(css21);
      return `<br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="bokeh svelte-1oypzer" data-svelte-h="svelte-kn4jp3"><div class="left-bokeh svelte-1oypzer"></div> <div class="right-bokeh svelte-1oypzer"></div></div>  <div class="card-container svelte-1oypzer" data-svelte-h="svelte-1sy495v"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <a href="/" class="svelte-1oypzer"><img class="big-logo svelte-1oypzer" src="flairLogo.svg" alt="Flair Logo"></a> <div class="flair-text svelte-1oypzer">Flair makes it fast and easy to create and share your own custom stickers!</div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer"> <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <br class="svelte-1oypzer"> <br class="svelte-1oypzer">  <div class="card-list svelte-1oypzer"><div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="themes-feature.svg" alt="Popular Themes"> <div class="container-text svelte-1oypzer">High-Quality, Carefully Chosen Textures</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="stickers-feature.svg" alt="Make Your Own Stickers"> <div class="container-text svelte-1oypzer">Unique Fonts, Only Available Using Flair</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="tools-feature.svg" alt="Design Tools"> <div class="container-text svelte-1oypzer">Easy-To-Use Graphic Design Tools</div></div> <div class="svelte-1oypzer"><img class="card svelte-1oypzer" src="share-feature.svg" alt="Share Your Stickers"> <div class="container-text svelte-1oypzer">Quickly Share Your Stickers Anywhere!</div></div></div>    <div class="app-stores svelte-1oypzer"><a href="https://apps.apple.com/us/app/flair-sticker-design-kit/id1578105526" class="svelte-1oypzer"><img class="store apple svelte-1oypzer" src="app-store.png" alt="Flair: Sticker Design Maker"></a></div> <div class="quick-links-flair svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/how-to-flair">How to Flair</a>
    \xA0\xA0\u2728\xA0\xA0
    <a class="footer-link svelte-1oypzer" href="/terms">Terms of Service</a></div> <br class="svelte-1oypzer"> <div class="small-logo svelte-1oypzer"><a class="footer-link svelte-1oypzer" href="/"><img class="small-logo svelte-1oypzer" src="flairLogo.svg" alt="flair logo"></a> <a class="footer-link svelte-1oypzer" href="https://12triangles.com"><img class="small-logo svelte-1oypzer" src="12TrianglesWhite.svg" alt="12 Triangles logo"></a></div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">FLAIR IS A PRODUCT OF 12 TRIANGLES</div> <br class="svelte-1oypzer"> <div class="contact svelte-1oypzer">\xA9 12 Triangles, LLC 2023</div> <br class="svelte-1oypzer"> </div>`;
    });
  }
});

// .svelte-kit/output/server/nodes/21.js
var __exports22 = {};
__export(__exports22, {
  component: () => component22,
  fonts: () => fonts22,
  imports: () => imports22,
  index: () => index22,
  stylesheets: () => stylesheets22
});
var index22, component_cache22, component22, imports22, stylesheets22, fonts22;
var init__22 = __esm({
  ".svelte-kit/output/server/nodes/21.js"() {
    init_shims();
    index22 = 21;
    component22 = async () => component_cache22 ??= (await Promise.resolve().then(() => (init_page_svelte20(), page_svelte_exports20))).default;
    imports22 = ["_app/immutable/nodes/21.B0ETMaQw.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"];
    stylesheets22 = ["_app/immutable/assets/3.K5GWaLkF.css"];
    fonts22 = [];
  }
});

// .svelte-kit/svelte-adapter-firebase/entry.js
var entry_exports = {};
__export(entry_exports, {
  default: () => svelteKit
});
module.exports = __toCommonJS(entry_exports);
init_shims();
var import_process = __toESM(require("process"), 1);

// .svelte-kit/output/server/index.js
init_shims();

// .svelte-kit/output/server/chunks/internal.js
init_shims();
init_ssr();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
var prerendering = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page: page2 } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page2);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body: body2, assets: assets2, nonce, env }) => '<!-- <!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Flair: Sticker Design Maker</title>\n    <meta\n      name="description"\n      content="Flair makes it quick and easy to create custom stickers for your messages and more!"\n    /> -->\n\n    <!-- Facebook Meta Tags -->\n    <!-- <meta property="og:url" content="https://sayitwithflair.com/" />\n    <meta property="og:type" content="website" />\n    <meta property="og:title" content="Flair: Sticker Design Maker" />\n    <meta\n      property="og:description"\n      content="Flair makes it quick and easy to create custom stickers for your messages and more!"\n    />\n    <meta\n      property="og:image"\n      content="https://12Triangles.com/assets/12TrianglesOG.jpg"\n    /> -->\n\n    <!-- Twitter Meta Tags -->\n    <!-- <meta name="twitter:card" content="summary_large_image" />\n    <meta property="twitter:domain" content="sayitwithflair.com" />\n    <meta property="twitter:url" content="https://sayitwithflair.com/" />\n    <meta name="twitter:title" content="Flair: Sticker Design Maker" />\n    <meta\n      name="twitter:description"\n      content="Flair makes it quick and easy to create custom stickers for your messages and more!"\n    />\n    <meta\n      name="twitter:image"\n      content="https://12Triangles.com/assets/12TrianglesOG.jpg"\n    />\n\n    <base href="/" />\n    <link rel="icon" type="image/x-icon" href="favicon.ico" />\n    <link rel="stylesheet" href="global.css" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    %svelte.head%\n  </head>\n  <body>\n    <div>%svelte.body%</div>\n  </body>\n</html> -->\n\n<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Flair: Sticker Design Kit</title>\n    <meta\n      name="description"\n      content="Flair makes it fast and easy to create and share your own custom stickers!"\n    />\n    <link rel="icon" href="' + assets2 + '/favicon.png" />\n    <meta name="viewport" content="width=device-width" />\n    ' + head + `
  </head>
  <!-- Google tag (gtag.js)
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-B6LKSFY3TJ"
  ></script> -->
  <!-- <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())

    gtag('config', 'G-B6LKSFY3TJ')
  </script> -->
  <body data-sveltekit-preload-data="hover" style="margin: 0; padding: 0;">
    <div style="display: contents;">` + body2 + "</div>\n  </body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "toiq9o"
};
async function get_hooks() {
  return {};
}

// .svelte-kit/output/server/index.js
init_exports();
init_devalue();
init_ssr();
var import_cookie = __toESM(require_cookie(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q = "1"] = match;
      parts.push({ type, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
var HttpError = class {
  /**
   * @param {number} status
   * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
   */
  constructor(status, body2) {
    this.status = status;
    if (typeof body2 === "string") {
      this.body = { message: body2 };
    } else if (body2) {
      this.body = body2;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  /**
   * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
   * @param {string} location
   */
  constructor(status, location) {
    this.status = status;
    this.location = location;
  }
};
var SvelteKitError = class extends Error {
  /**
   * @param {number} status
   * @param {string} text
   * @param {string} message
   */
  constructor(status, text2, message) {
    super(message);
    this.status = status;
    this.text = text2;
  }
};
var ActionFailure = class {
  /**
   * @param {number} status
   * @param {T} data
   */
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
function json(data, init2) {
  const body2 = JSON.stringify(data);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder$3.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
var encoder$3 = new TextEncoder();
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder$3.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions = server2?.actions;
  if (!actions) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect) {
  return action_json({
    type: "redirect",
    status: redirect.status,
    location: redirect.location
  });
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions = server2?.actions;
  if (!actions) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (false)
      ;
    if (data instanceof ActionFailure) {
      return {
        type: "failure",
        status: data.status,
        data: data.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer2) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer2).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer2))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer2 = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer2);
            }
            if (buffer2 instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer2), true);
            }
            return buffer2;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get2 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get2.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
var subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
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
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i = value.length;
      while (i)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i);
    } else if (ArrayBuffer.isView(value)) {
      const buffer2 = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i = buffer2.length;
      while (i)
        hash2 = hash2 * 33 ^ buffer2[--i];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}</script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars2[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars2[bytes[i - 2] >> 2];
    result += chars2[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars2[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var BaseProvider = class {
  /** @type {boolean} */
  #use_hashes;
  /** @type {boolean} */
  #script_needs_csp;
  /** @type {boolean} */
  #style_needs_csp;
  /** @type {import('types').CspDirectives} */
  #directives;
  /** @type {import('types').Csp.Source[]} */
  #script_src;
  /** @type {import('types').Csp.Source[]} */
  #script_src_elem;
  /** @type {import('types').Csp.Source[]} */
  #style_src;
  /** @type {import('types').Csp.Source[]} */
  #style_src_attr;
  /** @type {import('types').Csp.Source[]} */
  #style_src_elem;
  /** @type {string} */
  #nonce;
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    this.#use_hashes = use_hashes;
    this.#directives = directives;
    const d = this.#directives;
    this.#script_src = [];
    this.#script_src_elem = [];
    this.#style_src = [];
    this.#style_src_attr = [];
    this.#style_src_elem = [];
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    this.#script_needs_csp = !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.#style_needs_csp = !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0;
    this.script_needs_nonce = this.#script_needs_csp && !this.#use_hashes;
    this.style_needs_nonce = this.#style_needs_csp && !this.#use_hashes;
    this.#nonce = nonce;
  }
  /** @param {string} content */
  add_script(content) {
    if (this.#script_needs_csp) {
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#script_src.push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#script_src.length === 0) {
          this.#script_src.push(`nonce-${this.#nonce}`);
        }
        if (d["script-src-elem"]?.length) {
          this.#script_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (this.#style_needs_csp) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = this.#directives;
      if (this.#use_hashes) {
        const hash2 = sha256(content);
        this.#style_src.push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`sha256-${hash2}`);
        }
      } else {
        if (this.#style_src.length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          this.#style_src.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-attr"]?.length) {
          this.#style_src_attr.push(`nonce-${this.#nonce}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            this.#style_src_elem.push(`sha256-${empty_comment_hash}`);
          }
          this.#style_src_elem.push(`nonce-${this.#nonce}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...this.#directives };
    if (this.#style_src.length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...this.#style_src
      ];
    }
    if (this.#style_src_attr.length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...this.#style_src_attr
      ];
    }
    if (this.#style_src_elem.length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...this.#style_src_elem
      ];
    }
    if (this.#script_src.length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...this.#script_src
      ];
    }
    if (this.#script_src_elem.length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...this.#script_src_elem
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /** @readonly */
  nonce = generate_nonce();
  /** @type {CspProvider} */
  csp_provider;
  /** @type {CspReportOnlyProvider} */
  report_only_provider;
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r) => {
    fulfil = f;
    reject = r;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets23 = new Set(client.stylesheets);
  const fonts23 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data2 = {};
    for (let i = 0; i < branch.length; i += 1) {
      data2 = { ...data2, ...branch[i].data };
      props[`data_${i}`] = data2;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data2,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets23.add(url);
      for (const url of node.fonts)
        fonts23.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets23) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts23) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global = `__sveltekit_${options2.version_hash}`;
  const { data, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}</script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head += rendered.head;
  const html = options2.templates.app({
    head,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data) => ({ data })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data, error }, replacer);
          } catch (e) {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data = void 0;
            str = uneval({ id, data, error }, replacer);
          }
          push(`<script>${global}.resolve(${str})</script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j = 0; j < i; j += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j]()
                );
                if (parent) {
                  Object.assign(data2, parent.data);
                }
              }
              return data2;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(data));
          for await (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response({
    type: "redirect",
    location: redirect.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify(value, reducers);
            } catch (e) {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify(error, reducers);
            }
            count -= 1;
            push(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i--) {
            if (page2.errors[i]) {
              const index23 = (
                /** @type {number} */
                page2.errors[i]
              );
              const node2 = await manifest2._.nodes[index23]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data),
        body: data
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i - buffered, i + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i + 1];
      const next_value = values[i + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie.serialize)(name, value, { ...defaults, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str, {
              decodeValues: false
            });
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              encode: (value2) => value2,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ??= `export const env=${JSON.stringify(public_env)}`;
  etag ??= `W/${Date.now()}`;
  headers ??= new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  });
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch (e) {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"svelte-adapter-firebase"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var Server = class {
  /** @type {import('types').SSROptions} */
  #options;
  /** @type {import('@sveltejs/kit').SSRManifest} */
  #manifest;
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    this.#options = options;
    this.#manifest = manifest2;
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: this.#options.env_public_prefix,
      private_prefix: this.#options.env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!this.#options.hooks) {
      try {
        const module2 = await get_hooks();
        this.#options.hooks = {
          handle: module2.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module2.handleError || (({ error }) => console.error(error)),
          handleFetch: module2.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request)),
          reroute: module2.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, this.#options, this.#manifest, {
      ...options2,
      error: false,
      depth: 0
    });
  }
};

// .svelte-kit/output/server/manifest.js
init_shims();
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ??= value = fn();
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["12Triangles.svg", "12TrianglesWhite.svg", "Inter-Bold.ttf", "Inter-Regular.ttf", "app-store.png", "favicon.ico", "flairLogo.svg", "flairOutlined.svg", "flairPreview.jpg", "global.css", "google-play.png", "robots.txt", "rotateTwoFingers.svg", "share-feature.svg", "stickers-feature.svg", "themes-feature.svg", "tools-feature.svg", "watercolor.jpg"]),
    mimeTypes: { ".svg": "image/svg+xml", ".ttf": "font/ttf", ".png": "image/png", ".jpg": "image/jpeg", ".css": "text/css", ".txt": "text/plain" },
    _: {
      client: { "start": "_app/immutable/entry/start.epbxl0qH.js", "app": "_app/immutable/entry/app.CLcm__ha.js", "imports": ["_app/immutable/entry/start.epbxl0qH.js", "_app/immutable/chunks/entry.BZIRZRT2.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/entry/app.CLcm__ha.js", "_app/immutable/chunks/scheduler.3FyHtdY9.js", "_app/immutable/chunks/index.DHmBXYgM.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
        __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
        __memo(() => Promise.resolve().then(() => (init__11(), __exports11))),
        __memo(() => Promise.resolve().then(() => (init__12(), __exports12))),
        __memo(() => Promise.resolve().then(() => (init__13(), __exports13))),
        __memo(() => Promise.resolve().then(() => (init__14(), __exports14))),
        __memo(() => Promise.resolve().then(() => (init__15(), __exports15))),
        __memo(() => Promise.resolve().then(() => (init__16(), __exports16))),
        __memo(() => Promise.resolve().then(() => (init__17(), __exports17))),
        __memo(() => Promise.resolve().then(() => (init__18(), __exports18))),
        __memo(() => Promise.resolve().then(() => (init__19(), __exports19))),
        __memo(() => Promise.resolve().then(() => (init__20(), __exports20))),
        __memo(() => Promise.resolve().then(() => (init__21(), __exports21))),
        __memo(() => Promise.resolve().then(() => (init__22(), __exports22)))
      ],
      routes: [
        {
          id: "/",
          pattern: /^\/$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 2 },
          endpoint: null
        },
        {
          id: "/acrylic",
          pattern: /^\/acrylic\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 3 },
          endpoint: null
        },
        {
          id: "/black-ink",
          pattern: /^\/black-ink\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 4 },
          endpoint: null
        },
        {
          id: "/collage-paper",
          pattern: /^\/collage-paper\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 5 },
          endpoint: null
        },
        {
          id: "/colorful-foil",
          pattern: /^\/colorful-foil\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 6 },
          endpoint: null
        },
        {
          id: "/colorful-marble",
          pattern: /^\/colorful-marble\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 7 },
          endpoint: null
        },
        {
          id: "/gold-foil",
          pattern: /^\/gold-foil\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 8 },
          endpoint: null
        },
        {
          id: "/gold-marble",
          pattern: /^\/gold-marble\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 9 },
          endpoint: null
        },
        {
          id: "/gold-paper",
          pattern: /^\/gold-paper\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 10 },
          endpoint: null
        },
        {
          id: "/gradients",
          pattern: /^\/gradients\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 11 },
          endpoint: null
        },
        {
          id: "/halftone",
          pattern: /^\/halftone\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 12 },
          endpoint: null
        },
        {
          id: "/holographic",
          pattern: /^\/holographic\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 13 },
          endpoint: null
        },
        {
          id: "/how-to-flair",
          pattern: /^\/how-to-flair\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 14 },
          endpoint: null
        },
        {
          id: "/mixed-media",
          pattern: /^\/mixed-media\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 15 },
          endpoint: null
        },
        {
          id: "/pastel",
          pattern: /^\/pastel\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 16 },
          endpoint: null
        },
        {
          id: "/pretty-textures",
          pattern: /^\/pretty-textures\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 17 },
          endpoint: null
        },
        {
          id: "/retro",
          pattern: /^\/retro\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 18 },
          endpoint: null
        },
        {
          id: "/template",
          pattern: /^\/template\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 19 },
          endpoint: null
        },
        {
          id: "/terms",
          pattern: /^\/terms\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 20 },
          endpoint: null
        },
        {
          id: "/watercolor",
          pattern: /^\/watercolor\/?$/,
          params: [],
          page: { layouts: [0], errors: [1], leaf: 21 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();

// .svelte-kit/svelte-adapter-firebase/firebase-to-svelte-kit.js
init_shims();
function toSvelteKitRequest(request) {
  const protocol = request.headers["x-forwarded-proto"] || "http";
  const host = `${protocol}://${request.headers["x-forwarded-host"]}`;
  const { href, pathname, searchParams: searchParameters } = new URL(request.url || "", host);
  return new Request(href, {
    method: request.method,
    headers: toSvelteKitHeaders(request.headers),
    body: request.rawBody ?? null,
    host,
    path: pathname,
    query: searchParameters
  });
}
function toSvelteKitHeaders(headers2) {
  const finalHeaders = {};
  for (const [key2, value] of Object.entries(headers2)) {
    finalHeaders[key2] = Array.isArray(value) ? value.join(",") : value;
  }
  return finalHeaders;
}

// .svelte-kit/svelte-adapter-firebase/entry.js
var server = new Server(manifest);
async function svelteKit(request, response) {
  await server.init({
    env: import_process.default.env
  });
  const rendered = await server.respond(toSvelteKitRequest(request), {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  });
  const body2 = await rendered.text();
  return rendered ? response.writeHead(rendered.status, Object.fromEntries(rendered.headers)).end(body2) : response.writeHead(404, "Not Found").end();
}
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
