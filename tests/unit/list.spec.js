import { mount } from "@vue/test-utils";
import List from "@/components/List.vue";
import ListItem from "@/components/ListItem.vue";
import Vue from "vue";
Vue.component("ch-list-item", ListItem);

const wrapperList = {
  components: { List },
  template: `<div><list v-bind="$attrs" v-on="$listeners">
  <template v-if="$slots.default"><slot></slot></template>
  <template v-if="$slots.header" slot="header"><slot name="header"></slot></template>
  <template v-if="$slots.footer" slot="footer"><slot name="footer"></slot></template>
  </list></div>`
};

const factory = ({ propsData = {}, slots = {} } = {}) => {
  return mount(wrapperList, {
    propsData,
    slots,
    attachToDocument: true
  });
};
const header = "<div>测试头部</div>";
const footer = "<div>测试底部</div>";
const defaultSlots = `
    <ch-list-item>
      <div slot="prefix">测试xxx</div>
      <div slot="extra">ceshi </div>
      <div>测试内容</div>
    </ch-list-item>
  `;
describe("list common", () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  test("prop itemLayout1", () => {
    wrapper = factory({
      propsData: {
        itemLayout: "vertical"
      },
      slots: {
        default: defaultSlots
      }
    });
    let mainWrapper = wrapper.find(".ch-list-item__main");
    expect(mainWrapper.exists()).toBe(true);
    let mainWrapperStyle = getComputedStyle(mainWrapper.element);
    // eslint-disable-next-line no-console
    console.log(mainWrapperStyle.display);
    // eslint-disable-next-line no-console
    console.log(wrapper.find(".ch-list__wrapper").classes());
    expect(wrapper.find(".ch-list__wrapper").classes("ch-list-vertical")).toBe(
      true
    );
    expect(mainWrapperStyle.display).toEqual("block");
  });
  test("prop itemLayout2", () => {
    wrapper = factory({
      slots: {
        default: defaultSlots
      }
    });
    expect(wrapper.find(".ch-list__wrapper").classes("ch-list-vertical")).toBe(
      false
    );
    let mainWrapper = wrapper.find(".ch-list-item__main");
    expect(mainWrapper.exists()).toBe(true);
  });
  test("prop customClass", () => {
    wrapper = factory({ propsData: { customClass: "custom-class" } });
    expect(wrapper.find(".custom-class").exists()).toBe(true);
  });
  test("prop header", () => {
    wrapper = factory({ propsData: { header } });
    expect(wrapper.find(".ch-list-header").exists()).toBe(true);
    expect(wrapper.find(".ch-list-header").text()).toBe(header);
  });
  test("slot header", () => {
    wrapper = factory({ slots: { header } });
    expect(wrapper.find(".ch-list-header").exists()).toBe(true);
    expect(wrapper.find(".ch-list-header").text()).toBe("测试头部");
  });
  test("slot footer", () => {
    wrapper = factory({ slots: { footer } });
    expect(wrapper.find(".ch-list-footer").exists()).toBe(true);
    expect(wrapper.find(".ch-list-footer").text()).toBe("测试底部");
  });
});
