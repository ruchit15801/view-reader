"use client";

import Reader from "@/components/Reader";

export default function ReaderPage() {

    return (
        <div className="bg-[#f6f6f6] text-black">
            <Reader />
        </div>
    );
}


// "use client";

// import { useState } from "react";
// import IntroAnimation from "@/components/IntroAnimation";
// import Reader from "@/components/Reader";

// export default function ReaderPage() {

//   const [showReader, setShowReader] = useState(false);

//   return (
//     <div className="bg-[#f6f6f6] text-black">

//       {!showReader && (
//         <IntroAnimation onComplete={() => setShowReader(true)} />
//       )}

//       {showReader && <Reader />}

//     </div>
//   );
// }