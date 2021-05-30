import ApiBase from './index'

class ApiInit extends ApiBase {
    async login(data) {
      const resData = await this.get('/sanctum/csrf-cookie',null).then((response)=> {
         return this.post('/customers/login', data).then((res) => res.data)
      })    
       return resData
    }
    async register(data) {
      const resData = await this.get('/sanctum/csrf-cookie',null).then((response)=> {
         return this.post('/customers/register', data).then((res) => res.data)
      })    
       return resData
    }

    async getService(shop) {
      const resData = await this.get('shop/'+shop+'/services', null).then((res) => res.data)
      return resData
    }
    async getSlots(shop,service,date) {
      const resData = await this.get('shop/'+shop+'/services/'+service+'/slots/'+date, null).then((res) => res.data)
      return resData
    }
    async getProf(shop,service,date) {
      const resData = await this.get('shop/'+shop+'/services/'+service+'/slots/'+date+'/staff', null).then((res) => res.data)
      return resData
    }
    async getQuest(shop,service) {
      const resData = await this.get('shop/'+shop+'/services/'+service+'/questions', null).then((res) => res.data)
      return resData
    }
    async getProfile() {
      const resData = await this.get('profile', null).then((res) => res.data)
      return resData
    }
    async getAppointments() {
      const resData = await this.get('customers/bookings', null).then((res) => res.data)
      return resData
    }
    async bookNow(data) {
      const resData = await this.post('services/booknow', data).then((res) => res.data)
      return resData
    }
    async cancelBooking(data) {
      const resData = await this.post('booking/cancel', data).then((res) => res.data)
      return resData
    }

}

const Api = new ApiInit()

export default Api;