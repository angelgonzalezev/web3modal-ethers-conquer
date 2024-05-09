import { Box, Flex, Text } from "@chakra-ui/react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import HeaderComponent from "./components/HeaderComponent";
import SendTransactionComponent from "./components/SendTransactionComponent";
import SignMessageComponent from "./components/SignMessageComponent";
import VerifyMessageComponent from "./components/VerifyMessageComponent";

function App() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [needRefresh, setNeedRefresh] = useState(true);
  const [infoAccount, setInfoAccount] = useState({
    provider: null,
    signer: null,
    balance: 0,
  });

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.BrowserProvider(walletProvider);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);
      setInfoAccount({
        provider,
        signer,
        balance: ethBalance,
      });
      setNeedRefresh(false);
    };
    walletProvider && getBalance();
  }, [address, walletProvider, needRefresh]);

  return (
    <Box w={"100vw"} h={"100vh"} bg={"gray.700"}>
      {!isConnected ? (
        <Flex w={"100vw"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
          <w3m-button />
        </Flex>
      ) : (
        <>
          <HeaderComponent />
          <Flex gap={4} p={4}>
            <Text color={"white"} fontSize={"xl"}>
              Address: {address}
            </Text>
            {infoAccount.balance && (
              <>
                <Text color={"white"} fontSize={"xl"}>
                  Balance: {infoAccount.balance}
                </Text>
                <Text color={"white"} fontSize={"xl"}>
                  Symbol: ETH
                </Text>
              </>
            )}
            <Text color={"white"} fontSize={"xl"}>
              Chain Id: {chainId}
            </Text>
          </Flex>
          <SendTransactionComponent infoAccount={infoAccount} setNeedRefresh={setNeedRefresh} />
          <Flex gap={4}>
            <SignMessageComponent infoAccount={infoAccount} />
            <VerifyMessageComponent />
          </Flex>
        </>
      )}
    </Box>
  );
}

export default App;
