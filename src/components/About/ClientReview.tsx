// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import avatar_1 from "/avatar-1.png";
// import avatar_2 from "/avatar-2.png";
// import avatar_3 from "/avatar-3.png";
// import avatar_4 from "/avatar-4.png";
// import useEmblaCarousel from "embla-carousel-react";

// interface TestimonialDataType {
//   id: number;
//   name: string;
//   date: string;
//   quote: string;
//   icon: string;
// }

// const testimonialsData: TestimonialDataType[] = [
//   {
//     id: 1,
//     name: "Henry William",
//     date: "12 April, 2025",
//     quote:
//       "Sojib is a brilliant designer who transformed my ideas into stunning visuals. Their attention to detail and creativity are unmatched. I highly recommend their services!",
//     icon: avatar_1,
//   },
//   {
//     id: 2,
//     name: "Sophia Carter",
//     date: "28 May, 2025",
//     quote:
//       "Working with Sojib was an absolute pleasure. They understood my vision perfectly and delivered results beyond expectations.",
//     icon: avatar_2,
//   },
//   {
//     id: 3,
//     name: "Emily Johnson",
//     date: "16 July, 2025",
//     quote:
//       "The professionalism and design expertise made the whole process smooth and enjoyable. I ll definitely come back for future projects with Sojib.",
//     icon: avatar_3,
//   },
//   {
//     id: 4,
//     name: "James Anderson",
//     date: "05 September, 2025",
//     quote:
//       "Creative, reliable, and highly skilled — Sojib took my project to the next level with designs that truly stand out.",
//     icon: avatar_4,
//   },
//   {
//     id: 5,
//     name: "Emily Johnson",
//     date: "16 July, 2025",
//     quote:
//       "The professionalism and design expertise made the whole process smooth and enjoyable. I ll definitely come back for future projects with Sojib.",
//     icon: avatar_3,
//   },
// ];

// const ClientReview = () => {
//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     { loop: true, align: "start" }, // 👈 autoplay removed
//   );
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
//     onSelect();
//     emblaApi.on("select", onSelect);

//     return () => {
//       emblaApi.off("select", onSelect);
//     };
//   }, [emblaApi]);

//   return (
//     <div className="overflow-hidden">
//       <h1 className="text-xl font-semibold ">Happy Clients</h1>

//       {/* Carousel */}
//       <div className="embla embla--two" ref={emblaRef}>
//         <div className="embla__container gap-5 flex mt-20">
//           {testimonialsData.map((data) => (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 1 }}
//               key={data.id}
//               className="embla__slide w-full md:w-1/2 bgGrayGradient flex flex-col gap-2 p-3 md:p-5 rounded-xl relative overflow-visible"
//             >
//               <div className="flex items-start">
//                 <figure className="p-2 bgGradient rounded-3xl flex justify-center items-center absolute -top-10 left-4">
//                   <img
//                     src={data.icon}
//                     alt={data.name}
//                     className="h-14 w-14 object-cover"
//                   />
//                 </figure>
//                 <h1 className="mt-7 md:mt-2 md:absolute md:top-0 md:left-[100px] font-medium">
//                   {data.name}
//                 </h1>
//               </div>
//               <p className="tracking-tight mt-1 md:mt-3 text-sm font-light text-gray-400 leading-relaxed">
//                 {data.quote}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Indicators */}
//       <div className="flex justify-center gap-2 mt-6">
//         {testimonialsData.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => emblaApi && emblaApi.scrollTo(idx)}
//             className={`w-2 h-2 rounded-full transition-all duration-300 ${
//               idx === selectedIndex
//                 ? "bg-[var(--primary)] scale-110"
//                 : "bg-[var(--primary)] opacity-40"
//             }`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClientReview;
