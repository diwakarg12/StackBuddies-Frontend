import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addReceivedConection, removeReceivedConnection } from "../Utils/receivedConnectionSlice";
import axios from "axios";
import { BASE_URL } from "./Constants";
import { Link } from "react-router-dom";

const ReceivedConnectionRequests = () => {
    const dispatch = useDispatch();
    const receivedRequests = useSelector(store => store.receivedConnection);
    console.log('ReceivedReq: ', receivedRequests);

    const handleRequest = async (status, id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {}, { withCredentials: true });
            console.log('Request handle ', res?.data?.reviewRequest );
            dispatch(removeReceivedConnection(res?.data?.reviewRequest?._id));
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    useEffect(() => {
        const fetchReceivedRequests = async () => {
            try {
                const receivedRequests = await axios.get(BASE_URL + "/user/reviewReceivedRequest", { withCredentials: true });
                console.log('Received', receivedRequests.data.receivedRequests);
                dispatch(addReceivedConection(receivedRequests.data.receivedRequests));
            } catch (error) {
                console.log('Error: ', error);
            }
        };
        fetchReceivedRequests();
    }, [dispatch]);

    if (!receivedRequests || receivedRequests.length === 0) {
        return <p className="font-bold text-lg py-8 text-center text-black min-h-[calc(100vh-50.9vh)]">You haven`t received any connection requests.</p>;
    }

    return (
        <div className="my-8">
            <div className="flex flex-col items-center justify-center">
                {receivedRequests?.map((user) => (
                    <div key={user._id} className="flex items-stretch rounded w-4/6 p-2 bg-white shadow-2xl my-2">
                        <Link className="w-1/4 flex" to={`/chat/${user?._id}`}>
                            <img
                                src={user?.fromUserId?.profileUrl}
                                alt={`${user?.fromUserId?.firstName} profile`}
                                className="object-cover w-full h-full"
                            />
                        </Link>

                        <div className="w-3/4 px-4 flex flex-col justify-center">
                            {user?.fromUserId?.firstName && user?.fromUserId?.lastName &&
                                <p className="text-black">
                                    {`${user?.fromUserId?.firstName} ${user?.fromUserId?.lastName}`}
                                </p>}
                            {(user?.fromUserId?.age || user?.fromUserId?.gender) &&
                                <p className="text-black">
                                    Age: {user?.fromUserId?.age}, Gender: {user?.fromUserId?.gender}
                                </p>}
                            {user?.fromUserId?.about &&
                                <p className="text-black">
                                    {user?.fromUserId?.about}
                                </p>}
                            {user?.fromUserId?.skills && user?.fromUserId?.skills?.length !== 0 &&
                                <p className="text-black font-medium text-lg">
                                    {user?.fromUserId?.skills.join(" | ")}
                                </p>}
                            <div className="flex my-2 gap-x-4">
                                <button className="bg-green-700 py-1.5 px-8 rounded text-white font-medium hover:bg-green-500" onClick={() => handleRequest('accepted', user?.fromUserId?._id)}>Accept</button>
                                <button className="bg-red-700 py-1.5 px-8 rounded text-white font-medium hover:bg-red-500" onClick={() => handleRequest('rejected', user?.fromUserId?._id)}>Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceivedConnectionRequests;