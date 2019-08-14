import localforage from 'localforage'
import { format } from 'date-fns'
import log from '../logger'

const FAKE_LATENCY = false
const LF_KEY = 'data'

const OPERATORS = {
    "==": (field, value) => field === value,
    "<": (field, value) => field < value,
    ">": (field, value) => field > value,
    "<=": (field, value) => field <= value,
    ">=": (field, value) => field >= value
}

const subscriptions = {
    doc: {}, // { [path]: [callback] }
    collection: {}
  }
  
  function addSubscription(type, path, callback) {
    log.debug('localStorage.db.js - addSubscription()')
    const subs = subscriptions[type]
    ;(subs[path] || (subs[path] = [])).push(callback)
  }
  
  function removeSubscription(type, path, callback) {
    log.debug('localStorage.db.js - removeSubscription()')
    const subs = subscriptions[type][path]
    subs.splice(subs.indexOf(callback), 1)
  }
  
  function notify(type, path, action) {
    log.debug('localStorage.db.js - notify()')
    const subs = subscriptions[type][path]
    if (subs) {
      subs.forEach(callback => callback(action))
    }
}

// Method implements what gets returned from firebase
// https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot.html
const makeWeirdDoc = (record, id) => {
  log.debug('localStorage.db.js - makeWeirdDoc()')
    const data = () => record
    return { id, data, exists: !!record }
}

///////////////////////////////////////////

const noop = () => {}
let onAuthChangeHandler = noop

export function auth() {
    log.debug('localStorage.db.js - auth()')
    function onAuthStateChanged(handler) {
      log.debug('localStorage.db.js - auth().onAuthStateChanged(handler)', handler)
      onAuthChangeHandler = handler
      localforage.getItem("auth").then(auth => {
          if (auth) {
            handler(auth)
          } else {
            localforage.removeItem("auth")
            handler(null)
          }
      })
      return () => (onAuthChangeHandler = noop)
    }

    async function createUserWithEmailAndPassword(email, password) {
      log.debug('localStorage.db.js - auth().createUserWithEmailAndPassword(email, password', email, password)
        const auth = { uid: "guest" }
        await populateLocalForage(auth)
        await localforage.setItem("auth", auth)
        await localforage.setItem("server:auth", auth)
        onAuthChangeHandler(auth)
        const user = { ...auth }
        user.updateProfile = async updates => {
            log.debug('localStorage.db.js - auth().createUserWithEmailAndPassword(email, password).updateProfile(callback)')
            const auth = await localforage.getItem("auth")
            const newAuth = { ...auth, ...updates }
            await localforage.setItem("auth", newAuth)
            await localforage.setItem("server:auth", auth)
            return newAuth
        }
        return { user: user }
    }

    async function signInWithEmailAndPassword() {
        log.debug('localStorage.db.js - auth().signInWithEmailAndPassword')
        const auth = await localforage.getItem("server:auth")
        // Same error that would be thrown if user note found in Firebase
        // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#sign-inwith-email-and-password
        if (auth === null) {
          const error = { code: 'auth/user-not-found', message: 'User not found' }
          throw error
        }
        await localforage.setItem("auth", auth)
        onAuthChangeHandler(auth)
    }

    async function signOut() {
      log.debug('localStorage.db.js - auth().signOut()')
      await localforage.removeItem("auth")
      onAuthChangeHandler(null)
    }

    return {
        onAuthStateChanged,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut
    }
}

///////////////////////////////////////////

