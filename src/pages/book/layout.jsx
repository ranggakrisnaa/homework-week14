import { useState } from 'react'
import Navbar from 'src/components/Navbar'

export default function Layout({ children }) {
    const [value, setValue] = useState('true')
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}
