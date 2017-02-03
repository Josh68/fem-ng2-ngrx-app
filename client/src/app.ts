import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
//import {Title} from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  template: require('./app.html')
})
export class App implements OnInit {
  public pageTitle: string
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    //private titleService: Title
  ) {}
  links = {
    items: ['/items'],
    widgets: ['/widgets']
  }
  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        this.pageTitle = event['title'];
        //this.titleService.setTitle(event['title']);
      });
  }
}
