import { Component, signal, ViewChild, viewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Signature } from '../../shared/signature-pad/signature-pad';
@Component({
  selector: 'app-show-dynamic-html',
  imports: [Signature],
  templateUrl: './show-dynamic-html.html',
  styleUrl: './show-dynamic-html.css'
})
export class ShowDynamicHtml {
  @ViewChild("signatureModal") signatureModal!: Signature;

  rawHtml = signal(` <style>
        body,
        html {
            padding: 5px;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            width: 90%;
            border: 1px solid black;
            padding-left: 10px;
            padding-right: 10px;
        }

        .input {
            border-left: none;
            border-right: none;
            border-top: none;
            min-width: 400px;
            max-width: 600px;
        }

        .main {
            width: 80%;
        }

        .input:focus {
            outline: none !important;
        }

        .main-heading,
        h1 {
            text-align: center;
        }

        .main-heading,
        p {
            text-align: left;
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
        h3 {
            color: #2988C7;
        }

        p {
            color: black;
        }

        .signature-area {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            height: 200px;
            width: 100%;
        }
        .label{
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    </style>
    <div class="container">
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
            <span>Patient Name: <input #patName class="input" type="text"></span>
            <br>
            <span>Date: <input #patNameDate class="input" type="date" name="" id=""></span>
        </div>
        <h3>PURPOSE:</h3>
        <p>A biopsy is a surgical procedure used to obtain a sample of tissue for microscopic examination to aid
            the
            healthcare provider in the diagnosis. The entire lesion may not be removed in this procedure.
            Further
            medical or surgical treatment may be needed when the diagnosis is made.</p>
        <h3>PROPOSED TREATMENT:</h3>
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


        <h3>DIGITAL IMAGING:</h3>
        <p> I authorize clinical images as a part of treatment and care for historical, training and/or
            promotional
            purposes. I understand confidentiality will be maintained.</p>

        <p>A pathologist will examine the tissue obtained in this biopsy procedure. I understand that I may
            receive
            a
            separate bill from the pathologist or laboratory for this microscopic examination.</p>

        <h3>OTHER ACKNOWLEDGMENT DISCLOSURES:</h3>
        I am able to read and understand English.

        <div class="signature-area">
            <span>
                
            </span>
            <div class="label">
                <span>CONSENT: PATIENT <br>(OR LEGAL GUARDIAN) SIGNATURE:</span>
                <img #signatureImg style="width: 200px; height: 200px; background-repeat: no-repeat; background-size: contain;"
                    src=""
                    alt="signature">
            </div>
            <span>Date: <input #patSignatureDate class="input" type="date"></span>
        </div>
    </div>
    `);


    safeUrl!: SafeUrl;
    constructor(private sanitizer: DomSanitizer){
      this.safeUrl = this.sanitizer.bypassSecurityTrustHtml(this.rawHtml())
    }


    openSignaturePad(){
      this.signatureModal.open();
    }
}
