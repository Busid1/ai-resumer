import { ArrowRight, FileText, Sparkles, Trash, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface UploadCVProps {
    fileName: string;
    resumeText: string;
    isProcessing: boolean;
    error: string | null;
    handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitResumeText: (event: React.FormEvent) => void;
    setResumeText: React.Dispatch<React.SetStateAction<string>>;
    setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export default function UploadCV({
    fileName,
    resumeText,
    isProcessing,
    error,
    handleFileUpload,
    handleSubmitResumeText,
    setResumeText,
    setFileName
}: UploadCVProps) {
    return (
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
                        <div className="border-2 border-dashed min-h-[200px] border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                            <Input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Haz clic para subir tu CV</p>
                                {fileName && (
                                    <p className="text-sm text-gray-500">
                                        Archivo seleccionado: {fileName}
                                    </p>
                                )}
                                <p className="text-sm text-gray-400">Solo archivos .pdf</p>
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

                <div className="flex justify-center pt-6 gap-10">
                    {resumeText ? 
                    <Button
                        size="lg"
                        onClick={() => {
                            setResumeText("");
                            setFileName("");
                        }}
                        className="bg-red-500 hover:bg-red-600 px-8 py-3 text-lg cursor-pointer"
                    >
                        <Trash/>
                        Limpiar
                    </Button>
                    : null
                    }
                    <Button
                        onClick={handleSubmitResumeText}
                        disabled={!resumeText.trim() || isProcessing}
                        size="lg"
                        className="px-8 py-3 text-lg cursor-pointer"
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
    );
}
