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
                    content: `
Eres un experto en optimización y evaluación de currículums para ofertas de trabajo.
Tu tarea es analizar un CV y producir únicamente un JSON válido con las claves:

- "score": número entero entre 0 y 100, donde 100 significa CV perfectamente alineado con la oferta.
- "strengths": lista de frases cortas indicando los puntos fuertes del CV.
- "weaknesses": lista de frases cortas indicando los puntos débiles del CV.

No agregues explicaciones, títulos ni texto fuera del JSON. 
Siempre responde con un JSON válido que pueda ser parseado directamente.
      `.trim()
                },
                {
                    role: "user",
                    content: `
Analiza el siguiente CV y proporciona la puntuación y análisis en JSON:

CV:
${CV_text}

Formato de salida esperado:
{
  "score": (número entre 0 y 100),
  "strengths": [ "frase corta 1", "frase corta 2", ... ],
  "weaknesses": [ "frase corta 1", "frase corta 2", ... ]
}
      `.trim()
                }
            ]
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