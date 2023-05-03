import { Bars3Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { showSideBar, hideSideBar } from "../../../store/features/sidebar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FeedBackDetails } from "../../feedbacks";

export default function MobileHeader() {
    const dispatch = useAppDispatch();
    const sideBarOpen = useAppSelector((state) => state.sideBar.open);
    return (
        <div className="relative z-50 md:hidden w-full p-4 flex justify-between items-center h-[4.5rem] bg-gradient-to-tl from-[#ED5174] to-[#28A7ED] via-[#A337F6]">
            <div className="text-white">
                <h1 className="font-bold text-lg">Client App</h1>
                <h2 className="text-sm font-light">Feedback Board</h2>
            </div>
            <button>
                {sideBarOpen ? (
                    <XMarkIcon
                        className="w-7 h-7 stroke-white"
                        onClick={() => dispatch(hideSideBar())}
                    />
                ) : (
                    <Bars3Icon
                        className="w-7 h-7 fill-white"
                        onClick={() => dispatch(showSideBar())}
                    />
                )}
            </button>
        </div>
    );
}
