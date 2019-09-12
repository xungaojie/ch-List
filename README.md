# chlist

## install
```
npm install ch-list --save
```

## usage
```
import Vue from 'vue';
import ChList from 'ch-list'
Vue.use(ChList);
```


## List Attributes
| Attribute | Type | Accepted Values | Description | Default |
|:--: | :--: | -- | -- | :--:|
| itemLayout | String | horizontal/vertical | 设置list-item的内容显示方向 | horizontal |
| customClass | String |  | Add a custom class on list container | - |
| header | String |  | header string will inserted in ```header slot``` | - |
| footer | String |  | footer string will inserted in ```footer slot``` | - |
## List Slot
| propName | Description |
|:--:|--|
| header | Slot which named ```header``` |
| footer | Slot which named ```footer``` |
| - | Default slot on list's content ,In general slot is ```list-item```s  |