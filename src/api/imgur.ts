import qs from 'qs'
import axios from 'axios'
import { CLIENT_ID } from '@/config'
import { AuthToken } from '@/store/modules/auth'
import { Image } from '@/store/modules/images'

const ROOT_URL = 'https://api.imgur.com'

export default {
  login() {
    const querystring = {
      client_id: CLIENT_ID,
      response_type: 'token',
    }

    window.location.href = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`
  },
  fetchImages(token: AuthToken) {
    return axios.get(`${ROOT_URL}/3/account/me/images`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
  uploadImages(images: Image[], token: AuthToken) {
    const promises = Array.from(images).map((image) => {
      const formData = new FormData()
      formData.append('image', image)

      return axios.post(`${ROOT_URL}/3/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })
    return Promise.all(promises)
  },
}
