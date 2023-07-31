import * as React from "react";
import "./HomePage.css";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';



const SupportModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen} colorScheme="secondary" color="black" className="supportButton">You're Not Alone</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Support Hotlines</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              <b>Suicide and Crisis Lifeline:</b> 988 <br />
              <b>Anorexia Nervosa & Associated Disorders (ANAD) Helpline:</b> 1-888-375-7767 <br />
              <b>Substance Abuse and Mental Health Services Administration Helpline:</b> 1-800-662-4357 <br />
              <b>The Trevor Project LGBTQ+:</b> 1-866-488-7386 <br />
              <b>National Domestic Violence Hotline:</b> 1-800-799-7233

            </p>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default SupportModal;