import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {GlobalState} from '../../../../global.state';
import {RestService} from '../../../../services/rest.service';

@Component({
  selector : 'app-nfs-list',
  template : `<entity-table [conf]="this"></entity-table>`
})
export class NFSListComponent {

  protected resource_name: string = 'sharing/nfs/';
  protected route_add: string[] = [ 'sharing', 'nfs', 'add' ];
  protected route_edit: string[] = [ 'sharing', 'nfs', 'edit' ];
  protected route_delete: string[] = [ 'sharing', 'nfs', 'delete' ];

  constructor(_rest: RestService, _router: Router, _state: GlobalState) {}

  public columns: any[] = [
    {name: 'Path', prop: 'nfs_paths'},
    {name: 'Comment', prop: 'nfs_comment'},
  ];
  public config: any = {
    paging : true,
    sorting : {columns : this.columns},
  };
}
