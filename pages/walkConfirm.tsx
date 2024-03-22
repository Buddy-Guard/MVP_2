import React, { useState, useEffect, useContext } from "react";
import { LogoImage, Avatar1, Avatar2, next } from "../public/assets/images";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/layout";
import { ethers } from "ethers";
import Map from "../pages/map";
import initializeFirebaseClient from "../lib/initFirebase";
import { getAuth, User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";

import { Web3Button } from "@thirdweb-dev/react";

import { useMiContexto } from '../components/context/HexValueContext'; 


interface UserLocation {
  location: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: any;
  previousLocation: {
    latitude: number;
    longitude: number;
  };
}

const WalkConfirm = () => {
  const router = useRouter();
  const isMapPage = router.pathname === "/map";
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userLocations, setUserLocations] = useState<
    Record<string, UserLocation>
  >({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const { db: firestore } = initializeFirebaseClient();

  const contractAddress = "0x4eefa835a807c36dd0a643a7d97cd6e2b8ca29c2";
  const guardians = ["0xE1e5E0b3830454d68aE7B8926540a8AC0FdcabC0"];
  const addressTest = "0x030550677367301B46383eE6Bc07F7F989191458"

  const { miValor, setMiValor } = useMiContexto() as any;

  const handleUpdate = (_miValor: number) => {
    setMiValor(_miValor);
  };


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Listen for changes in user locations
    const unsubscribe = onSnapshot(
      collection(firestore, "users"),
      (snapshot) => {
        const locations = snapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data() as UserLocation;
          return acc;
        }, {} as Record<string, UserLocation>);
        setUserLocations(locations);
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <div className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center mt-5">
        <div className="p-4 flex w-full flex-col">
          {/* Top Section */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-[#d1d1d1] font-lato text-sm mb-1">
              Confirm Your Buddy Guard
            </h2>
            <div className={`w-full ${isMapPage ? "h-screen" : "h-[32vh]"}`}>
              <Map
                preview={!isMapPage}
                showOthers={true}
                userLocations={userLocations}
                currentUser={currentUser}
              />
            </div>
          </div>
          {/* Card Section */}
          <div className=" bg-[#0A0A0A] border-[#ECEC04] border-2 px-3 py-3 flex flex-col space-y-2">
            {/* Choose Your Buddy */}
            <div className="flex flex-col space-y-2 mb-4">
              {/* Choose Options */}
              <button
                className={`flex items-center space-x-4 border-[#ECEC04] border-2  py-2 px-2 ${
                  selectedOption === "buddyGuard"
                    ? "bg-[#ECEC04] text-[#121418]"
                    : "text-[#d1d1d1]"
                }`}
                onClick={() => setSelectedOption("buddyGuard")}
              >
                <Image
                  className="w-10 h-11 rounded-full"
                  src={LogoImage}
                  alt="Buddy Guard"
                />
                <div className="flex flex-col">
                  <span className="  font-lato text-left">
                    Buddy-Guard(Local)
                  </span>
                  <div className="flex text-sm font-latoLight flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className="font-lato">High Reputation</span>
                  </div>
                </div>
              </button>
              {/* Add similar buttons for other options */}
              <button
                className={`flex items-center space-x-4 bg-[#0A0A0A] border-[#ECEC04] text-[#121418] border-2   py-2 px-2 ${
                  selectedOption === "julietK"
                    ? "bg-[#ECEC04] text-[#121418]"
                    : "text-[#d1d1d1]"
                }`}
                onClick={() => setSelectedOption("julietK")}
              >
                <Image
                  className="w-11 h-11 rounded-full"
                  src={Avatar1}
                  alt="Juliet K"
                />
                <div className="flex flex-col">
                  <span className="  font-lato text-left">Juliet K</span>
                  <div className="flex text-sm font-latoLight flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className=" font-lato">High Reputation</span>
                  </div>
                </div>
              </button>
              {/* Add similar buttons for other options */}
              <button
                className={`flex items-center space-x-4 bg-[#0A0A0A] text-[#121418] border-[#ECEC04] border-2  py-2 px-2 ${
                  selectedOption === "jamesLee"
                    ? "bg-[#ECEC04] text-[#121418]"
                    : "text-[#d1d1d1]"
                }`}
                onClick={() => setSelectedOption("jamesLee")}
              >
                <Image
                  className="w-11 h-11 rounded-full"
                  src={Avatar2}
                  alt="James Lee"
                />
                <div className="flex flex-col">
                  <span className="  font-lato text-left">James Lee</span>
                  <div className="flex text-sm font-latoLight flex-row space-x-2">
                    <span>Near 200m</span>
                    <span className=" font-lato  ">Med Reputation</span>
                  </div>
                </div>
              </button>
            </div>
            {/* Total and duration */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-end items-center space-x-2">
                <span className=" font-latotext-2xl text-[#d1d1d1]">
                  Total -
                </span>
                <span className="relative">
                  <span className="text-lg font-lato text-[#d1d1d1]">
                    5000{" "}
                  </span>
                  <span className="font-lato text-[#d1d1d1]">
                    Buddy Guard Token
                  </span>
                </span>
              </div>
              <span className="font-latoLight text-[#d1d1d1] text-right ">
                15 mins Away to Your Destination
              </span>
            </div>
            <Web3Button
              className="bg-[#ECEC04] px-4 py-2  w-full flex items-center justify-center text-[#121418] font-lato animate-pulse"
              contractAddress="0x4eefa835a807c36dd0a643a7d97cd6e2b8ca29c2"
              action={(contract) => contract.call('createOrder', [guardians])}
              onSuccess={(result) => {
                const data = result;
  
                // Make sure data.receipt and data.receipt.events exist to avoid errors
                if (data.receipt && data.receipt.events) {
                  const targetEvent = data.receipt.events.find((event: { event: string; }) => event.event === "OrderCreated");
                  
                  if (targetEvent) {
                    // This assumes you want to save the "args" array from the targetEvent
                    const variableToSave = targetEvent.args;
                    console.log(`variableToSave`, variableToSave)
                    const hexValue = variableToSave['0']?._hex;
                    console.log(hexValue)
                    const parsedValue = parseInt(hexValue, 16); // Parse hex string to integer
                    console.log(`parsedValue: ${parsedValue}`);
                    handleUpdate(parsedValue);

                    // console.log(`hexValue: ${hexValue}`);
                    // Use variableToSave as needed. If it's not used, this line can be omitted
                  }
                }
                // console.log(`Result: ${JSON.stringify(result)}`);
                router.push("/walkStatus");
              }}
              onError={(error) => alert(`Something went wrong! Error: ${error}`)}
              >
                CONFIRM
            </Web3Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalkConfirm;
