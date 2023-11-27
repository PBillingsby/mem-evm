"use client"
import axios, { AxiosResponse } from 'axios';
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
  const [registry, setRegistry] = useState<Register>();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<object[]>([]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const users: AxiosResponse = await axios.get(`https://mem-testnet.xyz/state/${process.env.NEXT_PUBLIC_FUNCTION_ID}`)
    setUsers(users.data.names);
  }

  const sendToMEM = async () => {
    try {
      if (registry?.signature && name) {
        setLoading(true);
        try {
          const response: AxiosResponse = await axios.post("/api", JSON.stringify({
            function: "register",
            name: name,
            signature: registry.signature,
            caller: registry.address
          }));

          if (response.status === 200) {
            setLoading(false);
            fetchUsers();
          }
        } catch (err) {
          setError(err)
          setLoading(false)
        }
      }
    } catch (error) {
      setError(error)
      setLoading(false)
      console.error("An error occurred:", error);
    }
    setRegistry(undefined);
  };

  const connect = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      let message: string = "hello world";
      await provider.send('eth_requestAccounts', []);
      const address: string = await signer.getAddress();

      const signaturePromise: Promise<string> = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address],
      });

      const signature: string = await signaturePromise;

      setRegistry({
        address: address,
        signature: signature,
      });
    }
  }

  return (
    <div className="p-4">
      <span className="justify-center">
        {registry?.signature ? (
          loading ? (
            <p>...loading</p>
          ) : (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                id="name"
                autoComplete="off"
                placeholder="Name"
                className="text-black"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              />
              <button type="button" className="btn btn-blue outline rounded-sm px-2" onClick={() => sendToMEM()}>
                Send To MEM Function
              </button>
            </div>
          )
        ) : (
          <button type="button" className="btn btn-blue outline rounded-sm px-2" onClick={() => connect()}>
            Connect
          </button>
        )}
      </span>
      {error && !registry && <p className="text-center">Error has occured - {error.code}</p>}

      <div className="pt-8 flex gap-4 w-auto justify-between">
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
