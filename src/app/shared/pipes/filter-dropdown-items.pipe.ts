import { Pipe, PipeTransform } from '@angular/core';

import { DropdownItem } from '../../api/api.model';

@Pipe({
  name: 'filterDropdownItems'
})
export class FilterDropdownItemsPipe implements PipeTransform {

  transform(items: DropdownItem[], searchString: string): any {
    return searchString ? items.filter(
      (item) => {
        return item.label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
    }) :
    items;
  }

}
