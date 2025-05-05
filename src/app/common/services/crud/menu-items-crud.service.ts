import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ContextService } from "../../config/context.service";
import { MenuItem } from "../../models/ros/menu-item/menu-item.interface";

@Injectable({
    providedIn: 'root'
})
export class MenuItemsCrudService {
    constructor(private readonly _httpClient: HttpClient, private readonly _contextService: ContextService) {        
    }

    public getAllMenuItems(): Observable<MenuItem[]> {
        return this._httpClient.get<MenuItem[]>(this._contextService.MenuItemsManagerUrl);
    }
}