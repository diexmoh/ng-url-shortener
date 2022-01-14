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
    this.token = environment.tinyApiToken;
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

    let body = {"url": this.urlValue, "domain": "tiny.one"};

    if (this.urlValue) { 
      
      this.http.post<any>('https://api.tinyurl.com/create', body, {'headers': headers}).subscribe(data => {
        if (data.data.tiny_url && !data.data.errors){
          this.tinyUrlValue = data.data.tiny_url;
          this.showResults = true; 
        } else {
          this.showResults = false;
        }
      
      });
    }
    
  }
  
  
}
