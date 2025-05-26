"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "~~/hooks/useAccount"; // ya usa tu wrapper

type UserRole = "admin" | "user";

type Web3ContextType = {
  connected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isAuthenticated: boolean;
  authenticate: (did?: string) => Promise<void>;
  role: UserRole | null;
  userDID: string | null;
};

const Web3Context = createContext<Web3ContextType>({
  connected: false,
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isAuthenticated: false,
  authenticate: async () => {},
  role: null,
  userDID: null
});

export const useWeb3 = () => useContext(Web3Context);

export function Web3Provider({ children }: { children: ReactNode }) {
  const { account } = useAccount();
  const router = useRouter();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [userDID, setUserDID] = useState<string | null>(null);

  // Base de datos simulada de DIDs y sus roles
  const mockDIDDatabase = [
    {
      did: "did:ethr:starknet:0x8f5b43e21",
      role: "admin",
      address:
        "0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1"
    }
  ];

  // Check for saved session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem("votingSession");
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        if (session.connected) setConnected(true);
        if (session.address) setAddress(account?.address || session.address);
        if (session.isAuthenticated) setIsAuthenticated(true);
        if (session.role) setRole(session.role as UserRole);
        if (session.userDID) setUserDID(session.userDID);
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem("votingSession");
      }
    }
  }, []);

  // Save session when it changes
  useEffect(() => {
    if (connected && address) {
      localStorage.setItem(
        "votingSession",
        JSON.stringify({
          connected,
          address,
          isAuthenticated,
          role,
          userDID
        })
      );
    } else if (isAuthenticated && userDID) {
      // También guardamos la sesión si está autenticado por DID aunque no esté conectado a wallet
      localStorage.setItem(
        "votingSession",
        JSON.stringify({
          connected,
          address,
          isAuthenticated,
          role,
          userDID
        })
      );
    } else {
      localStorage.removeItem("votingSession");
    }
  }, [connected, address, isAuthenticated, role, userDID]);

  // Simulated wallet connection
  const connect = async () => {
    try {
      // In a real implementation, this would connect to Starknet wallet
      console.log("Connecting to wallet...");

      // Simulate successful connection
      setTimeout(() => {
        setConnected(true);

        setAddress(account!.address);
      }, 1000);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setAddress(null);
    setIsAuthenticated(false);
    setRole(null);
    setUserDID(null);
    localStorage.removeItem("votingSession");
    router.push("/");
  };

  // Simulated ZK Passport authentication
  const authenticate = async (providedDID?: string) => {
    try {
      // In a real implementation, this would verify identity with ZK Passport
      console.log(
        "Authenticating...",
        providedDID ? "with DID" : "with wallet"
      );

      // Simulate successful authentication
      setTimeout(() => {
        setIsAuthenticated(true);

        if (providedDID) {
          // Autenticación por DID
          const didRecord = mockDIDDatabase.find(
            (record) => record.did === providedDID
          );

          if (didRecord) {
            setRole(didRecord.role as UserRole);
            setUserDID(didRecord.did);
            setAddress(didRecord.address);
            setConnected(true); // Consideramos que está conectado aunque sea solo por DID
          } else {
            // Si el DID no existe, asignamos rol de usuario por defecto
            setRole("user");
            setUserDID(providedDID);
            // Generamos una dirección simulada
            setAddress(
              `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
            );
            setConnected(true);
          }
        } else {
          // Autenticación por wallet
          // Simulamos la búsqueda del DID asociado a la dirección
          const addressRecord = mockDIDDatabase.find(
            (record) => account?.address === address
          );

          if (addressRecord) {
            setRole(addressRecord.role as UserRole);
            setUserDID(addressRecord.did);
          } else {
            // Si no hay un DID asociado, generamos uno y asignamos rol de usuario
            const mockDID = `did:ethr:starknet:${address?.substring(2, 10)}${Math.floor(Math.random() * 1000000)}`;
            setRole("user");
            setUserDID(mockDID);
          }
        }
      }, 1500);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connected,
        address,
        connect,
        disconnect,
        isAuthenticated,
        authenticate,
        role,
        userDID
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}
