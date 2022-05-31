import request, { RequestDocument } from 'graphql-request';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const SERVER_URL = '/'

export const getClient = (() => {
  let client : QueryClient | null = null;
  
  return () => {
    if(!client) 
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
          }
        }
    })
    return client
  }
})()

export const restFetcher = async ({
  method,
  path,
  body,
  params
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  body?: { [key: string]: any } 
  params?: { [key: string]: any } 
}) => {
  try {
    let url = `${SERVER_URL}${path}`
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': SERVER_URL
      }
    }

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`
    }
    if (body) {
      options.body = JSON.stringify(body)
    }

    const res = await fetch(url, options)
    const json = res.json();
    return json
  } 
  catch (err) {
    console.error(err)
  }
}

export const graphqlFetcher = (query: RequestDocument, variables = {}) => 
  request(SERVER_URL, query, variables)

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART"
}