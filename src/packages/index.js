import List from "./List.vue";
List.install = function(Vue) {
  Vue.component(`Ch${List.name}`, List);
  Vue.component(`Ch${List.Item.name}`, List.Item);
  Vue.component(`Ch${List.Item.Meta.name}`, List.Item.Meta);
};
