import { ApolloClient }     from 'apollo-client'
import { InMemoryCache }    from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import {
  getAccessToken,
  isUseAccessToken,
  setAccessToken
}                           from './accessToken'
import {
  ApolloLink,
  Observable
}                           from 'apollo-link'
import jwtDecode            from 'jwt-decode'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import ApolloAsyncCall      from '../graphql/ApolloAsyncCallClass'
import { processError }     from '../graphql/utils'
import { easyDialogError }  from '../components/EasyModel/EasyModal'

const cache = new InMemoryCache()

/** */

export const processErrorGraphQL = (error: any, validation ?: any) => {
  const s = processError(error, validation)
  if (s) {
    easyDialogError(s)
  }
}

/* const link = createHttpLink(Object.assign({},
    { uri: (process.env as any).REACT_APP_APOLLO },
    { credentials: 'include' }))*/

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
        if (!isUseAccessToken) {
          return
        }
        const accessToken = getAccessToken()
        if (accessToken) {
          operation.setContext({
            headers:{
              authorization:`bearer ${accessToken}`
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next:observer.next.bind(observer),
          error:observer.error.bind(observer),
          complete:observer.complete.bind(observer)
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) {
        handle.unsubscribe()
      }
    }
  }))

const uploadLink = createUploadLink(Object.assign({},
    {uri:(process.env as any).REACT_APP_APOLLO},
    {credentials:'include'})) as any

export const client = new ApolloClient({
  link:ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField:'token',
      isTokenValidOrUndefined:() => {
        if (!isUseAccessToken()) {
          return true
        }
        const token = getAccessToken()
        if (!token) {
          return false
        }
        try {
          const {exp} = jwtDecode(token)
          if (Date.now() >= exp * 1000) {
            return false
          } else {
            return true
          }
        } catch {
          return false
        }
      },
      fetchAccessToken:() => {
        return fetch((process.env as any).REACT_APP_APOLLO_REFRESH, {
          credentials:'include'
        })
      },
      handleFetch:(accessToken: any) => {
        setAccessToken(accessToken)
        const data = jwtDecode(accessToken)
        ApolloAsyncCall.logIn((data as any).userId)
      },
      handleError:err => {
        ApolloAsyncCall.logOut()
      }
    }),
    requestLink,
        // link,
    uploadLink
  ]),
  cache
})
