import Image from 'next/image'
import React from 'react'

type HeaderProps = {
    className?: string
}

function Header({className}:HeaderProps) {
    return (
        <div>
            <header className={`
        h-16 bg-background
        border-b border-border
        flex items-center justify-between px-4
      ${className}`}>

                <div><Image src={"/images/Billow.svg"}
                    alt='Billow logo'
                    width={100}
                    height={150} /></div>
                <div className='Account'></div>
            </header>
        </div>
    )
}

export default Header
