import { mount } from "@vue/test-utils";
import ListItem from "@/components/ListItem";
import Vue from "vue";
Vue.component("ch-list-item-meta", ListItem.Meta);

const wrapperListItem = {
  components: { ListItem },
  template: `<div><list-item v-bind="$attrs" v-on="$listeners" @actionClick="handleActionClick">
  <template slot="meta" v-if="$slots.meta"><slot name="meta"></slot></template>
  <template slot="default" v-if="$slots.default"><slot></slot></template>
  <template slot="prefix" v-if="$slots.prefix"><slot name="prefix"></slot></template>
  <template slot="extra" v-if="$slots.extra"><slot name="extra"></slot></template>
  <template v-if="$slots.actions" slot="actions"><slot name="actions"></slot></template>
  </list-item></div>`,
  methods: {
    handleActionClick() {
      this.$emit("actionClick");
    }
  }
};

const factory = ({ propsData = {}, slots = {} } = {}) => {
  return mount(wrapperListItem, {
    propsData,
    slots,
    attachToDocument: true
  });
};
const extra = "测试右侧固定内容";
const content = "测试内容";
const prefix = "测试前缀";
const title = "测试标题";
const description = "测试描述";
const customClass = "ch-list-item-custom-class";
const actions = [
  { label: "编辑", op: "edit" },
  { label: "删除", op: "delete" }
];
const titleSlot = `<div class="slot-title">${title}</div>`;
const DescriptionSlot = `<div class="slot-des">${description}</div>`;
const ContentSlot = `<div class="slot-content">${content}</div>`;
const actionSlots = [
  `<div class="slot-content">编辑</div>`,
  `<div class="slot-content">删除</div>`,
  `<div class="slot-content">edit</div>`,
  `<div class="slot-content">delete</div>`
];
const meta = {
  haveTitleProp: `<ch-list-item-meta title="${title}"></ch-list-item-meta>`,
  haveDescriptionProp: `<ch-list-item-meta description="${description}"></ch-list-item-meta>`,
  haveAllProp: `<ch-list-item-meta title="${title}" description="${description}"></ch-list-item-meta>`,
  haveTitleSlot: `<ch-list-item-meta><template slot="title"> ${titleSlot} </template></ch-list-item-meta>`,
  haveDescriptionSlot: `<ch-list-item-meta><template slot="description"> ${DescriptionSlot} </template></ch-list-item-meta>`,
  haveAllSolt: `<ch-list-item-meta><template slot="title"> ${titleSlot} </template><template slot="description"> ${DescriptionSlot} </template></ch-list-item-meta>`
};
describe("ListItem All prop values are displayed normally", () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  test("prop content", () => {
    wrapper = factory({
      propsData: {
        content
      }
    });
    let contentWrapper = wrapper.find(".ch-list-item-content");
    expect(contentWrapper.exists()).toBe(true);
    expect(contentWrapper.text()).toEqual(content);
  });
  test("prop prefix", () => {
    wrapper = factory({ propsData: { prefix } });
    let prefixWrapper = wrapper.find(".ch-list-item-prefix");
    expect(prefixWrapper).not.toBeUndefined();
    expect(prefixWrapper.text()).toEqual(prefix);
  });
  test("prop extra ", () => {
    wrapper = factory({ propsData: { extra } });
    let extraWrapper = wrapper.find(".ch-list-item-extra");
    expect(extraWrapper).not.toBeUndefined();
    expect(extraWrapper.text()).toEqual(extra);
  });
  test("prop customClass ", () => {
    wrapper = factory({ propsData: { customClass } });
    expect(wrapper.find(`.${customClass}`).exists()).toBe(true);
  });
  test("prop haveHoveState ", () => {
    wrapper = factory({ propsData: { haveHoveState: true } });
    expect(wrapper.find(`.ch-list-item-hover-state`).exists()).toBe(true);
  });
  test("prop align ", () => {
    wrapper = factory({ propsData: { align: "vertical", prefix } });
    let mainWrapper = wrapper.find(`.ch-list-item__main`);
    expect(mainWrapper.exists()).toBe(true);
    expect(getComputedStyle(mainWrapper.element).display).toEqual("block");
  });
  test("prop actions ", () => {
    wrapper = factory({ propsData: { actions } });
    const actionClick = jest.fn();
    // let listItemWrapper = wrapper.find(".ch-list-item__wrapper");
    wrapper.vm.$on("actionClick", actionClick);
    let actionWrapper = wrapper.find(".ch-list-item-actions");
    let actionsArr = actionWrapper.findAll(".ch-list-item-actions-item");
    expect(actionWrapper).not.toBeUndefined();
    expect(actionsArr.length).toEqual(actions.length);
    wrapper.find(".ch-list-item-actions-item").trigger("click");
    expect(actionClick).toHaveBeenCalled();
  });
});
describe("list have slot meta", () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  test("slot: have all propsData meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveAllProp } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    let metaTitle = metaWrapper.find(".ch-list-item-meta-title");
    expect(metaWrapper).not.toBeUndefined();
    expect(metaTitle.text()).toEqual(title);
    expect(metaWrapper.find(".ch-list-item-meta-description").text()).toEqual(
      description
    );
  });
  test("slot: only have title prop meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveTitleProp } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    let metaTitle = metaWrapper.find(".ch-list-item-meta-title");
    expect(metaWrapper).not.toBeUndefined();
    expect(metaTitle.text()).toEqual(title);
    expect(metaWrapper.find(".ch-list-item-meta-description").exists()).toBe(
      false
    );
  });
  test("slot: only have description prop meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveDescriptionProp } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    expect(metaWrapper.find(".ch-list-item-meta-description").text()).toEqual(
      description
    );
    expect(metaWrapper.find(".ch-list-item-meta-title").exists()).toBe(false);
  });
  test("slot: have all slot meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveAllSolt } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    let metaTitle = metaWrapper.find(".ch-list-item-meta-title");
    expect(metaWrapper).not.toBeUndefined();
    expect(metaTitle.text()).toEqual(title);
    expect(metaWrapper.find(".ch-list-item-meta-description").text()).toEqual(
      description
    );
  });
  test("slot: only have title slot meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveTitleSlot } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    let metaTitle = metaWrapper.find(".ch-list-item-meta-title");
    expect(metaWrapper).not.toBeUndefined();
    expect(metaTitle.text()).toEqual(title);
    expect(metaWrapper.find(".ch-list-item-meta-description").exists()).toBe(
      false
    );
  });
  test("slot: only have description slot meta ", () => {
    wrapper = factory({ slots: { meta: meta.haveDescriptionSlot } });
    let metaWrapper = wrapper.find(".ch-list-item-meta");
    expect(metaWrapper).not.toBeUndefined();
    expect(metaWrapper.find(".ch-list-item-meta-description").text()).toEqual(
      description
    );
  });
});
describe("all slot", () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });
  test("slot: slot content", () => {
    wrapper = factory({ slots: { default: ContentSlot } });
    let contentWrapper = wrapper.find(".ch-list-item-content");
    expect(contentWrapper.text()).toEqual(content);
  });
  test("slot prefix ", () => {
    wrapper = factory({ slots: { prefix } });
    let prefixWrapper = wrapper.find(".ch-list-item-prefix");
    expect(prefixWrapper.text()).toEqual(prefix);
  });
  test("slot extra ", () => {
    wrapper = factory({ slots: { extra } });
    let extraWrapper = wrapper.find(".ch-list-item-extra");
    expect(extraWrapper.text()).toEqual(extra);
  });
  test("slot slots", () => {
    wrapper = factory({ slots: { actions: [...actionSlots] } });
    let extraWrapperArr = wrapper.findAll(".ch-list-item-actions-item");
    expect(extraWrapperArr.length).toEqual(actionSlots.length);
  });
});
