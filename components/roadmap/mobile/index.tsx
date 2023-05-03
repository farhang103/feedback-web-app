import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useMemo, useState } from "react";
import { upVote } from "../../../store/features/productRequests";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FeedBackDetails } from "../../feedbacks";

function Header() {
    const router = useRouter();
    return (
        <div className="fixed z-50 inset-0 bg-[#373F68] h-[4.5rem]  flex items-center justify-between space-x-7 px-5">
            <div className="flex flex-col items-start justify-center space-y-2">
                <button
                    onClick={() => router.back()}
                    className="flex items-start"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-4 stroke-white"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    <p className="text-white text-xs font-bold">Go back</p>
                </button>
                <h1 className="text-white text-lg font-bold">Roadmap</h1>
            </div>
            <Link href={`/newFeedback`}>
                <a className="bg-simple-purple hover:bg-purple-900 text-white py-2 px-4 rounded-md">
                    + Add Feedback
                </a>
            </Link>
        </div>
    );
}
function Box({
    status,
    title,
    description,
    upvotes,
    commmentsLength,
    category,
    id,
}: {
    status: string;
    title: string;
    description: string;
    upvotes: number;
    commmentsLength: number;
    category: string;
    id: number;
}) {
    const dispatch = useAppDispatch();
    return (
        <div
            className={clsx(
                "lg:w-[21.875rem]  lg:h-[17rem] bg-white mt-2 p-6 rounded-md border-t-4",

                status === "planned"
                    ? " border-t-light-orange"
                    : status === "in-progress"
                    ? " border-t-simple-purple"
                    : status === "live"
                    ? " border-t-sky-blue"
                    : ""
            )}
        >
            <div className="lg:w-[17.875rem] flex items-center justify-start space-x-4 py-1.5 ">
                <div
                    className={clsx(
                        "w-2 h-2 rounded-full",
                        status === "planned"
                            ? " bg-light-orange"
                            : status === "in-progress"
                            ? " bg-simple-purple"
                            : status === "live"
                            ? " bg-sky-blue"
                            : ""
                    )}
                />
                <span className="text-medium-grey first-letter:uppercase">
                    {status}
                </span>
            </div>
            <Link href={`/feedback/${id}`}>
                <a className="lg:w-[17.875rem] text-slate-blue font-bold lg:text-lg text-sm">
                    {title}
                </a>
            </Link>

            <h3 className="lg:w-[17.875rem] text-medium-grey mt-1 text-sm lg:text-base">
                {description}
            </h3>
            <div className=" mt-3 text-[0.825rem] inline-block items-center rounded-md bg-very-light-blue px-5 py-2 text-sm font-semibold text-simple-blue">
                {category}
            </div>
            <div className="lg:w-[17.875rem] flex justify-between items-center mt-4 ">
                <button
                    onClick={() => {
                        dispatch(upVote({ feedBackId: id }));
                    }}
                    className=" rounded-md flex p-2 h-fit justify-between items-center bg-very-light-blue "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        className="w-6 h-3 stroke-simple-blue "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                    </svg>
                    <span className="inline-flex text-slate-blue font-bold text-sm">
                        {upvotes}
                    </span>
                </button>
                <div className="flex space-x-1 justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#CDD2EE"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="none"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                        />
                    </svg>
                    <span className="inline-flex text-slate-blue font-bold text-sm">
                        {commmentsLength}
                    </span>
                </div>
            </div>
        </div>
    );
}
const Request = ({ requests }: { requests: FeedBackDetails[] }) => {
    const category = useMemo(() => {
        return requests[0].status;
    }, [requests]);
    const description = useMemo(() => {
        switch (category.toLowerCase()) {
            case "planned":
                return "Ideas prioritized for research";
            case "in-progress":
                return "Currently being developed";
            case "live":
                return "Released features";
            default:
                return "";
        }
    }, [category]);
    return (
        <div className="flex flex-col space-y-2 px-5 py-4">
            <h2 className="text-slate-blue font-bold text-lg first-letter:uppercase">{`${category}(${requests.length})`}</h2>
            <h3 className="text-medium-grey">{description}</h3>
            <div className="space-y-4 items-center justify-center">
                {requests.map((element) => (
                    <Box
                        key={element.id}
                        {...element}
                        commmentsLength={element.comments.length}
                    />
                ))}
            </div>
        </div>
    );
};
export default function MobileRoadMap() {
    const [currentCategory, setCurrentCategory] = useState("planned");
    const productRequests = useAppSelector((state) => state.productRequests);
    const planned = useMemo(() => {
        return productRequests.filter(
            (productRequest) => productRequest.status === "planned"
        );
    }, [productRequests]);
    const inProgress = useMemo(() => {
        return productRequests.filter(
            (productRequest) => productRequest.status === "in-progress"
        );
    }, [productRequests]);

    const live = useMemo(() => {
        return productRequests.filter(
            (productRequest) => productRequest.status === "live"
        );
    }, [productRequests]);
    return (
        <div className="md:hidden ">
            <Header />
            <div className="relative z-10 w-full ">
                <div className="sticky top-[4.5rem]  border-b border-b-gray-300 bg-very-light-blue w-full">
                    <button
                        onClick={() => {
                            setCurrentCategory("planned");
                        }}
                        className={clsx(
                            "w-1/3 inline-block py-4 border-b-4 ",
                            currentCategory === "planned" &&
                                "border-b-light-orange"
                        )}
                    >
                        Planned ({planned.length})
                    </button>
                    <button
                        onClick={() => {
                            setCurrentCategory("in-progress");
                        }}
                        className={clsx(
                            "w-1/3 inline-block py-4 border-b-4 ",
                            currentCategory === "in-progress" &&
                                "border-b-simple-purple"
                        )}
                    >
                        In-progress ({inProgress.length})
                    </button>
                    <button
                        onClick={() => {
                            setCurrentCategory("live");
                        }}
                        className={clsx(
                            "w-1/3 inline-block py-4 border-b-4 ",
                            currentCategory === "live" && "border-b-sky-blue"
                        )}
                    >
                        Live ({live.length})
                    </button>
                </div>
                <div className="relative top-[3rem] -z-20">
                    {currentCategory === "planned" ? (
                        <Request requests={planned} />
                    ) : currentCategory === "in-progress" ? (
                        <Request requests={inProgress} />
                    ) : currentCategory === "live" ? (
                        <Request requests={live} />
                    ) : null}
                </div>
            </div>
        </div>
    );
}
