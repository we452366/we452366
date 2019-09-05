const fs = require('fs')
const EventEmits = require('events')
class WriteStream extends EventEmits {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.encoding = options.encoding || 'utf8'
    this.mode = options.mode || 0o666
    this.highWaterMark = options.highWaterMark || 16 * 1024
    this.start = options.start || 0
    this.autoClose = Object.prototype.toString.call(options.autoClose) === '[object Boolean]' ? options.autoClose : true

    this.fd = null
    this.cache = [] //缓存区
    this.cacheLen = 0 //缓存区长度
    this.writting = false //是否正在写
    this.writeOffset = 0; //写入偏移量
    this.needDrain = false; //是否出发drain方法
    this.closed = false
    this.open()
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd
      this.emit('open', fd)
    })
  }
  write(chunk, encoding = this.encoding, callback) {
    //chunk的类型，String或Buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.cacheLen = this.cacheLen += chunk.length;
    let ok = this.cacheLen < this.highWaterMark;
    this.needDrain = !ok
    if (this.writting) {
      //如果正在写入，将写入的内容添加到缓存区中
      this.cache.push({
        chunk,
        encoding,
        callback,
        closed:this.closed
      })
    } else {
      //只有第一次写入才会真的写入
      this.writting = true
      this._write(chunk, encoding, () => {
        callback && callback()
        this.clearBuffer()
      })
    }
    return ok
  }
  _write(chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', (fd) => {
        this._write(chunk, encoding, callback)
      })
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.writeOffset, (err, bytesWritten) => {
      this.cacheLen -= bytesWritten
      this.writeOffset += bytesWritten
      callback()
    })
  }
  clearBuffer() {
    let data = this.cache.shift()
    if (data) {
      this._write(data.chunk, data.encoding, () => {
        data.callback && data.callback()
        !data.closed && this.clearBuffer()
        data.closed && this.close()
      })
    } else {
      if (this.needDrain) {
        this.needDrain = false
        this.writting = false;
        this.emit('drain')
      }
    }
  }
  close() {
    if (this.autoClose && this.closed) {
      fs.close(this.fd, () => {
        this.emit('close')
      })
    }
  }
  end(chunk, encoding, callback) {
    this.closed = true    
    this.write(chunk, encoding, callback)
  }
}
module.exports = WriteStream