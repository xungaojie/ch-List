<script>
import Item from "./ListItem";
let List = {
  Item,
  functional: true,
  name: "List",
  mounted() {},
  props: {
    itemLayout: {
      default: "horizontal"
    },
    customClass: {},
    header: {},
    footer: {}
  },
  render: function(h, context) {
    const slots = context.slots();
    const props = context.props;
    const classString = [
      "ch-list__wrapper",
      props.itemLayout === "vertical" && `ch-list-vertical`,
      props.customClass && props.customClass
    ];
    const renderHeader = () => {
      return (
        (slots.header || props.header) && (
          <div class="ch-list-header">{slots.header || props.header}</div>
        )
      );
    };
    const renderFooter = () => {
      return (
        (slots.footer || props.footer) && (
          <div class="ch-list-footer">{slots.footer || props.footer}</div>
        )
      );
    };
    return (
      <div class={classString}>
        {renderHeader()}
        {slots.default}
        {renderFooter()}
      </div>
    );
  }
};

export default List;
</script>
<style lang="stylus">
.ch-list
  &__wrapper
    width 100%
  &-header,
  &-footer
    line-height 22px
    font-size 14px
    padding 10px 15px
  &-vertical &-item
    &__main
      display block
</style>
