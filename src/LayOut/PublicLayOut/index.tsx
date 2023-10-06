import { Outlet } from 'react-router-dom'
import { HelmetComponent, Navbar } from '../../component';

const PublicLayout = () => {
    return ( 
            <div>
                <Navbar />
                <HelmetComponent />
                <Outlet />
            </div>
        )
}

export default PublicLayout