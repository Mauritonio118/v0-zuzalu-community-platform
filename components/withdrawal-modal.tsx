"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface WithdrawalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  balance: number
  onWithdraw: (amount: number) => Promise<boolean>
}

export function WithdrawalModal({ open, onOpenChange, balance, onWithdraw }: WithdrawalModalProps) {
  const [amount, setAmount] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setAmount(isNaN(value) ? 0 : value)
  }

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      })
      return
    }

    if (amount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You cannot withdraw more than your available balance.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const success = await onWithdraw(amount)

      if (success) {
        toast({
          title: "Withdrawal initiated",
          description: `Your withdrawal of $${amount.toFixed(2)} has been initiated.`,
        })
        onOpenChange(false)
      } else {
        toast({
          title: "Withdrawal failed",
          description: "There was an error processing your withdrawal. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Withdrawal error:", error)
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Enter the amount you would like to withdraw from your petty cash.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              max={balance}
              step="0.01"
              value={amount || ""}
              onChange={handleAmountChange}
              placeholder="0.00"
            />
            <p className="text-sm text-muted-foreground">Available balance: ${balance.toFixed(2)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleWithdraw}
            disabled={isProcessing}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isProcessing ? "Processing..." : "Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
