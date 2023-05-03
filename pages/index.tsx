import Head from "next/head";
import Image from "next/image";
import FeedBackDetails from "../components/feedbacks";
import EditFeedBack from "../components/feedbacks/EditFeedBack";
import NewFeedBack from "../components/feedbacks/NewFeedBack";
import Roadmap from "../components/roadmap";
import Suggestions from "../components/suggestions";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className=" md:flex md:items-center md:justify-center md:py-8">
      <Head>
        <title>FeedBack App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suggestions />
    </div>
  );
}