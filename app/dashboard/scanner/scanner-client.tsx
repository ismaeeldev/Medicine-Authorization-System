"use client"

import { useState, useEffect, useRef } from "react"
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { Camera, Image as ImageIcon, Loader2, CheckCircle2, XCircle, Search, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type ScanResult = {
    authorized: boolean;
    companyName?: string;
    serial?: string;
} | null;

export function ScannerClient() {
    const [mode, setMode] = useState<"camera" | "upload">("camera")
    const [isScanning, setIsScanning] = useState(false)
    const [isStartingCamera, setIsStartingCamera] = useState(false)
    const [result, setResult] = useState<ScanResult>(null)
    const [isVerifying, setIsVerifying] = useState(false)

    const scannerRef = useRef<Html5Qrcode | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Cleanup scanner on unmount
        return () => {
            stopScanner()
        }
    }, [])

    const stopScanner = () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            scannerRef.current.stop().then(() => {
                scannerRef.current?.clear()
                setIsScanning(false)
            }).catch(err => {
                console.error("Failed to stop scanner", err)
            })
        }
    }

    const startCamera = async () => {
        setIsStartingCamera(true)
        setResult(null)

        try {
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode("reader")
            }

            await scannerRef.current.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 150 },
                    aspectRatio: 1.0,
                },
                async (decodedText) => {
                    // Play a simple beep sound on scan? Can be added.
                    stopScanner()
                    await verifySerial(decodedText)
                },
                (errorMessage) => {
                    // ignore continuous scanning errors
                }
            )
            setIsScanning(true)
        } catch (err: any) {
            console.error(err)
            toast.error("Camera permission denied or camera not found.")
        } finally {
            setIsStartingCamera(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            setResult(null)

            try {
                if (!scannerRef.current) {
                    scannerRef.current = new Html5Qrcode("reader")
                }

                setIsVerifying(true)
                const scanResult = await scannerRef.current.scanFile(file, true)
                await verifySerial(scanResult)
            } catch (err) {
                console.error("QR Error", err)
                toast.error("No barcode detected in the image.")
            } finally {
                setIsVerifying(false)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
            }
        }
    }

    const verifySerial = async (serial: string) => {
        setIsVerifying(true)
        try {
            const res = await fetch(`/api/verify?serial=${encodeURIComponent(serial)}`)
            if (!res.ok) throw new Error("Failed to verify")
            const data = await res.json()
            setResult({ ...data, serial })

            if (data.authorized) {
                toast.success(`Authorized: ${data.companyName}`)
            } else {
                toast.error("Product not registered")
            }
        } catch (err) {
            toast.error("Verification failed due to network error.")
        } finally {
            setIsVerifying(false)
        }
    }

    const resetScanner = () => {
        setResult(null)
        if (mode === "camera") {
            startCamera()
        }
    }

    return (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
            {/* Scanner Control Card */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                        Scanning Mode
                        <div className="flex bg-black/40 p-1 rounded-lg">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setMode("camera")
                                    setResult(null)
                                    // It will wait for manual start to save resources
                                }}
                                className={mode === "camera" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground"}
                            >
                                <Camera className="w-4 h-4 mr-2" /> Live
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setMode("upload")
                                    stopScanner()
                                    setResult(null)
                                }}
                                className={mode === "upload" ? "bg-white/10 text-primary shadow-sm" : "text-muted-foreground"}
                            >
                                <ImageIcon className="w-4 h-4 mr-2" /> Upload
                            </Button>
                        </div>
                    </CardTitle>
                    <CardDescription>
                        {mode === "camera"
                            ? "Center the barcode within the camera view to scan automatically."
                            : "Upload a clear image of the barcode to extract the serial number."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center p-6 relative">

                    {/* Scanner Viewport */}
                    <div className="w-full max-w-[280px] sm:max-w-sm aspect-square relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center shadow-inner">

                        {/* Camera Element target */}
                        <div id="reader" className="w-full h-full absolute inset-0 [&>video]:object-cover [&>video]:w-full [&>video]:h-full" />

                        {/* Upload Mode UI */}
                        {mode === "upload" && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/60 backdrop-blur-sm">
                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                                    <ImageIcon className="w-10 h-10 text-primary/80" />
                                </div>
                                <h3 className="font-medium text-lg text-foreground mb-1">Upload Image</h3>
                                <p className="text-sm text-muted-foreground mb-6">Select a photo containing a clear barcode.</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                />
                                <Button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                                >
                                    Choose File
                                </Button>
                            </div>
                        )}

                        {/* Camera Mode Standby UI */}
                        {mode === "camera" && !isScanning && !result && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/60 backdrop-blur-sm">
                                <Camera className="w-12 h-12 text-white/40 mb-4" />
                                <Button
                                    onClick={startCamera}
                                    disabled={isStartingCamera}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 h-12 px-8 rounded-full"
                                >
                                    {isStartingCamera ? (
                                        <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Starting Camera...</>
                                    ) : (
                                        "Start Camera"
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Verifying Overlay */}
                        {isVerifying && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/80 backdrop-blur-md">
                                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                <p className="text-lg font-medium animate-pulse text-foreground">Verifying serial...</p>
                            </div>
                        )}

                    </div>
                </CardContent>
            </Card>

            {/* Result Card */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl">Verification Result</CardTitle>
                    <CardDescription>
                        The status of the scanned medicine will appear here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <AnimatePresence mode="wait">
                        {!result && !isVerifying ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center text-muted-foreground"
                            >
                                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                    <Search className="w-10 h-10 opacity-50" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-1">Awaiting Scan</h3>
                                <p className="text-sm max-w-[250px]">Scan a barcode to verify.</p>
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full flex flex-col items-center justify-center"
                            >
                                {result.authorized ? (
                                    <div className="flex flex-col items-center w-full">
                                        <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-4 border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-emerald-400 mb-1">Authorized</h3>
                                        <p className="text-sm text-foreground/80 mb-6 font-medium bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
                                            Registered under: <span className="text-emerald-300 font-bold">{result.companyName}</span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center w-full">
                                        <div className="w-24 h-24 rounded-full bg-destructive/20 border-4 border-destructive/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                                            <XCircle className="w-12 h-12 text-destructive" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-destructive mb-1">Not Registered</h3>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            This product serial number could not be found in our authorized database.
                                        </p>
                                    </div>
                                )}

                                <div className="w-full bg-black/20 rounded-xl p-4 border border-white/5 mb-8">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Scanned Serial Number</p>
                                    <p className="font-mono text-lg text-foreground tracking-widest">{result.serial}</p>
                                </div>

                                <Button
                                    onClick={resetScanner}
                                    variant="outline"
                                    className="w-full sm:w-auto px-8 border-white/10 hover:bg-white/5"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Scan Another
                                </Button>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </CardContent>
            </Card>

        </div>
    )
}
