import React, {useEffect} from "react";
/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {object, string} from "yup";
import {CheckIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon} from "@heroicons/react/20/solid";
import clsx from "clsx";
import {Formik, Form, Field} from "formik";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteFeedBack, editFeedBack} from "../../store/features/productRequests";
import {useRouter} from "next/router";
import SuccessFeedBack from "../modals/feedback";
const categories = ["Bug", "UX", "UI", "Feature", "Enhancement"];
const status = ["planned", "in-progess", "live"];
type SetValues = (
  values: React.SetStateAction<{
    title: string;
    description: string;
    category: string;
    status: string;
  }>,
  shouldValidate?: boolean
) => void;
function CustomSelect({
  options,
  setValues,
  type,
  current,
}: {
  options: string[];
  setValues: SetValues;
  type: string;
  current: string;
}) {
  const [selected, setSelected] = useState(current);
  useEffect(() => {
    setValues((values) => {
      return {
        ...values,
        [type]: selected,
      };
    });
  }, [selected, setValues, type]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({open}) => (
        <>
          <div className="relative mt-3 ">
            <Listbox.Button className="h-[3rem] relative w-full cursor-default rounded-md border border-gray-300 bg-very-light-blue py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {open ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({active}) =>
                      clsx(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({selected, active}) => (
                      <>
                        <span
                          className={clsx(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default function EditFeedBack() {
  const router = useRouter();
  const {id} = router.query;
  const dispatch = useAppDispatch();
  const feedBack = useAppSelector((state) =>
    state.productRequests.find((productRequest) => productRequest.id === Number(id))
  );
  const [openModal, setOpenModal] = useState(false);
  if (!feedBack) return null;
  return (
    <>
      <SuccessFeedBack open={openModal} setOpen={setOpenModal} />
      <Formik
        initialValues={{
          title: feedBack.title,
          description: feedBack.description,
          category: feedBack.category,
          status: feedBack.status,
        }}
        validationSchema={object({
          title: string().required("Can't be empty"),
        })}
        onSubmit={({title, description, category, status}) => {
          dispatch(editFeedBack({id: Number(id), title, description, category, status}));
          setOpenModal(true);
        }}
      >
        {({setValues, touched, errors}) => {
          return (
            <Form className="px-4 md:max-w-[33.75rem] mx-auto flex flex-col items-center justify-center space-y-8">
              <div className="flex justify-start items-center w-full">
                <button type="button" onClick={() => router.back()} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-4 stroke-simple-blue"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  <p className="text-medium-grey font-bold">Go back</p>
                </button>
              </div>
              <div className="bg-white  flex flex-col justify-center items-start space-y-8 p-8 rounded-md w-full">
                <div className="w-12 h-12 -mt-[52px] z-10 rounded-full -top-6  flex items-center justify-center">
                  <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient
                        cx="103.9%"
                        cy="-10.387%"
                        fx="103.9%"
                        fy="-10.387%"
                        r="166.816%"
                        id="a"
                      >
                        <stop stopColor="#E84D70" offset="0%" />
                        <stop stopColor="#A337F6" offset="53.089%" />
                        <stop stopColor="#28A7ED" offset="100%" />
                      </radialGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <circle fill="url(#a)" cx="20" cy="20" r="20" />
                      <path
                        d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z"
                        fill="#FFF"
                        fillRule="nonzero"
                      />
                    </g>
                  </svg>
                </div>
                <h1 className="text-slate-blue font-bold text-[18px] md:text-2xl w-full">
                  {` Editing ‘${feedBack.title}’`}
                </h1>
                <div className="w-full ">
                  <h2 className="text-slate-blue font-bold text-sm">Feedback Title</h2>
                  <h3 className="text-medium-grey text-sm">Add a short, descriptive headline</h3>
                  <Field
                    required
                    name="title"
                    className={clsx(
                      "bg-very-light-blue w-full h-[3rem] mt-3 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600",
                      touched.title && errors.title ? "border border-red-500 animate-pulse" : ""
                    )}
                  />
                  {touched.title && errors.title ? (
                    <div className="text-xs text-red-500 animate-pulse">{errors.title}</div>
                  ) : null}
                </div>
                <div className="w-full ">
                  <h2 className="text-slate-blue font-bold text-sm">Category</h2>
                  <h3 className="text-medium-grey text-sm">Choose a category for your feedback</h3>
                  <CustomSelect
                    options={categories}
                    setValues={setValues}
                    type="category"
                    current={feedBack.category}
                  />
                </div>
                <div className="w-full ">
                  <h2 className="text-slate-blue font-bold text-sm">Update status</h2>
                  <h3 className="text-medium-grey text-sm">Change feedback state</h3>
                  <CustomSelect
                    options={status}
                    setValues={setValues}
                    type="status"
                    current={feedBack.status}
                  />
                </div>
                <div className="w-full ">
                  <h2 className="text-slate-blue font-bold text-sm">Feedback Detail</h2>
                  <h3 className="text-medium-grey text-sm">
                    Include any specific comments on what should be improved, added, etc.
                  </h3>
                  <Field
                    name="description"
                    component="textarea"
                    className="border-none bg-very-light-blue w-full h-[6rem] mt-3 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <div className="hidden w-full md:flex items-center justify-between space-x-3 mt-3 ">
                    <button
                      type="button"
                      className="bg-[#D73737] text-white py-2 px-4 rounded-md"
                      onClick={() => {
                        dispatch(deleteFeedBack({id: Number(id)}));
                        router.push("/");
                      }}
                    >
                      Delete
                    </button>
                    <div className="space-x-3">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-slate-blue text-white py-2 px-4 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-simple-purple text-white py-2 px-4 rounded-md"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden w-full flex flex-col items-center justify-center mt-3 space-y-4">
                    <button
                      type="submit"
                      className="bg-simple-purple text-white py-2 px-4 rounded-md w-full"
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      onClick={() => router.back()}
                      className="bg-slate-blue text-white py-2 px-4 rounded-md w-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-[#D73737] text-white py-2 px-4 rounded-md w-full"
                      onClick={() => {
                        dispatch(deleteFeedBack({id: Number(id)}));
                        router.push("/");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
