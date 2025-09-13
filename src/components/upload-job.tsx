import { Briefcase, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";

interface UploadJobProps {
    jobOffer: string;
    isProcessing: boolean;
    error: string | null;
    handleProcessCV: (event: React.FormEvent) => void;
    setJobOffer: React.Dispatch<React.SetStateAction<string>>;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function UploadJob({
    jobOffer,
    handleProcessCV,
    isProcessing,
    error,
    setJobOffer,
    setCurrentStep,
}: UploadJobProps) {
    return (
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
                        className='cursor-pointer'
                    >
                        Volver
                    </Button>
                    <Button
                        onClick={handleProcessCV}
                        disabled={!jobOffer.trim() || isProcessing}
                        size="lg"
                        className="px-8 py-3 text-lg cursor-pointer"
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
    )
}