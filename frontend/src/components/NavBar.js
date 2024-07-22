import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../store/slices/userAuth/userAuthSlice';
import logo from '../assets/images/logo.png'

export default function NavBar() {
  const dispatch = useDispatch();
  const { loginStatus, userDetails } = useSelector((state) => state.userAuth);
  const userType = useSelector((state) => state.userRole.role);

  const linksData = {
    userTypeMentee: [{
      link: "/mentors",
      linktext: "Mentors",
    }, {
      link: "/meeting",
      linktext: "Meetings",
    }],
    userTypeMentor: [{
      link: "/student-request",
      linktext: "Students",
    }, {
      link: "/meeting",
      linktext: "Meetings",
    }]
  }

  return (
    <Disclosure as="nav" className="bg-blue-600 shadow fixed top-0 min-w-full z-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden border-none" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block border-none bg-transparent" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  alt="open Mentors"
                  src={logo}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/open-source"
                className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-white"
              >
                Projects
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-100 hover:text-gray-300"
              >
                Blogs
              </Link>
              {loginStatus && (
                <>
                  {userType === "Mentee" ? (
                    linksData.userTypeMentee.map((link, index) => (
                      <Link key={index} to={link.link} className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-100">
                        {link.linktext}
                      </Link>
                    ))
                  ) : (
                    userType === "Mentor" && (
                      linksData.userTypeMentor.map((link, index) => (
                        <Link key={index} to={link.link} className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-white hover:border-gray-300 hover:text-gray-100">
                          {link.linktext}
                        </Link>
                      ))
                    )
                  )}
                </>
              )}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!loginStatus && (
              <Link
                to="/signIn"
                className="relative p-1 text-white hover:text-gray-100"
              >
                Login
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Login</span>
              </Link>
            )}

            {loginStatus && (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <span className="h-8 w-8 rounded-full"
                    ><UserCircleIcon/></span>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link to="/profile" className="block text-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <button className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" onClick={() => dispatch(logOutUser())}>
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-4 pt-2">
          <Link
            to="/open-source"
            className="block border-l-4 border-indigo-500 py-2 pl-3 pr-4 text-base font-medium text-white"
          >
            Projects
          </Link>
          <Link
            to="/blogs"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Blogs
          </Link>
          {loginStatus && (
            <>
              {userType === "Mentee" ? (
                linksData.userTypeMentee.map((link, index) => (
                  <Link key={index} to={link.link} className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                    {link.linktext}
                  </Link>
                ))
              ) : (
                userType === "Mentor" && (
                  linksData.userTypeMentor.map((link, index) => (
                    <Link key={index} to={link.link} className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-white hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">
                      {link.linktext}
                    </Link>
                  ))
                )
              )}
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
