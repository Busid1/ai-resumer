"use client";

import { ArrowRight, CheckCircle, Star, Zap, FileText, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: "Optimización Instantánea",
      description: "Mejora tu CV en segundos con algoritmos de IA avanzados que analizan miles de ofertas exitosas."
    },
    {
      icon: Target,
      title: "Personalización Inteligente",
      description: "Adapta automáticamente tu currículum a cada oferta específica para maximizar tus posibilidades."
    },
    {
      icon: TrendingUp,
      title: "Análisis de Compatibilidad",
      description: "Obtén una puntuación precisa de qué tan bien encaja tu perfil con la posición deseada."
    },
    {
      icon: FileText,
      title: "Formato Profesional",
      description: "Estructura y formatea tu CV siguiendo las mejores prácticas de reclutadores expertos."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Star className="w-4 h-4 mr-1" />
              #1 en Optimización de CVs con IA
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Transforma tu CV en una
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Máquina de Entrevistas</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Nuestra IA analiza tu currículum y lo optimiza automáticamente para cada oferta de trabajo,
              aumentando tus posibilidades de conseguir entrevistas hasta en un <strong>320%</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/optimize-cv">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg cursor-pointer"
                >
                  Optimizar Mi CV Gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center max-sm:flex-col max-sm:gap-3 justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Resultados en menos 30 segundos
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                100% Confidencial
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Por qué elegir ResumeBoost AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra tecnología de vanguardia combina análisis semántico, machine learning y
              conocimiento de reclutadores expertos para crear el CV perfecto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-600">
              Tres simples pasos para transformar tu currículum
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sube tu CV",
                description: "Carga tu currículum actual en formato texto o PDF. Nuestro sistema lo analiza instantáneamente."
              },
              {
                step: "02",
                title: "Describe la oferta",
                description: "Pega la descripción del trabajo que te interesa. La IA identificará palabras clave y requisitos."
              },
              {
                step: "03",
                title: "Recibe tu CV optimizado",
                description: "En segundos obtienes un currículum mejorado con mayor compatibilidad y sugerencias personalizadas."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl font-bold text-blue-100 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para conseguir más entrevistas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de profesionales que ya han transformado sus carreras con PerfectCV AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/optimize-cv">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg cursor-pointer"
              >
                Comenzar Gratis Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}