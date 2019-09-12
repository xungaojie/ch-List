<script>
export const Meta = {
  functional: true,
  name: "ListItemMeta",
  props: { title: {}, description: {}, overflowEllipis: { default: true } },
  render: function(h, context) {
    let slots = context.slots();
    let props = context.props;
    const title = (slots.title || props.title) && (
      <div
        class={["ch-list-item-meta-title", !props.overflowEllipis && "ellipis"]}
        title={props.title || ""}
      >
        {slots.title || props.title}
      </div>
    );

    const description = (slots.description || props.description) && (
      <div class="ch-list-item-meta-description">
        {slots.description || props.description}
      </div>
    );
    return (
      <div class="ch-list-item-meta">
        {title}
        {description}
      </div>
    );
  }
};
export default {
  Meta,
  functional: true,
  name: "ListItem",
  props: {
    prefix: {},
    content: {},
    extra: {},
    actions: {
      type: Array
    },
    align: {
      type: String,
      default: "horizontal"
    },
    customClass: {},
    haveHoveState: {
      type: Boolean,
      default: false
    }
  },
  render: (h, context) => {
    const slots = context.slots();
    const props = context.props;
    const listItemClass = [
      "ch-list-item__wrapper",
      props.align === "vertical" && `ch-list-item-vertical`,
      props.customClass && props.customClass,
      props.haveHoveState === true && "ch-list-item-hover-state"
    ];
    const renderPrefix = () => {
      return (
        (slots.prefix || props.prefix) && (
          <div class="ch-list-item-prefix">{slots.prefix || props.prefix}</div>
        )
      );
    };
    const renderExtra = () => {
      return (
        (slots.extra || props.extra) && (
          <div class="ch-list-item-extra">{slots.extra || props.extra}</div>
        )
      );
    };
    const content = (slots.default || props.content) && (
      <div class="ch-list-item-content">{slots.default || props.content}</div>
    );
    let meta = slots.meta;
    let extra = renderExtra();
    let prefix = renderPrefix();
    let actions = (slots.actions || props.actions) && (
      <div class="ch-list-item-actions">
        {slots.actions &&
          slots.actions.map(item => {
            return <div class="ch-list-item-actions-item">{item}</div>;
          })}
        {props.actions &&
          props.actions.map(item => {
            return (
              <div
                onClick={() => {
                  context.listeners.actionClick &&
                    context.listeners.actionClick(item);
                }}
                class="ch-list-item-actions-item"
                title={item.label}
              >
                {item.label}
              </div>
            );
          })}
      </div>
    );
    let mainContent = (
      <div class="ch-list-item__main">
        {meta}
        {content}
        {actions}
      </div>
    );
    return (
      <div class={listItemClass}>
        {prefix}
        {(prefix || extra) && mainContent}
        {!(prefix || extra) && meta}
        {!(prefix || extra) && content}
        {!(prefix || extra) && actions}
        {extra}
      </div>
    );
  }
};
</script>

<style lang="stylus">
.ch-list-item{
  &__wrapper{
    display flex
    width 100%
    overflow hidden
    box-sizing border-box
    padding 5px
    position relative
    &:after{
      content:''
      display block
      position absolute
      bottom 0
      left 50%
      transform translateX(-50%)
      height 2px
      width 0
      background #1890ff
      transition  width .2s linear
    }
    &.ch-list-item-hover-state{
      &:hover{
        &:after{
          width 100%
        }
      }
    }

  }
  &-vertical>&__main{
    display block
  }
  &__main{
    flex 1
    display flex
    flex-wrap wrap
    align-items center
  }
  &-meta{
    flex 1 0
    margin-right 20px
    &-title{
      width 100%
      color #333
      font-size: 14px;
      line-height: 22px;
      margin-bottom 4px
    }
    &-description{
      font-size 14px
      color #777777
      line-height 22px
    }
  }
  &-content{
    flex 1 0
  }
  &-actions{
    user-select none
    display block
    &-item{
      display inline-block
      color #1890ff
      cursor pointer
      margin-right 12px
      &:first-child{
      }
    }
  }
  &-prefix{
    display flex
    align-items center
    justify-content center
    margin-right 20px
  }
  &-suffix{
    flex 1 0
    margin-left 20px
  }
}
.ellipis{
  overflow hidden
  word-spacing nowrap
  text-overflow ellipsis
  white-space nowrap
}
</style>
