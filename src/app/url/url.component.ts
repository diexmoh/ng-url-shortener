import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {
  urlForm = new FormGroup({
    url: new FormControl('', Validators.required)
  });

  urlValue: any;
  tinyUrlValue: any;
  showResults: boolean;
  token: string;

  constructor(private http: HttpClient) {
    this.token = environment.bitlyApiToken;
   }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.urlValue = this.urlForm.value.url;
    
    let headers = new HttpHeaders ({
      "accept": "application/json",
      "Authorization": `Bearer ${this.token}`,
      "Content-Type": "application/json",
    });

    let body = {"domain": "bit.ly", "long_url": this.urlValue};

    if (this.urlValue) { 
      
      this.http.post<any>('https://api-ssl.bitly.com/v4/shorten', body, {'headers': headers}).subscribe(data => {
        if (data.link){
          this.tinyUrlValue = data.link;
          this.showResults = true;
        } else {
          this.showResults = false;
        }
      
      });
    }
    
  }
  
  
}
