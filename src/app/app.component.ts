import { VERSION } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { AlbumService } from "./albume-service.service";
import { AddAlbumeModel } from "./add-albume-model";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  subscriptions: Subscription;

  addAlbumFG: FormGroup;
  generList: any;
  singerList: any;

  constructor(
    private formBuilder: FormBuilder,
    private albumService: AlbumService
  ) {
  }

  ngOnInit(): void {
    this.InitialFrom();
  }

  InitialFrom(): void {
    this.addAlbumFG = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required])],
      gener: ["100", Validators.compose([Validators.required])],
      signer: ["100", Validators.compose([Validators.required])],
      albumPoster: ["", Validators.compose([Validators.required])],
      albumeProfile: ["", Validators.compose([Validators.required])],
      tracks: this.formBuilder.array([])
    });
  }

  addTracks() {
    const items = <FormArray>this.addAlbumFG.controls["tracks"];
    items.push(this.selectedLanguage());
  }

  removeTracks(index) {
    const items = <FormArray>this.addAlbumFG.controls["tracks"];
    items.removeAt(index);
  }

  selectedLanguage(): FormGroup {
    return this.formBuilder.group({
      trackNumber: ["", Validators.compose([Validators.required])],
      trackName: ["", Validators.compose([Validators.required])],
      trackProfile: ["", Validators.compose([Validators.required])],
      trackPoster: ["", Validators.compose([Validators.required])],
      trackFile: ["", Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.addAlbumFG.controls;
  }

  onSubmit(): void {
    let addModel = {} as AddAlbumeModel;

    addModel.albumPoster = this.f.albumPoster.value["files"][0];
    addModel.albumeProfile = this.f.albumeProfile.value["files"][0];
    addModel.gener = this.f.gener.value;
    addModel.name = this.f.name.value;
    addModel.signer = this.f.signer.value;

    for (
      let index = 0;
      index < this.addAlbumFG.controls["tracks"]["controls"].length;
      index++
    ) {
      if (!addModel.tracks) {
        addModel.tracks = [];
      }
      const item = this.addAlbumFG.controls["tracks"]["controls"][index][
        "controls"
      ];
      addModel.tracks.push({
        trackFile: item.trackFile.value["files"][0],
        trackNumber: item.trackNumber.value,
        trackName: item.trackName.value,
        trackPoster: item.trackPoster.value["files"][0],
        trackProfile: item.trackProfile.value["files"][0]
      });
    }

    this.subscriptions = this.albumService
      .Create(addModel, "/admin/album/create")
      .subscribe(
        (upload: HttpEvent<any>) => {
          switch (upload.type) {
            case HttpEventType.UploadProgress:
              if (upload.total) {
                // this.queueProgress = Math.round(upload.loaded / upload.total * 100);
                // if (this.queueProgress <= 100 && this.queueProgress > 0) {
                //   elemnt.style.strokeDashoffset = 440 + (445 * this.queueProgress / 100) + 'px'
                // }
                // this.cdRef.detectChanges();
              }
              break;
            case HttpEventType.Response:
              if (upload.body["success"]) {
                // this.queueProgress = null;
                // this.alertService.success('', upload.body['message']);
 
              } else {
                // this.cdRef.detectChanges();
              }
              // this.loading = false;
              // this.queueProgress = null;
              break;
          }
        },
        error => {
          // this.loading = false;
          // this.queueProgress = null;
        }
      );
  }
}
