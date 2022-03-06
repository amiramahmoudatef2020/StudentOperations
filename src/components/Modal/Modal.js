import React, {Component} from 'react';
import { Modal } from 'antd';
 export class CustomModal extends Component {

    render() {
        let {title, visible, onOkHandler, onCancelHandler,mode} = this.props;
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={onOkHandler}
                onCancel={onCancelHandler}
                footer={[
                  ]}
            >
                {this.props.children}
            </Modal>
        )
    }
}
