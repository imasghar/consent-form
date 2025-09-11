import { Component, Signal, signal, ViewChild, viewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Signature } from '../../shared/signature-pad/signature-pad';
import { GeneratePdf } from '../../services/generatepdf';
@Component({
    selector: 'app-show-dynamic-html',
    imports: [Signature],
    templateUrl: './show-dynamic-html.html',
    styleUrl: './show-dynamic-html.css'
})
export class ShowDynamicHtml {
    @ViewChild("signatureModal") signatureModal!: Signature;
    enableSubmit = signal(false);
    rawHtml = signal(`  <style>
        body,
        html {
            padding: 5px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            width: 100%;
            border: 1px solid black;
            padding-left: 10px;
            padding-right: 10px;
        }

        .main {
            width: 80%;
        }

        .main-heading,
        h1 {
            text-align: center;
        }

        .data-fields {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        }

        .description,
        h5 {
            color: #2988C7;
        }

        p {
            color: black;
             text-align: left;
        }

        .signature-area {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            height: 250px;
            width: 100%;
        }

        .label {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        label {
            font-weight: lighter;
        }

        @media only screen and (max-width: 767px) {
            .data-fields{
                flex-direction: column;
            }

            .signature-area{
                flex-direction: column;
            }
        }

        @media only screen and (min-width: 768px) and (max-width: 1024px) {
           
        }

        @media only screen and (min-width: 1025px) {
           
        }
    </style>
    <div id="PdfForm" class="container">
        <div class="main-heading">
            <h1>Tissue Biopsy Consent Form</h1>
            <p>Your healthcare provider may need to perform a skin biopsy to evaluate your skin condition.
                Please
                review and
                sign below. You will be given ample time to discuss the procedure if your healthcare provider
                determines
                that a
                skin biopsy is necessary.</p>
        </div>
        <div class="data-fields">
            <span>Patient Name: <label for="" id="patName">@PatientName</label></span>
            <br>
            <span>Date: <label for=""id="patNameDate">@Date</label></span>
        </div>
        <h5>PURPOSE:</h5>
        <p>A biopsy is a surgical procedure used to obtain a sample of tissue for microscopic examination to aid
            the
            healthcare provider in the diagnosis. The entire lesion may not be removed in this procedure.
            Further
            medical or surgical treatment may be needed when the diagnosis is made.</p>
        <h5>PROPOSED TREATMENT:</h5>
        <p>I understand that a biopsy requires obtaining a sample of tissue and is a surgical procedure. As in
            any
            surgical procedure, there are certain inherent risks including bleeding, post-operative pain,
            infection,
            reactions to sutures, anesthetics or topical antibiotics, and scarring. Although all reasonable
            efforts
            will
            be made to minimize the possibility of these potential complications, no guarantees can be made
            since
            many
            factors beyond the control of the physician (such as the degree of sun damage or patient compliance
            with
            post-operative instructions) affect the ultimate healing.</p>


        <h5>DIGITAL IMAGING:</h5>
        <p> I authorize clinical images as a part of treatment and care for historical, training and/or
            promotional
            purposes. I understand confidentiality will be maintained.</p>

        <p>A pathologist will examine the tissue obtained in this biopsy procedure. I understand that I may
            receive
            a
            separate bill from the pathologist or laboratory for this microscopic examination.</p>

        <h5>OTHER ACKNOWLEDGMENT DISCLOSURES:</h5>
        I am able to read and understand English.

        <div class="signature-area">
            <span>

            </span>
            <div class="label">
                <span>CONSENT: PATIENT <br>(OR LEGAL GUARDIAN) SIGNATURE:</span>
                <img id='signatureImg'
                    style="width: 300px; height: 200px; background-repeat: no-repeat; background-size: contain;" src=""
                    alt="signature">
            </div>
            <span>Date: <label for="" id="sigDate" >@date</label></span>
        </div>
    </div>
    `);

    htmlForPdf = signal("");
    safeUrl!: SafeUrl;
    constructor(private sanitizer: DomSanitizer, private generatePdf: GeneratePdf) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(this.rawHtml())
    }


    openSignaturePad() {
        this.signatureModal.open();
    }
    imageSrc: any;
    onModalClosed(imagedata: string) {
        if (imagedata) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.rawHtml(), 'text/html');
            const image = doc.getElementById("signatureImg") as HTMLImageElement;
            if (image) {
                image.src = imagedata
            }
            this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(doc.documentElement.outerHTML);
            this.enableSubmit.set(true);
            this.htmlForPdf.set(doc.documentElement.outerHTML)
        }
    }

    onSubmit() {
        const pdfElement = document.getElementById('PdfForm');
        if (pdfElement) {
            this.generatePdf.generatePdfFromHtml(pdfElement, 'tissueBiopsyForm.pdf');
        } else {
            console.error('PdfForm element not found in DOM');
        }
        this.enableSubmit.set(false);
    }
}
