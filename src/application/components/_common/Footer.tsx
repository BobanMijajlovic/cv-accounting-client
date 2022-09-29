import React from 'react'

const Footer = () => {

  return (
    <>
      <footer className={'hw-app-footer'}>
        <div className={'hw-app-footer-right'}>
        &copy; {new Date().getFullYear()}{' '}
          <a href="http://www.hwt.rs">
            {'Design Tim'}
          </a>
        </div>
      </footer>
      <footer className={'hw-app-footer-mobile'}> </footer>
    </>
  )
}

export default Footer
