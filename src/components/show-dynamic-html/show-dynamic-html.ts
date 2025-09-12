import { Component, OnInit, Signal, signal, ViewChild, viewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Signature } from '../../shared/signature-pad/signature-pad';
import { GeneratePdf } from '../../services/generatepdf';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { saveConsentForm } from '../../models/saveConsentForm';
import { Uploadform } from '../../services/uploadform';
@Component({
    selector: 'app-show-dynamic-html',
    imports: [],
    templateUrl: './show-dynamic-html.html',
    styleUrl: './show-dynamic-html.css'
})
export class ShowDynamicHtml implements OnInit {
    enableSubmit = signal(false);
    doc: any;
    patName!: any;
    patNameDate!: any;
    image!: any;
    sigDate!: any;
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
    parser: any;
    htmlForPdf = signal("");
    safeUrl!: SafeUrl;
    constructor(private sanitizer: DomSanitizer, private generatePdf: GeneratePdf, private modalService: NgbModal, private uploadFormService: Uploadform) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(this.rawHtml())
    }

    ngOnInit(): void {
        this.parser = new DOMParser();
        this.doc = this.parser.parseFromString(this.rawHtml(), 'text/html');
        this.patName = this.doc.getElementById("patName") as HTMLElement;
        if (this.patName) {
            this.patName.innerText = "Ghulam Asghar";
        }
        this.patNameDate = this.doc.getElementById("patNameDate") as HTMLElement;
        if (this.patNameDate) {
            this.patNameDate.innerText = "10-09-2025";
        }
        this.image = this.doc.getElementById("signatureImg") as HTMLImageElement;
        this.sigDate = this.doc.getElementById("sigDate") as HTMLElement;
        if (this.sigDate) {
            this.sigDate.innerText = "10-09-2025";
        }
        this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(this.doc.documentElement.outerHTML);
        this.htmlForPdf.set(this.doc.documentElement.outerHTML)
    }
    popUpOptions: NgbModalOptions = {
        backdrop: 'static',
        keyboard: false,
    };
    openSignaturePad() {
        const modalRef = this.modalService.open(Signature, this.popUpOptions);
        modalRef.result.then((result) => {
            if (result.changingThisBreaksApplicationSecurity && this.image) {
                this.image.src = result.changingThisBreaksApplicationSecurity;
                this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(this.doc.documentElement.outerHTML);
                this.enableSubmit.set(true);
                this.htmlForPdf.set(this.doc.documentElement.outerHTML)
            }
        }, (reason) => {
        })
    }

    async onSubmit() {
        const pdfElement = document.getElementById('PdfForm');
        if (pdfElement) {
                const receivedFile = await this.generatePdf.generatePdfFromHtml(pdfElement, 'tissueBiopsyForm.pdf');
                if (receivedFile instanceof File) {
                    console.log("its file ok")
                    const objSaveForm: saveConsentForm = new saveConsentForm();
                    objSaveForm.patient_id = 51910113091;
                    objSaveForm.practice_id = 519;
                    objSaveForm.document_date = "09/12/2025";
                    objSaveForm.original_file_name = receivedFile.name;
                    objSaveForm.name = receivedFile.name;
                    objSaveForm.comment = '';
                    objSaveForm.doc_categories_id = 5191016;
                    objSaveForm.modified_user = "LJackson@mhc";
                    objSaveForm.client_date_modified = "2025-09-12 12:43:59";
                    objSaveForm.system_ip = "192.168.10.172";
                    objSaveForm.created_user = "LJackson@mhc";
                    objSaveForm.client_date_created = "2025-09-12 12:43:59";
                    const formData: FormData = new FormData();
                    formData.append('docFile', receivedFile);
                    formData.append('docData', JSON.stringify(objSaveForm));
                    formData.append('docCategory', "Billing");
                    // this.uploadFormService.savePatientConsentForm(formData).subscribe({
                    //     next: (data: any) => {
                    //         console.log(data);
                    //     },
                    //     error: (err: any) => {
                    //         console.log("error", err)
                    //     }
                    // })
                }
        } else {
            console.error('PdfForm element not found in DOM');
        }
        // this.enableSubmit.set(false);
    }
}
