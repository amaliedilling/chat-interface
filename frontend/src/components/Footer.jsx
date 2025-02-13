import React from 'react'
import chatConfig from 'interfaceConfig'

const Footer = () => {
  return (
    <div className ='inset-x-0 bottom-0 bg-bg-100 text-tertiary-500 pb-2 px-4 text-xs lg:text-sm font-light text-center'>
        {chatConfig.footer.text}
    </div>
  )
}

export default Footer