import Layout from './dashboard/layout'
import Login from './login'

export default function Home() {
    return (
        <>
            <Login>
                <Layout />
            </Login>
        </>
    )
}