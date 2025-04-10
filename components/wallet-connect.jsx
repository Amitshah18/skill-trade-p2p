"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WalletConnect({ onConnect, onDisconnect }) {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState("")
  const [chainId, setChainId] = useState(null)

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMetaMaskInstalled(!!window.ethereum && window.ethereum.isMetaMask)

      // Check if already connected
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts) => {
            if (accounts.length > 0) {
              setWalletAddress(accounts[0])
              if (onConnect) onConnect(accounts[0])
            }
          })
          .catch((err) => console.error(err))

        // Get current chain ID
        window.ethereum
          .request({ method: "eth_chainId" })
          .then((id) => setChainId(id))
          .catch((err) => console.error(err))
      }
    }
  }, [onConnect])

  // Listen for account and chain changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          // User disconnected
          setWalletAddress("")
          if (onDisconnect) onDisconnect()
        } else {
          setWalletAddress(accounts[0])
          if (onConnect) onConnect(accounts[0])
        }
      }

      const handleChainChanged = (id) => {
        setChainId(id)
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [onConnect, onDisconnect])

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    try {
      setIsConnecting(true)
      setError("")

      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      setWalletAddress(accounts[0])
      if (onConnect) onConnect(accounts[0])
    } catch (err) {
      if (err.code === 4001) {
        // User rejected the request
        setError("You rejected the connection request")
      } else {
        setError("Failed to connect wallet. Please try again.")
        console.error(err)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    // Note: MetaMask doesn't actually support programmatic disconnection
    // We can only "forget" the connection in our app
    setWalletAddress("")
    if (onDisconnect) onDisconnect()
  }

  const getNetworkName = () => {
    switch (chainId) {
      case "0x1":
        return "Ethereum Mainnet"
      case "0x3":
        return "Ropsten Testnet"
      case "0x4":
        return "Rinkeby Testnet"
      case "0x5":
        return "Goerli Testnet"
      case "0x89":
        return "Polygon Mainnet"
      default:
        return "Unknown Network"
    }
  }

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {walletAddress ? (
        <div className="space-y-2">
          <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-400">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
                <p className="text-xs text-green-700 dark:text-green-500">Network: {getNetworkName()}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
          onClick={connectWallet}
          disabled={isConnecting}
        >
          <Wallet className="h-4 w-4 mr-2" />
          {isConnecting ? "Connecting..." : isMetaMaskInstalled ? "Connect MetaMask" : "Install MetaMask"}
        </Button>
      )}
    </div>
  )
}
