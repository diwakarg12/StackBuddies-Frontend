/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Heart, Loader, MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
    // const [isLoadingMyMatches, setIsLoadingMyMatches]=  useState(false);
	const isLoadingMyMatches = false;
	const connections = useSelector(store=>store.connection)
	const toggleSidebar = () => setIsOpen(!isOpen);

    const getMyMatches = () => {
        console.log('Hello')
    }

	useEffect(() => {
		getMyMatches();
	}, [getMyMatches]);

	return (
		<>
			<div className={`fixed inset-y-0 left-0 z-10 w-64 bg-pink-50 shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : 	"-translate-x-full"} lg:translate-x-0 lg:static lg:w-1/4`}
			>
				<div className='flex flex-col h-full'>
					<div className='p-4 pb-[20px] border-b border-pink-200 flex justify-between items-center'>
						<h2 className='text-xl font-bold text-pink-600'>CONNECTIONS</h2>
						<button
							className='lg:hidden p-1 text-gray-500 hover:text-gray-900 focus:outline-none'
							onClick={toggleSidebar}
						>
							<X size={24} />
						</button>
					</div>

					<div className='flex-grow overflow-y-auto p-4 z-10 relative'>
						{isLoadingMyMatches ? (
							<LoadingState />
						) : connections?.length === 0 ? (
							<NoMatchesFound />
						) : (
							connections?.map((match) => (
								<Link key={match._id} to={`/chat/${match._id}`}>
									<div className='flex items-center mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors duration-300'>
										<img
											src={match.profileUrl || "/avatar.png"}
											alt='User avatar'
											className='size-12 object-cover rounded-full mr-3 border-2 border-pink-300'
										/>

										<h3 className='font-semibold text-gray-800'>{`${match.firstName} ${match.lastName}`}</h3>
									</div>
								</Link>
							))
						)}
					</div>
				</div>
			</div>

			<button
				className='lg:hidden fixed top-1.5 left-2 p-2 bg-pink-500 text-white rounded-md z-0'
				onClick={toggleSidebar}
			>
				<MessageCircle size={20} />
			</button>
		</>
	);
};
export default Sidebar;

const NoMatchesFound = () => (
	<div className='flex flex-col items-center justify-center h-full text-center'>
		<Heart className='text-pink-400 mb-4' size={48} />
		<h3 className='text-xl font-semibold text-gray-700 mb-2'>No Matches Yet</h3>
		<p className='text-gray-500 max-w-xs'>
			Don&apos;t worry! Your perfect match is just around the corner. Keep swiping!
		</p>
	</div>
);

const LoadingState = () => (
	<div className='flex flex-col items-center justify-center h-full text-center'>
		<Loader className='text-pink-500 mb-4 animate-spin' size={48} />
		<h3 className='text-xl font-semibold text-gray-700 mb-2'>Loading Matches</h3>
		<p className='text-gray-500 max-w-xs'>We&apos;re finding your perfect matches. This might take a moment...</p>
	</div>
);
