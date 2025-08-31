import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import CVDocument from '@/components/cv-document';
import React from 'react';

export async function POST(req: Request) {
  try {
    const { cvText } = await req.json();

    if (!cvText) {
      return NextResponse.json({ error: 'CV text is required' }, { status: 400 });
    }

    const pdfBlob = await pdf(<CVDocument CVImproved={cvText} />).toBlob();
    const arrayBuffer = await pdfBlob.arrayBuffer();

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="cv-optimizado.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error generating PDF' }, { status: 500 });
  }
}
