"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
function Home() {
  const [count, setCount] = useState<number>(0);

  const readState = async () => {
    await fetch("/api").then(res => res.json()).then(obj => setCount(obj.data.count));
  };

  useEffect(() => {
    readState();
  }, []);

  const incrementState = async () => {
    const response = await fetch("/api", {
      method: "POST",
    });

    if (response.ok) {
      const data = await response.json();
      setCount(data.count);
    }
  };

  return (
    <div className="main">
      <span>
        <img src="./mem-logo-v2.svg" alt="mem" width="50" height="50" />
        <h1 className="text-2xl">MEM</h1>
      </span>
      <div className="flex flex-col items-center text-black">
        Count: {count}
        <button type="button" className="btn btn-blue outline rounded-sm px-2" onClick={incrementState}>Increment</button>
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
