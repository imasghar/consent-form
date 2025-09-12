import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class GeneratePdf {

  generatePdfFromHtml(element: any, formName: string): Promise<File> {
    return new Promise((resole, reject) => {
      const originalWidth = document.body.style.width;
      const originalOverflow = document.body.style.overflow;
      document.body.style.width = '1024px';
      document.body.style.overflow = 'visible';
      const scale = 1.5;
      html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: false,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      }).then(canvas => {
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalOverflow;
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = pdfHeight;
        let position = 0;
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }
        const pdfBlob = pdf.output('blob');
        const file: File = new File([pdfBlob], formName || "consentForm", { type: "application/pdf" });
        resole(file);
      }).catch(err => {
        console.error("Error capturing PDF:", err);
        reject(err)
      });
    });
  }
}
