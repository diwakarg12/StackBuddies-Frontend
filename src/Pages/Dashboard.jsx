import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(store =>store.user);
  const connection = useSelector(store =>store.connection);
  const sentConnection = useSelector(store =>store.sentConnection);
  const receivedConnection = useSelector(store =>store.receivedConnection);
  console.log(connection, sentConnection, receivedConnection)

  const {firstName, lastName, email, age, gender, about, skills, profileUrl} = user;
  return (
    <div className="flex flex-col items-center justify-center my-10 mx-52">
      <h1 className="text-3xl font-semibold text-white">{`Welcome ${firstName} ${lastName}`}</h1>
      <div className="flex items-center justify-center gap-x-8 my-6 w-full">
        <div className="bg-slate-50 w-8/12 border-2 p-4 flex">
            <div className="w-2/5 border-2">
              <img src={profileUrl} className="h-36 w-36 rounded-full" />
              {/* <p>{`You have ${connection.length} Connections`}</p> */}
            </div>
            <div className="text-black mx-2 font-medium flex flex-col gap-y-1 w-3/5">
              <p>{`${firstName} ${lastName}`}</p>
              {age && <p>{`Age: ${age}`}</p>}
              {gender && <p>{`Gender: ${gender}`}</p>}
              {email && <p>{`Email : ${email}`}</p>}
              {skills && <p>{`Skills: ${skills.join(' | ')}`}</p>}
              {about && <p>{`About: ${about}`}</p>}
              <Link to={'/edit-profile'} className="btn btn-primary font-semibold text-white text-lg my-4">Edit Profile</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard