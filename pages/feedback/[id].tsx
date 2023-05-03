import { useRouter } from "next/router";
import FeedBackDetails from "../../components/feedbacks";
import { useAppSelector } from "../../store/hooks";

export default function FeedBack() {
    const router = useRouter();
    const { id } = router.query;
    const feedBack = useAppSelector((state) =>
        state.productRequests.find(
            (productRequest) => String(productRequest.id) === id
        )
    );
    //console.log(feedBack)
    return (
        <div className="md:flex md:items-center md:justify-center md:py-8 w-full">
            <FeedBackDetails feedBack={feedBack} />
        </div>
    );
}
