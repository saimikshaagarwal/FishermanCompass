import { useState } from 'react';
import { navItems } from '../constants';
import { Menu, X } from 'lucide-react';
import useAuth from './useAuth';  

function Navbar() {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const { isLoggedIn, handleLogout, user } = useAuth();  

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    return (
        <div className="relative w-full overflow-x-hidden">
            <nav className='sticky top-0 z-50 backdrop-blur-lg border-b border-neutral-700/80 w-full'>
                <div className='container px-4 mx-auto relative lg:text-sm flex justify-between items-center w-full'>
                    
                    <div className='flex items-center flex-shrink-0'>
                        <h2 className='text-2xl font-bold'>Fisherman's Compass</h2>
                    </div>
                    
                    <div className='flex space-x-6 items-center'>
                        <div className='hidden lg:flex ml-14 space-x-12'>
                            {navItems.map((item, index) => (
                                <li key={index} className='list-none'>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </div>

                        <div className='hidden lg:flex justify-center space-x-6 items-center'>
                            {isLoggedIn ? (
                                <>
                                    <span className="text-sm text-neutral-500">Welcome, {user.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className='py-2 px-3 border rounded-md'>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a href='/login' className='py-2 px-3 border rounded-md'>
                                        Sign In
                                    </a>
                                    <a href='/signup' className='bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md'>
                                        Sign Up
                                    </a>
                                </>
                            )}
                        </div>
                        
                        <div className='relative flex items-center space-x-2'>
                            <script src="https://static.elfsight.com/platform/platform.js" async></script>
                            <div className="elfsight-app-a55d9b4c-4790-4775-9e0d-66d770209238 w-8 h-8" data-elfsight-app-lazy></div>
                            <button onClick={toggleNavbar} className="lg:hidden">
                                {mobileDrawerOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            {mobileDrawerOpen && (
                <div className='fixed top-0 right-0 z-40 w-full h-full bg-neutral-900 p-6 flex flex-col justify-start items-center lg:hidden overflow-y-auto'>
                    <button onClick={toggleNavbar} className='self-end mb-4'>
                        <X />
                    </button>
                    <ul className='w-full space-y-4 text-center'>
                        {navItems.map((item, index) => (
                            <li key={index} className='list-none'>
                                <a href={item.href} className='block py-2 px-4 text-white hover:bg-neutral-700 rounded-md'>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-6 w-full flex flex-col space-y-4 items-center'>
                        {isLoggedIn ? (
                            <>
                                <span className="text-sm text-neutral-500">Welcome, {user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className='py-2 px-3 border rounded-md w-full'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a href='/login' className='py-2 px-3 border rounded-md text-center w-full bg-neutral-800 text-white hover:bg-neutral-700'>
                                    Sign In
                                </a>
                                <a href='/signup' className='bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md text-center w-full hover:from-orange-600 hover:to-orange-900'>
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
