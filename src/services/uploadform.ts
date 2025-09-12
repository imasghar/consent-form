import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Uploadform {
  token: string = "gAmiNOK+Z9cKZ7DmIsaM7YT5Xt+Prosk1LlpzWtqsAnpoAGZqbV9wvy/lEhfEvrD+Ae7t8veIyA/Qsgu/+Qd87Lmp5q3Ol4pzrcP0h6DJYyecT8ojom7s3zrYnP3YftSP6bTFnYnecFl/hU7o8uxzpdLLUPYqPl8t0y607xuPtbz1Eyfn1dO4JLdjn8ztn4ZVrLF2pe+HmQp21jVZ/vznsA3M40EAKP8k1D0GZOhZv++E7LR8Uka/1uNdltDEAuFN0SAWo0EYLy/iYTR1MIw37Hmeg1Dg9D5/moUuZJUaV23aswU4M8zFtLTwVO2Sx70OUZA0XBxs2fsSbDVe8zfh1HmYScEqxblSIqnaJltfKmynd5QFcBpHKAyt7CXOwOGzW4B56OAHqaM87FYM2XJjcglkWuskCsBkTIsjpen4Md31DXdH6j0AQ3ZF/tdsQqG5tKw7fnyB231sCi1icriZzB3XFHNHHCSjUxLV04upO1k5wEqZjyafNw7Prn8WnoLhFkqKUUxv7d0IvD6zyxy8wZ6xP2gY6+C01RztZEaZgpXb0tHPS72QKUxcmyk+INK4qamTET9Vl0/XYegc6aYeWRddNnMgKS0AWT3Fb7cJrfslhSk6sO2m9VvKs5ckCxq";

  constructor(private http: HttpClient) { }
  
  savePatientConsentForm(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http
      .post(environment.apiEndpoint + 'docs/savePatientDocument', formData, { headers });
  }
}
