import Enzyme                from 'enzyme';
import Adapter               from 'enzyme-adapter-react-16';
import {
    checkIsParentChildrenValid,
    insertAndCheckOne,
    updateAndCheckOne
} from '../../helpers/category';


Enzyme.configure( { adapter : new Adapter() } );

jest.setTimeout( 1000000 );


describe( 'Insert/update category bela tehnika', () => {
    let parentId = 0
    let updateParentId = 0
    let updateCategoryId = 0

    let categoryData = {
        name: 'Bela tehnika',
        description: 'Bela tehnika'
    } as any

    it('Insert Bela tehnika' , async (done)=> {
        parentId = await insertAndCheckOne(categoryData)
        updateParentId = parentId
        done()
    })


    it('Insert Bela tehnika children', async (done) => {


        categoryData = {
            name: 'Frizideri',
            description: 'Frizideri',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData, true)


        categoryData = {
            name: 'Klime',
            description: 'Klime',
            parentId
        } as any
        let rootId = parentId
        parentId = await insertAndCheckOne(categoryData)
        updateParentId = parentId
        parentId = rootId



        categoryData = {
            name: 'Sporeti',
            description: 'Sporeti',
            parentId
        } as any

        parentId = await insertAndCheckOne(categoryData)

        done()
    })

    it('Insert sporeti children', async (done)=> {

        categoryData = {
            name: 'Elektricni',
            description: 'Elektricni',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)


        categoryData = {
            name: 'Mini sporeti',
            description: 'Mini sporeti',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData)

        done()
    })

    it('Insert Mini sporeti children', async (done)=> {

        categoryData = {
            name: 'Pokretne klime',
            description: 'Pokretne klime',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData)
        updateCategoryId = parentId
        done()
    })

    it('Change pokretne klime parent for mini sporeti to klime', async (done)=> {
        parentId = await updateAndCheckOne(updateCategoryId,{parentId: updateParentId})
        await checkIsParentChildrenValid( updateParentId, updateCategoryId )
        done()
    })


})