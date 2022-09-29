const accessToken = {
  token: null,
  useToken: true
}

export const setAccessToken = (token : any) => {
  accessToken.token = token
  accessToken.useToken = true
}

export const clearAccessToken = () => {
  accessToken.token = null
  accessToken.useToken = false
}

export const getAccessToken = () => accessToken.token
export const isUseAccessToken = () => accessToken.useToken

export const setUseAccessToken = (b : boolean) => {
  accessToken.useToken = b
}
