import React from "react";
import { Button, Center, HStack, Icon, Modal, Text } from "native-base";
import { IModalProps } from "native-base/lib/typescript/components/composites/Modal/types";
import { Feather } from "@expo/vector-icons";
import { Account } from "../../Types";

type Props = IModalProps & {
  closeModal: () => void;
  account: Account;
  action: () => void;
};

export const UModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  account,
  action,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Modal.Content padding={4} maxWidth="400px">
        <Modal.Body>
          <Center>
            <Icon
              as={Feather}
              size="6xl"
              color="UCondo.pink"
              name="trash"
              mb={5}
            />
            <Text fontSize="lg">Deseja excluir a conta</Text>
            <Text fontSize="lg" fontWeight="extrabold">
              {account.id} - {account.name}?
            </Text>
            <HStack marginTop={4} width="3/4" justifyContent="space-between">
              <Button
                _text={{ color: "UCondo.pink" }}
                variant="ghost"
                onPress={closeModal}
              >
                Não!
              </Button>
              <Button borderRadius="3xl" bg="UCondo.pink" onPress={action}>
                Com certeza
              </Button>
            </HStack>
          </Center>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
