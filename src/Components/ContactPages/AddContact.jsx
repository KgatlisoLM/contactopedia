import React from "react";



class AddContact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       errorMessage: "",
       successMessage: ""
    };
  }

  handleCancel = () => {
    this.props.cancelUpdateContact();
  }

  handleAddContactForm = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const email = e.target.elements.email.value.trim();
    const phone = e.target.elements.phone.value.trim();
    const id = parseInt(e.target.elements.id.value.trim());
    let response = undefined;
    if(this.props.isUpdating){
       response =  this.props.handleUpdateContact({
        name:name,
        email:email,
        phone:phone,
        id:id
      });
    }else{
       response =  this.props.handleAddContact({
        name:name,
        email:email,
        phone:phone
      });

    }

   
    if(response.status === "success"){
       this.setState({ 
        errorMessage: "", 
        successMessage: response.msg
      });

      document.querySelector(".contact-form").reset();

    }else{
      this.setState({
         errorMessage: response.msg,
         successMessage: ""
      })
    }
  }

  
  render() {
    return (
      <div className="border col-12 p-2">
        <form className="contact-form" onSubmit={this.handleAddContactForm}>
          {this.props.isUpdating ? ( 
            <>
             <input 
                type={"hidden"} 
                name="id"
                defaultValue={this.props.isUpdating ? this.props.selectedContact.id : ""}/>
            </>
          ) : null}
    
        <div className="row p-2">
        <div className="col-12">
           {this.props.isUpdating ? "Update contact" : "Add a new contact"}
          </div>
        <div className="col-12 col-md-4 p-1">
          <input 
          className="form-control form-control-sm" 
          placeholder="Name..." 
          name="name"
          defaultValue={this.props.isUpdating ? this.props.selectedContact.name : ""}
          />
        </div>
        <div className="col-12 col-md-4 p-1">
          <input
            className="form-control form-control-sm"
            placeholder="Email..."
            name="email"
            defaultValue={this.props.isUpdating ? this.props.selectedContact.email : ""}
          />
        </div>
        <div className="col-12 col-md-4 p-1">
          <input
            className="form-control form-control-sm"
            placeholder="Phone..."
            name="phone"
            defaultValue={this.props.isUpdating ? this.props.selectedContact.phone : ""}
          />
        </div>
        {this.state.errorMessage === "" ? (<div></div>) : (
          <div className="col-12 text-center text-danger">
            {this.state.errorMessage}
          </div>
        )}
          {this.state.successMessage === "" ? (<div></div>) : (
          <div className="col-12 text-center text-success">
            {this.state.successMessage}
          </div>
        )}
        <div className={`col-12 p-1 ${this.props.isUpdating ? "col-md-4 offset-md-2" : "col-md-6 offset-md-3"}`}>
          <button className={`btn ${this.props.isUpdating ? "btn-warning btn-sm" : "btn-primary btn-sm"} form-control`}>{this.props.isUpdating ? "Update" : "Create"}</button>
        </div>
        {this.props.isUpdating ? ( <>
          <div className="col-12 p-1 col-md-4">
            <button  
                className={`btn btn-secondary btn-sm form-control`}
                onClick={this.handleCancel}
                >Cancel</button>
            </div>
          </>): null}
        </div>
        </form>
      </div>
    );
  }
  
};                        

export default AddContact;
