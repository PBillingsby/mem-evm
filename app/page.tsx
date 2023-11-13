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
  const [register, setRegister] = useState<Register>();
  const [users, setUsers] = useState<any[]>([]);

  console.log(users)
  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const users = await axios.get("https://api.mem.tech/api/state/mF9UkwpqDma-lHOXFqZuNw7-mS9-AzljTz7W5HqbSB8")
    setUsers(users.data.names);
  }

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
    }
  };

  const connect = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);

      const signer = provider.getSigner();

      let message = "hello world";

      const address = await signer.getAddress();

      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });


      setRegister({
        address: address,
        signature: signature,
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
      <div className="pt-8 flex gap-4 w-auto">
        {users && Object.entries(users).map(([address, name], index) => (
          <div key={index} className="border border-white p-2">
            <span className="text-white">Name: {name}</span>
            <span className="text-white text-center">{address}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
})
