/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState, Dispatch, SetStateAction} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import Cards, {RoadMap} from "../cards";
import {FeedBackDetails} from "../../feedbacks";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {hideSideBar} from "../../../store/features/sidebar";

export default function MobileSideBar({filteredRequests}: {filteredRequests: FeedBackDetails[]}) {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.sideBar.open);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 md:hidden" onClose={() => dispatch(hideSideBar())}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="top-[4.5rem]  fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative top-[4.5rem] pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col bg-very-light-blue py-6 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="space-y-4 mx-2">
                        <Cards filteredRequests={filteredRequests} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
