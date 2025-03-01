/* eslint-disable react/prop-types */

const FeedCard = ({user}) => {
    // const {firstName, lastName, age, gender, about, skills, profileUrl} = user
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
            <img
            src={user?.profile}
            alt={`${user?.firstName} ${user?.lastName} Photo`} />
        </figure>
        <div className="card-body">
            <h2 className="card-title font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
            <p>{user?.about}</p>
            { user?.age && user?.gender && <div className="card-actions my-2">
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Age: {user?.age}</div>
                <div className="badge badge-outline py-3 px-6 text-black text-base bg-secondary">Gender: {user?.gender}</div>
            </div>}
            <div>
                Skills: {user?.skills.join(" , ")}
            </div>
            <div className="card-actions justify-center my-5">
                <button className="btn btn-error px-12">Ignore</button>
                <button className="btn btn-success px-12">Interested</button>
            </div>
        </div>
    </div>
  )
}

export default FeedCard