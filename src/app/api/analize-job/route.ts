import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { CV_text, Job_text } = await request.json();

        if (!CV_text || !Job_text) {
            return NextResponse.json({ error: 'Faltan el CV o la oferta de trabajo.' }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            messages: [
                { role: 'system', content: 'Eres un experto en optimización de currículums.' },
                {
                    role: 'user',
                    content: `Adapta el siguiente CV a esta oferta de trabajo, agrega palabras clave, mejora la redacción y genera la respuesta en JSON:
          {
            "optimized_cv": "texto del nuevo CV",
            "changes": [lista de cambios importantes],
            "score": (número del 0 al 100)
          }

          CV:
          ${CV_text}

          Oferta:
          ${Job_text}`
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
        return NextResponse.json({ error: 'Error adaptando el CV.' }, { status: 500 });
    }
}