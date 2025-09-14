import { CheckCircle, Download, Eye, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ResumeImprovement {
    original: string;
    improved: string;
    suggestions: string[];
    compatibilityScore: number;
}

interface ResultCVProps {
    improvement: ResumeImprovement;
    isOpen: boolean;
    resetForm: (event: React.FormEvent) => void;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultCV({
    improvement,
    isOpen,
    resetForm,
    setIsOpen,
}: ResultCVProps) {
    return (
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
                <Button onClick={resetForm} variant="outline" size="lg" className='px-8 cursor-pointer'>
                    Optimizar Otro CV
                </Button>
                <Button onClick={() => setIsOpen(true)} size="lg" className="px-8 bg-blue-700 hover:bg-blue-600 cursor-pointer">
                    <Eye />
                    Ver Comparación
                </Button>
                <Button
                    size="lg"
                    className="px-8 cursor-pointer"
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
        </div>
    )
}