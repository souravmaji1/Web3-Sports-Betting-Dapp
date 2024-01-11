import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaGift } from "react-icons/fa";
import { Days_One } from 'next/font/google'
import { Dela_Gothic_One } from 'next/font/google'
import { MdOutlineArrowOutward } from "react-icons/md";


const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

const dela = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400'
});

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="bg-white rounded-md" onPress={onOpen}>
        <FaGift /> FREE BET
        </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} style={{display:'flex',justifyContent:"space-evenly",alignItems:'center'}}  >
        <ModalContent   >
          {(onClose) => (
            <>
              <ModalHeader className={`flex flex-col gap-1 ${dela.className}`}>My Sports Freebets</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
               
                <Button color="primary">
                  <a href="https://twitter.com">
                  Upcoming Campaigns
                  </a>
                  <MdOutlineArrowOutward />
                </Button>
                <Button className="bg-black text-white" onPress={onClose}>
                  Close
                </Button>
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
