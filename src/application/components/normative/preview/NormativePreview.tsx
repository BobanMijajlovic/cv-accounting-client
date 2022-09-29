import React, {
    useEffect,
    useMemo,
    useState
}                               from 'react'
import { useNormativeQuery }    from '../../../../graphql/graphql'
import {
    KeyboardEventCodes,
    useExternalKeyboard
}                               from '../../../../components/hooks/useExternalKeybaord'
import { SpinnerLoadingCenter } from '../../../../components/Spinner/SpinnerLoading'
import {
    DialogModalRootComponent,
    EasyDialogApolloProvider
}                               from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }       from '../../../../components/Dialog/DialogBasic'
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import { faInfoCircle }         from '@fortawesome/free-solid-svg-icons'
import PreviewNormativeTable    from './PreviewNormativeTable'
import {
    TNormative,
    TNormativeItem
}                               from '../../../../graphql/type_logic/types'

interface INormativePreviewProps {
    closeDialog? : () => void
    normativeId : string
}

const NormativePreview = ( { normativeId, closeDialog } : INormativePreviewProps ) => {

    const [ state, setState ] = useState( [] as TNormative[] )

    const { data : _normative, loading } = useNormativeQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'cache-and-network',
        variables : {
            id : Number( normativeId )
        },
        skip : !normativeId
    } )

    const normative = useMemo( () => _normative && _normative?.normative ? _normative.normative as TNormative : void ( 0 ), [ _normative ] )

    const items = useMemo( () => normative ? normative.items : [], [ normative ] )

    useEffect( () => {
        if ( normative ) {
            setState( [
                ...state,
                normative as TNormative
            ] )
        }
    }, [ setState, normative ] )

    const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
        switch ( e.key ) {
            case KeyboardEventCodes.Esc:
                closeDialog && closeDialog()
                break
        }
    }, true, [ KeyboardEventCodes.Esc ], 'normative-preview-dialog' )

    return (
        <>
            { loading ? <SpinnerLoadingCenter/> : null }
            <div className={ 'hw-normative-preview-root relative d-flex flex-column font-smaller-2' } ref={ setRef }>
                {
                    normative && normative.items ?
                        (
                            <>
                                <div className={ 'border-bottom border-light-0 pt-1 mb-3' }>
                                    <div className={ 'd-flex color-primary font-smaller-2' }>
                                        <div className={ 'pr-2' }><FontAwesomeIcon icon={ faInfoCircle }/></div>
                                        <div className={ 'text-upper' }>{ normative.description }</div>
                                    </div>
                                </div>
                                <PreviewNormativeTable items={ items as TNormativeItem[] }/>
                            </>

                        )
                        : null
                }

            </div>
        </>
    )
}

export default NormativePreview

export const openDialogPreviewNormative = ( props : { normativeId : string } ) => {
    EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
        openDialog( <DialogModalRootComponent name={ 'dialog-normative-preview-05707075777' } closeFn={ closeDialog }>
            <CenteredDialog
                title={ 'Normative preview' }
                closeAction={ closeDialog }
                Component={ NormativePreview }
                componentRenderProps={ {
                    closeDialog : closeDialog,
                    ...props
                } }
            />
        </DialogModalRootComponent> )
    } )
}