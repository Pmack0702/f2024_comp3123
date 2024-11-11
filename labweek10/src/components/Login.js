import React, { Component } from 'react';

export default class DataEntryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            province: '',
            postalCode: '',
            terms: false,
            submitted: false
        };
        this.provinces = ['Choose...', 'Ontario', 'Quebec', 'British Columbia', 'Alberta'];
    }

    handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
    };

    render() {
        return (
            <div className="form-container">
                <h2>Data Entry Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className='form-group'>
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInput} />
                        </div>
                        <div className='form-group'>
                            <label>Name</label>
                            <input type="text" name="fullName" placeholder="Full Name" value={this.state.fullName} onChange={this.handleInput} />
                        </div>
                        
                       
                    </div>
                    
                    <label>Address</label>
                    <input type="text" name="address1" placeholder="1234 Main St" value={this.state.address1} onChange={this.handleInput} />
                    <label>Address 2</label>
                    <input type="text" name="address2" placeholder="Apartment, studio, or floor" value={this.state.address2} onChange={this.handleInput} />


                    <div className="form-row">
                        <input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleInput} />
                        <select name="province" value={this.state.province} onChange={this.handleInput}>
                            {this.provinces.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                        <input type="text" name="postalCode" placeholder="Postal Code" value={this.state.postalCode} onChange={this.handleInput} />
                    </div>


                    <div className="form-row">
                        <input type="checkbox" name="terms" checked={this.state.terms} onChange={this.handleInput} />
                        <label>Agree Terms & Condition?</label>
                    </div>

                    <button type="submit">Submit</button>
                    
                </form>

                {this.state.submitted && (
                    <div className="submitted-info">
                        <h3>Submitted Information:</h3>
                        <p><strong>Email:</strong> {this.state.email}</p>
                        <p><strong>Name:</strong> {this.state.fullName}</p>
                        <p><strong>Address:</strong> {this.state.address1}</p>
                        <p><strong>Address 2:</strong> {this.state.address2}</p>
                        <p><strong>City:</strong> {this.state.city}</p>
                        <p><strong>Province:</strong> {this.state.province}</p>
                        <p><strong>Postal Code:</strong> {this.state.postalCode}</p>
                        <p><strong>Agreed to Terms:</strong> {this.state.terms ? 'Yes' : 'No'}</p>
                    </div>
                )}
            </div>
        );
    }
}
