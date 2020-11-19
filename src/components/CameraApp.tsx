import React, { useState, useEffect, RefObject } from 'react'
import './CameraApp.scss'

export function CameraApp() {

    const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
    
    useEffect(() => {
        setVideoStream(null);

        if (isVideoEnabled) {
            const setupVideoStream = async () => {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                })

                setVideoStream(stream)
            }

            setupVideoStream();
        }
    }, [isVideoEnabled])


    useEffect(() => {
        return () => {
            videoStream?.getTracks().forEach(track => track.stop());
        }
    }, [videoStream])

    useEffect(() => {
        if (videoRef) {
            videoRef.srcObject = videoStream;
        }
    }, [videoStream, videoRef])

    return (
        <section className="camera-app">
            <div className="video-wrapper">
                <video ref={setVideoRef} autoPlay>
                    Your browser doesn't support HTML5 video tag
                </video>
                <div className="manage">
                    <button onClick={() => setIsVideoEnabled(!isVideoEnabled)}>
                        Toggle
                    </button>
                </div>
            </div>
        </section>
    )
}

