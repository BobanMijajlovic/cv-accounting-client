import Enzyme                from 'enzyme';
import Adapter               from 'enzyme-adapter-react-16';
import {
    checkIsParentChildrenValid,
    insertAndCheckOne,
    updateAndCheckOne
} from '../../helpers/category';


Enzyme.configure( { adapter : new Adapter() } );

jest.setTimeout( 1000000 );


describe( 'Insert/update category komponent', () => {
    let parentId = 0
    let updateParentId = 0
    let updateCategoryId = 0

    let categoryData = {
        name: 'Komponente',
        description: 'Komponente'
    } as any

    it('Insert komponent' , async (done)=> {
        parentId = await insertAndCheckOne(categoryData)
        updateParentId = parentId
        done()
    })


    it('Insert komponent children', async (done) => {


        categoryData = {
            name: 'Memorije',
            description: 'Memorije',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData, true)


        categoryData = {
            name: 'Maticne ploce',
            description: 'Maticne ploce',
            parentId
        } as any

        parentId = await insertAndCheckOne(categoryData)


        /** procesori is child in maticne ploce category */
        categoryData = {
            name: 'Procesori',
            description: 'Procesori',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData)
        updateCategoryId= parentId
        done()
    })

    it('Insert procesori children', async (done)=> {

        categoryData = {
            name: 'AMD',
            description: 'AMD',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)


        categoryData = {
            name: 'Intel',
            description: 'Intel',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData)

        done()
    })

    it('Insert intel children', async (done)=> {

        categoryData = {
            name: 'i3',
            description: 'i3',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)


        categoryData = {
            name: 'i5',
            description: 'i5',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)

        categoryData = {
            name: 'i7',
            description: 'i7',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)



        categoryData = {
            name: 'i9',
            description: 'i9',
            parentId
        } as any
        parentId = await insertAndCheckOne(categoryData,true)

        done()
    })

    it('Change procesori parent for maticne ploce to komponente', async (done)=> {
        parentId = await updateAndCheckOne(updateCategoryId,{parentId: updateParentId})
        await checkIsParentChildrenValid( updateParentId, updateCategoryId )
        done()
    })


})