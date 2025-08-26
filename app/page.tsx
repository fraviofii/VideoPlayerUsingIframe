"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause } from "lucide-react"

export default function VideoStreamingPlayer() {
  const [videoUrl, setVideoUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (videoUrl.trim()) {
      setCurrentUrl(videoUrl.trim())
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    setCurrentUrl("")
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Video Streaming Player</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* URL Input Section */}
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter video URL (e.g., https://example.com/video.mp4)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handlePlay} disabled={!videoUrl.trim()} className="px-6">
                <Play className="w-4 h-4 mr-2" />
                Play
              </Button>
              {isPlaying && (
                <Button onClick={handleStop} variant="outline" className="px-6 bg-transparent">
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              )}
            </div>

            {/* Video Player Section */}
            <div className="w-full">
              {currentUrl ? (
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={currentUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Video Player"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Enter a video URL and click Play to start streaming</p>
                    <p className="text-sm mt-2">
                      Supports YouTube, Vimeo, direct video files, and other embeddable content
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Current Playing Info */}
            {currentUrl && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Currently playing:</p>
                <p className="text-sm font-mono break-all">{currentUrl}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
