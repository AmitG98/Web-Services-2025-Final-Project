// function Row({ title, fetchUrl }) {
//     const [items, setItems] = useState([]);
  
//     useEffect(() => {
//       async function fetchData() {
//         const { data } = await axios.get(fetchUrl);
//         setItems(data.results); // לפי המבנה שמחזיר השרת
//       }
//       fetchData();
//     }, [fetchUrl]);
  
//     return (
//       <div className="row">
//         <h2>{title}</h2>
//         <div className="row-items">
//           {items.map((item) => (
//             <img
//               key={item._id}
//               src={item.posterUrl}
//               alt={item.name}
//               // בלחיצה אפשר לפתוח מודאל "More Info"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
//   export default Row;
  