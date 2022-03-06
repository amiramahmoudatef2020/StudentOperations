import React , {Component} from 'react';
import './Card.scss';

 export class CustomCard extends Component {

    render() {
        const contactData = this.props.contactData;
        return (

            <div className="card col-12 my-2" onClick={this.props.onClickHandler}>
                {contactData? 
                    <div>
                        <div className="row justify-content-between">
                            <div className="col-auto card-title">
                                {contactData.firstName} {contactData.lastName}
                            </div>
                            <div className="col-auto type-section align-self-baseline">
                                {contactData.category[0] } - {contactData.category[1]}
                            </div>
                        </div>
                        <div className="row justify-content-between mt-1">
                            <div className="col-auto left-data-column">
                                <p className="left-data-title">Phone</p>
                                {contactData.phone}
                            </div>
                            <div className="col-auto right-data-column">
                                <p className="right-data-title" >BirthDate</p>
                                {contactData.birthDate}
                            </div>
                        </div>
                    </div>: null}
            </div>
        );
    }
}
