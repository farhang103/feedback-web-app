import React, { useMemo, useEffect } from "react";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import clsx from "clsx";
import { useAppDispatch } from "../../store/hooks";
import { addFeedBack } from "../../store/features/productRequests";
import SuccessFeedBack from "../modals/feedback";
import { useRouter } from "next/router";
type setValues = (
    values: React.SetStateAction<{
        title: string;
        category: string;
        description: string;
    }>,
    shouldValidate?: boolean
) => void;
const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
];

function CustomSelect({
    features,
    setValues,
}: {
    features: string[];
    setValues: setValues;
}) {
    const [selected, setSelected] = useState(features[0]);
    useEffect(() => {
        setValues((values) => {
            return {
                ...values,
                category: selected,
            };
        });
    }, [selected, setValues]);
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative mt-3 ">
                        <Listbox.Button className="h-[3rem] relative w-full cursor-default rounded-md border border-gray-300 bg-very-light-blue py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                {open ? (
                                    <ChevronUpIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <ChevronDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
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
                                {features.map((feature) => (
                                    <Listbox.Option
                                        key={feature}
                                        className={({ active }) =>
                                            clsx(
                                                active
                                                    ? "text-white bg-indigo-600"
                                                    : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={feature}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={clsx(
                                                        selected
                                                            ? "font-semibold"
                                                            : "font-normal",
                                                        "block truncate"
                                                    )}
                                                >
                                                    {feature}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={clsx(
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
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
const initialValues = {
    title: "",
    category: "",
    description: "",
};
export default function NewFeedBack() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const features = useMemo(() => {
        return ["Feature", "UX", "UI", "Bug", "Enhancement"];
    }, []);
    return (
        <>
            <SuccessFeedBack open={openModal} setOpen={setOpenModal} />
            <Formik
                initialValues={initialValues}
                validationSchema={object({
                    title: string().required("Can't be empty"),
                    description: string().required("Can't be empty"),
                })}
                onSubmit={({ title, category, description }) => {
                    dispatch(
                        addFeedBack({
                            title,
                            category,
                            description,
                        })
                    );
                    setOpenModal(true);
                }}
            >
                {({ setValues, touched, errors }) => {
                    return (
                        <Form className="px-4 max-w-[33.75rem] mx-auto flex flex-col items-center justify-center space-y-8">
                            <div className="flex justify-start items-center w-full">
                                <div className="flex items-center">
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
                                    <button
                                        type="button"
                                        onClick={() => router.back()}
                                        className="text-medium-grey font-bold curosor-pointer"
                                    >
                                        Go back
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white  flex flex-col justify-center items-start space-y-8 p-8 rounded-md w-full">
                                <div className="w-12 h-12 -mt-[52px] z-10 rounded-full -top-6 bg-gradient-to-tl from-[#ED5174] to-[#28A7ED] via-[#A337F6] flex items-center justify-center">
                                    <PlusIcon className="fill-white w-10 h-10" />
                                </div>
                                <h1 className="text-slate-blue font-bold md:text-2xl text-lg">
                                    Create new feedback
                                </h1>
                                <div className="w-full ">
                                    <h2 className="text-slate-blue font-bold text-sm">
                                        Feedback Title
                                    </h2>
                                    <h3 className="text-medium-grey text-sm">
                                        Add a short, descriptive headline
                                    </h3>
                                    <Field
                                        name="title"
                                        className={clsx(
                                            "bg-very-light-blue w-full h-[3rem] mt-3 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600",
                                            touched.title && errors.title
                                                ? "border border-red-500 animate-pulse"
                                                : ""
                                        )}
                                    />
                                    {touched.title && errors.title ? (
                                        <div className="text-xs text-red-500 animate-pulse">
                                            {errors.title}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="w-full ">
                                    <h2 className="text-slate-blue font-bold text-sm">
                                        Category
                                    </h2>
                                    <h3 className="text-medium-grey text-sm">
                                        Choose a category for your feedback
                                    </h3>
                                    <CustomSelect
                                        features={features}
                                        setValues={setValues}
                                    />
                                </div>
                                <div className="w-full ">
                                    <h2 className="text-slate-blue font-bold text-sm">
                                        Feedback Detail
                                    </h2>
                                    <h3 className="text-medium-grey text-sm">
                                        Include any specific comments on what
                                        should be improved, added, etc.
                                    </h3>
                                    <Field
                                        component="textarea"
                                        name="description"
                                        className={clsx(
                                            " bg-very-light-blue w-full h-[6rem] mt-3 rounded-md p-4 focus:outline-none focus:ring-2 ",
                                            touched.description &&
                                                errors.description
                                                ? "border border-red-500 animate-pulse focus:ring-red-500"
                                                : "focus:ring-indigo-600 border-none"
                                        )}
                                    />
                                    {touched.description &&
                                    errors.description ? (
                                        <div className="text-sm text-red-500 animate-pulse">
                                            {errors.description}
                                        </div>
                                    ) : null}
                                    <div className="w-full md:space-y-0 space-y-3 flex flex-col-reverse md:flex-row items-center justify-center md:justify-end md:space-x-3 mt-3 ">
                                        <button
                                            onClick={() => router.back()}
                                            type="button"
                                            className="w-full bg-slate-blue hover:bg-blue-900 text-white py-2 px-4 rounded-md mt-3 md:mt-0"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-simple-purple hover:bg-purple-900 text-white py-2 px-4 rounded-md w-full "
                                        >
                                            Add Feedback
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
