import React            from 'react'
import fetch            from 'unfetch'
import {ApolloProvider} from "@apollo/react-hooks";

import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache}  from 'apollo-cache-inmemory'

import ApolloClient from 'apollo-client'
import {mount}      from "enzyme";

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch: fetch
    }),
    cache: new InMemoryCache(),
})

export interface ITestComponentProps {
    render: any
}

export interface ITestComponentQuery {
    query: any,
    data: any,
    resolve: any,
    reject: any
}

export const TestComponent = ({render: Render}: ITestComponentProps) => {
    return (
        <ApolloProvider client={client}>
            <Render/>
        </ApolloProvider>
    )
}

const TestComponentQueryInside = ({query, data, resolve, reject}: ITestComponentQuery) => {

    query({
        ...data,
        onCompleted(data: any) {
            resolve(data)
        },
        onError(error: any) {
            reject(error)
        }
    })

    return <></>

}

export const TestComponentQuery = ({query, data, resolve, reject}: ITestComponentQuery) => {

    return (
        <ApolloProvider client={client}>
            <TestComponentQueryInside
                query={query}
                data={data}
                resolve={resolve}
                reject={reject}
            />
        </ApolloProvider>
    )

}

export const renderHookQuery = (query: any, data?: any) => {
    let resolveGlobal;
    let rejectGlobal;
    const promise = new Promise((resolve, reject) => {
        resolveGlobal = resolve
        rejectGlobal = reject
    })

    mount(<TestComponentQuery query={query} data={data} resolve={resolveGlobal} reject={rejectGlobal}/>);
    return promise
}

export const renderHook = (hook: any, data?: any) => {
    let p: any
    const HookWrapper = () => {
        p = hook(data)
        return null
    };
    mount(<TestComponent render={HookWrapper}/>);
    return p;
};
