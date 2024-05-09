import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const SignMessageComponent = ({ infoAccount }) => {
  const [message, setMessage] = useState();
  const [signature, setSignature] = useState();
  const { signer } = infoAccount;

  const onHandleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleSignMessage = async () => {
    const _signature = await signer.signMessage(message);
    setSignature(_signature);
  };

  return (
    <Flex w={"50%"} gap={2} direction={"column"} p={4}>
      <Text fontSize={"xl"} color={"white"} fontWeight={"bold"}>
        Sign message
      </Text>
      <Input placeholder="Message" onChange={onHandleChange} color={"white"} />
      <Button onClick={handleSignMessage}>Sign Message</Button>
      {signature && <Text color={"white"}>Signature: {signature}</Text>}
    </Flex>
  );
};
export default SignMessageComponent;
