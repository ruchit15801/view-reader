import { useEffect, useState } from "react";

export default function useScrollProgress() {

  const [progress,setProgress] = useState(0);

  useEffect(()=>{

    const handleScroll = () => {

      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const percent = (scrollTop / height) * 100;

      setProgress(percent);

    };

    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll",handleScroll);

  },[]);

  return progress;

}