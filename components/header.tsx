import Image from 'next/image'
import React from 'react'


function Header() {
    return (
        <div>
            <header className="
        fixed top-0 left-0 right-0 z-50
        h-[var(--header-h)]
        bg-background/95 backdrop-blur
        border-b border-border
        flex items-center justify-between px-4
      ">

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
