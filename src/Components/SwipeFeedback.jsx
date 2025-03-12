/* eslint-disable react/prop-types */


const getFeedbackStyle = (swipeFeedback) => {
	if (swipeFeedback === "interested") return "text-green-500";
	if (swipeFeedback === "ignored") return "text-red-500";
	if (swipeFeedback === "accepted") return "text-green-500";
	return "";
};

const getFeedbackText = (swipeFeedback) => {
	if (swipeFeedback === "interested") return "Liked!";
	if (swipeFeedback === "ignored") return "Passed";
	if (swipeFeedback === "accepted") return "It's a Match!";
	return "";
};

const SwipeFeedback = ({swipeFeedback}) => {

	return (
		<div
			className={`
		absolute top-4 left-0 right-0 text-center text-2xl font-bold ${getFeedbackStyle(swipeFeedback)}
		`}
		>
			{getFeedbackText(swipeFeedback)}
		</div>
	);
};
export default SwipeFeedback;
