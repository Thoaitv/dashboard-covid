import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  showNews=false
  items = [];
  isShow = false
  selected:any
  name = ''
  imgUrl = ''
  url = ''
  description = ''
  isUpdate = false
  list: AngularFireList<any>
  constructor(public firestore: AngularFireDatabase) {
    this.getData().subscribe(data => {
      this.items = data.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      })
      console.log(this.items)

    })
  }

  ngOnInit(): void {
    this.getData().subscribe(data => {
      console.log(data)
    })
  }
  onDelete(key: string) {
    console.log(key)
    this.list.remove(key)
  }
  direct(item) {
    this.showNews=true
    console.log('okok')
    this.name = item.name
    this.imgUrl = item.imgUrl
    this.url = item.url
    this.description = item.description
  }
  show() {
    this.isUpdate = false
    this.isShow = true
    this.name =''
    this.imgUrl = ''
    this.url = ''
    this.description = ''
  }
  hide() {
    this.isShow = false
  }
  addNews(value:string) {
  
    if (!this.isUpdate) {
      this.firestore.list('items').push({ name: this.name, imgUrl: this.imgUrl, url: this.url, description: this.description })
      alert('Added')
    } else {
      this.update(this.selected)
      alert('Updated')

    }


  }
  getData() {
    this.list = this.firestore.list('items')
    return this.list.snapshotChanges()
  }
  filter() {

  }
  update(item) {
   
  
    this.list.update(item.$key, { name: this.name, imgUrl: this.imgUrl, url: this.url, description: this.description });
  }
  populateForm(item){
    this.isShow = true
    this.isUpdate = true
    console.log(item.$key)
    this.selected=item
    this.name = item.name
    this.imgUrl = item.imgUrl
    this.url = item.url
    this.description = item.description
  }
}