export function collection(path) {
  log.debug('localStorage.db.js - collection(path)', path)
    const methods = {
      onSnapshot,
      where,
      limit,
      orderBy,
      add,
      get
    }
  
    let queries = []
    let _limit = null
    let _orderBy = null
    let orderByDirection = "asc"
  
    const makeWeirdSnapshot = values => {
      log.debug('localStorage.db.js - collection().makeWeirdSnapshot()')
      const keys = Object.keys(values)
  
      function forEach(iterator) {
        keys.forEach(id => {
          const value = values[id]
          const data = () => value
          const doc = { data, id }
          iterator(doc)
        })
      }
  
      return { forEach, size: keys.length }
    }
  
    const matchesQueries = record =>
      queries.every(([field, operator, test]) =>
        OPERATORS[operator](record[field], test)
      )
  
    const getPathRecords = lfData => {
      log.debug('localStorage.db.js - collection().getPathRecords()')
      const all = getObjValue(path, lfData)
      let ids = []
      ids = Object.keys(all).filter(key => matchesQueries(all[key]))
  
      if (_orderBy) {
        ids = ids.sort((a, b) => {
          const x = all[a][_orderBy]
          const y = all[b][_orderBy]
          const one = orderByDirection === "desc" ? -1 : 1
          return x < y ? -one : x > y ? one : 0
        })
      }
  
      if (_limit) {
        ids = ids.slice(0, _limit)
      }
  
      const records = ids.reduce((obj, id) => {
        obj[id] = all[id]
        return obj
      }, {})
      return records
    }
  
    async function get() {
      log.debug('localStorage.db.js - collection().get()')
      const lfData = await localforage.getItem(LF_KEY)
      const records = getPathRecords(lfData)
      const snapshot = makeWeirdSnapshot(records)
      await fakeLatency()
      return snapshot
    }
  
    function where(...query) {
      log.debug('localStorage.db.js - collection().where()')
      queries.push(query)
      return methods
    }
  
    function limit(n) {
      log.debug('localStorage.db.js - collection().limit()')
      _limit = n
      return methods
    }
  
    function orderBy(field, direction = "asc") {
      log.debug('localStorage.db.js - collection().orderBy()')
      _orderBy = field
      orderByDirection = direction
      return methods
    }
  
    async function add(record) {
      log.debug('localStorage.db.js - collection().add()')
      const lfData = await localforage.getItem(LF_KEY)
      const values = getObjValue(path, lfData)
      const id = genId()
      values[id] = record
      await localforage.setItem(LF_KEY, lfData)
      notify("collection", path, {
        type: "ADD",
        lfData,
        record
      })
      return doc(`${path}/${id}`)
    }
  
    function onSnapshot(callback) {
      log.debug('localStorage.db.js - collection().onSnapshot()')
      const subscription = async action => {
        switch (action.type) {
          case "INIT": {
            const lfData = await localforage.getItem(LF_KEY)
            const records = getPathRecords(lfData)
            const snapshot = makeWeirdSnapshot(records)
            await fakeLatency()
            callback(snapshot)
            break
          }
          case "ADD":
          case "UPDATE":
          case "DELETE": {
            if (!matchesQueries(action.record)) return
            const records = getPathRecords(action.lfData)
            const snapshot = makeWeirdSnapshot(records)
            await fakeLatency()
            callback(snapshot)
            break
          }
          default: {
          }
        }
      }
      addSubscription("collection", path, subscription)
      subscription({ type: "INIT" })
      return () => {
        callback = noop
        removeSubscription("collection", path, subscription)
      }
    }
  
    return methods
}
  
export function doc(path) {
  log.debug('localStorage.db.js - doc(path)', path)
    function onSnapshot(callback) {
      // don't want to return a promise to useEffect, so weird IIFE
      ;(async () => {
        const doc = await getRecordAsWeirdDoc()
        await fakeLatency()
        callback(doc)
      })()
      return () => {
        callback = noop
      }
    }
  
    async function get() {
      log.debug('localStorage.db.js - doc().get()')
      await fakeLatency()
      return getRecordAsWeirdDoc()
    }
  
    async function set(updates) {
      log.debug('localStorage.db.js - doc().set(updates)', updates)
      const segments = path.split("/")
      const lfData = await localforage.getItem(LF_KEY)
      const id = segments[segments.length - 1]
      const collectionSegments = segments.slice(0, segments.length - 1)
      const collectionPath = collectionSegments.join("")
      const collection = getObjValue(collectionPath, lfData)
      const record = collection[id]
      collection[id] = { ...record, ...updates }
      await localforage.setItem(LF_KEY, lfData)
      await fakeLatency()
      notify("collection", collectionPath, {
        type: "UPDATE",
        lfData,
        record
      })
    }
  
    async function _delete() {
      log.debug('localStorage.db.js - doc()._delete()')
      const segments = path.split("/")
      const lfData = await localforage.getItem(LF_KEY)
      const id = segments[segments.length - 1]
      const collectionSegments = segments.slice(0, segments.length - 1)
      const collectionPath = collectionSegments.join("")
      const collection = getObjValue(collectionPath, lfData)
      const record = collection[id]
      delete collection[id]
      await localforage.setItem(LF_KEY, lfData)
      await fakeLatency()
      notify("collection", collectionPath, {
        type: "DELETE",
        lfData,
        record
      })
    }
  
    const getRecordAsWeirdDoc = async () => {
      log.debug('localStorage.db.js - doc().getRecordAsWeirdDoc()')
      const lfData = await localforage.getItem(LF_KEY)
      const record = getObjValue(path, lfData)
      const id = getPathId(path)
      return makeWeirdDoc(record, id)
    }
  
    return { get, set, onSnapshot, delete: _delete }
}

////////////////////////////////////////////////////////////////////////////////
async function populateLocalForage(user) {
  log.debug('localStorage.db.js - populateLocalForage(user)', user)
  const now = Date.now()
  // const hour = 3600000
  // const day = hour * 24

  // users collection that is populated when 
  // a user is created by logging in with the
  // auth.createUserWithEmailAndPassword
  const users = {
    [user.uid]: {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: '',
      // email: '',     Might need to implement at a later date
      // password: '',
      joined: format(now, 'yyyy-MM-dd')
    }
  }

  await localforage.setItem(LF_KEY, { users })
}

const genId = () =>
  Math.random()
    .toString(32)
    .substr(2)

const getObjValue = (path, obj) =>
  path.split("/").reduce((o, segment) => o[segment], obj)

const getPathId = path => path.split("/").reverse()[0]

let nextLatency
const fakeLatency = () => {
  log.debug('localStorage.db.js - fakeLatency()')
  if (FAKE_LATENCY) {
    return (
      nextLatency ||
      (nextLatency = new Promise(resolve => {
        setTimeout(() => {
          nextLatency = null
          resolve()
        }, Math.random() * 1000)
      }))
    )
  } else {
    return Promise.resolve()
  }
}

export const db = { collection, doc }