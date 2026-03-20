import Image from 'next/image'
import React from 'react'


function Header() {
    return (
        <div>
            <header className="
        h-16
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
