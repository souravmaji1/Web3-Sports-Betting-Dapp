import React from "react";
import Image from "next/image";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Days_One } from 'next/font/google'



const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});


const Footer = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        };
    
        // Initial check on component mount
        handleResize();
    
        // Attach event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
     

<footer className="p-4 md:p-8 lg:p-10 bg-zinc-900 border-y-8  border-solid border-zinc-800 ">
  <div className="mx-auto max-w-screen-xl text-center">
      <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <Image src='/images/logo.png' width={100} height={100} />
           
      </a>

      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white gap-3">
          <li>
              <a href="https://discord.com" className="mr-4 hover:underline md:mr-6 text-gray-500" style={{ fontSize: "1.5rem" }} >
                <FaDiscord />
              </a>
          </li>
          <li>
              <a href="https://x.com/vookiesports" className="mr-4 hover:underline md:mr-6 text-gray-500" style={{ fontSize: "1.5rem" }} >
                <FaTwitter />
              </a>
          </li>
      </ul>

    

      <p className={`my-6 text-gray-500 dark:text-gray-400 ${daysone.className}`}  style={{margin:isMobile ? '0 0 60px' : '5px 163px 60px',padding:isMobile ? '20px' : '0', background:isMobile ? '#3f3f3f' : 'none',borderRadius:isMobile ? '10px' : 'none',color:isMobile ? '#b7b6b6' : '#9ca3af'  }}   >Vookie runs on Azuro - a decentralized ecosystem of independent people and
      companies who collaborate to make betting possible, without any of them having control over your money and bets</p>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 text-gray-500">About</a>
          </li>
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6  text-gray-500">Terms & Agreement</a>
          </li>
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6  text-gray-500 ">FAQs</a>
          </li>
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 text-gray-500">Privacy Policy</a>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Vookie™</a>. All Rights Reserved.</span>
  </div>
</footer>

    );
  };
  
  export default Footer;
  