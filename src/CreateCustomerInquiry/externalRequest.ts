import axios from 'axios'

async function sendRequestToExternalServer(link: string, title: string) {
  return axios.post(link, { title })
}
export default sendRequestToExternalServer
