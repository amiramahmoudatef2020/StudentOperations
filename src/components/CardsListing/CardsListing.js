import React, {Component}  from 'react';
import './CardsListing.scss';
import {CustomCard} from '../index';
import { Pagination } from 'antd';
import { Checkbox } from 'antd';


 export class CardsListing extends Component {

    onContactStatusChange(e, itemId) {
        console.log(e);
        this.props.onContactStatusChange(e.target.checked, itemId);
    }

    render() {
        let cards = [];
        if(this.props.dataList) {
            cards = this.props.dataList.map((item,index) => {
                return(
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xxl-3" key={index}>
                        <Checkbox defaultChecked={item.isSelected} className="contactStatusCheckbox" onChange={(e) => this.onContactStatusChange(e, item.id)}></Checkbox>
                        <CustomCard onClickHandler={() => this.props.onItemClick(item.id)} contactData={item}></CustomCard>
                    </div>
                )
            });
        }
        
        return (
            <div className="row">
                
                <div className="col-12 listing-header">
                    <div className="row justify-content-between ">
                        <div className="col-auto">
                            All Contacts: {this.props.allDataListLength}
                        </div>
                        <div className="col-auto">
                            <Pagination
                                current={this.props.currentPage}
                                showSizeChanger
                                defaultPageSize={this.props.pageSize}
                                pageSizeOptions={this.props.availablePageSizes} 
                                defaultCurrent={this.props.currentPage} 
                                total={this.props.allDataListLength} 
                                onChange={this.props.onPageChange}
                                onShowSizeChange={this.props.onPageSizeChange}/>
                        </div>
                    </div>
                </div>
                { cards }
            </div>
        )
    }
}
