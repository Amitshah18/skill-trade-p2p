"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Check, Copy, Download, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContractGenerator({
  teacherName,
  studentName,
  skillName,
  sessionDate,
  sessionDuration,
  paymentAmount,
}) {
  const [contractParams, setContractParams] = useState({
    teacherName: teacherName || "",
    studentName: studentName || "",
    skillName: skillName || "",
    sessionDate: sessionDate || "",
    sessionDuration: sessionDuration || 60,
    paymentAmount: paymentAmount || 50,
  })

  const [generatedContract, setGeneratedContract] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContractParams({
      ...contractParams,
      [name]: value,
    })
  }

  const generateContract = () => {
    // Validate inputs
    if (!contractParams.teacherName || !contractParams.studentName || !contractParams.skillName) {
      setError("Please fill in all required fields")
      return
    }

    setIsGenerating(true)
    setError("")

    // Simulate contract generation
    setTimeout(() => {
      const contract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SkillTradeContract
 * @dev A simple contract for skill trading between a teacher and a student
 */
contract SkillTradeContract {
    address public teacher;
    address public student;
    string public skillName;
    uint256 public sessionDate;
    uint256 public sessionDuration;
    uint256 public paymentAmount;
    bool public sessionCompleted;
    bool public paymentReleased;
    
    event SessionScheduled(address teacher, address student, string skillName, uint256 sessionDate);
    event SessionCompleted(address teacher, address student, uint256 completionTime);
    event PaymentReleased(address teacher, uint256 amount);
    
    constructor(
        address _teacher,
        address _student,
        string memory _skillName,
        uint256 _sessionDate,
        uint256 _sessionDuration,
        uint256 _paymentAmount
    ) {
        teacher = _teacher;
        student = _student;
        skillName = _skillName;
        sessionDate = _sessionDate;
        sessionDuration = _sessionDuration;
        paymentAmount = _paymentAmount;
        sessionCompleted = false;
        paymentReleased = false;
        
        emit SessionScheduled(teacher, student, skillName, sessionDate);
    }
    
    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only the teacher can call this function");
        _;
    }
    
    modifier onlyStudent() {
        require(msg.sender == student, "Only the student can call this function");
        _;
    }
    
    function completeSession() external onlyTeacher {
        require(!sessionCompleted, "Session already marked as completed");
        sessionCompleted = true;
        emit SessionCompleted(teacher, student, block.timestamp);
    }
    
    function releasePayment() external onlyStudent {
        require(sessionCompleted, "Session must be completed before releasing payment");
        require(!paymentReleased, "Payment already released");
        paymentReleased = true;
        emit PaymentReleased(teacher, paymentAmount);
        // In a real contract, this would transfer tokens to the teacher
    }
    
    function getContractDetails() external view returns (
        address, address, string memory, uint256, uint256, uint256, bool, bool
    ) {
        return (
            teacher,
            student,
            skillName,
            sessionDate,
            sessionDuration,
            paymentAmount,
            sessionCompleted,
            paymentReleased
        );
    }
}

/* Contract Details:
 * Teacher: ${contractParams.teacherName}
 * Student: ${contractParams.studentName}
 * Skill: ${contractParams.skillName}
 * Session Date: ${contractParams.sessionDate}
 * Duration: ${contractParams.sessionDuration} minutes
 * Payment: ${contractParams.paymentAmount} SKT tokens
 */`

      setGeneratedContract(contract)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContract)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadContract = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContract], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `SkillTrade_${contractParams.skillName.replace(/\s+/g, "_")}_Contract.sol`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Generate Smart Contract</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-800 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherName" className="text-gray-300">
                Teacher Name
              </Label>
              <Input
                id="teacherName"
                name="teacherName"
                value={contractParams.teacherName}
                onChange={handleInputChange}
                className="cyber-input"
                placeholder="Enter teacher name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-gray-300">
                Student Name
              </Label>
              <Input
                id="studentName"
                name="studentName"
                value={contractParams.studentName}
                onChange={handleInputChange}
                className="cyber-input"
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillName" className="text-gray-300">
                Skill Name
              </Label>
              <Input
                id="skillName"
                name="skillName"
                value={contractParams.skillName}
                onChange={handleInputChange}
                className="cyber-input"
                placeholder="Enter skill name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionDate" className="text-gray-300">
                Session Date
              </Label>
              <Input
                id="sessionDate"
                name="sessionDate"
                type="date"
                value={contractParams.sessionDate}
                onChange={handleInputChange}
                className="cyber-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionDuration" className="text-gray-300">
                Session Duration (minutes)
              </Label>
              <Input
                id="sessionDuration"
                name="sessionDuration"
                type="number"
                value={contractParams.sessionDuration}
                onChange={handleInputChange}
                className="cyber-input"
                min="15"
                step="15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-gray-300">
                Payment Amount (SKT tokens)
              </Label>
              <Input
                id="paymentAmount"
                name="paymentAmount"
                type="number"
                value={contractParams.paymentAmount}
                onChange={handleInputChange}
                className="cyber-input"
                min="1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generateContract} className="cyber-button w-full" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Contract...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Contract
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {generatedContract && (
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-white">Generated Contract</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="cyber-button-outline" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" size="sm" className="cyber-button-outline" onClick={downloadContract}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 rounded-md p-4 overflow-auto max-h-[400px]">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">{generatedContract}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

