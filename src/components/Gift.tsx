import React from "react";
import { FaGift } from "react-icons/fa";
import { Days_One } from 'next/font/google'
import { Dela_Gothic_One } from 'next/font/google'
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react'

const daysone = Days_One({
  subsets: ['latin'],
  weight: '400'
});

const dela = Dela_Gothic_One({
  subsets: ['latin'],
  weight: '400'
});

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button className="bg-white rounded-md" sx={{fontWeight:'100'}} onClick={onOpen}>
         FREE BET
        </Button>
      <Modal isOpen={isOpen} onClose={onClose}   >
        <ModalContent   >
          
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
                <br></br>
                <Button sx={{margin:'auto',display:'flex',background:'#0089ff',color:'white'}} color="danger" variant="light" >
                  <a href="https://twitter.com">
                  Upcoming Campaigns
                  </a>
                  <MdOutlineArrowOutward />
                </Button>
                <br></br>
                <Button sx={{margin:'auto',display:'flex',background:'black',color:'white'}} color="danger" variant="light"  onClick={onClose}>
                  Close
                </Button>
              </ModalBody>
              <ModalFooter>
                
              </ModalFooter>
            
        </ModalContent>
      </Modal>
    </>
  );
}
