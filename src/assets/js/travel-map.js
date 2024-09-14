var Hh = Object.defineProperty
var qh = (s, t, e) =>
  t in s
    ? Hh(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (s[t] = e)
var qo = (s, t, e) => (qh(s, typeof t != "symbol" ? t + "" : t, e), e)
;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) i(n)
  new MutationObserver(n => {
    for (const r of n)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function e(n) {
    const r = {}
    return (
      n.integrity && (r.integrity = n.integrity),
      n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (r.credentials = "omit")
          : (r.credentials = "same-origin"),
      r
    )
  }
  function i(n) {
    if (n.ep) return
    n.ep = !0
    const r = e(n)
    fetch(n.href, r)
  }
})()
class Fe {
  constructor(t) {
    this.propagationStopped,
      this.defaultPrevented,
      (this.type = t),
      (this.target = null)
  }
  preventDefault() {
    this.defaultPrevented = !0
  }
  stopPropagation() {
    this.propagationStopped = !0
  }
}
const Xi = { PROPERTYCHANGE: "propertychange" }
class io {
  constructor() {
    this.disposed = !1
  }
  dispose() {
    this.disposed || ((this.disposed = !0), this.disposeInternal())
  }
  disposeInternal() {}
}
function $h(s, t, e) {
  let i, n
  e = e || ve
  let r = 0,
    o = s.length,
    a = !1
  for (; r < o; )
    (i = r + ((o - r) >> 1)),
      (n = +e(s[i], t)),
      n < 0 ? (r = i + 1) : ((o = i), (a = !n))
  return a ? r : ~r
}
function ve(s, t) {
  return s > t ? 1 : s < t ? -1 : 0
}
function no(s, t, e) {
  if (s[0] <= t) return 0
  const i = s.length
  if (t <= s[i - 1]) return i - 1
  if (typeof e == "function") {
    for (let n = 1; n < i; ++n) {
      const r = s[n]
      if (r === t) return n
      if (r < t) return e(t, s[n - 1], r) > 0 ? n - 1 : n
    }
    return i - 1
  }
  if (e > 0) {
    for (let n = 1; n < i; ++n) if (s[n] < t) return n - 1
    return i - 1
  }
  if (e < 0) {
    for (let n = 1; n < i; ++n) if (s[n] <= t) return n
    return i - 1
  }
  for (let n = 1; n < i; ++n) {
    if (s[n] == t) return n
    if (s[n] < t) return s[n - 1] - t < t - s[n] ? n - 1 : n
  }
  return i - 1
}
function Jh(s, t, e) {
  for (; t < e; ) {
    const i = s[t]
    ;(s[t] = s[e]), (s[e] = i), ++t, --e
  }
}
function tt(s, t) {
  const e = Array.isArray(t) ? t : [t],
    i = e.length
  for (let n = 0; n < i; n++) s[s.length] = e[n]
}
function si(s, t) {
  const e = s.length
  if (e !== t.length) return !1
  for (let i = 0; i < e; i++) if (s[i] !== t[i]) return !1
  return !0
}
function Qh(s, t, e) {
  const i = t || ve
  return s.every(function (n, r) {
    if (r === 0) return !0
    const o = i(s[r - 1], n)
    return !(o > 0 || (e && o === 0))
  })
}
function Rn() {
  return !0
}
function Ms() {
  return !1
}
function Ui() {}
function sl(s) {
  let t = !1,
    e,
    i,
    n
  return function () {
    const r = Array.prototype.slice.call(arguments)
    return (
      (!t || this !== n || !si(r, i)) &&
        ((t = !0), (n = this), (i = r), (e = s.apply(this, arguments))),
      e
    )
  }
}
function tc(s) {
  function t() {
    let e
    try {
      e = s()
    } catch (i) {
      return Promise.reject(i)
    }
    return e instanceof Promise ? e : Promise.resolve(e)
  }
  return t()
}
function kn(s) {
  for (const t in s) delete s[t]
}
function Wi(s) {
  let t
  for (t in s) return !1
  return !t
}
class Ps extends io {
  constructor(t) {
    super(),
      (this.eventTarget_ = t),
      (this.pendingRemovals_ = null),
      (this.dispatching_ = null),
      (this.listeners_ = null)
  }
  addEventListener(t, e) {
    if (!t || !e) return
    const i = this.listeners_ || (this.listeners_ = {}),
      n = i[t] || (i[t] = [])
    n.includes(e) || n.push(e)
  }
  dispatchEvent(t) {
    const e = typeof t == "string",
      i = e ? t : t.type,
      n = this.listeners_ && this.listeners_[i]
    if (!n) return
    const r = e ? new Fe(t) : t
    r.target || (r.target = this.eventTarget_ || this)
    const o = this.dispatching_ || (this.dispatching_ = {}),
      a = this.pendingRemovals_ || (this.pendingRemovals_ = {})
    i in o || ((o[i] = 0), (a[i] = 0)), ++o[i]
    let l
    for (let h = 0, c = n.length; h < c; ++h)
      if (
        ("handleEvent" in n[h]
          ? (l = n[h].handleEvent(r))
          : (l = n[h].call(this, r)),
        l === !1 || r.propagationStopped)
      ) {
        l = !1
        break
      }
    if (--o[i] === 0) {
      let h = a[i]
      for (delete a[i]; h--; ) this.removeEventListener(i, Ui)
      delete o[i]
    }
    return l
  }
  disposeInternal() {
    this.listeners_ && kn(this.listeners_)
  }
  getListeners(t) {
    return (this.listeners_ && this.listeners_[t]) || void 0
  }
  hasListener(t) {
    return this.listeners_
      ? t
        ? t in this.listeners_
        : Object.keys(this.listeners_).length > 0
      : !1
  }
  removeEventListener(t, e) {
    if (!this.listeners_) return
    const i = this.listeners_[t]
    if (!i) return
    const n = i.indexOf(e)
    n !== -1 &&
      (this.pendingRemovals_ && t in this.pendingRemovals_
        ? ((i[n] = Ui), ++this.pendingRemovals_[t])
        : (i.splice(n, 1), i.length === 0 && delete this.listeners_[t]))
  }
}
const U = {
  CHANGE: "change",
  ERROR: "error",
  BLUR: "blur",
  CLEAR: "clear",
  CONTEXTMENU: "contextmenu",
  CLICK: "click",
  DBLCLICK: "dblclick",
  DRAGENTER: "dragenter",
  DRAGOVER: "dragover",
  DROP: "drop",
  FOCUS: "focus",
  KEYDOWN: "keydown",
  KEYPRESS: "keypress",
  LOAD: "load",
  RESIZE: "resize",
  TOUCHMOVE: "touchmove",
  WHEEL: "wheel",
}
function H(s, t, e, i, n) {
  if ((i && i !== s && (e = e.bind(i)), n)) {
    const o = e
    e = function () {
      s.removeEventListener(t, e), o.apply(this, arguments)
    }
  }
  const r = { target: s, type: t, listener: e }
  return s.addEventListener(t, e), r
}
function ds(s, t, e, i) {
  return H(s, t, e, i, !0)
}
function lt(s) {
  s && s.target && (s.target.removeEventListener(s.type, s.listener), kn(s))
}
class Gn extends Ps {
  constructor() {
    super(),
      (this.on = this.onInternal),
      (this.once = this.onceInternal),
      (this.un = this.unInternal),
      (this.revision_ = 0)
  }
  changed() {
    ++this.revision_, this.dispatchEvent(U.CHANGE)
  }
  getRevision() {
    return this.revision_
  }
  onInternal(t, e) {
    if (Array.isArray(t)) {
      const i = t.length,
        n = new Array(i)
      for (let r = 0; r < i; ++r) n[r] = H(this, t[r], e)
      return n
    }
    return H(this, t, e)
  }
  onceInternal(t, e) {
    let i
    if (Array.isArray(t)) {
      const n = t.length
      i = new Array(n)
      for (let r = 0; r < n; ++r) i[r] = ds(this, t[r], e)
    } else i = ds(this, t, e)
    return (e.ol_key = i), i
  }
  unInternal(t, e) {
    const i = e.ol_key
    if (i) ec(i)
    else if (Array.isArray(t))
      for (let n = 0, r = t.length; n < r; ++n)
        this.removeEventListener(t[n], e)
    else this.removeEventListener(t, e)
  }
}
Gn.prototype.on
Gn.prototype.once
Gn.prototype.un
function ec(s) {
  if (Array.isArray(s)) for (let t = 0, e = s.length; t < e; ++t) lt(s[t])
  else lt(s)
}
function W() {
  throw new Error("Unimplemented abstract method.")
}
let ic = 0
function it(s) {
  return s.ol_uid || (s.ol_uid = String(++ic))
}
class $o extends Fe {
  constructor(t, e, i) {
    super(t), (this.key = e), (this.oldValue = i)
  }
}
class me extends Gn {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      it(this),
      (this.values_ = null),
      t !== void 0 && this.setProperties(t)
  }
  get(t) {
    let e
    return (
      this.values_ && this.values_.hasOwnProperty(t) && (e = this.values_[t]), e
    )
  }
  getKeys() {
    return (this.values_ && Object.keys(this.values_)) || []
  }
  getProperties() {
    return (this.values_ && Object.assign({}, this.values_)) || {}
  }
  getPropertiesInternal() {
    return this.values_
  }
  hasProperties() {
    return !!this.values_
  }
  notify(t, e) {
    let i
    ;(i = `change:${t}`),
      this.hasListener(i) && this.dispatchEvent(new $o(i, t, e)),
      (i = Xi.PROPERTYCHANGE),
      this.hasListener(i) && this.dispatchEvent(new $o(i, t, e))
  }
  addChangeListener(t, e) {
    this.addEventListener(`change:${t}`, e)
  }
  removeChangeListener(t, e) {
    this.removeEventListener(`change:${t}`, e)
  }
  set(t, e, i) {
    const n = this.values_ || (this.values_ = {})
    if (i) n[t] = e
    else {
      const r = n[t]
      ;(n[t] = e), r !== e && this.notify(t, r)
    }
  }
  setProperties(t, e) {
    for (const i in t) this.set(i, t[i], e)
  }
  applyProperties(t) {
    t.values_ && Object.assign(this.values_ || (this.values_ = {}), t.values_)
  }
  unset(t, e) {
    if (this.values_ && t in this.values_) {
      const i = this.values_[t]
      delete this.values_[t],
        Wi(this.values_) && (this.values_ = null),
        e || this.notify(t, i)
    }
  }
}
const bt = { ADD: "add", REMOVE: "remove" },
  Jo = { LENGTH: "length" }
class Jn extends Fe {
  constructor(t, e, i) {
    super(t), (this.element = e), (this.index = i)
  }
}
class ue extends me {
  constructor(t, e) {
    if (
      (super(),
      this.on,
      this.once,
      this.un,
      (e = e || {}),
      (this.unique_ = !!e.unique),
      (this.array_ = t || []),
      this.unique_)
    )
      for (let i = 0, n = this.array_.length; i < n; ++i)
        this.assertUnique_(this.array_[i], i)
    this.updateLength_()
  }
  clear() {
    for (; this.getLength() > 0; ) this.pop()
  }
  extend(t) {
    for (let e = 0, i = t.length; e < i; ++e) this.push(t[e])
    return this
  }
  forEach(t) {
    const e = this.array_
    for (let i = 0, n = e.length; i < n; ++i) t(e[i], i, e)
  }
  getArray() {
    return this.array_
  }
  item(t) {
    return this.array_[t]
  }
  getLength() {
    return this.get(Jo.LENGTH)
  }
  insertAt(t, e) {
    if (t < 0 || t > this.getLength())
      throw new Error("Index out of bounds: " + t)
    this.unique_ && this.assertUnique_(e),
      this.array_.splice(t, 0, e),
      this.updateLength_(),
      this.dispatchEvent(new Jn(bt.ADD, e, t))
  }
  pop() {
    return this.removeAt(this.getLength() - 1)
  }
  push(t) {
    this.unique_ && this.assertUnique_(t)
    const e = this.getLength()
    return this.insertAt(e, t), this.getLength()
  }
  remove(t) {
    const e = this.array_
    for (let i = 0, n = e.length; i < n; ++i)
      if (e[i] === t) return this.removeAt(i)
  }
  removeAt(t) {
    if (t < 0 || t >= this.getLength()) return
    const e = this.array_[t]
    return (
      this.array_.splice(t, 1),
      this.updateLength_(),
      this.dispatchEvent(new Jn(bt.REMOVE, e, t)),
      e
    )
  }
  setAt(t, e) {
    const i = this.getLength()
    if (t >= i) {
      this.insertAt(t, e)
      return
    }
    if (t < 0) throw new Error("Index out of bounds: " + t)
    this.unique_ && this.assertUnique_(e, t)
    const n = this.array_[t]
    ;(this.array_[t] = e),
      this.dispatchEvent(new Jn(bt.REMOVE, n, t)),
      this.dispatchEvent(new Jn(bt.ADD, e, t))
  }
  updateLength_() {
    this.set(Jo.LENGTH, this.array_.length)
  }
  assertUnique_(t, e) {
    for (let i = 0, n = this.array_.length; i < n; ++i)
      if (this.array_[i] === t && i !== e)
        throw new Error("Duplicate item added to a unique collection")
  }
}
function J(s, t) {
  if (!s) throw new Error(t)
}
class Fs extends me {
  constructor(t) {
    if (
      (super(),
      this.on,
      this.once,
      this.un,
      (this.id_ = void 0),
      (this.geometryName_ = "geometry"),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      (this.geometryChangeKey_ = null),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      t)
    )
      if (typeof t.getSimplifiedGeometry == "function") {
        const e = t
        this.setGeometry(e)
      } else {
        const e = t
        this.setProperties(e)
      }
  }
  clone() {
    const t = new Fs(this.hasProperties() ? this.getProperties() : null)
    t.setGeometryName(this.getGeometryName())
    const e = this.getGeometry()
    e && t.setGeometry(e.clone())
    const i = this.getStyle()
    return i && t.setStyle(i), t
  }
  getGeometry() {
    return this.get(this.geometryName_)
  }
  getId() {
    return this.id_
  }
  getGeometryName() {
    return this.geometryName_
  }
  getStyle() {
    return this.style_
  }
  getStyleFunction() {
    return this.styleFunction_
  }
  handleGeometryChange_() {
    this.changed()
  }
  handleGeometryChanged_() {
    this.geometryChangeKey_ &&
      (lt(this.geometryChangeKey_), (this.geometryChangeKey_ = null))
    const t = this.getGeometry()
    t &&
      (this.geometryChangeKey_ = H(
        t,
        U.CHANGE,
        this.handleGeometryChange_,
        this,
      )),
      this.changed()
  }
  setGeometry(t) {
    this.set(this.geometryName_, t)
  }
  setStyle(t) {
    ;(this.style_ = t),
      (this.styleFunction_ = t ? nc(t) : void 0),
      this.changed()
  }
  setId(t) {
    ;(this.id_ = t), this.changed()
  }
  setGeometryName(t) {
    this.removeChangeListener(this.geometryName_, this.handleGeometryChanged_),
      (this.geometryName_ = t),
      this.addChangeListener(this.geometryName_, this.handleGeometryChanged_),
      this.handleGeometryChanged_()
  }
}
function nc(s) {
  if (typeof s == "function") return s
  let t
  return (
    Array.isArray(s)
      ? (t = s)
      : (J(
          typeof s.getZIndex == "function",
          "Expected an `ol/style/Style` or an array of `ol/style/Style.js`",
        ),
        (t = [s])),
    function () {
      return t
    }
  )
}
new Array(6)
function ne() {
  return [1, 0, 0, 1, 0, 0]
}
function sc(s, t) {
  return (
    (s[0] = t[0]),
    (s[1] = t[1]),
    (s[2] = t[2]),
    (s[3] = t[3]),
    (s[4] = t[4]),
    (s[5] = t[5]),
    s
  )
}
function Et(s, t) {
  const e = t[0],
    i = t[1]
  return (
    (t[0] = s[0] * e + s[2] * i + s[4]), (t[1] = s[1] * e + s[3] * i + s[5]), t
  )
}
function _e(s, t, e, i, n, r, o, a) {
  const l = Math.sin(r),
    h = Math.cos(r)
  return (
    (s[0] = i * h),
    (s[1] = n * l),
    (s[2] = -i * l),
    (s[3] = n * h),
    (s[4] = o * i * h - a * i * l + t),
    (s[5] = o * n * l + a * n * h + e),
    s
  )
}
function so(s, t) {
  const e = rc(t)
  J(e !== 0, "Transformation matrix cannot be inverted")
  const i = t[0],
    n = t[1],
    r = t[2],
    o = t[3],
    a = t[4],
    l = t[5]
  return (
    (s[0] = o / e),
    (s[1] = -n / e),
    (s[2] = -r / e),
    (s[3] = i / e),
    (s[4] = (r * l - o * a) / e),
    (s[5] = -(i * l - n * a) / e),
    s
  )
}
function rc(s) {
  return s[0] * s[3] - s[1] * s[2]
}
const Qo = [1e6, 1e6, 1e6, 1e6, 2, 2]
function rl(s) {
  return (
    "matrix(" + s.map((e, i) => Math.round(e * Qo[i]) / Qo[i]).join(", ") + ")"
  )
}
const yt = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16,
}
function ta(s) {
  const t = $t()
  for (let e = 0, i = s.length; e < i; ++e) mn(t, s[e])
  return t
}
function ro(s, t, e) {
  return e
    ? ((e[0] = s[0] - t),
      (e[1] = s[1] - t),
      (e[2] = s[2] + t),
      (e[3] = s[3] + t),
      e)
    : [s[0] - t, s[1] - t, s[2] + t, s[3] + t]
}
function ol(s, t) {
  return t
    ? ((t[0] = s[0]), (t[1] = s[1]), (t[2] = s[2]), (t[3] = s[3]), t)
    : s.slice()
}
function xi(s, t, e) {
  let i, n
  return (
    t < s[0] ? (i = s[0] - t) : s[2] < t ? (i = t - s[2]) : (i = 0),
    e < s[1] ? (n = s[1] - e) : s[3] < e ? (n = e - s[3]) : (n = 0),
    i * i + n * n
  )
}
function Zi(s, t) {
  return oo(s, t[0], t[1])
}
function Di(s, t) {
  return s[0] <= t[0] && t[2] <= s[2] && s[1] <= t[1] && t[3] <= s[3]
}
function oo(s, t, e) {
  return s[0] <= t && t <= s[2] && s[1] <= e && e <= s[3]
}
function Fr(s, t) {
  const e = s[0],
    i = s[1],
    n = s[2],
    r = s[3],
    o = t[0],
    a = t[1]
  let l = yt.UNKNOWN
  return (
    o < e ? (l = l | yt.LEFT) : o > n && (l = l | yt.RIGHT),
    a < i ? (l = l | yt.BELOW) : a > r && (l = l | yt.ABOVE),
    l === yt.UNKNOWN && (l = yt.INTERSECTING),
    l
  )
}
function $t() {
  return [1 / 0, 1 / 0, -1 / 0, -1 / 0]
}
function Qe(s, t, e, i, n) {
  return n ? ((n[0] = s), (n[1] = t), (n[2] = e), (n[3] = i), n) : [s, t, e, i]
}
function zn(s) {
  return Qe(1 / 0, 1 / 0, -1 / 0, -1 / 0, s)
}
function al(s, t) {
  const e = s[0],
    i = s[1]
  return Qe(e, i, e, i, t)
}
function ao(s, t, e, i, n) {
  const r = zn(n)
  return hl(r, s, t, e, i)
}
function Sn(s, t) {
  return s[0] == t[0] && s[2] == t[2] && s[1] == t[1] && s[3] == t[3]
}
function ll(s, t) {
  return (
    t[0] < s[0] && (s[0] = t[0]),
    t[2] > s[2] && (s[2] = t[2]),
    t[1] < s[1] && (s[1] = t[1]),
    t[3] > s[3] && (s[3] = t[3]),
    s
  )
}
function mn(s, t) {
  t[0] < s[0] && (s[0] = t[0]),
    t[0] > s[2] && (s[2] = t[0]),
    t[1] < s[1] && (s[1] = t[1]),
    t[1] > s[3] && (s[3] = t[1])
}
function hl(s, t, e, i, n) {
  for (; e < i; e += n) oc(s, t[e], t[e + 1])
  return s
}
function oc(s, t, e) {
  ;(s[0] = Math.min(s[0], t)),
    (s[1] = Math.min(s[1], e)),
    (s[2] = Math.max(s[2], t)),
    (s[3] = Math.max(s[3], e))
}
function cl(s, t) {
  let e
  return (
    (e = t(Os(s))),
    e || ((e = t(bs(s))), e) || ((e = t(Ds(s))), e) || ((e = t(Ci(s))), e)
      ? e
      : !1
  )
}
function Or(s) {
  let t = 0
  return Ns(s) || (t = rt(s) * vt(s)), t
}
function Os(s) {
  return [s[0], s[1]]
}
function bs(s) {
  return [s[2], s[1]]
}
function ti(s) {
  return [(s[0] + s[2]) / 2, (s[1] + s[3]) / 2]
}
function ac(s, t) {
  let e
  if (t === "bottom-left") e = Os(s)
  else if (t === "bottom-right") e = bs(s)
  else if (t === "top-left") e = Ci(s)
  else if (t === "top-right") e = Ds(s)
  else throw new Error("Invalid corner")
  return e
}
function br(s, t, e, i, n) {
  const [r, o, a, l, h, c, u, d] = Dr(s, t, e, i)
  return Qe(
    Math.min(r, a, h, u),
    Math.min(o, l, c, d),
    Math.max(r, a, h, u),
    Math.max(o, l, c, d),
    n,
  )
}
function Dr(s, t, e, i) {
  const n = (t * i[0]) / 2,
    r = (t * i[1]) / 2,
    o = Math.cos(e),
    a = Math.sin(e),
    l = n * o,
    h = n * a,
    c = r * o,
    u = r * a,
    d = s[0],
    f = s[1]
  return [
    d - l + u,
    f - h - c,
    d - l - u,
    f - h + c,
    d + l - u,
    f + h + c,
    d + l + u,
    f + h - c,
    d - l + u,
    f - h - c,
  ]
}
function vt(s) {
  return s[3] - s[1]
}
function pn(s, t, e) {
  const i = e || $t()
  return (
    Nt(s, t)
      ? (s[0] > t[0] ? (i[0] = s[0]) : (i[0] = t[0]),
        s[1] > t[1] ? (i[1] = s[1]) : (i[1] = t[1]),
        s[2] < t[2] ? (i[2] = s[2]) : (i[2] = t[2]),
        s[3] < t[3] ? (i[3] = s[3]) : (i[3] = t[3]))
      : zn(i),
    i
  )
}
function Ci(s) {
  return [s[0], s[3]]
}
function Ds(s) {
  return [s[2], s[3]]
}
function rt(s) {
  return s[2] - s[0]
}
function Nt(s, t) {
  return s[0] <= t[2] && s[2] >= t[0] && s[1] <= t[3] && s[3] >= t[1]
}
function Ns(s) {
  return s[2] < s[0] || s[3] < s[1]
}
function lc(s, t) {
  return t ? ((t[0] = s[0]), (t[1] = s[1]), (t[2] = s[2]), (t[3] = s[3]), t) : s
}
function hc(s, t, e) {
  let i = !1
  const n = Fr(s, t),
    r = Fr(s, e)
  if (n === yt.INTERSECTING || r === yt.INTERSECTING) i = !0
  else {
    const o = s[0],
      a = s[1],
      l = s[2],
      h = s[3],
      c = t[0],
      u = t[1],
      d = e[0],
      f = e[1],
      g = (f - u) / (d - c)
    let _, m
    r & yt.ABOVE &&
      !(n & yt.ABOVE) &&
      ((_ = d - (f - h) / g), (i = _ >= o && _ <= l)),
      !i &&
        r & yt.RIGHT &&
        !(n & yt.RIGHT) &&
        ((m = f - (d - l) * g), (i = m >= a && m <= h)),
      !i &&
        r & yt.BELOW &&
        !(n & yt.BELOW) &&
        ((_ = d - (f - a) / g), (i = _ >= o && _ <= l)),
      !i &&
        r & yt.LEFT &&
        !(n & yt.LEFT) &&
        ((m = f - (d - o) * g), (i = m >= a && m <= h))
  }
  return i
}
function ul(s, t) {
  const e = t.getExtent(),
    i = ti(s)
  if (t.canWrapX() && (i[0] < e[0] || i[0] >= e[2])) {
    const n = rt(e),
      o = Math.floor((i[0] - e[0]) / n) * n
    ;(s[0] -= o), (s[2] -= o)
  }
  return s
}
function cc(s, t) {
  if (t.canWrapX()) {
    const e = t.getExtent()
    if (!isFinite(s[0]) || !isFinite(s[2])) return [[e[0], s[1], e[2], s[3]]]
    ul(s, t)
    const i = rt(e)
    if (rt(s) > i) return [[e[0], s[1], e[2], s[3]]]
    if (s[0] < e[0])
      return [
        [s[0] + i, s[1], e[2], s[3]],
        [e[0], s[1], s[2], s[3]],
      ]
    if (s[2] > e[2])
      return [
        [s[0], s[1], e[2], s[3]],
        [e[0], s[1], s[2] - i, s[3]],
      ]
  }
  return [s]
}
const Tn = {
  "radians": 6370997 / (2 * Math.PI),
  "degrees": (2 * Math.PI * 6370997) / 360,
  "ft": 0.3048,
  "m": 1,
  "us-ft": 1200 / 3937,
}
class dl {
  constructor(t) {
    ;(this.code_ = t.code),
      (this.units_ = t.units),
      (this.extent_ = t.extent !== void 0 ? t.extent : null),
      (this.worldExtent_ = t.worldExtent !== void 0 ? t.worldExtent : null),
      (this.axisOrientation_ =
        t.axisOrientation !== void 0 ? t.axisOrientation : "enu"),
      (this.global_ = t.global !== void 0 ? t.global : !1),
      (this.canWrapX_ = !!(this.global_ && this.extent_)),
      (this.getPointResolutionFunc_ = t.getPointResolution),
      (this.defaultTileGrid_ = null),
      (this.metersPerUnit_ = t.metersPerUnit)
  }
  canWrapX() {
    return this.canWrapX_
  }
  getCode() {
    return this.code_
  }
  getExtent() {
    return this.extent_
  }
  getUnits() {
    return this.units_
  }
  getMetersPerUnit() {
    return this.metersPerUnit_ || Tn[this.units_]
  }
  getWorldExtent() {
    return this.worldExtent_
  }
  getAxisOrientation() {
    return this.axisOrientation_
  }
  isGlobal() {
    return this.global_
  }
  setGlobal(t) {
    ;(this.global_ = t), (this.canWrapX_ = !!(t && this.extent_))
  }
  getDefaultTileGrid() {
    return this.defaultTileGrid_
  }
  setDefaultTileGrid(t) {
    this.defaultTileGrid_ = t
  }
  setExtent(t) {
    ;(this.extent_ = t), (this.canWrapX_ = !!(this.global_ && t))
  }
  setWorldExtent(t) {
    this.worldExtent_ = t
  }
  setGetPointResolution(t) {
    this.getPointResolutionFunc_ = t
  }
  getPointResolutionFunc() {
    return this.getPointResolutionFunc_
  }
}
const Yn = 6378137,
  Ni = Math.PI * Yn,
  uc = [-Ni, -Ni, Ni, Ni],
  dc = [-180, -85, 180, 85],
  Qn = Yn * Math.log(Math.tan(Math.PI / 2))
class Ii extends dl {
  constructor(t) {
    super({
      code: t,
      units: "m",
      extent: uc,
      global: !0,
      worldExtent: dc,
      getPointResolution: function (e, i) {
        return e / Math.cosh(i[1] / Yn)
      },
    })
  }
}
const ea = [
  new Ii("EPSG:3857"),
  new Ii("EPSG:102100"),
  new Ii("EPSG:102113"),
  new Ii("EPSG:900913"),
  new Ii("http://www.opengis.net/def/crs/EPSG/0/3857"),
  new Ii("http://www.opengis.net/gml/srs/epsg.xml#3857"),
]
function fc(s, t, e) {
  const i = s.length
  ;(e = e > 1 ? e : 2),
    t === void 0 && (e > 2 ? (t = s.slice()) : (t = new Array(i)))
  for (let n = 0; n < i; n += e) {
    t[n] = (Ni * s[n]) / 180
    let r = Yn * Math.log(Math.tan((Math.PI * (+s[n + 1] + 90)) / 360))
    r > Qn ? (r = Qn) : r < -Qn && (r = -Qn), (t[n + 1] = r)
  }
  return t
}
function gc(s, t, e) {
  const i = s.length
  ;(e = e > 1 ? e : 2),
    t === void 0 && (e > 2 ? (t = s.slice()) : (t = new Array(i)))
  for (let n = 0; n < i; n += e)
    (t[n] = (180 * s[n]) / Ni),
      (t[n + 1] = (360 * Math.atan(Math.exp(s[n + 1] / Yn))) / Math.PI - 90)
  return t
}
const _c = 6378137,
  ia = [-180, -90, 180, 90],
  mc = (Math.PI * _c) / 180
class ai extends dl {
  constructor(t, e) {
    super({
      code: t,
      units: "degrees",
      extent: ia,
      axisOrientation: e,
      global: !0,
      metersPerUnit: mc,
      worldExtent: ia,
    })
  }
}
const na = [
  new ai("CRS:84"),
  new ai("EPSG:4326", "neu"),
  new ai("urn:ogc:def:crs:OGC:1.3:CRS84"),
  new ai("urn:ogc:def:crs:OGC:2:84"),
  new ai("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),
  new ai("http://www.opengis.net/gml/srs/epsg.xml#4326", "neu"),
  new ai("http://www.opengis.net/def/crs/EPSG/0/4326", "neu"),
]
let Nr = {}
function pc(s) {
  return (
    Nr[s] ||
    Nr[s.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/, "EPSG:$3")] ||
    null
  )
}
function yc(s, t) {
  Nr[s] = t
}
let ki = {}
function fs(s, t, e) {
  const i = s.getCode(),
    n = t.getCode()
  i in ki || (ki[i] = {}), (ki[i][n] = e)
}
function Ec(s, t) {
  let e
  return s in ki && t in ki[s] && (e = ki[s][t]), e
}
function mt(s, t, e) {
  return Math.min(Math.max(s, t), e)
}
function xc(s, t, e, i, n, r) {
  const o = n - e,
    a = r - i
  if (o !== 0 || a !== 0) {
    const l = ((s - e) * o + (t - i) * a) / (o * o + a * a)
    l > 1 ? ((e = n), (i = r)) : l > 0 && ((e += o * l), (i += a * l))
  }
  return pi(s, t, e, i)
}
function pi(s, t, e, i) {
  const n = e - s,
    r = i - t
  return n * n + r * r
}
function Cc(s) {
  const t = s.length
  for (let i = 0; i < t; i++) {
    let n = i,
      r = Math.abs(s[i][i])
    for (let a = i + 1; a < t; a++) {
      const l = Math.abs(s[a][i])
      l > r && ((r = l), (n = a))
    }
    if (r === 0) return null
    const o = s[n]
    ;(s[n] = s[i]), (s[i] = o)
    for (let a = i + 1; a < t; a++) {
      const l = -s[a][i] / s[i][i]
      for (let h = i; h < t + 1; h++)
        i == h ? (s[a][h] = 0) : (s[a][h] += l * s[i][h])
    }
  }
  const e = new Array(t)
  for (let i = t - 1; i >= 0; i--) {
    e[i] = s[i][t] / s[i][i]
    for (let n = i - 1; n >= 0; n--) s[n][t] -= s[n][i] * e[i]
  }
  return e
}
function yn(s) {
  return (s * Math.PI) / 180
}
function yi(s, t) {
  const e = s % t
  return e * t < 0 ? e + t : e
}
function Yt(s, t, e) {
  return s + e * (t - s)
}
function ks(s, t) {
  const e = Math.pow(10, t)
  return Math.round(s * e) / e
}
function ts(s, t) {
  return Math.floor(ks(s, t))
}
function es(s, t) {
  return Math.ceil(ks(s, t))
}
function wc(s, t) {
  return (s[0] += +t[0]), (s[1] += +t[1]), s
}
function gs(s, t) {
  let e = !0
  for (let i = s.length - 1; i >= 0; --i)
    if (s[i] != t[i]) {
      e = !1
      break
    }
  return e
}
function lo(s, t) {
  const e = Math.cos(t),
    i = Math.sin(t),
    n = s[0] * e - s[1] * i,
    r = s[1] * e + s[0] * i
  return (s[0] = n), (s[1] = r), s
}
function Rc(s, t) {
  return (s[0] *= t), (s[1] *= t), s
}
function fl(s, t) {
  if (t.canWrapX()) {
    const e = rt(t.getExtent()),
      i = Sc(s, t, e)
    i && (s[0] -= i * e)
  }
  return s
}
function Sc(s, t, e) {
  const i = t.getExtent()
  let n = 0
  return (
    t.canWrapX() &&
      (s[0] < i[0] || s[0] > i[2]) &&
      ((e = e || rt(i)), (n = Math.floor((s[0] - i[0]) / e))),
    n
  )
}
const Tc = 63710088e-1
function sa(s, t, e) {
  e = e || Tc
  const i = yn(s[1]),
    n = yn(t[1]),
    r = (n - i) / 2,
    o = yn(t[0] - s[0]) / 2,
    a =
      Math.sin(r) * Math.sin(r) +
      Math.sin(o) * Math.sin(o) * Math.cos(i) * Math.cos(n)
  return 2 * e * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
function gl(...s) {
  console.warn(...s)
}
let kr = !0
function Ic(s) {
  kr = !(s === void 0 ? !0 : s)
}
function ho(s, t) {
  if (t !== void 0) {
    for (let e = 0, i = s.length; e < i; ++e) t[e] = s[e]
    t = t
  } else t = s.slice()
  return t
}
function _l(s, t) {
  if (t !== void 0 && s !== t) {
    for (let e = 0, i = s.length; e < i; ++e) t[e] = s[e]
    s = t
  }
  return s
}
function vc(s) {
  yc(s.getCode(), s), fs(s, s, ho)
}
function Lc(s) {
  s.forEach(vc)
}
function wt(s) {
  return typeof s == "string" ? pc(s) : s || null
}
function ra(s, t, e, i) {
  s = wt(s)
  let n
  const r = s.getPointResolutionFunc()
  if (r) {
    if (((n = r(t, e)), i && i !== s.getUnits())) {
      const o = s.getMetersPerUnit()
      o && (n = (n * o) / Tn[i])
    }
  } else {
    const o = s.getUnits()
    if ((o == "degrees" && !i) || i == "degrees") n = t
    else {
      const a = Gs(s, wt("EPSG:4326"))
      if (a === _l && o !== "degrees") n = t * s.getMetersPerUnit()
      else {
        let h = [
          e[0] - t / 2,
          e[1],
          e[0] + t / 2,
          e[1],
          e[0],
          e[1] - t / 2,
          e[0],
          e[1] + t / 2,
        ]
        h = a(h, h, 2)
        const c = sa(h.slice(0, 2), h.slice(2, 4)),
          u = sa(h.slice(4, 6), h.slice(6, 8))
        n = (c + u) / 2
      }
      const l = i ? Tn[i] : s.getMetersPerUnit()
      l !== void 0 && (n /= l)
    }
  }
  return n
}
function oa(s) {
  Lc(s),
    s.forEach(function (t) {
      s.forEach(function (e) {
        t !== e && fs(t, e, ho)
      })
    })
}
function Ac(s, t, e, i) {
  s.forEach(function (n) {
    t.forEach(function (r) {
      fs(n, r, e), fs(r, n, i)
    })
  })
}
function co(s, t) {
  return s ? (typeof s == "string" ? wt(s) : s) : wt(t)
}
function Mc(s, t) {
  const e = ml(s, t !== void 0 ? t : "EPSG:3857", "EPSG:4326"),
    i = e[0]
  return (i < -180 || i > 180) && (e[0] = yi(i + 180, 360) - 180), e
}
function ci(s, t) {
  if (s === t) return !0
  const e = s.getUnits() === t.getUnits()
  return (s.getCode() === t.getCode() || Gs(s, t) === ho) && e
}
function Gs(s, t) {
  const e = s.getCode(),
    i = t.getCode()
  let n = Ec(e, i)
  return n || (n = _l), n
}
function In(s, t) {
  const e = wt(s),
    i = wt(t)
  return Gs(e, i)
}
function ml(s, t, e) {
  return In(t, e)(s, void 0, s.length)
}
let Pc = null
function Fc() {
  return Pc
}
function Gr(s, t) {
  return s
}
function Re(s, t) {
  return (
    kr &&
      !gs(s, [0, 0]) &&
      s[0] >= -180 &&
      s[0] <= 180 &&
      s[1] >= -90 &&
      s[1] <= 90 &&
      ((kr = !1),
      gl(
        "Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.",
      )),
    s
  )
}
function uo(s, t) {
  return s
}
function ui(s, t) {
  return s
}
function Oc() {
  oa(ea), oa(na), Ac(na, ea, fc, gc)
}
Oc()
function Je(s, t, e, i, n, r) {
  r = r || []
  let o = 0
  for (let a = t; a < e; a += i) {
    const l = s[a],
      h = s[a + 1]
    ;(r[o++] = n[0] * l + n[2] * h + n[4]),
      (r[o++] = n[1] * l + n[3] * h + n[5])
  }
  return r && r.length != o && (r.length = o), r
}
function pl(s, t, e, i, n, r, o) {
  o = o || []
  const a = Math.cos(n),
    l = Math.sin(n),
    h = r[0],
    c = r[1]
  let u = 0
  for (let d = t; d < e; d += i) {
    const f = s[d] - h,
      g = s[d + 1] - c
    ;(o[u++] = h + f * a - g * l), (o[u++] = c + f * l + g * a)
    for (let _ = d + 2; _ < d + i; ++_) o[u++] = s[_]
  }
  return o && o.length != u && (o.length = u), o
}
function bc(s, t, e, i, n, r, o, a) {
  a = a || []
  const l = o[0],
    h = o[1]
  let c = 0
  for (let u = t; u < e; u += i) {
    const d = s[u] - l,
      f = s[u + 1] - h
    ;(a[c++] = l + n * d), (a[c++] = h + r * f)
    for (let g = u + 2; g < u + i; ++g) a[c++] = s[g]
  }
  return a && a.length != c && (a.length = c), a
}
function Dc(s, t, e, i, n, r, o) {
  o = o || []
  let a = 0
  for (let l = t; l < e; l += i) {
    ;(o[a++] = s[l] + n), (o[a++] = s[l + 1] + r)
    for (let h = l + 2; h < l + i; ++h) o[a++] = s[h]
  }
  return o && o.length != a && (o.length = a), o
}
const aa = ne()
class yl extends me {
  constructor() {
    super(),
      (this.extent_ = $t()),
      (this.extentRevision_ = -1),
      (this.simplifiedGeometryMaxMinSquaredTolerance = 0),
      (this.simplifiedGeometryRevision = 0),
      (this.simplifyTransformedInternal = sl((t, e, i) => {
        if (!i) return this.getSimplifiedGeometry(e)
        const n = this.clone()
        return n.applyTransform(i), n.getSimplifiedGeometry(e)
      }))
  }
  simplifyTransformed(t, e) {
    return this.simplifyTransformedInternal(this.getRevision(), t, e)
  }
  clone() {
    return W()
  }
  closestPointXY(t, e, i, n) {
    return W()
  }
  containsXY(t, e) {
    const i = this.getClosestPoint([t, e])
    return i[0] === t && i[1] === e
  }
  getClosestPoint(t, e) {
    return (e = e || [NaN, NaN]), this.closestPointXY(t[0], t[1], e, 1 / 0), e
  }
  intersectsCoordinate(t) {
    return this.containsXY(t[0], t[1])
  }
  computeExtent(t) {
    return W()
  }
  getExtent(t) {
    if (this.extentRevision_ != this.getRevision()) {
      const e = this.computeExtent(this.extent_)
      ;(isNaN(e[0]) || isNaN(e[1])) && zn(e),
        (this.extentRevision_ = this.getRevision())
    }
    return lc(this.extent_, t)
  }
  rotate(t, e) {
    W()
  }
  scale(t, e, i) {
    W()
  }
  simplify(t) {
    return this.getSimplifiedGeometry(t * t)
  }
  getSimplifiedGeometry(t) {
    return W()
  }
  getType() {
    return W()
  }
  applyTransform(t) {
    W()
  }
  intersectsExtent(t) {
    return W()
  }
  translate(t, e) {
    W()
  }
  transform(t, e) {
    const i = wt(t),
      n =
        i.getUnits() == "tile-pixels"
          ? function (r, o, a) {
              const l = i.getExtent(),
                h = i.getWorldExtent(),
                c = vt(h) / vt(l)
              return (
                _e(aa, h[0], h[3], c, -c, 0, 0, 0),
                Je(r, 0, r.length, a, aa, o),
                In(i, e)(r, o, a)
              )
            }
          : In(i, e)
    return this.applyTransform(n), this
  }
}
class wi extends yl {
  constructor() {
    super(), (this.layout = "XY"), (this.stride = 2), this.flatCoordinates
  }
  computeExtent(t) {
    return ao(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
    )
  }
  getCoordinates() {
    return W()
  }
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride)
  }
  getFlatCoordinates() {
    return this.flatCoordinates
  }
  getLastCoordinate() {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride)
  }
  getLayout() {
    return this.layout
  }
  getSimplifiedGeometry(t) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0),
        (this.simplifiedGeometryRevision = this.getRevision())),
      t < 0 ||
        (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
          t <= this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this
    const e = this.getSimplifiedGeometryInternal(t)
    return e.getFlatCoordinates().length < this.flatCoordinates.length
      ? e
      : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this)
  }
  getSimplifiedGeometryInternal(t) {
    return this
  }
  getStride() {
    return this.stride
  }
  setFlatCoordinates(t, e) {
    ;(this.stride = la(t)), (this.layout = t), (this.flatCoordinates = e)
  }
  setCoordinates(t, e) {
    W()
  }
  setLayout(t, e, i) {
    let n
    if (t) n = la(t)
    else {
      for (let r = 0; r < i; ++r) {
        if (e.length === 0) {
          ;(this.layout = "XY"), (this.stride = 2)
          return
        }
        e = e[0]
      }
      ;(n = e.length), (t = Nc(n))
    }
    ;(this.layout = t), (this.stride = n)
  }
  applyTransform(t) {
    this.flatCoordinates &&
      (t(this.flatCoordinates, this.flatCoordinates, this.stride),
      this.changed())
  }
  rotate(t, e) {
    const i = this.getFlatCoordinates()
    if (i) {
      const n = this.getStride()
      pl(i, 0, i.length, n, t, e, i), this.changed()
    }
  }
  scale(t, e, i) {
    e === void 0 && (e = t), i || (i = ti(this.getExtent()))
    const n = this.getFlatCoordinates()
    if (n) {
      const r = this.getStride()
      bc(n, 0, n.length, r, t, e, i, n), this.changed()
    }
  }
  translate(t, e) {
    const i = this.getFlatCoordinates()
    if (i) {
      const n = this.getStride()
      Dc(i, 0, i.length, n, t, e, i), this.changed()
    }
  }
}
function Nc(s) {
  let t
  return s == 2 ? (t = "XY") : s == 3 ? (t = "XYZ") : s == 4 && (t = "XYZM"), t
}
function la(s) {
  let t
  return (
    s == "XY"
      ? (t = 2)
      : s == "XYZ" || s == "XYM"
        ? (t = 3)
        : s == "XYZM" && (t = 4),
    t
  )
}
function kc(s, t, e) {
  const i = s.getFlatCoordinates()
  if (!i) return null
  const n = s.getStride()
  return Je(i, 0, i.length, n, t, e)
}
function ha(s, t, e, i, n, r, o) {
  const a = s[t],
    l = s[t + 1],
    h = s[e] - a,
    c = s[e + 1] - l
  let u
  if (h === 0 && c === 0) u = t
  else {
    const d = ((n - a) * h + (r - l) * c) / (h * h + c * c)
    if (d > 1) u = e
    else if (d > 0) {
      for (let f = 0; f < i; ++f) o[f] = Yt(s[t + f], s[e + f], d)
      o.length = i
      return
    } else u = t
  }
  for (let d = 0; d < i; ++d) o[d] = s[u + d]
  o.length = i
}
function fo(s, t, e, i, n) {
  let r = s[t],
    o = s[t + 1]
  for (t += i; t < e; t += i) {
    const a = s[t],
      l = s[t + 1],
      h = pi(r, o, a, l)
    h > n && (n = h), (r = a), (o = l)
  }
  return n
}
function go(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    ;(n = fo(s, t, a, i, n)), (t = a)
  }
  return n
}
function Gc(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    ;(n = go(s, t, a, i, n)), (t = a[a.length - 1])
  }
  return n
}
function _o(s, t, e, i, n, r, o, a, l, h, c) {
  if (t == e) return h
  let u, d
  if (n === 0) {
    if (((d = pi(o, a, s[t], s[t + 1])), d < h)) {
      for (u = 0; u < i; ++u) l[u] = s[t + u]
      return (l.length = i), d
    }
    return h
  }
  c = c || [NaN, NaN]
  let f = t + i
  for (; f < e; )
    if ((ha(s, f - i, f, i, o, a, c), (d = pi(o, a, c[0], c[1])), d < h)) {
      for (h = d, u = 0; u < i; ++u) l[u] = c[u]
      ;(l.length = i), (f += i)
    } else f += i * Math.max(((Math.sqrt(d) - Math.sqrt(h)) / n) | 0, 1)
  if (r && (ha(s, e - i, t, i, o, a, c), (d = pi(o, a, c[0], c[1])), d < h)) {
    for (h = d, u = 0; u < i; ++u) l[u] = c[u]
    l.length = i
  }
  return h
}
function mo(s, t, e, i, n, r, o, a, l, h, c) {
  c = c || [NaN, NaN]
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u]
    ;(h = _o(s, t, f, i, n, r, o, a, l, h, c)), (t = f)
  }
  return h
}
function zc(s, t, e, i, n, r, o, a, l, h, c) {
  c = c || [NaN, NaN]
  for (let u = 0, d = e.length; u < d; ++u) {
    const f = e[u]
    ;(h = mo(s, t, f, i, n, r, o, a, l, h, c)), (t = f[f.length - 1])
  }
  return h
}
function Yc(s, t, e, i) {
  for (let n = 0, r = e.length; n < r; ++n) s[t++] = e[n]
  return t
}
function zs(s, t, e, i) {
  for (let n = 0, r = e.length; n < r; ++n) {
    const o = e[n]
    for (let a = 0; a < i; ++a) s[t++] = o[a]
  }
  return t
}
function po(s, t, e, i, n) {
  n = n || []
  let r = 0
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = zs(s, t, e[o], i)
    ;(n[r++] = l), (t = l)
  }
  return (n.length = r), n
}
function Xc(s, t, e, i, n) {
  n = n || []
  let r = 0
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = po(s, t, e[o], i, n[r])
    l.length === 0 && (l[0] = t), (n[r++] = l), (t = l[l.length - 1])
  }
  return (n.length = r), n
}
function Ys(s, t, e, i, n, r, o) {
  const a = (e - t) / i
  if (a < 3) {
    for (; t < e; t += i) (r[o++] = s[t]), (r[o++] = s[t + 1])
    return o
  }
  const l = new Array(a)
  ;(l[0] = 1), (l[a - 1] = 1)
  const h = [t, e - i]
  let c = 0
  for (; h.length > 0; ) {
    const u = h.pop(),
      d = h.pop()
    let f = 0
    const g = s[d],
      _ = s[d + 1],
      m = s[u],
      p = s[u + 1]
    for (let y = d + i; y < u; y += i) {
      const x = s[y],
        E = s[y + 1],
        C = xc(x, E, g, _, m, p)
      C > f && ((c = y), (f = C))
    }
    f > n &&
      ((l[(c - t) / i] = 1),
      d + i < c && h.push(d, c),
      c + i < u && h.push(c, u))
  }
  for (let u = 0; u < a; ++u)
    l[u] && ((r[o++] = s[t + u * i]), (r[o++] = s[t + u * i + 1]))
  return o
}
function El(s, t, e, i, n, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l]
    ;(o = Ys(s, t, c, i, n, r, o)), a.push(o), (t = c)
  }
  return o
}
function hi(s, t) {
  return t * Math.round(s / t)
}
function Uc(s, t, e, i, n, r, o) {
  if (t == e) return o
  let a = hi(s[t], n),
    l = hi(s[t + 1], n)
  ;(t += i), (r[o++] = a), (r[o++] = l)
  let h, c
  do
    if (((h = hi(s[t], n)), (c = hi(s[t + 1], n)), (t += i), t == e))
      return (r[o++] = h), (r[o++] = c), o
  while (h == a && c == l)
  for (; t < e; ) {
    const u = hi(s[t], n),
      d = hi(s[t + 1], n)
    if (((t += i), u == h && d == c)) continue
    const f = h - a,
      g = c - l,
      _ = u - a,
      m = d - l
    if (
      f * m == g * _ &&
      ((f < 0 && _ < f) || f == _ || (f > 0 && _ > f)) &&
      ((g < 0 && m < g) || g == m || (g > 0 && m > g))
    ) {
      ;(h = u), (c = d)
      continue
    }
    ;(r[o++] = h), (r[o++] = c), (a = h), (l = c), (h = u), (c = d)
  }
  return (r[o++] = h), (r[o++] = c), o
}
function yo(s, t, e, i, n, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l]
    ;(o = Uc(s, t, c, i, n, r, o)), a.push(o), (t = c)
  }
  return o
}
function Wc(s, t, e, i, n, r, o, a) {
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l],
      u = []
    ;(o = yo(s, t, c, i, n, r, o, u)), a.push(u), (t = c[c.length - 1])
  }
  return o
}
function Ve(s, t, e, i, n) {
  n = n !== void 0 ? n : []
  let r = 0
  for (let o = t; o < e; o += i) n[r++] = s.slice(o, o + i)
  return (n.length = r), n
}
function vn(s, t, e, i, n) {
  n = n !== void 0 ? n : []
  let r = 0
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o]
    ;(n[r++] = Ve(s, t, l, i, n[r])), (t = l)
  }
  return (n.length = r), n
}
function zr(s, t, e, i, n) {
  n = n !== void 0 ? n : []
  let r = 0
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o]
    ;(n[r++] = l.length === 1 && l[0] === t ? [] : vn(s, t, l, i, n[r])),
      (t = l[l.length - 1])
  }
  return (n.length = r), n
}
function xl(s, t, e, i) {
  let n = 0,
    r = s[e - i],
    o = s[e - i + 1]
  for (; t < e; t += i) {
    const a = s[t],
      l = s[t + 1]
    ;(n += o * a - r * l), (r = a), (o = l)
  }
  return n / 2
}
function Cl(s, t, e, i) {
  let n = 0
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    ;(n += xl(s, t, a, i)), (t = a)
  }
  return n
}
function Zc(s, t, e, i) {
  let n = 0
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    ;(n += Cl(s, t, a, i)), (t = a[a.length - 1])
  }
  return n
}
class Ln extends wi {
  constructor(t, e) {
    super(),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      e !== void 0 && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e)
  }
  clone() {
    return new Ln(this.flatCoordinates.slice(), this.layout)
  }
  closestPointXY(t, e, i, n) {
    return n < xi(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            fo(
              this.flatCoordinates,
              0,
              this.flatCoordinates.length,
              this.stride,
              0,
            ),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        _o(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ))
  }
  getArea() {
    return xl(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
  }
  getCoordinates() {
    return Ve(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
  }
  getSimplifiedGeometryInternal(t) {
    const e = []
    return (
      (e.length = Ys(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
        0,
      )),
      new Ln(e, "XY")
    )
  }
  getType() {
    return "LinearRing"
  }
  intersectsExtent(t) {
    return !1
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = zs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed()
  }
}
class Bi extends wi {
  constructor(t, e) {
    super(), this.setCoordinates(t, e)
  }
  clone() {
    const t = new Bi(this.flatCoordinates.slice(), this.layout)
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    const r = this.flatCoordinates,
      o = pi(t, e, r[0], r[1])
    if (o < n) {
      const a = this.stride
      for (let l = 0; l < a; ++l) i[l] = r[l]
      return (i.length = a), o
    }
    return n
  }
  getCoordinates() {
    return this.flatCoordinates.slice()
  }
  computeExtent(t) {
    return al(this.flatCoordinates, t)
  }
  getType() {
    return "Point"
  }
  intersectsExtent(t) {
    return oo(t, this.flatCoordinates[0], this.flatCoordinates[1])
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 0),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = Yc(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed()
  }
}
function Bc(s, t, e, i, n) {
  return !cl(n, function (o) {
    return !di(s, t, e, i, o[0], o[1])
  })
}
function di(s, t, e, i, n, r) {
  let o = 0,
    a = s[e - i],
    l = s[e - i + 1]
  for (; t < e; t += i) {
    const h = s[t],
      c = s[t + 1]
    l <= r
      ? c > r && (h - a) * (r - l) - (n - a) * (c - l) > 0 && o++
      : c <= r && (h - a) * (r - l) - (n - a) * (c - l) < 0 && o--,
      (a = h),
      (l = c)
  }
  return o !== 0
}
function Eo(s, t, e, i, n, r) {
  if (e.length === 0 || !di(s, t, e[0], i, n, r)) return !1
  for (let o = 1, a = e.length; o < a; ++o)
    if (di(s, e[o - 1], e[o], i, n, r)) return !1
  return !0
}
function Kc(s, t, e, i, n, r) {
  if (e.length === 0) return !1
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o]
    if (Eo(s, t, l, i, n, r)) return !0
    t = l[l.length - 1]
  }
  return !1
}
function xo(s, t, e, i, n, r, o) {
  let a, l, h, c, u, d, f
  const g = n[r + 1],
    _ = []
  for (let y = 0, x = e.length; y < x; ++y) {
    const E = e[y]
    for (c = s[E - i], d = s[E - i + 1], a = t; a < E; a += i)
      (u = s[a]),
        (f = s[a + 1]),
        ((g <= d && f <= g) || (d <= g && g <= f)) &&
          ((h = ((g - d) / (f - d)) * (u - c) + c), _.push(h)),
        (c = u),
        (d = f)
  }
  let m = NaN,
    p = -1 / 0
  for (_.sort(ve), c = _[0], a = 1, l = _.length; a < l; ++a) {
    u = _[a]
    const y = Math.abs(u - c)
    y > p && ((h = (c + u) / 2), Eo(s, t, e, i, h, g) && ((m = h), (p = y))),
      (c = u)
  }
  return isNaN(m) && (m = n[r]), o ? (o.push(m, g, p), o) : [m, g, p]
}
function wl(s, t, e, i, n) {
  let r = []
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o]
    ;(r = xo(s, t, l, i, n, 2 * o, r)), (t = l[l.length - 1])
  }
  return r
}
function Rl(s, t, e, i, n) {
  let r
  for (t += i; t < e; t += i)
    if (((r = n(s.slice(t - i, t), s.slice(t, t + i))), r)) return r
  return !1
}
function Xs(s, t, e, i, n) {
  const r = hl($t(), s, t, e, i)
  return Nt(n, r)
    ? Di(n, r) ||
      (r[0] >= n[0] && r[2] <= n[2]) ||
      (r[1] >= n[1] && r[3] <= n[3])
      ? !0
      : Rl(s, t, e, i, function (o, a) {
          return hc(n, o, a)
        })
    : !1
}
function Vc(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    if (Xs(s, t, e[r], i, n)) return !0
    t = e[r]
  }
  return !1
}
function Sl(s, t, e, i, n) {
  return !!(
    Xs(s, t, e, i, n) ||
    di(s, t, e, i, n[0], n[1]) ||
    di(s, t, e, i, n[0], n[3]) ||
    di(s, t, e, i, n[2], n[1]) ||
    di(s, t, e, i, n[2], n[3])
  )
}
function Tl(s, t, e, i, n) {
  if (!Sl(s, t, e[0], i, n)) return !1
  if (e.length === 1) return !0
  for (let r = 1, o = e.length; r < o; ++r)
    if (Bc(s, e[r - 1], e[r], i, n) && !Xs(s, e[r - 1], e[r], i, n)) return !1
  return !0
}
function jc(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    if (Tl(s, t, a, i, n)) return !0
    t = a[a.length - 1]
  }
  return !1
}
function Hc(s, t, e, i) {
  for (; t < e - i; ) {
    for (let n = 0; n < i; ++n) {
      const r = s[t + n]
      ;(s[t + n] = s[e - i + n]), (s[e - i + n] = r)
    }
    ;(t += i), (e -= i)
  }
}
function Co(s, t, e, i) {
  let n = 0,
    r = s[e - i],
    o = s[e - i + 1]
  for (; t < e; t += i) {
    const a = s[t],
      l = s[t + 1]
    ;(n += (a - r) * (l + o)), (r = a), (o = l)
  }
  return n === 0 ? void 0 : n > 0
}
function Il(s, t, e, i, n) {
  n = n !== void 0 ? n : !1
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r],
      l = Co(s, t, a, i)
    if (r === 0) {
      if ((n && l) || (!n && !l)) return !1
    } else if ((n && !l) || (!n && l)) return !1
    t = a
  }
  return !0
}
function qc(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r]
    if (!Il(s, t, a, i, n)) return !1
    a.length && (t = a[a.length - 1])
  }
  return !0
}
function Yr(s, t, e, i, n) {
  n = n !== void 0 ? n : !1
  for (let r = 0, o = e.length; r < o; ++r) {
    const a = e[r],
      l = Co(s, t, a, i)
    ;(r === 0 ? (n && l) || (!n && !l) : (n && !l) || (!n && l)) &&
      Hc(s, t, a, i),
      (t = a)
  }
  return t
}
function ca(s, t, e, i, n) {
  for (let r = 0, o = e.length; r < o; ++r) t = Yr(s, t, e[r], i, n)
  return t
}
function $c(s, t) {
  const e = []
  let i = 0,
    n = 0,
    r
  for (let o = 0, a = t.length; o < a; ++o) {
    const l = t[o],
      h = Co(s, i, l, 2)
    if ((r === void 0 && (r = h), h === r)) e.push(t.slice(n, o + 1))
    else {
      if (e.length === 0) continue
      e[e.length - 1].push(t[n])
    }
    ;(n = o + 1), (i = l)
  }
  return e
}
class Me extends wi {
  constructor(t, e, i) {
    super(),
      (this.ends_ = []),
      (this.flatInteriorPointRevision_ = -1),
      (this.flatInteriorPoint_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      e !== void 0 && i
        ? (this.setFlatCoordinates(e, t), (this.ends_ = i))
        : this.setCoordinates(t, e)
  }
  appendLinearRing(t) {
    this.flatCoordinates
      ? tt(this.flatCoordinates, t.getFlatCoordinates())
      : (this.flatCoordinates = t.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed()
  }
  clone() {
    const t = new Me(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice(),
    )
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    return n < xi(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            go(this.flatCoordinates, 0, this.ends_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        mo(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ))
  }
  containsXY(t, e) {
    return Eo(
      this.getOrientedFlatCoordinates(),
      0,
      this.ends_,
      this.stride,
      t,
      e,
    )
  }
  getArea() {
    return Cl(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride)
  }
  getCoordinates(t) {
    let e
    return (
      t !== void 0
        ? ((e = this.getOrientedFlatCoordinates().slice()),
          Yr(e, 0, this.ends_, this.stride, t))
        : (e = this.flatCoordinates),
      vn(e, 0, this.ends_, this.stride)
    )
  }
  getEnds() {
    return this.ends_
  }
  getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      const t = ti(this.getExtent())
      ;(this.flatInteriorPoint_ = xo(
        this.getOrientedFlatCoordinates(),
        0,
        this.ends_,
        this.stride,
        t,
        0,
      )),
        (this.flatInteriorPointRevision_ = this.getRevision())
    }
    return this.flatInteriorPoint_
  }
  getInteriorPoint() {
    return new Bi(this.getFlatInteriorPoint(), "XYM")
  }
  getLinearRingCount() {
    return this.ends_.length
  }
  getLinearRing(t) {
    return t < 0 || this.ends_.length <= t
      ? null
      : new Ln(
          this.flatCoordinates.slice(
            t === 0 ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
          this.layout,
        )
  }
  getLinearRings() {
    const t = this.layout,
      e = this.flatCoordinates,
      i = this.ends_,
      n = []
    let r = 0
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o],
        h = new Ln(e.slice(r, l), t)
      n.push(h), (r = l)
    }
    return n
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates
      Il(t, 0, this.ends_, this.stride)
        ? (this.orientedFlatCoordinates_ = t)
        : ((this.orientedFlatCoordinates_ = t.slice()),
          (this.orientedFlatCoordinates_.length = Yr(
            this.orientedFlatCoordinates_,
            0,
            this.ends_,
            this.stride,
          ))),
        (this.orientedRevision_ = this.getRevision())
    }
    return this.orientedFlatCoordinates_
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = []
    return (
      (e.length = yo(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        i,
      )),
      new Me(e, "XY", i)
    )
  }
  getType() {
    return "Polygon"
  }
  intersectsExtent(t) {
    return Tl(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, t)
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = [])
    const i = po(this.flatCoordinates, 0, t, this.stride, this.ends_)
    ;(this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1]),
      this.changed()
  }
}
function ua(s) {
  if (Ns(s)) throw new Error("Cannot create polygon from empty extent")
  const t = s[0],
    e = s[1],
    i = s[2],
    n = s[3],
    r = [t, e, t, n, i, n, i, e, t, e]
  return new Me(r, "XY", [r.length])
}
const Ht = {
    PRERENDER: "prerender",
    POSTRENDER: "postrender",
    PRECOMPOSE: "precompose",
    POSTCOMPOSE: "postcompose",
    RENDERCOMPLETE: "rendercomplete",
  },
  X = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 },
  An = {
    name: "rgb",
    min: [0, 0, 0],
    max: [255, 255, 255],
    channel: ["red", "green", "blue"],
    alias: ["RGB"],
  }
var Ct = {
  name: "xyz",
  min: [0, 0, 0],
  channel: ["X", "Y", "Z"],
  alias: ["XYZ", "ciexyz", "cie1931"],
}
Ct.whitepoint = {
  2: {
    A: [109.85, 100, 35.585],
    C: [98.074, 100, 118.232],
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    D65: [95.045592705167, 100, 108.9057750759878],
    D75: [94.972, 100, 122.638],
    F2: [99.187, 100, 67.395],
    F7: [95.044, 100, 108.755],
    F11: [100.966, 100, 64.37],
    E: [100, 100, 100],
  },
  10: {
    A: [111.144, 100, 35.2],
    C: [97.285, 100, 116.145],
    D50: [96.72, 100, 81.427],
    D55: [95.799, 100, 90.926],
    D65: [94.811, 100, 107.304],
    D75: [94.416, 100, 120.641],
    F2: [103.28, 100, 69.026],
    F7: [95.792, 100, 107.687],
    F11: [103.866, 100, 65.627],
    E: [100, 100, 100],
  },
}
Ct.max = Ct.whitepoint[2].D65
Ct.rgb = function (s, t) {
  t = t || Ct.whitepoint[2].E
  var e = s[0] / t[0],
    i = s[1] / t[1],
    n = s[2] / t[2],
    r,
    o,
    a
  return (
    (r = e * 3.240969941904521 + i * -1.537383177570093 + n * -0.498610760293),
    (o = e * -0.96924363628087 + i * 1.87596750150772 + n * 0.041555057407175),
    (a = e * 0.055630079696993 + i * -0.20397695888897 + n * 1.056971514242878),
    (r =
      r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : (r = r * 12.92)),
    (o =
      o > 0.0031308 ? 1.055 * Math.pow(o, 1 / 2.4) - 0.055 : (o = o * 12.92)),
    (a =
      a > 0.0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - 0.055 : (a = a * 12.92)),
    (r = Math.min(Math.max(0, r), 1)),
    (o = Math.min(Math.max(0, o), 1)),
    (a = Math.min(Math.max(0, a), 1)),
    [r * 255, o * 255, a * 255]
  )
}
An.xyz = function (s, t) {
  var e = s[0] / 255,
    i = s[1] / 255,
    n = s[2] / 255
  ;(e = e > 0.04045 ? Math.pow((e + 0.055) / 1.055, 2.4) : e / 12.92),
    (i = i > 0.04045 ? Math.pow((i + 0.055) / 1.055, 2.4) : i / 12.92),
    (n = n > 0.04045 ? Math.pow((n + 0.055) / 1.055, 2.4) : n / 12.92)
  var r = e * 0.41239079926595 + i * 0.35758433938387 + n * 0.18048078840183,
    o = e * 0.21263900587151 + i * 0.71516867876775 + n * 0.072192315360733,
    a = e * 0.019330818715591 + i * 0.11919477979462 + n * 0.95053215224966
  return (t = t || Ct.whitepoint[2].E), [r * t[0], o * t[1], a * t[2]]
}
const wo = {
  name: "luv",
  min: [0, -134, -140],
  max: [100, 224, 122],
  channel: ["lightness", "u", "v"],
  alias: ["LUV", "cieluv", "cie1976"],
  xyz: function (s, t, e) {
    var i, n, r, o, a, l, h, c, u, d, f, g, _
    if (((r = s[0]), (o = s[1]), (a = s[2]), r === 0)) return [0, 0, 0]
    var m = 0.0011070564598794539
    return (
      (t = t || "D65"),
      (e = e || 2),
      (u = Ct.whitepoint[e][t][0]),
      (d = Ct.whitepoint[e][t][1]),
      (f = Ct.whitepoint[e][t][2]),
      (g = (4 * u) / (u + 15 * d + 3 * f)),
      (_ = (9 * d) / (u + 15 * d + 3 * f)),
      (i = o / (13 * r) + g || 0),
      (n = a / (13 * r) + _ || 0),
      (h = r > 8 ? d * Math.pow((r + 16) / 116, 3) : d * r * m),
      (l = (h * 9 * i) / (4 * n) || 0),
      (c = (h * (12 - 3 * i - 20 * n)) / (4 * n) || 0),
      [l, h, c]
    )
  },
}
Ct.luv = function (s, t, e) {
  var i,
    n,
    r,
    o,
    a,
    l,
    h,
    c,
    u,
    d,
    f,
    g,
    _,
    m = 0.008856451679035631,
    p = 903.2962962962961
  ;(t = t || "D65"),
    (e = e || 2),
    (u = Ct.whitepoint[e][t][0]),
    (d = Ct.whitepoint[e][t][1]),
    (f = Ct.whitepoint[e][t][2]),
    (g = (4 * u) / (u + 15 * d + 3 * f)),
    (_ = (9 * d) / (u + 15 * d + 3 * f)),
    (l = s[0]),
    (h = s[1]),
    (c = s[2]),
    (i = (4 * l) / (l + 15 * h + 3 * c) || 0),
    (n = (9 * h) / (l + 15 * h + 3 * c) || 0)
  var y = h / d
  return (
    (r = y <= m ? p * y : 116 * Math.pow(y, 1 / 3) - 16),
    (o = 13 * r * (i - g)),
    (a = 13 * r * (n - _)),
    [r, o, a]
  )
}
var vl = {
  name: "lchuv",
  channel: ["lightness", "chroma", "hue"],
  alias: ["LCHuv", "cielchuv"],
  min: [0, 0, 0],
  max: [100, 100, 360],
  luv: function (s) {
    var t = s[0],
      e = s[1],
      i = s[2],
      n,
      r,
      o
    return (
      (o = (i / 360) * 2 * Math.PI),
      (n = e * Math.cos(o)),
      (r = e * Math.sin(o)),
      [t, n, r]
    )
  },
  xyz: function (s) {
    return wo.xyz(vl.luv(s))
  },
}
wo.lchuv = function (s) {
  var t = s[0],
    e = s[1],
    i = s[2],
    n = Math.sqrt(e * e + i * i),
    r = Math.atan2(i, e),
    o = (r * 360) / 2 / Math.PI
  return o < 0 && (o += 360), [t, n, o]
}
Ct.lchuv = function (s) {
  return wo.lchuv(Ct.luv(s))
}
const da = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
}
var fa = { red: 0, orange: 60, yellow: 120, green: 180, blue: 240, purple: 300 }
function Jc(s) {
  var c, u
  var t,
    e = [],
    i = 1,
    n
  if (typeof s == "number")
    return {
      space: "rgb",
      values: [s >>> 16, (s & 65280) >>> 8, s & 255],
      alpha: 1,
    }
  if (typeof s == "number")
    return {
      space: "rgb",
      values: [s >>> 16, (s & 65280) >>> 8, s & 255],
      alpha: 1,
    }
  if (((s = String(s).toLowerCase()), da[s])) (e = da[s].slice()), (n = "rgb")
  else if (s === "transparent") (i = 0), (n = "rgb"), (e = [0, 0, 0])
  else if (s[0] === "#") {
    var r = s.slice(1),
      o = r.length,
      a = o <= 4
    ;(i = 1),
      a
        ? ((e = [
            parseInt(r[0] + r[0], 16),
            parseInt(r[1] + r[1], 16),
            parseInt(r[2] + r[2], 16),
          ]),
          o === 4 && (i = parseInt(r[3] + r[3], 16) / 255))
        : ((e = [
            parseInt(r[0] + r[1], 16),
            parseInt(r[2] + r[3], 16),
            parseInt(r[4] + r[5], 16),
          ]),
          o === 8 && (i = parseInt(r[6] + r[7], 16) / 255)),
      e[0] || (e[0] = 0),
      e[1] || (e[1] = 0),
      e[2] || (e[2] = 0),
      (n = "rgb")
  } else if (
    (t =
      /^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(
        s,
      ))
  ) {
    var l = t[1]
    n = l.replace(/a$/, "")
    var h = n === "cmyk" ? 4 : n === "gray" ? 1 : 3
    ;(e = t[2].trim().split(/\s*[,\/]\s*|\s+/)),
      n === "color" && (n = e.shift()),
      (e = e.map(function (d, f) {
        if (d[d.length - 1] === "%")
          return (
            (d = parseFloat(d) / 100),
            f === 3
              ? d
              : n === "rgb"
                ? d * 255
                : n[0] === "h" || (n[0] === "l" && !f)
                  ? d * 100
                  : n === "lab"
                    ? d * 125
                    : n === "lch"
                      ? f < 2
                        ? d * 150
                        : d * 360
                      : n[0] === "o" && !f
                        ? d
                        : n === "oklab"
                          ? d * 0.4
                          : n === "oklch"
                            ? f < 2
                              ? d * 0.4
                              : d * 360
                            : d
          )
        if (n[f] === "h" || (f === 2 && n[n.length - 1] === "h")) {
          if (fa[d] !== void 0) return fa[d]
          if (d.endsWith("deg")) return parseFloat(d)
          if (d.endsWith("turn")) return parseFloat(d) * 360
          if (d.endsWith("grad")) return (parseFloat(d) * 360) / 400
          if (d.endsWith("rad")) return (parseFloat(d) * 180) / Math.PI
        }
        return d === "none" ? 0 : parseFloat(d)
      })),
      (i = e.length > h ? e.pop() : 1)
  } else
    /[0-9](?:\s|\/|,)/.test(s) &&
      ((e = s.match(/([0-9]+)/g).map(function (d) {
        return parseFloat(d)
      })),
      (n =
        ((u = (c = s.match(/([a-z])/gi)) == null ? void 0 : c.join("")) == null
          ? void 0
          : u.toLowerCase()) || "rgb"))
  return { space: n, values: e, alpha: i }
}
const cr = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function (s) {
    var t = s[0] / 360,
      e = s[1] / 100,
      i = s[2] / 100,
      n,
      r,
      o,
      a,
      l,
      h = 0
    if (e === 0) return (l = i * 255), [l, l, l]
    for (
      r = i < 0.5 ? i * (1 + e) : i + e - i * e, n = 2 * i - r, a = [0, 0, 0];
      h < 3;

    )
      (o = t + (1 / 3) * -(h - 1)),
        o < 0 ? o++ : o > 1 && o--,
        (l =
          6 * o < 1
            ? n + (r - n) * 6 * o
            : 2 * o < 1
              ? r
              : 3 * o < 2
                ? n + (r - n) * (2 / 3 - o) * 6
                : n),
        (a[h++] = l * 255)
    return a
  },
}
An.hsl = function (s) {
  var t = s[0] / 255,
    e = s[1] / 255,
    i = s[2] / 255,
    n = Math.min(t, e, i),
    r = Math.max(t, e, i),
    o = r - n,
    a,
    l,
    h
  return (
    r === n
      ? (a = 0)
      : t === r
        ? (a = (e - i) / o)
        : e === r
          ? (a = 2 + (i - t) / o)
          : i === r && (a = 4 + (t - e) / o),
    (a = Math.min(a * 60, 360)),
    a < 0 && (a += 360),
    (h = (n + r) / 2),
    r === n ? (l = 0) : h <= 0.5 ? (l = o / (r + n)) : (l = o / (2 - r - n)),
    [a, l * 100, h * 100]
  )
}
function Qc(s) {
  Array.isArray(s) && s.raw && (s = String.raw(...arguments)),
    s instanceof Number && (s = +s)
  var t,
    e = Jc(s)
  if (!e.space) return []
  const i = e.space[0] === "h" ? cr.min : An.min,
    n = e.space[0] === "h" ? cr.max : An.max
  return (
    (t = Array(3)),
    (t[0] = Math.min(Math.max(e.values[0], i[0]), n[0])),
    (t[1] = Math.min(Math.max(e.values[1], i[1]), n[1])),
    (t[2] = Math.min(Math.max(e.values[2], i[2]), n[2])),
    e.space[0] === "h" && (t = cr.rgb(t)),
    t.push(Math.min(Math.max(e.alpha, 0), 1)),
    t
  )
}
function tu(s) {
  return typeof s == "string" ? s : So(s)
}
const eu = 1024,
  an = {}
let ur = 0
function iu(s) {
  if (s.length === 4) return s
  const t = s.slice()
  return (t[3] = 1), t
}
function ga(s) {
  const t = Ct.lchuv(An.xyz(s))
  return (t[3] = s[3]), t
}
function nu(s) {
  const t = Ct.rgb(vl.xyz(s))
  return (t[3] = s[3]), t
}
function Ro(s) {
  if (an.hasOwnProperty(s)) return an[s]
  if (ur >= eu) {
    let e = 0
    for (const i in an) e++ & 3 || (delete an[i], --ur)
  }
  const t = Qc(s)
  if (t.length !== 4) throw new Error('Failed to parse "' + s + '" as color')
  for (const e of t)
    if (isNaN(e)) throw new Error('Failed to parse "' + s + '" as color')
  return Ll(t), (an[s] = t), ++ur, t
}
function Ki(s) {
  return Array.isArray(s) ? s : Ro(s)
}
function Ll(s) {
  return (
    (s[0] = mt((s[0] + 0.5) | 0, 0, 255)),
    (s[1] = mt((s[1] + 0.5) | 0, 0, 255)),
    (s[2] = mt((s[2] + 0.5) | 0, 0, 255)),
    (s[3] = mt(s[3], 0, 1)),
    s
  )
}
function So(s) {
  let t = s[0]
  t != (t | 0) && (t = (t + 0.5) | 0)
  let e = s[1]
  e != (e | 0) && (e = (e + 0.5) | 0)
  let i = s[2]
  i != (i | 0) && (i = (i + 0.5) | 0)
  const n = s[3] === void 0 ? 1 : Math.round(s[3] * 1e3) / 1e3
  return "rgba(" + t + "," + e + "," + i + "," + n + ")"
}
function su(s) {
  try {
    return Ro(s), !0
  } catch {
    return !1
  }
}
const ei =
    typeof navigator < "u" && typeof navigator.userAgent < "u"
      ? navigator.userAgent.toLowerCase()
      : "",
  ru = ei.includes("firefox"),
  ou = ei.includes("safari") && !ei.includes("chrom")
ou &&
  (ei.includes("version/15.4") ||
    /cpu (os|iphone os) 15_4 like mac os x/.test(ei))
const au = ei.includes("webkit") && !ei.includes("edge"),
  Al = ei.includes("macintosh"),
  Ml = typeof devicePixelRatio < "u" ? devicePixelRatio : 1,
  Pl =
    typeof WorkerGlobalScope < "u" &&
    typeof OffscreenCanvas < "u" &&
    self instanceof WorkerGlobalScope,
  Fl = typeof Image < "u" && Image.prototype.decode,
  Ol = (function () {
    let s = !1
    try {
      const t = Object.defineProperty({}, "passive", {
        get: function () {
          s = !0
        },
      })
      window.addEventListener("_", null, t),
        window.removeEventListener("_", null, t)
    } catch {}
    return s
  })()
function Rt(s, t, e, i) {
  let n
  return (
    e && e.length
      ? (n = e.shift())
      : Pl
        ? (n = new OffscreenCanvas(s || 300, t || 300))
        : (n = document.createElement("canvas")),
    s && (n.width = s),
    t && (n.height = t),
    n.getContext("2d", i)
  )
}
let dr
function Xr() {
  return dr || (dr = Rt(1, 1)), dr
}
function Us(s) {
  const t = s.canvas
  ;(t.width = 1), (t.height = 1), s.clearRect(0, 0, 1, 1)
}
function _a(s, t) {
  const e = t.parentNode
  e && e.replaceChild(s, t)
}
function Ur(s) {
  return s && s.parentNode ? s.parentNode.removeChild(s) : null
}
function lu(s) {
  for (; s.lastChild; ) s.removeChild(s.lastChild)
}
function hu(s, t) {
  const e = s.childNodes
  for (let i = 0; ; ++i) {
    const n = e[i],
      r = t[i]
    if (!n && !r) break
    if (n !== r) {
      if (!n) {
        s.appendChild(r)
        continue
      }
      if (!r) {
        s.removeChild(n), --i
        continue
      }
      s.insertBefore(r, n)
    }
  }
}
function cu(s, t, e) {
  const i = s
  let n = !0,
    r = !1,
    o = !1
  const a = [
    ds(i, U.LOAD, function () {
      ;(o = !0), r || t()
    }),
  ]
  return (
    i.src && Fl
      ? ((r = !0),
        i
          .decode()
          .then(function () {
            n && t()
          })
          .catch(function (l) {
            n && (o ? t() : e())
          }))
      : a.push(ds(i, U.ERROR, e)),
    function () {
      ;(n = !1), a.forEach(lt)
    }
  )
}
function uu(s, t) {
  return new Promise((e, i) => {
    function n() {
      o(), e(s)
    }
    function r() {
      o(), i(new Error("Image load error"))
    }
    function o() {
      s.removeEventListener("load", n), s.removeEventListener("error", r)
    }
    s.addEventListener("load", n),
      s.addEventListener("error", r),
      t && (s.src = t)
  })
}
function du(s, t) {
  return (
    t && (s.src = t),
    s.src && Fl
      ? new Promise((e, i) =>
          s
            .decode()
            .then(() => e(s))
            .catch(n => (s.complete && s.width ? e(s) : i(n))),
        )
      : uu(s)
  )
}
class fu {
  constructor() {
    ;(this.cache_ = {}),
      (this.patternCache_ = {}),
      (this.cacheSize_ = 0),
      (this.maxCacheSize_ = 32)
  }
  clear() {
    ;(this.cache_ = {}), (this.patternCache_ = {}), (this.cacheSize_ = 0)
  }
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_
  }
  expire() {
    if (this.canExpireCache()) {
      let t = 0
      for (const e in this.cache_) {
        const i = this.cache_[e]
        !(t++ & 3) &&
          !i.hasListener() &&
          (delete this.cache_[e],
          delete this.patternCache_[e],
          --this.cacheSize_)
      }
    }
  }
  get(t, e, i) {
    const n = fr(t, e, i)
    return n in this.cache_ ? this.cache_[n] : null
  }
  getPattern(t, e, i) {
    const n = fr(t, e, i)
    return n in this.patternCache_ ? this.patternCache_[n] : null
  }
  set(t, e, i, n, r) {
    const o = fr(t, e, i),
      a = o in this.cache_
    ;(this.cache_[o] = n),
      r &&
        (n.getImageState() === X.IDLE && n.load(),
        n.getImageState() === X.LOADING
          ? n.ready().then(() => {
              this.patternCache_[o] = Xr().createPattern(
                n.getImage(1),
                "repeat",
              )
            })
          : (this.patternCache_[o] = Xr().createPattern(
              n.getImage(1),
              "repeat",
            ))),
      a || ++this.cacheSize_
  }
  setSize(t) {
    ;(this.maxCacheSize_ = t), this.expire()
  }
}
function fr(s, t, e) {
  const i = e ? Ki(e) : "null"
  return t + ":" + s + ":" + i
}
const de = new fu()
let ln = null
class gu extends Ps {
  constructor(t, e, i, n, r) {
    super(),
      (this.hitDetectionImage_ = null),
      (this.image_ = t),
      (this.crossOrigin_ = i),
      (this.canvas_ = {}),
      (this.color_ = r),
      (this.imageState_ = n === void 0 ? X.IDLE : n),
      (this.size_ = t && t.width && t.height ? [t.width, t.height] : null),
      (this.src_ = e),
      this.tainted_,
      (this.ready_ = null)
  }
  initializeImage_() {
    ;(this.image_ = new Image()),
      this.crossOrigin_ !== null &&
        (this.image_.crossOrigin = this.crossOrigin_)
  }
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === X.LOADED) {
      ln || (ln = Rt(1, 1, void 0, { willReadFrequently: !0 })),
        ln.drawImage(this.image_, 0, 0)
      try {
        ln.getImageData(0, 0, 1, 1), (this.tainted_ = !1)
      } catch {
        ;(ln = null), (this.tainted_ = !0)
      }
    }
    return this.tainted_ === !0
  }
  dispatchChangeEvent_() {
    this.dispatchEvent(U.CHANGE)
  }
  handleImageError_() {
    ;(this.imageState_ = X.ERROR), this.dispatchChangeEvent_()
  }
  handleImageLoad_() {
    ;(this.imageState_ = X.LOADED),
      (this.size_ = [this.image_.width, this.image_.height]),
      this.dispatchChangeEvent_()
  }
  getImage(t) {
    return (
      this.image_ || this.initializeImage_(),
      this.replaceColor_(t),
      this.canvas_[t] ? this.canvas_[t] : this.image_
    )
  }
  getPixelRatio(t) {
    return this.replaceColor_(t), this.canvas_[t] ? t : 1
  }
  getImageState() {
    return this.imageState_
  }
  getHitDetectionImage() {
    if ((this.image_ || this.initializeImage_(), !this.hitDetectionImage_))
      if (this.isTainted_()) {
        const t = this.size_[0],
          e = this.size_[1],
          i = Rt(t, e)
        i.fillRect(0, 0, t, e), (this.hitDetectionImage_ = i.canvas)
      } else this.hitDetectionImage_ = this.image_
    return this.hitDetectionImage_
  }
  getSize() {
    return this.size_
  }
  getSrc() {
    return this.src_
  }
  load() {
    if (this.imageState_ === X.IDLE) {
      this.image_ || this.initializeImage_(), (this.imageState_ = X.LOADING)
      try {
        this.src_ !== void 0 && (this.image_.src = this.src_)
      } catch {
        this.handleImageError_()
      }
      this.image_ instanceof HTMLImageElement &&
        du(this.image_, this.src_)
          .then(t => {
            ;(this.image_ = t), this.handleImageLoad_()
          })
          .catch(this.handleImageError_.bind(this))
    }
  }
  replaceColor_(t) {
    if (!this.color_ || this.canvas_[t] || this.imageState_ !== X.LOADED) return
    const e = this.image_,
      i = document.createElement("canvas")
    ;(i.width = Math.ceil(e.width * t)), (i.height = Math.ceil(e.height * t))
    const n = i.getContext("2d")
    n.scale(t, t),
      n.drawImage(e, 0, 0),
      (n.globalCompositeOperation = "multiply"),
      (n.fillStyle = tu(this.color_)),
      n.fillRect(0, 0, i.width / t, i.height / t),
      (n.globalCompositeOperation = "destination-in"),
      n.drawImage(e, 0, 0),
      (this.canvas_[t] = i)
  }
  ready() {
    return (
      this.ready_ ||
        (this.ready_ = new Promise(t => {
          this.imageState_ === X.LOADED || this.imageState_ === X.ERROR
            ? t()
            : this.addEventListener(U.CHANGE, function e() {
                ;(this.imageState_ === X.LOADED ||
                  this.imageState_ === X.ERROR) &&
                  (this.removeEventListener(U.CHANGE, e), t())
              })
        })),
      this.ready_
    )
  }
}
function To(s, t, e, i, n, r) {
  let o = t === void 0 ? void 0 : de.get(t, e, n)
  return (
    o ||
      ((o = new gu(
        s,
        s instanceof HTMLImageElement ? s.src || void 0 : t,
        e,
        i,
        n,
      )),
      de.set(t, e, n, o, r)),
    r && o && !de.getPattern(t, e, n) && de.set(t, e, n, o, r),
    o
  )
}
class Oe {
  constructor(t) {
    ;(t = t || {}),
      (this.patternImage_ = null),
      (this.color_ = null),
      t.color !== void 0 && this.setColor(t.color)
  }
  clone() {
    const t = this.getColor()
    return new Oe({ color: Array.isArray(t) ? t.slice() : t || void 0 })
  }
  getColor() {
    return this.color_
  }
  setColor(t) {
    if (t !== null && typeof t == "object" && "src" in t) {
      const e = To(
        null,
        t.src,
        "anonymous",
        void 0,
        t.offset ? null : t.color ? t.color : null,
        !(t.offset && t.size),
      )
      e.ready().then(() => {
        this.patternImage_ = null
      }),
        e.getImageState() === X.IDLE && e.load(),
        e.getImageState() === X.LOADING && (this.patternImage_ = e)
    }
    this.color_ = t
  }
  loading() {
    return !!this.patternImage_
  }
  ready() {
    return this.patternImage_ ? this.patternImage_.ready() : Promise.resolve()
  }
}
function _s(s, t, e, i, n, r, o) {
  let a, l
  const h = (e - t) / i
  if (h === 1) a = t
  else if (h === 2) (a = t), (l = n)
  else if (h !== 0) {
    let c = s[t],
      u = s[t + 1],
      d = 0
    const f = [0]
    for (let m = t + i; m < e; m += i) {
      const p = s[m],
        y = s[m + 1]
      ;(d += Math.sqrt((p - c) * (p - c) + (y - u) * (y - u))),
        f.push(d),
        (c = p),
        (u = y)
    }
    const g = n * d,
      _ = $h(f, g)
    _ < 0
      ? ((l = (g - f[-_ - 2]) / (f[-_ - 1] - f[-_ - 2])),
        (a = t + (-_ - 2) * i))
      : (a = t + _ * i)
  }
  ;(o = o > 1 ? o : 2), (r = r || new Array(o))
  for (let c = 0; c < o; ++c)
    r[c] =
      a === void 0
        ? NaN
        : l === void 0
          ? s[a + c]
          : Yt(s[a + c], s[a + i + c], l)
  return r
}
function Wr(s, t, e, i, n, r) {
  if (e == t) return null
  let o
  if (n < s[t + i - 1])
    return r ? ((o = s.slice(t, t + i)), (o[i - 1] = n), o) : null
  if (s[e - 1] < n)
    return r ? ((o = s.slice(e - i, e)), (o[i - 1] = n), o) : null
  if (n == s[t + i - 1]) return s.slice(t, t + i)
  let a = t / i,
    l = e / i
  for (; a < l; ) {
    const d = (a + l) >> 1
    n < s[(d + 1) * i - 1] ? (l = d) : (a = d + 1)
  }
  const h = s[a * i - 1]
  if (n == h) return s.slice((a - 1) * i, (a - 1) * i + i)
  const c = s[(a + 1) * i - 1],
    u = (n - h) / (c - h)
  o = []
  for (let d = 0; d < i - 1; ++d)
    o.push(Yt(s[(a - 1) * i + d], s[a * i + d], u))
  return o.push(n), o
}
function _u(s, t, e, i, n, r, o) {
  if (o) return Wr(s, t, e[e.length - 1], i, n, r)
  let a
  if (n < s[i - 1]) return r ? ((a = s.slice(0, i)), (a[i - 1] = n), a) : null
  if (s[s.length - 1] < n)
    return r ? ((a = s.slice(s.length - i)), (a[i - 1] = n), a) : null
  for (let l = 0, h = e.length; l < h; ++l) {
    const c = e[l]
    if (t != c) {
      if (n < s[t + i - 1]) return null
      if (n <= s[c - 1]) return Wr(s, t, c, i, n, !1)
      t = c
    }
  }
  return null
}
function bl(s, t, e, i) {
  let n = s[t],
    r = s[t + 1],
    o = 0
  for (let a = t + i; a < e; a += i) {
    const l = s[a],
      h = s[a + 1]
    ;(o += Math.sqrt((l - n) * (l - n) + (h - r) * (h - r))), (n = l), (r = h)
  }
  return o
}
class ms extends wi {
  constructor(t, e) {
    super(),
      (this.flatMidpoint_ = null),
      (this.flatMidpointRevision_ = -1),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      e !== void 0 && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e)
  }
  appendCoordinate(t) {
    tt(this.flatCoordinates, t), this.changed()
  }
  clone() {
    const t = new ms(this.flatCoordinates.slice(), this.layout)
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    return n < xi(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            fo(
              this.flatCoordinates,
              0,
              this.flatCoordinates.length,
              this.stride,
              0,
            ),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        _o(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          this.maxDelta_,
          !1,
          t,
          e,
          i,
          n,
        ))
  }
  forEachSegment(t) {
    return Rl(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
    )
  }
  getCoordinateAtM(t, e) {
    return this.layout != "XYM" && this.layout != "XYZM"
      ? null
      : ((e = e !== void 0 ? e : !1),
        Wr(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          t,
          e,
        ))
  }
  getCoordinates() {
    return Ve(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
  }
  getCoordinateAt(t, e) {
    return _s(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
      e,
      this.stride,
    )
  }
  getLength() {
    return bl(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
  }
  getFlatMidpoint() {
    return (
      this.flatMidpointRevision_ != this.getRevision() &&
        ((this.flatMidpoint_ = this.getCoordinateAt(
          0.5,
          this.flatMidpoint_ ?? void 0,
        )),
        (this.flatMidpointRevision_ = this.getRevision())),
      this.flatMidpoint_
    )
  }
  getSimplifiedGeometryInternal(t) {
    const e = []
    return (
      (e.length = Ys(
        this.flatCoordinates,
        0,
        this.flatCoordinates.length,
        this.stride,
        t,
        e,
        0,
      )),
      new ms(e, "XY")
    )
  }
  getType() {
    return "LineString"
  }
  intersectsExtent(t) {
    return Xs(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      t,
    )
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = zs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed()
  }
}
const ps = ms
class ii {
  constructor(t) {
    ;(t = t || {}),
      (this.color_ = t.color !== void 0 ? t.color : null),
      (this.lineCap_ = t.lineCap),
      (this.lineDash_ = t.lineDash !== void 0 ? t.lineDash : null),
      (this.lineDashOffset_ = t.lineDashOffset),
      (this.lineJoin_ = t.lineJoin),
      (this.miterLimit_ = t.miterLimit),
      (this.width_ = t.width)
  }
  clone() {
    const t = this.getColor()
    return new ii({
      color: Array.isArray(t) ? t.slice() : t || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth(),
    })
  }
  getColor() {
    return this.color_
  }
  getLineCap() {
    return this.lineCap_
  }
  getLineDash() {
    return this.lineDash_
  }
  getLineDashOffset() {
    return this.lineDashOffset_
  }
  getLineJoin() {
    return this.lineJoin_
  }
  getMiterLimit() {
    return this.miterLimit_
  }
  getWidth() {
    return this.width_
  }
  setColor(t) {
    this.color_ = t
  }
  setLineCap(t) {
    this.lineCap_ = t
  }
  setLineDash(t) {
    this.lineDash_ = t
  }
  setLineDashOffset(t) {
    this.lineDashOffset_ = t
  }
  setLineJoin(t) {
    this.lineJoin_ = t
  }
  setMiterLimit(t) {
    this.miterLimit_ = t
  }
  setWidth(t) {
    this.width_ = t
  }
}
function ma(s) {
  return s[0] > 0 && s[1] > 0
}
function mu(s, t, e) {
  return (
    e === void 0 && (e = [0, 0]),
    (e[0] = (s[0] * t + 0.5) | 0),
    (e[1] = (s[1] * t + 0.5) | 0),
    e
  )
}
function Ut(s, t) {
  return Array.isArray(s)
    ? s
    : (t === void 0 ? (t = [s, s]) : ((t[0] = s), (t[1] = s)), t)
}
class Ws {
  constructor(t) {
    ;(this.opacity_ = t.opacity),
      (this.rotateWithView_ = t.rotateWithView),
      (this.rotation_ = t.rotation),
      (this.scale_ = t.scale),
      (this.scaleArray_ = Ut(t.scale)),
      (this.displacement_ = t.displacement),
      (this.declutterMode_ = t.declutterMode)
  }
  clone() {
    const t = this.getScale()
    return new Ws({
      opacity: this.getOpacity(),
      scale: Array.isArray(t) ? t.slice() : t,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode(),
    })
  }
  getOpacity() {
    return this.opacity_
  }
  getRotateWithView() {
    return this.rotateWithView_
  }
  getRotation() {
    return this.rotation_
  }
  getScale() {
    return this.scale_
  }
  getScaleArray() {
    return this.scaleArray_
  }
  getDisplacement() {
    return this.displacement_
  }
  getDeclutterMode() {
    return this.declutterMode_
  }
  getAnchor() {
    return W()
  }
  getImage(t) {
    return W()
  }
  getHitDetectionImage() {
    return W()
  }
  getPixelRatio(t) {
    return 1
  }
  getImageState() {
    return W()
  }
  getImageSize() {
    return W()
  }
  getOrigin() {
    return W()
  }
  getSize() {
    return W()
  }
  setDisplacement(t) {
    this.displacement_ = t
  }
  setOpacity(t) {
    this.opacity_ = t
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t
  }
  setRotation(t) {
    this.rotation_ = t
  }
  setScale(t) {
    ;(this.scale_ = t), (this.scaleArray_ = Ut(t))
  }
  listenImageChange(t) {
    W()
  }
  load() {
    W()
  }
  unlistenImageChange(t) {
    W()
  }
  ready() {
    return Promise.resolve()
  }
}
function fe(s) {
  return s
    ? Array.isArray(s)
      ? So(s)
      : typeof s == "object" && "src" in s
        ? pu(s)
        : s
    : null
}
function pu(s) {
  if (!s.offset || !s.size) return de.getPattern(s.src, "anonymous", s.color)
  const t = s.src + ":" + s.offset,
    e = de.getPattern(t, void 0, s.color)
  if (e) return e
  const i = de.get(s.src, "anonymous", null)
  if (i.getImageState() !== X.LOADED) return null
  const n = Rt(s.size[0], s.size[1])
  return (
    n.drawImage(
      i.getImage(1),
      s.offset[0],
      s.offset[1],
      s.size[0],
      s.size[1],
      0,
      0,
      s.size[0],
      s.size[1],
    ),
    To(n.canvas, t, void 0, X.LOADED, s.color, !0),
    de.getPattern(t, void 0, s.color)
  )
}
const is = "ol-hidden",
  Zs = "ol-unselectable",
  Io = "ol-control",
  pa = "ol-collapsed",
  yu = new RegExp(
    [
      "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
      "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
      "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
      "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
      "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
      "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
      `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`,
    ].join(""),
    "i",
  ),
  ya = ["style", "variant", "weight", "size", "lineHeight", "family"],
  Dl = function (s) {
    const t = s.match(yu)
    if (!t) return null
    const e = {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal",
    }
    for (let i = 0, n = ya.length; i < n; ++i) {
      const r = t[i + 1]
      r !== void 0 && (e[ya[i]] = r)
    }
    return (e.families = e.family.split(/,\s?/)), e
  },
  Nl = "10px sans-serif",
  Dt = "#000",
  Vi = "round",
  Le = [],
  Ae = 0,
  ji = "round",
  Mn = 10,
  Pn = "#000",
  Fn = "center",
  ys = "middle",
  fi = [0, 0, 0, 0],
  On = 1,
  Se = new me()
let Pi = null,
  Zr
const Br = {},
  Eu = (function () {
    const t = "32px ",
      e = ["monospace", "serif"],
      i = e.length,
      n = "wmytzilWMYTZIL@#/&?$%10"
    let r, o
    function a(h, c, u) {
      let d = !0
      for (let f = 0; f < i; ++f) {
        const g = e[f]
        if (((o = Es(h + " " + c + " " + t + g, n)), u != g)) {
          const _ = Es(h + " " + c + " " + t + u + "," + g, n)
          d = d && _ != o
        }
      }
      return !!d
    }
    function l() {
      let h = !0
      const c = Se.getKeys()
      for (let u = 0, d = c.length; u < d; ++u) {
        const f = c[u]
        Se.get(f) < 100 &&
          (a.apply(
            this,
            f.split(`
`),
          )
            ? (kn(Br), (Pi = null), (Zr = void 0), Se.set(f, 100))
            : (Se.set(f, Se.get(f) + 1, !0), (h = !1)))
      }
      h && (clearInterval(r), (r = void 0))
    }
    return function (h) {
      const c = Dl(h)
      if (!c) return
      const u = c.families
      for (let d = 0, f = u.length; d < f; ++d) {
        const g = u[d],
          _ =
            c.style +
            `
` +
            c.weight +
            `
` +
            g
        Se.get(_) === void 0 &&
          (Se.set(_, 100, !0),
          a(c.style, c.weight, g) ||
            (Se.set(_, 0, !0), r === void 0 && (r = setInterval(l, 32))))
      }
    }
  })(),
  xu = (function () {
    let s
    return function (t) {
      let e = Br[t]
      if (e == null) {
        if (Pl) {
          const i = Dl(t),
            n = kl(t, "Žg")
          e =
            (isNaN(Number(i.lineHeight)) ? 1.2 : Number(i.lineHeight)) *
            (n.actualBoundingBoxAscent + n.actualBoundingBoxDescent)
        } else
          s ||
            ((s = document.createElement("div")),
            (s.innerHTML = "M"),
            (s.style.minHeight = "0"),
            (s.style.maxHeight = "none"),
            (s.style.height = "auto"),
            (s.style.padding = "0"),
            (s.style.border = "none"),
            (s.style.position = "absolute"),
            (s.style.display = "block"),
            (s.style.left = "-99999px")),
            (s.style.font = t),
            document.body.appendChild(s),
            (e = s.offsetHeight),
            document.body.removeChild(s)
        Br[t] = e
      }
      return e
    }
  })()
function kl(s, t) {
  return (
    Pi || (Pi = Rt(1, 1)),
    s != Zr && ((Pi.font = s), (Zr = Pi.font)),
    Pi.measureText(t)
  )
}
function Es(s, t) {
  return kl(s, t).width
}
function Ea(s, t, e) {
  if (t in e) return e[t]
  const i = t
    .split(
      `
`,
    )
    .reduce((n, r) => Math.max(n, Es(s, r)), 0)
  return (e[t] = i), i
}
function Cu(s, t) {
  const e = [],
    i = [],
    n = []
  let r = 0,
    o = 0,
    a = 0,
    l = 0
  for (let h = 0, c = t.length; h <= c; h += 2) {
    const u = t[h]
    if (
      u ===
        `
` ||
      h === c
    ) {
      ;(r = Math.max(r, o)), n.push(o), (o = 0), (a += l)
      continue
    }
    const d = t[h + 1] || s.font,
      f = Es(d, u)
    e.push(f), (o += f)
    const g = xu(d)
    i.push(g), (l = Math.max(l, g))
  }
  return { width: r, height: a, widths: e, heights: i, lineWidths: n }
}
function wu(s, t, e, i, n, r, o, a, l, h, c) {
  s.save(),
    e !== 1 &&
      (s.globalAlpha === void 0
        ? (s.globalAlpha = u => (u.globalAlpha *= e))
        : (s.globalAlpha *= e)),
    t && s.transform.apply(s, t),
    i.contextInstructions
      ? (s.translate(l, h), s.scale(c[0], c[1]), Ru(i, s))
      : c[0] < 0 || c[1] < 0
        ? (s.translate(l, h),
          s.scale(c[0], c[1]),
          s.drawImage(i, n, r, o, a, 0, 0, o, a))
        : s.drawImage(i, n, r, o, a, l, h, o * c[0], a * c[1]),
    s.restore()
}
function Ru(s, t) {
  const e = s.contextInstructions
  for (let i = 0, n = e.length; i < n; i += 2)
    Array.isArray(e[i + 1]) ? t[e[i]].apply(t, e[i + 1]) : (t[e[i]] = e[i + 1])
}
class Bs extends Ws {
  constructor(t) {
    super({
      opacity: 1,
      rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
      rotation: t.rotation !== void 0 ? t.rotation : 0,
      scale: t.scale !== void 0 ? t.scale : 1,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      declutterMode: t.declutterMode,
    }),
      this.canvases_,
      (this.hitDetectionCanvas_ = null),
      (this.fill_ = t.fill !== void 0 ? t.fill : null),
      (this.origin_ = [0, 0]),
      (this.points_ = t.points),
      (this.radius_ = t.radius),
      (this.radius2_ = t.radius2),
      (this.angle_ = t.angle !== void 0 ? t.angle : 0),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      this.size_,
      this.renderOptions_,
      (this.imageState_ =
        this.fill_ && this.fill_.loading() ? X.LOADING : X.LOADED),
      this.imageState_ === X.LOADING &&
        this.ready().then(() => (this.imageState_ = X.LOADED)),
      this.render()
  }
  clone() {
    const t = this.getScale(),
      e = new Bs({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        points: this.getPoints(),
        radius: this.getRadius(),
        radius2: this.getRadius2(),
        angle: this.getAngle(),
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        scale: Array.isArray(t) ? t.slice() : t,
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      })
    return e.setOpacity(this.getOpacity()), e
  }
  getAnchor() {
    const t = this.size_,
      e = this.getDisplacement(),
      i = this.getScaleArray()
    return [t[0] / 2 - e[0] / i[0], t[1] / 2 + e[1] / i[1]]
  }
  getAngle() {
    return this.angle_
  }
  getFill() {
    return this.fill_
  }
  setFill(t) {
    ;(this.fill_ = t), this.render()
  }
  getHitDetectionImage() {
    return (
      this.hitDetectionCanvas_ ||
        (this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
          this.renderOptions_,
        )),
      this.hitDetectionCanvas_
    )
  }
  getImage(t) {
    let e = this.canvases_[t]
    if (!e) {
      const i = this.renderOptions_,
        n = Rt(i.size * t, i.size * t)
      this.draw_(i, n, t), (e = n.canvas), (this.canvases_[t] = e)
    }
    return e
  }
  getPixelRatio(t) {
    return t
  }
  getImageSize() {
    return this.size_
  }
  getImageState() {
    return this.imageState_
  }
  getOrigin() {
    return this.origin_
  }
  getPoints() {
    return this.points_
  }
  getRadius() {
    return this.radius_
  }
  getRadius2() {
    return this.radius2_
  }
  getSize() {
    return this.size_
  }
  getStroke() {
    return this.stroke_
  }
  setStroke(t) {
    ;(this.stroke_ = t), this.render()
  }
  listenImageChange(t) {}
  load() {}
  unlistenImageChange(t) {}
  calculateLineJoinSize_(t, e, i) {
    if (e === 0 || this.points_ === 1 / 0 || (t !== "bevel" && t !== "miter"))
      return e
    let n = this.radius_,
      r = this.radius2_ === void 0 ? n : this.radius2_
    if (n < r) {
      const T = n
      ;(n = r), (r = T)
    }
    const o = this.radius2_ === void 0 ? this.points_ : this.points_ * 2,
      a = (2 * Math.PI) / o,
      l = r * Math.sin(a),
      h = Math.sqrt(r * r - l * l),
      c = n - h,
      u = Math.sqrt(l * l + c * c),
      d = u / l
    if (t === "miter" && d <= i) return d * e
    const f = e / 2 / d,
      g = (e / 2) * (c / u),
      m = Math.sqrt((n + f) * (n + f) + g * g) - n
    if (this.radius2_ === void 0 || t === "bevel") return m * 2
    const p = n * Math.sin(a),
      y = Math.sqrt(n * n - p * p),
      x = r - y,
      C = Math.sqrt(p * p + x * x) / p
    if (C <= i) {
      const T = (C * e) / 2 - r - n
      return 2 * Math.max(m, T)
    }
    return m * 2
  }
  createRenderOptions() {
    let t = Vi,
      e = ji,
      i = 0,
      n = null,
      r = 0,
      o,
      a = 0
    this.stroke_ &&
      ((o = fe(this.stroke_.getColor() ?? Pn)),
      (a = this.stroke_.getWidth() ?? On),
      (n = this.stroke_.getLineDash()),
      (r = this.stroke_.getLineDashOffset() ?? 0),
      (e = this.stroke_.getLineJoin() ?? ji),
      (t = this.stroke_.getLineCap() ?? Vi),
      (i = this.stroke_.getMiterLimit() ?? Mn))
    const l = this.calculateLineJoinSize_(e, a, i),
      h = Math.max(this.radius_, this.radius2_ || 0),
      c = Math.ceil(2 * h + l)
    return {
      strokeStyle: o,
      strokeWidth: a,
      size: c,
      lineCap: t,
      lineDash: n,
      lineDashOffset: r,
      lineJoin: e,
      miterLimit: i,
    }
  }
  render() {
    this.renderOptions_ = this.createRenderOptions()
    const t = this.renderOptions_.size
    ;(this.canvases_ = {}),
      (this.hitDetectionCanvas_ = null),
      (this.size_ = [t, t])
  }
  draw_(t, e, i) {
    if (
      (e.scale(i, i),
      e.translate(t.size / 2, t.size / 2),
      this.createPath_(e),
      this.fill_)
    ) {
      let n = this.fill_.getColor()
      n === null && (n = Dt), (e.fillStyle = fe(n)), e.fill()
    }
    t.strokeStyle &&
      ((e.strokeStyle = t.strokeStyle),
      (e.lineWidth = t.strokeWidth),
      t.lineDash &&
        (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
      (e.lineCap = t.lineCap),
      (e.lineJoin = t.lineJoin),
      (e.miterLimit = t.miterLimit),
      e.stroke())
  }
  createHitDetectionCanvas_(t) {
    let e
    if (this.fill_) {
      let i = this.fill_.getColor(),
        n = 0
      typeof i == "string" && (i = Ki(i)),
        i === null
          ? (n = 1)
          : Array.isArray(i) && (n = i.length === 4 ? i[3] : 1),
        n === 0 &&
          ((e = Rt(t.size, t.size)), this.drawHitDetectionCanvas_(t, e))
    }
    return e ? e.canvas : this.getImage(1)
  }
  createPath_(t) {
    let e = this.points_
    const i = this.radius_
    if (e === 1 / 0) t.arc(0, 0, i, 0, 2 * Math.PI)
    else {
      const n = this.radius2_ === void 0 ? i : this.radius2_
      this.radius2_ !== void 0 && (e *= 2)
      const r = this.angle_ - Math.PI / 2,
        o = (2 * Math.PI) / e
      for (let a = 0; a < e; a++) {
        const l = r + a * o,
          h = a % 2 === 0 ? i : n
        t.lineTo(h * Math.cos(l), h * Math.sin(l))
      }
      t.closePath()
    }
  }
  drawHitDetectionCanvas_(t, e) {
    e.translate(t.size / 2, t.size / 2),
      this.createPath_(e),
      (e.fillStyle = Dt),
      e.fill(),
      t.strokeStyle &&
        ((e.strokeStyle = t.strokeStyle),
        (e.lineWidth = t.strokeWidth),
        t.lineDash &&
          (e.setLineDash(t.lineDash), (e.lineDashOffset = t.lineDashOffset)),
        (e.lineJoin = t.lineJoin),
        (e.miterLimit = t.miterLimit),
        e.stroke())
  }
  ready() {
    return this.fill_ ? this.fill_.ready() : Promise.resolve()
  }
}
class Xn extends Bs {
  constructor(t) {
    ;(t = t || { radius: 5 }),
      super({
        points: 1 / 0,
        fill: t.fill,
        radius: t.radius,
        stroke: t.stroke,
        scale: t.scale !== void 0 ? t.scale : 1,
        rotation: t.rotation !== void 0 ? t.rotation : 0,
        rotateWithView: t.rotateWithView !== void 0 ? t.rotateWithView : !1,
        displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
        declutterMode: t.declutterMode,
      })
  }
  clone() {
    const t = this.getScale(),
      e = new Xn({
        fill: this.getFill() ? this.getFill().clone() : void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        radius: this.getRadius(),
        scale: Array.isArray(t) ? t.slice() : t,
        rotation: this.getRotation(),
        rotateWithView: this.getRotateWithView(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      })
    return e.setOpacity(this.getOpacity()), e
  }
  setRadius(t) {
    ;(this.radius_ = t), this.render()
  }
}
class Ks {
  constructor(t) {
    ;(t = t || {}),
      (this.geometry_ = null),
      (this.geometryFunction_ = xa),
      t.geometry !== void 0 && this.setGeometry(t.geometry),
      (this.fill_ = t.fill !== void 0 ? t.fill : null),
      (this.image_ = t.image !== void 0 ? t.image : null),
      (this.renderer_ = t.renderer !== void 0 ? t.renderer : null),
      (this.hitDetectionRenderer_ =
        t.hitDetectionRenderer !== void 0 ? t.hitDetectionRenderer : null),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      (this.text_ = t.text !== void 0 ? t.text : null),
      (this.zIndex_ = t.zIndex)
  }
  clone() {
    let t = this.getGeometry()
    return (
      t && typeof t == "object" && (t = t.clone()),
      new Ks({
        geometry: t ?? void 0,
        fill: this.getFill() ? this.getFill().clone() : void 0,
        image: this.getImage() ? this.getImage().clone() : void 0,
        renderer: this.getRenderer() ?? void 0,
        stroke: this.getStroke() ? this.getStroke().clone() : void 0,
        text: this.getText() ? this.getText().clone() : void 0,
        zIndex: this.getZIndex(),
      })
    )
  }
  getRenderer() {
    return this.renderer_
  }
  setRenderer(t) {
    this.renderer_ = t
  }
  setHitDetectionRenderer(t) {
    this.hitDetectionRenderer_ = t
  }
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_
  }
  getGeometry() {
    return this.geometry_
  }
  getGeometryFunction() {
    return this.geometryFunction_
  }
  getFill() {
    return this.fill_
  }
  setFill(t) {
    this.fill_ = t
  }
  getImage() {
    return this.image_
  }
  setImage(t) {
    this.image_ = t
  }
  getStroke() {
    return this.stroke_
  }
  setStroke(t) {
    this.stroke_ = t
  }
  getText() {
    return this.text_
  }
  setText(t) {
    this.text_ = t
  }
  getZIndex() {
    return this.zIndex_
  }
  setGeometry(t) {
    typeof t == "function"
      ? (this.geometryFunction_ = t)
      : typeof t == "string"
        ? (this.geometryFunction_ = function (e) {
            return e.get(t)
          })
        : t
          ? t !== void 0 &&
            (this.geometryFunction_ = function () {
              return t
            })
          : (this.geometryFunction_ = xa),
      (this.geometry_ = t)
  }
  setZIndex(t) {
    this.zIndex_ = t
  }
}
function Su(s) {
  let t
  if (typeof s == "function") t = s
  else {
    let e
    Array.isArray(s)
      ? (e = s)
      : (J(
          typeof s.getZIndex == "function",
          "Expected an `Style` or an array of `Style`",
        ),
        (e = [s])),
      (t = function () {
        return e
      })
  }
  return t
}
let gr = null
function Tu(s, t) {
  if (!gr) {
    const e = new Oe({ color: "rgba(255,255,255,0.4)" }),
      i = new ii({ color: "#3399CC", width: 1.25 })
    gr = [
      new Ks({
        image: new Xn({ fill: e, stroke: i, radius: 5 }),
        fill: e,
        stroke: i,
      }),
    ]
  }
  return gr
}
function xa(s) {
  return s.getGeometry()
}
const se = Ks,
  Iu = "#333"
class Un {
  constructor(t) {
    ;(t = t || {}),
      (this.font_ = t.font),
      (this.rotation_ = t.rotation),
      (this.rotateWithView_ = t.rotateWithView),
      (this.scale_ = t.scale),
      (this.scaleArray_ = Ut(t.scale !== void 0 ? t.scale : 1)),
      (this.text_ = t.text),
      (this.textAlign_ = t.textAlign),
      (this.justify_ = t.justify),
      (this.repeat_ = t.repeat),
      (this.textBaseline_ = t.textBaseline),
      (this.fill_ = t.fill !== void 0 ? t.fill : new Oe({ color: Iu })),
      (this.maxAngle_ = t.maxAngle !== void 0 ? t.maxAngle : Math.PI / 4),
      (this.placement_ = t.placement !== void 0 ? t.placement : "point"),
      (this.overflow_ = !!t.overflow),
      (this.stroke_ = t.stroke !== void 0 ? t.stroke : null),
      (this.offsetX_ = t.offsetX !== void 0 ? t.offsetX : 0),
      (this.offsetY_ = t.offsetY !== void 0 ? t.offsetY : 0),
      (this.backgroundFill_ = t.backgroundFill ? t.backgroundFill : null),
      (this.backgroundStroke_ = t.backgroundStroke ? t.backgroundStroke : null),
      (this.padding_ = t.padding === void 0 ? null : t.padding),
      (this.declutterMode_ = t.declutterMode)
  }
  clone() {
    const t = this.getScale()
    return new Un({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(t) ? t.slice() : t,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill()
        ? this.getBackgroundFill().clone()
        : void 0,
      backgroundStroke: this.getBackgroundStroke()
        ? this.getBackgroundStroke().clone()
        : void 0,
      padding: this.getPadding() || void 0,
      declutterMode: this.getDeclutterMode(),
    })
  }
  getOverflow() {
    return this.overflow_
  }
  getFont() {
    return this.font_
  }
  getMaxAngle() {
    return this.maxAngle_
  }
  getPlacement() {
    return this.placement_
  }
  getRepeat() {
    return this.repeat_
  }
  getOffsetX() {
    return this.offsetX_
  }
  getOffsetY() {
    return this.offsetY_
  }
  getFill() {
    return this.fill_
  }
  getRotateWithView() {
    return this.rotateWithView_
  }
  getRotation() {
    return this.rotation_
  }
  getScale() {
    return this.scale_
  }
  getScaleArray() {
    return this.scaleArray_
  }
  getStroke() {
    return this.stroke_
  }
  getText() {
    return this.text_
  }
  getTextAlign() {
    return this.textAlign_
  }
  getJustify() {
    return this.justify_
  }
  getTextBaseline() {
    return this.textBaseline_
  }
  getBackgroundFill() {
    return this.backgroundFill_
  }
  getBackgroundStroke() {
    return this.backgroundStroke_
  }
  getPadding() {
    return this.padding_
  }
  getDeclutterMode() {
    return this.declutterMode_
  }
  setOverflow(t) {
    this.overflow_ = t
  }
  setFont(t) {
    this.font_ = t
  }
  setMaxAngle(t) {
    this.maxAngle_ = t
  }
  setOffsetX(t) {
    this.offsetX_ = t
  }
  setOffsetY(t) {
    this.offsetY_ = t
  }
  setPlacement(t) {
    this.placement_ = t
  }
  setRepeat(t) {
    this.repeat_ = t
  }
  setRotateWithView(t) {
    this.rotateWithView_ = t
  }
  setFill(t) {
    this.fill_ = t
  }
  setRotation(t) {
    this.rotation_ = t
  }
  setScale(t) {
    ;(this.scale_ = t), (this.scaleArray_ = Ut(t !== void 0 ? t : 1))
  }
  setStroke(t) {
    this.stroke_ = t
  }
  setText(t) {
    this.text_ = t
  }
  setTextAlign(t) {
    this.textAlign_ = t
  }
  setJustify(t) {
    this.justify_ = t
  }
  setTextBaseline(t) {
    this.textBaseline_ = t
  }
  setBackgroundFill(t) {
    this.backgroundFill_ = t
  }
  setBackgroundStroke(t) {
    this.backgroundStroke_ = t
  }
  setPadding(t) {
    this.padding_ = t
  }
}
const st = {
  OPACITY: "opacity",
  VISIBLE: "visible",
  EXTENT: "extent",
  Z_INDEX: "zIndex",
  MAX_RESOLUTION: "maxResolution",
  MIN_RESOLUTION: "minResolution",
  MAX_ZOOM: "maxZoom",
  MIN_ZOOM: "minZoom",
  SOURCE: "source",
  MAP: "map",
}
class Gl extends me {
  constructor(t) {
    super(), this.on, this.once, this.un, (this.background_ = t.background)
    const e = Object.assign({}, t)
    typeof t.properties == "object" &&
      (delete e.properties, Object.assign(e, t.properties)),
      (e[st.OPACITY] = t.opacity !== void 0 ? t.opacity : 1),
      J(typeof e[st.OPACITY] == "number", "Layer opacity must be a number"),
      (e[st.VISIBLE] = t.visible !== void 0 ? t.visible : !0),
      (e[st.Z_INDEX] = t.zIndex),
      (e[st.MAX_RESOLUTION] =
        t.maxResolution !== void 0 ? t.maxResolution : 1 / 0),
      (e[st.MIN_RESOLUTION] = t.minResolution !== void 0 ? t.minResolution : 0),
      (e[st.MIN_ZOOM] = t.minZoom !== void 0 ? t.minZoom : -1 / 0),
      (e[st.MAX_ZOOM] = t.maxZoom !== void 0 ? t.maxZoom : 1 / 0),
      (this.className_ = e.className !== void 0 ? e.className : "ol-layer"),
      delete e.className,
      this.setProperties(e),
      (this.state_ = null)
  }
  getBackground() {
    return this.background_
  }
  getClassName() {
    return this.className_
  }
  getLayerState(t) {
    const e = this.state_ || { layer: this, managed: t === void 0 ? !0 : t },
      i = this.getZIndex()
    return (
      (e.opacity = mt(Math.round(this.getOpacity() * 100) / 100, 0, 1)),
      (e.visible = this.getVisible()),
      (e.extent = this.getExtent()),
      (e.zIndex = i === void 0 && !e.managed ? 1 / 0 : i),
      (e.maxResolution = this.getMaxResolution()),
      (e.minResolution = Math.max(this.getMinResolution(), 0)),
      (e.minZoom = this.getMinZoom()),
      (e.maxZoom = this.getMaxZoom()),
      (this.state_ = e),
      e
    )
  }
  getLayersArray(t) {
    return W()
  }
  getLayerStatesArray(t) {
    return W()
  }
  getExtent() {
    return this.get(st.EXTENT)
  }
  getMaxResolution() {
    return this.get(st.MAX_RESOLUTION)
  }
  getMinResolution() {
    return this.get(st.MIN_RESOLUTION)
  }
  getMinZoom() {
    return this.get(st.MIN_ZOOM)
  }
  getMaxZoom() {
    return this.get(st.MAX_ZOOM)
  }
  getOpacity() {
    return this.get(st.OPACITY)
  }
  getSourceState() {
    return W()
  }
  getVisible() {
    return this.get(st.VISIBLE)
  }
  getZIndex() {
    return this.get(st.Z_INDEX)
  }
  setBackground(t) {
    ;(this.background_ = t), this.changed()
  }
  setExtent(t) {
    this.set(st.EXTENT, t)
  }
  setMaxResolution(t) {
    this.set(st.MAX_RESOLUTION, t)
  }
  setMinResolution(t) {
    this.set(st.MIN_RESOLUTION, t)
  }
  setMaxZoom(t) {
    this.set(st.MAX_ZOOM, t)
  }
  setMinZoom(t) {
    this.set(st.MIN_ZOOM, t)
  }
  setOpacity(t) {
    J(typeof t == "number", "Layer opacity must be a number"),
      this.set(st.OPACITY, t)
  }
  setVisible(t) {
    this.set(st.VISIBLE, t)
  }
  setZIndex(t) {
    this.set(st.Z_INDEX, t)
  }
  disposeInternal() {
    this.state_ && ((this.state_.layer = null), (this.state_ = null)),
      super.disposeInternal()
  }
}
const It = { ANIMATING: 0, INTERACTING: 1 },
  ee = { CENTER: "center", RESOLUTION: "resolution", ROTATION: "rotation" },
  vu = 42,
  vo = 256
function Ca(s, t, e) {
  return function (i, n, r, o, a) {
    if (!i) return
    if (!n && !t) return i
    const l = t ? 0 : r[0] * n,
      h = t ? 0 : r[1] * n,
      c = a ? a[0] : 0,
      u = a ? a[1] : 0
    let d = s[0] + l / 2 + c,
      f = s[2] - l / 2 + c,
      g = s[1] + h / 2 + u,
      _ = s[3] - h / 2 + u
    d > f && ((d = (f + d) / 2), (f = d)), g > _ && ((g = (_ + g) / 2), (_ = g))
    let m = mt(i[0], d, f),
      p = mt(i[1], g, _)
    if (o && e && n) {
      const y = 30 * n
      ;(m +=
        -y * Math.log(1 + Math.max(0, d - i[0]) / y) +
        y * Math.log(1 + Math.max(0, i[0] - f) / y)),
        (p +=
          -y * Math.log(1 + Math.max(0, g - i[1]) / y) +
          y * Math.log(1 + Math.max(0, i[1] - _) / y))
    }
    return [m, p]
  }
}
function Lu(s) {
  return s
}
function Lo(s, t, e, i) {
  const n = rt(t) / e[0],
    r = vt(t) / e[1]
  return i ? Math.min(s, Math.max(n, r)) : Math.min(s, Math.min(n, r))
}
function Ao(s, t, e) {
  let i = Math.min(s, t)
  const n = 50
  return (
    (i *= Math.log(1 + n * Math.max(0, s / t - 1)) / n + 1),
    e &&
      ((i = Math.max(i, e)),
      (i /= Math.log(1 + n * Math.max(0, e / s - 1)) / n + 1)),
    mt(i, e / 2, t * 2)
  )
}
function Au(s, t, e, i) {
  return (
    (t = t !== void 0 ? t : !0),
    function (n, r, o, a) {
      if (n !== void 0) {
        const l = s[0],
          h = s[s.length - 1],
          c = e ? Lo(l, e, o, i) : l
        if (a) return t ? Ao(n, c, h) : mt(n, h, c)
        const u = Math.min(c, n),
          d = Math.floor(no(s, u, r))
        return s[d] > c && d < s.length - 1 ? s[d + 1] : s[d]
      }
    }
  )
}
function Mu(s, t, e, i, n, r) {
  return (
    (i = i !== void 0 ? i : !0),
    (e = e !== void 0 ? e : 0),
    function (o, a, l, h) {
      if (o !== void 0) {
        const c = n ? Lo(t, n, l, r) : t
        if (h) return i ? Ao(o, c, e) : mt(o, e, c)
        const u = 1e-9,
          d = Math.ceil(Math.log(t / c) / Math.log(s) - u),
          f = -a * (0.5 - u) + 0.5,
          g = Math.min(c, o),
          _ = Math.floor(Math.log(t / g) / Math.log(s) + f),
          m = Math.max(d, _),
          p = t / Math.pow(s, m)
        return mt(p, e, c)
      }
    }
  )
}
function wa(s, t, e, i, n) {
  return (
    (e = e !== void 0 ? e : !0),
    function (r, o, a, l) {
      if (r !== void 0) {
        const h = i ? Lo(s, i, a, n) : s
        return !e || !l ? mt(r, t, h) : Ao(r, h, t)
      }
    }
  )
}
function Mo(s) {
  if (s !== void 0) return 0
}
function Ra(s) {
  if (s !== void 0) return s
}
function Pu(s) {
  const t = (2 * Math.PI) / s
  return function (e, i) {
    if (i) return e
    if (e !== void 0) return (e = Math.floor(e / t + 0.5) * t), e
  }
}
function Fu(s) {
  const t = s === void 0 ? yn(5) : s
  return function (e, i) {
    return i || e === void 0 ? e : Math.abs(e) <= t ? 0 : e
  }
}
function zl(s) {
  return Math.pow(s, 3)
}
function qi(s) {
  return 1 - zl(1 - s)
}
function Ou(s) {
  return 3 * s * s - 2 * s * s * s
}
function bu(s) {
  return s
}
const _r = 0
class Du extends me {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      (t = Object.assign({}, t)),
      (this.hints_ = [0, 0]),
      (this.animations_ = []),
      this.updateAnimationKey_,
      (this.projection_ = co(t.projection, "EPSG:3857")),
      (this.viewportSize_ = [100, 100]),
      (this.targetCenter_ = null),
      this.targetResolution_,
      this.targetRotation_,
      (this.nextCenter_ = null),
      this.nextResolution_,
      this.nextRotation_,
      (this.cancelAnchor_ = void 0),
      t.projection && Ic(),
      t.center && (t.center = Re(t.center, this.projection_)),
      t.extent && (t.extent = ui(t.extent, this.projection_)),
      this.applyOptions_(t)
  }
  applyOptions_(t) {
    const e = Object.assign({}, t)
    for (const a in ee) delete e[a]
    this.setProperties(e, !0)
    const i = ku(t)
    ;(this.maxResolution_ = i.maxResolution),
      (this.minResolution_ = i.minResolution),
      (this.zoomFactor_ = i.zoomFactor),
      (this.resolutions_ = t.resolutions),
      (this.padding_ = t.padding),
      (this.minZoom_ = i.minZoom)
    const n = Nu(t),
      r = i.constraint,
      o = Gu(t)
    ;(this.constraints_ = { center: n, resolution: r, rotation: o }),
      this.setRotation(t.rotation !== void 0 ? t.rotation : 0),
      this.setCenterInternal(t.center !== void 0 ? t.center : null),
      t.resolution !== void 0
        ? this.setResolution(t.resolution)
        : t.zoom !== void 0 && this.setZoom(t.zoom)
  }
  get padding() {
    return this.padding_
  }
  set padding(t) {
    let e = this.padding_
    this.padding_ = t
    const i = this.getCenterInternal()
    if (i) {
      const n = t || [0, 0, 0, 0]
      e = e || [0, 0, 0, 0]
      const r = this.getResolution(),
        o = (r / 2) * (n[3] - e[3] + e[1] - n[1]),
        a = (r / 2) * (n[0] - e[0] + e[2] - n[2])
      this.setCenterInternal([i[0] + o, i[1] - a])
    }
  }
  getUpdatedOptions_(t) {
    const e = this.getProperties()
    return (
      e.resolution !== void 0
        ? (e.resolution = this.getResolution())
        : (e.zoom = this.getZoom()),
      (e.center = this.getCenterInternal()),
      (e.rotation = this.getRotation()),
      Object.assign({}, e, t)
    )
  }
  animate(t) {
    this.isDef() && !this.getAnimating() && this.resolveConstraints(0)
    const e = new Array(arguments.length)
    for (let i = 0; i < e.length; ++i) {
      let n = arguments[i]
      n.center &&
        ((n = Object.assign({}, n)),
        (n.center = Re(n.center, this.getProjection()))),
        n.anchor &&
          ((n = Object.assign({}, n)),
          (n.anchor = Re(n.anchor, this.getProjection()))),
        (e[i] = n)
    }
    this.animateInternal.apply(this, e)
  }
  animateInternal(t) {
    let e = arguments.length,
      i
    e > 1 &&
      typeof arguments[e - 1] == "function" &&
      ((i = arguments[e - 1]), --e)
    let n = 0
    for (; n < e && !this.isDef(); ++n) {
      const c = arguments[n]
      c.center && this.setCenterInternal(c.center),
        c.zoom !== void 0
          ? this.setZoom(c.zoom)
          : c.resolution && this.setResolution(c.resolution),
        c.rotation !== void 0 && this.setRotation(c.rotation)
    }
    if (n === e) {
      i && ns(i, !0)
      return
    }
    let r = Date.now(),
      o = this.targetCenter_.slice(),
      a = this.targetResolution_,
      l = this.targetRotation_
    const h = []
    for (; n < e; ++n) {
      const c = arguments[n],
        u = {
          start: r,
          complete: !1,
          anchor: c.anchor,
          duration: c.duration !== void 0 ? c.duration : 1e3,
          easing: c.easing || Ou,
          callback: i,
        }
      if (
        (c.center &&
          ((u.sourceCenter = o),
          (u.targetCenter = c.center.slice()),
          (o = u.targetCenter)),
        c.zoom !== void 0
          ? ((u.sourceResolution = a),
            (u.targetResolution = this.getResolutionForZoom(c.zoom)),
            (a = u.targetResolution))
          : c.resolution &&
            ((u.sourceResolution = a),
            (u.targetResolution = c.resolution),
            (a = u.targetResolution)),
        c.rotation !== void 0)
      ) {
        u.sourceRotation = l
        const d = yi(c.rotation - l + Math.PI, 2 * Math.PI) - Math.PI
        ;(u.targetRotation = l + d), (l = u.targetRotation)
      }
      zu(u) ? (u.complete = !0) : (r += u.duration), h.push(u)
    }
    this.animations_.push(h),
      this.setHint(It.ANIMATING, 1),
      this.updateAnimations_()
  }
  getAnimating() {
    return this.hints_[It.ANIMATING] > 0
  }
  getInteracting() {
    return this.hints_[It.INTERACTING] > 0
  }
  cancelAnimations() {
    this.setHint(It.ANIMATING, -this.hints_[It.ANIMATING])
    let t
    for (let e = 0, i = this.animations_.length; e < i; ++e) {
      const n = this.animations_[e]
      if ((n[0].callback && ns(n[0].callback, !1), !t))
        for (let r = 0, o = n.length; r < o; ++r) {
          const a = n[r]
          if (!a.complete) {
            t = a.anchor
            break
          }
        }
    }
    ;(this.animations_.length = 0),
      (this.cancelAnchor_ = t),
      (this.nextCenter_ = null),
      (this.nextResolution_ = NaN),
      (this.nextRotation_ = NaN)
  }
  updateAnimations_() {
    if (
      (this.updateAnimationKey_ !== void 0 &&
        (cancelAnimationFrame(this.updateAnimationKey_),
        (this.updateAnimationKey_ = void 0)),
      !this.getAnimating())
    )
      return
    const t = Date.now()
    let e = !1
    for (let i = this.animations_.length - 1; i >= 0; --i) {
      const n = this.animations_[i]
      let r = !0
      for (let o = 0, a = n.length; o < a; ++o) {
        const l = n[o]
        if (l.complete) continue
        const h = t - l.start
        let c = l.duration > 0 ? h / l.duration : 1
        c >= 1 ? ((l.complete = !0), (c = 1)) : (r = !1)
        const u = l.easing(c)
        if (l.sourceCenter) {
          const d = l.sourceCenter[0],
            f = l.sourceCenter[1],
            g = l.targetCenter[0],
            _ = l.targetCenter[1]
          this.nextCenter_ = l.targetCenter
          const m = d + u * (g - d),
            p = f + u * (_ - f)
          this.targetCenter_ = [m, p]
        }
        if (l.sourceResolution && l.targetResolution) {
          const d =
            u === 1
              ? l.targetResolution
              : l.sourceResolution +
                u * (l.targetResolution - l.sourceResolution)
          if (l.anchor) {
            const f = this.getViewportSize_(this.getRotation()),
              g = this.constraints_.resolution(d, 0, f, !0)
            this.targetCenter_ = this.calculateCenterZoom(g, l.anchor)
          }
          ;(this.nextResolution_ = l.targetResolution),
            (this.targetResolution_ = d),
            this.applyTargetState_(!0)
        }
        if (l.sourceRotation !== void 0 && l.targetRotation !== void 0) {
          const d =
            u === 1
              ? yi(l.targetRotation + Math.PI, 2 * Math.PI) - Math.PI
              : l.sourceRotation + u * (l.targetRotation - l.sourceRotation)
          if (l.anchor) {
            const f = this.constraints_.rotation(d, !0)
            this.targetCenter_ = this.calculateCenterRotate(f, l.anchor)
          }
          ;(this.nextRotation_ = l.targetRotation), (this.targetRotation_ = d)
        }
        if ((this.applyTargetState_(!0), (e = !0), !l.complete)) break
      }
      if (r) {
        ;(this.animations_[i] = null),
          this.setHint(It.ANIMATING, -1),
          (this.nextCenter_ = null),
          (this.nextResolution_ = NaN),
          (this.nextRotation_ = NaN)
        const o = n[0].callback
        o && ns(o, !0)
      }
    }
    ;(this.animations_ = this.animations_.filter(Boolean)),
      e &&
        this.updateAnimationKey_ === void 0 &&
        (this.updateAnimationKey_ = requestAnimationFrame(
          this.updateAnimations_.bind(this),
        ))
  }
  calculateCenterRotate(t, e) {
    let i
    const n = this.getCenterInternal()
    return (
      n !== void 0 &&
        ((i = [n[0] - e[0], n[1] - e[1]]),
        lo(i, t - this.getRotation()),
        wc(i, e)),
      i
    )
  }
  calculateCenterZoom(t, e) {
    let i
    const n = this.getCenterInternal(),
      r = this.getResolution()
    if (n !== void 0 && r !== void 0) {
      const o = e[0] - (t * (e[0] - n[0])) / r,
        a = e[1] - (t * (e[1] - n[1])) / r
      i = [o, a]
    }
    return i
  }
  getViewportSize_(t) {
    const e = this.viewportSize_
    if (t) {
      const i = e[0],
        n = e[1]
      return [
        Math.abs(i * Math.cos(t)) + Math.abs(n * Math.sin(t)),
        Math.abs(i * Math.sin(t)) + Math.abs(n * Math.cos(t)),
      ]
    }
    return e
  }
  setViewportSize(t) {
    ;(this.viewportSize_ = Array.isArray(t) ? t.slice() : [100, 100]),
      this.getAnimating() || this.resolveConstraints(0)
  }
  getCenter() {
    const t = this.getCenterInternal()
    return t && Gr(t, this.getProjection())
  }
  getCenterInternal() {
    return this.get(ee.CENTER)
  }
  getConstraints() {
    return this.constraints_
  }
  getConstrainResolution() {
    return this.get("constrainResolution")
  }
  getHints(t) {
    return t !== void 0
      ? ((t[0] = this.hints_[0]), (t[1] = this.hints_[1]), t)
      : this.hints_.slice()
  }
  calculateExtent(t) {
    const e = this.calculateExtentInternal(t)
    return uo(e, this.getProjection())
  }
  calculateExtentInternal(t) {
    t = t || this.getViewportSizeMinusPadding_()
    const e = this.getCenterInternal()
    J(e, "The view center is not defined")
    const i = this.getResolution()
    J(i !== void 0, "The view resolution is not defined")
    const n = this.getRotation()
    return J(n !== void 0, "The view rotation is not defined"), br(e, i, n, t)
  }
  getMaxResolution() {
    return this.maxResolution_
  }
  getMinResolution() {
    return this.minResolution_
  }
  getMaxZoom() {
    return this.getZoomForResolution(this.minResolution_)
  }
  setMaxZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ maxZoom: t }))
  }
  getMinZoom() {
    return this.getZoomForResolution(this.maxResolution_)
  }
  setMinZoom(t) {
    this.applyOptions_(this.getUpdatedOptions_({ minZoom: t }))
  }
  setConstrainResolution(t) {
    this.applyOptions_(this.getUpdatedOptions_({ constrainResolution: t }))
  }
  getProjection() {
    return this.projection_
  }
  getResolution() {
    return this.get(ee.RESOLUTION)
  }
  getResolutions() {
    return this.resolutions_
  }
  getResolutionForExtent(t, e) {
    return this.getResolutionForExtentInternal(ui(t, this.getProjection()), e)
  }
  getResolutionForExtentInternal(t, e) {
    e = e || this.getViewportSizeMinusPadding_()
    const i = rt(t) / e[0],
      n = vt(t) / e[1]
    return Math.max(i, n)
  }
  getResolutionForValueFunction(t) {
    t = t || 2
    const e = this.getConstrainedResolution(this.maxResolution_),
      i = this.minResolution_,
      n = Math.log(e / i) / Math.log(t)
    return function (r) {
      return e / Math.pow(t, r * n)
    }
  }
  getRotation() {
    return this.get(ee.ROTATION)
  }
  getValueForResolutionFunction(t) {
    const e = Math.log(t || 2),
      i = this.getConstrainedResolution(this.maxResolution_),
      n = this.minResolution_,
      r = Math.log(i / n) / e
    return function (o) {
      return Math.log(i / o) / e / r
    }
  }
  getViewportSizeMinusPadding_(t) {
    let e = this.getViewportSize_(t)
    const i = this.padding_
    return i && (e = [e[0] - i[1] - i[3], e[1] - i[0] - i[2]]), e
  }
  getState() {
    const t = this.getProjection(),
      e = this.getResolution(),
      i = this.getRotation()
    let n = this.getCenterInternal()
    const r = this.padding_
    if (r) {
      const o = this.getViewportSizeMinusPadding_()
      n = mr(
        n,
        this.getViewportSize_(),
        [o[0] / 2 + r[3], o[1] / 2 + r[0]],
        e,
        i,
      )
    }
    return {
      center: n.slice(0),
      projection: t !== void 0 ? t : null,
      resolution: e,
      nextCenter: this.nextCenter_,
      nextResolution: this.nextResolution_,
      nextRotation: this.nextRotation_,
      rotation: i,
      zoom: this.getZoom(),
    }
  }
  getViewStateAndExtent() {
    return { viewState: this.getState(), extent: this.calculateExtent() }
  }
  getZoom() {
    let t
    const e = this.getResolution()
    return e !== void 0 && (t = this.getZoomForResolution(e)), t
  }
  getZoomForResolution(t) {
    let e = this.minZoom_ || 0,
      i,
      n
    if (this.resolutions_) {
      const r = no(this.resolutions_, t, 1)
      ;(e = r),
        (i = this.resolutions_[r]),
        r == this.resolutions_.length - 1
          ? (n = 2)
          : (n = i / this.resolutions_[r + 1])
    } else (i = this.maxResolution_), (n = this.zoomFactor_)
    return e + Math.log(i / t) / Math.log(n)
  }
  getResolutionForZoom(t) {
    if (this.resolutions_) {
      if (this.resolutions_.length <= 1) return 0
      const e = mt(Math.floor(t), 0, this.resolutions_.length - 2),
        i = this.resolutions_[e] / this.resolutions_[e + 1]
      return this.resolutions_[e] / Math.pow(i, mt(t - e, 0, 1))
    }
    return this.maxResolution_ / Math.pow(this.zoomFactor_, t - this.minZoom_)
  }
  fit(t, e) {
    let i
    if (
      (J(
        Array.isArray(t) || typeof t.getSimplifiedGeometry == "function",
        "Invalid extent or geometry provided as `geometry`",
      ),
      Array.isArray(t))
    ) {
      J(!Ns(t), "Cannot fit empty extent provided as `geometry`")
      const n = ui(t, this.getProjection())
      i = ua(n)
    } else if (t.getType() === "Circle") {
      const n = ui(t.getExtent(), this.getProjection())
      ;(i = ua(n)), i.rotate(this.getRotation(), ti(n))
    } else i = t
    this.fitInternal(i, e)
  }
  rotatedExtentForGeometry(t) {
    const e = this.getRotation(),
      i = Math.cos(e),
      n = Math.sin(-e),
      r = t.getFlatCoordinates(),
      o = t.getStride()
    let a = 1 / 0,
      l = 1 / 0,
      h = -1 / 0,
      c = -1 / 0
    for (let u = 0, d = r.length; u < d; u += o) {
      const f = r[u] * i - r[u + 1] * n,
        g = r[u] * n + r[u + 1] * i
      ;(a = Math.min(a, f)),
        (l = Math.min(l, g)),
        (h = Math.max(h, f)),
        (c = Math.max(c, g))
    }
    return [a, l, h, c]
  }
  fitInternal(t, e) {
    e = e || {}
    let i = e.size
    i || (i = this.getViewportSizeMinusPadding_())
    const n = e.padding !== void 0 ? e.padding : [0, 0, 0, 0],
      r = e.nearest !== void 0 ? e.nearest : !1
    let o
    e.minResolution !== void 0
      ? (o = e.minResolution)
      : e.maxZoom !== void 0
        ? (o = this.getResolutionForZoom(e.maxZoom))
        : (o = 0)
    const a = this.rotatedExtentForGeometry(t)
    let l = this.getResolutionForExtentInternal(a, [
      i[0] - n[1] - n[3],
      i[1] - n[0] - n[2],
    ])
    ;(l = isNaN(l) ? o : Math.max(l, o)),
      (l = this.getConstrainedResolution(l, r ? 0 : 1))
    const h = this.getRotation(),
      c = Math.sin(h),
      u = Math.cos(h),
      d = ti(a)
    ;(d[0] += ((n[1] - n[3]) / 2) * l), (d[1] += ((n[0] - n[2]) / 2) * l)
    const f = d[0] * u - d[1] * c,
      g = d[1] * u + d[0] * c,
      _ = this.getConstrainedCenter([f, g], l),
      m = e.callback ? e.callback : Ui
    e.duration !== void 0
      ? this.animateInternal(
          { resolution: l, center: _, duration: e.duration, easing: e.easing },
          m,
        )
      : ((this.targetResolution_ = l),
        (this.targetCenter_ = _),
        this.applyTargetState_(!1, !0),
        ns(m, !0))
  }
  centerOn(t, e, i) {
    this.centerOnInternal(Re(t, this.getProjection()), e, i)
  }
  centerOnInternal(t, e, i) {
    this.setCenterInternal(
      mr(t, e, i, this.getResolution(), this.getRotation()),
    )
  }
  calculateCenterShift(t, e, i, n) {
    let r
    const o = this.padding_
    if (o && t) {
      const a = this.getViewportSizeMinusPadding_(-i),
        l = mr(t, n, [a[0] / 2 + o[3], a[1] / 2 + o[0]], e, i)
      r = [t[0] - l[0], t[1] - l[1]]
    }
    return r
  }
  isDef() {
    return !!this.getCenterInternal() && this.getResolution() !== void 0
  }
  adjustCenter(t) {
    const e = Gr(this.targetCenter_, this.getProjection())
    this.setCenter([e[0] + t[0], e[1] + t[1]])
  }
  adjustCenterInternal(t) {
    const e = this.targetCenter_
    this.setCenterInternal([e[0] + t[0], e[1] + t[1]])
  }
  adjustResolution(t, e) {
    ;(e = e && Re(e, this.getProjection())), this.adjustResolutionInternal(t, e)
  }
  adjustResolutionInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(),
      n = this.getViewportSize_(this.getRotation()),
      r = this.constraints_.resolution(this.targetResolution_ * t, 0, n, i)
    e && (this.targetCenter_ = this.calculateCenterZoom(r, e)),
      (this.targetResolution_ *= t),
      this.applyTargetState_()
  }
  adjustZoom(t, e) {
    this.adjustResolution(Math.pow(this.zoomFactor_, -t), e)
  }
  adjustRotation(t, e) {
    e && (e = Re(e, this.getProjection())), this.adjustRotationInternal(t, e)
  }
  adjustRotationInternal(t, e) {
    const i = this.getAnimating() || this.getInteracting(),
      n = this.constraints_.rotation(this.targetRotation_ + t, i)
    e && (this.targetCenter_ = this.calculateCenterRotate(n, e)),
      (this.targetRotation_ += t),
      this.applyTargetState_()
  }
  setCenter(t) {
    this.setCenterInternal(t && Re(t, this.getProjection()))
  }
  setCenterInternal(t) {
    ;(this.targetCenter_ = t), this.applyTargetState_()
  }
  setHint(t, e) {
    return (this.hints_[t] += e), this.changed(), this.hints_[t]
  }
  setResolution(t) {
    ;(this.targetResolution_ = t), this.applyTargetState_()
  }
  setRotation(t) {
    ;(this.targetRotation_ = t), this.applyTargetState_()
  }
  setZoom(t) {
    this.setResolution(this.getResolutionForZoom(t))
  }
  applyTargetState_(t, e) {
    const i = this.getAnimating() || this.getInteracting() || e,
      n = this.constraints_.rotation(this.targetRotation_, i),
      r = this.getViewportSize_(n),
      o = this.constraints_.resolution(this.targetResolution_, 0, r, i),
      a = this.constraints_.center(
        this.targetCenter_,
        o,
        r,
        i,
        this.calculateCenterShift(this.targetCenter_, o, n, r),
      )
    this.get(ee.ROTATION) !== n && this.set(ee.ROTATION, n),
      this.get(ee.RESOLUTION) !== o &&
        (this.set(ee.RESOLUTION, o), this.set("zoom", this.getZoom(), !0)),
      (!a || !this.get(ee.CENTER) || !gs(this.get(ee.CENTER), a)) &&
        this.set(ee.CENTER, a),
      this.getAnimating() && !t && this.cancelAnimations(),
      (this.cancelAnchor_ = void 0)
  }
  resolveConstraints(t, e, i) {
    t = t !== void 0 ? t : 200
    const n = e || 0,
      r = this.constraints_.rotation(this.targetRotation_),
      o = this.getViewportSize_(r),
      a = this.constraints_.resolution(this.targetResolution_, n, o),
      l = this.constraints_.center(
        this.targetCenter_,
        a,
        o,
        !1,
        this.calculateCenterShift(this.targetCenter_, a, r, o),
      )
    if (t === 0 && !this.cancelAnchor_) {
      ;(this.targetResolution_ = a),
        (this.targetRotation_ = r),
        (this.targetCenter_ = l),
        this.applyTargetState_()
      return
    }
    ;(i = i || (t === 0 ? this.cancelAnchor_ : void 0)),
      (this.cancelAnchor_ = void 0),
      (this.getResolution() !== a ||
        this.getRotation() !== r ||
        !this.getCenterInternal() ||
        !gs(this.getCenterInternal(), l)) &&
        (this.getAnimating() && this.cancelAnimations(),
        this.animateInternal({
          rotation: r,
          center: l,
          resolution: a,
          duration: t,
          easing: qi,
          anchor: i,
        }))
  }
  beginInteraction() {
    this.resolveConstraints(0), this.setHint(It.INTERACTING, 1)
  }
  endInteraction(t, e, i) {
    ;(i = i && Re(i, this.getProjection())),
      this.endInteractionInternal(t, e, i)
  }
  endInteractionInternal(t, e, i) {
    this.getInteracting() &&
      (this.setHint(It.INTERACTING, -1), this.resolveConstraints(t, e, i))
  }
  getConstrainedCenter(t, e) {
    const i = this.getViewportSize_(this.getRotation())
    return this.constraints_.center(t, e || this.getResolution(), i)
  }
  getConstrainedZoom(t, e) {
    const i = this.getResolutionForZoom(t)
    return this.getZoomForResolution(this.getConstrainedResolution(i, e))
  }
  getConstrainedResolution(t, e) {
    e = e || 0
    const i = this.getViewportSize_(this.getRotation())
    return this.constraints_.resolution(t, e, i)
  }
}
function ns(s, t) {
  setTimeout(function () {
    s(t)
  }, 0)
}
function Nu(s) {
  if (s.extent !== void 0) {
    const e =
      s.smoothExtentConstraint !== void 0 ? s.smoothExtentConstraint : !0
    return Ca(s.extent, s.constrainOnlyCenter, e)
  }
  const t = co(s.projection, "EPSG:3857")
  if (s.multiWorld !== !0 && t.isGlobal()) {
    const e = t.getExtent().slice()
    return (e[0] = -1 / 0), (e[2] = 1 / 0), Ca(e, !1, !1)
  }
  return Lu
}
function ku(s) {
  let t,
    e,
    i,
    o = s.minZoom !== void 0 ? s.minZoom : _r,
    a = s.maxZoom !== void 0 ? s.maxZoom : 28
  const l = s.zoomFactor !== void 0 ? s.zoomFactor : 2,
    h = s.multiWorld !== void 0 ? s.multiWorld : !1,
    c =
      s.smoothResolutionConstraint !== void 0
        ? s.smoothResolutionConstraint
        : !0,
    u = s.showFullExtent !== void 0 ? s.showFullExtent : !1,
    d = co(s.projection, "EPSG:3857"),
    f = d.getExtent()
  let g = s.constrainOnlyCenter,
    _ = s.extent
  if (
    (!h && !_ && d.isGlobal() && ((g = !1), (_ = f)), s.resolutions !== void 0)
  ) {
    const m = s.resolutions
    ;(e = m[o]),
      (i = m[a] !== void 0 ? m[a] : m[m.length - 1]),
      s.constrainResolution
        ? (t = Au(m, c, !g && _, u))
        : (t = wa(e, i, c, !g && _, u))
  } else {
    const p =
        (f
          ? Math.max(rt(f), vt(f))
          : (360 * Tn.degrees) / d.getMetersPerUnit()) /
        vo /
        Math.pow(2, _r),
      y = p / Math.pow(2, 28 - _r)
    ;(e = s.maxResolution),
      e !== void 0 ? (o = 0) : (e = p / Math.pow(l, o)),
      (i = s.minResolution),
      i === void 0 &&
        (s.maxZoom !== void 0
          ? s.maxResolution !== void 0
            ? (i = e / Math.pow(l, a))
            : (i = p / Math.pow(l, a))
          : (i = y)),
      (a = o + Math.floor(Math.log(e / i) / Math.log(l))),
      (i = e / Math.pow(l, a - o)),
      s.constrainResolution
        ? (t = Mu(l, e, i, c, !g && _, u))
        : (t = wa(e, i, c, !g && _, u))
  }
  return {
    constraint: t,
    maxResolution: e,
    minResolution: i,
    minZoom: o,
    zoomFactor: l,
  }
}
function Gu(s) {
  if (s.enableRotation !== void 0 ? s.enableRotation : !0) {
    const e = s.constrainRotation
    return e === void 0 || e === !0
      ? Fu()
      : e === !1
        ? Ra
        : typeof e == "number"
          ? Pu(e)
          : Ra
  }
  return Mo
}
function zu(s) {
  return !(
    (s.sourceCenter && s.targetCenter && !gs(s.sourceCenter, s.targetCenter)) ||
    s.sourceResolution !== s.targetResolution ||
    s.sourceRotation !== s.targetRotation
  )
}
function mr(s, t, e, i, n) {
  const r = Math.cos(-n)
  let o = Math.sin(-n),
    a = s[0] * r - s[1] * o,
    l = s[1] * r + s[0] * o
  ;(a += (t[0] / 2 - e[0]) * i), (l += (e[1] - t[1] / 2) * i), (o = -o)
  const h = a * r - l * o,
    c = l * r + a * o
  return [h, c]
}
const he = Du
class Vs extends Gl {
  constructor(t) {
    const e = Object.assign({}, t)
    delete e.source,
      super(e),
      this.on,
      this.once,
      this.un,
      (this.mapPrecomposeKey_ = null),
      (this.mapRenderKey_ = null),
      (this.sourceChangeKey_ = null),
      (this.renderer_ = null),
      (this.sourceReady_ = !1),
      (this.rendered = !1),
      t.render && (this.render = t.render),
      t.map && this.setMap(t.map),
      this.addChangeListener(st.SOURCE, this.handleSourcePropertyChange_)
    const i = t.source ? t.source : null
    this.setSource(i)
  }
  getLayersArray(t) {
    return (t = t || []), t.push(this), t
  }
  getLayerStatesArray(t) {
    return (t = t || []), t.push(this.getLayerState()), t
  }
  getSource() {
    return this.get(st.SOURCE) || null
  }
  getRenderSource() {
    return this.getSource()
  }
  getSourceState() {
    const t = this.getSource()
    return t ? t.getState() : "undefined"
  }
  handleSourceChange_() {
    this.changed(),
      !(this.sourceReady_ || this.getSource().getState() !== "ready") &&
        ((this.sourceReady_ = !0), this.dispatchEvent("sourceready"))
  }
  handleSourcePropertyChange_() {
    this.sourceChangeKey_ &&
      (lt(this.sourceChangeKey_), (this.sourceChangeKey_ = null)),
      (this.sourceReady_ = !1)
    const t = this.getSource()
    t &&
      ((this.sourceChangeKey_ = H(t, U.CHANGE, this.handleSourceChange_, this)),
      t.getState() === "ready" &&
        ((this.sourceReady_ = !0),
        setTimeout(() => {
          this.dispatchEvent("sourceready")
        }, 0))),
      this.changed()
  }
  getFeatures(t) {
    return this.renderer_ ? this.renderer_.getFeatures(t) : Promise.resolve([])
  }
  getData(t) {
    return !this.renderer_ || !this.rendered ? null : this.renderer_.getData(t)
  }
  isVisible(t) {
    let e
    const i = this.getMapInternal()
    !t && i && (t = i.getView()),
      t instanceof he
        ? (e = { viewState: t.getState(), extent: t.calculateExtent() })
        : (e = t),
      !e.layerStatesArray &&
        i &&
        (e.layerStatesArray = i.getLayerGroup().getLayerStatesArray())
    let n
    e.layerStatesArray
      ? (n = e.layerStatesArray.find(o => o.layer === this))
      : (n = this.getLayerState())
    const r = this.getExtent()
    return Po(n, e.viewState) && (!r || Nt(r, e.extent))
  }
  getAttributions(t) {
    if (!this.isVisible(t)) return []
    let e
    const i = this.getSource()
    if ((i && (e = i.getAttributions()), !e)) return []
    const n = t instanceof he ? t.getViewStateAndExtent() : t
    let r = e(n)
    return Array.isArray(r) || (r = [r]), r
  }
  render(t, e) {
    const i = this.getRenderer()
    return i.prepareFrame(t)
      ? ((this.rendered = !0), i.renderFrame(t, e))
      : null
  }
  unrender() {
    this.rendered = !1
  }
  getDeclutter() {}
  renderDeclutter(t, e) {}
  renderDeferred(t) {
    const e = this.getRenderer()
    e && e.renderDeferred(t)
  }
  setMapInternal(t) {
    t || this.unrender(), this.set(st.MAP, t)
  }
  getMapInternal() {
    return this.get(st.MAP)
  }
  setMap(t) {
    this.mapPrecomposeKey_ &&
      (lt(this.mapPrecomposeKey_), (this.mapPrecomposeKey_ = null)),
      t || this.changed(),
      this.mapRenderKey_ &&
        (lt(this.mapRenderKey_), (this.mapRenderKey_ = null)),
      t &&
        ((this.mapPrecomposeKey_ = H(
          t,
          Ht.PRECOMPOSE,
          function (e) {
            const n = e.frameState.layerStatesArray,
              r = this.getLayerState(!1)
            J(
              !n.some(function (o) {
                return o.layer === r.layer
              }),
              "A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both.",
            ),
              n.push(r)
          },
          this,
        )),
        (this.mapRenderKey_ = H(this, U.CHANGE, t.render, t)),
        this.changed())
  }
  setSource(t) {
    this.set(st.SOURCE, t)
  }
  getRenderer() {
    return (
      this.renderer_ || (this.renderer_ = this.createRenderer()), this.renderer_
    )
  }
  hasRenderer() {
    return !!this.renderer_
  }
  createRenderer() {
    return null
  }
  disposeInternal() {
    this.renderer_ && (this.renderer_.dispose(), delete this.renderer_),
      this.setSource(null),
      super.disposeInternal()
  }
}
function Po(s, t) {
  if (!s.visible) return !1
  const e = t.resolution
  if (e < s.minResolution || e >= s.maxResolution) return !1
  const i = t.zoom
  return i > s.minZoom && i <= s.maxZoom
}
function Yu(s, t, e, i, n) {
  Yl(s, t, e || 0, i || s.length - 1, n || Xu)
}
function Yl(s, t, e, i, n) {
  for (; i > e; ) {
    if (i - e > 600) {
      var r = i - e + 1,
        o = t - e + 1,
        a = Math.log(r),
        l = 0.5 * Math.exp((2 * a) / 3),
        h = 0.5 * Math.sqrt((a * l * (r - l)) / r) * (o - r / 2 < 0 ? -1 : 1),
        c = Math.max(e, Math.floor(t - (o * l) / r + h)),
        u = Math.min(i, Math.floor(t + ((r - o) * l) / r + h))
      Yl(s, t, c, u, n)
    }
    var d = s[t],
      f = e,
      g = i
    for (hn(s, e, t), n(s[i], d) > 0 && hn(s, e, i); f < g; ) {
      for (hn(s, f, g), f++, g--; n(s[f], d) < 0; ) f++
      for (; n(s[g], d) > 0; ) g--
    }
    n(s[e], d) === 0 ? hn(s, e, g) : (g++, hn(s, g, i)),
      g <= t && (e = g + 1),
      t <= g && (i = g - 1)
  }
}
function hn(s, t, e) {
  var i = s[t]
  ;(s[t] = s[e]), (s[e] = i)
}
function Xu(s, t) {
  return s < t ? -1 : s > t ? 1 : 0
}
let Xl = class {
  constructor(t = 9) {
    ;(this._maxEntries = Math.max(4, t)),
      (this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4))),
      this.clear()
  }
  all() {
    return this._all(this.data, [])
  }
  search(t) {
    let e = this.data
    const i = []
    if (!rs(t, e)) return i
    const n = this.toBBox,
      r = []
    for (; e; ) {
      for (let o = 0; o < e.children.length; o++) {
        const a = e.children[o],
          l = e.leaf ? n(a) : a
        rs(t, l) &&
          (e.leaf ? i.push(a) : yr(t, l) ? this._all(a, i) : r.push(a))
      }
      e = r.pop()
    }
    return i
  }
  collides(t) {
    let e = this.data
    if (!rs(t, e)) return !1
    const i = []
    for (; e; ) {
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n],
          o = e.leaf ? this.toBBox(r) : r
        if (rs(t, o)) {
          if (e.leaf || yr(t, o)) return !0
          i.push(r)
        }
      }
      e = i.pop()
    }
    return !1
  }
  load(t) {
    if (!(t && t.length)) return this
    if (t.length < this._minEntries) {
      for (let i = 0; i < t.length; i++) this.insert(t[i])
      return this
    }
    let e = this._build(t.slice(), 0, t.length - 1, 0)
    if (!this.data.children.length) this.data = e
    else if (this.data.height === e.height) this._splitRoot(this.data, e)
    else {
      if (this.data.height < e.height) {
        const i = this.data
        ;(this.data = e), (e = i)
      }
      this._insert(e, this.data.height - e.height - 1, !0)
    }
    return this
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this
  }
  clear() {
    return (this.data = Fi([])), this
  }
  remove(t, e) {
    if (!t) return this
    let i = this.data
    const n = this.toBBox(t),
      r = [],
      o = []
    let a, l, h
    for (; i || r.length; ) {
      if (
        (i || ((i = r.pop()), (l = r[r.length - 1]), (a = o.pop()), (h = !0)),
        i.leaf)
      ) {
        const c = Uu(t, i.children, e)
        if (c !== -1)
          return i.children.splice(c, 1), r.push(i), this._condense(r), this
      }
      !h && !i.leaf && yr(i, n)
        ? (r.push(i), o.push(a), (a = 0), (l = i), (i = i.children[0]))
        : l
          ? (a++, (i = l.children[a]), (h = !1))
          : (i = null)
    }
    return this
  }
  toBBox(t) {
    return t
  }
  compareMinX(t, e) {
    return t.minX - e.minX
  }
  compareMinY(t, e) {
    return t.minY - e.minY
  }
  toJSON() {
    return this.data
  }
  fromJSON(t) {
    return (this.data = t), this
  }
  _all(t, e) {
    const i = []
    for (; t; )
      t.leaf ? e.push(...t.children) : i.push(...t.children), (t = i.pop())
    return e
  }
  _build(t, e, i, n) {
    const r = i - e + 1
    let o = this._maxEntries,
      a
    if (r <= o) return (a = Fi(t.slice(e, i + 1))), vi(a, this.toBBox), a
    n ||
      ((n = Math.ceil(Math.log(r) / Math.log(o))),
      (o = Math.ceil(r / Math.pow(o, n - 1)))),
      (a = Fi([])),
      (a.leaf = !1),
      (a.height = n)
    const l = Math.ceil(r / o),
      h = l * Math.ceil(Math.sqrt(o))
    Sa(t, e, i, h, this.compareMinX)
    for (let c = e; c <= i; c += h) {
      const u = Math.min(c + h - 1, i)
      Sa(t, c, u, l, this.compareMinY)
      for (let d = c; d <= u; d += l) {
        const f = Math.min(d + l - 1, u)
        a.children.push(this._build(t, d, f, n - 1))
      }
    }
    return vi(a, this.toBBox), a
  }
  _chooseSubtree(t, e, i, n) {
    for (; n.push(e), !(e.leaf || n.length - 1 === i); ) {
      let r = 1 / 0,
        o = 1 / 0,
        a
      for (let l = 0; l < e.children.length; l++) {
        const h = e.children[l],
          c = pr(h),
          u = Bu(t, h) - c
        u < o
          ? ((o = u), (r = c < r ? c : r), (a = h))
          : u === o && c < r && ((r = c), (a = h))
      }
      e = a || e.children[0]
    }
    return e
  }
  _insert(t, e, i) {
    const n = i ? t : this.toBBox(t),
      r = [],
      o = this._chooseSubtree(n, this.data, e, r)
    for (
      o.children.push(t), dn(o, n);
      e >= 0 && r[e].children.length > this._maxEntries;

    )
      this._split(r, e), e--
    this._adjustParentBBoxes(n, r, e)
  }
  _split(t, e) {
    const i = t[e],
      n = i.children.length,
      r = this._minEntries
    this._chooseSplitAxis(i, r, n)
    const o = this._chooseSplitIndex(i, r, n),
      a = Fi(i.children.splice(o, i.children.length - o))
    ;(a.height = i.height),
      (a.leaf = i.leaf),
      vi(i, this.toBBox),
      vi(a, this.toBBox),
      e ? t[e - 1].children.push(a) : this._splitRoot(i, a)
  }
  _splitRoot(t, e) {
    ;(this.data = Fi([t, e])),
      (this.data.height = t.height + 1),
      (this.data.leaf = !1),
      vi(this.data, this.toBBox)
  }
  _chooseSplitIndex(t, e, i) {
    let n,
      r = 1 / 0,
      o = 1 / 0
    for (let a = e; a <= i - e; a++) {
      const l = un(t, 0, a, this.toBBox),
        h = un(t, a, i, this.toBBox),
        c = Ku(l, h),
        u = pr(l) + pr(h)
      c < r
        ? ((r = c), (n = a), (o = u < o ? u : o))
        : c === r && u < o && ((o = u), (n = a))
    }
    return n || i - e
  }
  _chooseSplitAxis(t, e, i) {
    const n = t.leaf ? this.compareMinX : Wu,
      r = t.leaf ? this.compareMinY : Zu,
      o = this._allDistMargin(t, e, i, n),
      a = this._allDistMargin(t, e, i, r)
    o < a && t.children.sort(n)
  }
  _allDistMargin(t, e, i, n) {
    t.children.sort(n)
    const r = this.toBBox,
      o = un(t, 0, e, r),
      a = un(t, i - e, i, r)
    let l = ss(o) + ss(a)
    for (let h = e; h < i - e; h++) {
      const c = t.children[h]
      dn(o, t.leaf ? r(c) : c), (l += ss(o))
    }
    for (let h = i - e - 1; h >= e; h--) {
      const c = t.children[h]
      dn(a, t.leaf ? r(c) : c), (l += ss(a))
    }
    return l
  }
  _adjustParentBBoxes(t, e, i) {
    for (let n = i; n >= 0; n--) dn(e[n], t)
  }
  _condense(t) {
    for (let e = t.length - 1, i; e >= 0; e--)
      t[e].children.length === 0
        ? e > 0
          ? ((i = t[e - 1].children), i.splice(i.indexOf(t[e]), 1))
          : this.clear()
        : vi(t[e], this.toBBox)
  }
}
function Uu(s, t, e) {
  if (!e) return t.indexOf(s)
  for (let i = 0; i < t.length; i++) if (e(s, t[i])) return i
  return -1
}
function vi(s, t) {
  un(s, 0, s.children.length, t, s)
}
function un(s, t, e, i, n) {
  n || (n = Fi(null)),
    (n.minX = 1 / 0),
    (n.minY = 1 / 0),
    (n.maxX = -1 / 0),
    (n.maxY = -1 / 0)
  for (let r = t; r < e; r++) {
    const o = s.children[r]
    dn(n, s.leaf ? i(o) : o)
  }
  return n
}
function dn(s, t) {
  return (
    (s.minX = Math.min(s.minX, t.minX)),
    (s.minY = Math.min(s.minY, t.minY)),
    (s.maxX = Math.max(s.maxX, t.maxX)),
    (s.maxY = Math.max(s.maxY, t.maxY)),
    s
  )
}
function Wu(s, t) {
  return s.minX - t.minX
}
function Zu(s, t) {
  return s.minY - t.minY
}
function pr(s) {
  return (s.maxX - s.minX) * (s.maxY - s.minY)
}
function ss(s) {
  return s.maxX - s.minX + (s.maxY - s.minY)
}
function Bu(s, t) {
  return (
    (Math.max(t.maxX, s.maxX) - Math.min(t.minX, s.minX)) *
    (Math.max(t.maxY, s.maxY) - Math.min(t.minY, s.minY))
  )
}
function Ku(s, t) {
  const e = Math.max(s.minX, t.minX),
    i = Math.max(s.minY, t.minY),
    n = Math.min(s.maxX, t.maxX),
    r = Math.min(s.maxY, t.maxY)
  return Math.max(0, n - e) * Math.max(0, r - i)
}
function yr(s, t) {
  return (
    s.minX <= t.minX && s.minY <= t.minY && t.maxX <= s.maxX && t.maxY <= s.maxY
  )
}
function rs(s, t) {
  return (
    t.minX <= s.maxX && t.minY <= s.maxY && t.maxX >= s.minX && t.maxY >= s.minY
  )
}
function Fi(s) {
  return {
    children: s,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0,
  }
}
function Sa(s, t, e, i, n) {
  const r = [t, e]
  for (; r.length; ) {
    if (((e = r.pop()), (t = r.pop()), e - t <= i)) continue
    const o = t + Math.ceil((e - t) / i / 2) * i
    Yu(s, o, t, e, n), r.push(t, o, o, e)
  }
}
function Ta(s, t, e, i) {
  return e !== void 0 && i !== void 0
    ? [e / s, i / t]
    : e !== void 0
      ? e / s
      : i !== void 0
        ? i / t
        : 1
}
class Fo extends Ws {
  constructor(t) {
    t = t || {}
    const e = t.opacity !== void 0 ? t.opacity : 1,
      i = t.rotation !== void 0 ? t.rotation : 0,
      n = t.scale !== void 0 ? t.scale : 1,
      r = t.rotateWithView !== void 0 ? t.rotateWithView : !1
    super({
      opacity: e,
      rotation: i,
      scale: n,
      displacement: t.displacement !== void 0 ? t.displacement : [0, 0],
      rotateWithView: r,
      declutterMode: t.declutterMode,
    }),
      (this.anchor_ = t.anchor !== void 0 ? t.anchor : [0.5, 0.5]),
      (this.normalizedAnchor_ = null),
      (this.anchorOrigin_ =
        t.anchorOrigin !== void 0 ? t.anchorOrigin : "top-left"),
      (this.anchorXUnits_ =
        t.anchorXUnits !== void 0 ? t.anchorXUnits : "fraction"),
      (this.anchorYUnits_ =
        t.anchorYUnits !== void 0 ? t.anchorYUnits : "fraction"),
      (this.crossOrigin_ = t.crossOrigin !== void 0 ? t.crossOrigin : null)
    const o = t.img !== void 0 ? t.img : null
    let a = t.src
    J(
      !(a !== void 0 && o),
      "`image` and `src` cannot be provided at the same time",
    ),
      (a === void 0 || a.length === 0) && o && (a = o.src || it(o)),
      J(
        a !== void 0 && a.length > 0,
        "A defined and non-empty `src` or `image` must be provided",
      ),
      J(
        !((t.width !== void 0 || t.height !== void 0) && t.scale !== void 0),
        "`width` or `height` cannot be provided together with `scale`",
      )
    let l
    if (
      (t.src !== void 0
        ? (l = X.IDLE)
        : o !== void 0 &&
          (o instanceof HTMLImageElement
            ? o.complete
              ? (l = o.src ? X.LOADED : X.IDLE)
              : (l = X.LOADING)
            : (l = X.LOADED)),
      (this.color_ = t.color !== void 0 ? Ki(t.color) : null),
      (this.iconImage_ = To(o, a, this.crossOrigin_, l, this.color_)),
      (this.offset_ = t.offset !== void 0 ? t.offset : [0, 0]),
      (this.offsetOrigin_ =
        t.offsetOrigin !== void 0 ? t.offsetOrigin : "top-left"),
      (this.origin_ = null),
      (this.size_ = t.size !== void 0 ? t.size : null),
      t.width !== void 0 || t.height !== void 0)
    ) {
      let h, c
      if (t.size) [h, c] = t.size
      else {
        const u = this.getImage(1)
        if (u.width && u.height) (h = u.width), (c = u.height)
        else if (u instanceof HTMLImageElement) {
          this.initialOptions_ = t
          const d = () => {
            if ((this.unlistenImageChange(d), !this.initialOptions_)) return
            const f = this.iconImage_.getSize()
            this.setScale(Ta(f[0], f[1], t.width, t.height))
          }
          this.listenImageChange(d)
          return
        }
      }
      h !== void 0 && this.setScale(Ta(h, c, t.width, t.height))
    }
  }
  clone() {
    let t, e, i
    return (
      this.initialOptions_
        ? ((e = this.initialOptions_.width), (i = this.initialOptions_.height))
        : ((t = this.getScale()), (t = Array.isArray(t) ? t.slice() : t)),
      new Fo({
        anchor: this.anchor_.slice(),
        anchorOrigin: this.anchorOrigin_,
        anchorXUnits: this.anchorXUnits_,
        anchorYUnits: this.anchorYUnits_,
        color:
          this.color_ && this.color_.slice
            ? this.color_.slice()
            : this.color_ || void 0,
        crossOrigin: this.crossOrigin_,
        offset: this.offset_.slice(),
        offsetOrigin: this.offsetOrigin_,
        opacity: this.getOpacity(),
        rotateWithView: this.getRotateWithView(),
        rotation: this.getRotation(),
        scale: t,
        width: e,
        height: i,
        size: this.size_ !== null ? this.size_.slice() : void 0,
        src: this.getSrc(),
        displacement: this.getDisplacement().slice(),
        declutterMode: this.getDeclutterMode(),
      })
    )
  }
  getAnchor() {
    let t = this.normalizedAnchor_
    if (!t) {
      t = this.anchor_
      const n = this.getSize()
      if (
        this.anchorXUnits_ == "fraction" ||
        this.anchorYUnits_ == "fraction"
      ) {
        if (!n) return null
        ;(t = this.anchor_.slice()),
          this.anchorXUnits_ == "fraction" && (t[0] *= n[0]),
          this.anchorYUnits_ == "fraction" && (t[1] *= n[1])
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!n) return null
        t === this.anchor_ && (t = this.anchor_.slice()),
          (this.anchorOrigin_ == "top-right" ||
            this.anchorOrigin_ == "bottom-right") &&
            (t[0] = -t[0] + n[0]),
          (this.anchorOrigin_ == "bottom-left" ||
            this.anchorOrigin_ == "bottom-right") &&
            (t[1] = -t[1] + n[1])
      }
      this.normalizedAnchor_ = t
    }
    const e = this.getDisplacement(),
      i = this.getScaleArray()
    return [t[0] - e[0] / i[0], t[1] + e[1] / i[1]]
  }
  setAnchor(t) {
    ;(this.anchor_ = t), (this.normalizedAnchor_ = null)
  }
  getColor() {
    return this.color_
  }
  getImage(t) {
    return this.iconImage_.getImage(t)
  }
  getPixelRatio(t) {
    return this.iconImage_.getPixelRatio(t)
  }
  getImageSize() {
    return this.iconImage_.getSize()
  }
  getImageState() {
    return this.iconImage_.getImageState()
  }
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage()
  }
  getOrigin() {
    if (this.origin_) return this.origin_
    let t = this.offset_
    if (this.offsetOrigin_ != "top-left") {
      const e = this.getSize(),
        i = this.iconImage_.getSize()
      if (!e || !i) return null
      ;(t = t.slice()),
        (this.offsetOrigin_ == "top-right" ||
          this.offsetOrigin_ == "bottom-right") &&
          (t[0] = i[0] - e[0] - t[0]),
        (this.offsetOrigin_ == "bottom-left" ||
          this.offsetOrigin_ == "bottom-right") &&
          (t[1] = i[1] - e[1] - t[1])
    }
    return (this.origin_ = t), this.origin_
  }
  getSrc() {
    return this.iconImage_.getSrc()
  }
  getSize() {
    return this.size_ ? this.size_ : this.iconImage_.getSize()
  }
  getWidth() {
    const t = this.getScaleArray()
    if (this.size_) return this.size_[0] * t[0]
    if (this.iconImage_.getImageState() == X.LOADED)
      return this.iconImage_.getSize()[0] * t[0]
  }
  getHeight() {
    const t = this.getScaleArray()
    if (this.size_) return this.size_[1] * t[1]
    if (this.iconImage_.getImageState() == X.LOADED)
      return this.iconImage_.getSize()[1] * t[1]
  }
  setScale(t) {
    delete this.initialOptions_, super.setScale(t)
  }
  listenImageChange(t) {
    this.iconImage_.addEventListener(U.CHANGE, t)
  }
  load() {
    this.iconImage_.load()
  }
  unlistenImageChange(t) {
    this.iconImage_.removeEventListener(U.CHANGE, t)
  }
  ready() {
    return this.iconImage_.ready()
  }
}
const js = Fo
let $i = 0
const Ji = 0,
  dt = 1 << $i++,
  P = 1 << $i++,
  Xt = 1 << $i++,
  xt = 1 << $i++,
  Pe = 1 << $i++,
  St = Math.pow(2, $i) - 1,
  Ul = {
    [dt]: "boolean",
    [P]: "number",
    [Xt]: "string",
    [xt]: "color",
    [Pe]: "number[]",
  },
  Vu = Object.keys(Ul).map(Number).sort(ve)
function At(s) {
  const t = []
  for (const e of Vu) ju(s, e) && t.push(Ul[e])
  return t.length === 0
    ? "untyped"
    : t.length < 3
      ? t.join(" or ")
      : t.slice(0, -1).join(", ") + ", or " + t[t.length - 1]
}
function ju(s, t) {
  return (s & t) === t
}
function ge(s, t) {
  return !!(s & t)
}
function Hs(s, t) {
  return s === t
}
class je {
  constructor(t, e) {
    ;(this.type = t), (this.value = e)
  }
}
class Hu {
  constructor(t, e, ...i) {
    ;(this.type = t), (this.operator = e), (this.args = i)
  }
}
function Wl() {
  return {
    variables: new Set(),
    properties: new Set(),
    featureId: !1,
    geometryType: !1,
    style: {},
  }
}
function qu(s) {
  switch (s) {
    case "string":
      return Xt
    case "color":
      return xt
    case "number":
      return P
    case "boolean":
      return dt
    case "number[]":
      return Pe
    default:
      throw new Error(`Unrecognized type hint: ${s}`)
  }
}
function et(s, t, e) {
  switch (typeof s) {
    case "boolean":
      return new je(dt, s)
    case "number":
      return new je(P, s)
    case "string": {
      let n = Xt
      return su(s) && (n |= xt), Hs(n & e, Ji) || (n &= e), new je(n, s)
    }
  }
  if (!Array.isArray(s))
    throw new Error("Expression must be an array or a primitive value")
  if (s.length === 0) throw new Error("Empty expression")
  if (typeof s[0] == "string") return ld(s, t, e)
  for (const n of s)
    if (typeof n != "number") throw new Error("Expected an array of numbers")
  let i = Pe
  return (
    (s.length === 3 || s.length === 4) && (i |= xt), e && (i &= e), new je(i, s)
  )
}
const w = {
    Get: "get",
    Var: "var",
    Concat: "concat",
    GeometryType: "geometry-type",
    Any: "any",
    All: "all",
    Not: "!",
    Resolution: "resolution",
    Zoom: "zoom",
    Time: "time",
    Equal: "==",
    NotEqual: "!=",
    GreaterThan: ">",
    GreaterThanOrEqualTo: ">=",
    LessThan: "<",
    LessThanOrEqualTo: "<=",
    Multiply: "*",
    Divide: "/",
    Add: "+",
    Subtract: "-",
    Clamp: "clamp",
    Mod: "%",
    Pow: "^",
    Abs: "abs",
    Floor: "floor",
    Ceil: "ceil",
    Round: "round",
    Sin: "sin",
    Cos: "cos",
    Atan: "atan",
    Sqrt: "sqrt",
    Match: "match",
    Between: "between",
    Interpolate: "interpolate",
    Coalesce: "coalesce",
    Case: "case",
    In: "in",
    Number: "number",
    String: "string",
    Array: "array",
    Color: "color",
    Id: "id",
    Band: "band",
    Palette: "palette",
    ToString: "to-string",
  },
  $u = {
    [w.Get]: Y(([s, t]) => (t !== void 0 ? qu(t.value) : St), B(1, 2), Ju),
    [w.Var]: Y(([s]) => s.type, B(1, 1), Qu),
    [w.Id]: Y(P | Xt, cn, td),
    [w.Concat]: Y(Xt, B(2, 1 / 0), $(St)),
    [w.GeometryType]: Y(Xt, cn, ed),
    [w.Resolution]: Y(P, cn),
    [w.Zoom]: Y(P, cn),
    [w.Time]: Y(P, cn),
    [w.Any]: Y(dt, B(2, 1 / 0), $(dt)),
    [w.All]: Y(dt, B(2, 1 / 0), $(dt)),
    [w.Not]: Y(dt, B(1, 1), $(dt)),
    [w.Equal]: Y(dt, B(2, 2), $(St), ze),
    [w.NotEqual]: Y(dt, B(2, 2), $(St), ze),
    [w.GreaterThan]: Y(dt, B(2, 2), $(St), ze),
    [w.GreaterThanOrEqualTo]: Y(dt, B(2, 2), $(St), ze),
    [w.LessThan]: Y(dt, B(2, 2), $(St), ze),
    [w.LessThanOrEqualTo]: Y(dt, B(2, 2), $(St), ze),
    [w.Multiply]: Y(
      s => {
        let t = P | xt
        for (let e = 0; e < s.length; e++) t &= s[e].type
        return t
      },
      B(2, 1 / 0),
      $(P | xt),
      ze,
    ),
    [w.Coalesce]: Y(
      s => {
        let t = St
        for (let e = 1; e < s.length; e += 2) t &= s[e].type
        return (t &= s[s.length - 1].type), t
      },
      B(2, 1 / 0),
      $(St),
      ze,
    ),
    [w.Divide]: Y(P, B(2, 2), $(P)),
    [w.Add]: Y(P, B(2, 1 / 0), $(P)),
    [w.Subtract]: Y(P, B(2, 2), $(P)),
    [w.Clamp]: Y(P, B(3, 3), $(P)),
    [w.Mod]: Y(P, B(2, 2), $(P)),
    [w.Pow]: Y(P, B(2, 2), $(P)),
    [w.Abs]: Y(P, B(1, 1), $(P)),
    [w.Floor]: Y(P, B(1, 1), $(P)),
    [w.Ceil]: Y(P, B(1, 1), $(P)),
    [w.Round]: Y(P, B(1, 1), $(P)),
    [w.Sin]: Y(P, B(1, 1), $(P)),
    [w.Cos]: Y(P, B(1, 1), $(P)),
    [w.Atan]: Y(P, B(1, 2), $(P)),
    [w.Sqrt]: Y(P, B(1, 1), $(P)),
    [w.Match]: Y(
      s => {
        let t = St
        for (let e = 2; e < s.length; e += 2) t &= s[e].type
        return (t &= s[s.length - 1].type), t
      },
      B(4, 1 / 0),
      Ia,
      nd,
    ),
    [w.Between]: Y(dt, B(3, 3), $(P)),
    [w.Interpolate]: Y(
      s => {
        let t = xt | P
        for (let e = 3; e < s.length; e += 2) t &= s[e].type
        return t
      },
      B(6, 1 / 0),
      Ia,
      sd,
    ),
    [w.Case]: Y(
      s => {
        let t = St
        for (let e = 1; e < s.length; e += 2) t &= s[e].type
        return (t &= s[s.length - 1].type), t
      },
      B(3, 1 / 0),
      id,
      rd,
    ),
    [w.In]: Y(dt, B(2, 2), od),
    [w.Number]: Y(P, B(1, 1 / 0), $(St)),
    [w.String]: Y(Xt, B(1, 1 / 0), $(St)),
    [w.Array]: Y(
      s => (s.length === 3 || s.length === 4 ? Pe | xt : Pe),
      B(1, 1 / 0),
      $(P),
    ),
    [w.Color]: Y(xt, B(1, 4), $(P)),
    [w.Band]: Y(P, B(1, 3), $(P)),
    [w.Palette]: Y(xt, B(2, 2), ad),
    [w.ToString]: Y(Xt, B(1, 1), $(dt | P | Xt | xt)),
  }
function Ju(s, t) {
  const e = et(s[1], t)
  if (!(e instanceof je))
    throw new Error("Expected a literal argument for get operation")
  if (typeof e.value != "string")
    throw new Error("Expected a string argument for get operation")
  if ((t.properties.add(e.value), s.length === 3)) {
    const i = et(s[2], t)
    return [e, i]
  }
  return [e]
}
function Qu(s, t, e, i) {
  const n = s[1]
  if (typeof n != "string")
    throw new Error("Expected a string argument for var operation")
  if (
    (t.variables.add(n),
    !("variables" in t.style) || t.style.variables[n] === void 0)
  )
    return [new je(St, n)]
  const r = t.style.variables[n],
    o = et(r, t)
  if (((o.value = n), i && !ge(i, o.type)))
    throw new Error(
      `The variable ${n} has type ${At(o.type)} but the following type was expected: ${At(i)}`,
    )
  return [o]
}
function td(s, t) {
  t.featureId = !0
}
function ed(s, t) {
  t.geometryType = !0
}
function cn(s, t) {
  const e = s[0]
  if (s.length !== 1)
    throw new Error(`Expected no arguments for ${e} operation`)
  return []
}
function B(s, t) {
  return function (e, i) {
    const n = e[0],
      r = e.length - 1
    if (s === t) {
      if (r !== s) {
        const o = s === 1 ? "" : "s"
        throw new Error(`Expected ${s} argument${o} for ${n}, got ${r}`)
      }
    } else if (r < s || r > t) {
      const o = t === 1 / 0 ? `${s} or more` : `${s} to ${t}`
      throw new Error(`Expected ${o} arguments for ${n}, got ${r}`)
    }
  }
}
function $(s) {
  return function (t, e) {
    const i = t[0],
      n = t.length - 1,
      r = new Array(n)
    for (let o = 0; o < n; ++o) {
      const a = et(t[o + 1], e)
      if (!ge(s, a.type)) {
        const l = At(s),
          h = At(a.type)
        throw new Error(
          `Unexpected type for argument ${o} of ${i} operation, got ${l} but expected ${h}`,
        )
      }
      ;(a.type &= s), (r[o] = a)
    }
    return r
  }
}
function ze(s, t, e) {
  const i = s[0],
    n = s.length - 1
  let r = St
  for (let a = 0; a < e.length; ++a) r &= e[a].type
  if (r === Ji)
    throw new Error(
      `No common type could be found for arguments of ${i} operation`,
    )
  const o = new Array(n)
  for (let a = 0; a < n; ++a) o[a] = et(s[a + 1], t, r)
  return o
}
function id(s, t) {
  const e = s[0],
    i = s.length - 1
  if (i % 2 === 0)
    throw new Error(
      `An odd amount of arguments was expected for operation ${e}, got ${JSON.stringify(i)} instead`,
    )
}
function Ia(s, t) {
  const e = s[0],
    i = s.length - 1
  if (i % 2 === 1)
    throw new Error(
      `An even amount of arguments was expected for operation ${e}, got ${JSON.stringify(i)} instead`,
    )
}
function nd(s, t, e, i) {
  const n = s.length - 1
  let o = et(s[1], t).type
  const a = et(s[s.length - 1], t)
  let l = i !== void 0 ? i & a.type : a.type
  const h = new Array(n - 2)
  for (let u = 0; u < n - 2; u += 2) {
    const d = et(s[u + 2], t),
      f = et(s[u + 3], t)
    ;(o &= d.type), (l &= f.type), (h[u] = d), (h[u + 1] = f)
  }
  const c = Xt | P | dt
  if (!ge(c, o))
    throw new Error(
      `Expected an input of type ${At(c)} for the interpolate operation, got ${At(o)} instead`,
    )
  if (Hs(l, Ji))
    throw new Error(
      "Could not find a common output type for the following match operation: " +
        JSON.stringify(s),
    )
  for (let u = 0; u < n - 2; u += 2) {
    const d = et(s[u + 2], t, o),
      f = et(s[u + 3], t, l)
    ;(h[u] = d), (h[u + 1] = f)
  }
  return [et(s[1], t, o), ...h, et(s[s.length - 1], t, l)]
}
function sd(s, t, e, i) {
  const n = s[1]
  let r
  switch (n[0]) {
    case "linear":
      r = 1
      break
    case "exponential":
      if (((r = n[1]), typeof r != "number"))
        throw new Error(
          `Expected a number base for exponential interpolation, got ${JSON.stringify(r)} instead`,
        )
      break
    default:
      r = null
  }
  if (!r) throw new Error(`Invalid interpolation type: ${JSON.stringify(n)}`)
  r = et(r, t)
  let o = et(s[2], t)
  if (!ge(P, o.type))
    throw new Error(
      `Expected an input of type number for the interpolate operation, got ${At(o.type)} instead`,
    )
  o = et(s[2], t, P)
  const a = new Array(s.length - 3)
  for (let l = 0; l < a.length; l += 2) {
    let h = et(s[l + 3], t)
    if (!ge(P, h.type))
      throw new Error(
        `Expected all stop input values in the interpolate operation to be of type number, got ${At(h.type)} at position ${l + 2} instead`,
      )
    let c = et(s[l + 4], t)
    if (!ge(P | xt, c.type))
      throw new Error(
        `Expected all stop output values in the interpolate operation to be a number or color, got ${At(c.type)} at position ${l + 3} instead`,
      )
    ;(h = et(s[l + 3], t, P)),
      (c = et(s[l + 4], t, P | xt)),
      (a[l] = h),
      (a[l + 1] = c)
  }
  return [r, o, ...a]
}
function rd(s, t, e, i) {
  const n = et(s[s.length - 1], t)
  let r = i !== void 0 ? i & n.type : n.type
  const o = new Array(s.length - 1)
  for (let a = 0; a < o.length - 1; a += 2) {
    const l = et(s[a + 1], t),
      h = et(s[a + 2], t)
    if (!ge(dt, l.type))
      throw new Error(
        `Expected all conditions in the case operation to be of type boolean, got ${At(l.type)} at position ${a} instead`,
      )
    ;(r &= h.type), (o[a] = l), (o[a + 1] = h)
  }
  if (Hs(r, Ji))
    throw new Error(
      "Could not find a common output type for the following case operation: " +
        JSON.stringify(s),
    )
  for (let a = 0; a < o.length - 1; a += 2) o[a + 1] = et(s[a + 2], t, r)
  return (o[o.length - 1] = et(s[s.length - 1], t, r)), o
}
function od(s, t) {
  let e = s[2]
  if (!Array.isArray(e))
    throw new Error(
      'The "in" operator was provided a literal value which was not an array as second argument.',
    )
  if (typeof e[0] == "string") {
    if (e[0] !== "literal")
      throw new Error(
        'For the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions.',
      )
    if (!Array.isArray(e[1]))
      throw new Error(
        'The "in" operator was provided a literal value which was not an array as second argument.',
      )
    e = e[1]
  }
  let i = Xt | P
  const n = new Array(e.length)
  for (let o = 0; o < n.length; o++) {
    const a = et(e[o], t)
    ;(i &= a.type), (n[o] = a)
  }
  if (Hs(i, Ji))
    throw new Error(
      "Could not find a common type for the following in operation: " +
        JSON.stringify(s),
    )
  return [et(s[1], t, i), ...n]
}
function ad(s, t) {
  const e = et(s[1], t, P)
  if (e.type !== P)
    throw new Error(
      `The first argument of palette must be an number, got ${At(e.type)} instead`,
    )
  const i = s[2]
  if (!Array.isArray(i))
    throw new Error("The second argument of palette must be an array")
  const n = new Array(i.length)
  for (let r = 0; r < n.length; r++) {
    const o = et(i[r], t, xt)
    if (!(o instanceof je))
      throw new Error(`The palette color at index ${r} must be a literal value`)
    if (!ge(o.type, xt))
      throw new Error(
        `The palette color at index ${r} should be of type color, got ${At(o.type)} instead`,
      )
    n[r] = o
  }
  return [e, ...n]
}
function Y(s, ...t) {
  return function (e, i, n) {
    const r = e[0]
    let o = []
    for (let l = 0; l < t.length; l++) o = t[l](e, i, o, n) || o
    let a = typeof s == "function" ? s(o) : s
    if (n !== void 0) {
      if (!ge(a, n))
        throw new Error(
          `The following expression was expected to return ${At(n)}, but returns ${At(a)} instead: ${JSON.stringify(e)}`,
        )
      a &= n
    }
    if (a === Ji)
      throw new Error(
        `No matching type was found for the following expression: ${JSON.stringify(e)}`,
      )
    return new Hu(a, r, ...o)
  }
}
function ld(s, t, e) {
  const i = s[0],
    n = $u[i]
  if (!n) throw new Error(`Unknown operator: ${i}`)
  return n(s, t, e)
}
function Zl(s) {
  if (!s) return ""
  const t = s.getType()
  switch (t) {
    case "Point":
    case "LineString":
    case "Polygon":
      return t
    case "MultiPoint":
    case "MultiLineString":
    case "MultiPolygon":
      return t.substring(5)
    case "Circle":
      return "Polygon"
    case "GeometryCollection":
      return Zl(s.getGeometries()[0])
    default:
      return ""
  }
}
function Bl() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null,
    geometryType: "",
  }
}
function be(s, t, e) {
  const i = et(s, e)
  if (!ge(t, i.type)) {
    const n = At(t),
      r = At(i.type)
    throw new Error(`Expected expression to be of type ${n}, got ${r}`)
  }
  return re(i)
}
function re(s, t) {
  if (s instanceof je) {
    if (s.type === xt && typeof s.value == "string") {
      const i = Ro(s.value)
      return function () {
        return i
      }
    }
    return function () {
      return s.value
    }
  }
  const e = s.operator
  switch (e) {
    case w.Number:
    case w.String:
    case w.Coalesce:
      return hd(s)
    case w.Get:
    case w.Var:
      return cd(s)
    case w.Id:
      return i => i.featureId
    case w.GeometryType:
      return i => i.geometryType
    case w.Concat: {
      const i = s.args.map(n => re(n))
      return n => "".concat(...i.map(r => r(n).toString()))
    }
    case w.Resolution:
      return i => i.resolution
    case w.Any:
    case w.All:
    case w.Between:
    case w.In:
    case w.Not:
      return dd(s)
    case w.Equal:
    case w.NotEqual:
    case w.LessThan:
    case w.LessThanOrEqualTo:
    case w.GreaterThan:
    case w.GreaterThanOrEqualTo:
      return ud(s)
    case w.Multiply:
    case w.Divide:
    case w.Add:
    case w.Subtract:
    case w.Clamp:
    case w.Mod:
    case w.Pow:
    case w.Abs:
    case w.Floor:
    case w.Ceil:
    case w.Round:
    case w.Sin:
    case w.Cos:
    case w.Atan:
    case w.Sqrt:
      return fd(s)
    case w.Case:
      return gd(s)
    case w.Match:
      return _d(s)
    case w.Interpolate:
      return md(s)
    case w.ToString:
      return pd(s)
    default:
      throw new Error(`Unsupported operator ${e}`)
  }
}
function hd(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i)
  for (let r = 0; r < i; ++r) n[r] = re(s.args[r])
  switch (e) {
    case w.Coalesce:
      return r => {
        for (let o = 0; o < i; ++o) {
          const a = n[o](r)
          if (typeof a < "u" && a !== null) return a
        }
        throw new Error("Expected one of the values to be non-null")
      }
    case w.Number:
    case w.String:
      return r => {
        for (let o = 0; o < i; ++o) {
          const a = n[o](r)
          if (typeof a === e) return a
        }
        throw new Error(`Expected one of the values to be a ${e}`)
      }
    default:
      throw new Error(`Unsupported assertion operator ${e}`)
  }
}
function cd(s, t) {
  const i = s.args[0].value
  switch (s.operator) {
    case w.Get:
      return n => n.properties[i]
    case w.Var:
      return n => n.variables[i]
    default:
      throw new Error(`Unsupported accessor operator ${s.operator}`)
  }
}
function ud(s, t) {
  const e = s.operator,
    i = re(s.args[0]),
    n = re(s.args[1])
  switch (e) {
    case w.Equal:
      return r => i(r) === n(r)
    case w.NotEqual:
      return r => i(r) !== n(r)
    case w.LessThan:
      return r => i(r) < n(r)
    case w.LessThanOrEqualTo:
      return r => i(r) <= n(r)
    case w.GreaterThan:
      return r => i(r) > n(r)
    case w.GreaterThanOrEqualTo:
      return r => i(r) >= n(r)
    default:
      throw new Error(`Unsupported comparison operator ${e}`)
  }
}
function dd(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i)
  for (let r = 0; r < i; ++r) n[r] = re(s.args[r])
  switch (e) {
    case w.Any:
      return r => {
        for (let o = 0; o < i; ++o) if (n[o](r)) return !0
        return !1
      }
    case w.All:
      return r => {
        for (let o = 0; o < i; ++o) if (!n[o](r)) return !1
        return !0
      }
    case w.Between:
      return r => {
        const o = n[0](r),
          a = n[1](r),
          l = n[2](r)
        return o >= a && o <= l
      }
    case w.In:
      return r => {
        const o = n[0](r)
        for (let a = 1; a < i; ++a) if (o === n[a](r)) return !0
        return !1
      }
    case w.Not:
      return r => !n[0](r)
    default:
      throw new Error(`Unsupported logical operator ${e}`)
  }
}
function fd(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i)
  for (let r = 0; r < i; ++r) n[r] = re(s.args[r])
  switch (e) {
    case w.Multiply:
      return r => {
        let o = 1
        for (let a = 0; a < i; ++a) o *= n[a](r)
        return o
      }
    case w.Divide:
      return r => n[0](r) / n[1](r)
    case w.Add:
      return r => {
        let o = 0
        for (let a = 0; a < i; ++a) o += n[a](r)
        return o
      }
    case w.Subtract:
      return r => n[0](r) - n[1](r)
    case w.Clamp:
      return r => {
        const o = n[0](r),
          a = n[1](r)
        if (o < a) return a
        const l = n[2](r)
        return o > l ? l : o
      }
    case w.Mod:
      return r => n[0](r) % n[1](r)
    case w.Pow:
      return r => Math.pow(n[0](r), n[1](r))
    case w.Abs:
      return r => Math.abs(n[0](r))
    case w.Floor:
      return r => Math.floor(n[0](r))
    case w.Ceil:
      return r => Math.ceil(n[0](r))
    case w.Round:
      return r => Math.round(n[0](r))
    case w.Sin:
      return r => Math.sin(n[0](r))
    case w.Cos:
      return r => Math.cos(n[0](r))
    case w.Atan:
      return i === 2
        ? r => Math.atan2(n[0](r), n[1](r))
        : r => Math.atan(n[0](r))
    case w.Sqrt:
      return r => Math.sqrt(n[0](r))
    default:
      throw new Error(`Unsupported numeric operator ${e}`)
  }
}
function gd(s, t) {
  const e = s.args.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) i[n] = re(s.args[n])
  return n => {
    for (let r = 0; r < e - 1; r += 2) if (i[r](n)) return i[r + 1](n)
    return i[e - 1](n)
  }
}
function _d(s, t) {
  const e = s.args.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) i[n] = re(s.args[n])
  return n => {
    const r = i[0](n)
    for (let o = 1; o < e; o += 2) if (r === i[o](n)) return i[o + 1](n)
    return i[e - 1](n)
  }
}
function md(s, t) {
  const e = s.args.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) i[n] = re(s.args[n])
  return n => {
    const r = i[0](n),
      o = i[1](n)
    let a, l
    for (let h = 2; h < e; h += 2) {
      const c = i[h](n)
      let u = i[h + 1](n)
      const d = Array.isArray(u)
      if ((d && (u = iu(u)), c >= o))
        return h === 2 ? u : d ? yd(r, o, a, l, c, u) : fn(r, o, a, l, c, u)
      ;(a = c), (l = u)
    }
    return l
  }
}
function pd(s, t) {
  const e = s.operator,
    i = s.args.length,
    n = new Array(i)
  for (let r = 0; r < i; ++r) n[r] = re(s.args[r])
  switch (e) {
    case w.ToString:
      return r => {
        const o = n[0](r)
        return s.args[0].type === xt ? So(o) : o.toString()
      }
    default:
      throw new Error(`Unsupported convert operator ${e}`)
  }
}
function fn(s, t, e, i, n, r) {
  const o = n - e
  if (o === 0) return i
  const a = t - e,
    l = s === 1 ? a / o : (Math.pow(s, a) - 1) / (Math.pow(s, o) - 1)
  return i + l * (r - i)
}
function yd(s, t, e, i, n, r) {
  if (n - e === 0) return i
  const a = ga(i),
    l = ga(r)
  let h = l[2] - a[2]
  h > 180 ? (h -= 360) : h < -180 && (h += 360)
  const c = [
    fn(s, t, e, a[0], n, l[0]),
    fn(s, t, e, a[1], n, l[1]),
    a[2] + fn(s, t, e, 0, n, h),
    fn(s, t, e, i[3], n, r[3]),
  ]
  return Ll(nu(c))
}
function Ed(s) {
  return !0
}
function xd(s) {
  const t = Wl(),
    e = Cd(s, t),
    i = Bl()
  return function (n, r) {
    if (
      ((i.properties = n.getPropertiesInternal()),
      (i.resolution = r),
      t.featureId)
    ) {
      const o = n.getId()
      o !== void 0 ? (i.featureId = o) : (i.featureId = null)
    }
    return t.geometryType && (i.geometryType = Zl(n.getGeometry())), e(i)
  }
}
function va(s) {
  const t = Wl(),
    e = s.length,
    i = new Array(e)
  for (let o = 0; o < e; ++o) i[o] = Kr(s[o], t)
  const n = Bl(),
    r = new Array(e)
  return function (o, a) {
    if (
      ((n.properties = o.getPropertiesInternal()),
      (n.resolution = a),
      t.featureId)
    ) {
      const h = o.getId()
      h !== void 0 ? (n.featureId = h) : (n.featureId = null)
    }
    let l = 0
    for (let h = 0; h < e; ++h) {
      const c = i[h](n)
      c && ((r[l] = c), (l += 1))
    }
    return (r.length = l), r
  }
}
function Cd(s, t) {
  const e = s.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) {
    const r = s[n],
      o = "filter" in r ? be(r.filter, dt, t) : Ed
    let a
    if (Array.isArray(r.style)) {
      const l = r.style.length
      a = new Array(l)
      for (let h = 0; h < l; ++h) a[h] = Kr(r.style[h], t)
    } else a = [Kr(r.style, t)]
    i[n] = { filter: o, styles: a }
  }
  return function (n) {
    const r = []
    let o = !1
    for (let a = 0; a < e; ++a) {
      const l = i[a].filter
      if (l(n) && !(s[a].else && o)) {
        o = !0
        for (const h of i[a].styles) {
          const c = h(n)
          c && r.push(c)
        }
      }
    }
    return r
  }
}
function Kr(s, t) {
  const e = bn(s, "", t),
    i = Dn(s, "", t),
    n = wd(s, t),
    r = Rd(s, t),
    o = kt(s, "z-index", t)
  if (!e && !i && !n && !r && !Wi(s))
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " +
        JSON.stringify(s),
    )
  const a = new se()
  return function (l) {
    let h = !0
    if (e) {
      const c = e(l)
      c && (h = !1), a.setFill(c)
    }
    if (i) {
      const c = i(l)
      c && (h = !1), a.setStroke(c)
    }
    if (n) {
      const c = n(l)
      c && (h = !1), a.setText(c)
    }
    if (r) {
      const c = r(l)
      c && (h = !1), a.setImage(c)
    }
    return o && a.setZIndex(o(l)), h ? null : a
  }
}
function bn(s, t, e) {
  let i
  if (
    (t + "fill-pattern-src" in s
      ? (i = vd(s, t + "fill-", e))
      : (i = Oo(s, t + "fill-color", e)),
    !i)
  )
    return null
  const n = new Oe()
  return function (r) {
    const o = i(r)
    return o === "none" ? null : (n.setColor(o), n)
  }
}
function Dn(s, t, e) {
  const i = kt(s, t + "stroke-width", e),
    n = Oo(s, t + "stroke-color", e)
  if (!i && !n) return null
  const r = Ie(s, t + "stroke-line-cap", e),
    o = Ie(s, t + "stroke-line-join", e),
    a = Kl(s, t + "stroke-line-dash", e),
    l = kt(s, t + "stroke-line-dash-offset", e),
    h = kt(s, t + "stroke-miter-limit", e),
    c = new ii()
  return function (u) {
    if (n) {
      const d = n(u)
      if (d === "none") return null
      c.setColor(d)
    }
    if ((i && c.setWidth(i(u)), r)) {
      const d = r(u)
      if (d !== "butt" && d !== "round" && d !== "square")
        throw new Error("Expected butt, round, or square line cap")
      c.setLineCap(d)
    }
    if (o) {
      const d = o(u)
      if (d !== "bevel" && d !== "round" && d !== "miter")
        throw new Error("Expected bevel, round, or miter line join")
      c.setLineJoin(d)
    }
    return (
      a && c.setLineDash(a(u)),
      l && c.setLineDashOffset(l(u)),
      h && c.setMiterLimit(h(u)),
      c
    )
  }
}
function wd(s, t) {
  const e = "text-",
    i = Ie(s, e + "value", t)
  if (!i) return null
  const n = bn(s, e, t),
    r = bn(s, e + "background-", t),
    o = Dn(s, e, t),
    a = Dn(s, e + "background-", t),
    l = Ie(s, e + "font", t),
    h = kt(s, e + "max-angle", t),
    c = kt(s, e + "offset-x", t),
    u = kt(s, e + "offset-y", t),
    d = Nn(s, e + "overflow", t),
    f = Ie(s, e + "placement", t),
    g = kt(s, e + "repeat", t),
    _ = qs(s, e + "scale", t),
    m = Nn(s, e + "rotate-with-view", t),
    p = kt(s, e + "rotation", t),
    y = Ie(s, e + "align", t),
    x = Ie(s, e + "justify", t),
    E = Ie(s, e + "baseline", t),
    C = Kl(s, e + "padding", t),
    T = $s(s, e + "declutter-mode"),
    S = new Un({ declutterMode: T })
  return function (R) {
    if (
      (S.setText(i(R)),
      n && S.setFill(n(R)),
      r && S.setBackgroundFill(r(R)),
      o && S.setStroke(o(R)),
      a && S.setBackgroundStroke(a(R)),
      l && S.setFont(l(R)),
      h && S.setMaxAngle(h(R)),
      c && S.setOffsetX(c(R)),
      u && S.setOffsetY(u(R)),
      d && S.setOverflow(d(R)),
      f)
    ) {
      const v = f(R)
      if (v !== "point" && v !== "line")
        throw new Error("Expected point or line for text-placement")
      S.setPlacement(v)
    }
    if (
      (g && S.setRepeat(g(R)),
      _ && S.setScale(_(R)),
      m && S.setRotateWithView(m(R)),
      p && S.setRotation(p(R)),
      y)
    ) {
      const v = y(R)
      if (
        v !== "left" &&
        v !== "center" &&
        v !== "right" &&
        v !== "end" &&
        v !== "start"
      )
        throw new Error(
          "Expected left, right, center, start, or end for text-align",
        )
      S.setTextAlign(v)
    }
    if (x) {
      const v = x(R)
      if (v !== "left" && v !== "right" && v !== "center")
        throw new Error("Expected left, right, or center for text-justify")
      S.setJustify(v)
    }
    if (E) {
      const v = E(R)
      if (
        v !== "bottom" &&
        v !== "top" &&
        v !== "middle" &&
        v !== "alphabetic" &&
        v !== "hanging"
      )
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline",
        )
      S.setTextBaseline(v)
    }
    return C && S.setPadding(C(R)), S
  }
}
function Rd(s, t) {
  return "icon-src" in s
    ? Sd(s, t)
    : "shape-points" in s
      ? Td(s, t)
      : "circle-radius" in s
        ? Id(s, t)
        : null
}
function Sd(s, t) {
  const e = "icon-",
    i = e + "src",
    n = Vl(s[i], i),
    r = xs(s, e + "anchor", t),
    o = qs(s, e + "scale", t),
    a = kt(s, e + "opacity", t),
    l = xs(s, e + "displacement", t),
    h = kt(s, e + "rotation", t),
    c = Nn(s, e + "rotate-with-view", t),
    u = Aa(s, e + "anchor-origin"),
    d = Ma(s, e + "anchor-x-units"),
    f = Ma(s, e + "anchor-y-units"),
    g = Pd(s, e + "color"),
    _ = Ad(s, e + "cross-origin"),
    m = Md(s, e + "offset"),
    p = Aa(s, e + "offset-origin"),
    y = Cs(s, e + "width"),
    x = Cs(s, e + "height"),
    E = Ld(s, e + "size"),
    C = $s(s, e + "declutter-mode"),
    T = new js({
      src: n,
      anchorOrigin: u,
      anchorXUnits: d,
      anchorYUnits: f,
      color: g,
      crossOrigin: _,
      offset: m,
      offsetOrigin: p,
      height: x,
      width: y,
      size: E,
      declutterMode: C,
    })
  return function (S) {
    return (
      a && T.setOpacity(a(S)),
      l && T.setDisplacement(l(S)),
      h && T.setRotation(h(S)),
      c && T.setRotateWithView(c(S)),
      o && T.setScale(o(S)),
      r && T.setAnchor(r(S)),
      T
    )
  }
}
function Td(s, t) {
  const e = "shape-",
    i = e + "points",
    n = e + "radius",
    r = Vr(s[i], i),
    o = Vr(s[n], n),
    a = bn(s, e, t),
    l = Dn(s, e, t),
    h = qs(s, e + "scale", t),
    c = xs(s, e + "displacement", t),
    u = kt(s, e + "rotation", t),
    d = Nn(s, e + "rotate-with-view", t),
    f = Cs(s, e + "radius2"),
    g = Cs(s, e + "angle"),
    _ = $s(s, e + "declutter-mode"),
    m = new Bs({ points: r, radius: o, radius2: f, angle: g, declutterMode: _ })
  return function (p) {
    return (
      a && m.setFill(a(p)),
      l && m.setStroke(l(p)),
      c && m.setDisplacement(c(p)),
      u && m.setRotation(u(p)),
      d && m.setRotateWithView(d(p)),
      h && m.setScale(h(p)),
      m
    )
  }
}
function Id(s, t) {
  const e = "circle-",
    i = bn(s, e, t),
    n = Dn(s, e, t),
    r = kt(s, e + "radius", t),
    o = qs(s, e + "scale", t),
    a = xs(s, e + "displacement", t),
    l = kt(s, e + "rotation", t),
    h = Nn(s, e + "rotate-with-view", t),
    c = $s(s, e + "declutter-mode"),
    u = new Xn({ radius: 5, declutterMode: c })
  return function (d) {
    return (
      r && u.setRadius(r(d)),
      i && u.setFill(i(d)),
      n && u.setStroke(n(d)),
      a && u.setDisplacement(a(d)),
      l && u.setRotation(l(d)),
      h && u.setRotateWithView(h(d)),
      o && u.setScale(o(d)),
      u
    )
  }
}
function kt(s, t, e) {
  if (!(t in s)) return
  const i = be(s[t], P, e)
  return function (n) {
    return Vr(i(n), t)
  }
}
function Ie(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], Xt, e)
  return function (n) {
    return Vl(i(n), t)
  }
}
function vd(s, t, e) {
  const i = Ie(s, t + "pattern-src", e),
    n = La(s, t + "pattern-offset", e),
    r = La(s, t + "pattern-size", e),
    o = Oo(s, t + "color", e)
  return function (a) {
    return { src: i(a), offset: n && n(a), size: r && r(a), color: o && o(a) }
  }
}
function Nn(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], dt, e)
  return function (n) {
    const r = i(n)
    if (typeof r != "boolean") throw new Error(`Expected a boolean for ${t}`)
    return r
  }
}
function Oo(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], xt | Xt, e)
  return function (n) {
    return jl(i(n), t)
  }
}
function Kl(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], Pe, e)
  return function (n) {
    return Wn(i(n), t)
  }
}
function xs(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], Pe, e)
  return function (n) {
    const r = Wn(i(n), t)
    if (r.length !== 2) throw new Error(`Expected two numbers for ${t}`)
    return r
  }
}
function La(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], Pe, e)
  return function (n) {
    return Hl(i(n), t)
  }
}
function qs(s, t, e) {
  if (!(t in s)) return null
  const i = be(s[t], Pe | P, e)
  return function (n) {
    return Fd(i(n), t)
  }
}
function Cs(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (typeof e != "number") throw new Error(`Expected a number for ${t}`)
    return e
  }
}
function Ld(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (typeof e == "number") return Ut(e)
    if (!Array.isArray(e))
      throw new Error(`Expected a number or size array for ${t}`)
    if (e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number")
      throw new Error(`Expected a number or size array for ${t}`)
    return e
  }
}
function Ad(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (typeof e != "string") throw new Error(`Expected a string for ${t}`)
    return e
  }
}
function Aa(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (
      e !== "bottom-left" &&
      e !== "bottom-right" &&
      e !== "top-left" &&
      e !== "top-right"
    )
      throw new Error(
        `Expected bottom-left, bottom-right, top-left, or top-right for ${t}`,
      )
    return e
  }
}
function Ma(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (e !== "pixels" && e !== "fraction")
      throw new Error(`Expected pixels or fraction for ${t}`)
    return e
  }
}
function Md(s, t) {
  const e = s[t]
  if (e !== void 0) return Wn(e, t)
}
function $s(s, t) {
  const e = s[t]
  if (e !== void 0) {
    if (typeof e != "string") throw new Error(`Expected a string for ${t}`)
    if (e !== "declutter" && e !== "obstacle" && e !== "none")
      throw new Error(`Expected declutter, obstacle, or none for ${t}`)
    return e
  }
}
function Pd(s, t) {
  const e = s[t]
  if (e !== void 0) return jl(e, t)
}
function Wn(s, t) {
  if (!Array.isArray(s)) throw new Error(`Expected an array for ${t}`)
  const e = s.length
  for (let i = 0; i < e; ++i)
    if (typeof s[i] != "number")
      throw new Error(`Expected an array of numbers for ${t}`)
  return s
}
function Vl(s, t) {
  if (typeof s != "string") throw new Error(`Expected a string for ${t}`)
  return s
}
function Vr(s, t) {
  if (typeof s != "number") throw new Error(`Expected a number for ${t}`)
  return s
}
function jl(s, t) {
  if (typeof s == "string") return s
  const e = Wn(s, t),
    i = e.length
  if (i < 3 || i > 4)
    throw new Error(`Expected a color with 3 or 4 values for ${t}`)
  return e
}
function Hl(s, t) {
  const e = Wn(s, t)
  if (e.length !== 2)
    throw new Error(`Expected an array of two numbers for ${t}`)
  return e
}
function Fd(s, t) {
  return typeof s == "number" ? s : Hl(s, t)
}
const Pa = { RENDER_ORDER: "renderOrder" }
class ql extends Vs {
  constructor(t) {
    t = t || {}
    const e = Object.assign({}, t)
    delete e.style,
      delete e.renderBuffer,
      delete e.updateWhileAnimating,
      delete e.updateWhileInteracting,
      super(e),
      (this.declutter_ = t.declutter ? String(t.declutter) : void 0),
      (this.renderBuffer_ = t.renderBuffer !== void 0 ? t.renderBuffer : 100),
      (this.style_ = null),
      (this.styleFunction_ = void 0),
      this.setStyle(t.style),
      (this.updateWhileAnimating_ =
        t.updateWhileAnimating !== void 0 ? t.updateWhileAnimating : !1),
      (this.updateWhileInteracting_ =
        t.updateWhileInteracting !== void 0 ? t.updateWhileInteracting : !1)
  }
  getDeclutter() {
    return this.declutter_
  }
  getFeatures(t) {
    return super.getFeatures(t)
  }
  getRenderBuffer() {
    return this.renderBuffer_
  }
  getRenderOrder() {
    return this.get(Pa.RENDER_ORDER)
  }
  getStyle() {
    return this.style_
  }
  getStyleFunction() {
    return this.styleFunction_
  }
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_
  }
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_
  }
  renderDeclutter(t, e) {
    const i = this.getDeclutter()
    i in t.declutter || (t.declutter[i] = new Xl(9)),
      this.getRenderer().renderDeclutter(t, e)
  }
  setRenderOrder(t) {
    this.set(Pa.RENDER_ORDER, t)
  }
  setStyle(t) {
    ;(this.style_ = Od(t)),
      (this.styleFunction_ = t === null ? void 0 : Su(this.style_)),
      this.changed()
  }
}
function Od(s) {
  if (s === void 0) return Tu
  if (!s) return null
  if (typeof s == "function" || s instanceof se) return s
  if (!Array.isArray(s)) return va([s])
  if (s.length === 0) return []
  const t = s.length,
    e = s[0]
  if (e instanceof se) {
    const n = new Array(t)
    for (let r = 0; r < t; ++r) {
      const o = s[r]
      if (!(o instanceof se))
        throw new Error("Expected a list of style instances")
      n[r] = o
    }
    return n
  }
  if ("style" in e) {
    const n = new Array(t)
    for (let r = 0; r < t; ++r) {
      const o = s[r]
      if (!("style" in o))
        throw new Error("Expected a list of rules with a style property")
      n[r] = o
    }
    return xd(n)
  }
  return va(s)
}
const O = {
    BEGIN_GEOMETRY: 0,
    BEGIN_PATH: 1,
    CIRCLE: 2,
    CLOSE_PATH: 3,
    CUSTOM: 4,
    DRAW_CHARS: 5,
    DRAW_IMAGE: 6,
    END_GEOMETRY: 7,
    FILL: 8,
    MOVE_TO_LINE_TO: 9,
    SET_FILL_STYLE: 10,
    SET_STROKE_STYLE: 11,
    STROKE: 12,
  },
  os = [O.FILL],
  He = [O.STROKE],
  gi = [O.BEGIN_PATH],
  Fa = [O.CLOSE_PATH]
class $l {
  drawCustom(t, e, i, n, r) {}
  drawGeometry(t) {}
  setStyle(t) {}
  drawCircle(t, e, i) {}
  drawFeature(t, e, i) {}
  drawGeometryCollection(t, e, i) {}
  drawLineString(t, e, i) {}
  drawMultiLineString(t, e, i) {}
  drawMultiPoint(t, e, i) {}
  drawMultiPolygon(t, e, i) {}
  drawPoint(t, e, i) {}
  drawPolygon(t, e, i) {}
  drawText(t, e, i) {}
  setFillStrokeStyle(t, e) {}
  setImageStyle(t, e) {}
  setTextStyle(t, e) {}
}
class Zn extends $l {
  constructor(t, e, i, n) {
    super(),
      (this.tolerance = t),
      (this.maxExtent = e),
      (this.pixelRatio = n),
      (this.maxLineWidth = 0),
      (this.resolution = i),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_ = null),
      (this.bufferedMaxExtent_ = null),
      (this.instructions = []),
      (this.coordinates = []),
      (this.tmpCoordinate_ = []),
      (this.hitDetectionInstructions = []),
      (this.state = {})
  }
  applyPixelRatio(t) {
    const e = this.pixelRatio
    return e == 1
      ? t
      : t.map(function (i) {
          return i * e
        })
  }
  appendFlatPointCoordinates(t, e) {
    const i = this.getBufferedMaxExtent(),
      n = this.tmpCoordinate_,
      r = this.coordinates
    let o = r.length
    for (let a = 0, l = t.length; a < l; a += e)
      (n[0] = t[a]),
        (n[1] = t[a + 1]),
        Zi(i, n) && ((r[o++] = n[0]), (r[o++] = n[1]))
    return o
  }
  appendFlatLineCoordinates(t, e, i, n, r, o) {
    const a = this.coordinates
    let l = a.length
    const h = this.getBufferedMaxExtent()
    o && (e += n)
    let c = t[e],
      u = t[e + 1]
    const d = this.tmpCoordinate_
    let f = !0,
      g,
      _,
      m
    for (g = e + n; g < i; g += n)
      (d[0] = t[g]),
        (d[1] = t[g + 1]),
        (m = Fr(h, d)),
        m !== _
          ? (f && ((a[l++] = c), (a[l++] = u), (f = !1)),
            (a[l++] = d[0]),
            (a[l++] = d[1]))
          : m === yt.INTERSECTING
            ? ((a[l++] = d[0]), (a[l++] = d[1]), (f = !1))
            : (f = !0),
        (c = d[0]),
        (u = d[1]),
        (_ = m)
    return ((r && f) || g === e + n) && ((a[l++] = c), (a[l++] = u)), l
  }
  drawCustomCoordinates_(t, e, i, n, r) {
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o],
        h = this.appendFlatLineCoordinates(t, e, l, n, !1, !1)
      r.push(h), (e = l)
    }
    return e
  }
  drawCustom(t, e, i, n, r) {
    this.beginGeometry(t, e, r)
    const o = t.getType(),
      a = t.getStride(),
      l = this.coordinates.length
    let h, c, u, d, f
    switch (o) {
      case "MultiPolygon":
        ;(h = t.getOrientedFlatCoordinates()), (d = [])
        const g = t.getEndss()
        f = 0
        for (let _ = 0, m = g.length; _ < m; ++_) {
          const p = []
          ;(f = this.drawCustomCoordinates_(h, f, g[_], a, p)), d.push(p)
        }
        this.instructions.push([O.CUSTOM, l, d, t, i, zr, r]),
          this.hitDetectionInstructions.push([O.CUSTOM, l, d, t, n || i, zr, r])
        break
      case "Polygon":
      case "MultiLineString":
        ;(u = []),
          (h =
            o == "Polygon"
              ? t.getOrientedFlatCoordinates()
              : t.getFlatCoordinates()),
          (f = this.drawCustomCoordinates_(h, 0, t.getEnds(), a, u)),
          this.instructions.push([O.CUSTOM, l, u, t, i, vn, r]),
          this.hitDetectionInstructions.push([O.CUSTOM, l, u, t, n || i, vn, r])
        break
      case "LineString":
      case "Circle":
        ;(h = t.getFlatCoordinates()),
          (c = this.appendFlatLineCoordinates(h, 0, h.length, a, !1, !1)),
          this.instructions.push([O.CUSTOM, l, c, t, i, Ve, r]),
          this.hitDetectionInstructions.push([O.CUSTOM, l, c, t, n || i, Ve, r])
        break
      case "MultiPoint":
        ;(h = t.getFlatCoordinates()),
          (c = this.appendFlatPointCoordinates(h, a)),
          c > l &&
            (this.instructions.push([O.CUSTOM, l, c, t, i, Ve, r]),
            this.hitDetectionInstructions.push([
              O.CUSTOM,
              l,
              c,
              t,
              n || i,
              Ve,
              r,
            ]))
        break
      case "Point":
        ;(h = t.getFlatCoordinates()),
          this.coordinates.push(h[0], h[1]),
          (c = this.coordinates.length),
          this.instructions.push([O.CUSTOM, l, c, t, i, void 0, r]),
          this.hitDetectionInstructions.push([
            O.CUSTOM,
            l,
            c,
            t,
            n || i,
            void 0,
            r,
          ])
        break
    }
    this.endGeometry(e)
  }
  beginGeometry(t, e, i) {
    ;(this.beginGeometryInstruction1_ = [O.BEGIN_GEOMETRY, e, 0, t, i]),
      this.instructions.push(this.beginGeometryInstruction1_),
      (this.beginGeometryInstruction2_ = [O.BEGIN_GEOMETRY, e, 0, t, i]),
      this.hitDetectionInstructions.push(this.beginGeometryInstruction2_)
  }
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates,
    }
  }
  reverseHitDetectionInstructions() {
    const t = this.hitDetectionInstructions
    t.reverse()
    let e
    const i = t.length
    let n,
      r,
      o = -1
    for (e = 0; e < i; ++e)
      (n = t[e]),
        (r = n[0]),
        r == O.END_GEOMETRY
          ? (o = e)
          : r == O.BEGIN_GEOMETRY &&
            ((n[2] = e), Jh(this.hitDetectionInstructions, o, e), (o = -1))
  }
  setFillStrokeStyle(t, e) {
    const i = this.state
    if (t) {
      const n = t.getColor()
      ;(i.fillPatternScale =
        n && typeof n == "object" && "src" in n ? this.pixelRatio : 1),
        (i.fillStyle = fe(n || Dt))
    } else i.fillStyle = void 0
    if (e) {
      const n = e.getColor()
      i.strokeStyle = fe(n || Pn)
      const r = e.getLineCap()
      i.lineCap = r !== void 0 ? r : Vi
      const o = e.getLineDash()
      i.lineDash = o ? o.slice() : Le
      const a = e.getLineDashOffset()
      i.lineDashOffset = a || Ae
      const l = e.getLineJoin()
      i.lineJoin = l !== void 0 ? l : ji
      const h = e.getWidth()
      i.lineWidth = h !== void 0 ? h : On
      const c = e.getMiterLimit()
      ;(i.miterLimit = c !== void 0 ? c : Mn),
        i.lineWidth > this.maxLineWidth &&
          ((this.maxLineWidth = i.lineWidth), (this.bufferedMaxExtent_ = null))
    } else
      (i.strokeStyle = void 0),
        (i.lineCap = void 0),
        (i.lineDash = null),
        (i.lineDashOffset = void 0),
        (i.lineJoin = void 0),
        (i.lineWidth = void 0),
        (i.miterLimit = void 0)
  }
  createFill(t) {
    const e = t.fillStyle,
      i = [O.SET_FILL_STYLE, e]
    return typeof e != "string" && i.push(t.fillPatternScale), i
  }
  applyStroke(t) {
    this.instructions.push(this.createStroke(t))
  }
  createStroke(t) {
    return [
      O.SET_STROKE_STYLE,
      t.strokeStyle,
      t.lineWidth * this.pixelRatio,
      t.lineCap,
      t.lineJoin,
      t.miterLimit,
      this.applyPixelRatio(t.lineDash),
      t.lineDashOffset * this.pixelRatio,
    ]
  }
  updateFillStyle(t, e) {
    const i = t.fillStyle
    ;(typeof i != "string" || t.currentFillStyle != i) &&
      (i !== void 0 && this.instructions.push(e.call(this, t)),
      (t.currentFillStyle = i))
  }
  updateStrokeStyle(t, e) {
    const i = t.strokeStyle,
      n = t.lineCap,
      r = t.lineDash,
      o = t.lineDashOffset,
      a = t.lineJoin,
      l = t.lineWidth,
      h = t.miterLimit
    ;(t.currentStrokeStyle != i ||
      t.currentLineCap != n ||
      (r != t.currentLineDash && !si(t.currentLineDash, r)) ||
      t.currentLineDashOffset != o ||
      t.currentLineJoin != a ||
      t.currentLineWidth != l ||
      t.currentMiterLimit != h) &&
      (i !== void 0 && e.call(this, t),
      (t.currentStrokeStyle = i),
      (t.currentLineCap = n),
      (t.currentLineDash = r),
      (t.currentLineDashOffset = o),
      (t.currentLineJoin = a),
      (t.currentLineWidth = l),
      (t.currentMiterLimit = h))
  }
  endGeometry(t) {
    ;(this.beginGeometryInstruction1_[2] = this.instructions.length),
      (this.beginGeometryInstruction1_ = null),
      (this.beginGeometryInstruction2_[2] =
        this.hitDetectionInstructions.length),
      (this.beginGeometryInstruction2_ = null)
    const e = [O.END_GEOMETRY, t]
    this.instructions.push(e), this.hitDetectionInstructions.push(e)
  }
  getBufferedMaxExtent() {
    if (
      !this.bufferedMaxExtent_ &&
      ((this.bufferedMaxExtent_ = ol(this.maxExtent)), this.maxLineWidth > 0)
    ) {
      const t = (this.resolution * (this.maxLineWidth + 1)) / 2
      ro(this.bufferedMaxExtent_, t, this.bufferedMaxExtent_)
    }
    return this.bufferedMaxExtent_
  }
}
class bd extends Zn {
  constructor(t, e, i, n) {
    super(t, e, i, n),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.height_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.scale_ = void 0),
      (this.width_ = void 0),
      (this.declutterMode_ = void 0),
      (this.declutterImageWithText_ = void 0)
  }
  drawPoint(t, e, i) {
    if (
      !this.image_ ||
      (this.maxExtent && !Zi(this.maxExtent, t.getFlatCoordinates()))
    )
      return
    this.beginGeometry(t, e, i)
    const n = t.getFlatCoordinates(),
      r = t.getStride(),
      o = this.coordinates.length,
      a = this.appendFlatPointCoordinates(n, r)
    this.instructions.push([
      O.DRAW_IMAGE,
      o,
      a,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        (this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_,
        (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_,
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        O.DRAW_IMAGE,
        o,
        a,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        1,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(e)
  }
  drawMultiPoint(t, e, i) {
    if (!this.image_) return
    this.beginGeometry(t, e, i)
    const n = t.getFlatCoordinates(),
      r = []
    for (let l = 0, h = n.length; l < h; l += t.getStride())
      (!this.maxExtent || Zi(this.maxExtent, n.slice(l, l + 2))) &&
        r.push(n[l], n[l + 1])
    const o = this.coordinates.length,
      a = this.appendFlatPointCoordinates(r, 2)
    this.instructions.push([
      O.DRAW_IMAGE,
      o,
      a,
      this.image_,
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        (this.scale_[0] * this.pixelRatio) / this.imagePixelRatio_,
        (this.scale_[1] * this.pixelRatio) / this.imagePixelRatio_,
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_,
    ]),
      this.hitDetectionInstructions.push([
        O.DRAW_IMAGE,
        o,
        a,
        this.hitDetectionImage_,
        this.anchorX_,
        this.anchorY_,
        this.height_,
        1,
        this.originX_,
        this.originY_,
        this.rotateWithView_,
        this.rotation_,
        this.scale_,
        this.width_,
        this.declutterMode_,
        this.declutterImageWithText_,
      ]),
      this.endGeometry(e)
  }
  finish() {
    return (
      this.reverseHitDetectionInstructions(),
      (this.anchorX_ = void 0),
      (this.anchorY_ = void 0),
      (this.hitDetectionImage_ = null),
      (this.image_ = null),
      (this.imagePixelRatio_ = void 0),
      (this.height_ = void 0),
      (this.scale_ = void 0),
      (this.opacity_ = void 0),
      (this.originX_ = void 0),
      (this.originY_ = void 0),
      (this.rotateWithView_ = void 0),
      (this.rotation_ = void 0),
      (this.width_ = void 0),
      super.finish()
    )
  }
  setImageStyle(t, e) {
    const i = t.getAnchor(),
      n = t.getSize(),
      r = t.getOrigin()
    ;(this.imagePixelRatio_ = t.getPixelRatio(this.pixelRatio)),
      (this.anchorX_ = i[0]),
      (this.anchorY_ = i[1]),
      (this.hitDetectionImage_ = t.getHitDetectionImage()),
      (this.image_ = t.getImage(this.pixelRatio)),
      (this.height_ = n[1]),
      (this.opacity_ = t.getOpacity()),
      (this.originX_ = r[0]),
      (this.originY_ = r[1]),
      (this.rotateWithView_ = t.getRotateWithView()),
      (this.rotation_ = t.getRotation()),
      (this.scale_ = t.getScaleArray()),
      (this.width_ = n[0]),
      (this.declutterMode_ = t.getDeclutterMode()),
      (this.declutterImageWithText_ = e)
  }
}
const Dd = bd
class Nd extends Zn {
  constructor(t, e, i, n) {
    super(t, e, i, n)
  }
  drawFlatCoordinates_(t, e, i, n) {
    const r = this.coordinates.length,
      o = this.appendFlatLineCoordinates(t, e, i, n, !1, !1),
      a = [O.MOVE_TO_LINE_TO, r, o]
    return this.instructions.push(a), this.hitDetectionInstructions.push(a), i
  }
  drawLineString(t, e, i) {
    const n = this.state,
      r = n.strokeStyle,
      o = n.lineWidth
    if (r === void 0 || o === void 0) return
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(t, e, i),
      this.hitDetectionInstructions.push(
        [
          O.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          Le,
          Ae,
        ],
        gi,
      )
    const a = t.getFlatCoordinates(),
      l = t.getStride()
    this.drawFlatCoordinates_(a, 0, a.length, l),
      this.hitDetectionInstructions.push(He),
      this.endGeometry(e)
  }
  drawMultiLineString(t, e, i) {
    const n = this.state,
      r = n.strokeStyle,
      o = n.lineWidth
    if (r === void 0 || o === void 0) return
    this.updateStrokeStyle(n, this.applyStroke),
      this.beginGeometry(t, e, i),
      this.hitDetectionInstructions.push(
        [
          O.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          Le,
          Ae,
        ],
        gi,
      )
    const a = t.getEnds(),
      l = t.getFlatCoordinates(),
      h = t.getStride()
    let c = 0
    for (let u = 0, d = a.length; u < d; ++u)
      c = this.drawFlatCoordinates_(l, c, a[u], h)
    this.hitDetectionInstructions.push(He), this.endGeometry(e)
  }
  finish() {
    const t = this.state
    return (
      t.lastStroke != null &&
        t.lastStroke != this.coordinates.length &&
        this.instructions.push(He),
      this.reverseHitDetectionInstructions(),
      (this.state = null),
      super.finish()
    )
  }
  applyStroke(t) {
    t.lastStroke != null &&
      t.lastStroke != this.coordinates.length &&
      (this.instructions.push(He), (t.lastStroke = this.coordinates.length)),
      (t.lastStroke = 0),
      super.applyStroke(t),
      this.instructions.push(gi)
  }
}
const kd = Nd
class Gd extends Zn {
  constructor(t, e, i, n) {
    super(t, e, i, n)
  }
  drawFlatCoordinatess_(t, e, i, n) {
    const r = this.state,
      o = r.fillStyle !== void 0,
      a = r.strokeStyle !== void 0,
      l = i.length
    this.instructions.push(gi), this.hitDetectionInstructions.push(gi)
    for (let h = 0; h < l; ++h) {
      const c = i[h],
        u = this.coordinates.length,
        d = this.appendFlatLineCoordinates(t, e, c, n, !0, !a),
        f = [O.MOVE_TO_LINE_TO, u, d]
      this.instructions.push(f),
        this.hitDetectionInstructions.push(f),
        a &&
          (this.instructions.push(Fa), this.hitDetectionInstructions.push(Fa)),
        (e = c)
    }
    return (
      o && (this.instructions.push(os), this.hitDetectionInstructions.push(os)),
      a && (this.instructions.push(He), this.hitDetectionInstructions.push(He)),
      e
    )
  }
  drawCircle(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle
    if (r === void 0 && o === void 0) return
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([O.SET_FILL_STYLE, Dt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          O.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          Le,
          Ae,
        ])
    const a = t.getFlatCoordinates(),
      l = t.getStride(),
      h = this.coordinates.length
    this.appendFlatLineCoordinates(a, 0, a.length, l, !1, !1)
    const c = [O.CIRCLE, h]
    this.instructions.push(gi, c),
      this.hitDetectionInstructions.push(gi, c),
      n.fillStyle !== void 0 &&
        (this.instructions.push(os), this.hitDetectionInstructions.push(os)),
      n.strokeStyle !== void 0 &&
        (this.instructions.push(He), this.hitDetectionInstructions.push(He)),
      this.endGeometry(e)
  }
  drawPolygon(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle
    if (r === void 0 && o === void 0) return
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([O.SET_FILL_STYLE, Dt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          O.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          Le,
          Ae,
        ])
    const a = t.getEnds(),
      l = t.getOrientedFlatCoordinates(),
      h = t.getStride()
    this.drawFlatCoordinatess_(l, 0, a, h), this.endGeometry(e)
  }
  drawMultiPolygon(t, e, i) {
    const n = this.state,
      r = n.fillStyle,
      o = n.strokeStyle
    if (r === void 0 && o === void 0) return
    this.setFillStrokeStyles_(),
      this.beginGeometry(t, e, i),
      n.fillStyle !== void 0 &&
        this.hitDetectionInstructions.push([O.SET_FILL_STYLE, Dt]),
      n.strokeStyle !== void 0 &&
        this.hitDetectionInstructions.push([
          O.SET_STROKE_STYLE,
          n.strokeStyle,
          n.lineWidth,
          n.lineCap,
          n.lineJoin,
          n.miterLimit,
          Le,
          Ae,
        ])
    const a = t.getEndss(),
      l = t.getOrientedFlatCoordinates(),
      h = t.getStride()
    let c = 0
    for (let u = 0, d = a.length; u < d; ++u)
      c = this.drawFlatCoordinatess_(l, c, a[u], h)
    this.endGeometry(e)
  }
  finish() {
    this.reverseHitDetectionInstructions(), (this.state = null)
    const t = this.tolerance
    if (t !== 0) {
      const e = this.coordinates
      for (let i = 0, n = e.length; i < n; ++i) e[i] = hi(e[i], t)
    }
    return super.finish()
  }
  setFillStrokeStyles_() {
    const t = this.state
    t.fillStyle !== void 0 && this.updateFillStyle(t, this.createFill),
      t.strokeStyle !== void 0 && this.updateStrokeStyle(t, this.applyStroke)
  }
}
const Oa = Gd
function zd(s, t, e, i, n) {
  const r = []
  let o = e,
    a = 0,
    l = t.slice(e, 2)
  for (; a < s && o + n < i; ) {
    const [h, c] = l.slice(-2),
      u = t[o + n],
      d = t[o + n + 1],
      f = Math.sqrt((u - h) * (u - h) + (d - c) * (d - c))
    if (((a += f), a >= s)) {
      const g = (s - a + f) / f,
        _ = Yt(h, u, g),
        m = Yt(c, d, g)
      l.push(_, m), r.push(l), (l = [_, m]), a == s && (o += n), (a = 0)
    } else if (a < s) l.push(t[o + n], t[o + n + 1]), (o += n)
    else {
      const g = f - a,
        _ = Yt(h, u, g / f),
        m = Yt(c, d, g / f)
      l.push(_, m), r.push(l), (l = [_, m]), (a = 0), (o += n)
    }
  }
  return a > 0 && r.push(l), r
}
function Yd(s, t, e, i, n) {
  let r = e,
    o = e,
    a = 0,
    l = 0,
    h = e,
    c,
    u,
    d,
    f,
    g,
    _,
    m,
    p,
    y,
    x
  for (u = e; u < i; u += n) {
    const E = t[u],
      C = t[u + 1]
    g !== void 0 &&
      ((y = E - g),
      (x = C - _),
      (f = Math.sqrt(y * y + x * x)),
      m !== void 0 &&
        ((l += d),
        (c = Math.acos((m * y + p * x) / (d * f))),
        c > s && (l > a && ((a = l), (r = h), (o = u)), (l = 0), (h = u - n))),
      (d = f),
      (m = y),
      (p = x)),
      (g = E),
      (_ = C)
  }
  return (l += f), l > a ? [h, u] : [r, o]
}
const ws = {
  left: 0,
  center: 0.5,
  right: 1,
  top: 0,
  middle: 0.5,
  hanging: 0.2,
  alphabetic: 0.8,
  ideographic: 0.8,
  bottom: 1,
}
class Xd extends Zn {
  constructor(t, e, i, n) {
    super(t, e, i, n),
      (this.labels_ = null),
      (this.text_ = ""),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = void 0),
      (this.textRotation_ = 0),
      (this.textFillState_ = null),
      (this.fillStates = {}),
      (this.fillStates[Dt] = { fillStyle: Dt }),
      (this.textStrokeState_ = null),
      (this.strokeStates = {}),
      (this.textState_ = {}),
      (this.textStates = {}),
      (this.textKey_ = ""),
      (this.fillKey_ = ""),
      (this.strokeKey_ = ""),
      (this.declutterMode_ = void 0),
      (this.declutterImageWithText_ = void 0)
  }
  finish() {
    const t = super.finish()
    return (
      (t.textStates = this.textStates),
      (t.fillStates = this.fillStates),
      (t.strokeStates = this.strokeStates),
      t
    )
  }
  drawText(t, e, i) {
    const n = this.textFillState_,
      r = this.textStrokeState_,
      o = this.textState_
    if (this.text_ === "" || !o || (!n && !r)) return
    const a = this.coordinates
    let l = a.length
    const h = t.getType()
    let c = null,
      u = t.getStride()
    if (
      o.placement === "line" &&
      (h == "LineString" ||
        h == "MultiLineString" ||
        h == "Polygon" ||
        h == "MultiPolygon")
    ) {
      if (!Nt(this.maxExtent, t.getExtent())) return
      let d
      if (((c = t.getFlatCoordinates()), h == "LineString")) d = [c.length]
      else if (h == "MultiLineString") d = t.getEnds()
      else if (h == "Polygon") d = t.getEnds().slice(0, 1)
      else if (h == "MultiPolygon") {
        const m = t.getEndss()
        d = []
        for (let p = 0, y = m.length; p < y; ++p) d.push(m[p][0])
      }
      this.beginGeometry(t, e, i)
      const f = o.repeat,
        g = f ? void 0 : o.textAlign
      let _ = 0
      for (let m = 0, p = d.length; m < p; ++m) {
        let y
        f
          ? (y = zd(f * this.resolution, c, _, d[m], u))
          : (y = [c.slice(_, d[m])])
        for (let x = 0, E = y.length; x < E; ++x) {
          const C = y[x]
          let T = 0,
            S = C.length
          if (g == null) {
            const v = Yd(o.maxAngle, C, 0, C.length, 2)
            ;(T = v[0]), (S = v[1])
          }
          for (let v = T; v < S; v += u) a.push(C[v], C[v + 1])
          const R = a.length
          ;(_ = d[m]), this.drawChars_(l, R), (l = R)
        }
      }
      this.endGeometry(e)
    } else {
      let d = o.overflow ? null : []
      switch (h) {
        case "Point":
        case "MultiPoint":
          c = t.getFlatCoordinates()
          break
        case "LineString":
          c = t.getFlatMidpoint()
          break
        case "Circle":
          c = t.getCenter()
          break
        case "MultiLineString":
          ;(c = t.getFlatMidpoints()), (u = 2)
          break
        case "Polygon":
          ;(c = t.getFlatInteriorPoint()),
            o.overflow || d.push(c[2] / this.resolution),
            (u = 3)
          break
        case "MultiPolygon":
          const y = t.getFlatInteriorPoints()
          c = []
          for (let x = 0, E = y.length; x < E; x += 3)
            o.overflow || d.push(y[x + 2] / this.resolution),
              c.push(y[x], y[x + 1])
          if (c.length === 0) return
          u = 2
          break
      }
      const f = this.appendFlatPointCoordinates(c, u)
      if (f === l) return
      if (d && (f - l) / 2 !== c.length / u) {
        let y = l / 2
        d = d.filter((x, E) => {
          const C =
            a[(y + E) * 2] === c[E * u] && a[(y + E) * 2 + 1] === c[E * u + 1]
          return C || --y, C
        })
      }
      this.saveTextStates_(),
        (o.backgroundFill || o.backgroundStroke) &&
          (this.setFillStrokeStyle(o.backgroundFill, o.backgroundStroke),
          o.backgroundFill && this.updateFillStyle(this.state, this.createFill),
          o.backgroundStroke &&
            (this.updateStrokeStyle(this.state, this.applyStroke),
            this.hitDetectionInstructions.push(this.createStroke(this.state)))),
        this.beginGeometry(t, e, i)
      let g = o.padding
      if (g != fi && (o.scale[0] < 0 || o.scale[1] < 0)) {
        let y = o.padding[0],
          x = o.padding[1],
          E = o.padding[2],
          C = o.padding[3]
        o.scale[0] < 0 && ((x = -x), (C = -C)),
          o.scale[1] < 0 && ((y = -y), (E = -E)),
          (g = [y, x, E, C])
      }
      const _ = this.pixelRatio
      this.instructions.push([
        O.DRAW_IMAGE,
        l,
        f,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        this.declutterMode_,
        this.declutterImageWithText_,
        g == fi
          ? fi
          : g.map(function (y) {
              return y * _
            }),
        !!o.backgroundFill,
        !!o.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        d,
      ])
      const m = 1 / _,
        p = this.state.fillStyle
      o.backgroundFill &&
        ((this.state.fillStyle = Dt),
        this.hitDetectionInstructions.push(this.createFill(this.state))),
        this.hitDetectionInstructions.push([
          O.DRAW_IMAGE,
          l,
          f,
          null,
          NaN,
          NaN,
          NaN,
          1,
          0,
          0,
          this.textRotateWithView_,
          this.textRotation_,
          [m, m],
          NaN,
          this.declutterMode_,
          this.declutterImageWithText_,
          g,
          !!o.backgroundFill,
          !!o.backgroundStroke,
          this.text_,
          this.textKey_,
          this.strokeKey_,
          this.fillKey_ ? Dt : this.fillKey_,
          this.textOffsetX_,
          this.textOffsetY_,
          d,
        ]),
        o.backgroundFill &&
          ((this.state.fillStyle = p),
          this.hitDetectionInstructions.push(this.createFill(this.state))),
        this.endGeometry(e)
    }
  }
  saveTextStates_() {
    const t = this.textStrokeState_,
      e = this.textState_,
      i = this.textFillState_,
      n = this.strokeKey_
    t &&
      (n in this.strokeStates ||
        (this.strokeStates[n] = {
          strokeStyle: t.strokeStyle,
          lineCap: t.lineCap,
          lineDashOffset: t.lineDashOffset,
          lineWidth: t.lineWidth,
          lineJoin: t.lineJoin,
          miterLimit: t.miterLimit,
          lineDash: t.lineDash,
        }))
    const r = this.textKey_
    r in this.textStates ||
      (this.textStates[r] = {
        font: e.font,
        textAlign: e.textAlign || Fn,
        justify: e.justify,
        textBaseline: e.textBaseline || ys,
        scale: e.scale,
      })
    const o = this.fillKey_
    i &&
      (o in this.fillStates ||
        (this.fillStates[o] = { fillStyle: i.fillStyle }))
  }
  drawChars_(t, e) {
    const i = this.textStrokeState_,
      n = this.textState_,
      r = this.strokeKey_,
      o = this.textKey_,
      a = this.fillKey_
    this.saveTextStates_()
    const l = this.pixelRatio,
      h = ws[n.textBaseline],
      c = this.textOffsetY_ * l,
      u = this.text_,
      d = i ? (i.lineWidth * Math.abs(n.scale[0])) / 2 : 0
    this.instructions.push([
      O.DRAW_CHARS,
      t,
      e,
      h,
      n.overflow,
      a,
      n.maxAngle,
      l,
      c,
      r,
      d * l,
      u,
      o,
      1,
      this.declutterMode_,
    ]),
      this.hitDetectionInstructions.push([
        O.DRAW_CHARS,
        t,
        e,
        h,
        n.overflow,
        a && Dt,
        n.maxAngle,
        l,
        c,
        r,
        d * l,
        u,
        o,
        1 / l,
        this.declutterMode_,
      ])
  }
  setTextStyle(t, e) {
    let i, n, r
    if (!t) this.text_ = ""
    else {
      const o = t.getFill()
      o
        ? ((n = this.textFillState_),
          n || ((n = {}), (this.textFillState_ = n)),
          (n.fillStyle = fe(o.getColor() || Dt)))
        : ((n = null), (this.textFillState_ = n))
      const a = t.getStroke()
      if (!a) (r = null), (this.textStrokeState_ = r)
      else {
        ;(r = this.textStrokeState_),
          r || ((r = {}), (this.textStrokeState_ = r))
        const g = a.getLineDash(),
          _ = a.getLineDashOffset(),
          m = a.getWidth(),
          p = a.getMiterLimit()
        ;(r.lineCap = a.getLineCap() || Vi),
          (r.lineDash = g ? g.slice() : Le),
          (r.lineDashOffset = _ === void 0 ? Ae : _),
          (r.lineJoin = a.getLineJoin() || ji),
          (r.lineWidth = m === void 0 ? On : m),
          (r.miterLimit = p === void 0 ? Mn : p),
          (r.strokeStyle = fe(a.getColor() || Pn))
      }
      i = this.textState_
      const l = t.getFont() || Nl
      Eu(l)
      const h = t.getScaleArray()
      ;(i.overflow = t.getOverflow()),
        (i.font = l),
        (i.maxAngle = t.getMaxAngle()),
        (i.placement = t.getPlacement()),
        (i.textAlign = t.getTextAlign()),
        (i.repeat = t.getRepeat()),
        (i.justify = t.getJustify()),
        (i.textBaseline = t.getTextBaseline() || ys),
        (i.backgroundFill = t.getBackgroundFill()),
        (i.backgroundStroke = t.getBackgroundStroke()),
        (i.padding = t.getPadding() || fi),
        (i.scale = h === void 0 ? [1, 1] : h)
      const c = t.getOffsetX(),
        u = t.getOffsetY(),
        d = t.getRotateWithView(),
        f = t.getRotation()
      ;(this.text_ = t.getText() || ""),
        (this.textOffsetX_ = c === void 0 ? 0 : c),
        (this.textOffsetY_ = u === void 0 ? 0 : u),
        (this.textRotateWithView_ = d === void 0 ? !1 : d),
        (this.textRotation_ = f === void 0 ? 0 : f),
        (this.strokeKey_ = r
          ? (typeof r.strokeStyle == "string"
              ? r.strokeStyle
              : it(r.strokeStyle)) +
            r.lineCap +
            r.lineDashOffset +
            "|" +
            r.lineWidth +
            r.lineJoin +
            r.miterLimit +
            "[" +
            r.lineDash.join() +
            "]"
          : ""),
        (this.textKey_ =
          i.font +
          i.scale +
          (i.textAlign || "?") +
          (i.repeat || "?") +
          (i.justify || "?") +
          (i.textBaseline || "?")),
        (this.fillKey_ =
          n && n.fillStyle
            ? typeof n.fillStyle == "string"
              ? n.fillStyle
              : "|" + it(n.fillStyle)
            : "")
    }
    ;(this.declutterMode_ = t.getDeclutterMode()),
      (this.declutterImageWithText_ = e)
  }
}
const Ud = {
  Circle: Oa,
  Default: Zn,
  Image: Dd,
  LineString: kd,
  Polygon: Oa,
  Text: Xd,
}
class Wd {
  constructor(t, e, i, n) {
    ;(this.tolerance_ = t),
      (this.maxExtent_ = e),
      (this.pixelRatio_ = n),
      (this.resolution_ = i),
      (this.buildersByZIndex_ = {})
  }
  finish() {
    const t = {}
    for (const e in this.buildersByZIndex_) {
      t[e] = t[e] || {}
      const i = this.buildersByZIndex_[e]
      for (const n in i) {
        const r = i[n].finish()
        t[e][n] = r
      }
    }
    return t
  }
  getBuilder(t, e) {
    const i = t !== void 0 ? t.toString() : "0"
    let n = this.buildersByZIndex_[i]
    n === void 0 && ((n = {}), (this.buildersByZIndex_[i] = n))
    let r = n[e]
    if (r === void 0) {
      const o = Ud[e]
      ;(r = new o(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_,
      )),
        (n[e] = r)
    }
    return r
  }
}
class Zd extends Gn {
  constructor(t) {
    super(),
      (this.ready = !0),
      (this.boundHandleImageChange_ = this.handleImageChange_.bind(this)),
      (this.layer_ = t),
      (this.declutterExecutorGroup = null)
  }
  getFeatures(t) {
    return W()
  }
  getData(t) {
    return null
  }
  prepareFrame(t) {
    return W()
  }
  renderFrame(t, e) {
    return W()
  }
  loadedTileCallback(t, e, i) {
    t[e] || (t[e] = {}), (t[e][i.tileCoord.toString()] = i)
  }
  createLoadedTileFinder(t, e, i) {
    return (n, r) => {
      const o = this.loadedTileCallback.bind(this, i, n)
      return t.forEachLoadedTile(e, n, r, o)
    }
  }
  forEachFeatureAtCoordinate(t, e, i, n, r) {}
  getLayer() {
    return this.layer_
  }
  handleFontsChanged() {}
  handleImageChange_(t) {
    const e = t.target
    ;(e.getState() === X.LOADED || e.getState() === X.ERROR) &&
      this.renderIfReadyAndVisible()
  }
  loadImage(t) {
    let e = t.getState()
    return (
      e != X.LOADED &&
        e != X.ERROR &&
        t.addEventListener(U.CHANGE, this.boundHandleImageChange_),
      e == X.IDLE && (t.load(), (e = t.getState())),
      e == X.LOADED
    )
  }
  renderIfReadyAndVisible() {
    const t = this.getLayer()
    t && t.getVisible() && t.getSourceState() === "ready" && t.changed()
  }
  renderDeferred(t) {}
  disposeInternal() {
    delete this.layer_, super.disposeInternal()
  }
}
class Jl extends Fe {
  constructor(t, e, i, n) {
    super(t),
      (this.inversePixelTransform = e),
      (this.frameState = i),
      (this.context = n)
  }
}
class Ql {
  constructor() {
    qo(
      this,
      "pushMethodArgs_",
      (...t) => (this.instructions_[this.zIndex + this.offset_].push(t), this),
    )
    ;(this.instructions_ = []),
      (this.zIndex = 0),
      (this.offset_ = 0),
      (this.context_ = new Proxy(CanvasRenderingContext2D.prototype, {
        get: (t, e) => {
          if (typeof Xr()[e] == "function")
            return (
              this.instructions_[this.zIndex + this.offset_] ||
                (this.instructions_[this.zIndex + this.offset_] = []),
              this.instructions_[this.zIndex + this.offset_].push(e),
              this.pushMethodArgs_
            )
        },
        set: (t, e, i) => (
          this.instructions_[this.zIndex + this.offset_] ||
            (this.instructions_[this.zIndex + this.offset_] = []),
          this.instructions_[this.zIndex + this.offset_].push(e, i),
          !0
        ),
      }))
  }
  getContext() {
    return this.context_
  }
  draw(t) {
    this.instructions_.forEach(e => {
      for (let i = 0, n = e.length; i < n; i += 2) {
        const r = e[i],
          o = e[i + 1]
        if (typeof t[r] == "function") t[r](...o)
        else {
          if (typeof o == "function") {
            t[r] = o(t)
            continue
          }
          t[r] = o
        }
      }
    })
  }
  clear() {
    ;(this.instructions_.length = 0), (this.zIndex = 0), (this.offset_ = 0)
  }
  offset() {
    ;(this.offset_ = this.instructions_.length), (this.zIndex = 0)
  }
}
const ba = []
let Oi = null
function Bd() {
  Oi = Rt(1, 1, void 0, { willReadFrequently: !0 })
}
class th extends Zd {
  constructor(t) {
    super(t),
      (this.container = null),
      this.renderedResolution,
      (this.tempTransform = ne()),
      (this.pixelTransform = ne()),
      (this.inversePixelTransform = ne()),
      (this.context = null),
      (this.deferredContext_ = null),
      (this.containerReused = !1),
      (this.pixelContext_ = null),
      (this.frameState = null)
  }
  getImageData(t, e, i) {
    Oi || Bd(), Oi.clearRect(0, 0, 1, 1)
    let n
    try {
      Oi.drawImage(t, e, i, 1, 1, 0, 0, 1, 1),
        (n = Oi.getImageData(0, 0, 1, 1).data)
    } catch {
      return (Oi = null), null
    }
    return n
  }
  getBackground(t) {
    let i = this.getLayer().getBackground()
    return (
      typeof i == "function" && (i = i(t.viewState.resolution)), i || void 0
    )
  }
  useContainer(t, e, i) {
    const n = this.getLayer().getClassName()
    let r, o
    if (
      t &&
      t.className === n &&
      (!i ||
        (t &&
          t.style.backgroundColor &&
          si(Ki(t.style.backgroundColor), Ki(i))))
    ) {
      const a = t.firstElementChild
      a instanceof HTMLCanvasElement && (o = a.getContext("2d"))
    }
    if (
      (o && o.canvas.style.transform === e
        ? ((this.container = t),
          (this.context = o),
          (this.containerReused = !0))
        : this.containerReused
          ? ((this.container = null),
            (this.context = null),
            (this.containerReused = !1))
          : this.container && (this.container.style.backgroundColor = null),
      !this.container)
    ) {
      ;(r = document.createElement("div")), (r.className = n)
      let a = r.style
      ;(a.position = "absolute"),
        (a.width = "100%"),
        (a.height = "100%"),
        (o = Rt())
      const l = o.canvas
      r.appendChild(l),
        (a = l.style),
        (a.position = "absolute"),
        (a.left = "0"),
        (a.transformOrigin = "top left"),
        (this.container = r),
        (this.context = o)
    }
    !this.containerReused &&
      i &&
      !this.container.style.backgroundColor &&
      (this.container.style.backgroundColor = i)
  }
  clipUnrotated(t, e, i) {
    const n = Ci(i),
      r = Ds(i),
      o = bs(i),
      a = Os(i)
    Et(e.coordinateToPixelTransform, n),
      Et(e.coordinateToPixelTransform, r),
      Et(e.coordinateToPixelTransform, o),
      Et(e.coordinateToPixelTransform, a)
    const l = this.inversePixelTransform
    Et(l, n),
      Et(l, r),
      Et(l, o),
      Et(l, a),
      t.save(),
      t.beginPath(),
      t.moveTo(Math.round(n[0]), Math.round(n[1])),
      t.lineTo(Math.round(r[0]), Math.round(r[1])),
      t.lineTo(Math.round(o[0]), Math.round(o[1])),
      t.lineTo(Math.round(a[0]), Math.round(a[1])),
      t.clip()
  }
  dispatchRenderEvent_(t, e, i) {
    const n = this.getLayer()
    if (n.hasListener(t)) {
      const r = new Jl(t, this.inversePixelTransform, i, e)
      n.dispatchEvent(r)
    }
  }
  preRender(t, e) {
    ;(this.frameState = e),
      !e.declutter && this.dispatchRenderEvent_(Ht.PRERENDER, t, e)
  }
  postRender(t, e) {
    e.declutter || this.dispatchRenderEvent_(Ht.POSTRENDER, t, e)
  }
  renderDeferredInternal(t) {}
  getRenderContext(t) {
    return (
      t.declutter &&
        !this.deferredContext_ &&
        (this.deferredContext_ = new Ql()),
      t.declutter ? this.deferredContext_.getContext() : this.context
    )
  }
  renderDeferred(t) {
    t.declutter &&
      (this.dispatchRenderEvent_(Ht.PRERENDER, this.context, t),
      t.declutter &&
        this.deferredContext_ &&
        (this.deferredContext_.draw(this.context),
        this.deferredContext_.clear()),
      this.renderDeferredInternal(t),
      this.dispatchRenderEvent_(Ht.POSTRENDER, this.context, t))
  }
  getRenderTransform(t, e, i, n, r, o, a) {
    const l = r / 2,
      h = o / 2,
      c = n / e,
      u = -c,
      d = -t[0] + a,
      f = -t[1]
    return _e(this.tempTransform, l, h, c, u, -i, d, f)
  }
  disposeInternal() {
    delete this.frameState, super.disposeInternal()
  }
}
function Kd(s, t, e, i, n, r, o, a, l, h, c, u) {
  let d = s[t],
    f = s[t + 1],
    g = 0,
    _ = 0,
    m = 0,
    p = 0
  function y() {
    ;(g = d),
      (_ = f),
      (t += i),
      (d = s[t]),
      (f = s[t + 1]),
      (p += m),
      (m = Math.sqrt((d - g) * (d - g) + (f - _) * (f - _)))
  }
  do y()
  while (t < e - i && p + m < r)
  let x = m === 0 ? 0 : (r - p) / m
  const E = Yt(g, d, x),
    C = Yt(_, f, x),
    T = t - i,
    S = p,
    R = r + a * l(h, n, c)
  for (; t < e - i && p + m < R; ) y()
  x = m === 0 ? 0 : (R - p) / m
  const v = Yt(g, d, x),
    k = Yt(_, f, x)
  let N
  if (u) {
    const M = [E, C, v, k]
    pl(M, 0, 4, 2, u, M, M), (N = M[0] > M[2])
  } else N = E > v
  const z = Math.PI,
    K = [],
    V = T + i === t
  ;(t = T), (m = 0), (p = S), (d = s[t]), (f = s[t + 1])
  let j
  if (V) {
    y(), (j = Math.atan2(f - _, d - g)), N && (j += j > 0 ? -z : z)
    const M = (v + E) / 2,
      G = (k + C) / 2
    return (K[0] = [M, G, (R - r) / 2, j, n]), K
  }
  n = n.replace(/\n/g, " ")
  for (let M = 0, G = n.length; M < G; ) {
    y()
    let Z = Math.atan2(f - _, d - g)
    if ((N && (Z += Z > 0 ? -z : z), j !== void 0)) {
      let I = Z - j
      if (((I += I > z ? -2 * z : I < -z ? 2 * z : 0), Math.abs(I) > o))
        return null
    }
    j = Z
    const at = M
    let q = 0
    for (; M < G; ++M) {
      const I = N ? G - M - 1 : M,
        ht = a * l(h, n[I], c)
      if (t + i < e && p + m < r + q + ht / 2) break
      q += ht
    }
    if (M === at) continue
    const nt = N ? n.substring(G - at, G - M) : n.substring(at, M)
    x = m === 0 ? 0 : (r + q / 2 - p) / m
    const Q = Yt(g, d, x),
      gt = Yt(_, f, x)
    K.push([Q, gt, q / 2, Z, nt]), (r += q)
  }
  return K
}
const Li = $t(),
  Ye = [],
  Ce = [],
  we = [],
  Xe = []
function Da(s) {
  return s[3].declutterBox
}
const Na = new RegExp("[֑-ࣿיִ-﷿ﹰ-ﻼࠀ-࿿-]")
function Er(s, t) {
  return (
    t === "start"
      ? (t = Na.test(s) ? "right" : "left")
      : t === "end" && (t = Na.test(s) ? "left" : "right"),
    ws[t]
  )
}
function Vd(s, t, e) {
  return (
    e > 0 &&
      s.push(
        `
`,
        "",
      ),
    s.push(t, ""),
    s
  )
}
class jd {
  constructor(t, e, i, n, r) {
    ;(this.overlaps = i),
      (this.pixelRatio = e),
      (this.resolution = t),
      this.alignAndScaleFill_,
      (this.instructions = n.instructions),
      (this.coordinates = n.coordinates),
      (this.coordinateCache_ = {}),
      (this.renderedTransform_ = ne()),
      (this.hitDetectionInstructions = n.hitDetectionInstructions),
      (this.pixelCoordinates_ = null),
      (this.viewRotation_ = 0),
      (this.fillStates = n.fillStates || {}),
      (this.strokeStates = n.strokeStates || {}),
      (this.textStates = n.textStates || {}),
      (this.widths_ = {}),
      (this.labels_ = {}),
      (this.zIndexContext_ = r ? new Ql() : null)
  }
  getZIndexContext() {
    return this.zIndexContext_
  }
  createLabel(t, e, i, n) {
    const r = t + e + i + n
    if (this.labels_[r]) return this.labels_[r]
    const o = n ? this.strokeStates[n] : null,
      a = i ? this.fillStates[i] : null,
      l = this.textStates[e],
      h = this.pixelRatio,
      c = [l.scale[0] * h, l.scale[1] * h],
      u = Array.isArray(t),
      d = l.justify
        ? ws[l.justify]
        : Er(Array.isArray(t) ? t[0] : t, l.textAlign || Fn),
      f = n && o.lineWidth ? o.lineWidth : 0,
      g = u
        ? t
        : t
            .split(
              `
`,
            )
            .reduce(Vd, []),
      { width: _, height: m, widths: p, heights: y, lineWidths: x } = Cu(l, g),
      E = _ + f,
      C = [],
      T = (E + 2) * c[0],
      S = (m + f) * c[1],
      R = {
        width: T < 0 ? Math.floor(T) : Math.ceil(T),
        height: S < 0 ? Math.floor(S) : Math.ceil(S),
        contextInstructions: C,
      }
    ;(c[0] != 1 || c[1] != 1) && C.push("scale", c),
      n &&
        (C.push("strokeStyle", o.strokeStyle),
        C.push("lineWidth", f),
        C.push("lineCap", o.lineCap),
        C.push("lineJoin", o.lineJoin),
        C.push("miterLimit", o.miterLimit),
        C.push("setLineDash", [o.lineDash]),
        C.push("lineDashOffset", o.lineDashOffset)),
      i && C.push("fillStyle", a.fillStyle),
      C.push("textBaseline", "middle"),
      C.push("textAlign", "center")
    const v = 0.5 - d
    let k = d * E + v * f
    const N = [],
      z = []
    let K = 0,
      V = 0,
      j = 0,
      M = 0,
      G
    for (let Z = 0, at = g.length; Z < at; Z += 2) {
      const q = g[Z]
      if (
        q ===
        `
`
      ) {
        ;(V += K), (K = 0), (k = d * E + v * f), ++M
        continue
      }
      const nt = g[Z + 1] || l.font
      nt !== G && (n && N.push("font", nt), i && z.push("font", nt), (G = nt)),
        (K = Math.max(K, y[j]))
      const Q = [q, k + v * p[j] + d * (p[j] - x[M]), 0.5 * (f + K) + V]
      ;(k += p[j]),
        n && N.push("strokeText", Q),
        i && z.push("fillText", Q),
        ++j
    }
    return (
      Array.prototype.push.apply(C, N),
      Array.prototype.push.apply(C, z),
      (this.labels_[r] = R),
      R
    )
  }
  replayTextBackground_(t, e, i, n, r, o, a) {
    t.beginPath(),
      t.moveTo.apply(t, e),
      t.lineTo.apply(t, i),
      t.lineTo.apply(t, n),
      t.lineTo.apply(t, r),
      t.lineTo.apply(t, e),
      o && ((this.alignAndScaleFill_ = o[2]), this.fill_(t)),
      a && (this.setStrokeStyle_(t, a), t.stroke())
  }
  calculateImageOrLabelDimensions_(
    t,
    e,
    i,
    n,
    r,
    o,
    a,
    l,
    h,
    c,
    u,
    d,
    f,
    g,
    _,
    m,
  ) {
    ;(a *= d[0]), (l *= d[1])
    let p = i - a,
      y = n - l
    const x = r + h > t ? t - h : r,
      E = o + c > e ? e - c : o,
      C = g[3] + x * d[0] + g[1],
      T = g[0] + E * d[1] + g[2],
      S = p - g[3],
      R = y - g[0]
    ;(_ || u !== 0) &&
      ((Ye[0] = S),
      (Xe[0] = S),
      (Ye[1] = R),
      (Ce[1] = R),
      (Ce[0] = S + C),
      (we[0] = Ce[0]),
      (we[1] = R + T),
      (Xe[1] = we[1]))
    let v
    return (
      u !== 0
        ? ((v = _e(ne(), i, n, 1, 1, u, -i, -n)),
          Et(v, Ye),
          Et(v, Ce),
          Et(v, we),
          Et(v, Xe),
          Qe(
            Math.min(Ye[0], Ce[0], we[0], Xe[0]),
            Math.min(Ye[1], Ce[1], we[1], Xe[1]),
            Math.max(Ye[0], Ce[0], we[0], Xe[0]),
            Math.max(Ye[1], Ce[1], we[1], Xe[1]),
            Li,
          ))
        : Qe(
            Math.min(S, S + C),
            Math.min(R, R + T),
            Math.max(S, S + C),
            Math.max(R, R + T),
            Li,
          ),
      f && ((p = Math.round(p)), (y = Math.round(y))),
      {
        drawImageX: p,
        drawImageY: y,
        drawImageW: x,
        drawImageH: E,
        originX: h,
        originY: c,
        declutterBox: {
          minX: Li[0],
          minY: Li[1],
          maxX: Li[2],
          maxY: Li[3],
          value: m,
        },
        canvasTransform: v,
        scale: d,
      }
    )
  }
  replayImageOrLabel_(t, e, i, n, r, o, a) {
    const l = !!(o || a),
      h = n.declutterBox,
      c = a ? (a[2] * n.scale[0]) / 2 : 0
    return (
      h.minX - c <= e[0] &&
        h.maxX + c >= 0 &&
        h.minY - c <= e[1] &&
        h.maxY + c >= 0 &&
        (l && this.replayTextBackground_(t, Ye, Ce, we, Xe, o, a),
        wu(
          t,
          n.canvasTransform,
          r,
          i,
          n.originX,
          n.originY,
          n.drawImageW,
          n.drawImageH,
          n.drawImageX,
          n.drawImageY,
          n.scale,
        )),
      !0
    )
  }
  fill_(t) {
    const e = this.alignAndScaleFill_
    if (e) {
      const i = Et(this.renderedTransform_, [0, 0]),
        n = 512 * this.pixelRatio
      t.save(),
        t.translate(i[0] % n, i[1] % n),
        e !== 1 && t.scale(e, e),
        t.rotate(this.viewRotation_)
    }
    t.fill(), e && t.restore()
  }
  setStrokeStyle_(t, e) {
    ;(t.strokeStyle = e[1]),
      (t.lineWidth = e[2]),
      (t.lineCap = e[3]),
      (t.lineJoin = e[4]),
      (t.miterLimit = e[5]),
      (t.lineDashOffset = e[7]),
      t.setLineDash(e[6])
  }
  drawLabelWithPointPlacement_(t, e, i, n) {
    const r = this.textStates[e],
      o = this.createLabel(t, e, n, i),
      a = this.strokeStates[i],
      l = this.pixelRatio,
      h = Er(Array.isArray(t) ? t[0] : t, r.textAlign || Fn),
      c = ws[r.textBaseline || ys],
      u = a && a.lineWidth ? a.lineWidth : 0,
      d = o.width / l - 2 * r.scale[0],
      f = h * d + 2 * (0.5 - h) * u,
      g = (c * o.height) / l + 2 * (0.5 - c) * u
    return { label: o, anchorX: f, anchorY: g }
  }
  execute_(t, e, i, n, r, o, a, l) {
    const h = this.zIndexContext_
    let c
    this.pixelCoordinates_ && si(i, this.renderedTransform_)
      ? (c = this.pixelCoordinates_)
      : (this.pixelCoordinates_ || (this.pixelCoordinates_ = []),
        (c = Je(
          this.coordinates,
          0,
          this.coordinates.length,
          2,
          i,
          this.pixelCoordinates_,
        )),
        sc(this.renderedTransform_, i))
    let u = 0
    const d = n.length
    let f = 0,
      g,
      _,
      m,
      p,
      y,
      x,
      E,
      C,
      T,
      S,
      R,
      v,
      k,
      N = 0,
      z = 0,
      K = null,
      V = null
    const j = this.coordinateCache_,
      M = this.viewRotation_,
      G = Math.round(Math.atan2(-i[1], i[0]) * 1e12) / 1e12,
      Z = {
        context: t,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: M,
      },
      at = this.instructions != n || this.overlaps ? 0 : 200
    let q, nt, Q, gt
    for (; u < d; ) {
      const I = n[u]
      switch (I[0]) {
        case O.BEGIN_GEOMETRY:
          ;(q = I[1]),
            (gt = I[3]),
            q.getGeometry()
              ? a !== void 0 && !Nt(a, gt.getExtent())
                ? (u = I[2] + 1)
                : ++u
              : (u = I[2]),
            h && (h.zIndex = I[4])
          break
        case O.BEGIN_PATH:
          N > at && (this.fill_(t), (N = 0)),
            z > at && (t.stroke(), (z = 0)),
            !N && !z && (t.beginPath(), (y = NaN), (x = NaN)),
            ++u
          break
        case O.CIRCLE:
          f = I[1]
          const Gt = c[f],
            pt = c[f + 1],
            Ft = c[f + 2],
            Jt = c[f + 3],
            Ot = Ft - Gt,
            nn = Jt - pt,
            ri = Math.sqrt(Ot * Ot + nn * nn)
          t.moveTo(Gt + ri, pt), t.arc(Gt, pt, ri, 0, 2 * Math.PI, !0), ++u
          break
        case O.CLOSE_PATH:
          t.closePath(), ++u
          break
        case O.CUSTOM:
          ;(f = I[1]), (g = I[2])
          const sr = I[3],
            Vn = I[4],
            jn = I[5]
          ;(Z.geometry = sr), (Z.feature = q), u in j || (j[u] = [])
          const Wt = j[u]
          jn
            ? jn(c, f, g, 2, Wt)
            : ((Wt[0] = c[f]), (Wt[1] = c[f + 1]), (Wt.length = 2)),
            h && (h.zIndex = I[6]),
            Vn(Wt, Z),
            ++u
          break
        case O.DRAW_IMAGE:
          ;(f = I[1]), (g = I[2]), (T = I[3]), (_ = I[4]), (m = I[5])
          let Ri = I[6]
          const Hn = I[7],
            rr = I[8],
            qn = I[9],
            $n = I[10]
          let zt = I[11]
          const Qt = I[12]
          let ae = I[13]
          p = I[14] || "declutter"
          const te = I[15]
          if (!T && I.length >= 20) {
            ;(S = I[19]), (R = I[20]), (v = I[21]), (k = I[22])
            const Zt = this.drawLabelWithPointPlacement_(S, R, v, k)
            ;(T = Zt.label), (I[3] = T)
            const oi = I[23]
            ;(_ = (Zt.anchorX - oi) * this.pixelRatio), (I[4] = _)
            const Bt = I[24]
            ;(m = (Zt.anchorY - Bt) * this.pixelRatio),
              (I[5] = m),
              (Ri = T.height),
              (I[6] = Ri),
              (ae = T.width),
              (I[13] = ae)
          }
          let Si
          I.length > 25 && (Si = I[25])
          let Ti, Ge, pe
          I.length > 17
            ? ((Ti = I[16]), (Ge = I[17]), (pe = I[18]))
            : ((Ti = fi), (Ge = !1), (pe = !1)),
            $n && G ? (zt += M) : !$n && !G && (zt -= M)
          let or = 0
          for (; f < g; f += 2) {
            if (Si && Si[or++] < ae / this.pixelRatio) continue
            const Zt = this.calculateImageOrLabelDimensions_(
                T.width,
                T.height,
                c[f],
                c[f + 1],
                ae,
                Ri,
                _,
                m,
                rr,
                qn,
                zt,
                Qt,
                r,
                Ti,
                Ge || pe,
                q,
              ),
              oi = [t, e, T, Zt, Hn, Ge ? K : null, pe ? V : null]
            if (l) {
              let Bt, le, Kt
              if (te) {
                const ut = g - f
                if (!te[ut]) {
                  te[ut] = { args: oi, declutterMode: p }
                  continue
                }
                const Pt = te[ut]
                ;(Bt = Pt.args),
                  (le = Pt.declutterMode),
                  delete te[ut],
                  (Kt = Da(Bt))
              }
              let ye, Ee
              if (
                (Bt && (le !== "declutter" || !l.collides(Kt)) && (ye = !0),
                (p !== "declutter" || !l.collides(Zt.declutterBox)) &&
                  (Ee = !0),
                le === "declutter" && p === "declutter")
              ) {
                const ut = ye && Ee
                ;(ye = ut), (Ee = ut)
              }
              ye &&
                (le !== "none" && l.insert(Kt),
                this.replayImageOrLabel_.apply(this, Bt)),
                Ee &&
                  (p !== "none" && l.insert(Zt.declutterBox),
                  this.replayImageOrLabel_.apply(this, oi))
            } else this.replayImageOrLabel_.apply(this, oi)
          }
          ++u
          break
        case O.DRAW_CHARS:
          const Mt = I[1],
            Zo = I[2],
            ar = I[3],
            Kh = I[4]
          k = I[5]
          const Vh = I[6],
            Bo = I[7],
            Ko = I[8]
          v = I[9]
          const lr = I[10]
          ;(S = I[11]), (R = I[12])
          const Vo = [I[13], I[13]]
          p = I[14] || "declutter"
          const hr = this.textStates[R],
            sn = hr.font,
            rn = [hr.scale[0] * Bo, hr.scale[1] * Bo]
          let on
          sn in this.widths_
            ? (on = this.widths_[sn])
            : ((on = {}), (this.widths_[sn] = on))
          const jo = bl(c, Mt, Zo, 2),
            Ho = Math.abs(rn[0]) * Ea(sn, S, on)
          if (Kh || Ho <= jo) {
            const Zt = this.textStates[R].textAlign,
              oi = (jo - Ho) * Er(S, Zt),
              Bt = Kd(
                c,
                Mt,
                Zo,
                2,
                S,
                oi,
                Vh,
                Math.abs(rn[0]),
                Ea,
                sn,
                on,
                G ? 0 : this.viewRotation_,
              )
            t: if (Bt) {
              const le = []
              let Kt, ye, Ee, ut, Pt
              if (v)
                for (Kt = 0, ye = Bt.length; Kt < ye; ++Kt) {
                  ;(Pt = Bt[Kt]),
                    (Ee = Pt[4]),
                    (ut = this.createLabel(Ee, R, "", v)),
                    (_ = Pt[2] + (rn[0] < 0 ? -lr : lr)),
                    (m =
                      ar * ut.height +
                      ((0.5 - ar) * 2 * lr * rn[1]) / rn[0] -
                      Ko)
                  const xe = this.calculateImageOrLabelDimensions_(
                    ut.width,
                    ut.height,
                    Pt[0],
                    Pt[1],
                    ut.width,
                    ut.height,
                    _,
                    m,
                    0,
                    0,
                    Pt[3],
                    Vo,
                    !1,
                    fi,
                    !1,
                    q,
                  )
                  if (l && p === "declutter" && l.collides(xe.declutterBox))
                    break t
                  le.push([t, e, ut, xe, 1, null, null])
                }
              if (k)
                for (Kt = 0, ye = Bt.length; Kt < ye; ++Kt) {
                  ;(Pt = Bt[Kt]),
                    (Ee = Pt[4]),
                    (ut = this.createLabel(Ee, R, k, "")),
                    (_ = Pt[2]),
                    (m = ar * ut.height - Ko)
                  const xe = this.calculateImageOrLabelDimensions_(
                    ut.width,
                    ut.height,
                    Pt[0],
                    Pt[1],
                    ut.width,
                    ut.height,
                    _,
                    m,
                    0,
                    0,
                    Pt[3],
                    Vo,
                    !1,
                    fi,
                    !1,
                    q,
                  )
                  if (l && p === "declutter" && l.collides(xe.declutterBox))
                    break t
                  le.push([t, e, ut, xe, 1, null, null])
                }
              l && p !== "none" && l.load(le.map(Da))
              for (let xe = 0, jh = le.length; xe < jh; ++xe)
                this.replayImageOrLabel_.apply(this, le[xe])
            }
          }
          ++u
          break
        case O.END_GEOMETRY:
          if (o !== void 0) {
            q = I[1]
            const Zt = o(q, gt)
            if (Zt) return Zt
          }
          ++u
          break
        case O.FILL:
          at ? N++ : this.fill_(t), ++u
          break
        case O.MOVE_TO_LINE_TO:
          for (
            f = I[1],
              g = I[2],
              nt = c[f],
              Q = c[f + 1],
              E = (nt + 0.5) | 0,
              C = (Q + 0.5) | 0,
              (E !== y || C !== x) && (t.moveTo(nt, Q), (y = E), (x = C)),
              f += 2;
            f < g;
            f += 2
          )
            (nt = c[f]),
              (Q = c[f + 1]),
              (E = (nt + 0.5) | 0),
              (C = (Q + 0.5) | 0),
              (f == g - 2 || E !== y || C !== x) &&
                (t.lineTo(nt, Q), (y = E), (x = C))
          ++u
          break
        case O.SET_FILL_STYLE:
          ;(K = I),
            (this.alignAndScaleFill_ = I[2]),
            N && (this.fill_(t), (N = 0), z && (t.stroke(), (z = 0))),
            (t.fillStyle = I[1]),
            ++u
          break
        case O.SET_STROKE_STYLE:
          ;(V = I), z && (t.stroke(), (z = 0)), this.setStrokeStyle_(t, I), ++u
          break
        case O.STROKE:
          at ? z++ : t.stroke(), ++u
          break
        default:
          ++u
          break
      }
    }
    N && this.fill_(t), z && t.stroke()
  }
  execute(t, e, i, n, r, o) {
    ;(this.viewRotation_ = n),
      this.execute_(t, e, i, this.instructions, r, void 0, void 0, o)
  }
  executeHitDetection(t, e, i, n, r) {
    return (
      (this.viewRotation_ = i),
      this.execute_(
        t,
        [t.canvas.width, t.canvas.height],
        e,
        this.hitDetectionInstructions,
        !0,
        n,
        r,
      )
    )
  }
}
const En = ["Polygon", "Circle", "LineString", "Image", "Text", "Default"],
  eh = ["Image", "Text"],
  Hd = En.filter(s => !eh.includes(s))
class qd {
  constructor(t, e, i, n, r, o, a) {
    ;(this.maxExtent_ = t),
      (this.overlaps_ = n),
      (this.pixelRatio_ = i),
      (this.resolution_ = e),
      (this.renderBuffer_ = o),
      (this.executorsByZIndex_ = {}),
      (this.hitDetectionContext_ = null),
      (this.hitDetectionTransform_ = ne()),
      (this.renderedContext_ = null),
      (this.deferredZIndexContexts_ = {}),
      this.createExecutors_(r, a)
  }
  clip(t, e) {
    const i = this.getClipCoords(e)
    t.beginPath(),
      t.moveTo(i[0], i[1]),
      t.lineTo(i[2], i[3]),
      t.lineTo(i[4], i[5]),
      t.lineTo(i[6], i[7]),
      t.clip()
  }
  createExecutors_(t, e) {
    for (const i in t) {
      let n = this.executorsByZIndex_[i]
      n === void 0 && ((n = {}), (this.executorsByZIndex_[i] = n))
      const r = t[i]
      for (const o in r) {
        const a = r[o]
        n[o] = new jd(this.resolution_, this.pixelRatio_, this.overlaps_, a, e)
      }
    }
  }
  hasExecutors(t) {
    for (const e in this.executorsByZIndex_) {
      const i = this.executorsByZIndex_[e]
      for (let n = 0, r = t.length; n < r; ++n) if (t[n] in i) return !0
    }
    return !1
  }
  forEachFeatureAtCoordinate(t, e, i, n, r, o) {
    n = Math.round(n)
    const a = n * 2 + 1,
      l = _e(
        this.hitDetectionTransform_,
        n + 0.5,
        n + 0.5,
        1 / e,
        -1 / e,
        -i,
        -t[0],
        -t[1],
      ),
      h = !this.hitDetectionContext_
    h &&
      (this.hitDetectionContext_ = Rt(a, a, void 0, { willReadFrequently: !0 }))
    const c = this.hitDetectionContext_
    c.canvas.width !== a || c.canvas.height !== a
      ? ((c.canvas.width = a), (c.canvas.height = a))
      : h || c.clearRect(0, 0, a, a)
    let u
    this.renderBuffer_ !== void 0 &&
      ((u = $t()), mn(u, t), ro(u, e * (this.renderBuffer_ + n), u))
    const d = $d(n)
    let f
    function g(C, T) {
      const S = c.getImageData(0, 0, a, a).data
      for (let R = 0, v = d.length; R < v; R++)
        if (S[d[R]] > 0) {
          if (!o || (f !== "Image" && f !== "Text") || o.includes(C)) {
            const k = (d[R] - 3) / 4,
              N = n - (k % a),
              z = n - ((k / a) | 0),
              K = r(C, T, N * N + z * z)
            if (K) return K
          }
          c.clearRect(0, 0, a, a)
          break
        }
    }
    const _ = Object.keys(this.executorsByZIndex_).map(Number)
    _.sort(ve)
    let m, p, y, x, E
    for (m = _.length - 1; m >= 0; --m) {
      const C = _[m].toString()
      for (y = this.executorsByZIndex_[C], p = En.length - 1; p >= 0; --p)
        if (
          ((f = En[p]),
          (x = y[f]),
          x !== void 0 && ((E = x.executeHitDetection(c, l, i, g, u)), E))
        )
          return E
    }
  }
  getClipCoords(t) {
    const e = this.maxExtent_
    if (!e) return null
    const i = e[0],
      n = e[1],
      r = e[2],
      o = e[3],
      a = [i, n, i, o, r, o, r, n]
    return Je(a, 0, 8, 2, t, a), a
  }
  isEmpty() {
    return Wi(this.executorsByZIndex_)
  }
  execute(t, e, i, n, r, o, a) {
    const l = Object.keys(this.executorsByZIndex_).map(Number)
    l.sort(ve), (o = o || En)
    let h, c, u, d, f, g
    for (a && l.reverse(), h = 0, c = l.length; h < c; ++h) {
      const _ = l[h].toString()
      for (f = this.executorsByZIndex_[_], u = 0, d = o.length; u < d; ++u) {
        const m = o[u]
        if (((g = f[m]), g !== void 0)) {
          const p = a === null ? void 0 : g.getZIndexContext(),
            y = p ? p.getContext() : t,
            x = this.maxExtent_ && m !== "Image" && m !== "Text"
          if (
            (x && (y.save(), this.clip(y, i)),
            g.execute(y, e, i, n, r, a),
            x && y.restore(),
            p)
          ) {
            p.offset()
            const E = l[h]
            this.deferredZIndexContexts_[E] ||
              (this.deferredZIndexContexts_[E] = []),
              this.deferredZIndexContexts_[E].push(p)
          }
        }
      }
    }
    this.renderedContext_ = t
  }
  getDeferredZIndexContexts() {
    return this.deferredZIndexContexts_
  }
  getRenderedContext() {
    return this.renderedContext_
  }
  renderDeferred() {
    const t = this.deferredZIndexContexts_,
      e = Object.keys(t).map(Number).sort(ve)
    for (let i = 0, n = e.length; i < n; ++i)
      t[e[i]].forEach(r => {
        r.draw(this.renderedContext_), r.clear()
      })
  }
}
const xr = {}
function $d(s) {
  if (xr[s] !== void 0) return xr[s]
  const t = s * 2 + 1,
    e = s * s,
    i = new Array(e + 1)
  for (let r = 0; r <= s; ++r)
    for (let o = 0; o <= s; ++o) {
      const a = r * r + o * o
      if (a > e) break
      let l = i[a]
      l || ((l = []), (i[a] = l)),
        l.push(((s + r) * t + (s + o)) * 4 + 3),
        r > 0 && l.push(((s - r) * t + (s + o)) * 4 + 3),
        o > 0 &&
          (l.push(((s + r) * t + (s - o)) * 4 + 3),
          r > 0 && l.push(((s - r) * t + (s - o)) * 4 + 3))
    }
  const n = []
  for (let r = 0, o = i.length; r < o; ++r) i[r] && n.push(...i[r])
  return (xr[s] = n), n
}
class Jd extends $l {
  constructor(t, e, i, n, r, o, a) {
    super(),
      (this.context_ = t),
      (this.pixelRatio_ = e),
      (this.extent_ = i),
      (this.transform_ = n),
      (this.transformRotation_ = n ? ks(Math.atan2(n[1], n[0]), 10) : 0),
      (this.viewRotation_ = r),
      (this.squaredTolerance_ = o),
      (this.userTransform_ = a),
      (this.contextFillState_ = null),
      (this.contextStrokeState_ = null),
      (this.contextTextState_ = null),
      (this.fillState_ = null),
      (this.strokeState_ = null),
      (this.image_ = null),
      (this.imageAnchorX_ = 0),
      (this.imageAnchorY_ = 0),
      (this.imageHeight_ = 0),
      (this.imageOpacity_ = 0),
      (this.imageOriginX_ = 0),
      (this.imageOriginY_ = 0),
      (this.imageRotateWithView_ = !1),
      (this.imageRotation_ = 0),
      (this.imageScale_ = [0, 0]),
      (this.imageWidth_ = 0),
      (this.text_ = ""),
      (this.textOffsetX_ = 0),
      (this.textOffsetY_ = 0),
      (this.textRotateWithView_ = !1),
      (this.textRotation_ = 0),
      (this.textScale_ = [0, 0]),
      (this.textFillState_ = null),
      (this.textStrokeState_ = null),
      (this.textState_ = null),
      (this.pixelCoordinates_ = []),
      (this.tmpLocalTransform_ = ne())
  }
  drawImages_(t, e, i, n) {
    if (!this.image_) return
    const r = Je(t, e, i, n, this.transform_, this.pixelCoordinates_),
      o = this.context_,
      a = this.tmpLocalTransform_,
      l = o.globalAlpha
    this.imageOpacity_ != 1 && (o.globalAlpha = l * this.imageOpacity_)
    let h = this.imageRotation_
    this.transformRotation_ === 0 && (h -= this.viewRotation_),
      this.imageRotateWithView_ && (h += this.viewRotation_)
    for (let c = 0, u = r.length; c < u; c += 2) {
      const d = r[c] - this.imageAnchorX_,
        f = r[c + 1] - this.imageAnchorY_
      if (h !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const g = d + this.imageAnchorX_,
          _ = f + this.imageAnchorY_
        _e(a, g, _, 1, 1, h, -g, -_),
          o.save(),
          o.transform.apply(o, a),
          o.translate(g, _),
          o.scale(this.imageScale_[0], this.imageScale_[1]),
          o.drawImage(
            this.image_,
            this.imageOriginX_,
            this.imageOriginY_,
            this.imageWidth_,
            this.imageHeight_,
            -this.imageAnchorX_,
            -this.imageAnchorY_,
            this.imageWidth_,
            this.imageHeight_,
          ),
          o.restore()
      } else
        o.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          d,
          f,
          this.imageWidth_,
          this.imageHeight_,
        )
    }
    this.imageOpacity_ != 1 && (o.globalAlpha = l)
  }
  drawText_(t, e, i, n) {
    if (!this.textState_ || this.text_ === "") return
    this.textFillState_ && this.setContextFillState_(this.textFillState_),
      this.textStrokeState_ &&
        this.setContextStrokeState_(this.textStrokeState_),
      this.setContextTextState_(this.textState_)
    const r = Je(t, e, i, n, this.transform_, this.pixelCoordinates_),
      o = this.context_
    let a = this.textRotation_
    for (
      this.transformRotation_ === 0 && (a -= this.viewRotation_),
        this.textRotateWithView_ && (a += this.viewRotation_);
      e < i;
      e += n
    ) {
      const l = r[e] + this.textOffsetX_,
        h = r[e + 1] + this.textOffsetY_
      a !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1
        ? (o.save(),
          o.translate(l - this.textOffsetX_, h - this.textOffsetY_),
          o.rotate(a),
          o.translate(this.textOffsetX_, this.textOffsetY_),
          o.scale(this.textScale_[0], this.textScale_[1]),
          this.textStrokeState_ && o.strokeText(this.text_, 0, 0),
          this.textFillState_ && o.fillText(this.text_, 0, 0),
          o.restore())
        : (this.textStrokeState_ && o.strokeText(this.text_, l, h),
          this.textFillState_ && o.fillText(this.text_, l, h))
    }
  }
  moveToLineTo_(t, e, i, n, r) {
    const o = this.context_,
      a = Je(t, e, i, n, this.transform_, this.pixelCoordinates_)
    o.moveTo(a[0], a[1])
    let l = a.length
    r && (l -= 2)
    for (let h = 2; h < l; h += 2) o.lineTo(a[h], a[h + 1])
    return r && o.closePath(), i
  }
  drawRings_(t, e, i, n) {
    for (let r = 0, o = i.length; r < o; ++r)
      e = this.moveToLineTo_(t, e, i[r], n, !0)
    return e
  }
  drawCircle(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!Nt(this.extent_, t.getExtent()))
    ) {
      if (this.fillState_ || this.strokeState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_)
        const e = kc(t, this.transform_, this.pixelCoordinates_),
          i = e[2] - e[0],
          n = e[3] - e[1],
          r = Math.sqrt(i * i + n * n),
          o = this.context_
        o.beginPath(),
          o.arc(e[0], e[1], r, 0, 2 * Math.PI),
          this.fillState_ && o.fill(),
          this.strokeState_ && o.stroke()
      }
      this.text_ !== "" && this.drawText_(t.getCenter(), 0, 2, 2)
    }
  }
  setStyle(t) {
    this.setFillStrokeStyle(t.getFill(), t.getStroke()),
      this.setImageStyle(t.getImage()),
      this.setTextStyle(t.getText())
  }
  setTransform(t) {
    this.transform_ = t
  }
  drawGeometry(t) {
    switch (t.getType()) {
      case "Point":
        this.drawPoint(t)
        break
      case "LineString":
        this.drawLineString(t)
        break
      case "Polygon":
        this.drawPolygon(t)
        break
      case "MultiPoint":
        this.drawMultiPoint(t)
        break
      case "MultiLineString":
        this.drawMultiLineString(t)
        break
      case "MultiPolygon":
        this.drawMultiPolygon(t)
        break
      case "GeometryCollection":
        this.drawGeometryCollection(t)
        break
      case "Circle":
        this.drawCircle(t)
        break
    }
  }
  drawFeature(t, e) {
    const i = e.getGeometryFunction()(t)
    i && (this.setStyle(e), this.drawGeometry(i))
  }
  drawGeometryCollection(t) {
    const e = t.getGeometriesArray()
    for (let i = 0, n = e.length; i < n; ++i) this.drawGeometry(e[i])
  }
  drawPoint(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_))
    const e = t.getFlatCoordinates(),
      i = t.getStride()
    this.image_ && this.drawImages_(e, 0, e.length, i),
      this.text_ !== "" && this.drawText_(e, 0, e.length, i)
  }
  drawMultiPoint(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_))
    const e = t.getFlatCoordinates(),
      i = t.getStride()
    this.image_ && this.drawImages_(e, 0, e.length, i),
      this.text_ !== "" && this.drawText_(e, 0, e.length, i)
  }
  drawLineString(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!Nt(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_)
        const e = this.context_,
          i = t.getFlatCoordinates()
        e.beginPath(),
          this.moveToLineTo_(i, 0, i.length, t.getStride(), !1),
          e.stroke()
      }
      if (this.text_ !== "") {
        const e = t.getFlatMidpoint()
        this.drawText_(e, 0, 2, 2)
      }
    }
  }
  drawMultiLineString(t) {
    this.squaredTolerance_ &&
      (t = t.simplifyTransformed(this.squaredTolerance_, this.userTransform_))
    const e = t.getExtent()
    if (Nt(this.extent_, e)) {
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_)
        const i = this.context_,
          n = t.getFlatCoordinates()
        let r = 0
        const o = t.getEnds(),
          a = t.getStride()
        i.beginPath()
        for (let l = 0, h = o.length; l < h; ++l)
          r = this.moveToLineTo_(n, r, o[l], a, !1)
        i.stroke()
      }
      if (this.text_ !== "") {
        const i = t.getFlatMidpoints()
        this.drawText_(i, 0, i.length, 2)
      }
    }
  }
  drawPolygon(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!Nt(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_)
        const e = this.context_
        e.beginPath(),
          this.drawRings_(
            t.getOrientedFlatCoordinates(),
            0,
            t.getEnds(),
            t.getStride(),
          ),
          this.fillState_ && e.fill(),
          this.strokeState_ && e.stroke()
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoint()
        this.drawText_(e, 0, 2, 2)
      }
    }
  }
  drawMultiPolygon(t) {
    if (
      (this.squaredTolerance_ &&
        (t = t.simplifyTransformed(
          this.squaredTolerance_,
          this.userTransform_,
        )),
      !!Nt(this.extent_, t.getExtent()))
    ) {
      if (this.strokeState_ || this.fillState_) {
        this.fillState_ && this.setContextFillState_(this.fillState_),
          this.strokeState_ && this.setContextStrokeState_(this.strokeState_)
        const e = this.context_,
          i = t.getOrientedFlatCoordinates()
        let n = 0
        const r = t.getEndss(),
          o = t.getStride()
        e.beginPath()
        for (let a = 0, l = r.length; a < l; ++a) {
          const h = r[a]
          n = this.drawRings_(i, n, h, o)
        }
        this.fillState_ && e.fill(), this.strokeState_ && e.stroke()
      }
      if (this.text_ !== "") {
        const e = t.getFlatInteriorPoints()
        this.drawText_(e, 0, e.length, 2)
      }
    }
  }
  setContextFillState_(t) {
    const e = this.context_,
      i = this.contextFillState_
    i
      ? i.fillStyle != t.fillStyle &&
        ((i.fillStyle = t.fillStyle), (e.fillStyle = t.fillStyle))
      : ((e.fillStyle = t.fillStyle),
        (this.contextFillState_ = { fillStyle: t.fillStyle }))
  }
  setContextStrokeState_(t) {
    const e = this.context_,
      i = this.contextStrokeState_
    i
      ? (i.lineCap != t.lineCap &&
          ((i.lineCap = t.lineCap), (e.lineCap = t.lineCap)),
        si(i.lineDash, t.lineDash) || e.setLineDash((i.lineDash = t.lineDash)),
        i.lineDashOffset != t.lineDashOffset &&
          ((i.lineDashOffset = t.lineDashOffset),
          (e.lineDashOffset = t.lineDashOffset)),
        i.lineJoin != t.lineJoin &&
          ((i.lineJoin = t.lineJoin), (e.lineJoin = t.lineJoin)),
        i.lineWidth != t.lineWidth &&
          ((i.lineWidth = t.lineWidth), (e.lineWidth = t.lineWidth)),
        i.miterLimit != t.miterLimit &&
          ((i.miterLimit = t.miterLimit), (e.miterLimit = t.miterLimit)),
        i.strokeStyle != t.strokeStyle &&
          ((i.strokeStyle = t.strokeStyle), (e.strokeStyle = t.strokeStyle)))
      : ((e.lineCap = t.lineCap),
        e.setLineDash(t.lineDash),
        (e.lineDashOffset = t.lineDashOffset),
        (e.lineJoin = t.lineJoin),
        (e.lineWidth = t.lineWidth),
        (e.miterLimit = t.miterLimit),
        (e.strokeStyle = t.strokeStyle),
        (this.contextStrokeState_ = {
          lineCap: t.lineCap,
          lineDash: t.lineDash,
          lineDashOffset: t.lineDashOffset,
          lineJoin: t.lineJoin,
          lineWidth: t.lineWidth,
          miterLimit: t.miterLimit,
          strokeStyle: t.strokeStyle,
        }))
  }
  setContextTextState_(t) {
    const e = this.context_,
      i = this.contextTextState_,
      n = t.textAlign ? t.textAlign : Fn
    i
      ? (i.font != t.font && ((i.font = t.font), (e.font = t.font)),
        i.textAlign != n && ((i.textAlign = n), (e.textAlign = n)),
        i.textBaseline != t.textBaseline &&
          ((i.textBaseline = t.textBaseline),
          (e.textBaseline = t.textBaseline)))
      : ((e.font = t.font),
        (e.textAlign = n),
        (e.textBaseline = t.textBaseline),
        (this.contextTextState_ = {
          font: t.font,
          textAlign: n,
          textBaseline: t.textBaseline,
        }))
  }
  setFillStrokeStyle(t, e) {
    if (!t) this.fillState_ = null
    else {
      const i = t.getColor()
      this.fillState_ = { fillStyle: fe(i || Dt) }
    }
    if (!e) this.strokeState_ = null
    else {
      const i = e.getColor(),
        n = e.getLineCap(),
        r = e.getLineDash(),
        o = e.getLineDashOffset(),
        a = e.getLineJoin(),
        l = e.getWidth(),
        h = e.getMiterLimit(),
        c = r || Le
      this.strokeState_ = {
        lineCap: n !== void 0 ? n : Vi,
        lineDash: this.pixelRatio_ === 1 ? c : c.map(u => u * this.pixelRatio_),
        lineDashOffset: (o || Ae) * this.pixelRatio_,
        lineJoin: a !== void 0 ? a : ji,
        lineWidth: (l !== void 0 ? l : On) * this.pixelRatio_,
        miterLimit: h !== void 0 ? h : Mn,
        strokeStyle: fe(i || Pn),
      }
    }
  }
  setImageStyle(t) {
    let e
    if (!t || !(e = t.getSize())) {
      this.image_ = null
      return
    }
    const i = t.getPixelRatio(this.pixelRatio_),
      n = t.getAnchor(),
      r = t.getOrigin()
    ;(this.image_ = t.getImage(this.pixelRatio_)),
      (this.imageAnchorX_ = n[0] * i),
      (this.imageAnchorY_ = n[1] * i),
      (this.imageHeight_ = e[1] * i),
      (this.imageOpacity_ = t.getOpacity()),
      (this.imageOriginX_ = r[0]),
      (this.imageOriginY_ = r[1]),
      (this.imageRotateWithView_ = t.getRotateWithView()),
      (this.imageRotation_ = t.getRotation())
    const o = t.getScaleArray()
    ;(this.imageScale_ = [
      (o[0] * this.pixelRatio_) / i,
      (o[1] * this.pixelRatio_) / i,
    ]),
      (this.imageWidth_ = e[0] * i)
  }
  setTextStyle(t) {
    if (!t) this.text_ = ""
    else {
      const e = t.getFill()
      if (!e) this.textFillState_ = null
      else {
        const f = e.getColor()
        this.textFillState_ = { fillStyle: fe(f || Dt) }
      }
      const i = t.getStroke()
      if (!i) this.textStrokeState_ = null
      else {
        const f = i.getColor(),
          g = i.getLineCap(),
          _ = i.getLineDash(),
          m = i.getLineDashOffset(),
          p = i.getLineJoin(),
          y = i.getWidth(),
          x = i.getMiterLimit()
        this.textStrokeState_ = {
          lineCap: g !== void 0 ? g : Vi,
          lineDash: _ || Le,
          lineDashOffset: m || Ae,
          lineJoin: p !== void 0 ? p : ji,
          lineWidth: y !== void 0 ? y : On,
          miterLimit: x !== void 0 ? x : Mn,
          strokeStyle: fe(f || Pn),
        }
      }
      const n = t.getFont(),
        r = t.getOffsetX(),
        o = t.getOffsetY(),
        a = t.getRotateWithView(),
        l = t.getRotation(),
        h = t.getScaleArray(),
        c = t.getText(),
        u = t.getTextAlign(),
        d = t.getTextBaseline()
      ;(this.textState_ = {
        font: n !== void 0 ? n : Nl,
        textAlign: u !== void 0 ? u : Fn,
        textBaseline: d !== void 0 ? d : ys,
      }),
        (this.text_ =
          c !== void 0
            ? Array.isArray(c)
              ? c.reduce((f, g, _) => (f += _ % 2 ? " " : g), "")
              : c
            : ""),
        (this.textOffsetX_ = r !== void 0 ? this.pixelRatio_ * r : 0),
        (this.textOffsetY_ = o !== void 0 ? this.pixelRatio_ * o : 0),
        (this.textRotateWithView_ = a !== void 0 ? a : !1),
        (this.textRotation_ = l !== void 0 ? l : 0),
        (this.textScale_ = [this.pixelRatio_ * h[0], this.pixelRatio_ * h[1]])
    }
  }
}
const Qd = Jd,
  ce = 0.5
function tf(s, t, e, i, n, r, o, a, l) {
  const h = l ? uo(n) : n,
    c = s[0] * ce,
    u = s[1] * ce,
    d = Rt(c, u)
  d.imageSmoothingEnabled = !1
  const f = d.canvas,
    g = new Qd(d, ce, n, null, o, a, l ? Gs(Fc(), l) : null),
    _ = e.length,
    m = Math.floor((256 * 256 * 256 - 1) / _),
    p = {}
  for (let x = 1; x <= _; ++x) {
    const E = e[x - 1],
      C = E.getStyleFunction() || i
    if (!C) continue
    let T = C(E, r)
    if (!T) continue
    Array.isArray(T) || (T = [T])
    const R = (x * m).toString(16).padStart(7, "#00000")
    for (let v = 0, k = T.length; v < k; ++v) {
      const N = T[v],
        z = N.getGeometryFunction()(E)
      if (!z || !Nt(h, z.getExtent())) continue
      const K = N.clone(),
        V = K.getFill()
      V && V.setColor(R)
      const j = K.getStroke()
      j && (j.setColor(R), j.setLineDash(null)), K.setText(void 0)
      const M = N.getImage()
      if (M) {
        const q = M.getImageSize()
        if (!q) continue
        const nt = Rt(q[0], q[1], void 0, { alpha: !1 }),
          Q = nt.canvas
        ;(nt.fillStyle = R),
          nt.fillRect(0, 0, Q.width, Q.height),
          K.setImage(
            new js({
              img: Q,
              anchor: M.getAnchor(),
              anchorXUnits: "pixels",
              anchorYUnits: "pixels",
              offset: M.getOrigin(),
              opacity: 1,
              size: M.getSize(),
              scale: M.getScale(),
              rotation: M.getRotation(),
              rotateWithView: M.getRotateWithView(),
            }),
          )
      }
      const G = K.getZIndex() || 0
      let Z = p[G]
      Z ||
        ((Z = {}),
        (p[G] = Z),
        (Z.Polygon = []),
        (Z.Circle = []),
        (Z.LineString = []),
        (Z.Point = []))
      const at = z.getType()
      if (at === "GeometryCollection") {
        const q = z.getGeometriesArrayRecursive()
        for (let nt = 0, Q = q.length; nt < Q; ++nt) {
          const gt = q[nt]
          Z[gt.getType().replace("Multi", "")].push(gt, K)
        }
      } else Z[at.replace("Multi", "")].push(z, K)
    }
  }
  const y = Object.keys(p).map(Number).sort(ve)
  for (let x = 0, E = y.length; x < E; ++x) {
    const C = p[y[x]]
    for (const T in C) {
      const S = C[T]
      for (let R = 0, v = S.length; R < v; R += 2) {
        g.setStyle(S[R + 1])
        for (let k = 0, N = t.length; k < N; ++k)
          g.setTransform(t[k]), g.drawGeometry(S[R])
      }
    }
  }
  return d.getImageData(0, 0, f.width, f.height)
}
function ef(s, t, e) {
  const i = []
  if (e) {
    const n = Math.floor(Math.round(s[0]) * ce),
      r = Math.floor(Math.round(s[1]) * ce),
      o = (mt(n, 0, e.width - 1) + mt(r, 0, e.height - 1) * e.width) * 4,
      a = e.data[o],
      l = e.data[o + 1],
      c = e.data[o + 2] + 256 * (l + 256 * a),
      u = Math.floor((256 * 256 * 256 - 1) / t.length)
    c && c % u === 0 && i.push(t[c / u - 1])
  }
  return i
}
const nf = 0.5,
  ih = {
    Point: uf,
    LineString: lf,
    Polygon: ff,
    MultiPoint: df,
    MultiLineString: hf,
    MultiPolygon: cf,
    GeometryCollection: af,
    Circle: rf,
  }
function sf(s, t) {
  return parseInt(it(s), 10) - parseInt(it(t), 10)
}
function ka(s, t) {
  const e = nh(s, t)
  return e * e
}
function nh(s, t) {
  return (nf * s) / t
}
function rf(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke()
  if (r || o) {
    const l = s.getBuilder(e.getZIndex(), "Circle")
    l.setFillStrokeStyle(r, o), l.drawCircle(t, i, n)
  }
  const a = e.getText()
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text")
    l.setTextStyle(a), l.drawText(t, i)
  }
}
function Ga(s, t, e, i, n, r, o, a) {
  const l = [],
    h = e.getImage()
  if (h) {
    let d = !0
    const f = h.getImageState()
    f == X.LOADED || f == X.ERROR ? (d = !1) : f == X.IDLE && h.load(),
      d && l.push(h.ready())
  }
  const c = e.getFill()
  c && c.loading() && l.push(c.ready())
  const u = l.length > 0
  return u && Promise.all(l).then(() => n(null)), of(s, t, e, i, r, o, a), u
}
function of(s, t, e, i, n, r, o) {
  const a = e.getGeometryFunction()(t)
  if (!a) return
  const l = a.simplifyTransformed(i, n)
  if (e.getRenderer()) sh(s, l, e, t, o)
  else {
    const c = ih[l.getType()]
    c(s, l, e, t, o, r)
  }
}
function sh(s, t, e, i, n) {
  if (t.getType() == "GeometryCollection") {
    const o = t.getGeometries()
    for (let a = 0, l = o.length; a < l; ++a) sh(s, o[a], e, i, n)
    return
  }
  s.getBuilder(e.getZIndex(), "Default").drawCustom(
    t,
    i,
    e.getRenderer(),
    e.getHitDetectionRenderer(),
    n,
  )
}
function af(s, t, e, i, n, r) {
  const o = t.getGeometriesArray()
  let a, l
  for (a = 0, l = o.length; a < l; ++a) {
    const h = ih[o[a].getType()]
    h(s, o[a], e, i, n, r)
  }
}
function lf(s, t, e, i, n) {
  const r = e.getStroke()
  if (r) {
    const a = s.getBuilder(e.getZIndex(), "LineString")
    a.setFillStrokeStyle(null, r), a.drawLineString(t, i, n)
  }
  const o = e.getText()
  if (o && o.getText()) {
    const a = s.getBuilder(e.getZIndex(), "Text")
    a.setTextStyle(o), a.drawText(t, i, n)
  }
}
function hf(s, t, e, i, n) {
  const r = e.getStroke()
  if (r) {
    const a = s.getBuilder(e.getZIndex(), "LineString")
    a.setFillStrokeStyle(null, r), a.drawMultiLineString(t, i, n)
  }
  const o = e.getText()
  if (o && o.getText()) {
    const a = s.getBuilder(e.getZIndex(), "Text")
    a.setTextStyle(o), a.drawText(t, i, n)
  }
}
function cf(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke()
  if (o || r) {
    const l = s.getBuilder(e.getZIndex(), "Polygon")
    l.setFillStrokeStyle(r, o), l.drawMultiPolygon(t, i, n)
  }
  const a = e.getText()
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text")
    l.setTextStyle(a), l.drawText(t, i, n)
  }
}
function uf(s, t, e, i, n, r) {
  const o = e.getImage(),
    a = e.getText(),
    l = a && a.getText(),
    h = r && o && l ? {} : void 0
  if (o) {
    if (o.getImageState() != X.LOADED) return
    const c = s.getBuilder(e.getZIndex(), "Image")
    c.setImageStyle(o, h), c.drawPoint(t, i, n)
  }
  if (l) {
    const c = s.getBuilder(e.getZIndex(), "Text")
    c.setTextStyle(a, h), c.drawText(t, i, n)
  }
}
function df(s, t, e, i, n, r) {
  const o = e.getImage(),
    a = o && o.getOpacity() !== 0,
    l = e.getText(),
    h = l && l.getText(),
    c = r && a && h ? {} : void 0
  if (a) {
    if (o.getImageState() != X.LOADED) return
    const u = s.getBuilder(e.getZIndex(), "Image")
    u.setImageStyle(o, c), u.drawMultiPoint(t, i, n)
  }
  if (h) {
    const u = s.getBuilder(e.getZIndex(), "Text")
    u.setTextStyle(l, c), u.drawText(t, i, n)
  }
}
function ff(s, t, e, i, n) {
  const r = e.getFill(),
    o = e.getStroke()
  if (r || o) {
    const l = s.getBuilder(e.getZIndex(), "Polygon")
    l.setFillStrokeStyle(r, o), l.drawPolygon(t, i, n)
  }
  const a = e.getText()
  if (a && a.getText()) {
    const l = s.getBuilder(e.getZIndex(), "Text")
    l.setTextStyle(a), l.drawText(t, i, n)
  }
}
class gf extends th {
  constructor(t) {
    super(t),
      (this.boundHandleStyleImageChange_ =
        this.handleStyleImageChange_.bind(this)),
      this.animatingOrInteracting_,
      (this.hitDetectionImageData_ = null),
      (this.renderedFeatures_ = null),
      (this.renderedRevision_ = -1),
      (this.renderedResolution_ = NaN),
      (this.renderedExtent_ = $t()),
      (this.wrappedRenderedExtent_ = $t()),
      this.renderedRotation_,
      (this.renderedCenter_ = null),
      (this.renderedProjection_ = null),
      (this.renderedPixelRatio_ = 1),
      (this.renderedRenderOrder_ = null),
      (this.replayGroup_ = null),
      (this.replayGroupChanged = !0),
      (this.clipping = !0),
      (this.targetContext_ = null),
      (this.opacity_ = 1)
  }
  renderWorlds(t, e, i) {
    const n = e.extent,
      r = e.viewState,
      o = r.center,
      a = r.resolution,
      l = r.projection,
      h = r.rotation,
      c = l.getExtent(),
      u = this.getLayer().getSource(),
      d = this.getLayer().getDeclutter(),
      f = e.pixelRatio,
      g = e.viewHints,
      _ = !(g[It.ANIMATING] || g[It.INTERACTING]),
      m = this.context,
      p = Math.round((rt(n) / a) * f),
      y = Math.round((vt(n) / a) * f),
      x = u.getWrapX() && l.canWrapX(),
      E = x ? rt(c) : null,
      C = x ? Math.ceil((n[2] - c[2]) / E) + 1 : 1
    let T = x ? Math.floor((n[0] - c[0]) / E) : 0
    do {
      const S = this.getRenderTransform(o, a, h, f, p, y, T * E)
      t.execute(
        m,
        [m.canvas.width, m.canvas.height],
        S,
        h,
        _,
        i === void 0 ? En : i ? eh : Hd,
        i ? d && e.declutter[d] : void 0,
      )
    } while (++T < C)
  }
  setDrawContext_() {
    this.opacity_ !== 1 &&
      ((this.targetContext_ = this.context),
      (this.context = Rt(
        this.context.canvas.width,
        this.context.canvas.height,
        ba,
      )))
  }
  resetDrawContext_() {
    if (this.opacity_ !== 1) {
      const t = this.targetContext_.globalAlpha
      ;(this.targetContext_.globalAlpha = this.opacity_),
        this.targetContext_.drawImage(this.context.canvas, 0, 0),
        (this.targetContext_.globalAlpha = t),
        Us(this.context),
        ba.push(this.context.canvas),
        (this.context = this.targetContext_),
        (this.targetContext_ = null)
    }
  }
  renderDeclutter(t) {
    !this.replayGroup_ ||
      !this.getLayer().getDeclutter() ||
      this.renderWorlds(this.replayGroup_, t, !0)
  }
  renderDeferredInternal(t) {
    this.replayGroup_ &&
      (this.replayGroup_.renderDeferred(), this.resetDrawContext_())
  }
  renderFrame(t, e) {
    const i = t.pixelRatio,
      n = t.layerStatesArray[t.layerIndex]
    this.opacity_ = n.opacity
    const r = t.extent,
      o = t.viewState.resolution,
      a = Math.round((rt(r) / o) * i),
      l = Math.round((vt(r) / o) * i)
    _e(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / i,
      1 / i,
      0,
      -a / 2,
      -l / 2,
    ),
      so(this.inversePixelTransform, this.pixelTransform)
    const h = rl(this.pixelTransform)
    this.useContainer(e, h, this.getBackground(t))
    const c = this.context,
      u = c.canvas,
      d = this.replayGroup_
    let f = d && !d.isEmpty()
    if (
      !f &&
      !(
        this.getLayer().hasListener(Ht.PRERENDER) ||
        this.getLayer().hasListener(Ht.POSTRENDER)
      )
    )
      return null
    u.width != a || u.height != l
      ? ((u.width = a),
        (u.height = l),
        u.style.transform !== h && (u.style.transform = h))
      : this.containerReused || c.clearRect(0, 0, a, l),
      this.setDrawContext_(),
      this.preRender(c, t)
    const g = t.viewState
    g.projection
    let _ = !1
    if (f && n.extent && this.clipping) {
      const m = ui(n.extent)
      ;(f = Nt(m, t.extent)),
        (_ = f && !Di(m, t.extent)),
        _ && this.clipUnrotated(c, t, m)
    }
    return (
      f &&
        this.renderWorlds(d, t, this.getLayer().getDeclutter() ? !1 : void 0),
      _ && c.restore(),
      this.postRender(c, t),
      this.renderedRotation_ !== g.rotation &&
        ((this.renderedRotation_ = g.rotation),
        (this.hitDetectionImageData_ = null)),
      t.declutter || this.resetDrawContext_(),
      this.container
    )
  }
  getFeatures(t) {
    return new Promise(e => {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const i = [this.context.canvas.width, this.context.canvas.height]
        Et(this.pixelTransform, i)
        const n = this.renderedCenter_,
          r = this.renderedResolution_,
          o = this.renderedRotation_,
          a = this.renderedProjection_,
          l = this.wrappedRenderedExtent_,
          h = this.getLayer(),
          c = [],
          u = i[0] * ce,
          d = i[1] * ce
        c.push(this.getRenderTransform(n, r, o, ce, u, d, 0).slice())
        const f = h.getSource(),
          g = a.getExtent()
        if (f.getWrapX() && a.canWrapX() && !Di(g, l)) {
          let _ = l[0]
          const m = rt(g)
          let p = 0,
            y
          for (; _ < g[0]; )
            --p,
              (y = m * p),
              c.push(this.getRenderTransform(n, r, o, ce, u, d, y).slice()),
              (_ += m)
          for (p = 0, _ = l[2]; _ > g[2]; )
            ++p,
              (y = m * p),
              c.push(this.getRenderTransform(n, r, o, ce, u, d, y).slice()),
              (_ -= m)
        }
        this.hitDetectionImageData_ = tf(
          i,
          c,
          this.renderedFeatures_,
          h.getStyleFunction(),
          l,
          r,
          o,
          ka(r, this.renderedPixelRatio_),
          null,
        )
      }
      e(ef(t, this.renderedFeatures_, this.hitDetectionImageData_))
    })
  }
  forEachFeatureAtCoordinate(t, e, i, n, r) {
    if (!this.replayGroup_) return
    const o = e.viewState.resolution,
      a = e.viewState.rotation,
      l = this.getLayer(),
      h = {},
      c = function (g, _, m) {
        const p = it(g),
          y = h[p]
        if (y) {
          if (y !== !0 && m < y.distanceSq) {
            if (m === 0)
              return (h[p] = !0), r.splice(r.lastIndexOf(y), 1), n(g, l, _)
            ;(y.geometry = _), (y.distanceSq = m)
          }
        } else {
          if (m === 0) return (h[p] = !0), n(g, l, _)
          r.push(
            (h[p] = {
              feature: g,
              layer: l,
              geometry: _,
              distanceSq: m,
              callback: n,
            }),
          )
        }
      }
    let u
    const d = [this.replayGroup_],
      f = this.getLayer().getDeclutter()
    return (
      d.some(
        g =>
          (u = g.forEachFeatureAtCoordinate(
            t,
            o,
            a,
            i,
            c,
            f && e.declutter[f] ? e.declutter[f].all().map(_ => _.value) : null,
          )),
      ),
      u
    )
  }
  handleFontsChanged() {
    const t = this.getLayer()
    t.getVisible() && this.replayGroup_ && t.changed()
  }
  handleStyleImageChange_(t) {
    this.renderIfReadyAndVisible()
  }
  prepareFrame(t) {
    const e = this.getLayer(),
      i = e.getSource()
    if (!i) return !1
    const n = t.viewHints[It.ANIMATING],
      r = t.viewHints[It.INTERACTING],
      o = e.getUpdateWhileAnimating(),
      a = e.getUpdateWhileInteracting()
    if ((this.ready && !o && n) || (!a && r))
      return (this.animatingOrInteracting_ = !0), !0
    this.animatingOrInteracting_ = !1
    const l = t.extent,
      h = t.viewState,
      c = h.projection,
      u = h.resolution,
      d = t.pixelRatio,
      f = e.getRevision(),
      g = e.getRenderBuffer()
    let _ = e.getRenderOrder()
    _ === void 0 && (_ = sf)
    const m = h.center.slice(),
      p = ro(l, g * u),
      y = p.slice(),
      x = [p.slice()],
      E = c.getExtent()
    if (i.getWrapX() && c.canWrapX() && !Di(E, t.extent)) {
      const V = rt(E),
        j = Math.max(rt(p) / 2, V)
      ;(p[0] = E[0] - j), (p[2] = E[2] + j), fl(m, c)
      const M = ul(x[0], c)
      M[0] < E[0] && M[2] < E[2]
        ? x.push([M[0] + V, M[1], M[2] + V, M[3]])
        : M[0] > E[0] && M[2] > E[2] && x.push([M[0] - V, M[1], M[2] - V, M[3]])
    }
    if (
      this.ready &&
      this.renderedResolution_ == u &&
      this.renderedRevision_ == f &&
      this.renderedRenderOrder_ == _ &&
      Di(this.wrappedRenderedExtent_, p)
    )
      return (
        si(this.renderedExtent_, y) ||
          ((this.hitDetectionImageData_ = null), (this.renderedExtent_ = y)),
        (this.renderedCenter_ = m),
        (this.replayGroupChanged = !1),
        !0
      )
    this.replayGroup_ = null
    const C = new Wd(nh(u, d), p, u, d)
    let T
    for (let V = 0, j = x.length; V < j; ++V) i.loadFeatures(x[V], u, c)
    const S = ka(u, d)
    let R = !0
    const v = (V, j) => {
        let M
        const G = V.getStyleFunction() || e.getStyleFunction()
        if ((G && (M = G(V, u)), M)) {
          const Z = this.renderFeature(
            V,
            S,
            M,
            C,
            T,
            this.getLayer().getDeclutter(),
            j,
          )
          R = R && !Z
        }
      },
      k = uo(p),
      N = i.getFeaturesInExtent(k)
    _ && N.sort(_)
    for (let V = 0, j = N.length; V < j; ++V) v(N[V], V)
    ;(this.renderedFeatures_ = N), (this.ready = R)
    const z = C.finish(),
      K = new qd(
        p,
        u,
        d,
        i.getOverlaps(),
        z,
        e.getRenderBuffer(),
        !!t.declutter,
      )
    return (
      (this.renderedResolution_ = u),
      (this.renderedRevision_ = f),
      (this.renderedRenderOrder_ = _),
      (this.renderedExtent_ = y),
      (this.wrappedRenderedExtent_ = p),
      (this.renderedCenter_ = m),
      (this.renderedProjection_ = c),
      (this.renderedPixelRatio_ = d),
      (this.replayGroup_ = K),
      (this.hitDetectionImageData_ = null),
      (this.replayGroupChanged = !0),
      !0
    )
  }
  renderFeature(t, e, i, n, r, o, a) {
    if (!i) return !1
    let l = !1
    if (Array.isArray(i))
      for (let h = 0, c = i.length; h < c; ++h)
        l = Ga(n, t, i[h], e, this.boundHandleStyleImageChange_, r, o, a) || l
    else l = Ga(n, t, i, e, this.boundHandleStyleImageChange_, r, o, a)
    return l
  }
}
class _f extends ql {
  constructor(t) {
    super(t)
  }
  createRenderer() {
    return new gf(this)
  }
}
class za {
  constructor(t) {
    ;(this.rbush_ = new Xl(t)), (this.items_ = {})
  }
  insert(t, e) {
    const i = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3], value: e }
    this.rbush_.insert(i), (this.items_[it(e)] = i)
  }
  load(t, e) {
    const i = new Array(e.length)
    for (let n = 0, r = e.length; n < r; n++) {
      const o = t[n],
        a = e[n],
        l = { minX: o[0], minY: o[1], maxX: o[2], maxY: o[3], value: a }
      ;(i[n] = l), (this.items_[it(a)] = l)
    }
    this.rbush_.load(i)
  }
  remove(t) {
    const e = it(t),
      i = this.items_[e]
    return delete this.items_[e], this.rbush_.remove(i) !== null
  }
  update(t, e) {
    const i = this.items_[it(e)],
      n = [i.minX, i.minY, i.maxX, i.maxY]
    Sn(n, t) || (this.remove(e), this.insert(t, e))
  }
  getAll() {
    return this.rbush_.all().map(function (e) {
      return e.value
    })
  }
  getInExtent(t) {
    const e = { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] }
    return this.rbush_.search(e).map(function (n) {
      return n.value
    })
  }
  forEach(t) {
    return this.forEach_(this.getAll(), t)
  }
  forEachInExtent(t, e) {
    return this.forEach_(this.getInExtent(t), e)
  }
  forEach_(t, e) {
    let i
    for (let n = 0, r = t.length; n < r; n++) if (((i = e(t[n])), i)) return i
    return i
  }
  isEmpty() {
    return Wi(this.items_)
  }
  clear() {
    this.rbush_.clear(), (this.items_ = {})
  }
  getExtent(t) {
    const e = this.rbush_.toJSON()
    return Qe(e.minX, e.minY, e.maxX, e.maxY, t)
  }
  concat(t) {
    this.rbush_.load(t.rbush_.all())
    for (const e in t.items_) this.items_[e] = t.items_[e]
  }
}
class Rs extends yl {
  constructor(t) {
    super(),
      (this.geometries_ = t),
      (this.changeEventsKeys_ = []),
      this.listenGeometriesChange_()
  }
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(lt), (this.changeEventsKeys_.length = 0)
  }
  listenGeometriesChange_() {
    const t = this.geometries_
    for (let e = 0, i = t.length; e < i; ++e)
      this.changeEventsKeys_.push(H(t[e], U.CHANGE, this.changed, this))
  }
  clone() {
    const t = new Rs(Cr(this.geometries_))
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    if (n < xi(this.getExtent(), t, e)) return n
    const r = this.geometries_
    for (let o = 0, a = r.length; o < a; ++o)
      n = r[o].closestPointXY(t, e, i, n)
    return n
  }
  containsXY(t, e) {
    const i = this.geometries_
    for (let n = 0, r = i.length; n < r; ++n)
      if (i[n].containsXY(t, e)) return !0
    return !1
  }
  computeExtent(t) {
    zn(t)
    const e = this.geometries_
    for (let i = 0, n = e.length; i < n; ++i) ll(t, e[i].getExtent())
    return t
  }
  getGeometries() {
    return Cr(this.geometries_)
  }
  getGeometriesArray() {
    return this.geometries_
  }
  getGeometriesArrayRecursive() {
    let t = []
    const e = this.geometries_
    for (let i = 0, n = e.length; i < n; ++i)
      e[i].getType() === this.getType()
        ? (t = t.concat(e[i].getGeometriesArrayRecursive()))
        : t.push(e[i])
    return t
  }
  getSimplifiedGeometry(t) {
    if (
      (this.simplifiedGeometryRevision !== this.getRevision() &&
        ((this.simplifiedGeometryMaxMinSquaredTolerance = 0),
        (this.simplifiedGeometryRevision = this.getRevision())),
      t < 0 ||
        (this.simplifiedGeometryMaxMinSquaredTolerance !== 0 &&
          t < this.simplifiedGeometryMaxMinSquaredTolerance))
    )
      return this
    const e = [],
      i = this.geometries_
    let n = !1
    for (let r = 0, o = i.length; r < o; ++r) {
      const a = i[r],
        l = a.getSimplifiedGeometry(t)
      e.push(l), l !== a && (n = !0)
    }
    return n
      ? new Rs(e)
      : ((this.simplifiedGeometryMaxMinSquaredTolerance = t), this)
  }
  getType() {
    return "GeometryCollection"
  }
  intersectsExtent(t) {
    const e = this.geometries_
    for (let i = 0, n = e.length; i < n; ++i)
      if (e[i].intersectsExtent(t)) return !0
    return !1
  }
  isEmpty() {
    return this.geometries_.length === 0
  }
  rotate(t, e) {
    const i = this.geometries_
    for (let n = 0, r = i.length; n < r; ++n) i[n].rotate(t, e)
    this.changed()
  }
  scale(t, e, i) {
    i || (i = ti(this.getExtent()))
    const n = this.geometries_
    for (let r = 0, o = n.length; r < o; ++r) n[r].scale(t, e, i)
    this.changed()
  }
  setGeometries(t) {
    this.setGeometriesArray(Cr(t))
  }
  setGeometriesArray(t) {
    this.unlistenGeometriesChange_(),
      (this.geometries_ = t),
      this.listenGeometriesChange_(),
      this.changed()
  }
  applyTransform(t) {
    const e = this.geometries_
    for (let i = 0, n = e.length; i < n; ++i) e[i].applyTransform(t)
    this.changed()
  }
  translate(t, e) {
    const i = this.geometries_
    for (let n = 0, r = i.length; n < r; ++n) i[n].translate(t, e)
    this.changed()
  }
  disposeInternal() {
    this.unlistenGeometriesChange_(), super.disposeInternal()
  }
}
function Cr(s) {
  return s.map(t => t.clone())
}
const Ei = Rs
class Ss extends wi {
  constructor(t, e, i) {
    if (
      (super(),
      (this.ends_ = []),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      Array.isArray(t[0]))
    )
      this.setCoordinates(t, e)
    else if (e !== void 0 && i) this.setFlatCoordinates(e, t), (this.ends_ = i)
    else {
      const n = t,
        r = [],
        o = []
      for (let l = 0, h = n.length; l < h; ++l) {
        const c = n[l]
        tt(r, c.getFlatCoordinates()), o.push(r.length)
      }
      const a = n.length === 0 ? this.getLayout() : n[0].getLayout()
      this.setFlatCoordinates(a, r), (this.ends_ = o)
    }
  }
  appendLineString(t) {
    tt(this.flatCoordinates, t.getFlatCoordinates().slice()),
      this.ends_.push(this.flatCoordinates.length),
      this.changed()
  }
  clone() {
    const t = new Ss(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice(),
    )
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    return n < xi(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            go(this.flatCoordinates, 0, this.ends_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        mo(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          this.maxDelta_,
          !1,
          t,
          e,
          i,
          n,
        ))
  }
  getCoordinateAtM(t, e, i) {
    return (this.layout != "XYM" && this.layout != "XYZM") ||
      this.flatCoordinates.length === 0
      ? null
      : ((e = e !== void 0 ? e : !1),
        (i = i !== void 0 ? i : !1),
        _u(this.flatCoordinates, 0, this.ends_, this.stride, t, e, i))
  }
  getCoordinates() {
    return vn(this.flatCoordinates, 0, this.ends_, this.stride)
  }
  getEnds() {
    return this.ends_
  }
  getLineString(t) {
    return t < 0 || this.ends_.length <= t
      ? null
      : new ps(
          this.flatCoordinates.slice(
            t === 0 ? 0 : this.ends_[t - 1],
            this.ends_[t],
          ),
          this.layout,
        )
  }
  getLineStrings() {
    const t = this.flatCoordinates,
      e = this.ends_,
      i = this.layout,
      n = []
    let r = 0
    for (let o = 0, a = e.length; o < a; ++o) {
      const l = e[o],
        h = new ps(t.slice(r, l), i)
      n.push(h), (r = l)
    }
    return n
  }
  getFlatMidpoints() {
    const t = [],
      e = this.flatCoordinates
    let i = 0
    const n = this.ends_,
      r = this.stride
    for (let o = 0, a = n.length; o < a; ++o) {
      const l = n[o],
        h = _s(e, i, l, r, 0.5)
      tt(t, h), (i = l)
    }
    return t
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = []
    return (
      (e.length = El(
        this.flatCoordinates,
        0,
        this.ends_,
        this.stride,
        t,
        e,
        0,
        i,
      )),
      new Ss(e, "XY", i)
    )
  }
  getType() {
    return "MultiLineString"
  }
  intersectsExtent(t) {
    return Vc(this.flatCoordinates, 0, this.ends_, this.stride, t)
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 2), this.flatCoordinates || (this.flatCoordinates = [])
    const i = po(this.flatCoordinates, 0, t, this.stride, this.ends_)
    ;(this.flatCoordinates.length = i.length === 0 ? 0 : i[i.length - 1]),
      this.changed()
  }
}
const rh = Ss
class Js extends wi {
  constructor(t, e) {
    super(),
      e && !Array.isArray(t[0])
        ? this.setFlatCoordinates(e, t)
        : this.setCoordinates(t, e)
  }
  appendPoint(t) {
    tt(this.flatCoordinates, t.getFlatCoordinates()), this.changed()
  }
  clone() {
    const t = new Js(this.flatCoordinates.slice(), this.layout)
    return t.applyProperties(this), t
  }
  closestPointXY(t, e, i, n) {
    if (n < xi(this.getExtent(), t, e)) return n
    const r = this.flatCoordinates,
      o = this.stride
    for (let a = 0, l = r.length; a < l; a += o) {
      const h = pi(t, e, r[a], r[a + 1])
      if (h < n) {
        n = h
        for (let c = 0; c < o; ++c) i[c] = r[a + c]
        i.length = o
      }
    }
    return n
  }
  getCoordinates() {
    return Ve(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride)
  }
  getPoint(t) {
    const e = this.flatCoordinates.length / this.stride
    return t < 0 || e <= t
      ? null
      : new Bi(
          this.flatCoordinates.slice(t * this.stride, (t + 1) * this.stride),
          this.layout,
        )
  }
  getPoints() {
    const t = this.flatCoordinates,
      e = this.layout,
      i = this.stride,
      n = []
    for (let r = 0, o = t.length; r < o; r += i) {
      const a = new Bi(t.slice(r, r + i), e)
      n.push(a)
    }
    return n
  }
  getType() {
    return "MultiPoint"
  }
  intersectsExtent(t) {
    const e = this.flatCoordinates,
      i = this.stride
    for (let n = 0, r = e.length; n < r; n += i) {
      const o = e[n],
        a = e[n + 1]
      if (oo(t, o, a)) return !0
    }
    return !1
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 1),
      this.flatCoordinates || (this.flatCoordinates = []),
      (this.flatCoordinates.length = zs(
        this.flatCoordinates,
        0,
        t,
        this.stride,
      )),
      this.changed()
  }
}
function oh(s, t, e, i) {
  const n = []
  let r = $t()
  for (let o = 0, a = e.length; o < a; ++o) {
    const l = e[o]
    ;(r = ao(s, t, l[0], i)),
      n.push((r[0] + r[2]) / 2, (r[1] + r[3]) / 2),
      (t = l[l.length - 1])
  }
  return n
}
class Ts extends wi {
  constructor(t, e, i) {
    if (
      (super(),
      (this.endss_ = []),
      (this.flatInteriorPointsRevision_ = -1),
      (this.flatInteriorPoints_ = null),
      (this.maxDelta_ = -1),
      (this.maxDeltaRevision_ = -1),
      (this.orientedRevision_ = -1),
      (this.orientedFlatCoordinates_ = null),
      !i && !Array.isArray(t[0]))
    ) {
      const n = t,
        r = [],
        o = []
      for (let a = 0, l = n.length; a < l; ++a) {
        const h = n[a],
          c = r.length,
          u = h.getEnds()
        for (let d = 0, f = u.length; d < f; ++d) u[d] += c
        tt(r, h.getFlatCoordinates()), o.push(u)
      }
      ;(e = n.length === 0 ? this.getLayout() : n[0].getLayout()),
        (t = r),
        (i = o)
    }
    e !== void 0 && i
      ? (this.setFlatCoordinates(e, t), (this.endss_ = i))
      : this.setCoordinates(t, e)
  }
  appendPolygon(t) {
    let e
    if (!this.flatCoordinates)
      (this.flatCoordinates = t.getFlatCoordinates().slice()),
        (e = t.getEnds().slice()),
        this.endss_.push()
    else {
      const i = this.flatCoordinates.length
      tt(this.flatCoordinates, t.getFlatCoordinates()),
        (e = t.getEnds().slice())
      for (let n = 0, r = e.length; n < r; ++n) e[n] += i
    }
    this.endss_.push(e), this.changed()
  }
  clone() {
    const t = this.endss_.length,
      e = new Array(t)
    for (let n = 0; n < t; ++n) e[n] = this.endss_[n].slice()
    const i = new Ts(this.flatCoordinates.slice(), this.layout, e)
    return i.applyProperties(this), i
  }
  closestPointXY(t, e, i, n) {
    return n < xi(this.getExtent(), t, e)
      ? n
      : (this.maxDeltaRevision_ != this.getRevision() &&
          ((this.maxDelta_ = Math.sqrt(
            Gc(this.flatCoordinates, 0, this.endss_, this.stride, 0),
          )),
          (this.maxDeltaRevision_ = this.getRevision())),
        zc(
          this.getOrientedFlatCoordinates(),
          0,
          this.endss_,
          this.stride,
          this.maxDelta_,
          !0,
          t,
          e,
          i,
          n,
        ))
  }
  containsXY(t, e) {
    return Kc(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      t,
      e,
    )
  }
  getArea() {
    return Zc(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride)
  }
  getCoordinates(t) {
    let e
    return (
      t !== void 0
        ? ((e = this.getOrientedFlatCoordinates().slice()),
          ca(e, 0, this.endss_, this.stride, t))
        : (e = this.flatCoordinates),
      zr(e, 0, this.endss_, this.stride)
    )
  }
  getEndss() {
    return this.endss_
  }
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const t = oh(this.flatCoordinates, 0, this.endss_, this.stride)
      ;(this.flatInteriorPoints_ = wl(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        t,
      )),
        (this.flatInteriorPointsRevision_ = this.getRevision())
    }
    return this.flatInteriorPoints_
  }
  getInteriorPoints() {
    return new Js(this.getFlatInteriorPoints().slice(), "XYM")
  }
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const t = this.flatCoordinates
      qc(t, 0, this.endss_, this.stride)
        ? (this.orientedFlatCoordinates_ = t)
        : ((this.orientedFlatCoordinates_ = t.slice()),
          (this.orientedFlatCoordinates_.length = ca(
            this.orientedFlatCoordinates_,
            0,
            this.endss_,
            this.stride,
          ))),
        (this.orientedRevision_ = this.getRevision())
    }
    return this.orientedFlatCoordinates_
  }
  getSimplifiedGeometryInternal(t) {
    const e = [],
      i = []
    return (
      (e.length = Wc(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride,
        Math.sqrt(t),
        e,
        0,
        i,
      )),
      new Ts(e, "XY", i)
    )
  }
  getPolygon(t) {
    if (t < 0 || this.endss_.length <= t) return null
    let e
    if (t === 0) e = 0
    else {
      const r = this.endss_[t - 1]
      e = r[r.length - 1]
    }
    const i = this.endss_[t].slice(),
      n = i[i.length - 1]
    if (e !== 0) for (let r = 0, o = i.length; r < o; ++r) i[r] -= e
    return new Me(this.flatCoordinates.slice(e, n), this.layout, i)
  }
  getPolygons() {
    const t = this.layout,
      e = this.flatCoordinates,
      i = this.endss_,
      n = []
    let r = 0
    for (let o = 0, a = i.length; o < a; ++o) {
      const l = i[o].slice(),
        h = l[l.length - 1]
      if (r !== 0) for (let u = 0, d = l.length; u < d; ++u) l[u] -= r
      const c = new Me(e.slice(r, h), t, l)
      n.push(c), (r = h)
    }
    return n
  }
  getType() {
    return "MultiPolygon"
  }
  intersectsExtent(t) {
    return jc(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, t)
  }
  setCoordinates(t, e) {
    this.setLayout(e, t, 3), this.flatCoordinates || (this.flatCoordinates = [])
    const i = Xc(this.flatCoordinates, 0, t, this.stride, this.endss_)
    if (i.length === 0) this.flatCoordinates.length = 0
    else {
      const n = i[i.length - 1]
      this.flatCoordinates.length = n.length === 0 ? 0 : n[n.length - 1]
    }
    this.changed()
  }
}
const Ya = ne()
class jt {
  constructor(t, e, i, n, r, o) {
    this.styleFunction,
      this.extent_,
      (this.id_ = o),
      (this.type_ = t),
      (this.flatCoordinates_ = e),
      (this.flatInteriorPoints_ = null),
      (this.flatMidpoints_ = null),
      (this.ends_ = i || null),
      (this.properties_ = r),
      this.squaredTolerance_,
      (this.stride_ = n),
      this.simplifiedGeometry_
  }
  get(t) {
    return this.properties_[t]
  }
  getExtent() {
    return (
      this.extent_ ||
        (this.extent_ =
          this.type_ === "Point"
            ? al(this.flatCoordinates_)
            : ao(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2)),
      this.extent_
    )
  }
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const t = ti(this.getExtent())
      this.flatInteriorPoints_ = xo(
        this.flatCoordinates_,
        0,
        this.ends_,
        2,
        t,
        0,
      )
    }
    return this.flatInteriorPoints_
  }
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const t = $c(this.flatCoordinates_, this.ends_),
        e = oh(this.flatCoordinates_, 0, t, 2)
      this.flatInteriorPoints_ = wl(this.flatCoordinates_, 0, t, 2, e)
    }
    return this.flatInteriorPoints_
  }
  getFlatMidpoint() {
    return (
      this.flatMidpoints_ ||
        (this.flatMidpoints_ = _s(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          0.5,
        )),
      this.flatMidpoints_
    )
  }
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = []
      const t = this.flatCoordinates_
      let e = 0
      const i = this.ends_
      for (let n = 0, r = i.length; n < r; ++n) {
        const o = i[n],
          a = _s(t, e, o, 2, 0.5)
        tt(this.flatMidpoints_, a), (e = o)
      }
    }
    return this.flatMidpoints_
  }
  getId() {
    return this.id_
  }
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_
  }
  getGeometry() {
    return this
  }
  getSimplifiedGeometry(t) {
    return this
  }
  simplifyTransformed(t, e) {
    return this
  }
  getProperties() {
    return this.properties_
  }
  getPropertiesInternal() {
    return this.properties_
  }
  getStride() {
    return this.stride_
  }
  getStyleFunction() {
    return this.styleFunction
  }
  getType() {
    return this.type_
  }
  transform(t) {
    t = wt(t)
    const e = t.getExtent(),
      i = t.getWorldExtent()
    if (e && i) {
      const n = vt(i) / vt(e)
      _e(Ya, i[0], i[3], n, -n, 0, 0, 0),
        Je(
          this.flatCoordinates_,
          0,
          this.flatCoordinates_.length,
          2,
          Ya,
          this.flatCoordinates_,
        )
    }
  }
  applyTransform(t) {
    t(this.flatCoordinates_, this.flatCoordinates_, this.stride_)
  }
  clone() {
    var t
    return new jt(
      this.type_,
      this.flatCoordinates_.slice(),
      (t = this.ends_) == null ? void 0 : t.slice(),
      this.stride_,
      Object.assign({}, this.properties_),
      this.id_,
    )
  }
  getEnds() {
    return this.ends_
  }
  enableSimplifyTransformed() {
    return (
      (this.simplifyTransformed = sl((t, e) => {
        if (t === this.squaredTolerance_) return this.simplifiedGeometry_
        ;(this.simplifiedGeometry_ = this.clone()),
          e && this.simplifiedGeometry_.applyTransform(e)
        const i = this.simplifiedGeometry_.getFlatCoordinates()
        let n
        switch (this.type_) {
          case "LineString":
            ;(i.length = Ys(
              i,
              0,
              this.simplifiedGeometry_.flatCoordinates_.length,
              this.simplifiedGeometry_.stride_,
              t,
              i,
              0,
            )),
              (n = [i.length])
            break
          case "MultiLineString":
            ;(n = []),
              (i.length = El(
                i,
                0,
                this.simplifiedGeometry_.ends_,
                this.simplifiedGeometry_.stride_,
                t,
                i,
                0,
                n,
              ))
            break
          case "Polygon":
            ;(n = []),
              (i.length = yo(
                i,
                0,
                this.simplifiedGeometry_.ends_,
                this.simplifiedGeometry_.stride_,
                Math.sqrt(t),
                i,
                0,
                n,
              ))
            break
        }
        return (
          n &&
            (this.simplifiedGeometry_ = new jt(
              this.type_,
              i,
              n,
              2,
              this.properties_,
              this.id_,
            )),
          (this.squaredTolerance_ = t),
          this.simplifiedGeometry_
        )
      })),
      this
    )
  }
}
jt.prototype.getFlatCoordinates = jt.prototype.getOrientedFlatCoordinates
class ah extends me {
  constructor(t) {
    super(),
      (this.projection = wt(t.projection)),
      (this.attributions_ = Xa(t.attributions)),
      (this.attributionsCollapsible_ =
        t.attributionsCollapsible !== void 0 ? t.attributionsCollapsible : !0),
      (this.loading = !1),
      (this.state_ = t.state !== void 0 ? t.state : "ready"),
      (this.wrapX_ = t.wrapX !== void 0 ? t.wrapX : !1),
      (this.interpolate_ = !!t.interpolate),
      (this.viewResolver = null),
      (this.viewRejector = null)
    const e = this
    this.viewPromise_ = new Promise(function (i, n) {
      ;(e.viewResolver = i), (e.viewRejector = n)
    })
  }
  getAttributions() {
    return this.attributions_
  }
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_
  }
  getProjection() {
    return this.projection
  }
  getResolutions(t) {
    return null
  }
  getView() {
    return this.viewPromise_
  }
  getState() {
    return this.state_
  }
  getWrapX() {
    return this.wrapX_
  }
  getInterpolate() {
    return this.interpolate_
  }
  refresh() {
    this.changed()
  }
  setAttributions(t) {
    ;(this.attributions_ = Xa(t)), this.changed()
  }
  setState(t) {
    ;(this.state_ = t), this.changed()
  }
}
function Xa(s) {
  return s
    ? Array.isArray(s)
      ? function (t) {
          return s
        }
      : typeof s == "function"
        ? s
        : function (t) {
            return [s]
          }
    : null
}
const Vt = {
  ADDFEATURE: "addfeature",
  CHANGEFEATURE: "changefeature",
  CLEAR: "clear",
  REMOVEFEATURE: "removefeature",
  FEATURESLOADSTART: "featuresloadstart",
  FEATURESLOADEND: "featuresloadend",
  FEATURESLOADERROR: "featuresloaderror",
}
function mf(s, t) {
  return [[-1 / 0, -1 / 0, 1 / 0, 1 / 0]]
}
let pf = !1
function yf(s, t, e, i, n, r, o) {
  const a = new XMLHttpRequest()
  a.open("GET", typeof s == "function" ? s(e, i, n) : s, !0),
    t.getType() == "arraybuffer" && (a.responseType = "arraybuffer"),
    (a.withCredentials = pf),
    (a.onload = function (l) {
      if (!a.status || (a.status >= 200 && a.status < 300)) {
        const h = t.getType()
        let c
        h == "json"
          ? (c = JSON.parse(a.responseText))
          : h == "text"
            ? (c = a.responseText)
            : h == "xml"
              ? ((c = a.responseXML),
                c ||
                  (c = new DOMParser().parseFromString(
                    a.responseText,
                    "application/xml",
                  )))
              : h == "arraybuffer" && (c = a.response),
          c
            ? r(
                t.readFeatures(c, { extent: e, featureProjection: n }),
                t.readProjection(c),
              )
            : o()
      } else o()
    }),
    (a.onerror = o),
    a.send()
}
function Ua(s, t) {
  return function (e, i, n, r, o) {
    const a = this
    yf(
      s,
      t,
      e,
      i,
      n,
      function (l, h) {
        a.addFeatures(l), r !== void 0 && r(l)
      },
      o || Ui,
    )
  }
}
class Ue extends Fe {
  constructor(t, e, i) {
    super(t), (this.feature = e), (this.features = i)
  }
}
class Ef extends ah {
  constructor(t) {
    ;(t = t || {}),
      super({
        attributions: t.attributions,
        interpolate: !0,
        projection: void 0,
        state: "ready",
        wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      }),
      this.on,
      this.once,
      this.un,
      (this.loader_ = Ui),
      (this.format_ = t.format),
      (this.overlaps_ = t.overlaps === void 0 ? !0 : t.overlaps),
      (this.url_ = t.url),
      t.loader !== void 0
        ? (this.loader_ = t.loader)
        : this.url_ !== void 0 &&
          (J(this.format_, "`format` must be set when `url` is set"),
          (this.loader_ = Ua(this.url_, this.format_))),
      (this.strategy_ = t.strategy !== void 0 ? t.strategy : mf)
    const e = t.useSpatialIndex !== void 0 ? t.useSpatialIndex : !0
    ;(this.featuresRtree_ = e ? new za() : null),
      (this.loadedExtentsRtree_ = new za()),
      (this.loadingExtentsCount_ = 0),
      (this.nullGeometryFeatures_ = {}),
      (this.idIndex_ = {}),
      (this.uidIndex_ = {}),
      (this.featureChangeKeys_ = {}),
      (this.featuresCollection_ = null)
    let i, n
    Array.isArray(t.features)
      ? (n = t.features)
      : t.features && ((i = t.features), (n = i.getArray())),
      !e && i === void 0 && (i = new ue(n)),
      n !== void 0 && this.addFeaturesInternal(n),
      i !== void 0 && this.bindFeaturesCollection_(i)
  }
  addFeature(t) {
    this.addFeatureInternal(t), this.changed()
  }
  addFeatureInternal(t) {
    const e = it(t)
    if (!this.addToIndex_(e, t)) {
      this.featuresCollection_ && this.featuresCollection_.remove(t)
      return
    }
    this.setupChangeEvents_(e, t)
    const i = t.getGeometry()
    if (i) {
      const n = i.getExtent()
      this.featuresRtree_ && this.featuresRtree_.insert(n, t)
    } else this.nullGeometryFeatures_[e] = t
    this.dispatchEvent(new Ue(Vt.ADDFEATURE, t))
  }
  setupChangeEvents_(t, e) {
    e instanceof jt ||
      (this.featureChangeKeys_[t] = [
        H(e, U.CHANGE, this.handleFeatureChange_, this),
        H(e, Xi.PROPERTYCHANGE, this.handleFeatureChange_, this),
      ])
  }
  addToIndex_(t, e) {
    let i = !0
    if (e.getId() !== void 0) {
      const n = String(e.getId())
      if (!(n in this.idIndex_)) this.idIndex_[n] = e
      else if (e instanceof jt) {
        const r = this.idIndex_[n]
        r instanceof jt
          ? Array.isArray(r)
            ? r.push(e)
            : (this.idIndex_[n] = [r, e])
          : (i = !1)
      } else i = !1
    }
    return (
      i &&
        (J(
          !(t in this.uidIndex_),
          "The passed `feature` was already added to the source",
        ),
        (this.uidIndex_[t] = e)),
      i
    )
  }
  addFeatures(t) {
    this.addFeaturesInternal(t), this.changed()
  }
  addFeaturesInternal(t) {
    const e = [],
      i = [],
      n = []
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r],
        l = it(a)
      this.addToIndex_(l, a) && i.push(a)
    }
    for (let r = 0, o = i.length; r < o; r++) {
      const a = i[r],
        l = it(a)
      this.setupChangeEvents_(l, a)
      const h = a.getGeometry()
      if (h) {
        const c = h.getExtent()
        e.push(c), n.push(a)
      } else this.nullGeometryFeatures_[l] = a
    }
    if (
      (this.featuresRtree_ && this.featuresRtree_.load(e, n),
      this.hasListener(Vt.ADDFEATURE))
    )
      for (let r = 0, o = i.length; r < o; r++)
        this.dispatchEvent(new Ue(Vt.ADDFEATURE, i[r]))
  }
  bindFeaturesCollection_(t) {
    let e = !1
    this.addEventListener(Vt.ADDFEATURE, function (i) {
      e || ((e = !0), t.push(i.feature), (e = !1))
    }),
      this.addEventListener(Vt.REMOVEFEATURE, function (i) {
        e || ((e = !0), t.remove(i.feature), (e = !1))
      }),
      t.addEventListener(bt.ADD, i => {
        e || ((e = !0), this.addFeature(i.element), (e = !1))
      }),
      t.addEventListener(bt.REMOVE, i => {
        e || ((e = !0), this.removeFeature(i.element), (e = !1))
      }),
      (this.featuresCollection_ = t)
  }
  clear(t) {
    if (t) {
      for (const i in this.featureChangeKeys_)
        this.featureChangeKeys_[i].forEach(lt)
      this.featuresCollection_ ||
        ((this.featureChangeKeys_ = {}),
        (this.idIndex_ = {}),
        (this.uidIndex_ = {}))
    } else if (this.featuresRtree_) {
      const i = n => {
        this.removeFeatureInternal(n)
      }
      this.featuresRtree_.forEach(i)
      for (const n in this.nullGeometryFeatures_)
        this.removeFeatureInternal(this.nullGeometryFeatures_[n])
    }
    this.featuresCollection_ && this.featuresCollection_.clear(),
      this.featuresRtree_ && this.featuresRtree_.clear(),
      (this.nullGeometryFeatures_ = {})
    const e = new Ue(Vt.CLEAR)
    this.dispatchEvent(e), this.changed()
  }
  forEachFeature(t) {
    if (this.featuresRtree_) return this.featuresRtree_.forEach(t)
    this.featuresCollection_ && this.featuresCollection_.forEach(t)
  }
  forEachFeatureAtCoordinateDirect(t, e) {
    const i = [t[0], t[1], t[0], t[1]]
    return this.forEachFeatureInExtent(i, function (n) {
      const r = n.getGeometry()
      if (r instanceof jt || r.intersectsCoordinate(t)) return e(n)
    })
  }
  forEachFeatureInExtent(t, e) {
    if (this.featuresRtree_) return this.featuresRtree_.forEachInExtent(t, e)
    this.featuresCollection_ && this.featuresCollection_.forEach(e)
  }
  forEachFeatureIntersectingExtent(t, e) {
    return this.forEachFeatureInExtent(t, function (i) {
      const n = i.getGeometry()
      if (n instanceof jt || n.intersectsExtent(t)) {
        const r = e(i)
        if (r) return r
      }
    })
  }
  getFeaturesCollection() {
    return this.featuresCollection_
  }
  getFeatures() {
    let t
    return (
      this.featuresCollection_
        ? (t = this.featuresCollection_.getArray().slice(0))
        : this.featuresRtree_ &&
          ((t = this.featuresRtree_.getAll()),
          Wi(this.nullGeometryFeatures_) ||
            tt(t, Object.values(this.nullGeometryFeatures_))),
      t
    )
  }
  getFeaturesAtCoordinate(t) {
    const e = []
    return (
      this.forEachFeatureAtCoordinateDirect(t, function (i) {
        e.push(i)
      }),
      e
    )
  }
  getFeaturesInExtent(t, e) {
    if (this.featuresRtree_) {
      if (!(e && e.canWrapX() && this.getWrapX()))
        return this.featuresRtree_.getInExtent(t)
      const n = cc(t, e)
      return [].concat(...n.map(r => this.featuresRtree_.getInExtent(r)))
    }
    return this.featuresCollection_
      ? this.featuresCollection_.getArray().slice(0)
      : []
  }
  getClosestFeatureToCoordinate(t, e) {
    const i = t[0],
      n = t[1]
    let r = null
    const o = [NaN, NaN]
    let a = 1 / 0
    const l = [-1 / 0, -1 / 0, 1 / 0, 1 / 0]
    return (
      (e = e || Rn),
      this.featuresRtree_.forEachInExtent(l, function (h) {
        if (e(h)) {
          const c = h.getGeometry(),
            u = a
          if (
            ((a = c instanceof jt ? 0 : c.closestPointXY(i, n, o, a)), a < u)
          ) {
            r = h
            const d = Math.sqrt(a)
            ;(l[0] = i - d), (l[1] = n - d), (l[2] = i + d), (l[3] = n + d)
          }
        }
      }),
      r
    )
  }
  getExtent(t) {
    return this.featuresRtree_.getExtent(t)
  }
  getFeatureById(t) {
    const e = this.idIndex_[t.toString()]
    return e !== void 0 ? e : null
  }
  getFeatureByUid(t) {
    const e = this.uidIndex_[t]
    return e !== void 0 ? e : null
  }
  getFormat() {
    return this.format_
  }
  getOverlaps() {
    return this.overlaps_
  }
  getUrl() {
    return this.url_
  }
  handleFeatureChange_(t) {
    const e = t.target,
      i = it(e),
      n = e.getGeometry()
    if (!n)
      i in this.nullGeometryFeatures_ ||
        (this.featuresRtree_ && this.featuresRtree_.remove(e),
        (this.nullGeometryFeatures_[i] = e))
    else {
      const o = n.getExtent()
      i in this.nullGeometryFeatures_
        ? (delete this.nullGeometryFeatures_[i],
          this.featuresRtree_ && this.featuresRtree_.insert(o, e))
        : this.featuresRtree_ && this.featuresRtree_.update(o, e)
    }
    const r = e.getId()
    if (r !== void 0) {
      const o = r.toString()
      this.idIndex_[o] !== e &&
        (this.removeFromIdIndex_(e), (this.idIndex_[o] = e))
    } else this.removeFromIdIndex_(e), (this.uidIndex_[i] = e)
    this.changed(), this.dispatchEvent(new Ue(Vt.CHANGEFEATURE, e))
  }
  hasFeature(t) {
    const e = t.getId()
    return e !== void 0 ? e in this.idIndex_ : it(t) in this.uidIndex_
  }
  isEmpty() {
    return this.featuresRtree_
      ? this.featuresRtree_.isEmpty() && Wi(this.nullGeometryFeatures_)
      : this.featuresCollection_
        ? this.featuresCollection_.getLength() === 0
        : !0
  }
  loadFeatures(t, e, i) {
    const n = this.loadedExtentsRtree_,
      r = this.strategy_(t, e, i)
    for (let o = 0, a = r.length; o < a; ++o) {
      const l = r[o]
      n.forEachInExtent(l, function (c) {
        return Di(c.extent, l)
      }) ||
        (++this.loadingExtentsCount_,
        this.dispatchEvent(new Ue(Vt.FEATURESLOADSTART)),
        this.loader_.call(
          this,
          l,
          e,
          i,
          c => {
            --this.loadingExtentsCount_,
              this.dispatchEvent(new Ue(Vt.FEATURESLOADEND, void 0, c))
          },
          () => {
            --this.loadingExtentsCount_,
              this.dispatchEvent(new Ue(Vt.FEATURESLOADERROR))
          },
        ),
        n.insert(l, { extent: l.slice() }))
    }
    this.loading = this.loader_.length < 4 ? !1 : this.loadingExtentsCount_ > 0
  }
  refresh() {
    this.clear(!0), this.loadedExtentsRtree_.clear(), super.refresh()
  }
  removeLoadedExtent(t) {
    const e = this.loadedExtentsRtree_
    let i
    e.forEachInExtent(t, function (n) {
      if (Sn(n.extent, t)) return (i = n), !0
    }),
      i && e.remove(i)
  }
  removeFeatures(t) {
    const e = []
    for (let i = 0, n = t.length; i < n; ++i) {
      const r = t[i],
        o = this.removeFeatureInternal(r)
      o && e.push(o)
    }
    e.length > 0 && this.changed()
  }
  removeFeature(t) {
    if (!t) return
    this.removeFeatureInternal(t) && this.changed()
  }
  removeFeatureInternal(t) {
    const e = it(t)
    e in this.nullGeometryFeatures_
      ? delete this.nullGeometryFeatures_[e]
      : this.featuresRtree_ && this.featuresRtree_.remove(t)
    const i = this.featureChangeKeys_[e]
    if (!i) return
    i.forEach(lt), delete this.featureChangeKeys_[e]
    const n = t.getId()
    return (
      n !== void 0 && delete this.idIndex_[n.toString()],
      delete this.uidIndex_[e],
      this.hasListener(Vt.REMOVEFEATURE) &&
        this.dispatchEvent(new Ue(Vt.REMOVEFEATURE, t)),
      t
    )
  }
  removeFromIdIndex_(t) {
    let e = !1
    for (const i in this.idIndex_) {
      const n = this.idIndex_[i]
      if (t instanceof jt && Array.isArray(n) && n.includes(t))
        n.splice(n.indexOf(t), 1)
      else if (this.idIndex_[i] === t) {
        delete this.idIndex_[i], (e = !0)
        break
      }
    }
    return e
  }
  setLoader(t) {
    this.loader_ = t
  }
  setUrl(t) {
    J(this.format_, "`format` must be set when `url` is set"),
      (this.url_ = t),
      this.setLoader(Ua(t, this.format_))
  }
}
const xf = Ef,
  b = { IDLE: 0, LOADING: 1, LOADED: 2, ERROR: 3, EMPTY: 4 }
class lh extends Ps {
  constructor(t, e, i) {
    super(),
      (i = i || {}),
      (this.tileCoord = t),
      (this.state = e),
      (this.interimTile = null),
      (this.key = ""),
      (this.transition_ = i.transition === void 0 ? 250 : i.transition),
      (this.transitionStarts_ = {}),
      (this.interpolate = !!i.interpolate)
  }
  changed() {
    this.dispatchEvent(U.CHANGE)
  }
  release() {
    this.state === b.ERROR && this.setState(b.EMPTY)
  }
  getKey() {
    return this.key + "/" + this.tileCoord
  }
  getInterimTile() {
    let t = this.interimTile
    if (!t) return this
    do {
      if (t.getState() == b.LOADED) return (this.transition_ = 0), t
      t = t.interimTile
    } while (t)
    return this
  }
  refreshInterimChain() {
    let t = this.interimTile
    if (!t) return
    let e = this
    do {
      if (t.getState() == b.LOADED) {
        t.interimTile = null
        break
      }
      t.getState() == b.LOADING
        ? (e = t)
        : t.getState() == b.IDLE
          ? (e.interimTile = t.interimTile)
          : (e = t),
        (t = e.interimTile)
    } while (t)
  }
  getTileCoord() {
    return this.tileCoord
  }
  getState() {
    return this.state
  }
  setState(t) {
    if (this.state !== b.ERROR && this.state > t)
      throw new Error("Tile load sequence violation")
    ;(this.state = t), this.changed()
  }
  load() {
    W()
  }
  getAlpha(t, e) {
    if (!this.transition_) return 1
    let i = this.transitionStarts_[t]
    if (!i) (i = e), (this.transitionStarts_[t] = i)
    else if (i === -1) return 1
    const n = e - i + 1e3 / 60
    return n >= this.transition_ ? 1 : zl(n / this.transition_)
  }
  inTransition(t) {
    return this.transition_ ? this.transitionStarts_[t] !== -1 : !1
  }
  endTransition(t) {
    this.transition_ && (this.transitionStarts_[t] = -1)
  }
}
class hh extends lh {
  constructor(t, e, i, n, r, o) {
    super(t, e, o),
      (this.crossOrigin_ = n),
      (this.src_ = i),
      (this.key = i),
      (this.image_ = new Image()),
      n !== null && (this.image_.crossOrigin = n),
      (this.unlisten_ = null),
      (this.tileLoadFunction_ = r)
  }
  getImage() {
    return this.image_
  }
  setImage(t) {
    ;(this.image_ = t),
      (this.state = b.LOADED),
      this.unlistenImage_(),
      this.changed()
  }
  handleImageError_() {
    ;(this.state = b.ERROR),
      this.unlistenImage_(),
      (this.image_ = Cf()),
      this.changed()
  }
  handleImageLoad_() {
    const t = this.image_
    t.naturalWidth && t.naturalHeight
      ? (this.state = b.LOADED)
      : (this.state = b.EMPTY),
      this.unlistenImage_(),
      this.changed()
  }
  load() {
    this.state == b.ERROR &&
      ((this.state = b.IDLE),
      (this.image_ = new Image()),
      this.crossOrigin_ !== null &&
        (this.image_.crossOrigin = this.crossOrigin_)),
      this.state == b.IDLE &&
        ((this.state = b.LOADING),
        this.changed(),
        this.tileLoadFunction_(this, this.src_),
        (this.unlisten_ = cu(
          this.image_,
          this.handleImageLoad_.bind(this),
          this.handleImageError_.bind(this),
        )))
  }
  unlistenImage_() {
    this.unlisten_ && (this.unlisten_(), (this.unlisten_ = null))
  }
}
function Cf() {
  const s = Rt(1, 1)
  return (s.fillStyle = "rgba(0,0,0,0)"), s.fillRect(0, 0, 1, 1), s.canvas
}
class wf {
  constructor(t, e, i) {
    ;(this.decay_ = t),
      (this.minVelocity_ = e),
      (this.delay_ = i),
      (this.points_ = []),
      (this.angle_ = 0),
      (this.initialVelocity_ = 0)
  }
  begin() {
    ;(this.points_.length = 0), (this.angle_ = 0), (this.initialVelocity_ = 0)
  }
  update(t, e) {
    this.points_.push(t, e, Date.now())
  }
  end() {
    if (this.points_.length < 6) return !1
    const t = Date.now() - this.delay_,
      e = this.points_.length - 3
    if (this.points_[e + 2] < t) return !1
    let i = e - 3
    for (; i > 0 && this.points_[i + 2] > t; ) i -= 3
    const n = this.points_[e + 2] - this.points_[i + 2]
    if (n < 1e3 / 60) return !1
    const r = this.points_[e] - this.points_[i],
      o = this.points_[e + 1] - this.points_[i + 1]
    return (
      (this.angle_ = Math.atan2(o, r)),
      (this.initialVelocity_ = Math.sqrt(r * r + o * o) / n),
      this.initialVelocity_ > this.minVelocity_
    )
  }
  getDistance() {
    return (this.minVelocity_ - this.initialVelocity_) / this.decay_
  }
  getAngle() {
    return this.angle_
  }
}
class Rf extends io {
  constructor(t) {
    super(), (this.map_ = t)
  }
  dispatchRenderEvent(t, e) {
    W()
  }
  calculateMatrices2D(t) {
    const e = t.viewState,
      i = t.coordinateToPixelTransform,
      n = t.pixelToCoordinateTransform
    _e(
      i,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / e.resolution,
      -1 / e.resolution,
      -e.rotation,
      -e.center[0],
      -e.center[1],
    ),
      so(n, i)
  }
  forEachFeatureAtCoordinate(t, e, i, n, r, o, a, l) {
    let h
    const c = e.viewState
    function u(E, C, T, S) {
      return r.call(o, C, E ? T : null, S)
    }
    const d = c.projection,
      f = fl(t.slice(), d),
      g = [[0, 0]]
    if (d.canWrapX() && n) {
      const E = d.getExtent(),
        C = rt(E)
      g.push([-C, 0], [C, 0])
    }
    const _ = e.layerStatesArray,
      m = _.length,
      p = [],
      y = []
    for (let E = 0; E < g.length; E++)
      for (let C = m - 1; C >= 0; --C) {
        const T = _[C],
          S = T.layer
        if (S.hasRenderer() && Po(T, c) && a.call(l, S)) {
          const R = S.getRenderer(),
            v = S.getSource()
          if (R && v) {
            const k = v.getWrapX() ? f : t,
              N = u.bind(null, T.managed)
            ;(y[0] = k[0] + g[E][0]),
              (y[1] = k[1] + g[E][1]),
              (h = R.forEachFeatureAtCoordinate(y, e, i, N, p))
          }
          if (h) return h
        }
      }
    if (p.length === 0) return
    const x = 1 / p.length
    return (
      p.forEach((E, C) => (E.distanceSq += C * x)),
      p.sort((E, C) => E.distanceSq - C.distanceSq),
      p.some(E => (h = E.callback(E.feature, E.layer, E.geometry))),
      h
    )
  }
  hasFeatureAtCoordinate(t, e, i, n, r, o) {
    return (
      this.forEachFeatureAtCoordinate(t, e, i, n, Rn, this, r, o) !== void 0
    )
  }
  getMap() {
    return this.map_
  }
  renderFrame(t) {
    W()
  }
  scheduleExpireIconCache(t) {
    de.canExpireCache() && t.postRenderFunctions.push(Sf)
  }
}
function Sf(s, t) {
  de.expire()
}
class Tf extends Rf {
  constructor(t) {
    super(t),
      (this.fontChangeListenerKey_ = H(
        Se,
        Xi.PROPERTYCHANGE,
        t.redrawText.bind(t),
      )),
      (this.element_ = document.createElement("div"))
    const e = this.element_.style
    ;(e.position = "absolute"),
      (e.width = "100%"),
      (e.height = "100%"),
      (e.zIndex = "0"),
      (this.element_.className = Zs + " ol-layers")
    const i = t.getViewport()
    i.insertBefore(this.element_, i.firstChild || null),
      (this.children_ = []),
      (this.renderedVisible_ = !0)
  }
  dispatchRenderEvent(t, e) {
    const i = this.getMap()
    if (i.hasListener(t)) {
      const n = new Jl(t, void 0, e)
      i.dispatchEvent(n)
    }
  }
  disposeInternal() {
    lt(this.fontChangeListenerKey_),
      this.element_.parentNode.removeChild(this.element_),
      super.disposeInternal()
  }
  renderFrame(t) {
    if (!t) {
      this.renderedVisible_ &&
        ((this.element_.style.display = "none"), (this.renderedVisible_ = !1))
      return
    }
    this.calculateMatrices2D(t), this.dispatchRenderEvent(Ht.PRECOMPOSE, t)
    const e = t.layerStatesArray.sort(function (a, l) {
      return a.zIndex - l.zIndex
    })
    e.some(a => a.layer instanceof ql && a.layer.getDeclutter()) &&
      (t.declutter = {})
    const n = t.viewState
    this.children_.length = 0
    const r = []
    let o = null
    for (let a = 0, l = e.length; a < l; ++a) {
      const h = e[a]
      t.layerIndex = a
      const c = h.layer,
        u = c.getSourceState()
      if (!Po(h, n) || (u != "ready" && u != "undefined")) {
        c.unrender()
        continue
      }
      const d = c.render(t, o)
      d && (d !== o && (this.children_.push(d), (o = d)), r.push(h))
    }
    this.declutter(t, r),
      hu(this.element_, this.children_),
      this.dispatchRenderEvent(Ht.POSTCOMPOSE, t),
      this.renderedVisible_ ||
        ((this.element_.style.display = ""), (this.renderedVisible_ = !0)),
      this.scheduleExpireIconCache(t)
  }
  declutter(t, e) {
    for (let i = e.length - 1; i >= 0; --i) {
      const n = e[i],
        r = n.layer
      r.getDeclutter() && r.renderDeclutter(t, n)
    }
    e.forEach(i => i.layer.renderDeferred(t))
  }
}
class Be extends Fe {
  constructor(t, e) {
    super(t), (this.layer = e)
  }
}
const wr = { LAYERS: "layers" }
class Qi extends Gl {
  constructor(t) {
    t = t || {}
    const e = Object.assign({}, t)
    delete e.layers
    let i = t.layers
    super(e),
      this.on,
      this.once,
      this.un,
      (this.layersListenerKeys_ = []),
      (this.listenerKeys_ = {}),
      this.addChangeListener(wr.LAYERS, this.handleLayersChanged_),
      i
        ? Array.isArray(i)
          ? (i = new ue(i.slice(), { unique: !0 }))
          : J(
              typeof i.getArray == "function",
              "Expected `layers` to be an array or a `Collection`",
            )
        : (i = new ue(void 0, { unique: !0 })),
      this.setLayers(i)
  }
  handleLayerChange_() {
    this.changed()
  }
  handleLayersChanged_() {
    this.layersListenerKeys_.forEach(lt), (this.layersListenerKeys_.length = 0)
    const t = this.getLayers()
    this.layersListenerKeys_.push(
      H(t, bt.ADD, this.handleLayersAdd_, this),
      H(t, bt.REMOVE, this.handleLayersRemove_, this),
    )
    for (const i in this.listenerKeys_) this.listenerKeys_[i].forEach(lt)
    kn(this.listenerKeys_)
    const e = t.getArray()
    for (let i = 0, n = e.length; i < n; i++) {
      const r = e[i]
      this.registerLayerListeners_(r), this.dispatchEvent(new Be("addlayer", r))
    }
    this.changed()
  }
  registerLayerListeners_(t) {
    const e = [
      H(t, Xi.PROPERTYCHANGE, this.handleLayerChange_, this),
      H(t, U.CHANGE, this.handleLayerChange_, this),
    ]
    t instanceof Qi &&
      e.push(
        H(t, "addlayer", this.handleLayerGroupAdd_, this),
        H(t, "removelayer", this.handleLayerGroupRemove_, this),
      ),
      (this.listenerKeys_[it(t)] = e)
  }
  handleLayerGroupAdd_(t) {
    this.dispatchEvent(new Be("addlayer", t.layer))
  }
  handleLayerGroupRemove_(t) {
    this.dispatchEvent(new Be("removelayer", t.layer))
  }
  handleLayersAdd_(t) {
    const e = t.element
    this.registerLayerListeners_(e),
      this.dispatchEvent(new Be("addlayer", e)),
      this.changed()
  }
  handleLayersRemove_(t) {
    const e = t.element,
      i = it(e)
    this.listenerKeys_[i].forEach(lt),
      delete this.listenerKeys_[i],
      this.dispatchEvent(new Be("removelayer", e)),
      this.changed()
  }
  getLayers() {
    return this.get(wr.LAYERS)
  }
  setLayers(t) {
    const e = this.getLayers()
    if (e) {
      const i = e.getArray()
      for (let n = 0, r = i.length; n < r; ++n)
        this.dispatchEvent(new Be("removelayer", i[n]))
    }
    this.set(wr.LAYERS, t)
  }
  getLayersArray(t) {
    return (
      (t = t !== void 0 ? t : []),
      this.getLayers().forEach(function (e) {
        e.getLayersArray(t)
      }),
      t
    )
  }
  getLayerStatesArray(t) {
    const e = t !== void 0 ? t : [],
      i = e.length
    this.getLayers().forEach(function (o) {
      o.getLayerStatesArray(e)
    })
    const n = this.getLayerState()
    let r = n.zIndex
    !t && n.zIndex === void 0 && (r = 0)
    for (let o = i, a = e.length; o < a; o++) {
      const l = e[o]
      ;(l.opacity *= n.opacity),
        (l.visible = l.visible && n.visible),
        (l.maxResolution = Math.min(l.maxResolution, n.maxResolution)),
        (l.minResolution = Math.max(l.minResolution, n.minResolution)),
        (l.minZoom = Math.max(l.minZoom, n.minZoom)),
        (l.maxZoom = Math.min(l.maxZoom, n.maxZoom)),
        n.extent !== void 0 &&
          (l.extent !== void 0
            ? (l.extent = pn(l.extent, n.extent))
            : (l.extent = n.extent)),
        l.zIndex === void 0 && (l.zIndex = r)
    }
    return e
  }
  getSourceState() {
    return "ready"
  }
}
class bi extends Fe {
  constructor(t, e, i) {
    super(t), (this.map = e), (this.frameState = i !== void 0 ? i : null)
  }
}
class Ze extends bi {
  constructor(t, e, i, n, r, o) {
    super(t, e, r),
      (this.originalEvent = i),
      (this.pixel_ = null),
      (this.coordinate_ = null),
      (this.dragging = n !== void 0 ? n : !1),
      (this.activePointers = o)
  }
  get pixel() {
    return (
      this.pixel_ || (this.pixel_ = this.map.getEventPixel(this.originalEvent)),
      this.pixel_
    )
  }
  set pixel(t) {
    this.pixel_ = t
  }
  get coordinate() {
    return (
      this.coordinate_ ||
        (this.coordinate_ = this.map.getCoordinateFromPixel(this.pixel)),
      this.coordinate_
    )
  }
  set coordinate(t) {
    this.coordinate_ = t
  }
  preventDefault() {
    super.preventDefault(),
      "preventDefault" in this.originalEvent &&
        this.originalEvent.preventDefault()
  }
  stopPropagation() {
    super.stopPropagation(),
      "stopPropagation" in this.originalEvent &&
        this.originalEvent.stopPropagation()
  }
}
const ft = {
    SINGLECLICK: "singleclick",
    CLICK: U.CLICK,
    DBLCLICK: U.DBLCLICK,
    POINTERDRAG: "pointerdrag",
    POINTERMOVE: "pointermove",
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERCANCEL: "pointercancel",
  },
  jr = {
    POINTERMOVE: "pointermove",
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERCANCEL: "pointercancel",
  }
class If extends Ps {
  constructor(t, e) {
    super(t),
      (this.map_ = t),
      this.clickTimeoutId_,
      (this.emulateClicks_ = !1),
      (this.dragging_ = !1),
      (this.dragListenerKeys_ = []),
      (this.moveTolerance_ = e === void 0 ? 1 : e),
      (this.down_ = null)
    const i = this.map_.getViewport()
    ;(this.activePointers_ = []),
      (this.trackedTouches_ = {}),
      (this.element_ = i),
      (this.pointerdownListenerKey_ = H(
        i,
        jr.POINTERDOWN,
        this.handlePointerDown_,
        this,
      )),
      this.originalPointerMoveEvent_,
      (this.relayedListenerKey_ = H(
        i,
        jr.POINTERMOVE,
        this.relayMoveEvent_,
        this,
      )),
      (this.boundHandleTouchMove_ = this.handleTouchMove_.bind(this)),
      this.element_.addEventListener(
        U.TOUCHMOVE,
        this.boundHandleTouchMove_,
        Ol ? { passive: !1 } : !1,
      )
  }
  emulateClick_(t) {
    let e = new Ze(ft.CLICK, this.map_, t)
    this.dispatchEvent(e),
      this.clickTimeoutId_ !== void 0
        ? (clearTimeout(this.clickTimeoutId_),
          (this.clickTimeoutId_ = void 0),
          (e = new Ze(ft.DBLCLICK, this.map_, t)),
          this.dispatchEvent(e))
        : (this.clickTimeoutId_ = setTimeout(() => {
            this.clickTimeoutId_ = void 0
            const i = new Ze(ft.SINGLECLICK, this.map_, t)
            this.dispatchEvent(i)
          }, 250))
  }
  updateActivePointers_(t) {
    const e = t,
      i = e.pointerId
    if (e.type == ft.POINTERUP || e.type == ft.POINTERCANCEL) {
      delete this.trackedTouches_[i]
      for (const n in this.trackedTouches_)
        if (this.trackedTouches_[n].target !== e.target) {
          delete this.trackedTouches_[n]
          break
        }
    } else
      (e.type == ft.POINTERDOWN || e.type == ft.POINTERMOVE) &&
        (this.trackedTouches_[i] = e)
    this.activePointers_ = Object.values(this.trackedTouches_)
  }
  handlePointerUp_(t) {
    this.updateActivePointers_(t)
    const e = new Ze(
      ft.POINTERUP,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_,
    )
    this.dispatchEvent(e),
      this.emulateClicks_ &&
        !e.defaultPrevented &&
        !this.dragging_ &&
        this.isMouseActionButton_(t) &&
        this.emulateClick_(this.down_),
      this.activePointers_.length === 0 &&
        (this.dragListenerKeys_.forEach(lt),
        (this.dragListenerKeys_.length = 0),
        (this.dragging_ = !1),
        (this.down_ = null))
  }
  isMouseActionButton_(t) {
    return t.button === 0
  }
  handlePointerDown_(t) {
    ;(this.emulateClicks_ = this.activePointers_.length === 0),
      this.updateActivePointers_(t)
    const e = new Ze(
      ft.POINTERDOWN,
      this.map_,
      t,
      void 0,
      void 0,
      this.activePointers_,
    )
    if (
      (this.dispatchEvent(e),
      (this.down_ = new PointerEvent(t.type, t)),
      Object.defineProperty(this.down_, "target", {
        writable: !1,
        value: t.target,
      }),
      this.dragListenerKeys_.length === 0)
    ) {
      const i = this.map_.getOwnerDocument()
      this.dragListenerKeys_.push(
        H(i, ft.POINTERMOVE, this.handlePointerMove_, this),
        H(i, ft.POINTERUP, this.handlePointerUp_, this),
        H(this.element_, ft.POINTERCANCEL, this.handlePointerUp_, this),
      ),
        this.element_.getRootNode &&
          this.element_.getRootNode() !== i &&
          this.dragListenerKeys_.push(
            H(
              this.element_.getRootNode(),
              ft.POINTERUP,
              this.handlePointerUp_,
              this,
            ),
          )
    }
  }
  handlePointerMove_(t) {
    if (this.isMoving_(t)) {
      this.updateActivePointers_(t), (this.dragging_ = !0)
      const e = new Ze(
        ft.POINTERDRAG,
        this.map_,
        t,
        this.dragging_,
        void 0,
        this.activePointers_,
      )
      this.dispatchEvent(e)
    }
  }
  relayMoveEvent_(t) {
    this.originalPointerMoveEvent_ = t
    const e = !!(this.down_ && this.isMoving_(t))
    this.dispatchEvent(new Ze(ft.POINTERMOVE, this.map_, t, e))
  }
  handleTouchMove_(t) {
    const e = this.originalPointerMoveEvent_
    ;(!e || e.defaultPrevented) &&
      (typeof t.cancelable != "boolean" || t.cancelable === !0) &&
      t.preventDefault()
  }
  isMoving_(t) {
    return (
      this.dragging_ ||
      Math.abs(t.clientX - this.down_.clientX) > this.moveTolerance_ ||
      Math.abs(t.clientY - this.down_.clientY) > this.moveTolerance_
    )
  }
  disposeInternal() {
    this.relayedListenerKey_ &&
      (lt(this.relayedListenerKey_), (this.relayedListenerKey_ = null)),
      this.element_.removeEventListener(
        U.TOUCHMOVE,
        this.boundHandleTouchMove_,
      ),
      this.pointerdownListenerKey_ &&
        (lt(this.pointerdownListenerKey_),
        (this.pointerdownListenerKey_ = null)),
      this.dragListenerKeys_.forEach(lt),
      (this.dragListenerKeys_.length = 0),
      (this.element_ = null),
      super.disposeInternal()
  }
}
const Te = {
    POSTRENDER: "postrender",
    MOVESTART: "movestart",
    MOVEEND: "moveend",
    LOADSTART: "loadstart",
    LOADEND: "loadend",
  },
  Tt = {
    LAYERGROUP: "layergroup",
    SIZE: "size",
    TARGET: "target",
    VIEW: "view",
  },
  Is = 1 / 0
class vf {
  constructor(t, e) {
    ;(this.priorityFunction_ = t),
      (this.keyFunction_ = e),
      (this.elements_ = []),
      (this.priorities_ = []),
      (this.queuedElements_ = {})
  }
  clear() {
    ;(this.elements_.length = 0),
      (this.priorities_.length = 0),
      kn(this.queuedElements_)
  }
  dequeue() {
    const t = this.elements_,
      e = this.priorities_,
      i = t[0]
    t.length == 1
      ? ((t.length = 0), (e.length = 0))
      : ((t[0] = t.pop()), (e[0] = e.pop()), this.siftUp_(0))
    const n = this.keyFunction_(i)
    return delete this.queuedElements_[n], i
  }
  enqueue(t) {
    J(
      !(this.keyFunction_(t) in this.queuedElements_),
      "Tried to enqueue an `element` that was already added to the queue",
    )
    const e = this.priorityFunction_(t)
    return e != Is
      ? (this.elements_.push(t),
        this.priorities_.push(e),
        (this.queuedElements_[this.keyFunction_(t)] = !0),
        this.siftDown_(0, this.elements_.length - 1),
        !0)
      : !1
  }
  getCount() {
    return this.elements_.length
  }
  getLeftChildIndex_(t) {
    return t * 2 + 1
  }
  getRightChildIndex_(t) {
    return t * 2 + 2
  }
  getParentIndex_(t) {
    return (t - 1) >> 1
  }
  heapify_() {
    let t
    for (t = (this.elements_.length >> 1) - 1; t >= 0; t--) this.siftUp_(t)
  }
  isEmpty() {
    return this.elements_.length === 0
  }
  isKeyQueued(t) {
    return t in this.queuedElements_
  }
  isQueued(t) {
    return this.isKeyQueued(this.keyFunction_(t))
  }
  siftUp_(t) {
    const e = this.elements_,
      i = this.priorities_,
      n = e.length,
      r = e[t],
      o = i[t],
      a = t
    for (; t < n >> 1; ) {
      const l = this.getLeftChildIndex_(t),
        h = this.getRightChildIndex_(t),
        c = h < n && i[h] < i[l] ? h : l
      ;(e[t] = e[c]), (i[t] = i[c]), (t = c)
    }
    ;(e[t] = r), (i[t] = o), this.siftDown_(a, t)
  }
  siftDown_(t, e) {
    const i = this.elements_,
      n = this.priorities_,
      r = i[e],
      o = n[e]
    for (; e > t; ) {
      const a = this.getParentIndex_(e)
      if (n[a] > o) (i[e] = i[a]), (n[e] = n[a]), (e = a)
      else break
    }
    ;(i[e] = r), (n[e] = o)
  }
  reprioritize() {
    const t = this.priorityFunction_,
      e = this.elements_,
      i = this.priorities_
    let n = 0
    const r = e.length
    let o, a, l
    for (a = 0; a < r; ++a)
      (o = e[a]),
        (l = t(o)),
        l == Is
          ? delete this.queuedElements_[this.keyFunction_(o)]
          : ((i[n] = l), (e[n++] = o))
    ;(e.length = n), (i.length = n), this.heapify_()
  }
}
class Lf extends vf {
  constructor(t, e) {
    super(
      function (i) {
        return t.apply(null, i)
      },
      function (i) {
        return i[0].getKey()
      },
    ),
      (this.boundHandleTileChange_ = this.handleTileChange.bind(this)),
      (this.tileChangeCallback_ = e),
      (this.tilesLoading_ = 0),
      (this.tilesLoadingKeys_ = {})
  }
  enqueue(t) {
    const e = super.enqueue(t)
    return e && t[0].addEventListener(U.CHANGE, this.boundHandleTileChange_), e
  }
  getTilesLoading() {
    return this.tilesLoading_
  }
  handleTileChange(t) {
    const e = t.target,
      i = e.getState()
    if (i === b.LOADED || i === b.ERROR || i === b.EMPTY) {
      i !== b.ERROR &&
        e.removeEventListener(U.CHANGE, this.boundHandleTileChange_)
      const n = e.getKey()
      n in this.tilesLoadingKeys_ &&
        (delete this.tilesLoadingKeys_[n], --this.tilesLoading_),
        this.tileChangeCallback_()
    }
  }
  loadMoreTiles(t, e) {
    let i = 0,
      n,
      r,
      o
    for (; this.tilesLoading_ < t && i < e && this.getCount() > 0; )
      (r = this.dequeue()[0]),
        (o = r.getKey()),
        (n = r.getState()),
        n === b.IDLE &&
          !(o in this.tilesLoadingKeys_) &&
          ((this.tilesLoadingKeys_[o] = !0),
          ++this.tilesLoading_,
          ++i,
          r.load())
  }
}
function Af(s, t, e, i, n) {
  if (!s || !(e in s.wantedTiles) || !s.wantedTiles[e][t.getKey()]) return Is
  const r = s.viewState.center,
    o = i[0] - r[0],
    a = i[1] - r[1]
  return 65536 * Math.log(n) + Math.sqrt(o * o + a * a) / n
}
class bo extends me {
  constructor(t) {
    super()
    const e = t.element
    e &&
      !t.target &&
      !e.style.pointerEvents &&
      (e.style.pointerEvents = "auto"),
      (this.element = e || null),
      (this.target_ = null),
      (this.map_ = null),
      (this.listenerKeys = []),
      t.render && (this.render = t.render),
      t.target && this.setTarget(t.target)
  }
  disposeInternal() {
    Ur(this.element), super.disposeInternal()
  }
  getMap() {
    return this.map_
  }
  setMap(t) {
    this.map_ && Ur(this.element)
    for (let e = 0, i = this.listenerKeys.length; e < i; ++e)
      lt(this.listenerKeys[e])
    ;(this.listenerKeys.length = 0),
      (this.map_ = t),
      t &&
        ((this.target_
          ? this.target_
          : t.getOverlayContainerStopEvent()
        ).appendChild(this.element),
        this.render !== Ui &&
          this.listenerKeys.push(H(t, Te.POSTRENDER, this.render, this)),
        t.render())
  }
  render(t) {}
  setTarget(t) {
    this.target_ = typeof t == "string" ? document.getElementById(t) : t
  }
}
class Mf extends bo {
  constructor(t) {
    ;(t = t || {}),
      super({
        element: document.createElement("div"),
        render: t.render,
        target: t.target,
      }),
      (this.ulElement_ = document.createElement("ul")),
      (this.collapsed_ = t.collapsed !== void 0 ? t.collapsed : !0),
      (this.userCollapsed_ = this.collapsed_),
      (this.overrideCollapsible_ = t.collapsible !== void 0),
      (this.collapsible_ = t.collapsible !== void 0 ? t.collapsible : !0),
      this.collapsible_ || (this.collapsed_ = !1)
    const e = t.className !== void 0 ? t.className : "ol-attribution",
      i = t.tipLabel !== void 0 ? t.tipLabel : "Attributions",
      n = t.expandClassName !== void 0 ? t.expandClassName : e + "-expand",
      r = t.collapseLabel !== void 0 ? t.collapseLabel : "›",
      o = t.collapseClassName !== void 0 ? t.collapseClassName : e + "-collapse"
    typeof r == "string"
      ? ((this.collapseLabel_ = document.createElement("span")),
        (this.collapseLabel_.textContent = r),
        (this.collapseLabel_.className = o))
      : (this.collapseLabel_ = r)
    const a = t.label !== void 0 ? t.label : "i"
    typeof a == "string"
      ? ((this.label_ = document.createElement("span")),
        (this.label_.textContent = a),
        (this.label_.className = n))
      : (this.label_ = a)
    const l =
      this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_
    ;(this.toggleButton_ = document.createElement("button")),
      this.toggleButton_.setAttribute("type", "button"),
      this.toggleButton_.setAttribute(
        "aria-expanded",
        String(!this.collapsed_),
      ),
      (this.toggleButton_.title = i),
      this.toggleButton_.appendChild(l),
      this.toggleButton_.addEventListener(
        U.CLICK,
        this.handleClick_.bind(this),
        !1,
      )
    const h =
        e +
        " " +
        Zs +
        " " +
        Io +
        (this.collapsed_ && this.collapsible_ ? " " + pa : "") +
        (this.collapsible_ ? "" : " ol-uncollapsible"),
      c = this.element
    ;(c.className = h),
      c.appendChild(this.toggleButton_),
      c.appendChild(this.ulElement_),
      (this.renderedAttributions_ = []),
      (this.renderedVisible_ = !0)
  }
  collectSourceAttributions_(t) {
    const e = Array.from(
        new Set(
          this.getMap()
            .getAllLayers()
            .flatMap(n => n.getAttributions(t)),
        ),
      ),
      i = !this.getMap()
        .getAllLayers()
        .some(
          n =>
            n.getSource() && n.getSource().getAttributionsCollapsible() === !1,
        )
    return this.overrideCollapsible_ || this.setCollapsible(i), e
  }
  async updateElement_(t) {
    if (!t) {
      this.renderedVisible_ &&
        ((this.element.style.display = "none"), (this.renderedVisible_ = !1))
      return
    }
    const e = await Promise.all(
        this.collectSourceAttributions_(t).map(n => tc(() => n)),
      ),
      i = e.length > 0
    if (
      (this.renderedVisible_ != i &&
        ((this.element.style.display = i ? "" : "none"),
        (this.renderedVisible_ = i)),
      !si(e, this.renderedAttributions_))
    ) {
      lu(this.ulElement_)
      for (let n = 0, r = e.length; n < r; ++n) {
        const o = document.createElement("li")
        ;(o.innerHTML = e[n]), this.ulElement_.appendChild(o)
      }
      this.renderedAttributions_ = e
    }
  }
  handleClick_(t) {
    t.preventDefault(),
      this.handleToggle_(),
      (this.userCollapsed_ = this.collapsed_)
  }
  handleToggle_() {
    this.element.classList.toggle(pa),
      this.collapsed_
        ? _a(this.collapseLabel_, this.label_)
        : _a(this.label_, this.collapseLabel_),
      (this.collapsed_ = !this.collapsed_),
      this.toggleButton_.setAttribute("aria-expanded", String(!this.collapsed_))
  }
  getCollapsible() {
    return this.collapsible_
  }
  setCollapsible(t) {
    this.collapsible_ !== t &&
      ((this.collapsible_ = t),
      this.element.classList.toggle("ol-uncollapsible"),
      this.userCollapsed_ && this.handleToggle_())
  }
  setCollapsed(t) {
    ;(this.userCollapsed_ = t),
      !(!this.collapsible_ || this.collapsed_ === t) && this.handleToggle_()
  }
  getCollapsed() {
    return this.collapsed_
  }
  render(t) {
    this.updateElement_(t.frameState)
  }
}
const Pf = Mf
class Ff extends bo {
  constructor(t) {
    ;(t = t || {}),
      super({
        element: document.createElement("div"),
        render: t.render,
        target: t.target,
      })
    const e = t.className !== void 0 ? t.className : "ol-rotate",
      i = t.label !== void 0 ? t.label : "⇧",
      n = t.compassClassName !== void 0 ? t.compassClassName : "ol-compass"
    ;(this.label_ = null),
      typeof i == "string"
        ? ((this.label_ = document.createElement("span")),
          (this.label_.className = n),
          (this.label_.textContent = i))
        : ((this.label_ = i), this.label_.classList.add(n))
    const r = t.tipLabel ? t.tipLabel : "Reset rotation",
      o = document.createElement("button")
    ;(o.className = e + "-reset"),
      o.setAttribute("type", "button"),
      (o.title = r),
      o.appendChild(this.label_),
      o.addEventListener(U.CLICK, this.handleClick_.bind(this), !1)
    const a = e + " " + Zs + " " + Io,
      l = this.element
    ;(l.className = a),
      l.appendChild(o),
      (this.callResetNorth_ = t.resetNorth ? t.resetNorth : void 0),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250),
      (this.autoHide_ = t.autoHide !== void 0 ? t.autoHide : !0),
      (this.rotation_ = void 0),
      this.autoHide_ && this.element.classList.add(is)
  }
  handleClick_(t) {
    t.preventDefault(),
      this.callResetNorth_ !== void 0
        ? this.callResetNorth_()
        : this.resetNorth_()
  }
  resetNorth_() {
    const e = this.getMap().getView()
    if (!e) return
    const i = e.getRotation()
    i !== void 0 &&
      (this.duration_ > 0 && i % (2 * Math.PI) !== 0
        ? e.animate({ rotation: 0, duration: this.duration_, easing: qi })
        : e.setRotation(0))
  }
  render(t) {
    const e = t.frameState
    if (!e) return
    const i = e.viewState.rotation
    if (i != this.rotation_) {
      const n = "rotate(" + i + "rad)"
      if (this.autoHide_) {
        const r = this.element.classList.contains(is)
        !r && i === 0
          ? this.element.classList.add(is)
          : r && i !== 0 && this.element.classList.remove(is)
      }
      this.label_.style.transform = n
    }
    this.rotation_ = i
  }
}
const Of = Ff
class bf extends bo {
  constructor(t) {
    ;(t = t || {}),
      super({ element: document.createElement("div"), target: t.target })
    const e = t.className !== void 0 ? t.className : "ol-zoom",
      i = t.delta !== void 0 ? t.delta : 1,
      n = t.zoomInClassName !== void 0 ? t.zoomInClassName : e + "-in",
      r = t.zoomOutClassName !== void 0 ? t.zoomOutClassName : e + "-out",
      o = t.zoomInLabel !== void 0 ? t.zoomInLabel : "+",
      a = t.zoomOutLabel !== void 0 ? t.zoomOutLabel : "–",
      l = t.zoomInTipLabel !== void 0 ? t.zoomInTipLabel : "Zoom in",
      h = t.zoomOutTipLabel !== void 0 ? t.zoomOutTipLabel : "Zoom out",
      c = document.createElement("button")
    ;(c.className = n),
      c.setAttribute("type", "button"),
      (c.title = l),
      c.appendChild(typeof o == "string" ? document.createTextNode(o) : o),
      c.addEventListener(U.CLICK, this.handleClick_.bind(this, i), !1)
    const u = document.createElement("button")
    ;(u.className = r),
      u.setAttribute("type", "button"),
      (u.title = h),
      u.appendChild(typeof a == "string" ? document.createTextNode(a) : a),
      u.addEventListener(U.CLICK, this.handleClick_.bind(this, -i), !1)
    const d = e + " " + Zs + " " + Io,
      f = this.element
    ;(f.className = d),
      f.appendChild(c),
      f.appendChild(u),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250)
  }
  handleClick_(t, e) {
    e.preventDefault(), this.zoomByDelta_(t)
  }
  zoomByDelta_(t) {
    const i = this.getMap().getView()
    if (!i) return
    const n = i.getZoom()
    if (n !== void 0) {
      const r = i.getConstrainedZoom(n + t)
      this.duration_ > 0
        ? (i.getAnimating() && i.cancelAnimations(),
          i.animate({ zoom: r, duration: this.duration_, easing: qi }))
        : i.setZoom(r)
    }
  }
}
const Df = bf
function Nf(s) {
  s = s || {}
  const t = new ue()
  return (
    (s.zoom !== void 0 ? s.zoom : !0) && t.push(new Df(s.zoomOptions)),
    (s.rotate !== void 0 ? s.rotate : !0) && t.push(new Of(s.rotateOptions)),
    (s.attribution !== void 0 ? s.attribution : !0) &&
      t.push(new Pf(s.attributionOptions)),
    t
  )
}
const Wa = { ACTIVE: "active" }
class tn extends me {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      t && t.handleEvent && (this.handleEvent = t.handleEvent),
      (this.map_ = null),
      this.setActive(!0)
  }
  getActive() {
    return this.get(Wa.ACTIVE)
  }
  getMap() {
    return this.map_
  }
  handleEvent(t) {
    return !0
  }
  setActive(t) {
    this.set(Wa.ACTIVE, t)
  }
  setMap(t) {
    this.map_ = t
  }
}
function kf(s, t, e) {
  const i = s.getCenterInternal()
  if (i) {
    const n = [i[0] + t[0], i[1] + t[1]]
    s.animateInternal({
      duration: e !== void 0 ? e : 250,
      easing: bu,
      center: s.getConstrainedCenter(n),
    })
  }
}
function Do(s, t, e, i) {
  const n = s.getZoom()
  if (n === void 0) return
  const r = s.getConstrainedZoom(n + t),
    o = s.getResolutionForZoom(r)
  s.getAnimating() && s.cancelAnimations(),
    s.animate({
      resolution: o,
      anchor: e,
      duration: i !== void 0 ? i : 250,
      easing: qi,
    })
}
class Gf extends tn {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.delta_ = t.delta ? t.delta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250)
  }
  handleEvent(t) {
    let e = !1
    if (t.type == ft.DBLCLICK) {
      const i = t.originalEvent,
        n = t.map,
        r = t.coordinate,
        o = i.shiftKey ? -this.delta_ : this.delta_,
        a = n.getView()
      Do(a, o, r, this.duration_), i.preventDefault(), (e = !0)
    }
    return !e
  }
}
const zf = Gf
class Bn extends tn {
  constructor(t) {
    ;(t = t || {}),
      super(t),
      t.handleDownEvent && (this.handleDownEvent = t.handleDownEvent),
      t.handleDragEvent && (this.handleDragEvent = t.handleDragEvent),
      t.handleMoveEvent && (this.handleMoveEvent = t.handleMoveEvent),
      t.handleUpEvent && (this.handleUpEvent = t.handleUpEvent),
      t.stopDown && (this.stopDown = t.stopDown),
      (this.handlingDownUpSequence = !1),
      (this.targetPointers = [])
  }
  getPointerCount() {
    return this.targetPointers.length
  }
  handleDownEvent(t) {
    return !1
  }
  handleDragEvent(t) {}
  handleEvent(t) {
    if (!t.originalEvent) return !0
    let e = !1
    if ((this.updateTrackedPointers_(t), this.handlingDownUpSequence)) {
      if (t.type == ft.POINTERDRAG)
        this.handleDragEvent(t), t.originalEvent.preventDefault()
      else if (t.type == ft.POINTERUP) {
        const i = this.handleUpEvent(t)
        this.handlingDownUpSequence = i && this.targetPointers.length > 0
      }
    } else if (t.type == ft.POINTERDOWN) {
      const i = this.handleDownEvent(t)
      ;(this.handlingDownUpSequence = i), (e = this.stopDown(i))
    } else t.type == ft.POINTERMOVE && this.handleMoveEvent(t)
    return !e
  }
  handleMoveEvent(t) {}
  handleUpEvent(t) {
    return !1
  }
  stopDown(t) {
    return t
  }
  updateTrackedPointers_(t) {
    t.activePointers && (this.targetPointers = t.activePointers)
  }
}
function No(s) {
  const t = s.length
  let e = 0,
    i = 0
  for (let n = 0; n < t; n++) (e += s[n].clientX), (i += s[n].clientY)
  return { clientX: e / t, clientY: i / t }
}
function Hr(s) {
  const t = arguments
  return function (e) {
    let i = !0
    for (let n = 0, r = t.length; n < r && ((i = i && t[n](e)), !!i); ++n);
    return i
  }
}
const Yf = function (s) {
    const t = s.originalEvent
    return t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey
  },
  Xf = function (s) {
    const t = s.map.getTargetElement(),
      e = s.map.getOwnerDocument().activeElement
    return t.contains(e)
  },
  ch = function (s) {
    return s.map.getTargetElement().hasAttribute("tabindex") ? Xf(s) : !0
  },
  Uf = Rn,
  uh = function (s) {
    const t = s.originalEvent
    return t.button == 0 && !(au && Al && t.ctrlKey)
  },
  dh = function (s) {
    const t = s.originalEvent
    return !t.altKey && !(t.metaKey || t.ctrlKey) && !t.shiftKey
  },
  Wf = function (s) {
    const t = s.originalEvent
    return Al ? t.metaKey : t.ctrlKey
  },
  Zf = function (s) {
    const t = s.originalEvent
    return !t.altKey && !(t.metaKey || t.ctrlKey) && t.shiftKey
  },
  fh = function (s) {
    const t = s.originalEvent,
      e = t.target.tagName
    return (
      e !== "INPUT" &&
      e !== "SELECT" &&
      e !== "TEXTAREA" &&
      !t.target.isContentEditable
    )
  },
  Rr = function (s) {
    const t = s.originalEvent
    return (
      J(t !== void 0, "mapBrowserEvent must originate from a pointer event"),
      t.pointerType == "mouse"
    )
  },
  Bf = function (s) {
    const t = s.originalEvent
    return (
      J(t !== void 0, "mapBrowserEvent must originate from a pointer event"),
      t.isPrimary && t.button === 0
    )
  }
class Kf extends Bn {
  constructor(t) {
    super({ stopDown: Ms }),
      (t = t || {}),
      (this.kinetic_ = t.kinetic),
      (this.lastCentroid = null),
      this.lastPointersCount_,
      (this.panning_ = !1)
    const e = t.condition ? t.condition : Hr(dh, Bf)
    ;(this.condition_ = t.onFocusOnly ? Hr(ch, e) : e), (this.noKinetic_ = !1)
  }
  handleDragEvent(t) {
    const e = t.map
    this.panning_ || ((this.panning_ = !0), e.getView().beginInteraction())
    const i = this.targetPointers,
      n = e.getEventPixel(No(i))
    if (i.length == this.lastPointersCount_) {
      if (
        (this.kinetic_ && this.kinetic_.update(n[0], n[1]), this.lastCentroid)
      ) {
        const r = [this.lastCentroid[0] - n[0], n[1] - this.lastCentroid[1]],
          a = t.map.getView()
        Rc(r, a.getResolution()),
          lo(r, a.getRotation()),
          a.adjustCenterInternal(r)
      }
    } else this.kinetic_ && this.kinetic_.begin()
    ;(this.lastCentroid = n),
      (this.lastPointersCount_ = i.length),
      t.originalEvent.preventDefault()
  }
  handleUpEvent(t) {
    const e = t.map,
      i = e.getView()
    if (this.targetPointers.length === 0) {
      if (!this.noKinetic_ && this.kinetic_ && this.kinetic_.end()) {
        const n = this.kinetic_.getDistance(),
          r = this.kinetic_.getAngle(),
          o = i.getCenterInternal(),
          a = e.getPixelFromCoordinateInternal(o),
          l = e.getCoordinateFromPixelInternal([
            a[0] - n * Math.cos(r),
            a[1] - n * Math.sin(r),
          ])
        i.animateInternal({
          center: i.getConstrainedCenter(l),
          duration: 500,
          easing: qi,
        })
      }
      return this.panning_ && ((this.panning_ = !1), i.endInteraction()), !1
    }
    return (
      this.kinetic_ && this.kinetic_.begin(), (this.lastCentroid = null), !0
    )
  }
  handleDownEvent(t) {
    if (this.targetPointers.length > 0 && this.condition_(t)) {
      const i = t.map.getView()
      return (
        (this.lastCentroid = null),
        i.getAnimating() && i.cancelAnimations(),
        this.kinetic_ && this.kinetic_.begin(),
        (this.noKinetic_ = this.targetPointers.length > 1),
        !0
      )
    }
    return !1
  }
}
const Vf = Kf
class jf extends Bn {
  constructor(t) {
    ;(t = t || {}),
      super({ stopDown: Ms }),
      (this.condition_ = t.condition ? t.condition : Yf),
      (this.lastAngle_ = void 0),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250)
  }
  handleDragEvent(t) {
    if (!Rr(t)) return
    const e = t.map,
      i = e.getView()
    if (i.getConstraints().rotation === Mo) return
    const n = e.getSize(),
      r = t.pixel,
      o = Math.atan2(n[1] / 2 - r[1], r[0] - n[0] / 2)
    if (this.lastAngle_ !== void 0) {
      const a = o - this.lastAngle_
      i.adjustRotationInternal(-a)
    }
    this.lastAngle_ = o
  }
  handleUpEvent(t) {
    return Rr(t) ? (t.map.getView().endInteraction(this.duration_), !1) : !0
  }
  handleDownEvent(t) {
    return Rr(t) && uh(t) && this.condition_(t)
      ? (t.map.getView().beginInteraction(), (this.lastAngle_ = void 0), !0)
      : !1
  }
}
class Hf extends io {
  constructor(t) {
    super(),
      (this.geometry_ = null),
      (this.element_ = document.createElement("div")),
      (this.element_.style.position = "absolute"),
      (this.element_.style.pointerEvents = "auto"),
      (this.element_.className = "ol-box " + t),
      (this.map_ = null),
      (this.startPixel_ = null),
      (this.endPixel_ = null)
  }
  disposeInternal() {
    this.setMap(null)
  }
  render_() {
    const t = this.startPixel_,
      e = this.endPixel_,
      i = "px",
      n = this.element_.style
    ;(n.left = Math.min(t[0], e[0]) + i),
      (n.top = Math.min(t[1], e[1]) + i),
      (n.width = Math.abs(e[0] - t[0]) + i),
      (n.height = Math.abs(e[1] - t[1]) + i)
  }
  setMap(t) {
    if (this.map_) {
      this.map_.getOverlayContainer().removeChild(this.element_)
      const e = this.element_.style
      ;(e.left = "inherit"),
        (e.top = "inherit"),
        (e.width = "inherit"),
        (e.height = "inherit")
    }
    ;(this.map_ = t),
      this.map_ && this.map_.getOverlayContainer().appendChild(this.element_)
  }
  setPixels(t, e) {
    ;(this.startPixel_ = t),
      (this.endPixel_ = e),
      this.createOrUpdateGeometry(),
      this.render_()
  }
  createOrUpdateGeometry() {
    const t = this.startPixel_,
      e = this.endPixel_,
      n = [t, [t[0], e[1]], e, [e[0], t[1]]].map(
        this.map_.getCoordinateFromPixelInternal,
        this.map_,
      )
    ;(n[4] = n[0].slice()),
      this.geometry_
        ? this.geometry_.setCoordinates([n])
        : (this.geometry_ = new Me([n]))
  }
  getGeometry() {
    return this.geometry_
  }
}
const as = {
  BOXSTART: "boxstart",
  BOXDRAG: "boxdrag",
  BOXEND: "boxend",
  BOXCANCEL: "boxcancel",
}
class Sr extends Fe {
  constructor(t, e, i) {
    super(t), (this.coordinate = e), (this.mapBrowserEvent = i)
  }
}
class qf extends Bn {
  constructor(t) {
    super(),
      this.on,
      this.once,
      this.un,
      (t = t || {}),
      (this.box_ = new Hf(t.className || "ol-dragbox")),
      (this.minArea_ = t.minArea !== void 0 ? t.minArea : 64),
      t.onBoxEnd && (this.onBoxEnd = t.onBoxEnd),
      (this.startPixel_ = null),
      (this.condition_ = t.condition ? t.condition : uh),
      (this.boxEndCondition_ = t.boxEndCondition
        ? t.boxEndCondition
        : this.defaultBoxEndCondition)
  }
  defaultBoxEndCondition(t, e, i) {
    const n = i[0] - e[0],
      r = i[1] - e[1]
    return n * n + r * r >= this.minArea_
  }
  getGeometry() {
    return this.box_.getGeometry()
  }
  handleDragEvent(t) {
    this.box_.setPixels(this.startPixel_, t.pixel),
      this.dispatchEvent(new Sr(as.BOXDRAG, t.coordinate, t))
  }
  handleUpEvent(t) {
    this.box_.setMap(null)
    const e = this.boxEndCondition_(t, this.startPixel_, t.pixel)
    return (
      e && this.onBoxEnd(t),
      this.dispatchEvent(new Sr(e ? as.BOXEND : as.BOXCANCEL, t.coordinate, t)),
      !1
    )
  }
  handleDownEvent(t) {
    return this.condition_(t)
      ? ((this.startPixel_ = t.pixel),
        this.box_.setMap(t.map),
        this.box_.setPixels(this.startPixel_, this.startPixel_),
        this.dispatchEvent(new Sr(as.BOXSTART, t.coordinate, t)),
        !0)
      : !1
  }
  onBoxEnd(t) {}
}
class $f extends qf {
  constructor(t) {
    t = t || {}
    const e = t.condition ? t.condition : Zf
    super({
      condition: e,
      className: t.className || "ol-dragzoom",
      minArea: t.minArea,
    }),
      (this.duration_ = t.duration !== void 0 ? t.duration : 200),
      (this.out_ = t.out !== void 0 ? t.out : !1)
  }
  onBoxEnd(t) {
    const i = this.getMap().getView()
    let n = this.getGeometry()
    if (this.out_) {
      const r = i.rotatedExtentForGeometry(n),
        o = i.getResolutionForExtentInternal(r),
        a = i.getResolution() / o
      ;(n = n.clone()), n.scale(a * a)
    }
    i.fitInternal(n, { duration: this.duration_, easing: qi })
  }
}
const Jf = $f,
  li = {
    LEFT: "ArrowLeft",
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
  }
class Qf extends tn {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.defaultCondition_ = function (e) {
        return dh(e) && fh(e)
      }),
      (this.condition_ =
        t.condition !== void 0 ? t.condition : this.defaultCondition_),
      (this.duration_ = t.duration !== void 0 ? t.duration : 100),
      (this.pixelDelta_ = t.pixelDelta !== void 0 ? t.pixelDelta : 128)
  }
  handleEvent(t) {
    let e = !1
    if (t.type == U.KEYDOWN) {
      const i = t.originalEvent,
        n = i.key
      if (
        this.condition_(t) &&
        (n == li.DOWN || n == li.LEFT || n == li.RIGHT || n == li.UP)
      ) {
        const o = t.map.getView(),
          a = o.getResolution() * this.pixelDelta_
        let l = 0,
          h = 0
        n == li.DOWN
          ? (h = -a)
          : n == li.LEFT
            ? (l = -a)
            : n == li.RIGHT
              ? (l = a)
              : (h = a)
        const c = [l, h]
        lo(c, o.getRotation()),
          kf(o, c, this.duration_),
          i.preventDefault(),
          (e = !0)
      }
    }
    return !e
  }
}
class tg extends tn {
  constructor(t) {
    super(),
      (t = t || {}),
      (this.condition_ = t.condition
        ? t.condition
        : function (e) {
            return !Wf(e) && fh(e)
          }),
      (this.delta_ = t.delta ? t.delta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 100)
  }
  handleEvent(t) {
    let e = !1
    if (t.type == U.KEYDOWN || t.type == U.KEYPRESS) {
      const i = t.originalEvent,
        n = i.key
      if (this.condition_(t) && (n === "+" || n === "-")) {
        const r = t.map,
          o = n === "+" ? this.delta_ : -this.delta_,
          a = r.getView()
        Do(a, o, void 0, this.duration_), i.preventDefault(), (e = !0)
      }
    }
    return !e
  }
}
const eg = tg
class ig extends tn {
  constructor(t) {
    ;(t = t || {}),
      super(t),
      (this.totalDelta_ = 0),
      (this.lastDelta_ = 0),
      (this.maxDelta_ = t.maxDelta !== void 0 ? t.maxDelta : 1),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250),
      (this.timeout_ = t.timeout !== void 0 ? t.timeout : 80),
      (this.useAnchor_ = t.useAnchor !== void 0 ? t.useAnchor : !0),
      (this.constrainResolution_ =
        t.constrainResolution !== void 0 ? t.constrainResolution : !1)
    const e = t.condition ? t.condition : Uf
    ;(this.condition_ = t.onFocusOnly ? Hr(ch, e) : e),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      this.timeoutId_,
      (this.mode_ = void 0),
      (this.trackpadEventGap_ = 400),
      this.trackpadTimeoutId_,
      (this.deltaPerZoom_ = 300)
  }
  endInteraction_() {
    this.trackpadTimeoutId_ = void 0
    const t = this.getMap()
    if (!t) return
    t.getView().endInteraction(
      void 0,
      this.lastDelta_ ? (this.lastDelta_ > 0 ? 1 : -1) : 0,
      this.lastAnchor_,
    )
  }
  handleEvent(t) {
    if (!this.condition_(t) || t.type !== U.WHEEL) return !0
    const i = t.map,
      n = t.originalEvent
    n.preventDefault(), this.useAnchor_ && (this.lastAnchor_ = t.coordinate)
    let r
    if (
      (t.type == U.WHEEL &&
        ((r = n.deltaY),
        ru && n.deltaMode === WheelEvent.DOM_DELTA_PIXEL && (r /= Ml),
        n.deltaMode === WheelEvent.DOM_DELTA_LINE && (r *= 40)),
      r === 0)
    )
      return !1
    this.lastDelta_ = r
    const o = Date.now()
    this.startTime_ === void 0 && (this.startTime_ = o),
      (!this.mode_ || o - this.startTime_ > this.trackpadEventGap_) &&
        (this.mode_ = Math.abs(r) < 4 ? "trackpad" : "wheel")
    const a = i.getView()
    if (
      this.mode_ === "trackpad" &&
      !(a.getConstrainResolution() || this.constrainResolution_)
    )
      return (
        this.trackpadTimeoutId_
          ? clearTimeout(this.trackpadTimeoutId_)
          : (a.getAnimating() && a.cancelAnimations(), a.beginInteraction()),
        (this.trackpadTimeoutId_ = setTimeout(
          this.endInteraction_.bind(this),
          this.timeout_,
        )),
        a.adjustZoom(-r / this.deltaPerZoom_, this.lastAnchor_),
        (this.startTime_ = o),
        !1
      )
    this.totalDelta_ += r
    const l = Math.max(this.timeout_ - (o - this.startTime_), 0)
    return (
      clearTimeout(this.timeoutId_),
      (this.timeoutId_ = setTimeout(this.handleWheelZoom_.bind(this, i), l)),
      !1
    )
  }
  handleWheelZoom_(t) {
    const e = t.getView()
    e.getAnimating() && e.cancelAnimations()
    let i =
      -mt(
        this.totalDelta_,
        -this.maxDelta_ * this.deltaPerZoom_,
        this.maxDelta_ * this.deltaPerZoom_,
      ) / this.deltaPerZoom_
    ;(e.getConstrainResolution() || this.constrainResolution_) &&
      (i = i ? (i > 0 ? 1 : -1) : 0),
      Do(e, i, this.lastAnchor_, this.duration_),
      (this.mode_ = void 0),
      (this.totalDelta_ = 0),
      (this.lastAnchor_ = null),
      (this.startTime_ = void 0),
      (this.timeoutId_ = void 0)
  }
  setMouseAnchor(t) {
    ;(this.useAnchor_ = t), t || (this.lastAnchor_ = null)
  }
}
const ng = ig
class sg extends Bn {
  constructor(t) {
    t = t || {}
    const e = t
    e.stopDown || (e.stopDown = Ms),
      super(e),
      (this.anchor_ = null),
      (this.lastAngle_ = void 0),
      (this.rotating_ = !1),
      (this.rotationDelta_ = 0),
      (this.threshold_ = t.threshold !== void 0 ? t.threshold : 0.3),
      (this.duration_ = t.duration !== void 0 ? t.duration : 250)
  }
  handleDragEvent(t) {
    let e = 0
    const i = this.targetPointers[0],
      n = this.targetPointers[1],
      r = Math.atan2(n.clientY - i.clientY, n.clientX - i.clientX)
    if (this.lastAngle_ !== void 0) {
      const l = r - this.lastAngle_
      ;(this.rotationDelta_ += l),
        !this.rotating_ &&
          Math.abs(this.rotationDelta_) > this.threshold_ &&
          (this.rotating_ = !0),
        (e = l)
    }
    this.lastAngle_ = r
    const o = t.map,
      a = o.getView()
    a.getConstraints().rotation !== Mo &&
      ((this.anchor_ = o.getCoordinateFromPixelInternal(
        o.getEventPixel(No(this.targetPointers)),
      )),
      this.rotating_ && (o.render(), a.adjustRotationInternal(e, this.anchor_)))
  }
  handleUpEvent(t) {
    return this.targetPointers.length < 2
      ? (t.map.getView().endInteraction(this.duration_), !1)
      : !0
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map
      return (
        (this.anchor_ = null),
        (this.lastAngle_ = void 0),
        (this.rotating_ = !1),
        (this.rotationDelta_ = 0),
        this.handlingDownUpSequence || e.getView().beginInteraction(),
        !0
      )
    }
    return !1
  }
}
class rg extends Bn {
  constructor(t) {
    t = t || {}
    const e = t
    e.stopDown || (e.stopDown = Ms),
      super(e),
      (this.anchor_ = null),
      (this.duration_ = t.duration !== void 0 ? t.duration : 400),
      (this.lastDistance_ = void 0),
      (this.lastScaleDelta_ = 1)
  }
  handleDragEvent(t) {
    let e = 1
    const i = this.targetPointers[0],
      n = this.targetPointers[1],
      r = i.clientX - n.clientX,
      o = i.clientY - n.clientY,
      a = Math.sqrt(r * r + o * o)
    this.lastDistance_ !== void 0 && (e = this.lastDistance_ / a),
      (this.lastDistance_ = a)
    const l = t.map,
      h = l.getView()
    e != 1 && (this.lastScaleDelta_ = e),
      (this.anchor_ = l.getCoordinateFromPixelInternal(
        l.getEventPixel(No(this.targetPointers)),
      )),
      l.render(),
      h.adjustResolutionInternal(e, this.anchor_)
  }
  handleUpEvent(t) {
    if (this.targetPointers.length < 2) {
      const i = t.map.getView(),
        n = this.lastScaleDelta_ > 1 ? 1 : -1
      return i.endInteraction(this.duration_, n), !1
    }
    return !0
  }
  handleDownEvent(t) {
    if (this.targetPointers.length >= 2) {
      const e = t.map
      return (
        (this.anchor_ = null),
        (this.lastDistance_ = void 0),
        (this.lastScaleDelta_ = 1),
        this.handlingDownUpSequence || e.getView().beginInteraction(),
        !0
      )
    }
    return !1
  }
}
const og = rg
function ag(s) {
  s = s || {}
  const t = new ue(),
    e = new wf(-0.005, 0.05, 100)
  return (
    (s.altShiftDragRotate !== void 0 ? s.altShiftDragRotate : !0) &&
      t.push(new jf()),
    (s.doubleClickZoom !== void 0 ? s.doubleClickZoom : !0) &&
      t.push(new zf({ delta: s.zoomDelta, duration: s.zoomDuration })),
    (s.dragPan !== void 0 ? s.dragPan : !0) &&
      t.push(new Vf({ onFocusOnly: s.onFocusOnly, kinetic: e })),
    (s.pinchRotate !== void 0 ? s.pinchRotate : !0) && t.push(new sg()),
    (s.pinchZoom !== void 0 ? s.pinchZoom : !0) &&
      t.push(new og({ duration: s.zoomDuration })),
    (s.keyboard !== void 0 ? s.keyboard : !0) &&
      (t.push(new Qf()),
      t.push(new eg({ delta: s.zoomDelta, duration: s.zoomDuration }))),
    (s.mouseWheelZoom !== void 0 ? s.mouseWheelZoom : !0) &&
      t.push(new ng({ onFocusOnly: s.onFocusOnly, duration: s.zoomDuration })),
    (s.shiftDragZoom !== void 0 ? s.shiftDragZoom : !0) &&
      t.push(new Jf({ duration: s.zoomDuration })),
    t
  )
}
function gh(s) {
  if (s instanceof Vs) {
    s.setMapInternal(null)
    return
  }
  s instanceof Qi && s.getLayers().forEach(gh)
}
function _h(s, t) {
  if (s instanceof Vs) {
    s.setMapInternal(t)
    return
  }
  if (s instanceof Qi) {
    const e = s.getLayers().getArray()
    for (let i = 0, n = e.length; i < n; ++i) _h(e[i], t)
  }
}
class lg extends me {
  constructor(t) {
    super(), (t = t || {}), this.on, this.once, this.un
    const e = hg(t)
    this.renderComplete_,
      (this.loaded_ = !0),
      (this.boundHandleBrowserEvent_ = this.handleBrowserEvent.bind(this)),
      (this.maxTilesLoading_ =
        t.maxTilesLoading !== void 0 ? t.maxTilesLoading : 16),
      (this.pixelRatio_ = t.pixelRatio !== void 0 ? t.pixelRatio : Ml),
      this.postRenderTimeoutHandle_,
      this.animationDelayKey_,
      (this.animationDelay_ = this.animationDelay_.bind(this)),
      (this.coordinateToPixelTransform_ = ne()),
      (this.pixelToCoordinateTransform_ = ne()),
      (this.frameIndex_ = 0),
      (this.frameState_ = null),
      (this.previousExtent_ = null),
      (this.viewPropertyListenerKey_ = null),
      (this.viewChangeListenerKey_ = null),
      (this.layerGroupPropertyListenerKeys_ = null),
      (this.viewport_ = document.createElement("div")),
      (this.viewport_.className =
        "ol-viewport" + ("ontouchstart" in window ? " ol-touch" : "")),
      (this.viewport_.style.position = "relative"),
      (this.viewport_.style.overflow = "hidden"),
      (this.viewport_.style.width = "100%"),
      (this.viewport_.style.height = "100%"),
      (this.overlayContainer_ = document.createElement("div")),
      (this.overlayContainer_.style.position = "absolute"),
      (this.overlayContainer_.style.zIndex = "0"),
      (this.overlayContainer_.style.width = "100%"),
      (this.overlayContainer_.style.height = "100%"),
      (this.overlayContainer_.style.pointerEvents = "none"),
      (this.overlayContainer_.className = "ol-overlaycontainer"),
      this.viewport_.appendChild(this.overlayContainer_),
      (this.overlayContainerStopEvent_ = document.createElement("div")),
      (this.overlayContainerStopEvent_.style.position = "absolute"),
      (this.overlayContainerStopEvent_.style.zIndex = "0"),
      (this.overlayContainerStopEvent_.style.width = "100%"),
      (this.overlayContainerStopEvent_.style.height = "100%"),
      (this.overlayContainerStopEvent_.style.pointerEvents = "none"),
      (this.overlayContainerStopEvent_.className =
        "ol-overlaycontainer-stopevent"),
      this.viewport_.appendChild(this.overlayContainerStopEvent_),
      (this.mapBrowserEventHandler_ = null),
      (this.moveTolerance_ = t.moveTolerance),
      (this.keyboardEventTarget_ = e.keyboardEventTarget),
      (this.targetChangeHandlerKeys_ = null),
      (this.targetElement_ = null),
      (this.resizeObserver_ = new ResizeObserver(() => this.updateSize())),
      (this.controls = e.controls || Nf()),
      (this.interactions = e.interactions || ag({ onFocusOnly: !0 })),
      (this.overlays_ = e.overlays),
      (this.overlayIdIndex_ = {}),
      (this.renderer_ = null),
      (this.postRenderFunctions_ = []),
      (this.tileQueue_ = new Lf(
        this.getTilePriority.bind(this),
        this.handleTileChange_.bind(this),
      )),
      this.addChangeListener(Tt.LAYERGROUP, this.handleLayerGroupChanged_),
      this.addChangeListener(Tt.VIEW, this.handleViewChanged_),
      this.addChangeListener(Tt.SIZE, this.handleSizeChanged_),
      this.addChangeListener(Tt.TARGET, this.handleTargetChanged_),
      this.setProperties(e.values)
    const i = this
    t.view &&
      !(t.view instanceof he) &&
      t.view.then(function (n) {
        i.setView(new he(n))
      }),
      this.controls.addEventListener(bt.ADD, n => {
        n.element.setMap(this)
      }),
      this.controls.addEventListener(bt.REMOVE, n => {
        n.element.setMap(null)
      }),
      this.interactions.addEventListener(bt.ADD, n => {
        n.element.setMap(this)
      }),
      this.interactions.addEventListener(bt.REMOVE, n => {
        n.element.setMap(null)
      }),
      this.overlays_.addEventListener(bt.ADD, n => {
        this.addOverlayInternal_(n.element)
      }),
      this.overlays_.addEventListener(bt.REMOVE, n => {
        const r = n.element.getId()
        r !== void 0 && delete this.overlayIdIndex_[r.toString()],
          n.element.setMap(null)
      }),
      this.controls.forEach(n => {
        n.setMap(this)
      }),
      this.interactions.forEach(n => {
        n.setMap(this)
      }),
      this.overlays_.forEach(this.addOverlayInternal_.bind(this))
  }
  addControl(t) {
    this.getControls().push(t)
  }
  addInteraction(t) {
    this.getInteractions().push(t)
  }
  addLayer(t) {
    this.getLayerGroup().getLayers().push(t)
  }
  handleLayerAdd_(t) {
    _h(t.layer, this)
  }
  addOverlay(t) {
    this.getOverlays().push(t)
  }
  addOverlayInternal_(t) {
    const e = t.getId()
    e !== void 0 && (this.overlayIdIndex_[e.toString()] = t), t.setMap(this)
  }
  disposeInternal() {
    this.controls.clear(),
      this.interactions.clear(),
      this.overlays_.clear(),
      this.resizeObserver_.disconnect(),
      this.setTarget(null),
      super.disposeInternal()
  }
  forEachFeatureAtPixel(t, e, i) {
    if (!this.frameState_ || !this.renderer_) return
    const n = this.getCoordinateFromPixelInternal(t)
    i = i !== void 0 ? i : {}
    const r = i.hitTolerance !== void 0 ? i.hitTolerance : 0,
      o = i.layerFilter !== void 0 ? i.layerFilter : Rn,
      a = i.checkWrapped !== !1
    return this.renderer_.forEachFeatureAtCoordinate(
      n,
      this.frameState_,
      r,
      a,
      e,
      null,
      o,
      null,
    )
  }
  getFeaturesAtPixel(t, e) {
    const i = []
    return (
      this.forEachFeatureAtPixel(
        t,
        function (n) {
          i.push(n)
        },
        e,
      ),
      i
    )
  }
  getAllLayers() {
    const t = []
    function e(i) {
      i.forEach(function (n) {
        n instanceof Qi ? e(n.getLayers()) : t.push(n)
      })
    }
    return e(this.getLayers()), t
  }
  hasFeatureAtPixel(t, e) {
    if (!this.frameState_ || !this.renderer_) return !1
    const i = this.getCoordinateFromPixelInternal(t)
    e = e !== void 0 ? e : {}
    const n = e.layerFilter !== void 0 ? e.layerFilter : Rn,
      r = e.hitTolerance !== void 0 ? e.hitTolerance : 0,
      o = e.checkWrapped !== !1
    return this.renderer_.hasFeatureAtCoordinate(
      i,
      this.frameState_,
      r,
      o,
      n,
      null,
    )
  }
  getEventCoordinate(t) {
    return this.getCoordinateFromPixel(this.getEventPixel(t))
  }
  getEventCoordinateInternal(t) {
    return this.getCoordinateFromPixelInternal(this.getEventPixel(t))
  }
  getEventPixel(t) {
    const i = this.viewport_.getBoundingClientRect(),
      n = this.getSize(),
      r = i.width / n[0],
      o = i.height / n[1],
      a = "changedTouches" in t ? t.changedTouches[0] : t
    return [(a.clientX - i.left) / r, (a.clientY - i.top) / o]
  }
  getTarget() {
    return this.get(Tt.TARGET)
  }
  getTargetElement() {
    return this.targetElement_
  }
  getCoordinateFromPixel(t) {
    return Gr(
      this.getCoordinateFromPixelInternal(t),
      this.getView().getProjection(),
    )
  }
  getCoordinateFromPixelInternal(t) {
    const e = this.frameState_
    return e ? Et(e.pixelToCoordinateTransform, t.slice()) : null
  }
  getControls() {
    return this.controls
  }
  getOverlays() {
    return this.overlays_
  }
  getOverlayById(t) {
    const e = this.overlayIdIndex_[t.toString()]
    return e !== void 0 ? e : null
  }
  getInteractions() {
    return this.interactions
  }
  getLayerGroup() {
    return this.get(Tt.LAYERGROUP)
  }
  setLayers(t) {
    const e = this.getLayerGroup()
    if (t instanceof ue) {
      e.setLayers(t)
      return
    }
    const i = e.getLayers()
    i.clear(), i.extend(t)
  }
  getLayers() {
    return this.getLayerGroup().getLayers()
  }
  getLoadingOrNotReady() {
    const t = this.getLayerGroup().getLayerStatesArray()
    for (let e = 0, i = t.length; e < i; ++e) {
      const n = t[e]
      if (!n.visible) continue
      const r = n.layer.getRenderer()
      if (r && !r.ready) return !0
      const o = n.layer.getSource()
      if (o && o.loading) return !0
    }
    return !1
  }
  getPixelFromCoordinate(t) {
    const e = Re(t, this.getView().getProjection())
    return this.getPixelFromCoordinateInternal(e)
  }
  getPixelFromCoordinateInternal(t) {
    const e = this.frameState_
    return e ? Et(e.coordinateToPixelTransform, t.slice(0, 2)) : null
  }
  getRenderer() {
    return this.renderer_
  }
  getSize() {
    return this.get(Tt.SIZE)
  }
  getView() {
    return this.get(Tt.VIEW)
  }
  getViewport() {
    return this.viewport_
  }
  getOverlayContainer() {
    return this.overlayContainer_
  }
  getOverlayContainerStopEvent() {
    return this.overlayContainerStopEvent_
  }
  getOwnerDocument() {
    const t = this.getTargetElement()
    return t ? t.ownerDocument : document
  }
  getTilePriority(t, e, i, n) {
    return Af(this.frameState_, t, e, i, n)
  }
  handleBrowserEvent(t, e) {
    e = e || t.type
    const i = new Ze(e, this, t)
    this.handleMapBrowserEvent(i)
  }
  handleMapBrowserEvent(t) {
    if (!this.frameState_) return
    const e = t.originalEvent,
      i = e.type
    if (i === jr.POINTERDOWN || i === U.WHEEL || i === U.KEYDOWN) {
      const n = this.getOwnerDocument(),
        r = this.viewport_.getRootNode ? this.viewport_.getRootNode() : n,
        o = e.target
      if (
        this.overlayContainerStopEvent_.contains(o) ||
        !(r === n ? n.documentElement : r).contains(o)
      )
        return
    }
    if (((t.frameState = this.frameState_), this.dispatchEvent(t) !== !1)) {
      const n = this.getInteractions().getArray().slice()
      for (let r = n.length - 1; r >= 0; r--) {
        const o = n[r]
        if (o.getMap() !== this || !o.getActive() || !this.getTargetElement())
          continue
        if (!o.handleEvent(t) || t.propagationStopped) break
      }
    }
  }
  handlePostRender() {
    const t = this.frameState_,
      e = this.tileQueue_
    if (!e.isEmpty()) {
      let n = this.maxTilesLoading_,
        r = n
      if (t) {
        const o = t.viewHints
        if (o[It.ANIMATING] || o[It.INTERACTING]) {
          const a = Date.now() - t.time > 8
          ;(n = a ? 0 : 8), (r = a ? 0 : 2)
        }
      }
      e.getTilesLoading() < n && (e.reprioritize(), e.loadMoreTiles(n, r))
    }
    t &&
      this.renderer_ &&
      !t.animate &&
      (this.renderComplete_ === !0
        ? (this.hasListener(Ht.RENDERCOMPLETE) &&
            this.renderer_.dispatchRenderEvent(Ht.RENDERCOMPLETE, t),
          this.loaded_ === !1 &&
            ((this.loaded_ = !0),
            this.dispatchEvent(new bi(Te.LOADEND, this, t))))
        : this.loaded_ === !0 &&
          ((this.loaded_ = !1),
          this.dispatchEvent(new bi(Te.LOADSTART, this, t))))
    const i = this.postRenderFunctions_
    for (let n = 0, r = i.length; n < r; ++n) i[n](this, t)
    i.length = 0
  }
  handleSizeChanged_() {
    this.getView() &&
      !this.getView().getAnimating() &&
      this.getView().resolveConstraints(0),
      this.render()
  }
  handleTargetChanged_() {
    if (this.mapBrowserEventHandler_) {
      for (let i = 0, n = this.targetChangeHandlerKeys_.length; i < n; ++i)
        lt(this.targetChangeHandlerKeys_[i])
      ;(this.targetChangeHandlerKeys_ = null),
        this.viewport_.removeEventListener(
          U.CONTEXTMENU,
          this.boundHandleBrowserEvent_,
        ),
        this.viewport_.removeEventListener(
          U.WHEEL,
          this.boundHandleBrowserEvent_,
        ),
        this.mapBrowserEventHandler_.dispose(),
        (this.mapBrowserEventHandler_ = null),
        Ur(this.viewport_)
    }
    if (this.targetElement_) {
      this.resizeObserver_.unobserve(this.targetElement_)
      const i = this.targetElement_.getRootNode()
      i instanceof ShadowRoot && this.resizeObserver_.unobserve(i.host),
        this.setSize(void 0)
    }
    const t = this.getTarget(),
      e = typeof t == "string" ? document.getElementById(t) : t
    if (((this.targetElement_ = e), !e))
      this.renderer_ &&
        (clearTimeout(this.postRenderTimeoutHandle_),
        (this.postRenderTimeoutHandle_ = void 0),
        (this.postRenderFunctions_.length = 0),
        this.renderer_.dispose(),
        (this.renderer_ = null)),
        this.animationDelayKey_ &&
          (cancelAnimationFrame(this.animationDelayKey_),
          (this.animationDelayKey_ = void 0))
    else {
      e.appendChild(this.viewport_),
        this.renderer_ || (this.renderer_ = new Tf(this)),
        (this.mapBrowserEventHandler_ = new If(this, this.moveTolerance_))
      for (const r in ft)
        this.mapBrowserEventHandler_.addEventListener(
          ft[r],
          this.handleMapBrowserEvent.bind(this),
        )
      this.viewport_.addEventListener(
        U.CONTEXTMENU,
        this.boundHandleBrowserEvent_,
        !1,
      ),
        this.viewport_.addEventListener(
          U.WHEEL,
          this.boundHandleBrowserEvent_,
          Ol ? { passive: !1 } : !1,
        )
      const i = this.keyboardEventTarget_ ? this.keyboardEventTarget_ : e
      this.targetChangeHandlerKeys_ = [
        H(i, U.KEYDOWN, this.handleBrowserEvent, this),
        H(i, U.KEYPRESS, this.handleBrowserEvent, this),
      ]
      const n = e.getRootNode()
      n instanceof ShadowRoot && this.resizeObserver_.observe(n.host),
        this.resizeObserver_.observe(e)
    }
    this.updateSize()
  }
  handleTileChange_() {
    this.render()
  }
  handleViewPropertyChanged_() {
    this.render()
  }
  handleViewChanged_() {
    this.viewPropertyListenerKey_ &&
      (lt(this.viewPropertyListenerKey_),
      (this.viewPropertyListenerKey_ = null)),
      this.viewChangeListenerKey_ &&
        (lt(this.viewChangeListenerKey_), (this.viewChangeListenerKey_ = null))
    const t = this.getView()
    t &&
      (this.updateViewportSize_(this.getSize()),
      (this.viewPropertyListenerKey_ = H(
        t,
        Xi.PROPERTYCHANGE,
        this.handleViewPropertyChanged_,
        this,
      )),
      (this.viewChangeListenerKey_ = H(
        t,
        U.CHANGE,
        this.handleViewPropertyChanged_,
        this,
      )),
      t.resolveConstraints(0)),
      this.render()
  }
  handleLayerGroupChanged_() {
    this.layerGroupPropertyListenerKeys_ &&
      (this.layerGroupPropertyListenerKeys_.forEach(lt),
      (this.layerGroupPropertyListenerKeys_ = null))
    const t = this.getLayerGroup()
    t &&
      (this.handleLayerAdd_(new Be("addlayer", t)),
      (this.layerGroupPropertyListenerKeys_ = [
        H(t, Xi.PROPERTYCHANGE, this.render, this),
        H(t, U.CHANGE, this.render, this),
        H(t, "addlayer", this.handleLayerAdd_, this),
        H(t, "removelayer", this.handleLayerRemove_, this),
      ])),
      this.render()
  }
  isRendered() {
    return !!this.frameState_
  }
  animationDelay_() {
    ;(this.animationDelayKey_ = void 0), this.renderFrame_(Date.now())
  }
  renderSync() {
    this.animationDelayKey_ && cancelAnimationFrame(this.animationDelayKey_),
      this.animationDelay_()
  }
  redrawText() {
    const t = this.getLayerGroup().getLayerStatesArray()
    for (let e = 0, i = t.length; e < i; ++e) {
      const n = t[e].layer
      n.hasRenderer() && n.getRenderer().handleFontsChanged()
    }
  }
  render() {
    this.renderer_ &&
      this.animationDelayKey_ === void 0 &&
      (this.animationDelayKey_ = requestAnimationFrame(this.animationDelay_))
  }
  removeControl(t) {
    return this.getControls().remove(t)
  }
  removeInteraction(t) {
    return this.getInteractions().remove(t)
  }
  removeLayer(t) {
    return this.getLayerGroup().getLayers().remove(t)
  }
  handleLayerRemove_(t) {
    gh(t.layer)
  }
  removeOverlay(t) {
    return this.getOverlays().remove(t)
  }
  renderFrame_(t) {
    const e = this.getSize(),
      i = this.getView(),
      n = this.frameState_
    let r = null
    if (e !== void 0 && ma(e) && i && i.isDef()) {
      const o = i.getHints(
          this.frameState_ ? this.frameState_.viewHints : void 0,
        ),
        a = i.getState()
      if (
        ((r = {
          animate: !1,
          coordinateToPixelTransform: this.coordinateToPixelTransform_,
          declutter: null,
          extent: br(a.center, a.resolution, a.rotation, e),
          index: this.frameIndex_++,
          layerIndex: 0,
          layerStatesArray: this.getLayerGroup().getLayerStatesArray(),
          pixelRatio: this.pixelRatio_,
          pixelToCoordinateTransform: this.pixelToCoordinateTransform_,
          postRenderFunctions: [],
          size: e,
          tileQueue: this.tileQueue_,
          time: t,
          usedTiles: {},
          viewState: a,
          viewHints: o,
          wantedTiles: {},
          mapId: it(this),
          renderTargets: {},
        }),
        a.nextCenter && a.nextResolution)
      ) {
        const l = isNaN(a.nextRotation) ? a.rotation : a.nextRotation
        r.nextExtent = br(a.nextCenter, a.nextResolution, l, e)
      }
    }
    ;(this.frameState_ = r),
      this.renderer_.renderFrame(r),
      r &&
        (r.animate && this.render(),
        Array.prototype.push.apply(
          this.postRenderFunctions_,
          r.postRenderFunctions,
        ),
        n &&
          (!this.previousExtent_ ||
            (!Ns(this.previousExtent_) &&
              !Sn(r.extent, this.previousExtent_))) &&
          (this.dispatchEvent(new bi(Te.MOVESTART, this, n)),
          (this.previousExtent_ = zn(this.previousExtent_))),
        this.previousExtent_ &&
          !r.viewHints[It.ANIMATING] &&
          !r.viewHints[It.INTERACTING] &&
          !Sn(r.extent, this.previousExtent_) &&
          (this.dispatchEvent(new bi(Te.MOVEEND, this, r)),
          ol(r.extent, this.previousExtent_))),
      this.dispatchEvent(new bi(Te.POSTRENDER, this, r)),
      (this.renderComplete_ =
        this.hasListener(Te.LOADSTART) ||
        this.hasListener(Te.LOADEND) ||
        this.hasListener(Ht.RENDERCOMPLETE)
          ? !this.tileQueue_.getTilesLoading() &&
            !this.tileQueue_.getCount() &&
            !this.getLoadingOrNotReady()
          : void 0),
      this.postRenderTimeoutHandle_ ||
        (this.postRenderTimeoutHandle_ = setTimeout(() => {
          ;(this.postRenderTimeoutHandle_ = void 0), this.handlePostRender()
        }, 0))
  }
  setLayerGroup(t) {
    const e = this.getLayerGroup()
    e && this.handleLayerRemove_(new Be("removelayer", e)),
      this.set(Tt.LAYERGROUP, t)
  }
  setSize(t) {
    this.set(Tt.SIZE, t)
  }
  setTarget(t) {
    this.set(Tt.TARGET, t)
  }
  setView(t) {
    if (!t || t instanceof he) {
      this.set(Tt.VIEW, t)
      return
    }
    this.set(Tt.VIEW, new he())
    const e = this
    t.then(function (i) {
      e.setView(new he(i))
    })
  }
  updateSize() {
    const t = this.getTargetElement()
    let e
    if (t) {
      const n = getComputedStyle(t),
        r =
          t.offsetWidth -
          parseFloat(n.borderLeftWidth) -
          parseFloat(n.paddingLeft) -
          parseFloat(n.paddingRight) -
          parseFloat(n.borderRightWidth),
        o =
          t.offsetHeight -
          parseFloat(n.borderTopWidth) -
          parseFloat(n.paddingTop) -
          parseFloat(n.paddingBottom) -
          parseFloat(n.borderBottomWidth)
      !isNaN(r) &&
        !isNaN(o) &&
        ((e = [r, o]),
        !ma(e) &&
          (t.offsetWidth || t.offsetHeight || t.getClientRects().length) &&
          gl(
            "No map visible because the map container's width or height are 0.",
          ))
    }
    const i = this.getSize()
    e && (!i || !si(e, i)) && (this.setSize(e), this.updateViewportSize_(e))
  }
  updateViewportSize_(t) {
    const e = this.getView()
    e && e.setViewportSize(t)
  }
}
function hg(s) {
  let t = null
  s.keyboardEventTarget !== void 0 &&
    (t =
      typeof s.keyboardEventTarget == "string"
        ? document.getElementById(s.keyboardEventTarget)
        : s.keyboardEventTarget)
  const e = {},
    i =
      s.layers && typeof s.layers.getLayers == "function"
        ? s.layers
        : new Qi({ layers: s.layers })
  ;(e[Tt.LAYERGROUP] = i),
    (e[Tt.TARGET] = s.target),
    (e[Tt.VIEW] = s.view instanceof he ? s.view : new he())
  let n
  s.controls !== void 0 &&
    (Array.isArray(s.controls)
      ? (n = new ue(s.controls.slice()))
      : (J(
          typeof s.controls.getArray == "function",
          "Expected `controls` to be an array or an `ol/Collection.js`",
        ),
        (n = s.controls)))
  let r
  s.interactions !== void 0 &&
    (Array.isArray(s.interactions)
      ? (r = new ue(s.interactions.slice()))
      : (J(
          typeof s.interactions.getArray == "function",
          "Expected `interactions` to be an array or an `ol/Collection.js`",
        ),
        (r = s.interactions)))
  let o
  return (
    s.overlays !== void 0
      ? Array.isArray(s.overlays)
        ? (o = new ue(s.overlays.slice()))
        : (J(
            typeof s.overlays.getArray == "function",
            "Expected `overlays` to be an array or an `ol/Collection.js`",
          ),
          (o = s.overlays))
      : (o = new ue()),
    {
      controls: n,
      interactions: r,
      keyboardEventTarget: t,
      overlays: o,
      values: e,
    }
  )
}
const cg = lg
class ug {
  constructor(t) {
    ;(this.highWaterMark = t !== void 0 ? t : 2048),
      (this.count_ = 0),
      (this.entries_ = {}),
      (this.oldest_ = null),
      (this.newest_ = null)
  }
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark
  }
  expireCache(t) {
    for (; this.canExpireCache(); ) this.pop()
  }
  clear() {
    ;(this.count_ = 0),
      (this.entries_ = {}),
      (this.oldest_ = null),
      (this.newest_ = null)
  }
  containsKey(t) {
    return this.entries_.hasOwnProperty(t)
  }
  forEach(t) {
    let e = this.oldest_
    for (; e; ) t(e.value_, e.key_, this), (e = e.newer)
  }
  get(t, e) {
    const i = this.entries_[t]
    return (
      J(
        i !== void 0,
        "Tried to get a value for a key that does not exist in the cache",
      ),
      i === this.newest_ ||
        (i === this.oldest_
          ? ((this.oldest_ = this.oldest_.newer), (this.oldest_.older = null))
          : ((i.newer.older = i.older), (i.older.newer = i.newer)),
        (i.newer = null),
        (i.older = this.newest_),
        (this.newest_.newer = i),
        (this.newest_ = i)),
      i.value_
    )
  }
  remove(t) {
    const e = this.entries_[t]
    return (
      J(
        e !== void 0,
        "Tried to get a value for a key that does not exist in the cache",
      ),
      e === this.newest_
        ? ((this.newest_ = e.older),
          this.newest_ && (this.newest_.newer = null))
        : e === this.oldest_
          ? ((this.oldest_ = e.newer),
            this.oldest_ && (this.oldest_.older = null))
          : ((e.newer.older = e.older), (e.older.newer = e.newer)),
      delete this.entries_[t],
      --this.count_,
      e.value_
    )
  }
  getCount() {
    return this.count_
  }
  getKeys() {
    const t = new Array(this.count_)
    let e = 0,
      i
    for (i = this.newest_; i; i = i.older) t[e++] = i.key_
    return t
  }
  getValues() {
    const t = new Array(this.count_)
    let e = 0,
      i
    for (i = this.newest_; i; i = i.older) t[e++] = i.value_
    return t
  }
  peekLast() {
    return this.oldest_.value_
  }
  peekLastKey() {
    return this.oldest_.key_
  }
  peekFirstKey() {
    return this.newest_.key_
  }
  peek(t) {
    var e
    return (e = this.entries_[t]) == null ? void 0 : e.value_
  }
  pop() {
    const t = this.oldest_
    return (
      delete this.entries_[t.key_],
      t.newer && (t.newer.older = null),
      (this.oldest_ = t.newer),
      this.oldest_ || (this.newest_ = null),
      --this.count_,
      t.value_
    )
  }
  replace(t, e) {
    this.get(t), (this.entries_[t].value_ = e)
  }
  set(t, e) {
    J(
      !(t in this.entries_),
      "Tried to set a value for a key that is used already",
    )
    const i = { key_: t, newer: null, older: this.newest_, value_: e }
    this.newest_ ? (this.newest_.newer = i) : (this.oldest_ = i),
      (this.newest_ = i),
      (this.entries_[t] = i),
      ++this.count_
  }
  setSize(t) {
    this.highWaterMark = t
  }
}
function Za(s, t, e, i) {
  return i !== void 0 ? ((i[0] = s), (i[1] = t), (i[2] = e), i) : [s, t, e]
}
function Qs(s, t, e) {
  return s + "/" + t + "/" + e
}
function mh(s) {
  return Qs(s[0], s[1], s[2])
}
function dg(s) {
  return s.split("/").map(Number)
}
function fg(s) {
  return (s[1] << s[0]) + s[2]
}
function gg(s, t) {
  const e = s[0],
    i = s[1],
    n = s[2]
  if (t.getMinZoom() > e || e > t.getMaxZoom()) return !1
  const r = t.getFullTileRange(e)
  return r ? r.containsXY(i, n) : !0
}
class ph extends ug {
  clear() {
    for (; this.getCount() > 0; ) this.pop().release()
    super.clear()
  }
  expireCache(t) {
    for (; this.canExpireCache() && !(this.peekLast().getKey() in t); )
      this.pop().release()
  }
  pruneExceptNewestZ() {
    if (this.getCount() === 0) return
    const t = this.peekFirstKey(),
      i = dg(t)[0]
    this.forEach(n => {
      n.tileCoord[0] !== i && (this.remove(mh(n.tileCoord)), n.release())
    })
  }
}
class ko {
  constructor(t, e, i, n) {
    ;(this.minX = t), (this.maxX = e), (this.minY = i), (this.maxY = n)
  }
  contains(t) {
    return this.containsXY(t[1], t[2])
  }
  containsTileRange(t) {
    return (
      this.minX <= t.minX &&
      t.maxX <= this.maxX &&
      this.minY <= t.minY &&
      t.maxY <= this.maxY
    )
  }
  containsXY(t, e) {
    return this.minX <= t && t <= this.maxX && this.minY <= e && e <= this.maxY
  }
  equals(t) {
    return (
      this.minX == t.minX &&
      this.minY == t.minY &&
      this.maxX == t.maxX &&
      this.maxY == t.maxY
    )
  }
  extend(t) {
    t.minX < this.minX && (this.minX = t.minX),
      t.maxX > this.maxX && (this.maxX = t.maxX),
      t.minY < this.minY && (this.minY = t.minY),
      t.maxY > this.maxY && (this.maxY = t.maxY)
  }
  getHeight() {
    return this.maxY - this.minY + 1
  }
  getSize() {
    return [this.getWidth(), this.getHeight()]
  }
  getWidth() {
    return this.maxX - this.minX + 1
  }
  intersects(t) {
    return (
      this.minX <= t.maxX &&
      this.maxX >= t.minX &&
      this.minY <= t.maxY &&
      this.maxY >= t.minY
    )
  }
}
function Ai(s, t, e, i, n) {
  return n !== void 0
    ? ((n.minX = s), (n.maxX = t), (n.minY = e), (n.maxY = i), n)
    : new ko(s, t, e, i)
}
const ls = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError",
}
class _g extends Vs {
  constructor(t) {
    t = t || {}
    const e = Object.assign({}, t)
    delete e.preload,
      delete e.useInterimTilesOnError,
      super(e),
      this.on,
      this.once,
      this.un,
      this.setPreload(t.preload !== void 0 ? t.preload : 0),
      this.setUseInterimTilesOnError(
        t.useInterimTilesOnError !== void 0 ? t.useInterimTilesOnError : !0,
      )
  }
  getPreload() {
    return this.get(ls.PRELOAD)
  }
  setPreload(t) {
    this.set(ls.PRELOAD, t)
  }
  getUseInterimTilesOnError() {
    return this.get(ls.USE_INTERIM_TILES_ON_ERROR)
  }
  setUseInterimTilesOnError(t) {
    this.set(ls.USE_INTERIM_TILES_ON_ERROR, t)
  }
  getData(t) {
    return super.getData(t)
  }
}
const mg = 0.5,
  pg = 10,
  Ba = 0.25
class yg {
  constructor(t, e, i, n, r, o) {
    ;(this.sourceProj_ = t), (this.targetProj_ = e)
    let a = {}
    const l = In(this.targetProj_, this.sourceProj_)
    ;(this.transformInv_ = function (y) {
      const x = y[0] + "/" + y[1]
      return a[x] || (a[x] = l(y)), a[x]
    }),
      (this.maxSourceExtent_ = n),
      (this.errorThresholdSquared_ = r * r),
      (this.triangles_ = []),
      (this.wrapsXInSource_ = !1),
      (this.canWrapXInSource_ =
        this.sourceProj_.canWrapX() &&
        !!n &&
        !!this.sourceProj_.getExtent() &&
        rt(n) >= rt(this.sourceProj_.getExtent())),
      (this.sourceWorldWidth_ = this.sourceProj_.getExtent()
        ? rt(this.sourceProj_.getExtent())
        : null),
      (this.targetWorldWidth_ = this.targetProj_.getExtent()
        ? rt(this.targetProj_.getExtent())
        : null)
    const h = Ci(i),
      c = Ds(i),
      u = bs(i),
      d = Os(i),
      f = this.transformInv_(h),
      g = this.transformInv_(c),
      _ = this.transformInv_(u),
      m = this.transformInv_(d),
      p =
        pg +
        (o ? Math.max(0, Math.ceil(Math.log2(Or(i) / (o * o * 256 * 256)))) : 0)
    if ((this.addQuad_(h, c, u, d, f, g, _, m, p), this.wrapsXInSource_)) {
      let y = 1 / 0
      this.triangles_.forEach(function (x, E, C) {
        y = Math.min(y, x.source[0][0], x.source[1][0], x.source[2][0])
      }),
        this.triangles_.forEach(x => {
          if (
            Math.max(x.source[0][0], x.source[1][0], x.source[2][0]) - y >
            this.sourceWorldWidth_ / 2
          ) {
            const E = [
              [x.source[0][0], x.source[0][1]],
              [x.source[1][0], x.source[1][1]],
              [x.source[2][0], x.source[2][1]],
            ]
            E[0][0] - y > this.sourceWorldWidth_ / 2 &&
              (E[0][0] -= this.sourceWorldWidth_),
              E[1][0] - y > this.sourceWorldWidth_ / 2 &&
                (E[1][0] -= this.sourceWorldWidth_),
              E[2][0] - y > this.sourceWorldWidth_ / 2 &&
                (E[2][0] -= this.sourceWorldWidth_)
            const C = Math.min(E[0][0], E[1][0], E[2][0])
            Math.max(E[0][0], E[1][0], E[2][0]) - C <
              this.sourceWorldWidth_ / 2 && (x.source = E)
          }
        })
    }
    a = {}
  }
  addTriangle_(t, e, i, n, r, o) {
    this.triangles_.push({ source: [n, r, o], target: [t, e, i] })
  }
  addQuad_(t, e, i, n, r, o, a, l, h) {
    const c = ta([r, o, a, l]),
      u = this.sourceWorldWidth_ ? rt(c) / this.sourceWorldWidth_ : null,
      d = this.sourceWorldWidth_,
      f = this.sourceProj_.canWrapX() && u > 0.5 && u < 1
    let g = !1
    if (h > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const m = ta([t, e, i, n])
        g = rt(m) / this.targetWorldWidth_ > Ba || g
      }
      !f && this.sourceProj_.isGlobal() && u && (g = u > Ba || g)
    }
    if (
      !g &&
      this.maxSourceExtent_ &&
      isFinite(c[0]) &&
      isFinite(c[1]) &&
      isFinite(c[2]) &&
      isFinite(c[3]) &&
      !Nt(c, this.maxSourceExtent_)
    )
      return
    let _ = 0
    if (
      !g &&
      (!isFinite(r[0]) ||
        !isFinite(r[1]) ||
        !isFinite(o[0]) ||
        !isFinite(o[1]) ||
        !isFinite(a[0]) ||
        !isFinite(a[1]) ||
        !isFinite(l[0]) ||
        !isFinite(l[1]))
    ) {
      if (h > 0) g = !0
      else if (
        ((_ =
          (!isFinite(r[0]) || !isFinite(r[1]) ? 8 : 0) +
          (!isFinite(o[0]) || !isFinite(o[1]) ? 4 : 0) +
          (!isFinite(a[0]) || !isFinite(a[1]) ? 2 : 0) +
          (!isFinite(l[0]) || !isFinite(l[1]) ? 1 : 0)),
        _ != 1 && _ != 2 && _ != 4 && _ != 8)
      )
        return
    }
    if (h > 0) {
      if (!g) {
        const m = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2],
          p = this.transformInv_(m)
        let y
        f
          ? (y = (yi(r[0], d) + yi(a[0], d)) / 2 - yi(p[0], d))
          : (y = (r[0] + a[0]) / 2 - p[0])
        const x = (r[1] + a[1]) / 2 - p[1]
        g = y * y + x * x > this.errorThresholdSquared_
      }
      if (g) {
        if (Math.abs(t[0] - i[0]) <= Math.abs(t[1] - i[1])) {
          const m = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2],
            p = this.transformInv_(m),
            y = [(n[0] + t[0]) / 2, (n[1] + t[1]) / 2],
            x = this.transformInv_(y)
          this.addQuad_(t, e, m, y, r, o, p, x, h - 1),
            this.addQuad_(y, m, i, n, x, p, a, l, h - 1)
        } else {
          const m = [(t[0] + e[0]) / 2, (t[1] + e[1]) / 2],
            p = this.transformInv_(m),
            y = [(i[0] + n[0]) / 2, (i[1] + n[1]) / 2],
            x = this.transformInv_(y)
          this.addQuad_(t, m, y, n, r, p, x, l, h - 1),
            this.addQuad_(m, e, i, y, p, o, a, x, h - 1)
        }
        return
      }
    }
    if (f) {
      if (!this.canWrapXInSource_) return
      this.wrapsXInSource_ = !0
    }
    _ & 11 || this.addTriangle_(t, i, n, r, a, l),
      _ & 14 || this.addTriangle_(t, i, e, r, a, o),
      _ &&
        (_ & 13 || this.addTriangle_(e, n, t, o, l, r),
        _ & 7 || this.addTriangle_(e, n, i, o, l, a))
  }
  calculateSourceExtent() {
    const t = $t()
    return (
      this.triangles_.forEach(function (e, i, n) {
        const r = e.source
        mn(t, r[0]), mn(t, r[1]), mn(t, r[2])
      }),
      t
    )
  }
  getTriangles() {
    return this.triangles_
  }
}
let Tr
const Gi = []
function Ka(s, t, e, i, n) {
  s.beginPath(),
    s.moveTo(0, 0),
    s.lineTo(t, e),
    s.lineTo(i, n),
    s.closePath(),
    s.save(),
    s.clip(),
    s.fillRect(0, 0, Math.max(t, i) + 1, Math.max(e, n)),
    s.restore()
}
function Ir(s, t) {
  return Math.abs(s[t * 4] - 210) > 2 || Math.abs(s[t * 4 + 3] - 0.75 * 255) > 2
}
function Eg() {
  if (Tr === void 0) {
    const s = Rt(6, 6, Gi)
    ;(s.globalCompositeOperation = "lighter"),
      (s.fillStyle = "rgba(210, 0, 0, 0.75)"),
      Ka(s, 4, 5, 4, 0),
      Ka(s, 4, 5, 0, 5)
    const t = s.getImageData(0, 0, 3, 3).data
    ;(Tr = Ir(t, 0) || Ir(t, 4) || Ir(t, 8)), Us(s), Gi.push(s.canvas)
  }
  return Tr
}
function Va(s, t, e, i) {
  const n = ml(e, t, s)
  let r = ra(t, i, e)
  const o = t.getMetersPerUnit()
  o !== void 0 && (r *= o)
  const a = s.getMetersPerUnit()
  a !== void 0 && (r /= a)
  const l = s.getExtent()
  if (!l || Zi(l, n)) {
    const h = ra(s, r, n) / r
    isFinite(h) && h > 0 && (r /= h)
  }
  return r
}
function xg(s, t, e, i) {
  const n = ti(e)
  let r = Va(s, t, n, i)
  return (
    (!isFinite(r) || r <= 0) &&
      cl(e, function (o) {
        return (r = Va(s, t, o, i)), isFinite(r) && r > 0
      }),
    r
  )
}
function Cg(s, t, e, i, n, r, o, a, l, h, c, u, d, f) {
  const g = Rt(Math.round(e * s), Math.round(e * t), Gi)
  if ((u || (g.imageSmoothingEnabled = !1), l.length === 0)) return g.canvas
  g.scale(e, e)
  function _(C) {
    return Math.round(C * e) / e
  }
  g.globalCompositeOperation = "lighter"
  const m = $t()
  l.forEach(function (C, T, S) {
    ll(m, C.extent)
  })
  let p
  const y = e / i,
    x = (u ? 1 : 1 + Math.pow(2, -24)) / y
  if (!d || l.length !== 1 || h !== 0) {
    if (
      ((p = Rt(Math.round(rt(m) * y), Math.round(vt(m) * y), Gi)),
      u || (p.imageSmoothingEnabled = !1),
      n && f)
    ) {
      const C = (n[0] - m[0]) * y,
        T = -(n[3] - m[3]) * y,
        S = rt(n) * y,
        R = vt(n) * y
      p.rect(C, T, S, R), p.clip()
    }
    l.forEach(function (C, T, S) {
      const R = (C.extent[0] - m[0]) * y,
        v = -(C.extent[3] - m[3]) * y,
        k = rt(C.extent) * y,
        N = vt(C.extent) * y
      C.image.width > 0 &&
        C.image.height > 0 &&
        p.drawImage(
          C.image,
          h,
          h,
          C.image.width - 2 * h,
          C.image.height - 2 * h,
          u ? R : Math.round(R),
          u ? v : Math.round(v),
          u ? k : Math.round(R + k) - Math.round(R),
          u ? N : Math.round(v + N) - Math.round(v),
        )
    })
  }
  const E = Ci(o)
  return (
    a.getTriangles().forEach(function (C, T, S) {
      const R = C.source,
        v = C.target
      let k = R[0][0],
        N = R[0][1],
        z = R[1][0],
        K = R[1][1],
        V = R[2][0],
        j = R[2][1]
      const M = _((v[0][0] - E[0]) / r),
        G = _(-(v[0][1] - E[1]) / r),
        Z = _((v[1][0] - E[0]) / r),
        at = _(-(v[1][1] - E[1]) / r),
        q = _((v[2][0] - E[0]) / r),
        nt = _(-(v[2][1] - E[1]) / r),
        Q = k,
        gt = N
      ;(k = 0), (N = 0), (z -= Q), (K -= gt), (V -= Q), (j -= gt)
      const I = [
          [z, K, 0, 0, Z - M],
          [V, j, 0, 0, q - M],
          [0, 0, z, K, at - G],
          [0, 0, V, j, nt - G],
        ],
        ht = Cc(I)
      if (!ht) return
      if ((g.save(), g.beginPath(), Eg() || !u)) {
        g.moveTo(Z, at)
        const pt = 4,
          Ft = M - Z,
          Jt = G - at
        for (let Ot = 0; Ot < pt; Ot++)
          g.lineTo(Z + _(((Ot + 1) * Ft) / pt), at + _((Ot * Jt) / (pt - 1))),
            Ot != pt - 1 &&
              g.lineTo(
                Z + _(((Ot + 1) * Ft) / pt),
                at + _(((Ot + 1) * Jt) / (pt - 1)),
              )
        g.lineTo(q, nt)
      } else g.moveTo(Z, at), g.lineTo(M, G), g.lineTo(q, nt)
      g.clip(),
        g.transform(ht[0], ht[2], ht[1], ht[3], M, G),
        g.translate(m[0] - Q, m[3] - gt)
      let Gt
      if (p) (Gt = p.canvas), g.scale(x, -x)
      else {
        const pt = l[0],
          Ft = pt.extent
        ;(Gt = pt.image), g.scale(rt(Ft) / Gt.width, -vt(Ft) / Gt.height)
      }
      g.drawImage(Gt, 0, 0), g.restore()
    }),
    p && (Us(p), Gi.push(p.canvas)),
    c &&
      (g.save(),
      (g.globalCompositeOperation = "source-over"),
      (g.strokeStyle = "black"),
      (g.lineWidth = 1),
      a.getTriangles().forEach(function (C, T, S) {
        const R = C.target,
          v = (R[0][0] - E[0]) / r,
          k = -(R[0][1] - E[1]) / r,
          N = (R[1][0] - E[0]) / r,
          z = -(R[1][1] - E[1]) / r,
          K = (R[2][0] - E[0]) / r,
          V = -(R[2][1] - E[1]) / r
        g.beginPath(),
          g.moveTo(N, z),
          g.lineTo(v, k),
          g.lineTo(K, V),
          g.closePath(),
          g.stroke()
      }),
      g.restore()),
    g.canvas
  )
}
class qr extends lh {
  constructor(t, e, i, n, r, o, a, l, h, c, u, d) {
    super(r, b.IDLE, d),
      (this.renderEdges_ = u !== void 0 ? u : !1),
      (this.pixelRatio_ = a),
      (this.gutter_ = l),
      (this.canvas_ = null),
      (this.sourceTileGrid_ = e),
      (this.targetTileGrid_ = n),
      (this.wrappedTileCoord_ = o || r),
      (this.sourceTiles_ = []),
      (this.sourcesListenerKeys_ = null),
      (this.sourceZ_ = 0)
    const f = n.getTileCoordExtent(this.wrappedTileCoord_),
      g = this.targetTileGrid_.getExtent()
    let _ = this.sourceTileGrid_.getExtent()
    const m = g ? pn(f, g) : f
    if (Or(m) === 0) {
      this.state = b.EMPTY
      return
    }
    const p = t.getExtent()
    p && (_ ? (_ = pn(_, p)) : (_ = p))
    const y = n.getResolution(this.wrappedTileCoord_[0]),
      x = xg(t, i, m, y)
    if (!isFinite(x) || x <= 0) {
      this.state = b.EMPTY
      return
    }
    const E = c !== void 0 ? c : mg
    if (
      ((this.triangulation_ = new yg(t, i, m, _, x * E, y)),
      this.triangulation_.getTriangles().length === 0)
    ) {
      this.state = b.EMPTY
      return
    }
    this.sourceZ_ = e.getZForResolution(x)
    let C = this.triangulation_.calculateSourceExtent()
    if (
      (_ &&
        (t.canWrapX()
          ? ((C[1] = mt(C[1], _[1], _[3])), (C[3] = mt(C[3], _[1], _[3])))
          : (C = pn(C, _))),
      !Or(C))
    )
      this.state = b.EMPTY
    else {
      const T = e.getTileRangeForExtentAndZ(C, this.sourceZ_)
      for (let S = T.minX; S <= T.maxX; S++)
        for (let R = T.minY; R <= T.maxY; R++) {
          const v = h(this.sourceZ_, S, R, a)
          v && this.sourceTiles_.push(v)
        }
      this.sourceTiles_.length === 0 && (this.state = b.EMPTY)
    }
  }
  getImage() {
    return this.canvas_
  }
  reproject_() {
    const t = []
    if (
      (this.sourceTiles_.forEach(e => {
        e &&
          e.getState() == b.LOADED &&
          t.push({
            extent: this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),
            image: e.getImage(),
          })
      }),
      (this.sourceTiles_.length = 0),
      t.length === 0)
    )
      this.state = b.ERROR
    else {
      const e = this.wrappedTileCoord_[0],
        i = this.targetTileGrid_.getTileSize(e),
        n = typeof i == "number" ? i : i[0],
        r = typeof i == "number" ? i : i[1],
        o = this.targetTileGrid_.getResolution(e),
        a = this.sourceTileGrid_.getResolution(this.sourceZ_),
        l = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_)
      ;(this.canvas_ = Cg(
        n,
        r,
        this.pixelRatio_,
        a,
        this.sourceTileGrid_.getExtent(),
        o,
        l,
        this.triangulation_,
        t,
        this.gutter_,
        this.renderEdges_,
        this.interpolate,
      )),
        (this.state = b.LOADED)
    }
    this.changed()
  }
  load() {
    if (this.state == b.IDLE) {
      ;(this.state = b.LOADING), this.changed()
      let t = 0
      ;(this.sourcesListenerKeys_ = []),
        this.sourceTiles_.forEach(e => {
          const i = e.getState()
          if (i == b.IDLE || i == b.LOADING) {
            t++
            const n = H(
              e,
              U.CHANGE,
              function (r) {
                const o = e.getState()
                ;(o == b.LOADED || o == b.ERROR || o == b.EMPTY) &&
                  (lt(n),
                  t--,
                  t === 0 && (this.unlistenSources_(), this.reproject_()))
              },
              this,
            )
            this.sourcesListenerKeys_.push(n)
          }
        }),
        t === 0
          ? setTimeout(this.reproject_.bind(this), 0)
          : this.sourceTiles_.forEach(function (e, i, n) {
              e.getState() == b.IDLE && e.load()
            })
    }
  }
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(lt), (this.sourcesListenerKeys_ = null)
  }
  release() {
    this.canvas_ &&
      (Us(this.canvas_.getContext("2d")),
      Gi.push(this.canvas_),
      (this.canvas_ = null)),
      super.release()
  }
}
class wg extends th {
  constructor(t) {
    super(t),
      (this.extentChanged = !0),
      (this.renderedExtent_ = null),
      this.renderedPixelRatio,
      (this.renderedProjection = null),
      this.renderedRevision,
      (this.renderedTiles = []),
      (this.newTiles_ = !1),
      (this.tmpExtent = $t()),
      (this.tmpTileRange_ = new ko(0, 0, 0, 0))
  }
  isDrawableTile(t) {
    const e = this.getLayer(),
      i = t.getState(),
      n = e.getUseInterimTilesOnError()
    return i == b.LOADED || i == b.EMPTY || (i == b.ERROR && !n)
  }
  getTile(t, e, i, n) {
    const r = n.pixelRatio,
      o = n.viewState.projection,
      a = this.getLayer()
    let h = a.getSource().getTile(t, e, i, r, o)
    return (
      h.getState() == b.ERROR &&
        a.getUseInterimTilesOnError() &&
        a.getPreload() > 0 &&
        (this.newTiles_ = !0),
      this.isDrawableTile(h) || (h = h.getInterimTile()),
      h
    )
  }
  getData(t) {
    const e = this.frameState
    if (!e) return null
    const i = this.getLayer(),
      n = Et(e.pixelToCoordinateTransform, t.slice()),
      r = i.getExtent()
    if (r && !Zi(r, n)) return null
    const o = e.pixelRatio,
      a = e.viewState.projection,
      l = e.viewState,
      h = i.getRenderSource(),
      c = h.getTileGridForProjection(l.projection),
      u = h.getTilePixelRatio(e.pixelRatio)
    for (let d = c.getZForResolution(l.resolution); d >= c.getMinZoom(); --d) {
      const f = c.getTileCoordForCoordAndZ(n, d),
        g = h.getTile(d, f[1], f[2], o, a)
      if (
        !(g instanceof hh || g instanceof qr) ||
        (g instanceof qr && g.getState() === b.EMPTY)
      )
        return null
      if (g.getState() !== b.LOADED) continue
      const _ = c.getOrigin(d),
        m = Ut(c.getTileSize(d)),
        p = c.getResolution(d),
        y = Math.floor(u * ((n[0] - _[0]) / p - f[1] * m[0])),
        x = Math.floor(u * ((_[1] - n[1]) / p - f[2] * m[1])),
        E = Math.round(u * h.getGutterForProjection(l.projection))
      return this.getImageData(g.getImage(), y + E, x + E)
    }
    return null
  }
  loadedTileCallback(t, e, i) {
    return this.isDrawableTile(i) ? super.loadedTileCallback(t, e, i) : !1
  }
  prepareFrame(t) {
    return !!this.getLayer().getSource()
  }
  renderFrame(t, e) {
    const i = t.layerStatesArray[t.layerIndex],
      n = t.viewState,
      r = n.projection,
      o = n.resolution,
      a = n.center,
      l = n.rotation,
      h = t.pixelRatio,
      c = this.getLayer(),
      u = c.getSource(),
      d = u.getRevision(),
      f = u.getTileGridForProjection(r),
      g = f.getZForResolution(o, u.zDirection),
      _ = f.getResolution(g)
    let m = t.extent
    const p = t.viewState.resolution,
      y = u.getTilePixelRatio(h),
      x = Math.round((rt(m) / p) * h),
      E = Math.round((vt(m) / p) * h),
      C = i.extent && ui(i.extent)
    C && (m = pn(m, ui(i.extent)))
    const T = (_ * x) / 2 / y,
      S = (_ * E) / 2 / y,
      R = [a[0] - T, a[1] - S, a[0] + T, a[1] + S],
      v = f.getTileRangeForExtentAndZ(m, g),
      k = {}
    k[g] = {}
    const N = this.createLoadedTileFinder(u, r, k),
      z = this.tmpExtent,
      K = this.tmpTileRange_
    this.newTiles_ = !1
    const V = l ? Dr(n.center, p, l, t.size) : void 0
    for (let gt = v.minX; gt <= v.maxX; ++gt)
      for (let I = v.minY; I <= v.maxY; ++I) {
        if (l && !f.tileCoordIntersectsViewport([g, gt, I], V)) continue
        const ht = this.getTile(g, gt, I, t)
        if (this.isDrawableTile(ht)) {
          const Ft = it(this)
          if (ht.getState() == b.LOADED) {
            k[g][ht.tileCoord.toString()] = ht
            let Jt = ht.inTransition(Ft)
            Jt && i.opacity !== 1 && (ht.endTransition(Ft), (Jt = !1)),
              !this.newTiles_ &&
                (Jt || !this.renderedTiles.includes(ht)) &&
                (this.newTiles_ = !0)
          }
          if (ht.getAlpha(Ft, t.time) === 1) continue
        }
        const Gt = f.getTileCoordChildTileRange(ht.tileCoord, K, z)
        let pt = !1
        Gt && (pt = N(g + 1, Gt)),
          pt || f.forEachTileCoordParentTileRange(ht.tileCoord, N, K, z)
      }
    const j = ((_ / o) * h) / y
    _e(
      this.pixelTransform,
      t.size[0] / 2,
      t.size[1] / 2,
      1 / h,
      1 / h,
      l,
      -x / 2,
      -E / 2,
    )
    const M = rl(this.pixelTransform)
    this.useContainer(e, M, this.getBackground(t))
    const G = this.getRenderContext(t),
      Z = this.context.canvas
    so(this.inversePixelTransform, this.pixelTransform),
      _e(this.tempTransform, x / 2, E / 2, j, j, 0, -x / 2, -E / 2),
      Z.width != x || Z.height != E
        ? ((Z.width = x), (Z.height = E))
        : this.containerReused || G.clearRect(0, 0, x, E),
      C && this.clipUnrotated(G, t, C),
      u.getInterpolate() || (G.imageSmoothingEnabled = !1),
      this.preRender(G, t),
      (this.renderedTiles.length = 0)
    let at = Object.keys(k).map(Number)
    at.sort(ve)
    let q, nt, Q
    i.opacity === 1 &&
    (!this.containerReused || u.getOpaque(t.viewState.projection))
      ? (at = at.reverse())
      : ((q = []), (nt = []))
    for (let gt = at.length - 1; gt >= 0; --gt) {
      const I = at[gt],
        ht = u.getTilePixelSize(I, h, r),
        pt = f.getResolution(I) / _,
        Ft = ht[0] * pt * j,
        Jt = ht[1] * pt * j,
        Ot = f.getTileCoordForCoordAndZ(Ci(R), I),
        nn = f.getTileCoordExtent(Ot),
        ri = Et(this.tempTransform, [
          (y * (nn[0] - R[0])) / _,
          (y * (R[3] - nn[3])) / _,
        ]),
        sr = y * u.getGutterForProjection(r),
        Vn = k[I]
      for (const jn in Vn) {
        const Wt = Vn[jn],
          Ri = Wt.tileCoord,
          Hn = Ot[1] - Ri[1],
          rr = Math.round(ri[0] - (Hn - 1) * Ft),
          qn = Ot[2] - Ri[2],
          $n = Math.round(ri[1] - (qn - 1) * Jt),
          zt = Math.round(ri[0] - Hn * Ft),
          Qt = Math.round(ri[1] - qn * Jt),
          ae = rr - zt,
          te = $n - Qt,
          Si = g === I,
          Ti = Si && Wt.getAlpha(it(this), t.time) !== 1
        let Ge = !1
        if (!Ti)
          if (q) {
            Q = [zt, Qt, zt + ae, Qt, zt + ae, Qt + te, zt, Qt + te]
            for (let pe = 0, or = q.length; pe < or; ++pe)
              if (g !== I && I < nt[pe]) {
                const Mt = q[pe]
                Nt([zt, Qt, zt + ae, Qt + te], [Mt[0], Mt[3], Mt[4], Mt[7]]) &&
                  (Ge || (G.save(), (Ge = !0)),
                  G.beginPath(),
                  G.moveTo(Q[0], Q[1]),
                  G.lineTo(Q[2], Q[3]),
                  G.lineTo(Q[4], Q[5]),
                  G.lineTo(Q[6], Q[7]),
                  G.moveTo(Mt[6], Mt[7]),
                  G.lineTo(Mt[4], Mt[5]),
                  G.lineTo(Mt[2], Mt[3]),
                  G.lineTo(Mt[0], Mt[1]),
                  G.clip())
              }
            q.push(Q), nt.push(I)
          } else G.clearRect(zt, Qt, ae, te)
        this.drawTileImage(Wt, t, zt, Qt, ae, te, sr, Si),
          q && !Ti
            ? (Ge && G.restore(), this.renderedTiles.unshift(Wt))
            : this.renderedTiles.push(Wt),
          this.updateUsedTiles(t.usedTiles, u, Wt)
      }
    }
    return (
      (this.renderedRevision = d),
      (this.renderedResolution = _),
      (this.extentChanged =
        !this.renderedExtent_ || !Sn(this.renderedExtent_, R)),
      (this.renderedExtent_ = R),
      (this.renderedPixelRatio = h),
      (this.renderedProjection = r),
      this.manageTilePyramid(t, u, f, h, r, m, g, c.getPreload()),
      this.scheduleExpireCache(t, u),
      this.postRender(this.context, t),
      i.extent && G.restore(),
      (G.imageSmoothingEnabled = !0),
      M !== Z.style.transform && (Z.style.transform = M),
      this.container
    )
  }
  drawTileImage(t, e, i, n, r, o, a, l) {
    const h = this.getTileImage(t)
    if (!h) return
    const c = this.getRenderContext(e),
      u = it(this),
      d = e.layerStatesArray[e.layerIndex],
      f = d.opacity * (l ? t.getAlpha(u, e.time) : 1),
      g = f !== c.globalAlpha
    g && (c.save(), (c.globalAlpha = f)),
      c.drawImage(h, a, a, h.width - 2 * a, h.height - 2 * a, i, n, r, o),
      g && c.restore(),
      f !== d.opacity ? (e.animate = !0) : l && t.endTransition(u)
  }
  getImage() {
    const t = this.context
    return t ? t.canvas : null
  }
  getTileImage(t) {
    return t.getImage()
  }
  scheduleExpireCache(t, e) {
    if (e.canExpireCache()) {
      const i = function (n, r, o) {
        const a = it(n)
        a in o.usedTiles &&
          n.expireCache(o.viewState.projection, o.usedTiles[a])
      }.bind(null, e)
      t.postRenderFunctions.push(i)
    }
  }
  updateUsedTiles(t, e, i) {
    const n = it(e)
    n in t || (t[n] = {}), (t[n][i.getKey()] = !0)
  }
  manageTilePyramid(t, e, i, n, r, o, a, l, h) {
    const c = it(e)
    c in t.wantedTiles || (t.wantedTiles[c] = {})
    const u = t.wantedTiles[c],
      d = t.tileQueue,
      f = i.getMinZoom(),
      g = t.viewState.rotation,
      _ = g ? Dr(t.viewState.center, t.viewState.resolution, g, t.size) : void 0
    let m = 0,
      p,
      y,
      x,
      E,
      C,
      T
    for (T = f; T <= a; ++T)
      for (
        y = i.getTileRangeForExtentAndZ(o, T, y),
          x = i.getResolution(T),
          E = y.minX;
        E <= y.maxX;
        ++E
      )
        for (C = y.minY; C <= y.maxY; ++C)
          (g && !i.tileCoordIntersectsViewport([T, E, C], _)) ||
            (a - T <= l
              ? (++m,
                (p = e.getTile(T, E, C, n, r)),
                p.getState() == b.IDLE &&
                  ((u[p.getKey()] = !0),
                  d.isKeyQueued(p.getKey()) ||
                    d.enqueue([p, c, i.getTileCoordCenter(p.tileCoord), x])),
                h !== void 0 && h(p))
              : e.useTile(T, E, C, r))
    e.updateCacheSize(m, r)
  }
}
class Rg extends _g {
  constructor(t) {
    super(t)
  }
  createRenderer() {
    return new wg(this)
  }
}
const Sg = Rg,
  vr = {
    TILELOADSTART: "tileloadstart",
    TILELOADEND: "tileloadend",
    TILELOADERROR: "tileloaderror",
  },
  Mi = [0, 0, 0],
  We = 5
class Tg {
  constructor(t) {
    ;(this.minZoom = t.minZoom !== void 0 ? t.minZoom : 0),
      (this.resolutions_ = t.resolutions),
      J(
        Qh(this.resolutions_, (n, r) => r - n, !0),
        "`resolutions` must be sorted in descending order",
      )
    let e
    if (!t.origins) {
      for (let n = 0, r = this.resolutions_.length - 1; n < r; ++n)
        if (!e) e = this.resolutions_[n] / this.resolutions_[n + 1]
        else if (this.resolutions_[n] / this.resolutions_[n + 1] !== e) {
          e = void 0
          break
        }
    }
    ;(this.zoomFactor_ = e),
      (this.maxZoom = this.resolutions_.length - 1),
      (this.origin_ = t.origin !== void 0 ? t.origin : null),
      (this.origins_ = null),
      t.origins !== void 0 &&
        ((this.origins_ = t.origins),
        J(
          this.origins_.length == this.resolutions_.length,
          "Number of `origins` and `resolutions` must be equal",
        ))
    const i = t.extent
    i !== void 0 && !this.origin_ && !this.origins_ && (this.origin_ = Ci(i)),
      J(
        (!this.origin_ && this.origins_) || (this.origin_ && !this.origins_),
        "Either `origin` or `origins` must be configured, never both",
      ),
      (this.tileSizes_ = null),
      t.tileSizes !== void 0 &&
        ((this.tileSizes_ = t.tileSizes),
        J(
          this.tileSizes_.length == this.resolutions_.length,
          "Number of `tileSizes` and `resolutions` must be equal",
        )),
      (this.tileSize_ =
        t.tileSize !== void 0 ? t.tileSize : this.tileSizes_ ? null : vo),
      J(
        (!this.tileSize_ && this.tileSizes_) ||
          (this.tileSize_ && !this.tileSizes_),
        "Either `tileSize` or `tileSizes` must be configured, never both",
      ),
      (this.extent_ = i !== void 0 ? i : null),
      (this.fullTileRanges_ = null),
      (this.tmpSize_ = [0, 0]),
      (this.tmpExtent_ = [0, 0, 0, 0]),
      t.sizes !== void 0
        ? (this.fullTileRanges_ = t.sizes.map((n, r) => {
            const o = new ko(
              Math.min(0, n[0]),
              Math.max(n[0] - 1, -1),
              Math.min(0, n[1]),
              Math.max(n[1] - 1, -1),
            )
            if (i) {
              const a = this.getTileRangeForExtentAndZ(i, r)
              ;(o.minX = Math.max(a.minX, o.minX)),
                (o.maxX = Math.min(a.maxX, o.maxX)),
                (o.minY = Math.max(a.minY, o.minY)),
                (o.maxY = Math.min(a.maxY, o.maxY))
            }
            return o
          }))
        : i && this.calculateTileRanges_(i)
  }
  forEachTileCoord(t, e, i) {
    const n = this.getTileRangeForExtentAndZ(t, e)
    for (let r = n.minX, o = n.maxX; r <= o; ++r)
      for (let a = n.minY, l = n.maxY; a <= l; ++a) i([e, r, a])
  }
  forEachTileCoordParentTileRange(t, e, i, n) {
    let r,
      o,
      a,
      l = null,
      h = t[0] - 1
    for (
      this.zoomFactor_ === 2
        ? ((o = t[1]), (a = t[2]))
        : (l = this.getTileCoordExtent(t, n));
      h >= this.minZoom;

    ) {
      if (
        (o !== void 0 && a !== void 0
          ? ((o = Math.floor(o / 2)),
            (a = Math.floor(a / 2)),
            (r = Ai(o, o, a, a, i)))
          : (r = this.getTileRangeForExtentAndZ(l, h, i)),
        e(h, r))
      )
        return !0
      --h
    }
    return !1
  }
  getExtent() {
    return this.extent_
  }
  getMaxZoom() {
    return this.maxZoom
  }
  getMinZoom() {
    return this.minZoom
  }
  getOrigin(t) {
    return this.origin_ ? this.origin_ : this.origins_[t]
  }
  getResolution(t) {
    return this.resolutions_[t]
  }
  getResolutions() {
    return this.resolutions_
  }
  getTileCoordChildTileRange(t, e, i) {
    if (t[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const r = t[1] * 2,
          o = t[2] * 2
        return Ai(r, r + 1, o, o + 1, e)
      }
      const n = this.getTileCoordExtent(t, i || this.tmpExtent_)
      return this.getTileRangeForExtentAndZ(n, t[0] + 1, e)
    }
    return null
  }
  getTileRangeForTileCoordAndZ(t, e, i) {
    if (e > this.maxZoom || e < this.minZoom) return null
    const n = t[0],
      r = t[1],
      o = t[2]
    if (e === n) return Ai(r, o, r, o, i)
    if (this.zoomFactor_) {
      const l = Math.pow(this.zoomFactor_, e - n),
        h = Math.floor(r * l),
        c = Math.floor(o * l)
      if (e < n) return Ai(h, h, c, c, i)
      const u = Math.floor(l * (r + 1)) - 1,
        d = Math.floor(l * (o + 1)) - 1
      return Ai(h, u, c, d, i)
    }
    const a = this.getTileCoordExtent(t, this.tmpExtent_)
    return this.getTileRangeForExtentAndZ(a, e, i)
  }
  getTileRangeForExtentAndZ(t, e, i) {
    this.getTileCoordForXYAndZ_(t[0], t[3], e, !1, Mi)
    const n = Mi[1],
      r = Mi[2]
    this.getTileCoordForXYAndZ_(t[2], t[1], e, !0, Mi)
    const o = Mi[1],
      a = Mi[2]
    return Ai(n, o, r, a, i)
  }
  getTileCoordCenter(t) {
    const e = this.getOrigin(t[0]),
      i = this.getResolution(t[0]),
      n = Ut(this.getTileSize(t[0]), this.tmpSize_)
    return [e[0] + (t[1] + 0.5) * n[0] * i, e[1] - (t[2] + 0.5) * n[1] * i]
  }
  getTileCoordExtent(t, e) {
    const i = this.getOrigin(t[0]),
      n = this.getResolution(t[0]),
      r = Ut(this.getTileSize(t[0]), this.tmpSize_),
      o = i[0] + t[1] * r[0] * n,
      a = i[1] - (t[2] + 1) * r[1] * n,
      l = o + r[0] * n,
      h = a + r[1] * n
    return Qe(o, a, l, h, e)
  }
  getTileCoordForCoordAndResolution(t, e, i) {
    return this.getTileCoordForXYAndResolution_(t[0], t[1], e, !1, i)
  }
  getTileCoordForXYAndResolution_(t, e, i, n, r) {
    const o = this.getZForResolution(i),
      a = i / this.getResolution(o),
      l = this.getOrigin(o),
      h = Ut(this.getTileSize(o), this.tmpSize_)
    let c = (a * (t - l[0])) / i / h[0],
      u = (a * (l[1] - e)) / i / h[1]
    return (
      n
        ? ((c = es(c, We) - 1), (u = es(u, We) - 1))
        : ((c = ts(c, We)), (u = ts(u, We))),
      Za(o, c, u, r)
    )
  }
  getTileCoordForXYAndZ_(t, e, i, n, r) {
    const o = this.getOrigin(i),
      a = this.getResolution(i),
      l = Ut(this.getTileSize(i), this.tmpSize_)
    let h = (t - o[0]) / a / l[0],
      c = (o[1] - e) / a / l[1]
    return (
      n
        ? ((h = es(h, We) - 1), (c = es(c, We) - 1))
        : ((h = ts(h, We)), (c = ts(c, We))),
      Za(i, h, c, r)
    )
  }
  getTileCoordForCoordAndZ(t, e, i) {
    return this.getTileCoordForXYAndZ_(t[0], t[1], e, !1, i)
  }
  getTileCoordResolution(t) {
    return this.resolutions_[t[0]]
  }
  getTileSize(t) {
    return this.tileSize_ ? this.tileSize_ : this.tileSizes_[t]
  }
  getFullTileRange(t) {
    return this.fullTileRanges_
      ? this.fullTileRanges_[t]
      : this.extent_
        ? this.getTileRangeForExtentAndZ(this.extent_, t)
        : null
  }
  getZForResolution(t, e) {
    const i = no(this.resolutions_, t, e || 0)
    return mt(i, this.minZoom, this.maxZoom)
  }
  tileCoordIntersectsViewport(t, e) {
    return Sl(e, 0, e.length, 2, this.getTileCoordExtent(t))
  }
  calculateTileRanges_(t) {
    const e = this.resolutions_.length,
      i = new Array(e)
    for (let n = this.minZoom; n < e; ++n)
      i[n] = this.getTileRangeForExtentAndZ(t, n)
    this.fullTileRanges_ = i
  }
}
const yh = Tg
function Eh(s) {
  let t = s.getDefaultTileGrid()
  return t || ((t = Ag(s)), s.setDefaultTileGrid(t)), t
}
function Ig(s, t, e) {
  const i = t[0],
    n = s.getTileCoordCenter(t),
    r = Go(e)
  if (!Zi(r, n)) {
    const o = rt(r),
      a = Math.ceil((r[0] - n[0]) / o)
    return (n[0] += o * a), s.getTileCoordForCoordAndZ(n, i)
  }
  return t
}
function vg(s, t, e, i) {
  i = i !== void 0 ? i : "top-left"
  const n = xh(s, t, e)
  return new yh({ extent: s, origin: ac(s, i), resolutions: n, tileSize: e })
}
function Lg(s) {
  const t = s || {},
    e = t.extent || wt("EPSG:3857").getExtent(),
    i = {
      extent: e,
      minZoom: t.minZoom,
      tileSize: t.tileSize,
      resolutions: xh(e, t.maxZoom, t.tileSize, t.maxResolution),
    }
  return new yh(i)
}
function xh(s, t, e, i) {
  ;(t = t !== void 0 ? t : vu), (e = Ut(e !== void 0 ? e : vo))
  const n = vt(s),
    r = rt(s)
  i = i > 0 ? i : Math.max(r / e[0], n / e[1])
  const o = t + 1,
    a = new Array(o)
  for (let l = 0; l < o; ++l) a[l] = i / Math.pow(2, l)
  return a
}
function Ag(s, t, e, i) {
  const n = Go(s)
  return vg(n, t, e, i)
}
function Go(s) {
  s = wt(s)
  let t = s.getExtent()
  if (!t) {
    const e = (180 * Tn.degrees) / s.getMetersPerUnit()
    t = Qe(-e, -e, e, e)
  }
  return t
}
class Mg extends ah {
  constructor(t) {
    super({
      attributions: t.attributions,
      attributionsCollapsible: t.attributionsCollapsible,
      projection: t.projection,
      state: t.state,
      wrapX: t.wrapX,
      interpolate: t.interpolate,
    }),
      this.on,
      this.once,
      this.un,
      (this.opaque_ = t.opaque !== void 0 ? t.opaque : !1),
      (this.tilePixelRatio_ =
        t.tilePixelRatio !== void 0 ? t.tilePixelRatio : 1),
      (this.tileGrid = t.tileGrid !== void 0 ? t.tileGrid : null)
    const e = [256, 256]
    this.tileGrid &&
      Ut(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), e),
      (this.tileCache = new ph(t.cacheSize || 0)),
      (this.tmpSize = [0, 0]),
      (this.key_ = t.key || ""),
      (this.tileOptions = {
        transition: t.transition,
        interpolate: t.interpolate,
      }),
      (this.zDirection = t.zDirection ? t.zDirection : 0)
  }
  canExpireCache() {
    return this.tileCache.canExpireCache()
  }
  expireCache(t, e) {
    const i = this.getTileCacheForProjection(t)
    i && i.expireCache(e)
  }
  forEachLoadedTile(t, e, i, n) {
    const r = this.getTileCacheForProjection(t)
    if (!r) return !1
    let o = !0,
      a,
      l,
      h
    for (let c = i.minX; c <= i.maxX; ++c)
      for (let u = i.minY; u <= i.maxY; ++u)
        (l = Qs(e, c, u)),
          (h = !1),
          r.containsKey(l) &&
            ((a = r.get(l)),
            (h = a.getState() === b.LOADED),
            h && (h = n(a) !== !1)),
          h || (o = !1)
    return o
  }
  getGutterForProjection(t) {
    return 0
  }
  getKey() {
    return this.key_
  }
  setKey(t) {
    this.key_ !== t && ((this.key_ = t), this.changed())
  }
  getOpaque(t) {
    return this.opaque_
  }
  getResolutions(t) {
    const e = t ? this.getTileGridForProjection(t) : this.tileGrid
    return e ? e.getResolutions() : null
  }
  getTile(t, e, i, n, r) {
    return W()
  }
  getTileGrid() {
    return this.tileGrid
  }
  getTileGridForProjection(t) {
    return this.tileGrid ? this.tileGrid : Eh(t)
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection()
    return (
      J(
        e === null || ci(e, t),
        "A VectorTile source can only be rendered if it has a projection compatible with the view projection.",
      ),
      this.tileCache
    )
  }
  getTilePixelRatio(t) {
    return this.tilePixelRatio_
  }
  getTilePixelSize(t, e, i) {
    const n = this.getTileGridForProjection(i),
      r = this.getTilePixelRatio(e),
      o = Ut(n.getTileSize(t), this.tmpSize)
    return r == 1 ? o : mu(o, r, this.tmpSize)
  }
  getTileCoordForTileUrlFunction(t, e) {
    e = e !== void 0 ? e : this.getProjection()
    const i = this.getTileGridForProjection(e)
    return (
      this.getWrapX() && e.isGlobal() && (t = Ig(i, t, e)), gg(t, i) ? t : null
    )
  }
  clear() {
    this.tileCache.clear()
  }
  refresh() {
    this.clear(), super.refresh()
  }
  updateCacheSize(t, e) {
    const i = this.getTileCacheForProjection(e)
    t > i.highWaterMark && (i.highWaterMark = t)
  }
  useTile(t, e, i, n) {}
}
class Pg extends Fe {
  constructor(t, e) {
    super(t), (this.tile = e)
  }
}
function Fg(s, t) {
  const e = /\{z\}/g,
    i = /\{x\}/g,
    n = /\{y\}/g,
    r = /\{-y\}/g
  return function (o, a, l) {
    if (o)
      return s
        .replace(e, o[0].toString())
        .replace(i, o[1].toString())
        .replace(n, o[2].toString())
        .replace(r, function () {
          const h = o[0],
            c = t.getFullTileRange(h)
          if (!c)
            throw new Error(
              "The {-y} placeholder requires a tile grid with extent",
            )
          return (c.getHeight() - o[2] - 1).toString()
        })
  }
}
function Og(s, t) {
  const e = s.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) i[n] = Fg(s[n], t)
  return bg(i)
}
function bg(s) {
  return s.length === 1
    ? s[0]
    : function (t, e, i) {
        if (!t) return
        const n = fg(t),
          r = yi(n, s.length)
        return s[r](t, e, i)
      }
}
function Dg(s) {
  const t = []
  let e = /\{([a-z])-([a-z])\}/.exec(s)
  if (e) {
    const i = e[1].charCodeAt(0),
      n = e[2].charCodeAt(0)
    let r
    for (r = i; r <= n; ++r) t.push(s.replace(e[0], String.fromCharCode(r)))
    return t
  }
  if (((e = /\{(\d+)-(\d+)\}/.exec(s)), e)) {
    const i = parseInt(e[2], 10)
    for (let n = parseInt(e[1], 10); n <= i; n++)
      t.push(s.replace(e[0], n.toString()))
    return t
  }
  return t.push(s), t
}
class zo extends Mg {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      opaque: t.opaque,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tilePixelRatio: t.tilePixelRatio,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.generateTileUrlFunction_ =
        this.tileUrlFunction === zo.prototype.tileUrlFunction),
      (this.tileLoadFunction = t.tileLoadFunction),
      t.tileUrlFunction && (this.tileUrlFunction = t.tileUrlFunction),
      (this.urls = null),
      t.urls ? this.setUrls(t.urls) : t.url && this.setUrl(t.url),
      (this.tileLoadingKeys_ = {})
  }
  getTileLoadFunction() {
    return this.tileLoadFunction
  }
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction
      ? this.tileUrlFunction.bind(this)
      : this.tileUrlFunction
  }
  getUrls() {
    return this.urls
  }
  handleTileChange(t) {
    const e = t.target,
      i = it(e),
      n = e.getState()
    let r
    n == b.LOADING
      ? ((this.tileLoadingKeys_[i] = !0), (r = vr.TILELOADSTART))
      : i in this.tileLoadingKeys_ &&
        (delete this.tileLoadingKeys_[i],
        (r =
          n == b.ERROR
            ? vr.TILELOADERROR
            : n == b.LOADED
              ? vr.TILELOADEND
              : void 0)),
      r != null && this.dispatchEvent(new Pg(r, e))
  }
  setTileLoadFunction(t) {
    this.tileCache.clear(), (this.tileLoadFunction = t), this.changed()
  }
  setTileUrlFunction(t, e) {
    ;(this.tileUrlFunction = t),
      this.tileCache.pruneExceptNewestZ(),
      typeof e < "u" ? this.setKey(e) : this.changed()
  }
  setUrl(t) {
    const e = Dg(t)
    ;(this.urls = e), this.setUrls(e)
  }
  setUrls(t) {
    this.urls = t
    const e = t.join(`
`)
    this.generateTileUrlFunction_
      ? this.setTileUrlFunction(Og(t, this.tileGrid), e)
      : this.setKey(e)
  }
  tileUrlFunction(t, e, i) {}
  useTile(t, e, i) {
    const n = Qs(t, e, i)
    this.tileCache.containsKey(n) && this.tileCache.get(n)
  }
}
class Ng extends zo {
  constructor(t) {
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      opaque: t.opaque,
      projection: t.projection,
      state: t.state,
      tileGrid: t.tileGrid,
      tileLoadFunction: t.tileLoadFunction ? t.tileLoadFunction : kg,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX,
      transition: t.transition,
      interpolate: t.interpolate !== void 0 ? t.interpolate : !0,
      key: t.key,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.crossOrigin = t.crossOrigin !== void 0 ? t.crossOrigin : null),
      (this.tileClass = t.tileClass !== void 0 ? t.tileClass : hh),
      (this.tileCacheForProjection = {}),
      (this.tileGridForProjection = {}),
      (this.reprojectionErrorThreshold_ = t.reprojectionErrorThreshold),
      (this.renderReprojectionEdges_ = !1)
  }
  canExpireCache() {
    if (this.tileCache.canExpireCache()) return !0
    for (const t in this.tileCacheForProjection)
      if (this.tileCacheForProjection[t].canExpireCache()) return !0
    return !1
  }
  expireCache(t, e) {
    const i = this.getTileCacheForProjection(t)
    this.tileCache.expireCache(this.tileCache == i ? e : {})
    for (const n in this.tileCacheForProjection) {
      const r = this.tileCacheForProjection[n]
      r.expireCache(r == i ? e : {})
    }
  }
  getGutterForProjection(t) {
    return this.getProjection() && t && !ci(this.getProjection(), t)
      ? 0
      : this.getGutter()
  }
  getGutter() {
    return 0
  }
  getKey() {
    let t = super.getKey()
    return this.getInterpolate() || (t += ":disable-interpolation"), t
  }
  getOpaque(t) {
    return this.getProjection() && t && !ci(this.getProjection(), t)
      ? !1
      : super.getOpaque(t)
  }
  getTileGridForProjection(t) {
    const e = this.getProjection()
    if (this.tileGrid && (!e || ci(e, t))) return this.tileGrid
    const i = it(t)
    return (
      i in this.tileGridForProjection ||
        (this.tileGridForProjection[i] = Eh(t)),
      this.tileGridForProjection[i]
    )
  }
  getTileCacheForProjection(t) {
    const e = this.getProjection()
    if (!e || ci(e, t)) return this.tileCache
    const i = it(t)
    return (
      i in this.tileCacheForProjection ||
        (this.tileCacheForProjection[i] = new ph(this.tileCache.highWaterMark)),
      this.tileCacheForProjection[i]
    )
  }
  createTile_(t, e, i, n, r, o) {
    const a = [t, e, i],
      l = this.getTileCoordForTileUrlFunction(a, r),
      h = l ? this.tileUrlFunction(l, n, r) : void 0,
      c = new this.tileClass(
        a,
        h !== void 0 ? b.IDLE : b.EMPTY,
        h !== void 0 ? h : "",
        this.crossOrigin,
        this.tileLoadFunction,
        this.tileOptions,
      )
    return (
      (c.key = o),
      c.addEventListener(U.CHANGE, this.handleTileChange.bind(this)),
      c
    )
  }
  getTile(t, e, i, n, r) {
    const o = this.getProjection()
    if (!o || !r || ci(o, r)) return this.getTileInternal(t, e, i, n, o || r)
    const a = this.getTileCacheForProjection(r),
      l = [t, e, i]
    let h
    const c = mh(l)
    a.containsKey(c) && (h = a.get(c))
    const u = this.getKey()
    if (h && h.key == u) return h
    const d = this.getTileGridForProjection(o),
      f = this.getTileGridForProjection(r),
      g = this.getTileCoordForTileUrlFunction(l, r),
      _ = new qr(
        o,
        d,
        r,
        f,
        l,
        g,
        this.getTilePixelRatio(n),
        this.getGutter(),
        (m, p, y, x) => this.getTileInternal(m, p, y, x, o),
        this.reprojectionErrorThreshold_,
        this.renderReprojectionEdges_,
        this.tileOptions,
      )
    return (
      (_.key = u),
      h
        ? ((_.interimTile = h), _.refreshInterimChain(), a.replace(c, _))
        : a.set(c, _),
      _
    )
  }
  getTileInternal(t, e, i, n, r) {
    let o = null
    const a = Qs(t, e, i),
      l = this.getKey()
    if (!this.tileCache.containsKey(a))
      (o = this.createTile_(t, e, i, n, r, l)), this.tileCache.set(a, o)
    else if (((o = this.tileCache.get(a)), o.key != l)) {
      const h = o
      ;(o = this.createTile_(t, e, i, n, r, l)),
        h.getState() == b.IDLE
          ? (o.interimTile = h.interimTile)
          : (o.interimTile = h),
        o.refreshInterimChain(),
        this.tileCache.replace(a, o)
    }
    return o
  }
  setRenderReprojectionEdges(t) {
    if (this.renderReprojectionEdges_ != t) {
      this.renderReprojectionEdges_ = t
      for (const e in this.tileCacheForProjection)
        this.tileCacheForProjection[e].clear()
      this.changed()
    }
  }
  setTileGridForProjection(t, e) {
    const i = wt(t)
    if (i) {
      const n = it(i)
      n in this.tileGridForProjection || (this.tileGridForProjection[n] = e)
    }
  }
  clear() {
    super.clear()
    for (const t in this.tileCacheForProjection)
      this.tileCacheForProjection[t].clear()
  }
}
function kg(s, t) {
  s.getImage().src = t
}
class Gg extends Ng {
  constructor(t) {
    t = t || {}
    const e = t.projection !== void 0 ? t.projection : "EPSG:3857",
      i =
        t.tileGrid !== void 0
          ? t.tileGrid
          : Lg({
              extent: Go(e),
              maxResolution: t.maxResolution,
              maxZoom: t.maxZoom,
              minZoom: t.minZoom,
              tileSize: t.tileSize,
            })
    super({
      attributions: t.attributions,
      cacheSize: t.cacheSize,
      crossOrigin: t.crossOrigin,
      interpolate: t.interpolate,
      opaque: t.opaque,
      projection: e,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileGrid: i,
      tileLoadFunction: t.tileLoadFunction,
      tilePixelRatio: t.tilePixelRatio,
      tileUrlFunction: t.tileUrlFunction,
      url: t.url,
      urls: t.urls,
      wrapX: t.wrapX !== void 0 ? t.wrapX : !0,
      transition: t.transition,
      attributionsCollapsible: t.attributionsCollapsible,
      zDirection: t.zDirection,
    }),
      (this.gutter_ = t.gutter !== void 0 ? t.gutter : 0)
  }
  getGutter() {
    return this.gutter_
  }
}
const zg =
  '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.'
class Yg extends Gg {
  constructor(t) {
    t = t || {}
    let e
    t.attributions !== void 0 ? (e = t.attributions) : (e = [zg])
    const i = t.crossOrigin !== void 0 ? t.crossOrigin : "anonymous",
      n =
        t.url !== void 0
          ? t.url
          : "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    super({
      attributions: e,
      attributionsCollapsible: !1,
      cacheSize: t.cacheSize,
      crossOrigin: i,
      interpolate: t.interpolate,
      maxZoom: t.maxZoom !== void 0 ? t.maxZoom : 19,
      opaque: t.opaque !== void 0 ? t.opaque : !0,
      reprojectionErrorThreshold: t.reprojectionErrorThreshold,
      tileLoadFunction: t.tileLoadFunction,
      transition: t.transition,
      url: n,
      wrapX: t.wrapX,
      zDirection: t.zDirection,
    })
  }
}
class Xg {
  constructor() {
    ;(this.dataProjection = void 0),
      (this.defaultFeatureProjection = void 0),
      (this.featureClass = Fs),
      (this.supportedMediaTypes = null)
  }
  getReadOptions(t, e) {
    if (e) {
      let i = e.dataProjection ? wt(e.dataProjection) : this.readProjection(t)
      e.extent &&
        i &&
        i.getUnits() === "tile-pixels" &&
        ((i = wt(i)), i.setWorldExtent(e.extent)),
        (e = { dataProjection: i, featureProjection: e.featureProjection })
    }
    return this.adaptOptions(e)
  }
  adaptOptions(t) {
    return Object.assign(
      {
        dataProjection: this.dataProjection,
        featureProjection: this.defaultFeatureProjection,
        featureClass: this.featureClass,
      },
      t,
    )
  }
  getType() {
    return W()
  }
  readFeature(t, e) {
    return W()
  }
  readFeatures(t, e) {
    return W()
  }
  readGeometry(t, e) {
    return W()
  }
  readProjection(t) {
    return W()
  }
  writeFeature(t, e) {
    return W()
  }
  writeFeatures(t, e) {
    return W()
  }
  writeGeometry(t, e) {
    return W()
  }
}
function Ch(s, t, e) {
  const i = e ? wt(e.featureProjection) : null,
    n = e ? wt(e.dataProjection) : null
  let r = s
  if (i && n && !ci(i, n)) {
    t && (r = s.clone())
    const o = t ? i : n,
      a = t ? n : i
    o.getUnits() === "tile-pixels"
      ? r.transform(o, a)
      : r.applyTransform(In(o, a))
  }
  if (t && e && e.decimals !== void 0) {
    const o = Math.pow(10, e.decimals),
      a = function (l) {
        for (let h = 0, c = l.length; h < c; ++h)
          l[h] = Math.round(l[h] * o) / o
        return l
      }
    r === s && (r = s.clone()), r.applyTransform(a)
  }
  return r
}
const ja = "http://www.w3.org/2001/XMLSchema-instance"
function Kn(s, t) {
  return tr().createElementNS(s, t)
}
function De(s, t) {
  return wh(s, t, []).join("")
}
function wh(s, t, e) {
  if (s.nodeType == Node.CDATA_SECTION_NODE || s.nodeType == Node.TEXT_NODE)
    t
      ? e.push(String(s.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
      : e.push(s.nodeValue)
  else {
    let i
    for (i = s.firstChild; i; i = i.nextSibling) wh(i, t, e)
  }
  return e
}
function qe(s) {
  return "documentElement" in s
}
function $e(s) {
  return new DOMParser().parseFromString(s, "application/xml")
}
function Ha(s, t) {
  return function (e, i) {
    const n = s.call(t !== void 0 ? t : this, e, i)
    if (n !== void 0) {
      const r = i[i.length - 1]
      tt(r, n)
    }
  }
}
function Ke(s, t) {
  return function (e, i) {
    const n = s.call(t !== void 0 ? t : this, e, i)
    n !== void 0 && i[i.length - 1].push(n)
  }
}
function Yo(s, t) {
  return function (e, i) {
    const n = s.call(t !== void 0 ? t : this, e, i)
    n !== void 0 && (i[i.length - 1] = n)
  }
}
function L(s, t, e) {
  return function (i, n) {
    const r = s.call(e !== void 0 ? e : this, i, n)
    if (r !== void 0) {
      const o = n[n.length - 1],
        a = t !== void 0 ? t : i.localName
      o[a] = r
    }
  }
}
function D(s, t) {
  return function (e, i, n) {
    s.call(t !== void 0 ? t : this, e, i, n),
      n[n.length - 1].node.appendChild(e)
  }
}
function Ne(s, t) {
  return function (e, i, n) {
    const o = i[i.length - 1].node
    let a = s
    a === void 0 && (a = n)
    const l = t !== void 0 ? t : o.namespaceURI
    return Kn(l, a)
  }
}
const qt = Ne()
function oe(s, t) {
  const e = t.length,
    i = new Array(e)
  for (let n = 0; n < e; ++n) i[n] = s[t[n]]
  return i
}
function F(s, t, e) {
  e = e !== void 0 ? e : {}
  let i, n
  for (i = 0, n = s.length; i < n; ++i) e[s[i]] = t
  return e
}
function en(s, t, e, i) {
  let n
  for (n = t.firstElementChild; n; n = n.nextElementSibling) {
    const r = s[n.namespaceURI]
    if (r !== void 0) {
      const o = r[n.localName]
      o !== void 0 && o.call(i, n, e)
    }
  }
}
function ot(s, t, e, i, n) {
  return i.push(s), en(t, e, i, n), i.pop()
}
function Ug(s, t, e, i, n, r) {
  const o = (n !== void 0 ? n : e).length
  let a, l
  for (let h = 0; h < o; ++h)
    (a = e[h]),
      a !== void 0 &&
        ((l = t.call(
          r !== void 0 ? r : this,
          a,
          i,
          n !== void 0 ? n[h] : void 0,
        )),
        l !== void 0 && s[l.namespaceURI][l.localName].call(r, l, a, i))
}
function _t(s, t, e, i, n, r, o) {
  return n.push(s), Ug(t, e, i, n, r, o), n.pop()
}
let Lr
function Wg() {
  return (
    Lr === void 0 && typeof XMLSerializer < "u" && (Lr = new XMLSerializer()),
    Lr
  )
}
let Ar
function tr() {
  return (
    Ar === void 0 &&
      typeof document < "u" &&
      (Ar = document.implementation.createDocument("", "", null)),
    Ar
  )
}
class Zg extends Xg {
  constructor() {
    super(), (this.xmlSerializer_ = Wg())
  }
  getType() {
    return "xml"
  }
  readFeature(t, e) {
    if (!t) return null
    if (typeof t == "string") {
      const i = $e(t)
      return this.readFeatureFromDocument(i, e)
    }
    return qe(t)
      ? this.readFeatureFromDocument(t, e)
      : this.readFeatureFromNode(t, e)
  }
  readFeatureFromDocument(t, e) {
    const i = this.readFeaturesFromDocument(t, e)
    return i.length > 0 ? i[0] : null
  }
  readFeatureFromNode(t, e) {
    return null
  }
  readFeatures(t, e) {
    if (!t) return []
    if (typeof t == "string") {
      const i = $e(t)
      return this.readFeaturesFromDocument(i, e)
    }
    return qe(t)
      ? this.readFeaturesFromDocument(t, e)
      : this.readFeaturesFromNode(t, e)
  }
  readFeaturesFromDocument(t, e) {
    const i = []
    for (let n = t.firstChild; n; n = n.nextSibling)
      n.nodeType == Node.ELEMENT_NODE && tt(i, this.readFeaturesFromNode(n, e))
    return i
  }
  readFeaturesFromNode(t, e) {
    return W()
  }
  readGeometry(t, e) {
    if (!t) return null
    if (typeof t == "string") {
      const i = $e(t)
      return this.readGeometryFromDocument(i, e)
    }
    return qe(t)
      ? this.readGeometryFromDocument(t, e)
      : this.readGeometryFromNode(t, e)
  }
  readGeometryFromDocument(t, e) {
    return null
  }
  readGeometryFromNode(t, e) {
    return null
  }
  readProjection(t) {
    if (!t) return null
    if (typeof t == "string") {
      const e = $e(t)
      return this.readProjectionFromDocument(e)
    }
    return qe(t)
      ? this.readProjectionFromDocument(t)
      : this.readProjectionFromNode(t)
  }
  readProjectionFromDocument(t) {
    return this.dataProjection
  }
  readProjectionFromNode(t) {
    return this.dataProjection
  }
  writeFeature(t, e) {
    const i = this.writeFeatureNode(t, e)
    return this.xmlSerializer_.serializeToString(i)
  }
  writeFeatureNode(t, e) {
    return null
  }
  writeFeatures(t, e) {
    const i = this.writeFeaturesNode(t, e)
    return this.xmlSerializer_.serializeToString(i)
  }
  writeFeaturesNode(t, e) {
    return null
  }
  writeGeometry(t, e) {
    const i = this.writeGeometryNode(t, e)
    return this.xmlSerializer_.serializeToString(i)
  }
  writeGeometryNode(t, e) {
    return null
  }
}
function ni(s) {
  const t = De(s, !1)
  return Bg(t)
}
function Bg(s) {
  const t = /^\s*(true|1)|(false|0)\s*$/.exec(s)
  if (t) return t[1] !== void 0 || !1
}
function ct(s) {
  const t = De(s, !1)
  return Kg(t)
}
function Kg(s) {
  const t = /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(s)
  if (t) return parseFloat(t[1])
}
function Lt(s) {
  return De(s, !1).trim()
}
function Hi(s, t) {
  ie(s, t ? "1" : "0")
}
function Vg(s, t) {
  s.appendChild(tr().createCDATASection(t))
}
function _i(s, t) {
  const e = t.toPrecision()
  s.appendChild(tr().createTextNode(e))
}
function ie(s, t) {
  s.appendChild(tr().createTextNode(t))
}
const ke = ["http://www.google.com/kml/ext/2.2"],
  A = [
    null,
    "http://earth.google.com/kml/2.0",
    "http://earth.google.com/kml/2.1",
    "http://earth.google.com/kml/2.2",
    "http://www.opengis.net/kml/2.2",
  ],
  jg =
    "http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd",
  qa = { fraction: "fraction", pixels: "pixels", insetPixels: "pixels" },
  Hg = F(
    A,
    {
      ExtendedData: kh,
      Region: Gh,
      MultiGeometry: L(bh, "geometry"),
      LineString: L(Fh, "geometry"),
      LinearRing: L(Oh, "geometry"),
      Point: L(Dh, "geometry"),
      Polygon: L(Nh, "geometry"),
      Style: L(Wo),
      StyleMap: F_,
      address: L(Lt),
      description: L(Lt),
      name: L(Lt),
      open: L(ni),
      phoneNumber: L(Lt),
      styleUrl: L(vh),
      visibility: L(ni),
    },
    F(ke, { MultiTrack: L(E_, "geometry"), Track: L(Ph, "geometry") }),
  ),
  qg = F(A, {
    ExtendedData: kh,
    Region: Gh,
    Link: Z_,
    address: L(Lt),
    description: L(Lt),
    name: L(Lt),
    open: L(ni),
    phoneNumber: L(Lt),
    visibility: L(ni),
  }),
  $g = F(A, { href: L(Ih) }),
  Jg = F(A, {
    Altitude: L(ct),
    Longitude: L(ct),
    Latitude: L(ct),
    Tilt: L(ct),
    AltitudeMode: L(Lt),
    Heading: L(ct),
    Roll: L(ct),
  }),
  Rh = F(A, { LatLonAltBox: k_, Lod: z_ }),
  Qg = F(A, ["Document", "Placemark"]),
  t_ = F(A, { Document: D(J_), Placemark: D(Xh) })
let zi,
  cs = null,
  $r,
  xn,
  Cn,
  wn,
  vs,
  Jr = null,
  Xo,
  Qr = null,
  to,
  mi = null,
  $a = null,
  eo = null
function Ls(s) {
  return 32 / Math.min(s[0], s[1])
}
function e_() {
  ;(zi = [255, 255, 255, 1]),
    (cs = new Oe({ color: zi })),
    ($r = [20, 2]),
    (xn = "pixels"),
    (Cn = "pixels"),
    (wn = [64, 64]),
    (vs = "https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"),
    (Jr = new js({
      anchor: $r,
      anchorOrigin: "bottom-left",
      anchorXUnits: xn,
      anchorYUnits: Cn,
      crossOrigin: "anonymous",
      rotation: 0,
      scale: Ls(wn),
      size: wn,
      src: vs,
    })),
    (Xo = "NO_IMAGE"),
    (Qr = new ii({ color: zi, width: 1 })),
    (to = new ii({ color: [51, 51, 51, 1], width: 2 })),
    (mi = new Un({
      font: "bold 16px Helvetica",
      fill: cs,
      stroke: to,
      scale: 0.8,
    })),
    ($a = new se({ fill: cs, image: Jr, text: mi, stroke: Qr, zIndex: 0 })),
    (eo = [$a])
}
let hs
function i_(s) {
  return s
}
class n_ extends Zg {
  constructor(t) {
    super(),
      (t = t || {}),
      eo || e_(),
      (this.dataProjection = wt("EPSG:4326")),
      (this.defaultStyle_ = t.defaultStyle ? t.defaultStyle : eo),
      (this.extractStyles_ = t.extractStyles !== void 0 ? t.extractStyles : !0),
      (this.writeStyles_ = t.writeStyles !== void 0 ? t.writeStyles : !0),
      (this.sharedStyles_ = {}),
      (this.showPointNames_ =
        t.showPointNames !== void 0 ? t.showPointNames : !0),
      (this.crossOrigin_ =
        t.crossOrigin !== void 0 ? t.crossOrigin : "anonymous"),
      (this.iconUrlFunction_ = t.iconUrlFunction ? t.iconUrlFunction : i_),
      (this.supportedMediaTypes = ["application/vnd.google-earth.kml+xml"])
  }
  readDocumentOrFolder_(t, e) {
    const i = F(A, {
        Document: Ha(this.readDocumentOrFolder_, this),
        Folder: Ha(this.readDocumentOrFolder_, this),
        Placemark: Ke(this.readPlacemark_, this),
        Style: this.readSharedStyle_.bind(this),
        StyleMap: this.readSharedStyleMap_.bind(this),
      }),
      n = ot([], i, t, e, this)
    if (n) return n
  }
  readPlacemark_(t, e) {
    const i = ot({ geometry: null }, Hg, t, e, this)
    if (!i) return
    const n = new Fs(),
      r = t.getAttribute("id")
    r !== null && n.setId(r)
    const o = e[0],
      a = i.geometry
    if (
      (a && Ch(a, !1, o),
      n.setGeometry(a),
      delete i.geometry,
      this.extractStyles_)
    ) {
      const l = i.Style,
        h = i.styleUrl,
        c = r_(
          l,
          h,
          this.defaultStyle_,
          this.sharedStyles_,
          this.showPointNames_,
        )
      n.setStyle(c)
    }
    return delete i.Style, n.setProperties(i, !0), n
  }
  readSharedStyle_(t, e) {
    const i = t.getAttribute("id")
    if (i !== null) {
      const n = Wo.call(this, t, e)
      if (n) {
        let r,
          o = t.baseURI
        ;(!o || o == "about:blank") && (o = window.location.href),
          o ? (r = new URL("#" + i, o).href) : (r = "#" + i),
          (this.sharedStyles_[r] = n)
      }
    }
  }
  readSharedStyleMap_(t, e) {
    const i = t.getAttribute("id")
    if (i === null) return
    const n = Ah.call(this, t, e)
    if (!n) return
    let r,
      o = t.baseURI
    ;(!o || o == "about:blank") && (o = window.location.href),
      o ? (r = new URL("#" + i, o).href) : (r = "#" + i),
      (this.sharedStyles_[r] = n)
  }
  readFeatureFromNode(t, e) {
    if (!A.includes(t.namespaceURI)) return null
    const i = this.readPlacemark_(t, [this.getReadOptions(t, e)])
    return i || null
  }
  readFeaturesFromNode(t, e) {
    if (!A.includes(t.namespaceURI)) return []
    let i
    const n = t.localName
    if (n == "Document" || n == "Folder")
      return (
        (i = this.readDocumentOrFolder_(t, [this.getReadOptions(t, e)])),
        i || []
      )
    if (n == "Placemark") {
      const r = this.readPlacemark_(t, [this.getReadOptions(t, e)])
      return r ? [r] : []
    }
    if (n == "kml") {
      i = []
      for (let r = t.firstElementChild; r; r = r.nextElementSibling) {
        const o = this.readFeaturesFromNode(r, e)
        o && tt(i, o)
      }
      return i
    }
    return []
  }
  readName(t) {
    if (t) {
      if (typeof t == "string") {
        const e = $e(t)
        return this.readNameFromDocument(e)
      }
      return qe(t) ? this.readNameFromDocument(t) : this.readNameFromNode(t)
    }
  }
  readNameFromDocument(t) {
    for (let e = t.firstChild; e; e = e.nextSibling)
      if (e.nodeType == Node.ELEMENT_NODE) {
        const i = this.readNameFromNode(e)
        if (i) return i
      }
  }
  readNameFromNode(t) {
    for (let e = t.firstElementChild; e; e = e.nextElementSibling)
      if (A.includes(e.namespaceURI) && e.localName == "name") return Lt(e)
    for (let e = t.firstElementChild; e; e = e.nextElementSibling) {
      const i = e.localName
      if (
        A.includes(e.namespaceURI) &&
        (i == "Document" || i == "Folder" || i == "Placemark" || i == "kml")
      ) {
        const n = this.readNameFromNode(e)
        if (n) return n
      }
    }
  }
  readNetworkLinks(t) {
    const e = []
    if (typeof t == "string") {
      const i = $e(t)
      tt(e, this.readNetworkLinksFromDocument(i))
    } else
      qe(t)
        ? tt(e, this.readNetworkLinksFromDocument(t))
        : tt(e, this.readNetworkLinksFromNode(t))
    return e
  }
  readNetworkLinksFromDocument(t) {
    const e = []
    for (let i = t.firstChild; i; i = i.nextSibling)
      i.nodeType == Node.ELEMENT_NODE && tt(e, this.readNetworkLinksFromNode(i))
    return e
  }
  readNetworkLinksFromNode(t) {
    const e = []
    for (let i = t.firstElementChild; i; i = i.nextElementSibling)
      if (A.includes(i.namespaceURI) && i.localName == "NetworkLink") {
        const n = ot({}, qg, i, [])
        e.push(n)
      }
    for (let i = t.firstElementChild; i; i = i.nextElementSibling) {
      const n = i.localName
      A.includes(i.namespaceURI) &&
        (n == "Document" || n == "Folder" || n == "kml") &&
        tt(e, this.readNetworkLinksFromNode(i))
    }
    return e
  }
  readRegion(t) {
    const e = []
    if (typeof t == "string") {
      const i = $e(t)
      tt(e, this.readRegionFromDocument(i))
    } else
      qe(t)
        ? tt(e, this.readRegionFromDocument(t))
        : tt(e, this.readRegionFromNode(t))
    return e
  }
  readRegionFromDocument(t) {
    const e = []
    for (let i = t.firstChild; i; i = i.nextSibling)
      i.nodeType == Node.ELEMENT_NODE && tt(e, this.readRegionFromNode(i))
    return e
  }
  readRegionFromNode(t) {
    const e = []
    for (let i = t.firstElementChild; i; i = i.nextElementSibling)
      if (A.includes(i.namespaceURI) && i.localName == "Region") {
        const n = ot({}, Rh, i, [])
        e.push(n)
      }
    for (let i = t.firstElementChild; i; i = i.nextElementSibling) {
      const n = i.localName
      A.includes(i.namespaceURI) &&
        (n == "Document" || n == "Folder" || n == "kml") &&
        tt(e, this.readRegionFromNode(i))
    }
    return e
  }
  readCamera(t) {
    const e = []
    if (typeof t == "string") {
      const i = $e(t)
      tt(e, this.readCameraFromDocument(i))
    } else
      qe(t)
        ? tt(e, this.readCameraFromDocument(t))
        : tt(e, this.readCameraFromNode(t))
    return e
  }
  readCameraFromDocument(t) {
    const e = []
    for (let i = t.firstChild; i; i = i.nextSibling)
      i.nodeType === Node.ELEMENT_NODE && tt(e, this.readCameraFromNode(i))
    return e
  }
  readCameraFromNode(t) {
    const e = []
    for (let i = t.firstElementChild; i; i = i.nextElementSibling)
      if (A.includes(i.namespaceURI) && i.localName === "Camera") {
        const n = ot({}, Jg, i, [])
        e.push(n)
      }
    for (let i = t.firstElementChild; i; i = i.nextElementSibling) {
      const n = i.localName
      A.includes(i.namespaceURI) &&
        (n === "Document" ||
          n === "Folder" ||
          n === "Placemark" ||
          n === "kml") &&
        tt(e, this.readCameraFromNode(i))
    }
    return e
  }
  writeFeaturesNode(t, e) {
    e = this.adaptOptions(e)
    const i = Kn(A[4], "kml"),
      n = "http://www.w3.org/2000/xmlns/"
    i.setAttributeNS(n, "xmlns:gx", ke[0]),
      i.setAttributeNS(n, "xmlns:xsi", ja),
      i.setAttributeNS(ja, "xsi:schemaLocation", jg)
    const r = { node: i },
      o = {}
    t.length > 1 ? (o.Document = t) : t.length == 1 && (o.Placemark = t[0])
    const a = Qg[i.namespaceURI],
      l = oe(o, a)
    return _t(r, t_, qt, l, [e], a, this), i
  }
}
function s_(s, t) {
  const e = [0, 0]
  let i = "start"
  const n = s.getImage()
  if (n) {
    const a = n.getSize()
    if (a && a.length == 2) {
      const l = n.getScaleArray(),
        h = n.getAnchor()
      ;(e[0] = l[0] * (a[0] - h[0])),
        (e[1] = l[1] * (a[1] / 2 - h[1])),
        (i = "left")
    }
  }
  let r = s.getText()
  return (
    r
      ? ((r = r.clone()),
        r.setFont(r.getFont() || mi.getFont()),
        r.setScale(r.getScale() || mi.getScale()),
        r.setFill(r.getFill() || mi.getFill()),
        r.setStroke(r.getStroke() || to))
      : (r = mi.clone()),
    r.setText(t),
    r.setOffsetX(e[0]),
    r.setOffsetY(e[1]),
    r.setTextAlign(i),
    new se({ image: n, text: r })
  )
}
function r_(s, t, e, i, n) {
  return function (r, o) {
    let a = n,
      l = "",
      h = []
    if (a) {
      const u = r.getGeometry()
      if (u)
        if (u instanceof Ei)
          (h = u.getGeometriesArrayRecursive().filter(function (d) {
            const f = d.getType()
            return f === "Point" || f === "MultiPoint"
          })),
            (a = h.length > 0)
        else {
          const d = u.getType()
          a = d === "Point" || d === "MultiPoint"
        }
    }
    a &&
      ((l = r.get("name")),
      (a = a && !!l),
      a &&
        /&[^&]+;/.test(l) &&
        (hs || (hs = document.createElement("textarea")),
        (hs.innerHTML = l),
        (l = hs.value)))
    let c = e
    if ((s ? (c = s) : t && (c = Sh(t, e, i)), a)) {
      const u = s_(c[0], l)
      if (h.length > 0) {
        u.setGeometry(new Ei(h))
        const d = new se({
          geometry: c[0].getGeometry(),
          image: null,
          fill: c[0].getFill(),
          stroke: c[0].getStroke(),
          text: null,
        })
        return [u, d].concat(c.slice(1))
      }
      return u
    }
    return c
  }
}
function Sh(s, t, e) {
  return Array.isArray(s) ? s : typeof s == "string" ? Sh(e[s], t, e) : t
}
function er(s) {
  const t = De(s, !1),
    e = /^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(t)
  if (e) {
    const i = e[1]
    return [
      parseInt(i.substr(6, 2), 16),
      parseInt(i.substr(4, 2), 16),
      parseInt(i.substr(2, 2), 16),
      parseInt(i.substr(0, 2), 16) / 255,
    ]
  }
}
function Th(s) {
  let t = De(s, !1)
  const e = []
  t = t.replace(/\s*,\s*/g, ",")
  const i =
    /^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?),([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|,|$)(?:([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|$))?\s*/i
  let n
  for (; (n = i.exec(t)); ) {
    const r = parseFloat(n[1]),
      o = parseFloat(n[2]),
      a = n[3] ? parseFloat(n[3]) : 0
    e.push(r, o, a), (t = t.substr(n[0].length))
  }
  if (t === "") return e
}
function Ih(s) {
  const t = De(s, !1).trim()
  let e = s.baseURI
  return (
    (!e || e == "about:blank") && (e = window.location.href),
    e ? new URL(t, e).href : t
  )
}
function vh(s) {
  const t = De(s, !1)
    .trim()
    .replace(/^(?!.*#)/, "#")
  let e = s.baseURI
  return (
    (!e || e == "about:blank") && (e = window.location.href),
    e ? new URL(t, e).href : t
  )
}
function o_(s) {
  const t = s.getAttribute("xunits"),
    e = s.getAttribute("yunits")
  let i
  return (
    t !== "insetPixels"
      ? e !== "insetPixels"
        ? (i = "bottom-left")
        : (i = "top-left")
      : e !== "insetPixels"
        ? (i = "bottom-right")
        : (i = "top-right"),
    {
      x: parseFloat(s.getAttribute("x")),
      xunits: qa[t],
      y: parseFloat(s.getAttribute("y")),
      yunits: qa[e],
      origin: i,
    }
  )
}
function Lh(s) {
  return ct(s)
}
const a_ = F(A, { Pair: P_ })
function Ah(s, t) {
  return ot(void 0, a_, s, t, this)
}
const l_ = F(A, {
  Icon: L(w_),
  color: L(er),
  heading: L(ct),
  hotSpot: L(o_),
  scale: L(Lh),
})
function h_(s, t) {
  const e = ot({}, l_, s, t)
  if (!e) return
  const i = t[t.length - 1],
    n = "Icon" in e ? e.Icon : {},
    r = !("Icon" in e) || Object.keys(n).length > 0
  let o
  const a = n.href
  a ? (o = a) : r && (o = vs)
  let l,
    h,
    c,
    u = "bottom-left"
  const d = e.hotSpot
  d
    ? ((l = [d.x, d.y]), (h = d.xunits), (c = d.yunits), (u = d.origin))
    : /^https?:\/\/maps\.(?:google|gstatic)\.com\//.test(o) &&
      (o.includes("pushpin")
        ? ((l = $r), (h = xn), (c = Cn))
        : o.includes("arrow-reverse")
          ? ((l = [54, 42]), (h = xn), (c = Cn))
          : o.includes("paddle") && ((l = [32, 1]), (h = xn), (c = Cn)))
  let f
  const g = n.x,
    _ = n.y
  g !== void 0 && _ !== void 0 && (f = [g, _])
  let m
  const p = n.w,
    y = n.h
  p !== void 0 && y !== void 0 && (m = [p, y])
  let x
  const E = e.heading
  E !== void 0 && (x = yn(E))
  const C = e.scale,
    T = e.color
  if (r) {
    o == vs && (m = wn)
    const S = new js({
        anchor: l,
        anchorOrigin: u,
        anchorXUnits: h,
        anchorYUnits: c,
        crossOrigin: this.crossOrigin_,
        offset: f,
        offsetOrigin: "bottom-left",
        rotation: x,
        scale: C,
        size: m,
        src: this.iconUrlFunction_(o),
        color: T,
      }),
      R = S.getScaleArray()[0],
      v = S.getSize()
    if (v === null) {
      const k = S.getImageState()
      if (k === X.IDLE || k === X.LOADING) {
        const N = function () {
          const z = S.getImageState()
          if (!(z === X.IDLE || z === X.LOADING)) {
            const K = S.getSize()
            if (K && K.length == 2) {
              const V = Ls(K)
              S.setScale(R * V)
            }
            S.unlistenImageChange(N)
          }
        }
        S.listenImageChange(N), k === X.IDLE && S.load()
      }
    } else if (v.length == 2) {
      const k = Ls(v)
      S.setScale(R * k)
    }
    i.imageStyle = S
  } else i.imageStyle = Xo
}
const c_ = F(A, { color: L(er), scale: L(Lh) })
function u_(s, t) {
  const e = ot({}, c_, s, t)
  if (!e) return
  const i = t[t.length - 1],
    n = new Un({
      fill: new Oe({ color: "color" in e ? e.color : zi }),
      scale: e.scale,
    })
  i.textStyle = n
}
const d_ = F(A, { color: L(er), width: L(ct) })
function f_(s, t) {
  const e = ot({}, d_, s, t)
  if (!e) return
  const i = t[t.length - 1],
    n = new ii({
      color: "color" in e ? e.color : zi,
      width: "width" in e ? e.width : 1,
    })
  i.strokeStyle = n
}
const g_ = F(A, { color: L(er), fill: L(ni), outline: L(ni) })
function __(s, t) {
  const e = ot({}, g_, s, t)
  if (!e) return
  const i = t[t.length - 1],
    n = new Oe({ color: "color" in e ? e.color : zi })
  i.fillStyle = n
  const r = e.fill
  r !== void 0 && (i.fill = r)
  const o = e.outline
  o !== void 0 && (i.outline = o)
}
const m_ = F(A, { coordinates: Yo(Th) })
function Mh(s, t) {
  return ot(null, m_, s, t)
}
function p_(s, t) {
  const i = t[t.length - 1].coordinates,
    n = De(s, !1),
    o =
      /^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(
        n,
      )
  if (o) {
    const a = parseFloat(o[1]),
      l = parseFloat(o[2]),
      h = parseFloat(o[3])
    i.push([a, l, h])
  } else i.push([])
}
const y_ = F(ke, { Track: Ke(Ph) })
function E_(s, t) {
  const e = ot([], y_, s, t)
  if (e) return new rh(e)
}
const x_ = F(A, { when: B_ }, F(ke, { coord: p_ }))
function Ph(s, t) {
  const e = ot({ coordinates: [], whens: [] }, x_, s, t)
  if (!e) return
  const i = [],
    n = e.coordinates,
    r = e.whens
  for (let o = 0, a = Math.min(n.length, r.length); o < a; ++o)
    n[o].length == 3 && i.push(n[o][0], n[o][1], n[o][2], r[o])
  return new ps(i, "XYZM")
}
const C_ = F(
  A,
  { href: L(Ih) },
  F(ke, { x: L(ct), y: L(ct), w: L(ct), h: L(ct) }),
)
function w_(s, t) {
  const e = ot({}, C_, s, t)
  return e || null
}
const R_ = F(A, { coordinates: Yo(Th) })
function Uo(s, t) {
  return ot(null, R_, s, t)
}
const ir = F(A, { extrude: L(ni), tessellate: L(ni), altitudeMode: L(Lt) })
function Fh(s, t) {
  const e = ot({}, ir, s, t),
    i = Uo(s, t)
  if (i) {
    const n = new ps(i, "XYZ")
    return n.setProperties(e, !0), n
  }
}
function Oh(s, t) {
  const e = ot({}, ir, s, t),
    i = Uo(s, t)
  if (i) {
    const n = new Me(i, "XYZ", [i.length])
    return n.setProperties(e, !0), n
  }
}
const S_ = F(A, {
  LineString: Ke(Fh),
  LinearRing: Ke(Oh),
  MultiGeometry: Ke(bh),
  Point: Ke(Dh),
  Polygon: Ke(Nh),
})
function bh(s, t) {
  const e = ot([], S_, s, t)
  if (!e) return null
  if (e.length === 0) return new Ei(e)
  let i,
    n = !0
  const r = e[0].getType()
  let o
  for (let a = 1, l = e.length; a < l; ++a)
    if (((o = e[a]), o.getType() != r)) {
      n = !1
      break
    }
  if (n) {
    let a, l
    if (r == "Point") {
      const h = e[0]
      ;(a = h.getLayout()), (l = h.getFlatCoordinates())
      for (let c = 1, u = e.length; c < u; ++c)
        (o = e[c]), tt(l, o.getFlatCoordinates())
      ;(i = new Js(l, a)), Mr(i, e)
    } else if (r == "LineString") (i = new rh(e)), Mr(i, e)
    else if (r == "Polygon") (i = new Ts(e)), Mr(i, e)
    else if (r == "GeometryCollection") i = new Ei(e)
    else throw new Error("Unknown geometry type found")
  } else i = new Ei(e)
  return i
}
function Dh(s, t) {
  const e = ot({}, ir, s, t),
    i = Uo(s, t)
  if (i) {
    const n = new Bi(i, "XYZ")
    return n.setProperties(e, !0), n
  }
}
const T_ = F(A, { innerBoundaryIs: X_, outerBoundaryIs: W_ })
function Nh(s, t) {
  const e = ot({}, ir, s, t),
    i = ot([null], T_, s, t)
  if (i && i[0]) {
    const n = i[0],
      r = [n.length]
    for (let a = 1, l = i.length; a < l; ++a) tt(n, i[a]), r.push(n.length)
    const o = new Me(n, "XYZ", r)
    return o.setProperties(e, !0), o
  }
}
const I_ = F(A, { IconStyle: h_, LabelStyle: u_, LineStyle: f_, PolyStyle: __ })
function Wo(s, t) {
  const e = ot({}, I_, s, t, this)
  if (!e) return null
  let i = "fillStyle" in e ? e.fillStyle : cs
  const n = e.fill
  n !== void 0 && !n && (i = null)
  let r
  "imageStyle" in e ? e.imageStyle != Xo && (r = e.imageStyle) : (r = Jr)
  const o = "textStyle" in e ? e.textStyle : mi,
    a = "strokeStyle" in e ? e.strokeStyle : Qr,
    l = e.outline
  return l !== void 0 && !l
    ? [
        new se({
          geometry: function (h) {
            const c = h.getGeometry(),
              u = c.getType()
            if (u === "GeometryCollection") {
              const d = c
              return new Ei(
                d.getGeometriesArrayRecursive().filter(function (f) {
                  const g = f.getType()
                  return g !== "Polygon" && g !== "MultiPolygon"
                }),
              )
            }
            if (u !== "Polygon" && u !== "MultiPolygon") return c
          },
          fill: i,
          image: r,
          stroke: a,
          text: o,
          zIndex: void 0,
        }),
        new se({
          geometry: function (h) {
            const c = h.getGeometry(),
              u = c.getType()
            if (u === "GeometryCollection") {
              const d = c
              return new Ei(
                d.getGeometriesArrayRecursive().filter(function (f) {
                  const g = f.getType()
                  return g === "Polygon" || g === "MultiPolygon"
                }),
              )
            }
            if (u === "Polygon" || u === "MultiPolygon") return c
          },
          fill: i,
          stroke: null,
          zIndex: void 0,
        }),
      ]
    : [new se({ fill: i, image: r, stroke: a, text: o, zIndex: void 0 })]
}
function Mr(s, t) {
  const e = t.length,
    i = new Array(t.length),
    n = new Array(t.length),
    r = new Array(t.length)
  let o, a, l
  ;(o = !1), (a = !1), (l = !1)
  for (let h = 0; h < e; ++h) {
    const c = t[h]
    ;(i[h] = c.get("extrude")),
      (n[h] = c.get("tessellate")),
      (r[h] = c.get("altitudeMode")),
      (o = o || i[h] !== void 0),
      (a = a || n[h] !== void 0),
      (l = l || r[h])
  }
  o && s.set("extrude", i),
    a && s.set("tessellate", n),
    l && s.set("altitudeMode", r)
}
const v_ = F(A, { displayName: L(Lt), value: L(Lt) })
function L_(s, t) {
  const e = s.getAttribute("name")
  en(v_, s, t)
  const i = t[t.length - 1]
  e && i.displayName
    ? (i[e] = {
        value: i.value,
        displayName: i.displayName,
        toString: function () {
          return i.value
        },
      })
    : e !== null
      ? (i[e] = i.value)
      : i.displayName !== null && (i[i.displayName] = i.value),
    delete i.value
}
const A_ = F(A, { Data: L_, SchemaData: b_ })
function kh(s, t) {
  en(A_, s, t)
}
function Gh(s, t) {
  en(Rh, s, t)
}
const M_ = F(A, { Style: L(Wo), key: L(Lt), styleUrl: L(vh) })
function P_(s, t) {
  const e = ot({}, M_, s, t, this)
  if (!e) return
  const i = e.key
  if (i && i == "normal") {
    const n = e.styleUrl
    n && (t[t.length - 1] = n)
    const r = e.Style
    r && (t[t.length - 1] = r)
  }
}
function F_(s, t) {
  const e = Ah.call(this, s, t)
  if (!e) return
  const i = t[t.length - 1]
  if (Array.isArray(e)) i.Style = e
  else if (typeof e == "string") i.styleUrl = e
  else throw new Error("`styleMapValue` has an unknown type")
}
const O_ = F(A, { SimpleData: D_ })
function b_(s, t) {
  en(O_, s, t)
}
function D_(s, t) {
  const e = s.getAttribute("name")
  if (e !== null) {
    const i = Lt(s),
      n = t[t.length - 1]
    n[e] = i
  }
}
const N_ = F(A, {
  altitudeMode: L(Lt),
  minAltitude: L(ct),
  maxAltitude: L(ct),
  north: L(ct),
  south: L(ct),
  east: L(ct),
  west: L(ct),
})
function k_(s, t) {
  const e = ot({}, N_, s, t)
  if (!e) return
  const i = t[t.length - 1],
    n = [
      parseFloat(e.west),
      parseFloat(e.south),
      parseFloat(e.east),
      parseFloat(e.north),
    ]
  ;(i.extent = n),
    (i.altitudeMode = e.altitudeMode),
    (i.minAltitude = parseFloat(e.minAltitude)),
    (i.maxAltitude = parseFloat(e.maxAltitude))
}
const G_ = F(A, {
  minLodPixels: L(ct),
  maxLodPixels: L(ct),
  minFadeExtent: L(ct),
  maxFadeExtent: L(ct),
})
function z_(s, t) {
  const e = ot({}, G_, s, t)
  if (!e) return
  const i = t[t.length - 1]
  ;(i.minLodPixels = parseFloat(e.minLodPixels)),
    (i.maxLodPixels = parseFloat(e.maxLodPixels)),
    (i.minFadeExtent = parseFloat(e.minFadeExtent)),
    (i.maxFadeExtent = parseFloat(e.maxFadeExtent))
}
const Y_ = F(A, { LinearRing: Ke(Mh) })
function X_(s, t) {
  const e = ot([], Y_, s, t)
  e.length > 0 && t[t.length - 1].push(...e)
}
const U_ = F(A, { LinearRing: Yo(Mh) })
function W_(s, t) {
  const e = ot(void 0, U_, s, t)
  if (e) {
    const i = t[t.length - 1]
    i[0] = e
  }
}
function Z_(s, t) {
  en($g, s, t)
}
function B_(s, t) {
  const i = t[t.length - 1].whens,
    n = De(s, !1),
    r = Date.parse(n)
  i.push(isNaN(r) ? 0 : r)
}
function nr(s, t) {
  const e = Ki(t),
    n = [(e.length == 4 ? e[3] : 1) * 255, e[2], e[1], e[0]]
  for (let r = 0; r < 4; ++r) {
    const o = Math.floor(n[r]).toString(16)
    n[r] = o.length == 1 ? "0" + o : o
  }
  ie(s, n.join(""))
}
function K_(s, t, e) {
  const i = e[e.length - 1],
    n = i.layout,
    r = i.stride
  let o
  if (n == "XY" || n == "XYM") o = 2
  else if (n == "XYZ" || n == "XYZM") o = 3
  else throw new Error("Invalid geometry layout")
  const a = t.length
  let l = ""
  if (a > 0) {
    l += t[0]
    for (let h = 1; h < o; ++h) l += "," + t[h]
    for (let h = r; h < a; h += r) {
      l += " " + t[h]
      for (let c = 1; c < o; ++c) l += "," + t[h + c]
    }
  }
  ie(s, l)
}
const us = F(A, { Data: D(V_), value: D(H_), displayName: D(j_) })
function V_(s, t, e) {
  s.setAttribute("name", t.name)
  const i = { node: s },
    n = t.value
  typeof n == "object"
    ? (n !== null &&
        n.displayName &&
        _t(i, us, qt, [n.displayName], e, ["displayName"]),
      n !== null && n.value && _t(i, us, qt, [n.value], e, ["value"]))
    : _t(i, us, qt, [n], e, ["value"])
}
function j_(s, t) {
  Vg(s, t)
}
function H_(s, t) {
  ie(s, t)
}
const q_ = F(A, { Placemark: D(Xh) }),
  $_ = function (s, t, e) {
    const i = t[t.length - 1].node
    return Kn(i.namespaceURI, "Placemark")
  }
function J_(s, t, e) {
  _t({ node: s }, q_, $_, t, e, void 0, this)
}
const Q_ = Ne("Data")
function tm(s, t, e) {
  const i = { node: s },
    n = t.names,
    r = t.values,
    o = n.length
  for (let a = 0; a < o; a++) _t(i, us, Q_, [{ name: n[a], value: r[a] }], e)
}
const Ja = F(A, ["href"], F(ke, ["x", "y", "w", "h"])),
  Qa = F(A, { href: D(ie) }, F(ke, { x: D(_i), y: D(_i), w: D(_i), h: D(_i) })),
  em = function (s, t, e) {
    return Kn(ke[0], "gx:" + e)
  }
function im(s, t, e) {
  const i = { node: s },
    n = e[e.length - 1].node
  let r = Ja[n.namespaceURI],
    o = oe(t, r)
  _t(i, Qa, qt, o, e, r),
    (r = Ja[ke[0]]),
    (o = oe(t, r)),
    _t(i, Qa, em, o, e, r)
}
const nm = F(A, ["scale", "heading", "Icon", "color", "hotSpot"]),
  sm = F(A, {
    Icon: D(im),
    color: D(nr),
    heading: D(_i),
    hotSpot: D(Pm),
    scale: D(Wh),
  })
function rm(s, t, e) {
  const i = { node: s },
    n = {},
    r = t.getSrc(),
    o = t.getSize(),
    a = t.getImageSize(),
    l = { href: r }
  if (o) {
    ;(l.w = o[0]), (l.h = o[1])
    const m = t.getAnchor(),
      p = t.getOrigin()
    if (
      (p &&
        a &&
        p[0] !== 0 &&
        p[1] !== o[1] &&
        ((l.x = p[0]), (l.y = a[1] - (p[1] + o[1]))),
      m && (m[0] !== o[0] / 2 || m[1] !== o[1] / 2))
    ) {
      const y = { x: m[0], xunits: "pixels", y: o[1] - m[1], yunits: "pixels" }
      n.hotSpot = y
    }
  }
  n.Icon = l
  let h = t.getScaleArray()[0],
    c = o
  if ((c === null && (c = wn), c.length == 2)) {
    const m = Ls(c)
    h = h / m
  }
  h !== 1 && (n.scale = h)
  const u = t.getRotation()
  u !== 0 && (n.heading = u)
  const d = t.getColor()
  d && (n.color = d)
  const f = e[e.length - 1].node,
    g = nm[f.namespaceURI],
    _ = oe(n, g)
  _t(i, sm, qt, _, e, g)
}
const om = F(A, ["color", "scale"]),
  am = F(A, { color: D(nr), scale: D(Wh) })
function lm(s, t, e) {
  const i = { node: s },
    n = {},
    r = t.getFill()
  r && (n.color = r.getColor())
  const o = t.getScale()
  o && o !== 1 && (n.scale = o)
  const a = e[e.length - 1].node,
    l = om[a.namespaceURI],
    h = oe(n, l)
  _t(i, am, qt, h, e, l)
}
const hm = F(A, ["color", "width"]),
  cm = F(A, { color: D(nr), width: D(_i) })
function um(s, t, e) {
  const i = { node: s },
    n = { color: t.getColor(), width: Number(t.getWidth()) || 1 },
    r = e[e.length - 1].node,
    o = hm[r.namespaceURI],
    a = oe(n, o)
  _t(i, cm, qt, a, e, o)
}
const dm = {
    Point: "Point",
    LineString: "LineString",
    LinearRing: "LinearRing",
    Polygon: "Polygon",
    MultiPoint: "MultiGeometry",
    MultiLineString: "MultiGeometry",
    MultiPolygon: "MultiGeometry",
    GeometryCollection: "MultiGeometry",
  },
  zh = function (s, t, e) {
    if (s) {
      const i = t[t.length - 1].node
      return Kn(i.namespaceURI, dm[s.getType()])
    }
  },
  fm = Ne("Point"),
  gm = Ne("LineString"),
  _m = Ne("LinearRing"),
  mm = Ne("Polygon"),
  pm = F(A, {
    LineString: D(Yi),
    Point: D(Yi),
    Polygon: D(Uh),
    GeometryCollection: D(Yh),
  })
function Yh(s, t, e) {
  const i = { node: s },
    n = t.getType()
  let r = [],
    o
  if (n === "GeometryCollection")
    t.getGeometriesArrayRecursive().forEach(function (a) {
      const l = a.getType()
      if (l === "MultiPoint") r = r.concat(a.getPoints())
      else if (l === "MultiLineString") r = r.concat(a.getLineStrings())
      else if (l === "MultiPolygon") r = r.concat(a.getPolygons())
      else if (l === "Point" || l === "LineString" || l === "Polygon") r.push(a)
      else throw new Error("Unknown geometry type")
    }),
      (o = zh)
  else if (n === "MultiPoint") (r = t.getPoints()), (o = fm)
  else if (n === "MultiLineString") (r = t.getLineStrings()), (o = gm)
  else if (n === "MultiPolygon") (r = t.getPolygons()), (o = mm)
  else throw new Error("Unknown geometry type")
  _t(i, pm, o, r, e)
}
const ym = F(A, { LinearRing: D(Yi) })
function tl(s, t, e) {
  _t({ node: s }, ym, _m, [t], e)
}
const Pr = F(A, {
    ExtendedData: D(tm),
    MultiGeometry: D(Yh),
    LineString: D(Yi),
    LinearRing: D(Yi),
    Point: D(Yi),
    Polygon: D(Uh),
    Style: D(Mm),
    address: D(ie),
    description: D(ie),
    name: D(ie),
    open: D(Hi),
    phoneNumber: D(ie),
    styleUrl: D(ie),
    visibility: D(Hi),
  }),
  Em = F(A, [
    "name",
    "open",
    "visibility",
    "address",
    "phoneNumber",
    "description",
    "styleUrl",
    "Style",
  ]),
  xm = Ne("ExtendedData")
function Xh(s, t, e) {
  const i = { node: s }
  t.getId() && s.setAttribute("id", t.getId())
  const n = t.getProperties(),
    r = {
      address: 1,
      description: 1,
      name: 1,
      open: 1,
      phoneNumber: 1,
      styleUrl: 1,
      visibility: 1,
    }
  r[t.getGeometryName()] = 1
  const o = Object.keys(n || {})
      .sort()
      .filter(function (f) {
        return !r[f]
      }),
    a = t.getStyleFunction()
  if (a) {
    const f = a(t, 0)
    if (f) {
      const g = Array.isArray(f) ? f : [f]
      let _ = g
      if (
        (t.getGeometry() &&
          (_ = g.filter(function (m) {
            const p = m.getGeometryFunction()(t)
            if (p) {
              const y = p.getType()
              return y === "GeometryCollection"
                ? p.getGeometriesArrayRecursive().filter(function (x) {
                    const E = x.getType()
                    return E === "Point" || E === "MultiPoint"
                  }).length
                : y === "Point" || y === "MultiPoint"
            }
          })),
        this.writeStyles_)
      ) {
        let m = g,
          p = g
        t.getGeometry() &&
          ((m = g.filter(function (y) {
            const x = y.getGeometryFunction()(t)
            if (x) {
              const E = x.getType()
              return E === "GeometryCollection"
                ? x.getGeometriesArrayRecursive().filter(function (C) {
                    const T = C.getType()
                    return T === "LineString" || T === "MultiLineString"
                  }).length
                : E === "LineString" || E === "MultiLineString"
            }
          })),
          (p = g.filter(function (y) {
            const x = y.getGeometryFunction()(t)
            if (x) {
              const E = x.getType()
              return E === "GeometryCollection"
                ? x.getGeometriesArrayRecursive().filter(function (C) {
                    const T = C.getType()
                    return T === "Polygon" || T === "MultiPolygon"
                  }).length
                : E === "Polygon" || E === "MultiPolygon"
            }
          }))),
          (n.Style = { pointStyles: _, lineStyles: m, polyStyles: p })
      }
      if (_.length && n.name === void 0) {
        const m = _[0].getText()
        m && (n.name = m.getText())
      }
    }
  }
  const l = e[e.length - 1].node,
    h = Em[l.namespaceURI],
    c = oe(n, h)
  if ((_t(i, Pr, qt, c, e, h), o.length > 0)) {
    const f = oe(n, o)
    _t(i, Pr, xm, [{ names: o, values: f }], e)
  }
  const u = e[0]
  let d = t.getGeometry()
  d && (d = Ch(d, !0, u)), _t(i, Pr, zh, [d], e)
}
const Cm = F(A, ["extrude", "tessellate", "altitudeMode", "coordinates"]),
  wm = F(A, {
    extrude: D(Hi),
    tessellate: D(Hi),
    altitudeMode: D(ie),
    coordinates: D(K_),
  })
function Yi(s, t, e) {
  const i = t.getFlatCoordinates(),
    n = { node: s }
  ;(n.layout = t.getLayout()), (n.stride = t.getStride())
  const r = t.getProperties()
  r.coordinates = i
  const o = e[e.length - 1].node,
    a = Cm[o.namespaceURI],
    l = oe(r, a)
  _t(n, wm, qt, l, e, a)
}
const Rm = F(A, ["color", "fill", "outline"]),
  el = F(A, { outerBoundaryIs: D(tl), innerBoundaryIs: D(tl) }),
  Sm = Ne("innerBoundaryIs"),
  Tm = Ne("outerBoundaryIs")
function Uh(s, t, e) {
  const i = t.getLinearRings(),
    n = i.shift(),
    r = { node: s }
  _t(r, el, Sm, i, e), _t(r, el, Tm, [n], e)
}
const Im = F(A, { color: D(nr), fill: D(Hi), outline: D(Hi) })
function vm(s, t, e) {
  const i = { node: s },
    n = t.getFill(),
    r = t.getStroke(),
    o = {
      color: n ? n.getColor() : void 0,
      fill: n ? void 0 : !1,
      outline: r ? void 0 : !1,
    },
    a = e[e.length - 1].node,
    l = Rm[a.namespaceURI],
    h = oe(o, l)
  _t(i, Im, qt, h, e, l)
}
function Wh(s, t) {
  _i(s, Math.round(t * 1e6) / 1e6)
}
const Lm = F(A, ["IconStyle", "LabelStyle", "LineStyle", "PolyStyle"]),
  Am = F(A, {
    IconStyle: D(rm),
    LabelStyle: D(lm),
    LineStyle: D(um),
    PolyStyle: D(vm),
  })
function Mm(s, t, e) {
  const i = { node: s },
    n = {}
  if (t.pointStyles.length) {
    const l = t.pointStyles[0].getText()
    l && (n.LabelStyle = l)
    const h = t.pointStyles[0].getImage()
    h && typeof h.getSrc == "function" && (n.IconStyle = h)
  }
  if (t.lineStyles.length) {
    const l = t.lineStyles[0].getStroke()
    l && (n.LineStyle = l)
  }
  if (t.polyStyles.length) {
    const l = t.polyStyles[0].getStroke()
    l && !n.LineStyle && (n.LineStyle = l), (n.PolyStyle = t.polyStyles[0])
  }
  const r = e[e.length - 1].node,
    o = Lm[r.namespaceURI],
    a = oe(n, o)
  _t(i, Am, qt, a, e, o)
}
function Pm(s, t) {
  s.setAttribute("x", String(t.x)),
    s.setAttribute("y", String(t.y)),
    s.setAttribute("xunits", t.xunits),
    s.setAttribute("yunits", t.yunits)
}
function Fm(s) {
  return ks(s, 5)
}
function gn(s) {
  return parseFloat(s)
}
function _n(s) {
  return Fm(s).toString()
}
function As(s, t) {
  return isNaN(s) ? !1 : s !== gn(_n(t))
}
function Om(s, t) {
  return As(s[0], t[0]) || As(s[1], t[1])
}
class bm extends tn {
  constructor(t) {
    super(),
      (t = Object.assign(
        {
          animate: !0,
          params: ["x", "y", "z", "r", "l"],
          replace: !1,
          prefix: "",
        },
        t || {},
      ))
    let e
    t.animate === !0
      ? (e = { duration: 250 })
      : t.animate
        ? (e = t.animate)
        : (e = null),
      (this.animationOptions_ = e),
      (this.params_ = t.params.reduce((i, n) => ((i[n] = !0), i), {})),
      (this.replace_ = t.replace),
      (this.prefix_ = t.prefix),
      (this.listenerKeys_ = []),
      (this.initial_ = !0),
      (this.updateState_ = this.updateState_.bind(this)),
      (this.trackedCallbacks_ = {}),
      (this.trackedValues_ = {})
  }
  getParamName_(t) {
    return this.prefix_ ? this.prefix_ + t : t
  }
  get_(t, e) {
    return t.get(this.getParamName_(e))
  }
  set_(t, e, i) {
    e in this.params_ && t.set(this.getParamName_(e), i)
  }
  delete_(t, e) {
    e in this.params_ && t.delete(this.getParamName_(e))
  }
  setMap(t) {
    const e = this.getMap()
    super.setMap(t),
      t !== e &&
        (e && this.unregisterListeners_(e),
        t &&
          ((this.initial_ = !0),
          this.updateState_(),
          this.registerListeners_(t)))
  }
  registerListeners_(t) {
    this.listenerKeys_.push(
      H(t, Te.MOVEEND, this.updateUrl_, this),
      H(t.getLayerGroup(), U.CHANGE, this.updateUrl_, this),
      H(t, "change:layergroup", this.handleChangeLayerGroup_, this),
    ),
      this.replace_ || addEventListener("popstate", this.updateState_)
  }
  unregisterListeners_(t) {
    for (let n = 0, r = this.listenerKeys_.length; n < r; ++n)
      lt(this.listenerKeys_[n])
    ;(this.listenerKeys_.length = 0),
      this.replace_ || removeEventListener("popstate", this.updateState_)
    const e = new URL(window.location.href),
      i = e.searchParams
    this.delete_(i, "x"),
      this.delete_(i, "y"),
      this.delete_(i, "z"),
      this.delete_(i, "r"),
      this.delete_(i, "l"),
      window.history.replaceState(null, "", e)
  }
  handleChangeLayerGroup_() {
    const t = this.getMap()
    t &&
      (this.unregisterListeners_(t),
      this.registerListeners_(t),
      (this.initial_ = !0),
      this.updateUrl_())
  }
  updateState_() {
    const e = new URL(window.location.href).searchParams
    for (const d in this.trackedCallbacks_) {
      const f = e.get(d)
      d in this.trackedCallbacks_ &&
        f !== this.trackedValues_[d] &&
        ((this.trackedValues_[d] = f), this.trackedCallbacks_[d](f))
    }
    const i = this.getMap()
    if (!i) return
    const n = i.getView()
    if (!n) return
    let r = !1
    const o = {},
      a = gn(this.get_(e, "z"))
    "z" in this.params_ && As(a, n.getZoom()) && ((r = !0), (o.zoom = a))
    const l = gn(this.get_(e, "r"))
    "r" in this.params_ &&
      As(l, n.getRotation()) &&
      ((r = !0), (o.rotation = l))
    const h = [gn(this.get_(e, "x")), gn(this.get_(e, "y"))]
    ;("x" in this.params_ || "y" in this.params_) &&
      Om(h, n.getCenter()) &&
      ((r = !0), (o.center = h)),
      r &&
        (!this.initial_ && this.animationOptions_
          ? n.animate(Object.assign(o, this.animationOptions_))
          : (o.center && n.setCenter(o.center),
            "zoom" in o && n.setZoom(o.zoom),
            "rotation" in o && n.setRotation(o.rotation)))
    const c = i.getAllLayers(),
      u = this.get_(e, "l")
    if ("l" in this.params_ && u && u.length === c.length)
      for (let d = 0, f = c.length; d < f; ++d) {
        const g = parseInt(u[d])
        if (!isNaN(g)) {
          const _ = !!g,
            m = c[d]
          m.getVisible() !== _ && m.setVisible(_)
        }
      }
  }
  track(t, e) {
    this.trackedCallbacks_[t] = e
    const r = new URL(window.location.href).searchParams.get(t)
    return (this.trackedValues_[t] = r), r
  }
  update(t, e) {
    const i = new URL(window.location.href),
      n = i.searchParams
    e === null ? n.delete(t) : n.set(t, e),
      t in this.trackedValues_ && (this.trackedValues_[t] = e),
      this.updateHistory_(i)
  }
  updateUrl_() {
    const t = this.getMap()
    if (!t) return
    const e = t.getView()
    if (!e) return
    const i = e.getCenter(),
      n = e.getZoom(),
      r = e.getRotation(),
      o = t.getAllLayers(),
      a = new Array(o.length)
    for (let c = 0, u = o.length; c < u; ++c)
      a[c] = o[c].getVisible() ? "1" : "0"
    const l = new URL(window.location.href),
      h = l.searchParams
    this.set_(h, "x", _n(i[0])),
      this.set_(h, "y", _n(i[1])),
      this.set_(h, "z", _n(n)),
      this.set_(h, "r", _n(r)),
      this.set_(h, "l", a.join("")),
      this.updateHistory_(l),
      (this.initial_ = !1)
  }
  updateHistory_(t) {
    t.href !== window.location.href &&
      (this.initial_ || this.replace_
        ? window.history.replaceState(history.state, "", t)
        : window.history.pushState(null, "", t))
  }
}
const il = new Oe({ color: "rgba(255,0,0,1)" }),
  nl = new ii({ color: "#000000", width: 1 }),
  Dm = [
    new se({
      image: new Xn({ fill: il, stroke: nl, radius: 5 }),
      fill: il,
      stroke: nl,
    }),
  ],
  Zh = new cg({
    target: "map",
    layers: [new Sg({ source: new Yg() })],
    view: new he({ center: [0, 0], zoom: 1 }),
  }),
  Bh = new xf({
    url: "/assets/docs/trans-canada-2024.kml",
    format: new n_({ extractStyles: !1 }),
  })
function Nm() {
  const s = [],
    t = Bh.getFeatures()
      .map(e => e.values_.geometry.flatCoordinates)
      .reduce((e, i) => e.concat(i), [])
  for (; t.length; ) {
    const [e, i, n] = t.splice(0, 3)
    s.push(new Mc([e, i]))
  }
  return s
}
window.convertCoordsToLonLat = Nm
Zh.addLayer(new _f({ source: Bh, style: Dm }))
Zh.addInteraction(new bm())
//# sourceMappingURL=index-CDvpP7Ak.js.map
