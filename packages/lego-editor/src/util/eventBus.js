class EventEmitter {
  constructor() {
    this.cache = {}
  }

    /**
     * 订阅
     * @param {string} eventname
     * @param {function} fn
     */
    on = (name, fn) => {
      this.cache[name] = fn
    };

    /**
     * 发布
     * @param {string} eventname
     */
    emit = (name, ...args) => {
      if (this.cache[name]) this.cache[name](...args)
    };

    /**
     * 取消
     * @param {string} name
     * @param {function} fn
     */
    off = (name, fn) => {
      const tasks = this.cache[name]
      if (tasks) {
        const index = tasks.findIndex((f) => f === fn || f.callback === fn)
        if (index >= 0) {
          tasks.splice(index, 1)
        }
      }
    };
}

export default new EventEmitter()
