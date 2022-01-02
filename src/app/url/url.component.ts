import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient} from "@angular/common/http";

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
    
    const headers = {
      "Authorization": "Bearer ed6de894b5dfa69def364f3c4b4755bfec07f580",
      "Content-Type": "application/json",
    };

    var body = {"long_url": this.urlValue, "domain": "bit.ly", "group_guid": "Ba1bc23dE4F"};
    JSON.stringify(body);
    this.http.post<any>('https://api-ssl.bitly.com/v4/shorten', { body }, { headers }).subscribe(data => {
      this.postId = data.id;
    });
  }

}
