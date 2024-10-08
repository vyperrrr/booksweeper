import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/books',
    },
    {
      label: 'Books',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'My Books',
          routerLink: 'my-books',
        },
        {
          label: 'Borrowed Books',
          routerLink: 'borrowed-books',
        },
        {
          label: 'Returned books',
          routerLink: 'returned-books',
        }
      ]
    },
  ];

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.p-menuitem');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
