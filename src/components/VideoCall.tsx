import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HealthcareCard } from "@/components/ui/healthcare-card"
import { useToast } from "@/components/ui/use-toast"
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Settings, 
  Monitor,
  Users,
  MessageSquare,
  FileText
} from "lucide-react"

interface VideoCallProps {
  consultationId?: string
  patientName?: string
  doctorName?: string
  onCallEnd?: () => void
}

export const VideoCall = ({ consultationId, patientName, doctorName, onCallEnd }: VideoCallProps) => {
  const { toast } = useToast()
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isConnected, setIsConnected] = useState(false)
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'fair' | 'poor'>('good')
  const [callDuration, setCallDuration] = useState(0)
  const [isLowBandwidth, setIsLowBandwidth] = useState(false)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Initialize video call
    initializeCall()
    
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
      cleanupCall()
    }
  }, [])

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled
      })

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Simulate connection
      setTimeout(() => {
        setIsConnected(true)
        toast({
          title: "Connected",
          description: "Video call established successfully",
        })
      }, 2000)

    } catch (error) {
      console.error('Error initializing call:', error)
      toast({
        title: "Camera Error",
        description: "Failed to access camera/microphone",
        variant: "destructive",
      })
    }
  }

  const cleanupCall = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled
      }
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled)
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled
      }
    }
  }

  const toggleLowBandwidth = () => {
    setIsLowBandwidth(!isLowBandwidth)
    toast({
      title: isLowBandwidth ? "High Quality Mode" : "Low Bandwidth Mode",
      description: isLowBandwidth ? "Switched to high quality video" : "Optimized for slow networks",
    })
  }

  const endCall = () => {
    cleanupCall()
    onCallEnd?.()
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getConnectionBadge = () => {
    const config = {
      good: { variant: 'default' as const, label: 'Good Connection' },
      fair: { variant: 'secondary' as const, label: 'Fair Connection' },
      poor: { variant: 'destructive' as const, label: 'Poor Connection' }
    }
    
    const { variant, label } = config[connectionQuality]
    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Video Consultation</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{patientName && `Patient: ${patientName}`}</span>
                {patientName && doctorName && <span>•</span>}
                <span>{doctorName && `Doctor: ${doctorName}`}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">{formatDuration(callDuration)}</div>
              <div className="text-xs text-muted-foreground">
                {isConnected ? 'Connected' : 'Connecting...'}
              </div>
            </div>
            {getConnectionBadge()}
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-gray-900">
        {/* Remote Video (Doctor) */}
        <div className="w-full h-full relative">
          {isConnected ? (
            <video
              ref={remoteVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Connecting to doctor...</p>
                <div className="animate-pulse">Please wait</div>
              </div>
            </div>
          )}
          
          {/* Local Video (Picture-in-Picture) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white shadow-lg">
            {isVideoEnabled ? (
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <VideoOff className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Connection Quality Indicator */}
          {isConnected && (
            <div className="absolute top-4 left-4">
              <HealthcareCard className="px-3 py-2 bg-black/50 backdrop-blur-sm border-white/20">
                <div className="flex items-center gap-2 text-white text-sm">
                  <div className={`w-2 h-2 rounded-full ${
                    connectionQuality === 'good' ? 'bg-green-500' :
                    connectionQuality === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  {connectionQuality === 'good' ? 'HD' : connectionQuality === 'fair' ? 'SD' : 'Low'}
                </div>
              </HealthcareCard>
            </div>
          )}

          {/* Low Bandwidth Indicator */}
          {isLowBandwidth && (
            <div className="absolute bottom-20 left-4">
              <Badge variant="secondary" className="bg-orange-500 text-white">
                Low Bandwidth Mode Active
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-card border-t p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Audio Toggle */}
          <Button
            variant={isAudioEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-14 h-14"
          >
            {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>

          {/* Video Toggle */}
          <Button
            variant={isVideoEnabled ? "default" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-14 h-14"
          >
            {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="rounded-full w-14 h-14"
          >
            <Phone className="h-6 w-6" />
          </Button>

          {/* Low Bandwidth Toggle */}
          <Button
            variant={isLowBandwidth ? "default" : "outline"}
            size="lg"
            onClick={toggleLowBandwidth}
            className="rounded-full w-14 h-14"
          >
            <Monitor className="h-6 w-6" />
          </Button>

          {/* Settings */}
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-14 h-14"
          >
            <Settings className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </Button>
        </div>
      </div>
    </div>
  )
}