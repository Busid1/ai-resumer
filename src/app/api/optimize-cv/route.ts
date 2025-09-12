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
            return NextResponse.json(
                { error: 'Faltan el CV o la oferta de trabajo.' },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.4,
            messages: [
                {
                    role: 'system',
                    content: `
Eres un experto en optimización de currículums y adecuación de CVs a ofertas de trabajo. 
Tu tarea es tomar un CV y una oferta laboral, y generar un CV optimizado que resalte las habilidades y experiencias más relevantes para la oferta, mejore la redacción y agregue palabras clave importantes. 
Debes responder únicamente en JSON válido con las siguientes claves:

- "optimized_cv": el texto completo del CV optimizado.
- "changes": lista de frases cortas describiendo los cambios más importantes realizados.
- "score": número entre 0 y 100 indicando la adecuación del CV a la oferta (100 = totalmente alineado).

No agregues texto fuera del JSON. Siempre usa frases concisas en "changes".
          `.trim(),
                },
                {
                    role: 'user',
                    content: `
CV:
${CV_text}

Oferta de trabajo:
${Job_text}

Formato de salida esperado:
{
  "optimized_cv": "texto del nuevo CV",
  "changes": ["Cambio importante 1", "Cambio importante 2", ...],
  "score": (número entre 0 y 100)
}
          `.trim(),
                },
            ],
        });

        const messageContent = completion.choices[0].message.content;

        if (!messageContent) {
            return NextResponse.json(
                { error: 'La respuesta de OpenAI no contiene contenido.' },
                { status: 500 }
            );
        }

        let jsonStr = messageContent.trim();
        jsonStr = jsonStr.replace(/```json\s*|\s*```/g, '').trim();

        let result;
        try {
            result = JSON.parse(jsonStr);
        } catch (parseErr) {
            console.error('Error al parsear JSON:', parseErr, jsonStr);
            return NextResponse.json(
                { error: 'La respuesta de OpenAI no es un JSON válido.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ result });
    } catch (err) {
        console.error('Error:', err);
        return NextResponse.json(
            { error: 'Error adaptando el CV.' },
            { status: 500 }
        );
    }
}
