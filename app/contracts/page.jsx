"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, ChevronRight } from "lucide-react"
import ContractGenerator from "@/components/contract-generator"

export default function ContractsPage() {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      title: "React Hooks Training",
      with: "Sarah Johnson",
      date: "2025-03-20",
      status: "active",
      contractAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      id: 2,
      title: "JavaScript Tutoring",
      with: "Emma Wilson",
      date: "2025-03-21",
      status: "pending",
      contractAddress: null,
    },
  ])

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white neon-text-blue">Smart Contracts</h1>
        <Button className="cyber-button rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="cyber-tabs mb-6">
          <TabsTrigger value="active" className="data-[state=active]:cyber-tab-active">
            Active Contracts
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:cyber-tab-active">
            Pending Contracts
          </TabsTrigger>
          <TabsTrigger value="create" className="data-[state=active]:cyber-tab-active">
            Create Contract
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {contracts
            .filter((contract) => contract.status === "active")
            .map((contract) => (
              <Card key={contract.id} className="cyber-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2 bg-blue-500"></div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-white">{contract.title}</h3>
                        <Badge className="bg-blue-900/30 text-blue-400 border-blue-700/30">Active</Badge>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                        <div className="flex items-center mr-4">
                          <span>With: {contract.with}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <span>Created: {contract.date}</span>
                        </div>
                        {contract.contractAddress && (
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-blue-400" />
                            <span className="truncate max-w-[150px]">
                              {contract.contractAddress.slice(0, 6)}...{contract.contractAddress.slice(-4)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" className="cyber-button">
                          View Contract
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {contracts.filter((contract) => contract.status === "active").length === 0 && (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-gray-600 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No active contracts</h3>
              <p className="text-sm text-gray-400 mb-4">You don't have any active contracts at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {contracts
            .filter((contract) => contract.status === "pending")
            .map((contract) => (
              <Card key={contract.id} className="cyber-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2 bg-yellow-500"></div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-white">{contract.title}</h3>
                        <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700/30">Pending</Badge>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-400 mb-3">
                        <div className="flex items-center mr-4">
                          <span>With: {contract.with}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <span>Created: {contract.date}</span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" className="cyber-button">
                          Generate Contract
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {contracts.filter((contract) => contract.status === "pending").length === 0 && (
            <div className="text-center py-10">
              <FileText className="h-12 w-12 mx-auto text-gray-600 mb-3" />
              <h3 className="text-lg font-medium text-white mb-1">No pending contracts</h3>
              <p className="text-sm text-gray-400 mb-4">You don't have any pending contracts at the moment.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="create">
          <ContractGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
