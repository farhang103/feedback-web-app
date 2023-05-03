import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import data from "../../data.json";

const productRequestSlice = createSlice({
    initialState: data.productRequests,
    name: "productRequests",
    reducers: {
        addFeedBack: (
            productRequests,
            action: PayloadAction<{
                title: string;
                description: string;
                category: string;
            }>
        ) => {
            const { title, description, category } = action.payload;
            const id = productRequests.length + 1;
            productRequests.push({
                id,
                title,
                category,
                description,
                comments: [],
                upvotes: 0,
                status: "suggestion",
            });
        },
        editFeedBack: (
            productRequests,
            action: PayloadAction<{
                id: number;
                title: string;
                description: string;
                category: string;
                status: string;
            }>
        ) => {
            const { id, title, description, category, status } = action.payload;
            return productRequests.map((productRequest) => {
                if (productRequest.id === id) {
                    return {
                        ...productRequest,
                        title,
                        description,
                        category,
                        status,
                    };
                }
                return productRequest;
            });
        },
        deleteFeedBack: (
            productRequests,
            action: PayloadAction<{ id: number }>
        ) => {
            return productRequests.filter(
                (productRequest) => productRequest.id !== action.payload.id
            );
        },
        replyToComment: (
            productRequests,
            action: PayloadAction<{
                feedBackId: number;
                commentId: number;
                content: string;
                replyingTo: string;
                user: {
                    image: string;
                    name: string;
                    username: string;
                };
            }>
        ) => {
            const { feedBackId, commentId, content, replyingTo, user } =
                action.payload;
            const feedBack = productRequests.find(
                (productRequest) => productRequest.id === feedBackId
            );

            const comment = feedBack.comments.find(
                (comment) => comment.id === commentId
            );
            if (comment.replies) {
                comment.replies.push({
                    content,
                    replyingTo,
                    user,
                });
            } else {
                comment.replies = [];
                comment.replies.push({
                    content,
                    replyingTo,
                    user,
                });
            }
        },
        addComment: (
            productRequests,
            action: PayloadAction<{
                feedBackId: number;
                content: string;
                user: {
                    image: string;
                    name: string;
                    username: string;
                };
            }>
        ) => {
            const { feedBackId, content, user } = action.payload;
            const commentLength = productRequests
                .map((productRequest) => productRequest.comments)
                .flat().length;
            const feedBack = productRequests.find(
                (productRequest) => productRequest.id === feedBackId
            );
            feedBack.comments.push({
                id: commentLength + 1,
                content,
                user,
            });
        },
        upVote: (
            productRequests,
            action: PayloadAction<{ feedBackId: number }>
        ) => {
            const { feedBackId } = action.payload;
            return productRequests.map((request) => {
                if (request.id === feedBackId) {
                    return {
                        ...request,
                        upvotes: request.upvotes + 1,
                    };
                }
                return request;
            });
        },
        downVote: (
            productRequests,
            action: PayloadAction<{ feedBackId: number }>
        ) => {
            const { feedBackId } = action.payload;
            return productRequests.map((request) => {
                if (request.id === feedBackId) {
                    return {
                        ...request,
                        upvotes: request.upvotes - 1,
                    };
                }
                return request;
            });
        },
    },
});
export const {
    addFeedBack,
    editFeedBack,
    deleteFeedBack,
    replyToComment,
    addComment,
    upVote,
    downVote,
} = productRequestSlice.actions;
export default productRequestSlice.reducer;
