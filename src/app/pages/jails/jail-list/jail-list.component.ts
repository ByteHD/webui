import { RestService } from '../../../services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector : 'app-jail-list',
  template : `<entity-table [conf]="this"></entity-table>`
})
export class JailListComponent {

  protected resource_name = 'jails/jails';
  protected queryCall = 'jail.query';
  protected route_add: string[] = [ 'jails', 'add' ];
  protected route_add_tooltip = "Add Jail";
  protected entityList: any;

 

  public columns: Array<any> = [
    {name : 'Jail', prop : 'host_hostname'},
    {name : 'Status', prop : 'jail_status'},
    {name : 'Release', prop : 'release'},
    {name : 'IPv4 Address', prop : 'ip4_addr'},
  ];
  public config: any = {
    paging : true,
    sorting : {columns : this.columns},
  };

  constructor(protected router: Router, protected rest: RestService) {}
  
  afterInit(entityList: any) { this.entityList = entityList; }

  isActionVisible(actionId: string, row: any) {
    if (actionId === 'start' && row.jail_status === "Running") {
      return false;
    } else if (actionId === 'stop' && row.jail_status === "Stopped") {
      return false;
    } else if (actionId === 'restart' && row.jail_status === "Stopped") {
      return false;
    }
    return true;
  }

  getActions(parentRow) {
    return [
      {
        id : "edit",
        label : "Edit",
        onClick : (row) => {
          console.log(row.host_hostuuid);
          this.router.navigate(
              new Array('').concat([ "jails", "edit", row.host_hostuuid ]));
        }
      },
      {
        id : "start",
        label : "Start",
        onClick : (row) => {
          this.entityList.busy =
              this.rest.post(this.resource_name + '/' + row.id + '/start/', {})
                  .subscribe((res) => { row.jail_status = 'Running'; },
                             (res) => { console.log(res); });
        }
      },
      {
        id : "stop",
        label : "Stop",
        onClick : (row) => {
          this.entityList.busy =
              this.rest.post(this.resource_name + '/' + row.id + '/stop/', {})
                  .subscribe((res) => { row.jail_status = 'Stopped'; },
                             (res) => { console.log(res); });
        }
      },
      {
        id : "restart",
        label : "Restart",
        onClick : (row) => {
          this.entityList.busy =
              this.rest
                  .post(this.resource_name + '/' + row.id + '/restart/', {})
                  .subscribe((res) => { row.jail_status = 'Running'; },
                             (res) => { console.log(res); });
        }
      },
      // {
      //   id : "shell",
      //   label : "Shell",
      //   onClick : (row) => {}
      // },
      {
        id : "delete",
        label : "Delete",
        onClick : (row) => {
          this.entityList.doDelete(row.id);
        }
      }
    ]
  }
}
