"use client"

import Link from "next/link";
import { Badge } from "./ui/badge";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 ">
                                <Image src="favicon.ico" alt="PerfectCVAI-logo" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">PerfectCV AI</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {pathname == "/" ?
                            <Link href="/optimize-cv">
                                <Button className='cursor-pointer'>
                                    Probar Gratis
                                </Button>
                            </Link>
                            :
                            <>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Potenciado por IA
                                </Badge>
                                <Link href="/">
                                    <Button variant="outline" size="sm" className='cursor-pointer'>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Volver al Inicio
                                    </Button>
                                </Link>
                            </>
                        }

                    </div>
                </div>
            </nav>
        </header>
    )
}