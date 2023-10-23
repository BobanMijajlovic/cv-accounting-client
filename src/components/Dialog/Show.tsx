import React from 'react'
import {
  DialogMessageComponent,
  DialogMessageComponentRedirect
}            from './DialogBasic'

export default () => {
  return (
    <div style={{position: 'relative'}}>

      <div className={'dialog-show'}>
        <DialogMessageComponent
                    title={'Password reset email sent!'}
                    text={'An email has been send to your email address.'}
                    sub={'Follow instruction in the email to reset your password'}
        />

        <DialogMessageComponentRedirect
                    title={'Account  Successfully Activated !'}
                    text={'thank you for registering and activating your account!'}
        />

        <DialogMessageComponentRedirect
                    title={'Password reset!'}
                    text={'Your password has been changed.'}
        />

        <DialogMessageComponent
                    error
                    title={'Password reset email sent!'}
                    text={'An email has been send to your email address.'}
                    sub={'Follow instruction in the email to reset your password'}
        />

        <DialogMessageComponentRedirect
                    error
                    title={'Account  Successfully Activated !'}
                    text={'thank you for registering and activating your account!'}
        />

        <DialogMessageComponentRedirect
                    error
                    title={'Password reset!'}
                    text={'Your password has been changed.'}
        />

      </div>

      {/* <Dialog
          logo={logo}
          closeAction={() => {}}
          text={'Info dialog text'}
      />

      <Dialog
          title={'Test'}
          closeAction={() => {}}
          text={'Info dialog text & button Info dialog text & button Info dialog text & button'}
          button={{
            label: 'OK',
            color: 'primary',
            outline: true,
            size: 'sm'
          }}
      />

      <Dialog
          title={''}
          error
          closeAction={() => {}}
          text={'Error dialog'}
          button={{
            label: 'OK',
            color: 'danger',
            outline: true,
            size: 'sm'
          }}
      />

      <Dialog
          error
          logo={logo}
          closeAction={() => {}}
          text={'Error dialog with logo.\n Error text'}
      />

      <Dialog
            error
            logo={logo}
            closeAction={() => {}}
            text={'Error dialog with logo.\n Error text'}
      />
      <Dialog
            success
            logo={logo}
            closeAction={() => {}}
            text={'you have successfully created new account, please check your email to confirm the activation!'}
            button={{
              label: 'OK',
              color: 'primary',
              outline: true,
              size: 'sm'
            }}
      />*/}

      {/*    <EasyDialog
          closeAction={() => {}}
          title={'TITLE'}
          Component={Test}
          actionButtons={[
            {
              typeAction: DIALOG_CLOSE_BUTTON,
              label: 'CLOSE',
              color: 'danger'
            },
            {
              typeAction: DIALOG_SUBMIT_BUTTON,
              label: 'CONFIRM',
              color: 'primary'
            }
          ]}
      />*/}

      {/*   <DialogMessageComponent
          title={'Account Successfully Registered !'}
          text={'you have successfully completed user registration!'}
          sub={'Please check your email to complete activation.'}
      />*/}

      {/* <DialogInfo
          text={'Info dialog.\\n Info text'}
          buttonLabel={'OK'}
      />*/}

      {/* <DialogQuestion
          text={'Question dialog.\\n Question text'}
      />*/}
    </div>
  )
}
