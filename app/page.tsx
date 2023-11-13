"use client"
import axios from 'axios';
import { ethers, providers } from 'ethers';
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any
  }
}

interface Register {
  signature: string;
  address: string;
}

function Home() {
  const [name, setName] = useState<string>();
  const [register, setRegister] = useState<Register>()

  const sendToMEM = async () => {
    try {
      if (register?.signature && name) {
        const response = await axios.post("/api", JSON.stringify({
          input: {
            function: "register",
            name: name,
            signature: register.signature,
            caller: register.address
          }
        }));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle unexpected errors
    }
  };

  const connect = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      const provider: any = new providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const message = "Sign to register"

      const address = await signer.getAddress();

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      setRegister({
        address: address,
        signature: Buffer.from(signature).toString("base64"),
      });
    }

    sendToMEM();
  }

  return (
    <div className="p-4">
      <span className="justify-center">
        {register?.signature ?
          <div className="flex flex-col gap-4">
            <input type="text" id="name" placeholder="Name" className="text-black" onChange={(e: React.ChangeEvent) => setName(e.target.value)} />
            <button type="button" className="btn btn-blue outline rounded-sm px-2" onClick={() => sendToMEM()}>Send To MEM state</button>
          </div>
          :
          <>
            <button type="button" className="btn btn-blue outline rounded-sm px-2" onClick={() => connect()}>Connect</button>
          </>
        }
      </span>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
