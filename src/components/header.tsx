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
                <div className="flex justify-between items-center py-4 gap-2">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center">
                            <div className="size-10 max-sm:hidden">
                                <Image src="/favicon.ico" width={40} height={40} alt="PerfectCVAI-logo" />
                            </div>
                            <div>
                                <h1 className="text-2xl max-md:text-xl whitespace-nowrap font-bold text-gray-900">PerfectCV AI</h1>
                            </div>
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        {pathname == "/" ?
                            <Link href="/optimize-cv">
                                <Button className='cursor-pointer'>
                                    Probar Gratis
                                </Button>
                            </Link>
                            :
                            <>
                                <Badge variant="outline" className="bg-green-50 max-sm:hidden text-green-700 border-green-200">
                                    <Zap className="w-3 h-3 mr-1" />
                                    Potenciado por IA
                                </Badge>
                                <Link href="/">
                                    <Button variant="outline" size="sm" className='cursor-pointer'>
                                        <ArrowLeft />
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