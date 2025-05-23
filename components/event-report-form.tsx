"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

export function EventReportForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    eventName: "",
    datePlace: "",
    description: "",
    attendees: "",
    links: "",
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [receipts, setReceipts] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReceipts(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.eventName || !formData.datePlace || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to submit event report
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Report submitted",
        description: "Your event report has been submitted successfully.",
      })

      // Reset form
      setFormData({
        eventName: "",
        datePlace: "",
        description: "",
        attendees: "",
        links: "",
      })
      setPhotos([])
      setReceipts([])
    } catch (error) {
      console.error("Error submitting report:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Event Report</CardTitle>
        <CardDescription>Upload your event details and receipts to receive reimbursement</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input id="eventName" name="eventName" value={formData.eventName} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="datePlace">Date and Place *</Label>
              <Input id="datePlace" name="datePlace" value={formData.datePlace} onChange={handleChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Brief Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="attendees">Estimated Number of Attendees</Label>
              <Input id="attendees" name="attendees" type="number" value={formData.attendees} onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="links">Links (Drive, social media, etc.)</Label>
              <Textarea
                id="links"
                name="links"
                value={formData.links}
                onChange={handleChange}
                rows={2}
                placeholder="One link per line"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="photos">Upload Photos</Label>
              <div className="border border-input rounded-md p-4">
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Label htmlFor="photos" className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {photos.length > 0 ? `${photos.length} file(s) selected` : "Drag and drop or click to select files"}
                  </span>
                </Label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="receipts">Expense Receipts (PDF or Image)</Label>
              <div className="border border-input rounded-md p-4">
                <Input
                  id="receipts"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  onChange={handleReceiptUpload}
                  className="hidden"
                />
                <Label htmlFor="receipts" className="flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {receipts.length > 0
                      ? `${receipts.length} file(s) selected`
                      : "Drag and drop or click to select files"}
                  </span>
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
