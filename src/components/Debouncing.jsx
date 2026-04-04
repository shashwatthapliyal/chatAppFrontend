// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { changeColor } from "../utils/demoSlice";

// const Debouncing = () => {
//   const dispatch = useDispatch();

//   const [value, setvalue] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log("Fetch.....");
//     }, 200);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="email-id"
//         onChange={(e) => setvalue(e.target.value)}
//       ></input>

//       <button onClick={() => dispatch(changeColor())}>Click</button>
//     </div>
//   );
// };

// export default Debouncing;

// implemented debouncing and redux code.......
