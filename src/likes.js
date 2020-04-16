import { writable } from 'svelte/store'

export class GunCounter {
    constructor(name, gun, id) {
      this.id = id
      this.gun = gun
      this.name = name
      this.localStore = writable(0)
      this.localStore.subscribe(data => {
        this.current = data
      })
      this.gun.get(name + '/' + location.hash.slice(1)).get(this.id).get('likes').on(data => {
        if (data.value !== this.current) {
          this.localStore.set(data)
        }
      })
      console.log(name, id)
    }

    subscribe(cb) {
      return this.localStore.subscribe(cb)
    } 
  
    set(value) {
    this.gun.get(name + '/' + location.hash.slice(1)).get(this.id).get('likes').put(value)
    console.log(value)
      return this.localStore.set(value)
    }
  }


