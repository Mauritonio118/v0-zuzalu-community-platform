"use client"

import { Label } from "@/components/ui/label"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  CalendarDays,
  MapPin,
  Users,
  ExternalLink,
  FileText,
  ImageIcon,
  ThumbsUp,
  ThumbsDown,
  Send,
  Lock,
  Award,
} from "lucide-react"
import { pastEventsData } from "@/lib/mock-data"
import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"

export default function PastEventsPage() {
  const { isConnected, address } = useWallet()
  const { toast } = useToast()
  const [comments, setComments] = useState<
    Record<number, Array<{ id: number; author: string; text: string; isPrivate: boolean; timestamp: string }>>
  >({})
  const [reactions, setReactions] = useState<
    Record<number, { likes: string[]; dislikes: string[]; attestations: string[] }>
  >({})
  const [newComment, setNewComment] = useState("")
  const [isPrivateComment, setIsPrivateComment] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const handleAddComment = (eventId: number) => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to leave a comment.",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      })
      return
    }

    const comment = {
      id: Date.now(),
      author: address || "0x0000...0000",
      text: newComment,
      isPrivate: isPrivateComment,
      timestamp: new Date().toISOString(),
    }

    setComments((prev) => ({
      ...prev,
      [eventId]: [...(prev[eventId] || []), comment],
    }))

    setNewComment("")
    setIsPrivateComment(false)

    toast({
      title: isPrivateComment ? "Private message sent" : "Comment added",
      description: isPrivateComment
        ? "Your message has been sent to the organizer."
        : "Your comment has been added to the event.",
    })
  }

  const handleReaction = (eventId: number, type: "like" | "dislike" | "attestation") => {
    if (!isConnected || !address) {
      toast({
        title: "Not connected",
        description: "Please connect your wallet to react to this event.",
        variant: "destructive",
      })
      return
    }

    setReactions((prev) => {
      const eventReactions = prev[eventId] || { likes: [], dislikes: [], attestations: [] }

      // Handle likes/dislikes (toggle and make mutually exclusive)
      if (type === "like" || type === "dislike") {
        const otherType = type === "like" ? "dislikes" : "likes"

        // If already reacted with this type, remove it (toggle off)
        if (eventReactions[`${type}s`].includes(address)) {
          return {
            ...prev,
            [eventId]: {
              ...eventReactions,
              [`${type}s`]: eventReactions[`${type}s`].filter((addr) => addr !== address),
            },
          }
        }

        // Otherwise add this reaction and remove the opposite one
        return {
          ...prev,
          [eventId]: {
            ...eventReactions,
            [`${type}s`]: [...eventReactions[`${type}s`], address],
            [otherType]: eventReactions[otherType].filter((addr) => addr !== address),
          },
        }
      }

      // Handle attestations (toggle only)
      if (type === "attestation") {
        if (eventReactions.attestations.includes(address)) {
          return {
            ...prev,
            [eventId]: {
              ...eventReactions,
              attestations: eventReactions.attestations.filter((addr) => addr !== address),
            },
          }
        } else {
          return {
            ...prev,
            [eventId]: {
              ...eventReactions,
              attestations: [...eventReactions.attestations, address],
            },
          }
        }
      }

      return prev
    })

    toast({
      title:
        type === "attestation" ? "Attestation recorded" : `${type.charAt(0).toUpperCase() + type.slice(1)} recorded`,
      description:
        type === "attestation" ? "You have attested to this event's authenticity." : `You have ${type}d this event.`,
    })
  }

  const hasReacted = (eventId: number, type: "like" | "dislike" | "attestation") => {
    if (!isConnected || !address) return false

    const eventReactions = reactions[eventId] || { likes: [], dislikes: [], attestations: [] }

    if (type === "like") return eventReactions.likes.includes(address)
    if (type === "dislike") return eventReactions.dislikes.includes(address)
    if (type === "attestation") return eventReactions.attestations.includes(address)

    return false
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-4">Past Events</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the events that have been funded by the Zuzalu Community Treasury. Each event showcases the impact
              of our decentralized funding model.
            </p>
          </div>

          <div className="grid gap-8">
            {pastEventsData.map((event) => (
              <Card key={event.id} className="overflow-hidden" id={`event-${event.id}`}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{event.name}</CardTitle>
                      <CardDescription className="text-base mb-4">{event.description}</CardDescription>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.place}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Total Expenses</div>
                      <div className="text-2xl font-bold">{formatCurrency(event.totalExpenses)}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Organizer: {formatAddress(event.organizer)}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="photos">Photos</TabsTrigger>
                      <TabsTrigger value="receipts">Receipts</TabsTrigger>
                      <TabsTrigger value="links">Links</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Event Description</h4>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Event Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date:</span>
                                <span>{event.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Location:</span>
                                <span>{event.place}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Attendees:</span>
                                <span>{event.attendees}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Financial Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Expenses:</span>
                                <span className="font-medium">{formatCurrency(event.totalExpenses)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Organizer:</span>
                                <span className="font-mono">{formatAddress(event.organizer)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <Badge variant="secondary">Reimbursed</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="photos" className="mt-6">
                      <div>
                        <h4 className="font-medium mb-4">Event Photos ({event.photos.length})</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {event.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo || "/placeholder.svg"}
                                alt={`${event.name} photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Button variant="secondary" size="sm">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="receipts" className="mt-6">
                      <div>
                        <h4 className="font-medium mb-4">Expense Receipts ({event.receipts.length})</h4>
                        <div className="grid gap-3">
                          {event.receipts.map((receipt, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                {receipt.type === "pdf" ? (
                                  <FileText className="h-5 w-5 text-red-500" />
                                ) : (
                                  <ImageIcon className="h-5 w-5 text-blue-500" />
                                )}
                                <span className="font-medium">{receipt.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {receipt.type.toUpperCase()}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="mt-6">
                      <div>
                        <h4 className="font-medium mb-4">Related Links ({event.links.length})</h4>
                        <div className="grid gap-3">
                          {event.links.map((link, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <ExternalLink className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium truncate">{link}</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                  Visit
                                </a>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="comments" className="mt-6">
                      <div className="space-y-6">
                        {/* Reactions section */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant={hasReacted(event.id, "like") ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleReaction(event.id, "like")}
                              className="flex items-center gap-2"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span>{(reactions[event.id]?.likes || []).length}</span>
                            </Button>

                            <Button
                              variant={hasReacted(event.id, "dislike") ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleReaction(event.id, "dislike")}
                              className="flex items-center gap-2"
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span>{(reactions[event.id]?.dislikes || []).length}</span>
                            </Button>

                            <Button
                              variant={hasReacted(event.id, "attestation") ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleReaction(event.id, "attestation")}
                              className="flex items-center gap-2"
                            >
                              <Award className="h-4 w-4" />
                              <span>Attest ({(reactions[event.id]?.attestations || []).length})</span>
                            </Button>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {(reactions[event.id]?.attestations || []).length} attestations
                          </div>
                        </div>

                        <Separator />

                        {/* Comments section */}
                        <div>
                          <h4 className="font-medium mb-4">Comments & Messages</h4>

                          <div className="space-y-4 mb-6">
                            {comments[event.id] && comments[event.id].length > 0 ? (
                              comments[event.id]
                                .filter((comment) => !comment.isPrivate || comment.author === address)
                                .map((comment) => (
                                  <div key={comment.id} className="flex gap-3 p-3 border rounded-lg">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>{comment.author.substring(2, 4)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm">{formatAddress(comment.author)}</span>
                                        {comment.isPrivate && (
                                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                                            <Lock className="h-3 w-3" />
                                            Private
                                          </Badge>
                                        )}
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(comment.timestamp).toLocaleString()}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.text}</p>
                                    </div>
                                  </div>
                                ))
                            ) : (
                              <div className="text-center text-muted-foreground py-6">
                                No comments yet. Be the first to comment!
                              </div>
                            )}
                          </div>

                          {/* Comment form */}
                          <div className="space-y-3">
                            <Textarea
                              placeholder="Leave a comment or message for the organizer..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="min-h-[100px]"
                            />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`private-${event.id}`}
                                  checked={isPrivateComment}
                                  onCheckedChange={(checked) => setIsPrivateComment(!!checked)}
                                />
                                <Label htmlFor={`private-${event.id}`} className="text-sm flex items-center gap-1">
                                  <Lock className="h-3 w-3" />
                                  Send as private message to organizer
                                </Label>
                              </div>

                              <Button
                                onClick={() => handleAddComment(event.id)}
                                disabled={!newComment.trim()}
                                className="flex items-center gap-2"
                              >
                                <Send className="h-4 w-4" />
                                {isPrivateComment ? "Send Message" : "Post Comment"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
