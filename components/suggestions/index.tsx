import Cards from "./cards";
import Suggestion from "./Suggestion";
import SuggestionEmpty from "./SuggestionEmpty";
import SuggestionHeader from "./SuggestionHeader";
import data from "../../data.json";
import {useAppSelector} from "../../store/hooks";
import {useMemo, useEffect, useState} from "react";
import {FeedBackDetails} from "../feedbacks";
import MobileHeader from "./mobile/Header";
import MobileSideBar from "./mobile/SideBar";

const Suggestions = () => {
  const productRequests = useAppSelector((state) => {
    let suggestions: FeedBackDetails[];
    if (state.category.toLocaleLowerCase() === "all") {
      suggestions = state.productRequests.filter((request) => request.status === "suggestion");
    } else {
      suggestions = state.productRequests.filter(
        (request) =>
          request.category.toLowerCase() === state.category.toLowerCase() &&
          request.status === "suggestion"
      );
    }
    switch (state.filter) {
      case "Most comments":
        return suggestions.sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
      case "Least comments":
        return suggestions.sort((a, b) => {
          return a.comments.length - b.comments.length;
        });
      case "Most upvotes":
        return suggestions.sort((a, b) => b.upvotes - a.upvotes);
      case "Least upvotes":
        return suggestions.sort((a, b) => a.upvotes - b.upvotes);
      default:
        return suggestions;
    }
  });

  return (
    <div className="md:w-[43.0625rem] lg:w-[68.5625rem] lg:flex  lg:space-x-10 lg:space-y-0 md:space-y-8">
      <MobileHeader />
      <MobileSideBar filteredRequests={productRequests} />
      <div className="hidden lg:w-[16rem]  lg:h-full md:grid grid-cols-3 gap-x-2  lg:flex lg:flex-col lg:space-y-4">
        <Cards filteredRequests={productRequests} />
      </div>
      <div className="  lg:w-[51.5625rem] h-full flex flex-col space-y-3 ">
        <SuggestionHeader filteredRequests={productRequests} />
        {productRequests.length === 0 && <SuggestionEmpty />}
        <div className="h-full flex flex-col space-y-3 mx-6 md:mx-0 pb-2">
          {productRequests.map((suggestion) => (
            <Suggestion key={suggestion.id} {...suggestion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
