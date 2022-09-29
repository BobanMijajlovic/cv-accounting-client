import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    checkIsParentChildrenValid,
    insertAndCheckOne,
    updateAndCheckOne
}              from '../../helpers/category';


Enzyme.configure( { adapter : new Adapter() } );

jest.setTimeout( 1000000 );


describe( 'Insert/update category oprema za racunare', () => {
    let parentId = 0
    let updateParentId = 0
    let updateCategoryId = 0

    let categoryData = {
        name : 'Oprema za racunare',
        description : 'Oprema za racunare'
    }

    it( 'Insert oprema za racunare', async ( done ) => {
        parentId = await insertAndCheckOne( categoryData )
        updateParentId = parentId
        done()
    } )


    it( 'Insert oprema za racunare children', async ( done ) => {
        categoryData = {
            name : 'Perifierije',
            description : 'Perifierije',
            parentId
        } as any
        parentId = await insertAndCheckOne( categoryData, true )


        categoryData = {
            name : 'Stampaci',
            description : 'Stampaci',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Slusalice',
            description : 'Slusalice',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData )
        done()
    } )


    it( 'Insert slusalice children', async ( done ) => {
        categoryData = {
            name : 'Bubice',
            description : 'Bubice',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Klasične slušalice',
            description : 'Klasične slušalice',
            parentId
        } as any
        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Bežične slušalice',
            description : 'Bežične slušalice',
            parentId
        } as any
        parentId = await insertAndCheckOne( categoryData, true )


        categoryData = {
            name : 'Gejmerske slušalice',
            description : 'Gejmerske slušalice',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Mrezna oprema',
            description : 'Mrezna oprema',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData )
        updateCategoryId = parentId

        done()
    } )

    it( 'Insert mrezna oprema ', async ( done ) => {

        categoryData = {
            name : 'Switch uredjaji',
            description : 'Switch uredjaji',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Ruteri',
            description : 'Ruteri',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )

        categoryData = {
            name : 'Rack ormani',
            description : 'Rack ormani',
            parentId
        } as any

        parentId = await insertAndCheckOne( categoryData, true )
        done()
    } )

    it( 'Change parent id for mrezna oprema to oprema za racunare', async ( done ) => {
        await updateAndCheckOne( updateCategoryId, { parentId : updateParentId } )
        await checkIsParentChildrenValid( updateParentId, updateCategoryId )
        done()
    } )


} )