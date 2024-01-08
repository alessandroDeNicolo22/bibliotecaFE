import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ImageModule } from 'primeng/image';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SliderModule } from 'primeng/slider';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { HomepageComponent } from '../home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { InterceptorInterceptor } from '../authentication/interceptor.interceptor';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SidebarModule } from 'primeng/sidebar';
import { SpeedDialModule } from 'primeng/speeddial';





@NgModule({
  declarations: [
    HomepageComponent
   
  ],
  imports: [
    SpeedDialModule,
    SidebarModule,
    ScrollPanelModule,
    GalleriaModule,
    FormsModule,
    DividerModule,
    PasswordModule,
    SliderModule,
    MessagesModule,
    InputNumberModule,
    InputTextModule,
    OverlayPanelModule,
    FontAwesomeModule,
    MenubarModule,
    ToolbarModule,
    TooltipModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    AutoCompleteModule,
    MultiSelectModule,
    SkeletonModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    PanelModule,
    CommonModule,
    MenubarModule,
    ImageModule,
    MessagesModule,
    MessageModule,
    CascadeSelectModule
    
  ],
  exports: [
    SpeedDialModule,
    SidebarModule,
    ScrollPanelModule,
    GalleriaModule,
    FormsModule,
    DividerModule,
    PasswordModule,
    SliderModule,
    MessagesModule,
    InputNumberModule,
    MenubarModule,
    ImageModule,
    InputTextModule,
    OverlayPanelModule,
    FontAwesomeModule,
    MenubarModule,
    ToolbarModule,
    TooltipModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    TabViewModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    DynamicDialogModule,
    DialogModule,
    CalendarModule,
    AutoCompleteModule,
    MultiSelectModule,
    SkeletonModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    PanelModule,
    CommonModule,
    TabViewModule,
    MessagesModule,
    MessageModule,
    CascadeSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
    AuthenticationGuard
  ]
})
export class SharedModule { }
