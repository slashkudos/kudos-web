import { Disclosure } from "@headlessui/react";
import { Utilities } from "../services/utilities";

const navigation = [{ name: "slashkudos", href: "/", current: true }];

export default function Navbar(): JSX.Element {
  return (
    <>
      <Disclosure as="nav" className="bg-primary-500">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="block">
                    <div className="flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={Utilities.classNames(
                            item.current
                              ? "bg-primary-700 text-white"
                              : "text-white hover:bg-primary-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <a
                      key={"about"}
                      href={"https://slashkudos.com/"}
                      rel="noreferrer"
                      className={Utilities.classNames(
                        "text-white hover:bg-primary-700 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium"
                      )}
                    >
                      About
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel>
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={Utilities.classNames(
                      item.current
                        ? "bg-primary-700 text-white"
                        : "text-white hover:bg-primary-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
