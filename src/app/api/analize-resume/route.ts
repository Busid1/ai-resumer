import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { CV_text } = await request.json();

        if (!CV_text) {
            return NextResponse.json({ error: 'Falta el texto del CV.' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content: "Eres un experto en optimización de currículums y evaluación de CVs para ofertas de trabajo. Responde siempre en JSON válido. No agregues explicaciones ni texto fuera del JSON. Usa únicamente las claves: 'score', 'strengths', 'weaknesses'. 'score' debe ser un número entre 0 y 100. 'strengths' y 'weaknesses' deben ser listas de frases cortas."
                }, {
                    role: 'user',
                    content: `Analiza este CV y da una puntuación del 0 al 100, indica puntos fuertes y débiles en formato JSON con estas claves:
          {
            "score": (número),
            "strengths": [lista de puntos fuertes],
            "weaknesses": [lista de puntos débiles]
          }

          CV:
          ${CV_text}`
                }
            ],
        });

        const messageContent = completion.choices[0].message.content;

        if (!messageContent) {
            return NextResponse.json({ error: 'La respuesta de OpenAI no contiene contenido.' }, { status: 500 });
        }

        let jsonStr = messageContent.trim();
        jsonStr = jsonStr.replace(/```json\s*|\s*```/g, '').trim();

        let result;
        try {
            result = JSON.parse(jsonStr);
        } catch (parseErr) {
            console.error('Error al parsear JSON:', parseErr);
            return NextResponse.json({ error: 'La respuesta de OpenAI no es un JSON válido.' }, { status: 500 });
        }

        return NextResponse.json({ result });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json({ error: 'Error generando análisis del CV.' }, { status: 500 });
    }
}