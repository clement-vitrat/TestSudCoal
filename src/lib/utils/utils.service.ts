import axios from 'axios'
import { API_URL } from '@/lib/helpers/config.env'
import { ApiResponse, Region, TypePost } from '@/lib/entities/utils.entity'

export async function fetchRegion() {
  const res = await axios.get<ApiResponse<Region[]>>(API_URL + '/utils/region')
  return res.data
}

export async function fetchTypePost() {
  const res = await axios.get<ApiResponse<TypePost[]>>(
    API_URL + '/utils/typepost'
  )
  return res.data
}
