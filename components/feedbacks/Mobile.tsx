import Image from "next/image";
import React, {useState, useMemo, useRef, useEffect} from "react";
import Suggestion from "../suggestions/Suggestion";
import clsx from "clsx";
import {useRouter} from "next/router";
import Link from "next/link";
import {Formik, Form, Field} from "formik";
import {object, string} from "yup";
import {useDispatch} from "react-redux";
import {addComment, replyToComment} from "../../store/features/productRequests";
import data from "../../data.json";
import {useAppDispatch} from "../../store/hooks";
type Reply = {
  content: string;
  replyingTo: string;
  user: User;
};
type User = {
  image: string;
  name: string;
  username: string;
};
type Comment = {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
};
export interface FeedBackDetails {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: Comment[];
}

const Reply = ({
  reply,
  feedBackId,
  commentId,
}: {
  reply: Reply;
  feedBackId: number;
  commentId: number;
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={clsx("flex flex-col space-y-2  w-full")}>
      <div className="flex  items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <div className="relative w-10 h-10">
            <Image src={reply.user.image} layout="fill" alt="" className="rounded-full " />
          </div>
          <div>
            <h2 className="text-slate-blue font-bold text-xs md:text-base">{reply.user.name}</h2>
            <p className="text-medium-grey text-xs md:text-base">{reply.user.username}</p>
          </div>
        </div>

        <button
          onClick={() => setShowReplyBox((prev) => !prev)}
          className="text-simple-blue font-semibold text-[13px]"
        >
          Reply
        </button>
      </div>
      <div className="flex flex-col space-y-4 justify-center items-start">
        <p className="text-medium-grey text-xs">
          <span className="text-simple-purple font-bold ">{`@${reply.replyingTo} `}</span>
          {reply.content}
        </p>
        <Formik
          initialValues={{
            content: "",
          }}
          validationSchema={object({
            content: string().required("Can't be empty"),
          })}
          onSubmit={(values) => {
            dispatch(
              replyToComment({
                feedBackId,
                commentId,
                content: values.content,
                replyingTo: reply.user.name,
                user: data.currentUser,
              })
            );
            setShowReplyBox(false);
          }}
        >
          {({touched, errors}) => (
            <Form
              className={clsx(
                "justify-center items-start w-full mt-4 ",
                showReplyBox ? "flex flex-col" : "hidden"
              )}
            >
              <div className="w-full">
                <Field
                  name="content"
                  component="textarea"
                  className={clsx(
                    "w-full h-16 bg-very-light-blue rounded-md focus:outline-none p-4 text-[13px]",
                    touched.content && errors.content ? "border border-red-500" : "border-none"
                  )}
                />
                {touched.content && errors.content ? (
                  <div className="w-full text-left text-xs text-red-500">{errors.content}</div>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  className=" bg-simple-purple text-white py-1 px-2   rounded-md  text-[13px]"
                >
                  Post Reply
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
const CommentWithoutReply = ({
  comment,
  feedBackId,
  lastElement,
}: {
  comment: Comment;
  feedBackId: number;
  lastElement: boolean;
}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className={clsx("flex flex-col pb-2 ", !lastElement && " border-b border-b-gray-300 ")}>
      <div className="flex justify-between items-center ">
        <div className="flex space-x-2 items-center">
          <div className="relative w-10 h-10">
            <Image src={comment.user.image} layout="fill" alt="" className="rounded-full" />
          </div>
          <div>
            <h2 className="text-slate-blue font-bold text-[13px]">{comment.user.name}</h2>
            <p className="text-medium-grey text-[13px]">{comment.user.username}</p>
          </div>
        </div>

        <button
          onClick={() => setShowReplyBox((prev) => !prev)}
          className="text-simple-blue font-semibold text-[13px]"
        >
          Reply
        </button>
      </div>
      <div className="flex flex-col space-y-4 justify-center items-center w-full">
        <div className="flex justify-between items-center w-full"></div>
        <div className="w-full ">
          <p className="text-medium-grey md:text-base text-[13px]">{comment.content}</p>
          <Formik
            initialValues={{content: ""}}
            validationSchema={object({
              content: string().required("Can't be empty"),
            })}
            onSubmit={(values) => {
              dispatch(
                replyToComment({
                  feedBackId,
                  commentId: comment.id,
                  content: values.content,
                  replyingTo: comment.user.name,
                  user: data.currentUser,
                })
              );
              setShowReplyBox(false);
            }}
          >
            {({touched, errors}) => (
              <Form
                className={clsx(
                  "justify-between space-y-2 w-full mt-4 transform transition-all duration-300 ",
                  showReplyBox ? "flex flex-col " : "hidden"
                )}
              >
                <div className="">
                  <Field
                    name="content"
                    component="textarea"
                    className={clsx(
                      "w-full h-16 bg-very-light-blue rounded-md focus:outline-none p-4 text-[13px]",
                      touched.content && errors.content ? "border border-red-500" : "border-none"
                    )}
                  />
                  {touched.content && errors.content ? (
                    <div className="w-full text-left text-xs text-red-500">{errors.content}</div>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    className=" bg-simple-purple text-white py-1 px-2   rounded-md  text-[13px]"
                  >
                    Post Reply
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
const CommentWithReply = ({comment, feedBackId}: {comment: Comment; feedBackId: number}) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const dispatch = useAppDispatch();
  const [height, setHeight] = useState(0);

  return (
    <div className="flex flex-col  w-full  ">
      <div className="flex justify-between items-center  py-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="relative w-10 h-10">
            <Image src={comment.user.image} layout="fill" alt="" className="rounded-full" />
          </div>
          <div>
            <h2 className="text-slate-blue font-bold text-[13px]">{comment.user.name}</h2>
            <p className="text-medium-grey text-[13px]">{comment.user.username}</p>
          </div>
        </div>

        <button
          onClick={() => setShowReplyBox((prev) => !prev)}
          className="text-simple-blue font-semibold text-[13px]"
        >
          Reply
        </button>
      </div>
      <div className=" mt-1">
        <div className="w-full">
          <p className="text-medium-grey text-[13px]">{comment.content}</p>
          <Formik
            initialValues={{content: ""}}
            validationSchema={object({
              content: string().required("Can't be empty"),
            })}
            onSubmit={(values) => {
              dispatch(
                replyToComment({
                  feedBackId,
                  commentId: comment.id,
                  content: values.content,
                  replyingTo: comment.user.name,
                  user: data.currentUser,
                })
              );
              setShowReplyBox(false);
            }}
          >
            {({touched, errors}) => (
              <Form
                className={clsx(
                  "justify-center items-start w-full mt-4 transform transition-all duration-300 ",
                  showReplyBox ? "flex flex-col space-y-2" : "hidden"
                )}
              >
                <div className="w-full ">
                  <Field
                    name="content"
                    component="textarea"
                    className={clsx(
                      "w-full h-16 bg-very-light-blue rounded-md focus:outline-none p-4 text-[13px]",
                      touched.content && errors.content ? "border border-red-500" : "border-none"
                    )}
                  />
                  {touched.content && errors.content ? (
                    <div className="w-full text-left text-xs text-red-500">{errors.content}</div>
                  ) : null}
                </div>

                <div>
                  <button
                    type="submit"
                    className=" bg-simple-purple text-white py-1 px-2   rounded-md  text-[13px]"
                  >
                    Post Reply
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="flex items-start w-full ">
        <div className="mt-4">
          <div
            style={{
              height: 0.8 * height,
            }}
            className=" bg-gray-300 rounded-md  w-[0.5px]"
          />
        </div>

        <div
          ref={(e) => {
            if (e) setHeight(e.getBoundingClientRect().height);
          }}
          className="ml-3 space-y-4 mt-4 w-full"
        >
          {comment.replies.map((reply) => (
            <Reply
              key={`${Math.random() * 100}`}
              reply={reply}
              feedBackId={feedBackId}
              commentId={comment.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
const Comments = ({comments, feedBackId}: {comments: Comment[]; feedBackId: number}) => {
  const length = useMemo(() => {
    return (
      comments.length +
      comments.reduce((acc, comment) => {
        if (comment.replies) return comment?.replies.length + acc;
        return acc;
      }, 0)
    );
  }, [comments]);
  return (
    <div className="rounded-md bg-white p-4 space-y-6">
      <h1 className="text-slate-blue font-bold text-lg">
        {length} comment
        <span className={clsx(comments.length > 1 ? "inline-block" : "hidden")}>s</span>
      </h1>
      <>
        {comments.map((comment, index) => {
          if (comment.replies) {
            return <CommentWithReply key={comment.id} comment={comment} feedBackId={feedBackId} />;
          } else {
            return (
              <CommentWithoutReply
                key={comment.id}
                comment={comment}
                feedBackId={feedBackId}
                lastElement={index === comments.length - 1}
              />
            );
          }
        })}
      </>
    </div>
  );
};

export default function Mobile({feedBack}: {feedBack: FeedBackDetails}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const infos = useMemo(() => {
    if (feedBack) return feedBack;
    return;
  }, [feedBack]);

  if (!feedBack) return null;
  const {title, description, comments, upvotes, category, id} = infos;
  return (
    <div className="md:hidden space-y-6 my-2 mx-4 ">
      <div className="flex justify-between items-center w-full">
        <div role='header' className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-4 stroke-simple-blue"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <button
            className="text-medium-grey font-bold cursor-pointer"
            onClick={() => router.back()}
          >
            Go back
          </button>
        </div>
        <Link href={`/feedback/edit/${id}`}>
          <a className="text-white bg-[#4661E6] py-2 px-6 rounded-md">Edit feedback</a>
        </Link>
      </div>
      <Suggestion
        id={id}
        comments={comments}
        title={title}
        description={description}
        upvotes={upvotes}
        category={category}
      />
      {comments.length > 0 && <Comments comments={comments} feedBackId={id} />}
      <Formik
        initialValues={{content: ""}}
        validationSchema={object({
          content: string().required("Can't be empty"),
        })}
        onSubmit={({content}, formik) => {
          dispatch(
            addComment({
              feedBackId: id,
              content,
              user: data.currentUser,
            })
          );
          formik.resetForm();
        }}
      >
        {({touched, errors, values}) => (
          <Form className="bg-white px-4 py-6 rounded-md flex flex-col space-y-3 items-center justify-center">
            <h2 className="text-left w-full text-slate-blue text-lg font-bold">Add comment</h2>
            <Field
              name="content"
              component="textarea"
              className={clsx(
                "w-full h-[5rem] bg-very-light-blue rounded-md focus:outline-none p-4  placeholder:text-[13px] text-[13px]",
                touched.content && errors.content ? "border border-red-500" : "border-none"
              )}
              placeholder="Type your comment here"
              maxLength="250"
            />
            {touched.content && errors.content ? (
              <div className="w-full text-left text-xs text-red-500">{errors.content}</div>
            ) : null}
            <div className="w-full flex justify-between items-center">
              <p className="text-medium-grey text-[13px]">{`${
                250 - values.content.length
              } characters left`}</p>
              <button
                type="submit"
                className="text-white text-[13px] font-bold bg-simple-purple px-4 py-2 rounded-md"
              >
                Post comment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
