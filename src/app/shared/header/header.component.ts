import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private service: AuthenticationService, private router: Router) { }
  items: MenuItem[] | undefined;
  label1:string = "";
  sidebarVisible: boolean = false;
  nomeCognome:string = "";
  ngOnInit() {

    this.items = [{


      label:'Menu',
      icon:'pi pi-fw pi-bars',
      items:[
    {
      label: 'Archivi',
      icon: 'pi pi-fw pi-server',
      items: [
        {
          label: 'Aliquota iva',
          icon: 'pi pi-fw pi-percentage',
          items: [
            {
              label: 'Nuovo',
              icon: 'pi pi-fw pi-plus',
              routerLink: 'aliquota/nuovo'
            },
            {
              label: 'Elenco',
              icon: 'pi pi-fw pi-list',
              routerLink: 'aliquota/elenco'
            }
          ],
        },
        {
          label: 'Fornitore',
          icon: 'pi pi-fw pi-truck',
          items: [
            {
              label: 'Nuovo',
              icon: 'pi pi-fw pi-plus',
              routerLink: 'fornitore/nuovo'
            },
            {
              label: 'Elenco',
              icon: 'pi pi-fw pi-list',
              routerLink: 'fornitore/elenco'
            }
          ]
        },
        {
          label: 'Sottocategoria',
          icon: 'pi pi-fw pi-table',
          items: [
            {
              label: 'Nuovo',
              icon: 'pi pi-fw pi-plus',
              routerLink: 'sottocategoria/nuovo'
            },
            {
              label: 'Elenco',
              icon: 'pi pi-fw pi-list',
              routerLink: 'sottocategoria/elenco'
            }
          ]
        },
        {
          label: 'Area',
          icon: 'pi pi-fw pi-amazon',
          items: [
            {
              label: 'Nuovo',
              routerLink: 'area/nuovo',
              icon: 'pi pi-fw pi-plus'
            },
            {
              label: 'Elenco',
              routerLink: 'area/elenco',
              icon: 'pi pi-fw pi-list'
            }
          ]
        },
        {
          label: 'Progetto',
          icon: 'pi pi-fw pi-building',
          items: [
            {
              label: 'Nuovo',
              routerLink: 'progetto/nuovo',
              icon: 'pi pi-fw pi-plus'
            },
            {
              label: 'Elenco',
              routerLink: 'progetto/elenco',
              icon: 'pi pi-fw pi-list'
            }
          ]
        }
      ],
    },
    {
      label: 'Budget',
      icon: 'pi pi-fw pi-money-bill',
      items: [
        {
          label: 'Definizione',
          icon: 'pi pi-fw pi-euro',
          routerLink: 'budget/definizione'
        },
        {
          label: 'Avanzamento',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: 'budget/avanzamento'
        },
        {
          label: 'Riconciliazione',
          icon: 'pi pi-fw pi-wallet',
          routerLink: 'budget/riconciliazione'
        },
        {
          label: 'Spesa Investimento',
          icon: 'pi pi-fw pi-cart-plus',
          routerLink: 'budget/spesainvestimento'
        }
      ]
    },
    {
      label: 'Preventivo',
      icon: 'pi pi-fw pi-money-bill',
      items: [
        {
          label: 'Gestione',
          routerLink: 'preventivo/gestione',
          icon: 'pi pi-fw pi-wrench',
        }
      ]
    },
    {
      label: 'Ordine acquisto',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'Creazione',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'ordineacquisto/nuovo'
        },
        {
          label: 'Ricerca',
          icon: 'pi pi-fw pi pi-search',
          routerLink: 'ordineacquisto/ricerca'
        },
        {
          label: 'Gestione',
          icon: 'pi pi-fw pi pi-database',
          routerLink: 'ordineacquisto/gestione'
        }

      ]
    },
    {
      label: 'Fattura passiva',
      icon: 'pi pi-fw pi-wallet',
      items: [
        {
          label: 'Registrazione',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'fatturapassiva/nuovo'
        },
        {
          label: 'Gestione',
          icon: 'pi pi-fw pi pi-wrench',
          routerLink: 'fatturapassiva/gestione'
        },
        {
          label: 'Ricerca',
          icon: 'pi pi-fw pi pi-search',
          routerLink: 'fatturapassiva/ricerca'
        }

      ]
    },
    {
        label: 'Utenti',
        icon: 'pi pi-fw pi-users',
        routerLink: 'utente/elenco'    
    },
    /* {
      label:'',
      icon:'pi pi-fw pi-id-card',
      items:[
        {
          label: 'Modifica',
          icon: 'pi pi-fw pi-pencil',
          routerLink: 'utente/modifica',
          command() {
            localStorage.setItem('modDaLogin','1')
          }
        },
        {
          label: 'Impostazioni',
          icon: 'pi pi-fw pi-cog',
          routerLink: 'home',
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          routerLink: 'home',
          command() {
            localStorage.setItem('logout','1');
            localStorage.removeItem('modDaLogin');
          },
        },
      ]
    } */
      ]
    }
    ]
    
  }


   ngDoCheck() {
    if (localStorage.getItem('nomeCognome')) {
      const nomeCognome = localStorage.getItem('nomeCognome');
      if (nomeCognome !== null) {
        this.nomeCognome = nomeCognome;
      }
   }else{
    this.nomeCognome = "";
   }
  }
    /*if (this.items && this.items.length > 0) {
      if (localStorage.getItem('nomeCognome')) {
        
        const nomeCognome = localStorage.getItem('nomeCognome');
        if (nomeCognome !== null) {
          this.nomeCognome = nomeCognome;
          this.label1 = nomeCognome;
            this.items[7].label = this.label1;
            if (this.items[7].items) {
              this.items[7].items[0].routerLink = 'utente/modifica';
            }
            
        }
      } else {
        this.items[7].label = '';
        if (this.items[7].items) {
          this.items[7].items[0].routerLink = '';
        }
      }
    }
  } */
  logout(){
   this.service.logout();
   localStorage.setItem('logout','1');
   this.sidebarVisible = false;
   this.router.navigate(['']);
  }

  modUtente(){
    if(localStorage.getItem('id')){
    localStorage.setItem('modDaLogin','1')
    localStorage.setItem('logoutDaMod','1');
    this.sidebarVisible = false;
    this.router.navigate(['utente/modifica']);
  }else{
    
  }
}
}
