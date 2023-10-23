import React                 from 'react'
import ComponentRender       from '../../../../components/Util/ComponentRender'
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import {
  faArrowsAlt,
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { TCategory }         from '../../../../graphql/type_logic/types'
import { CONSTANT_SETTINGS } from '../../../constants'
import ButtonShortcut from '../../../../components/Button/ButtonShortcut'

const CategoryInfo = ({category}: {category: TCategory}) => {

  return (
    <div className={ 'hw-settings-category-info-root d-flex flex-column font-smaller-1' }>
      <div className={'border-bottom-double border-color-blue-light'}>
        <ComponentRender label={ 'Category name' } model={ category } field={ 'name' } placeholder={ 'Name' } classNames={ 'pb-1' } justify-content={ 'start' }/>
      </div>
      <div className={ 'd-flex justify-content-around align-items-center cursor-pointer pt-2' }>
        { category && category?.id ?
          <>
            <div  data-action={CONSTANT_SETTINGS.EVENTS.CATEGORY.MOVE_CATEGORY} >
              <ButtonShortcut
                    icon={ faArrowsAlt }
                    label={ 'MOVE' }
                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
              />
            </div>
            <div data-action={CONSTANT_SETTINGS.EVENTS.CATEGORY.EDIT_CATEGORY}>
              <ButtonShortcut
                    icon={ faEdit }
                    label={ 'edit' }
                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
              />
            </div>
            <div data-action={CONSTANT_SETTINGS.EVENTS.CATEGORY.DELETE_CATEGORY}  >
              <ButtonShortcut
                    icon={ faTimes }
                    label={ 'delete' }
                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
              />
            </div>
          </>
          : <>&nbsp;</>
        }
      </div>
      {/* <ComponentRender label={ 'Category slug' } model={ category } field={ 'slug' } placeholder={ 'Slug' } classNames={ 'pb-1' } justify-content={ 'start' }/>
      <ComponentRender label={ 'Description' } model={ category } field={ 'description' } placeholder={ 'Description' } classNames={ 'pb-1' } justify-content={ 'start' }/>*/}
    </div>
  )
}

export default CategoryInfo
