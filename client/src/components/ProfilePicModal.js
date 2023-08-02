import * as React from "react";
import "./HomePage.css";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';


const ProfilePicModal = (props) => {
  const [url, setURL] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  function onSave() {
    props.updateAvatarURL(url);
    onClose();
  }
  function onChangeURL(e) {
    setURL(e.target.value);
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="secondary" color="black" className="editAvatarButton">Edit Avatar</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input placeholder='Input Image URL' onChange={onChangeURL} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default ProfilePicModal;