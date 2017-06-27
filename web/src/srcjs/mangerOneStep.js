/**
 * [showDetail 查看详情]
 * @type {Object}
 */
// .manage--edit
import { showTips } from '../srcjs/_unit.js'

const Edit = {
    btnEdit: $('#btnEdit'),
    btnConfirm: $('#btnConfirm'),
    wrapper: $('#manage'),

    cname: 'none',
    showEdit() {
        this.btnEdit.removeClass(this.cname);
        this.btnConfirm.addClass(this.cname);
        this.wrapper.removeClass('manage--edit')
    },
    showConfirm() {
        this.btnConfirm.removeClass(this.cname);
        this.btnEdit.addClass(this.cname);
        this.wrapper.addClass('manage--edit')
    },
    confirmHandler() {
        this.showEdit();
        return false;
    },
    editHandler() {
        this.showConfirm();
        return false;
    },
    init() {
        this.btnEdit.on('click', this.editHandler.bind(this))
        this.btnConfirm.on('click', this.confirmHandler.bind(this))
    }
};

Edit.init();
