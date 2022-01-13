import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {
  urlForm = new FormGroup({
    url: new FormControl(''),
  });

  urlValue: any;
  postId: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.urlValue = this.urlForm.value.url;
    console.log(this.urlValue);
    
    let headers = new HttpHeaders ({
      "accept": "application/json",
      "Authorization": "Bearer A8u8eEWVQrABrTWhcz1t66Lv5UBrhhBlAsK5St0EnXBtlJAqklmfHoBIefzG",
      "Content-Type": "application/json",
    });

    let body = {"url": this.urlValue, "domain": "tiny.one"};

    this.http.post<any>('https://api.tinyurl.com/create', body, {'headers': headers}).subscribe(data => {
      this.postId = data.id;
    });


  }

}
