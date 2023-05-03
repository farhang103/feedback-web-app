import clsx from "clsx";
import Link from "next/link";
import React, {useRef, useState} from "react";
import {downVote, upVote} from "../../store/features/productRequests";
import {addVote, deleteVote} from "../../store/features/upVote";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

export default function Suggestion({title, description, upvotes, comments, category, id}) {
  const dispatch = useAppDispatch();
  const counter = useRef(0);
  return (
    <div className="cursor-pointer  bg-white w-full flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-10 p-4 md:p-8  h-fit rounded-md shadow-md">
      <button
        onClick={() => {
          if (counter.current % 2 !== 0) {
            dispatch(
              downVote({
                feedBackId: id,
              })
            );
          } else {
            dispatch(
              upVote({
                feedBackId: id,
              })
            );
          }
          counter.current++;
        }}
        className={clsx(
          "  stroke-simple-blue  hidden h-1/2 rounded-md md:flex flex-col space-y-1 justify-start items-center bg-very-light-blue ",
          "hover:bg-blue-600 hover:text-white hover:stroke-white text-slate-blue"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-8 h-4 "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        <span className="inline-flex font-bold text-sm ">{upvotes}</span>
      </button>
      <div className="space-y-2 flex-1">
        <Link href={`/feedback/${id}`}>
          <a className="font-bold text-slate-blue hover:text-blue-500 hover:underline ">{title}</a>
        </Link>

        <p className="text-medium-grey text-xs md:text-base ">{description}</p>
        <span className="inline-flex items-center rounded-md bg-very-light-blue px-5 py-2 text-sm font-medium text-simple-blue">
          {category}
        </span>
      </div>
      <div className=" hidden md:flex items-center justify-center space-x-2">
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
        <span className="inline-flex text-slate-blue font-bold text-sm">{comments.length}</span>
      </div>
      <div className="md:hidden w-full flex space-x-1 justify-between md:justify-center items-center">
        <button
          onClick={() => {
            if (counter.current % 2 !== 0) {
              dispatch(
                downVote({
                  feedBackId: id,
                })
              );
            } else {
              dispatch(
                upVote({
                  feedBackId: id,
                })
              );
            }
            counter.current++;
          }}
          className={clsx(
            "md:hidden px-2 py-1 rounded-md flex space-x-0.5 justify-center items-center ",

            "hover:bg-blue-600 hover:text-white hover:stroke-white bg-very-light-blue stroke-simple-blue text-slate-blue"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-3 h-3 "
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
          <span className="inline-flex  font-bold text-sm">{upvotes}</span>
        </button>
        <div className="flex items-center justify-center space-x-2">
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
          <span className="inline-flex text-slate-blue font-bold text-sm">{comments.length}</span>
        </div>
      </div>
    </div>
  );
}
