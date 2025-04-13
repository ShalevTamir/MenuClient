import { Injectable } from "@angular/core";
import { MenuItem } from "../components/menu-item-card/models/menu-item.interface";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MenuItemsManagerService {
    private readonly MENU_ITEMS_MANAGER_URL = "http://localhost:3000/menu-item";

    constructor(private readonly _httpClient: HttpClient) {        
    }

    public getAllMenuItems(): Observable<MenuItem[]> {
        return this._httpClient.get<MenuItem[]>(this.MENU_ITEMS_MANAGER_URL);
    }
}