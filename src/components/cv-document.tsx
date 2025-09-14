"use client";

import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    whiteSpace: 'pre-wrap',
  },
});

interface CVDocumentProps {
  CVImproved?: string;
}

export default function CVDocument({ CVImproved }: CVDocumentProps) {
  const cleanedText = (CVImproved || '').replace(/\*/g, '');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>{cleanedText}</Text>
      </Page>
    </Document>
  );
}
