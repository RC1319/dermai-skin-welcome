import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, AlertTriangle, CheckCircle, Activity, RotateCcw, Camera, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  lesionType: string;
  confidence: number;
  riskLevel: string;
  details: { label: string; value: number }[];
  recommendation?: string;
}

const DemoSection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processFile(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setWebcamActive(true);
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please allow camera permissions.",
        variant: "destructive",
      });
    }
  };

  const stopWebcam = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setWebcamActive(false);
  };

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.9);
    stopWebcam();
    setImage(base64);
    analyzeImage(base64);
  };

  const analyzeImage = async (base64Image: string) => {
    setResults(null);
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-skin", {
        body: { image: base64Image },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResults(data as AnalysisResult);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      toast({
        title: "Analysis Failed",
        description: err.message || "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      setImage(base64Image);
      analyzeImage(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setResults(null);
    setAnalyzing(false);
    stopWebcam();
  };

  const riskColor = (level: string) => {
    if (level === "Low") return "text-accent";
    if (level === "Medium") return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <section id="demo" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Try It Yourself</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Upload an image or use your webcam for AI-powered skin analysis</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {webcamActive ? (
              <motion.div key="webcam" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-card rounded-3xl border border-border p-6 shadow-lg space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-64 md:h-80 object-cover" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={stopWebcam}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
                <Button className="w-full py-6 rounded-2xl text-base gap-3" onClick={captureFrame}>
                  <Camera className="w-6 h-6" />
                  Capture & Analyze
                </Button>
              </motion.div>
            ) : !image ? (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-primary/40 rounded-3xl p-12 text-center cursor-pointer hover:border-primary/70 transition-colors bg-card"
                  onClick={() => document.getElementById("demo-file-input")?.click()}
                >
                  <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold text-foreground mb-2">Drag & drop an image here</p>
                  <p className="text-muted-foreground text-sm">or click to browse files</p>
                  <input id="demo-file-input" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-2xl text-base gap-3"
                  onClick={startWebcam}
                >
                  <Video className="w-6 h-6" />
                  Open Webcam
                </Button>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img src={image} alt="Uploaded skin" className="rounded-2xl w-full h-64 object-cover" />
                    <Button variant="ghost" size="sm" className="mt-3" onClick={reset}>
                      <RotateCcw className="w-4 h-4 mr-1" /> Upload another
                    </Button>
                  </div>
                  <div className="flex flex-col justify-center">
                    {analyzing ? (
                      <div className="text-center space-y-4">
                        <Activity className="w-10 h-10 text-primary mx-auto animate-pulse" />
                        <p className="font-semibold text-foreground">Analyzing with AI...</p>
                        <Progress value={65} className="h-2" />
                      </div>
                    ) : results ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-accent" />
                          <span className="font-bold text-foreground">Analysis Complete</span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Classification</p>
                          <p className="text-lg font-bold text-foreground">{results.lesionType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <p className={`text-lg font-bold ${riskColor(results.riskLevel)}`}>{results.riskLevel}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Confidence Scores</p>
                          {results.details.map((d) => (
                            <div key={d.label} className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-32 truncate">{d.label}</span>
                              <Progress value={d.value} className="h-2 flex-1" />
                              <span className="text-xs font-semibold text-foreground w-10 text-right">{d.value}%</span>
                            </div>
                          ))}
                        </div>
                        {results.recommendation && (
                          <div className="bg-secondary/50 rounded-xl p-3">
                            <p className="text-xs text-muted-foreground">{results.recommendation}</p>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-2 bg-secondary/50 rounded-xl p-4">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Disclaimer:</strong> This AI analysis is for informational purposes only. It is not medical advice. Always consult a dermatologist for professional diagnosis.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
