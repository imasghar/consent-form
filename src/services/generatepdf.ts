import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class GeneratePdf {
  
  generatePdfFromHtml(element: any, formName: string){
    if(element){
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const newPdf = new jsPDF('p', 'mm', 'a4');
        const imgPros = newPdf.getImageProperties(imgData);
        const pdfWidth = newPdf.internal.pageSize.getWidth();
        const pdfHeight = (imgPros.height * pdfWidth) / imgPros.width;
        newPdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        if(formName){
          newPdf.save(formName);
        } else {
          newPdf.save("download.pdf")
        }
        
      })
    }
  }
  
}
