// import Navbar from "../compontents/Navbar";
// import bgImage from '../assets/image/libraryhome.jpeg'

// const AdminHome = () => {
//   return (
//     <div className="items-center min-h-screen bg-cover bg-fixed" style={{ backgroundImage: `url(${bgImage})` }}>
//       <Navbar />
//       <div className="bg-orange-50 mt-40 h-56 flex flex-col justify-center items-center text-center p-4">
//         <p className="text-4xl font-bold font-serif">"There is more Treasure in Books than in all the pirate's loot on Treasure Island"</p>
//         <p className="font-serif pt-4">_by Walt Disney</p>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;



import Navbar from "../compontents/Navbar";
import bgImage from '../assets/image/libraryhome.jpeg';

const AdminHome = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <div className="bg-orange-50 mt-50 h-56 flex flex-col justify-center items-center text-center p-4">
        <p className="text-4xl font-bold font-serif">
          "There is more Treasure in Books than in all the pirate's loot on Treasure Island"
        </p>
        <p className="font-serif pt-4">_by Walt Disney</p>
      </div>
    </div>
  );
};

export default AdminHome;
