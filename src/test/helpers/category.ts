import { renderHook }  from '../TestComponent';
import {
    useInsertCategoryMutation,
    useUpdateCategoryMutation
}                      from '../../graphql/graphql';
import { act }         from 'react-dom/test-utils';
import _               from 'lodash';
import { getCategory } from './index';
import { TCategory }   from '../../graphql/type_logic/types';


export const insertAndCheckOne = async (categoryData:any, isChild: boolean = false ) => {
    const [mutationInsert] = renderHook(useInsertCategoryMutation)
    let result = {};
    let category = {} as any;
    const parentId = categoryData.parentId ? categoryData.parentId : 1
    await act(async () => {
        try {
            result = await mutationInsert( {
                variables : {
                    data : categoryData
                }
            } )
            category = _.get( result, 'data.category' )
            expect( result ).toHaveProperty( 'data' )
            expect( category ).toHaveProperty( 'name', categoryData.name )
            expect( category ).toHaveProperty( 'description', categoryData.description )
            expect( category ).toHaveProperty( 'parentId',  parentId)
        } catch ( e ) {
            console.log( JSON.stringify( e ) )
        }
    })

    await checkIsParentChildrenValid(Number(parentId),Number(category.id))

    return isChild ?
        categoryData.parentId ? categoryData.parentId : category.parentId
        : Number(category.id)
}


export const updateAndCheckOne = async (id: number, categoryData:any) => {

    const [mutationUpdate] = renderHook(useUpdateCategoryMutation)
    let result = {};
    let category = {} as any;
    await act(async () => {
        try {
            result = await mutationUpdate( {
                variables : {
                    id,
                    data : categoryData
                }
            } )
            category = _.get( result, 'data.category' )
        } catch ( e ) {
            console.log( JSON.stringify( e ) )
        }
    })

    expect( result ).toHaveProperty( 'data' )
    categoryData.name && expect( category ).toHaveProperty( 'name', categoryData.name)
    categoryData.description && expect( category ).toHaveProperty( 'description', categoryData.description)
    expect( category ).toHaveProperty( 'parentId', categoryData.parentId ? categoryData.parentId : 1 )
    return category.parentId
}


export const checkIsParentChildrenValid = async (parentId: number, categoryId: number) => {
    let category = await getCategory(parentId) as TCategory
    let children = _.get( category, 'children' ) as any
    if(children) {
        const exists = children.find((x:any)=> Number(x.child) === categoryId)
        expect(exists).toBeTruthy()
    }
    const _category = await getCategory(categoryId)
    const _children = _.get( _category, 'children' ) as any
    if(_children) {
        _children.forEach((x:any)=> {
            const isExists = children.find((child:any)=> Number(child.child) === x.child)
            expect(isExists).toBeTruthy()
        })
    }
    if(category.parentId) {
        await checkIsParentChildrenValid(Number(category.parentId),Number(category.id))
        return
    }
}