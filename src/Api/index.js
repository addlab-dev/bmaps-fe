import axios from 'axios'
import { get } from 'lodash'

const getCustomErr = (err) => {
  return {
    status: get(err, 'response.status', 0),
    statusText: get(err, 'response.statusText', 'Error'),
    data: get(err, 'response.data', {}),
  }
}

class ApiBase {
  constructor(config = {}, instance = null) {
    this.config = config
    this.instance = instance
  }

  async init(config = {}) {
    return new Promise((resolve, reject) => {
      this.config = config

      if (this.config.baseURL !== undefined) {
        this.instance = axios.create({
          baseURL: this.config.baseURL,
        })
      } else {
        throw new Error('baseURL undefined')
      }

      try {
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  async setAccessToken(token = null) {
    return new Promise((resolve, reject) => {
      if (!token) {
        throw new Error('token undefined')
      }

      if (typeof token !== 'string') {
        return new Error('You must provide a valid token')
      }

      this.instance.defaults.headers.common.Authorization = `Bearer ${token}`

      try {
        resolve()
        return null
      } catch (err) {
        reject(err)
        return null
      }
    })
  }

  get(url, params) {
    return this.instance.get(url, { params }).catch((err) => {
      throw getCustomErr(err)
    })
  }

  post(url, data) {
    return this.instance.post(url, data).catch((err) => {
      throw getCustomErr(err)
    })
  }

  delete(url, params) {
    return this.instance.delete(url, { params }).catch((err) => {
      throw getCustomErr(err)
    })
  }

  patch(url, data) {
    return this.instance.patch(url, data).catch((err) => {
      throw getCustomErr(err)
    })
  }

  put(url, data) {
    return this.instance.put(url, data).catch((err) => {
      throw getCustomErr(err)
    })
  }
}

export default ApiBase
