import React, { useRef, useState } from 'react';
import { PDFDownloadLink, Document, Page, Image } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import ImagenPlaneacion from './InfoGeneral';

const PAGE_HEIGHT = 1000; // Altura máxima de la página en puntos

const PDFGenerator = () => {
  const componentRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePages, setImagePages] = useState([]);

  const generatePDF = async () => {
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL('image/png');

    const totalPages = Math.ceil(canvas.height / PAGE_HEIGHT);
    const pages = Array.from({ length: totalPages }, (_, index) => {
      const startY = index * PAGE_HEIGHT;
      const endY = Math.min(startY + PAGE_HEIGHT, canvas.height);
      const pageCanvas = document.createElement('canvas');
      const context = pageCanvas.getContext('2d');

      pageCanvas.width = canvas.width;
      pageCanvas.height = PAGE_HEIGHT;
      context.drawImage(canvas, 0, startY, canvas.width, endY - startY, 0, 0, canvas.width, endY - startY);

      return pageCanvas.toDataURL('image/png');
    });

    setImageUrl(imgData);
    setImagePages(pages);
  };

  const ImagenPDF = ({ imagePages }) => (
    <Document>
      {imagePages.map((pageData, index) => (
        <Page key={index} size="A4">
          <Image src={pageData} style={{ width: '100%' }} />
        </Page>
      ))}
    </Document>
  );

  return (
    <div>
      <div ref={componentRef}>
        <ImagenPlaneacion />
      </div>
      <button className='btn-generar-alerta' onClick={generatePDF}>Generar PDF</button>
      {imageUrl && (
        <PDFDownloadLink document={<ImagenPDF imagePages={imagePages} />} fileName="documento.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Cargando documento...' : 'Descargar documento'
          }
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default PDFGenerator;
