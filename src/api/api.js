import axios from 'axios'
import store from '../store'
import { API_URL } from '../config/config'

const Api = {

  install (Vue, options) {
    this.store = 1
  },


  //////////////////////////////////////////////////////////////////////   
  //////////////////// Register API. ///////////////////////////////////
  //////////////////////////////////////////////////////////////////////   

  registerMember (
    username,
    email, 
    phone, 
    address, 
    zipcode, 
    avatar_file) {

    let formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('zipcode', zipcode);

    if (avatar_file) {
      formData.append('avatar_file', avatar_file);  
    }

    return axios.post(this._url('member'), formData).then((response) => {
        return this._responseData(response).then((data) => {
          return Promise.resolve(data)
        })
      }).catch((e) => {
        return this._responseError(e)
      })
  },

  _url (path) {
    return `${API_URL}/${path}`
  },
  _headers (jwt) {
    if (jwt === false) {
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  _responseData (response, transformer) {
    var data = response.data

    if (transformer !== undefined) {
      data = transformer(data)
    }

    return Promise.resolve(data)
  },
  _responseError (error) {
    let e = new Error()
    e.errors = error.response.data.errors

    return Promise.reject(e)
  }
}

export default Api
