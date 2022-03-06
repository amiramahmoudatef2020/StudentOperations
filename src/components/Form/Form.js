import React from "react";
import { Form, Input, Select, DatePicker, Button ,Cascader } from "antd";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actions/ActionCreators";
import moment from "moment";
const { Option } = Select;

const residences = [
  {
    value: "Family",
    label: "Family",
    children: [
        {
          value: 'Father',
          label: 'Father',
        },
        {
            value: 'mother',
            label: 'mother',
          },
      ],
  },
  {
    value: "Friend",
    label: "Friend",
    children: [
        {
          value: 'Colleague',
          label: 'Colleague',
        },
        {
            value: 'CloseFriend',
            label: 'CloseFriend',
          },
      ],
  }
];

class ContactForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if(!this.props.currentSelectedContact)
          this.props.addNewContact(values)
        else
          this.props.updateExistingContact({id: this.props.currentSelectedContact.id , ...values})
        // this.props.showModal()
        this.props.form.resetFields()
        this.props.hideModal();
        this.props.refreshList();
      }
    });
  };

  getFieldValue = (fieldName) => {
    if(this.props.currentSelectedContact) {
      return this.props.currentSelectedContact[fieldName];
    } else return ""
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="60">+60</Option>
        <Option value="20">+20</Option>
      </Select>
    );

    const config = {
      rules: [
        { type: "object", required: true, message: "Please select time!" }
      ]
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="First Name">
          {getFieldDecorator("firstName", {
            initialValue: this.getFieldValue('firstName'),
            rules: [
              {
                message: "The input is not valid First Name"
              },
              {
                required: true,
                message: "Please input your First Name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Family Name">
          {getFieldDecorator("lastName", {
            initialValue:  this.getFieldValue('lastName'),
            rules: [
              {
                message: "The input is not valid Family Name"
              },
              {
                required: true,
                message: "Please input your Family Name"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            initialValue:  this.getFieldValue('phone'),
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Birth Date">
          {getFieldDecorator(
            "datePicker",
            { initialValue:  this.props.currentSelectedContact ? moment(this.props.currentSelectedContact.birthDate) : moment() },
            config
          )(<DatePicker />)}
        </Form.Item>
        <Form.Item label="Category">
          {getFieldDecorator('category', {
            initialValue: this.props.currentSelectedContact ?  this.props.currentSelectedContact.category :  ['Family', 'Father'],
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ],
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div className="row">
            <div className="col-auto">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
            <div className="col-auto">
              <Button type="primary" onClick={this.props.hideModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    );
  }
}

// const MapStateToProps = state => {
//     return {
//       contacts: state.Contacts.currentLoaded,
//       allContactsLength: state.Contacts.allContactsLength
//     };
//   };
  
  const MapDispatcherToProps = Dispatcher => {
    return {
      addNewContact: (newContact) =>
        Dispatcher(ActionCreators.addContact(newContact)),
      updateExistingContact: (updatedContact) => 
        Dispatcher(ActionCreators.updateContact(updatedContact)),
    };
  };
  
   export const CustomForm = connect(/*MapStateToProps*/null, MapDispatcherToProps)( Form.create({ name: "ContactForm" })(ContactForm));