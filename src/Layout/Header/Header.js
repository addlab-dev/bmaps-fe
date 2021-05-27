import React,{ Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'

import {
  MemoryRouter as Router,
  Link
} from 'react-router-dom'

const listItems = [
  {
    to: '/services',
    text: 'Services',
  },
  {
    to: '/appointments',
    text: 'Appointments',
  },
  {
    to: '/account',
    text: 'Account',
  },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const Header = () => {
  const shopID = useSelector((state) => state.booking.storeID)
    return (
        <Disclosure as="nav" className="col-span-full lg:grid lg:grid-cols-1 text-center ">
          {({ open }) => (
            <>
              <div className=" px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block h-6 mt-2 w-auto"
                        src="https://d6e2eexatv3xy.cloudfront.net/fe-images/index/brand-glamour.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Router>
                    {listItems.map((item) => (
                        <Link 
                          className="border-transparent text-main hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-md font-medium"   
                          to={`${shopID}/${item.to}`} 
                          key={item.text}>
                            {item.text}
                          </Link>
                          ))}
                      </Router>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button className="bg-white p-1 rounded-full text-main hover:text-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
    
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://d6e2eexatv3xy.cloudfront.net/home_sections/TaglioUomo-Homesections.jpg"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="javascript:void(0);"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="javascript:void(0);"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="javascript:void(0);"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-main hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
    
              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {/* Current: "bg-greenborder-green text-green", Default: "border-transparent text-main hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="javascript:void(0);"
                    className="bg-greenborder-green text-green block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-left"
                  >
                    Dashboard
                  </a>
                  <a
                    href="javascript:void(0);"
                    className="text-left border-transparent text-main hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Team
                  </a>
                  
                 
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://d6e2eexatv3xy.cloudfront.net/home_sections/TaglioUomo-Homesections.jpg"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-left text-base font-medium text-gray-800">Tom Cook</div>
                      <div className="text-sm font-medium text-main">tom@example.com</div>
                    </div>
                    <button className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-main focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <a
                      href="javascript:void(0);"
                      className="text-left block px-4 py-2 text-base font-medium text-main hover:text-gray-800 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="text-left block px-4 py-2 text-base font-medium text-main hover:text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="javascript:void(0);"
                      className="text-left block px-4 py-2 text-base font-medium text-main hover:text-gray-800 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )
}
export default Header;