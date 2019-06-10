import React from 'react';
import autoBind from '../../utils/autoBind';
import classNameCombine from '../../utils/classNameCombine';

/**
 * @author 朱双杰
 * @email henry.zhushangjie@qq.com
 * @company learnta.cn
 * 继承自 React本身的PureComponent，这里做了两件事
 * 1、自动绑定this，不用每次在constructor中bind
 * 2、混合了styles，配合module css使用
 */
export default class PureComponent extends React.PureComponent {
    constructor(props, styles) {
        super(props);
        autoBind(this);
        this.styles = classNameCombine(styles, props.styles);
    }
}
