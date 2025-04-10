"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  CreditCard,
  DollarSign,
  Plus,
  RefreshCw,
  Send,
  Wallet,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function WalletPage() {
  const [walletAddress, setWalletAddress] = useState("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
  const [balance, setBalance] = useState(250)
  const [isConnected, setIsConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Buy tokens form
  const [buyAmount, setBuyAmount] = useState(50)
  const [isBuying, setIsBuying] = useState(false)

  // Send tokens form
  const [recipientAddress, setRecipientAddress] = useState("")
  const [sendAmount, setSendAmount] = useState(10)
  const [isSending, setIsSending] = useState(false)

  // Transaction history
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "received",
      amount: 50,
      from: "0x8912...3F21",
      to: walletAddress,
      date: "March 15, 2025",
      time: "14:32",
      status: "completed",
      description: "Payment for JavaScript session",
    },
    {
      id: 2,
      type: "sent",
      amount: 40,
      from: walletAddress,
      to: "0x3F76...9A12",
      date: "March 10, 2025",
      time: "09:15",
      status: "completed",
      description: "Payment for Blockchain session",
    },
    {
      id: 3,
      type: "purchase",
      amount: 100,
      from: "TokenStore",
      to: walletAddress,
      date: "March 5, 2025",
      time: "16:45",
      status: "completed",
      description: "Token purchase",
    },
    {
      id: 4,
      type: "received",
      amount: 75,
      from: "0x6B23...1D45",
      to: walletAddress,
      date: "February 28, 2025",
      time: "11:20",
      status: "completed",
      description: "Payment for React session",
    },
  ])

  // Handle buying tokens
  const handleBuyTokens = async () => {
    if (buyAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    setError("")
    setIsBuying(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update balance
      setBalance((prevBalance) => prevBalance + buyAmount)

      // Add transaction to history
      const newTransaction = {
        id: Date.now(),
        type: "purchase",
        amount: buyAmount,
        from: "TokenStore",
        to: walletAddress,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: "completed",
        description: "Token purchase",
      }

      setTransactions([newTransaction, ...transactions])

      // Show success message
      setSuccess(`Successfully purchased ${buyAmount} tokens!`)
      setTimeout(() => setSuccess(""), 3000)

      // Reset form
      setBuyAmount(50)
    } catch (error) {
      setError("Failed to purchase tokens. Please try again.")
    } finally {
      setIsBuying(false)
    }
  }

  // Handle sending tokens
  const handleSendTokens = async () => {
    if (!recipientAddress) {
      setError("Please enter a recipient address")
      return
    }

    if (sendAmount <= 0) {
      setError("Please enter a valid amount")
      return
    }

    if (sendAmount > balance) {
      setError("Insufficient balance")
      return
    }

    setError("")
    setIsSending(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update balance
      setBalance((prevBalance) => prevBalance - sendAmount)

      // Add transaction to history
      const newTransaction = {
        id: Date.now(),
        type: "sent",
        amount: sendAmount,
        from: walletAddress,
        to: recipientAddress,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: "completed",
        description: "Token transfer",
      }

      setTransactions([newTransaction, ...transactions])

      // Show success message
      setSuccess(
        `Successfully sent ${sendAmount} tokens to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}!`,
      )
      setTimeout(() => setSuccess(""), 3000)

      // Reset form
      setRecipientAddress("")
      setSendAmount(10)
    } catch (error) {
      setError("Failed to send tokens. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  // Refresh wallet balance
  const refreshBalance = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would fetch the actual balance
      // For demo purposes, we'll just keep the current balance

      setSuccess("Balance updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      setError("Failed to refresh balance. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      {success && (
        <Alert className="mb-6 bg-green-900/20 border-green-700/30 text-green-400">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-700/30 text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600/20 to-pink-600/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Wallet className="h-8 w-8 text-blue-400" />
                </div>

                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-1">
                    {balance} <span className="text-lg text-blue-400">SKT</span>
                  </h2>
                  <p className="text-sm text-gray-400">Current Balance</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Status</span>
                  <Badge className="bg-green-900/30 text-green-400 border-green-700/30">
                    {isConnected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Address</span>
                  <span className="text-sm text-white truncate max-w-[150px]">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={refreshBalance} disabled={isLoading} variant="outline" className="flex-1 cyber-button">
                  {isLoading ? (
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh
                </Button>
                <Button className="flex-1 cyber-button-enhanced">
                  <Plus className="h-4 w-4 mr-2" />
                  Buy Tokens
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Token Price Card */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg text-white">Token Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-pink-600 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">SKT</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Skill Token</h3>
                    <p className="text-xs text-gray-400">SKT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">$1.00</p>
                  <p className="text-xs text-green-400">+2.5%</p>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="text-white">$1,250,000</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="text-white">$45,320</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="cyber-tabs mb-4">
              <TabsTrigger value="transactions" className="data-[state=active]:cyber-tab-active">
                Transactions
              </TabsTrigger>
              <TabsTrigger value="buy" className="data-[state=active]:cyber-tab-active">
                Buy Tokens
              </TabsTrigger>
              <TabsTrigger value="send" className="data-[state=active]:cyber-tab-active">
                Send Tokens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-4">
              <Card className="cyber-card">
                <CardContent className="p-6">
                  {transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="p-4 rounded-lg border border-gray-800 bg-gray-900/30">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div
                                className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${
                                  transaction.type === "received"
                                    ? "bg-green-900/30"
                                    : transaction.type === "sent"
                                      ? "bg-pink-900/30"
                                      : "bg-blue-900/30"
                                }
                              `}
                              >
                                {transaction.type === "received" ? (
                                  <ArrowDown className="h-5 w-5 text-green-400" />
                                ) : transaction.type === "sent" ? (
                                  <ArrowUp className="h-5 w-5 text-pink-400" />
                                ) : (
                                  <DollarSign className="h-5 w-5 text-blue-400" />
                                )}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="text-sm font-medium text-white capitalize">
                                    {transaction.type === "received"
                                      ? "Received"
                                      : transaction.type === "sent"
                                        ? "Sent"
                                        : "Purchased"}{" "}
                                    Tokens
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-1">{transaction.description}</p>
                                </div>
                                <div className="text-right">
                                  <p
                                    className={`
                                    text-sm font-medium
                                    ${
                                      transaction.type === "received"
                                        ? "text-green-400"
                                        : transaction.type === "sent"
                                          ? "text-pink-400"
                                          : "text-blue-400"
                                    }
                                  `}
                                  >
                                    {transaction.type === "received" ? "+" : transaction.type === "sent" ? "-" : "+"}
                                    {transaction.amount} SKT
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {transaction.date} • {transaction.time}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-2 text-xs text-gray-500">
                                {transaction.type === "received" ? (
                                  <span>From: {transaction.from}</span>
                                ) : transaction.type === "sent" ? (
                                  <span>To: {transaction.to}</span>
                                ) : (
                                  <span>Purchase from {transaction.from}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center">
                      <CreditCard className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                      <h3 className="text-lg font-medium text-white mb-1">No transactions yet</h3>
                      <p className="text-sm text-gray-400">
                        Your transaction history will appear here once you start using tokens.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buy" className="space-y-4">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Buy Tokens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Current Price</span>
                      <span className="text-sm font-medium text-white">1 SKT = $1.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Current Balance</span>
                      <span className="text-sm font-medium text-white">{balance} SKT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="buy-amount" className="text-gray-300">
                        Amount to Buy
                      </Label>
                      <div className="relative">
                        <Input
                          id="buy-amount"
                          type="number"
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(Number.parseInt(e.target.value) || 0)}
                          min="1"
                          className="cyber-input pr-16"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-400">SKT</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Amount</span>
                        <span className="text-sm font-medium text-white">{buyAmount} SKT</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="text-sm font-medium text-white">${buyAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                        <span className="text-sm font-medium text-gray-300">Total</span>
                        <span className="text-sm font-medium text-white">${buyAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBuyTokens}
                      disabled={isBuying || buyAmount <= 0}
                      className="w-full cyber-button-enhanced"
                    >
                      {isBuying ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Buy {buyAmount} Tokens
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="send" className="space-y-4">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Send Tokens</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg border border-gray-800 bg-gray-900/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Available Balance</span>
                      <span className="text-sm font-medium text-white">{balance} SKT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient-address" className="text-gray-300">
                        Recipient Address
                      </Label>
                      <Input
                        id="recipient-address"
                        placeholder="0x..."
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="cyber-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="send-amount" className="text-gray-300">
                        Amount to Send
                      </Label>
                      <div className="relative">
                        <Input
                          id="send-amount"
                          type="number"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(Number.parseInt(e.target.value) || 0)}
                          min="1"
                          max={balance}
                          className="cyber-input pr-16"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-400">SKT</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSendTokens}
                      disabled={isSending || !recipientAddress || sendAmount <= 0 || sendAmount > balance}
                      className="w-full cyber-button-enhanced"
                    >
                      {isSending ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send {sendAmount} Tokens
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
