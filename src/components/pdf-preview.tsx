"use client";

import { Document, Page } from "react-pdf";
import { useState } from "react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

type PDFPreviewProps = {
  pdfUrl: string;
};

export default function PDFPreview({ pdfUrl }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex justify-center mx-auto bg-gray-100 p-6 rounded-lg">
      <div className="shadow-lg rounded-lg overflow-hidden bg-white">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={300}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
