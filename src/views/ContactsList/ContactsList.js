import React, { Component } from "react";
import { connect } from "react-redux";
import * as ActionCreators from "../../store/actions/ActionCreators";
import { Button } from "antd";
import  {CustomForm, CustomModal, CardsListing }  from "../../components/index";

class ContactsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageSizeIndex: 0,
      availablePageSizes: ["2", "10", "15"],
      pagesNumber: 0,
      currentPage: 1,
      showModal: false,
      currentSelectedContact: null
    };
  }

  componentDidMount() {
      this.props.getFilteredData(
        this.getCurrentPageSize(),
        this.state.currentPage
      );
      document.querySelector('meta[property="og:title"]').setAttribute("content", "amira");

  }

  getCurrentPageSize() {
    return this.state.availablePageSizes[this.state.currentPageSizeIndex];
  }

  onPageChange = (pageNumber, pageSize) => {
    this.setState({
      currentPage: pageNumber
    });
    this.props.getFilteredData(pageSize, pageNumber);
  };

  onPageSizeChange = (current, size) => {
    this.setState((prevState, props) => ({
      currentPage: 1,
      currentPageSizeIndex: prevState.availablePageSizes.findIndex((item) => {
        return item == size;
      })
    }));
    this.props.getFilteredData(size, 1);
  };

  getFilteredData = (currentPage) => {
    console.log(currentPage,  this.getCurrentPageSize())
    this.props.getFilteredData(
      this.getCurrentPageSize(),
      currentPage? currentPage : this.state.currentPage
    );
  };
  showModal = () => {
      console.log("hellodsadsadsa")
    this.setState({ showModal: true });
  };

  hideModal = (e) => {
    this.setState({ showModal: false, currentSelectedContact: null });
  };

  onContactItemClick = (id) => {
      this.showModal();
      this.setState({
        currentSelectedContact: { ... this.getContactById(id) }
      })
  }

  getContactById = (id) => {
    return this.props.contacts.find((item) => item.id === id);
  }

  onContactStatusChanged = (isSelected, itemId) => {
    let item = this.getContactById(itemId);
      this.props.updateExistingContact({
        ... item,
        isSelected
      })
  }

  refreshList = () => {
    this.getFilteredData(1);
    this.setState({
      currentSelectedContact: null
    })
  }

  deleteSelectedContacts = () => {
    this.props.deleteSelectedContacts();
    this.refreshList();
    this.setState({
      currentPage: 1
    })
    // this.props.getFilteredData(
    //   this.getCurrentPageSize(),
    //   1
    // );
    // this.setState({
    //   currentSelectedContact: null
    // })
  }

  sortContactsASC(key) {
    this.props.sortASC(key);
    this.refreshList();
  }

  sortContactsDESC(key) {
    this.props.sortDESC(key);
    this.refreshList();
  }

  render() {
    // const { showModal } = this.state;
    // console.log(this.state.currentPageSizeIndex)
    return (
      <div className="col-12">
        <div className="row my-5">
          <div className="col-auto">
            <Button type="primary" onClick={() => this.showModal()}>
              Add New Contact
            </Button>
          </div>
          <div className="col-auto">
          <Button type="primary" onClick={() => this.deleteSelectedContacts()}>
          Delete all selected contacts
          </Button>
          </div>
          
          <div className="row col-6">
            <div className="col-auto">
              <Button type="primary" onClick={() => this.sortContactsASC('firstName')}>
                  Sort ASC by first name
              </Button>
            </div>
            <div className="col-auto">
            <Button type="primary" onClick={() => this.sortContactsDESC('firstName')}>
                Sort DESC by first name
            </Button>
          </div>
          </div>

          <div className="row col-6 my-3">
            <div className="col-auto">
              <Button type="primary" onClick={() => this.sortContactsASC('lastName')}>
                  Sort ASC by family name
              </Button>
            </div>
            <div className="col-auto">
              <Button type="primary" onClick={() => this.sortContactsDESC('lastName')}>
                  Sort DESC by family name
              </Button>
            </div>
          </div>
          

        </div>
        <CustomModal
          title={this.state.currentSelectedContact ? "Edit contact" : "Add new Contact"}
          visible={this.state.showModal}
          onOkHandler={this.hideModal}
          onCancelHandler={this.hideModal}
          mode=""
        >
          <CustomForm 
              showModal={()=>this.showModal()}
              hideModal={()=>this.hideModal()}
              refreshList={() => this.refreshList()}
              currentSelectedContact={this.state.currentSelectedContact}
               />
        </CustomModal>
        <CardsListing
          dataList={this.props.contacts}
          allDataListLength={this.props.allContactsLength}
          currentPage={this.state.currentPage}
          pageSize={Number(this.getCurrentPageSize())}
          availablePageSizes={this.state.availablePageSizes}
          onPageChange={this.onPageChange}
          onPageSizeChange={this.onPageSizeChange}
          getFilteredDataFn={this.getFilteredData}
          onItemClick={(id) => this.onContactItemClick(id)}
          onContactStatusChange={(isSelected, itemId) => this.onContactStatusChanged(isSelected, itemId)}
        ></CardsListing>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    contacts: state.Contacts.currentLoaded,
    allContactsLength: state.Contacts.allContactsLength,
  };
};

const MapDispatcherToProps = Dispatcher => {
  return {
    getFilteredData: (pageSize, pageNumber) =>
      Dispatcher(ActionCreators.getFilteredContacts(pageSize, pageNumber)),
    updateExistingContact: (updatedContact) => 
      Dispatcher(ActionCreators.updateContact(updatedContact)),
    deleteSelectedContacts: () => Dispatcher(ActionCreators.deleteContacts()),
    sortASC: (key) => Dispatcher(ActionCreators.sortContactsASC(key)),
    sortDESC: (key) => Dispatcher(ActionCreators.sortContactsDESC(key)),
  };
};

export default connect(MapStateToProps, MapDispatcherToProps)(ContactsList);
