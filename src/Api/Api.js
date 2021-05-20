import ApiBase from './index'

class ApiInit extends ApiBase {

    async login(data) {
      const resData = await this.post('/user/login', data).then((res) => res.data)
      return resData
    }

}

const Api = new ApiInit()

export default Api;