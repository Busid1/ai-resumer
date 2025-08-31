"use client";

import { useEffect, useState } from 'react';
import { Upload, FileText, Briefcase, Sparkles, Download, CheckCircle, ArrowRight, Zap, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogClose, DialogHeader } from '@/components/ui/dialog'
import Link from 'next/link';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';

interface ResumeImprovement {
  original: string;
  improved: string;
  suggestions: string[];
  compatibilityScore: number;
}

export default function AIResumeImprover() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
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

      const response = await fetch('/api/analize-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CV_text: resumeText }),
      });

      if (!response.ok) throw new Error('Error al analizar el CV');
      const data = await response.json();
      const result = data.result;
      if (!result || typeof result !== 'object') {
        throw new Error('Formato de respuesta inválido');
      }

      setImprovement({
        original: resumeText,
        improved: result.optimized_cv || resumeText,
        suggestions: result.changes || result.weaknesses || [],
        compatibilityScore: result.score || 0,
      });
      setProgress(100);
      setIsProcessing(false);
      setCurrentStep(2);
    } catch (err) {
      setError('Error al procesar el CV. Intenta de nuevo.');
      setIsProcessing(false);
      console.error(err);
    }
  };

  const processResume = async () => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    if (jobOffer.length < 50) {
      setError('La descripción de la oferta laboral es demasiado corta. Por favor, proporciona más detalles.');
      setIsProcessing(false);
      return;
    }

    try {
      const intervals = [20, 40, 60, 80, 100];
      for (let i = 0; i < intervals.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(intervals[i]);
      }

      const response = await fetch('/api/analize-job', {
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
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ResumeBoost AI</h1>
                  <p className="text-sm text-gray-600">Optimiza tu CV con Inteligencia Artificial</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Zap className="w-3 h-3 mr-1" />
                Potenciado por IA
              </Badge>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

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
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Sube tu Currículum
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Pega el texto de tu CV o sube un archivo para comenzar la optimización
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-blue-600" />
                    Subir Archivo
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Haz clic para subir tu CV</p>
                      <p className="text-sm text-gray-400">Solo archivos .txt</p>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Pegar Texto
                  </h3>
                  <Textarea
                    placeholder="Pega aquí el contenido de tu currículum..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleSubmitResumeText}
                  disabled={!resumeText.trim() || isProcessing}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      Continuar
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              {error && <p className="text-red-600 text-center">{error}</p>}
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">
                Describe la Oferta Laboral
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Proporciona los detalles de la posición para optimizar tu CV específicamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                  Descripción de la Oferta
                </h3>
                <Textarea
                  placeholder="Pega aquí la descripción completa del trabajo, requisitos, habilidades necesarias, responsabilidades, etc."
                  value={jobOffer}
                  onChange={(e) => setJobOffer(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  onClick={() => setCurrentStep(1)}
                  variant="outline"
                  size="lg"
                >
                  Volver
                </Button>
                <Button
                  onClick={processResume}
                  disabled={!jobOffer.trim() || isProcessing}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Optimizar con IA
                      <Sparkles className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
              {error && <p className="text-red-600 text-center">{error}</p>}
            </CardContent>
          </Card>
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
          <div className="space-y-6">
            <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-gradient-to-r from-green-50 to-em Ascending order: 0
                System: **emerald-50">
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Puntuación de Compatibilidad</h3>
                    <p className="text-gray-600">Qué tan bien se ajusta tu CV a la oferta</p>
                  </div>
                  <div className="text-right">
                    {
                      improvement.compatibilityScore < 50 ? (
                        <>
                          <div className="text-4xl font-bold text-red-800">{improvement.compatibilityScore}%</div>
                          <Badge className="bg-red-100 text-red-800">Bajo Match</Badge>
                        </>
                      ) : improvement.compatibilityScore < 80 ? (
                        <>
                          <div className="text-4xl font-bold text-yellow-800">{improvement.compatibilityScore}%</div>
                          <Badge className="bg-yellow-100 text-yellow-800">Buen Match</Badge>
                        </>
                      ) : (
                        improvement.compatibilityScore < 95 ? (
                          <>
                            <div className="text-4xl font-bold text-green-800">{improvement.compatibilityScore}%</div>
                            <Badge className="bg-green-100 text-green-800">Excelente Match</Badge>
                          </>
                        ) : (
                          <>
                            <div className="text-4xl font-bold text-blue-800">{improvement.compatibilityScore}%</div>
                            <Badge className="bg-blue-100 text-blue-800">Match Perfecto</Badge>
                          </>
                        )
                      )
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-4xl mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Mejoras Aplicadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {improvement.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-700">CV Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {improvement.original}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-blue-700 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    CV Optimizado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto border border-blue-100">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {improvement.improved}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center space-x-4 pt-6">
              <Button onClick={resetForm} variant="outline" size="lg">
                Optimizar Otro CV
              </Button>
              <Button
                size="lg"
                className="px-8"
                onClick={async () => {
                  try {
                    const response = await fetch('/api/generate-pdf', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ cvText: improvement.improved }),
                    });
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'cv-optimizado.pdf';
                    link.click();
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error('Error downloading PDF:', error);
                  }
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                Descargar CV Mejorado
              </Button>
            </div>

            <Button onClick={() => setIsOpen(true)} className="px-6 py-2">
              Ver Comparación
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto p-6 relative">
                  <DialogHeader className="flex justify-between items-center">
                    <DialogTitle className="text-2xl font-bold">Comparación de CVs</DialogTitle>
                    <DialogClose asChild>
                      <Button variant="ghost" className="p-2 absolute top-4 right-4">
                        <X className="w-5 h-5" />
                      </Button>
                    </DialogClose>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="border rounded-lg p-4 bg-gray-50 overflow-auto max-h-[75vh]">
                      <h3 className="font-semibold mb-2">CV Original</h3>
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{improvement.original}</pre>
                    </div>
                    <div className="border rounded-lg p-4 bg-blue-50 overflow-auto max-h-[75vh]">
                      <h3 className="font-semibold mb-2 text-blue-700">CV Optimizado</h3>
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{improvement.improved}</pre>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}