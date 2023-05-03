import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FeedBackDetails } from "../../feedbacks";
import clsx from "clsx";
import Link from "next/link";
import storage from "redux-persist/lib/storage";
import { addCurrentCategory } from "../../../store/features/category";
const Board = () => {
    return (
        <div className="hidden bg-[url('/images/background-header.png')] bg-cover  h-[11.125rem] lg:h-[8.5625rem] px-6 pb-6 rounded-md text-white md:flex justify-start items-end">
            <div>
                <h1 className="font-bold text-[1.25rem]">Client App</h1>
                <h2 className="font-light text-[0.9325rem]">Feedback board</h2>
            </div>
        </div>
    );
};
const categories = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];
const Categories = () => {
    const currentCategory = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();
    return (
        <div className="h-[11.125rem] w-full bg-white rounded-md  py-4 px-2 flex items-center justify-center">
            <div className="space-x-3 space-y-2 ">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => {
                            dispatch(addCurrentCategory(category));
                        }}
                        className={clsx(
                            "text-xs md:text-[0.825rem] ml-3 inline-block  items-center rounded-md bg-very-light-blue px-5 py-2 font-semibold ",
                            currentCategory === category
                                ? "bg-blue-700 text-white"
                                : "text-simple-blue"
                        )}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};
export const RoadMap = () => {
    const productRequests = useAppSelector((state) => state.productRequests);
    const planned = productRequests.filter(
        (productRequest) => productRequest.status === "planned"
    );
    const inProgress = productRequests.filter(
        (productRequest) => productRequest.status === "in-progress"
    );
    const live = productRequests.filter(
        (productRequest) => productRequest.status === "live"
    );
    return (
        <div className="h-[11.125rem] lg:h-fit bg-white rounded-md flex py-4 px-3">
            <table className="w-full h-full">
                <thead className="h-12">
                    <tr>
                        <th className="text-slate-blue font-bold text-lg text-left">
                            Roadmap
                        </th>
                        <th className="text-simple-blue font-semibold underline underline-offset-2 text-[0.8125rem]">
                            <Link href="/roadmap">
                                <a>View</a>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="flex items-center justify-start space-x-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-300" />
                            <span className="text-medium-grey">Planned</span>
                        </td>
                        <td className="text-center text-medium-grey font-bold">
                            {planned.length}
                        </td>
                    </tr>
                    <tr>
                        <td className="flex items-center justify-start space-x-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-simple-purple" />
                            <span className="text-medium-grey">
                                In-progress
                            </span>
                        </td>
                        <td className="text-center text-medium-grey font-bold">
                            {inProgress.length}
                        </td>
                    </tr>
                    <tr>
                        <td className="flex items-center justify-start space-x-4 py-1.5">
                            <div className="w-2 h-2 rounded-full bg-sky-blue" />
                            <span className="text-medium-grey">Live</span>
                        </td>
                        <td className="text-center text-medium-grey font-bold">
                            {live.length}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export const Cards = ({
    filteredRequests,
}: {
    filteredRequests: FeedBackDetails[];
}) => {
    return (
        <>
            <Board />
            <Categories />
            <RoadMap />
        </>
    );
};

export default Cards;
