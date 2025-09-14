"use client";

import { useEffect, useState } from 'react';
import { FileText, Briefcase, Sparkles, CheckCircle, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import UploadCV from '@/components/upload-cv';
import UploadJob from '@/components/upload-job';
import ResultCV from '@/components/result-cv';
import Header from '@/components/header';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
// @ts-expect-error: PDF.js legacy build import for Node environment
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

interface ResumeImprovement {
  original: string;
  improved: string;
  suggestions: string[];
  compatibilityScore: number;
}

export default function AIResume() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [jobOffer, setJobOffer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [improvement, setImprovement] = useState<ResumeImprovement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file.name);


    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;

    let extractedText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      extractedText += content.items
        .map((item: { str: string }) => item.str)
        .join(" ") + "\n";
    }

    setFileName(file.name)
    setResumeText(extractedText);
  };

  const handleSubmitResumeText = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    if (resumeText.length < 100) {
      setError('El CV es demasiado corto. Por favor, proporciona un CV más detallado.');
      setIsProcessing(false);
      return;
    }

    try {
      const intervals = [20, 40, 60, 80, 100];
      for (let i = 0; i < intervals.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(intervals[i]);
      }

      setProgress(100);
      setIsProcessing(false);
      setCurrentStep(2);
    } catch (err) {
      setError('Error al procesar el CV. Intenta de nuevo.');
      setIsProcessing(false);
      console.error(err);
    }
  };

  const handleProcessCV = async () => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    if (jobOffer.length < 50) {
      setError('La descripción de la oferta laboral es demasiado corta. Por favor, proporciona más detalles.');
      setIsProcessing(false);
      return;
    }

    try {
      const intervals = [20, 40, 60, 80, 95];
      for (let i = 0; i < intervals.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProgress(intervals[i]);
      }

      const response = await fetch('/api/optimize-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CV_text: resumeText, Job_text: jobOffer }),
      });

      if (!response.ok) throw new Error('Error al optimizar el CV');
      const data = await response.json();
      const result = data.result;
      if (!result || typeof result !== 'object') {
        throw new Error('Formato de respuesta inválido');
      }
      setImprovement({
        original: resumeText,
        improved: result.optimized_cv || resumeText,
        suggestions: result.changes || [],
        compatibilityScore: result.score || improvement?.compatibilityScore || 0,
      });
      setProgress(100);
      setIsProcessing(false);
      setCurrentStep(3);
    } catch (err) {
      setError('Error al optimizar el CV. Intenta de nuevo.');
      setIsProcessing(false);
      console.error(err);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setResumeText('');
    setJobOffer('');
    setImprovement(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Cargar CV", icon: FileText },
              { step: 2, title: "Oferta Laboral", icon: Briefcase },
              { step: 3, title: "Resultado", icon: Sparkles }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep >= step
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-gray-200 text-gray-600'
                  }`}>
                  {currentStep > step ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`ml-3 font-medium ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                  {title}
                </span>
                {step < 3 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <UploadCV
            fileName={fileName}
            resumeText={resumeText}
            isProcessing={isProcessing}
            error={error}
            handleFileUpload={handleFileUpload}
            handleSubmitResumeText={handleSubmitResumeText}
            setResumeText={setResumeText}
            setFileName={setFileName}
          />
        )}

        {currentStep === 2 && (
          <UploadJob jobOffer={jobOffer} isProcessing={isProcessing} error={error} handleProcessCV={handleProcessCV} setJobOffer={setJobOffer} setCurrentStep={setCurrentStep} />
        )}

        {isProcessing && (
          <Card className="max-w-4xl mx-auto shadow-xl mt-5 border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-blue-600 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Optimizando tu Currículum
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Nuestra IA está analizando tu CV y la oferta laboral para crear la versión más optimizada
                </p>
                <div className="max-w-md mx-auto">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-gray-500 mt-2">{progress}% completado</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && improvement && (
          <ResultCV improvement={improvement} resetForm={resetForm} setIsOpen={setIsOpen} />
        )}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl w-full max-w-[1200px] md:max-w-[1400px] lg:max-w-[1600px] max-h-[90vh] overflow-auto p-6 relative">
              <DialogHeader className="flex justify-between items-center">
                <DialogTitle className="text-2xl font-bold">Comparación de CVs</DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" className="p-2 absolute top-4 right-4 cursor-pointer hover:bg-red-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </Button>
                </DialogClose>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-[75vh]">
                  <h3 className="font-semibold mb-2">CV Original</h3>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{improvement?.original}</pre>
                </div>
                <div className="border rounded-lg p-4 bg-blue-50 overflow-auto max-h-[75vh]">
                  <h3 className="font-semibold mb-2 text-blue-700">CV Optimizado</h3>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">{improvement?.improved}</pre>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}