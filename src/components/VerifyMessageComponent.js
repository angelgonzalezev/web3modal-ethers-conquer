import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

const VerifyMessageComponent = () => {
  const [data2Verify, setData2Verify] = useState({
    message: "",
    address: "",
    signature: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const onHandleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setData2Verify({ ...data2Verify, [param]: value });
  };

  const handleVerifyMessage = () => {
    if (data2Verify.address && data2Verify.message && data2Verify.signature) {
      const recoveredAddress = ethers.verifyMessage(data2Verify.message, data2Verify.signature);
      const isVerified = recoveredAddress === data2Verify.address;
      setIsVerified(isVerified);
    }
  };

  return (
    <Flex w={"50%"} gap={2} direction={"column"} p={4}>
      <Text fontSize={"xl"} color={"white"} fontWeight={"bold"}>
        Verify message
      </Text>
      <Input placeholder="Message..." name="message" onChange={onHandleChange} color={"white"} />
      <Input placeholder="Public key..." name="address" onChange={onHandleChange} color={"white"} />
      <Input placeholder="Signature..." name="signature" onChange={onHandleChange} color={"white"} />
      <Button onClick={handleVerifyMessage}>Verify Message</Button>
      {isVerified && (
        <Text color={"white"} fontWeight={"bold"}>
          Message is verified 👍
        </Text>
      )}
    </Flex>
  );
};
export default VerifyMessageComponent;
